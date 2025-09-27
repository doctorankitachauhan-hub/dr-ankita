'use client';
import { Heading, Section, Subheading, Wrapper } from '@/utils/Section'
import Image from 'next/image'
import { usePathname } from 'next/navigation';
import React from 'react'

interface Content {
    name: string;
    content: string;
    icon: string;
}
export default function About() {
    const currentPath = usePathname()
    const content: Content[] = [
        {
            name: 'Education',
            content: 'MBBS, MS, OBG from Johns Hopkins University, Residency at Mayo Clinic',
            icon: '/images/about/icon-1.svg'
        },
        {
            name: 'Certifications',
            content: 'Board Certified by American Board of Obstetrics and Gynecology',
            icon: '/images/about/icon-2.svg'
        },
        {
            name: 'Patients Served',
            content: 'Over 5,000 women have trusted their care to Dr. G. Nikila Reddy',
            icon: '/images/about/icon-3.svg'
        },
        {
            name: 'Experience',
            content: '10+ years of dedicated practice in women\'s healthcare',
            icon: '/images/about/icon-4.svg'
        },
    ]
    return (
        <Section className={`${currentPath !== '/about' ? 'bg-[#F9FAFB]' : 'bg-transparent'} `}>
            <Wrapper>
                <div className='relative w-full grid lg:grid-cols-[450px_1fr] md:grid-cols-[380px_1fr] grid-cols-1 gap-8'>
                    <div className='relative w-full h-full flex md:justify-start justify-center'>
                        <Image src='/images/about/doc-image.png' width={450} height={400} alt='Dr. G. Nikila'
                            className='max-h-[550px] w-auto h-full' />
                    </div>
                    <div className='w-full h-full relative'>
                        <span className='text-base font-medium text-[#e11d48] '>
                            ABOUT OUR DOCTOR
                        </span>
                        <Heading className='mt-2'>
                            Dr. G. Nikila Reddy
                        </Heading>
                        <Subheading>
                            In Hyderabad, Dr. Nikila Reddy practices laparoscopic surgery, obstetrics, and senior gynecology. she received extensive training in both India and the Dubai. she has been practicing obstetrics and gynecology for more than 10+ years. Her primary interests include high-risk obstetrics and minimal access surgery, commonly referred to as endoscopic surgery (laparoscopy and hysteroscopy). she has committed herself to treating women and educating them about the issues affecting their quality of life because she is a fervent supporter of women&apos;s health. she makes it a point to provide each patient with the best possible care.
                        </Subheading>
                        <Subheading className='mt-2'>
                            Her areas of expertise include managing a wide range of issues, primarily related to infertility and surgery; these include recurrent abortions, total laparoscopic hysterectomy, surgical management of uterine fibroids, and various other general gynecological issues, such as polycystic ovarian disease (PCOD), bleeding disorders in women, menopausal symptoms, hormone replacement therapy, etc. In addition, her has a great deal of experience handling obstetric and gynecological situations.
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
