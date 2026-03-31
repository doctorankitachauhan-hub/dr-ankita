import { Heading, Section, Subheading, Wrapper } from '@/utils/Section'
import { BadgeCheck } from 'lucide-react'
import Image from 'next/image'

export default function Laser() {
    const list: string[] = [
        'Vaginal laxity',
        'Vaginal dryness',
        'Mild urinary incontinence',
        'Laser Technology',
        'Procedure',
        'Duration and Number of Sessions'
    ]
    return (
        <main className='relative w-full'>
            <Section>
                <Wrapper>
                    <div className='w-full relative grid md:grid-cols-2 grid-cols-1 gap-8'>
                        <div className="w-full h-full relative md:order-1 order-2">
                            <Heading>
                                <span className='!font-open-sans text-primary-color'>Laser Vaginal Rejuvenation</span> for safe you and your baby.
                            </Heading>
                            <Subheading className='mt-5'>
                                A non-surgical cosmetic procedure called laser vaginal rejuvenation—also referred to as laser vaginal therapy or laser vaginal tightening—is intended to address a number of disorders pertaining to the vulvar and vaginal tissues. It entails stimulating collagen synthesis, improving tissue tone, and improving the vaginal area&apos;s overall appearance and usefulness with the use of laser technology. It is noteworthy that varying views exist within the medical profession regarding the effectiveness and safety of these operations.
                            </Subheading>
                            <span className='mt-2 block text-sm text-secondry-color font-medium'>Here are key points about laser vaginal rejuvenation:</span>

                            <h2 className='mt-3 font-bold lg:text-xl text-secondry-color'>
                                Purpose
                            </h2>

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
                        </div>
                        <div className="w-full h-full relative flex items-center md:items-start md:justify-end justify-center md:order-2 order-1">
                            <Image src={'/images/treatments/img-6.jpg'} alt='Infertility Treatment' width={500} height={400} className='w-full h-auto' />
                        </div>
                    </div>
                </Wrapper>
            </Section>
        </main>
    )
}
