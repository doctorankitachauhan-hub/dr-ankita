'use client';
import GenerateSlots from '@/components/generate-slots';
import { useAuth } from '@/hooks/useAuth'
import { ButtonPrimary } from '@/utils/Section';
import { useMutation } from '@tanstack/react-query';
import axios, { AxiosError } from 'axios';
import { BellDot, Power } from 'lucide-react'
import { useState } from 'react';
import toast from 'react-hot-toast';

export default function DashboardTopbar() {
    const { user } = useAuth();
    const isDoctor = user?.role === "DOCTOR"
    const [openSlotModal, setOpenSlotModal] = useState<boolean>(false)

    const logoutMutation = useMutation({
        mutationFn: async () => {
            const response = await axios.post("/api/auth/logout", {}, {
                withCredentials: true
            });
            return response.data
        },
        onSuccess: (val) => {
            toast.success(val?.message)
            window.location.href = "/";
        },
        onError: (err: AxiosError<{ error: string }>) => {
            toast.error(err.response?.data?.error || "Something went wrong")
        }
    });

    return (
        <div className='sticky top-0 z-40 w-full bg-white py-4 px-8 shadow-sm shadow-zinc-800/10 flex items-center justify-between'>
            <div></div>
            <div className='flex items-center gap-5'>
                {isDoctor &&
                    <ButtonPrimary onClick={() => setOpenSlotModal(true)}>
                        Generate Time Slots
                    </ButtonPrimary>
                }
                <button className='cursor-pointer'>
                    <BellDot size={32} strokeWidth={1.5} className='text-zinc-800' />
                </button>
                <button className='cursor-pointer' onClick={() => logoutMutation.mutate()}>
                    <Power size={32} strokeWidth={1.5} className='text-zinc-800' />
                </button>
            </div>
            {
                isDoctor &&
                <GenerateSlots
                    open={openSlotModal}
                    close={() => setOpenSlotModal(false)}
                />
            }
        </div>
    )
}
