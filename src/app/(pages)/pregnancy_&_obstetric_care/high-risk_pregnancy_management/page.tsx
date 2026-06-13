import { Section, Wrapper, Heading, Subheading, ButtonPrimary } from '@/utils/Section'
import React from 'react'

function ImagePlaceholder({ className }: { className?: string }) {
    return (
        <div
            className={`${className ?? ''} relative w-full rounded-2xl overflow-hidden bg-zinc-200 border-2 border-dashed border-zinc-300 flex items-center justify-center`}
        >
            <span className="font-open-sans text-sm font-medium text-zinc-400">Image</span>
        </div>
    )
}

const riskFactors = [
    'High blood pressure',
    'Diabetes or gestational diabetes',
    'Thyroid disorders',
    'Kidney disease',
    'Obesity',
    'Multiple pregnancy (twins or triplets)',
    'Previous miscarriage or preterm birth',
    'Placenta-related complications',
    'Autoimmune disorders',
    'Mental health conditions',
    'Smoking, alcohol, or substance use',
    'Preeclampsia or fetal growth concerns',
]

const monitoringCare = [
    {
        title: 'Frequent Prenatal Visits',
        desc: 'More frequent checkups to closely track the health of mother and baby and identify complications as early as possible.',
    },
    {
        title: 'Tests & Ultrasounds',
        desc: 'Regular blood tests, urine tests, ultrasounds, and fetal monitoring to assess fetal growth and maternal well-being.',
    },
    {
        title: 'Specialist Consultations',
        desc: 'Some pregnancies require specialised scans or consultations with maternal-fetal medicine specialists.',
    },
    {
        title: 'Vitals & Growth Tracking',
        desc: 'Monitoring blood pressure, blood sugar, fetal movement, heartbeat, placenta function, and amniotic fluid levels.',
    },
    {
        title: 'Personalised Adjustments',
        desc: 'Home blood pressure monitoring, medication adjustments, bed rest recommendations, or nutritional guidance as needed.',
    },
]

const warningSigns = [
    'Severe abdominal or pelvic pain',
    'Vaginal bleeding or fluid leakage',
    'Severe headaches or blurred vision',
    'Chest pain or breathing difficulty',
    'Dizziness or fainting',
    'Swelling in the face, hands, or legs',
    'Reduced fetal movement',
    'High fever or chills',
    'Strong contractions before full-term',
]

const managementApproach = [
    {
        title: 'Personalised Care Plans',
        desc: 'Created based on the mother\u2019s health, pregnancy condition, and fetal development.',
    },
    {
        title: 'Lifestyle & Medication',
        desc: 'May include lifestyle modifications, medication management, and specialised testing throughout pregnancy.',
    },
    {
        title: 'Planned Delivery',
        desc: 'Delivery methods such as labor induction or cesarean section may be planned when medically necessary.',
    },
    {
        title: 'Emotional Support',
        desc: 'Anxiety and stress are common — support from healthcare providers, family, and loved ones makes the journey more comfortable.',
    },
]

export default function page() {
    return (
        <>
            {/* Hero */}
            <Section className="relative bg-fun-blue overflow-hidden">
                <Wrapper className="py-16 lg:py-24 grid lg:grid-cols-2 gap-10 items-center">
                    <div className="relative z-10">
                        <span className="inline-block text-xs md:text-sm font-semibold tracking-wider uppercase text-primary-color bg-white px-4 py-1.5 rounded-full">
                            Maternity Care
                        </span>
                        <h1 className="mt-5 font-montserrat text-3xl md:text-4xl lg:text-[44px] leading-[1.2] font-bold text-secondry-color">
                            High-Risk Pregnancy Management
                        </h1>
                        <p className="mt-4 font-open-sans text-base md:text-lg text-zinc-600 leading-relaxed">
                            A high-risk pregnancy means extra care, not extra worry. With early diagnosis, close
                            monitoring, and personalised treatment plans, many women with high-risk pregnancies
                            go on to deliver healthy babies.
                        </p>
                        <div className="mt-8 flex flex-wrap gap-4">
                            <ButtonPrimary>Book a Consultation</ButtonPrimary>
                        </div>
                    </div>
                    <ImagePlaceholder className="h-[320px] md:h-[420px]" />
                </Wrapper>
            </Section>

            {/* Understanding */}
            <Section className="bg-white">
                <Wrapper className="grid lg:grid-cols-2 gap-12 items-center">
                    <ImagePlaceholder className="h-[300px] md:h-[400px] order-2 lg:order-1" />
                    <div className="order-1 lg:order-2">
                        <Heading>Understanding High-Risk Pregnancy</Heading>
                        <Subheading className="mt-3 lg:!text-base !text-zinc-600 leading-relaxed">
                            A high-risk pregnancy is one in which the mother, baby, or both have an increased
                            chance of developing health complications during pregnancy, labor, or delivery.
                        </Subheading>
                        <p className="mt-4 font-open-sans text-sm md:text-base text-zinc-600 leading-relaxed">
                            While all pregnancies involve some level of risk, certain medical conditions,
                            pregnancy complications, or lifestyle factors may require additional monitoring and
                            specialised care. Management focuses on protecting the health of both mother and
                            baby through close observation, medical guidance, and personalised treatment plans.
                        </p>
                    </div>
                </Wrapper>
            </Section>

            {/* Risk Factors */}
            <Section className="bg-fun-blue">
                <Wrapper className="grid lg:grid-cols-2 gap-12 items-center">
                    <div>
                        <Heading>Causes &amp; Risk Factors</Heading>
                        <Subheading>
                            Some women may already have medical conditions before pregnancy, while others may
                            develop complications during pregnancy itself. Common factors include:
                        </Subheading>

                        <div className="mt-6 grid sm:grid-cols-2 gap-3">
                            {riskFactors.map((item, idx) => (
                                <div
                                    key={idx}
                                    className="flex items-center gap-3 bg-white rounded-lg px-4 py-3"
                                >
                                    <span className="w-2 h-2 rounded-full bg-primary-color flex-shrink-0" />
                                    <span className="font-open-sans text-sm text-zinc-700">{item}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <ImagePlaceholder className="h-[320px] md:h-[560px]" />
                </Wrapper>
            </Section>

            {/* Monitoring & Care */}
            <Section className="bg-white">
                <Wrapper>
                    <div className="max-w-2xl">
                        <Heading>Monitoring &amp; Care During a High-Risk Pregnancy</Heading>
                        <Subheading>
                            The goal is to closely track the health of mother and baby and identify any
                            complications as early as possible. Regular prenatal care is one of the most
                            important aspects of safe management.
                        </Subheading>
                    </div>

                    <div className="mt-10 grid lg:grid-cols-2 gap-10 items-center">
                        <ImagePlaceholder className="h-[300px] md:h-[420px] order-2 lg:order-1" />

                        <div className="order-1 lg:order-2 space-y-5">
                            {monitoringCare.map((item, idx) => (
                                <div key={idx} className="flex gap-4 bg-fun-blue rounded-xl p-5">
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

            {/* Warning Signs */}
            <Section className="bg-fun-blue">
                <Wrapper>
                    <div className="max-w-2xl">
                        <Heading>Signs That Need Immediate Medical Attention</Heading>
                        <Subheading>
                            Early medical intervention can help prevent serious complications. Seek immediate
                            medical attention if you notice:
                        </Subheading>
                    </div>

                    <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {warningSigns.map((item, idx) => (
                            <div
                                key={idx}
                                className="bg-white rounded-xl p-5 shadow-sm flex items-center gap-3"
                            >
                                <span className="w-2.5 h-2.5 rounded-full bg-primary-color flex-shrink-0" />
                                <span className="font-open-sans text-sm font-medium text-zinc-700">{item}</span>
                            </div>
                        ))}
                    </div>

                    <p className="mt-8 max-w-3xl font-open-sans text-sm md:text-base text-zinc-600 leading-relaxed">
                        It is important to attend all scheduled prenatal appointments and follow medical
                        advice carefully throughout pregnancy.
                    </p>
                </Wrapper>
            </Section>

            {/* Importance of Management / CTA */}
            <Section className="bg-white">
                <Wrapper>
                    <div className="max-w-2xl mx-auto text-center">
                        <Heading>Importance of High-Risk Pregnancy Management</Heading>
                        <Subheading className="mx-auto">
                            With advanced prenatal care, close monitoring, and timely treatment, many high-risk
                            pregnancies can be managed successfully.
                        </Subheading>
                    </div>

                    <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {managementApproach.map((item, idx) => (
                            <div key={idx} className="bg-fun-blue rounded-xl p-6">
                                <h3 className="font-montserrat text-lg font-bold text-secondry-color">
                                    {item.title}
                                </h3>
                                <p className="mt-2 font-open-sans text-sm text-zinc-600 leading-relaxed">
                                    {item.desc}
                                </p>
                            </div>
                        ))}
                    </div>

                    <div className="mt-14 rounded-2xl bg-secondry-color px-6 md:px-12 py-12 md:py-16 grid lg:grid-cols-2 gap-10 items-center">
                        <div>
                            <h2 className="font-montserrat text-2xl md:text-3xl lg:text-4xl font-bold text-white leading-[1.3]">
                                Safer Pregnancies, Healthier Outcomes
                            </h2>
                            <p className="mt-4 font-open-sans text-sm md:text-base text-zinc-200 leading-relaxed">
                                Although high-risk pregnancies may require extra care and attention, regular
                                monitoring and proper medical guidance can help mothers experience safer
                                pregnancies and healthier outcomes for their babies.
                            </p>
                            <div className="mt-8">
                                <ButtonPrimary>Schedule Your Consultation</ButtonPrimary>
                            </div>
                        </div>
                        <ImagePlaceholder className="h-[260px] md:h-[360px] !bg-white/10 !border-white/30" />
                    </div>
                </Wrapper>
            </Section>
        </>
    )
}