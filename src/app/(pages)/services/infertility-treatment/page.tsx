import { Heading, Section, Subheading, Wrapper } from '@/utils/Section'
import { BadgeCheck } from 'lucide-react'
import Image from 'next/image'
import React from 'react'

export default function InfertilityTreatment() {
    const list: string[] = [
        'Fertility Drugs',
        'Intrauterine Insemination (IUI)',
        'In Vitro Fertilization (IVF)',
        'Intracytoplasmic Sperm Injection (ICSI)',
        'Assisted Reproductive Technology (ART)',
        'Egg or Sperm Donation',
        'Surrogacy',
        'Lifestyle and Dietary Changes',
        'Surgery'
    ]
    return (
        <main className='relative w-full'>
            <Section>
                <Wrapper>
                    <div className='w-full relative grid md:grid-cols-2 grid-cols-1 gap-8'>
                        <div className="w-full h-full relative md:order-1 order-2">
                            <Heading>
                                <span className='!font-open-sans text-primary-color'>Infertility Treatment</span> for safe you and your baby.
                            </Heading>
                            <Subheading className='mt-5'>
                                Medical procedures used to help people or couples become pregnant when they are not able to conceive naturally are known as infertility treatments. Men and women can experience infertility, which can be caused by a number of things including hormone imbalances, structural problems, age-related loss in fertility, or underlying medical illnesses. Here are a few typical infertility remedies:-
                            </Subheading>
                            <ul className='flex gap-x-4 gap-y-0 flex-wrap mt-3'>
                                {
                                    list.map((item, idx) => (
                                        <li className='flex gap-2 items-center text-lg text-zinc-600 font-medium' key={idx + 9}>
                                            <BadgeCheck className='text-primary-color shrink-0' size={18} />
                                            {item}
                                        </li>
                                    ))
                                }
                            </ul>
                            <Subheading className='mt-5'>
                                It&apos;s important to note that the choice of treatment depends on the specific cause of infertility and the medical history of the individuals involved. Additionally, the emotional and financial aspects of fertility treatment can be significant, and couples may need to consider these factors as part of their decision-making process. Consulting with a fertility specialist or reproductive endocrinologist is crucial to determine the most appropriate treatment plan based on individual circumstances.
                            </Subheading>
                        </div>
                        <div className="w-full h-full relative flex items-center md:items-start md:justify-end justify-center md:order-2 order-1">
                            <Image src={'/images/treatments/img-1.jpg'} alt='Infertility Treatment' width={500} height={400} className='w-full h-auto' />
                        </div>
                    </div>
                </Wrapper>
            </Section>
        </main>
    )
}
