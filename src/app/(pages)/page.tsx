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
        <Testimonials />
        <Blogs />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
