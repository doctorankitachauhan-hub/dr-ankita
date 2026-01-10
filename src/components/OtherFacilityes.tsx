import { Heading, Section, Subheading, Wrapper } from '@/utils/Section'
import Image from 'next/image'
import React from 'react'

interface Data {
    name:string;
    description:string;
    img:string;
}

export default function OtherFacilityes() {
    const data : Data[] = [
        {
            name:"Vaginal Tightening",
            description:"",
            img:""
        }
    ]
    return (
        <Section className='bg-[#F9FAFB] !pt-0'>
            <Wrapper>
                <div className='relative w-full flex flex-col lg:gap-14 md:gap-10 gap-8'>
                    <div className='flex-1 text-center'>
                        <Heading>
                            <span className='!font-open-sans text-primary-color'>Cosmetic & Laser Gynecology</span> Highlight
                        </Heading>
                        <Subheading className='mx-auto max-w-lg'>
                            Take a virtual tour of our modern, comfortable medical facility designed with your comfort and privacy in mind.
                        </Subheading>
                    </div>

                    <div className="flex-1 relative grid md:grid-cols-2 grid-cols-1 gap-3">
                        <div className="relative w-full lg:h-full md:h-[400px] h-auto rounded-lg overflow-hidden">
                            <Image
                                src="/images/about/facility-1.png"
                                width={500}
                                height={200}
                                alt="Facility"
                                className="w-full h-full object-cover object-center"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent z-10"></div>
                            <div className='absolute inset-x-0 lg:p-5 p-2 bottom-0 z-20'>
                                <h3 className='font-bold text-white md:text-lg text-base'>
                                    Infant Activities
                                </h3>
                                <p className='md:text-base text-sm text-zinc-100 max-w-md'>
                                    Engaging, age-appropriate activities that support early development, bonding, and sensory stimulation for your baby&apos;s healthy growth.
                                </p>
                            </div>
                        </div>
                        <div className="relative w-full lg:h-full md:h-[400px] h-auto rounded-lg overflow-hidden">
                            <Image
                                src="/images/about/facility-2.png"
                                width={500}
                                height={200}
                                alt="Facility"
                                className="w-full h-full object-cover object-center"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent z-10"></div>
                            <div className='absolute inset-x-0 lg:p-5 p-2 bottom-0 z-20'>
                                <h3 className='font-bold text-white md:text-lg text-base'>
                                    Fertility Medication
                                </h3>
                                <p className='md:text-base text-sm text-zinc-100 max-w-md'>
                                    Personalized medication plans to stimulate ovulation and enhance fertility, helping increase the chances of successful conception.
                                </p>
                            </div>
                        </div>
                        <div className="relative w-full lg:h-full md:h-[400px] h-auto rounded-lg overflow-hidden">
                            <Image
                                src="/images/about/facility-3.png"
                                width={500}
                                height={200}
                                alt="Facility"
                                className="w-full h-full object-cover object-center"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent z-10"></div>
                            <div className='absolute inset-x-0 lg:p-5 p-2 bottom-0 z-20'>
                                <h3 className='font-bold text-white md:text-lg text-base'>
                                    Guided Ultrasound
                                </h3>
                                <p className='md:text-base text-sm text-zinc-100 max-w-md'>
                                    Accurate and safe imaging guided by experts to monitor reproductive health, pregnancy progress, and fertility treatments with precision.
                                </p>
                            </div>
                        </div>
                    </div>

                </div>
            </Wrapper>
        </Section>
    )
}
