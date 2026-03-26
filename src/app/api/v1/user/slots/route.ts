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

        const { success, message, status } = authorize(req, [Role.PATIENT])
        if (!success) {
            return NextResponse.json({ error: message }, { status })
        }

        const { searchParams } = req.nextUrl
        const date = searchParams.get("date")?.trim();

        if (!date) {
            return NextResponse.json(
                { error: "Date is required" },
                { status: 400 }
            );
        }

        const startOfDay = new Date(`${date}T00:00:00.000Z`);
        const endOfDay = new Date(`${date}T23:59:59.999Z`);

        const slots = await prisma.timeSlot.findMany({
            where: {
                status: "AVAILABLE",
                startTime: {
                    gte: startOfDay,
                    lte: endOfDay
                }
            },
            orderBy: {
                startTime: "asc"
            },
            select: {
                id: true,
                startTime: true,
                endTime: true,
                status: true,
            }
        });

        return NextResponse.json(slots);

    } catch (error) {
        console.log("Error while fetching slots", error);
        return NextResponse.json(
            { error: "Something went wrong...!!" },
            { status: 500 }
        )
    }
}