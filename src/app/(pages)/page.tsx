import About from "@/components/About";
import AdditionalDetails from "@/components/AdditionalDetails";
import Blogs from "@/components/Blogs";
import Hero from "@/components/Hero";
import Instagram from "@/components/Instagram";
import MarqueeStrip from "@/components/Marquee";
import OtherFacilityes from "@/components/OtherFacilityes";
import Services from "@/components/Services";
import Testimonials from "@/components/Testimonials";

export default function Home() {
  return (
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
    </main>
  );
}
