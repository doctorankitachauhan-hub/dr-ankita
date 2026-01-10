'use client'
import { ButtonPrimary } from '@/utils/Section';
import { useLenisControl } from '@/utils/SmoothScroll';
import { ChevronDown, ChevronRight, Menu, MoveUpRight, Phone, X } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation'
import React, { Fragment, useEffect, useState } from 'react'
import BookAppointment from './BookAppointment';
import MobileMenuItem from './MobileMenu';

interface MenuItem {
    key: string;
    name: string;
    path?: string;
    submenu?: MenuItem[];
}

export default function NavBar() {
    const currentPath = usePathname();
    const menuItems: MenuItem[] = [
        // {
        //     key: 'home',
        //     name: 'Home',
        //     path: '/'
        // },
        {
            key: 'about',
            name: 'About Dr.Ankita',
            path: '/about'
        },
        {
            key: 'treatments',
            name: 'Services',
            submenu: [
                {
                    key: 'Pregnancy_&_Obstetric_Care',
                    name: 'Pregnancy & Obstetric Care',
                    submenu: [
                        {
                            key: "Preconception counselling & planning",
                            name: "Preconception counselling & planning",
                            path: "/pregnancy_&_obstetric_care/preconception_counselling_&_planning"
                        },
                        {
                            key: "Antenatal_and_postnatal_care",
                            name: "Antenatal and postnatal care",
                            path: "/pregnancy_&_obstetric_care/antenatal_and_postnatal_care"
                        },
                        {
                            key: "Normal_and_caesarean_delivery",
                            name: "Normal and caesarean delivery",
                            path: "/pregnancy_&_obstetric_care/normal_and_caesarean_delivery"
                        },
                        {
                            key: "High-risk_pregnancy_management",
                            name: "High-risk pregnancy management",
                            path: "/pregnancy_&_obstetric_care/high-risk_pregnancy_management"
                        },
                    ]
                },
                {
                    key: 'Gynecology_Care',
                    name: 'Gynecology Care',
                    submenu: [
                        {
                            key: "Menstrual problems & irregular periods",
                            name: "Menstrual problems & irregular periods",
                            path: "/gynecology_care/menstrual_problems_&_irregular_periods"
                        },
                        {
                            key: "PCOS management",
                            name: "PCOS management",
                            path: "/gynecology_care/PCOS-management"
                        },
                        {
                            key: "Pelvic infections treatment",
                            name: "Pelvic infections treatment",
                            path: "/gynecology_care/pelvic_infections_treatment"
                        },
                        {
                            key: "Menopause care & counselling",
                            name: "Menopause care & counselling",
                            path: "/gynecology_care/menopause_care_&_counselling"
                        },
                    ]
                },
                {
                    key: 'Advanced_Procedures_&_Surgeries',
                    name: 'Advanced Procedures & Surgeries',
                    submenu: [
                        {
                            key: "Operative hysteroscopy",
                            name: "Operative hysteroscopy",
                            path: "/advanced_procedures_&_surgeries/operative_hysteroscopy"
                        },
                        {
                            key: "Laparoscopic surgeries for fibroids, cysts & endometriosis",
                            name: "Laparoscopic surgeries for fibroids, cysts & endometriosis",
                            path: "/advanced_procedures_&_surgeries/laparoscopic_surgeries"
                        },
                        {
                            key: "Laparoscopic & vaginal hysterectomy",
                            name: "Laparoscopic & vaginal hysterectomy",
                            path: "/advanced_procedures_&_surgeries/laparoscopic_&_vaginal_hysterectomy"
                        },
                        {
                            key: "Perineal repair",
                            name: "Perineal repair",
                            path: "/advanced_procedures_&_surgeries/perineal_repair"
                        },
                    ]
                },
                {
                    key: 'Cosmetic_&_Laser_Gynecology',
                    name: 'Cosmetic & Laser Gynecology',
                    submenu: [
                        {
                            key: "Laser treatment for stress urinary incontinence",
                            name: "Laser treatment for stress urinary incontinence",
                            path: "/cosmetic_&_laser_gynecology/laser_treatment_for_stress_urinary_incontinence"
                        },
                        {
                            key: "Vaginal tightening procedures",
                            name: "Vaginal tightening procedures",
                            path: "/cosmetic_&_laser_gynecology/vaginal_tightening_procedures"
                        },
                        {
                            key: "Treatment for pigmentation",
                            name: "Treatment for pigmentation",
                            path: "/cosmetic_&_laser_gynecology/treatment_for_pigmentation"
                        },
                        {
                            key: "Management of chronic infections",
                            name: "Management of chronic infections",
                            path: "/cosmetic_&_laser_gynecology/management_of_chronic_infections"
                        },
                    ]
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
        <header className='relative w-full z-30 bg-primary-color'>
            <nav className='relative w-full max-w-7xl mx-auto px-5 flex items-center justify-between h-20'>
                <div className='relative shrink-0 w-max'>
                    <Link href={'/'} className='flex items-center gap-2'>
                        <Image src={'/images/logo/new-logo-1.png'} width={350} height={200} alt='Dr. Ankita Chauhan'
                            className='md:w-[60px] w-[40px] h-auto' />
                        <Image src={'/images/logo/new-logo-2.png'} width={500} height={500} alt='Dr. Ankita Chauhan'
                            className='md:w-[280px] w-[200px] h-auto' />
                    </Link>
                </div>

                <div className='lg:flex hidden relative w-max items-center gap-4 max-h-full h-full '>
                    {
                        menuItems.map(items => (
                            <div key={items.key} className="relative group/menu h-full flex ">
                                {items.path && items.path !== "" ?
                                    <Link
                                        href={items.path ?? ""}
                                        className={`cursor-pointer text-white flex items-center gap-2 relative text-base font-medium transition-all duration-300 ease-linear `}>
                                        {items.name}
                                    </Link> :
                                    <span
                                        className={`cursor-pointer text-white flex items-center gap-2 relative text-base font-medium transition-all duration-300 ease-linear `}>
                                        {items.name}
                                        {
                                            items.submenu && <ChevronDown className="transition-transform duration-200 ease-linear group-hover/menu:rotate-180 group-hover/menu:text-white " />
                                        }
                                    </span>}
                                {items && items.submenu && items.submenu.length > 0 && (
                                    <div
                                        className="absolute top-full left-1/2 -translate-x-1/2 mt-0.5 z-50 w-max bg-white rounded-xl shadow-md py-3 opacity-0 invisible translate-y-2 transition-all duration-200 group-hover/menu:opacity-100 group-hover/menu:visible group-hover/menu:translate-y-0 border border-gray-300 "
                                    >
                                        {items.submenu && items.submenu.length > 0 && items.submenu?.map((menuItem) => (
                                            <div key={menuItem.key} className="relative group/submenu">
                                                {
                                                    menuItem.path ? (
                                                        <Link
                                                            href={menuItem.path}
                                                            className="group/submenu text-base flex items-center justify-between gap-5 px-3 py-1.5  text-primary-color hover:bg-gray-100 hover:text-primary-hover transition-colors duration-200"
                                                        >
                                                            {menuItem.name}
                                                            <MoveUpRight size={14} />
                                                        </Link>
                                                    ) : (
                                                        <span
                                                            className="cursor-pointer text-base flex items-center justify-between gap-5 px-3 py-1.5  text-primary-color hover:bg-gray-100 hover:text-primary-hover transition-colors duration-200"
                                                        >
                                                            <span>{menuItem.name}</span>
                                                            <ChevronRight size={14} />
                                                        </span>
                                                    )
                                                }
                                                {menuItem.submenu && (
                                                    <div className="absolute top-0 left-full ml-0.5 min-w-[280px] bg-white rounded-xl shadow-lg opacity-0 invisible group-hover/submenu:opacity-100 group-hover/submenu:visible transition overflow-hidden">
                                                        {menuItem.submenu.map((deep) => (
                                                            <Link
                                                                key={deep.key}
                                                                href={deep.path ?? "#"}
                                                                className="text-sm flex items-center gap-2 px-3 py-1.5  text-primary-color hover:bg-gray-100 hover:text-primary-hover transition-colors duration-200"
                                                            >
                                                                <MoveUpRight size={14} className='shrink-0' />
                                                                {deep.name}
                                                            </Link>
                                                        ))}
                                                    </div>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        ))
                    }
                </div>

                <div className='lg:flex flex-col items-end hidden relative w-max'>
                    <ButtonPrimary onClick={() => setOpenForm(true)} className='bg-white text-primary-color! hover:bg-gray-50! '>
                        Book Appointment
                    </ButtonPrimary>
                </div>

                <button onClick={() => setIsMenuOpen((prev) => !prev)} className='lg:hidden w-12 h-12 flex items-center justify-center cursor-pointer bg-primary rounded-full '>
                    <Menu className='text-white w-7 h-7' />
                </button>
            </nav>

            <div className={`lg:hidden fixed inset-0 left-0 transition-transform duration-200 ease-linear bg-gradient-to-r from-primary-color/50 to-white z-20 backdrop-blur-[2px] ${isMenuOpen ? 'translate-x-0' : ' -translate-x-full'} `} />

            <div
                className={`lg:hidden fixed z-40 inset-y-0 bg-primary-color max-w-[450px] w-full transition-transform duration-300 ease-linear p-5 ${isMenuOpen ? "translate-x-0" : "-translate-x-full"}`}
                data-lenis-prevent
            >
                <div className='w-full h-full relative flex flex-col '>


                    <div className='relative w-full flex justify-between'>
                        <div className=''>
                            <Link href={'/'} className='flex gap-2 items-center'>
                                <Image src={'/images/logo/new-logo-1.png'} width={350} height={200} alt='Dr. Ankita Chauhan'
                                    className='md:w-[40px] w-[30px] h-auto' />
                                <Image src={'/images/logo/new-logo-2.png'} width={500} height={500} alt='Dr. Ankita Chauhan'
                                    className='md:w-[240px] w-[170px] h-auto' />
                            </Link>

                        </div>
                        <button className='w-10 h-10 bg-primary-color rounded-full flex items-center justify-center border-none cursor-pointer' onClick={() => { setIsMenuOpen(false) }}>
                            <X color='white' />
                        </button>
                    </div>

                    <div className='w-full relative mt-10 overflow-y-auto'>
                        <div className="flex flex-col gap-2.5">
                            {
                                menuItems.map(item => (
                                    <MobileMenuItem
                                        key={item.key}
                                        item={item}
                                        onClose={() => {
                                            setIsMenuOpen(false)
                                            setOpenSubMenu(null)
                                        }}
                                    />
                                ))
                            }
                        </div>
                    </div>

                    <div className='w-full absolute bottom-0 flex flex-col items-end'>
                        <ButtonPrimary onClick={() => { setIsMenuOpen(false); setOpenForm(true); }}
                            className='w-full bg-white text-primary-color! hover:bg-gray-50!'
                        >
                            Book Appointment
                        </ButtonPrimary>
                    </div>
                </div>
            </div>
            <BookAppointment openForm={openForm} closeForm={setOpenForm} />
        </header>
    )
}
