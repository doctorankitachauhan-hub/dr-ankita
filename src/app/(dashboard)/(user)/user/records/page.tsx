"use client";

import React, { useEffect, useState } from "react";
import { format, isToday, isYesterday, isFuture } from "date-fns";
import { motion, AnimatePresence } from "motion/react";
import {
    FlaskConicalIcon,
    FileTextIcon,
    ScanIcon,
    ClipboardListIcon,
    FolderIcon,
    CalendarIcon,
    ChevronDownIcon,
    ExternalLinkIcon,
    ScrollTextIcon,
    PencilIcon,
    CheckCircle2Icon,
    ClockIcon,
    AlertCircleIcon,
    ImageIcon,
    RefreshCwIcon,
    XCircleIcon,
    LockIcon,
} from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { AppointmentStatus, DocumentType, PrescriptionType } from "@/generated/prisma/enums";


function formatSize(bytes: number): string {
    if (bytes < 1024) return bytes + " B";
    if (bytes < 1_048_576) return (bytes / 1024).toFixed(1) + " KB";
    return (bytes / 1_048_576).toFixed(1) + " MB";
}

function fmtDate(iso: string) {
    const d = new Date(iso);
    if (isToday(d)) return "Today";
    if (isYesterday(d)) return "Yesterday";
    return format(d, "dd MMM yyyy");
}

function fmtTime(iso: string) {
    return format(new Date(iso), "h:mm a");
}

function fmtFull(iso: string) {
    return format(new Date(iso), "dd MMM yyyy · h:mm a");
}

function groupByMonth(records: MedicalRecord[]): Map<string, MedicalRecord[]> {
    const map = new Map<string, MedicalRecord[]>();
    for (const r of records) {
        const key = format(new Date(r.appointment.slot.startTime), "MMMM yyyy");
        if (!map.has(key)) map.set(key, []);
        map.get(key)!.push(r);
    }
    return map;
}


const DOC_TYPE_CONFIG: Record<DocumentType, { label: string; icon: React.ElementType; bg: string; text: string; border: string }> = {
    PRESCRIPTION: { label: "Prescription", icon: ScrollTextIcon, bg: "bg-violet-50", text: "text-violet-700", border: "border-violet-200" },
    LAB_REPORT: { label: "Lab Report", icon: FlaskConicalIcon, bg: "bg-blue-50", text: "text-blue-700", border: "border-blue-200" },
    SCAN_XRAY: { label: "Scan / X-Ray", icon: ScanIcon, bg: "bg-cyan-50", text: "text-cyan-700", border: "border-cyan-200" },
    DISCHARGE_SUMMARY: { label: "Discharge Summary", icon: ClipboardListIcon, bg: "bg-orange-50", text: "text-orange-700", border: "border-orange-200" },
    OTHER: { label: "Other", icon: FolderIcon, bg: "bg-gray-50", text: "text-gray-600", border: "border-gray-200" },
};

const APPT_STATUS_CONFIG: Record<AppointmentStatus, { label: string; bg: string; text: string; border: string; icon: React.ElementType }> = {
    PENDING: { label: "Pending", bg: "bg-amber-50", text: "text-amber-700", border: "border-amber-200", icon: ClockIcon },
    CONFIRMED: { label: "Confirmed", bg: "bg-blue-50", text: "text-blue-700", border: "border-blue-200", icon: CheckCircle2Icon },
    COMPLETED: { label: "Completed", bg: "bg-emerald-50", text: "text-emerald-700", border: "border-emerald-200", icon: CheckCircle2Icon },
    CANCELLED: { label: "Cancelled", bg: "bg-red-50", text: "text-red-600", border: "border-red-200", icon: XCircleIcon },
};


function DocChip({ doc }: { doc: ContextDocument }) {
    const cfg = DOC_TYPE_CONFIG[doc.documentType];
    const Icon = cfg.icon;
    const isPdf = doc.fileType === "application/pdf";

    return (
        <a
            href={doc.fileUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={`group flex items-center gap-2.5 px-3 py-2.5 rounded-xl border ${cfg.bg} ${cfg.border} hover:shadow-sm transition-all`}
        >
            <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${cfg.bg}`}>
                {isPdf ? (
                    <FileTextIcon size={15} className={cfg.text} />
                ) : (
                    <ImageIcon size={15} className={cfg.text} />
                )}
            </div>
            <div className="flex-1 min-w-0">
                <p className={`text-xs font-semibold truncate ${cfg.text}`}>{doc.fileName}</p>
                <p className="text-[10px] text-gray-400 mt-0.5 flex items-center gap-1.5">
                    <span className={`font-medium ${cfg.text} opacity-70`}>{cfg.label}</span>
                    <span>·</span>
                    <span>{formatSize(doc.fileSize)}</span>
                </p>
            </div>
            <ExternalLinkIcon size={12} className="text-gray-300 group-hover:text-gray-500 flex-shrink-0 transition-colors" />
        </a>
    );
}

function PrescriptionChip({ rx }: { rx: Prescription }) {
    const isFinal = rx.type === "FINAL";
    return (
        <div className={`flex items-center justify-between px-3 py-2.5 rounded-xl border ${isFinal ? "bg-emerald-50 border-emerald-200" : "bg-amber-50 border-amber-200"}`}>
            <div className="flex items-center gap-2">
                <ScrollTextIcon size={13} className={isFinal ? "text-emerald-600" : "text-amber-600"} />
                <div>
                    <p className={`text-xs font-semibold ${isFinal ? "text-emerald-700" : "text-amber-700"}`}>
                        {isFinal ? "Final Prescription" : "Interim Prescription"}
                    </p>
                    <p className="text-[10px] text-gray-400 mt-0.5">{fmtFull(rx.issuedAt)}</p>
                </div>
            </div>
            {rx.pdfUrl && (
                <a
                    href={rx.pdfUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`inline-flex items-center gap-1 text-[10px] font-bold px-2.5 py-1.5 rounded-lg transition-opacity hover:opacity-80 ${isFinal ? "bg-emerald-600 text-white" : "bg-amber-500 text-white"}`}
                >
                    <ExternalLinkIcon size={10} />
                    PDF
                </a>
            )}
        </div>
    );
}

function InfoBlock({ label, value }: { label: string; value: string | null | undefined }) {
    if (!value) return null;
    return (
        <div className="bg-gray-50 rounded-xl px-4 py-3 border border-gray-100">
            <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-1.5">{label}</p>
            <p className="text-sm text-gray-700 leading-relaxed">{value}</p>
        </div>
    );
}


function RecordCard({ record, index }: { record: MedicalRecord; index: number }) {
    const [open, setOpen] = useState(index === 0);
    const appt = record.appointment;
    const slot = appt.slot;
    const isCompleted = appt.status === "COMPLETED";
    const isCancelled = appt.status === "CANCELLED";
    const canEdit = !isCompleted && !isCancelled;
    const statusCfg = APPT_STATUS_CONFIG[appt.status];
    const StatusIcon = statusCfg.icon;
    const upcoming = isFuture(new Date(slot.startTime));

    // group documents by type
    const docGroups = record.contextDocuments.reduce<Record<string, ContextDocument[]>>((acc, doc) => {
        if (!acc[doc.documentType]) acc[doc.documentType] = [];
        acc[doc.documentType].push(doc);
        return acc;
    }, {});

    const totalDocs = record.contextDocuments.length;
    const totalRx = appt.prescriptions.length;

    return (
        <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05, duration: 0.25 }}
            className={`bg-white rounded-2xl border overflow-hidden shadow-sm hover:shadow-md transition-shadow ${isCompleted ? "border-emerald-100" : isCancelled ? "border-red-100" : "border-gray-100"}`}
        >
            {/* Accent top bar */}
            <div className={`h-[3px] ${isCompleted ? "bg-gradient-to-r from-emerald-400 to-teal-400" : isCancelled ? "bg-gradient-to-r from-red-300 to-red-400" : upcoming ? "bg-gradient-to-r from-primary-color to-primary-hover" : "bg-gradient-to-r from-gray-200 to-gray-300"}`} />

            {/* Header — always visible */}
            <button
                onClick={() => setOpen((v) => !v)}
                className="w-full text-left px-5 py-4 flex items-start justify-between gap-4 hover:bg-gray-50/50 transition-colors"
            >
                <div className="flex items-start gap-4 min-w-0">
                    {/* Date block */}
                    <div className={`flex-shrink-0 w-12 text-center rounded-xl py-1.5 px-1 border ${statusCfg.bg} ${statusCfg.border}`}>
                        <p className={`text-lg font-black leading-none ${statusCfg.text}`}>
                            {format(new Date(slot.startTime), "dd")}
                        </p>
                        <p className={`text-[9px] font-bold uppercase tracking-wide ${statusCfg.text} opacity-70`}>
                            {format(new Date(slot.startTime), "MMM")}
                        </p>
                    </div>

                    <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                            <p className="text-sm font-bold text-gray-900 truncate">
                                {fmtTime(slot.startTime)} – {fmtTime(slot.endTime)}
                            </p>
                            <span className={`inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full border ${statusCfg.bg} ${statusCfg.text} ${statusCfg.border}`}>
                                <StatusIcon size={9} />
                                {statusCfg.label}
                            </span>
                            {upcoming && (
                                <span className="inline-flex items-center gap-1 text-[9px] font-bold px-1.5 py-0.5 rounded-full bg-primary-color/10 text-primary-color border border-primary-color/20">
                                    <span className="w-1 h-1 rounded-full bg-primary-color animate-pulse" />
                                    UPCOMING
                                </span>
                            )}
                        </div>
                        <p className="text-xs text-gray-500 mt-0.5 truncate">{record.reason}</p>
                        {/* Mini stat pills */}
                        <div className="flex items-center gap-2 mt-1.5 flex-wrap">
                            {totalDocs > 0 && (
                                <span className="inline-flex items-center gap-1 text-[10px] text-gray-500 bg-gray-100 rounded-md px-1.5 py-0.5">
                                    <FolderIcon size={9} />
                                    {totalDocs} doc{totalDocs !== 1 ? "s" : ""}
                                </span>
                            )}
                            {totalRx > 0 && (
                                <span className="inline-flex items-center gap-1 text-[10px] text-violet-600 bg-violet-50 rounded-md px-1.5 py-0.5">
                                    <ScrollTextIcon size={9} />
                                    {totalRx} RX
                                </span>
                            )}
                            {canEdit && (
                                <span className="inline-flex items-center gap-1 text-[10px] text-blue-600 bg-blue-50 rounded-md px-1.5 py-0.5">
                                    <PencilIcon size={9} />
                                    Editable
                                </span>
                            )}
                            {isCompleted && (
                                <span className="inline-flex items-center gap-1 text-[10px] text-gray-400 bg-gray-100 rounded-md px-1.5 py-0.5">
                                    <LockIcon size={9} />
                                    Locked
                                </span>
                            )}
                        </div>
                    </div>
                </div>

                <ChevronDownIcon
                    size={16}
                    className={`text-gray-400 flex-shrink-0 mt-1 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
                />
            </button>

            {/* Body */}
            <AnimatePresence initial={false}>
                {open && (
                    <motion.div
                        key="body"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.22, ease: "easeInOut" }}
                        className="overflow-hidden"
                    >
                        <div className="px-5 pb-5 space-y-4 border-t border-gray-100">

                            {/* Visit info */}
                            <div className="pt-4 space-y-2.5">
                                <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 flex items-center gap-1.5">
                                    <ClipboardListIcon size={10} />
                                    Visit Information
                                </p>
                                <InfoBlock label="Reason for Visit" value={record.reason} />
                                <InfoBlock label="Symptoms" value={record.symptoms} />
                                <InfoBlock label="Notes" value={record.notes} />
                            </div>

                            {/* Doctor's Prescriptions */}
                            {totalRx > 0 && (
                                <div className="space-y-2.5">
                                    <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 flex items-center gap-1.5">
                                        <ScrollTextIcon size={10} />
                                        Doctor's Prescriptions ({totalRx})
                                    </p>
                                    <div className="space-y-1.5">
                                        {appt.prescriptions.map((rx) => (
                                            <PrescriptionChip key={rx.id} rx={rx} />
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Uploaded Documents grouped by type */}
                            {totalDocs > 0 && (
                                <div className="space-y-3">
                                    <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 flex items-center gap-1.5">
                                        <FolderIcon size={10} />
                                        Uploaded Documents ({totalDocs})
                                    </p>
                                    {(Object.keys(docGroups) as DocumentType[]).map((type) => {
                                        const cfg = DOC_TYPE_CONFIG[type];
                                        const Icon = cfg.icon;
                                        return (
                                            <div key={type}>
                                                <p className={`text-[10px] font-semibold flex items-center gap-1 mb-1.5 ${cfg.text}`}>
                                                    <Icon size={10} />
                                                    {cfg.label} ({docGroups[type].length})
                                                </p>
                                                <div className="grid gap-1.5 sm:grid-cols-2">
                                                    {docGroups[type].map((doc) => (
                                                        <DocChip key={doc.id} doc={doc} />
                                                    ))}
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            )}

                            {/* Edit CTA */}
                            {canEdit && (
                                <div className="pt-1">
                                    <button
                                        // onClick={() => onEdit(record)}  // wire up your edit handler
                                        className="inline-flex items-center gap-2 text-xs font-bold px-4 py-2.5 rounded-xl bg-primary-color text-white hover:opacity-90 active:scale-[0.98] transition-all shadow-sm"
                                    >
                                        <PencilIcon size={12} />
                                        Update Visit Information
                                    </button>
                                </div>
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
}


function Bone({ className }: { className: string }) {
    return <div className={`animate-pulse bg-gray-100 rounded-lg ${className}`} />;
}

function RecordSkeleton() {
    return (
        <div className="bg-white rounded-2xl border border-gray-100 p-5 space-y-4 shadow-sm">
            <div className="flex items-start gap-4">
                <Bone className="w-12 h-14 rounded-xl flex-shrink-0" />
                <div className="flex-1 space-y-2 pt-1">
                    <Bone className="h-4 w-1/3" />
                    <Bone className="h-3 w-2/3" />
                    <Bone className="h-3 w-1/4" />
                </div>
            </div>
        </div>
    );
}


export default function MedicalRecordsPage() {
    const { data, isLoading, isFetching, error, refetch } = useQuery<MedicalRecord[]>({
        queryKey: ["medial_records"],
        queryFn: async function () {
            const res = await axios.get("/api/v1/user/records")
            return res.data
        },
    })

    if (isLoading || isFetching) {
        return (
            <div className="min-h-screen bg-gray-50/60">
                <div className="max-w-5xl mx-auto px-4 py-8 space-y-8">
                    <div className="space-y-3">
                        {Array.from({ length: 3 }).map((_, i) => <RecordSkeleton key={i} />)}
                    </div>
                </div>
            </div>
        )
    }

    if (!data) {
        return (
            <div className="min-h-screen bg-gray-50/60">
                <div className="max-w-5xl mx-auto px-4 py-8 space-y-8">
                    <div className="flex flex-col items-center justify-center py-20 gap-4 text-gray-400">
                        <div className="w-16 h-16 rounded-2xl bg-gray-100 flex items-center justify-center">
                            <FolderIcon size={28} className="opacity-40" />
                        </div>
                        <div className="text-center">
                            <p className="text-sm font-semibold text-gray-600">No records yet</p>
                            <p className="text-xs mt-1">Your visit records will appear here after booking an appointment.</p>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
    const grouped = groupByMonth(data);

    return (
        <div className="min-h-screen bg-gray-50/60">
            <div className="max-w-5xl mx-auto px-4 py-8 space-y-8">

                {/* ── Page Header ── */}
                <div className="flex items-start justify-between gap-4">
                    <div>
                        <h1 className="text-2xl font-black text-gray-900 tracking-tight">
                            Medical Records
                        </h1>
                        <p className="text-sm text-gray-500 mt-1">
                            Your visit history, uploaded documents, and prescriptions.
                        </p>
                    </div>
                    {!isLoading || !isFetching && (
                        <button
                            onClick={refetch}
                            className="inline-flex items-center gap-2 text-xs font-semibold px-3 py-2 rounded-xl bg-white border border-gray-200 text-gray-600 hover:bg-gray-50 transition-colors shadow-sm"
                        >
                            <RefreshCwIcon size={12} />
                            Refresh
                        </button>
                    )}
                </div>

                {/* ── Summary pills ── */}
                {!isLoading && data.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                        {[
                            { label: "Total Visits", value: data.length, bg: "bg-white border-gray-200", text: "text-gray-800" },
                            {
                                label: "Completed",
                                value: data.filter(r => r.appointment.status === "COMPLETED").length,
                                bg: "bg-emerald-50 border-emerald-200",
                                text: "text-emerald-700"
                            },
                            {
                                label: "Upcoming",
                                value: data.filter(r => isFuture(new Date(r.appointment.slot.startTime))).length,
                                bg: "bg-blue-50 border-blue-200",
                                text: "text-blue-700"
                            },
                            {
                                label: "Total Docs",
                                value: data.reduce((s, r) => s + r.contextDocuments.length, 0),
                                bg: "bg-violet-50 border-violet-200",
                                text: "text-violet-700"
                            },
                        ].map((pill) => (
                            <div key={pill.label} className={`flex items-center gap-2 px-3.5 py-2 rounded-xl border ${pill.bg} shadow-sm`}>
                                <span className={`text-lg font-black leading-none ${pill.text}`}>{pill.value}</span>
                                <span className={`text-xs font-medium ${pill.text} opacity-70`}>{pill.label}</span>
                            </div>
                        ))}
                    </div>
                )}

                {/* ── Error ── */}
                {error && (
                    <div className="flex items-center gap-3 bg-red-50 border border-red-200 text-red-700 rounded-2xl px-5 py-4">
                        <AlertCircleIcon size={18} className="flex-shrink-0" />
                        <p className="text-sm font-medium">{error.message}</p>
                        <button
                            onClick={() => refetch()}
                            className="ml-auto text-xs font-bold underline underline-offset-2"
                        >
                            Retry
                        </button>
                    </div>
                )}

                {/* ── Grouped records ── */}
                {!isLoading && !error && data.length > 0 && (
                    <div className="space-y-8">
                        {Array.from(grouped.entries()).map(([month, monthRecords]) => (
                            <div key={month}>
                                {/* Month header */}
                                <div className="flex items-center gap-3 mb-3">
                                    <div className="flex items-center gap-2">
                                        <CalendarIcon size={13} className="text-gray-400" />
                                        <h2 className="text-xs font-bold uppercase tracking-widest text-gray-400">
                                            {month}
                                        </h2>
                                    </div>
                                    <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-md bg-gray-200 text-gray-600">
                                        {monthRecords.length}
                                    </span>
                                    <div className="flex-1 h-px bg-gray-200" />
                                </div>

                                {/* Cards */}
                                <div className="space-y-3">
                                    {monthRecords.map((record, i) => (
                                        <RecordCard key={record.id} record={record} index={i} />
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

interface ContextDocument {
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

interface Slot {
    id: string;
    startTime: string;
    endTime: string;
    status: string;
}

interface Prescription {
    id: string;
    type: PrescriptionType;
    issuedAt: string;
    pdfUrl: string | null;
}

interface Appointment {
    id: string;
    status: AppointmentStatus;
    slot: Slot;
    prescriptions: Prescription[];
}

interface MedicalRecord {
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

