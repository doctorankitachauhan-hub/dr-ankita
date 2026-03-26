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

        const payment = event.payload.payment.entity;

        await handlePaymentCaptured(payment);

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("🔥 Webhook Error:", error);
        return new NextResponse("Webhook error", { status: 500 });
    }
}

async function handlePaymentCaptured(payment: any) {
    const orderId = payment.order_id;
    const paymentId = payment.id;

    let appointment: any = null;
    let slot: any = null;
    let patient: any = null;

    await prisma.$transaction(async (tx) => {
        const dbPayment = await tx.payment.findUnique({
            where: { razorpayOrderId: orderId },
        });

        if (!dbPayment) throw new Error("Payment not found");

        if (dbPayment.status === "SUCCESS") return;

        const updated = await tx.timeSlot.updateMany({
            where: {
                id: dbPayment.slotId,
                status: "AVAILABLE",
            },
            data: { status: "BOOKED" },
        });

        if (updated.count === 0) {
            return;
        }

        slot = await tx.timeSlot.findUnique({
            where: { id: dbPayment.slotId },
            include: { doctor: true },
        });

        try {
            appointment = await tx.appointment.create({
                data: {
                    patientId: dbPayment.userId,
                    slotId: dbPayment.slotId,
                    status: "CONFIRMED",
                },
                include: { patient: true },
            });

            patient = appointment.patient;

        } catch (err: any) {
            if (err.code === "P2002") {
                return;
            }
            throw err;
        }

        await tx.payment.update({
            where: { id: dbPayment.id },
            data: {
                status: "SUCCESS",
                transactionId: paymentId,
                appointmentId: appointment.id,
            },
        });
    });

    if (!appointment) {
        await prisma.payment.update({
            where: { razorpayOrderId: orderId },
            data: { status: "FAILED" },
        });
        return;
    }

    if (!slot || !patient) return;

    let meetLink = "";
    let eventId = "";

    try {
        const meet = await createGoogleMeet({
            startTime: slot.startTime.toISOString(),
            endTime: slot.endTime.toISOString(),
            patientEmail: patient.email,
            doctorEmail: "prathumjirai@gmail.com",
        });

        meetLink = meet.meetLink!;
        eventId = meet.eventId!;

        await prisma.meeting.create({
            data: {
                appointmentId: appointment.id,
                meetingLink: meetLink,
                googleEventId: eventId,
                startTime: slot.startTime,
                endTime: slot.endTime,
            },
        });
    } catch (err) {
        console.error("⚠️ Meet creation failed:", err);
    }

    try {
        await sendMail({
            title: slot.doctor.name,
            to: [patient.email, "prathumjirai@gmail.com"],
            subject: "Appointment Confirmed",
            html: appointmentEmailTemplate({
                patientName: patient.name,
                doctorName: slot.doctor.name,
                startTime: slot.startTime.toISOString(),
                endTime: slot.endTime.toISOString(),
                meetLink,
            }),
        });
    } catch (err) {
        console.error("⚠️ Email failed:", err);
    }
}