"use client";

import { motion, AnimatePresence } from "motion/react";
import { useState } from "react";
import {
    FileText,
    ChevronDown,
    ExternalLink,
    CalendarDays,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { PrescriptionsInterface } from "@/types/prescription";

function groupByDate(data: PrescriptionsInterface[]) {
    return data.reduce((acc, item) => {
        const date = new Date(item.issuedAt).toDateString();
        if (!acc[date]) acc[date] = [];
        acc[date].push(item);
        return acc;
    }, {} as Record<string, PrescriptionsInterface[]>);
}

function formatDate(date: string) {
    return new Date(date).toLocaleDateString("en-IN", {
        day: "numeric",
        month: "short",
        year: "numeric",
    });
}

export default function PrescriptionPreview({
    data,
}: {
    data: PrescriptionsInterface[];
}) {
    const [openId, setOpenId] = useState<string | null>(null);

    const grouped = groupByDate(data);

    return (
        <div className="relative p-6 space-y-10">

            {Object.entries(grouped).map(([date, prescriptions]) => (
                <div key={date} className="relative">

                    {/* 🔥 TIMELINE LINE */}
                    <div className="absolute left-[11px] top-8 bottom-0 w-[2px] bg-gray-200" />

                    {/* DATE HEADER */}
                    <div className="sticky top-0 z-10 flex items-center gap-2 mb-4 bg-white py-1">
                        <div className="w-6 h-6 rounded-full bg-primary-color/10 flex items-center justify-center">
                            <CalendarDays size={12} className="text-primary-color" />
                        </div>
                        <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                            {formatDate(date)}
                        </h3>
                    </div>

                    <div className="space-y-4 ml-6">
                        {prescriptions.map((rx) => {
                            const isOpen = openId === rx.id;

                            return (
                                <div key={rx.id} className="relative">

                                    <div className="absolute -left-[18px] top-6 w-3 h-3 rounded-full bg-primary-color border-2 border-white shadow" />

                                    <div className="group border border-gray-200 rounded-2xl bg-white shadow-sm hover:shadow-md transition-all overflow-hidden">

                                        {/* HEADER */}
                                        <button
                                            onClick={() =>
                                                setOpenId(isOpen ? null : rx.id)
                                            }
                                            className="w-full flex items-center justify-between px-4 py-3.5 hover:bg-gray-50 transition"
                                        >
                                            <div className="flex items-center gap-3">

                                                {/* ICON */}
                                                <div className="w-10 h-10 rounded-xl bg-primary-color/10 text-primary-color flex items-center justify-center">
                                                    <FileText size={16} />
                                                </div>

                                                {/* TEXT */}
                                                <div className="text-left">
                                                    <div className="flex items-center gap-2">
                                                        <p className="text-sm font-semibold text-gray-900">
                                                            Prescription
                                                        </p>

                                                        {/* TYPE BADGE */}
                                                        <span
                                                            className={cn(
                                                                "text-[10px] font-semibold px-2 py-[2px] rounded-full",
                                                                rx.type === "FINAL"
                                                                    ? "bg-green-50 text-green-700 border border-green-200"
                                                                    : "bg-yellow-50 text-yellow-700 border border-yellow-200"
                                                            )}
                                                        >
                                                            {rx.type}
                                                        </span>
                                                    </div>

                                                    <p className="text-xs text-gray-500 mt-0.5">
                                                        {new Date(rx.issuedAt).toLocaleTimeString([], {
                                                            hour: "2-digit",
                                                            minute: "2-digit",
                                                        })}
                                                    </p>
                                                </div>
                                            </div>

                                            <ChevronDown
                                                size={16}
                                                className={cn(
                                                    "text-gray-400 transition-transform",
                                                    isOpen && "rotate-180"
                                                )}
                                            />
                                        </button>

                                        {/* BODY */}
                                        <AnimatePresence initial={false}>
                                            {isOpen && (
                                                <motion.div
                                                    initial={{ height: 0, opacity: 0 }}
                                                    animate={{ height: "auto", opacity: 1 }}
                                                    exit={{ height: 0, opacity: 0 }}
                                                    transition={{ duration: 0.25 }}
                                                    className="overflow-hidden"
                                                >
                                                    <div className="px-4 pb-4 pt-2 border-t bg-gray-50 space-y-4">

                                                        {/* CONTENT */}
                                                        <div className="text-sm text-gray-700 whitespace-pre-line leading-relaxed bg-white border border-gray-200 rounded-xl p-3">
                                                            {rx.content}
                                                        </div>

                                                        {/* ACTIONS */}
                                                        <div className="flex items-center justify-between">

                                                            <span className="text-[11px] text-gray-400">
                                                                Issued on{" "}
                                                                {formatDate(rx.issuedAt)}
                                                            </span>

                                                            <a
                                                                href={rx.pdfUrl}
                                                                target="_blank"
                                                                className="inline-flex items-center gap-2 text-xs font-semibold px-3 py-2 rounded-lg bg-primary-color text-white hover:opacity-90 transition shadow-sm"
                                                            >
                                                                <ExternalLink size={12} />
                                                                View PDF
                                                            </a>
                                                        </div>

                                                    </div>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>

                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            ))}
        </div>
    );
}