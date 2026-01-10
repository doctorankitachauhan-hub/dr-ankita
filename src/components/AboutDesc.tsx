import { Heading, Section, Subheading, Wrapper } from '@/utils/Section'
import Image from 'next/image'
import React from 'react'

interface Content {
    name: string;
    content: string;
    icon: string;
}
export default function AboutDesc() {
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
        <Section>
            <Wrapper>
                <div className='relative w-full grid lg:grid-cols-[450px_1fr] md:grid-cols-[380px_1fr] grid-cols-1 gap-8'>
                    <div className='relative w-full h-full flex md:justify-start justify-center'>
                        <Image src='/images/about/doc-img-2.png' width={450} height={400} alt='Dr. Ankita Chauhan'
                            className='max-h-[500px] w-auto h-full' />
                    </div>
                    <div className='w-full h-full relative'>
                        <span className='text-base font-medium text-[#e11d48] '>
                            Doctor Overview
                        </span>
                        <Heading className='mt-2'>
                            Dr. Ankita Chauhan
                        </Heading>
                        <Subheading>
                            Dr. Ankita Chauhan is a Consultant Obstetrician and Gynecologist with extensive experience in managing a wide spectrum of women7apos;s health concerns. Her clinical practice focuses on providing comprehensive care across pregnancy, childbirth, and gynecological health, with special attention to individual patient needs.
                        </Subheading>
                        <Subheading className='mt-2'>
                            She is known for her calm approach, clear communication, and ability to guide patients through important health decisions with confidence. Dr. Ankita believes in combining medical expertise with empathy, ensuring every woman feels heard, supported, and cared for throughout her treatment journey.
                        </Subheading>

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
