function createISTDate(date: Date, time: string) {
    const [hours, minutes] = time.split(":").map(Number);

    const d = new Date(date);
    d.setHours(hours, minutes, 0, 0);

    return d;
}

export function generateFromAvailability(availability: any[], totalDays: number) {
    const slots = [];
    const today = new Date();

    for (let i = 0; i < totalDays; i++) {
        const currentDate = new Date();
        currentDate.setDate(today.getDate() + i);

        const day = currentDate.getDay();

        const rule = availability.find(
            (a) => a.dayOfWeek === day && a.isActive
        );

        if (!rule) continue;

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

    return slots;
}