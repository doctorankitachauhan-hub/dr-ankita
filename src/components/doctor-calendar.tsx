"use client";
import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import dayGridPlugin from '@fullcalendar/daygrid'
import { useRouter } from "next/navigation";
import EventDetails from "./event_details";
import { AppointmentStatus } from "@/generated/prisma/enums";

type Slot = {
    id: string;
    startTime: string;
    endTime: string;
    status: "AVAILABLE" | "BOOKED" | "BLOCKED";
    appointment: {
        status: AppointmentStatus;
        id: string;
        createdAt: string;
        updatedAt: string;
        patientId: string;
        slotId: string;
        reminder1Sent: boolean;
        reminder2Sent: boolean;
    }[]
};

type Props = {
    slots: Slot[],
}

export default function DoctorCalendar({ slots }: Props) {
    const router = useRouter();
    const now = new Date();

    const events = slots?.map((slot) => {
        const start = new Date(slot.startTime);
        const isPast = start < now;
        const appt = slot.appointment?.[0];
        const isCompleted = appt?.status === AppointmentStatus.COMPLETED;

        const getTitle = () => {
            if (isCompleted) return "Completed";
            if (isPast && slot.status === "AVAILABLE") return "Expired";
            if (slot.status === "BOOKED") return "Booked";
            if (slot.status === "BLOCKED") return "Blocked";
            return "Available";
        };

        const getBg = () => {
            if (isCompleted) return "#8b5cf6";   
            if (isPast) return "#d1d5db";
            if (slot.status === "BOOKED") return "#ef4444";   
            if (slot.status === "BLOCKED") return "#6b7280";  
            return "#22c55e";                               
        };

        return {
            id: slot.id,
            title: getTitle(),
            start,
            end: new Date(slot.endTime),
            backgroundColor: getBg(),
            textColor: isPast && !isCompleted ? "#6b7280" : "#fff",
            display: "block",
        };
    });

    function handleEventClick(event_id: string) {
        router.push(`?slot_id=${event_id}`, { scroll: false })
    }

    return (
        <div className="bg-white p-4 rounded-xl shadow">
            <FullCalendar
                plugins={[timeGridPlugin, interactionPlugin, dayGridPlugin]}
                initialView="timeGridWeek"
                height={1500}
                events={events}
                slotMinTime="06:00:00"
                slotMaxTime="23:00:00"
                scrollTime="12:00:00"
                expandRows={true}
                selectable
                timeZone="local"
                eventTextColor="#fff"
                eventBorderColor="#fff"
                eventDisplay="block"
                headerToolbar={{
                    left: 'prev,next today',
                    center: 'title',
                    right: 'timeGridDay,dayGridMonth,timeGridWeek'
                }}
                // dateClick={(arg)=>console.log(arg)}
                eventClick={(arg) => handleEventClick(arg.event.id)}
                eventClassNames={"cursor-pointer"}
            />
            <EventDetails />
        </div>
    );
}