import { fromZonedTime, toZonedTime } from "date-fns-tz";

const IST = "Asia/Kolkata";

function createISTDate(date: Date, time: string): Date {
    const [hours, minutes] = time.split(":").map(Number);

    const local = new Date(date); // clone
    local.setHours(hours, minutes, 0, 0);

    return fromZonedTime(local, IST);
}

export function generateFromAvailability(
    availability: any[],
    totalDays: number,
    startDate: Date
) {
    const slots: { startTime: Date; endTime: Date }[] = [];

    for (let i = 0; i < totalDays; i++) {

        // ✅ FIX: create fresh date every loop
        const baseDate = new Date(startDate);
        baseDate.setDate(baseDate.getDate() + i);

        // convert to IST for day calculation
        const istDate = new Date(baseDate);
        const day = istDate.getDay();

        const rules = availability.filter((a) => a.dayOfWeek === day);
        if (!rules.length) continue;

        for (const rule of rules) {

            let start = createISTDate(baseDate, rule.startTime);
            const end = createISTDate(baseDate, rule.endTime);

            while (start < end) {
                const slotEnd = new Date(start.getTime() + rule.slotDuration * 60_000);

                if (slotEnd > end) break;

                slots.push({
                    startTime: new Date(start),
                    endTime: new Date(slotEnd),
                });

                start = slotEnd;
            }
        }
    }

    return slots;
}