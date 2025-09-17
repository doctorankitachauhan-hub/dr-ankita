import { Heading, Section, Subheading, Wrapper } from '@/utils/Section'
import { BadgeCheck } from 'lucide-react'
import Image from 'next/image'
import { Fragment } from 'react'

export default function page() {
    const list = [
        {
            title: 'Consultation',
            content: 'A thorough consultation with a qualified healthcare provider to discuss the individual\'s concerns and expectations.'
        },
        {
            title: 'Procedure',
            content: 'During the procedure, a laser device is applied to the vaginal tissues. The laser energy is delivered to stimulate collagen production.'
        },
        {
            title: 'Cultural and Personal Reasons',
            content: 'Patients generally experience minimal downtime, and normal activities can be resumed shortly after the procedure.'
        }
    ]
    return (
        <main className='relative w-full'>
            <Section>
                <Wrapper>
                    <div className='w-full relative grid md:grid-cols-2 grid-cols-1 gap-8'>
                        <div className="w-full h-full relative md:order-1 order-2">
                            <Heading>
                                <span className='!font-open-sans text-primary-color'>Laser Vaginal Tightening</span> for safe you and your baby.
                            </Heading>
                            <Subheading className='mt-5'>
                                Laser vaginal tightening, also known as laser vaginal rejuvenation or laser vaginal therapy, is a non-surgical cosmetic procedure designed to address concerns related to the laxity of vaginal tissues. The procedure uses laser technology to stimulate collagen production and promote tissue tightening in the vaginal area. It's important to note that the safety, effectiveness, and necessity of laser vaginal tightening have been subjects of debate within the medical community, and regulatory bodies in some regions have raised concerns.
                            </Subheading>
                            <span className='mt-2 block text-sm text-secondry-color font-medium'>
                                Here are key points regarding laser vaginal tightening:
                            </span>

                            <h2 className='mt-3 font-bold lg:text-xl text-secondry-color'>
                                Purpose
                            </h2>
                            <span className='mt-2 block text-base text-zinc-600 font-medium'>
                                Laser vaginal tightening is promoted as a cosmetic procedure aimed at addressing concerns such as vaginal laxity, decreased elasticity, and reduced sensation during sexual intercourse.
                                <br />
                                It is often marketed as a way to improve the appearance and functionality of the vaginal tissues.
                            </span>

                            <h2 className='mt-3 font-bold lg:text-xl text-secondry-color'>
                                Procedure
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
                                Alleged Benefits
                            </h2>
                            <Subheading>
                                Improved vaginal tightness and tone.
                            </Subheading>
                            <Subheading>
                                Increased vaginal lubrication.
                            </Subheading>
                            <Subheading>
                                Enhanced sexual satisfaction.
                            </Subheading>
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
