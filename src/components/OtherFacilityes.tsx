'use client'
import { Heading, Section, Subheading, Wrapper } from '@/utils/Section'
import { useLenisControl } from '@/utils/SmoothScroll';
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import BookAppointment from './BookAppointment';

interface Data {
    name: string;
    description: string;
    img: string;
}

export default function OtherFacilityes() {
    const { stopScroll, startScroll } = useLenisControl();
    const [openForm, setOpenForm] = useState<boolean>(false);
    const [selectedTreatment, setSelectedTreatment] = useState<string>("");
    useEffect(() => {
        if (openForm) {
            stopScroll();
        } else {
            startScroll();
        }
        return () => startScroll();
    }, [stopScroll, startScroll, openForm]);
    const data: Data[] = [
        {
            name: "Vaginal Tightening",
            description: "Non-surgical treatment to improve vaginal tone and firmness. Helps enhance comfort and intimate well-being. Performed using safe and advanced techniques.",
            img: "/images/others/img-1.png"
        },
        {
            name: "Stress Urinary Incontinence (Laser)",
            description: "Laser treatment to reduce urine leakage during activities like coughing or exercise. Strengthens vaginal tissues without surgery. Quick, safe, and minimally invasive.",
            img: "/images/others/img-2.png"
        },
        {
            name: "Chronic Infection Treatment",
            description: "Advanced care for recurring vaginal infections. Focuses on identifying causes and preventing recurrence. Aims to restore comfort and intimate health.",
            img: "/images/others/img-3.png"
        },
    ]
    return (
        <Section className='bg-[#F9FAFB] !pt-0'>
            <Wrapper>
                <div className='relative w-full flex flex-col lg:gap-14 md:gap-10 gap-8'>
                    <div className='flex-1 text-center'>
                        <Heading>
                            <span className='!font-open-sans text-primary-color'>Cosmetic & Laser Gynecology</span> Highlight
                        </Heading>
                        <Subheading className='mx-auto max-w-lg'>
                            Take a virtual tour of our modern, comfortable medical facility designed with your comfort and privacy in mind.
                        </Subheading>
                    </div>

                    <div className="flex-1 relative grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-3">
                        {
                            data.map((items) => (
                                <div className="relative w-full lg:h-full md:h-[400px] h-auto rounded-lg overflow-hidden group/card" key={items.name}>
                                    <Image
                                        src={items.img}
                                        width={500}
                                        height={200}
                                        alt="Facility"
                                        className="w-full h-full object-cover object-center"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent z-10"></div>
                                    <div className='absolute inset-x-0 p-3 bottom-0 z-20'>
                                        <h3 className='font-bold text-white md:text-lg text-base'>
                                            {items.name}
                                        </h3>
                                        <p className='text-sm text-zinc-100 '>
                                            {items.description}
                                        </p>
                                    </div>
                                    <button className='absolute top-3 right-3 text-sm bg-primary-color text-white px-3 py-2 rounded-sm font-semibold cursor-pointer z-10 opacity-0 transition-all duration-300 ease-in-out group-hover/card:opacity-100 hover:bg-primary-hover'
                                        onClick={() => (setSelectedTreatment(items.name), setOpenForm(true))}
                                    >
                                        Private Consultation
                                    </button>
                                </div>
                            ))
                        }
                    </div>

                </div>
            </Wrapper>
            <BookAppointment openForm={openForm} closeForm={setOpenForm} treatment={selectedTreatment} />
        </Section>
    )
}
