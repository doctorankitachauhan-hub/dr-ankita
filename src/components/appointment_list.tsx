"use client";
import { Filter } from "@/constant/appointment_filters";
import { AppointmentResponse } from "@/types/appointments";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { format } from "date-fns";
import { Calendar, Clock, Video } from "lucide-react";

function formatTime(start: string, end: string) {
    return `${format(new Date(start), "hh:mm a")} - ${format(
        new Date(end),
        "hh:mm a"
    )}`;
}

function formatDate(date: string) {
    return format(new Date(date), "EEE, dd MMM yyyy");
}

type Props = {
    selectedFilter: Filter;
    selectedDate: string;
};


export default function AppointmentList({ selectedFilter, selectedDate }: Props) {

    const { data, isLoading, isFetching } = useQuery<AppointmentResponse[] | []>({
        queryKey: ["appointment", selectedDate, selectedFilter.value],
        queryFn: async () => {
            const res = await axios.get("/api/v1/doctor/appointment", {
                params: { date: selectedDate, status: selectedFilter.value },
                withCredentials: true
            });
            return res.data;
        }
    });

    if ((isLoading || isFetching) && !data) {
        return (
            <div className="w-full p-5 grid gap-4">
                {Array.from({ length: 5 }).map((_, i) => (
                    <div
                        key={i}
                        className="w-full rounded-2xl border border-slate-200 bg-white p-5 flex flex-col gap-4 animate-pulse"
                    >
                        {/* Top */}
                        <div className="flex items-center justify-between">
                            <div className="flex flex-col gap-2">
                                <div className="h-4 w-32 bg-slate-200 rounded" />
                                <div className="h-3 w-48 bg-slate-100 rounded" />
                            </div>
                            <div className="h-6 w-20 bg-slate-100 rounded-full" />
                        </div>

                        {/* Middle */}
                        <div className="flex items-center gap-6">
                            <div className="h-4 w-28 bg-slate-100 rounded" />
                            <div className="h-4 w-32 bg-slate-100 rounded" />
                        </div>

                        {/* Bottom */}
                        <div className="flex items-center justify-between">
                            <div className="h-3 w-40 bg-slate-100 rounded" />
                            <div className="h-8 w-20 bg-slate-100 rounded-lg" />
                        </div>
                    </div>
                ))}
            </div>
        );
    }

    if (!data?.length) {
        return (
            <div className="w-full flex items-center justify-center py-20 text-slate-400 text-sm">
                No appointments found
            </div>
        );
    }

    return (
        <div className="w-full p-5 grid gap-4">
            {data.map((appt) => {
                const meeting = appt.meeting;
                const isCompleted = appt.status === "COMPLETED";
                const isCancelled = appt.status === "CANCELLED";

                return (
                    <div
                        key={appt.id}
                        className="w-full rounded-2xl border border-slate-200 bg-white p-5 flex flex-col gap-4 hover:shadow-sm transition duration-300"
                    >
                        <div className="flex items-center justify-between">
                            <div className="flex flex-col">
                                <span className="text-base font-semibold text-slate-800">
                                    {appt.patient.name}
                                </span>
                                <span className="text-xs text-slate-400">
                                    {appt.patient.email}
                                </span>
                            </div>

                            <span
                                className={`px-3 py-1 text-xs rounded-full font-medium ${appt.status === "CONFIRMED"
                                    ? "bg-green-50 text-green-600"
                                    : appt.status === "COMPLETED"
                                        ? "bg-blue-50 text-blue-600"
                                        : "bg-red-50 text-red-500"
                                    }`}
                            >
                                {appt.status}
                            </span>
                        </div>

                        {/* Middle Info */}
                        {meeting && (
                            <div className="flex items-center gap-6 text-sm text-slate-600">
                                <div className="flex items-center gap-2">
                                    <Calendar size={16} />
                                    <span>{formatDate(meeting.startTime)}</span>
                                </div>

                                <div className="flex items-center gap-2">
                                    <Clock size={16} />
                                    <span>{formatTime(meeting.startTime, meeting.endTime)}</span>
                                </div>
                            </div>
                        )}

                        {/* Bottom Row */}
                        <div className="flex items-center justify-between">
                            <div className="text-xs text-slate-400">
                                Booked on {formatDate(appt.createdAt)}
                            </div>

                            <div className="flex items-center gap-2">

                                {meeting?.meetingLink && (
                                    <a
                                        href={meeting.meetingLink}
                                        target="_blank"
                                        className="flex items-center gap-2 px-3 py-2 text-sm rounded-lg border border-slate-200 hover:bg-slate-50 transition"
                                    >
                                        <Video size={16} />
                                        Join
                                    </a>
                                )}

                                {/* Complete */}
                                {!isCompleted && !isCancelled && (
                                    <button
                                        onClick={() => console.log(appt.id)}
                                        className="px-3 py-2 text-sm cursor-pointer rounded-lg border border-green-200 text-green-600 hover:bg-green-50 transition"
                                    >
                                        Complete
                                    </button>
                                )}

                                {/* Cancel */}
                                {!isCancelled && (
                                    <button
                                        onClick={() => console.log(appt.id)}
                                        className="px-3 py-2 text-sm cursor-pointer rounded-lg border border-red-200 text-red-500 hover:bg-red-50 transition"
                                    >
                                        Cancel
                                    </button>
                                )}

                                {/* Reschedule */}
                                {!isCancelled && !isCompleted && (
                                    <button
                                        onClick={() => console.log(appt.id)}
                                        className="px-3 py-2 text-sm cursor-pointer rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 transition"
                                    >
                                        Reschedule
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}
