import { Section, Wrapper, Heading, Subheading, ButtonPrimary } from '@/utils/Section'
import Image from 'next/image'
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

const consultationCovers = [
    {
        title: 'Health Screenings',
        desc: 'Basic health screenings and blood tests to check for infections, diabetes, thyroid disorders, anemia, or STIs.',
    },
    {
        title: 'Genetic Screening',
        desc: 'May be advised if there is a family history of inherited conditions, helping identify possible genetic risks early.',
    },
    {
        title: 'Vaccination Review',
        desc: 'Your doctor reviews vaccination status to ensure protection against infections that can affect pregnancy.',
    },
    {
        title: 'Medication Adjustment',
        desc: 'Certain medications may need adjustment before conception to ensure they are safe during pregnancy.',
    },
    {
        title: 'Fertility Awareness',
        desc: 'Guidance on menstrual cycle tracking and the best time to try for conception, with open discussion of concerns.',
    },
]

const lifestyleChanges = [
    {
        title: 'Balanced Nutrition',
        desc: 'A diet rich in fruits, vegetables, whole grains, proteins, and healthy fats — along with prenatal vitamins containing folic acid to reduce the risk of birth defects.',
    },
    {
        title: 'Healthy Body Weight',
        desc: 'Being overweight or underweight may affect hormone balance and fertility, so maintaining a healthy weight is important.',
    },
    {
        title: 'Regular Activity',
        desc: 'Walking, yoga, or light exercise can improve overall health and reproductive wellness.',
    },
    {
        title: 'Avoiding Harmful Habits',
        desc: 'Smoking, alcohol, and recreational drugs should be avoided as they increase the risk of miscarriage and developmental problems.',
    },
    {
        title: 'Rest & Stress Reduction',
        desc: 'Reducing stress and getting proper sleep supports emotional and hormonal health during pregnancy planning.',
    },
]

const medicalConditions = [
    'Diabetes',
    'Thyroid disorders',
    'High blood pressure',
    'Asthma',
    'Kidney disease',
    'Heart disease',
]

const benefits = [
    {
        title: 'Physical & Emotional Readiness',
        desc: 'Helps couples prepare physically, mentally, and emotionally for parenthood.',
        image: "/images/all-service/pregnancy/img-6.jpg"
    },
    {
        title: 'Healthier Pregnancy Outcomes',
        desc: 'Improves fertility health, supports healthy fetal development, and lowers the risk of complications during pregnancy and delivery.',
        image: "/images/all-service/pregnancy/img-7.jpg"
    },
    {
        title: 'Time to Prepare',
        desc: 'Gives enough time to make positive lifestyle changes, complete vaccinations, and address medical concerns before conception.',
        image: "/images/all-service/pregnancy/img-8.jpg"
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
                            Family Planning
                        </span>
                        <h1 className="mt-5 font-montserrat text-3xl md:text-4xl lg:text-[44px] leading-[1.2] font-bold text-secondry-color">
                            Preconception Counselling &amp; Planning
                        </h1>
                        <p className="mt-4 font-open-sans text-base md:text-lg text-zinc-600 leading-relaxed">
                            A healthy pregnancy begins even before conception. Preconception counselling helps
                            couples improve overall health, identify possible medical concerns, and prepare
                            physically and emotionally for a safe pregnancy and healthy baby.
                        </p>
                        <div className="mt-8 flex flex-wrap gap-4">
                            <ButtonPrimary>Book a Consultation</ButtonPrimary>
                        </div>
                    </div>

                    <div className="relative w-full h-[350px] md:h-[520px] rounded-2xl overflow-hidden">
                        <Image
                            src="/images/all-service/pregnancy/img-1.jpg"
                            alt="Preconception Counselling and Planning"
                            fill
                            className="object-cover object-top"
                            priority
                        />
                    </div>
                </Wrapper>
            </Section>

            {/* Why It's Important */}
            <Section className="bg-white">
                <Wrapper className="grid lg:grid-cols-2 gap-12 items-center">
                    <div className="relative w-full h-[320px] md:h-[450px] rounded-2xl overflow-hidden order-2 lg:order-1">
                        <Image
                            src="/images/all-service/pregnancy/img-2.jpg"
                            alt="Why is Preconception Counselling Important?"
                            fill
                            className="object-cover object-top"
                        />
                    </div>

                    <div className="order-1 lg:order-2">
                        <Heading>Why is Preconception Counselling Important?</Heading>
                        <Subheading className="mt-3 lg:!text-base !text-zinc-600 leading-relaxed">
                            Many health conditions, lifestyle habits, and nutritional deficiencies can affect
                            fertility and pregnancy outcomes. Counselling helps couples understand how existing
                            medical conditions, medications, and family history may impact pregnancy.
                        </Subheading>
                        <p className="mt-4 font-open-sans text-sm md:text-base text-zinc-600 leading-relaxed">
                            This counselling is especially beneficial for women with irregular periods,
                            previous miscarriages, chronic health conditions, or fertility concerns — but even
                            healthy couples can benefit from proper pregnancy planning and medical guidance
                            before trying to conceive.
                        </p>
                    </div>
                </Wrapper>
            </Section>

            {/* What Happens During Counselling */}
            <Section className="bg-fun-blue">
                <Wrapper>
                    <div className="max-w-2xl">
                        <Heading>What Happens During Preconception Counselling?</Heading>
                        <Subheading>
                            The healthcare provider evaluates your overall health and discusses important
                            factors related to pregnancy — including medical history, reproductive health,
                            family history, lifestyle habits, and current medications.
                        </Subheading>
                    </div>

                    <div className="mt-10 grid lg:grid-cols-2 gap-10 items-center">
                        <div className="space-y-5">
                            {consultationCovers.map((item, idx) => (
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

                        <div className="relative w-full h-[350px] md:h-[520px] rounded-2xl overflow-hidden">
                            <Image
                                src="/images/all-service/pregnancy/img-3.jpg"
                                alt="What Happens During Preconception Counselling?"
                                fill
                                className="object-cover object-top"
                                priority
                            />
                        </div>
                    </div>
                </Wrapper>
            </Section>

            {/* Lifestyle Changes */}
            <Section className="bg-white">
                <Wrapper>
                    <div className="max-w-2xl mx-auto text-center">
                        <Heading>Lifestyle Changes for a Healthy Pregnancy</Heading>
                        <Subheading className="mx-auto">
                            Healthy habits before pregnancy can improve fertility and support the healthy
                            development of the baby — small changes made now can have long-term benefits.
                        </Subheading>
                    </div>

                    <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">

                        <div className="relative h-[260px] lg:col-span-1 sm:col-span-2 w-full rounded-2xl overflow-hidden">
                            <Image
                                src="/images/all-service/pregnancy/img-4.jpg"
                                alt="Lifestyle Changes for a Healthy Pregnancy"
                                fill
                                className="object-cover object-top"
                            />
                        </div>


                        {lifestyleChanges.map((item, idx) => (
                            <div
                                key={idx}
                                className="bg-fun-blue rounded-xl p-6 hover:shadow-md transition-all duration-300 ease-linear"
                            >
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

            {/* Managing Medical Conditions */}
            <Section className="bg-fun-blue">
                <Wrapper className="grid lg:grid-cols-2 gap-12 items-center">
                    <div>
                        <Heading>Managing Medical Conditions Before Pregnancy</Heading>
                        <Subheading>
                            Women with chronic health conditions should seek medical guidance before trying to
                            conceive. Counselling helps doctors create a safe pregnancy plan by adjusting
                            medications and monitoring health conditions, including:
                        </Subheading>

                        <div className="mt-6 grid sm:grid-cols-2 gap-3">
                            {medicalConditions.map((item, idx) => (
                                <div
                                    key={idx}
                                    className="flex items-center gap-3 bg-white rounded-lg px-4 py-3"
                                >
                                    <span className="w-2 h-2 rounded-full bg-primary-color flex-shrink-0" />
                                    <span className="font-open-sans text-sm text-zinc-700">{item}</span>
                                </div>
                            ))}
                        </div>

                        <p className="mt-6 font-open-sans text-sm md:text-base text-zinc-600 leading-relaxed">
                            Some medications may not be safe during pregnancy, so it&apos;s important not to stop
                            or change medicines without medical advice. If needed, genetic counselling and
                            testing can help couples understand inherited conditions and available options
                            before pregnancy.
                        </p>
                    </div>

                    <div className="relative w-full h-[350px] md:h-[520px] rounded-2xl overflow-hidden">
                        <Image
                            src="/images/all-service/pregnancy/img-5.jpg"
                            alt="Preconception Counselling and Planning"
                            fill
                            className="object-cover object-top"
                            priority
                        />
                    </div>
                </Wrapper>
            </Section>

            {/* Benefits / CTA */}
            <Section className="bg-white">
                <Wrapper>
                    <div className="max-w-2xl mx-auto text-center">
                        <Heading>Benefits of Preconception Planning</Heading>
                        <Subheading className="mx-auto">
                            Ideally, preconception counselling should begin at least three months before trying
                            to conceive — but it&apos;s never too early to start focusing on reproductive health
                            and future pregnancy goals.
                        </Subheading>
                    </div>

                    <div className="mt-12 grid md:grid-cols-3 gap-8">
                        {benefits.map((item, idx) => (
                            <div key={idx}>
                                <div className="relative w-full h-[240px] rounded-2xl overflow-hidden">
                                    <Image
                                        src={item.image}
                                        alt={item.title}
                                        fill
                                        className="object-cover object-top"
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

                    <div className="mt-14 rounded-2xl bg-secondry-color px-6 md:px-12 py-12 md:py-16 grid lg:grid-cols-2 gap-10 items-center">
                        <div>
                            <h2 className="font-montserrat text-2xl md:text-3xl lg:text-4xl font-bold text-white leading-[1.3]">
                                Start Your Pregnancy Journey with Confidence
                            </h2>
                            <p className="mt-4 font-open-sans text-sm md:text-base text-zinc-200 leading-relaxed">
                                With the right medical support and healthy lifestyle choices, preconception
                                counselling can help create a strong foundation for a safe pregnancy and a healthy
                                baby.
                            </p>
                            <div className="mt-8">
                                <ButtonPrimary>Schedule Your Consultation</ButtonPrimary>
                            </div>
                        </div>
                        <div className="relative w-full h-[260px] md:h-[400px] rounded-xl overflow-hidden">
                            <Image
                                src="/images/all-service/pregnancy/img-9.jpg"
                                alt="Start Your Pregnancy Journey with Confidence"
                                fill
                                className="object-cover object-top"
                            />
                        </div>
                    </div>
                </Wrapper>
            </Section>
        </>
    )
}