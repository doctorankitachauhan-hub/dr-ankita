import Sidebar from '@/components/common/sidebar/sidebar';
import React, { ReactNode } from 'react'
import { Toaster } from 'react-hot-toast';

export default function UserLayout({ children }: Readonly<{ children: ReactNode; }>) {
    return (
        <main className="flex min-h-screen">
            <Sidebar />
            {children}
            <Toaster />
        </main>
    )
}
