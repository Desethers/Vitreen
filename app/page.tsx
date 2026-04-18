import dynamic from "next/dynamic";
import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Showcase from "@/components/Showcase";

const Audiences = dynamic(() => import("@/components/Audiences"));
import Solution from "@/components/Solution";
import ProcessFlow from "@/components/ProcessFlow";
import Services from "@/components/Services";
import StatementSplit from "@/components/StatementSplit";
import Faq from "@/components/Faq";
import CtaBand from "@/components/CtaBand";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="relative">
      <Nav />
      <Hero />
      <Audiences />
      <Solution />
      <Showcase />
      <ProcessFlow />
      <Services />
      <StatementSplit />
      <Faq />
      <CtaBand />
      <Footer />
    </main>
  );
}
