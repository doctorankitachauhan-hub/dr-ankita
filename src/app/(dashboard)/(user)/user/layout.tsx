'use client';
import Sidebar from '@/components/common/sidebar/sidebar';
import DashboardTopbar from '@/components/common/topbar/topbar';
import React, { ReactNode, useState } from 'react';
import { Toaster } from 'react-hot-toast';

export default function UserLayout({ children }: Readonly<{ children: ReactNode }>) {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <main className="flex max-h-screen">

            <Sidebar mobileOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

            <section
                className='p-0! flex-1 w-full max-h-screen overflow-y-scroll bg-gray-50 flex flex-col'
                data-lenis-prevent
                style={{ scrollbarWidth: "none" }}
            >
                <DashboardTopbar onMenuToggle={() => setSidebarOpen(prev => !prev)} />
                {children}
            </section>

            <Toaster />
        </main>
    );
}