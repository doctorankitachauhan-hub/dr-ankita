"use client";
import { EmblaOptionsType } from "embla-carousel";
import useEmblaCarousel from "embla-carousel-react";
import { ReactNode, Children, useCallback, useEffect, useState } from "react";
import { MoveLeft, MoveRight } from "lucide-react";
import { EmblaCarouselType } from 'embla-carousel'
import { cn } from "@/lib/utils";
import Autoplay from 'embla-carousel-autoplay'

type PropType = {
    children: ReactNode;
    options?: EmblaOptionsType;
    className?: string;
    btnLeft?: string;
    btnRight?: string
    autoPlay?: boolean;
};

export default function SliderWrapper({ children, options, className, btnLeft, btnRight, autoPlay }: PropType) {
    const [emblaRef, emblaApi] = useEmblaCarousel(options, autoPlay ? [Autoplay({ delay: 3000 })] : []);
    const { prevBtnDisabled, nextBtnDisabled, onPrevButtonClick, onNextButtonClick } = usePrevNextButtons(emblaApi)
    return (
        <section className="embla relative p-0!">
            <div className="embla__viewport overflow-hidden" ref={emblaRef}>
                <div className={cn("embla__container flex", className)}>
                    {Children.map(children, (child, index) => (
                        <div className="embla__slide shrink-0" key={index}>
                            {child}
                        </div>
                    ))}
                </div>
            </div>
            {!prevBtnDisabled && <button
                onClick={onPrevButtonClick}
                disabled={prevBtnDisabled}
                className={cn("absolute -left-5 top-1/2 -translate-y-1/2 z-10 w-8 h-8 rounded-full bg-primary-color text-white flex items-center justify-center hover:bg-primary-hover cursor-pointer disabled:bg-primary-color/40 disabled:cursor-not-allowed", btnLeft)}
            >
                <MoveLeft size={13} />
            </button>}

            {!nextBtnDisabled && <button
                onClick={onNextButtonClick}
                disabled={nextBtnDisabled}
                className={cn("absolute -right-5 top-1/2 -translate-y-1/2 z-10 w-8 h-8 rounded-full bg-primary-color text-white flex items-center justify-center hover:bg-primary-hover cursor-pointer disabled:bg-primary-color/40 disabled:cursor-not-allowed", btnRight)}
            >
                <MoveRight size={13} />
            </button>}
        </section>
    );
}

type UsePrevNextButtonsType = {
    prevBtnDisabled: boolean
    nextBtnDisabled: boolean
    onPrevButtonClick: () => void
    onNextButtonClick: () => void
}

const usePrevNextButtons = (emblaApi: EmblaCarouselType | undefined): UsePrevNextButtonsType => {
    const [prevBtnDisabled, setPrevBtnDisabled] = useState(true)
    const [nextBtnDisabled, setNextBtnDisabled] = useState(true)

    const onPrevButtonClick = useCallback(() => {
        if (!emblaApi) return
        emblaApi.scrollPrev()
    }, [emblaApi])

    const onNextButtonClick = useCallback(() => {
        if (!emblaApi) return
        emblaApi.scrollNext()
    }, [emblaApi])

    const onSelect = useCallback((emblaApi: EmblaCarouselType) => {
        setPrevBtnDisabled(!emblaApi.canScrollPrev())
        setNextBtnDisabled(!emblaApi.canScrollNext())
    }, [])

    useEffect(() => {
        if (!emblaApi) return
        onSelect(emblaApi)
        emblaApi.on('reInit', onSelect).on('select', onSelect)
    }, [emblaApi, onSelect])

    return {
        prevBtnDisabled,
        nextBtnDisabled,
        onPrevButtonClick,
        onNextButtonClick
    }
}