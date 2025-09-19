'use client'
import { ButtonPrimary } from '@/utils/Section';
import { useLenisControl } from '@/utils/SmoothScroll';
import { ChevronDown, Menu, MoveUpRight, Phone, X } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation'
import React, { Fragment, useEffect, useState } from 'react'
import BookAppointment from './BookAppointment';

interface MenuItem {
    key: string;
    name: string;
    path: string;
    submenu?: SubMenu[];
}
type SubMenu = Omit<MenuItem, 'submenu'>


export default function NavBar() {
    const currentPath = usePathname();
    const menuItems: MenuItem[] = [
        {
            key: 'home',
            name: 'Home',
            path: '/'
        },
        {
            key: 'about',
            name: 'About',
            path: '/about'
        },
        {
            key: 'treatments',
            name: 'Treatments',
            path: '/services',
            submenu: [
                {
                    key: 'infertility-treatment',
                    name: 'Infertility Treatment',
                    path: '/services/infertility-treatment'
                },
                {
                    key: 'pre-natal-care-and-delivery',
                    name: 'Pre Natal Care & Delivery',
                    path: '/services/pre-natal-care-and-delivery'
                },
                {
                    key: 'pregnancy-counselling',
                    name: 'Pregnancy Counselling',
                    path: '/services/pregnancy-counselling'
                },
                {
                    key: 'post-delivery-rehabilitation',
                    name: 'Post Delivery Rehabilitation',
                    path: '/services/post-delivery-rehabilitation'
                },
                {
                    key: 'laparoscopic-surgery',
                    name: 'Laparoscopic Surgery',
                    path: '/services/laparoscopic-surgery'
                },
                {
                    key: 'laser-vaginal-rejuvenation',
                    name: 'Laser Vaginal Rejuvenation',
                    path: '/services/laser-vaginal-rejuvenation'
                },
                {
                    key: 'vaginal-dryness',
                    name: 'Vaginal Dryness',
                    path: '/services/vaginal-dryness'
                },
                {
                    key: 'hymenoplasty',
                    name: 'Hymenoplasty',
                    path: '/services/hymenoplasty'
                },
                {
                    key: 'laser-vaginal-tightening',
                    name: 'Laser Vaginal Tightening',
                    path: '/services/laser-vaginal-tightening'
                },
                {
                    key: 'prp-therapy',
                    name: 'PRP Therapy for Vaginal Dryness',
                    path: '/services/prp-therapy'
                },
                {
                    key: 'vaginoplasty',
                    name: 'Vaginoplasty',
                    path: '/services/vaginoplasty'
                },
            ]
        },

        {
            key: 'contact',
            name: 'Contact',
            path: '/contact'
        },
        {
            key: 'blog',
            name: 'Blogs',
            path: '/blogs'
        }
    ]
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { stopScroll, startScroll } = useLenisControl();
    const [openSubMenu, setOpenSubMenu] = useState<string | null>(null);
    const [openForm, setOpenForm] = useState<boolean>(false);

    const toggleSubMenu = (key: string) => {
        setOpenSubMenu((prev) => (prev === key ? null : key));
    };

    useEffect(() => {
        if (isMenuOpen || openForm) {
            stopScroll();
        } else {
            startScroll();
        }
        return () => startScroll();
    }, [isMenuOpen, stopScroll, startScroll, openForm]);

    return (
        <header className='relative w-full z-30'>
            <nav className='relative w-full max-w-7xl mx-auto px-5 py-3 flex items-center justify-between'>
                <div className='relative shrink-0 w-max'>
                    <Link href={'/'}>
                        <Image src={'/images/logo/logo-2.svg'} width={350} height={200} alt='Dr. G. Nikila'
                            className='md:w-[400px] w-[250px] h-auto' />
                    </Link>
                </div>

                <div className='lg:flex hidden relative w-max items-center gap-4'>
                    {
                        menuItems.map(items => (
                            <div key={items.key} className="relative group/menu">
                                <Link
                                    href={items.path}
                                    className={`flex items-center gap-2 relative text-base font-medium transition-all duration-300 ease-linear after:absolute after:bottom-0 after:h-[2px] after:bg-primary-color ${currentPath === items.path ? 'text-primary-color after:left-0 after:w-full' : 'text-secondry-color after:w-0 after:right-0 after:left-auto hover:text-secondry-hover'}`}>
                                    {items.name}
                                    {
                                        items.submenu && <ChevronDown className="transition-transform duration-200 ease-linear group-hover/menu:rotate-180 group-hover/menu:text-primary-color " />
                                    }
                                </Link>
                                {items.key === 'treatments' ? (
                                    <div
                                        className="absolute top-full left-1/2 -translate-x-1/2 mt-2 z-50 w-max bg-primary-color rounded-xl shadow-md p-3 opacity-0 invisible translate-y-2 transition-all duration-200 group-hover/menu:opacity-100 group-hover/menu:visible group-hover/menu:translate-y-0 "
                                    >
                                        {items.submenu?.map((submenu) => (
                                            <Link
                                                key={submenu.key}
                                                href={submenu.path}
                                                className="group/item text-lg flex items-center gap-2.5 px-3 py-1.5 rounded text-white hover:bg-warm hover:text-neutral-100 transition-colors duration-200 hover:underline "
                                            >
                                                <MoveUpRight
                                                    className="w-4 shrink-0 transition-transform duration-200 group-hover/item:-translate-y-0.5 group-hover/item:translate-x-0.5 group-hover/item:text-white"
                                                />
                                                <span className="truncate">{submenu.name}</span>
                                            </Link>
                                        ))}
                                    </div>
                                ) : ''}
                            </div>
                        ))
                    }
                </div>

                <div className='lg:flex flex-col items-end hidden relative w-max'>
                    <ButtonPrimary onClick={()=>setOpenForm(true)}>
                        Book Appointment
                    </ButtonPrimary>
                </div>

                <button onClick={() => setIsMenuOpen((prev) => !prev)} className='lg:hidden w-12 h-12 flex items-center justify-center cursor-pointer bg-primary rounded-full '>
                    <Menu className='text-primary-color w-7 h-7' />
                </button>
            </nav>

            <div className={`lg:hidden fixed inset-0 left-0 transition-transform duration-200 ease-linear bg-gradient-to-r from-primary-color/50 to-white z-20 backdrop-blur-[2px] ${isMenuOpen ? 'translate-x-0' : ' -translate-x-full'} `} />

            <div
                className={`lg:hidden fixed z-40 inset-y-0 bg-white max-w-[450px] w-full transition-transform duration-300 ease-linear p-5 ${isMenuOpen ? "translate-x-0" : "-translate-x-full"}`}
                data-lenis-prevent
            >
                <div className='w-full h-full relative flex flex-col '>


                    <div className='relative w-full flex justify-between'>
                        <Link href={'/'}>
                            <Image src={'/images/logo/logo-1.svg'} width={250} height={200} alt='Dr. G. Nikila' className='md:w-[250px] w-[150px] h-auto ' />
                        </Link>
                        <button className='w-10 h-10 bg-primary-color rounded-full flex items-center justify-center border-none cursor-pointer' onClick={() => { setIsMenuOpen(false) }}>
                            <X color='white' />
                        </button>
                    </div>

                    <div className='w-full relative mt-10 overflow-y-auto'>
                        <div className="flex flex-col gap-2.5">
                            {
                                menuItems.map(items => (
                                    <div className='relative' key={items.key} >

                                        {
                                            items.key !== 'treatments' ? (

                                                <Link href={items.path} className={`flex items-center gap-5 w-max relative text-xl transition-all font-medium duration-300 ease-linear px-4 py-1.5 rounded-full ${currentPath === items.path ? 'bg-primary-color text-white' : 'text-primary-color'} `}
                                                    onClick={() => { setIsMenuOpen(false) }}
                                                >
                                                    {items.name}
                                                    {
                                                        items.submenu && <ChevronDown className="transition-transform duration-200 ease-linear group-hover/menu:rotate-180 group-hover/menu:text-primary-color" />
                                                    }
                                                </Link>
                                            ) : (
                                                <Fragment>
                                                    <button type="button"
                                                        onClick={() => toggleSubMenu(items.key)}
                                                        className={`flex items-center gap-5 w-max relative text-xl transition-all cursor-pointer !font-open-sans font-medium duration-300 ease-linear px-4 py-1.5 rounded-full ${currentPath === items.path ? 'bg-primary-color text-white' : 'text-primary-color'} `}
                                                    >
                                                        {items.name}
                                                        <ChevronDown className={`transition-transform duration-200 ${openSubMenu === items.key ? "rotate-180" : ""
                                                            }`} />
                                                    </button>
                                                    <div
                                                        className={`relative z-50 transition-all duration-300 overflow-hidden ${openSubMenu === items.key
                                                            ? "max-h-[1000px] opacity-100 visible"
                                                            : "max-h-0 opacity-0 invisible"
                                                            }`}
                                                    >
                                                        {items.submenu?.map(submenu => (
                                                            <Link
                                                                key={submenu.key}
                                                                href={submenu.path}
                                                                onClick={() => { setIsMenuOpen(false); setOpenSubMenu(null) }}
                                                                className="group/item border-b flex items-center gap-2.5 px-3 py-1.5 text-primary-color transition-colors duration-200"
                                                            >
                                                                <MoveUpRight className="w-4 shrink-0 transition-transform duration-200 group-hover/item:translate-x-0.5 group-hover/item:-translate-y-0.5" />
                                                                <span className="truncate">{submenu.name}</span>
                                                            </Link>
                                                        ))}
                                                    </div>
                                                </Fragment>
                                            )
                                        }
                                    </div>
                                ))
                            }
                        </div>
                    </div>

                    <div className='w-full absolute bottom-0 flex flex-col items-end'>
                        <ButtonPrimary onClick={() => { setIsMenuOpen(false) }} className='w-full'>
                            Book Appointment
                        </ButtonPrimary>
                    </div>
                </div>
            </div>
            <BookAppointment openForm={openForm} closeForm={setOpenForm} />
        </header>
    )
}
