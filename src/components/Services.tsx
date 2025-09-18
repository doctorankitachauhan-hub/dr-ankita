'use client';
import Background from '@/utils/Background';
import { Heading, Section, Subheading, Wrapper } from '@/utils/Section'
import Image from 'next/image';
import { motion } from "motion/react";
import React, { useState } from 'react'
import Link from 'next/link';
import { ExternalLink, MoveUpRight } from 'lucide-react';
import { usePathname } from 'next/navigation';

interface Services {
    name: string;
    summary: string;
    icon: string;
    link: string;
}

export default function Services() {
    const currentPath = usePathname()
    const services: Services[] = [
        {
            name: 'Infertility Treatment',
            summary: 'Personalized fertility treatments using advanced diagnostics and compassionate care to achieve the dream of parenthood.',
            icon: '/images/services/icon-1.svg',
            link: '/services/infertility-treatment'
        },
        {
            name: 'Pre Natal Care & Delivery',
            summary: 'Comprehensive prenatal care and safe delivery services to ensure the health, comfort, and confidence of both mother and baby.',
            icon: '/images/services/icon-2.svg',
            link: '/services/pre-natal-care-and-delivery'
        },
        {
            name: 'Pregnancy Counselling',
            summary: 'Supportive guidance for mothers and couples to address emotional, physical, and mental well-being throughout the stages of pregnancy.',
            icon: '/images/services/icon-3.svg',
            link: '/services/pregnancy-counselling'
        },
        {
            name: 'Post Delivery Rehabilitation',
            summary: 'Focused on physical recovery, emotional support, and helping mothers regain strength and balance after childbirth.',
            icon: '/images/services/icon-4.svg',
            link: '/services/post-delivery-rehabilitation'
        },
        {
            name: 'Laparoscopic Surgery',
            summary: 'Gynecological procedures for faster healing, less pain, and precise treatment of conditions like fibroids, cysts, and endometriosis.',
            icon: '/images/services/icon-5.svg',
            link: '/services/laparoscopic-surgery'
        },
        {
            name: 'Laser Vaginal Rejuvenation',
            summary: 'Non-surgical laser treatments to restore vaginal tone and elasticity, enhancing comfort and confidence for women at any stage of life.',
            icon: '/images/services/icon-6.svg',
            link: '/services/laser-vaginal-rejuvenation'
        },
        {
            name: 'Vaginal Dryness',
            summary: 'Advanced treatments to relieve vaginal dryness, restoring comfort, natural lubrication, and overall intimate wellness.',
            icon: '/images/services/icon-7.svg',
            link: '/services/vaginal-dryness'
        },
        {
            name: 'Hymenoplasty',
            summary: 'Safe and confidential surgical restoration of the hymen, performed with precision and utmost sensitivity.',
            icon: '/images/services/icon-8.svg',
            link: '/services/hymenoplasty'
        },
        {
            name: 'Laser Vaginal Tightening',
            summary: 'Cutting-edge laser procedures designed to improve vaginal tightness, strength, and function without invasive surgery.',
            icon: '/images/services/icon-9.svg',
            link: '/services/laser-vaginal-tightening'
        },
        {
            name: 'PRP Therapy for Vaginal Dryness',
            summary: 'Regenerative PRP (Platelet-Rich Plasma) therapy to naturally restore vaginal lubrication, sensitivity, and tissue health.',
            icon: '/images/services/icon-10.svg',
            link: '/services/prp-therapy'
        },
        {
            name: 'Vaginoplasty',
            summary: 'Reconstructive surgical procedure aimed at tightening vaginal muscles and tissues for enhanced function and confidence.',
            icon: '/images/services/icon-11.svg',
            link: '/services/vaginoplasty'
        },
    ]
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
    return (
        <Section>
            <Wrapper>
                <div className='relative w-full flex flex-col lg:gap-14 md:gap-10 gap-8'>
                    <div className='flex-1 text-center'>
                        <span className='text-base text-[#e11d48] font-medium block mb-1'>
                            OUR SERVICES
                        </span>
                        <Heading>
                            Comprehensive <span className='!font-open-sans text-primary-color'>Women&apos;s Health Services</span>
                        </Heading>
                        <Subheading className='mx-auto max-w-3xl'>
                            Expert care and advanced treatments focused on every stage of a woman&apos;s health journey — from fertility and pregnancy to wellness, recovery, and beyond.
                        </Subheading>
                    </div>

                    <div className='flex-1 relative grid grid-cols-[repeat(auto-fit,minmax(310px,1fr))]'>
                        {
                            (currentPath !== '/services' ? services.slice(0, 5) : services).map((items, idx) => (
                                <div className='relative w-full h-full p-2.5'
                                    key={idx}
                                    onMouseEnter={() => setHoveredIndex(idx)}
                                    onMouseLeave={() => setHoveredIndex(null)}
                                >
                                    <div className='bg-white w-full h-full relative p-5 border border-neutral-200 rounded-2xl z-20'>
                                        <div className='bg-[#e8ebf7] w-20 h-20 rounded-full flex items-center justify-center'>
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
                                        <Link href={items.link} className='mt-5 flex items-center gap-2 w-max ml-auto font-medium text-blue-500 '>
                                            Know More
                                            <ExternalLink size={14} />
                                        </Link>
                                    </div>
                                    <Background hoveredIndex={hoveredIndex} idx={idx} />
                                </div>
                            ))
                        }
                        {
                            currentPath !== '/services' ? (
                                <div className='relative w-full h-full p-2.5'>
                                    <div className='bg-white w-full h-full relative p-5 flex items-center justify-center'>
                                        <Link href={'/services'}
                                            className='relative lg:w-[250px] lg:h-[250px] md:w-[180px] md:h-[180px] w-full h-full flex items-center justify-center text-center lg:text-2xl  font-medium text-primary-color border border-neutral-200 rounded-full'>
                                            Explore All treatments
                                        </Link>
                                    </div>
                                </div>
                            ) : ''
                        }
                    </div>
                </div>
            </Wrapper>
        </Section>
    )
}
