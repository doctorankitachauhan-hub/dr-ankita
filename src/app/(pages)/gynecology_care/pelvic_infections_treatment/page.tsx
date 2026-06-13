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
    { title: 'Pelvic Pain', desc: 'Lower abdominal or pelvic pain that may range from mild to severe.' },
    { title: 'Abnormal Discharge', desc: 'Vaginal discharge with an unpleasant smell, different from your normal pattern.' },
    { title: 'Fever or Chills', desc: 'A sign that the body is fighting an infection in the reproductive organs.' },
    { title: 'Pain During Intercourse', desc: 'Discomfort or pain during sexual intercourse.' },
    { title: 'Burning Urination', desc: 'A burning sensation during urination, often mistaken for a UTI.' },
    { title: 'Irregular Bleeding', desc: 'Menstrual bleeding that becomes irregular or unpredictable.' },
    { title: 'Fatigue or Nausea', desc: 'General tiredness or nausea accompanying other symptoms.' },
    { title: 'Mild or No Symptoms', desc: 'Some women experience only mild signs, leading to late diagnosis.' },
]

const causes = [
    'Sexually transmitted infections (chlamydia, gonorrhea)',
    'Bacteria spreading from the vagina or cervix',
    'Untreated vaginal infections',
    'Multiple or new sexual partners',
    'Previous history of pelvic infections',
    'Lack of timely medical care',
]

const diagnosisSteps = [
    {
        title: 'Medical History & Exam',
        desc: 'A detailed medical history and physical examination to understand symptoms and risk factors.',
    },
    {
        title: 'Lab & Imaging Tests',
        desc: 'Pelvic examinations, blood tests, urine tests, vaginal swab testing, or ultrasound scans to identify the infection.',
    },
    {
        title: 'Antibiotic Treatment',
        desc: 'A combination of antibiotics is usually started as soon as the condition is suspected, targeting different bacteria.',
    },
    {
        title: 'Complete the Course',
        desc: 'It is important to finish the full medication course — stopping early may allow the infection to return or worsen.',
    },
    {
        title: 'Supportive Care',
        desc: 'Pain management, rest, hydration, follow-up visits, and partner testing help prevent reinfection.',
    },
]

const advancedCare = [
    {
        title: 'Hospitalization',
        desc: 'May be required for high fever, severe abdominal pain, vomiting, pregnancy-related complications, or no improvement with antibiotics.',
    },
    {
        title: 'Laparoscopy',
        desc: 'A minimally invasive procedure used to drain abscesses, remove scar tissue, or evaluate damage to pelvic organs.',
    },
    {
        title: 'Surgical Treatment',
        desc: 'Recommended only when absolutely necessary, if antibiotics are not effective or complications become severe.',
    },
    {
        title: 'Follow-Up Care',
        desc: 'Regular follow-up ensures the infection has fully resolved and reduces the risk of future complications.',
    },
]

const warningSigns = [
    'Persistent pelvic pain',
    'Unusual vaginal discharge',
    'Fever or chills',
    'Painful intercourse',
    'Irregular bleeding',
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
                            Pelvic Infections Treatment
                        </h1>
                        <p className="mt-4 font-open-sans text-base md:text-lg text-zinc-600 leading-relaxed">
                            Pelvic infections affect the uterus, fallopian tubes, ovaries, and surrounding
                            tissues. With early diagnosis and timely treatment, most infections can be treated
                            successfully and long-term complications avoided.
                        </p>
                        <div className="mt-8 flex flex-wrap gap-4">
                            <ButtonPrimary>Book a Consultation</ButtonPrimary>
                        </div>
                    </div>
                    <ImagePlaceholder className="h-[320px] md:h-[420px]" />
                </Wrapper>
            </Section>

            {/* Understanding Pelvic Infections */}
            <Section className="bg-white">
                <Wrapper className="grid lg:grid-cols-2 gap-12 items-center">
                    <ImagePlaceholder className="h-[300px] md:h-[400px] order-2 lg:order-1" />
                    <div className="order-1 lg:order-2">
                        <Heading>Understanding Pelvic Infections</Heading>
                        <Subheading className="mt-3 lg:!text-base !text-zinc-600 leading-relaxed">
                            One of the most common pelvic infections is Pelvic Inflammatory Disease (PID), which
                            develops when bacteria spread from the vagina or cervix into the upper reproductive
                            tract.
                        </Subheading>
                        <p className="mt-4 font-open-sans text-sm md:text-base text-zinc-600 leading-relaxed">
                            Infections can range from mild to severe and may sometimes develop without
                            noticeable symptoms. If left untreated, they can lead to infertility, ectopic
                            pregnancy, chronic pelvic pain, and damage to reproductive organs — making early
                            diagnosis and timely treatment essential.
                        </p>
                    </div>
                </Wrapper>
            </Section>

            {/* Symptoms */}
            <Section className="bg-fun-blue">
                <Wrapper>
                    <div className="max-w-2xl">
                        <Heading>Common Symptoms of Pelvic Infections</Heading>
                        <Subheading>
                            Some women experience only mild symptoms, which is why pelvic infections are
                            sometimes ignored or diagnosed late. Seeking medical care early helps prevent the
                            infection from becoming severe.
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
                </Wrapper>
            </Section>

            {/* Causes */}
            <Section className="bg-white">
                <Wrapper className="grid lg:grid-cols-2 gap-12 items-center">
                    <div>
                        <Heading>Common Causes of Pelvic Infections</Heading>
                        <Subheading>
                            Pelvic infections are commonly caused by bacterial infections, including sexually
                            transmitted infections. In some cases, bacteria from the normal vaginal environment
                            may also spread into the reproductive organs.
                        </Subheading>

                        <div className="mt-6 space-y-3">
                            {causes.map((item, idx) => (
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

                    <ImagePlaceholder className="h-[320px] md:h-[480px]" />
                </Wrapper>
            </Section>

            {/* Diagnosis & Treatment */}
            <Section className="bg-fun-blue">
                <Wrapper>
                    <div className="max-w-2xl mx-auto text-center">
                        <Heading>Diagnosis &amp; Medical Treatment</Heading>
                        <Subheading className="mx-auto">
                            Diagnosis usually begins with a detailed medical history and physical examination,
                            followed by targeted testing and treatment to resolve the infection effectively.
                        </Subheading>
                    </div>

                    <div className="mt-12 grid lg:grid-cols-2 gap-10 items-center">
                        <ImagePlaceholder className="h-[300px] md:h-[420px] order-2 lg:order-1" />

                        <div className="order-1 lg:order-2 space-y-5">
                            {diagnosisSteps.map((item, idx) => (
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

            {/* Advanced Care & Surgical Options */}
            <Section className="bg-white">
                <Wrapper>
                    <div className="max-w-2xl">
                        <Heading>Advanced Care &amp; Surgical Options</Heading>
                        <Subheading>
                            Most pelvic infections improve with medications and proper medical care. In rare
                            cases, severe infections may require advanced or surgical treatment.
                        </Subheading>
                    </div>

                    <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {advancedCare.map((item, idx) => (
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
                </Wrapper>
            </Section>

            {/* Importance of Early Treatment / CTA */}
            <Section className="bg-white">
                <Wrapper>
                    <div className="rounded-2xl bg-secondry-color px-6 md:px-12 py-12 md:py-16 grid lg:grid-cols-2 gap-10 items-center">
                        <div>
                            <h2 className="font-montserrat text-2xl md:text-3xl lg:text-4xl font-bold text-white leading-[1.3]">
                                The Importance of Early Treatment
                            </h2>
                            <p className="mt-4 font-open-sans text-sm md:text-base text-zinc-200 leading-relaxed">
                                Delayed treatment can increase the risk of infertility, chronic pelvic pain, and
                                complications during future pregnancies. Seek medical attention if you experience:
                            </p>
                            <ul className="mt-5 grid sm:grid-cols-2 gap-2">
                                {warningSigns.map((item, idx) => (
                                    <li
                                        key={idx}
                                        className="flex items-center gap-2 font-open-sans text-sm text-zinc-100"
                                    >
                                        <span className="w-1.5 h-1.5 rounded-full bg-white flex-shrink-0" />
                                        {item}
                                    </li>
                                ))}
                            </ul>
                            <p className="mt-5 font-open-sans text-sm md:text-base text-zinc-200 leading-relaxed">
                                With timely diagnosis, proper antibiotics, and supportive care, most pelvic
                                infections can be treated successfully.
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