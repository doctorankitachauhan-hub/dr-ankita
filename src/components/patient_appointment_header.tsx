"use client";
import { motion } from "motion/react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { format, addDays, subDays, parseISO, isToday } from "date-fns";
import { cn } from "@/lib/utils";
import { PatientAppointmentFilters, PatientFilter } from "@/constant/appointment_filters";

type Props = {
  selectedFilter: PatientFilter;
  selectedDate: string;
  onFilterChange: (filter: PatientFilter) => void;
  onDateChange: (date: string) => void;
};

function formatDateLabel(iso: string) {
  const d = parseISO(iso);
  if (isToday(d)) return "Today";
  return format(d, "dd MMM yyyy");
}

export default function PatientAppointmentHeader({
  selectedFilter,
  selectedDate,
  onFilterChange,
  onDateChange,
}: Props) {
  function handlePrev() {
    const base = selectedDate ?? format(new Date(), "yyyy-MM-dd");
    onDateChange(format(subDays(parseISO(base), 1), "yyyy-MM-dd"));
  }

  function handleNext() {
    const base = selectedDate ?? format(new Date(), "yyyy-MM-dd");
    onDateChange(format(addDays(parseISO(base), 1), "yyyy-MM-dd"));
  }

  const isCurrentDay = selectedDate ? isToday(parseISO(selectedDate)) : false;

  return (
    <div className="sticky z-30 top-0 w-full bg-white border-b border-slate-100 px-5">

      <div className="flex items-center justify-between gap-4 py-4 flex-wrap">
        <div>
          <h2 className="text-lg font-semibold text-slate-800">My appointments</h2>
          <p className="text-xs text-slate-400 mt-0.5">Track and manage your appointments</p>
        </div>

        <div className="flex items-center gap-1.5">
          <button
            onClick={handlePrev}
            className="p-1.5 rounded-lg border border-slate-200 text-slate-500 hover:bg-slate-50 transition cursor-pointer"
            aria-label="Previous day"
            disabled
          >
            <ChevronLeft size={15} />
          </button>

          <div className="relative">
            <input
              type="date"
              value={selectedDate ?? ""}
              onChange={(e) => onDateChange(e.target.value)}
              className="absolute inset-0 opacity-0 cursor-pointer w-full"
              aria-label="Pick a date"
            />
            <div className={cn(
              "px-3 py-1.5 rounded-lg border text-sm font-medium select-none min-w-[90px] text-center transition",
              isCurrentDay
                ? "border-blue-300 text-blue-700 bg-blue-50"
                : selectedDate
                  ? "border-slate-300 text-slate-700 bg-white"
                  : "border-slate-200 text-slate-400 bg-white"
            )}>
              {selectedDate ? formatDateLabel(selectedDate) : "All dates"}
            </div>
          </div>

          <button
            onClick={handleNext}
            className="p-1.5 rounded-lg border border-slate-200 text-slate-500 hover:bg-slate-50 transition cursor-pointer"
            aria-label="Next day"
            disabled
          >
            <ChevronRight size={15} />
          </button>
        </div>
      </div>

      <div className="relative flex items-center gap-1 overflow-x-auto pb-px">
        {PatientAppointmentFilters.map((filter) => {
          const isActive = selectedFilter.key === filter.key;

          return (
            <button
              key={filter.key}
              onClick={() => onFilterChange(filter)}
              className={cn(
                "relative whitespace-nowrap text-sm font-medium px-3 py-3.5 transition cursor-pointer",
                isActive
                  ? "text-slate-900"
                  : "text-slate-400 hover:text-slate-700"
              )}
            >
              {filter.label}

              {isActive && (
                <motion.div
                  layoutId="patient-active-pill"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-slate-900 rounded-full"
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}