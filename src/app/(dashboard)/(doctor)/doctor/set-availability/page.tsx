'use client';
import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { Reorder } from "motion/react";
import toast from "react-hot-toast";
import { AvailabilityType } from "@/types/availability";
import Spinner from "@/components/ui/spinner";

const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

export default function SetDoctorAvailability() {
    const queryClient = useQueryClient();
    const [availability, setAvailability] = useState<AvailabilityType[]>([
        {
            dayOfWeek: 1,
            startTime: "",
            endTime: "",
            slotDuration: 45
        }
    ]);

    const { isFetching, isLoading } = useQuery({
        queryKey: ["doctor_availability"],
        queryFn: async () => {
            const res = await axios.get("/api/v1/doctor/set-availability", {
                withCredentials: true,
            });
            setAvailability(res.data);
            return res.data;
        },
    });

    const { mutate, isPending } = useMutation({
        mutationFn: async () => {
            return axios.post(
                "/api/v1/doctor/set-availability",
                availability,
                { withCredentials: true }
            );
        },
        onSuccess: async () => {
            toast.success("Availability updated");
            await queryClient.invalidateQueries({
                queryKey: ["doctor_availability"]
            });
        },
        onError: (err: AxiosError<{ error: string }>) =>
            toast.error(err.response?.data?.error || "Failed"),
    });

    function isOverlapping(slots: AvailabilityType[], newSlot: AvailabilityType, currentIndex: number) {
        return slots.some((slot, i) => {
            if (i === currentIndex) return false;
            if (slot.dayOfWeek !== newSlot.dayOfWeek) return false;

            return (
                newSlot.startTime < slot.endTime &&
                newSlot.endTime > slot.startTime
            );
        });
    }

    function updateSlot(
        index: number,
        key: keyof AvailabilityType,
        value: any
    ) {
        setAvailability((prev) => {
            const updated = prev.map((item, i) =>
                i === index ? { ...item, [key]: value } : item
            );

            const current = updated[index];

            if (isOverlapping(updated, current, index)) {
                toast.error("Time slots cannot overlap");
                return prev;
            }

            return updated;
        });
    }

    if (isLoading || isFetching) {
        return (
            <div className="max-w-3xl w-full mx-auto p-6 space-y-4">
                {Array.from({ length: 4 }).map((_, i) => (
                    <div
                        key={i}
                        className="relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-5"
                    >
                        <div className="absolute inset-0 -translate-x-full animate-[shimmer_3s_infinite] bg-gradient-to-r from-transparent via-slate-100 to-transparent" />

                        <div className="flex flex-wrap gap-2 mb-4">
                            {Array.from({ length: 5 }).map((_, j) => (
                                <div
                                    key={j}
                                    className="h-6 w-12 rounded-full bg-slate-200"
                                />
                            ))}
                        </div>

                        <div className="grid grid-cols-3 gap-3">
                            <div className="h-10 rounded-lg bg-slate-200" />
                            <div className="h-10 rounded-lg bg-slate-200" />
                            <div className="h-10 rounded-lg bg-slate-200" />
                        </div>

                        <div className="flex justify-end mt-4">
                            <div className="h-4 w-16 bg-slate-200 rounded" />
                        </div>
                    </div>
                ))}
            </div>
        );
    }

    return (
        <div className="max-w-3xl mx-auto p-6 space-y-6">
            <div>
                <h2 className="text-lg font-semibold text-slate-800">
                    Set Availability
                </h2>
                <p className="text-sm text-slate-400">
                    Manage your weekly schedule
                </p>
            </div>

            <Reorder.Group
                axis="y"
                values={availability}
                onReorder={setAvailability}
                className="space-y-4"
            >
                {availability.map((slot, index) => (
                    <Reorder.Item
                        key={index}
                        value={slot}
                        className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
                    >
                        <div className="flex flex-wrap gap-2 mb-4">
                            {days.map((day, i) => (
                                <button
                                    key={i}
                                    onClick={() => updateSlot(index, "dayOfWeek", i)}
                                    className={`px-4 py-1.5 text-xs rounded-full border transition cursor-pointer ${slot.dayOfWeek === i
                                        ? "bg-primary-color text-white border-primary-hover"
                                        : "bg-white text-slate-600 border-slate-200 hover:bg-slate-50"
                                        }`}
                                >
                                    {day.slice(0, 3)}
                                </button>
                            ))}
                        </div>

                        <div className="grid grid-cols-3 gap-3">

                            <input
                                type="time"
                                value={slot.startTime}
                                onChange={(e) =>
                                    updateSlot(index, "startTime", e.target.value)
                                }
                                className="px-3 py-2 rounded-lg border border-slate-200 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-300"
                            />

                            <input
                                type="time"
                                value={slot.endTime}
                                onChange={(e) =>
                                    updateSlot(index, "endTime", e.target.value)
                                }
                                className="px-3 py-2 rounded-lg border border-slate-200 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-300"
                            />

                            <input
                                type="number"
                                value={slot.slotDuration}
                                onChange={(e) =>
                                    updateSlot(index, "slotDuration", Number(e.target.value))
                                }
                                className="px-3 py-2 rounded-lg border border-slate-200 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-300"
                                placeholder="Duration"
                            />
                        </div>

                        <div className="flex justify-end mt-3">
                            <button
                                onClick={() =>
                                    setAvailability((prev) =>
                                        prev.filter((_, i) => i !== index)
                                    )
                                }
                                className="text-xs text-red-500 hover:text-red-600"
                            >
                                Remove
                            </button>
                        </div>
                    </Reorder.Item>
                ))}
            </Reorder.Group>

            <button
                onClick={() =>
                    setAvailability((prev) => [
                        ...prev,
                        {
                            dayOfWeek: prev.length
                                ? prev[prev.length - 1].dayOfWeek
                                : 0,
                            startTime: "",
                            endTime: "",
                            slotDuration: 45,
                        },
                    ])
                }
                className="cursor-pointer w-full py-3 rounded-xl border border-slate-200 text-sm text-slate-600 hover:bg-slate-50 transition"
            >
                + Add Availability
            </button>

            <button
                onClick={() => mutate()}
                disabled={isPending}
                className="cursor-pointer w-full py-3 rounded-xl bg-slate-900 text-white text-sm hover:bg-slate-800 transition"
            >
                {isPending ? <Spinner color /> : "Save Availability"}
            </button>
        </div>
    );
}
