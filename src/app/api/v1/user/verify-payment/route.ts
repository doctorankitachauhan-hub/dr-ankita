import { Role } from "@/generated/prisma/enums";
import { authorize } from "@/lib/authorize";
import { createGoogleMeet } from "@/lib/create_meeting";
import { getUser } from "@/lib/get-user";
import prisma from "@/lib/prisma";
import crypto from "crypto";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        const user = getUser(req);

        if (!user?.id) {
            return NextResponse.json(
                { error: "Unauthorized" },
                { status: 401 }
            );
        }
        const { success, message, status } = authorize(req, [Role.PATIENT, Role.DOCTOR])
        if (!success) {
            return NextResponse.json({ error: message }, { status })
        }

        const body = await req.json();

        const {
            razorpay_order_id,
            razorpay_payment_id,
            razorpay_signature,
        } = body;

        const generatedSignature = crypto
            .createHmac("sha256", process.env.RAZORPAY_API_SECRET!)
            .update(razorpay_order_id + "|" + razorpay_payment_id)
            .digest("hex");

        if (generatedSignature !== razorpay_signature) {
            return Response.json({ error: "Invalid payment" }, { status: 400 });
        }
        const payment = await prisma.payment.findUnique({
            where: { razorpayOrderId: razorpay_order_id },
            include: {
                appointment: {
                    include: {
                        slot: true,
                        patient: true,
                    },
                },
            },
        });

        if (!payment) {
            return Response.json({ error: "Payment not found" }, { status: 404 });
        }

        await prisma.payment.update({
            where: { id: payment.id },
            data: {
                status: "SUCCESS",
                transactionId: razorpay_payment_id,
            },
        });

        await prisma.timeSlot.update({
            where: { id: payment.slotId },
            data: { status: "BOOKED" },
        });

        await prisma.appointment.update({
            where: { id: payment.appointmentId },
            data: { status: "CONFIRMED" },
        });

        const meet = await createGoogleMeet({
            startTime: payment.appointment.slot.startTime.toISOString(),
            endTime: payment.appointment.slot.endTime.toISOString(),
            patientEmail: payment.appointment.patient.email,
            doctorEmail: "prathumjirai@gmail.com",
        });

        await prisma.meeting.create({
            data: {
                appointmentId: payment.appointmentId,
                meetingLink: meet.meetLink!,
                googleEventId: meet.eventId!,
                startTime: payment.appointment.slot.startTime,
                endTime: payment.appointment.slot.endTime,
            },
        });

        return Response.json({ success: true });

    } catch (error) {
        console.log("Error while verifying Payment", error);
        return NextResponse.json({ error: "Something went wrong" }, { status: 500 })
    }
}