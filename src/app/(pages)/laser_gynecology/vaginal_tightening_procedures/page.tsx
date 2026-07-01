import { Section, Wrapper, Heading, Subheading, ButtonPrimary } from '@/utils/Section'
import React from 'react'

const reasonsForTreatment = [
    'Feeling of vaginal looseness',
    'Reduced vaginal sensation during intimacy',
    'Mild pelvic floor weakness',
    'Vaginal dryness associated with menopause',
    'Reduced confidence related to intimate health',
    'Changes in vaginal tissue elasticity after childbirth',
]

const treatmentTypes = [
    {
        title: 'Non-Surgical Treatments',
        desc: 'Commonly use laser or radiofrequency technology to deliver controlled energy to the vaginal tissues. These treatments encourage collagen remodeling, improve tissue elasticity, and support vaginal rejuvenation without incisions or lengthy recovery periods.',
    },
    {
        title: 'Surgical Treatments',
        desc: 'For women with more significant tissue laxity or pelvic support concerns, surgical vaginal tightening procedures may be recommended. Surgical treatments are tailored to the individual\u2019s needs and aim to restore vaginal support and function.',
    },
]

const procedureSteps = [
    {
        title: 'Non-Surgical Recovery',
        desc: 'Non-surgical vaginal tightening procedures are typically performed in an outpatient setting and usually require minimal downtime. Most sessions are completed within a short period, allowing women to return to their daily activities soon afterward.',
    },
    {
        title: 'Surgical Recovery',
        desc: 'Surgical procedures may require anesthesia and a longer recovery period, depending on the extent of treatment performed. Healthcare providers offer detailed guidance regarding activity restrictions, personal care, and follow-up visits to support proper healing.',
    },
]

const benefits = [
    'Improved vaginal tissue firmness and elasticity',
    'Enhanced pelvic support',
    'Increased comfort during daily activities',
    'Improved intimate wellness and confidence',
    'Minimally invasive treatment options with little downtime',
    'Personalized solutions based on individual needs',
]

function ImagePlaceholder({ className = '', label = 'Image Placeholder' }: { className?: string; label?: string }) {
    return (
        <div
            className={`relative w-full rounded-2xl overflow-hidden bg-zinc-200 flex items-center justify-center ${className}`}
        >
            <span className="font-open-sans text-sm text-zinc-400">{label}</span>
        </div>
    )
}

export default function page() {
    return (
        <>
            {/* Hero */}
            <Section className="relative bg-fun-blue overflow-hidden">
                <Wrapper className="grid lg:grid-cols-2 gap-10 items-center">
                    <div className="relative z-10">
                        <span className="inline-block text-xs md:text-sm font-semibold tracking-wider uppercase text-primary-color bg-white px-4 py-1.5 rounded-full">
                            Intimate Wellness
                        </span>
                        <h1 className="mt-5 font-montserrat text-3xl md:text-4xl lg:text-[44px] leading-[1.2] font-bold text-secondry-color">
                            Vaginal Tightening Procedures
                        </h1>
                        <p className="mt-4 font-open-sans text-base md:text-lg text-zinc-600 leading-relaxed">
                            Vaginal tightening procedures are designed to improve vaginal tissue strength,
                            elasticity, and support, helping women feel more comfortable and confident.
                        </p>
                        <div className="mt-8 flex flex-wrap gap-4">
                            <ButtonPrimary>Book a Consultation</ButtonPrimary>
                        </div>
                    </div>
                    <ImagePlaceholder className="h-[320px] md:h-[420px]" />
                </Wrapper>
            </Section>

            {/* Understanding Vaginal Laxity */}
            <Section className="bg-white">
                <Wrapper className="grid lg:grid-cols-2 gap-12 items-center">
                    <ImagePlaceholder className="h-[300px] md:h-[400px] order-2 lg:order-1" />
                    <div className="order-1 lg:order-2">
                        <Heading>Understanding Vaginal Laxity</Heading>
                        <Subheading className="mt-3 lg:!text-base !text-zinc-600 leading-relaxed">
                            Vaginal laxity refers to a feeling of looseness or reduced vaginal tightness that may
                            occur due to childbirth, aging, hormonal changes, menopause, or natural tissue
                            stretching over time. These changes can affect vaginal support, muscle tone, sexual
                            satisfaction, and overall confidence in some women.
                        </Subheading>
                        <p className="mt-4 font-open-sans text-sm md:text-base text-zinc-600 leading-relaxed">
                            While vaginal laxity is a common concern, it is important to understand that every
                            woman&apos;s body changes differently. If these changes begin to affect comfort,
                            intimacy, or quality of life, professional evaluation can help identify suitable
                            treatment options.
                        </p>
                    </div>
                </Wrapper>
            </Section>

            {/* Who Can Benefit */}
            <Section className="bg-fun-blue">
                <Wrapper>
                    <div className="max-w-2xl">
                        <Heading>Who Can Benefit from Vaginal Tightening Procedures?</Heading>
                        <Subheading>
                            Women may consider vaginal tightening treatments when they experience symptoms
                            associated with weakened vaginal tissues or reduced pelvic support. These concerns
                            often develop after vaginal childbirth, menopause, or age-related changes in collagen
                            production.
                        </Subheading>
                    </div>

                    <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {reasonsForTreatment.map((reason, idx) => (
                            <div
                                key={idx}
                                className="bg-white rounded-xl p-5 shadow-sm hover:shadow-md transition-all duration-300 ease-linear hover:-translate-y-1"
                            >
                                <div className="w-10 h-10 rounded-full bg-primary-color text-white font-montserrat font-bold flex items-center justify-center text-sm">
                                    {String(idx + 1).padStart(2, '0')}
                                </div>
                                <h3 className="mt-3 font-montserrat text-base font-bold text-secondry-color leading-snug">
                                    {reason}
                                </h3>
                            </div>
                        ))}
                    </div>

                    <p className="mt-10 font-open-sans text-sm md:text-base text-zinc-600 leading-relaxed max-w-2xl">
                        A comprehensive gynecological assessment helps determine whether vaginal tightening
                        procedures are appropriate and identifies the most suitable treatment approach.
                    </p>
                </Wrapper>
            </Section>

            {/* Types of Procedures */}
            <Section className="bg-white">
                <Wrapper>
                    <div className="max-w-2xl mx-auto text-center">
                        <Heading>Types of Vaginal Tightening Procedures</Heading>
                        <Subheading className="mx-auto">
                            Several treatment options are available depending on the severity of symptoms,
                            individual goals, and overall health. Modern vaginal tightening procedures often focus
                            on improving tissue strength and stimulating natural collagen production.
                        </Subheading>
                    </div>

                    <div className="mt-12 grid md:grid-cols-2 gap-8">
                        {treatmentTypes.map((item, idx) => (
                            <div key={idx} className="group">
                                <ImagePlaceholder className="h-[220px]" />
                                <h3 className="mt-5 font-montserrat text-xl font-bold text-secondry-color">
                                    {item.title}
                                </h3>
                                <p className="mt-2 font-open-sans text-sm text-zinc-600 leading-relaxed">
                                    {item.desc}
                                </p>
                            </div>
                        ))}
                    </div>

                    <p className="mt-10 font-open-sans text-sm md:text-base text-zinc-600 leading-relaxed text-center max-w-2xl mx-auto">
                        The choice of treatment depends on a thorough evaluation and discussion with a qualified
                        gynecologist.
                    </p>
                </Wrapper>
            </Section>

            {/* Procedure and Recovery */}
            <Section className="bg-fun-blue">
                <Wrapper className="grid lg:grid-cols-2 gap-12 items-center">
                    <div>
                        <Heading>Procedure and Recovery</Heading>
                        <div className="mt-8 space-y-5">
                            {procedureSteps.map((item, idx) => (
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
                        <p className="mt-6 font-open-sans text-sm md:text-base text-zinc-600 leading-relaxed">
                            Recovery experiences vary among individuals, but most women notice gradual
                            improvements as tissues heal and collagen production increases over time.
                        </p>
                    </div>

                    <ImagePlaceholder className="h-[320px] md:h-[420px]" />
                </Wrapper>
            </Section>

            {/* Benefits */}
            <Section className="bg-white">
                <Wrapper>
                    <div className="max-w-2xl mx-auto text-center">
                        <Heading>Benefits of Vaginal Tightening Procedures</Heading>
                        <Subheading className="mx-auto">
                            Vaginal tightening treatments are designed to enhance vaginal support, improve tissue
                            quality, and address concerns related to vaginal laxity. Depending on the chosen
                            treatment and individual response, women may experience improved comfort, confidence,
                            and overall intimate wellness.
                        </Subheading>
                    </div>

                    <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto">
                        {benefits.map((benefit, idx) => (
                            <div
                                key={idx}
                                className="bg-fun-blue rounded-xl p-5 shadow-sm hover:shadow-md transition-all duration-300 ease-linear hover:-translate-y-1 flex items-start gap-3"
                            >
                                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary-color/10 text-primary-color flex items-center justify-center text-xs font-bold mt-0.5">
                                    ✓
                                </span>
                                <p className="font-open-sans text-sm text-secondry-color leading-relaxed">
                                    {benefit}
                                </p>
                            </div>
                        ))}
                    </div>
                </Wrapper>
            </Section>

            {/* CTA */}
            <Section className="bg-white">
                <Wrapper>
                    <div className="rounded-2xl bg-secondry-color px-6 md:px-12 py-12 md:py-16 grid lg:grid-cols-2 gap-10 items-center">
                        <div>
                            <h2 className="font-montserrat text-2xl md:text-3xl lg:text-4xl font-bold text-white leading-[1.3]">
                                Find the Right Treatment for You
                            </h2>
                            <p className="mt-4 font-open-sans text-sm md:text-base text-zinc-200 leading-relaxed">
                                A consultation with an experienced gynecologist can help determine the most
                                appropriate treatment option and create a personalized care plan.
                            </p>
                            <p className="mt-4 font-open-sans text-sm md:text-base text-zinc-200 leading-relaxed">
                                With proper evaluation and expert guidance, vaginal tightening procedures can
                                support women&apos;s health, comfort, and quality of life.
                            </p>
                            <div className="mt-8">
                                <ButtonPrimary>Schedule Your Consultation</ButtonPrimary>
                            </div>
                        </div>
                        <ImagePlaceholder className="h-[260px] md:h-[360px]" />
                    </div>
                </Wrapper>
            </Section>
        </>
    )
}