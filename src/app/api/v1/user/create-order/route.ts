import { Role } from "@/generated/prisma/enums";
import { authorize } from "@/lib/authorize";
import { getUser } from "@/lib/get-user";
import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import Razorpay from "razorpay";
import z from "zod";

const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_API_KEY!,
    key_secret: process.env.RAZORPAY_API_SECRET!,
});

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

            return NextResponse.json({
                name: user.name,
                email: user.email,
                orderId: existingPayment.razorpayOrderId,
                amount: existingPayment.amount,
                key: process.env.RAZORPAY_API_KEY,
            });
        }

        const amount = 500;

        const order = await razorpay.orders.create({
            amount: amount * 100,
            currency: "INR",
            receipt: `receipt_${slotId}`,
        });

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
                    razorpayOrderId: order.id,
                    slotId,
                    userId: user.id!,
                    contextId: context.id,
                },
            });
        });

        return NextResponse.json({
            name: user.name,
            email: user.email,
            orderId: order.id,
            amount,
            key: process.env.RAZORPAY_API_KEY,
        });

    } catch (error) {
        console.error("Error while creating order:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}