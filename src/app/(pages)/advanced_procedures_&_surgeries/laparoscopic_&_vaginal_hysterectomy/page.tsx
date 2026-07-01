import { Section, Wrapper, Heading, Subheading, ButtonPrimary } from '@/utils/Section'
import React from 'react'

const conditionsLeadingToHysterectomy = [
    'Uterine fibroids',
    'Heavy menstrual bleeding',
    'Endometriosis',
    'Uterine prolapse',
    'Chronic pelvic pain',
    'Certain gynecological cancers',
]

const approaches = [
    {
        title: 'Laparoscopic Hysterectomy',
        desc: 'A minimally invasive procedure performed through a few small incisions in the abdomen. A laparoscope, which is a thin instrument with a camera and light, allows the surgeon to view the pelvic organs and remove the uterus with precision. This approach is often recommended for women with fibroids, endometriosis, abnormal uterine bleeding, or other conditions requiring uterine removal. The procedure may involve removing only the uterus or, when medically necessary, additional structures such as the cervix, fallopian tubes, or ovaries.',
        note: 'Because the surgery is performed through small incisions, patients typically experience less pain, reduced blood loss, and a quicker return to normal activities compared to traditional open surgery.',
    },
    {
        title: 'Vaginal Hysterectomy',
        desc: 'Involves removing the uterus through the vagina without making any abdominal incisions. It is commonly recommended for conditions such as uterine prolapse, abnormal uterine bleeding, or selected benign gynecological conditions. The absence of external cuts makes vaginal hysterectomy one of the least invasive hysterectomy techniques.',
        note: 'It generally results in less postoperative discomfort, shorter hospital stays, and faster recovery. Many women are able to resume their regular daily activities sooner compared to more extensive surgical approaches.',
    },
]

const benefits = [
    'Smaller or no visible scars',
    'Less postoperative pain and discomfort',
    'Reduced blood loss during surgery',
    'Lower risk of infection and complications',
    'Shorter hospital stay',
    'Faster recovery and return to daily activities',
    'Improved overall patient comfort and satisfaction',
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
                            Laparoscopic &amp; Vaginal Hysterectomy
                        </h1>
                        <p className="mt-4 font-open-sans text-base md:text-lg text-zinc-600 leading-relaxed">
                            Modern surgical techniques have made hysterectomy safer and less invasive than
                            traditional open surgery. Laparoscopic and vaginal hysterectomy are commonly
                            preferred because they offer faster recovery, less discomfort, and smaller or no
                            visible scars.
                        </p>
                        <div className="mt-8 flex flex-wrap gap-4">
                            <ButtonPrimary>Book a Consultation</ButtonPrimary>
                        </div>
                    </div>
                    <ImagePlaceholder className="h-[320px] md:h-[420px]" />
                </Wrapper>
            </Section>

            {/* Understanding Hysterectomy */}
            <Section className="bg-white">
                <Wrapper className="grid lg:grid-cols-2 gap-12 items-center">
                    <ImagePlaceholder className="h-[300px] md:h-[400px] order-2 lg:order-1" />
                    <div className="order-1 lg:order-2">
                        <Heading>Understanding Hysterectomy</Heading>
                        <Subheading className="mt-3 lg:!text-base !text-zinc-600 leading-relaxed">
                            A hysterectomy is a surgical procedure performed to remove the uterus. After a
                            hysterectomy, menstrual periods stop, and pregnancy is no longer possible.
                        </Subheading>
                        <p className="mt-4 font-open-sans text-sm md:text-base text-zinc-600 leading-relaxed">
                            It may be recommended for women experiencing the following conditions:
                        </p>
                        <div className="mt-4 flex flex-wrap gap-2">
                            {conditionsLeadingToHysterectomy.map((condition, idx) => (
                                <span
                                    key={idx}
                                    className="inline-block px-4 py-1.5 rounded-full bg-fun-blue text-secondry-color font-open-sans text-sm font-semibold"
                                >
                                    {condition}
                                </span>
                            ))}
                        </div>
                    </div>
                </Wrapper>
            </Section>

            {/* Approaches */}
            <Section className="bg-fun-blue">
                <Wrapper>
                    <div className="max-w-2xl mx-auto text-center">
                        <Heading>Two Minimally Invasive Approaches</Heading>
                        <Subheading className="mx-auto">
                            The choice between vaginal and laparoscopic hysterectomy depends on factors such as
                            the size of the uterus, the underlying condition, previous surgeries, and the
                            patient&apos;s overall health.
                        </Subheading>
                    </div>

                    <div className="mt-12 grid md:grid-cols-2 gap-8">
                        {approaches.map((item, idx) => (
                            <div key={idx} className="bg-white rounded-2xl p-6 shadow-sm">
                                <ImagePlaceholder className="h-[220px]" />
                                <h3 className="mt-5 font-montserrat text-xl font-bold text-secondry-color">
                                    {item.title}
                                </h3>
                                <p className="mt-2 font-open-sans text-sm text-zinc-600 leading-relaxed">
                                    {item.desc}
                                </p>
                                <p className="mt-2 font-open-sans text-sm text-zinc-600 leading-relaxed">
                                    {item.note}
                                </p>
                            </div>
                        ))}
                    </div>
                </Wrapper>
            </Section>

            {/* Benefits */}
            <Section className="bg-white">
                <Wrapper>
                    <div className="max-w-2xl mx-auto text-center">
                        <Heading>Benefits of Minimally Invasive Hysterectomy</Heading>
                        <Subheading className="mx-auto">
                            Both laparoscopic and vaginal hysterectomy offer several advantages over traditional
                            abdominal surgery. These procedures are designed to reduce surgical trauma while
                            providing effective treatment for a wide range of gynecological conditions.
                        </Subheading>
                    </div>

                    <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-5xl mx-auto">
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
                        These benefits make minimally invasive hysterectomy a preferred option for many women
                        who require surgical treatment.
                    </p>
                </Wrapper>
            </Section>

            {/* Recovery and Postoperative Care */}
            <Section className="bg-fun-blue">
                <Wrapper className="grid lg:grid-cols-2 gap-12 items-center">
                    <div>
                        <Heading>Recovery and Postoperative Care</Heading>
                        <Subheading className="mt-3">
                            Recovery after laparoscopic or vaginal hysterectomy is generally quicker than
                            recovery after open abdominal surgery. Most women can return to light daily
                            activities within a few days, although complete healing may take several weeks.
                        </Subheading>
                        <p className="mt-4 font-open-sans text-sm md:text-base text-zinc-600 leading-relaxed">
                            Patients may experience mild discomfort, fatigue, or light vaginal discharge during
                            the recovery period. Following the surgeon&apos;s instructions regarding rest,
                            physical activity, wound care, and follow-up visits is important for optimal healing.
                        </p>
                        <p className="mt-4 font-open-sans text-sm md:text-base text-zinc-600 leading-relaxed">
                            Regular postoperative evaluations help monitor recovery and address any concerns.
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
                                Safe, Effective Surgical Care
                            </h2>
                            <p className="mt-4 font-open-sans text-sm md:text-base text-zinc-200 leading-relaxed">
                                With proper care and expert surgical management, laparoscopic and vaginal
                                hysterectomy provide safe and effective solutions for treating a variety of
                                gynecological conditions while supporting long-term health and well-being.
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