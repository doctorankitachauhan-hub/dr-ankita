import { z } from "zod";

export const AvailabilitySchema = z.object({
  availability: z.array(
    z.object({
      dayOfWeek: z.number().min(0).max(6),
      startTime: z.string(),
      endTime: z.string(),
      slotDuration: z.number().min(5)
    })
  )
});