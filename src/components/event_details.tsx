'use client';
import { motion, AnimatePresence } from 'motion/react';
import {
    X, Clock, Video, Phone, Mail, User,
    Stethoscope, StickyNote, AlertCircle, Paperclip,
    FileText, Shield, CalendarClock, CheckCircle2, XCircle
} from 'lucide-react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axios, { AxiosError } from 'axios';
import toast from 'react-hot-toast';
import Spinner from './ui/spinner';
import { useRouter, useSearchParams } from 'next/navigation';
import { SlotResponse } from '@/types/slots';
import { generateInitials } from '@/lib/generate_initials';
import { format } from 'date-fns';
import { ReactNode } from 'react';

function fmt(date: Date | string) {
    return format(new Date(date), 'EEE, dd MMM yyyy · hh:mm a');
}
function fmtTime(date: Date | string) {
    return format(new Date(date), 'hh:mm a');
}

function InfoRow({ label, value }: { label: ReactNode; value: React.ReactNode }) {
    return (
        <div className="flex items-start justify-between gap-4 py-2.5 border-b border-slate-100 last:border-0">
            <span className="text-xs text-slate-400 shrink-0 pt-0.5">{label}</span>
            <span className="text-xs font-medium text-slate-700 text-right">{value}</span>
        </div>
    );
}

function Section({ title, icon: Icon, children }: {
    title: string;
    icon: React.ElementType;
    children: React.ReactNode;
}) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="rounded-xl border border-slate-100 bg-slate-50/60 overflow-hidden"
        >
            <div className="flex items-center gap-2 px-4 py-3 border-b border-slate-100 bg-white">
                <Icon size={13} className="text-slate-400" />
                <span className="text-[11px] font-semibold uppercase tracking-widest text-slate-400">{title}</span>
            </div>
            <div className="px-4 py-1">{children}</div>
        </motion.div>
    );
}

const slotStatusConfig = {
    AVAILABLE: { bg: 'bg-emerald-50', text: 'text-emerald-700', dot: 'bg-emerald-400' },
    BOOKED: { bg: 'bg-amber-50', text: 'text-amber-700', dot: 'bg-amber-400' },
    BLOCKED: { bg: 'bg-slate-100', text: 'text-slate-600', dot: 'bg-slate-400' },
    CANCELLED: { bg: 'bg-rose-50', text: 'text-rose-600', dot: 'bg-rose-400' },
} as const;

export default function EventDetails() {
    const queryClient = useQueryClient();
    const searchParams = useSearchParams();
    const router = useRouter();
    const eventId = searchParams.get('slot_id');
    const hasEventId = !!eventId;

    const closeModal = () => {
        const params = new URLSearchParams(searchParams.toString());
        params.delete('slot_id');
        router.replace(`?${params.toString()}`, { scroll: false });
    };

    const { data, isFetching, isLoading, error } = useQuery<{ data: SlotResponse }>({
        queryKey: ['slot_id', eventId],
        queryFn: async () => {
            const res = await axios.post('/api/v1/doctor/event-slot', { eventId }, { withCredentials: true });
            return res.data;
        },
        placeholderData: (old) => old,
        enabled: hasEventId,
    });

    const slot = data?.data;

    const { mutate: cancelAppt, isPending: cancelling } = useMutation({
        mutationFn: async ({ id, status }: { id: string; status: string }) => {
            const res = await axios.post(`/api/v1/doctor/appointment/${id}`, { status }, { withCredentials: true });
            return res.data;
        },
        onSuccess: async (val) => {
            toast.success(val?.message);
            await Promise.all([
                queryClient.invalidateQueries({ queryKey: ['slot_id', eventId] }),
                queryClient.invalidateQueries({ queryKey: ['slots'] }),
            ]);
        },
        onError: (err: AxiosError<{ error: string }>) => toast.error(err.response?.data?.error || 'Something went wrong'),
    });

    const { mutate: changeSlotStatus, isPending: changingStatus } = useMutation({
        mutationFn: async ({ id, status }: { id: string; status: string }) => {
            const res = await axios.post(`/api/v1/doctor/slots/${id}`, { status }, { withCredentials: true });
            return res.data;
        },
        onSuccess: async (val) => {
            toast.success(val?.message);
            await Promise.all([
                queryClient.invalidateQueries({ queryKey: ['slot_id', eventId] }),
                queryClient.invalidateQueries({ queryKey: ['slots'] }),
            ]);
        },
        onError: (err: AxiosError<{ error: string }>) => toast.error(err.response?.data?.error || 'Something went wrong'),
    });

    if (error) { closeModal(); toast.error((error as Error).message); }
    if (!hasEventId) return null;

    const appt = slot?.appointment;
    const patient = appt?.patient;
    const meeting = appt?.meeting;
    const isCompleted = appt?.status === "COMPLETED"
    const ctx = appt?.appointmentContexts;
    const isLoaded = !isLoading && !isFetching && !!slot;
    const badge = slot ? slotStatusConfig[slot.status] : null;

    return (
        <AnimatePresence>
            {hasEventId && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="fixed inset-0 bg-slate-900/30 backdrop-blur-[2px] z-50 flex items-start justify-center p-6 sm:p-10 overflow-y-auto"
                    onClick={closeModal}
                    data-lenis-prevent
                >
                    <motion.div
                        initial={{ opacity: 0, y: 32, scale: 0.97, filter: 'blur(8px)' }}
                        animate={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
                        exit={{ opacity: 0, y: -20, scale: 0.97, filter: 'blur(8px)' }}
                        transition={{ type: 'spring', stiffness: 220, damping: 24 }}
                        onClick={(e) => e.stopPropagation()}
                        className="w-full max-w-lg bg-white rounded-2xl shadow-2xl shadow-slate-200 border border-slate-200 overflow-hidden"
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100">
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center">
                                    <CalendarClock size={15} className="text-slate-500" />
                                </div>
                                <div>
                                    <h2 className="text-sm font-semibold text-slate-800">Slot Details</h2>
                                    <p className="text-xs text-slate-400 mt-0.5">
                                        {slot ? `${fmtTime(slot.startTime)} – ${fmtTime(slot.endTime)}` : '—'}
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-center gap-2">
                                {badge && (
                                    <span className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold ${badge.bg} ${badge.text}`}>
                                        <span className={`w-1.5 h-1.5 rounded-full ${badge.dot}`} />
                                        {slot?.status}
                                    </span>
                                )}
                                <button
                                    onClick={closeModal}
                                    className="w-7 h-7 rounded-lg flex items-center justify-center text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition"
                                >
                                    <X size={16} />
                                </button>
                            </div>
                        </div>

                        {/* Body */}
                        {!isLoaded ? (
                            <div className="p-6 flex flex-col gap-3">
                                {[80, 120, 96].map((w, i) => (
                                    <motion.div
                                        key={i}
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ delay: i * 0.08 }}
                                        className="h-12 rounded-xl bg-slate-100 animate-pulse"
                                        style={{ width: `${w}%` }}
                                    />
                                ))}
                            </div>
                        ) : (
                            <div className="p-5 flex flex-col gap-3 max-h-[70vh] overflow-y-auto">

                                {/* Slot time */}
                                <Section title="Time Slot" icon={Clock}>
                                    <InfoRow label="Start" value={fmt(slot!.startTime)} />
                                    <InfoRow label="End" value={fmt(slot!.endTime)} />
                                </Section>

                                {/* Patient */}
                                {patient && (
                                    <Section title="Patient" icon={User}>
                                        <div className="flex items-center gap-3 py-3">
                                            <div className="w-9 h-9 rounded-full bg-teal-50 text-teal-700 flex items-center justify-center text-sm font-bold shrink-0">
                                                {generateInitials(patient.name)}
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <p className="text-sm font-semibold text-slate-800 truncate">{patient.name}</p>
                                                <div className="flex flex-wrap gap-x-3 gap-y-0.5 mt-0.5">
                                                    <span className="flex items-center gap-1 text-xs text-slate-400">
                                                        <Mail size={10} /> {patient.email}
                                                    </span>
                                                    {patient.phone && (
                                                        <span className="flex items-center gap-1 text-xs text-slate-400">
                                                            <Phone size={10} /> {patient.phone}
                                                        </span>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </Section>
                                )}

                                {/* Meeting */}
                                {meeting && (
                                    <Section title="Meeting" icon={Video}>
                                        <div className="flex items-center justify-between py-2.5">
                                            <span className="text-xs text-slate-500">Google Meet · Video call</span>
                                            <a
                                                href={meeting.meetingLink}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-teal-600 text-white text-xs font-medium hover:bg-teal-700 transition"
                                            >
                                                <Video size={12} /> Join
                                            </a>
                                        </div>
                                    </Section>
                                )}

                                {/* Appointment Context */}
                                {ctx && (
                                    <Section title="Appointment Context" icon={Stethoscope}>
                                        {ctx.reason && (
                                            <InfoRow
                                                label={<span className="flex items-center gap-1"><Stethoscope size={10} />Reason</span>}
                                                value={ctx.reason}
                                            />
                                        )}
                                        {ctx.symptoms && (
                                            <InfoRow
                                                label={<span className="flex items-center gap-1"><AlertCircle size={10} />Symptoms</span>}
                                                value={ctx.symptoms}
                                            />
                                        )}
                                        {ctx.notes && (
                                            <InfoRow
                                                label={<span className="flex items-center gap-1"><StickyNote size={10} />Notes</span>}
                                                value={ctx.notes}
                                            />
                                        )}
                                        {ctx.contextDocuments.length > 0 && (
                                            <div className="py-2.5">
                                                <p className="flex items-center gap-1 text-xs text-slate-400 mb-2">
                                                    <Paperclip size={10} /> Documents
                                                </p>
                                                <div className="flex flex-wrap gap-1.5">
                                                    {ctx.contextDocuments.map((doc) => (
                                                        <a
                                                            key={doc.id}
                                                            href={doc.fileUrl}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-white border border-slate-200 text-xs text-slate-600 hover:border-teal-300 hover:text-teal-600 transition max-w-[180px]"
                                                        >
                                                            <FileText size={11} />
                                                            <span className="truncate">{doc.fileName ?? doc.documentType}</span>
                                                        </a>
                                                    ))}
                                                </div>
                                            </div>
                                        )}
                                    </Section>
                                )}

                                {/* Empty state */}
                                {!appt && (
                                    <div className="rounded-xl border border-dashed border-slate-200 py-8 flex flex-col items-center gap-2 text-center">
                                        <Shield size={20} className="text-slate-300" />
                                        <p className="text-xs font-medium text-slate-400">No appointment for this slot</p>
                                    </div>
                                )}
                            </div>
                        )}

                        {/* Footer actions */}
                        <div className="flex flex-wrap items-center justify-end gap-2 px-5 py-4 border-t border-slate-100 bg-slate-50/50">
                            <button
                                onClick={closeModal}
                                className="px-3.5 py-2 text-xs font-medium rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-100 transition"
                            >
                                Close
                            </button>

                            {!isCompleted && slot?.status === 'BOOKED' && (
                                <motion.button
                                    whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}
                                    className="px-3.5 py-2 text-xs font-medium rounded-lg border border-sky-200 text-sky-600 hover:bg-sky-50 transition"
                                >
                                    Reschedule
                                </motion.button>
                            )}

                            {!isCompleted && slot?.status === 'BOOKED' && appt?.id && (
                                <motion.button
                                    whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}
                                    disabled={cancelling}
                                    onClick={() => cancelAppt({ id: appt.id, status: 'CANCELLED' })}
                                    className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-medium rounded-lg border border-rose-200 text-rose-600 hover:bg-rose-50 transition disabled:opacity-50"
                                >
                                    {cancelling ? <Spinner /> : <><XCircle size={13} /> Cancel Appointment</>}
                                </motion.button>
                            )}

                            {slot?.status === 'AVAILABLE' && (
                                <motion.button
                                    whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}
                                    disabled={changingStatus}
                                    onClick={() => changeSlotStatus({ id: eventId!, status: 'BLOCKED' })}
                                    className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-medium rounded-lg bg-slate-800 text-white hover:bg-slate-700 transition disabled:opacity-50"
                                >
                                    {changingStatus ? <Spinner /> : <><Shield size={13} /> Block Slot</>}
                                </motion.button>
                            )}

                            {slot?.status === 'BLOCKED' && (
                                <motion.button
                                    whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}
                                    disabled={changingStatus}
                                    onClick={() => changeSlotStatus({ id: eventId!, status: 'AVAILABLE' })}
                                    className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-medium rounded-lg bg-emerald-600 text-white hover:bg-emerald-500 transition disabled:opacity-50"
                                >
                                    {changingStatus ? <Spinner /> : <><CheckCircle2 size={13} /> Unblock Slot</>}
                                </motion.button>
                            )}
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}