import { Heading, Section, Subheading, Wrapper } from '@/utils/Section'
import Image from 'next/image'
import React from 'react'

export default function Academic() {
    return (
        <Section>
            <Wrapper>
                <div className='relative w-full flex flex-col lg:gap-14 md:gap-10 gap-8'>
                    <div className='flex-1 text-center'>
                        <Heading>
                            Academic Excellence & Clinical Contributions
                        </Heading>
                        <Subheading className='mx-auto max-w-3xl'>
                            Highlighting Dr. Satyanarayana Garre&apos;s journey of scholarly achievements, pioneering research, and impactful clinical work in the field of nephrology.
                        </Subheading>
                    </div>

                    <div className='flex-1 relative grid lg:grid-cols-2 grid-cols-1 gap-6'>
                        <div className="w-full h-full flex flex-col gap-6">
                            <div className="flex-1 p-6 relative bg-[#F9FAFB] rounded-3xl">
                                <div className='relative w-max px-3 py-3 bg-[#e8ebf7] rounded-2xl'>
                                    <Image src={'/images/academic/icon-1.svg'} width={56} height={56} alt='Icon' />
                                </div>

                                <h3 className='mt-4 font-semibold text-lg text-dark-navy'>
                                    Education & Specialized Training
                                </h3>
                                <Subheading className='mt-2 text-left font-normal'>
                                    Advanced clinical training and surgical expertise in obstetrics and gynecology.
                                </Subheading>

                                <ul className='relative w-full mt-3 flex flex-col gap-1 list-disc pl-3'>
                                    <li className='text-sm text-zinc-500'>
                                        <strong className='text-dark-navy'>MBBS:</strong> – Bachelor of Medicine & Surgery
                                    </li>
                                    <li className='text-sm text-zinc-500'>
                                        <strong className='text-dark-navy'>MS (Obstetrics & Gynecology)</strong>
                                    </li>
                                    <li className='text-sm text-zinc-500'>
                                        <strong className='text-dark-navy'>Fellowship in Laparoscopic Gynaecological Surgery</strong>
                                    </li>
                                </ul>
                            </div>

                            <div className="flex-1 p-6 relative bg-[#F9FAFB] rounded-3xl">
                                <div className='relative w-max px-3 py-3 bg-[#e8ebf7] rounded-2xl'>
                                    <Image src={'/images/academic/icon-3.svg'} width={56} height={56} alt='Icon' />
                                </div>

                                <h3 className='mt-4 font-semibold text-lg text-dark-navy'>
                                    Clinical & Surgical Expertise
                                </h3>
                                <Subheading className='mt-2 text-left font-normal'>
                                    Extensive expertise in both conservative and operative gynecology.
                                </Subheading>

                                <ul className='relative w-full mt-3 flex flex-col gap-1 list-disc pl-3'>
                                    <li className='text-sm text-zinc-500'>
                                        Normal & Caesarean Deliveries
                                    </li>
                                    <li className='text-sm text-zinc-500'>
                                        Management of PCOD & Hormonal Disorders
                                    </li>
                                    <li className='text-sm text-zinc-500'>
                                        Treatment of Ovarian Cysts & Endometriosis
                                    </li>
                                    <li className='text-sm text-zinc-500'>
                                        Laparoscopic & Hysteroscopic Surgeries
                                    </li>
                                    <li className='text-sm text-zinc-500'>
                                        Myomectomy & Laparoscopic Hysterectomy
                                    </li>
                                </ul>
                            </div>
                        </div>

                        <div className="w-full h-full flex flex-col gap-6">
                            <div className="flex-1 p-6 relative bg-[#F9FAFB] rounded-3xl">
                                <div className='relative w-max px-3 py-3 bg-[#e8ebf7] rounded-2xl'>
                                    <Image src={'/images/academic/icon-2.svg'} width={56} height={56} alt='Icon' />
                                </div>

                                <h3 className='mt-4 font-semibold text-lg text-dark-navy'>
                                    Work Experience & Practice
                                </h3>
                                <Subheading className='mt-2 text-left font-normal'>
                                    Significant clinical experience across comprehensive women&apos;s health care.
                                </Subheading>

                                <ul className='relative w-full mt-3 flex flex-col gap-1 list-disc pl-3'>
                                    <li className='text-sm text-zinc-500'>
                                        Over 10+ years of managing obstetric and gynecologic cases
                                    </li>
                                    <li className='text-sm text-zinc-500'>
                                        Skilled in antenatal, postnatal, and high-risk pregnancy care
                                    </li>
                                    <li className='text-sm text-zinc-500'>
                                        Experience in both routine and advanced surgical procedures
                                    </li>
                                </ul>
                            </div>

                            <div className="flex-1 p-6 relative bg-[#F9FAFB] rounded-3xl">
                                <div className='relative w-max px-3 py-3 bg-[#e8ebf7] rounded-2xl'>
                                    <Image src={'/images/academic/icon-4.svg'} width={56} height={56} alt='Icon' />
                                </div>

                                <h3 className='mt-4 font-semibold text-lg text-dark-navy'>
                                    Patient-Centred Care & Approach
                                </h3>
                                <Subheading className='mt-2 text-left font-normal'>
                                    Focussed on safe, individualized care with attention to patient comfort.
                                </Subheading>

                                <ul className='relative w-full mt-3 flex flex-col gap-1 list-disc pl-3'>
                                    <li className='text-sm text-zinc-500'>
                                        Personalized consultations and tailored treatment plans.
                                    </li>
                                    <li className='text-sm text-zinc-500'>
                                        Gentle approach with focus on education and shared decision-making.
                                    </li>
                                    <li className='text-sm text-zinc-500'>
                                        Compassionate support throughout pregnancy and women&apos;s health journey.
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </Wrapper>
        </Section>
    )
}