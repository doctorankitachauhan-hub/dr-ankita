'use client';
import { Heading, Section, Subheading, Wrapper } from '@/utils/Section'
import Image from 'next/image'
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react'

interface Content {
    name: string;
    content: string;
    icon: string;
}
export default function About() {
    const currentPath = usePathname()
    const content: Content[] = [
        {
            name: 'Education',
            content: 'MBBS, MS – Obstetrics & Gynecology Fellowship in Laparoscopy',
            icon: '/images/about/icon-1.svg'
        },
        {
            name: 'Certifications',
            content: 'Member of FOGSI & IMA Registered Medical Practitioner (MCI)',
            icon: '/images/about/icon-2.svg'
        },
        {
            name: 'Patients Served',
            content: 'rusted by women for comprehensive obstetric and gynecological care',
            icon: '/images/about/icon-3.svg'
        },
        {
            name: 'Experience',
            content: '10+ years of dedicated experience in women\'s healthcare',
            icon: '/images/about/icon-4.svg'
        },
    ]
    return (
        <Section className={`${currentPath !== '/about' ? 'bg-[#F9FAFB]' : 'bg-transparent'} `}>
            <Wrapper>
                <div className='relative w-full grid lg:grid-cols-[450px_1fr] md:grid-cols-[380px_1fr] grid-cols-1 gap-8'>
                    <div className='relative w-full h-full flex md:justify-start justify-center'>
                        <Image src='/images/about/doc-img.png' width={450} height={400} alt='Dr. Ankita Chauhan'
                            className='max-h-[550px] w-auto h-full' />
                    </div>
                    <div className='w-full h-full relative'>
                        <span className='text-base font-medium text-[#e11d48] '>
                            ABOUT OUR DOCTOR
                        </span>
                        <Heading className='mt-2'>
                            Dr. Ankita Chauhan
                        </Heading>
                        <Subheading>
                            Dr. Ankita Chauhan is a highly experienced Consultant Obstetrician & Gynecologist dedicated to comprehensive women&apos;s healthcare. She holds an MBBS degree with distinction in Obstetrics & Gynecology, followed by an MS in Obstetrics & Gynecology and advanced fellowship training in laparoscopy.
                        </Subheading>
                        <Subheading className='mt-2'>
                            With over 10+ years of expertise, Dr. Ankita specializes in pregnancy care, high-risk obstetrics, normal and caesarean deliveries, minimally invasive and laparoscopic gynecologic surgeries, and cosmetic gynecology. Patients trust her for compassionate care, accurate diagnosis, and personalized treatment plans.
                        </Subheading>

                        {currentPath !== "/about" && <Link href={'/about'} className='px-4 py-2 bg-primary-color text-white text-sm rounded mt-4 block w-max ml-auto transition-colors duration-300 hover:bg-primary-hover'>
                            Read More
                        </Link>}

                        <div className='relative w-full mt-10 grid md:grid-cols-2 grid-cols-1 gap-5 gap-y-8'>
                            {
                                content.map((items) => (
                                    <div key={items.name} className='w-full h-full flex gap-2 items-start'>
                                        <div className='shrink-0 w-12 h-12 rounded-lg bg-[#e8ebf7] flex items-center justify-center'>
                                            <Image src={items.icon} width={32} height={32} alt={items.name} className='w-8 h-8' />
                                        </div>
                                        <div className='flex-1 flex flex-col gap-2'>
                                            <h3 className='font-bold text-secondry-color md:text-lg text-sm'>
                                                {items.name}
                                            </h3>
                                            <p className='text-sm text-zinc-500 leading-[1.4] '>
                                                {items.content}
                                            </p>
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                </div>
            </Wrapper>
        </Section>
    )
}
