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
        const appointementStatus = (searchParams.get("status")?.trim() as AppointmentStatus) ?? AppointmentStatus.CONFIRMED;

        if (!date) {
            return NextResponse.json(
                { error: "Date is required" },
                { status: 400 }
            );
        }

        const startOfDay = new Date(`${date}T00:00:00.000Z`);
        const endOfDay = new Date(`${date}T23:59:59.999Z`);

        const appointement = await prisma.appointment.findMany({
            where: {
                status: appointementStatus,
                createdAt: {
                    gte: startOfDay,
                    lte: endOfDay
                }
            },
            include: {
                meeting: true,
                patient: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
                        phone: true,
                        dob: true,
                        address: true,
                    }
                },
            }
        })

        return NextResponse.json(appointement);
    } catch (error) {
        console.log("Error while getting the Appointementslist", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 })
    }
}