"use client";
import { motion } from "motion/react";
import { AppointmentFilters, Filter } from "@/constant/appointment_filters";
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { format, addDays, subDays, isToday, parseISO } from "date-fns";

type Props = {
    selectedFilter: Filter;
    selectedDate: string;
    onFilterChange: (filter: Filter) => void;
    onDateChange: (date: string) => void;
};

export default function AppointmentHeader({
    selectedFilter,
    selectedDate,
    onFilterChange,
    onDateChange,
}: Props) {
    function handlePrev() {
        const prev = subDays(parseISO(selectedDate), 1);
        onDateChange(format(prev, "yyyy-MM-dd"));
    }

    function handleNext() {
        const next = addDays(parseISO(selectedDate), 1);
        onDateChange(format(next, "yyyy-MM-dd"));
    }

    function handleToday() {
        onDateChange(format(new Date(), "yyyy-MM-dd"));
    }

    const isCurrentDay = isToday(parseISO(selectedDate));

    const displayLabel = isCurrentDay
        ? "Today"
        : format(parseISO(selectedDate), "dd MMM yyyy");

    return (
        <div className="sticky z-30 top-19 w-full flex items-center justify-between gap-4 border-b border-slate-200 bg-white px-5">

            <div className="relative flex items-center gap-6">
                {AppointmentFilters.map((filter) => {
                    const isActive = selectedFilter.value === filter.value;
                    return (
                        <button
                            key={filter.value}
                            onClick={() => onFilterChange(filter)}
                            className={cn(
                                "relative text-sm font-medium text-slate-600 hover:text-slate-900 transition px-2 py-5 cursor-pointer",
                                isActive && "text-primary-color hover:text-primary-hover"
                            )}
                        >
                            {filter.name}
                            {isActive && (
                                <motion.div
                                    layoutId="active-pill"
                                    className="absolute bottom-px left-0 right-0 h-0.25 bg-primary-color rounded-full"
                                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                                />
                            )}
                        </button>
                    );
                })}
            </div>

            <div className="flex items-center gap-1.5">

                <button
                    onClick={handlePrev}
                    className="p-1.5 rounded-lg text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition cursor-pointer"
                    aria-label="Previous day"
                >
                    <ChevronLeft size={16} />
                </button>

                <div className="relative">
                    <input
                        type="date"
                        value={selectedDate}
                        onChange={(e) => onDateChange(e.target.value)}
                        className="absolute inset-0 opacity-0 cursor-pointer w-full"
                        aria-label="Pick a date"
                    />
                    <div
                        className={cn(
                            "px-3 py-1.5 rounded-lg border text-sm font-medium select-none transition min-w-[90px] text-center",
                            isCurrentDay
                                ? "border-primary-color text-primary-color bg-primary-color/5"
                                : "border-slate-200 text-slate-700 bg-white"
                        )}
                    >
                        {displayLabel}
                    </div>
                </div>

                <button
                    onClick={handleNext}
                    className="p-1.5 rounded-lg text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition cursor-pointer"
                    aria-label="Next day"
                >
                    <ChevronRight size={16} />
                </button>

                {!isCurrentDay && (
                    <button
                        onClick={handleToday}
                        className="ml-1 px-2.5 py-1.5 rounded-lg border border-slate-200 text-xs font-medium text-slate-600 hover:bg-slate-100 hover:text-slate-900 transition cursor-pointer"
                    >
                        Today
                    </button>
                )}
            </div>
        </div>
    );
}