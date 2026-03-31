import { getServerUser } from "@/lib/getServerUser";
import { ContextProvider } from "./context";

export default async function AuthBoundary({
    children,
}: {
    children: React.ReactNode;
}) {
    const user = await getServerUser();    
    return (
        <ContextProvider initialUser={user}>
            {children}
        </ContextProvider>
    );
}
