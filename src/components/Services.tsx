'use client';
import Background from '@/utils/Background';
import { Heading, Section, Subheading, Wrapper } from '@/utils/Section'
import Image from 'next/image';
import { motion } from "motion/react";
import React, { useState } from 'react'

interface Services {
    name: string;
    summary: string;
    icon: string;
}

export default function Services() {
    const services: Services[] = [
        {
            name: 'Infertility Treatment',
            summary: 'Personalized fertility treatments using advanced diagnostics and compassionate care to achieve the dream of parenthood.',
            icon: '/images/services/icon-1.svg'
        },
        {
            name: 'Pre Natal Care & Delivery',
            summary: 'Comprehensive prenatal care and safe delivery services to ensure the health, comfort, and confidence of both mother and baby.',
            icon: '/images/services/icon-2.svg'
        },
        {
            name: 'Pregnancy Counselling',
            summary: 'Supportive guidance for mothers and couples to address emotional, physical, and mental well-being throughout the stages of pregnancy.',
            icon: '/images/services/icon-3.svg'
        },
        {
            name: 'Post Delivery Rehabilitation',
            summary: 'Focused on physical recovery, emotional support, and helping mothers regain strength and balance after childbirth.',
            icon: '/images/services/icon-4.svg'
        },
        {
            name: 'Laparoscopic Surgery',
            summary: 'Gynecological procedures for faster healing, less pain, and precise treatment of conditions like fibroids, cysts, and endometriosis.',
            icon: '/images/services/icon-5.svg'
        },
        {
            name: 'Laser Vaginal Rejuvenation',
            summary: 'Non-surgical laser treatments to restore vaginal tone and elasticity, enhancing comfort and confidence for women at any stage of life.',
            icon: '/images/services/icon-6.svg'
        },
    ]
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
    return (
        <Section>
            <Wrapper>
                <div className='relative w-full flex flex-col lg:gap-14 md:gap-10 gap-8'>
                    <div className='flex-1 text-center'>
                        <span className='text-base text-blue-500 font-medium block mb-1'>
                            OUR SERVICES
                        </span>
                        <Heading>
                            Comprehensive <span className='!font-open-sans text-primary-color'>Women's Health Services</span>
                        </Heading>
                        <Subheading className='mx-auto max-w-3xl'>
                            Highlighting Dr. Satyanarayana Garre&apos;s journey of scholarly achievements, pioneering research, and impactful clinical work in the field of nephrology.
                        </Subheading>
                    </div>

                    <div className='flex-1 relative grid grid-cols-[repeat(auto-fit,minmax(310px,1fr))]'>
                        {
                            services.map((items, idx) => (
                                <div className='relative w-full h-full p-2.5'
                                    key={idx}
                                    onMouseEnter={() => setHoveredIndex(idx)}
                                    onMouseLeave={() => setHoveredIndex(null)}
                                >
                                    <div className='bg-white w-full h-full relative p-5 border border-neutral-200 rounded-2xl z-20'>
                                        <div className='bg-[#FFEDFA] w-20 h-20 rounded-full flex items-center justify-center'>
                                            <Image src={items.icon} width={52} height={52} alt={items.name} />
                                        </div>
                                        <div className='relative w-full mt-7 flex flex-col gap-3'>
                                            <h2 className='font-semibold text-secondry-color md:text-xl text-base'>
                                                {items.name}
                                            </h2>
                                            <Subheading>
                                                {items.summary}
                                            </Subheading>
                                        </div>
                                    </div>
                                    <Background hoveredIndex={hoveredIndex} idx={idx} />
                                </div>
                            ))
                        }
                    </div>
                </div>
            </Wrapper>
        </Section>
    )
}
