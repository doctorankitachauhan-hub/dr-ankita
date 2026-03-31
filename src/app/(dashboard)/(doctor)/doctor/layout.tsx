import Sidebar from '@/components/common/sidebar/sidebar';
import DashboardTopbar from '@/components/common/topbar/topbar';
import React, { ReactNode } from 'react'
import { Toaster } from 'react-hot-toast';

export default function DoctorLayout({ children }: Readonly<{ children: ReactNode; }>) {
    return (
        <main className="flex max-h-screen">
            <Sidebar />
            <section className='p-0! flex-1 w-full max-h-screen overflow-y-scroll bg-gray-50 flex flex-col'
                data-lenis-prevent
                style={{scrollbarWidth:"none"}}
            >
                <DashboardTopbar />
                {children}
            </section>
            <Toaster />
        </main>
    )
}
