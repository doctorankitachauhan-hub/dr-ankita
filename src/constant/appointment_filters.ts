export type Filter = {
    name: string;
    value: string;
}

export const AppointmentFilters: Filter[] = [
    {
        name: "Confirmed",
        value: "CONFIRMED"
    },
    {
        name: "Completed",
        value: "COMPLETED"
    },
    {
        name: "Cancelled",
        value: "CANCELLED"
    },
]

export type PatientFilter = {
    key: "upcoming" | "completed" | "cancelled";
    label: string;
};

export const PatientAppointmentFilters: PatientFilter[] = [
    { key: "upcoming", label: "Upcoming" },
    { key: "completed", label: "Completed" },
    { key: "cancelled", label: "Cancelled" },
];