import { Heading, Section, Subheading, Wrapper } from '@/utils/Section'
import { BadgeCheck } from 'lucide-react'
import Image from 'next/image'

export default function Laparoscopic() {
    const list: string[] = [
        'Small Incisions',
        'Laparoscope',
        'Specialized Instruments',
        'Gas Insufflation',
        'Various Applications',
        'Reduced Scarring',
        'Faster Recovery',
        'Less Pain',
        'Lower Risk of Infection',
        'Challenges and Considerations',
        'Training and Expertise',
        'Robot-Assisted Laparoscopic Surgery'
    ]
    return (
        <main className='relative w-full'>
            <Section>
                <Wrapper>
                    <div className='w-full relative grid md:grid-cols-2 grid-cols-1 gap-8'>
                        <div className="w-full h-full relative md:order-1 order-2">
                            <Heading>
                                <span className='!font-open-sans text-primary-color'>Laparoscopic Surgery</span> for safe you and your baby.
                            </Heading>
                            <Subheading className='mt-5'>
                                Laparoscopic surgery, also known as minimally invasive surgery or keyhole surgery, is a surgical technique that uses small incisions and specialized instruments to perform surgical procedures. Unlike traditional open surgery, which requires a large incision, laparoscopic surgery involves making several small incisions through which a laparoscope and other instruments are inserted. A laparoscope is a thin, flexible tube with a light and camera attached to it, allowing the surgeon to view the inside of the body on a monitor.
                            </Subheading>
                            <span className='mt-2 block text-sm text-secondry-color font-medium'>Here are key aspects of laparoscopic surgery:</span>
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
                                Laparoscopic surgery has transformed the surgical field by providing a minimally invasive substitute for numerous conventional treatments. Benefits including a quicker recovery, fewer scarring, and less discomfort after surgery make it a worthwhile alternative for many patients, even though it might not be appropriate in every surgical situation. Patients who are thinking about having laparoscopic surgery should speak with their medical professionals to find the best course of action for their particular situation.
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
