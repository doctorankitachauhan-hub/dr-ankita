import z from "zod";

export const slotSchema = z.object({
    slots: z.array(
        z.object({
            startTime: z.iso.datetime({ error: "Start time is required" }),
            endTime: z.iso.datetime({ error: "End time is required" })
        })
    ).min(1, "At least one slot is required")
});

export type SlotsSchemaType = z.infer<typeof slotSchema>