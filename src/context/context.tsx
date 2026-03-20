"use client";
import { Role } from "@/generated/prisma/enums";
import { createContext, useState } from "react";

type AuthUser = {
    sub: string;
    name: string;
    email: string;
    role: Role;
};

type AuthContextType = {
    user: AuthUser | null;
    isAuthenticated: boolean;
    logout: () => void;
    setUser: (user: AuthUser | null) => void;
};

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function ContextProvider({ children, initialUser }: { children: React.ReactNode, initialUser: AuthUser | null; }) {
    const [user, setUser] = useState<AuthUser | null>(initialUser);

    const logout = () => {
        setUser(null);
    };

    const value = {
        user,
        isAuthenticated: !!user,
        logout,
        setUser,
    }
    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}
