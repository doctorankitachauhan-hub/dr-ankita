import { Section, Wrapper, Heading, Subheading, ButtonPrimary } from '@/utils/Section'
import Image from 'next/image'
import React from 'react'

const riskFactors = [
    'Childbirth',
    'Aging',
    'Menopause',
    'Obesity',
    'Previous pelvic surgeries',
]

const triggerActivities = [
    'Coughing',
    'Sneezing',
    'Laughing',
    'Exercising',
    'Lifting heavy objects',
]

const candidateCriteria = [
    {
        title: 'Mild to Moderate Symptoms',
        desc: 'Women experiencing mild to moderate stress urinary incontinence who are looking for a minimally invasive treatment option.',
    },
    {
        title: 'Prefer to Avoid Surgery',
        desc: 'Women who prefer to avoid surgery or are not suitable candidates for surgical procedures.',
    },
    {
        title: 'Experiencing Leakage Symptoms',
        desc: 'Women who experience urine leakage while coughing, sneezing, laughing, exercising, or lifting objects may benefit from a professional evaluation to determine whether laser treatment is appropriate.',
    },
]

const procedureSteps = [
    {
        title: 'The Procedure',
        desc: 'A specialized laser device is gently inserted into the vaginal canal. The laser delivers controlled energy to the tissues, stimulating collagen formation and improving tissue strength and elasticity. The treatment is generally comfortable and does not require anesthesia in most cases.',
    },
    {
        title: 'Recovery',
        desc: 'One of the major advantages of laser treatment is the minimal recovery time. Most women can return to their normal daily activities shortly after the procedure. Mild warmth, temporary sensitivity, or light discharge may occur but usually resolve quickly. Depending on the severity of symptoms and individual response, multiple treatment sessions may be recommended to achieve optimal results.',
    },
]

const benefits = [
    'Non-surgical and minimally invasive treatment',
    'No incisions or stitches',
    'Minimal discomfort during and after the procedure',
    'Quick recovery and return to daily activities',
    'Improved bladder control and confidence',
    'Enhanced quality of life',
]

export default function page() {
    return (
        <>
            {/* Hero */}
            <Section className="relative bg-fun-blue overflow-hidden">
                <Wrapper className="grid lg:grid-cols-2 gap-10 items-center">
                    <div className="relative z-10">
                        <span className="inline-block text-xs md:text-sm font-semibold tracking-wider uppercase text-primary-color bg-white px-4 py-1.5 rounded-full">
                            Urogynecology Care
                        </span>
                        <h1 className="mt-5 font-montserrat text-3xl md:text-4xl lg:text-[44px] leading-[1.2] font-bold text-secondry-color">
                            Laser Treatment for Stress Urinary Incontinence
                        </h1>
                        <p className="mt-4 font-open-sans text-base md:text-lg text-zinc-600 leading-relaxed">
                            Stress urinary incontinence (SUI) is a common condition that causes unintentional
                            urine leakage during activities that put pressure on the bladder. Although it can
                            affect confidence and quality of life, effective treatment options are available to
                            help women regain bladder control and improve daily comfort.
                        </p>
                        <div className="mt-8 flex flex-wrap gap-4">
                            <ButtonPrimary>Book a Consultation</ButtonPrimary>
                        </div>
                    </div>
                    <div className="relative w-full h-[320px] md:h-[420px] rounded-2xl overflow-hidden">
                        <Image
                            src="https://images.unsplash.com/photo-1559757148-5c350d0d3c56?q=80&w=1600&auto=format&fit=crop"
                            alt="Laser treatment for stress urinary incontinence"
                            fill
                            className="object-cover"
                            priority
                        />
                    </div>
                </Wrapper>
            </Section>

            {/* Understanding SUI */}
            <Section className="bg-white">
                <Wrapper className="grid lg:grid-cols-2 gap-12 items-center">
                    <div className="relative w-full h-[300px] md:h-[400px] rounded-2xl overflow-hidden order-2 lg:order-1">
                        <Image
                            src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=1200&auto=format&fit=crop"
                            alt="Understanding stress urinary incontinence"
                            fill
                            className="object-cover"
                        />
                    </div>
                    <div className="order-1 lg:order-2">
                        <Heading>Understanding Stress Urinary Incontinence</Heading>
                        <Subheading className="mt-3 lg:!text-base !text-zinc-600 leading-relaxed">
                            Women may experience leakage while coughing, sneezing, laughing, exercising, lifting
                            heavy objects, or performing other physical activities. This condition often develops
                            due to weakening of the pelvic floor muscles and supportive tissues around the
                            bladder and urethra.
                        </Subheading>
                        <p className="mt-4 font-open-sans text-sm md:text-base text-zinc-600 leading-relaxed">
                            Factors such as childbirth, aging, menopause, obesity, and previous pelvic surgeries
                            can increase the risk of stress urinary incontinence.
                        </p>
                        <div className="mt-6 flex flex-wrap gap-2">
                            {riskFactors.map((factor, idx) => (
                                <span
                                    key={idx}
                                    className="inline-block px-4 py-1.5 rounded-full bg-fun-blue text-secondry-color font-open-sans text-sm font-semibold"
                                >
                                    {factor}
                                </span>
                            ))}
                        </div>
                    </div>
                </Wrapper>
            </Section>

            {/* Common Triggers */}
            <Section className="bg-fun-blue">
                <Wrapper>
                    <div className="max-w-2xl">
                        <Heading>Activities That May Trigger Leakage</Heading>
                        <Subheading>
                            Women may experience unintentional urine leakage during everyday activities that put
                            pressure on the bladder.
                        </Subheading>
                    </div>

                    <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
                        {triggerActivities.map((activity, idx) => (
                            <div
                                key={idx}
                                className="bg-white rounded-xl p-5 shadow-sm hover:shadow-md transition-all duration-300 ease-linear hover:-translate-y-1 text-center"
                            >
                                <div className="w-10 h-10 mx-auto rounded-full bg-primary-color text-white font-montserrat font-bold flex items-center justify-center text-sm">
                                    {String(idx + 1).padStart(2, '0')}
                                </div>
                                <h3 className="mt-3 font-montserrat text-base font-bold text-secondry-color leading-snug">
                                    {activity}
                                </h3>
                            </div>
                        ))}
                    </div>
                </Wrapper>
            </Section>

            {/* What Is Laser Treatment */}
            <Section className="bg-white">
                <Wrapper className="grid lg:grid-cols-2 gap-12 items-center">
                    <div>
                        <Heading>What Is Laser Treatment for Stress Urinary Incontinence?</Heading>
                        <Subheading className="mt-3">
                            Laser treatment is a non-surgical, minimally invasive procedure designed to improve
                            symptoms of mild to moderate stress urinary incontinence. The treatment uses
                            controlled laser energy to stimulate collagen production and tissue remodeling within
                            the vaginal walls and surrounding pelvic support structures.
                        </Subheading>
                        <p className="mt-4 font-open-sans text-sm md:text-base text-zinc-600 leading-relaxed">
                            By strengthening and tightening these tissues, laser therapy may help improve bladder
                            support and reduce urine leakage during physical activities. The procedure is
                            performed without incisions, stitches, or hospitalization, making it an attractive
                            option for women seeking a non-surgical approach to treatment.
                        </p>
                        <p className="mt-4 font-open-sans text-sm md:text-base text-zinc-600 leading-relaxed">
                            Laser treatment is typically performed in an outpatient setting and usually takes only
                            a short time to complete.
                        </p>
                    </div>
                    <div className="relative w-full h-[320px] md:h-[420px] rounded-2xl overflow-hidden">
                        <Image
                            src="https://images.unsplash.com/photo-1584516150909-c43483ee7932?q=80&w=1200&auto=format&fit=crop"
                            alt="What is laser treatment for SUI"
                            fill
                            className="object-cover"
                        />
                    </div>
                </Wrapper>
            </Section>

            {/* Who Can Benefit */}
            <Section className="bg-fun-blue">
                <Wrapper>
                    <div className="max-w-2xl mx-auto text-center">
                        <Heading>Who Can Benefit from Laser Treatment?</Heading>
                        <Subheading className="mx-auto">
                            A thorough assessment by a gynecologist or urogynecologist is essential to identify
                            the cause and severity of urinary incontinence and recommend the most suitable
                            treatment plan.
                        </Subheading>
                    </div>

                    <div className="mt-12 grid md:grid-cols-3 gap-8">
                        {candidateCriteria.map((item, idx) => (
                            <div
                                key={idx}
                                className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-300"
                            >
                                <h3 className="font-montserrat text-xl font-bold text-secondry-color">
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

            {/* Procedure and Recovery */}
            <Section className="bg-white">
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
                    </div>

                    <div className="relative w-full h-[320px] md:h-[420px] rounded-2xl overflow-hidden">
                        <Image
                            src="https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?q=80&w=1200&auto=format&fit=crop"
                            alt="Laser treatment procedure and recovery"
                            fill
                            className="object-cover"
                        />
                    </div>
                </Wrapper>
            </Section>

            {/* Benefits */}
            <Section className="bg-fun-blue">
                <Wrapper>
                    <div className="max-w-2xl mx-auto text-center">
                        <Heading>Benefits of Laser Treatment for Stress Urinary Incontinence</Heading>
                        <Subheading className="mx-auto">
                            Laser treatment offers a convenient and minimally invasive option for women seeking
                            relief from stress urinary incontinence. The procedure is designed to improve bladder
                            support, enhance tissue strength, and reduce episodes of urine leakage without the
                            need for surgery.
                        </Subheading>
                    </div>

                    <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto">
                        {benefits.map((benefit, idx) => (
                            <div
                                key={idx}
                                className="bg-white rounded-xl p-5 shadow-sm hover:shadow-md transition-all duration-300 ease-linear hover:-translate-y-1 flex items-start gap-3"
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
                                Take the Next Step with a Personalized Consultation
                            </h2>
                            <p className="mt-4 font-open-sans text-sm md:text-base text-zinc-200 leading-relaxed">
                                A personalized consultation with a qualified specialist can help determine whether
                                laser treatment is the right option based on individual symptoms, medical
                                history, and treatment goals.
                            </p>
                            <p className="mt-4 font-open-sans text-sm md:text-base text-zinc-200 leading-relaxed">
                                Early evaluation and proper care can significantly improve bladder health and
                                overall well-being.
                            </p>
                            <div className="mt-8">
                                <ButtonPrimary>Schedule Your Consultation</ButtonPrimary>
                            </div>
                        </div>
                        <div className="relative w-full h-[260px] md:h-[360px] rounded-xl overflow-hidden">
                            <Image
                                src="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?q=80&w=1200&auto=format&fit=crop"
                                alt="Personalized consultation for bladder health"
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