'use client';
import GenerateSlots from '@/components/generate-slots';
import { useAuth } from '@/hooks/useAuth'
import { ButtonPrimary } from '@/utils/Section';
import { BellDot } from 'lucide-react'
import { useState } from 'react';

export default function DashboardTopbar() {
    const { user } = useAuth()
    const isDoctor = user?.role === "DOCTOR"
    const [openSlotModal, setOpenSlotModal] = useState<boolean>(false)

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
