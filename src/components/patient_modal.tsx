"use client";

import { Appointment, ContextDocument, Patient, Prescriptions } from "@/types/patient";
import { PrescriptionType } from "@/generated/prisma/enums";
import React, { useEffect, useState } from "react";
import { format } from "date-fns";
import { motion, AnimatePresence } from "motion/react";
import { PatientAvatar } from "./patient_grid";
import {
    XIcon,
    PhoneIcon,
    MailIcon,
    CalendarIcon,
    IndianRupeeIcon,
    VideoIcon,
    FileTextIcon,
    ClipboardListIcon,
    ChevronDownIcon,
    ExternalLinkIcon,
    ScrollTextIcon,
    ZapIcon,
    CheckCircle2Icon,
    ActivityIcon,
    AlertCircleIcon,
    StickyNoteIcon,
    CreditCardIcon,
    FolderIcon,
    ClockIcon,
    BadgeCheckIcon,
} from "lucide-react";

function fmtDateTime(iso: string) {
    return format(new Date(iso), "dd MMM yyyy · h:mm a");
}

function fmtDate(iso: string) {
    return format(new Date(iso), "dd MMM yyyy");
}

function fmtTime(iso: string) {
    return format(new Date(iso), "h:mm a");
}

export function formatSize(bytes: number): string {
    if (bytes < 1024) return bytes + " B";
    if (bytes < 1_048_576) return (bytes / 1024).toFixed(1) + " KB";
    return (bytes / 1_048_576).toFixed(1) + " MB";
}

function isUpcoming(iso: string) {
    return new Date(iso) > new Date();
}


const APPT_STATUS: Record<Appointment["status"], { bg: string; text: string; dot: string }> = {
    CONFIRMED: { bg: "bg-blue-50 border-blue-200", text: "text-blue-700", dot: "bg-blue-500" },
    PENDING: { bg: "bg-amber-50 border-amber-200", text: "text-amber-700", dot: "bg-amber-400" },
    COMPLETED: { bg: "bg-emerald-50 border-emerald-200", text: "text-emerald-700", dot: "bg-emerald-500" },
    CANCELLED: { bg: "bg-red-50 border-red-200", text: "text-red-600", dot: "bg-red-400" },
};

const PAY_STATUS: Record<string, { bg: string; text: string }> = {
    SUCCESS: { bg: "bg-emerald-50 border-emerald-200", text: "text-emerald-700" },
    PENDING: { bg: "bg-amber-50 border-amber-200", text: "text-amber-700" },
    FAILED: { bg: "bg-red-50 border-red-200", text: "text-red-600" },
    REFUNDED: { bg: "bg-violet-50 border-violet-200", text: "text-violet-700" },
};


function SectionLabel({ icon: Icon, children }: { icon: React.ElementType; children: React.ReactNode }) {
    return (
        <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest text-gray-400 mt-6 mb-3">
            <Icon size={11} />
            {children}
        </div>
    );
}

function InfoGrid({ children }: { children: React.ReactNode }) {
    return <div className="grid grid-cols-2 gap-2">{children}</div>;
}

function InfoCell({ label, value, wide }: { label: string; value: React.ReactNode; wide?: boolean }) {
    return (
        <div className={`bg-gray-50 rounded-xl px-3.5 py-3 ${wide ? "col-span-2" : ""}`}>
            <p className="text-[10px] text-gray-400 font-medium mb-1">{label}</p>
            <div className="text-sm font-semibold text-gray-800 break-all leading-snug">{value ?? <span className="text-gray-300 font-normal">—</span>}</div>
        </div>
    );
}

export function StatusBadge({ status }: { status: string }) {
    const s = APPT_STATUS[status as Appointment["status"]] ?? { bg: "bg-gray-50 border-gray-200", text: "text-gray-600", dot: "bg-gray-400" };
    return (
        <span className={`inline-flex items-center gap-1.5 text-[10px] font-bold px-2.5 py-1 rounded-full border ${s.bg} ${s.text}`}>
            <span className={`w-1.5 h-1.5 rounded-full ${s.dot}`} />
            {status}
        </span>
    );
}

export function DocTypeBadge({ fileType }: { fileType: string }) {
    const isPdf = fileType === "application/pdf";
    return (
        <span className={`inline-flex items-center justify-center w-7 h-7 rounded-lg text-[9px] font-bold flex-shrink-0 ${isPdf ? "bg-red-100 text-red-700" : "bg-blue-100 text-blue-700"}`}>
            {isPdf ? "PDF" : "IMG"}
        </span>
    );
}

function PrescriptionPanel({ prescriptions }: { prescriptions: Prescriptions[] }) {
    const [selected, setSelected] = useState(0);
    if (!prescriptions.length) return null;

    const rx = prescriptions[selected];
    const isFinal = rx.type === PrescriptionType.FINAL;

    return (
        <div className="rounded-xl border border-gray-100 overflow-hidden mt-3">
            {/* Tab bar */}
            {prescriptions.length > 1 && (
                <div className="flex border-b border-gray-100 bg-gray-50 overflow-x-auto">
                    {prescriptions.map((p, i) => (
                        <button
                            key={p.id}
                            onClick={() => setSelected(i)}
                            className={`flex-shrink-0 px-3 py-2 text-xs font-semibold transition-colors border-b-2 ${selected === i
                                ? "border-primary-color text-primary-color bg-white"
                                : "border-transparent text-gray-500 hover:text-gray-700"
                                }`}
                        >
                            RX #{i + 1}
                        </button>
                    ))}
                </div>
            )}

            {/* Content */}
            <div className="p-3">
                <div className="flex items-center justify-between mb-2.5">
                    <div className="flex items-center gap-2">
                        <span className={`inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full border ${isFinal
                            ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                            : "bg-amber-50 text-amber-700 border-amber-200"
                            }`}>
                            {isFinal ? <CheckCircle2Icon size={9} /> : <ZapIcon size={9} />}
                            {rx.type}
                        </span>
                        <span className="text-[10px] text-gray-400">{fmtDate(rx.issuedAt)}</span>
                    </div>
                    {rx.pdfUrl && (
                        <a
                            href={rx.pdfUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 text-[10px] font-semibold px-2.5 py-1.5 rounded-lg bg-primary-color text-white hover:opacity-90 transition-opacity"
                        >
                            <ExternalLinkIcon size={10} />
                            Open PDF
                        </a>
                    )}
                </div>

                {rx.content ? (
                    <pre className="text-[11px] text-gray-600 bg-gray-50 rounded-lg p-3 whitespace-pre-wrap font-mono leading-relaxed border border-gray-100 max-h-40 overflow-y-auto">
                        {rx.content}
                    </pre>
                ) : (
                    <div className="flex items-center gap-2 text-xs text-gray-400 py-3 px-3 bg-gray-50 rounded-lg border border-gray-100">
                        <ScrollTextIcon size={13} className="opacity-50" />
                        No text content — open PDF to view
                    </div>
                )}
            </div>
        </div>
    );
}

export function DocumentList({ documents }: { documents: ContextDocument[] | null }) {
    if (!documents?.length) return null;
    return (
        <div className="flex flex-col gap-1.5 mt-1">
            {documents.map((doc) => (
                <a
                    key={doc.id}
                    href={doc.fileUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2.5 bg-gray-50 hover:bg-gray-100 border border-gray-100 rounded-xl px-3 py-2.5 transition-colors group"
                >
                    <DocTypeBadge fileType={doc.fileType} />
                    <span className="flex-1 text-xs font-medium text-gray-700 truncate group-hover:text-gray-900 transition-colors">
                        {doc.fileName}
                    </span>
                    <span className="text-[10px] text-gray-400 flex-shrink-0">{formatSize(doc.fileSize)}</span>
                    <ExternalLinkIcon size={11} className="text-gray-300 group-hover:text-gray-500 flex-shrink-0 transition-colors" />
                </a>
            ))}
        </div>
    );
}

interface AppointmentCardProps {
    appointment: Appointment;
    index: number;
    openIndex: number | null;
    setOpenIndex: (i: number | null) => void;
}

function AppointmentCard({ appointment, index, openIndex, setOpenIndex }: AppointmentCardProps) {
    const ctx = appointment.appointmentContexts;
    const payment = appointment.payment[0];
    const upcoming = isUpcoming(appointment.slot.startTime);
    const s = APPT_STATUS[appointment.status];
    const prescriptions = appointment.prescriptions ?? [];
    const isOpen = openIndex === index;

    return (
        <div className={`rounded-2xl border overflow-hidden transition-shadow ${isOpen ? "shadow-sm" : ""} ${s.bg}`}>
            {/* Accordion header */}
            <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full flex items-center justify-between px-4 py-3.5 text-left transition-colors hover:bg-black/[0.02]"
            >
                <div className="flex items-center gap-3 min-w-0">
                    <div className={`w-8 h-8 rounded-xl flex items-center justify-center text-xs font-bold flex-shrink-0 ${s.bg} ${s.text} border ${s.bg}`}>
                        {index + 1}
                    </div>
                    <div className="min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                            <span className="text-sm font-bold text-gray-900">
                                {fmtDate(appointment.slot.startTime)}
                            </span>
                            {upcoming && (
                                <span className="inline-flex items-center gap-1 text-[9px] font-bold px-1.5 py-0.5 rounded-full bg-primary-color/10 text-primary-color border border-primary-color/20">
                                    <span className="w-1 h-1 rounded-full bg-primary-color animate-pulse" />
                                    UPCOMING
                                </span>
                            )}
                        </div>
                        <p className="text-xs text-gray-500 mt-0.5">
                            {fmtTime(appointment.slot.startTime)} – {fmtTime(appointment.slot.endTime)}
                        </p>
                    </div>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0">
                    <StatusBadge status={appointment.status} />
                    <ChevronDownIcon
                        size={15}
                        className={`text-gray-400 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
                    />
                </div>
            </button>

            {/* Accordion body */}
            <AnimatePresence initial={false}>
                {isOpen && (
                    <motion.div
                        key="body"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2, ease: "easeInOut" }}
                        className="overflow-hidden"
                    >
                        <div className="px-4 pb-4 bg-white border-t border-gray-100 space-y-4">

                            {/* Context */}
                            {ctx && (
                                <>
                                    <SectionLabel icon={StickyNoteIcon}>Visit Context</SectionLabel>
                                    <InfoGrid>
                                        <InfoCell wide label="Reason for visit" value={ctx.reason} />
                                        {ctx.symptoms && <InfoCell wide label="Symptoms" value={ctx.symptoms} />}
                                        {ctx.notes && <InfoCell wide label="Notes" value={ctx.notes} />}
                                    </InfoGrid>
                                </>
                            )}

                            {/* Meeting */}
                            {appointment.meeting && (
                                <>
                                    <SectionLabel icon={VideoIcon}>Video Meeting</SectionLabel>
                                    <div className="bg-gray-50 border border-gray-100 rounded-xl px-3.5 py-3 flex items-center justify-between gap-3">
                                        <div className="min-w-0">
                                            <p className="text-[10px] text-gray-400 font-medium mb-0.5">Google Meet</p>
                                            <p className="text-xs text-gray-600 truncate font-mono">
                                                {appointment.meeting.meetingLink.replace("https://", "")}
                                            </p>
                                        </div>
                                        <a
                                            href={appointment.meeting.meetingLink}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors flex-shrink-0"
                                        >
                                            <VideoIcon size={11} />
                                            Join
                                        </a>
                                    </div>
                                </>
                            )}

                            {/* Payment */}
                            {payment && (
                                <>
                                    <SectionLabel icon={CreditCardIcon}>Payment</SectionLabel>
                                    <div className="bg-gray-50 border border-gray-100 rounded-xl px-3.5 py-3">
                                        <div className="flex items-center justify-between mb-2">
                                            <span className="text-lg font-bold text-gray-900">
                                                ₹{payment.amount.toLocaleString("en-IN")}
                                            </span>
                                            <span className={`inline-flex items-center text-[10px] font-bold px-2.5 py-1 rounded-full border ${(PAY_STATUS[payment.status] ?? PAY_STATUS["PENDING"]).bg
                                                } ${(PAY_STATUS[payment.status] ?? PAY_STATUS["PENDING"]).text}`}>
                                                {payment.status}
                                            </span>
                                        </div>
                                        <p className="text-[10px] text-gray-400 font-mono">
                                            TXN: {payment.transactionId}
                                        </p>
                                        {payment.razorpayOrderId && (
                                            <p className="text-[10px] text-gray-400 font-mono mt-0.5">
                                                Order: {payment.razorpayOrderId}
                                            </p>
                                        )}
                                    </div>
                                </>
                            )}

                            {/* Prescriptions */}
                            {prescriptions.length > 0 && (
                                <>
                                    <SectionLabel icon={ScrollTextIcon}>
                                        Prescriptions
                                        <span className="ml-1 px-1.5 py-0.5 rounded-md bg-gray-200 text-gray-600 text-[9px]">
                                            {prescriptions.length}
                                        </span>
                                    </SectionLabel>
                                    <PrescriptionPanel prescriptions={prescriptions} />
                                </>
                            )}

                            {/* Documents */}
                            {ctx?.contextDocuments?.length ? (
                                <>
                                    <SectionLabel icon={FolderIcon}>
                                        Documents
                                        <span className="ml-1 px-1.5 py-0.5 rounded-md bg-gray-200 text-gray-600 text-[9px]">
                                            {ctx.contextDocuments.length}
                                        </span>
                                    </SectionLabel>
                                    <DocumentList documents={ctx.contextDocuments} />
                                </>
                            ) : null}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}


interface PatientModalProps {
    patient: Patient;
    onClose: () => void;
}

export function PatientModal({ patient, onClose }: PatientModalProps) {
    const totalPaid = patient.appointments.reduce(
        (sum, a) => sum + (a.payment[0]?.amount ?? 0),
        0
    );
    const totalPrescriptions = patient.appointments.reduce(
        (sum, a) => sum + (a.prescriptions?.length ?? 0),
        0
    );
    const upcomingCount = patient.appointments.filter((a) =>
        isUpcoming(a.slot.startTime)
    ).length;

    // Escape key
    useEffect(() => {
        const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
        window.addEventListener("keydown", handler);
        return () => window.removeEventListener("keydown", handler);
    }, [onClose]);

    // Lock scroll
    useEffect(() => {
        document.body.style.overflow = "hidden";
        return () => { document.body.style.overflow = ""; };
    }, []);

    const sortedAppts = [...patient.appointments].sort(
        (a, b) => new Date(b.slot.startTime).getTime() - new Date(a.slot.startTime).getTime()
    );

    const [openIndex, setOpenIndex] = useState<number | null>(0);

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm"
            onClick={onClose}
            role="dialog"
            aria-modal="true"
        >
            <motion.div
                onClick={(e) => e.stopPropagation()}
                initial={{ opacity: 0, scale: 0.96, y: 12 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.96, y: 12 }}
                transition={{ duration: 0.2 }}
                className="bg-white rounded-2xl shadow-2xl w-full max-w-[640px] max-h-[90vh] flex flex-col overflow-hidden"
            >
                {/* ── Modal Header ── */}
                <div className="flex-shrink-0 px-6 pt-5 pb-4 border-b border-gray-100">
                    <div className="flex items-start gap-4">
                        <PatientAvatar name={patient.name} />
                        <div className="flex-1 min-w-0">
                            <h2 className="text-base font-bold text-gray-900 leading-tight">
                                {patient.name}
                            </h2>
                            <p className="text-xs text-gray-400 mt-0.5 flex items-center gap-1">
                                <MailIcon size={11} />
                                {patient.email}
                            </p>
                            {patient.phone && (
                                <p className="text-xs text-gray-400 mt-0.5 flex items-center gap-1">
                                    <PhoneIcon size={11} />
                                    {patient.phone}
                                </p>
                            )}
                        </div>
                        <button
                            onClick={onClose}
                            aria-label="Close"
                            className="w-8 h-8 rounded-xl bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors flex-shrink-0 ml-auto"
                        >
                            <XIcon size={14} className="text-gray-600" />
                        </button>
                    </div>

                    {/* ── Stat pills ── */}
                    <div className="flex flex-wrap gap-2 mt-4">
                        <div className="flex items-center gap-1.5 bg-gray-50 border border-gray-100 rounded-xl px-3 py-2">
                            <CalendarIcon size={13} className="text-gray-400" />
                            <span className="text-xs font-bold text-gray-800">{patient.appointments.length}</span>
                            <span className="text-xs text-gray-400">appts</span>
                        </div>
                        {upcomingCount > 0 && (
                            <div className="flex items-center gap-1.5 bg-primary-color/10 border border-primary-color/20 rounded-xl px-3 py-2">
                                <ClockIcon size={13} className="text-primary-color" />
                                <span className="text-xs font-bold text-primary-color">{upcomingCount}</span>
                                <span className="text-xs text-primary-color/70">upcoming</span>
                            </div>
                        )}
                        {totalPrescriptions > 0 && (
                            <div className="flex items-center gap-1.5 bg-amber-50 border border-amber-200 rounded-xl px-3 py-2">
                                <ScrollTextIcon size={13} className="text-amber-600" />
                                <span className="text-xs font-bold text-amber-700">{totalPrescriptions}</span>
                                <span className="text-xs text-amber-600/70">prescriptions</span>
                            </div>
                        )}
                        {totalPaid > 0 && (
                            <div className="flex items-center gap-1.5 bg-emerald-50 border border-emerald-200 rounded-xl px-3 py-2">
                                <IndianRupeeIcon size={13} className="text-emerald-600" />
                                <span className="text-xs font-bold text-emerald-700">
                                    {totalPaid.toLocaleString("en-IN")}
                                </span>
                                <span className="text-xs text-emerald-600/70">total paid</span>
                            </div>
                        )}
                    </div>
                </div>

                {/* ── Scrollable body ── */}
                <div className="flex-1 overflow-y-auto px-6 py-5">
                    {/* Appointments */}
                    <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-3">
                        <CalendarIcon size={11} />
                        Appointments ({patient.appointments.length})
                    </div>

                    {sortedAppts.length > 0 ? (
                        <div className="space-y-2.5">
                            {sortedAppts.map((appt, i) => (
                                <AppointmentCard
                                    key={appt.id}
                                    appointment={appt}
                                    index={i}
                                    openIndex={openIndex}
                                    setOpenIndex={setOpenIndex}
                                />
                            ))}
                        </div>
                    ) : (
                        <div className="flex flex-col items-center justify-center py-10 text-gray-400 gap-2">
                            <CalendarIcon size={24} className="opacity-30" />
                            <p className="text-xs">No appointments yet</p>
                        </div>
                    )}
                </div>
            </motion.div>
        </div>
    );
}