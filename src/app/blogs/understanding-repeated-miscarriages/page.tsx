import { Section, Subheading, Wrapper } from '@/utils/Section'
import { Calendar, User } from 'lucide-react'
import Image from 'next/image'

export default function BlogTwo() {
    const lstOne = [
        {
            title: 'Genetic or chromosomal issues',
            content: 'Sometimes the embryo has abnormal chromosomes (too many or too few). This is a common cause of the early losses. Also, one of the parents may carry a balanced chromosomal rearrangement that can lead to repeated losses.'
        },
        {
            title: 'Uterine (womb) problems',
            content: 'Structural abnormalities—such as uterine septum, fibroids, scar tissue, or congenital womb shape differences—can make it hard for a pregnancy to progress.'
        },
        {
            title: 'Hormonal, metabolic & thyroid disorders',
            content: 'Conditions like PCOS, underactive or overactive thyroid, uncontrolled diabetes, or abnormal levels of hormones (for example prolactin) increase risk. Proper balance of hormones is key.'
        },
        {
            title: 'Blood clotting and immune system factors',
            content: 'Disorders such as antiphospholipid syndrome (APS) or thrombophilia (a tendency for blood clots) may interfere with blood flow to the placenta. Sometimes immune reactions can play a role.'
        },
        {
            title: 'Lifestyle and environmental influences',
            content: 'Things like very high or very low body weight, smoking, alcohol, caffeine, certain infections, poor diet, or exposure to toxins may increase risk. Age also plays a role (risk increases after mid-30s).'
        }
    ]
    const lstTwo = [
        'Two or more pregnancy losses, especially early (first trimester) miscarriages.',
        'Difficulty getting pregnant again.',
        'Unusual bleeding, severe cramps, or pains beyond what you’ve had in earlier pregnancies.',
        'History of medical issues such as thyroid disease, diabetes, or blood clotting disorders.',
        'Age over 35, or a partner with known fertility/genetic issues.'
    ]
    const lstThree = [
        {
            title: 'Investigations and tests',
            content: 'Blood tests for thyroid function, blood sugar, clotting disorders, antiphospholipid antibodies; imaging (ultrasound, sonohysterogram, MRI) to check uterus; genetic tests for parents.'
        },
        {
            title: 'Treatment of known causes',
            content: 'If APS is diagnosed, medications like aspirin and heparin may be used. Hormone treatments if thyroid or prolactin are abnormal. Surgical correction if uterine shape is abnormal. Managing diabetes or thyroid disease well.'
        },
        {
            title: 'Lifestyle changes',
            content: 'Keeping a healthy weight, avoiding smoking & excessive alcohol, limiting caffeine, eating balanced diet, managing stress and medical conditions. These help general fertility and pregnancy health.'
        },
        {
            title: 'Support and counselling',
            content: 'Emotional support is very important. Recurrent miscarriage is deeply upsetting. A doctor can help guide the couple, sometimes in specialist recurrent-miscarriage clinics.'
        }
    ]
    return (
        <Section>
            <Wrapper>
                <div className='w-full relative mx-auto max-w-4xl flex flex-col'>
                    <h1 className='font-bold lg:text-4xl md:text-2xl text-xl text-primary-color leading-[1.3] '>
                        Understanding Repeated Miscarriages: Causes, Symptoms & Hope
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
                        Repeated miscarriages, also called recurrent pregnancy loss, is when a woman has two or more miscarriages. This situation is painful emotionally and physically, and many couples want to understand why it&apos;s happening and what can be done. Dr. Nikila Reddy, senior gynaecologist in Hyderabad, explains causes, what to look for, and how to move forward with hope.
                    </Subheading>
                    <Image src='/images/blog/img-2.jpg' alt='Understanding Repeated Miscarriages: Causes, Symptoms & Hope' width={800} height={500} className='w-full h-[400px] object-cover mt-5 rounded' />

                    <div className='mt-8 relative flex flex-col gap-8'>
                        <div>
                            <h2 className='font-semibold lg:text-3xl md:text-xl text-lg text-zinc-800'>
                                What exactly is repeated miscarriage?
                            </h2>
                            <ul className='mt-3 flex flex-col gap-1 list-disc pl-8 text-zinc-700'>
                                <li>
                                    Recurrent miscarriage is usually defined as two or more pregnancy losses, often before 20 weeks. Some healthcare systems use three losses as the benchmark.
                                </li>
                                <li>
                                    These losses may be consecutive (one after another) or with successful pregnancies in between. It doesn&apos;t always have to be back-to-back.
                                </li>
                            </ul>
                        </div>

                        <div>
                            <h2 className='font-semibold lg:text-3xl md:text-xl text-lg text-zinc-800'>
                                Why do recurrent miscarriages happen?
                            </h2>
                            <Subheading className='mt-1'>
                                There are many possible causes. In about half the cases, doctors are unable to find a clear reason. But when a cause is found, it may involve one or more of these:
                            </Subheading>
                            <ul className='mt-3 flex flex-col gap-1 list-decimal pl-8 text-zinc-700'>
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
                                Signs & when to see a doctor
                            </h2>
                            <Subheading className='mt-1'>
                                Repeated miscarriages often don&apos;t come with a warning sign beyond the miscarriages themselves. But some things may help you and your doctor catch a pattern:
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
                            <Subheading className='mt-1'>
                                If you experience repeated miscarriages, it&apos;s important to see a gynaecologist who can do investigations—not only because of physical health but also emotional well-being.
                            </Subheading>
                        </div>

                        <div>
                            <h2 className='font-semibold lg:text-3xl md:text-xl text-lg text-zinc-800'>
                                Tests, treatments & hope
                            </h2>
                            <Subheading className='mt-1'>
                                Even though repeated miscarriage is very distressing, there is hope. Many women who have had such losses go on to have successful pregnancies. Here’s what can be done:
                            </Subheading>
                            <ul className='mt-3 flex flex-col gap-1 list-disc pl-8 text-zinc-700'>
                                {
                                    lstThree.map((list, idx) => (
                                        <li key={idx + 23}>
                                            <strong>{list.title}:</strong> {list.content}
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
                                Repeated miscarriage is painful, but it is not a sign of failure. Many women face this, and many go on to have healthy babies. The key is early evaluation, finding any treatable cause, making healthy changes, and working with a caring obstetrician/gynecologist.
                                <br /><br />
                                If you have experienced two or more miscarriages, reach out for help. Dr. Nikila Reddy in Hyderabad is here to listen, investigate, support, and guide you on this journey. With the right care, there is always hope.
                            </Subheading>

                        </div>
                    </div>
                </div>
            </Wrapper>
        </Section>
    )
}
