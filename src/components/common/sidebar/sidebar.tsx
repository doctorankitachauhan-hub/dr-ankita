'use client';
import { DoctorDashboardMenu, UserDashboardMenu } from '@/constant/dashboard_menu';
import { useAuth } from '@/hooks/useAuth';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'motion/react'
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface SidebarProps {
    mobileOpen: boolean;
    onClose: () => void;
}

export default function Sidebar({ mobileOpen, onClose }: SidebarProps) {
    const pathname = usePathname();
    const { user } = useAuth();
    const role = user?.role;
    const menu = pathname.startsWith("/user") ? UserDashboardMenu : DoctorDashboardMenu
    const filteredTabs = role ? menu.filter((tab) => tab.access && tab.access.includes(role)) : [];

    return (
        <>
            <AnimatePresence>
                {mobileOpen && (
                    <motion.div
                        key="backdrop"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="fixed inset-0 z-40 bg-black/40 lg:hidden"
                        onClick={onClose}
                    />
                )}
            </AnimatePresence>

            <motion.aside
                className={`lg:relative absolute h-screen flex flex-col bg-[#7a71ba] lg:translate-x-0 -translate-x-full transition z-50 ${mobileOpen ? "translate-x-0" : "-translate-x-full"}`}
            >
                <div className="flex items-center justify-between p-4">
                    <Link href={'/'} className='flex items-center gap-2'>
                        <Image src={'/images/logo/new-logo-1.png'} width={350} height={60} alt='Dr. Ankita Chauhan'
                            className='w-[50px] h-auto' />
                        <Image src={'/images/logo/new-logo-2.png'} width={500} height={61} alt='Dr. Ankita Chauhan'
                            className='w-[180px] h-auto' />
                    </Link>

                </div>
                <div className='w-full h-px bg-[#685fa3]' />

                <div className='w-full h-full mt-2 overflow-y-auto flex flex-col pb-2' data-lenis-prevent
                    style={{ scrollbarWidth: "none" }}
                >
                    {
                        filteredTabs.map((tabs, idx) => (
                            <Link
                                key={tabs.name}
                                href={tabs.page}
                                onClick={onClose}
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
        </>
    )
}
