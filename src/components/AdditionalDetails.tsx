import { Section, Wrapper } from '@/utils/Section'
import Image from 'next/image';
import React from 'react'

interface Data {
    title: string;
    short: string;
    icon: string;
}

export default function AdditionalDetails() {
    const data: Data[] = [
        {
            title: '10+ Years',
            short: 'Experience',
            icon: '/images/svg/icon-1.svg'
        },
        {
            title: 'Personalized',
            short: 'Women’s Care',
            icon: '/images/svg/icon-2.svg'
        },
        {
            title: 'Advanced & Safe',
            short: 'Procedures',
            icon: '/images/svg/icon-3.svg'
        },
        {
            title: 'Patient-Focused',
            short: 'Care',
            icon: '/images/svg/icon-4.svg'
        },

    ]
    return (
        <Section className='lg:!pb-0'>
            <Wrapper>
                <div className='z-10 lg:absolute relative lg:left-1/2 lg:-translate-x-1/2 bg-white lg:shadow-lg lg:px-5 lg:py-5 lg:-top-[110px] lg:rounded-2xl lg:w-max lg:mx-auto'>

                    <div className="relative w-full flex flex-wrap gap-5 items-center">
                        {
                            data.map((items, idx) => (
                                <div className='flex-1 min-w-[250px] flex gap-3 items-center' key={idx}>
                                    <div className='shrink-0'>
                                        <Image src={items.icon} width={56} height={56} alt={items.title} />
                                    </div>
                                    <div className='flex-1 flex flex-col'>
                                        <h3 className='font-bold text-secondry-color text-xl'>
                                            {items.title}
                                        </h3>
                                        <p className='text-sm text-zinc-600'>
                                            {items.short}
                                        </p>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                </div>
            </Wrapper>
        </Section>
    )
}
