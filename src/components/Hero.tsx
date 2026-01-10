'use client'
import { ButtonPrimary, Section, Subheading, Wrapper } from '@/utils/Section'
import { Calendar } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import BookAppointment from './BookAppointment'
import { useLenisControl } from '@/utils/SmoothScroll'

export default function Hero() {
    const { stopScroll, startScroll } = useLenisControl();
    const [openForm, setOpenForm] = useState<boolean>(false);
    useEffect(() => {
        if (openForm) {
            stopScroll();
        } else {
            startScroll();
        }
        return () => startScroll();
    }, [stopScroll, startScroll, openForm]);
    return (
        <Section className='bg-gradient-to-t from-primary-color/20 via-white to-transparent'>
            <Wrapper>
                <div className='relative w-full grid md:grid-cols-2 grid-cols-1 gap-5'>
                    <div className="w-full h-full relative flex flex-col justify-center md:items-start items-center">
                        <h1 className='font-bold lg:text-5xl md:text-3xl text-[22px] text-secondry-color 
                        md:text-left text-center leading-[1.3]'>
                            Consultant<span className='!font-open-sans text-primary-color'> Gynecologist & Obstetrician</span>
                        </h1>
                        <Subheading className='mt-2 max-w-xl md:!text-lg !text-sm'>
                            Compassionate care for women at every stage of life.
                            <br />
                            Providing complete women&apos;s healthcare with compassion, expertise, and support through every stage of life.

                        </Subheading>

                        <div className='relative mt-8 flex items-center md:flex-row flex-col gap-4'>
                            <ButtonPrimary className='flex items-center gap-3' onClick={() => setOpenForm(true)}>
                                Schedule Consultation
                                <Calendar size={16} />
                            </ButtonPrimary>
                            <Link href='/services' className='!font-montserrat text-base text-primary-color font-semibold px-5 py-2.5 rounded-md border border-primary-color'>
                                Learn More
                            </Link>
                        </div>

                        <div className='w-full md:mt-10 mt-5 flex items-center relative gap-10 justify-center md:justify-start'>

                            <div className='w-max relative flex items-center gap-1'>
                                <Image src='/images/hero/f-1.svg' width={40} height={40} alt='img' className='md:w-10 md:h-10 w-6 h-6' />
                                <span className='text-zinc-600 md:text-base text-xs leading-[1]'>
                                    <strong className='text-secondry-color md:text-xl text-sm font-semibold'>
                                        Board Certified
                                    </strong>
                                    <br />
                                    Gynaecologist
                                </span>
                            </div>

                            <div className='w-max relative flex items-center gap-1'>
                                <Image src='/images/hero/f-2.svg' width={40} height={40} alt='img' className='md:w-10 md:h-10 w-6 h-6' />
                                <span className='text-zinc-600 md:text-base text-xs leading-[1]'>
                                    <strong className='text-secondry-color md:text-xl text-sm font-semibold'>
                                        10+ Years
                                    </strong>
                                    <br />
                                    Experience
                                </span>
                            </div>

                        </div>
                    </div>

                    <div className="w-full h-full relative flex items-center justify-center md:justify-end">
                        <Image
                            src={'/images/hero/hero.png'}
                            width={1920}
                            height={1080}
                            alt='Hero Image'
                            className='w-full max-w-[400px] h-auto object-cover object-center rounded-2xl'
                        />
                    </div>
                </div>
            </Wrapper>
            <BookAppointment openForm={openForm} closeForm={setOpenForm} />
        </Section>
    )
}
