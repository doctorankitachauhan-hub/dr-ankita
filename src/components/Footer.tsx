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
            key: 'treatments',
            name: 'Treatments',
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
    const contactInfo: Contact[] = [
        {
            name: 'A. S. Rao Nagar, Arul colony, 1-299/2, 3rd Cross Rd, above aruna diagnostics, Secunderabad, Telangana 500062',
            icon: '/images/footer/pin-white.svg',
            link: 'https://maps.app.goo.gl/QxMz4WTXZdbueZNz7'
        },
        {
            name: '+91 6309683030',
            icon: '/images/footer/phone-white.svg',
            link: 'tel:+916309683030'
        },
        {
            name: 'vswomenclinic24@gmail.com',
            icon: '/images/footer/mail-white.svg',
            link: 'mailto:vswomenclinic24@gmail.com'
        },
    ]
    const socialMedia: SocialIcons[] = [
        {
            icon: '/images/footer/instagram.svg',
            link: 'https://www.instagram.com/dr.g.nikilareddy/'
        },
        {
            icon: '/images/footer/facebook.svg',
            link: 'https://www.facebook.com/people/Dr-G-Nikila-Reddy/61573605385904/'
        },
        {
            icon: '/images/footer/youtube.svg',
            link: 'https://www.youtube.com/@Drgnikilareddy'
        }
    ]

    return (
        <footer className='bg-[#2a283e] lg:!pt-20 md:!pt-16 pt-11 w-full relative pb-5'>
            <div className='w-full max-w-7xl relative mx-auto px-6 grid lg:grid-cols-[450px_200px_1fr_1fr] md:grid-cols-2 grid-cols-1 gap-5 mb-10'>
                <div className="w-full h-full relative flex flex-col">
                    <Image src='/images/logo/footer.svg' alt='' width={400} height={200} />
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

                    <div className='relative mt-5 flex flex-col gap-3'>
                        {
                            menuItems.map(item => (
                                <Link href={item.path} key={item.key} className='uppercase font-normal text-white !font-montserrat flex items-center gap-2 text-sm'>
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
                <div className="w-full h-full p-2 relative">
                    <h3 className='font-bold text-white text-2xl'>Map</h3>
                    <div className='relative mt-5 flex items-center justify-center'>
                        <iframe
                            className='rounded-xl h-52'
                            src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d15222.332737793133!2d78.5394945!3d17.479653!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb9b5665ee50c5%3A0xc392f00b5ab18c8a!2sV.%20S.%20Women%20Clinic!5e0!3m2!1sen!2sin!4v1758191807351!5m2!1sen!2sin" width="100%" height="100%" style={{ border: "0" }} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade">
                        </iframe>
                    </div>
                </div>
            </div>

            <div className='relative border-t border-neutral-100 pt-5'>
                <div className='flex items-center md:justify-between justify-center md:flex-row flex-col gap-1 max-w-7xl relative mx-auto px-6 w-full'>
                    <span className='md:text-sm text-[10px] font-normal text-white text-center'>
                        Copyright @ 2025 Dr. G. Nikila Reddy. All rights reserved.
                    </span>
                    <Link href={'#'} className='!font-montserrat md:text-sm text-[10px] font-normal text-white'>
                        Made with by ❤ Wizards Next.
                    </Link>
                </div>
            </div>
        </footer>
    )
}
