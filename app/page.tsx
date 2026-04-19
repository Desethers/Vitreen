import dynamic from "next/dynamic";
import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Showcase from "@/components/Showcase";

const Audiences = dynamic(() => import("@/components/Audiences"));
import Solution from "@/components/Solution";
import ProcessFlow from "@/components/ProcessFlow";
import Services from "@/components/Services";
import StatementSplit from "@/components/StatementSplit";
import QuoteSection from "@/components/QuoteSection";
import Faq from "@/components/Faq";
import CtaBand from "@/components/CtaBand";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="relative">
      <Nav />
      <Hero />
      <Audiences />
      <ProcessFlow />
      <Showcase />
      <Solution />
      <QuoteSection />
      <Services />
      <Faq />
      <StatementSplit />
      <CtaBand />
      <Footer />
    </main>
  );
}
