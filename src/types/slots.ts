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