'use client'
import { ButtonPrimary } from '@/utils/Section';
import { useLenisControl } from '@/utils/SmoothScroll';
import { ChevronDown, ChevronRight, LogOut, Mail, Menu, MoveUpRight, Phone, User, X } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react'
import MobileMenuItem from './MobileMenu';
// import Signup from './auth/signup';
import { useAuth } from '@/hooks/useAuth';
import { useRouter } from 'next/navigation';
import { generateInitials, getFirstName } from '@/lib/generate_initials';
import { AnimatePresence, motion, Variants } from 'motion/react';
import { useMutation } from '@tanstack/react-query';
import axios, { AxiosError } from 'axios';
import toast from 'react-hot-toast';

interface MenuItem {
    key: string;
    name: string;
    path?: string;
    submenu?: MenuItem[];
}

const containerVariants: Variants = {
    hide: {
        opacity: 0,
        y: 30,
        scale: 0.98,
        pointerEvents: "none",
    },
    show: {
        opacity: 1,
        y: 0,
        scale: 1,
        pointerEvents: "auto",
        transition: {
            type: "spring",
            stiffness: 200,
            damping: 25,
            mass: 0.8,
            bounce: 0.4,
            staggerChildren: 0.2,
            delayChildren: 0.1,
        },
    },
};
const itemVariants: Variants = {
    hide: {
        opacity: 0,
        y: -10,
    },
    show: {
        opacity: 1,
        y: 0,
        transition: {
            type: "spring",
            stiffness: 200,
            damping: 20,
        },
    },
};


export default function NavBar() {
    const router = useRouter()
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
                    key: 'Laser_Gynecology',
                    name: 'Laser Gynecology',
                    submenu: [
                        {
                            key: "Laser treatment for stress urinary incontinence",
                            name: "Laser treatment for stress urinary incontinence",
                            path: "/laser_gynecology/laser_treatment_for_stress_urinary_incontinence"
                        },
                        {
                            key: "Vaginal tightening procedures",
                            name: "Vaginal tightening procedures",
                            path: "/laser_gynecology/vaginal_tightening_procedures"
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
    // const [openLoginModal, setOpenLoginModal] = useState<boolean>(false);
    const [showOptions, setShowOptions] = useState<boolean>(false);
    const dropdownRef = useRef<HTMLDivElement | null>(null);
    const { isAuthenticated, user } = useAuth()

    useEffect(() => {
        if (isMenuOpen) {
            stopScroll();
        } else {
            startScroll();
        }
        return () => startScroll();
    }, [isMenuOpen, stopScroll, startScroll]);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target as Node)
            )
                setShowOptions(false);
        };

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const logoutMutation = useMutation({
        mutationFn: async () => {
            const response = await axios.post("/api/auth/logout", {}, { withCredentials: true });
            return response.data;
        },
        onSuccess: (val) => {
            toast.success(val?.message);
            window.location.href = "/";
        },
        onError: (err: AxiosError<{ error: string }>) => {
            toast.error(err.response?.data?.error || "Something went wrong");
        }
    });

    return (
        <header className='relative w-full z-30 bg-primary-color'>
            <nav className='relative w-full max-w-7xl mx-auto px-5 flex items-center justify-between h-20'>
                <div className='relative shrink-0 w-max'>
                    <Link href={'/'} className='flex items-center gap-2'>
                        <Image src={'/images/logo/new-logo-1.png'} width={350} height={60} alt='Dr. Ankita Chauhan'
                            className='md:w-[60px] w-[40px] h-auto' />
                        <Image src={'/images/logo/new-logo-2.png'} width={500} height={61} alt='Dr. Ankita Chauhan'
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

                <div className='lg:flex gap-2 items-center hidden relative' ref={dropdownRef}>

                    <button
                        onClick={() =>
                            isAuthenticated ? setShowOptions((prev) => !prev) : router.push("/login")
                        }
                        className='flex items-center gap-1 cursor-pointer px-3 py-2.5 bg-white text-primary-color rounded-lg transition-colors duration-200 ease-in-out hover:bg-gray-100 text-sm font-medium'
                    >
                        {!isAuthenticated ? "Book Appointment" : <>
                            <User size={15} fill='#827fc6' />
                            <span>
                                {getFirstName(user?.name!)}
                            </span>
                        </>}
                    </button>

                    <AnimatePresence>
                        {showOptions && user && (
                            <motion.div
                                className="absolute z-20 mt-7 top-full right-0 p-4 min-w-60 max-w-max bg-white backdrop-blur-xl rounded-2xl shadow-xl border border-gray-200 space-y-5"
                                variants={containerVariants}
                                initial="hide"
                                animate="show"
                                exit="hide"
                            >
                                <div className="flex items-center gap-3">
                                    <div className="size-10 rounded-full shrink-0 bg-primary-color/20 border border-primary-color/40 flex items-center justify-center font-semibold text-sm select-none text-primary-color">
                                        {generateInitials(user.name)}
                                    </div>

                                    <div className="flex-1 flex flex-col leading-tight">
                                        <span className="text-sm font-semibold text-gray-900 truncate">
                                            {user?.name}
                                        </span>
                                        <span className="text-xs text-gray-500 flex items-center gap-1 mt-0.5">
                                            <Mail size={12} className="text-gray-400" />
                                            {user?.email}
                                        </span>
                                    </div>
                                </div>

                                <div className="h-px bg-gray-100" />

                                {/* Actions */}
                                <div className="flex flex-col gap-1">
                                    <motion.button
                                        variants={itemVariants}
                                        onClick={() => (
                                            router.push(`${user.role === "DOCTOR" ? "/doctor/appointments" : "/user/dashboard"}`),
                                            setShowOptions(false)
                                        )}
                                        className="cursor-pointer group flex items-center justify-between px-3 py-2 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-100 transition-colors duration-150"
                                    >
                                        <span>Dashboard</span>
                                        <ChevronRight
                                            size={14}
                                            className="text-gray-400 group-hover:translate-x-0.5 transition-transform"
                                        />
                                    </motion.button>

                                    <motion.button
                                        variants={itemVariants}
                                        onClick={() => (logoutMutation.mutate(), setShowOptions(false))}
                                        className="cursor-pointer group flex items-center justify-between px-3 py-2 rounded-lg text-sm font-medium text-red-600 hover:bg-red-50 transition-colors duration-150"
                                    >
                                        <span>Logout</span>
                                        <LogOut
                                            size={14}
                                            className="text-red-500 group-hover:scale-110 transition-transform"
                                        />
                                    </motion.button>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
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
                        {
                            !isAuthenticated ?
                                <button
                                    onClick={() => (router.push("/login"), setIsMenuOpen(false))}
                                    className='w-full bg-white px-3 py-2.5 text-primary-color rounded-lg cursor-pointer transition-colors duration-200 ease-in-out hover:bg-gray-100 text-sm font-medium'
                                >
                                    Book Appointment
                                </button>
                                :
                                <button
                                    onClick={() => (isAuthenticated ? router.push("/user/dashboard") : router.push("/login"), setIsMenuOpen(false))}
                                    className='w-full flex gap-1 items-center justify-center bg-white px-3 py-2.5 text-primary-color rounded-lg cursor-pointer transition-colors duration-200 ease-in-out hover:bg-gray-100 text-sm font-medium'
                                >
                                    <User size={16} />
                                    <span>
                                        {user?.name}
                                    </span>
                                </button>
                        }
                    </div>
                </div>
            </div>

            {/* <Signup
                openLoginModal={openLoginModal}
                closeLoginModal={() => setOpenLoginModal(false)}
            /> */}
        </header>
    )
}
