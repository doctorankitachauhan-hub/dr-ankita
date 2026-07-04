import { fromZonedTime } from "date-fns-tz";

export const IST = "Asia/Kolkata";

function pad(n: number) {
    return String(n).padStart(2, "0");
}

export function getZonedParts(date: Date, timeZone: string) {
    const dateParts = new Intl.DateTimeFormat("en-CA", {
        timeZone,
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
    }).formatToParts(date);

    const map: Record<string, string> = {};
    dateParts.forEach((p) => (map[p.type] = p.value));

    const weekday = new Intl.DateTimeFormat("en-US", { timeZone, weekday: "long" }).format(date);
    const dayMap: Record<string, number> = {
        Sunday: 0, Monday: 1, Tuesday: 2, Wednesday: 3, Thursday: 4, Friday: 5, Saturday: 6,
    };

    return {
        year: Number(map.year),
        month: Number(map.month),
        day: Number(map.day),
        dayOfWeek: dayMap[weekday],
    };
}

/** Builds the true UTC instant for a given IST calendar date + "HH:mm" wall-clock time. */
export function createISTDate(year: number, month: number, day: number, time: string): Date {
    const [hours, minutes] = time.split(":").map(Number);
    const naiveIso = `${year}-${pad(month)}-${pad(day)}T${pad(hours)}:${pad(minutes)}:00`;
    return fromZonedTime(naiveIso, IST);
}

export function getISTDateString(date: Date = new Date()): string {
    const { year, month, day } = getZonedParts(date, IST);
    return `${year}-${pad(month)}-${pad(day)}`;
}