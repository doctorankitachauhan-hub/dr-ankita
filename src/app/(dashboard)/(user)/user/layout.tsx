import React, { ReactNode } from 'react'

export default function UserLayout({ children }: Readonly<{ children: ReactNode; }>) {
    return (
        <main className="flex min-h-screen">
            {children}
        </main>
    )
}
