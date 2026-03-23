import z from "zod";

export const AvailabilitySchema = z.object({
    availability: z.array(
        z.object({
            dayOfWeek: z.number().min(0).max(7),
            startTime: z.iso.datetime({ error: "Start time is required" }),
            endTime: z.iso.datetime({ error: "End time is required" }),
            slotDuration: z.number().min(5)
        })
    )
});