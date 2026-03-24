'use client';
import { DoctorDashboardMenu, UserDashboardMenu } from '@/constant/dashboard_menu';
import { useAuth } from '@/hooks/useAuth';
import { cn } from '@/lib/utils';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react'
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';



export default function Sidebar() {
    const pathname = usePathname();
    const [collapsed, setCollapsed] = useState<boolean>(false);
    const { user } = useAuth();
    const role = user?.role;
    const menu = pathname.startsWith("/user") ? UserDashboardMenu : DoctorDashboardMenu
    const filteredTabs = role ? menu.filter((tab) => tab.access && tab.access.includes(role)) : [];

    return (
        <motion.aside
            className="h-screen flex flex-col bg-[#7a71ba]"
            animate={{ width: collapsed ? 100 : 300 }}
        >
            <div className="flex items-center justify-between p-4">
                {!collapsed ? (
                    <Link href={'/'} className='flex items-center gap-2'>
                        <Image src={'/images/logo/new-logo-1.png'} width={350} height={60} alt='Dr. Ankita Chauhan'
                            className='w-[50px] h-auto' />
                        <Image src={'/images/logo/new-logo-2.png'} width={500} height={61} alt='Dr. Ankita Chauhan'
                            className='w-[180px] h-auto' />
                    </Link>
                ) : (
                    <Image src={'/images/logo/new-logo-1.png'} width={350} height={60} alt='Dr. Ankita Chauhan'
                        className='w-[35px] h-auto' />
                )}

                {/* <button onClick={() => setCollapsed(!collapsed)}>
                    {collapsed ? <ChevronRight /> : <ChevronLeft />}
                </button> */}
            </div>
            <div className='w-full h-px bg-[#685fa3]' />

            <div className='w-full mt-8 overflow-y-auto flex flex-col'>
                {
                    filteredTabs.map((tabs, idx) => (
                        <Link
                            key={tabs.name}
                            href={tabs.page}
                            className={cn('flex items-center gap-2 px-5 py-3 transition duration-300 ease-in-out font-medium',
                                pathname === tabs.page
                                    ? "bg-white text-primary-color"
                                    : "text-white hover:bg-primary-hover"

                            )}
                        >
                            <tabs.icon size={18} />
                            <span>
                                {tabs.name}
                            </span>
                        </Link>
                    ))
                }
            </div>
        </motion.aside>
    )
}
