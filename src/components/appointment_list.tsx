"use client";
import { Filter } from "@/constant/appointment_filters";
import { AppointmentResponse } from "@/types/appointments";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { format } from "date-fns";
import { motion, AnimatePresence } from "motion/react";
import {
    Calendar,
    Clock,
    Video,
    Phone,
    MapPin,
    FileText,
    ChevronDown,
    ChevronUp,
    Stethoscope,
    AlertCircle,
    StickyNote,
    Paperclip,
    CheckCircle2,
    XCircle,
    RefreshCw,
} from "lucide-react";
import toast from "react-hot-toast";
import Spinner from "./ui/spinner";
import { useState } from "react";

function formatTime(start: string, end: string) {
    return `${format(new Date(start), "hh:mm a")} – ${format(new Date(end), "hh:mm a")}`;
}

function formatDate(date: string) {
    return format(new Date(date), "EEE, dd MMM yyyy");
}

function formatDOB(dob: string | null) {
    if (!dob) return null;
    return format(new Date(dob), "dd MMM yyyy");
}

type Props = {
    selectedFilter: Filter;
    selectedDate: string;
};

export default function AppointmentList({ selectedFilter, selectedDate }: Props) {
    const queryClient = useQueryClient();

    const { data, isLoading, isFetching } = useQuery<AppointmentResponse[] | []>({
        queryKey: ["appointment", selectedDate, selectedFilter.value],
        queryFn: async () => {
            const res = await axios.get("/api/v1/doctor/appointment", {
                params: { date: selectedDate, status: selectedFilter.value },
                withCredentials: true,
            });
            return res.data;
        },
    });

    const { mutate, isPending, variables } = useMutation({
        mutationFn: async ({ id, status }: { id: string; status: string }) => {
            const response = await axios.post(
                `/api/v1/doctor/appointment/${id}`,
                { status },
                { withCredentials: true }
            );
            return response.data;
        },
        onSuccess: async (val) => {
            toast.success(val?.message);
            await queryClient.invalidateQueries({
                queryKey: ["appointment", selectedDate, selectedFilter.value],
            });
        },
        onError: (err: AxiosError<{ error: string }>) => {
            toast.error(err.response?.data?.error || "Something went wrong");
        },
    });

    function handleChangeStatus(id: string, status: "COMPLETED" | "CANCELLED") {
        if (!id || !status) return toast.error("Invalid Operation!");
        mutate({ id, status });
    }

    // Skeleton loading state
    if ((isLoading || isFetching) && !data) {
        return (
            <div className="w-full p-5 flex flex-col gap-3">
                {Array.from({ length: 4 }).map((_, i) => (
                    <SkeletonCard key={i} index={i} />
                ))}
            </div>
        );
    }

    if (!data?.length) {
        return (
            <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="w-full flex flex-col items-center justify-center py-24 gap-3 text-slate-400"
            >
                <div className="w-14 h-14 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center">
                    <Calendar size={24} className="text-slate-300" />
                </div>
                <p className="text-sm font-medium text-slate-500">No appointments found</p>
                <p className="text-xs text-slate-400">Try changing the date or filter</p>
            </motion.div>
        );
    }

    return (
        <div className="w-full p-5 flex flex-col gap-3">
            <AnimatePresence mode="popLayout">
                {data.map((appt, index) => (
                    <AppointmentCard
                        key={appt.id}
                        appt={appt}
                        index={index}
                        onChangeStatus={handleChangeStatus}
                        isPending={isPending}
                        pendingId={variables?.id}
                        pendingStatus={variables?.status}
                    />
                ))}
            </AnimatePresence>
        </div>
    );
}


const statusConfig: Record<string, { bg: string; text: string; dot: string }> = {
    CONFIRMED: {
        bg: "bg-emerald-50",
        text: "text-emerald-700",
        dot: "bg-emerald-500",
    },
    COMPLETED: {
        bg: "bg-sky-50",
        text: "text-sky-700",
        dot: "bg-sky-500",
    },
    CANCELLED: {
        bg: "bg-rose-50",
        text: "text-rose-600",
        dot: "bg-rose-400",
    },
};

function SkeletonCard({ index }: { index: number }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.07, duration: 0.4 }}
            className="w-full rounded-2xl border border-slate-100 bg-white p-5 flex flex-col gap-4"
        >
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-slate-100 animate-pulse" />
                    <div className="flex flex-col gap-1.5">
                        <div className="h-4 w-36 bg-slate-100 rounded-md animate-pulse" />
                        <div className="h-3 w-48 bg-slate-100 rounded-md animate-pulse" />
                    </div>
                </div>
                <div className="h-6 w-24 bg-slate-100 rounded-full animate-pulse" />
            </div>
            <div className="flex gap-4">
                <div className="h-3.5 w-28 bg-slate-100 rounded-md animate-pulse" />
                <div className="h-3.5 w-36 bg-slate-100 rounded-md animate-pulse" />
                <div className="h-3.5 w-24 bg-slate-100 rounded-md animate-pulse" />
            </div>
            <div className="flex items-center justify-between pt-1">
                <div className="h-3 w-40 bg-slate-100 rounded-md animate-pulse" />
                <div className="flex gap-2">
                    <div className="h-8 w-20 bg-slate-100 rounded-lg animate-pulse" />
                    <div className="h-8 w-16 bg-slate-100 rounded-lg animate-pulse" />
                </div>
            </div>
        </motion.div>
    );
}

function ContextSection({ ctx }: { ctx: NonNullable<AppointmentResponse["appointmentContexts"]> }) {
    return (
        <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
            className="overflow-hidden"
        >
            <div className="pt-1 pb-1">
                <div className="rounded-xl bg-slate-50 border border-slate-100 p-4 flex flex-col gap-3">
                    <p className="text-[11px] font-semibold uppercase tracking-widest text-slate-400">
                        Appointment Context
                    </p>

                    {ctx.reason && (
                        <div className="flex gap-2.5">
                            <Stethoscope size={14} className="text-teal-500 mt-0.5 shrink-0" />
                            <div>
                                <p className="text-[11px] text-slate-400 font-medium mb-0.5">Reason</p>
                                <p className="text-sm text-slate-700">{ctx.reason}</p>
                            </div>
                        </div>
                    )}

                    {ctx.symptoms && (
                        <div className="flex gap-2.5">
                            <AlertCircle size={14} className="text-amber-500 mt-0.5 shrink-0" />
                            <div>
                                <p className="text-[11px] text-slate-400 font-medium mb-0.5">Symptoms</p>
                                <p className="text-sm text-slate-700">{ctx.symptoms}</p>
                            </div>
                        </div>
                    )}

                    {ctx.notes && (
                        <div className="flex gap-2.5">
                            <StickyNote size={14} className="text-violet-400 mt-0.5 shrink-0" />
                            <div>
                                <p className="text-[11px] text-slate-400 font-medium mb-0.5">Notes</p>
                                <p className="text-sm text-slate-700">{ctx.notes}</p>
                            </div>
                        </div>
                    )}

                    {ctx.contextDocuments.length > 0 && (
                        <div className="flex gap-2.5">
                            <Paperclip size={14} className="text-sky-500 mt-0.5 shrink-0" />
                            <div className="w-full">
                                <p className="text-[11px] text-slate-400 font-medium mb-1.5">Documents</p>
                                <div className="flex flex-wrap gap-2">
                                    {ctx.contextDocuments.map((doc) => (
                                        <a
                                            key={doc.id}
                                            href={doc.fileUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-white border border-slate-200 text-xs text-slate-600 hover:border-sky-300 hover:text-sky-600 transition"
                                        >
                                            <FileText size={12} />
                                            <span className="max-w-[160px] truncate">{doc.fileName}</span>
                                            <span className="text-slate-300">·</span>
                                            <span className="text-slate-400 uppercase">{doc.documentType}</span>
                                        </a>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </motion.div>
    );
}

function AppointmentCard({ appt, index, onChangeStatus, isPending, pendingId, pendingStatus }: {
    appt: AppointmentResponse;
    index: number;
    onChangeStatus: (id: string, status: "COMPLETED" | "CANCELLED") => void;
    isPending: boolean;
    pendingId: string | undefined;
    pendingStatus: string | undefined;
}) {
    const [expanded, setExpanded] = useState(false);

    const meeting = appt.meeting;
    const ctx = appt.appointmentContexts;
    const isCompleted = appt.status === "COMPLETED";
    const isCancelled = appt.status === "CANCELLED";
    const isFinished = isCompleted || isCancelled;

    const isCompleting = isPending && pendingId === appt.id && pendingStatus === "COMPLETED";
    const isCancelling = isPending && pendingId === appt.id && pendingStatus === "CANCELLED";

    const badge = statusConfig[appt.status] ?? { bg: "bg-slate-50", text: "text-slate-600", dot: "bg-slate-400" };
    const initials = appt.patient.name.split(" ").map((n) => n[0]).slice(0, 2).join("").toUpperCase();

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12, scale: 0.98 }}
            transition={{ delay: index * 0.06, duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
            layout
            className={`w-full rounded-2xl border bg-white overflow-hidden transition-shadow duration-300 hover:shadow-md ${isCancelled ? "border-rose-100 opacity-75" : isCompleted ? "border-sky-100" : "border-slate-200"
                }`}
        >
            <div
                className={`h-0.5 w-full ${isCompleted ? "bg-sky-400" : isCancelled ? "bg-rose-300" : "bg-emerald-400"
                    }`}
            />

            <div className="p-5 flex flex-col gap-3.5">
                {/* Header row */}
                <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                        {/* Avatar */}
                        <div
                            className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold shrink-0 ${isCancelled
                                ? "bg-rose-50 text-rose-400"
                                : isCompleted
                                    ? "bg-sky-50 text-sky-600"
                                    : "bg-teal-50 text-teal-600"
                                }`}
                        >
                            {initials}
                        </div>

                        <div>
                            <p className="text-sm font-semibold text-slate-800 leading-tight">
                                {appt.patient.name}
                            </p>
                            <p className="text-xs text-slate-400 mt-0.5">{appt.patient.email}</p>
                        </div>
                    </div>

                    {/* Status badge */}
                    <span
                        className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold shrink-0 ${badge.bg} ${badge.text}`}
                    >
                        <span className={`w-1.5 h-1.5 rounded-full ${badge.dot}`} />
                        {appt.status}
                    </span>
                </div>

                {/* Patient meta row */}
                <div className="flex flex-wrap gap-x-5 gap-y-1.5">
                    {appt.patient.phone && (
                        <span className="flex items-center gap-1.5 text-xs text-slate-500">
                            <Phone size={12} className="text-slate-400" />
                            {appt.patient.phone}
                        </span>
                    )}
                    {appt.patient.dob && (
                        <span className="flex items-center gap-1.5 text-xs text-slate-500">
                            <Calendar size={12} className="text-slate-400" />
                            DOB: {formatDOB(appt.patient.dob)}
                        </span>
                    )}
                    {appt.patient.address && (
                        <span className="flex items-center gap-1.5 text-xs text-slate-500">
                            <MapPin size={12} className="text-slate-400" />
                            <span className="max-w-[200px] truncate">{appt.patient.address}</span>
                        </span>
                    )}
                </div>

                {/* Meeting time row */}
                {meeting && (
                    <div className="flex flex-wrap items-center gap-4 text-sm text-slate-600 bg-slate-50 rounded-xl px-3.5 py-2.5">
                        <span className="flex items-center gap-2">
                            <Calendar size={14} className="text-teal-500" />
                            {formatDate(meeting.startTime)}
                        </span>
                        <span className="w-px h-4 bg-slate-200 hidden sm:block" />
                        <span className="flex items-center gap-2">
                            <Clock size={14} className="text-teal-500" />
                            {formatTime(meeting.startTime, meeting.endTime)}
                        </span>
                        {meeting.provider && (
                            <>
                                <span className="w-px h-4 bg-slate-200 hidden sm:block" />
                                <span className="flex items-center gap-1.5 text-xs text-slate-400 font-medium uppercase tracking-wide">
                                    <Video size={12} />
                                    {meeting.provider.replace("_", " ")}
                                </span>
                            </>
                        )}
                    </div>
                )}

                {/* Expandable context */}
                {ctx && (
                    <div>
                        <button
                            onClick={() => setExpanded((v) => !v)}
                            className="flex items-center gap-1.5 text-xs text-slate-500 hover:text-teal-600 transition font-medium"
                        >
                            {expanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                            {expanded ? "Hide context" : "View appointment context"}
                        </button>
                        <AnimatePresence>
                            {expanded && <ContextSection ctx={ctx} />}
                        </AnimatePresence>
                    </div>
                )}

                {/* Divider + Footer row */}
                <div className="flex items-center justify-between pt-0.5">
                    <p className="text-xs text-slate-400">
                        Booked {formatDate(appt.createdAt)}
                    </p>

                    <div className="flex items-center gap-2">
                        {/* Join Meeting */}
                        {!isFinished && meeting?.meetingLink && (
                            <motion.a
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.97 }}
                                href={meeting.meetingLink}
                                target="_blank"
                                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg bg-teal-600 text-white hover:bg-teal-700 transition shadow-sm shadow-teal-100"
                            >
                                <Video size={13} />
                                Join
                            </motion.a>
                        )}

                        {/* Complete */}
                        {!isFinished && (
                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.97 }}
                                disabled={isPending}
                                onClick={() => onChangeStatus(appt.id, "COMPLETED")}
                                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg border border-emerald-200 text-emerald-700 hover:bg-emerald-50 transition disabled:opacity-50 min-w-[82px] justify-center"
                            >
                                {isCompleting ? (
                                    <Spinner />
                                ) : (
                                    <>
                                        <CheckCircle2 size={13} />
                                        Complete
                                    </>
                                )}
                            </motion.button>
                        )}

                        {/* Cancel */}
                        {!isFinished && (
                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.97 }}
                                disabled={isPending}
                                onClick={() => onChangeStatus(appt.id, "CANCELLED")}
                                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg border border-rose-200 text-rose-600 hover:bg-rose-50 transition disabled:opacity-50 min-w-[68px] justify-center"
                            >
                                {isCancelling ? (
                                    <Spinner />
                                ) : (
                                    <>
                                        <XCircle size={13} />
                                        Cancel
                                    </>
                                )}
                            </motion.button>
                        )}

                        {/* Reschedule */}
                        {!isFinished && (
                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.97 }}
                                disabled={isPending}
                                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 transition disabled:opacity-50"
                            >
                                <RefreshCw size={13} />
                                Reschedule
                            </motion.button>
                        )}
                    </div>
                </div>
            </div>
        </motion.div>
    );
}
