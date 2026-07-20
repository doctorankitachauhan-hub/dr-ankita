import Login from "@/components/auth/login";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import NavBar from "@/components/NavBar";
import Spinner from "@/components/ui/spinner";
import { Section, Wrapper } from "@/utils/Section";
import { Suspense } from "react";

export default function LoginPage() {
    return (
        <>
            <NavBar />
            <Section className="bg-slate-50">
                <Wrapper>
                    <Suspense fallback={<Spinner />}>
                        <Login />
                    </Suspense>
                </Wrapper>
            </Section>
            <Contact />
            <Footer />
        </>
    )
}
