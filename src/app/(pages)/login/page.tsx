import Login from "@/components/auth/login";
import Contact from "@/components/Contact";
import NavBar from "@/components/NavBar";
import { Section, Wrapper } from "@/utils/Section";
import { Footer } from "react-day-picker";
import { Toaster } from "react-hot-toast";

export default function LoginPage() {
    return (
        <>
            <NavBar />
            <Section>
                <Wrapper>
                    <Login />
                </Wrapper>
                <Toaster />
            </Section>
            <Contact />
            <Footer />
        </>
    )
}
