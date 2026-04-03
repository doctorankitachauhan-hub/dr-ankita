import { PrescriptionType, Role } from "@/generated/prisma/enums";
import { authorize } from "@/lib/authorize";
import { getUser } from "@/lib/get-user";
import prisma from "@/lib/prisma";
import { PrescriptionSchema } from "@/types/prescription";
import { NextRequest, NextResponse } from "next/server";
import z from "zod";
import { sendMail } from "@/lib/sendMail";
import { generatePrescriptionPDF } from "@/lib/generate_prescription_pdf";
import { buildEmailHtml } from "@/lib/presctiption_email_temp";
import { v2 as cloudinary } from "cloudinary";

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
            id: string;
            userId: string;
            user: {
                name: string;
                email: string;
            };
        };
    };
}

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
    api_key: process.env.CLOUDINARY_API_KEY!,
    api_secret: process.env.CLOUDINARY_API_SECRET!,
});


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

        const { appointmentId, prescription, userId, type } = parsed.data;

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

        const prescriptionType = (type ?? PrescriptionType.FINAL) as PrescriptionType;

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

        const existing = await prisma.prescription.findUnique({
            where: {
                appointmentId_type: { appointmentId, type: prescriptionType },
            },
            select: { id: true },
        });

        if (existing) {
            const label = prescriptionType === PrescriptionType.INTERIM ? "interim" : "final";
            return NextResponse.json(
                {
                    error: `A ${label} prescription has already been issued for this appointment. Only one ${label} prescription is allowed per appointment.`,
                },
                { status: 409 }
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

        let pdfUrl: string;
        try {
            pdfUrl = await uploadPDFToCloudinary(pdfBuffer, appointmentId, prescriptionType);
        } catch (err) {
            console.error("[prescription] Cloudinary upload failed:", err);
            return NextResponse.json(
                { error: "Failed to store prescription PDF" },
                { status: 500 }
            );
        }

        try {
            await prisma.prescription.create({
                data: {
                    appointmentId,
                    doctorId: appointment.slot.doctor.id,
                    patientId: userId,
                    type: prescriptionType,
                    content: trimmedPrescription,
                    pdfUrl,
                },
            });
        } catch (err) {
            console.error("[prescription] DB save failed:", err);
            return NextResponse.json(
                { error: "Failed to save prescription record" },
                { status: 500 }
            );
        }

        try {
            const typeLabel = prescriptionType === PrescriptionType.INTERIM ? "Interim" : "Final";

            await sendMail({
                title: "Your Prescription ",
                to: appointment.patient.email,
                subject: `Your ${typeLabel} Medical Prescription`,
                html: buildEmailHtml({
                    patientName: appointment.patient.name,
                    doctorName: appointment.slot.doctor.user.name,
                    prescription: trimmedPrescription,
                }),
                attachments: [
                    {
                        filename: `prescription-${appointmentId}-${prescriptionType.toLowerCase()}.pdf`,
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
        const typeLabel = prescriptionType === PrescriptionType.INTERIM ? "Interim" : "Final";
        return NextResponse.json(
            { success: true, message: `${typeLabel} prescription sent successfully`, },
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


async function uploadPDFToCloudinary(pdfBuffer: Buffer, appointmentId: string, type: PrescriptionType): Promise<string> {

    return new Promise((resolve, reject) => {
        const publicId = `prescriptions/${appointmentId}_${type.toLowerCase()}`;

        const stream = cloudinary.uploader.upload_stream(
            {
                public_id: publicId,
                resource_type: "raw",
                format: "pdf",
                overwrite: true,
            },
            (error, result) => {
                if (error || !result) {
                    return reject(error ?? new Error("Cloudinary upload returned no result"));
                }
                resolve(result.secure_url);
            }
        );

        stream.end(pdfBuffer);
    });
}