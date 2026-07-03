'use client';
import { useMutation } from '@tanstack/react-query';
import axios, { AxiosError } from 'axios';
import { AnimatePresence, motion } from 'motion/react';
import { FormEvent, useEffect, useRef, useState } from 'react';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import Signup from './signup';

export default function LoginForm() {
  const router = useRouter();
  const { setUser } = useAuth();

  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [step, setStep] = useState<'email' | 'otp' | 'success'>('email');
  const [cooldown, setCooldown] = useState(0);
  const otpRefs = useRef<(HTMLInputElement | null)[]>([]);
  const [openSignUpModal, setOpenSignUpModal] = useState<boolean>(false);

  /* ─── cooldown timer ─── */
  useEffect(() => {
    if (cooldown <= 0) return;
    const t = setInterval(() => setCooldown((c) => c - 1), 1000);
    return () => clearInterval(t);
  }, [cooldown]);

  /* ─── send OTP ─── */
  const { mutate: sendOtp, isPending: sendPending } = useMutation({
    mutationFn: (payload: { email: string }) =>
      axios.post('/api/auth/verify-login', payload).then((r) => r.data),
    onSuccess: (val) => {
      toast.success(val?.message ?? 'OTP sent');
      setStep('otp');
      setCooldown(30);
      setTimeout(() => otpRefs.current[0]?.focus(), 100);
    },
    onError: (err: AxiosError<{ error: string }>) =>
      toast.error(err.response?.data?.error ?? 'Something went wrong'),
  });

  /* ─── verify OTP ─── */
  const { mutate: verifyOtp, isPending: verifyPending } = useMutation({
    mutationFn: (payload: { email: string; loginOtp: string }) =>
      axios.post('/api/auth/verify-login-otp', payload).then((r) => r.data),
    onSuccess: (val) => {
      toast.success(val?.message ?? 'Login successful');
      setUser(val?.user);
      setStep('success');
      setTimeout(() => router.push('/user/dashboard'), 2500);
    },
    onError: (err: AxiosError<{ error: string }>) =>
      toast.error(err.response?.data?.error ?? 'Invalid OTP'),
  });

  /* ─── handlers ─── */
  function handleSendOtp(e: FormEvent) {
    e.preventDefault();
    sendOtp({ email });
  }

  function handleVerifyOtp(e: FormEvent) {
    e.preventDefault();
    verifyOtp({ email, loginOtp: otp.join('') });
  }

  function handleOtpChange(index: number, value: string) {
    const char = value.replace(/\D/g, '').slice(-1);
    const next = [...otp];
    next[index] = char;
    setOtp(next);
    if (char && index < 5) otpRefs.current[index + 1]?.focus();
  }

  function handleOtpKeyDown(index: number, e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      otpRefs.current[index - 1]?.focus();
    }
  }

  function handleResend() {
    sendOtp({ email });
    setCooldown(30);
  }

  const otpFilled = otp.every(Boolean);

  const steps = [
    { key: 'email', label: 'Email' },
    { key: 'otp', label: 'OTP' },
    { key: 'success', label: 'Done' },
  ] as const;

  const stepIndex = step === 'email' ? 0 : step === 'otp' ? 1 : 2;

  return (
    <>
      <div className="w-full flex flex-col">

        {/* Step indicator */}
        {step !== 'success' && (
          <div className="flex items-center mb-8">
            {steps.map((s, i) => (
              <div key={s.key} className="flex items-center">
                <div className="flex items-center gap-2">
                  <div
                    className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300 ${i < stepIndex
                      ? 'bg-[#e7e5f7] text-secondry-color'
                      : i === stepIndex
                        ? 'bg-secondry-color text-white'
                        : 'bg-slate-100 text-slate-400 border border-slate-200'
                      }`}
                  >
                    {i < stepIndex ? (
                      <svg className="w-3.5 h-3.5" viewBox="0 0 14 14" fill="none">
                        <path d="M2.5 7l3 3 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    ) : (
                      i + 1
                    )}
                  </div>
                  <span
                    className={`text-xs font-semibold whitespace-nowrap ${i === stepIndex ? 'text-secondry-color' : 'text-slate-400'
                      }`}
                  >
                    {s.label}
                  </span>
                </div>
                {i < steps.length - 1 && (
                  <div
                    className={`flex-1 h-px mx-3 transition-all duration-500 ${i < stepIndex ? 'bg-primary-color' : 'bg-slate-200'
                      }`}
                    style={{ minWidth: '2rem' }}
                  />
                )}
              </div>
            ))}
          </div>
        )}

        <AnimatePresence mode="wait">

          {/* ── Step 1: Email ── */}
          {step === 'email' && (
            <motion.form
              key="email"
              onSubmit={handleSendOtp}
              initial={{ x: 40, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -40, opacity: 0 }}
              transition={{ duration: 0.28 }}
              className="flex flex-col gap-5"
            >
              <div>
                <h2 className="text-2xl font-bold text-secondry-color mb-1">Welcome back</h2>
                <p className="text-sm text-slate-500 leading-relaxed">
                  Enter your registered email. We'll send a one-time password to sign in to your patient account.
                </p>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[11px] font-bold uppercase tracking-widest text-slate-500">
                  Email address
                </label>
                <div className="relative flex items-center">
                  <svg className="absolute left-3 w-4 h-4 text-slate-400" viewBox="0 0 16 16" fill="none">
                    <path d="M2 4h12v8H2V4zm0 0l6 5 6-5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <input
                    type="email"
                    required
                    autoFocus
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    className="w-full pl-9 pr-4 py-3 text-sm border border-slate-200 rounded-lg
                    bg-slate-50 text-secondry-color placeholder-slate-400
                    focus:outline-none focus:ring-2 focus:ring-[#827fc6]/20 focus:border-primary-color
                    transition-all duration-150"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={sendPending || !email}
                className="w-full py-3.5 bg-secondry-color hover:bg-primary-hover disabled:opacity-60
                text-white text-sm font-bold rounded-lg transition-all duration-150
                flex items-center justify-center gap-2"
              >
                {sendPending ? <Spinner /> : 'Send OTP'}
              </button>
            </motion.form>
          )}

          {/* ── Step 2: OTP ── */}
          {step === 'otp' && (
            <motion.form
              key="otp"
              onSubmit={handleVerifyOtp}
              initial={{ x: 40, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -40, opacity: 0 }}
              transition={{ duration: 0.28 }}
              className="flex flex-col gap-5"
            >
              <div>
                <h2 className="text-2xl font-bold text-secondry-color mb-1">Check your email</h2>
                <p className="text-sm text-slate-500 leading-relaxed">
                  We sent a 6-digit code to{' '}
                  <span className="text-secondry-color font-semibold">{email}</span>.
                  It expires in 10 minutes.
                </p>
              </div>

              {/* Disabled email field */}
              <div className="flex flex-col gap-1.5">
                <label className="text-[11px] font-bold uppercase tracking-widest text-slate-500">
                  Email address
                </label>
                <div className="relative flex items-center">
                  <svg className="absolute left-3 w-4 h-4 text-slate-400" viewBox="0 0 16 16" fill="none">
                    <path d="M2 4h12v8H2V4zm0 0l6 5 6-5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <input
                    type="email"
                    value={email}
                    disabled
                    className="w-full pl-9 pr-4 py-3 text-sm border border-slate-200 rounded-lg
                    bg-slate-100 text-slate-500 opacity-70 cursor-not-allowed"
                  />
                </div>
              </div>

              {/* OTP boxes */}
              <div className="flex flex-col gap-2">
                <label className="text-[11px] font-bold uppercase tracking-widest text-slate-500">
                  One-time password
                </label>
                <div className="grid grid-cols-6 gap-2.5">
                  {otp.map((digit, i) => (
                    <input
                      key={i}
                      ref={(el) => { otpRefs.current[i] = el; }}
                      type="text"
                      inputMode="numeric"
                      maxLength={1}
                      value={digit}
                      onChange={(e) => handleOtpChange(i, e.target.value)}
                      onKeyDown={(e) => handleOtpKeyDown(i, e)}
                      className={`aspect-square text-center text-lg font-bold rounded-lg border
                      transition-all duration-150 outline-none
                      focus:ring-2 focus:ring-[#827fc6]/20 focus:border-primary-color
                      ${digit
                          ? 'bg-[#f2f1fa] border-primary-color text-secondry-color'
                          : 'bg-slate-50 border-slate-200 text-secondry-color'
                        }`}
                    />
                  ))}
                </div>
              </div>

              {/* Resend */}
              <div className="flex justify-between items-center -mt-1">
                <span className="text-xs text-slate-400">Didn't receive the code?</span>
                <button
                  type="button"
                  onClick={handleResend}
                  disabled={cooldown > 0 || sendPending}
                  className="text-xs font-semibold text-primary-color disabled:text-slate-400
                  disabled:cursor-not-allowed transition-colors duration-150"
                >
                  {cooldown > 0 ? `Resend in ${cooldown}s` : 'Resend OTP'}
                </button>
              </div>

              <button
                type="submit"
                disabled={verifyPending || sendPending || !otpFilled}
                className="w-full py-3.5 bg-secondry-color hover:bg-primary-hover disabled:opacity-60
                text-white text-sm font-bold rounded-lg transition-all duration-150
                flex items-center justify-center gap-2"
              >
                {(verifyPending || sendPending) ? <Spinner /> : 'Verify OTP'}
              </button>

              <button
                type="button"
                onClick={() => { setStep('email'); setOtp(['', '', '', '', '', '']); }}
                className="text-xs text-slate-400 hover:text-slate-600 transition-colors text-center"
              >
                ← Use a different email
              </button>
            </motion.form>
          )}

          {/* ── Step 3: Success ── */}
          {step === 'success' && (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="flex flex-col items-center justify-center text-center gap-4 py-8"
            >
              <motion.div
                className="w-20 h-20 rounded-full bg-[#f2f1fa] border-2 border-[#c9c6ec]
                flex items-center justify-center"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 260, damping: 18, delay: 0.05 }}
              >
                <svg className="w-9 h-9 text-primary-color" viewBox="0 0 24 24" fill="none">
                  <path d="M5 12l5 5L20 7" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </motion.div>

              <div>
                <h2 className="text-xl font-bold text-secondry-color mb-1">Login successful</h2>
                <p className="text-sm text-slate-500">Redirecting to your dashboard…</p>
              </div>

              <div className="w-40 h-1 bg-slate-100 rounded-full overflow-hidden mt-2">
                <motion.div
                  className="h-full bg-primary-color rounded-full"
                  initial={{ width: '0%' }}
                  animate={{ width: '100%' }}
                  transition={{ duration: 2.2 }}
                />
              </div>
            </motion.div>
          )}

        </AnimatePresence>

        <div className="pt-5 flex items-center justify-center gap-1">
          <span className="text-sm font-medium text-gray-600">
            New User?
          </span>
          <button className="font-medium text-blue-500 cursor-pointer"
            onClick={() => setOpenSignUpModal(true)}>
            Create Account
          </button>
        </div>
      </div>
      <Signup
        openLoginModal={openSignUpModal}
        closeLoginModal={() => setOpenSignUpModal(false)}
      />
    </>
  );
}

function Spinner() {
  return (
    <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" />
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
    </svg>
  );
}