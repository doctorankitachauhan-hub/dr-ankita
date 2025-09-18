import { Heading, Section, Subheading, Wrapper } from '@/utils/Section'
import { BadgeCheck } from 'lucide-react'
import Image from 'next/image'
import { Fragment } from 'react'

export default function Hymenoplasty() {
    const list = [
        {
            title: 'Purpose',
            content: 'The primary purpose of hymenoplasty is to reconstruct the hymen for cultural, social, or personal reasons. In some cultures, the presence of an intact hymen is associated with notions of virginity, purity, or modesty.'
        },
        {
            title: 'Procedure',
            content: 'Usually carried out as an outpatient operation, hymenoplasty is done under local anesthetic. The surgeon will either build a new hymen by using tissue from the vaginal walls or by suturing the borders of the remaining hymen tissue. The goal of the process is to mimic the appearance of an undamaged hymen.'
        },
        {
            title: 'Cultural and Personal Reasons',
            content: 'Hymenoplasty is often requested for cultural or personal reasons, such as fulfilling cultural or religious expectations, addressing concerns about marriage expectations, or personal choices related to body image.'
        },
        {
            title: 'Recovery',
            content: 'Recovery from hymenoplasty is generally quick, and most individuals can resume normal activities within a few days. Patients are usually advised to abstain from sexual intercourse for a specified period to allow for proper healing.'
        }
    ]
    return (
        <main className='relative w-full'>
            <Section>
                <Wrapper>
                    <div className='w-full relative grid md:grid-cols-2 grid-cols-1 gap-8'>
                        <div className="w-full h-full relative md:order-1 order-2">
                            <Heading>
                                <span className='!font-open-sans text-primary-color'>Hymenoplasty </span> for safe you and your baby.
                            </Heading>
                            <Subheading className='mt-5'>
                                A hymenoplasty is a surgical technique in which the hymen, a thin membrane that partially covers the vaginal entrance, is repaired or rebuilt. This technique, commonly known as hymenorrhaphy or hymen repair surgery, is frequently carried out for cultural, religious, or personal reasons. It&apos;s crucial to remember that the hymen can naturally deteriorate over time for a variety of reasons, and that having or not having an intact hymen does not always mean someone is virgin.
                            </Subheading>
                            <span className='mt-2 block text-base text-secondry-color font-medium'>Here are key points about hymenoplasty:</span>

                            <ul className='flex gap-x-4 gap-y-0 flex-wrap mt-3'>
                                {
                                    list.map((item, idx) => (
                                        <Fragment key={idx + 2}>
                                            <li className='flex gap-2 items-center text-lg text-zinc-600 font-medium'>
                                                <BadgeCheck className='text-primary-color shrink-0' size={18} />
                                                {item.title}
                                                <br />
                                            </li>
                                            <span className='block mt-1 text-gray-800'>
                                                {item.content}
                                            </span>
                                        </Fragment>
                                    ))
                                }
                            </ul>
                            <Subheading className='mt-5'>
                                People who are thinking about having a hymenoplasty should speak candidly and openly with licensed medical professionals who can answer any questions they may have, offer information, go over the advantages and disadvantages of the procedure, and address any underlying concerns. Healthcare professionals are essential in helping people make educated decisions about their bodies and wellbeing.
                            </Subheading>
                        </div>
                        <div className="w-full h-full relative flex items-center md:items-start md:justify-end justify-center md:order-2 order-1">
                            <Image src={'/images/treatments/img-8.jpg'} alt='Infertility Treatment' width={500} height={400} className='w-full h-auto' />
                        </div>
                    </div>
                </Wrapper>
            </Section>
        </main>
    )
}
