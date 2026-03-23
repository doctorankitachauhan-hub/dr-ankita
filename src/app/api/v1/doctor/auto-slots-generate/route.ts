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
                { error: "No availability found" },
                { status: 404 }
            );
        }

        const slots = generateFromAvailability(
            availability,
            parsed.data.days ?? 15
        );

        if (!slots.length) {
            return NextResponse.json(
                { error: "No slots generated" },
                { status: 400 }
            );
        }

        const existingSlots = await prisma.timeSlot.findMany({
            where: {
                doctorId: doctor.id,
                startTime: {
                    gte: new Date(),
                }
            }
        });

        const filteredSlots = slots.filter((newSlot) => {
            return !existingSlots.some((existing) => {
                return (
                    existing.startTime < newSlot.endTime &&
                    existing.endTime > newSlot.startTime
                );
            });
        });

        if (!filteredSlots.length) {
            return NextResponse.json(
                { error: "All slots already exist" },
                { status: 409 }
            );
        }

        await prisma.timeSlot.createMany({
            data: filteredSlots.map((s) => ({
                doctorId: doctor.id,
                startTime: s.startTime,
                endTime: s.endTime
            })),
            skipDuplicates: true
        });

        return NextResponse.json({
            message: "Slots generated successfully",
            count: filteredSlots.length
        });

    } catch (error) {
        console.log("Auto slot generation error", error);
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        );
    }
}