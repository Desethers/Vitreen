import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Solution from "@/components/Solution";
import StatementSplit from "@/components/StatementSplit";
import Services from "@/components/Services";
import Process from "@/components/Process";
import CtaBand from "@/components/CtaBand";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="relative">
      <Nav />
      <Hero />
      <Solution />
      <StatementSplit />
      <Process />
      <Services />
      <CtaBand />
      <Contact />
      <Footer />
    </main>
  );
}
