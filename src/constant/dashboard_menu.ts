import { Role } from "@/generated/prisma/enums";
import {
    LayoutDashboard,
    CalendarPlus,
    Upload,
    FileText,
    FolderOpen,
    MessageSquare,
    User,
    CalendarCheck,
    CalendarClock,
    Users,
    FilePlus,
    CreditCard,
    BarChart3,
    Settings
} from "lucide-react";

import { LucideIcon } from "lucide-react";

export type DashboardMenuType = {
    name: string;
    icon: LucideIcon;
    page: string;
    access: Role[];
};

export const UserDashboardMenu: DashboardMenuType[] = [
    {
        name: "Dashboard",
        page: "/user/dashboard",
        icon: LayoutDashboard,
        access: ["PATIENT"],
    },
    {
        name: "Book Appointment",
        page: "/user/appointments/book",
        icon: CalendarPlus,
        access: ["PATIENT"],
    },
    {
        name: "Upload Prescriptions",
        page: "/user/prescriptions/upload",
        icon: Upload,
        access: ["PATIENT"],
    },
    {
        name: "View Prescriptions",
        page: "/user/prescriptions",
        icon: FileText,
        access: ["PATIENT"],
    },
    {
        name: "Medical Records",
        page: "/user/records",
        icon: FolderOpen,
        access: ["PATIENT"],
    },
    {
        name: "Conversation History",
        page: "/user/messages",
        icon: MessageSquare,
        access: ["PATIENT"],
    },
    {
        name: "Profile",
        page: "/user/profile",
        icon: User,
        access: ["PATIENT"],
    },
];

export const DoctorDashboardMenu: DashboardMenuType[] = [
    {
        name: "Dashboard",
        page: "/doctor/dashboard",
        icon: LayoutDashboard,
        access: ["DOCTOR"],
    },
    {
        name: "Appointments",
        page: "/doctor/appointments",
        icon: CalendarCheck,
        access: ["DOCTOR"],
    },
    {
        name: "Availability / Time Slots",
        page: "/doctor/availability",
        icon: CalendarClock,
        access: ["DOCTOR"],
    },
    {
        name: "Patients",
        page: "/doctor/patients",
        icon: Users,
        access: ["DOCTOR"],
    },
    {
        name: "Create Prescription",
        page: "/doctor/prescriptions/create",
        icon: FilePlus,
        access: ["DOCTOR"],
    },
    {
        name: "All Prescriptions",
        page: "/doctor/prescriptions",
        icon: FileText,
        access: ["DOCTOR"],
    },
    {
        name: "Messages",
        page: "/doctor/messages",
        icon: MessageSquare,
        access: ["DOCTOR"],
    },
    {
        name: "Payments / Earnings",
        page: "/doctor/payments",
        icon: CreditCard,
        access: ["DOCTOR"],
    },
    {
        name: "Analytics",
        page: "/doctor/analytics",
        icon: BarChart3,
        access: ["DOCTOR"],
    },
    {
        name: "Profile",
        page: "/doctor/profile",
        icon: User,
        access: ["DOCTOR"],
    },
    {
        name: "Settings",
        page: "/doctor/settings",
        icon: Settings,
        access: ["DOCTOR"],
    },
];