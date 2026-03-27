"use client";

import { AnimatePresence, motion } from "motion/react";
import { useCallback, useState } from "react";
import { AlertCircle, CheckCircle2, Clock3, X } from "lucide-react";
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

type BookingState =
    | { phase: "idle" }
    | { phase: "paying" }
    | { phase: "polling"; orderId: string }
    | { phase: "success" }
    | { phase: "failed"; reason: string };


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

const POLL_INTERVAL_MS = 2000;
const MAX_POLLS = 10;

async function pollBookingStatus(orderId: string): Promise<"SUCCESS" | "FAILED" | "PENDING"> {
    const res = await axios.get(`/api/v1/user/booking-status?orderId=${orderId}`, {
        withCredentials: true,
    });
    return res.data?.status ?? "PENDING";
}


export default function PremiumSlots({ slots, date }: { slots: Slot[]; date: string }) {
    const [selected, setSelected] = useState<Slot | null>(null);
    const [isVerifying, setIsVerifying] = useState(false);
    const [bookingState, setBookingState] = useState<BookingState>({ phase: "idle" });
    const now = new Date();
    const grouped = groupSlots(slots);
    const queryClient = useQueryClient();

    const startPolling = useCallback(
        async (orderId: string) => {
            setBookingState({ phase: "polling", orderId });

            let attempts = 0;

            const tick = async () => {
                attempts++;
                try {
                    const status = await pollBookingStatus(orderId);

                    if (status === "SUCCESS") {
                        setBookingState({ phase: "success" });
                        setSelected(null);
                        await queryClient.invalidateQueries({ queryKey: ["slots", date] });
                        return;
                    }

                    if (status === "FAILED") {
                        setBookingState({ phase: "failed", reason: "Payment was not confirmed. Please try again." });
                        return;
                    }

                    if (attempts >= MAX_POLLS) {
                        setBookingState({
                            phase: "failed",
                            reason: "Confirmation is taking longer than expected. Check your email or try again.",
                        });
                        return;
                    }

                    setTimeout(tick, POLL_INTERVAL_MS);
                } catch {
                    setBookingState({ phase: "failed", reason: "Could not verify booking. Please contact support." });
                }
            };

            setTimeout(tick, POLL_INTERVAL_MS);
        },
        [date, queryClient]
    );

    const payment = useMutation({
        mutationFn: async (slotId: { slotId: string }) => {
            const response = await axios.post(
                "/api/v1/user/create-order",
                slotId,
                { withCredentials: true }
            );
            return response.data;
        },
        onMutate: () => setBookingState({ phase: "paying" }),
        onSuccess: async (val) => {
            try {
                const { orderId, amount, key, name, email } = val;

                const options = {
                    key,
                    amount: amount * 100,
                    currency: "INR",
                    name: "Doctor Ankita",
                    description: "Consultation Booking",
                    order_id: orderId,
                    prefill: { name, email },

                    handler: async function () {
                        await startPolling(orderId);
                    },

                    modal: {
                        ondismiss: () => {
                            setBookingState({ phase: "idle" });
                            toast("Payment cancelled", { icon: "👋" });
                        }
                    },
                };

                const rzp = new (window as any).Razorpay(options);

                rzp.on("payment.failed", (response: any) => {
                    const reason =
                        response?.error?.description || "Payment failed. Please try again.";

                    setBookingState({ phase: "failed", reason });
                });

                const timeout = setTimeout(() => {
                    setBookingState({ phase: "idle" });
                }, 3000);

                rzp.open();
                rzp.on("modal.open", () => {
                    clearTimeout(timeout);
                });

            } catch (err) {
                console.error("Razorpay init error:", err);

                setBookingState({
                    phase: "failed",
                    reason: "Payment UI failed to open. Please try again.",
                });
            }
        },
        onError: (err: AxiosError<{ error: string }>) => {
            setBookingState({ phase: "idle" });
            toast.error(err.response?.data?.error || "Something went wrong");
        }
    });
    const { mutate, isPending } = payment;

    function handlePayment(slotId: string) {
        if (!slotId) toast.error("Invalid Slot selections")
        mutate({ slotId })
    }

    function handleReset() {
        setBookingState({ phase: "idle" });
    }
    const isBlocked = bookingState.phase === "polling" || bookingState.phase === "paying";

    return (
        <div className="p-5 space-y-8">

            <AnimatePresence>
                {(bookingState.phase === "polling" || bookingState.phase === "paying") && (
                    <motion.div
                        key="overlay-loading"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 top-0 h-full z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center"
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            className="bg-white rounded-2xl p-8 flex flex-col items-center gap-4 shadow-xl w-72"
                        >
                            <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center">
                                <Clock3 className="text-blue-500 w-6 h-6 animate-pulse" />
                            </div>
                            <p className="text-sm font-semibold text-slate-700">
                                {bookingState.phase === "paying"
                                    ? "Opening payment..."
                                    : "Confirming your booking…"}
                            </p>
                            <p className="text-xs text-slate-400 text-center">
                                {bookingState.phase === "polling"
                                    ? "We're waiting for payment confirmation. Please don't close this window."
                                    : "Preparing your order"}
                            </p>
                            <Spinner />
                        </motion.div>
                    </motion.div>
                )}

                {bookingState.phase === "success" && (
                    <motion.div
                        key="overlay-success"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 top-0 h-full z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center"
                    >
                        <motion.div
                            initial={{ scale: 0.85, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            className="bg-white rounded-2xl p-8 flex flex-col items-center gap-4 shadow-xl w-72"
                        >
                            <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ type: "spring", stiffness: 200, damping: 14 }}
                                className="w-14 h-14 rounded-full bg-green-50 flex items-center justify-center"
                            >
                                <CheckCircle2 className="text-green-500 w-8 h-8" />
                            </motion.div>
                            <p className="text-base font-semibold text-slate-800">Booking Confirmed!</p>
                            <p className="text-xs text-slate-500 text-center">
                                A confirmation and Google Meet link has been sent to your email.
                            </p>
                            <button
                                onClick={handleReset}
                                className="mt-2 w-full py-2.5 rounded-xl bg-green-500 text-white text-sm font-medium hover:bg-green-600 transition"
                            >
                                Done
                            </button>
                        </motion.div>
                    </motion.div>
                )}

                {bookingState.phase === "failed" && (
                    <motion.div
                        key="overlay-failed"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed top-0 h-full inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center"
                    >
                        <motion.div
                            initial={{ scale: 0.85, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            className="bg-white rounded-2xl p-8 flex flex-col items-center gap-4 shadow-xl w-72"
                        >
                            <div className="w-14 h-14 rounded-full bg-red-50 flex items-center justify-center">
                                <AlertCircle className="text-red-500 w-8 h-8" />
                            </div>
                            <p className="text-base font-semibold text-slate-800">Booking Failed</p>
                            <p className="text-xs text-slate-500 text-center">{bookingState.reason}</p>
                            <button
                                onClick={handleReset}
                                className="mt-2 w-full py-2.5 rounded-xl bg-slate-800 text-white text-sm font-medium hover:bg-slate-700 transition"
                            >
                                Try Again
                            </button>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {Object.entries(grouped).map(([label, group]) => {
                if (!group.length) return null;

                return (
                    <div key={label}>
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

            <AnimatePresence>
                {selected && bookingState.phase === "idle" && (
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 20 }}
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
                                disabled={isPending || isBlocked}
                                onClick={() => handlePayment(selected.id)}
                                className="px-5 py-2.5 rounded-lg bg-primary-color text-white font-medium shadow-sm hover:scale-[1.03] active:scale-[0.97] transition disabled:opacity-50"
                            >
                                {isPending ? <Spinner color /> : "Confirm"}
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}