import { Role } from "@/generated/prisma/enums";
import { authorize } from "@/lib/authorize";
import { getUser } from "@/lib/get-user";
import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import z from "zod";

const statusSchema = z.object({
    status: z.enum(["AVAILABLE", "BLOCKED"], { error: "Status must be AVAILABLE or BLOCKED" }),
});

export async function POST(req: NextRequest, { params }: { params: Promise<{ slot_id: string }> }) {
    try {
        const user = getUser(req);
        if (!user?.id) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const { success, message, status } = authorize(req, [Role.DOCTOR]);
        if (!success) {
            return NextResponse.json({ error: message }, { status });
        }

        const { slot_id } = await params;
        if (!slot_id) {
            return NextResponse.json({ error: "Invalid request" }, { status: 400 });
        }

        const body = await req.json();
        const parsed = statusSchema.safeParse(body);
        if (!parsed.success) {
            return NextResponse.json(
                { error: z.prettifyError(parsed.error) },
                { status: 400 }
            );
        }

        const newStatus = parsed.data.status;

        const slot = await prisma.timeSlot.findUnique({
            where: { id: slot_id },
            select: {
                id: true,
                status: true,
                doctor: { select: { userId: true } },
            },
        });

        if (!slot) {
            return NextResponse.json({ error: "Slot not found" }, { status: 404 });
        }

        if (slot.doctor.userId !== user.id) {
            return NextResponse.json({ error: "Forbidden" }, { status: 403 });
        }

        if (slot.status === "BOOKED") {
            return NextResponse.json(
                { error: "Slot has an active patient booking. Cancel the appointment first." },
                { status: 400 }
            );
        }

        if (slot.status === "CANCELLED") {
            return NextResponse.json(
                { error: "Cancelled slots cannot be modified." },
                { status: 400 }
            );
        }

        if (slot.status === newStatus) {
            return NextResponse.json(
                { error: `Slot is already ${newStatus.toLowerCase()}` },
                { status: 400 }
            );
        }

        await prisma.timeSlot.update({
            where: { id: slot_id },
            data: { status: newStatus },
        });

        const action = newStatus === "BLOCKED" ? "blocked" : "unblocked";

        return NextResponse.json(
            { success: true, message: `Slot ${action} successfully` },
            { status: 200 }
        );

    } catch (error) {
        console.error("Error while changing slot status:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}