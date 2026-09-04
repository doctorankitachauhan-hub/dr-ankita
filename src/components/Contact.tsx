"use client";
import { ButtonPrimary, Heading, Section, Subheading, Wrapper } from '@/utils/Section';
import { usePathname } from 'next/navigation';
import React from 'react'

export default function Contact() {
    const currentPath = usePathname()
    return (
        <Section>
            <Wrapper>
                <div className='relative w-full flex flex-col lg:gap-14 md:gap-10 gap-8'>
                    <div className='flex-1 text-center'>
                        <span className='text-base font-medium text-[#e11d48]' >CONTACT US</span>
                        {currentPath === "/" && <Heading>
                            Get in <span className='!font-open-sans text-primary-color'>Touch with us Now</span>
                        </Heading>}
                        {currentPath === "/contact" && <h1 className='lg:text-4xl md:text-[28px] text-2xl leading-[1.3] font-bold text-secondry-color'>
                            Get in <span className='!font-open-sans text-primary-color'>Touch with us Now</span>
                        </h1>}
                        <Subheading className='max-w-md mx-auto'>
                            Ready to take the next step in your healthcare journey? Get in touch with us today.
                        </Subheading>
                    </div>

                    <div className='relative w-full grid md:grid-cols-2 grid-cols-1 gap-5'>
                        <div className="w-full h-full relative md:p-5 p-3 bg-white rounded-2xl border border-neutral-200 flex flex-col gap-4">
                            <address className='not-italic font-open-sans text-sm text-zinc-600 leading-relaxed'>
                                <strong className='block text-secondry-color font-montserrat text-base mb-1'>Dr. Ankita Chauhan &mdash; Women Care</strong>
                                206 B, Botanical Garden Rd, Sri Ram Nagar, Gachibowli, Kondapur, Hyderabad, Telangana 500084
                                <br />
                                Phone: <a href="tel:+919881279493" className='text-primary-color hover:underline'>+91 98812 79493</a>
                                <br />
                                Email: <a href="mailto:doctorankitachauhan@gmail.com" className='text-primary-color hover:underline'>doctorankitachauhan@gmail.com</a>
                            </address>
                            <div className='w-full flex-1 min-h-[220px] overflow-hidden rounded-md border border-gray-300'>
                                <iframe className='h-full' src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d30447.937337428022!2d78.353494!3d17.460089!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb938043dc2559%3A0xbea6678253f1d49d!2sWomen%20Care%20-%20Dr%20Ankita%20Chauhan!5e0!3m2!1sen!2sus!4v1768029609248!5m2!1sen!2sus" width="100%" height="100%" style={{ border: "0" }} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade" title="Dr. Ankita Chauhan clinic location map"></iframe>
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
