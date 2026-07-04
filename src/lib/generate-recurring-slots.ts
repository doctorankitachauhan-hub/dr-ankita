import { getZonedParts, createISTDate, IST } from "@/lib/ist-time";

export function generateFromAvailability(
    availability: { dayOfWeek: number; startTime: string; endTime: string; slotDuration: number }[],
    totalDays: number,
    startDate: Date // must be the UTC instant representing midnight IST
) {
    const slots: { startTime: Date; endTime: Date }[] = [];
    const DAY_MS = 24 * 60 * 60 * 1000;

    for (let i = 0; i < totalDays; i++) {
        // IST has no DST, so adding whole days in UTC ms is always exact.
        const dayInstant = new Date(startDate.getTime() + i * DAY_MS);
        const { year, month, day, dayOfWeek } = getZonedParts(dayInstant, IST);

        const rules = availability.filter((a) => a.dayOfWeek === dayOfWeek);
        if (!rules.length) continue;

        for (const rule of rules) {
            let start = createISTDate(year, month, day, rule.startTime);
            const end = createISTDate(year, month, day, rule.endTime);

            while (start < end) {
                const slotEnd = new Date(start.getTime() + rule.slotDuration * 60_000);
                if (slotEnd > end) break;

                slots.push({ startTime: new Date(start), endTime: slotEnd });
                start = slotEnd;
            }
        }
    }

    return slots;
}