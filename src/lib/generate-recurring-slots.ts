import { fromZonedTime } from "date-fns-tz";

function createISTDate(date: Date, time: string) {
    const dateStr = date.toISOString().split("T")[0];
    return fromZonedTime(`${dateStr} ${time}`, "Asia/Kolkata");
}

export function generateFromAvailability(
    availability: any[],
    totalDays: number,
    startDate: Date
) {
    const slots = [];

    for (let i = 0; i < totalDays; i++) {
        const currentDate = new Date(startDate);
        currentDate.setDate(startDate.getDate() + i);

        const day = currentDate.getDay(); 
        
        const rules = availability.filter(
            (a) => a.dayOfWeek === day
        );

        if (!rules.length) continue;

        for (const rule of rules) {
            let start = createISTDate(currentDate, rule.startTime);
            const end = createISTDate(currentDate, rule.endTime);

            while (start < end) {
                const slotEnd = new Date(
                    start.getTime() + rule.slotDuration * 60000
                );

                if (slotEnd > end) break;

                slots.push({
                    startTime: new Date(start),
                    endTime: new Date(slotEnd)
                });

                start = slotEnd;
            }
        }
    }

    return slots;
}