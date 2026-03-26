"use client";
import AvailableSlots from '@/components/available_slots_display';
import DateSelector from '@/components/date_selector'
import { useState } from 'react';

export default function BookAppointement() {
  const [selectedDate, setSelectedDate] = useState<string>("")

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <DateSelector setDate={setSelectedDate} />
      <AvailableSlots
        date={selectedDate}
      />
    </div>
  )
}
