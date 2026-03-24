'use client';
import { useState } from "react";
import { Plus, Trash2, Clock } from "lucide-react";
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

export default function CreateSlots() {
    const [slots, setSlots] = useState<SlotsType[]>([
        { date: "", startTime: "", endTime: "" }
    ]);

    function handleAddSlots() {
        setSlots(prev => [...prev, { date: "", startTime: "", endTime: "" }]);
    }

    function removeSlots(index: number) {
        setSlots(prev => prev.filter((_, i) => i !== index));
    }

    function handleChange(index: number, field: keyof SlotsType, value: string) {
        setSlots(prev => {
            const updated = [...prev];
            updated[index][field] = value;
            return updated;
        });
    }

    function convertISTToUTC(date: string, time: string) {
        const dateTimeString = `${date} ${time}`;
        const utcDate = fromZonedTime(dateTimeString, "Asia/Kolkata");

        return utcDate;
    }

    function validateSlots() {
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        for (const slot of slots) {
            if (!slot.date || !slot.startTime || !slot.endTime) return false;
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
        if (!validateSlots()) {
            toast("Please enter valid slots");
            return;
        }

        const formatted = slots.map(slot => ({
            startTime: convertISTToUTC(slot.date, slot.startTime).toISOString(),
            endTime: convertISTToUTC(slot.date, slot.endTime).toISOString()
        }));

        mutate({ slots: formatted })
    }

    const createSlots = useMutation({
        mutationFn: async ({ slots }: CreateSlotsPayload) => {
            const response = await axios.post(
                "/api/v1/doctor/slots",
                { slots: slots },
            );

            return response.data;
        },
        onSuccess: (val) => {
            toast.success(val?.message);
            setSlots([
                { date: "", startTime: "", endTime: "" }
            ])
        },
        onError: (err: AxiosError<{ error: string }>) => {
            toast.error(err.response?.data?.error || "Something went wrong")
        }
    });

    const { mutate, isPending } = createSlots;

    return (
        <div className="w-full min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6">
            <div className="w-full bg-white p-6 rounded-3xl shadow-lg border border-gray-100">

                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h2 className="text-2xl font-semibold text-gray-800">
                            Create Slots
                        </h2>
                        <p className="text-sm text-gray-500">
                            Add your availability for patients
                        </p>
                    </div>

                    <button
                        onClick={handleAddSlots}
                        className="flex items-center gap-2 bg-primary-color text-white px-4 py-2 rounded-xl hover:bg-primary-hover transition cursor-pointer"
                    >
                        <Plus size={18} />
                        Add Slot
                    </button>
                </div>

                <div className="space-y-5">
                    {slots.map((slot, index) => {
                        const isInvalid = slot.startTime && slot.endTime && slot.startTime >= slot.endTime;

                        return (
                            <div
                                key={index}
                                className="relative bg-white border border-gray-200 rounded-2xl p-5 transition py-8"
                            >
                                <div className="grid md:grid-cols-3 gap-4">
                                    <div>
                                        <label className="text-xs text-gray-500 mb-2 block">
                                            Date
                                        </label>
                                        <input
                                            type="date"
                                            min={new Date().toISOString().split("T")[0]}
                                            value={slot.date}
                                            onChange={(e) =>
                                                handleChange(index, "date", e.target.value)
                                            }
                                            className="w-full border border-gray-200 rounded-md px-3 py-2 focus:ring-1 focus:ring-gray-300 outline-none text-zinc-800"
                                        />
                                    </div>

                                    <div>
                                        <label className="text-xs text-gray-500 mb-2 block">
                                            Start Time
                                        </label>
                                        <div className="flex items-center gap-2 border border-gray-200 rounded-md px-3 py-2 focus-within:ring-2 focus-within:ring-gray-300">
                                            <Clock size={16} className="text-gray-400" />
                                            <input
                                                type="time"
                                                value={slot.startTime}
                                                onChange={(e) =>
                                                    handleChange(index, "startTime", e.target.value)
                                                }
                                                className="w-full outline-none"
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="text-xs text-gray-500 mb-2 block">
                                            End Time
                                        </label>
                                        <div className="flex items-center gap-2 border border-gray-200 rounded-md px-3 py-2 focus-within:ring-2 focus-within:ring-gray-300">
                                            <Clock size={16} className="text-gray-400" />
                                            <input
                                                type="time"
                                                value={slot.endTime}
                                                onChange={(e) =>
                                                    handleChange(index, "endTime", e.target.value)
                                                }
                                                className="w-full outline-none"
                                            />
                                        </div>
                                    </div>
                                </div>

                                {slots.length > 1 && (
                                    <button
                                        onClick={() => removeSlots(index)}
                                        className="absolute top-4 right-4 text-red-400 hover:text-red-600 cursor-pointer"
                                    >
                                        <Trash2 size={18} />
                                    </button>
                                )}

                                {isInvalid && (
                                    <p className="text-red-500 text-xs mt-2">
                                        End time must be after start time
                                    </p>
                                )}
                            </div>
                        );
                    })}
                </div>

                <button
                    onClick={handleSubmit}
                    className="w-full mt-8 bg-primary-color text-white py-3 rounded-lg hover:bg-primary-hover transition text-sm font-medium"
                >
                    {isPending ? <Spinner color /> : 'Save Slots'}
                </button>
            </div>
        </div>
    );
}