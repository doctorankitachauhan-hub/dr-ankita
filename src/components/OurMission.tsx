import { Heading, Section, Subheading, Wrapper } from '@/utils/Section'
import Image from 'next/image'
import React from 'react'

export default function OurMission() {
    return (
        <Section>
            <Wrapper>
                <div className='relative w-full flex-1 grid md:grid-cols-2 grid-cols-1 gap-8'>
                    <div className="w-full h-full relative md:order-1 order-2">
                        <span className='text-xl font-medium text-[#e11d48] '>
                            OUR GOAL
                        </span>
                        <Heading>
                            Dr. Ankita Chauhan Reddy Best Cosmetic Gynaecologist.
                        </Heading>
                        <Subheading className='mt-4'>
                            Our goal is to give women at every stage of life with outstanding, caring, and all-encompassing gynecological treatment. By providing individualized, evidence-based medical care, we are committed to advancing the health and wellness of women. Our dedication goes beyond our knowledge of medicine to include compassion, decency, and a welcoming atmosphere for every patient.
                        </Subheading>
                        <Subheading className='mt-3'>
                            Our goal is to lead the way in women&apos;s healthcare innovation and excellence. Our vision is a world in which all women receive individualized, sensitive, and easily available gynecological care, enabling them to live long, healthy lives. We see a community in which women actively participate in their healthcare journeys, are well-informed, and receive assistance.
                        </Subheading>
                        <Subheading className='mt-3'>
                            Our Values are Compassion, Excellence, Respect, Patient-Centered Care, Integrity, Innovation, Collaboration, Advocacy for Women&apos;s Health, Accessibility, Continuous Learning and Empowerment.
                        </Subheading>
                    </div>
                    <div className="w-full h-full relative flex items-center md:order-2 order-1">
                        <Image src='/images/about/mission.svg' alt='Our Mission' width={400} height={300}
                            className='w-full '
                        />
                    </div>
                </div>
            </Wrapper>
        </Section>
    )
}
