import AboutDesc, { OtherData } from '@/components/AboutDesc'
import AboutPageStrip from '@/components/AboutPageStrip'
import Academic from '@/components/Academic'
import Contact from '@/components/Contact'
import Footer from '@/components/Footer'
import NavBar from '@/components/NavBar'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: "About Dr. Ankita Chauhan | Gynecologist in Hyderabad",
  description: "Learn about Dr. Ankita Chauhan, a trusted gynecologist in Hyderabad dedicated to women's healthcare, pregnancy care, infertility, and advanced treatments.",
  alternates: {
    canonical: "https://www.drankitachauhan.com/about",
  },
  openGraph: {
    title: "About Dr. Ankita Chauhan | Gynecologist in Hyderabad",
    description: "Learn about Dr. Ankita Chauhan, a trusted gynecologist in Hyderabad dedicated to women's healthcare, pregnancy care, infertility, and advanced treatments.",
    url: "https://www.drankitachauhan.com/about",
  },
}

export default function AboutPage() {
  return (
    <>
      <NavBar />
      <main className='relative w-full'>
        <AboutDesc />
        <AboutPageStrip />
        <Academic />
        <OtherData />
      </main>
      <Contact />
      <Footer />
    </>
  )
}
