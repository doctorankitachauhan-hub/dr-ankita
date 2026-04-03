"use client";
import { AppointmentResponse } from "@/types/appointments";
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
} from "lucide-react";
import { format } from "date-fns";
import { useState } from "react";
import toast from "react-hot-toast";
import { useMutation } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";

type Props = {
    appointment: AppointmentResponse;
    onClose: () => void;
};

function formatDOB(dob: string | null) {
    if (!dob) return null;
    return format(new Date(dob), "dd MMM yyyy");
}

export default function PrescriptionModal({ appointment, onClose }: Props) {
    const [prescription, setPrescription] = useState("");

    const ctx = appointment.appointmentContexts;
    const patient = appointment.patient;
    const initials = patient.name.split(" ").map((n) => n[0]).slice(0, 2).join("").toUpperCase();

    const { mutate, isPending } = useMutation({
        mutationFn: async () => {
            const response = await axios.post('/api/v1/doctor/prescription',
                {
                    appointmentId: appointment.id,
                    userId: appointment.patientId,
                    prescription: prescription
                },
                { withCredentials: true }
            );
            return response.data;
        },
        onSuccess: async (val) => {
            toast.success(val?.message);
            onClose();
            setPrescription("");
        },
        onError: (err: AxiosError<{ error: string }>) => {
            toast.error(err.response?.data?.error || "Something went wrong");
        },
    })

    const handleSubmit = async () => {
        if (!prescription.trim()) {
            toast.error("Please write a prescription");
            return;
        }
        mutate()
    };

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
                        className="relative w-full max-w-3xl max-h-[90vh] bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col"
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
                                        {/* Avatar */}
                                        <div className="w-12 h-12 rounded-full bg-teal-100 flex items-center justify-center text-base font-bold text-teal-600 shrink-0">
                                            {initials}
                                        </div>

                                        {/* Details Grid */}
                                        <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-3">
                                            <div>
                                                <p className="text-[11px] text-slate-400 font-medium mb-0.5">
                                                    Name
                                                </p>
                                                <p className="text-sm font-medium text-slate-700">
                                                    {patient.name}
                                                </p>
                                            </div>

                                            <div>
                                                <p className="text-[11px] text-slate-400 font-medium mb-0.5">
                                                    Email
                                                </p>
                                                <p className="text-sm text-slate-700">{patient.email}</p>
                                            </div>

                                            {patient.phone && (
                                                <div>
                                                    <p className="text-[11px] text-slate-400 font-medium mb-0.5">
                                                        Phone
                                                    </p>
                                                    <p className="text-sm text-slate-700 flex items-center gap-1.5">
                                                        <Phone size={12} className="text-slate-400" />
                                                        {patient.phone}
                                                    </p>
                                                </div>
                                            )}

                                            {patient.dob && (
                                                <div>
                                                    <p className="text-[11px] text-slate-400 font-medium mb-0.5">
                                                        Date of Birth
                                                    </p>
                                                    <p className="text-sm text-slate-700 flex items-center gap-1.5">
                                                        <Calendar size={12} className="text-slate-400" />
                                                        {formatDOB(patient.dob)}
                                                    </p>
                                                </div>
                                            )}

                                            {patient.address && (
                                                <div className="sm:col-span-2">
                                                    <p className="text-[11px] text-slate-400 font-medium mb-0.5">
                                                        Address
                                                    </p>
                                                    <p className="text-sm text-slate-700 flex items-start gap-1.5">
                                                        <MapPin
                                                            size={12}
                                                            className="text-slate-400 mt-0.5 shrink-0"
                                                        />
                                                        <span>{patient.address}</span>
                                                    </p>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>

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
                                                    <p className="text-[11px] text-amber-600 font-medium mb-0.5">
                                                        Reason for Visit
                                                    </p>
                                                    <p className="text-sm text-slate-700 bg-white rounded-lg px-3 py-2 border border-amber-100">
                                                        {ctx.reason}
                                                    </p>
                                                </div>
                                            )}

                                            {ctx.symptoms && (
                                                <div>
                                                    <div className="flex items-center gap-1.5 mb-0.5">
                                                        <AlertCircle size={11} className="text-red-500" />
                                                        <p className="text-[11px] text-red-600 font-medium">
                                                            Symptoms
                                                        </p>
                                                    </div>
                                                    <p className="text-sm text-slate-700 bg-white rounded-lg px-3 py-2 border border-red-100">
                                                        {ctx.symptoms}
                                                    </p>
                                                </div>
                                            )}

                                            {ctx.notes && (
                                                <div>
                                                    <div className="flex items-center gap-1.5 mb-0.5">
                                                        <StickyNote size={11} className="text-violet-500" />
                                                        <p className="text-[11px] text-violet-600 font-medium">
                                                            Additional Notes
                                                        </p>
                                                    </div>
                                                    <p className="text-sm text-slate-700 bg-white rounded-lg px-3 py-2 border border-violet-100">
                                                        {ctx.notes}
                                                    </p>
                                                </div>
                                            )}

                                            {ctx.contextDocuments.length > 0 && (
                                                <div>
                                                    <div className="flex items-center gap-1.5 mb-2">
                                                        <Paperclip size={11} className="text-sky-500" />
                                                        <p className="text-[11px] text-sky-600 font-medium">
                                                            Attached Documents
                                                        </p>
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
                                                                <FileText
                                                                    size={14}
                                                                    className="text-slate-400 group-hover:text-sky-500"
                                                                />
                                                                <span className="max-w-[180px] truncate font-medium">
                                                                    {doc.fileName}
                                                                </span>
                                                                <span className="text-slate-300">·</span>
                                                                <span className="text-[10px] text-slate-400 uppercase tracking-wide">
                                                                    {doc.documentType}
                                                                </span>
                                                            </a>
                                                        ))}
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                )}

                                {/* Prescription Text Area */}
                                <div>
                                    <label className="block mb-2">
                                        <span className="text-sm font-semibold text-slate-700">
                                            Write Prescription *
                                        </span>
                                        <span className="text-xs text-slate-400 ml-2">
                                            Include medication, dosage, and instructions
                                        </span>
                                    </label>
                                    <textarea
                                        value={prescription}
                                        onChange={(e) => setPrescription(e.target.value)}
                                        placeholder="Example:&#10;&#10;Medication: Amoxicillin 500mg&#10;Dosage: 1 tablet, 3 times daily&#10;Duration: 7 days&#10;Instructions: Take with food. Complete the full course.&#10;&#10;Medication: Ibuprofen 400mg&#10;Dosage: 1 tablet as needed&#10;Instructions: Do not exceed 3 tablets per day..."
                                        className="w-full h-64 px-4 py-3 rounded-xl border border-slate-300 focus:border-teal-500 focus:ring-2 focus:ring-teal-100 outline-none resize-none text-sm text-slate-700 placeholder:text-slate-400 transition"
                                    />
                                    <p className="text-xs text-slate-400 mt-1.5">
                                        {prescription.length} characters
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Footer */}
                        <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-slate-200 bg-slate-50">
                            <button
                                onClick={onClose}
                                disabled={isPending}
                                className="px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-200 rounded-lg transition disabled:opacity-50"
                            >
                                Cancel
                            </button>

                            <button
                                onClick={handleSubmit}
                                disabled={isPending || !prescription.trim()}
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
                                        Send Prescription
                                    </>
                                )}
                            </button>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}