import { SlotStatus } from "@/generated/prisma/enums";
import z from "zod";

export const slotSchema = z.object({
    slots: z.array(
        z.object({
            startTime: z.iso.datetime({ error: "Start time is required" }),
            endTime: z.iso.datetime({ error: "End time is required" })
        })
    ).min(1, "At least one slot is required")
});

export const autoSlotSchema = z.object({
    days: z.number().min(1, { error: "Minumim 1 day" }).max(30, { error: "Maximum 30 day only" })
})


export type SlotsSchemaType = z.infer<typeof slotSchema>

export const slotDetailsSchema = z.object({
    id: z.string(),
    status: z.enum(SlotStatus),
    startTime: z.date(),
    endTime: z.date(),

    appointment: z
        .object({
            id: z.string(),
            status: z.string(),

            meeting: z
                .object({
                    id: z.string(),
                    meetingLink: z.string()
                })
                .nullable(),

            patient: z
                .object({
                    id: z.string(),
                    name: z.string(),
                    email: z.string(),
                    phone: z.string()
                })
                .nullable()
        })
        .nullable()
});

export type SlotDetails = z.infer<typeof slotDetailsSchema>;

export type ContextDocument = {
    id: string;
    fileName: string | null;
    documentType: string;
    fileUrl: string;
    fileType: string;
};
export type AppointmentContext = {
    id: string;
    reason: string;
    symptoms?: string | null;
    notes?: string | null;
    contextDocuments: ContextDocument[];
};
export type Patient = {
    id: string;
    name: string;
    email: string;
    phone: string | null;
};
export type Meeting = {
    id: string;
    meetingLink: string;
};
export type Appointment = {
    id: string;
    status: "CONFIRMED" | "PENDING" | "CANCELLED" | "COMPLETED";
    meeting: Meeting | null;
    patient: Patient | null;
    appointmentContexts: AppointmentContext | null;
};
export type SlotResponse = {
    id: string;
    status: "AVAILABLE" | "BOOKED" | "BLOCKED" | "CANCELLED";
    startTime: Date;
    endTime: Date;
    appointment: Appointment | null;
};