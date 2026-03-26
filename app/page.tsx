import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Audiences from "@/components/Audiences";
import Solution from "@/components/Solution";
import Stepper from "@/components/Stepper";
import Services from "@/components/Services";
import Partner from "@/components/Partner";
import Difference from "@/components/Difference";
import Faq from "@/components/Faq";
import Process from "@/components/Process";
import CtaBand from "@/components/CtaBand";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="relative">
      <Nav />
      <Hero />
      <Audiences />
      <Solution />
      <Stepper />
      <Process />
      <Services />
      <Partner />
      <Difference />
      <Faq />
      <CtaBand />
      <Contact />
      <Footer />
    </main>
  );
}
