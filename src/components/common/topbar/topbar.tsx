import { BellDot } from 'lucide-react'
import React from 'react'

export default function DashboardTopbar() {
    return (
        <div className='sticky top-0 z-40 w-full bg-white py-4 px-8 shadow-sm shadow-zinc-800/10 flex items-center justify-between'>
            <div></div>
            <div className='flex items-center'>
                <button className='cursor-pointer'>
                    <BellDot size={32} strokeWidth={1.5} className='text-zinc-800' />
                </button>
            </div>
        </div>
    )
}
