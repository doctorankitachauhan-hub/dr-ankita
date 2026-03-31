import crypto from "crypto";
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { createGoogleMeet } from "@/lib/create_meeting";
import { sendMail } from "@/lib/sendMail";
import { appointmentEmailTemplate } from "@/lib/appointmentEmailTemplate";
import { generateICS } from "@/lib/generateICS";

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

    const dbPayment = await prisma.payment.findUnique({
        where: { razorpayOrderId: orderId },
        include: {
            context: {
                include: { contextDocuments: true },
            },
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
            where: { razorpayOrderId: orderId, status: { not: "SUCCESS" } },
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
        await prisma.payment.updateMany({
            where: {
                appointmentId: cancelledByThisUser.id,
                status: "REFUNDED",
            },
            data: { appointmentId: null },
        });

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

    if (dbPayment.contextId) {
        await prisma.appointmentContext.update({
            where: { id: dbPayment.contextId },
            data: { appointmentId: appointment.id },
        });
    }

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


    const data = {
        doctorName: slot.doctor.user.name,
        startTime: slot.startTime.toISOString(),
        endTime: slot.endTime.toISOString(),
        meetLink
    }
    const context = dbPayment.context;

    const emailDocuments = (context?.contextDocuments ?? []).map((d) => ({
        fileName: d.fileName,
        fileUrl: d.fileUrl,
        documentType: d.documentType as any,
    }));


    // email send to patient and doctor
    const emailPromises = [
        sendMail({
            title: `${slot.doctor.user.name} Online Consultation`,
            to: [patient.email],
            subject: "Appointment Confirmed",
            html: appointmentEmailTemplate({
                patientName: patient.name,
                doctorName: slot.doctor.user.name,
                startTime: slot.startTime.toISOString(),
                endTime: slot.endTime.toISOString(),
                meetLink,
            }),
            attachments: [
                {
                    filename: "invite.ics",
                    content: generateICS(data),
                    contentType: "text/calendar; method=REQUEST",
                },
            ],
        }),

        sendMail({
            title: `${slot.doctor.user.name} Online Consultation`,
            to: ["prathumjirai@gmail.com"],
            subject: "Appointment Confirmed",
            html: appointmentEmailTemplate({
                patientName: patient.name,
                doctorName: slot.doctor.user.name,
                startTime: slot.startTime.toISOString(),
                endTime: slot.endTime.toISOString(),
                meetLink,
                reason: context?.reason,
                symptoms: context?.symptoms ?? undefined,
                notes: context?.notes ?? undefined,
                documents: emailDocuments,
            }),
            attachments: [
                {
                    filename: "invite.ics",
                    content: generateICS(data),
                    contentType: "text/calendar; method=REQUEST",
                },
            ],
        }),
    ];

    const results = await Promise.allSettled(emailPromises);

    results.forEach((result, index) => {
        if (result.status === "rejected") {
            console.error(
                `Email ${index === 0 ? "patient" : "doctor"} failed:`,
                result.reason
            );
        }
    });
}