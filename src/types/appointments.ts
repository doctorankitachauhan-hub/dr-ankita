import { AppointmentStatus } from "@/generated/prisma/enums";

export type AppointmentResponse = {
    id: string;
    patientId: string;
    slotId: string;
    status: AppointmentStatus | string;

    reminder1Sent: boolean;
    reminder2Sent: boolean;

    createdAt: string;

    meeting: Meeting | null;
    patient: Patient;
};

export type Meeting = {
    id: string;
    appointmentId: string;
    provider: "GOOGLE_MEET" | string;
    meetingLink: string;
    googleEventId: string;
    startTime: string;
    endTime: string;
    createdAt: string;
};

export type Patient = {
    id: string;
    name: string;
    email: string;
    phone: string;
    dob: string | null;
    address: string | null;
};