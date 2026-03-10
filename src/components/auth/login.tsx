"use client";
import { ButtonPrimary } from "@/utils/Section";
import { X } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import Image from "next/image";
import { Dispatch } from "react";


type Props = {
    openLoginModal: boolean;
    closeLoginModal: Dispatch<React.SetStateAction<boolean>>;
}

export default function Login({ openLoginModal, closeLoginModal }: Props) {
    return (
        <AnimatePresence mode='wait'>
            <motion.div
                className='fixed inset-0 min-h-screen overflow-y-auto bg-linear-to-b from-primary-color/60 to-white/40 z-50 backdrop-blur-[2px] p-10 flex items-center'
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
                                    width={400} height={44} className='w-10'
                                />
                                <Image src={'/images/logo/new-logo-2.png'} alt='Dr Ankita'
                                    width={400} height={44} className='w-50'
                                />
                            </div>
                            <button
                                role='button'
                                className='shrink-0 md:w-11 md:h-11 h-9 w-9 rounded-full bg-white text-black flex items-center justify-center cursor-pointer'
                                onClick={() => closeLoginModal(false)}>
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
                                <ButtonPrimary type="submit" className='py-4 uppercase'>
                                    Submit
                                </ButtonPrimary>
                            </div>
                        </form>
                    </motion.div>
                </div>
            </motion.div>
        </AnimatePresence>
    )
}
