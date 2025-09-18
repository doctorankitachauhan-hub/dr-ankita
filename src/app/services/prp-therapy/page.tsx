import { Heading, Section, Subheading, Wrapper } from '@/utils/Section'
import { BadgeCheck } from 'lucide-react'
import Image from 'next/image'
import { Fragment } from 'react'

export default function page() {
    const list = [
        {
            title: 'Blood Draw',
            content: 'A small amount of blood is drawn from the patient.'
        },
        {
            title: 'Centrifugation',
            content: 'The blood is processed in a centrifuge to separate the platelets and plasma from other blood components.'
        },
        {
            title: 'PRP Extraction',
            content: 'The concentrated PRP is extracted and prepared for application.'
        },
        {
            title: 'Application',
            content: 'The PRP is either injected into specific areas of the vaginal tissues or applied topically.'
        }
    ]
    return (
        <main className='relative w-full'>
            <Section>
                <Wrapper>
                    <div className='w-full relative grid md:grid-cols-2 grid-cols-1 gap-8'>
                        <div className="w-full h-full relative md:order-1 order-2">
                            <Heading>
                                <span className='!font-open-sans text-primary-color'>PRP Theraphy for Vaginal Dryness</span> for safe you and your baby.
                            </Heading>
                            <Subheading className='mt-5'>
                                Platelet-rich plasma (PRP) therapy, sometimes referred to as vampire therapy, is a medical treatment that involves using a patient&apos;s own blood plasma enriched with platelets to stimulate healing and tissue regeneration. While PRP therapy has been used in various medical fields, including orthopedics and dermatology, it has gained attention in recent years for its potential applications in addressing vaginal dryness and improving sexual function. Here&apos;s an overview of PRP therapy for vaginal dryness:
                            </Subheading>

                            <h2 className='mt-3 font-bold lg:text-xl text-secondry-color'>
                                How PRP Therapy Works
                            </h2>

                            <Subheading className='mt-5'>
                                The source of PRP is the patient&apos;s own blood. Usually from the arm, a little volume of blood is extracted, and the platelets are then concentrated through processing. In order to promote tissue regeneration, the resulting PRP—which is abundant in growth factors and other bioactive substances—is injected or applied to the desired location.
                            </Subheading>

                            <h2 className='mt-3 font-bold lg:text-xl text-secondry-color'>
                                Application in Vaginal Rejuvenation:
                            </h2>

                            <Subheading className='mt-5'>
                                In the context of vaginal health, PRP therapy is used to address issues such as vaginal dryness, discomfort during intercourse, and mild urinary incontinence.
                            </Subheading>

                            <h2 className='mt-3 font-bold lg:text-xl text-secondry-color'>
                                Procedure:
                            </h2>

                            <span className='mt-2 block text-base text-zinc-600 font-medium'>
                                The PRP therapy for vaginal dryness typically involves the following steps:
                            </span>

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
                        </div>
                        <div className="w-full h-full relative flex items-center md:items-start md:justify-end justify-center md:order-2 order-1">
                            <Image src={'/images/treatments/img-10.jpg'} alt='Infertility Treatment' width={500} height={400} className='w-full h-auto' />
                        </div>
                    </div>
                </Wrapper>
            </Section>
        </main>
    )
}
