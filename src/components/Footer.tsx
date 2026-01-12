import { Subheading } from '@/utils/Section';
import Image from 'next/image'
import Link from 'next/link';
import React from 'react'

interface MenuItem {
    key: string;
    name: string;
    path: string;
}
interface Contact {
    name: string;
    link: string;
    icon: string;
}
interface SocialIcons {
    icon: string;
    link: string;
}

export default function Footer() {
    const menuItems: MenuItem[] = [
        {
            key: 'home',
            name: 'Home',
            path: '/'
        },
        {
            key: 'about',
            name: 'About Dr. Ankita',
            path: '/about'
        },
        {
            key: 'treatments',
            name: 'Services',
            path: '/services'
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
    const treatmentMenu: MenuItem[] = [
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
            key: "Laser treatment for stress urinary incontinence",
            name: "Laser treatment for stress urinary incontinence",
            path: "/cosmetic_&_laser_gynecology/laser_treatment_for_stress_urinary_incontinence"
        },
        {
            key: "Vaginal tightening procedures",
            name: "Vaginal tightening procedures",
            path: "/cosmetic_&_laser_gynecology/vaginal_tightening_procedures"
        },
    ]
    const contactInfo: Contact[] = [
        {
            name: '206 B, Botanical Garden Rd, Sri Ram Nagar, Gachibowli, Kondapur, Telangana 500084',
            icon: '/images/footer/pin-white.svg',
            link: 'https://maps.app.goo.gl/NiVQhbtNcaHpQBjUA'
        },
        {
            name: '+91 98812 79493',
            icon: '/images/footer/phone-white.svg',
            link: 'tel:+919881279493'
        },
        {
            name: 'doctorankitachauhan@gmail.com',
            icon: '/images/footer/mail-white.svg',
            link: 'mailto:doctorankitachauhan@gmail.com'
        },
    ]
    const socialMedia: SocialIcons[] = [
        {
            icon: '/images/footer/instagram.svg',
            link: 'https://www.instagram.com/dr.ankitachauhan_'
        },
        {
            icon: '/images/footer/youtube.svg',
            link: 'https://www.youtube.com/@DrAnkitaChauhan'
        }
    ]

    return (
        <footer className='bg-[#2a283e] lg:!pt-20 md:!pt-16 pt-11 w-full relative pb-5'>
            <div className='w-full max-w-7xl relative mx-auto px-6 grid lg:grid-cols-[350px_180px_1fr_250px] md:grid-cols-2 grid-cols-1 gap-5 mb-10'>
                <div className="w-full h-full relative flex flex-col">
                    <div className='flex gap-1 items-center'>
                        <Image src={'/images/logo/new-logo-1.png'} alt='Dr Ankita'
                            width={400} height={56} className='w-14'
                        />
                        <Image src={'/images/logo/new-logo-2.png'} alt='Dr Ankita'
                            width={400} height={56} className='w-54'
                        />
                    </div>
                    <Subheading className='text-left mt-5 !text-white !text-sm font-normal'>
                        Dedicated to women&apos;s health at every stage of life, with compassionate and personalized gynecological care. We combine medical expertise with a supportive, welcoming environment.
                    </Subheading>
                    <div className='mt-5 w-full relative flex items-center gap-3'>
                        {
                            socialMedia.map((item, idx) => (
                                <Link key={idx} href={item.link} target='_blank'>
                                    <Image src={item.icon} width={32} height={32} alt='Social icon' />
                                </Link>
                            ))
                        }
                    </div>
                </div>

                <div className="w-full h-full p-2 relative">
                    <h3 className='font-bold text-white text-2xl'>Quick Links</h3>

                    <div className='relative mt-5 flex flex-col gap-2'>
                        {
                            menuItems.map(item => (
                                <Link href={item.path} key={item.key} className='font-normal text-white !font-montserrat flex items-center gap-2 text-sm'>
                                    <Image src={'/images/footer/link.svg'} width={14} height={14} alt={item.name} />
                                    {item.name}
                                </Link>
                            ))
                        }
                    </div>
                </div>

                <div className="w-full h-full p-2 relative">
                    <h3 className='font-bold text-white text-2xl'>Treatments</h3>
                    <div className='relative mt-5 flex flex-col gap-2'>
                        {
                            treatmentMenu.map(item => (
                                <Link href={item.path} key={item.key} className='font-normal text-white !font-montserrat flex items-center gap-2 text-sm'>
                                    <Image src={'/images/footer/link.svg'} width={14} height={14} alt={item.name} />
                                    {item.name}
                                </Link>
                            ))
                        }
                    </div>
                </div>

                <div className="w-full h-full p-2 relative">
                    <h3 className='font-bold text-white text-2xl'>Contact Info</h3>
                    <div className='relative mt-5 flex flex-col gap-3'>
                        {
                            contactInfo.map((item, idx) => (
                                <Link href={item.link} target='_blank' key={idx} className='font-normal text-sm text-white !font-montserrat flex items-start gap-3'>
                                    <Image src={item.icon} width={28} height={28} alt={item.name} className='w-6 h-6' />
                                    {item.name}
                                </Link>
                            ))
                        }
                    </div>
                </div>

            </div>

            <div className='relative border-t border-neutral-100 pt-5'>
                <div className='flex items-center md:justify-between justify-center md:flex-row flex-col gap-1 max-w-7xl relative mx-auto px-6 w-full'>
                    <span className='md:text-sm text-[10px] font-normal text-white text-center'>
                        Copyright @ {new Date().getFullYear()} Dr. Ankita Chauhan. All rights reserved.
                    </span>
                    <Link href={'https://wizards.co.in/'} target='_blank' className='!font-montserrat md:text-sm text-[10px] font-normal text-white'>
                        Made with by ❤ <span className='italic'>Wizards Next.</span>
                    </Link>
                </div>
            </div>
        </footer>
    )
}
