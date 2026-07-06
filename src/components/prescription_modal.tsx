"use client";
import { AppointmentResponse, Prescriptions } from "@/types/appointments";
import { motion, AnimatePresence } from "motion/react";
import {
    X,
    Calendar,
    Phone,
    MapPin,
    Stethoscope,
    AlertCircle,
    StickyNote,
    Paperclip,
    FileText,
    Send,
    User,
    Zap,
    ClipboardList,
    Download,
    ChevronDown,
    ChevronUp,
    CheckCircle2,
    Plus,
    Trash2,
    Pill,
} from "lucide-react";
import { format } from "date-fns";
import { useState } from "react";
import toast from "react-hot-toast";
import { useMutation } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { PrescriptionType } from "@/generated/prisma/enums";

type Props = {
    appointment: AppointmentResponse;
    onClose: () => void;
};

function formatDOB(dob: string | null) {
    if (!dob) return null;
    return format(new Date(dob), "dd MMM yyyy");
}

function formatIssuedAt(iso: string) {
    return format(new Date(iso), "dd MMM yyyy, hh:mm a");
}

const PRESCRIPTION_TYPES: {
    value: PrescriptionType;
    label: string;
    description: string;
    icon: React.ReactNode;
    color: string;
    bg: string;
    border: string;
    selectedBg: string;
    selectedBorder: string;
    selectedText: string;
    dot: string;
}[] = [
        {
            value: PrescriptionType.INTERIM,
            label: "Interim",
            description: "Quick relief notes before full consultation",
            icon: <Zap size={16} />,
            color: "text-amber-600",
            bg: "bg-amber-50",
            border: "border-amber-200",
            selectedBg: "bg-amber-50",
            selectedBorder: "border-amber-500",
            selectedText: "text-amber-700",
            dot: "bg-amber-500",
        },
        {
            value: PrescriptionType.FINAL,
            label: "Final",
            description: "Complete prescription after consultation",
            icon: <ClipboardList size={16} />,
            color: "text-teal-600",
            bg: "bg-teal-50",
            border: "border-teal-200",
            selectedBg: "bg-teal-50",
            selectedBorder: "border-teal-500",
            selectedText: "text-teal-700",
            dot: "bg-teal-500",
        },
    ];

// NOTE: your Prescriptions type (in @/types/appointments) needs a
// `diagnosis: string` field added alongside `content` for this to compile.
function ExistingPrescriptionCard({ rx }: { rx: Prescriptions }) {
    const [expanded, setExpanded] = useState(false);
    const isInterim = rx.type === PrescriptionType.INTERIM;

    const cfg = isInterim
        ? {
            bg: "bg-amber-50",
            border: "border-amber-200",
            badge: "bg-amber-100 text-amber-700 border-amber-300",
            icon: "text-amber-500",
            expandBtn: "text-amber-600 hover:bg-amber-100",
        }
        : {
            bg: "bg-teal-50",
            border: "border-teal-200",
            badge: "bg-teal-100 text-teal-700 border-teal-300",
            icon: "text-teal-500",
            expandBtn: "text-teal-600 hover:bg-teal-100",
        };

    return (
        <div className={`rounded-xl border ${cfg.border} ${cfg.bg} overflow-hidden`}>
            {/* Row */}
            <div className="flex items-center justify-between px-4 py-3">
                <div className="flex items-center gap-2.5">
                    <CheckCircle2 size={16} className={cfg.icon} />
                    <div className="flex items-center gap-2 flex-wrap">
                        <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-full border ${cfg.badge}`}>
                            {isInterim ? "Interim" : "Final"}
                        </span>
                        <span className="text-[11px] text-slate-400">
                            Issued {formatIssuedAt(rx.issuedAt)}
                        </span>
                    </div>
                </div>

                <div className="flex items-center gap-1.5 shrink-0">
                    <a
                        href={rx.pdfUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-medium text-slate-600 bg-white border border-slate-200 hover:border-slate-300 hover:shadow-sm transition"
                        title="Open PDF"
                    >
                        <Download size={12} />
                        PDF
                    </a>
                    <button
                        type="button"
                        onClick={() => setExpanded((p) => !p)}
                        className={`flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-medium border border-transparent transition ${cfg.expandBtn}`}
                    >
                        {expanded ? <ChevronUp size={13} /> : <ChevronDown size={13} />}
                        {expanded ? "Hide" : "View"}
                    </button>
                </div>
            </div>

            {/* Expandable content */}
            <AnimatePresence initial={false}>
                {expanded && (
                    <motion.div
                        key="rx-content"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2, ease: "easeInOut" }}
                        className="overflow-hidden"
                    >
                        <div className="px-4 pb-4 pt-1 grid grid-cols-1 sm:grid-cols-2 gap-3">
                            <div className="bg-white rounded-lg border border-slate-200 px-4 py-3">
                                <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-400 mb-1.5">
                                    Medications
                                </p>
                                <pre className="text-sm text-slate-700 whitespace-pre-wrap font-sans leading-relaxed">
                                    {rx.content}
                                </pre>
                            </div>
                            <div className="bg-white rounded-lg border border-slate-200 px-4 py-3">
                                <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-400 mb-1.5">
                                    Diagnosis & Instructions
                                </p>
                                <pre className="text-sm text-slate-700 whitespace-pre-wrap font-sans leading-relaxed">
                                    {rx.diagnosis}
                                </pre>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

type MedicationRow = {
    id: string;
    name: string;
    dosage: string;
};

function makeEmptyMedication(): MedicationRow {
    return {
        id: typeof crypto !== "undefined" && crypto.randomUUID ? crypto.randomUUID() : Math.random().toString(36).slice(2),
        name: "",
        dosage: "",
    };
}

// Serializes structured rows into the same "Name\nDosage: ..." plain-text
// format the PDF generator already parses (isSubItem detects "Dosage:" lines).
function serializeMedications(rows: MedicationRow[]): string {
    return rows
        .filter((r) => r.name.trim() || r.dosage.trim())
        .map((r) => `${r.name.trim()}\nDosage: ${r.dosage.trim()}`)
        .join("\n\n");
}

export default function PrescriptionModal({ appointment, onClose }: Props) {
    const [medications, setMedications] = useState<MedicationRow[]>([makeEmptyMedication()]);
    const [diagnosis, setDiagnosis] = useState("");
    const [prescriptionType, setPrescriptionType] = useState<PrescriptionType>(
        PrescriptionType.FINAL
    );

    const ctx = appointment.appointmentContexts;
    const patient = appointment.patient;
    const existingPrescriptions = appointment.prescriptions ?? [];
    const initials = patient.name
        .split(" ")
        .map((n) => n[0])
        .slice(0, 2)
        .join("")
        .toUpperCase();

    const issuedTypes = new Set(existingPrescriptions.map((rx) => rx.type));
    const allIssued = issuedTypes.size >= 2;

    const { mutate, isPending } = useMutation({
        mutationFn: async () => {
            const response = await axios.post(
                "/api/v1/doctor/prescription",
                {
                    appointmentId: appointment.id,
                    userId: appointment.patientId,
                    prescription: serializeMedications(medications),
                    diagnosis,
                    type: prescriptionType,
                },
                { withCredentials: true }
            );
            return response.data;
        },
        onSuccess: (val) => {
            toast.success(val?.message ?? "Prescription sent successfully");
            onClose();
            setMedications([makeEmptyMedication()]);
            setDiagnosis("");
        },
        onError: (err: AxiosError<{ error: string }>) => {
            toast.error(err.response?.data?.error || "Something went wrong");
        },
    });

    const addMedicationRow = () => {
        setMedications((rows) => [...rows, makeEmptyMedication()]);
    };

    const removeMedicationRow = (id: string) => {
        setMedications((rows) => (rows.length > 1 ? rows.filter((r) => r.id !== id) : rows));
    };

    const updateMedicationRow = (id: string, field: "name" | "dosage", value: string) => {
        setMedications((rows) => rows.map((r) => (r.id === id ? { ...r, [field]: value } : r)));
    };

    const filledMedications = medications.filter((r) => r.name.trim() || r.dosage.trim());
    const hasIncompleteRow = filledMedications.some((r) => !r.name.trim() || !r.dosage.trim());
    const hasAtLeastOneMedication = filledMedications.length > 0;

    const handleSubmit = () => {
        if (!hasAtLeastOneMedication) {
            toast.error("Please add at least one medication");
            return;
        }

        if (hasIncompleteRow) {
            toast.error("Each medication needs both a name and a dosage");
            return;
        }

        if (!diagnosis.trim()) {
            toast.error("Please write the diagnosis & instructions");
            return;
        }

        if (issuedTypes.has(prescriptionType)) {
            toast.error(
                `A ${prescriptionType.toLowerCase()} prescription has already been issued for this appointment`
            );
            return;
        }
        mutate();
    };

    const activeType = PRESCRIPTION_TYPES.find((t) => t.value === prescriptionType)!;

    if (!appointment) return null;

    return (
        <AnimatePresence>
            {appointment && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
                    />

                    {/* Modal */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        transition={{ duration: 0.2 }}
                        className="relative w-full max-w-3xl max-h-[94vh] bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col"
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 bg-gradient-to-r from-teal-50 to-emerald-50">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-teal-100 flex items-center justify-center">
                                    <FileText size={20} className="text-teal-600" />
                                </div>
                                <div>
                                    <h2 className="text-lg font-semibold text-slate-800">
                                        Send Prescription
                                    </h2>
                                    <p className="text-xs text-slate-500">
                                        Review patient details and write prescription
                                    </p>
                                </div>
                            </div>
                            <button
                                onClick={onClose}
                                className="w-8 h-8 rounded-full hover:bg-slate-200/50 flex items-center justify-center transition"
                            >
                                <X size={18} className="text-slate-600" />
                            </button>
                        </div>

                        {/* Scrollable Content */}
                        <div className="flex-1 overflow-y-auto px-6 py-5">
                            <div className="space-y-5">

                                {/* Patient Details */}
                                <div className="rounded-xl bg-slate-50 border border-slate-200 p-4">
                                    <div className="flex items-center gap-2 mb-3">
                                        <User size={14} className="text-slate-500" />
                                        <p className="text-[11px] font-semibold uppercase tracking-widest text-slate-500">
                                            Patient Information
                                        </p>
                                    </div>
                                    <div className="flex items-start gap-4">
                                        <div className="w-12 h-12 rounded-full bg-teal-100 flex items-center justify-center text-base font-bold text-teal-600 shrink-0">
                                            {initials}
                                        </div>
                                        <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-3">
                                            <div>
                                                <p className="text-[11px] text-slate-400 font-medium mb-0.5">Name</p>
                                                <p className="text-sm font-medium text-slate-700">{patient.name}</p>
                                            </div>
                                            <div>
                                                <p className="text-[11px] text-slate-400 font-medium mb-0.5">Email</p>
                                                <p className="text-sm text-slate-700">{patient.email}</p>
                                            </div>
                                            {patient.phone && (
                                                <div>
                                                    <p className="text-[11px] text-slate-400 font-medium mb-0.5">Phone</p>
                                                    <p className="text-sm text-slate-700 flex items-center gap-1.5">
                                                        <Phone size={12} className="text-slate-400" />
                                                        {patient.phone}
                                                    </p>
                                                </div>
                                            )}
                                            {patient.dob && (
                                                <div>
                                                    <p className="text-[11px] text-slate-400 font-medium mb-0.5">Date of Birth</p>
                                                    <p className="text-sm text-slate-700 flex items-center gap-1.5">
                                                        <Calendar size={12} className="text-slate-400" />
                                                        {formatDOB(patient.dob)}
                                                    </p>
                                                </div>
                                            )}
                                            {patient.address && (
                                                <div className="sm:col-span-2">
                                                    <p className="text-[11px] text-slate-400 font-medium mb-0.5">Address</p>
                                                    <p className="text-sm text-slate-700 flex items-start gap-1.5">
                                                        <MapPin size={12} className="text-slate-400 mt-0.5 shrink-0" />
                                                        <span>{patient.address}</span>
                                                    </p>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                {/* ── Existing Prescriptions ── */}
                                {existingPrescriptions.length > 0 && (
                                    <div>
                                        <div className="flex items-center gap-2 mb-3">
                                            <ClipboardList size={14} className="text-slate-500" />
                                            <p className="text-[11px] font-semibold uppercase tracking-widest text-slate-500">
                                                Issued Prescriptions
                                            </p>
                                            <span className="ml-auto text-[11px] text-slate-400">
                                                {existingPrescriptions.length} of 2
                                            </span>
                                        </div>
                                        <div className="space-y-2.5">
                                            {existingPrescriptions.map((rx) => (
                                                <ExistingPrescriptionCard key={rx.id} rx={rx} />
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* Appointment Context */}
                                {ctx && (
                                    <div className="rounded-xl bg-amber-50/50 border border-amber-200 p-4">
                                        <div className="flex items-center gap-2 mb-3">
                                            <Stethoscope size={14} className="text-amber-600" />
                                            <p className="text-[11px] font-semibold uppercase tracking-widest text-amber-700">
                                                Appointment Context
                                            </p>
                                        </div>
                                        <div className="space-y-3">
                                            {ctx.reason && (
                                                <div>
                                                    <p className="text-[11px] text-amber-600 font-medium mb-0.5">Reason for Visit</p>
                                                    <p className="text-sm text-slate-700 bg-white rounded-lg px-3 py-2 border border-amber-100">{ctx.reason}</p>
                                                </div>
                                            )}
                                            {ctx.symptoms && (
                                                <div>
                                                    <div className="flex items-center gap-1.5 mb-0.5">
                                                        <AlertCircle size={11} className="text-red-500" />
                                                        <p className="text-[11px] text-red-600 font-medium">Symptoms</p>
                                                    </div>
                                                    <p className="text-sm text-slate-700 bg-white rounded-lg px-3 py-2 border border-red-100">{ctx.symptoms}</p>
                                                </div>
                                            )}
                                            {ctx.notes && (
                                                <div>
                                                    <div className="flex items-center gap-1.5 mb-0.5">
                                                        <StickyNote size={11} className="text-violet-500" />
                                                        <p className="text-[11px] text-violet-600 font-medium">Additional Notes</p>
                                                    </div>
                                                    <p className="text-sm text-slate-700 bg-white rounded-lg px-3 py-2 border border-violet-100">{ctx.notes}</p>
                                                </div>
                                            )}
                                            {ctx.contextDocuments.length > 0 && (
                                                <div>
                                                    <div className="flex items-center gap-1.5 mb-2">
                                                        <Paperclip size={11} className="text-sky-500" />
                                                        <p className="text-[11px] text-sky-600 font-medium">Attached Documents</p>
                                                    </div>
                                                    <div className="flex flex-wrap gap-2">
                                                        {ctx.contextDocuments.map((doc) => (
                                                            <a
                                                                key={doc.id}
                                                                href={doc.fileUrl}
                                                                target="_blank"
                                                                rel="noopener noreferrer"
                                                                className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-white border border-slate-200 text-xs text-slate-600 hover:border-sky-300 hover:text-sky-600 hover:shadow-sm transition group"
                                                            >
                                                                <FileText size={14} className="text-slate-400 group-hover:text-sky-500" />
                                                                <span className="max-w-[180px] truncate font-medium">{doc.fileName}</span>
                                                                <span className="text-slate-300">·</span>
                                                                <span className="text-[10px] text-slate-400 uppercase tracking-wide">{doc.documentType}</span>
                                                            </a>
                                                        ))}
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                )}

                                {!allIssued ? (
                                    <>
                                        <div>
                                            <label className="block mb-2.5">
                                                <span className="text-sm font-semibold text-slate-700">
                                                    Prescription Type *
                                                </span>
                                            </label>
                                            <div className="grid grid-cols-2 gap-3">
                                                {PRESCRIPTION_TYPES.map((t) => {
                                                    const isSelected = prescriptionType === t.value;
                                                    const isDisabled = issuedTypes.has(t.value);
                                                    return (
                                                        <button
                                                            key={t.value}
                                                            type="button"
                                                            onClick={() => !isDisabled && setPrescriptionType(t.value)}
                                                            disabled={isDisabled}
                                                            className={`
                                                                relative flex items-start gap-3 p-4 rounded-xl border-2 text-left transition-all duration-150
                                                                ${isDisabled
                                                                    ? "bg-slate-50 border-slate-200 opacity-50 cursor-not-allowed"
                                                                    : isSelected
                                                                        ? `${t.selectedBg} ${t.selectedBorder} shadow-sm`
                                                                        : "bg-white border-slate-200 hover:border-slate-300 hover:bg-slate-50 cursor-pointer"
                                                                }
                                                            `}
                                                        >
                                                            {isDisabled && (
                                                                <span className="absolute top-2 right-2 text-[10px] font-medium text-slate-400 bg-slate-100 px-1.5 py-0.5 rounded-full">
                                                                    Already Issued
                                                                </span>
                                                            )}

                                                            <div className={`
                                                                mt-0.5 w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0 transition-all
                                                                ${isSelected && !isDisabled ? `${t.selectedBorder} ${t.selectedBg}` : "border-slate-300 bg-white"}
                                                            `}>
                                                                {isSelected && !isDisabled && (
                                                                    <div className={`w-2 h-2 rounded-full ${t.dot}`} />
                                                                )}
                                                            </div>

                                                            <div className="flex-1 min-w-0">
                                                                <div className={`flex items-center gap-1.5 mb-0.5 ${isSelected && !isDisabled ? t.selectedText : "text-slate-600"}`}>
                                                                    {t.icon}
                                                                    <span className="text-sm font-semibold">{t.label}</span>
                                                                </div>
                                                                <p className="text-xs text-slate-400 leading-snug">
                                                                    {t.description}
                                                                </p>
                                                            </div>
                                                        </button>
                                                    );
                                                })}
                                            </div>

                                            <AnimatePresence mode="wait">
                                                {prescriptionType === PrescriptionType.INTERIM && !issuedTypes.has(PrescriptionType.INTERIM) && (
                                                    <motion.p
                                                        key="interim-hint"
                                                        initial={{ opacity: 0, marginTop: 0 }}
                                                        animate={{ opacity: 1, marginTop: 8 }}
                                                        exit={{ opacity: 0, marginTop: 0 }}
                                                        className="text-xs text-amber-600 bg-amber-50 border border-amber-200 rounded-lg px-3 py-2"
                                                    >
                                                        ⚡ Interim prescriptions are for immediate relief. You can still send a Final prescription after the full consultation.
                                                    </motion.p>
                                                )}
                                                {prescriptionType === PrescriptionType.FINAL && !issuedTypes.has(PrescriptionType.FINAL) && (
                                                    <motion.p
                                                        key="final-hint"
                                                        initial={{ opacity: 0, marginTop: 0 }}
                                                        animate={{ opacity: 1, marginTop: 8 }}
                                                        exit={{ opacity: 0, marginTop: 0 }}
                                                        className="text-xs text-teal-600 bg-teal-50 border border-teal-200 rounded-lg px-3 py-2"
                                                    >
                                                        ✅ Final prescriptions are the complete post-consultation plan. Only one can be issued per appointment.
                                                    </motion.p>
                                                )}
                                            </AnimatePresence>
                                        </div>

                                        {/* Medications: structured add/remove rows */}
                                        <div>
                                            <div className="flex items-center justify-between mb-2.5">
                                                <label className="block">
                                                    <span className="text-sm font-semibold text-slate-700">
                                                        Prescribed Medications *
                                                    </span>
                                                </label>
                                                <button
                                                    type="button"
                                                    onClick={addMedicationRow}
                                                    className="flex items-center gap-1 text-xs font-medium text-teal-600 hover:text-teal-700 px-2 py-1 rounded-lg hover:bg-teal-50 transition"
                                                >
                                                    <Plus size={14} />
                                                    Add medication
                                                </button>
                                            </div>

                                            <div className="space-y-2.5">
                                                {medications.map((row, idx) => (
                                                    <div
                                                        key={row.id}
                                                        className="flex items-start gap-2 rounded-xl border border-slate-200 bg-white p-3"
                                                    >
                                                        <div className="w-6 h-9 flex items-center justify-center text-slate-300 shrink-0">
                                                            <Pill size={14} />
                                                        </div>
                                                        <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                                                            <input
                                                                type="text"
                                                                value={row.name}
                                                                onChange={(e) => updateMedicationRow(row.id, "name", e.target.value)}
                                                                placeholder="e.g. T. Cabegolin 0.25mg"
                                                                className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:border-teal-500 focus:ring-2 focus:ring-teal-100 outline-none text-sm text-slate-700 placeholder:text-slate-400 transition"
                                                            />
                                                            <input
                                                                type="text"
                                                                value={row.dosage}
                                                                onChange={(e) => updateMedicationRow(row.id, "dosage", e.target.value)}
                                                                placeholder="e.g. weekly once for 6 weeks"
                                                                className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:border-teal-500 focus:ring-2 focus:ring-teal-100 outline-none text-sm text-slate-700 placeholder:text-slate-400 transition"
                                                            />
                                                        </div>
                                                        <button
                                                            type="button"
                                                            onClick={() => removeMedicationRow(row.id)}
                                                            disabled={medications.length === 1}
                                                            className="w-9 h-9 shrink-0 flex items-center justify-center rounded-lg text-slate-400 hover:text-red-500 hover:bg-red-50 transition disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-transparent disabled:hover:text-slate-400"
                                                            title={medications.length === 1 ? "At least one medication row is required" : `Remove medication ${idx + 1}`}
                                                        >
                                                            <Trash2 size={15} />
                                                        </button>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>

                                        {/* Diagnosis & Instructions */}
                                        <div>
                                            <label className="block mb-2">
                                                <span className="text-sm font-semibold text-slate-700">
                                                    Diagnosis & Instructions *
                                                </span>
                                            </label>
                                            <textarea
                                                value={diagnosis}
                                                onChange={(e) => setDiagnosis(e.target.value)}
                                                placeholder={"Hyperprolactinemia\nVaginitis\n\nAvoid solid food until follow-up."}
                                                className="w-full h-32 px-4 py-3 rounded-xl border border-slate-300 focus:border-teal-500 focus:ring-2 focus:ring-teal-100 outline-none resize-none text-sm text-slate-700 placeholder:text-slate-400 transition"
                                            />
                                            <p className="text-xs text-slate-400 mt-1.5">
                                                {diagnosis.length} characters
                                            </p>
                                        </div>
                                    </>
                                ) : (
                                    /* Both types issued */
                                    <div className="flex items-center gap-3 px-4 py-4 rounded-xl bg-green-50 border border-green-200">
                                        <CheckCircle2 size={20} className="text-green-500 shrink-0" />
                                        <div>
                                            <p className="text-sm font-semibold text-green-700">All prescriptions issued</p>
                                            <p className="text-xs text-green-600 mt-0.5">
                                                Both interim and final prescriptions have been sent for this appointment.
                                            </p>
                                        </div>
                                    </div>
                                )}

                            </div>
                        </div>

                        {/* Footer */}
                        <div className="flex items-center justify-between gap-3 px-6 py-4 border-t border-slate-200 bg-slate-50">
                            {!allIssued ? (
                                <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium ${activeType.bg} ${activeType.color} border ${activeType.border}`}>
                                    {activeType.icon}
                                    {activeType.label} Prescription
                                </div>
                            ) : (
                                <div />
                            )}

                            <div className="flex items-center gap-3">
                                <button
                                    onClick={onClose}
                                    disabled={isPending}
                                    className="px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-200 rounded-lg transition disabled:opacity-50"
                                >
                                    {allIssued ? "Close" : "Cancel"}
                                </button>

                                {!allIssued && (
                                    <button
                                        onClick={handleSubmit}
                                        disabled={isPending || !hasAtLeastOneMedication || hasIncompleteRow || !diagnosis.trim()}
                                        className="flex items-center gap-2 px-5 py-2 text-sm font-medium text-white bg-teal-600 hover:bg-teal-700 rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed shadow-sm shadow-teal-100"
                                    >
                                        {isPending ? (
                                            <>
                                                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                                Sending...
                                            </>
                                        ) : (
                                            <>
                                                <Send size={16} />
                                                Send {activeType.label} Prescription
                                            </>
                                        )}
                                    </button>
                                )}
                            </div>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}