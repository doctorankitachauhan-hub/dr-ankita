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

const symptoms = [
    { title: 'Irregular or missed periods', desc: 'Heavy or very light menstrual flow, with cycles that vary unpredictably.' },
    { title: 'Weight gain', desc: 'Especially around the abdomen, often linked to insulin resistance.' },
    { title: 'Excess hair growth', desc: 'Increased facial or body hair growth caused by higher androgen levels.' },
    { title: 'Acne & oily skin', desc: 'Hormonal imbalance can lead to persistent acne and oily skin.' },
    { title: 'Hair thinning', desc: 'Thinning hair or hair fall, particularly around the scalp.' },
    { title: 'Fertility difficulties', desc: 'Irregular ovulation can make it harder to get pregnant.' },
    { title: 'Dark skin patches', desc: 'Darker patches of skin may appear around the neck or underarms.' },
    { title: 'Skin tags', desc: 'Small skin tags may develop around the neck or armpits.' },
]

const causesDiagnosis = [
    {
        title: 'Insulin Resistance',
        desc: 'Many women with PCOS have difficulty using insulin effectively, which raises insulin levels and increases androgen production.',
    },
    {
        title: 'Genetics & Lifestyle',
        desc: 'A family history of PCOS, along with obesity and unhealthy lifestyle habits, can contribute to and worsen symptoms.',
    },
    {
        title: 'Blood Tests',
        desc: 'Used to check hormone levels, blood sugar, cholesterol, and insulin levels as part of the diagnosis.',
    },
    {
        title: 'Pelvic Ultrasound',
        desc: 'Commonly used to examine the ovaries and detect the presence of multiple cysts, while ruling out other conditions.',
    },
]

const treatmentOptions = [
    {
        title: 'Lifestyle Modifications',
        desc: 'A healthy diet, regular exercise, weight management, and stress reduction can significantly improve symptoms and hormone balance.',
    },
    {
        title: 'Medications',
        desc: 'May be recommended to regulate menstrual cycles, improve ovulation, reduce insulin resistance, or control acne and excess hair growth.',
    },
    {
        title: 'Hormonal Treatment',
        desc: 'Birth control pills are commonly used to manage irregular periods and hormonal imbalance for women not planning pregnancy.',
    },
    {
        title: 'Fertility Support',
        desc: 'For women trying to conceive, fertility treatments and ovulation-inducing medications may help improve the chances of pregnancy.',
    },
    {
        title: 'Long-Term Monitoring',
        desc: 'Regular medical monitoring helps reduce the risk of diabetes, high blood pressure, heart disease, and fertility complications.',
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
                            Gynecology Care
                        </span>
                        <h1 className="mt-5 font-montserrat text-3xl md:text-4xl lg:text-[44px] leading-[1.2] font-bold text-secondry-color">
                            PCOS Management
                        </h1>
                        <p className="mt-4 font-open-sans text-base md:text-lg text-zinc-600 leading-relaxed">
                            Polycystic Ovary Syndrome (PCOS) is one of the most common hormonal disorders
                            affecting women during their reproductive years. With early diagnosis and the right
                            management plan, symptoms can be controlled and long-term health protected.
                        </p>
                        <div className="mt-8 flex flex-wrap gap-4">
                            <ButtonPrimary>Book a Consultation</ButtonPrimary>
                        </div>
                    </div>
                    <ImagePlaceholder className="h-[320px] md:h-[420px]" />
                </Wrapper>
            </Section>

            {/* Understanding PCOS */}
            <Section className="bg-white">
                <Wrapper className="grid lg:grid-cols-2 gap-12 items-center">
                    <ImagePlaceholder className="h-[300px] md:h-[400px] order-2 lg:order-1" />
                    <div className="order-1 lg:order-2">
                        <Heading>Understanding Polycystic Ovary Syndrome (PCOS)</Heading>
                        <Subheading className="mt-3 lg:!text-base !text-zinc-600 leading-relaxed">
                            PCOS is a hormonal disorder that occurs when the ovaries produce higher-than-normal
                            levels of androgens, which can interfere with ovulation and menstrual cycles.
                        </Subheading>
                        <p className="mt-4 font-open-sans text-sm md:text-base text-zinc-600 leading-relaxed">
                            Women with PCOS may develop multiple small cysts in the ovaries, although not every
                            woman with PCOS has them. The condition can affect fertility, metabolism, skin
                            health, weight, and overall hormonal balance — but early diagnosis and proper
                            management help reduce symptoms and prevent long-term complications.
                        </p>
                    </div>
                </Wrapper>
            </Section>

            {/* Symptoms */}
            <Section className="bg-fun-blue">
                <Wrapper>
                    <div className="max-w-2xl">
                        <Heading>Common Symptoms of PCOS</Heading>
                        <Subheading>
                            Symptoms can differ in severity and may develop gradually over time. Some women
                            notice them soon after puberty, while others discover the condition when facing
                            fertility problems or irregular periods.
                        </Subheading>
                    </div>

                    <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        {symptoms.map((item, idx) => (
                            <div
                                key={idx}
                                className="bg-white rounded-xl p-5 shadow-sm hover:shadow-md transition-all duration-300 ease-linear hover:-translate-y-1"
                            >
                                <h3 className="font-montserrat text-base font-bold text-secondry-color leading-snug">
                                    {item.title}
                                </h3>
                                <p className="mt-2 font-open-sans text-sm text-zinc-600 leading-relaxed">
                                    {item.desc}
                                </p>
                            </div>
                        ))}
                    </div>

                    <p className="mt-8 max-w-3xl font-open-sans text-sm md:text-base text-zinc-600 leading-relaxed">
                        PCOS can also affect emotional well-being, leading to stress, anxiety, and low
                        self-confidence in some women.
                    </p>
                </Wrapper>
            </Section>

            {/* Causes & Diagnosis */}
            <Section className="bg-white">
                <Wrapper className="grid lg:grid-cols-2 gap-12 items-center">
                    <div>
                        <Heading>Causes &amp; Diagnosis of PCOS</Heading>
                        <Subheading>
                            The exact cause of PCOS is not fully understood, but hormonal imbalance and insulin
                            resistance are believed to play a major role. Doctors diagnose PCOS through medical
                            history, symptom evaluation, physical examination, and diagnostic tests.
                        </Subheading>

                        <div className="mt-6 grid sm:grid-cols-2 gap-4">
                            {causesDiagnosis.map((item, idx) => (
                                <div key={idx} className="bg-fun-blue rounded-xl p-5">
                                    <h3 className="font-montserrat text-base font-bold text-secondry-color">
                                        {item.title}
                                    </h3>
                                    <p className="mt-2 font-open-sans text-sm text-zinc-600 leading-relaxed">
                                        {item.desc}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>

                    <ImagePlaceholder className="h-[320px] md:h-[480px]" />
                </Wrapper>
            </Section>

            {/* Treatment & Lifestyle Management */}
            <Section className="bg-fun-blue">
                <Wrapper>
                    <div className="max-w-2xl mx-auto text-center">
                        <Heading>Treatment &amp; Lifestyle Management</Heading>
                        <Subheading className="mx-auto">
                            PCOS management focuses on controlling symptoms, improving hormonal balance, and
                            reducing the risk of long-term health complications. Treatment plans vary depending
                            on symptom severity and individual health goals.
                        </Subheading>
                    </div>

                    <div className="mt-12 grid lg:grid-cols-2 gap-10 items-center">
                        <ImagePlaceholder className="h-[300px] md:h-[420px] order-2 lg:order-1" />

                        <div className="order-1 lg:order-2 space-y-5">
                            {treatmentOptions.map((item, idx) => (
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

            {/* Importance of Early Management / CTA */}
            <Section className="bg-white">
                <Wrapper>
                    <div className="rounded-2xl bg-secondry-color px-6 md:px-12 py-12 md:py-16 grid lg:grid-cols-2 gap-10 items-center">
                        <div>
                            <h2 className="font-montserrat text-2xl md:text-3xl lg:text-4xl font-bold text-white leading-[1.3]">
                                The Importance of Early PCOS Management
                            </h2>
                            <p className="mt-4 font-open-sans text-sm md:text-base text-zinc-200 leading-relaxed">
                                Early diagnosis and proper management of PCOS can improve reproductive health,
                                hormonal balance, and overall quality of life. Ignoring symptoms may lead to
                                long-term complications affecting both physical and emotional health.
                            </p>
                            <p className="mt-4 font-open-sans text-sm md:text-base text-zinc-200 leading-relaxed">
                                With the right treatment plan, lifestyle changes, and regular checkups, many women
                                with PCOS successfully manage their symptoms and lead healthy lives.
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