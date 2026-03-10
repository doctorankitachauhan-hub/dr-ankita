import React, { ReactNode } from 'react'
import { Toaster } from 'react-hot-toast';

export default function DoctorLayout({ children }: Readonly<{ children: ReactNode; }>) {
    return (
        <main className="flex min-h-screen">
            {children}
            <Toaster />
        </main>
    )
}
