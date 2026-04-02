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
    key: "COMPLETED" | "CONFIRMED" | "CANCELLED";
    label: string;
};

export const PatientAppointmentFilters: PatientFilter[] = [
    { key: "CONFIRMED", label: "Upcoming" },
    { key: "COMPLETED", label: "Completed" },
    { key: "CANCELLED", label: "Cancelled" },
];