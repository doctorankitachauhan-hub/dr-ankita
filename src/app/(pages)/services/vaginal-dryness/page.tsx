import { Heading, Section, Subheading, Wrapper } from '@/utils/Section'
import { BadgeCheck } from 'lucide-react'
import Image from 'next/image'

export default function page() {
    const list: string[] = [
        'Menopause',
        'Breastfeeding',
        'Certain Medications',
        'Chemotherapy and Radiation Therapy',
        'Sjögren\'s Syndrome',
        'Stress and Anxiety'
    ]
    const list2: string[] = [
        'Discomfort or Pain During Intercourse',
        'Itching or Burning Sensation',
        'Increased Frequency of Urination'
    ]
    const list3: string[] = [
        'Topical Lubricants and Moisturizers',
        'Hormone Replacement Therapy (HRT)',
        'Vaginal Estrogen Therapy',
        'Lifestyle Changes',
        'Pelvic Floor Exercises',
        'Over-the-Counter Moisturizers',
        'Prescription Medications'
    ]
    return (
        <main className='relative w-full'>
            <Section>
                <Wrapper>
                    <div className='w-full relative grid md:grid-cols-2 grid-cols-1 gap-8'>
                        <div className="w-full h-full relative md:order-1 order-2">
                            <Heading>
                                <span className='!font-open-sans text-primary-color'>Vaginal Dryness</span> for safe you and your baby.
                            </Heading>
                            <Subheading className='mt-5'>
                                Although vaginal dryness is a common ailment that affects women of all ages, menopause is more frequently linked to it. It happens when the tissues in the vagina become less hydrated and lubricated, which can cause pain, discomfort, and possibly interfere with sexual activity. Vaginal dryness can have a number of causes, and there are a number of possible treatments. These are important things to remember:
                            </Subheading>
                            <span className='mt-2 block lg:text-3xl md:text-xl text-base text-secondry-color font-medium'>Causes of Vaginal Dryness:</span>
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
                            <span className='mt-2 block lg:text-3xl md:text-xl text-base text-secondry-color font-medium'>Symptoms of Vaginal Dryness:</span>
                            <ul className='flex gap-x-4 gap-y-0 flex-wrap mt-3'>
                                {
                                    list2.map((item, idx) => (
                                        <li className='flex gap-2 items-center text-lg text-zinc-600 font-medium' key={idx + 9}>
                                            <BadgeCheck className='text-primary-color shrink-0' size={18} />
                                            {item}
                                        </li>
                                    ))
                                }
                            </ul>
                            <span className='mt-2 block lg:text-3xl md:text-xl text-base text-secondry-color font-medium'>Treatment Options:</span>
                            <ul className='flex gap-x-4 gap-y-0 flex-wrap mt-3'>
                                {
                                    list3.map((item, idx) => (
                                        <li className='flex gap-2 items-center text-lg text-zinc-600 font-medium' key={idx + 9}>
                                            <BadgeCheck className='text-primary-color shrink-0' size={18} />
                                            {item}
                                        </li>
                                    ))
                                }
                            </ul>
                            <Subheading className='mt-5'>
                                Those who have vaginal dryness should speak with a healthcare professional to identify the underlying cause and discuss the best course of action. Consulting a physician guarantees a customized strategy that takes into account personal health characteristics and inclinations. Both the physical and emotional components of this common ailment can be addressed with the assistance of a supportive healthcare team and open conversation with a spouse.
                            </Subheading>
                        </div>
                        <div className="w-full h-full relative flex items-center md:items-start md:justify-end justify-center md:order-2 order-1">
                            <Image src={'/images/treatments/img-7.jpg'} alt='Infertility Treatment' width={500} height={400} className='w-full h-auto' />
                        </div>
                    </div>
                </Wrapper>
            </Section>
        </main>
    )
}
