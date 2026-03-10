import React, { ReactNode } from 'react'
import { Toaster } from 'react-hot-toast';

export default function UserLayout({ children }: Readonly<{ children: ReactNode; }>) {
    return (
        <main className="flex min-h-screen">
            {children}
            <Toaster />
        </main>
    )
}
