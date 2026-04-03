import z from "zod";

export const PrescriptionSchema = z.object({
    userId: z.cuid({ error: "Invalid User" }).trim(),
    appointmentId: z.cuid({ error: "Invalid Appointment" }),
    prescription: z.string({ error: "Prescription is required" }).min(2).trim()
})

export type PrescriptionType = z.infer<typeof PrescriptionSchema>