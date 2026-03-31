"use client";
import AvailableSlots from "@/components/available_slots_display";
import DateSelector from "@/components/date_selector";
import AppointmentContextForm, {
  type AppointmentContextData,
} from "@/components/appointment_context_form";
import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowLeft } from "lucide-react";

type Step = "select" | "context";

type SelectedSlot = {
  id: string;
  startTime: string;
  endTime: string;
};

export default function BookAppointment() {
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [step, setStep] = useState<Step>("select");
  const [pendingSlot, setPendingSlot] = useState<SelectedSlot | null>(null);

  function handleSlotConfirm(slot: SelectedSlot) {
    setPendingSlot(slot);
    setStep("context");
  }

  function handleBack() {
    setStep("select");
    setPendingSlot(null);
  }

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <AnimatePresence mode="wait">
        {step === "select" && (
          <motion.div
            key="select"
            initial={{ opacity: 0, x: -24 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -24 }}
            transition={{ duration: 0.22 }}
          >
            <DateSelector setDate={setSelectedDate} />
            <AvailableSlots
              date={selectedDate}
              onSlotConfirm={handleSlotConfirm}
            />
          </motion.div>
        )}

        {step === "context" && pendingSlot && (
          <motion.div
            key="context"
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 24 }}
            transition={{ duration: 0.22 }}
            className="max-w-2xl mx-auto px-4 py-6"
          >
            <button
              onClick={handleBack}
              className="flex items-center gap-2 text-sm text-slate-500 hover:text-slate-800 transition mb-6 group"
            >
              <ArrowLeft
                size={16}
                className="group-hover:-translate-x-1 transition-transform"
              />
              Back to slots
            </button>

            <AppointmentContextForm
              slot={pendingSlot}
              date={selectedDate}
              changeStep={() => setStep("select")}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}