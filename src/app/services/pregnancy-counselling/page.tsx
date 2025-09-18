import { Heading, Section, Subheading, Wrapper } from '@/utils/Section'
import { BadgeCheck } from 'lucide-react'
import Image from 'next/image'

export default function PregnancyCounselling() {
    const list: string[] = [
        'Emotional Support',
        'Decision-Making and Options Counseling',
        'Education and Information',
        'Crisis Pregnancy Counseling',
        'Relationship Support',
        'Grief and Loss Counseling',
        'Parenting Preparation',
        'Postpartum Counseling',
        'Community Resources'
    ]
    return (
        <main className='relative w-full'>
            <Section>
                <Wrapper>
                    <div className='w-full relative grid md:grid-cols-2 grid-cols-1 gap-8'>
                        <div className="w-full h-full relative md:order-1 order-2">
                            <Heading>
                                <span className='!font-open-sans text-primary-color'>Pregnancy Counselling</span> for safe you and your baby.
                            </Heading>
                            <Subheading className='mt-5'>
                                A pregnancy counselor is a person who works with expectant individuals or couples to provide support, education, and direction both during and after the pregnancy. For a number of reasons, such as decision-making, emotional support, and preparing for motherhood, this kind of counseling may be helpful. These are some essential components of pregnancy counseling:
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
                                Counselors with training in reproductive health, psychologists, social workers, and other medical professionals can offer pregnancy counseling. As people or couples traverse the experience of pregnancy and parenthood, the intention is to make sure they feel empowered, knowledgeable, and supported.
                            </Subheading>
                        </div>
                        <div className="w-full h-full relative flex items-center md:items-start md:justify-end justify-center md:order-2 order-1">
                            <Image src={'/images/treatments/img-3.jpg'} alt='Infertility Treatment' width={500} height={400} className='w-full h-auto' />
                        </div>
                    </div>
                </Wrapper>
            </Section>
        </main>
    )
}
