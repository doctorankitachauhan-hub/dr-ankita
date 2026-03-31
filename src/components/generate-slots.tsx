'use client';
import { motion, AnimatePresence } from 'motion/react';
import { Minus, Plus, X, CalendarDays } from 'lucide-react';
import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import axios, { AxiosError } from 'axios';
import toast from 'react-hot-toast';
import Spinner from './ui/spinner';
import { useQueryClient } from "@tanstack/react-query";

type Props = {
    open: boolean;
    close: () => void;
};

export default function GenerateSlots({ open, close }: Props) {
    const [days, setDays] = useState(7);
    const queryClient = useQueryClient();

    function increment() {
        setDays((prev) => Math.min(prev + 1, 30));
    }

    function decrement() {
        setDays((prev) => Math.max(prev - 1, 1));
    }

    const createSlots = useMutation({
        mutationFn: async (days: number) => {
            const response = await axios.post(
                "/api/v1/doctor/auto-slots-generate",
                { days },
            );
            return response.data;
        },
        onSuccess: async (val) => {
            toast.success(val?.message);
            await queryClient.invalidateQueries({
                queryKey: ["slots"]
            });
            setDays(7)
            close();
        },
        onError: (err: AxiosError<{ error: string }>) => {
            toast.error(err.response?.data?.error || "Something went wrong")
        }
    });

    const { mutate, isPending } = createSlots;
    if (!open) return null;
    return (
        <AnimatePresence>
            {open && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="fixed inset-0 bg-slate-900/20 flex justify-center items-center p-4 pt-10 z-50"
                    onClick={close}
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
                        className="w-full h-max max-w-xl bg-white rounded-3xl shadow-xl border border-slate-200 overflow-hidden"
                    >

                        <div className="flex items-start justify-between p-5 border-b border-slate-100">
                            <div>
                                <h2 className="text-lg font-semibold text-slate-800">
                                    Generate Slots
                                </h2>
                                <p className="text-sm text-slate-500 mt-1">
                                    Automatically create slots based on your availability
                                </p>
                            </div>

                            <button
                                onClick={close}
                                className="text-slate-400 hover:text-slate-600 transition"
                            >
                                <X size={20} />
                            </button>
                        </div>

                        <div className="p-6 space-y-6">

                            <div>
                                <label className="text-sm font-medium text-slate-700 mb-2 block">
                                    Number of Days
                                </label>

                                <div className="flex items-center justify-between bg-slate-50 border border-slate-200 rounded-xl px-4 py-3">

                                    <div className="flex items-center gap-2 text-slate-600">
                                        <CalendarDays size={18} />
                                        <span className="text-sm">
                                            Generate for
                                        </span>
                                    </div>

                                    <div className="flex items-center gap-3">

                                        <button
                                            onClick={decrement}
                                            disabled={days <= 1}
                                            className="w-8 h-8 flex items-center justify-center rounded-lg border border-slate-200 bg-white hover:bg-slate-100 transition disabled:opacity-40"
                                        >
                                            <Minus size={16} />
                                        </button>

                                        <span className="text-lg font-semibold text-slate-800 w-8 text-center">
                                            {days}
                                        </span>

                                        <button
                                            onClick={increment}
                                            disabled={days >= 30}
                                            className="w-8 h-8 flex items-center justify-center rounded-lg border border-slate-200 bg-white hover:bg-slate-100 transition disabled:opacity-40"
                                        >
                                            <Plus size={16} />
                                        </button>

                                    </div>
                                </div>

                                <p className="text-xs text-slate-400 mt-2">
                                    You can generate up to 30 days at once
                                </p>
                            </div>

                            <button
                                className="w-full bg-primary-color text-white py-3 rounded-xl hover:bg-primary-hover transition font-medium cursor-pointer"
                                onClick={() => mutate(days)}
                            >
                                {isPending ? <Spinner color /> : 'Generate Slots'}
                            </button>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}