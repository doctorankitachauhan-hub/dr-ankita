'use client';
import { useState } from "react";
import { Plus, Trash2 } from "lucide-react";
import { fromZonedTime } from "date-fns-tz";
import toast from "react-hot-toast";
import { useMutation } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import Spinner from "./ui/spinner";

type SlotsType = {
    date: string;
    startTime: string;
    endTime: string;
};

type CreateSlotsPayload = {
    slots: {
        startTime: string;
        endTime: string;
    }[];
};

function generateTimeSlots() {
    const slots = [];
    for (let h = 9; h < 24; h++) {
        for (let m = 0; m < 60; m += 15) {
            const hh = String(h).padStart(2, "0");
            const mm = String(m).padStart(2, "0");
            const ampm = h < 12 ? "AM" : "PM";
            const h12 = h % 12 === 0 ? 12 : h % 12;
            slots.push({ value: `${hh}:${mm}`, label: `${h12}:${mm} ${ampm}` });
        }
    }
    return slots;
}

const TIME_SLOTS = generateTimeSlots();

export default function CreateSlots() {
    const [slots, setSlots] = useState<SlotsType[]>([
        { date: "", startTime: "", endTime: "" },
    ]);

    function handleAddSlots() {
        setSlots((prev) => [...prev, { date: "", startTime: "", endTime: "" }]);
    }

    function removeSlots(index: number) {
        setSlots((prev) => prev.filter((_, i) => i !== index));
    }

    function handleChange(index: number, field: keyof SlotsType, value: string) {
        setSlots((prev) => {
            const updated = [...prev];
            updated[index][field] = value;
            return updated;
        });
    }

    function convertISTToUTC(date: string, time: string) {
        const dateTimeString = `${date} ${time}`;
        return fromZonedTime(dateTimeString, "Asia/Kolkata");
    }

    function validateSlots() {
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        for (const slot of slots) {
            if (!slot.date || !slot.startTime || !slot.endTime) {
                toast.error("Please fill in all fields");
                return false;
            }
            const selectedDate = new Date(slot.date);
            if (selectedDate < today) {
                toast.error("Past dates are not allowed");
                return false;
            }
            if (slot.startTime >= slot.endTime) {
                toast.error("End time must be after start time");
                return false;
            }
        }
        return true;
    }

    function handleSubmit() {
        if (!validateSlots()) return;

        const formatted = slots.map((slot) => ({
            startTime: convertISTToUTC(slot.date, slot.startTime).toISOString(),
            endTime: convertISTToUTC(slot.date, slot.endTime).toISOString(),
        }));

        mutate({ slots: formatted });
    }

    const createSlots = useMutation({
        mutationFn: async ({ slots }: CreateSlotsPayload) => {
            const response = await axios.post("/api/v1/doctor/slots", { slots });
            return response.data;
        },
        onSuccess: (val) => {
            toast.success(val?.message);
            setSlots([{ date: "", startTime: "", endTime: "" }]);
        },
        onError: (err: AxiosError<{ error: string }>) => {
            toast.error(err.response?.data?.error || "Something went wrong");
        },
    });

    const { mutate, isPending } = createSlots;

    const todayISO = new Date().toISOString().split("T")[0];

    return (
        <div className="w-full min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6">
            <div className="w-full bg-white p-6 rounded-3xl shadow-lg border border-gray-100">

                {/* Header */}
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h2 className="text-2xl font-semibold text-gray-800">Create Slots</h2>
                        <p className="text-sm text-gray-500">Add your availability for patients</p>
                    </div>
                    <button
                        onClick={handleAddSlots}
                        className="flex items-center gap-2 bg-primary-color text-white px-4 py-2 rounded-xl hover:bg-primary-hover transition cursor-pointer"
                    >
                        <Plus size={16} />
                        Add Slot
                    </button>
                </div>

                {/* Slot Cards */}
                <div className="space-y-4">
                    {slots.map((slot, index) => {
                        const isInvalid =
                            slot.startTime && slot.endTime && slot.startTime >= slot.endTime;

                        return (
                            <div
                                key={index}
                                className={`relative bg-white border rounded-2xl p-5 transition ${isInvalid ? "border-red-300" : "border-gray-200"
                                    }`}
                            >
                                {/* Slot number */}
                                <p className="text-xs text-gray-400 font-medium mb-4">
                                    Slot {index + 1} of {slots.length}
                                </p>

                                {/* Delete button */}
                                {slots.length > 1 && (
                                    <button
                                        onClick={() => removeSlots(index)}
                                        className="absolute top-4 right-4 text-gray-300 hover:text-red-500 transition cursor-pointer"
                                        title="Remove slot"
                                    >
                                        <Trash2 size={16} />
                                    </button>
                                )}

                                <div className="grid md:grid-cols-3 gap-4">
                                    {/* Date */}
                                    <div>
                                        <label className="text-xs text-gray-500 mb-1.5 block">
                                            Date
                                        </label>
                                        <input
                                            type="date"
                                            min={todayISO}
                                            value={slot.date}
                                            onChange={(e) =>
                                                handleChange(index, "date", e.target.value)
                                            }
                                            className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:ring-1 focus:ring-gray-300 outline-none text-zinc-800"
                                        />
                                    </div>

                                    {/* Start Time */}
                                    <div>
                                        <label className="text-xs text-gray-500 mb-1.5 block">
                                            Start Time
                                        </label>
                                        <select
                                            value={slot.startTime}
                                            onChange={(e) =>
                                                handleChange(index, "startTime", e.target.value)
                                            }
                                            className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-slate-700 outline-none focus:ring-1 focus:ring-gray-300 bg-white"
                                        >
                                            <option value="" disabled>
                                                Select start time
                                            </option>
                                            {TIME_SLOTS.map((s) => (
                                                <option key={s.value} value={s.value}>
                                                    {s.label}
                                                </option>
                                            ))}
                                        </select>
                                    </div>

                                    {/* End Time */}
                                    <div>
                                        <label className="text-xs text-gray-500 mb-1.5 block">
                                            End Time
                                        </label>
                                        <select
                                            value={slot.endTime}
                                            onChange={(e) =>
                                                handleChange(index, "endTime", e.target.value)
                                            }
                                            className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-slate-700 outline-none focus:ring-1 focus:ring-gray-300 bg-white"
                                        >
                                            <option value="" disabled>
                                                Select end time
                                            </option>
                                            {TIME_SLOTS.map((s) => (
                                                <option key={s.value} value={s.value}>
                                                    {s.label}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                </div>

                                {/* Inline error */}
                                {isInvalid && (
                                    <p className="text-red-500 text-xs mt-2 flex items-center gap-1">
                                        <span>⚠</span> End time must be after start time
                                    </p>
                                )}
                            </div>
                        );
                    })}
                </div>

                {/* Save Button */}
                <button
                    onClick={handleSubmit}
                    disabled={isPending}
                    className="w-full mt-8 bg-primary-color text-white py-3 rounded-lg hover:bg-primary-hover transition text-sm font-medium cursor-pointer disabled:opacity-60"
                >
                    {isPending ? <Spinner color /> : "Save Slots"}
                </button>
            </div>
        </div>
    );
}