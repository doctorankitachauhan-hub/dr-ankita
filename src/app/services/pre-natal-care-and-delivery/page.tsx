import { Heading, Section, Subheading, Wrapper } from '@/utils/Section'
import { BadgeCheck } from 'lucide-react'
import Image from 'next/image'
import React from 'react'

export default function PreNtalCare() {
    const list: string[] = [
        'Early Pregnancy Check-ups',
        'Regular Check-ups',
        'Nutritional Guidance',
        'Screening Tests',
        'Monitoring Fetal Development',
        'Education and Counseling',
        'Exercise and Lifestyle Recommendations',
        'Management of Discomfort'
    ]

    const list2: string[] = [
        'Labor and Delivery',
        'Delivery Options',
        'Pain Management',
        'Medical Interventions',
        'Postpartum Care',
        'Newborn Care'
    ]
    return (
        <main className='relative w-full'>
            <Section>
                <Wrapper>
                    <div className='w-full relative grid md:grid-cols-2 grid-cols-1 gap-8'>
                        <div className="w-full h-full relative md:order-1 order-2">
                            <Heading>
                                <span className='!font-open-sans text-primary-color'>Pre Natal Care & Delivery</span> for safe you and your baby.
                            </Heading>
                            <Subheading className='mt-5'>
                                In order to guarantee a healthy pregnancy and a safe delivery, prenatal care and childbirth are essential components of maternal healthcare. An outline of prenatal care and the birth procedure is provided below:
                            </Subheading>

                            <h2 className='mt-4 font-bold lg:text-2xl md:text-lg text-base text-primary-color'>
                                Prenatal Care:
                            </h2>
                            <ul className='flex gap-x-4 gap-y-0 flex-wrap mt-1'>
                                {
                                    list.map((item, idx) => (
                                        <li className='flex gap-2 items-center text-lg text-zinc-600 font-medium' key={idx + 9}>
                                            <BadgeCheck className='text-primary-color shrink-0' size={18} />
                                            {item}
                                        </li>
                                    ))
                                }
                            </ul>
                            <h2 className='mt-4 font-bold lg:text-2xl md:text-lg text-base text-primary-color'>
                                Delivery:
                            </h2>
                            <ul className='flex gap-x-4 gap-y-0 flex-wrap mt-1'>
                                {
                                    list2.map((item, idx) => (
                                        <li className='flex gap-2 items-center text-lg text-zinc-600 font-medium' key={idx + 9}>
                                            <BadgeCheck className='text-primary-color shrink-0' size={18} />
                                            {item}
                                        </li>
                                    ))
                                }
                            </ul>
                            <Subheading className='mt-5'>
                                Both prenatal care and the delivery process are individualized based on the unique needs and circumstances of each pregnancy. Regular communication with healthcare providers and adherence to recommended care contribute to a healthy pregnancy and positive childbirth experience.
                            </Subheading>
                        </div>
                        <div className="w-full h-full relative flex items-center md:items-start md:justify-end justify-center md:order-2 order-1">
                            <Image src={'/images/treatments/img-2.jpg'} alt='Infertility Treatment' width={500} height={400} className='w-full h-auto' />
                        </div>
                    </div>
                </Wrapper>
            </Section>
        </main>
    )
}
