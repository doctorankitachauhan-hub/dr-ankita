import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { Role } from "@/generated/prisma/enums";
import { z } from "zod";
import { getUser } from "@/lib/get-user";
import { authorize } from "@/lib/authorize";
import { AvailabilitySchema } from "@/types/availability";

export async function POST(req: NextRequest) {
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

        const body = await req.json();
        const parsed = AvailabilitySchema.safeParse(body);

        if (!parsed.success) {
            return NextResponse.json(
                { error: z.prettifyError(parsed.error) },
                { status: 400 }
            );
        }

        const doctor = await prisma.doctorProfile.findUnique({
            where: { userId: user.id }
        });

        if (!doctor) {
            return NextResponse.json(
                { error: "Doctor not found" },
                { status: 404 }
            );
        }

        await prisma.doctorAvailability.deleteMany({
            where: { doctorId: doctor.id }
        });

        await prisma.doctorAvailability.createMany({
            data: parsed.data.map((a) => ({
                doctorId: doctor.id,
                dayOfWeek: a.dayOfWeek,
                startTime: a.startTime,
                endTime: a.endTime,
                slotDuration: a.slotDuration
            }))
        });

        return NextResponse.json({
            message: "Availability updated successfully"
        });

    } catch (error) {
        console.error("Availability error:", error);
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        );
    }
}

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

        const doctor = await prisma.doctorProfile.findUnique({
            where: { userId: user.id }
        });

        if (!doctor) {
            return NextResponse.json(
                { error: "Doctor not found" },
                { status: 404 }
            );
        }

        const res = await prisma.doctorAvailability.findMany({
            where: { doctorId: doctor.id }
        });

        return NextResponse.json(res, { status: 200 });

    } catch (error) {
        console.error("Error on getting Availability:", error);
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        );
    }
}