import { ButtonPrimary, Heading, Section, Subheading, Wrapper } from '@/utils/Section';
import Image from 'next/image'
import Link from 'next/link';
import React from 'react'

interface ContactInfo {
    title: string;
    icon: string;
    content: string
    link: string;
}
export default function Contact() {
    const contactInfo: ContactInfo[] = [
        {
            title: 'Address',
            content: '37-18/1-A/S-1, Below KFC, Defense Colony, SainikPuri, Secunderabad.',
            icon: '/images/contact/pin.svg',
            link: '#'
        },
        {
            title: 'Phone',
            content: '+91 6309683030',
            icon: '/images/contact/phone.svg',
            link: '#'
        },
        {
            title: 'E-Mail',
            content: 'info@gmail.com',
            icon: '/images/contact/mail.svg',
            link: '#'
        },
        {
            title: 'Office Hours',
            content: 'Monday - Friday: 8:00 AM - 5:00 PM Saturday: 9:00 AM - 2:00 PM Sunday: Closed',
            icon: '/images/contact/clock-2.svg',
            link: '#'
        },
    ]
    return (
        <Section>
            <Wrapper>
                <div className='relative w-full flex flex-col lg:gap-14 md:gap-10 gap-8'>
                    <div className='flex-1 text-center'>
                        <span className='text-base font-medium text-[#e11d48]' >CONTACT US</span>
                        <Heading>
                            Get in <span className='!font-open-sans text-primary-color'>Touch with us Now</span>
                        </Heading>
                        <Subheading className='max-w-md mx-auto'>
                            Ready to take the next step in your healthcare journey? Get in touch with us today.
                        </Subheading>
                    </div>

                    <div className='relative w-full grid md:grid-cols-2 grid-cols-1 gap-5'>
                        <div className="w-full h-full relative md:p-8 p-3 bg-white rounded-2xl border border-neutral-200">
                            <div className='w-full relative'>
                                <h3 className='font-bold text-xl text-secondry-color'>
                                    Contact Information
                                </h3>
                            </div>
                            <div className='w-full mt-5 flex flex-col gap-6'>
                                {
                                    contactInfo.map((info, idx) => (
                                        <div className='relative w-full flex gap-2' key={idx}>
                                            <div className='w-8 h-8 shrink-0'>
                                                <Image src={info.icon} width={32} height={32} alt={info.title} />
                                            </div>
                                            <div className='relative max-w-[240px]'>
                                                <h4 className='text-base text-secondry-color font-semibold'>
                                                    {info.title}
                                                </h4>
                                                <Link href={info.link} className='relative text-sm font-normal text-zinc-600 leading-[1.1] !font-montserrat'>
                                                    {info.content}
                                                </Link>
                                            </div>
                                        </div>
                                    ))
                                }
                            </div>
                        </div>

                        <div className="w-full h-full relative md:p-8 p-3 bg-white rounded-2xl border border-neutral-200">
                            <div className='w-full relative'>
                                <h3 className='font-bold text-xl text-secondry-color'>
                                    Send us a Message
                                </h3>
                            </div>
                            <div className='w-full mt-5 flex flex-col gap-5'>
                                <div className='w-full grid grid-cols-2 gap-2'>
                                    <input type="text" placeholder='Full Name' className='w-full h-full bg-transparent border border-neutral-300 rounded-md px-2 py-2 outline-none text-xl text-secondry-color font-montserrat' />
                                    <input type="tel" placeholder='Phone' className='w-full h-full bg-transparent border border-neutral-300 rounded-md px-2 py-2 outline-none text-xl text-secondry-color  font-montserrat' />
                                </div>
                                <div className='w-full relative'>
                                    <input type="email" placeholder='E-Mail' className='w-full h-full bg-transparent border border-neutral-300 rounded-md px-2 py-2 outline-none text-xl text-secondry-color font-montserrat' />
                                </div>
                                <div className='w-full relative'>
                                    <textarea placeholder='Message' rows={4} className='w-full h-full bg-transparent border border-neutral-300 rounded-md px-2 py-2 outline-none text-xl text-secondry-color font-montserrat' />
                                </div>
                                <div className='w-full relative'>
                                    <ButtonPrimary className='w-full'>
                                        Send Message
                                    </ButtonPrimary>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </Wrapper>
        </Section>
    )
}
