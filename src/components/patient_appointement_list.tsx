"use client";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { format } from "date-fns";
import { motion, AnimatePresence } from "motion/react";
import {
    Calendar,
    Clock,
    Video,
    FileText,
    ChevronDown,
    ChevronUp,
    Stethoscope,
    AlertCircle,
    StickyNote,
    Paperclip,
    RotateCcw,
} from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { PatientFilter } from "@/constant/appointment_filters";
import { AppointmentResponse } from "@/types/appointments";


function formatTime(start: string, end: string) {
    return `${format(new Date(start), "hh:mm a")} – ${format(new Date(end), "hh:mm a")}`;
}

function formatDate(date: string) {
    return format(new Date(date), "EEE, dd MMM yyyy");
}


type Props = {
    selectedFilter: PatientFilter;
    selectedDate: string;
};

export default function PatientAppointmentList({ selectedFilter, selectedDate }: Props) {
    const { data, isLoading, isFetching } = useQuery<AppointmentResponse[]>({
        queryKey: ["patient-appointment", selectedDate, selectedFilter.key],
        queryFn: async () => {
            const res = await axios.get("/api/v1/user/appointments", {
                params: { date: selectedDate, status: selectedFilter.key },
                withCredentials: true,
            });
            return res.data;
        },
    });

    if ((isLoading || isFetching) && !data) {
        return (
            <div className="w-full p-5 flex flex-col gap-3">
                {Array.from({ length: 3 }).map((_, i) => (
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
                transition={{ duration: 0.35 }}
                className="w-full flex flex-col items-center justify-center py-24 gap-3"
            >
                <div className="w-14 h-14 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center">
                    <Calendar size={22} className="text-slate-300" />
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
                    <PatientAppointmentCard
                        key={appt.id}
                        appt={appt}
                        index={index}
                    />
                ))}
            </AnimatePresence>
        </div>
    );
}



const AVATAR_PALETTES = [
    { bg: "bg-violet-50", text: "text-violet-700" },
    { bg: "bg-teal-50", text: "text-teal-700" },
    { bg: "bg-sky-50", text: "text-sky-700" },
    { bg: "bg-rose-50", text: "text-rose-600" },
    { bg: "bg-amber-50", text: "text-amber-700" },
];

function getAvatarPalette(name: string) {
    return AVATAR_PALETTES[name.charCodeAt(0) % AVATAR_PALETTES.length];
}

function getInitials(name: string) {
    return name.split(" ").map((n) => n[0]).slice(0, 2).join("").toUpperCase();
}

const STATUS_CONFIG = {
    CONFIRMED: {
        bar: "bg-teal-400",
        border: "border-slate-100",
        badge: "bg-teal-50 text-teal-700",
        dot: "bg-teal-500",
        label: "Upcoming",
    },
    COMPLETED: {
        bar: "bg-sky-400",
        border: "border-sky-100",
        badge: "bg-sky-50 text-sky-700",
        dot: "bg-sky-500",
        label: "Completed",
    },
    CANCELLED: {
        bar: "bg-rose-300",
        border: "border-rose-100",
        badge: "bg-rose-50 text-rose-600",
        dot: "bg-rose-400",
        label: "Cancelled",
    },
};

function ContextSection({ ctx }: { ctx: NonNullable<AppointmentResponse["appointmentContexts"]> }) {
    return (
        <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.28, ease: [0.4, 0, 0.2, 1] }}
            className="overflow-hidden"
        >
            <div className="pt-3">
                <div className="rounded-xl bg-slate-50 border border-slate-100 p-4 flex flex-col gap-3">
                    <p className="text-[11px] font-semibold uppercase tracking-widest text-slate-400">
                        Visit context
                    </p>

                    {ctx.reason && (
                        <div className="flex gap-2.5">
                            <Stethoscope size={13} className="text-teal-500 mt-0.5 shrink-0" />
                            <div>
                                <p className="text-[11px] text-slate-400 font-medium mb-0.5">Reason</p>
                                <p className="text-sm text-slate-700">{ctx.reason}</p>
                            </div>
                        </div>
                    )}

                    {ctx.symptoms && (
                        <div className="flex gap-2.5">
                            <AlertCircle size={13} className="text-amber-500 mt-0.5 shrink-0" />
                            <div>
                                <p className="text-[11px] text-slate-400 font-medium mb-0.5">Symptoms</p>
                                <p className="text-sm text-slate-700">{ctx.symptoms}</p>
                            </div>
                        </div>
                    )}

                    {ctx.notes && (
                        <div className="flex gap-2.5">
                            <StickyNote size={13} className="text-violet-400 mt-0.5 shrink-0" />
                            <div>
                                <p className="text-[11px] text-slate-400 font-medium mb-0.5">Notes</p>
                                <p className="text-sm text-slate-700">{ctx.notes}</p>
                            </div>
                        </div>
                    )}

                    {ctx.contextDocuments.length > 0 && (
                        <div className="flex gap-2.5">
                            <Paperclip size={13} className="text-sky-500 mt-0.5 shrink-0" />
                            <div className="w-full">
                                <p className="text-[11px] text-slate-400 font-medium mb-2">Documents</p>
                                <div className="flex flex-wrap gap-2">
                                    {ctx.contextDocuments.map((doc) => (
                                        <a
                                            key={doc.id}
                                            href={doc.fileUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-white border border-slate-200 text-xs text-slate-600 hover:border-sky-300 hover:text-sky-600 transition"
                                        >
                                            <FileText size={11} />
                                            <span className="max-w-[140px] truncate">{doc.fileName}</span>
                                            <span className="text-slate-300">·</span>
                                            <span className="text-slate-400 uppercase text-[10px]">{doc.documentType}</span>
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

function PatientAppointmentCard({ appt, index, }: { appt: AppointmentResponse; index: number; }) {
    const [expanded, setExpanded] = useState(false);

    const meeting = appt.meeting;
    const ctx = appt.appointmentContexts;
    const cfg = STATUS_CONFIG[appt.status as keyof typeof STATUS_CONFIG];
    const avatar = getAvatarPalette(appt.patient.name);
    const initials = getInitials(appt.patient.name);
    const isConfirmed = appt.status === "CONFIRMED";
    const isCompleted = appt.status === "COMPLETED";

    return (
        <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10, scale: 0.98 }}
            transition={{ delay: index * 0.05, duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
            layout
            className={cn(
                "w-full rounded-2xl border bg-white overflow-hidden transition-all duration-200 hover:shadow-sm",
                cfg.border,
                appt.status === "CANCELLED" && "opacity-70"
            )}
        >
            {/* Top color bar */}
            <div className={cn("h-0.5 w-full", cfg.bar)} />

            <div className="p-5 flex flex-col gap-4">

                <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                        <div className={cn(
                            "w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold shrink-0",
                            avatar.bg, avatar.text
                        )}>
                            {initials}
                        </div>
                        <div>
                            <p className="text-sm font-semibold text-slate-800 leading-tight">
                                {appt.patient.name}
                            </p>
                            <p className="text-xs text-slate-400 mt-0.5">{appt.patient.email}</p>
                        </div>
                    </div>

                    <span className={cn(
                        "flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium shrink-0",
                        cfg.badge
                    )}>
                        <span className={cn("w-1.5 h-1.5 rounded-full", cfg.dot)} />
                        {cfg.label}
                    </span>
                </div>

                {/* Meeting time */}
                {meeting && (
                    <div className="flex flex-wrap items-center gap-3 bg-slate-50 rounded-xl px-3.5 py-2.5 text-xs text-slate-600">
                        <span className="flex items-center gap-1.5">
                            <Calendar size={13} className="text-teal-500" />
                            {formatDate(meeting.startTime)}
                        </span>
                        <span className="w-px h-3.5 bg-slate-200 hidden sm:block" />
                        <span className="flex items-center gap-1.5">
                            <Clock size={13} className="text-teal-500" />
                            {formatTime(meeting.startTime, meeting.endTime)}
                        </span>
                        {meeting.provider && (
                            <>
                                <span className="w-px h-3.5 bg-slate-200 hidden sm:block" />
                                <span className="flex items-center gap-1 text-slate-400 uppercase tracking-wide font-medium">
                                    <Video size={11} />
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
                            className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-teal-600 transition font-medium cursor-pointer"
                        >
                            {expanded ? <ChevronUp size={13} /> : <ChevronDown size={13} />}
                            {expanded ? "Hide details" : "View visit details"}
                        </button>
                        <AnimatePresence>
                            {expanded && <ContextSection ctx={ctx} />}
                        </AnimatePresence>
                    </div>
                )}

                {/* Footer */}
                <div className="flex items-center justify-between pt-0.5 flex-wrap gap-3">
                    <p className="text-xs text-slate-400">
                        Booked {formatDate(appt.createdAt)}
                    </p>

                    <div className="flex items-center gap-2">
                        {isConfirmed && meeting?.meetingLink && (
                            <motion.a
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.97 }}
                                href={meeting.meetingLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg bg-slate-900 text-white hover:bg-slate-700 transition"
                            >
                                <Video size={12} />
                                Join call
                            </motion.a>
                        )}

                        {isCompleted && (
                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.97 }}
                                onClick={() => setExpanded((v) => !v)}
                                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg border border-slate-200 text-slate-500 hover:bg-slate-50 transition cursor-pointer"
                            >
                                <FileText size={12} />
                                {expanded ? "Hide summary" : "View summary"}
                            </motion.button>
                        )}
                    </div>
                </div>
            </div>
        </motion.div>
    );
}

function SkeletonCard({ index }: { index: number }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.07, duration: 0.35 }}
            className="w-full rounded-2xl border border-slate-100 bg-white p-5 flex flex-col gap-4"
        >
            <div className="h-0.5 w-full bg-slate-100 animate-pulse" />
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-slate-100 animate-pulse" />
                    <div className="flex flex-col gap-1.5">
                        <div className="h-3.5 w-32 bg-slate-100 rounded-md animate-pulse" />
                        <div className="h-3 w-44 bg-slate-100 rounded-md animate-pulse" />
                    </div>
                </div>
                <div className="h-6 w-20 bg-slate-100 rounded-full animate-pulse" />
            </div>
            <div className="h-10 w-full bg-slate-100 rounded-xl animate-pulse" />
            <div className="flex items-center justify-between">
                <div className="h-3 w-32 bg-slate-100 rounded-md animate-pulse" />
                <div className="flex gap-2">
                    <div className="h-7 w-20 bg-slate-100 rounded-lg animate-pulse" />
                    <div className="h-7 w-24 bg-slate-100 rounded-lg animate-pulse" />
                </div>
            </div>
        </motion.div>
    );
}

