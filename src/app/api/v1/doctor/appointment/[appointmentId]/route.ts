import { Role } from "@/generated/prisma/enums";
import { authorize } from "@/lib/authorize";
import { getUser } from "@/lib/get-user";
import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import z from "zod";
import Razorpay from "razorpay";

const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_API_KEY!,
    key_secret: process.env.RAZORPAY_API_SECRET!,
});

const statusSchema = z.object({
    status: z.enum(["COMPLETED", "CANCELLED"]),
});

export async function POST(
    req: NextRequest,
    { params }: { params: Promise<{ appointmentId: string }> }
) {
    try {
        const user = getUser(req);
        if (!user?.id) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const { success, message, status } = authorize(req, [Role.DOCTOR]);
        if (!success) {
            return NextResponse.json({ error: message }, { status });
        }

        const { appointmentId } = await params;
        if (!appointmentId) {
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

        const appointment = await prisma.appointment.findUnique({
            where: { id: appointmentId },
            include: {
                slot: {
                    include: { doctor: { select: { userId: true } } },
                },
                payment: {
                    where: { status: "SUCCESS" },
                    take: 1,
                },
                meeting: true,
            },
        });

        if (!appointment) {
            return NextResponse.json({ error: "Appointment not found" }, { status: 404 });
        }

        if (appointment.slot.doctor.userId !== user.id) {
            return NextResponse.json({ error: "Forbidden" }, { status: 403 });
        }

        if (appointment.status === "CANCELLED" || appointment.status === "COMPLETED") {
            return NextResponse.json(
                { error: `Appointment is already ${appointment.status.toLowerCase()}` },
                { status: 400 }
            );
        }

        if (appointment.status !== "CONFIRMED") {
            return NextResponse.json(
                { error: "Only confirmed appointments can be updated" },
                { status: 400 }
            );
        }

        if (newStatus === "COMPLETED") {
            await prisma.appointment.update({
                where: { id: appointmentId },
                data: { status: "COMPLETED" },
            });

            return NextResponse.json(
                { success: true, message: "Appointment marked as completed" },
                { status: 200 }
            );
        }

        const payment = appointment.payment[0] ?? null;

        if (payment?.transactionId) {
            try {
                await razorpay.payments.refund(payment.transactionId, {
                    speed: "normal",
                });
            } catch (refundErr: any) {
                console.error("Razorpay refund failed:", refundErr);
                return NextResponse.json(
                    { error: "Refund failed. Please try again or process it manually." },
                    { status: 502 }
                );
            }
            await Promise.all([
                prisma.appointment.update({
                    where: { id: appointmentId },
                    data: { status: "CANCELLED" },
                }),
                prisma.payment.update({
                    where: { id: payment.id },
                    data: { status: "REFUNDED" },
                }),
                prisma.timeSlot.update({
                    where: { id: appointment.slotId },
                    data: { status: "AVAILABLE" },
                }),
            ]);
        } else {
            console.warn(`No refundable payment for appointment ${appointmentId}`);

            await Promise.all([
                prisma.appointment.update({
                    where: { id: appointmentId },
                    data: { status: "CANCELLED" },
                }),
                prisma.timeSlot.update({
                    where: { id: appointment.slotId },
                    data: { status: "AVAILABLE" },
                }),
            ]);
        }

        return NextResponse.json(
            { success: true, message: "Appointment cancelled and refund initiated" },
            { status: 200 }
        );

    } catch (error) {
        console.error("Error while changing appointment status:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}