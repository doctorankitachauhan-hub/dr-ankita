import { Role } from "@/generated/prisma/enums";
import { authorize } from "@/lib/authorize";
import { getUser } from "@/lib/get-user";
import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import z from "zod";


const Event_Id = z.object({
    eventId: z.cuid({ error: "Invalid event id" }).trim()
})

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
        const parsed = Event_Id.safeParse(body);
        if (!parsed.success) {
            return NextResponse.json({ error: z.prettifyError(parsed.error) })
        }
        const id = parsed.data.eventId.trim()

        const slot = await prisma.timeSlot.findFirst({
            where: {
                id,
                doctor: {
                    userId: user.id
                }
            },
            select: {
                id: true,
                status: true,
                startTime: true,
                endTime: true,
                appointment: {
                    where: {
                        status: { in: ["CONFIRMED"] },
                    },
                    select: {
                        id: true,
                        status: true,
                        meeting: {
                            select: {
                                id: true,
                                meetingLink: true,
                            }
                        },
                        patient: {
                            select: {
                                id: true,
                                name: true,
                                email: true,
                                phone: true
                            }
                        }
                    }
                }
            }
        })

        if (!slot) {
            return NextResponse.json(
                { error: "Invalid event" },
                { status: 404 }
            );
        }
        const activeAppointment = slot.appointment[0] ?? null;

        const response = {
            id: slot.id,
            status: slot.status,
            startTime: slot.startTime,
            endTime: slot.endTime,
            appointment: activeAppointment
                ? {
                    id: activeAppointment.id,
                    status: activeAppointment.status,
                    meeting: activeAppointment.meeting
                        ? {
                            id: activeAppointment.meeting.id,
                            meetingLink: activeAppointment.meeting.meetingLink
                        }
                        : null,

                    patient: activeAppointment.patient
                        ? {
                            id: activeAppointment.patient.id,
                            name: activeAppointment.patient.name,
                            email: activeAppointment.patient.email,
                            phone: activeAppointment.patient.phone
                        }
                        : null
                }
                : null
        };

        return NextResponse.json({
            message: "Slot fetched successfully",
            data: response
        });

    } catch (error) {
        console.log("Error while fetching event slots", error);
        return NextResponse.json(
            { error: "Something went wrong...!!" },
            { status: 500 }
        )
    }
}