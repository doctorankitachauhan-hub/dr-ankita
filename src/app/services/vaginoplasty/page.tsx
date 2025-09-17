import { Heading, Section, Subheading, Wrapper } from '@/utils/Section'
import { BadgeCheck } from 'lucide-react'
import Image from 'next/image'
import { Fragment } from 'react'

export default function page() {
    const list = [
        {
            title: 'Vaginal Tightening',
            content: 'The primary goal of vaginoplasty is to tighten the vaginal canal, addressing concerns related to vaginal laxity that may result from childbirth, aging, or genetics.'
        },
        {
            title: 'Improving Sexual Satisfaction',
            content: 'Some individuals choose vaginoplasty to enhance sexual satisfaction for themselves and/or their partners.'
        }
    ]
    const list2 = [
        {
            title: 'Post-Childbirth',
            content: 'Women who have experienced childbirth and wish to address changes in vaginal tone and elasticity.'
        },
        {
            title: 'Aging',
            content: 'Individuals experiencing age-related changes in the vaginal tissues.'
        },
        {
            title: 'Genetic Factors',
            content: 'Some individuals may have a naturally lax vaginal canal and seek tightening for personal reasons.'
        }
    ]
    const list3 = [
        {
            title: 'Surgical Approach',
            content: 'Vaginoplasty is typically performed through a surgical incision, and excess vaginal lining is removed. The remaining tissue is then sutured to narrow and tighten the vaginal canal.'
        },
        {
            title: 'Local or General Anesthesia',
            content: 'The procedure can be performed under local or general anesthesia, depending on the patient\'s preference and the surgeon\'s recommendation.'
        }
    ]
    return (
        <main className='relative w-full'>
            <Section>
                <Wrapper>
                    <div className='w-full relative grid md:grid-cols-2 grid-cols-1 gap-8'>
                        <div className="w-full h-full relative md:order-1 order-2">
                            <Heading>
                                <span className='!font-open-sans text-primary-color'>Vaginoplasty </span> for safe you and your baby.
                            </Heading>
                            <Subheading className='mt-5'>
                                Reconstruction or tightening of the vaginal canal is the surgical surgery known as vaginaloplasty. In addition to treating vaginal laxity, this elective cosmetic procedure also improves sexual satisfaction and addresses issues with the vagina&apos;s appearance and functionality. It is significant to remember that vaginoplasty differs from hymenoplasty, which focuses on hymen reconstruction alone. Important details about vaginoplasty are as follows:
                            </Subheading>

                            <h2 className='mt-3 font-bold lg:text-xl text-secondry-color'>
                                Purpose:
                            </h2>

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
                            <h2 className='mt-3 font-bold lg:text-xl text-secondry-color'>
                                Candidates:
                            </h2>

                            <ul className='flex gap-x-4 gap-y-0 flex-wrap mt-3'>
                                {
                                    list2.map((item, idx) => (
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
                            <h2 className='mt-3 font-bold lg:text-xl text-secondry-color'>
                                Procedure:
                            </h2>

                            <ul className='flex gap-x-4 gap-y-0 flex-wrap mt-3'>
                                {
                                    list3.map((item, idx) => (
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
                        </div>
                        <div className="w-full h-full relative flex items-center md:justify-end justify-center md:order-2 order-1">
                            <Image src={'/images/treatments/img-1.svg'} alt='Infertility Treatment' width={500} height={400} className='' />
                        </div>
                    </div>
                </Wrapper>
            </Section>
        </main>
    )
}
