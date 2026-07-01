import { Section, Wrapper, Heading, Subheading, ButtonPrimary } from '@/utils/Section'
import React from 'react'

const situationsRequiringRepair = [
    'Natural tears during childbirth',
    'Episiotomy performed during delivery',
    'Deep perineal tears involving pelvic floor muscles',
    'Tears affecting the anal sphincter muscles',
    'Birth-related injuries causing tissue damage',
]

const aftercareTips = [
    'Maintain good hygiene',
    'Keep the area clean and dry',
    'Stay hydrated',
    'Consume a fiber-rich diet to prevent constipation and reduce strain during bowel movements',
]

const painReliefMeasures = [
    'Prescribed medications',
    'Cold packs',
    'Warm sitz baths',
]

const benefits = [
    'Reduced pain',
    'Improved wound healing',
    'Lower risk of infection',
    'Reduced risk of pelvic floor weakness',
    'Better bladder and bowel control',
    'Improved comfort during daily activities',
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
                            Postpartum Care
                        </span>
                        <h1 className="mt-5 font-montserrat text-3xl md:text-4xl lg:text-[44px] leading-[1.2] font-bold text-secondry-color">
                            Perineal Repair
                        </h1>
                        <p className="mt-4 font-open-sans text-base md:text-lg text-zinc-600 leading-relaxed">
                            Perineal repair is a surgical procedure performed to repair tears or cuts in the
                            perineum, the area between the vaginal opening and the anus. Timely and appropriate
                            repair helps improve recovery and reduces the risk of long-term complications.
                        </p>
                        <div className="mt-8 flex flex-wrap gap-4">
                            <ButtonPrimary>Book a Consultation</ButtonPrimary>
                        </div>
                    </div>
                    <ImagePlaceholder className="h-[320px] md:h-[420px]" />
                </Wrapper>
            </Section>

            {/* What Is Perineal Repair */}
            <Section className="bg-white">
                <Wrapper className="grid lg:grid-cols-2 gap-12 items-center">
                    <ImagePlaceholder className="h-[300px] md:h-[400px] order-2 lg:order-1" />
                    <div className="order-1 lg:order-2">
                        <Heading>What Is Perineal Repair?</Heading>
                        <Subheading className="mt-3 lg:!text-base !text-zinc-600 leading-relaxed">
                            Perineal tears commonly occur during vaginal childbirth when the tissues stretch as
                            the baby passes through the birth canal. In some cases, a healthcare provider may
                            perform an episiotomy, a small surgical incision, to assist delivery, which also
                            requires repair after birth.
                        </Subheading>
                        <p className="mt-4 font-open-sans text-sm md:text-base text-zinc-600 leading-relaxed">
                            The purpose of perineal repair is to restore the normal structure of the tissues,
                            promote healing, reduce discomfort, and support proper pelvic floor function.
                        </p>
                    </div>
                </Wrapper>
            </Section>

            {/* When Is It Needed */}
            <Section className="bg-fun-blue">
                <Wrapper>
                    <div className="max-w-2xl">
                        <Heading>When Is Perineal Repair Needed?</Heading>
                        <Subheading>
                            Perineal repair is usually recommended when a woman experiences a tear during vaginal
                            delivery or undergoes an episiotomy. The severity of the tear can vary from minor
                            skin injuries to deeper tears involving muscles around the vagina and anus.
                        </Subheading>
                    </div>

                    <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
                        {situationsRequiringRepair.map((situation, idx) => (
                            <div
                                key={idx}
                                className="bg-white rounded-xl p-5 shadow-sm hover:shadow-md transition-all duration-300 ease-linear hover:-translate-y-1"
                            >
                                <div className="w-10 h-10 rounded-full bg-primary-color text-white font-montserrat font-bold flex items-center justify-center text-sm">
                                    {String(idx + 1).padStart(2, '0')}
                                </div>
                                <h3 className="mt-3 font-montserrat text-base font-bold text-secondry-color leading-snug">
                                    {situation}
                                </h3>
                            </div>
                        ))}
                    </div>

                    <p className="mt-10 font-open-sans text-sm md:text-base text-zinc-600 leading-relaxed max-w-2xl">
                        Proper assessment after delivery helps determine the extent of the injury and the most
                        appropriate method of repair.
                    </p>
                </Wrapper>
            </Section>

            {/* How the Procedure Is Performed */}
            <Section className="bg-white">
                <Wrapper className="grid lg:grid-cols-2 gap-12 items-center">
                    <div>
                        <Heading>How the Procedure Is Performed</Heading>
                        <Subheading className="mt-3">
                            Perineal repair is usually carried out soon after childbirth. Local anesthesia,
                            regional anesthesia, or existing epidural anesthesia may be used to ensure comfort
                            during the procedure.
                        </Subheading>
                        <p className="mt-4 font-open-sans text-sm md:text-base text-zinc-600 leading-relaxed">
                            The doctor carefully stitches the torn or incised tissues layer by layer using
                            dissolvable sutures. The goal is to restore the normal anatomy of the perineal area
                            while promoting proper healing and minimizing discomfort. The procedure is performed
                            under sterile conditions to reduce the risk of infection.
                        </p>
                        <p className="mt-4 font-open-sans text-sm md:text-base text-zinc-600 leading-relaxed">
                            The duration of the repair depends on the extent of the tear. Most women can begin
                            recovery immediately after the procedure and continue postpartum care as advised by
                            their healthcare provider.
                        </p>
                    </div>

                    <ImagePlaceholder className="h-[320px] md:h-[420px]" />
                </Wrapper>
            </Section>

            {/* Recovery and Aftercare */}
            <Section className="bg-fun-blue">
                <Wrapper>
                    <div className="max-w-2xl mx-auto text-center">
                        <Heading>Recovery and Aftercare</Heading>
                        <Subheading className="mx-auto">
                            Healing after perineal repair generally takes several weeks, although recovery time
                            can vary depending on the severity of the tear. Mild discomfort, swelling, and
                            tenderness are common during the early healing period.
                        </Subheading>
                    </div>

                    <div className="mt-12 grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                        <div className="bg-white rounded-2xl p-6 shadow-sm">
                            <h3 className="font-montserrat text-xl font-bold text-secondry-color">
                                Perineal Care
                            </h3>
                            <ul className="mt-4 space-y-3">
                                {aftercareTips.map((tip, idx) => (
                                    <li key={idx} className="flex items-start gap-3 font-open-sans text-sm text-zinc-600 leading-relaxed">
                                        <span className="flex-shrink-0 w-5 h-5 rounded-full bg-primary-color/10 text-primary-color flex items-center justify-center text-xs font-bold mt-0.5">
                                            ✓
                                        </span>
                                        {tip}
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="bg-white rounded-2xl p-6 shadow-sm">
                            <h3 className="font-montserrat text-xl font-bold text-secondry-color">
                                Pain Relief Measures
                            </h3>
                            <ul className="mt-4 space-y-3">
                                {painReliefMeasures.map((measure, idx) => (
                                    <li key={idx} className="flex items-start gap-3 font-open-sans text-sm text-zinc-600 leading-relaxed">
                                        <span className="flex-shrink-0 w-5 h-5 rounded-full bg-primary-color/10 text-primary-color flex items-center justify-center text-xs font-bold mt-0.5">
                                            ✓
                                        </span>
                                        {measure}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    <p className="mt-10 font-open-sans text-sm md:text-base text-zinc-600 leading-relaxed max-w-2xl mx-auto text-center">
                        Gentle pelvic floor exercises may also be recommended after healing begins to strengthen
                        the pelvic muscles and support long-term recovery. Regular follow-up appointments allow
                        healthcare providers to monitor healing and address any concerns during the postpartum
                        period.
                    </p>
                </Wrapper>
            </Section>

            {/* Benefits */}
            <Section className="bg-white">
                <Wrapper>
                    <div className="max-w-2xl mx-auto text-center">
                        <Heading>Benefits of Timely Perineal Repair</Heading>
                        <Subheading className="mx-auto">
                            Prompt and effective perineal repair helps restore normal tissue function and
                            promotes a smoother postpartum recovery.
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

                    <p className="mt-10 font-open-sans text-sm md:text-base text-zinc-600 leading-relaxed max-w-2xl mx-auto text-center">
                        For many women, successful perineal repair supports a healthier recovery after
                        childbirth. With appropriate medical care, guidance, and follow-up, most women heal well
                        and regain normal function in the weeks following delivery.
                    </p>
                </Wrapper>
            </Section>

            {/* CTA */}
            <Section className="bg-white">
                <Wrapper>
                    <div className="rounded-2xl bg-secondry-color px-6 md:px-12 py-12 md:py-16 grid lg:grid-cols-2 gap-10 items-center">
                        <div>
                            <h2 className="font-montserrat text-2xl md:text-3xl lg:text-4xl font-bold text-white leading-[1.3]">
                                Supportive Postpartum Care
                            </h2>
                            <p className="mt-4 font-open-sans text-sm md:text-base text-zinc-200 leading-relaxed">
                                With appropriate medical care, guidance, and follow-up, most women heal well and
                                regain normal function in the weeks following delivery.
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