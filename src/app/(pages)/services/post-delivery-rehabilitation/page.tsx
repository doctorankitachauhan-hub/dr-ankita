import { Heading, Section, Subheading, Wrapper } from '@/utils/Section'
import { BadgeCheck } from 'lucide-react'
import Image from 'next/image'

export default function PostDelivery() {
    const list: string[] = [
        'Physical Recovery',
        'Pelvic Floor Rehabilitation',
        'Nutritional Support',
        'Emotional Well-being',
        'Breastfeeding Support',
        'Post-Cesarean Care',
        'Gradual Return to Exercise',
        'Sleep Hygiene',
        'Support for Diastasis Recti',
        'Monitoring and Follow-up',
        'Contraceptive Counseling',
        'Scar Management'
    ]
    return (
        <main className='relative w-full'>
            <Section>
                <Wrapper>
                    <div className='w-full relative grid md:grid-cols-2 grid-cols-1 gap-8'>
                        <div className="w-full h-full relative md:order-1 order-2">
                            <Heading>
                                <span className='!font-open-sans text-primary-color'>Post Delivery Rehabilitation</span> for safe you and your baby.
                            </Heading>
                            <Subheading className='mt-5'>
                                The goal of post-delivery rehabilitation, sometimes referred to as postpartum or postnatal rehabilitation, is to assist women in their physical and psychological healing following childbirth. For women, this is an especially important time since during pregnancy and childbirth, their bodies change dramatically. The goals of postpartum rehabilitation are to address any possible problems, strengthen and reestablish flexibility, and encourage recovery. The following are important elements of postpartum rehabilitation:
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
                                Post-delivery rehabilitation is a personalized process that considers the unique needs and experiences of each woman. It is essential for mothers to communicate openly with their healthcare providers and participate actively in their recovery. Seeking guidance and support during the postpartum period contributes to a healthier and more positive transition to motherhood.
                            </Subheading>
                        </div>
                        <div className="w-full h-full relative flex items-center md:items-start md:justify-end justify-center md:order-2 order-1">
                            <Image src={'/images/treatments/img-4.jpg'} alt='Infertility Treatment' width={500} height={400} className='w-full h-auto' />
                        </div>
                    </div>
                </Wrapper>
            </Section>
        </main>
    )
}
