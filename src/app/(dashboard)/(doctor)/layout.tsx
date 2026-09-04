import { Metadata } from "next";
import { ReactNode } from "react";

export const metadata: Metadata = {
    title: "Doctor Dashboard | Dr. Ankita Chauhan",
    robots: {
        index: false,
        follow: false,
    },
}

export default function DoctorGroupLayout({ children }: Readonly<{ children: ReactNode }>) {
    return <>{children}</>;
}
