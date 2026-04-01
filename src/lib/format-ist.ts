import { toZonedTime, format, fromZonedTime } from "date-fns-tz";

const IST = "Asia/Kolkata";

/** "09:00 AM" */
export function toISTTime(utcDate: string | Date): string {
    return format(toZonedTime(new Date(utcDate), IST), "hh:mm a", { timeZone: IST });
}

/** "01 Apr 2026" */
export function toISTDate(utcDate: string | Date): string {
    return format(toZonedTime(new Date(utcDate), IST), "dd MMM yyyy", { timeZone: IST });
}

/** "01 Apr 2026, 09:00 AM" */
export function toISTDateTime(utcDate: string | Date): string {
    return format(
        toZonedTime(new Date(utcDate), IST),
        "dd MMM yyyy, hh:mm a",
        { timeZone: IST }
    );
}

/** "09:00 AM – 09:45 AM" */
export function toISTRange(start: string | Date, end: string | Date): string {
    return `${toISTTime(start)} – ${toISTTime(end)}`;
}

export function convertToUTC(date: Date, time: string) {
    const [hours, minutes] = time.split(":").map(Number);

    const local = new Date(date);
    local.setHours(hours, minutes, 0, 0);

    return fromZonedTime(local, "Asia/Kolkata");
}