"use client";
import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import dayGridPlugin from '@fullcalendar/daygrid'
import { useRouter } from "next/navigation";
import EventDetails from "./event_details";


type Slot = {
    id: string;
    startTime: string;
    endTime: string;
    status: "AVAILABLE" | "BOOKED" | "BLOCKED";
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

        return {
            id: slot.id,
            title: (isPast && slot.status === "AVAILABLE") ? "Expired" : slot.status === "BOOKED" ? "Booked" : slot.status === "BLOCKED" ? "Blocked" : "Available",
            start,
            end: new Date(slot.endTime),
            backgroundColor: isPast ? "#d1d5db" : slot.status === "BOOKED" ? "#ef4444" : slot.status === "BLOCKED" ? "#6b7280" : "#22c55e",
            textColor: isPast ? "#6b7280" : "#fff",
            // editable: !isPast,
            display: "block",
        };
    });

    function handleEventClick(event_id: string) {
        router.push(`?event_id=${event_id}`, { scroll: false })
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