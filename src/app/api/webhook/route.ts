import crypto from "crypto";
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { createGoogleMeet } from "@/lib/create_meeting";
import { sendMail } from "@/lib/sendMail";
import { appointmentEmailTemplate } from "@/lib/appointmentEmailTemplate";
import { generateICS } from "@/lib/generateICS";

function verifyWebhookSignature(rawBody: string, signature: string, timestamp: string): boolean {

    const data = timestamp + rawBody;
    const expected = crypto
        .createHmac("sha256", process.env.CASHFREE_SECRET_KEY!)
        .update(data)
        .digest("base64");
    return expected === signature;
}

export async function POST(req: NextRequest) {
    try {
        const rawBody = await req.text();
        const signature = req.headers.get("x-webhook-signature") ?? "";
        const timestamp = req.headers.get("x-webhook-timestamp") ?? "";

        if (!verifyWebhookSignature(rawBody, signature, timestamp)) {
            return new NextResponse("Invalid signature", { status: 400 });
        }

        const event = JSON.parse(rawBody);

        if (event.type !== "PAYMENT_SUCCESS_WEBHOOK") {
            return NextResponse.json({ received: true });
        }

        await handlePaymentCaptured(event.data);

        return NextResponse.json({ success: true });

    } catch (error) {
        console.error("Webhook error:", error);
        return new NextResponse("Webhook error", { status: 500 });
    }
}

async function handlePaymentCaptured(data: any) {
    const orderId = data.order.order_id as string;
    const paymentId = data.payment.cf_payment_id as string;

    const dbPayment = await prisma.payment.findUnique({
        where: { gatewayOrderId: orderId },
        include: {
            context: { include: { contextDocuments: true } },
        },
    });

    if (!dbPayment) {
        console.error(`No payment row for order ${orderId}`);
        return;
    }

    if (dbPayment.status === "SUCCESS") {
        console.log(`Already processed: ${orderId}`);
        return;
    }

    const slot = await prisma.timeSlot.findUnique({
        where: { id: dbPayment.slotId },
        include: { doctor: { include: { user: true } } },
    });

    if (!slot) {
        console.error(`Slot not found: ${dbPayment.slotId}`);
        return;
    }

    if (slot.status === "BOOKED") {
        console.log(`Slot already booked for order ${orderId}`);
        await prisma.payment.updateMany({
            where: { gatewayOrderId: orderId, status: { not: "SUCCESS" } },
            data: { status: "FAILED" },
        });
        return;
    }

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
        const refundedPayments = await prisma.payment.findMany({
            where: {
                appointmentId: cancelledByThisUser.id,
                status: "REFUNDED",
            },
            select: { id: true },
        });
        const refundedPaymentIds = refundedPayments.map((p) => p.id);

        if (refundedPaymentIds.length > 0) {
            await prisma.payment.updateMany({
                where: { id: { in: refundedPaymentIds } },
                data: { appointmentId: null },
            });
        }

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

        if (refundedPaymentIds.length > 0) {
            await prisma.payment.updateMany({
                where: { id: { in: refundedPaymentIds } },
                data: { appointmentId: appointment.id },
            });
        }

    } else {
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
                where: { gatewayOrderId: orderId, status: { not: "SUCCESS" } }, // ✅ was razorpayOrderId
                data: { status: "FAILED" },
            });
            throw err;
        }
    }

    const patient = appointment.patient;

    if (dbPayment.contextId) {
        await prisma.appointmentContext.update({
            where: { id: dbPayment.contextId },
            data: { appointmentId: appointment.id },
        });
    }

    await Promise.all([
        prisma.payment.update({
            where: { id: dbPayment.id },
            data: {
                status: "SUCCESS",
                transactionId: String(paymentId),
                appointmentId: appointment.id,
            },
        }),
        prisma.timeSlot.update({
            where: { id: dbPayment.slotId },
            data: { status: "BOOKED" },
        }),
    ]);

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

    const emailData = { doctorName: slot.doctor.user.name, startTime: slot.startTime, endTime: slot.endTime, meetLink };
    const context = dbPayment.context;
    const emailDocuments = (context?.contextDocuments ?? []).map((d) => ({
        fileName: d.fileName,
        fileUrl: d.fileUrl,
        documentType: d.documentType as any,
    }));

    try {
        await sendMail({
            title: `${slot.doctor.user.name} Online Consultation`,
            to: [patient.email],
            subject: "Appointment Confirmed",
            html: appointmentEmailTemplate({ patientName: patient.name, doctorName: slot.doctor.user.name, startTime: slot.startTime, endTime: slot.endTime, meetLink }),
            attachments: [{ filename: "invite.ics", content: generateICS(emailData), contentType: "text/calendar; method=REQUEST" }],
        });
    } catch (err) { console.error("Patient email failed:", err); }

    try {
        await sendMail({
            title: `${slot.doctor.user.name} Online Consultation`,
            to: ["prathumjirai@gmail.com"],
            subject: "Appointment Confirmed",
            html: appointmentEmailTemplate({ patientName: patient.name, doctorName: slot.doctor.user.name, startTime: slot.startTime, endTime: slot.endTime, meetLink, reason: context?.reason, symptoms: context?.symptoms ?? undefined, notes: context?.notes ?? undefined, documents: emailDocuments }),
            attachments: [{ filename: "invite.ics", content: generateICS(emailData), contentType: "text/calendar; method=REQUEST" }],
        });
    } catch (err) { console.error("Doctor email failed:", err); }
}