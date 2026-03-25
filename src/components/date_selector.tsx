'use client';

import { useState } from "react";
import SliderWrapper from "./ui/slider_wrapper";

export default function DateSelector() {
    const [selectedIndex, setSelectedIndex] = useState(0);
    const today = new Date();

    const days = Array.from({ length: 15 }, (_, i) => {
        const date = new Date();
        date.setDate(today.getDate() + i);
        return date;
    });
    const selectedDate = days[selectedIndex];

    return (
        <div className="w-full bg-white p-4 border-b border-slate-200 flex items-center justify-between gap-6">
            <div className="shrink-0 w-32">
                <h2 className="text-lg font-semibold text-slate-800">
                    {selectedDate.toLocaleString("default", { month: "long" })}
                </h2>
                <p className="text-sm text-slate-500">
                    {selectedDate.getFullYear()}
                </p>
            </div>

            <div className="relative flex-1 px-5 overflow-hidden">
                <SliderWrapper className="gap-2">
                    {days.map((date, index) => {
                        const isActive = index === selectedIndex;
                        const isClickable = index < 7;

                        return (
                            <button
                                key={index}
                                disabled={!isClickable}
                                onClick={() => setSelectedIndex(index)}
                                className={`
                                flex flex-col items-center justify-center
                                min-w-[60px] px-3 py-2 rounded-xl border text-sm transition
                                
                                ${isActive
                                        ? "bg-slate-800 text-white border-slate-800"
                                        : "bg-white text-slate-700 border-slate-200"
                                    }

                                ${!isClickable && "opacity-40 cursor-not-allowed"}
                                ${isClickable && !isActive && "hover:bg-slate-100"}
                            `}
                            >
                                <span className="text-xs">
                                    {date.toLocaleString("default", { weekday: "short" })}
                                </span>

                                <span className="font-semibold">
                                    {date.getDate()}
                                </span>
                            </button>
                        );
                    })}
                </SliderWrapper>
            </div>
        </div>
    )
}
