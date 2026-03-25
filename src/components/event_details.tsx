'use client';
import { motion, AnimatePresence } from 'motion/react';
import { X } from 'lucide-react';
import { useMutation, useQuery } from '@tanstack/react-query';
import axios, { AxiosError } from 'axios';
import toast from 'react-hot-toast';
import Spinner from './ui/spinner';
import { useQueryClient } from "@tanstack/react-query";
import { useRouter, useSearchParams } from 'next/navigation';
import { SlotDetails } from '@/types/slots';

export default function EventDetails() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const eventId = searchParams.get("event_id");
    const hasEventId = !!eventId;

    const closeModal = () => {
        const params = new URLSearchParams(searchParams.toString());
        params.delete("event_id");
        router.replace(`?${params.toString()}`, { scroll: false });
    };

    const { data, isFetching, isLoading, error } = useQuery<SlotDetails>({
        queryKey: ["event_slots", eventId],
        queryFn: async () => {
            const res = await axios.post('/api/v1/doctor/event-slot', { eventId }, {
                withCredentials: true,
            });
            return res.data.data;
        },
        placeholderData: (old) => old,
        enabled: hasEventId,
    })

    if (error) {
        closeModal();
        toast.error(error.message)
    }
    if (!hasEventId) return null;
    return (
        <AnimatePresence>
            {hasEventId && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="fixed inset-0 bg-slate-900/20 p-4 pt-10 z-50"
                    onClick={closeModal}
                >

                    <motion.div
                        initial={{ opacity: 0, y: 40, filter: "blur(12px)" }}
                        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                        exit={{ opacity: 0, y: -50, filter: "blur(12px)" }}
                        transition={{
                            type: "spring",
                            stiffness: 200,
                            damping: 22
                        }}
                        onClick={(e) => e.stopPropagation()}
                        className="w-full min-h-80 mx-auto max-w-2xl bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden"
                    >
                        <div className="flex items-start justify-between p-5 border-b border-slate-100">
                            <div>
                                <h2 className="text-lg font-semibold text-slate-800">
                                    Slot Details
                                </h2>
                                <p className="text-sm text-slate-500 mt-1">
                                    {data ? new Date(data.startTime).toLocaleString() : "Loading..."}
                                </p>
                            </div>

                            <div className="flex items-center gap-3">
                                {data && (
                                    <span
                                        className={`px-3 py-1 text-xs font-medium rounded-full ${data.status === "BOOKED"
                                            ? "bg-red-100 text-red-600" : data.status === "BLOCKED" ? "bg-slate-200 text-slate-600" : "bg-green-100 text-green-600"}`}
                                    >
                                        {data.status}
                                    </span>
                                )}

                                <button
                                    onClick={closeModal}
                                    className="text-slate-400 hover:text-slate-600 transition cursor-pointer"
                                >
                                    <X size={20} />
                                </button>
                            </div>
                        </div>

                        {(isLoading || isFetching || !data) ? (
                            <div className="h-56 flex justify-center">
                                <Spinner />
                            </div>
                        ) : (
                            <div className="p-6 space-y-6">

                                <div className="border border-slate-200 rounded-xl p-4 bg-slate-50">
                                    <h3 className="text-sm font-semibold text-slate-700 mb-3">
                                        Slot Details
                                    </h3>

                                    <div className="flex flex-col gap-2 text-sm text-slate-600">
                                        <div className="flex justify-between">
                                            <span>Status</span>
                                            <span className={`font-medium ${data.status === "BOOKED"
                                                ? "text-red-500"
                                                : data.status === "BLOCKED"
                                                    ? "text-slate-500"
                                                    : "text-green-600"
                                                }`}>
                                                {data.status}
                                            </span>
                                        </div>

                                        <div className="flex justify-between">
                                            <span>Start Time</span>
                                            <span className="font-medium text-slate-800">
                                                {new Date(data.startTime).toLocaleString()}
                                            </span>
                                        </div>

                                        <div className="flex justify-between">
                                            <span>End Time</span>
                                            <span className="font-medium text-slate-800">
                                                {new Date(data.endTime).toLocaleString()}
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                {data.appointment?.patient && (
                                    <div className="border border-slate-200 rounded-xl p-4">
                                        <h3 className="text-sm font-semibold text-slate-700 mb-4">
                                            Patient Details
                                        </h3>

                                        <div className="flex items-start gap-4">

                                            <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center text-slate-700 font-semibold text-lg">
                                                {generateInitials(data.appointment.patient.name)}
                                            </div>

                                            <div className="flex-1 space-y-2 text-sm">

                                                <div>
                                                    <p className="text-slate-500 text-xs">Name</p>
                                                    <p className="text-slate-800 font-medium">
                                                        {data.appointment.patient.name}
                                                    </p>
                                                </div>

                                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-2">

                                                    <div>
                                                        <p className="text-slate-500 text-xs">Email</p>
                                                        <p className="text-slate-700 font-medium break-all">
                                                            {data.appointment.patient.email}
                                                        </p>
                                                    </div>

                                                    <div>
                                                        <p className="text-slate-500 text-xs">Phone</p>
                                                        <p className="text-slate-700 font-medium">
                                                            {data.appointment.patient.phone}
                                                        </p>
                                                    </div>

                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}
                                {data.appointment?.meeting && (
                                    <div className="border border-slate-200 rounded-xl p-4">
                                        <h3 className="text-sm font-semibold text-slate-700 mb-3">
                                            Meeting Details
                                        </h3>

                                        <div className="flex items-center justify-between">
                                            <span className="text-sm text-slate-600">
                                                Video Consultation
                                            </span>

                                            <a
                                                href={data.appointment.meeting.meetingLink}
                                                target="_blank"
                                                className="text-sm font-medium text-blue-600 hover:underline"
                                            >
                                                Join Meeting
                                            </a>
                                        </div>
                                    </div>
                                )}

                                {!data.appointment && (
                                    <div className="border border-dashed border-slate-200 rounded-xl p-6 text-center text-sm text-slate-500">
                                        No appointment booked for this slot
                                    </div>
                                )}

                                <div className="flex flex-wrap justify-end gap-3 pt-4 border-t border-slate-100">

                                    <button className="px-4 py-2 text-sm cursor-pointer rounded-lg border border-slate-200 text-slate-700 hover:bg-slate-100 transition"
                                        onClick={closeModal}
                                    >
                                        Close
                                    </button>

                                    {data.status === "BOOKED" && <button className="px-4 py-2 text-sm cursor-pointer rounded-lg border border-blue-200 text-blue-600 hover:bg-blue-50 transition">
                                        Reschedule
                                    </button>}

                                    {data.status === "BOOKED" && (
                                        <button className="px-4 py-2 text-sm cursor-pointer rounded-lg border border-red-200 text-red-600 hover:bg-red-50 transition">
                                            Cancel Appointment
                                        </button>
                                    )}

                                    {data.status === "AVAILABLE" ? (
                                        <button className="px-4 py-2 text-sm cursor-pointer rounded-lg bg-slate-800 text-white hover:bg-slate-700 transition">
                                            Block Slot
                                        </button>
                                    ) : data.status === "BLOCKED" ? (
                                        <button className="px-4 py-2 text-sm cursor-pointer rounded-lg bg-green-600 text-white hover:bg-green-500 transition">
                                            Unblock Slot
                                        </button>
                                    ) : null}

                                </div>
                            </div>
                        )}
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    )
}
