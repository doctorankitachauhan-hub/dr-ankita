'use client'
import AppointmentHeader from '@/components/appointment_header'
import { AppointmentFilters, Filter } from '@/constant/appointment_filters';
import { useState } from 'react';
import { format } from "date-fns";
import AppointmentList from '@/components/appointment_list';

export default function AppointmentPage() {
  const today = new Date();

  const [selectedFilter, setSelectedFilter] = useState<Filter>(AppointmentFilters[0]);
  const [selectedDate, setSelectedDate] = useState<string>(format(today, "yyyy-MM-dd"));

  return (
    <div className='w-full relative'>
      <AppointmentHeader
        selectedFilter={selectedFilter}
        selectedDate={selectedDate}
        onFilterChange={setSelectedFilter}
        onDateChange={setSelectedDate}
      />
      <AppointmentList
        selectedFilter={selectedFilter}
        selectedDate={selectedDate}
      />
    </div>
  )
}