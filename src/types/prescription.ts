import { PrescriptionType } from "@/generated/prisma/enums";
import z from "zod";

export const PrescriptionSchema = z.object({
    userId: z.cuid({ error: "Invalid User" }).trim(),
    appointmentId: z.cuid({ error: "Invalid Appointment" }),
    prescription: z.string({ error: "Prescription is required" }).min(2).trim(),
    type: z.string().default(PrescriptionType.FINAL)
})

export type PrescriptionSchemaType = z.infer<typeof PrescriptionSchema>