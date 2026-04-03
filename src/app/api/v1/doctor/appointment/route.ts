import { AppointmentStatus, Role } from "@/generated/prisma/enums";
import { authorize } from "@/lib/authorize";
import { getUser } from "@/lib/get-user";
import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    try {
        const user = getUser(req);

        if (!user?.id) {
            return NextResponse.json(
                { error: "Unauthorized" },
                { status: 401 }
            );
        }

        const { success, message, status } = authorize(req, [Role.DOCTOR])
        if (!success) {
            return NextResponse.json({ error: message }, { status })
        }

        const { searchParams } = req.nextUrl
        const date = searchParams.get("date")?.trim();

        if (!date || !/^\d{4}-\d{2}-\d{2}$/.test(date)) {
            return NextResponse.json(
                { error: "A valid date (YYYY-MM-DD) is required" },
                { status: 400 }
            );
        }

        const appointementStatus = (searchParams.get("status")?.trim() as AppointmentStatus) ?? AppointmentStatus.CONFIRMED;

        const startOfDay = new Date(`${date}T00:00:00.000Z`);
        const endOfDay = new Date(`${date}T23:59:59.999Z`);

        const appointement = await prisma.appointment.findMany({
            where: {
                status: appointementStatus,
                slot: {
                    startTime: {
                        gte: startOfDay,
                        lte: endOfDay,
                    },
                },
            },
            include: {
                meeting: true,
                patient: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
                        phone: true,
                    }
                },
                appointmentContexts: {
                    select: {
                        id: true,
                        reason: true,
                        symptoms: true,
                        notes: true,
                        contextDocuments: {
                            select: {
                                id: true,
                                fileName: true,
                                documentType: true,
                                fileUrl: true,
                                fileType: true,
                            }
                        }
                    },
                },
                prescriptions: {
                    select: {
                        id: true,
                        issuedAt: true,
                        type: true,
                        pdfUrl: true,
                        content: true
                    }
                }
            }
        })

        return NextResponse.json(appointement);
    } catch (error) {
        console.log("Error while getting the Appointementslist", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 })
    }
}