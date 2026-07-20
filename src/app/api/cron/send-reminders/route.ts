import prisma from "@/lib/prisma";
import { reminderEmailTemplate } from "@/lib/reminder_email_templet";
import { sendMail } from "@/lib/sendMail";
import { NextResponse } from "next/server";

const REMINDER_MINUTES = 15;
const WINDOW_MINUTES = 5;

export async function GET(req: Request) {
    const authHeader = req.headers.get("authorization");
    if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
        return new NextResponse("Unauthorized", { status: 401 });
    }

    const now = new Date();
    const windowStart = new Date(now.getTime() + (REMINDER_MINUTES - WINDOW_MINUTES) * 60_000);
    const windowEnd = new Date(now.getTime() + REMINDER_MINUTES * 60_000);

    const dueAppointments = await prisma.appointment.findMany({
        where: {
            status: "CONFIRMED",
            reminder1Sent: false,
            slot: {
                startTime: { gte: windowStart, lte: windowEnd },
            },
        },
        include: {
            patient: true,
            slot: { include: { doctor: { include: { user: true } } } },
            meeting: true,
            appointmentContexts: {
                include: {
                    contextDocuments: true
                }
            },
        },
    });

    for (const appt of dueAppointments) {
        const claimed = await prisma.appointment.updateMany({
            where: { id: appt.id, reminder1Sent: false },
            data: { reminder1Sent: true },
        });
        if (claimed.count === 0) continue;

        const { patient, slot, meeting, appointmentContexts } = appt;
        const docName = slot.doctor.user.name

        const emailDocuments = (appointmentContexts?.contextDocuments ?? []).map((d) => ({
            fileName: d.fileName,
            fileUrl: d.fileUrl,
            documentType: d.documentType as any,
        }));

        try {
            await Promise.allSettled([
                sendMail({
                    title: `Dr. ${docName}`,
                    to: patient.email,
                    subject: "Your appointment starts in 15 minutes",
                    html: reminderEmailTemplate({
                        patientName: patient.name,
                        doctorName: docName,
                        startTime: slot.startTime,
                        endTime: slot.endTime,
                        meetLink: meeting!.meetingLink,
                        recipientRole: "patient",
                    }),
                }),
                sendMail({
                    title: `Dr. ${docName}`,
                    to: docName,
                    subject: `Appointment with ${patient.name} starts in 15 minutes`,
                    html: reminderEmailTemplate({
                        patientName: patient.name,
                        doctorName: docName,
                        startTime: slot.startTime,
                        endTime: slot.endTime,
                        meetLink: meeting!.meetingLink,
                        recipientRole: "doctor",
                        reason: appointmentContexts?.reason,
                        symptoms: appointmentContexts?.symptoms ?? undefined,
                        notes: appointmentContexts?.notes ?? undefined,
                        documents: emailDocuments,
                    }),
                }),
            ]);
        } catch (err) {
            console.error(`Failed to send reminder for appointment ${appt.id}`, err);
        }
    }

    return NextResponse.json({ processed: dueAppointments.length });
}