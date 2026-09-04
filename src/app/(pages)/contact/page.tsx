import Contact from '@/components/Contact'
import Footer from '@/components/Footer'
import NavBar from '@/components/NavBar'
import { Metadata } from 'next'
import React from 'react'

export const metadata: Metadata = {
    title: "Contact Dr. Ankita Chauhan | Book Appointment",
    description: "Contact Dr. Ankita Chauhan in Hyderabad to book an appointment for gynecology, pregnancy care, infertility treatment, and women's health consultation.",
    alternates: {
        canonical: "https://www.drankitachauhan.com/contact",
    },
    openGraph: {
        title: "Contact Dr. Ankita Chauhan | Book Appointment",
        description: "Contact Dr. Ankita Chauhan in Hyderabad to book an appointment for gynecology, pregnancy care, infertility treatment, and women's health consultation.",
        url: "https://www.drankitachauhan.com/contact",
    },
}

export default function ContactPage() {
  return (
    <>
      <NavBar />
      <Contact />
      <Footer />
    </>
  )
}
