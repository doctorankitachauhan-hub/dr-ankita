"use client";

import { motion } from "motion/react";
import { useState } from "react";
import { X } from "lucide-react";

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

export default function PremiumSlots({
    slots,
    onSelect,
}: {
    slots: Slot[];
    onSelect: (slot: Slot) => void;
}) {
    const [selected, setSelected] = useState<Slot | null>(null);
    const now = new Date();
    const grouped = groupSlots(slots);

    return (
        <div className="p-5 space-y-8">

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
                                        onClick={() => {
                                            setSelected(slot);
                                            onSelect(slot);
                                        }}
                                        className={`relative py-3 rounded-xl border text-sm font-medium transition-all
                                        ${disabled ? "bg-slate-100 text-slate-400 border-slate-200 cursor-not-allowed"
                                                : isActive ? "bg-primary-color text-white border-slate-300 ring-2 ring-primary-color shadow-sm cursor-pointer" : "bg-white text-slate-700 border-slate-200 hover:border-slate-300 hover:bg-slate-50 cursor-pointer"}`}
                                    >
                                        {formatTime(slot.startTime, slot.endTime)}
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
                            className="w-10 h-10 flex items-center justify-center rounded-lg border border-slate-200 text-slate-500 hover:bg-slate-100 transition"
                        >
                            <X size={18} />
                        </button>

                        <button
                            onClick={() => onSelect(selected)}
                            className="px-5 py-2.5 rounded-lg bg-primary-color text-white font-medium shadow-sm hover:scale-[1.03] active:scale-[0.97] transition"
                        >
                            Confirm
                        </button>
                    </div>
                </motion.div>
            )}
        </div>
    );
}