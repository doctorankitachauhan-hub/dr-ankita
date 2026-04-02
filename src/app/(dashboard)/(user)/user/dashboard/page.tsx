'use client';

import PatientAppointmentHeader from "@/components/patient_appointment_header";
import { PatientAppointmentFilters, PatientFilter } from "@/constant/appointment_filters";
import { format } from "date-fns";
import { useState } from "react";



export default function UserDashboard() {
  const today = new Date();

  const [selectedFilter, setSelectedFilter] = useState<PatientFilter>(PatientAppointmentFilters[0]);
  const [selectedDate, setSelectedDate] = useState<string>(format(today, "yyyy-MM-dd"));

  return (
    <div className='w-full relative'>
      <PatientAppointmentHeader
        selectedFilter={selectedFilter}
        selectedDate={selectedDate}
        onFilterChange={setSelectedFilter}
        onDateChange={setSelectedDate}
      />
    </div>
  )
}
