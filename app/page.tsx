import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import ViewingRoomStudio from "@/components/ViewingRoomStudio";
import ArtworkSourceSection from "@/components/ArtworkSourceSection";
import { GalleryWorkflowMock } from "@/components/Showcase";

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
      <section className="bg-white px-4 pb-12 md:px-6 md:pb-[60px]">
        <div className="mx-auto max-w-7xl">
          <div className="relative h-[360px] overflow-visible md:h-[520px]">
            <GalleryWorkflowMock />
          </div>
        </div>
      </section>
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
