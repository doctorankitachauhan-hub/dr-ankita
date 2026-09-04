import { Metadata } from "next";
import { ReactNode } from "react";

export const metadata: Metadata = {
    title: "Patient Dashboard | Dr. Ankita Chauhan",
    robots: {
        index: false,
        follow: false,
    },
}

export default function UserGroupLayout({ children }: Readonly<{ children: ReactNode }>) {
    return <>{children}</>;
}
