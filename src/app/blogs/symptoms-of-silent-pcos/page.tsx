import { Section, Subheading, Wrapper } from '@/utils/Section'
import { Calendar, User } from 'lucide-react'
import Image from 'next/image'


export default function BlogThree() {
    const lstOne = [
        {
            title: 'Mild changes in periods ',
            content: 'Periods may still come every month, but they can be slightly delayed, lighter, or heavier than usual.'
        },
        {
            title: 'Unexplained acne or oily skin ',
            content: 'Some women may notice breakouts that do not go away easily.'
        },
        {
            title: 'Trouble with weight management ',
            content: 'Silent PCOS can make it harder to lose weight even with diet and exercise.'
        },
        {
            title: 'Mood changes or tiredness ',
            content: 'Hormonal imbalance can lead to low energy, stress, or mood swings.'
        },
        {
            title: 'Hair thinning ',
            content: 'Some women may notice more hair fall or reduced hair volume.'
        }
    ]
    const lstTwo = [
        'Infertility or trouble getting pregnant.',
        'Diabetes and insulin resistance.',
        'High blood pressure and cholesterol.',
        'Sleep problems.',
        'Mental health issues like anxiety or depression.'
    ]
    return (
        <Section>
            <Wrapper>
                <div className='w-full relative mx-auto max-w-4xl flex flex-col'>
                    <h1 className='font-bold lg:text-4xl md:text-2xl text-xl text-primary-color leading-[1.3] '>
                        Symptoms of Silent PCOS
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
                        Polycystic Ovary Syndrome (PCOS) is a common health condition that affects many women. While some women experience clear signs like irregular periods or weight gain, others may have what is called silent PCOS. In this condition, the symptoms are not very obvious, and many women may not realize they have it until they face issues with fertility or undergo routine health check-ups. Silent PCOS can still affect health in the long run, which is why understanding its hidden signs is important.
                        <br />
                        Dr. Nikila Reddy, Senior Gynecologist in Hyderabad, explains that even when PCOS does not show visible symptoms, the body gives subtle signals. Recognizing these early can help in getting the right treatment and preventing complications.
                    </Subheading>
                    <Image src='/images/blog/img-3.jpg' alt='Symptoms of Silent PCOS' width={800} height={500} className='w-full h-[400px] object-cover mt-5 rounded' />

                    <div className='mt-8 relative flex flex-col gap-8'>
                        <div>
                            <h2 className='font-semibold lg:text-3xl md:text-xl text-lg text-zinc-800'>
                                What is Silent PCOS?
                            </h2>
                            <Subheading className='mt-1'>
                                Silent PCOS refers to cases where the usual symptoms of PCOS are mild or absent. Women may not have irregular cycles, sudden weight gain, or excessive hair growth—the common signs usually linked with PCOS. Instead, the condition quietly develops inside the body, affecting hormonal balance, metabolism, and ovarian health. Because the signs are less noticeable, it is often diagnosed late.
                            </Subheading>
                        </div>

                        <div>
                            <h2 className='font-semibold lg:text-3xl md:text-xl text-lg text-zinc-800'>
                                Subtle Signs to Watch Out For
                            </h2>
                            <Subheading className='mt-1'>
                                Even if the symptoms are not very clear, women with silent PCOS may experience small changes in their body. Some common signs include:
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
                            <Subheading className='mt-1'>
                                These signs are easy to miss or may be confused with everyday issues, which is why regular check-ups are important.
                            </Subheading>
                        </div>

                        <div>
                            <h2 className='font-semibold lg:text-3xl md:text-xl text-lg text-zinc-800'>
                                Why Silent PCOS is Often Missed
                            </h2>
                            <Subheading className='mt-1'>
                                Silent PCOS is often missed because the outward symptoms are not strong. A woman may think her cycles are normal and ignore small changes in skin, hair, or weight. Sometimes, PCOS is only detected when a woman finds it difficult to conceive or goes for a routine scan. Blood tests and ultrasound are usually needed to confirm the condition.
                            </Subheading>
                        </div>

                        <div>
                            <h2 className='font-semibold lg:text-3xl md:text-xl text-lg text-zinc-800'>
                                Long-Term Effects of Ignoring Silent PCOS
                            </h2>
                            <Subheading className='mt-1'>
                                Even without obvious symptoms, silent PCOS can affect long-term health. It can increase the risk of:
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
                                This is why Dr. Nikila Reddy advises women not to ignore even small changes in their body and to go for regular gynecological check-ups.
                            </Subheading>
                        </div>

                        <div>
                            <h2 className='font-semibold lg:text-3xl md:text-xl text-lg text-zinc-800'>
                                When to See a Doctor
                            </h2>
                            <Subheading className='mt-3'>
                                If you notice subtle changes in your menstrual cycle, sudden acne, hair loss, or find it difficult to manage your weight, it is best to consult a gynecologist. Early diagnosis of PCOS helps in better treatment and lowers the risk of future complications. Lifestyle changes, medications, and proper monitoring can help women manage silent PCOS effectively.
                            </Subheading>
                        </div>

                        <div>
                            <h2 className='font-semibold lg:text-3xl md:text-xl text-lg text-zinc-800'>
                                Final Thoughts
                            </h2>
                            <Subheading className='mt-3'>
                                Silent PCOS may not show strong warning signs, but it can still affect your health over time. Listening to your body, noticing small changes, and seeking timely medical advice is the key to staying healthy.
                                <br /><br />
                                If you have concerns about PCOS or your menstrual health, consult Dr. Nikila Reddy, Senior Gynecologist in Hyderabad, for expert guidance and care.
                            </Subheading>

                        </div>
                    </div>
                </div>
            </Wrapper>
        </Section>
    )
}
