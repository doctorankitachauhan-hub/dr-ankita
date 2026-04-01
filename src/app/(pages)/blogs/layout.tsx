import Contact from "@/components/Contact";
import NavBar from "@/components/NavBar";
import { ReactNode } from "react";
import { Footer } from "react-day-picker";

export default function BlogLayout({ children }: Readonly<{ children: ReactNode; }>) {
    return (
        <>
            <NavBar />
            {children}
            <Contact />
            <Footer />
        </>
    )
}