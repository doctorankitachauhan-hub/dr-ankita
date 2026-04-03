import { Role } from "@/generated/prisma/enums";
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
        const page = Math.max(Number(searchParams.get("page")) || 1, 1);
        const limit = Math.min(Math.max(Number(searchParams.get("limit")) || 10, 1), 50);
        const skip = (page - 1) * limit;


        const [patient, totalPatient] = await Promise.all([
            prisma.user.findMany({
                where: { role: Role.PATIENT },
                select: {
                    id: true,
                    name: true,
                    email: true,
                    phone: true,
                    appointments: {
                        include: {
                            payment: true,
                            meeting: true,
                            appointmentContexts: { include: { contextDocuments: true } },
                            slot: { select: { id: true, startTime: true, endTime: true } },
                            prescriptions: {
                                select: {
                                    id: true,
                                    content: true,
                                    issuedAt: true,
                                    type: true,
                                    pdfUrl: true
                                }
                            }
                        }
                    }
                },
                skip,
                take: limit,
            }),
            prisma.user.count({ where: { role: Role.PATIENT } })
        ])

        const pageCount = Math.ceil(totalPatient / limit);

        const response = {
            patient,
            page,
            limit,
            totalPatient,
            pageCount,
            hasMore: page < pageCount,
            nextPage: page < pageCount ? page + 1 : null,
            prevPage: page > 1 ? page - 1 : null,
        };

        return NextResponse.json(response)

    } catch (error) {
        console.log("Error while getting the patient", error);
        return NextResponse.json({ error: "Internal server error" })
    }
}