import { Role } from "@/generated/prisma/enums";
import { authorize } from "@/lib/authorize";
import { getUser } from "@/lib/get-user";
import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import z from "zod";

const statusSchema = z.object({
    status: z.enum(["COMPLETED", "CANCELLED"]),
});

export async function POST(req: NextRequest, { params }: { params: Promise<{ appointmentId: string }> }) {
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

        const { appointmentId } = await params
        if (!appointmentId) {
            return NextResponse.json({ error: "Invalid request" }, { status: 400 })
        }

        const body = await req.json()
        const parsed = statusSchema.safeParse(body)
        if (!parsed.success) {
            return NextResponse.json({ error: z.prettifyError(parsed.error) });
        }

        const newStatus = parsed.data.status;
        console.log(newStatus);
        
        const appointment = await prisma.appointment.findUnique({
            where: { id: appointmentId },
        });

        if (!appointment) {
            return NextResponse.json(
                { error: "Appointment not found" },
                { status: 404 }
            );
        }

        if (appointment.status === "CANCELLED" || appointment.status === "COMPLETED") {
            return NextResponse.json(
                { error: `Appointment already ${appointment.status}` },
                { status: 400 }
            );
        }

        // if (appointment.status === newStatus ) {
        //     return NextResponse.json(
        //         { error: `Appointment already ${appointment.status}` },
        //         { status: 400 }
        //     );
        // }

        if (appointment.status !== "CONFIRMED") {
            return NextResponse.json(
                { error: "Only confirmed appointments can be updated" },
                { status: 400 }
            );
        }

        await prisma.appointment.update({
            where: { id: appointmentId },
            data: { status: newStatus },
        });

        return NextResponse.json({
            success: true,
            message: "Updated Successfully"
        }, { status: 200 });

    } catch (error) {
        console.log("Error while changinh Appointements status", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 })
    }
}