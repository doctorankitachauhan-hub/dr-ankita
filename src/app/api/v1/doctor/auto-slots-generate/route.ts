import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { Role } from "@/generated/prisma/enums";
import { z } from "zod";
import { getUser } from "@/lib/get-user";
import { authorize } from "@/lib/authorize";
import { autoSlotSchema } from "@/types/slots";
import { generateFromAvailability } from "@/lib/generate-recurring-slots";


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

        const body = await req.json()
        const parsed = autoSlotSchema.safeParse(body);

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
                { error: "Doctor profile not found" },
                { status: 404 }
            );
        }

        const availability = await prisma.doctorAvailability.findMany({
            where: { doctorId: doctor.id, isActive: true }
        });

        if (!availability.length) {
            return NextResponse.json(
                { error: "No availability is set." },
                { status: 404 }
            );
        }

        const today = new Date();
        today.setUTCHours(0, 0, 0, 0);

        const totalDays = parsed.data.days ?? 15;

        const generatedSlots = generateFromAvailability(
            availability,
            totalDays,
            today
        );

        if (!generatedSlots.length) {
            return NextResponse.json(
                { error: "No slots generated" },
                { status: 400 }
            );
        }

        const existingSlots = await prisma.timeSlot.findMany({
            where: {
                doctorId: doctor.id,
                startTime: { gte: today }
            }
        });


        const key = (s: { startTime: Date; endTime: Date }) =>
            `${s.startTime.toISOString()}_${s.endTime.toISOString()}`;

        const generatedMap = new Map(
            generatedSlots.map((s) => [key(s), s])
        );

        const existingMap = new Map(
            existingSlots.map((s) => [key(s), s])
        );

        const toCreate: typeof generatedSlots = [];
        const toDelete: typeof existingSlots = [];

        for (const [k, genSlot] of generatedMap) {
            if (!existingMap.has(k)) {
                toCreate.push(genSlot);
            }
        }

        for (const [k, existSlot] of existingMap) {
            if (!generatedMap.has(k)) {
                if (existSlot.status === "AVAILABLE") {
                    toDelete.push(existSlot);
                }
            }
        }

        await prisma.$transaction(async (tx) => {

            if (toDelete.length) {
                await tx.timeSlot.deleteMany({
                    where: {
                        id: { in: toDelete.map((s) => s.id) }
                    }
                });
            }

            if (toCreate.length) {
                await tx.timeSlot.createMany({
                    data: toCreate.map((s) => ({
                        doctorId: doctor.id,
                        startTime: s.startTime,
                        endTime: s.endTime
                    })),
                    skipDuplicates: true
                });
            }
        });

        return NextResponse.json({
            message: "Slots updated",
            created: toCreate.length,
            deleted: toDelete.length
        });

    } catch (error) {
        console.log("Auto slot generation error", error);
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        );
    }
}