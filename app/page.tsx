import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import HeroDashboardMock from "@/components/HeroDashboardMock";
import ProcessFlow from "@/components/ProcessFlow";
import ViewingRoomStudio from "@/components/ViewingRoomStudio";
import ArtworkSourceSection from "@/components/ArtworkSourceSection";

import Solution from "@/components/Solution";
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
      <HeroDashboardMock />
      <ProcessFlow />
      <ArtworkSourceSection />
      <Solution />
      <QuoteSection />
      <ViewingRoomStudio />
      <Services />
      <Faq />
      <StatementSplit />
      <CtaBand />
      <Footer />
    </main>
  );
}
