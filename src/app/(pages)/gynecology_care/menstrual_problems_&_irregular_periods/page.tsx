import { Section, Wrapper, Heading, Subheading, ButtonPrimary } from '@/utils/Section'
import Image from 'next/image'
import React from 'react'

const commonProblems = [
    {
        title: 'Painful Periods',
        desc: 'Cramps occur when the uterus contracts to shed its lining. Mild cramps are common, but severe pain affecting daily activities may need evaluation.',
    },
    {
        title: 'Heavy Bleeding',
        desc: 'Excessive bleeding that requires frequent product changes can sometimes lead to fatigue, weakness, or anemia.',
    },
    {
        title: 'Irregular Cycles',
        desc: 'Periods that arrive too early, too late, or vary significantly each month, with changes in timing, duration, or flow.',
    },
    {
        title: 'Missed Periods',
        desc: 'Can occur due to pregnancy, stress, sudden weight changes, excessive exercise, hormonal imbalance, or menopause.',
    },
    {
        title: 'PMS Symptoms',
        desc: 'Mood swings, bloating, headaches, tiredness, and breast tenderness in the days before a period begins.',
    },
]

const causes = [
    'Polycystic ovary syndrome (PCOS)',
    'Thyroid disorders',
    'Endometriosis',
    'Uterine fibroids',
    'Pelvic infections',
    'Stress and anxiety',
    'Obesity or sudden weight loss',
    'Excessive physical activity',
    'Perimenopause and menopause',
]

const diagnosisSteps = [
    {
        title: 'Detailed Discussion',
        desc: 'A thorough review of your symptoms, menstrual history, lifestyle habits, and medical background.',
    },
    {
        title: 'Tests & Scans',
        desc: 'Blood tests, ultrasound scans, pelvic examinations, or hormone testing to identify the underlying cause.',
    },
    {
        title: 'Lifestyle Guidance',
        desc: 'Stress management, healthy weight, regular exercise, and balanced nutrition to improve menstrual health.',
    },
    {
        title: 'Medical Treatment',
        desc: 'Medications to reduce pain, regulate hormones, or control heavy bleeding — including hormonal options like birth control pills or IUDs.',
    },
    {
        title: 'Specialised Care',
        desc: 'Conditions like endometriosis, fibroids, or severe bleeding may require specialised or surgical management.',
    },
]

const warningSigns = [
    'Extremely painful periods',
    'Very heavy bleeding',
    'Irregular periods lasting several months',
    'Missed periods without pregnancy',
    'Bleeding between periods',
    'Severe pelvic pain',
    'Fatigue or dizziness (signs of anemia)',
]

export default function page() {
    return (
        <>
            {/* Hero */}
            <Section className="relative bg-fun-blue overflow-hidden">
                <Wrapper className="py-16 lg:py-24 grid lg:grid-cols-2 gap-10 items-center">
                    <div className="relative z-10">
                        <span className="inline-block text-xs md:text-sm font-semibold tracking-wider uppercase text-primary-color bg-white px-4 py-1.5 rounded-full">
                            Gynecology Care
                        </span>
                        <h1 className="mt-5 font-montserrat text-3xl md:text-4xl lg:text-[44px] leading-[1.2] font-bold text-secondry-color">
                            Menstrual Problems &amp; Irregular Periods
                        </h1>
                        <p className="mt-4 font-open-sans text-base md:text-lg text-zinc-600 leading-relaxed">
                            Menstrual problems are common among women of all age groups and can affect daily
                            life, physical health, and emotional well-being. With the right diagnosis and a
                            personalised treatment plan, most menstrual issues can be managed effectively.
                        </p>
                        <div className="mt-8 flex flex-wrap gap-4">
                            <ButtonPrimary>Book a Consultation</ButtonPrimary>
                        </div>
                    </div>
                    <div className="relative w-full h-[320px] md:h-[420px] rounded-2xl overflow-hidden">
                        <Image
                            src="/images/all-service/gynecology/img-1.jpg"
                            alt="Menstrual health consultation"
                            fill
                            className="object-cover"
                            priority
                        />
                    </div>
                </Wrapper>
            </Section>

            {/* Understanding */}
            <Section className="bg-white">
                <Wrapper className="grid lg:grid-cols-2 gap-12 items-center">
                    <div className="relative w-full h-[300px] md:h-[400px] rounded-2xl overflow-hidden order-2 lg:order-1">
                        <Image
                            src="/images/all-service/gynecology/img-2.jpg"
                            alt="Understanding menstrual cycles"
                            fill
                            className="object-cover"
                        />
                    </div>
                    <div className="order-1 lg:order-2">
                        <Heading>Understanding Menstrual Problems &amp; Irregular Periods</Heading>
                        <Subheading className="mt-3 lg:!text-base !text-zinc-600 leading-relaxed">
                            A normal menstrual cycle usually occurs every 21 to 35 days and lasts between 2 to 7
                            days. Some variation is normal, but ongoing changes in timing, flow, or pain levels
                            may indicate an underlying health concern that needs attention.
                        </Subheading>
                        <p className="mt-4 font-open-sans text-sm md:text-base text-zinc-600 leading-relaxed">
                            Irregularities can occur due to hormonal changes, stress, lifestyle factors, medical
                            conditions, or reproductive health disorders. Early diagnosis and proper treatment
                            can help manage symptoms effectively and improve overall reproductive health.
                        </p>
                    </div>
                </Wrapper>
            </Section>

            {/* Common Problems */}
            <Section className="bg-fun-blue">
                <Wrapper>
                    <div className="max-w-2xl">
                        <Heading>Common Menstrual Problems</Heading>
                        <Subheading>
                            Many women experience menstrual discomfort occasionally, but persistent or severe
                            symptoms should not be ignored.
                        </Subheading>
                    </div>

                    <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">

                        {commonProblems.map((item, idx) => (
                            <div
                                key={idx}
                                className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-300 ease-linear hover:-translate-y-1"
                            >
                                <h3 className="font-montserrat text-lg font-bold text-secondry-color leading-snug">
                                    {item.title}
                                </h3>
                                <p className="mt-2 font-open-sans text-sm text-zinc-600 leading-relaxed">
                                    {item.desc}
                                </p>
                            </div>
                        ))}
                    </div>
                </Wrapper>
            </Section>

            {/* Causes */}
            <Section className="bg-white">
                <Wrapper className="grid lg:grid-cols-2 gap-12 items-center">
                    <div>
                        <Heading>Causes of Irregular Periods</Heading>
                        <Subheading>
                            Hormonal imbalance is one of the most common causes and can affect ovulation and the
                            menstrual cycle. Conditions that may contribute to menstrual irregularities include:
                        </Subheading>

                        <div className="mt-6 grid sm:grid-cols-2 gap-3">
                            {causes.map((item, idx) => (
                                <div
                                    key={idx}
                                    className="flex items-center gap-3 bg-fun-blue rounded-lg px-4 py-3"
                                >
                                    <span className="w-2 h-2 rounded-full bg-primary-color flex-shrink-0" />
                                    <span className="font-open-sans text-sm text-zinc-700">{item}</span>
                                </div>
                            ))}
                        </div>

                        <p className="mt-6 font-open-sans text-sm md:text-base text-zinc-600 leading-relaxed">
                            Certain medications, hormonal contraceptives, or underlying medical conditions may
                            also affect menstrual patterns. Keeping track of your cycles, bleeding patterns, and
                            symptoms helps your healthcare provider identify the cause more effectively.
                        </p>
                    </div>

                    <div className="relative w-full h-[320px] md:h-[480px] rounded-2xl overflow-hidden">
                        <Image
                            src="/images/all-service/gynecology/img-3.jpg"
                            alt="Doctor discussing hormonal health"
                            fill
                            className="object-cover"
                        />
                    </div>
                </Wrapper>
            </Section>

            {/* Diagnosis & Treatment */}
            <Section className="bg-fun-blue">
                <Wrapper>
                    <div className="max-w-2xl mx-auto text-center">
                        <Heading>Diagnosis &amp; Treatment</Heading>
                        <Subheading className="mx-auto">
                            Treatment depends on the underlying condition and severity of symptoms. Early
                            medical attention can help prevent complications and improve overall reproductive
                            health.
                        </Subheading>
                    </div>

                    <div className="mt-12 grid lg:grid-cols-2 gap-10 items-start">
                        <div className="relative w-full h-[300px] md:h-[420px] rounded-2xl overflow-hidden order-2 lg:order-1">
                            <Image
                                src="/images/all-service/gynecology/img-4.jpg"
                                alt="Diagnosis and treatment for menstrual disorders"
                                fill
                                className="object-cover"
                            />
                        </div>

                        <div className="order-1 lg:order-2 space-y-5">
                            {diagnosisSteps.map((item, idx) => (
                                <div key={idx} className="flex gap-4 bg-white rounded-xl p-5 shadow-sm">
                                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary-color text-white font-montserrat font-bold flex items-center justify-center text-sm">
                                        {String(idx + 1).padStart(2, '0')}
                                    </div>
                                    <div>
                                        <h3 className="font-montserrat text-base font-bold text-secondry-color">
                                            {item.title}
                                        </h3>
                                        <p className="mt-1 font-open-sans text-sm text-zinc-600 leading-relaxed">
                                            {item.desc}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </Wrapper>
            </Section>

            {/* When to Seek Help / CTA */}
            <Section className="bg-white">
                <Wrapper>
                    <div className="rounded-2xl bg-secondry-color px-6 md:px-12 py-12 md:py-16 grid lg:grid-cols-2 gap-10 items-center">
                        <div>
                            <h2 className="font-montserrat text-2xl md:text-3xl lg:text-4xl font-bold text-white leading-[1.3]">
                                When to Seek Medical Help
                            </h2>
                            <p className="mt-4 font-open-sans text-sm md:text-base text-zinc-200 leading-relaxed">
                                It&apos;s important to consult a healthcare provider if menstrual problems become
                                severe, persistent, or start affecting daily life — especially if you experience:
                            </p>
                            <ul className="mt-5 grid sm:grid-cols-2 gap-2">
                                {warningSigns.map((item, idx) => (
                                    <li
                                        key={idx}
                                        className="flex items-center gap-2 font-open-sans text-sm text-zinc-100"
                                    >
                                        <span className="w-1.5 h-1.5 rounded-full bg-white flex-shrink-0" />
                                        {item}
                                    </li>
                                ))}
                            </ul>
                            <div className="mt-8">
                                <ButtonPrimary>Schedule Your Consultation</ButtonPrimary>
                            </div>
                        </div>
                        <div className="relative w-full h-[260px] md:h-[400px] rounded-xl overflow-hidden">
                            <Image
                                src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?q=80&w=1200&auto=format&fit=crop"
                                alt="Gynecological consultation and support"
                                fill
                                className="object-cover"
                            />
                        </div>
                    </div>
                </Wrapper>
            </Section>
        </>
    )
}