import { Section, Wrapper } from "@/utils/Section";
import Image from "next/image";
import React from "react";

interface Data {
    title: string;
    short: string;
    icon: string;
}

export default function AdditionalDetails() {
    const data: Data[] = [
        {
            title: "10+ Years",
            short: "Experience",
            icon: "/images/svg/icon-1.svg",
        },
        {
            title: "Personalized",
            short: "Women’s Care",
            icon: "/images/svg/icon-2.svg",
        },
        {
            title: "Advanced & Safe",
            short: "Procedures",
            icon: "/images/svg/icon-3.svg",
        },
        {
            title: "Patient-Focused",
            short: "Care",
            icon: "/images/svg/icon-4.svg",
        },
    ];
    return (
        <Section className="bg-[#F9FAFB]">
            <Wrapper>
                <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-5">
                    {data.map((item, idx) => (
                        <div
                            key={idx}
                            className="group rounded-3xl bg-white border border-slate-200 p-6 hover:border-primary-color/20 hover:-translate-y-1 transition-all shadow-sm hover:shadow-xl"
                        >
                            <div
                                className="size-14 rounded-2xl bg-primary-color/10 flex items-center justify-center"
                            >
                                <Image
                                    src={item.icon}
                                    width={32}
                                    height={32}
                                    alt={item.title}
                                />
                            </div>

                            <h3 className="mt-5 font-bold text-secondry-color text-2xl">
                                {item.title}
                            </h3>

                            <p className="mt-2 text-zinc-500">{item.short}</p>
                        </div>
                    ))}
                </div>
            </Wrapper>
        </Section>
    );
}
