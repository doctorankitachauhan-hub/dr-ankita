import { Section, Subheading, Wrapper } from '@/utils/Section'
import { Calendar, User } from 'lucide-react'
import Image from 'next/image'

export default function BlogOne() {
    const lstOne = [
        {
            title: 'Endometriosis',
            content: 'When tissue similar to the uterine lining grows outside the uterus (for example on ovaries or fallopian tubes), which bleeds and causes inflammation, scarring, and more pain.'
        },
        {
            title: 'Fibroids',
            content: 'Non-cancerous growths in or on the uterus can press on uterine walls or disrupt flow, increasing pain.'
        },
        {
            title: 'Adenomyosis',
            content: 'The inner lining of the uterus grows into the muscular walls—this causes heavier bleeding and more painful cramps.'
        },
        {
            title: 'Pelvic inflammatory disease (PID)',
            content: 'Infections in the reproductive organs (uterus, fallopian tubes, ovaries) can lead to inflammation, pain, and more severe cramps.'
        },
        {
            title: 'Cervical stenosis',
            content: 'When the opening of the cervix is narrow, menstrual blood may flow slowly, increasing pressure and pain inside the uterus.'
        }
    ]
    const lstTwo = [
        'Starting periods early (before age 11-12) tends to correlate with more pain.',
        'Having heavy or prolonged menstrual bleeding. Because more blood and tissue need to be shed, the uterus has to work harder.',
        'Never having had a pregnancy. Women who have not carried a pregnancy sometimes report more intense cramps.',
        'Lifestyle factors like smoking.',
        'Individual differences in prostaglandin levels, pain sensitivity, or hormonal balance. Some bodies simply respond more strongly to the same internal signals.'
    ]
    const lstThree = [
        'Pain so severe that you cannot do regular work or go to school.',
        'Pain that gets worse over time, instead of improving.',
        'Pain that starts well before your period or continues after bleeding stops.',
        'Other symptoms like heavy bleeding (soaking pads/tampons often), irregular bleeding between periods, pain during sex, pain when peeing, or unusual discharge.',
        'Any sign of hormonal disorders like thyroid problems, or evidence of uterine issues on imaging studies'
    ]
    const lstfour = [
        'Over-the-counter pain medications such as NSAIDs (for example ibuprofen), which reduce prostaglandins and reduce uterine contractions.',
        'Heat therapy (hot water bottle or heating pad on lower belly) which helps relax muscles.',
        'Lifestyle adjustments: gentle exercise, staying hydrated, good nutrition, reducing stress.',
        'If medical conditions like endometriosis, fibroids, adenomyosis or infections are found, treating these (through medication or sometimes surgery) often reduces pain.',
        'Hormonal treatments (like birth control pills) in some cases can reduce the intensity of periods and make bleeding lighter, which often reduces pain too.'
    ]
    return (
        <Section>
            <Wrapper>
                <div className='w-full relative mx-auto max-w-4xl flex flex-col'>
                    <h1 className='font-bold lg:text-4xl md:text-2xl text-xl text-primary-color leading-[1.3] '>
                        What Causes Period Pain — Understanding the Pain with Clarity
                    </h1>

                    <div className='mt-3 w-full flex items-center gap-4'>
                        <div className='relative flex gap-1 items-center'>
                            <User className='text-neutral-500 md:w-5 w-3' size={14} />
                            <span className='text-xs text-light'>Dr. G. Nikila</span>
                        </div>
                        <div className='relative flex gap-1 items-center'>
                            <Calendar className='text-neutral-500 md:w-5 w-3' size={14} />
                            <span className='text-xs text-light'>June 15, 2025</span>
                        </div>
                    </div>

                    <Subheading className='mt-5 '>
                        Period pain, also called menstrual cramps or dysmenorrhea, is something many women experience every month. Sometimes the pain is mild and manageable. Other times it can be very strong and affect daily life. Dr. Nikila Reddy, senior gynaecologist in Hyderabad, explains why period pain occurs, what might make it worse, and when to see a doctor.
                    </Subheading>
                    <Image src='/images/blog/img-1.jpg' alt='What Causes Period Pain — Understanding the Pain with Clarity' width={800} height={500} className='w-full h-[400px] object-cover mt-5 rounded' />

                    <div className='mt-8 relative flex flex-col gap-8'>
                        <div>
                            <h2 className='font-semibold lg:text-3xl md:text-xl text-lg text-zinc-800'>
                                Normal Causes: Why the Uterus Hurts Each Month
                            </h2>
                            <Subheading className='mt-1'>
                                Every month, the lining of the uterus builds up in preparation for a possible pregnancy. If pregnancy does not happen, this lining sheds. To help shed it, the uterus contracts (tightens) and relaxes. These contractions are driven by substances called prostaglandins, which the uterine lining produces. When prostaglandin levels are high, contractions are stronger, causing more pain. These contractions can also reduce blood flow temporarily, adding to discomfort.
                                <br /><br />
                                This is called primary dysmenorrhea — the usual monthly cramps with no other underlying medical problem. Many women start getting these from a few years after their first period. Usually, the pain is most intense on the first day or two of bleeding and fades afterwards.
                            </Subheading>
                        </div>

                        <div>
                            <h2 className='font-semibold lg:text-3xl md:text-xl text-lg text-zinc-800'>
                                When Pain is From Other Medical Conditions
                            </h2>
                            <Subheading className='mt-1'>
                                Sometimes, period pain is more than just regular cramps. Other health issues can cause what is called secondary dysmenorrhea. These conditions often make the pain start earlier, last longer, or be much stronger. Some of these are:
                            </Subheading>
                            <ul className='mt-3 flex flex-col gap-1 list-disc pl-8 text-zinc-700'>
                                {
                                    lstOne.map((list, idx) => (
                                        <li key={idx + 23}>
                                            <strong>{list.title}:</strong> {list.content}
                                        </li>
                                    ))
                                }
                            </ul>
                        </div>

                        <div>
                            <h2 className='font-semibold lg:text-3xl md:text-xl text-lg text-zinc-800'>
                                What Makes Period Pain Worse
                            </h2>
                            <Subheading className='mt-1'>
                                Not everyone feels the same level of pain. Some factors increase the chance of painful periods or make the pain more intense. These include:
                            </Subheading>
                            <ul className='mt-3 flex flex-col gap-1 list-disc pl-8 text-zinc-700'>
                                {
                                    lstTwo.map((list, idx) => (
                                        <li key={idx + 23}>
                                            {list}
                                        </li>
                                    ))
                                }
                            </ul>
                        </div>

                        <div>
                            <h2 className='font-semibold lg:text-3xl md:text-xl text-lg text-zinc-800'>
                                When Period Pain Is NOT Normal — Signs to Watch
                            </h2>
                            <Subheading className='mt-1'>
                                While mild to moderate pain during periods is common, some warning signals mean you should consult a doctor. If any of these happen, a professional evaluation is important:
                            </Subheading>
                            <ul className='mt-3 flex flex-col gap-1 list-disc pl-8 text-zinc-700'>
                                {
                                    lstThree.map((list, idx) => (
                                        <li key={idx + 23}>
                                            {list}
                                        </li>
                                    ))
                                }
                            </ul>
                        </div>

                        <div>
                            <h2 className='font-semibold lg:text-3xl md:text-xl text-lg text-zinc-800'>
                                What Can Be Done — Hope & Relief
                            </h2>
                            <Subheading className='mt-1'>
                                Even strong period pain often has treatments that help. Dr. Nikila Reddy suggests the following approaches:
                            </Subheading>
                            <ul className='mt-3 flex flex-col gap-1 list-disc pl-8 text-zinc-700'>
                                {
                                    lstfour.map((list, idx) => (
                                        <li key={idx + 23}>
                                            {list}
                                        </li>
                                    ))
                                }
                            </ul>
                        </div>

                        <div>
                            <h2 className='font-semibold lg:text-3xl md:text-xl text-lg text-zinc-800'>
                                Final Thoughts
                            </h2>
                            <Subheading className='mt-3'>
                                Period pain is often a normal part of menstruation, but it should not be ignored—especially if it&apos;s severe, getting worse, or affecting your daily life. Recognizing what might be causing the pain is the first step toward relief. For those in Hyderabad or nearby, Dr. Nikila Reddy is available for consultations, examinations, and tailored treatment plans. Don&apos;t suffer in silence—comfort and help are possible.
                            </Subheading>

                        </div>
                    </div>
                </div>
            </Wrapper>
        </Section>
    )
}
