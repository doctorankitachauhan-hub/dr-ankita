import { AppointmentStatus, PrescriptionType } from "@/generated/prisma/enums";

export interface ContextDocument {
    id: string;
    contextId: string;
    uploadedById: string;
    fileName: string;
    fileUrl: string;
    fileType: string;
    fileSize: number;
    documentType: DocumentType;
    createdAt: string;
}

export interface Slot {
    id: string;
    startTime: string;
    endTime: string;
    status: string;
}

export interface Prescription {
    id: string;
    type: PrescriptionType;
    issuedAt: string;
    pdfUrl: string | null;
}

export interface Appointment {
    id: string;
    status: AppointmentStatus;
    slot: Slot;
    prescriptions: Prescription[];
}

export interface MedicalRecord {
    id: string;
    userId: string;
    appointmentId: string;
    reason: string;
    symptoms: string | null;
    notes: string | null;
    createdAt: string;
    updatedAt: string;
    appointment: Appointment;
    contextDocuments: ContextDocument[];
}