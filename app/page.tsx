import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import HeroDashboardMock from "@/components/HeroDashboardMock";
import ProcessFlow from "@/components/ProcessFlow";
import HomeAddIns from "@/components/HomeAddIns";
import QuoteSection from "@/components/QuoteSection";
import StatementSplit from "@/components/StatementSplit";
import Services from "@/components/Services";
import PricingBand from "@/components/PricingBand";
import Faq from "@/components/Faq";
import CtaBand from "@/components/CtaBand";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="relative">
      <Nav />
      <Hero />
      <HeroDashboardMock />
      <ProcessFlow />
      <Services />
      <HomeAddIns />
      <QuoteSection />
      <PricingBand />
      <Faq />
      <StatementSplit />
      <CtaBand />
      <Footer />
    </main>
  );
}
