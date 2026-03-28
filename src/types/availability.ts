import { z } from "zod";

const AvailabilityItemSchema = z.object({
  dayOfWeek: z.number().min(0).max(6),
  startTime: z.string(),
  endTime: z.string(),
  slotDuration: z.number().min(5),
}).refine(
  (data) => data.startTime < data.endTime,
  { message: "Start time must be before end time" }
)

export const AvailabilitySchema = z.array(AvailabilityItemSchema);
export type AvailabilityType = z.infer<typeof AvailabilityItemSchema>;