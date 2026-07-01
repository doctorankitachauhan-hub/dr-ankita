import { Section, Wrapper, Heading, Subheading, ButtonPrimary } from '@/utils/Section'
import React from 'react'

const conditionsTreated = [
    'Uterine polyps',
    'Submucosal fibroids',
    'Uterine septum or congenital uterine abnormalities',
    'Intrauterine adhesions (Asherman\u2019s syndrome)',
    'Abnormal uterine bleeding',
    'Retained pregnancy tissue',
    'Removal of displaced intrauterine devices (IUDs)',
]

const procedureSteps = [
    {
        title: 'Anesthesia',
        desc: 'Operative hysteroscopy is usually performed as a day-care procedure under local, regional, or general anesthesia, depending on the condition being treated and the complexity of the procedure.',
    },
    {
        title: 'Insertion & Visualization',
        desc: 'A hysteroscope is gently inserted through the cervix into the uterus. The uterine cavity is expanded using a sterile fluid to provide a clear view of the internal structures.',
    },
    {
        title: 'Treatment',
        desc: 'Specialized surgical instruments are then passed through the hysteroscope to remove polyps, fibroids, scar tissue, or other abnormalities. Because the procedure is performed through the natural opening of the cervix, there are no external cuts or scars.',
    },
]

const benefits = [
    'No abdominal incisions or visible scars',
    'Short hospital stay or same-day discharge',
    'Faster recovery and return to daily activities',
    'Reduced postoperative pain',
    'Accurate diagnosis and treatment in one procedure',
    'Improved fertility outcomes in selected cases',
]

const risks = [
    'Infection',
    'Bleeding',
    'Uterine perforation',
    'Reactions to anesthesia',
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
                            Gynecological Surgery
                        </span>
                        <h1 className="mt-5 font-montserrat text-3xl md:text-4xl lg:text-[44px] leading-[1.2] font-bold text-secondry-color">
                            Operative Hysteroscopy
                        </h1>
                        <p className="mt-4 font-open-sans text-base md:text-lg text-zinc-600 leading-relaxed">
                            Operative hysteroscopy is a minimally invasive gynecological procedure used to
                            diagnose and treat certain conditions inside the uterus, offering both diagnosis and
                            treatment in a single procedure.
                        </p>
                        <div className="mt-8 flex flex-wrap gap-4">
                            <ButtonPrimary>Book a Consultation</ButtonPrimary>
                        </div>
                    </div>
                    <ImagePlaceholder className="h-[320px] md:h-[420px]" />
                </Wrapper>
            </Section>

            {/* What Is Operative Hysteroscopy */}
            <Section className="bg-white">
                <Wrapper className="grid lg:grid-cols-2 gap-12 items-center">
                    <ImagePlaceholder className="h-[300px] md:h-[400px] order-2 lg:order-1" />
                    <div className="order-1 lg:order-2">
                        <Heading>What Is Operative Hysteroscopy?</Heading>
                        <Subheading className="mt-3 lg:!text-base !text-zinc-600 leading-relaxed">
                            During the procedure, a thin instrument called a hysteroscope is inserted through the
                            vagina and cervix into the uterus. The hysteroscope contains a light and camera,
                            allowing the doctor to view the uterine cavity clearly and perform necessary
                            treatments without making any external incisions.
                        </Subheading>
                        <p className="mt-4 font-open-sans text-sm md:text-base text-zinc-600 leading-relaxed">
                            Operative hysteroscopy is commonly recommended for women experiencing abnormal
                            uterine bleeding, uterine abnormalities, infertility-related concerns, or recurrent
                            pregnancy loss. It offers both diagnosis and treatment in a single procedure, helping
                            improve uterine health and reproductive outcomes.
                        </p>
                    </div>
                </Wrapper>
            </Section>

            {/* When Is It Recommended */}
            <Section className="bg-fun-blue">
                <Wrapper>
                    <div className="max-w-2xl">
                        <Heading>When Is Operative Hysteroscopy Recommended?</Heading>
                        <Subheading>
                            Operative hysteroscopy is used to treat a variety of conditions affecting the uterus.
                            It allows doctors to directly identify and remove abnormalities that may be causing
                            symptoms or fertility problems.
                        </Subheading>
                    </div>

                    <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        {conditionsTreated.map((condition, idx) => (
                            <div
                                key={idx}
                                className="bg-white rounded-xl p-5 shadow-sm hover:shadow-md transition-all duration-300 ease-linear hover:-translate-y-1"
                            >
                                <div className="w-10 h-10 rounded-full bg-primary-color text-white font-montserrat font-bold flex items-center justify-center text-sm">
                                    {String(idx + 1).padStart(2, '0')}
                                </div>
                                <h3 className="mt-3 font-montserrat text-base font-bold text-secondry-color leading-snug">
                                    {condition}
                                </h3>
                            </div>
                        ))}
                    </div>

                    <p className="mt-10 font-open-sans text-sm md:text-base text-zinc-600 leading-relaxed max-w-2xl">
                        The procedure is also frequently used as part of fertility evaluation and treatment when
                        abnormalities inside the uterus may be affecting conception or pregnancy outcomes.
                    </p>
                </Wrapper>
            </Section>

            {/* How the Procedure Is Performed */}
            <Section className="bg-white">
                <Wrapper className="grid lg:grid-cols-2 gap-12 items-center">
                    <div>
                        <Heading>How the Procedure Is Performed</Heading>
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
                            Most procedures are completed within a short period, and patients can often return
                            home the same day.
                        </p>
                    </div>

                    <ImagePlaceholder className="h-[320px] md:h-[420px]" />
                </Wrapper>
            </Section>

            {/* Benefits and Recovery */}
            <Section className="bg-fun-blue">
                <Wrapper>
                    <div className="max-w-2xl mx-auto text-center">
                        <Heading>Benefits and Recovery After Operative Hysteroscopy</Heading>
                        <Subheading className="mx-auto">
                            Operative hysteroscopy offers several advantages compared to traditional surgical
                            procedures. Since it is minimally invasive, recovery is generally faster, with less
                            discomfort and a lower risk of complications.
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

                    <p className="mt-10 font-open-sans text-sm md:text-base text-zinc-600 leading-relaxed max-w-2xl mx-auto text-center">
                        After the procedure, mild cramping, light bleeding, or spotting may occur for a few days.
                        Most women can resume normal activities within a short period, although doctors may
                        advise avoiding intercourse, swimming, or tampon use for a specific duration.
                    </p>
                </Wrapper>
            </Section>

            {/* Risks and Follow-Up Care */}
            <Section className="bg-white">
                <Wrapper className="grid lg:grid-cols-2 gap-12 items-center">
                    <div>
                        <Heading>Risks and Follow-Up Care</Heading>
                        <Subheading className="mt-3">
                            Operative hysteroscopy is generally considered a safe procedure when performed by an
                            experienced gynecologist. However, like any medical procedure, it carries a small
                            risk of complications such as:
                        </Subheading>
                        <div className="mt-6 flex flex-wrap gap-2">
                            {risks.map((risk, idx) => (
                                <span
                                    key={idx}
                                    className="inline-block px-4 py-1.5 rounded-full bg-fun-blue text-secondry-color font-open-sans text-sm font-semibold"
                                >
                                    {risk}
                                </span>
                            ))}
                        </div>
                        <p className="mt-6 font-open-sans text-sm md:text-base text-zinc-600 leading-relaxed">
                            Follow-up appointments are important to monitor healing and assess treatment
                            outcomes. Women undergoing the procedure for fertility-related concerns may also
                            receive additional guidance regarding future pregnancy planning or reproductive
                            treatments.
                        </p>
                    </div>

                    <ImagePlaceholder className="h-[320px] md:h-[420px]" />
                </Wrapper>
            </Section>

            {/* CTA */}
            <Section className="bg-white">
                <Wrapper>
                    <div className="rounded-2xl bg-secondry-color px-6 md:px-12 py-12 md:py-16 grid lg:grid-cols-2 gap-10 items-center">
                        <div>
                            <h2 className="font-montserrat text-2xl md:text-3xl lg:text-4xl font-bold text-white leading-[1.3]">
                                An Effective, Reliable Treatment Option
                            </h2>
                            <p className="mt-4 font-open-sans text-sm md:text-base text-zinc-200 leading-relaxed">
                                With proper evaluation, skilled surgical care, and appropriate follow-up,
                                operative hysteroscopy is an effective and reliable treatment option for many
                                uterine conditions, helping improve both gynecological health and reproductive
                                well-being.
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