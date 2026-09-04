import Services from '@/components/Services'
import { Metadata } from 'next'
import React from 'react'

export const metadata: Metadata = {
  title: "Gynecology & Pregnancy Care Services in Hyderabad",
  description: "Explore expert gynecology, obstetrics, infertility, PCOS, pregnancy care, and women's health services offered by Dr. Ankita Chauhan in Hyderabad.",
  alternates: {
    canonical: "https://www.drankitachauhan.com/services",
  },
  openGraph: {
    title: "Gynecology & Pregnancy Care Services in Hyderabad",
    description: "Explore expert gynecology, obstetrics, infertility, PCOS, pregnancy care, and women's health services offered by Dr. Ankita Chauhan in Hyderabad.",
    url: "https://www.drankitachauhan.com/services",
  },
}


export default function ServicesPage() {
  return (
    <main className='w-full relative'>
      <Services />
    </main>
  )
}
