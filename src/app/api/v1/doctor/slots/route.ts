import { Role } from "@/generated/prisma/enums";
import { authorize } from "@/lib/authorize";
import { getUser } from "@/lib/get-user";
import prisma from "@/lib/prisma";
import { slotSchema } from "@/types/slots";
import { NextRequest, NextResponse } from "next/server";
import z from "zod";

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

        const doctor = await prisma.doctorProfile.findUnique({
            where: { userId: user.id },
        });

        if (!doctor) {
            return NextResponse.json(
                { error: "Doctor profile not found" },
                { status: 404 }
            );
        }

        const body = await req.json();
        const parsed = slotSchema.safeParse(body);

        if (!parsed.success) {
            return NextResponse.json(
                { error: z.prettifyError(parsed.error) },
                { status: 400 }
            );
        }

        const { slots } = parsed.data;

        const formattedSlots = slots.map((slot) => ({
            doctorId: doctor.id,
            startTime: new Date(slot.startTime),
            endTime: new Date(slot.endTime),
        }));

        for (const slot of formattedSlots) {
            if (slot.startTime >= slot.endTime) {
                return NextResponse.json(
                    { error: "Start time must be before end time" },
                    { status: 400 }
                );
            }
        }

        const conflicts = await prisma.timeSlot.findFirst({
            where: {
                doctorId: doctor.id,
                OR: formattedSlots.map((slot) => ({
                    AND: [
                        { startTime: { lt: slot.endTime } },
                        { endTime: { gt: slot.startTime } },
                    ],
                })),
            },
        });

        if (conflicts) {
            return NextResponse.json(
                { error: "One or more slots overlap with existing slots" },
                { status: 409 }
            );
        }

        const createdSlots = await prisma.$transaction(
            formattedSlots.map((slot) =>
                prisma.timeSlot.create({
                    data: {
                        doctorId: doctor.id,
                        startTime: slot.startTime,  
                        endTime: slot.endTime,       
                    },
                })
            )
        );

        return NextResponse.json(
            { message: "Slots created successfully", data: createdSlots },
            { status: 201 }
        );
    } catch (error) {
        console.error("Error creating time slots:", error);
        return NextResponse.json(
            { error: "Something went wrong" },
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

        const { success, message, status } = authorize(req, [Role.DOCTOR, Role.PATIENT])
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
                // status: "AVAILABLE",
                // startTime: {
                //     gte: startOfDay,
                //     lte: endOfDay
                // }
            },
            orderBy: {
                startTime: "asc"
            },
            select: {
                id: true,
                startTime: true,
                endTime: true,
                status: true,
                appointment: {
                    include: {
                        patient: true
                    }
                }
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