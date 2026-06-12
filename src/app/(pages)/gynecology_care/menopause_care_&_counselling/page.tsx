import { Section, Wrapper, Heading, Subheading, ButtonPrimary } from '@/utils/Section'
import Image from 'next/image'
import React from 'react'

const symptoms = [
    { title: 'Hot flashes & night sweats', desc: 'Sudden waves of heat, often followed by sweating and chills, especially at night.' },
    { title: 'Irregular or stopped periods', desc: 'Cycles become unpredictable before stopping altogether.' },
    { title: 'Vaginal dryness & discomfort', desc: 'Lower estrogen can cause dryness, itching, and discomfort during intimacy.' },
    { title: 'Reduced sexual desire', desc: 'Hormonal shifts can lower libido and affect intimacy.' },
    { title: 'Mood swings & irritability', desc: 'Emotional ups and downs that can feel sudden or out of character.' },
    { title: 'Sleep difficulties', desc: 'Trouble falling or staying asleep, often linked to night sweats.' },
    { title: 'Fatigue & low energy', desc: 'Persistent tiredness that affects daily routines.' },
    { title: 'Memory & focus issues', desc: 'Occasional forgetfulness or difficulty concentrating.' },
    { title: 'Skin, hair & nail changes', desc: 'Dryness, thinning hair, and brittle nails are common.' },
    { title: 'Weight & metabolism changes', desc: 'Slower metabolism can lead to gradual weight gain.' },
]

const lifestylePillars = [
    {
        title: 'Balanced Nutrition',
        desc: 'A diet rich in fruits, vegetables, whole grains, lean proteins, and fibre helps support hormone balance, while limiting processed foods, sugar, and unhealthy fats helps manage weight and energy.',
        image: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?q=80&w=800&auto=format&fit=crop',
    },
    {
        title: 'Regular Movement',
        desc: 'Walking, swimming, yoga, and strength training improve mood, strengthen bones, support heart health, and ease stress — all while improving sleep quality.',
        image: 'https://images.unsplash.com/photo-1599901860904-17e6ed7083a0?q=80&w=800&auto=format&fit=crop',
    },
    {
        title: 'Rest & Stress Care',
        desc: 'Healthy sleep habits, staying hydrated, and relaxation techniques such as meditation or breathing exercises can meaningfully improve day-to-day comfort.',
        image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?q=80&w=800&auto=format&fit=crop',
    },
]

const treatmentOptions = [
    {
        title: 'Personalised Assessment',
        desc: 'A thorough review of your symptoms, medical history, lifestyle, and health goals to understand what your body specifically needs.',
    },
    {
        title: 'Hormone Therapy',
        desc: 'Where appropriate, hormone therapy can help restore balance and ease symptoms like hot flashes, dryness, and mood changes.',
    },
    {
        title: 'Non-Hormonal Treatments',
        desc: 'Alternative medical and nutritional approaches for women who prefer or require non-hormonal options.',
    },
    {
        title: 'Bone & Heart Health Support',
        desc: 'Supplements and therapies that protect long-term bone density and cardiovascular health through this transition.',
    },
    {
        title: 'Regular Screenings',
        desc: 'Ongoing health screenings and gynecological checkups to monitor wellbeing and address concerns as they arise.',
    },
]

export default function page() {
    return (
        <>
            {/* Hero */}
            <Section className="relative bg-fun-blue overflow-hidden">
                <Wrapper className="grid lg:grid-cols-2 gap-10 items-center">
                    <div className="relative z-10">
                        <span className="inline-block text-xs md:text-sm font-semibold tracking-wider uppercase text-primary-color bg-white px-4 py-1.5 rounded-full">
                            Gynecology Care
                        </span>
                        <h1 className="mt-5 font-montserrat text-3xl md:text-4xl lg:text-[44px] leading-[1.2] font-bold text-secondry-color">
                            Menopause Care &amp; Counselling
                        </h1>
                        <p className="mt-4 font-open-sans text-base md:text-lg text-zinc-600 leading-relaxed">
                            Menopause is a natural stage in every woman&apos;s life — and with the right guidance,
                            it can be navigated with confidence, comfort, and care. We help you understand the
                            changes your body is going through and create a plan that fits your life.
                        </p>
                        <div className="mt-8 flex flex-wrap gap-4">
                            <ButtonPrimary>Book a Consultation</ButtonPrimary>
                        </div>
                    </div>
                    <div className="relative w-full h-[320px] md:h-[420px] rounded-2xl overflow-hidden">
                        <Image
                            src="https://images.unsplash.com/photo-1559757148-5c350d0d3c56?q=80&w=1600&auto=format&fit=crop"
                            alt="Menopause care and counselling"
                            fill
                            className="object-cover"
                            priority
                        />
                    </div>
                </Wrapper>
            </Section>

            {/* Understanding Menopause */}
            <Section className="bg-white">
                <Wrapper className="grid lg:grid-cols-2 gap-12 items-center">
                    <div className="relative w-full h-[300px] md:h-[400px] rounded-2xl overflow-hidden order-2 lg:order-1">
                        <Image
                            src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=1200&auto=format&fit=crop"
                            alt="Understanding menopause and its impact"
                            fill
                            className="object-cover"
                        />
                    </div>
                    <div className="order-1 lg:order-2">
                        <Heading>Understanding Menopause and Its Impact</Heading>
                        <Subheading className="mt-3 lg:!text-base !text-zinc-600 leading-relaxed">
                            Menopause marks the natural end of a woman&apos;s menstrual cycles and reproductive
                            years, usually occurring between the ages of 45 and 55. Some women begin
                            experiencing changes earlier, during a phase known as perimenopause, as the body
                            produces lower levels of hormones like estrogen and progesterone.
                        </Subheading>
                        <p className="mt-4 font-open-sans text-sm md:text-base text-zinc-600 leading-relaxed">
                            While menopause is a normal part of aging, its symptoms can affect daily life, sleep,
                            relationships, and overall well-being. Proper care and counselling help women
                            understand these changes and manage them confidently while maintaining a healthy,
                            active lifestyle.
                        </p>
                    </div>
                </Wrapper>
            </Section>

            {/* Symptoms */}
            <Section className="bg-fun-blue">
                <Wrapper>
                    <div className="max-w-2xl">
                        <Heading>Common Signs &amp; Symptoms</Heading>
                        <Subheading>
                            Every woman experiences menopause differently. Hormonal changes can trigger a range
                            of symptoms that may develop gradually over time — recognising them early helps you
                            get the right support sooner.
                        </Subheading>
                    </div>

                    <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
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
                </Wrapper>
            </Section>

            {/* Lifestyle Changes */}
            <Section className="bg-white">
                <Wrapper>
                    <div className="max-w-2xl mx-auto text-center">
                        <Heading>Lifestyle Changes for Better Management</Heading>
                        <Subheading className="mx-auto">
                            Healthy habits play a key role in managing menopause symptoms. Small, consistent
                            adjustments to daily routines can significantly reduce discomfort and improve both
                            physical and emotional wellness.
                        </Subheading>
                    </div>

                    <div className="mt-12 grid md:grid-cols-3 gap-8">
                        {lifestylePillars.map((item, idx) => (
                            <div key={idx} className="group">
                                <div className="relative w-full h-[220px] rounded-2xl overflow-hidden">
                                    <Image
                                        src={item.image}
                                        alt={item.title}
                                        fill
                                        className="object-cover transition-transform duration-500 ease-linear group-hover:scale-105"
                                    />
                                </div>
                                <h3 className="mt-5 font-montserrat text-xl font-bold text-secondry-color">
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

            {/* Personalised Treatment */}
            <Section className="bg-fun-blue">
                <Wrapper className="grid lg:grid-cols-2 gap-12 items-center">
                    <div>
                        <Heading>Personalised Menopause Care &amp; Treatment Options</Heading>
                        <Subheading>
                            Menopause affects every woman differently. During counselling, we assess your
                            symptoms, medical history, lifestyle factors, and individual goals to build a
                            treatment plan tailored to your needs.
                        </Subheading>

                        <div className="mt-8 space-y-5">
                            {treatmentOptions.map((item, idx) => (
                                <div key={idx} className="flex gap-4">
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

                    <div className="relative w-full h-[320px] md:h-[520px] rounded-2xl overflow-hidden">
                        <Image
                            src="https://images.unsplash.com/photo-1584516150909-c43483ee7932?q=80&w=1200&auto=format&fit=crop"
                            alt="Personalised menopause treatment options"
                            fill
                            className="object-cover"
                        />
                    </div>
                </Wrapper>
            </Section>

            {/* Counselling & Support / CTA */}
            <Section className="bg-white">
                <Wrapper>
                    <div className="rounded-2xl bg-secondry-color px-6 md:px-12 py-12 md:py-16 grid lg:grid-cols-2 gap-10 items-center">
                        <div>
                            <h2 className="font-montserrat text-2xl md:text-3xl lg:text-4xl font-bold text-white leading-[1.3]">
                                The Importance of Counselling &amp; Support
                            </h2>
                            <p className="mt-4 font-open-sans text-sm md:text-base text-zinc-200 leading-relaxed">
                                Menopause is not only a physical transition but an emotional one too. Counselling
                                provides education, guidance, and reassurance — creating a safe space to discuss
                                sleep, mood, intimacy, and long-term health planning.
                            </p>
                            <p className="mt-4 font-open-sans text-sm md:text-base text-zinc-200 leading-relaxed">
                                With the right care and support, you can continue to lead a healthy, active, and
                                fulfilling life through this natural phase — with greater confidence and comfort.
                            </p>
                            <div className="mt-8">
                                <ButtonPrimary>Schedule Your Consultation</ButtonPrimary>
                            </div>
                        </div>
                        <div className="relative w-full h-[260px] md:h-[360px] rounded-xl overflow-hidden">
                            <Image
                                src="https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?q=80&w=1200&auto=format&fit=crop"
                                alt="Menopause counselling and support"
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