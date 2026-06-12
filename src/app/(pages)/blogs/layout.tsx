import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import NavBar from "@/components/NavBar";
import { ReactNode } from "react";

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