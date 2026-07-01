import { Section, Wrapper, Heading, Subheading, ButtonPrimary } from '@/utils/Section'
import React from 'react'

const fibroidSymptoms = [
    'Heavy menstrual bleeding',
    'Pelvic pain',
    'Pressure',
    'Frequent urination',
    'Fertility issues',
]

const conditions = [
    {
        title: 'Uterine Fibroids',
        subtitle: 'Laparoscopic Myomectomy',
        desc: 'Fibroids are non-cancerous growths that develop in or around the uterus. Laparoscopic myomectomy removes fibroids while preserving the uterus — an option often preferred by women who wish to maintain their fertility or avoid a hysterectomy. The minimally invasive approach allows for precise removal of fibroids with reduced blood loss and quicker recovery compared to traditional surgery.',
        note: 'For selected patients, laparoscopic surgery can significantly improve symptoms and enhance quality of life while preserving reproductive health.',
    },
    {
        title: 'Ovarian Cysts',
        subtitle: 'Laparoscopic Ovarian Cystectomy',
        desc: 'Ovarian cysts are fluid-filled sacs that develop on or within the ovaries. While many cysts resolve naturally, some may grow larger, cause pain, or affect ovarian function, requiring surgical treatment. Laparoscopic ovarian cystectomy allows the surgeon to remove the cyst while preserving healthy ovarian tissue whenever possible. The procedure is commonly recommended for persistent, large, painful, or suspicious cysts that require further evaluation.',
        note: 'This minimally invasive approach helps reduce postoperative discomfort, lowers the risk of complications, and enables women to return to their normal activities more quickly. Preserving ovarian function remains a key priority, particularly for women planning future pregnancies.',
    },
    {
        title: 'Endometriosis',
        subtitle: 'Laparoscopic Management',
        desc: 'Endometriosis is a condition in which tissue similar to the lining of the uterus grows outside the uterus, often affecting the ovaries, fallopian tubes, and pelvic tissues. It can cause severe menstrual pain, chronic pelvic pain, painful intercourse, and fertility challenges. Laparoscopy is considered one of the most effective methods for diagnosing and treating endometriosis. During the procedure, the surgeon can identify and remove or destroy endometrial implants, scar tissue, and adhesions that may be contributing to symptoms.',
        note: 'By reducing the extent of disease and restoring normal pelvic anatomy, laparoscopic treatment can help relieve pain, improve fertility outcomes, and enhance overall quality of life for women living with endometriosis.',
    },
]

const benefits = [
    'Less postoperative pain',
    'Minimal scarring',
    'Reduced blood loss',
    'Lower risk of infection',
    'Shorter hospital stays',
    'Faster recovery',
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
                            Laparoscopic Surgeries for Fibroids, Cysts &amp; Endometriosis
                        </h1>
                        <p className="mt-4 font-open-sans text-base md:text-lg text-zinc-600 leading-relaxed">
                            Laparoscopic surgery is a minimally invasive surgical technique used to diagnose and
                            treat various gynecological conditions, offering smaller scars, less pain, shorter
                            hospital stays, and faster recovery compared to traditional open surgery.
                        </p>
                        <div className="mt-8 flex flex-wrap gap-4">
                            <ButtonPrimary>Book a Consultation</ButtonPrimary>
                        </div>
                    </div>
                    <ImagePlaceholder className="h-[320px] md:h-[420px]" />
                </Wrapper>
            </Section>

            {/* What Is Laparoscopic Gynecological Surgery */}
            <Section className="bg-white">
                <Wrapper className="grid lg:grid-cols-2 gap-12 items-center">
                    <ImagePlaceholder className="h-[300px] md:h-[400px] order-2 lg:order-1" />
                    <div className="order-1 lg:order-2">
                        <Heading>What Is Laparoscopic Gynecological Surgery?</Heading>
                        <Subheading className="mt-3 lg:!text-base !text-zinc-600 leading-relaxed">
                            The procedure is performed through small incisions in the abdomen using a
                            laparoscope — a thin instrument equipped with a camera and light source. This allows
                            the surgeon to view the pelvic organs clearly and perform precise surgical procedures
                            with minimal tissue damage.
                        </Subheading>
                        <p className="mt-4 font-open-sans text-sm md:text-base text-zinc-600 leading-relaxed">
                            It is widely used for the treatment of fibroids, ovarian cysts, endometriosis, and
                            other pelvic conditions affecting women&apos;s reproductive health.
                        </p>
                    </div>
                </Wrapper>
            </Section>

            {/* Fibroid Symptoms */}
            <Section className="bg-fun-blue">
                <Wrapper>
                    <div className="max-w-2xl">
                        <Heading>Symptoms of Uterine Fibroids</Heading>
                        <Subheading>
                            Fibroids are non-cancerous growths that develop in or around the uterus. When they
                            become large or symptomatic, surgical treatment may be recommended.
                        </Subheading>
                    </div>

                    <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
                        {fibroidSymptoms.map((symptom, idx) => (
                            <div
                                key={idx}
                                className="bg-white rounded-xl p-5 shadow-sm hover:shadow-md transition-all duration-300 ease-linear hover:-translate-y-1 text-center"
                            >
                                <div className="w-10 h-10 mx-auto rounded-full bg-primary-color text-white font-montserrat font-bold flex items-center justify-center text-sm">
                                    {String(idx + 1).padStart(2, '0')}
                                </div>
                                <h3 className="mt-3 font-montserrat text-base font-bold text-secondry-color leading-snug">
                                    {symptom}
                                </h3>
                            </div>
                        ))}
                    </div>
                </Wrapper>
            </Section>

            {/* Conditions Treated */}
            <Section className="bg-white">
                <Wrapper>
                    <div className="max-w-2xl mx-auto text-center">
                        <Heading>Conditions We Treat</Heading>
                        <Subheading className="mx-auto">
                            Laparoscopic surgery is used to diagnose and treat a range of gynecological
                            conditions, with each approach tailored to the condition and the individual.
                        </Subheading>
                    </div>

                    <div className="mt-12 flex flex-col gap-14">
                        {conditions.map((item, idx) => (
                            <div
                                key={idx}
                                className={`grid lg:grid-cols-2 gap-10 items-center ${idx % 2 === 1 ? 'lg:[&>*:first-child]:order-2' : ''
                                    }`}
                            >
                                <ImagePlaceholder className="h-[280px] md:h-[340px]" />
                                <div>
                                    <span className="inline-block text-xs md:text-sm font-semibold tracking-wider uppercase text-primary-color bg-fun-blue px-3 py-1 rounded-full">
                                        {item.subtitle}
                                    </span>
                                    <h3 className="mt-4 font-montserrat text-xl md:text-2xl font-bold text-secondry-color">
                                        {item.title}
                                    </h3>
                                    <p className="mt-3 font-open-sans text-sm md:text-base text-zinc-600 leading-relaxed">
                                        {item.desc}
                                    </p>
                                    <p className="mt-3 font-open-sans text-sm md:text-base text-zinc-600 leading-relaxed">
                                        {item.note}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </Wrapper>
            </Section>

            {/* Benefits and Recovery */}
            <Section className="bg-fun-blue">
                <Wrapper>
                    <div className="max-w-2xl mx-auto text-center">
                        <Heading>Benefits and Recovery After Laparoscopic Surgery</Heading>
                        <Subheading className="mx-auto">
                            Laparoscopic surgery has become a preferred treatment option for many gynecological
                            conditions because of its numerous advantages over traditional open surgery.
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
                        Most patients experience shorter hospital stays and faster recovery, allowing them to
                        return to daily activities within a few weeks. Recovery time may vary depending on the
                        type of procedure performed and the individual&apos;s overall health. Regular follow-up
                        appointments help monitor healing and ensure the best possible outcomes.
                    </p>
                </Wrapper>
            </Section>

            {/* CTA */}
            <Section className="bg-white">
                <Wrapper>
                    <div className="rounded-2xl bg-secondry-color px-6 md:px-12 py-12 md:py-16 grid lg:grid-cols-2 gap-10 items-center">
                        <div>
                            <h2 className="font-montserrat text-2xl md:text-3xl lg:text-4xl font-bold text-white leading-[1.3]">
                                An Effective, Minimally Invasive Solution
                            </h2>
                            <p className="mt-4 font-open-sans text-sm md:text-base text-zinc-200 leading-relaxed">
                                With advanced surgical techniques and personalized care, laparoscopic surgery
                                provides an effective, safe, and minimally invasive solution for treating
                                fibroids, ovarian cysts, and endometriosis while supporting long-term
                                gynecological health.
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