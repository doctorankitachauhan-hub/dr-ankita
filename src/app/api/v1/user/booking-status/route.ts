import { Role } from "@/generated/prisma/enums";
import { authorize } from "@/lib/authorize";
import { getUser } from "@/lib/get-user";
import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import z from "zod";

const orderIdSchema = z.object({
    orderId: z.string().min(1, "Order ID is required").trim(),
});

export async function GET(req: NextRequest) {
    try {
        const user = getUser(req);
        
        if (!user?.id) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const { success, message, status } = authorize(req, [Role.PATIENT, Role.DOCTOR]);
        if (!success) {
            return NextResponse.json({ error: message }, { status });
        }

        const { searchParams } = req.nextUrl
        const orderId = searchParams.get("orderId")?.trim();

        if (!orderId) {
            return NextResponse.json({ error: "Order ID is required" }, { status: 400 });
        }

        const parsed = orderIdSchema.safeParse({ orderId });
        if (!parsed.success) {
            return NextResponse.json(
                { error: z.prettifyError(parsed.error) },
                { status: 400 }
            );
        }

        const payment = await prisma.payment.findUnique({
            where: {
                razorpayOrderId: orderId,
            },
        });

        if (!payment) {
            return NextResponse.json({ error: "Payment not found" }, { status: 404 });
        }

        if (payment.userId !== user.id) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        if (payment.status === "SUCCESS") {
            return NextResponse.json({ status: "SUCCESS" });
        }

        if (payment.status === "PENDING") {
            return NextResponse.json({ status: "PENDING" });
        }

        return NextResponse.json({ status: "FAILED" });

    } catch (error) {
        console.log("Error while getting booking status:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }

}