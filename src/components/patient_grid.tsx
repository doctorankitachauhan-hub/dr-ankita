"use client";

import { Patient, Appointment, Prescriptions } from "@/types/patient";
import { PrescriptionType } from "@/generated/prisma/enums";
import {
    CalendarIcon,
    PhoneIcon,
    FileTextIcon,
    ZapIcon,
    ClipboardListIcon,
    ClockIcon,
    CheckCircle2Icon,
    CircleDotIcon,
    MailIcon,
    ActivityIcon,
    XIcon,
    ExternalLinkIcon,
    ScrollTextIcon,
    ChevronDownIcon,
} from "lucide-react";
import React, { useState } from "react";
import { format } from "date-fns";
import { motion, AnimatePresence } from "motion/react";

/* ─────────────────────────── helpers ─────────────────────────── */

function isUpcoming(iso: string) {
    return new Date(iso) > new Date();
}

export function getInitials(name: string) {
    return name
        .split(" ")
        .map((w) => w[0])
        .join("")
        .toUpperCase()
        .slice(0, 2);
}

function fmtDate(iso: string) {
    return format(new Date(iso), "dd MMM yyyy");
}

function fmtDateShort(iso: string) {
    return format(new Date(iso), "dd MMM");
}

function fmtTime(iso: string) {
    return format(new Date(iso), "h:mm a");
}

function collectPrescriptions(appointments: Appointment[]): Prescriptions[] {
    return appointments.flatMap((a) => a.prescriptions ?? []);
}


export function PatientAvatar({ name }: { name: string }) {
    return (
        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary-color to-primary-hover flex items-center justify-center text-white font-bold text-sm shadow-md flex-shrink-0 select-none">
            {getInitials(name)}
        </div>
    );
}


function PrescriptionStrip({ prescriptions }: { prescriptions: Prescriptions[] }) {
    if (!prescriptions.length) return null;
    const hasInterim = prescriptions.some((p) => p.type === PrescriptionType.INTERIM);
    const hasFinal = prescriptions.some((p) => p.type === PrescriptionType.FINAL);
    return (
        <div className="flex flex-wrap gap-1.5">
            {hasInterim && (
                <span className="inline-flex items-center gap-1 text-[10px] font-bold tracking-wide px-2.5 py-1 rounded-full bg-amber-50 text-amber-700 border border-amber-200">
                    <ZapIcon size={9} />
                    INTERIM
                </span>
            )}
            {hasFinal && (
                <span className="inline-flex items-center gap-1 text-[10px] font-bold tracking-wide px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                    <CheckCircle2Icon size={9} />
                    FINAL RX
                </span>
            )}
        </div>
    );
}

interface PrescriptionModalProps {
    prescriptions: Prescriptions[];
    patientName: string;
    onClose: () => void;
}

function PrescriptionModal({ prescriptions, patientName, onClose }: PrescriptionModalProps) {
    const [selected, setSelected] = useState<Prescriptions>(prescriptions[0]);

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm"
            onClick={(e) => e.target === e.currentTarget && onClose()}
        >
            <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 10 }}
                transition={{ duration: 0.18 }}
                className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl h-[85vh] flex flex-col overflow-hidden"
            >
                {/* Modal header */}
                <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100 flex-shrink-0">
                    <div>
                        <h2 className="text-sm font-bold text-gray-900 flex items-center gap-2">
                            <ScrollTextIcon size={15} className="text-primary-color" />
                            Prescriptions
                        </h2>
                        <p className="text-xs text-gray-400 mt-0.5">{patientName}</p>
                    </div>
                    <button
                        onClick={onClose}
                        className="w-8 h-8 rounded-xl bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
                    >
                        <XIcon size={14} className="text-gray-600" />
                    </button>
                </div>

                <div className="flex flex-1 overflow-hidden min-h-0">
                    {/* Sidebar */}
                    <div className="w-44 flex-shrink-0 border-r border-gray-100 overflow-y-auto py-2">
                        {prescriptions.map((rx, i) => (
                            <button
                                key={rx.id}
                                onClick={() => setSelected(rx)}
                                className={`w-full text-left px-3 py-3 transition-colors border-r-2 ${selected.id === rx.id
                                    ? "bg-primary-color/10 border-primary-color"
                                    : "border-transparent hover:bg-gray-50"
                                    }`}
                            >
                                <p className="text-xs font-semibold text-gray-800">RX #{i + 1}</p>
                                <p className="text-[10px] text-gray-400 mt-0.5">
                                    {fmtDate(rx.issuedAt)}
                                </p>
                                <span
                                    className={`inline-flex items-center gap-1 text-[9px] font-bold px-1.5 py-0.5 rounded-full mt-1.5 border ${rx.type === PrescriptionType.FINAL
                                        ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                                        : "bg-amber-50 text-amber-700 border-amber-200"
                                        }`}
                                >
                                    {rx.type === PrescriptionType.FINAL ? (
                                        <CheckCircle2Icon size={8} />
                                    ) : (
                                        <ZapIcon size={8} />
                                    )}
                                    {rx.type}
                                </span>
                            </button>
                        ))}
                    </div>

                    {/* Content pane */}
                    <div className="flex-1 overflow-y-auto p-5 flex flex-col gap-4 min-w-0">
                        {/* Meta row */}
                        <div className="flex items-start justify-between gap-3">
                            <div className="space-y-1">
                                <p className="text-[10px] uppercase tracking-widest text-gray-400 font-semibold">
                                    Issued
                                </p>
                                <p className="text-sm font-bold text-gray-800">
                                    {fmtDate(selected.issuedAt)}
                                </p>
                                <span
                                    className={`inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full border ${selected.type === PrescriptionType.FINAL
                                        ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                                        : "bg-amber-50 text-amber-700 border-amber-200"
                                        }`}
                                >
                                    {selected.type === PrescriptionType.FINAL ? (
                                        <CheckCircle2Icon size={9} />
                                    ) : (
                                        <ZapIcon size={9} />
                                    )}
                                    {selected.type}
                                </span>
                            </div>
                            {selected.pdfUrl && (
                                <a
                                    href={selected.pdfUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-2 rounded-xl bg-primary-color text-white hover:opacity-90 transition-opacity flex-shrink-0"
                                >
                                    <ExternalLinkIcon size={12} />
                                    Open PDF
                                </a>
                            )}
                        </div>

                        <div className="border-t border-gray-100" />

                        {/* Content body */}
                        {selected.content ? (
                            <div className="bg-gray-50 rounded-xl p-4 text-xs text-gray-700 leading-relaxed whitespace-pre-wrap font-mono border border-gray-100 flex-1">
                                {selected.content}
                            </div>
                        ) : (
                            <div className="flex-1 flex flex-col items-center justify-center py-12 text-gray-400 gap-3">
                                <div className="w-12 h-12 rounded-2xl bg-gray-100 flex items-center justify-center">
                                    <ScrollTextIcon size={22} className="opacity-40" />
                                </div>
                                <p className="text-xs text-center">
                                    No text content available.
                                    <br />
                                    Open the PDF to view this prescription.
                                </p>
                                {selected.pdfUrl && (
                                    <a
                                        href={selected.pdfUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-xs text-primary-color font-semibold underline underline-offset-2"
                                    >
                                        Open PDF →
                                    </a>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
interface PatientCardProps {
    patient: Patient;
    onView: () => void;
    index?: number;
}

export function PatientCard({ patient, onView }: PatientCardProps) {
    const [apptExpanded, setApptExpanded] = useState(false);
    const [showRxModal, setShowRxModal] = useState(false);

    const allPrescriptions = collectPrescriptions(patient.appointments);
    const hasPrescriptions = allPrescriptions.length > 0;

    const upcoming = patient.appointments.filter((a) => isUpcoming(a.slot.startTime));
    const sortedAppts = [...patient.appointments].sort(
        (a, b) => new Date(b.slot.startTime).getTime() - new Date(a.slot.startTime).getTime()
    );

    return (
        <>
            <div className="w-full h-full bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-200 flex flex-col overflow-hidden">

                <div className="h-[3px] bg-gradient-to-r from-primary-color to-primary-hover" />

                <div className="h-full p-5 flex flex-col gap-4">
                    {/* ── Header ── */}
                    <div className="flex items-start gap-3">
                        <PatientAvatar name={patient.name} />
                        <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 flex-wrap">
                                <h3 className="text-sm font-bold text-gray-900 truncate leading-tight">
                                    {patient.name}
                                </h3>
                                {hasPrescriptions && (
                                    <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-primary-color/10 text-primary-color border border-primary-color/20 flex-shrink-0">
                                        <ClipboardListIcon size={9} />
                                        {allPrescriptions.length} RX
                                    </span>
                                )}
                            </div>
                            <p className="text-xs text-gray-400 truncate mt-0.5 flex items-center gap-1">
                                <MailIcon size={11} className="flex-shrink-0" />
                                {patient.email}
                            </p>
                        </div>
                    </div>

                    <div className="border-t border-gray-100" />

                    {/* ── Meta ── */}
                    <div className="space-y-2">
                        {patient.phone && (
                            <div className="flex items-center gap-2 text-xs text-gray-600">
                                <CalendarIcon size={13} className="text-gray-400 flex-shrink-0" />
                                <span className="font-semibold text-gray-800">{patient.phone}</span>
                            </div>
                        )}
                        <div className="flex items-center gap-2 text-xs text-gray-600">
                            <CalendarIcon size={13} className="text-gray-400 flex-shrink-0" />
                            <span>
                                <span className="font-semibold text-gray-800">
                                    {patient.appointments.length}
                                </span>{" "}
                                appointment{patient.appointments.length !== 1 ? "s" : ""}
                                {upcoming.length > 0 && (
                                    <span className="text-primary-color font-semibold ml-1">
                                        · {upcoming.length} upcoming
                                    </span>
                                )}
                            </span>
                        </div>
                        {hasPrescriptions && (
                            <div className="flex items-center gap-2 text-xs text-gray-600">
                                <ActivityIcon size={13} className="text-gray-400 flex-shrink-0" />
                                <PrescriptionStrip prescriptions={allPrescriptions} />
                            </div>
                        )}
                    </div>

                    {/* ── Appointment chips ── */}
                    {sortedAppts.length > 0 && (
                        <div className="flex flex-wrap gap-1.5">
                            {sortedAppts.slice(0, 3).map((a) => {
                                const up = isUpcoming(a.slot.startTime);
                                return (
                                    <span
                                        key={a.id}
                                        className={`inline-flex items-center gap-1 text-xs px-2.5 py-1 rounded-full border font-medium ${up
                                            ? "bg-primary-color/10 text-primary-color border-primary-color/20"
                                            : "bg-gray-50 text-gray-500 border-gray-200"
                                            }`}
                                    >
                                        {up && <ClockIcon size={11} />}
                                        {fmtDateShort(a.slot.startTime)}
                                    </span>
                                );
                            })}
                            {sortedAppts.length > 3 && (
                                <span className="inline-flex items-center text-xs px-2.5 py-1 rounded-full border bg-gray-50 text-gray-400 border-gray-200">
                                    +{sortedAppts.length - 3} more
                                </span>
                            )}
                        </div>
                    )}

                    {/* ── Action buttons ── */}
                    <div className="flex flex-col gap-1.5">
                        {hasPrescriptions && (
                            <button
                                onClick={() => setShowRxModal(true)}
                                className="w-full flex justify-between items-center text-xs font-semibold px-3 py-2.5 rounded-xl bg-gray-50 text-gray-600 hover:bg-amber-50 hover:text-amber-700 transition-colors group"
                            >
                                <span className="flex items-center gap-2">
                                    <ScrollTextIcon size={13} />
                                    View Prescriptions
                                    <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-md bg-gray-200 text-gray-600 group-hover:bg-amber-200 group-hover:text-amber-700 transition-colors">
                                        {allPrescriptions.length}
                                    </span>
                                </span>
                                <ExternalLinkIcon size={12} className="text-gray-400 group-hover:text-amber-500 transition-colors" />
                            </button>
                        )}
                    </div>

                    <button
                        onClick={onView}
                        className="w-full block mt-auto py-2.5 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-primary-color to-primary-hover hover:opacity-90 active:scale-[0.98] transition-all shadow-sm"
                    >
                        View Full Details
                    </button>
                </div>
            </div>

            <AnimatePresence>
                {showRxModal && (
                    <PrescriptionModal
                        prescriptions={allPrescriptions}
                        patientName={patient.name}
                        onClose={() => setShowRxModal(false)}
                    />
                )}
            </AnimatePresence>
        </>
    );
}


interface PatientGridProps {
    patients: Patient[];
    isLoading: boolean;
    onViewPatient: (patient: Patient) => void;
}

export function PatientGrid({ patients, isLoading, onViewPatient }: PatientGridProps) {
    if (isLoading) return <PatientGridSkeleton count={6} />;

    if (!patients?.length) {
        return (
            <div className="flex flex-col items-center justify-center py-20 text-gray-400 gap-3">
                <div className="w-14 h-14 rounded-2xl bg-gray-100 flex items-center justify-center">
                    <FileTextIcon size={24} className="opacity-40" />
                </div>
                <p className="text-sm font-medium">No patients found</p>
            </div>
        );
    }

    return (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 items-start">
            {patients.map((p, i) => (
                <PatientCard
                    key={p.id}
                    patient={p}
                    onView={() => onViewPatient(p)}
                    index={i}
                />
            ))}
        </div>
    );
}

function SkeletonBlock({ className }: { className: string }) {
    return (
        <div
            className={`rounded-lg ${className}`}
            style={{
                backgroundImage: "linear-gradient(90deg, #f3f4f6 25%, #e9eaec 50%, #f3f4f6 75%)",
                backgroundSize: "200% 100%",
                animation: "shimmer 1.6s infinite",
            }}
        />
    );
}

export function PatientCardSkeleton() {
    return (
        <div className="bg-white border border-gray-100 rounded-2xl p-5 flex flex-col gap-4 shadow-sm">
            <div className="flex items-start gap-3">
                <SkeletonBlock className="w-12 h-12 rounded-2xl flex-shrink-0" />
                <div className="flex-1 flex flex-col gap-2 pt-1">
                    <SkeletonBlock className="h-3.5 w-2/5" />
                    <SkeletonBlock className="h-3 w-3/5" />
                </div>
            </div>
            <div className="border-t border-gray-100" />
            <div className="flex flex-col gap-2.5">
                <div className="flex gap-2 items-center">
                    <SkeletonBlock className="w-3.5 h-3.5 rounded" />
                    <SkeletonBlock className="h-3 w-2/5" />
                </div>
                <div className="flex gap-2 items-center">
                    <SkeletonBlock className="w-3.5 h-3.5 rounded" />
                    <SkeletonBlock className="h-3 w-1/3" />
                </div>
            </div>
            <div className="flex gap-2">
                <SkeletonBlock className="h-6 w-16 rounded-full" />
                <SkeletonBlock className="h-6 w-14 rounded-full" />
            </div>
            <SkeletonBlock className="h-10 w-full rounded-xl" />
        </div>
    );
}

export function PatientGridSkeleton({ count = 6 }: { count?: number }) {
    return (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 items-start">
            {Array.from({ length: count }).map((_, i) => (
                <PatientCardSkeleton key={i} />
            ))}
        </div>
    );
}