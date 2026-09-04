import { Section, Wrapper, Heading, Subheading, ButtonPrimary } from '@/utils/Section'
import { Metadata } from 'next'
import Image from 'next/image'
import React from 'react'


export const metadata: Metadata = {
    title: "Normal & Caesarean Delivery | Dr. Ankita Chauhan",
    description: "Personalized care for normal delivery and Caesarean section with a focus on the safety of both mother and baby.",
    alternates: {
        canonical: "https://www.drankitachauhan.com/pregnancy-and-obstetric-care/normal-and-caesarean-delivery",
    },
  openGraph: {
    title: "Normal & Caesarean Delivery | Dr. Ankita Chauhan",
    description: "Personalized care for normal delivery and Caesarean section with a focus on the safety of both mother and baby.",
    url: "https://www.drankitachauhan.com/pregnancy-and-obstetric-care/normal-and-caesarean-delivery",
  },
}


function SectionImage({
    className,
    src,
    alt,
}: {
    className?: string
    src: string
    alt: string
}) {
    return (
        <div
            className={`${className ?? ''} relative w-full rounded-2xl overflow-hidden bg-zinc-200`}
        >
            <Image
                src={src}
                alt={alt}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
            />
        </div>
    )
}

const normalStages = [
    {
        title: 'Stage 1 — Labor',
        desc: 'Contractions begin and the cervix gradually dilates, opening the way for the baby to move through the birth canal.',
    },
    {
        title: 'Stage 2 — Birth',
        desc: 'Active pushing helps move the baby through the birth canal until the baby is delivered.',
    },
    {
        title: 'Stage 3 — Placenta',
        desc: 'The final stage involves the delivery of the placenta, completing the birth process.',
    },
]

const normalBenefits = [
    'Shorter hospital stays',
    'Faster overall recovery',
    'Lower risk of surgical complications',
    'Improved breathing adaptation for the baby',
]

const cSectionReasons = [
    'High-risk pregnancy',
    'Fetal distress',
    'Multiple pregnancy',
    'Breech baby position',
    'Placenta complications',
    'Previous C-section delivery',
    'Failure of labor to progress',
]

const recoveryCards = [
    {
        title: 'After Normal Delivery',
        desc: 'Recovery is generally quicker, and many women return to daily activities within a shorter time. Mild soreness, bleeding, and fatigue are common in the initial period.',
        image: '/images/all-service/pregnancy/after-normal-delivery.png',
    },
    {
        title: 'After Caesarean Delivery',
        desc: 'Recovery may take longer as it involves abdominal surgery. Avoiding heavy lifting, proper rest, and careful wound care support healing and prevent infection.',
        image: '/images/all-service/pregnancy/after-caesarean-delivery.png',
    },
    {
        title: 'For Every Mother',
        desc: 'Breastfeeding support, hydration, healthy eating, and emotional care are essential after both types of delivery, alongside regular follow-up checkups.',
        image: '/images/all-service/pregnancy/for-every-mother.png',
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
                            Normal &amp; Caesarean Delivery
                        </h1>
                        <p className="mt-4 font-open-sans text-base md:text-lg text-zinc-600 leading-relaxed">
                            Childbirth is one of the most important moments in a woman&apos;s life, and every
                            pregnancy journey is different. We help expectant parents understand both delivery
                            methods so they feel prepared and confident for a safe, healthy birth experience.
                        </p>
                        <div className="mt-8 flex flex-wrap gap-4">
                            <ButtonPrimary>Book a Consultation</ButtonPrimary>
                        </div>
                    </div>
                    <SectionImage
                        className="h-[320px] md:h-[420px]"
                        src="/images/all-service/pregnancy/normal-and-caesarean-delivery.png"
                        alt="Normal and caesarean delivery"
                    />
                </Wrapper>
            </Section>

            {/* Understanding Both Options */}
            <Section className="bg-white">
                <Wrapper className="grid lg:grid-cols-2 gap-12 items-center">
                    <SectionImage
                        className="h-[300px] md:h-[400px] order-2 lg:order-1"
                        src="/images/all-service/pregnancy/understanding-normal-and-caesarean-delivery.png"
                        alt="Understanding normal and caesarean delivery"
                    />
                    <div className="order-1 lg:order-2">
                        <Heading>Understanding Normal &amp; Caesarean Delivery</Heading>
                        <Subheading className="mt-3 lg:!text-base !text-zinc-600 leading-relaxed">
                            Normal delivery, also known as vaginal birth, is the natural process in which the
                            baby is delivered through the birth canal. Caesarean delivery, commonly called
                            C-section, is a surgical procedure where the baby is delivered through incisions
                            made in the mother&apos;s abdomen and uterus.
                        </Subheading>
                        <p className="mt-4 font-open-sans text-sm md:text-base text-zinc-600 leading-relaxed">
                            Both methods aim to ensure the safety and well-being of mother and baby. Healthcare
                            providers carefully evaluate maternal and fetal health before deciding the safest
                            delivery method for each pregnancy.
                        </p>
                    </div>
                </Wrapper>
            </Section>

            {/* Normal Delivery */}
            <Section className="bg-fun-blue">
                <Wrapper>
                    <div className="max-w-2xl">
                        <Heading>What Happens During Normal Delivery?</Heading>
                        <Subheading>
                            Normal delivery is the most common and natural method of childbirth, occurring in
                            three distinct stages.
                        </Subheading>
                    </div>

                    <div className="mt-10 grid lg:grid-cols-2 gap-10 items-start">
                        <div className="space-y-5">
                            {normalStages.map((item, idx) => (
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

                            <p className="font-open-sans text-sm md:text-base text-zinc-600 leading-relaxed pt-2">
                                Doctors and medical staff continuously monitor both mother and baby during labor
                                to ensure a safe and healthy childbirth experience. Labor duration and intensity
                                can vary for every woman.
                            </p>
                        </div>

                        <div>
                            <SectionImage
                                className="h-[260px] md:h-[340px]"
                                src="/images/all-service/pregnancy/benefits-of-normal-delivery.png"
                                alt="Benefits of normal delivery"
                            />
                            <div className="mt-6 bg-white rounded-xl p-6 shadow-sm">
                                <h3 className="font-montserrat text-lg font-bold text-secondry-color">
                                    Benefits of Normal Delivery
                                </h3>
                                <ul className="mt-4 space-y-2">
                                    {normalBenefits.map((item, idx) => (
                                        <li
                                            key={idx}
                                            className="flex items-center gap-3 font-open-sans text-sm text-zinc-600"
                                        >
                                            <span className="w-2 h-2 rounded-full bg-primary-color flex-shrink-0" />
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </Wrapper>
            </Section>

            {/* Caesarean Section */}
            <Section className="bg-white">
                <Wrapper className="grid lg:grid-cols-2 gap-12 items-center">
                    <div>
                        <Heading>Understanding Caesarean Section Delivery</Heading>
                        <Subheading>
                            A C-section is a surgical procedure performed when vaginal delivery may not be safe
                            for the mother or baby — either planned in advance or performed as an emergency
                            during labor.
                        </Subheading>
                        <p className="mt-4 font-open-sans text-sm md:text-base text-zinc-600 leading-relaxed">
                            Anesthesia numbs the lower part of the body before the doctor makes incisions in the
                            abdomen and uterus to safely deliver the baby. Once the baby and placenta are
                            delivered, the incisions are carefully closed with stitches or staples.
                        </p>

                        <div className="mt-6">
                            <h3 className="font-montserrat text-base font-bold text-secondry-color">
                                A C-section may be recommended for:
                            </h3>
                            <div className="mt-4 grid sm:grid-cols-2 gap-3">
                                {cSectionReasons.map((item, idx) => (
                                    <div
                                        key={idx}
                                        className="flex items-center gap-3 bg-fun-blue rounded-lg px-4 py-3"
                                    >
                                        <span className="w-2 h-2 rounded-full bg-primary-color flex-shrink-0" />
                                        <span className="font-open-sans text-sm text-zinc-700">{item}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    <SectionImage
                        className="h-[320px] md:h-[520px]"
                        src="/images/all-service/pregnancy/understanding-caesarean-section-delivery.png"
                        alt="Understanding caesarean section delivery"
                    />
                </Wrapper>
            </Section>

            {/* Recovery & Care */}
            <Section className="bg-fun-blue">
                <Wrapper>
                    <div className="max-w-2xl mx-auto text-center">
                        <Heading>Recovery &amp; Care After Delivery</Heading>
                        <Subheading className="mx-auto">
                            Recovery after childbirth is an important part of maternal care, whether the
                            delivery is normal or caesarean. Every mother&apos;s recovery journey is different,
                            and proper medical guidance helps ensure safe healing.
                        </Subheading>
                    </div>

                    <div className="mt-12 grid md:grid-cols-3 gap-8">
                        {recoveryCards.map((item, idx) => (
                            <div key={idx} className="group">
                                <SectionImage
                                    className="h-[220px]"
                                    src={item.image}
                                    alt={item.title}
                                />
                                <h3 className="mt-5 font-montserrat text-xl font-bold text-secondry-color">
                                    {item.title}
                                </h3>
                                <p className="mt-2 font-open-sans text-sm text-zinc-600 leading-relaxed">
                                    {item.desc}
                                </p>
                            </div>
                        ))}
                    </div>

                    <p className="mt-10 max-w-3xl mx-auto text-center font-open-sans text-sm md:text-base text-zinc-600 leading-relaxed">
                        Healthcare providers also monitor mothers for signs of complications such as
                        infections, excessive bleeding, or postpartum depression — ensuring every recovery is
                        supported with proper medical guidance.
                    </p>
                </Wrapper>
            </Section>

            {/* Choosing the Right Method / CTA */}
            <Section className="bg-white">
                <Wrapper>
                    <div className="rounded-2xl bg-secondry-color px-6 md:px-12 py-12 md:py-16 grid lg:grid-cols-2 gap-10 items-center">
                        <div>
                            <h2 className="font-montserrat text-2xl md:text-3xl lg:text-4xl font-bold text-white leading-[1.3]">
                                Choosing the Right Delivery Method
                            </h2>
                            <p className="mt-4 font-open-sans text-sm md:text-base text-zinc-200 leading-relaxed">
                                The choice between normal and caesarean delivery depends on maternal health, fetal
                                condition, previous pregnancy history, and labor progress. In many cases, doctors
                                encourage normal delivery when it is safe for both mother and baby.
                            </p>
                            <p className="mt-4 font-open-sans text-sm md:text-base text-zinc-200 leading-relaxed">
                                Some women who previously had a caesarean delivery may also be eligible for
                                Vaginal Birth After Caesarean (VBAC), depending on their medical condition and
                                pregnancy history. With the right medical support, both delivery methods can lead
                                to a safe and healthy birth experience.
                            </p>
                            <div className="mt-8">
                                <ButtonPrimary>Schedule Your Consultation</ButtonPrimary>
                            </div>
                        </div>
                        <SectionImage
                            className="h-[260px] md:h-[360px] !bg-white/10"
                            src="/images/all-service/pregnancy/consultation-for-delivery-method-planning.png"
                            alt="Consultation for delivery method planning"
                        />
                    </div>
                </Wrapper>
            </Section>
        </>
    )
}