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

        let start = new Date(
            `${currentDate.toISOString().split("T")[0]}T${rule.startTime}:00`
        );

        const end = new Date(
            `${currentDate.toISOString().split("T")[0]}T${rule.endTime}:00`
        );

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