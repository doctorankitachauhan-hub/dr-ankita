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
    appointmentContexts: Contexts | null
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

export type Contexts = {
    id: string,
    reason: string,
    symptoms: string,
    notes: string,
    contextDocuments: ContextDoc[]
}

export type ContextDoc = {
    id: string,
    fileName: string,
    documentType: string,
    fileUrl: string,
    fileType: string,
}