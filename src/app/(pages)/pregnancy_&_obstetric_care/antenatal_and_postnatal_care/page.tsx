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

const antenatalFocus = [
  {
    title: 'Monitoring Mother & Baby',
    desc: 'Doctors monitor blood pressure, weight, fetal growth, and the baby\u2019s heartbeat at every visit.',
  },
  {
    title: 'Tests & Screenings',
    desc: 'Routine blood tests and ultrasounds help detect anemia, gestational diabetes, infections, or developmental concerns.',
  },
  {
    title: 'Nutrition & Lifestyle',
    desc: 'Guidance on healthy habits, nutrition, exercise, and prenatal vitamins like folic acid and iron supplements.',
  },
  {
    title: 'Vaccination & Medication Review',
    desc: 'Vaccination updates and medication reviews are part of routine care to ensure maternal and fetal safety.',
  },
  {
    title: 'Specialised Monitoring',
    desc: 'Extra care for women with diabetes, thyroid disorders, high blood pressure, or previous pregnancy complications.',
  },
  {
    title: 'Emotional Wellbeing',
    desc: 'Pregnancy can bring emotional changes, anxiety, and stress — mental health support is an important part of prenatal care.',
  },
]

const appointmentJourney = [
  {
    title: 'First Appointment',
    desc: 'A detailed review of medical history, menstrual history, family history, and lifestyle habits.',
  },
  {
    title: 'Routine Investigations',
    desc: 'Blood tests, urine tests, and ultrasound scans evaluate overall health, fetal development, placenta position, and due date.',
  },
  {
    title: 'Ongoing Monitoring',
    desc: 'As pregnancy progresses, visits become more frequent — tracking fetal movement, heartbeat, weight gain, and maternal health.',
  },
  {
    title: 'Preparation & Education',
    desc: 'Appointments offer space to discuss childbirth preparation, breastfeeding, nutrition, labor signs, and newborn care.',
  },
]

const postnatalCare = [
  {
    title: 'Physical Recovery',
    desc: 'Monitoring bleeding and healing after vaginal delivery or cesarean section, with pain management and proper nutrition, hydration, and rest.',
  },
  {
    title: 'Newborn Support',
    desc: 'Breastfeeding support along with guidance on newborn feeding and sleep routines.',
  },
  {
    title: 'Emotional Health',
    desc: 'Mood changes are common after delivery, but persistent sadness, anxiety, or hopelessness may indicate postpartum depression and should be addressed early.',
  },
  {
    title: 'Follow-Up & Family Support',
    desc: 'Postnatal follow-ups help discuss breastfeeding, recovery, family planning, and mental health, with family support easing the adjustment to parenthood.',
  },
]

const benefits = [
  'Early detection of complications',
  'Reduced health risks for mother and baby',
  'Timely medical intervention when needed',
  'Education on childbirth, breastfeeding & newborn care',
  'Safer deliveries and healthier recoveries',
  'Stronger emotional wellness support',
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
              Antenatal &amp; Postnatal Care
            </h1>
            <p className="mt-4 font-open-sans text-base md:text-lg text-zinc-600 leading-relaxed">
              Supporting mother and baby before, during, and after childbirth — from regular
              checkups and screenings during pregnancy to recovery, breastfeeding, and emotional
              support after delivery.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <ButtonPrimary>Book a Consultation</ButtonPrimary>
            </div>
          </div>
          <ImagePlaceholder className="h-[320px] md:h-[420px]" />
        </Wrapper>
      </Section>

      {/* Understanding */}
      <Section className="bg-white">
        <Wrapper className="grid lg:grid-cols-2 gap-12 items-center">
          <ImagePlaceholder className="h-[300px] md:h-[400px] order-2 lg:order-1" />
          <div className="order-1 lg:order-2">
            <Heading>Understanding Antenatal &amp; Postnatal Care</Heading>
            <Subheading className="mt-3 lg:!text-base !text-zinc-600 leading-relaxed">
              Antenatal care refers to the medical care received during pregnancy — regular health
              checkups, screenings, ultrasounds, nutritional guidance, and monitoring of the
              baby&apos;s growth.
            </Subheading>
            <p className="mt-4 font-open-sans text-sm md:text-base text-zinc-600 leading-relaxed">
              Postnatal care begins immediately after delivery and continues for several weeks to
              support the mother&apos;s recovery and the newborn&apos;s health. Together, proper
              antenatal and postnatal care reduce pregnancy-related complications and ensure both
              mother and baby get the attention they need.
            </p>
          </div>
        </Wrapper>
      </Section>

      {/* Antenatal Focus Areas */}
      <Section className="bg-fun-blue">
        <Wrapper>
          <div className="max-w-2xl">
            <Heading>Importance of Regular Antenatal Care</Heading>
            <Subheading>
              Early and consistent prenatal care allows healthcare providers to identify possible
              complications and provide timely treatment when needed.
            </Subheading>
          </div>

          <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {antenatalFocus.map((item, idx) => (
              <div
                key={idx}
                className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-300 ease-linear hover:-translate-y-1"
              >
                <h3 className="font-montserrat text-lg font-bold text-secondry-color leading-snug">
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

      {/* What to Expect During Appointments */}
      <Section className="bg-white">
        <Wrapper className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <Heading>What to Expect During Antenatal Appointments</Heading>
            <Subheading>
              Appointments are designed to monitor pregnancy progress and provide personalized
              care based on the mother&apos;s health and pregnancy stage.
            </Subheading>

            <div className="mt-6 space-y-5">
              {appointmentJourney.map((item, idx) => (
                <div key={idx} className="flex gap-4 bg-fun-blue rounded-xl p-5">
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

          <ImagePlaceholder className="h-[320px] md:h-[560px]" />
        </Wrapper>
      </Section>

      {/* Postnatal Care */}
      <Section className="bg-fun-blue">
        <Wrapper>
          <div className="max-w-2xl mx-auto text-center">
            <Heading>Postnatal Care &amp; Recovery After Childbirth</Heading>
            <Subheading className="mx-auto">
              This phase is important because the body goes through significant physical and
              emotional changes after childbirth. Support from family and healthcare providers
              plays a major role in recovery.
            </Subheading>
          </div>

          <div className="mt-12 grid md:grid-cols-2 gap-8">
            <ImagePlaceholder className="h-[260px] md:h-full md:row-span-2" />
            {postnatalCare.map((item, idx) => (
              <div key={idx} className="bg-white rounded-xl p-6 shadow-sm">
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

      {/* Benefits / CTA */}
      <Section className="bg-white">
        <Wrapper>
          <div className="rounded-2xl bg-secondry-color px-6 md:px-12 py-12 md:py-16 grid lg:grid-cols-2 gap-10 items-center">
            <div>
              <h2 className="font-montserrat text-2xl md:text-3xl lg:text-4xl font-bold text-white leading-[1.3]">
                Benefits of Comprehensive Care
              </h2>
              <p className="mt-4 font-open-sans text-sm md:text-base text-zinc-200 leading-relaxed">
                Comprehensive antenatal and postnatal care helps improve pregnancy outcomes and
                supports the long-term health of both mother and baby.
              </p>
              <ul className="mt-5 grid sm:grid-cols-2 gap-2">
                {benefits.map((item, idx) => (
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
                With regular medical guidance, emotional support, and proper healthcare
                management, mothers can feel confident and cared for during every stage of
                motherhood.
              </p>
              <div className="mt-8">
                <ButtonPrimary>Schedule Your Consultation</ButtonPrimary>
              </div>
            </div>
            <ImagePlaceholder className="h-[260px] md:h-[400px] !bg-white/10 !border-white/30" />
          </div>
        </Wrapper>
      </Section>
    </>
  )
}