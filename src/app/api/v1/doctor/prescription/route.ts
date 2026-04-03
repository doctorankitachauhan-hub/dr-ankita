import { Role } from "@/generated/prisma/enums";
import { authorize } from "@/lib/authorize";
import { getUser } from "@/lib/get-user";
import prisma from "@/lib/prisma";
import { PrescriptionSchema } from "@/types/prescription";
import { NextRequest, NextResponse } from "next/server";
import z from "zod";
import { sendMail } from "@/lib/sendMail";
import { generatePrescriptionPDF } from "@/lib/generate_prescription_pdf";
import { buildEmailHtml } from "@/lib/presctiption_email_temp";

interface AppointmentWithRelations {
    id: string;
    status: string;
    patientId: string;
    patient: {
        name: string;
        email: string;
    };
    appointmentContexts: unknown[];
    slot: {
        doctor: {
            userId: string;
            user: {
                name: string;
                email: string;
            };
        };
    };
}

export async function POST(req: NextRequest) {
    try {
        const user = getUser(req);
        if (!user?.id) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const { success, message, status } = authorize(req, [Role.DOCTOR]);
        if (!success) {
            return NextResponse.json({ error: message }, { status });
        }

        const body = await req.json();
        const parsed = PrescriptionSchema.safeParse(body);
        if (!parsed.success) {
            return NextResponse.json(
                { error: z.prettifyError(parsed.error) },
                { status: 400 }
            );
        }

        const { appointmentId, prescription, userId } = parsed.data;

        if (!appointmentId || !userId || !prescription) {
            return NextResponse.json(
                { error: "appointmentId, userId, and prescription are required" },
                { status: 400 }
            );
        }

        const trimmedPrescription = prescription.trim();
        if (trimmedPrescription.length < 10) {
            return NextResponse.json(
                { error: "Prescription must be at least 10 characters" },
                { status: 400 }
            );
        }

        const appointment = await prisma.appointment.findUnique({
            where: { id: appointmentId },
            include: {
                patient: {
                    select: { name: true, email: true },
                },
                appointmentContexts: true,
                slot: {
                    include: {
                        doctor: {
                            include: {
                                user: {
                                    select: { name: true, email: true },
                                },
                            },
                        },
                    },
                },
            },
        }) as AppointmentWithRelations | null;

        if (!appointment) {
            return NextResponse.json(
                { error: "Appointment not found" },
                { status: 404 }
            );
        }

        if (appointment.slot.doctor.userId !== user.id) {
            return NextResponse.json(
                { error: "Forbidden: This appointment does not belong to you" },
                { status: 403 }
            );
        }

        if (appointment.patientId !== userId) {
            return NextResponse.json(
                { error: "Patient ID does not match this appointment" },
                { status: 400 }
            );
        }

        const VALID_STATUSES = ["CONFIRMED", "COMPLETED"];
        if (!VALID_STATUSES.includes(appointment.status)) {
            return NextResponse.json(
                {
                    error: `Prescriptions can only be issued for appointments with status: ${VALID_STATUSES.join(", ")}`,
                },
                { status: 400 }
            );
        }

        let pdfBuffer: Buffer;
        try {
            pdfBuffer = await generatePrescriptionPDF(
                trimmedPrescription,
                appointment
            );
        } catch (err) {
            console.error("[prescription] PDF generation failed:", err);
            return NextResponse.json(
                { error: "Failed to generate prescription PDF" },
                { status: 500 }
            );
        }

        try {
            await sendMail({
                title: "Your Prescription ",
                to: appointment.patient.email,
                subject: "Your Medical Prescription",
                html: buildEmailHtml({
                    patientName: appointment.patient.name,
                    doctorName: appointment.slot.doctor.user.name,
                    prescription: trimmedPrescription,
                }),
                attachments: [
                    {
                        filename: `prescription-${appointmentId}.pdf`,
                        content: pdfBuffer,
                    },
                ],
            });
        } catch (err) {
            console.error("[prescription] Email delivery failed:", err);
            return NextResponse.json(
                { error: "Prescription generated but failed to deliver via email" },
                { status: 500 }
            );
        }

        return NextResponse.json(
            { success: true, message: "Prescription sent successfully" },
            { status: 200 }
        );
    } catch (error) {
        console.error("[prescription] Unhandled error:", error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}