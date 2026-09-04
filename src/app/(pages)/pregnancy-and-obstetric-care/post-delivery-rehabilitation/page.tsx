import { Section, Subheading, Wrapper } from '@/utils/Section'
import { Metadata } from 'next'
import { BadgeCheck } from 'lucide-react'
import Image from 'next/image'


export const metadata: Metadata = {
    title: "Post-Delivery Rehabilitation | Dr. Ankita Chauhan",
    description: "Postpartum recovery and pelvic floor rehabilitation in Hyderabad, supporting new mothers' physical and emotional healing after childbirth.",
    alternates: {
        canonical: "https://www.drankitachauhan.com/pregnancy-and-obstetric-care/post-delivery-rehabilitation",
    },
    openGraph: {
        title: "Post-Delivery Rehabilitation | Dr. Ankita Chauhan",
        description: "Postpartum recovery and pelvic floor rehabilitation in Hyderabad, supporting new mothers' physical and emotional healing after childbirth.",
        url: "https://www.drankitachauhan.com/pregnancy-and-obstetric-care/post-delivery-rehabilitation",
    },
}

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
                            <h1 className='lg:text-4xl md:text-[28px] text-2xl leading-[1.3] font-bold text-secondry-color'>
                                Post-Delivery Rehabilitation
                            </h1>
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
                            <Image src={'/images/treatments/post-delivery-rehabilitation-and-postpartum-recovery.jpg'} alt='Post-delivery rehabilitation and postpartum recovery' width={500} height={400} className='w-full h-auto' />
                        </div>
                    </div>
                </Wrapper>
            </Section>
        </main>
    )
}
