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