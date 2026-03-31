'use client';
import { ButtonPrimary } from '@/utils/Section';
import { useMutation } from '@tanstack/react-query';
import axios, { AxiosError } from 'axios';
import { motion, AnimatePresence } from 'motion/react'
import { FormEvent, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import Spinner from '../ui/spinner';
import { useRouter } from 'next/navigation';
import { CheckCircle } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';

export default function LoginForm() {
  const router = useRouter()
  const [email, setEmail] = useState<string>("")
  const [loginOtp, setLoginOtp] = useState<string>("");
  const [cooldown, setCooldown] = useState(0);
  const [verifyLoginOtp, setVerifyLoginOtp] = useState(false);
  const [loginSuccess, setLoginSuccess] = useState(false)
  const { setUser } = useAuth()


  const loginMutation = useMutation({
    mutationFn: async (email: { email: string }) => {
      const response = await axios.post(
        "/api/auth/verify-login",
        email,
      );
      return response.data;
    },
    onSuccess: (val) => {
      toast.success(val?.message);
      setVerifyLoginOtp(true);
    },
    onError: (err: AxiosError<{ error: string }>) => {
      toast.error(err.response?.data?.error || "Something went wrong")
    }
  });
  const { mutate: loginMutate, isPending: loginPending } = loginMutation;
  function handleLogin(e: FormEvent) {
    e.preventDefault();
    loginMutate({ email })
  }

  const verifyLoginOtpMutation = useMutation({
    mutationFn: async (payload: { email: string; loginOtp: string }) => {
      const response = await axios.post(
        "/api/auth/verify-login-otp",
        payload
      );
      return response.data;
    },
    onSuccess: (val) => {
      toast.success(val?.message)
      setUser(val?.user)
      setLoginSuccess(true)

      setTimeout(() => {
        router.push("/user/dashboard")
      }, 2500)
    },

    onError: (err: AxiosError<{ error: string }>) => {
      toast.error(err.response?.data?.error || "Invalid OTP")
    }
  })
  const { mutate: verifyLoginMutate, isPending: verifyLoginPending } = verifyLoginOtpMutation;
  function handleVerifyLoginOtp(e: FormEvent) {
    e.preventDefault();
    verifyLoginMutate({ email: email, loginOtp });
  }

  useEffect(() => {
    if (cooldown <= 0) return;
    const timer = setInterval(() => setCooldown((c) => c - 1), 1000);
    return () => clearInterval(timer);
  }, [cooldown]);

  return (
    <div className='w-full h-full overflow-hidden max-w-3xl mx-auto'>
      <AnimatePresence mode='wait'>

        {
          loginSuccess ?
            (

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

            ) : verifyLoginOtp ? (

              <motion.form
                key="login-otp-form"
                onSubmit={handleVerifyLoginOtp}
                initial={{ x: "100%", opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: "-100%", opacity: 0 }}
                transition={{ duration: 0.35 }}
              >
                <div className='w-full relative mt-8 flex flex-col gap-5 text-zinc-700 font-montserrat font-medium text-lg md:p-5 p-2.5'>

                  <div className="text-center text-sm text-zinc-500">
                    OTP sent to <b>{email}</b>
                  </div>

                  <div className='relative w-full px-2 py-3 border border-primary-hover rounded-md'>
                    <input
                      type="email"
                      value={email}
                      className='w-full bg-transparent outline-none'
                      disabled
                    />
                    <label className='labels'>Email</label>
                  </div>

                  <div className='relative w-full px-2 py-3 border border-primary-hover rounded-md'>
                    <input
                      type="text"
                      maxLength={6}
                      inputMode="numeric"
                      pattern="[0-9]*"
                      autoFocus
                      value={loginOtp}
                      onChange={(e) => setLoginOtp(e.target.value)}
                      className='w-full bg-transparent outline-none'
                    />
                    <label className='labels'>Enter OTP</label>
                  </div>
                  <button
                    type="button"
                    onClick={() => (loginMutate({ email }), setCooldown(30))}
                    className="text-blue-500 w-max block ml-auto text-sm cursor-pointer"
                  >
                    {cooldown > 0 ? `Resend in ${cooldown}s` : "Resend OTP"}
                  </button>

                  <ButtonPrimary type="submit" className='py-4 uppercase'>
                    {(verifyLoginPending || loginPending) ? <Spinner color /> : "Verify OTP"}
                  </ButtonPrimary>
                </div>
              </motion.form>

            ) : (

              <motion.form
                key="login-form"
                onSubmit={handleLogin}
                initial={{ x: "100%", opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: "-100%", opacity: 0 }}
                transition={{ duration: 0.35 }}
              >
                <div className='w-full relative mt-8 flex flex-col gap-5 text-zinc-700 font-montserrat font-medium text-lg md:p-5 p-2.5'>

                  <div className='relative w-full px-2 py-3 border border-primary-hover rounded-md'>
                    <input
                      type="email"
                      name="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className='w-full bg-transparent outline-none'
                    />
                    <label className='labels'>Email</label>
                  </div>
                  <ButtonPrimary type="submit" className='py-4 uppercase'>
                    {loginPending ? <Spinner color /> : "Send OTP"}
                  </ButtonPrimary>
                </div>
              </motion.form>
            )
        }

      </AnimatePresence>
    </div >
  )
}
