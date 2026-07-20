import { verifySignatureAppRouter } from "@upstash/qstash/nextjs";
import prisma from "@/lib/prisma";
import { sendMail } from "@/lib/sendMail";
import { reminderEmailTemplate } from "@/lib/reminder_email_templet";

async function handler(req: Request) {
    const { appointmentId } = await req.json();

    const appt = await prisma.appointment.findUnique({
        where: {
            id: appointmentId,
            status: "CONFIRMED"
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

    if (!appt || appt.status !== "CONFIRMED") {
        return Response.json({ skipped: true });
    }

    const { patient, slot, meeting, appointmentContexts } = appt;
    const docName = appt.slot.doctor.user.name;
    const emailDocuments = (appt.appointmentContexts?.contextDocuments ?? []).map((d) => ({
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
                    prescriptionLink: `https://www.drankitachauhan.com/doctor/appointments?appointmentId=${appt.id}&action=send-prescription`,
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

    return Response.json({ sent: true });
}

export const POST = verifySignatureAppRouter(handler);