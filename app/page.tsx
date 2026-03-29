import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Audiences from "@/components/Audiences";
import Showcase from "@/components/Showcase";
import Solution from "@/components/Solution";
import ProcessFlow from "@/components/ProcessFlow";
import Stepper from "@/components/Stepper";
import Services from "@/components/Services";
import StatementSplit from "@/components/StatementSplit";
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
      <Showcase />
      <Solution />
      <ProcessFlow />
      <Stepper />
      <Process />
      <Services />
      <StatementSplit />
      <Faq />
      <CtaBand />
      <Contact />
      <Footer />
    </main>
  );
}
