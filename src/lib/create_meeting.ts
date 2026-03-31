import { calendar } from "@/lib/googleCalendar";

type Props = {
    startTime: string,
    endTime: string,
    patientEmail: string,
    doctorEmail: string,
}

export async function createGoogleMeet({ startTime, endTime, patientEmail, doctorEmail }: Props) {
    const event = await calendar.events.insert({
        calendarId: "primary",
        conferenceDataVersion: 1,
        requestBody: {
            summary: "Doctor Ankita Chauhan Consultation",
            description: "Ankita Chauhan Online consultation",
            start: {
                dateTime: startTime
            },
            end: {
                dateTime: endTime
            },
            attendees: [
                { email: patientEmail },
                { email: doctorEmail }
            ],
            conferenceData: {
                createRequest: {
                    requestId: "meet-" + Date.now(),
                    conferenceSolutionKey: {
                        type: "hangoutsMeet"
                    }
                }
            },
            reminders: {
                useDefault: false,
                overrides: [
                    { method: "email", minutes: 60 },
                    { method: "popup", minutes: 10 }
                ]
            }
        }
    });

    const meetLink =
        event.data.conferenceData?.entryPoints?.[0]?.uri;

    return {
        meetLink,
        eventId: event.data.id
    };
}