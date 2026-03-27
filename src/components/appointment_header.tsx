"use client";
import { motion } from "motion/react";
import { AppointmentFilters, Filter } from "@/constant/appointment_filters";
import { cn } from "@/lib/utils";

type Props = {
    selectedFilter: Filter;
    selectedDate: string;
    onFilterChange: (filter: Filter) => void;
    onDateChange: (date: string) => void;
};

export default function AppointmentHeader({ selectedFilter, selectedDate, onFilterChange, onDateChange }: Props) {

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
                                    transition={{
                                        type: "spring",
                                        stiffness: 500,
                                        damping: 30,
                                    }}
                                />
                            )}
                        </button>
                    );
                })}
            </div>

            <div className="flex items-center gap-2">
                <input
                    type="date"
                    value={selectedDate}
                    onChange={(e) => onDateChange(e.target.value)}
                    className="px-3 py-2 rounded-lg border border-slate-200 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-black"
                />
            </div>
        </div>
    );
}