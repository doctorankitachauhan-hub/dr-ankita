import { Section, Subheading, Wrapper } from '@/utils/Section'
import { Calendar, User } from 'lucide-react'
import Image from 'next/image'

export default function BlogFour() {

    return (
        <Section>
            <Wrapper>
                <div className='w-full relative mx-auto max-w-4xl flex flex-col'>
                    <h1 className='font-bold lg:text-4xl md:text-2xl text-xl text-primary-color leading-[1.3] '>
                        Understanding Postpartum Depression: Signs, Causes & Hope
                    </h1>

                    <div className='mt-3 w-full flex items-center gap-4'>
                        <div className='relative flex gap-1 items-center'>
                            <User className='text-neutral-500 md:w-5 w-3' size={14} />
                            <span className='text-xs text-light'>Dr. Ankita Chauhan</span>
                        </div>
                        <div className='relative flex gap-1 items-center'>
                            <Calendar className='text-neutral-500 md:w-5 w-3' size={14} />
                            <span className='text-xs text-light'>June 15, 2025</span>
                        </div>
                    </div>

                    <Subheading className='mt-5 '>
                        After giving birth, many new mothers feel overwhelmed, tired or emotional. These feelings are common. But when sadness, anxiety, or hopelessness lasts longer than it should, it might be postpartum depression. Dr. Nikila Reddy, senior gynecologist in Hyderabad, shares what postpartum depression is, its signs, causes, and how to find help.
                    </Subheading>
                    <Image src='/images/blog/img-4.jpg' alt='Understanding Postpartum Depression: Signs, Causes & Hope' width={800} height={500} className='w-full h-[400px] object-cover mt-5 rounded' />

                    <div className='mt-8 relative flex flex-col gap-8'>
                        <div>
                            <h2 className='font-semibold lg:text-3xl md:text-xl text-lg text-zinc-800'>
                                What is Postpartum Depression?
                            </h2>
                            <Subheading className='mt-1'>
                                It&apos;s natural for some mood changes after childbirth — often called the baby blues. These usually begin within the first few days, with mild sadness, anxiety, mood swings, trouble sleeping, or tearfulness, and they tend to improve within two weeks.
                                <br /><br />
                                Postpartum depression (PPD) is different. It is more intense, lasts longer (beyond two weeks), and can interfere with your ability to care for yourself or your baby. It may start any time during the first year after birth.
                            </Subheading>
                        </div>

                        <div>
                            <h2 className='font-semibold lg:text-3xl md:text-xl text-lg text-zinc-800'>
                                Signs & Symptoms to Watch Out For
                            </h2>
                            <Subheading className='mt-1'>
                                Some mothers experiencing PPD notice many of these symptoms. If several of them last for more than two weeks, it&apos;s wise to speak to a doctor.
                            </Subheading>
                            <Subheading className='mt-1'>
                                You may feel deep sadness, persistent anxiety, or hopelessness that does not go away. Sleep may be disturbed—not just because of the baby, but you may have trouble falling asleep or staying asleep even when rest is possible. Fatigue is common, but in PPD it&apos;s more than normal tiredness—it may feel overwhelming. You might find you have little interest or joy in things that used to make you happy. Thoughts of guilt or feeling like you are not a good mother, or constant worry about your baby, are also signs. Some mothers feel detached or unable to bond with their baby. Appetite changes (eating too much or too little), trouble concentrating, or sometimes even thoughts of harming yourself, are serious symptoms.
                            </Subheading>
                        </div>

                        <div>
                            <h2 className='font-semibold lg:text-3xl md:text-xl text-lg text-zinc-800'>
                                What Causes Postpartum Depression?
                            </h2>
                            <Subheading className='mt-1'>
                                There is no single cause. Often it&apos;s many things together—physical, emotional, social, and sometimes genetic. Knowing these helps you understand you are not to blame.
                            </Subheading>
                            <Subheading className='mt-1'>
                                Physically, after childbirth the levels of hormones such as estrogen and progesterone drop very sharply. This sudden hormonal change can affect mood. Thyroid hormone changes, blood loss, physical recovery from delivery, disruptions in sleep, and fatigue also play a role.
                            </Subheading>
                            <Subheading className='mt-1'>
                                Emotionally and mentally, stress after having a baby can be large. New responsibilities, worry about being a good parent, concerns about baby&apos;s health, or if the delivery was difficult (traumatic) add to mental load. If a mother has had depression before, or depression during pregnancy, she has a higher risk. Lack of support—from partner, family or friends—feeling isolated, or going through other stressful events (financial pressure, relationship trouble, etc.) also increase risk.
                            </Subheading>
                        </div>

                        <div>
                            <h2 className='font-semibold lg:text-3xl md:text-xl text-lg text-zinc-800'>
                                When to Seek Help
                            </h2>
                            <Subheading className='mt-1'>
                                If you notice symptoms lasting more than two weeks, or worsening, it is important to reach out. When daily tasks become hard, or you feel unable to care for yourself or your baby, that is a signal. If feelings of guilt, hopelessness, or thoughts of self-harm appear, immediate help from a health professional is needed. Early diagnosis and treatment make a big difference.
                            </Subheading>
                            <Subheading className='mt-1'>
                                Talk to your gynecologist, a counsellor, or a mental health specialist. Sharing how you feel with someone you trust—a partner, family member, friend—can help you not feel alone. Support groups are also helpful.
                            </Subheading>
                        </div>

                        <div>
                            <h2 className='font-semibold lg:text-3xl md:text-xl text-lg text-zinc-800'>
                                Treatment & Hope
                            </h2>
                            <Subheading className='mt-3'>
                                Postpartum depression is treatable. Many women recover well and go on to enjoy motherhood. Treatment can include counselling (talk therapy), sometimes medication when needed, lifestyle changes, rest, ensuring help with baby care and household tasks, restoring sleep, and strong emotional support.
                            </Subheading>
                            <Subheading className='mt-1'>
                                Taking care of yourself is not selfish—it helps you care for your baby better. If you are in or near Hyderabad and believe you or someone you know may have postpartum depression, consulting Dr. Nikila Reddy can be a strong first step. Her care can guide diagnosis, treatment, and emotional support tailored to your needs.
                            </Subheading>
                        </div>
                    </div>
                </div>
            </Wrapper>
        </Section>
    )
}
