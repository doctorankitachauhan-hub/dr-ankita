import Login from "@/components/auth/login";
import { Section, Wrapper } from "@/utils/Section";
import { Toaster } from "react-hot-toast";

export default function LoginPage() {
    return (
        <Section>
            <Wrapper>
                <Login />
            </Wrapper>
            <Toaster />
        </Section>
    )
}
