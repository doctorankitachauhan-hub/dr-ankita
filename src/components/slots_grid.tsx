"use client";

import { motion } from "motion/react";
import { useState } from "react";
import { X } from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import toast from "react-hot-toast";
import Spinner from "./ui/spinner";
import { cn } from "@/lib/utils";

type Slot = {
    id: string;
    startTime: string;
    endTime: string;
    status: string;
};

function formatTime(start: string, end: string) {
    const startTime = new Date(start).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
    });

    const endTime = new Date(end).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
    });

    return `${startTime} - ${endTime}`;
}

function groupSlots(slots: Slot[]) {
    const groups = {
        Morning: [] as Slot[],
        Afternoon: [] as Slot[],
        Evening: [] as Slot[],
    };

    slots.forEach((slot) => {
        const hour = new Date(slot.startTime).getHours();

        if (hour < 12) groups.Morning.push(slot);
        else if (hour < 17) groups.Afternoon.push(slot);
        else groups.Evening.push(slot);
    });

    return groups;
}

export default function PremiumSlots({ slots, date }: { slots: Slot[]; date: string }) {
    const [selected, setSelected] = useState<Slot | null>(null);
    const [isVerifying, setIsVerifying] = useState(false);
    const now = new Date();
    const grouped = groupSlots(slots);
    const queryClient = useQueryClient();

    const payment = useMutation({
        mutationFn: async (slotId: { slotId: string }) => {
            const response = await axios.post(
                "/api/v1/user/create-order",
                slotId,
                { withCredentials: true }
            );
            return response.data;
        },
        onSuccess: (val) => {
            const { orderId, amount, key, name, email } = val

            const options = {
                key,
                amount: amount * 100,
                currency: "INR",
                name: "Doctor Ankita",
                description: "Consultation Booking",
                order_id: orderId,
                prefill: {
                    name,
                    email,
                },

                // handler: async function (response: any) {
                //     try {
                //         setIsVerifying(true);
                //         const res = await axios.post("/api/v1/user/verify-payment", response);
                //         if (!res.data?.success) {
                //             toast.error("Payment verification failed");
                //             return;
                //         }
                //         toast.success("Booking confirmed 🎉");
                //         setSelected(null);
                //         await queryClient.invalidateQueries({
                //             queryKey: ["slots", date]
                //         });

                //     } catch (err) {
                //         toast.error("Something went wrong");
                //     } finally {
                //         setIsVerifying(false);
                //     }
                // },
                
                handler: function () {
                    toast.success("Payment successful 🎉");
                    setIsVerifying(true);
                    setTimeout(async () => {
                        await queryClient.invalidateQueries({
                            queryKey: ["slots", date],
                        });

                        setIsVerifying(false);
                        setSelected(null);
                    }, 3000);
                }
            };

            const rzp = new (window as any).Razorpay(options);
            rzp.open();
        },
        onError: (err: AxiosError<{ error: string }>) => {
            toast.error(err.response?.data?.error || "Something went wrong")
        }
    });
    const { mutate, isPending } = payment;

    function handlePayment(slotId: string) {
        if (!slotId) toast.error("Invalid Slot selections")
        mutate({ slotId })
    }

    return (
        <div className="p-5 space-y-8">

            {Object.entries(grouped).map(([label, group]) => {
                if (!group.length) return null;

                return (
                    <div key={label}>
                        {isVerifying && (
                            <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center">
                                <div className="bg-white rounded-2xl p-6 flex flex-col items-center gap-4 shadow-xl">

                                    <Spinner />

                                    <p className="text-sm font-medium text-slate-600">
                                        Verifying your payment...
                                    </p>

                                    <p className="text-xs text-slate-400">
                                        Please don&apos;t close this window
                                    </p>
                                </div>
                            </div>
                        )}
                        <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-3">
                            {label}
                        </h3>

                        <div className="grid grid-cols-3 md:grid-cols-4 gap-3">
                            {group.map((slot) => {
                                const isActive = selected?.id === slot.id;

                                const isPast = new Date(slot.startTime) < now;
                                const isBooked = slot.status !== "AVAILABLE";
                                const disabled = isPast || isBooked;

                                return (
                                    <motion.button
                                        key={slot.id}
                                        disabled={disabled}
                                        whileTap={{ scale: 0.96 }}
                                        whileHover={!disabled ? { scale: 1.04 } : {}}
                                        onClick={() => setSelected(slot)}
                                        className={cn(
                                            "relative py-3 rounded-xl border text-sm font-medium transition-all flex flex-col items-center justify-center bg-white text-slate-700 border-slate-200",
                                            disabled && "bg-slate-100 text-slate-400 border-slate-200 cursor-not-allowed",
                                            isBooked && "bg-rose-50 text-rose-500 border-rose-200 cursor-not-allowed",
                                            isActive && "bg-primary-color text-white border-slate-300 ring-2 ring-primary-color shadow-sm"
                                        )}>
                                        {isBooked ? (
                                            <div className="flex flex-col items-center">
                                                <span className="text-xs font-semibold">Booked</span>
                                                <span className="text-[10px] opacity-70">Unavailable</span>
                                            </div>
                                        ) : (
                                            formatTime(slot.startTime, slot.endTime)
                                        )}
                                    </motion.button>
                                );
                            })}
                        </div>
                    </div>
                );
            })}

            {selected && (
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-6 p-5 rounded-2xl bg-white border border-slate-200 shadow-sm flex items-center justify-between gap-4"
                >
                    <div className="flex flex-col">
                        <span className="text-xs text-slate-500">Selected Slot</span>
                        <span className="text-lg font-semibold text-slate-800">
                            {formatTime(selected.startTime, selected.endTime)}
                        </span>
                    </div>

                    <div className="flex items-center gap-2">

                        <button
                            onClick={() => setSelected(null)}
                            className="w-10 h-10 flex items-center justify-center rounded-lg border border-slate-200 text-slate-500 hover:bg-slate-100 transition cursor-pointer"
                        >
                            <X size={18} />
                        </button>

                        <button
                            disabled={isPending || isVerifying}
                            onClick={() => handlePayment(selected.id)}
                            className="px-5 py-2.5 rounded-lg bg-primary-color text-white font-medium shadow-sm hover:scale-[1.03] active:scale-[0.97] transition disabled:opacity-50"
                        >
                            {isPending ? <Spinner color /> : "Confirm"}
                        </button>
                    </div>
                </motion.div>
            )}
        </div>
    );
}