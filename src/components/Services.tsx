'use client';
import Background from '@/utils/Background';
import { Heading, Section, Subheading, Wrapper } from '@/utils/Section'
import Image from 'next/image';
import { motion } from "motion/react";
import React, { useState } from 'react'
import Link from 'next/link';
import { ChevronsRight, ExternalLink, MoveUpRight } from 'lucide-react';
import { usePathname } from 'next/navigation';

interface Services {
    name: string;
    summary: string;
    icon: string;
    treatment: {
        name: string
        path: string;
    }[]
}

export default function Services() {
    const currentPath = usePathname()
    const services: Services[] = [
        {
            name: 'Pregnancy & Obstetric Care',
            summary: 'Comprehensive care before, during, and after pregnancy. Focused on the safety and well-being of both mother and baby.',
            icon: '/images/services/new-icon-1.svg',
            treatment: [
                {
                    name: "Preconception counselling & planning",
                    path: "/pregnancy_&_obstetric_care/preconception_counselling_&_planning"
                },
                {
                    name: "Antenatal and postnatal care",
                    path: "/pregnancy_&_obstetric_care/antenatal_and_postnatal_care"
                },
                {
                    name: "Normal and caesarean delivery",
                    path: "/pregnancy_&_obstetric_care/normal_and_caesarean_delivery"
                },
                {
                    name: "High-risk pregnancy management",
                    path: "/pregnancy_&_obstetric_care/high-risk_pregnancy_management"
                },
            ]
        },
        {
            name: 'Gynecology Care',
            summary: 'Expert care for menstrual, hormonal, and reproductive health concerns. Supportive treatment for women at every stage of life.',
            icon: '/images/services/new-icon-2.svg',
            treatment: [
                {
                    name: "Menstrual problems & irregular periods",
                    path: "/gynecology_care/menstrual_problems_&_irregular_periods"
                },
                {
                    name: "PCOS management",
                    path: "/gynecology_care/PCOS-management"
                },
                {
                    name: "Pelvic infections treatment",
                    path: "/gynecology_care/pelvic_infections_treatment"
                },
                {
                    name: "Menopause care & counselling",
                    path: "/gynecology_care/menopause_care_&_counselling"
                },
            ]
        },
        {
            name: 'Advanced Procedures & Surgeries',
            summary: 'Minimally invasive procedures for various gynecological conditions. Designed for safety, accuracy, and faster recovery.',
            icon: '/images/services/new-icon-3.svg',
            treatment: [
                {
                    name: "Operative hysteroscopy",
                    path: "/advanced_procedures_&_surgeries/operative_hysteroscopy"
                },
                {
                    name: "Laparoscopic surgeries for fibroids, cysts & endometriosis",
                    path: "/advanced_procedures_&_surgeries/laparoscopic_surgeries"
                },
                {
                    name: "Laparoscopic & vaginal hysterectomy",
                    path: "/advanced_procedures_&_surgeries/laparoscopic_&_vaginal_hysterectomy"
                },
                {
                    name: "Perineal repair",
                    path: "/advanced_procedures_&_surgeries/perineal_repair"
                },
            ]
        },
        {
            name: 'Cosmetic & Laser Gynecology',
            summary: 'Modern laser treatments to improve comfort and intimate health. Focused on confidence, care, and long-term well-being.',
            icon: '/images/services/new-icon-4.svg',
            treatment: [
                {
                    name: "Laser treatment for stress urinary incontinence",
                    path: "/cosmetic_&_laser_gynecology/laser_treatment_for_stress_urinary_incontinence"
                },
                {
                    name: "Vaginal tightening procedures",
                    path: "/cosmetic_&_laser_gynecology/vaginal_tightening_procedures"
                },
                {
                    name: "Treatment for pigmentation",
                    path: "/cosmetic_&_laser_gynecology/treatment_for_pigmentation"
                },
                {
                    name: "Management of chronic infections",
                    path: "/cosmetic_&_laser_gynecology/management_of_chronic_infections"
                },
            ]
        },
    ]
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
    return (
        <Section>
            <Wrapper>
                <div className='w-full flex flex-col lg:gap-14 md:gap-10 gap-8'>
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

                    <div className='flex-1 grid md:grid-cols-2 grid-cols-1'>
                        {
                            services.map((items, idx) => (
                                <div className='relative w-full h-full p-2.5'
                                    key={idx}
                                    onMouseEnter={() => setHoveredIndex(idx)}
                                    onMouseLeave={() => setHoveredIndex(null)}
                                >
                                    <div className='bg-white w-full h-full relative p-5 border border-neutral-200 rounded-2xl z-20 shadow'>
                                        <div className='bg-[#e8ebf7] w-20 h-20 rounded-full flex items-center justify-center'>
                                            <Image src={items.icon} width={52} height={52} alt={items.name} />
                                        </div>
                                        <div className=' w-full mt-7 flex flex-col gap-3'>
                                            <h2 className='font-semibold text-secondry-color md:text-xl text-base'>
                                                {items.name}
                                            </h2>
                                            <Subheading>
                                                {items.summary}
                                            </Subheading>
                                        </div>
                                        <div className='mt-3 w-full flex flex-col gap-3'>
                                            <h3 className='text-base md:text-lg text-gray-700 font-medium'>
                                                Treatments
                                            </h3>
                                            <ul className='pl-1 w-full flex flex-col gap-1'>
                                                {
                                                    items.treatment.map((treatment) => (
                                                        <li key={treatment.name}>
                                                            <Link href={treatment.path} className='group/link flex gap-2 items-center text-sm text-slate-700 transition-colors duration-200 ease-in-out hover:text-blue-600'>
                                                                <ChevronsRight size={14} className='text-blue-600 group-hover/link:text-slate-800' />
                                                                {treatment.name}
                                                                <MoveUpRight size={12} className='text-blue-600 opacity-0 group-hover/link:opacity-100 transition-opacity duration-300 ' />
                                                            </Link>
                                                        </li>
                                                    ))
                                                }
                                            </ul>
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
