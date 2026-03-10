"use client";
import { UserInput } from "@/types/user";
import { ButtonPrimary } from "@/utils/Section";
import { useMutation } from "@tanstack/react-query";
import { CheckCircle, CircleCheck, X } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ChangeEvent, Dispatch, FormEvent, useState } from "react";
import axios, { AxiosError } from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import Spinner from "../ui/spinner";


type Props = {
    openLoginModal: boolean;
    closeLoginModal: Dispatch<React.SetStateAction<boolean>>;
}

type Info = {
    name: string;
    email: string;
    phone: string;
}

export default function Login({ openLoginModal, closeLoginModal }: Props) {
    const router = useRouter()
    const [loginSuccess, setLoginSuccess] = useState(false)
    const [changeForm, setChangeForm] = useState<boolean>(false);
    const [userData, setUserData] = useState<Info>({
        name: '',
        email: '',
        phone: '',
    })
    const [otp, setOtp] = useState<string>("")

    function handleChange(e: ChangeEvent<HTMLInputElement>) {
        const { name, value } = e.target

        setUserData(prev => ({
            ...prev,
            [name]: value
        }))
    }

    const loginMutation = useMutation({
        mutationFn: async (payload: UserInput) => {
            const response = await axios.post(
                "/api/auth/send-otp",
                payload,
            );
            return response.data;
        },
        onSuccess: (val) => {
            toast.success(val?.message)
            setChangeForm(true)
        },
        onError: (err: AxiosError<{ error: string }>) => {
            toast.error(err.response?.data?.error || "Something went wrong")
        }
    });
    const { mutate, isPending } = loginMutation;

    function handleSubmit(e: FormEvent) {
        e.preventDefault();
        mutate(userData);
    }

    const verifyOtpMutation = useMutation({
        mutationFn: async (payload: { email: string; otp: string }) => {
            const response = await axios.post(
                "/api/auth/verify-otp",
                payload
            );
            return response.data;
        },
        onSuccess: (val) => {
            toast.success(val?.message)

            setLoginSuccess(true)

            setTimeout(() => {
                closeLoginModal(false)
                router.push("/user/dashboard")
            }, 2500)
        },

        onError: (err: AxiosError<{ error: string }>) => {
            toast.error(err.response?.data?.error || "Invalid OTP")
        }
    })

    const { mutate: verifyMutate, isPending: loading } = verifyOtpMutation;

    function verifyOtp(e: FormEvent) {
        e.preventDefault();
        verifyMutate({ email: userData.email, otp });
    }

    return (
        <AnimatePresence mode='wait'>
            {
                openLoginModal && (
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

                                <div className="w-full bg-white overflow-hidden relative">
                                    <AnimatePresence mode="wait">
                                        {!changeForm ? (
                                            <motion.form
                                                key="user-form"
                                                onSubmit={handleSubmit}
                                                initial={{ x: "100%", opacity: 0 }}
                                                animate={{ x: 0, opacity: 1 }}
                                                exit={{ x: "-100%", opacity: 0 }}
                                                transition={{ duration: 0.35 }}
                                            >
                                                <div className='w-full relative mt-8 flex flex-col gap-5 text-zinc-700 font-montserrat font-medium text-lg md:p-5 p-2.5'>

                                                    <div className='relative w-full px-2 py-3 border border-primary-hover rounded-md'>
                                                        <input
                                                            type="text"
                                                            name="name"
                                                            value={userData.name}
                                                            onChange={handleChange}
                                                            className='w-full bg-transparent outline-none'
                                                        />
                                                        <label className='labels'>Name</label>
                                                    </div>

                                                    <div className='relative w-full px-2 py-3 border border-primary-hover rounded-md'>
                                                        <input
                                                            type="email"
                                                            name="email"
                                                            value={userData.email}
                                                            onChange={handleChange}
                                                            className='w-full bg-transparent outline-none'
                                                        />
                                                        <label className='labels'>Email</label>
                                                    </div>

                                                    <div className='relative w-full px-2 py-3 border border-primary-hover rounded-md'>
                                                        <input
                                                            type="tel"
                                                            name="phone"
                                                            value={userData.phone}
                                                            onChange={handleChange}
                                                            className='w-full bg-transparent outline-none'
                                                        />
                                                        <label className='labels'>Contact No</label>
                                                    </div>

                                                    <ButtonPrimary type="submit" className='py-4 uppercase'>
                                                        {isPending ? <Spinner color /> : "Register"}
                                                    </ButtonPrimary>
                                                </div>
                                            </motion.form>
                                        ) : (
                                            <AnimatePresence mode="wait">
                                                {loginSuccess ? (
                                                    <motion.div
                                                        key="success"
                                                        className="p-10 flex flex-col items-center justify-center text-center gap-4"
                                                        initial={{ opacity: 0, scale: 0.9 }}
                                                        animate={{ opacity: 1, scale: 1 }}
                                                        exit={{ opacity: 0 }}
                                                        transition={{ duration: 0.35 }}
                                                    >
                                                        <motion.div
                                                            className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center"
                                                            initial={{ scale: 0 }}
                                                            animate={{ scale: 1 }}
                                                            transition={{
                                                                type: "spring",
                                                                stiffness: 260,
                                                                damping: 20
                                                            }}
                                                        >
                                                            <CheckCircle className="text-green-500 w-14 h-14" />
                                                        </motion.div>

                                                        <h2 className="text-xl font-semibold text-zinc-800">
                                                            Login Successful
                                                        </h2>

                                                        <p className="text-zinc-500 text-sm">
                                                            Redirecting to your dashboard...
                                                        </p>

                                                        <motion.div
                                                            className="w-40 h-1 bg-zinc-200 rounded-full overflow-hidden mt-3"
                                                        >
                                                            <motion.div
                                                                className="h-full bg-primary-color"
                                                                initial={{ width: "0%" }}
                                                                animate={{ width: "100%" }}
                                                                transition={{ duration: 2 }}
                                                            />
                                                        </motion.div>
                                                    </motion.div>
                                                ) : (
                                                    <motion.form
                                                        key="otp-form"
                                                        onSubmit={verifyOtp}
                                                        initial={{ x: "100%", opacity: 0 }}
                                                        animate={{ x: 0, opacity: 1 }}
                                                        exit={{ x: "-100%", opacity: 0 }}
                                                        transition={{ duration: 0.35 }}
                                                    >
                                                        <div className='w-full relative mt-8 flex flex-col gap-5 text-zinc-700 font-montserrat font-medium text-lg md:p-5 p-2.5'>

                                                            <div className="text-center text-sm text-zinc-500">
                                                                OTP sent to <b>{userData.email}</b>
                                                            </div>

                                                            <div className='relative w-full px-2 py-3 border border-primary-hover rounded-md'>
                                                                <input
                                                                    type="email"
                                                                    value={userData.email}
                                                                    className='w-full bg-transparent outline-none'
                                                                    disabled
                                                                />
                                                                <label className='labels'>Enter OTP</label>
                                                            </div>

                                                            <div className='relative w-full px-2 py-3 border border-primary-hover rounded-md'>
                                                                <input
                                                                    type="text"
                                                                    value={otp}
                                                                    onChange={(e) => setOtp(e.target.value)}
                                                                    className='w-full bg-transparent outline-none'
                                                                />
                                                                <label className='labels'>Enter OTP</label>
                                                            </div>

                                                            <ButtonPrimary type="submit" className='py-4 uppercase'>
                                                                {loading ? <Spinner color /> : "Verify OTP"}
                                                            </ButtonPrimary>
                                                        </div>
                                                    </motion.form>
                                                )}
                                            </AnimatePresence>
                                        )}
                                    </AnimatePresence>
                                </div>

                                <div className="py-5 flex items-center justify-center gap-1">
                                    <span className="text-sm font-medium text-gray-600">
                                        Already have an account?
                                    </span>
                                    <button className="font-medium text-blue-500 cursor-pointer">
                                        Login
                                    </button>
                                </div>
                            </motion.div>

                        </div>
                    </motion.div>
                )
            }
            <Toaster />
        </AnimatePresence>
    )
}
