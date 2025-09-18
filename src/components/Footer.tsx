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
            name: 'About',
            path: '/about'
        },
        {
            key: 'services',
            name: 'Services',
            path: '#'
        },
        {
            key: 'contact',
            name: 'Contact',
            path: '#'
        },
        {
            key: 'blog',
            name: 'Blogs',
            path: '#'
        }
    ]
    const contactInfo: Contact[] = [
        {
            name: '37-18/1-A/S-1, Below KFC, Defense Colony, SainikPuri, Secunderabad.',
            icon: '/images/footer/pin-white.svg',
            link: '#'
        },
        {
            name: '+91 6309683030',
            icon: '/images/footer/phone-white.svg',
            link: '#'
        },
        {
            name: 'info@gmail.com',
            icon: '/images/footer/mail-white.svg',
            link: '#'
        },
    ]
    const socialMedia: SocialIcons[] = [
        {
            icon: '/images/footer/instagram.svg',
            link: ''
        },
        {
            icon: '/images/footer/facebook.svg',
            link: ''
        },
        {
            icon: '/images/footer/linkedin.svg',
            link: ''
        },
        {
            icon: '/images/footer/youtube.svg',
            link: ''
        },
        {
            icon: '/images/footer/x.svg',
            link: ''
        },
        {
            icon: '/images/footer/google.svg',
            link: ''
        },
    ]

    return (
        <footer className='bg-[#2a283e] lg:!pt-20 md:!pt-16 pt-11 w-full relative pb-5'>
            <div className='w-full max-w-7xl relative mx-auto px-6 grid lg:grid-cols-[450px_200px_1fr_1fr] md:grid-cols-2 grid-cols-1 gap-5 mb-10'>
                <div className="w-full h-full relative flex flex-col">
                    <Image src='/images/logo/logo-2.png' alt='' width={300} height={200} />
                    <Subheading className='text-left mt-5 !text-white'>
                        Our goal is to give women at every stage of life with outstanding, caring, and all-encompassing gynecological treatment. By providing individualized, evidence-based medical care, we are committed to advancing the health and wellness of women. Our dedication goes beyond our knowledge of medicine to include compassion, decency, and a welcoming atmosphere for every patient.
                    </Subheading>
                    <div className='mt-5 w-full relative flex items-center gap-2'>
                        {
                            socialMedia.map((item, idx) => (
                                <Link key={idx} href={item.link}>
                                    <Image src={item.icon} width={32} height={32} alt='Social icon' />
                                </Link>
                            ))
                        }
                    </div>
                </div>

                <div className="w-full h-full p-2 relative">
                    <h3 className='font-bold text-white text-2xl'>Quick Links</h3>

                    <div className='relative mt-5 flex flex-col gap-1'>
                        {
                            menuItems.map(item => (
                                <Link href={item.path} key={item.key} className='uppercase font-normal text-white !font-montserrat flex items-center gap-1 text-sm'>
                                    <Image src={'/images/footer/link.svg'} width={18} height={18} alt={item.name} />
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
                <div className="w-full h-full p-2 relative">
                    <h3 className='font-bold text-white text-2xl'>Map</h3>
                    <div className='relative mt-5 flex items-center justify-center'>
                        <iframe
                            className='rounded-xl h-52'
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15249885.318783779!2d82.75252935!3d21.0680074!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x30635ff06b92b791%3A0xd78c4fa1854213a6!2sIndia!5e0!3m2!1sen!2sin!4v1756547193533!5m2!1sen!2sin" width="100%" height="100%" style={{ border: "0" }} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade">
                        </iframe>
                    </div>
                </div>
            </div>

            <div className='relative border-t border-neutral-100 pt-5'>
                <div className='flex items-center md:justify-between justify-center md:flex-row flex-col gap-1 max-w-7xl relative mx-auto px-6 w-full'>
                    <span className='md:text-sm text-[10px] font-normal text-white text-center'>
                        Copyright @ 2025 VS Women Clinic. All rights reserved.
                    </span>
                    <Link href={'#'} className='!font-montserrat md:text-sm text-[10px] font-normal text-white'>
                        Made with by ❤ Wizards Next.
                    </Link>
                </div>
            </div>
        </footer>
    )
}
