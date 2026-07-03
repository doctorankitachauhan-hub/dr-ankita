import { Heading, Section, Subheading, Wrapper } from '@/utils/Section'
import Image from 'next/image'
import React from 'react'

export default function Instagram() {
    const instaPost: string[] = [
        "/images/insta/insta-new-1.jpg",
        "/images/insta/insta-new-2.jpg",
        "/images/insta/insta-new-3.jpg",
        "/images/insta/insta-new-4.jpg"
    ]
    return (
        <Section className='bg-[#F9FAFB]'>
            <Wrapper>
                {/* <div className='relative w-full flex flex-col lg:gap-14 md:gap-10 gap-8'>
                    <div className='flex-1 text-center'>
                        <Heading>
                            Follow us on <span className='!font-open-sans text-primary-color'>Instagram</span>
                        </Heading>
                        <Subheading className='mx-auto max-w-lg'>
                            Stay connected with daily health tips, behind-the-scenes content, and inspiring stories from our community.
                        </Subheading>
                    </div>

                    <div className='flex-1 w-full relative grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-3'>
                        {
                            instaPost.map((data, idx) => (
                                <div key={idx} className='w-full h-full relative'>
                                    <Image src={data} alt='Instagram Post' width={300} height={500} className='w-full cursor-pointer h-[450px] object-cover object-left-top rounded-xl' />
                                </div>
                            ))
                        }
                    </div>
                </div> */}
                <div className="elfsight-app-68656c35-a350-4d3e-b3fe-e6107119cdb9" data-elfsight-app-lazy></div>
            </Wrapper>
        </Section>
    )
}
