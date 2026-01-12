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
            name: 'Clinical Focus',
            content: 'High-Risk & Advanced Pregnancy Care & Experienced in managing complex pregnancies with a calm, evidence-based approach.',
            icon: '/images/about/new-icon-1.svg'
        },
        {
            name: 'Surgical Expertise',
            content: 'Minimally Invasive Gynecological Procedures Skilled in laparoscopic and hysteroscopic surgeries for safer outcomes and faster recovery.',
            icon: '/images/about/new-icon-2.svg'
        },
        {
            name: 'Women\'s Wellness',
            content: 'Complete Care Across Life Stages Supporting women from adolescence to menopause with holistic gynecological care.',
            icon: '/images/about/new-icon-3.svg'
        },
        {
            name: 'Communication & Trust',
            content: 'Clear Guidance at Every Step Known for explaining conditions and treatments in a simple, reassuring manner.',
            icon: '/images/about/new-icon-4.svg'
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
                            Dr. Ankita Chauhan is a Consultant Obstetrician and Gynecologist with extensive experience in managing a wide spectrum of women&apos;s health concerns. Her clinical practice focuses on providing comprehensive care across pregnancy, childbirth, and gynecological health, with special attention to individual patient needs.
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


export function OtherData() {
    return (
        <Section>
            <Wrapper>
                <div className='relative w-full flex flex-col gap-5'>
                    <div className='flex-1 text-center'>
                        <Heading>
                            Approach to Women&apos;s Health
                        </Heading>
                    </div>

                    <div className='flex-1 relative max-w-3xl mx-auto'>
                        <Subheading className='text-center'>
                            Dr. Ankita Chauhan follows a personalized and ethical approach to women&apos;s healthcare, focusing on understanding each patient&apos;s concerns and medical needs. She believes in clear communication, honest guidance, and providing treatment options that prioritize safety, comfort, and long-term well-being.
                        </Subheading>
                        <Subheading className='mt-2 text-center'>
                            Her goal is to create a supportive and respectful environment where patients feel confident, informed, and comfortable at every step of their care journey.
                        </Subheading>
                    </div>
                </div>
            </Wrapper>
        </Section>
    )
}