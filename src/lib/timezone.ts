const FALLBACK_TIMEZONES = [
    "Asia/Kolkata", "Europe/London", "America/New_York", "America/Chicago",
    "America/Los_Angeles", "Asia/Dubai", "Asia/Singapore", "Australia/Sydney",
    "Europe/Berlin", "Asia/Tokyo", "Asia/Shanghai", "America/Sao_Paulo",
];

/** All IANA timezones supported by the runtime. Falls back to a short list on older engines. */
export function getAllTimeZones(): string[] {
    if (typeof Intl.supportedValuesOf === "function") {
        try {
            return Intl.supportedValuesOf("timeZone");
        } catch {
            /* fall through */
        }
    }
    return FALLBACK_TIMEZONES;
}

export function detectTimeZone(): string {
    try {
        return Intl.DateTimeFormat().resolvedOptions().timeZone || "Asia/Kolkata";
    } catch {
        return "Asia/Kolkata";
    }
}

export function formatTimeInZone(start: string, end: string, timeZone: string) {
    const opts: Intl.DateTimeFormatOptions = { hour: "2-digit", minute: "2-digit", timeZone };
    const startTime = new Date(start).toLocaleTimeString([], opts);
    const endTime = new Date(end).toLocaleTimeString([], opts);
    return `${startTime} - ${endTime}`;
}

export function getHourInZone(isoString: string, timeZone: string): number {
    const hourStr = new Intl.DateTimeFormat("en-US", { hour: "numeric", hour12: false, timeZone }).format(new Date(isoString));
    const hour = parseInt(hourStr, 10);
    return hour === 24 ? 0 : hour;
}

export function getZoneAbbreviation(timeZone: string): string {
    const parts = new Intl.DateTimeFormat("en-US", { timeZone, timeZoneName: "short" }).formatToParts(new Date());
    return parts.find((p) => p.type === "timeZoneName")?.value ?? timeZone;
}

/** e.g. "Asia / Kolkata (GMT+5:30)" — for a readable dropdown label */
export function getZoneDisplayLabel(timeZone: string): string {
    const offsetParts = new Intl.DateTimeFormat("en-US", { timeZone, timeZoneName: "shortOffset" }).formatToParts(new Date());
    const offset = offsetParts.find((p) => p.type === "timeZoneName")?.value ?? "";
    const readable = timeZone.replace(/_/g, " ").replace(/\//g, " / ");
    return `${readable} (${offset})`;
}