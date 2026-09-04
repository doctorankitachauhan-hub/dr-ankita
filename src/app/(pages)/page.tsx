import type { Metadata } from "next";
import About from "@/components/About";
import AdditionalDetails from "@/components/AdditionalDetails";
import Blogs from "@/components/Blogs";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import Instagram from "@/components/Instagram";
import MarqueeStrip from "@/components/Marquee";
import NavBar from "@/components/NavBar";
import OtherFacilityes from "@/components/OtherFacilityes";
import Services from "@/components/Services";
import Testimonials from "@/components/Testimonials";

export const metadata: Metadata = {
  title: "Dr. Ankita Chauhan | Best Gynecologist & Obstetrician in Hyderabad",
  description: "Dr. Ankita Chauhan is a consultant gynecologist and obstetrician in Gachibowli, Hyderabad, offering pregnancy care, infertility treatment, PCOS management, and advanced gynecological surgery.",
  alternates: {
    canonical: "https://www.drankitachauhan.com/",
  },
  openGraph: {
    title: "Dr. Ankita Chauhan | Best Gynecologist & Obstetrician in Hyderabad",
    description: "Consultant gynecologist and obstetrician in Gachibowli, Hyderabad, offering pregnancy care, infertility treatment, PCOS management, and advanced gynecological surgery.",
    url: "https://www.drankitachauhan.com/",
  },
}

export default function Home() {
  return (
    <>
      <NavBar />
      <main>
        <Hero />
        <AdditionalDetails />
        <About />
        <Services />
        <OtherFacilityes />
        <MarqueeStrip />
        <Instagram />
        {/* <Testimonials /> */}
        <Blogs />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
