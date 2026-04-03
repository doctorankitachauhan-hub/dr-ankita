import { PrescriptionType } from "@/generated/prisma/enums";

export type ContextDocument = {
    id: string;
    contextId: string;
    uploadedById: string;
    fileName: string;
    fileUrl: string;
    fileType: string;
    fileSize: number;
    documentType: "PRESCRIPTION" | "LAB_REPORT" | "SCAN_XRAY" | "DISCHARGE_SUMMARY" | "OTHER";
    createdAt: string;
};

export type AppointmentContext = {
    id: string;
    userId: string;
    appointmentId: string;
    reason: string;
    symptoms: string | null;
    notes: string | null;
    createdAt: string;
    updatedAt: string;
    contextDocuments: ContextDocument[];
};

export type Payment = {
    id: string;
    appointmentId: string;
    contextId: string;
    amount: number;
    status: "PENDING" | "SUCCESS" | "FAILED" | "REFUNDED";
    transactionId: string;
    razorpayOrderId: string;
    slotId: string;
    userId: string;
    createdAt: string;
};

export type Meeting = {
    id: string;
    appointmentId: string;
    provider: "GOOGLE_MEET";
    meetingLink: string;
    googleEventId: string;
    startTime: string;
    endTime: string;
    createdAt: string;
};

export type Slot = {
    id: string;
    startTime: string;
    endTime: string;
};

export type Appointment = {
    id: string;
    patientId: string;
    slotId: string;
    status: "CONFIRMED" | "PENDING" | "CANCELLED" | "COMPLETED";
    reminder1Sent: boolean;
    reminder2Sent: boolean;
    createdAt: string;
    updatedAt: string;

    payment: Payment[];
    meeting: Meeting | null;
    appointmentContexts: AppointmentContext | null;
    slot: Slot;
    prescriptions: Prescriptions[] | []
};

export type Prescriptions = {
    id: string,
    issuedAt: string,
    type: PrescriptionType,
    pdfUrl: string,
    content: string
}

export type Patient = {
    id: string;
    name: string;
    email: string;
    phone: string | null;
    appointments: Appointment[];
};

export type PatientsResponse = {
    patient: Patient[];

    page: number;
    limit: number;
    totalPatient: number;
    pageCount: number;

    hasMore: boolean;
    nextPage: number | null;
    prevPage: number | null;
};