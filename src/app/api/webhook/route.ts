import crypto from "crypto";
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { createGoogleMeet } from "@/lib/create_meeting";
import { sendMail } from "@/lib/sendMail";
import { appointmentEmailTemplate } from "@/lib/appointmentEmailTemplate";

function verifyWebhookSignature(body: string, signature: string) {
    const expected = crypto
        .createHmac("sha256", process.env.RAZORPAY_WEBHOOK_SECRET!)
        .update(body)
        .digest("hex");
    return expected === signature;
}

export async function POST(req: NextRequest) {
    try {
        const rawBody = await req.text();
        const signature = req.headers.get("x-razorpay-signature")!;

        if (!verifyWebhookSignature(rawBody, signature)) {
            return new NextResponse("Invalid signature", { status: 400 });
        }

        const event = JSON.parse(rawBody);

        if (event.event !== "payment.captured") {
            return NextResponse.json({ received: true });
        }

        await handlePaymentCaptured(event.payload.payment.entity);

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("🔥 Webhook error:", error);
        return new NextResponse("Webhook error", { status: 500 });
    }
}

async function handlePaymentCaptured(payment: any) {
    const orderId = payment.order_id as string;
    const paymentId = payment.id as string;

    const dbPayment = await prisma.payment.findUnique({
        where: { razorpayOrderId: orderId },
    });

    if (!dbPayment) {
        console.error(`❌ No payment row for order ${orderId}`);
        return;
    }

    if (dbPayment.status === "SUCCESS") {
        console.log(`⏭️  Already processed: ${orderId}`);
        return;
    }

    const slotUpdate = await prisma.timeSlot.updateMany({
        where: { id: dbPayment.slotId, status: "AVAILABLE" },
        data: { status: "BOOKED" },
    });

    if (slotUpdate.count === 0) {
        console.warn(`⚠️  Slot unavailable for order ${orderId}`);
        await prisma.payment.updateMany({
            where: { razorpayOrderId: orderId, status: { not: "SUCCESS" } },
            data: { status: "FAILED" },
        });
        return;
    }

    const slot = await prisma.timeSlot.findUnique({
        where: { id: dbPayment.slotId },
        include: { doctor: { include: { user: true } } },
    });

    if (!slot) {
        console.error(`❌ Slot not found after booking: ${dbPayment.slotId}`);
        return;
    }

    let appointment: any;

    try {
        appointment = await prisma.appointment.create({
            data: {
                patientId: dbPayment.userId,
                slotId: dbPayment.slotId,
                status: "CONFIRMED",
            },
            include: { patient: true },
        });
        // console.log(`Slot booked successfully: ${orderId}`);
    } catch (err: any) {
        if (err.code === "P2002") {
            console.log(`⏭️  Appointment already exists for slot ${dbPayment.slotId}`);
            return;
        }
        await prisma.payment.updateMany({
            where: { razorpayOrderId: orderId, status: { not: "SUCCESS" } },
            data: { status: "FAILED" },
        });
        throw err;
    }

    const patient = appointment.patient;

    await prisma.payment.update({
        where: { id: dbPayment.id },
        data: {
            status: "SUCCESS",
            transactionId: paymentId,
            appointmentId: appointment.id,
        },
    });

    let meetLink = "";

    try {
        const existingMeeting = await prisma.meeting.findUnique({
            where: { appointmentId: appointment.id },
        });

        if (existingMeeting) {
            meetLink = existingMeeting.meetingLink;
        } else {
            const meet = await createGoogleMeet({
                startTime: slot.startTime.toISOString(),
                endTime: slot.endTime.toISOString(),
                patientEmail: patient.email,
                doctorEmail: "prathumjirai@gmail.com",
            });

            meetLink = meet.meetLink!;

            await prisma.meeting.create({
                data: {
                    appointmentId: appointment.id,
                    meetingLink: meetLink,
                    googleEventId: meet.eventId!,
                    startTime: slot.startTime,
                    endTime: slot.endTime,
                },
            });
        }
    } catch (err) {
        console.error("⚠️ Meet creation failed:", err);
    }

    try {
        await sendMail({
            title: `${slot.doctor.user.name} Online Consultation`,
            to: [patient.email, "prathumjirai@gmail.com"],
            subject: "Appointment Confirmed",
            html: appointmentEmailTemplate({
                patientName: patient.name,
                doctorName: slot.doctor.user.name,
                startTime: slot.startTime.toISOString(),
                endTime: slot.endTime.toISOString(),
                meetLink,
            }),
        });
    } catch (err) {
        console.error("⚠️ Email failed:", err);
    }
}