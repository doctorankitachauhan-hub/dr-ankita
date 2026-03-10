import React, { ReactNode } from 'react'

export default function DoctorLayout({ children }: Readonly<{ children: ReactNode; }>) {
    return (
        <main className="flex min-h-screen">
            {children}
        </main>
    )
}
