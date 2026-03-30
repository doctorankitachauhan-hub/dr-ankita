type EmailProps = {
    doctorName: string;
    startTime: string;
    endTime: string;
    meetLink: string;
};

export function generateICS({
    doctorName,
    startTime,
    endTime,
    meetLink,
}: EmailProps) {
    const start = new Date(startTime)
        .toISOString()
        .replace(/[-:]/g, "")
        .split(".")[0];

    const end = new Date(endTime)
        .toISOString()
        .replace(/[-:]/g, "")
        .split(".")[0];

    const uid = `${Date.now()}@drankitachauhan.com`;
    const dtstamp = new Date()
        .toISOString()
        .replace(/[-:]/g, "")
        .split(".")[0];

    return `BEGIN:VCALENDAR
VERSION:2.0
CALSCALE:GREGORIAN
METHOD:REQUEST
BEGIN:VEVENT
UID:${uid}
DTSTAMP:${dtstamp}Z
SUMMARY:Doctor Consultation with Dr. ${doctorName}
DTSTART:${start}Z
DTEND:${end}Z
DESCRIPTION:Online consultation with Dr. ${doctorName}
LOCATION:${meetLink}
STATUS:CONFIRMED
END:VEVENT
END:VCALENDAR`;
}