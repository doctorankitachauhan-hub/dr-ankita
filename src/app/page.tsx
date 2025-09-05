import About from "@/components/About";
import Hero from "@/components/Hero";
import OtherFacilityes from "@/components/OtherFacilityes";
import Services from "@/components/Services";

export default function Home() {
  return (
    <main>
      <Hero />
      <Services />
      <About />
      <OtherFacilityes />
    </main>
  );
}
