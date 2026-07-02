import { Role } from "@/generated/prisma/enums";
import { authorize } from "@/lib/authorize";
import { getUser } from "@/lib/get-user";
import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import z from "zod";
import { Cashfree, CFEnvironment } from "cashfree-pg";


const cashfree = new Cashfree(
    CFEnvironment.PRODUCTION,
    process.env.CASHFREE_APP_ID,
    process.env.CASHFREE_SECRET_KEY
);

const DocumentType = z.enum([
    "PRESCRIPTION",
    "LAB_REPORT",
    "SCAN_XRAY",
    "DISCHARGE_SUMMARY",
    "OTHER",
]);

const ContextFileSchema = z.object({
    fileName: z.string().min(1),
    fileUrl: z.url("Invalid file URL"),
    fileType: z.string().min(1),
    fileSize: z.number().int().positive(),
    documentType: DocumentType,
});

const CreateOrderSchema = z.object({
    slotId: z.cuid({ error: "Invalid Slot Selection" }).trim(),
    reason: z.string().min(1, "Reason is required").max(1000).trim(),
    symptoms: z.string().max(1000).trim().optional(),
    notes: z.string().max(1000).trim().optional(),
    files: z.array(ContextFileSchema).max(10).optional().default([]),
});

export async function POST(req: NextRequest) {
    try {
        const user = getUser(req);
        if (!user || !user.id) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const { success, message, status } = authorize(req, [Role.PATIENT, Role.DOCTOR]);
        if (!success) {
            return NextResponse.json({ error: message }, { status });
        }

        const validUser = await prisma.user.findUnique({ where: { id: user.id } });
        if (!validUser) {
            return NextResponse.json({ error: "Invalid user" }, { status: 404 });
        }

        const body = await req.json();
        const parsed = CreateOrderSchema.safeParse(body);
        if (!parsed.success) {
            return NextResponse.json(
                { error: z.prettifyError(parsed.error) },
                { status: 400 }
            );
        }

        const { slotId, reason, symptoms, notes, files } = parsed.data;

        const slot = await prisma.timeSlot.findUnique({
            where: { id: slotId },
        });

        if (!slot || slot.status !== "AVAILABLE") {
            return NextResponse.json({ error: "Slot not available" }, { status: 400 });
        }

        const existingPayment = await prisma.payment.findFirst({
            where: {
                slotId,
                userId: user.id,
                status: { in: ["PENDING", "SUCCESS"] },
            },
            include: { context: true },
        });

        if (existingPayment?.status === "SUCCESS") {
            return NextResponse.json(
                { error: "You have already booked this slot" },
                { status: 409 }
            );
        }

        if (existingPayment?.status === "PENDING") {
            if (existingPayment.contextId) {
                await prisma.appointmentContext.update({
                    where: { id: existingPayment.contextId },
                    data: {
                        reason,
                        symptoms,
                        notes,
                        contextDocuments: {
                            deleteMany: {},
                            create: files.map((f) => ({
                                uploadedById: user.id!,
                                fileName: f.fileName,
                                fileUrl: f.fileUrl,
                                fileType: f.fileType,
                                fileSize: f.fileSize,
                                documentType: f.documentType,
                            })),
                        },
                    },
                });
            }

            const cfOrder = await cashfree.PGFetchOrder(
                existingPayment.gatewayOrderId
            );

            return NextResponse.json({
                name: user.name,
                email: user.email,
                orderId: existingPayment.gatewayOrderId,
                paymentSessionId: cfOrder.data.payment_session_id,
                amount: existingPayment.amount,
            });
        }

        const amount = 899;
        const orderId = `appt_${slotId}_${Date.now()}`;

        const cfResponse = await cashfree.PGCreateOrder({
            order_id: orderId,
            order_amount: amount,
            order_currency: "INR",
            customer_details: {
                customer_id: user.id!,
                customer_name: user.name || "Patient",
                customer_email: user.email!,
                customer_phone: validUser.phone ?? "9999999999",
            },
        });
        const paymentSessionId = cfResponse.data.payment_session_id;

        await prisma.$transaction(async (tx) => {
            const context = await tx.appointmentContext.create({
                data: {
                    userId: user.id!,
                    reason,
                    symptoms,
                    notes,
                    contextDocuments: {
                        create: files.map((f) => ({
                            uploadedById: user.id!,
                            fileName: f.fileName,
                            fileUrl: f.fileUrl,
                            fileType: f.fileType,
                            fileSize: f.fileSize,
                            documentType: f.documentType,
                        })),
                    },
                },
            });

            await tx.payment.create({
                data: {
                    amount,
                    status: "PENDING",
                    gatewayOrderId: orderId,
                    slotId,
                    userId: user.id!,
                    contextId: context.id,
                },
            });
        });

        return NextResponse.json({
            name: user.name,
            email: user.email,
            orderId,
            amount,
            paymentSessionId
        });

    } catch (error) {
        console.error("Error while creating order:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}