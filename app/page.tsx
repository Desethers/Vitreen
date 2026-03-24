import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Audiences from "@/components/Audiences";
import Solution from "@/components/Solution";
import HowItWorks from "@/components/HowItWorks";
import Services from "@/components/Services";
import Difference from "@/components/Difference";
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
      <HowItWorks />
      <Services />
      <Difference />
      <Process />
      <CtaBand />
      <Contact />
      <Footer />
    </main>
  );
}
