import Login from "@/components/auth/login";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import NavBar from "@/components/NavBar";
import { Section, Wrapper } from "@/utils/Section";

export default function LoginPage() {
    return (
        <>
            <NavBar />
            <Section>
                <Wrapper>
                    <Login />
                </Wrapper>
            </Section>
            <Contact />
            <Footer />
        </>
    )
}
