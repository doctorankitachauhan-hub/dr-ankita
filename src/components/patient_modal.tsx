import { Appointment, ContextDocument, Patient } from "@/types/patient";
import React, { useEffect } from "react";
import { PatientAvatar } from "./patient_grid";
interface PatientModalProps {
    patient: Patient;
    onClose: () => void;
}

function SectionTitle({ children }: { children: React.ReactNode }) {
    return (
        <div
            style={{
                fontSize: 11,
                fontWeight: 500,
                color: "var(--color-text-secondary)",
                textTransform: "uppercase",
                letterSpacing: "0.06em",
                margin: "1.25rem 0 10px",
            }}
        >
            {children}
        </div>
    );
}

interface InfoCellProps {
    label: string;
    value: string;
}

function InfoCell({ label, value }: InfoCellProps) {
    return (
        <div
            style={{
                background: "var(--color-background-secondary, #f9fafb)",
                borderRadius: 8,
                padding: "10px 12px",
            }}
        >
            <div
                style={{
                    fontSize: 11,
                    color: "var(--color-text-secondary)",
                    marginBottom: 3,
                }}
            >
                {label}
            </div>
            <div
                style={{
                    fontSize: 13,
                    fontWeight: 500,
                    color: "var(--color-text-primary)",
                    wordBreak: "break-all",
                }}
            >
                {value}
            </div>
        </div>
    );
}

export function PatientModal({ patient, onClose }: PatientModalProps) {
    const totalPaid = patient.appointments.reduce(
        (sum, a) => sum + (a.payment[0]?.amount ?? 0),
        0
    );

    // close on Escape
    useEffect(() => {
        const handler = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose();
        };
        window.addEventListener("keydown", handler);
        return () => window.removeEventListener("keydown", handler);
    }, [onClose]);

    // prevent body scroll
    useEffect(() => {
        document.body.style.overflow = "hidden";
        return () => {
            document.body.style.overflow = "";
        };
    }, []);

    return (
        <div
            onClick={onClose}
            role="dialog"
            aria-modal="true"
            style={{
                position: "fixed",
                inset: 0,
                background: "rgba(0,0,0,0.45)",
                zIndex: 999,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: "1rem",
            }}
        >
            <div
                onClick={(e) => e.stopPropagation()}
                style={{
                    background: "var(--color-background-primary, #fff)",
                    borderRadius: 16,
                    border: "0.5px solid var(--color-border-tertiary, #e5e7eb)",
                    width: "100%",
                    maxWidth: 620,
                    maxHeight: "90vh",
                    overflowY: "auto",
                    padding: "1.5rem",
                }}
            >
                {/* Header */}
                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 14,
                        marginBottom: "1.25rem",
                    }}
                >
                    <PatientAvatar name={patient.name} size={52} fontSize={17} />
                    <div>
                        <div
                            style={{
                                fontSize: 17,
                                fontWeight: 500,
                                color: "var(--color-text-primary)",
                            }}
                        >
                            {patient.name}
                        </div>
                        <div
                            style={{
                                fontSize: 13,
                                color: "var(--color-text-secondary)",
                                marginTop: 2,
                            }}
                        >
                            {patient.email}
                        </div>
                    </div>
                    <button
                        onClick={onClose}
                        aria-label="Close modal"
                        style={{
                            marginLeft: "auto",
                            width: 30,
                            height: 30,
                            borderRadius: "50%",
                            border: "0.5px solid var(--color-border-tertiary, #e5e7eb)",
                            background: "transparent",
                            cursor: "pointer",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontSize: 14,
                            color: "var(--color-text-secondary)",
                        }}
                    >
                        ✕
                    </button>
                </div>

                {/* Contact info */}
                <SectionTitle>Contact info</SectionTitle>
                <div
                    style={{
                        display: "grid",
                        gridTemplateColumns: "1fr 1fr",
                        gap: 8,
                        marginBottom: 4,
                    }}
                >
                    <InfoCell label="Email" value={patient.email} />
                    <InfoCell label="Phone" value={patient.phone ?? ""} />
                    <InfoCell
                        label="Total appointments"
                        value={String(patient.appointments.length)}
                    />
                    <InfoCell
                        label="Total paid"
                        value={`₹${totalPaid.toLocaleString("en-IN")}`}
                    />
                </div>

                {/* Appointments */}
                <SectionTitle>
                    Appointments ({patient.appointments.length})
                </SectionTitle>
                {patient.appointments.map((appt, i) => (
                    <AppointmentCard key={appt.id} appointment={appt} index={i} />
                ))}
            </div>
        </div>
    );
}


interface AppointmentCardProps {
    appointment: Appointment;
    index: number;
}

interface InfoRowProps {
    label: string;
    value: React.ReactNode;
    noBorder?: boolean;
}

function InfoRow({ label, value, noBorder = false }: InfoRowProps) {
    return (
        <div
            style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "baseline",
                padding: "5px 0",
                borderBottom: noBorder
                    ? "none"
                    : "0.5px solid var(--color-border-tertiary, #e5e7eb)",
                fontSize: 13,
                gap: 12,
            }}
        >
            <span style={{ color: "var(--color-text-secondary)", flexShrink: 0 }}>
                {label}
            </span>
            <span
                style={{
                    color: "var(--color-text-primary)",
                    fontWeight: 500,
                    textAlign: "right",
                }}
            >
                {value}
            </span>
        </div>
    );
}

function PaymentRow({ payment }: { payment: Appointment["payment"][0] }) {
    return (
        <div
            style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "8px 10px",
                background: "var(--color-background-secondary, #f9fafb)",
                borderRadius: 8,
                marginTop: 10,
            }}
        >
            <div>
                <div
                    style={{
                        fontSize: 11,
                        color: "var(--color-text-secondary)",
                        marginBottom: 2,
                    }}
                >
                    Payment
                </div>
                <div style={{ fontSize: 11, color: "var(--color-text-secondary)" }}>
                    {payment.transactionId}
                </div>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <StatusBadge status={payment.status} />
                <span
                    style={{
                        fontSize: 15,
                        fontWeight: 500,
                        color: "var(--color-text-primary)",
                    }}
                >
                    ₹{payment.amount.toLocaleString("en-IN")}
                </span>
            </div>
        </div>
    );
}

export function AppointmentCard({ appointment, index }: AppointmentCardProps) {
    const ctx = appointment.appointmentContexts;
    const payment = appointment.payment[0];

    return (
        <div
            style={{
                border: "0.5px solid var(--color-border-tertiary, #e5e7eb)",
                borderRadius: 10,
                padding: 14,
                marginBottom: 10,
            }}
        >
            {/* Header */}
            <div
                style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    marginBottom: 12,
                }}
            >
                <span
                    style={{
                        fontWeight: 500,
                        fontSize: 14,
                        color: "var(--color-text-primary)",
                    }}
                >
                    Appointment {index + 1}
                </span>
                <StatusBadge status={appointment.status} />
            </div>

            <InfoRow label="Date" value={formatDate(appointment.slot.startTime)} />
            <InfoRow label="End time" value={formatDate(appointment.slot.endTime)} />
            <InfoRow label="Reason" value={ctx?.reason} />
            <InfoRow label="Symptoms" value={ctx?.symptoms} />
            <InfoRow label="Notes" value={ctx?.notes} />
            <InfoRow
                label="Meeting"
                noBorder
                value={
                    <a
                        href={appointment?.meeting?.meetingLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                            color: "var(--color-text-info, #1d4ed8)",
                            fontSize: 12,
                            textDecoration: "none",
                        }}
                    >
                        {appointment?.meeting?.meetingLink.replace("https://", "")}
                    </a>
                }
            />

            {payment && <PaymentRow payment={payment} />}

            <DocumentList documents={ctx?.contextDocuments ?? null} />
        </div>
    );
}

interface StatusBadgeProps {
    status: string;
}

export function StatusBadge({ status }: StatusBadgeProps) {
    const isSuccess =
        status === "SUCCESS" || status === "CONFIRMED" || status === "PAID";

    return (
        <span
            style={{
                fontSize: 11,
                fontWeight: 500,
                padding: "2px 9px",
                borderRadius: 20,
                background: isSuccess
                    ? "var(--color-background-success, #f0fdf4)"
                    : "var(--color-background-warning, #fffbeb)",
                color: isSuccess
                    ? "var(--color-text-success, #166534)"
                    : "var(--color-text-warning, #92400e)",
            }}
        >
            {status}
        </span>
    );
}

interface DocTypeBadgeProps {
    fileType: string;
}

export function DocTypeBadge({ fileType }: DocTypeBadgeProps) {
    const isPdf = fileType === "application/pdf";
    return (
        <span
            style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                width: 26,
                height: 26,
                borderRadius: 4,
                fontSize: 9,
                fontWeight: 600,
                flexShrink: 0,
                background: isPdf ? "#fee2e2" : "#dbeafe",
                color: isPdf ? "#991b1b" : "#1e40af",
            }}
        >
            {isPdf ? "PDF" : "IMG"}
        </span>
    );
}

function formatDate(iso: string): string {
    const d = new Date(iso);
    return (
        d.toLocaleDateString("en-IN", {
            day: "numeric",
            month: "short",
            year: "numeric",
        }) +
        " · " +
        d.toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" })
    );
}

interface DocumentListProps {
    documents: ContextDocument[] | null;
}

export function DocumentList({ documents }: DocumentListProps) {
    if (documents?.length === 0) return null;

    return (
        <div
            style={{
                marginTop: 10,
                paddingTop: 10,
                borderTop: "0.5px solid var(--color-border-tertiary, #e5e7eb)",
            }}
        >
            <div
                style={{
                    fontSize: 12,
                    color: "var(--color-text-secondary)",
                    marginBottom: 6,
                }}
            >
                Documents ({documents?.length})
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                {documents?.map((doc) => (
                    <a
                        key={doc.id}
                        href={doc.fileUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                            display: "flex",
                            alignItems: "center",
                            gap: 8,
                            background: "var(--color-background-secondary, #f9fafb)",
                            borderRadius: 8,
                            padding: "7px 10px",
                            textDecoration: "none",
                            transition: "background 0.12s",
                        }}
                        onMouseEnter={(e) =>
                        ((e.currentTarget as HTMLAnchorElement).style.background =
                            "var(--color-background-tertiary, #f3f4f6)")
                        }
                        onMouseLeave={(e) =>
                        ((e.currentTarget as HTMLAnchorElement).style.background =
                            "var(--color-background-secondary, #f9fafb)")
                        }
                    >
                        <DocTypeBadge fileType={doc.fileType} />
                        <span
                            title={doc.fileName}
                            style={{
                                flex: 1,
                                fontSize: 12,
                                color: "var(--color-text-primary)",
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                                whiteSpace: "nowrap",
                            }}
                        >
                            {doc.fileName}
                        </span>
                        <span
                            style={{
                                fontSize: 11,
                                color: "var(--color-text-secondary)",
                                flexShrink: 0,
                            }}
                        >
                            {formatSize(doc.fileSize)}
                        </span>
                    </a>
                ))}
            </div>
        </div>
    );
}

export function formatSize(bytes: number): string {
    if (bytes < 1024) return bytes + " B";
    if (bytes < 1_048_576) return (bytes / 1024).toFixed(1) + " KB";
    return (bytes / 1_048_576).toFixed(1) + " MB";
}