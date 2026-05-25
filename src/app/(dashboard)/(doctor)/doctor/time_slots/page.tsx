'use client';

import DoctorCalendar from "@/components/doctor-calendar";
import Spinner from "@/components/ui/spinner";
import { useSlots } from "@/hooks/useFetch";

export default function TimeSlots() {
    const { data, isLoading, isFetching } = useSlots();
    
    if (isLoading || isFetching) return <div className="w-full h-full flex items-center justify-center"><Spinner /></div>;
    return <DoctorCalendar slots={data} />;
}
