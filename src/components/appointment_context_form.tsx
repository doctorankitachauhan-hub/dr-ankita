"use client";

import { AnimatePresence, motion } from "motion/react";
import { useCallback, useRef, useState } from "react";
import { AlertCircle, CheckCircle2, Clock3, FileText, Paperclip, Trash2, Upload, X } from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import toast from "react-hot-toast";
import Spinner from "./ui/spinner";
import { cn } from "@/lib/utils";
import { getUploadSignature, uploadToCloudinary } from "@/lib/uploadToCloudinary";


export type AppointmentContextData = {
    reason: string;
    symptoms: string;
    notes: string;
    files: UploadedFile[];
};

type UploadedFile = {
    fileName: string;
    fileUrl: string;
    fileType: string;
    fileSize: number;
    documentType: DocumentType;
};

type DocumentType =
    | "PRESCRIPTION"
    | "LAB_REPORT"
    | "SCAN_XRAY"
    | "DISCHARGE_SUMMARY"
    | "OTHER";

type LocalFile = {
    id: string;
    file: File;
    documentType: DocumentType;
    uploading: boolean;
    uploaded: boolean;
    fileUrl?: string;
    error?: string;
};

type BookingState =
    | { phase: "idle" }
    | { phase: "uploading" }
    | { phase: "paying" }
    | { phase: "polling"; orderId: string }
    | { phase: "success" }
    | { phase: "failed"; reason: string };

type Slot = { id: string; startTime: string; endTime: string };

const DOCUMENT_TYPE_LABELS: Record<DocumentType, string> = {
    PRESCRIPTION: "Prescription",
    LAB_REPORT: "Lab Report",
    SCAN_XRAY: "Scan / X-Ray",
    DISCHARGE_SUMMARY: "Discharge Summary",
    OTHER: "Other",
};

const POLL_INTERVAL_MS = 2000;
const MAX_POLLS = 10;
const MAX_FILE_SIZE_MB = 10;
const ACCEPTED_TYPES = ["application/pdf", "image/jpeg", "image/png", "image/webp"];

function formatTime(start: string, end: string) {
    return `${new Date(start).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })} – ${new Date(end).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}`;
}

function formatDate(iso: string) {
    return new Date(iso).toLocaleDateString([], {
        weekday: "long",
        month: "long",
        day: "numeric",
    });
}

function formatBytes(bytes: number) {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

async function pollBookingStatus(
    orderId: string
): Promise<"SUCCESS" | "FAILED" | "PENDING"> {
    const res = await axios.get(
        `/api/v1/user/booking-status?orderId=${orderId}`,
        { withCredentials: true }
    );
    return res.data?.status ?? "PENDING";
}


export default function AppointmentContextForm({ slot, date, changeStep }: { slot: Slot; date: string; changeStep: () => void }) {
    const queryClient = useQueryClient();

    const [reason, setReason] = useState("");
    const [symptoms, setSymptomsText] = useState("");
    const [notes, setNotes] = useState("");
    const [localFiles, setLocalFiles] = useState<LocalFile[]>([]);
    const [bookingState, setBookingState] = useState<BookingState>({ phase: "idle" });
    const [isDragging, setIsDragging] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const isBlocked = bookingState.phase === "uploading" || bookingState.phase === "paying" || bookingState.phase === "polling";


    async function uploadFile(localFile: LocalFile) {

        setLocalFiles((prev) =>
            prev.map((f) => (f.id === localFile.id ? { ...f, uploading: true } : f))
        );

        try {
            const sig = await getUploadSignature();
            const result = await uploadToCloudinary(localFile.file, sig);

            setLocalFiles((prev) =>
                prev.map((f) =>
                    f.id === localFile.id
                        ? { ...f, uploading: false, uploaded: true, fileUrl: result.secure_url }
                        : f
                )
            );
        } catch (err: any) {
            setLocalFiles((prev) =>
                prev.map((f) =>
                    f.id === localFile.id
                        ? {
                            ...f,
                            uploading: false,
                            error: err?.message || "Upload failed. Try again.",
                        }
                        : f
                )
            );
        }
    }

    function addFiles(files: FileList | File[]) {
        const arr = Array.from(files);

        for (const file of arr) {
            if (!ACCEPTED_TYPES.includes(file.type)) {
                toast.error(`${file.name}: unsupported file type`);
                continue;
            }
            if (file.size > MAX_FILE_SIZE_MB * 1024 * 1024) {
                toast.error(`${file.name}: exceeds ${MAX_FILE_SIZE_MB}MB limit`);
                continue;
            }

            const localFile: LocalFile = {
                id: crypto.randomUUID(),
                file,
                documentType: "OTHER",
                uploading: false,
                uploaded: false,
            };

            setLocalFiles((prev) => [...prev, localFile]);
            uploadFile(localFile);
        }
    }

    function removeFile(id: string) {
        setLocalFiles((prev) => prev.filter((f) => f.id !== id));
    }

    function setDocumentType(id: string, type: DocumentType) {
        setLocalFiles((prev) =>
            prev.map((f) => (f.id === id ? { ...f, documentType: type } : f))
        );
    }

    function onDrop(e: React.DragEvent) {
        e.preventDefault();
        setIsDragging(false);
        if (e.dataTransfer.files.length) addFiles(e.dataTransfer.files);
    }

    const startPolling = useCallback(
        async (orderId: string) => {
            setBookingState({ phase: "polling", orderId });
            let attempts = 0;

            const tick = async () => {
                attempts++;
                try {
                    const status = await pollBookingStatus(orderId);

                    if (status === "SUCCESS") {
                        setBookingState({ phase: "success" });
                        await queryClient.invalidateQueries({ queryKey: ["slots", date] });
                        return;
                    }
                    if (status === "FAILED") {
                        setBookingState({
                            phase: "failed",
                            reason: "Payment was not confirmed. Please try again.",
                        });
                        return;
                    }
                    if (attempts >= MAX_POLLS) {
                        setBookingState({
                            phase: "failed",
                            reason:
                                "Confirmation is taking longer than expected. Check your email or try again.",
                        });
                        return;
                    }
                    setTimeout(tick, POLL_INTERVAL_MS);
                } catch {
                    setBookingState({
                        phase: "failed",
                        reason: "Could not verify booking. Please contact support.",
                    });
                }
            };

            setTimeout(tick, POLL_INTERVAL_MS);
        },
        [date, queryClient]
    );

    const payment = useMutation({
        mutationFn: async (payload: {
            slotId: string;
            reason: string;
            symptoms: string;
            notes: string;
            files: UploadedFile[];
        }) => {
            const res = await axios.post("/api/v1/user/create-order", payload, {
                withCredentials: true,
            });
            return res.data;
        },
        onMutate: () => setBookingState({ phase: "paying" }),
        onSuccess: async (val) => {
            try {
                const { orderId, amount, key, name, email } = val;

                const options = {
                    key,
                    amount: amount * 100,
                    currency: "INR",
                    name: "Doctor Ankita",
                    description: "Consultation Booking",
                    order_id: orderId,
                    prefill: { name, email },
                    handler: async function () {
                        await startPolling(orderId);
                    },
                    modal: {
                        ondismiss: () => {
                            setBookingState({ phase: "idle" });
                            toast("Payment cancelled", { icon: "👋" });
                        },
                    },
                };

                const rzp = new (window as any).Razorpay(options);

                rzp.on("payment.failed", (response: any) => {
                    setBookingState({
                        phase: "failed",
                        reason:
                            response?.error?.description || "Payment failed. Please try again.",
                    });
                });

                const timeout = setTimeout(() => setBookingState({ phase: "idle" }), 3000);
                rzp.open();
                rzp.on("modal.open", () => clearTimeout(timeout));
            } catch {
                setBookingState({
                    phase: "failed",
                    reason: "Payment UI failed to open. Please try again.",
                });
            }
        },
        onError: (err: AxiosError<{ error: string }>) => {
            setBookingState({ phase: "idle" });
            toast.error(err.response?.data?.error || "Something went wrong");
        },
    });

    function handleSubmit() {
        if (!reason.trim()) {
            toast.error("Please describe the reason for your visit");
            return;
        }

        const pendingUploads = localFiles.filter((f) => f.uploading);
        if (pendingUploads.length > 0) {
            toast.error("Please wait for all files to finish uploading");
            return;
        }

        const failedUploads = localFiles.filter((f) => f.error);
        if (failedUploads.length > 0) {
            toast.error("Some files failed to upload. Remove them or retry.");
            return;
        }

        const uploadedFiles: UploadedFile[] = localFiles
            .filter((f) => f.uploaded && f.fileUrl)
            .map((f) => ({
                fileName: f.file.name,
                fileUrl: f.fileUrl!,
                fileType: f.file.type,
                fileSize: f.file.size,
                documentType: f.documentType,
            }));

        payment.mutate({
            slotId: slot.id,
            reason: reason.trim(),
            symptoms: symptoms.trim(),
            notes: notes.trim(),
            files: uploadedFiles,
        });
    }


    return (
        <>
            <AnimatePresence>
                {(bookingState.phase === "polling" ||
                    bookingState.phase === "paying" ||
                    bookingState.phase === "uploading") && (
                        <motion.div
                            key="overlay-loading"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center"
                        >
                            <motion.div
                                initial={{ scale: 0.9, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                className="bg-white rounded-2xl p-8 flex flex-col items-center gap-4 shadow-xl w-72"
                            >
                                <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center">
                                    <Clock3 className="text-blue-500 w-6 h-6 animate-pulse" />
                                </div>
                                <p className="text-sm font-semibold text-slate-700">
                                    {bookingState.phase === "paying"
                                        ? "Opening payment..."
                                        : bookingState.phase === "uploading"
                                            ? "Uploading files..."
                                            : "Confirming your booking…"}
                                </p>
                                <p className="text-xs text-slate-400 text-center">
                                    {bookingState.phase === "polling"
                                        ? "Waiting for payment confirmation. Don't close this window."
                                        : "Please wait"}
                                </p>
                                <Spinner />
                            </motion.div>
                        </motion.div>
                    )}

                {bookingState.phase === "success" && (
                    <motion.div
                        key="overlay-success"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center"
                    >
                        <motion.div
                            initial={{ scale: 0.85, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            className="bg-white rounded-2xl p-8 flex flex-col items-center gap-4 shadow-xl w-72"
                        >
                            <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ type: "spring", stiffness: 200, damping: 14 }}
                                className="w-14 h-14 rounded-full bg-green-50 flex items-center justify-center"
                            >
                                <CheckCircle2 className="text-green-500 w-8 h-8" />
                            </motion.div>
                            <p className="text-base font-semibold text-slate-800">
                                Booking Confirmed!
                            </p>
                            <p className="text-xs text-slate-500 text-center">
                                A confirmation and Google Meet link has been sent to your email.
                            </p>
                            <button
                                onClick={() => (setBookingState({ phase: "idle" }), changeStep())}
                                className="mt-2 w-full py-2.5 rounded-xl bg-green-500 text-white text-sm font-medium hover:bg-green-600 transition"
                            >
                                Done
                            </button>
                        </motion.div>
                    </motion.div>
                )}

                {bookingState.phase === "failed" && (
                    <motion.div
                        key="overlay-failed"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center"
                    >
                        <motion.div
                            initial={{ scale: 0.85, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            className="bg-white rounded-2xl p-8 flex flex-col items-center gap-4 shadow-xl w-72"
                        >
                            <div className="w-14 h-14 rounded-full bg-red-50 flex items-center justify-center">
                                <AlertCircle className="text-red-500 w-8 h-8" />
                            </div>
                            <p className="text-base font-semibold text-slate-800">
                                Booking Failed
                            </p>
                            <p className="text-xs text-slate-500 text-center">
                                {bookingState.reason}
                            </p>
                            <button
                                onClick={() => setBookingState({ phase: "idle" })}
                                className="mt-2 w-full py-2.5 rounded-xl bg-slate-800 text-white text-sm font-medium hover:bg-slate-700 transition"
                            >
                                Try Again
                            </button>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            <div className="space-y-6">

                <div className="rounded-2xl bg-white border border-slate-200 shadow-sm p-5">
                    <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-widest mb-1">
                        Your Appointment
                    </p>
                    <p className="text-xl font-semibold text-slate-800">
                        {formatTime(slot.startTime, slot.endTime)}
                    </p>
                    <p className="text-sm text-slate-500 mt-0.5">{formatDate(slot.startTime)}</p>
                </div>

                <div className="rounded-2xl bg-white border border-slate-200 shadow-sm p-5 space-y-2">
                    <label className="block text-sm font-semibold text-slate-700">
                        Reason for visit
                        <span className="text-rose-500 ml-0.5">*</span>
                    </label>
                    <p className="text-xs text-slate-400">
                        Help the doctor prepare before your appointment
                    </p>
                    <textarea
                        value={reason}
                        onChange={(e) => setReason(e.target.value)}
                        disabled={isBlocked}
                        rows={3}
                        placeholder="e.g. Irregular periods for the past 3 months, seeking guidance…"
                        className="w-full text-sm text-slate-800 placeholder:text-slate-300 border border-slate-200 rounded-xl px-4 py-3 resize-none focus:outline-none focus:ring-2 focus:ring-primary-color/30 focus:border-primary-color transition disabled:opacity-50"
                    />
                </div>

                <div className="rounded-2xl bg-white border border-slate-200 shadow-sm p-5 space-y-2">
                    <label className="block text-sm font-semibold text-slate-700">
                        Current symptoms
                        <span className="text-slate-400 font-normal ml-1">(optional)</span>
                    </label>
                    <textarea
                        value={symptoms}
                        onChange={(e) => setSymptomsText(e.target.value)}
                        disabled={isBlocked}
                        rows={2}
                        placeholder="e.g. Bloating, pelvic pain, spotting…"
                        className="w-full text-sm text-slate-800 placeholder:text-slate-300 border border-slate-200 rounded-xl px-4 py-3 resize-none focus:outline-none focus:ring-2 focus:ring-primary-color/30 focus:border-primary-color transition disabled:opacity-50"
                    />
                </div>

                <div className="rounded-2xl bg-white border border-slate-200 shadow-sm p-5 space-y-2">
                    <label className="block text-sm font-semibold text-slate-700">
                        Additional notes
                        <span className="text-slate-400 font-normal ml-1">(optional)</span>
                    </label>
                    <textarea
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        disabled={isBlocked}
                        rows={2}
                        placeholder="Any medications you're currently on, allergies, previous treatments…"
                        className="w-full text-sm text-slate-800 placeholder:text-slate-300 border border-slate-200 rounded-xl px-4 py-3 resize-none focus:outline-none focus:ring-2 focus:ring-primary-color/30 focus:border-primary-color transition disabled:opacity-50"
                    />
                </div>

                <div className="rounded-2xl bg-white border border-slate-200 shadow-sm p-5 space-y-4">
                    <div>
                        <p className="text-sm font-semibold text-slate-700">
                            Upload documents
                            <span className="text-slate-400 font-normal ml-1">(optional)</span>
                        </p>
                        <p className="text-xs text-slate-400 mt-0.5">
                            Prescriptions, lab reports, scans — PDF or image, max {MAX_FILE_SIZE_MB}MB each
                        </p>
                    </div>

                    <div
                        onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
                        onDragLeave={() => setIsDragging(false)}
                        onDrop={onDrop}
                        onClick={() => fileInputRef.current?.click()}
                        className={cn(
                            "border-2 border-dashed rounded-xl p-6 flex flex-col items-center justify-center gap-2 cursor-pointer transition-all",
                            isDragging
                                ? "border-primary-color bg-primary-color/5"
                                : "border-slate-200 hover:border-slate-400 hover:bg-slate-50"
                        )}
                    >
                        <Upload
                            size={22}
                            className={cn(
                                "transition-colors",
                                isDragging ? "text-primary-color" : "text-slate-400"
                            )}
                        />
                        <p className="text-sm text-slate-500">
                            <span className="font-medium text-slate-700">Click to upload</span>{" "}
                            or drag & drop
                        </p>
                        <p className="text-xs text-slate-400">PDF, JPG, PNG, WEBP</p>
                        <input
                            ref={fileInputRef}
                            type="file"
                            multiple
                            accept={ACCEPTED_TYPES.join(",")}
                            className="hidden"
                            onChange={(e) => e.target.files && addFiles(e.target.files)}
                        />
                    </div>

                    <AnimatePresence>
                        {localFiles.map((lf) => (
                            <motion.div
                                key={lf.id}
                                initial={{ opacity: 0, y: 8 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -8 }}
                                className={cn(
                                    "flex items-start gap-3 p-3 rounded-xl border",
                                    lf.error
                                        ? "border-rose-200 bg-rose-50"
                                        : lf.uploaded
                                            ? "border-green-200 bg-green-50"
                                            : "border-slate-200 bg-slate-50"
                                )}
                            >
                                <div className="w-9 h-9 rounded-lg bg-white border border-slate-200 flex items-center justify-center shrink-0">
                                    <FileText size={16} className="text-slate-500" />
                                </div>

                                <div className="flex-1 min-w-0 space-y-1.5">
                                    <div className="flex items-center justify-between gap-2">
                                        <p className="text-sm font-medium text-slate-700 truncate">
                                            {lf.file.name}
                                        </p>
                                        <div className="flex items-center gap-1.5 shrink-0">
                                            {lf.uploading && <Spinner />}
                                            {lf.uploaded && (
                                                <CheckCircle2 size={15} className="text-green-500" />
                                            )}
                                            {lf.error && (
                                                <AlertCircle size={15} className="text-rose-500" />
                                            )}
                                            <button
                                                onClick={() => removeFile(lf.id)}
                                                className="text-slate-400 hover:text-slate-700 transition"
                                            >
                                                <Trash2 size={14} />
                                            </button>
                                        </div>
                                    </div>

                                    <p className="text-[11px] text-slate-400">
                                        {formatBytes(lf.file.size)}
                                        {lf.error && (
                                            <span className="text-rose-500 ml-2">{lf.error}</span>
                                        )}
                                    </p>

                                    {!lf.error && (
                                        <select
                                            value={lf.documentType}
                                            onChange={(e) =>
                                                setDocumentType(lf.id, e.target.value as DocumentType)
                                            }
                                            disabled={lf.uploading}
                                            className="w-full text-xs text-slate-600 bg-white border border-slate-200 rounded-lg px-2.5 py-1.5 focus:outline-none focus:ring-1 focus:ring-primary-color/40 disabled:opacity-50"
                                        >
                                            {Object.entries(DOCUMENT_TYPE_LABELS).map(
                                                ([val, label]) => (
                                                    <option key={val} value={val}>
                                                        {label}
                                                    </option>
                                                )
                                            )}
                                        </select>
                                    )}
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>

                <button
                    disabled={isBlocked || !reason.trim()}
                    onClick={handleSubmit}
                    className={cn(
                        "w-full py-4 rounded-2xl font-semibold text-white text-sm shadow-sm transition-all",
                        "bg-primary-color hover:scale-[1.01] active:scale-[0.99]",
                        "disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                    )}
                >
                    {payment.isPending ? (
                        <span className="flex items-center justify-center gap-2">
                            <Spinner color /> Processing…
                        </span>
                    ) : (
                        "Proceed to Payment →"
                    )}
                </button>

                <p className="text-center text-xs text-slate-400 pb-8">
                    You'll be redirected to Razorpay to complete your payment securely.
                </p>
            </div>
        </>
    );
}