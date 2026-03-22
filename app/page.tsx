import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import PourQui from "@/components/PourQui";
import Reframe from "@/components/Reframe";
import Offer from "@/components/Offer";
import Process from "@/components/Process";
import Approach from "@/components/Approach";
import CtaBand from "@/components/CtaBand";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="relative">
      <Nav />
      <Hero />
      <PourQui />
      <Reframe />
      <Offer />
      <Process />
      <Approach />
      <CtaBand />
      <Contact />
      <Footer />
    </main>
  );
}
