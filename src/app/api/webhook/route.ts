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
        console.error("Webhook error:", error);
        return new NextResponse("Webhook error", { status: 500 });
    }
}

async function handlePaymentCaptured(payment: any) {
    const orderId = payment.order_id as string;
    const paymentId = payment.id as string;

    // Step 1: Load payment row
    const dbPayment = await prisma.payment.findUnique({
        where: { razorpayOrderId: orderId },
    });

    if (!dbPayment) {
        console.error(`No payment row for order ${orderId}`);
        return;
    }

    // Step 2: Idempotency — already fully processed
    if (dbPayment.status === "SUCCESS") {
        console.log(`Already processed: ${orderId}`);
        return;
    }

    // Step 3: Fetch slot
    const slot = await prisma.timeSlot.findUnique({
        where: { id: dbPayment.slotId },
        include: { doctor: { include: { user: true } } },
    });

    if (!slot) {
        console.error(`Slot not found: ${dbPayment.slotId}`);
        return;
    }

    if (slot.status === "BOOKED") {
        console.warn(`Slot already booked for order ${orderId}`);
        await prisma.payment.updateMany({
            where: { razorpayOrderId: orderId, status: { not: "SUCCESS" } },
            data: { status: "FAILED" },
        });
        return;
    }

    // Step 4: Resolve appointment
    //
    // Appointment.slotId has no @unique — a slot can have many rows over time.
    // Payment.appointmentId has no @unique — a payment points to one appointment,
    // but an appointment can be reused across bookings.
    //
    // Resolution order:
    //   1. Active appointment exists → concurrent webhook → exit
    //   2. This patient's cancelled appointment exists → reuse it (update to CONFIRMED)
    //      → but first unlink it from its old REFUNDED payment to clear the FK
    //   3. No prior appointment → create fresh row

    const existingActive = await prisma.appointment.findFirst({
        where: {
            slotId: dbPayment.slotId,
            status: { in: ["CONFIRMED", "COMPLETED", "PENDING"] },
        },
    });

    if (existingActive) {
        console.log(`Active appointment already exists for slot ${dbPayment.slotId}`);
        return;
    }

    const cancelledByThisUser = await prisma.appointment.findFirst({
        where: {
            slotId: dbPayment.slotId,
            patientId: dbPayment.userId,
            status: "CANCELLED",
        },
        orderBy: { createdAt: "desc" },
    });

    let appointment: any;

    if (cancelledByThisUser) {
        // Unlink the old REFUNDED payment from this appointment before reusing it.
        // Payment.appointmentId still has @unique until you run the migration —
        // without this step the new payment.update below would hit P2002.
        await prisma.payment.updateMany({
            where: {
                appointmentId: cancelledByThisUser.id,
                status: "REFUNDED",
            },
            data: { appointmentId: null },
        });

        // Now safely reuse the cancelled appointment row
        appointment = await prisma.appointment.update({
            where: { id: cancelledByThisUser.id },
            data: {
                patientId: dbPayment.userId,
                status: "CONFIRMED",
                reminder1Sent: false,
                reminder2Sent: false,
            },
            include: { patient: true },
        });
    } else {
        // Fresh booking — new row
        try {
            appointment = await prisma.appointment.create({
                data: {
                    patientId: dbPayment.userId,
                    slotId: dbPayment.slotId,
                    status: "CONFIRMED",
                },
                include: { patient: true },
            });
        } catch (err: any) {
            console.error("Appointment create failed:", err);
            await prisma.payment.updateMany({
                where: { razorpayOrderId: orderId, status: { not: "SUCCESS" } },
                data: { status: "FAILED" },
            });
            throw err;
        }
    }

    const patient = appointment.patient;

    // Step 5: Mark payment SUCCESS + slot BOOKED in parallel
    await Promise.all([
        prisma.payment.update({
            where: { id: dbPayment.id },
            data: {
                status: "SUCCESS",
                transactionId: paymentId,
                appointmentId: appointment.id,
            },
        }),
        prisma.timeSlot.update({
            where: { id: dbPayment.slotId },
            data: { status: "BOOKED" },
        }),
    ]);

    // Step 6: Google Meet
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
        console.error("Meet creation failed:", err);
    }

    // Step 7: Confirmation email
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
        console.error("Email failed:", err);
    }
}