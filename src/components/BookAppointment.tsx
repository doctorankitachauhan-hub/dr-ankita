'use client';
import { X, CalendarIcon } from 'lucide-react'
import Image from 'next/image'
import React, { Dispatch, useState } from 'react'
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { AnimatePresence, motion } from 'motion/react'
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { ButtonPrimary } from '@/utils/Section';

function formatDate(date: Date | undefined) {
    if (!date) {
        return ""
    }
    return date.toLocaleDateString("en-US", {
        day: "2-digit",
        month: "long",
        year: "numeric",
    })
}
function isValidDate(date: Date | undefined) {
    if (!date) {
        return false
    }
    return !isNaN(date.getTime())
}

interface FormProps {
    openForm: boolean;
    closeForm: Dispatch<React.SetStateAction<boolean>>;
    treatment?: string
}

export default function BookAppointment({ openForm, closeForm, treatment }: FormProps) {
    const [open, setOpen] = useState(false)
    const [date, setDate] = useState<Date | undefined>(
        new Date()
    )
    const [month, setMonth] = useState<Date | undefined>(date)
    const [value, setValue] = useState(formatDate(new Date()))
    return (
        <AnimatePresence mode='wait'>
            {openForm &&
                (<motion.div className='fixed inset-0 min-h-screen overflow-y-auto bg-linear-to-b from-primary-color/60 to-white/40 z-50 backdrop-blur-[2px] p-10 flex'
                    data-lenis-prevent
                    key="overlay"
                    initial={{ opacity: 0, y: 300 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -300 }}
                    transition={{ duration: 0.3 }}
                >
                    <div className='w-full relative h-max'>
                        <motion.div className='max-w-xl w-full bg-white rounded-2xl mx-auto relative overflow-hidden'
                            key="form"
                            initial={{ y: 500, opacity: 0, scale: 0.9 }}
                            animate={{ y: 0, opacity: 1, scale: 1 }}
                            exit={{ y: -500, opacity: 0, scale: 0.9 }}
                            transition={{ duration: 0.35, ease: [0.25, 0.8, 0.5, 1] }}
                        >
                            <div className='w-full flex items-center justify-between bg-primary-color md:p-5 p-2.5'>
                                <div className='flex gap-1 items-center'>
                                    <Image src={'/images/logo/new-logo-1.png'} alt='Dr Ankita'
                                        width={400} height={100} className='w-10'
                                    />
                                    <Image src={'/images/logo/new-logo-2.png'} alt='Dr Ankita'
                                        width={400} height={100} className='w-50'
                                    />
                                </div>
                                <button role='button' className='shrink-0 md:w-11 md:h-11 h-9 w-9 rounded-full bg-zinc-900 text-white flex items-center justify-center cursor-pointer' onClick={() => closeForm(false)}>
                                    <X />
                                </button>
                            </div>

                            <form>
                                <div className='w-full relative mt-8 flex flex-col gap-5 text-zinc-700 font-montserrat font-medium text-lg md:p-5 p-2.5'>
                                    <div className='relative w-full px-2 py-3 border border-primary-hover rounded-md bg-transparent '>
                                        <input type="text" name="name" id="name" className='relative w-full h-full border-none outline-none bg-transparent' placeholder='' />
                                        <label className='labels'>
                                            Name
                                        </label>
                                    </div>
                                    <div className='relative w-full px-2 py-3 border border-primary-hover rounded-md bg-transparent '>
                                        <input type="email" name="email" id="email" className='relative w-full h-full border-none outline-none bg-transparent' placeholder='' />
                                        <label className='labels '>
                                            Email
                                        </label>
                                    </div>
                                    <div className='relative w-full px-2 py-3 border border-primary-hover rounded-md bg-transparent '>
                                        <input type="tel" name="contact" id="contact" className='relative w-full h-full border-none outline-none bg-transparent' placeholder='' />
                                        <label className='labels'>
                                            Contact No
                                        </label>
                                    </div>
                                    {
                                        treatment && (
                                            <div className='relative w-full px-2 py-3 border border-primary-hover rounded-md bg-transparent '>
                                                <input type="tel" name="contact" id="contact" className='relative w-full h-full border-none outline-none bg-transparent' placeholder='' value={treatment} readOnly/>
                                                <label className='labels'>
                                                    Treatment
                                                </label>
                                            </div>
                                        )
                                    }

                                    <div className='relative w-full px-2 py-3 border border-primary-hover rounded-md bg-transparent '>
                                        <input
                                            placeholder=""
                                            name="date"
                                            value={value}
                                            onChange={(e) => {
                                                const date = new Date(e.target.value);
                                                setValue(e.target.value);
                                                if (isValidDate(date)) {
                                                    setDate(date);
                                                    setMonth(date);
                                                }
                                            }}
                                            onKeyDown={(e) => {
                                                if (e.key === "ArrowDown") {
                                                    e.preventDefault();
                                                    setOpen(true);
                                                }
                                            }}
                                            className="relative w-full h-full border-none outline-none bg-transparent"
                                        />
                                        <Popover open={open} onOpenChange={setOpen}>
                                            <PopoverTrigger asChild>
                                                <Button
                                                    id="date-picker"
                                                    variant="ghost"
                                                    className="absolute top-1/2 right-2 size-6 -translate-y-1/2"
                                                >
                                                    <CalendarIcon className="size-5 text-primary-hover cursor-pointer" />
                                                    <span className="sr-only">Select date</span>
                                                </Button>
                                            </PopoverTrigger>
                                            <PopoverContent
                                                className="w-auto overflow-hidden p-0"
                                                align="end"
                                                alignOffset={-8}
                                                sideOffset={10}
                                            >
                                                <Calendar
                                                    className="!bg-primary-hover !text-white"
                                                    mode="single"
                                                    selected={date}
                                                    captionLayout="dropdown"
                                                    month={month}
                                                    onMonthChange={setMonth}
                                                    onSelect={(date) => {
                                                        setDate(date);
                                                        setValue(formatDate(date));
                                                        setOpen(false);
                                                    }}
                                                />
                                            </PopoverContent>
                                        </Popover>
                                        <label className='labels '>
                                            Preferred Date
                                        </label>
                                    </div>

                                    <div className='relative w-full px-2 py-3 border border-primary-hover rounded-md bg-transparent '>
                                        <textarea name="message" id="message" className='relative w-full h-full border-none outline-none bg-transparent' placeholder='' rows={4} ></textarea>
                                        <label className='label'>
                                            Message
                                        </label>
                                    </div>

                                    <ButtonPrimary type="submit" className='py-4 uppercase'>
                                        Submit
                                    </ButtonPrimary>
                                </div>
                            </form>
                        </motion.div>
                    </div>
                </motion.div>
                )}
        </AnimatePresence>
    )
}
