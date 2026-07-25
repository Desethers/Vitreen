import type { Metadata } from "next";
import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import HeroDashboardMock from "@/components/HeroDashboardMock";
import ProcessFlow from "@/components/ProcessFlow";
import SignatureDemo from "@/components/SignatureDemo";
import QuoteSection from "@/components/QuoteSection";
import StatementSplit from "@/components/StatementSplit";
import Services from "@/components/Services";
import PricingBand from "@/components/PricingBand";
import Faq from "@/components/Faq";
import CtaBand from "@/components/CtaBand";
import Footer from "@/components/Footer";

import { alternates } from "@/lib/seo";

export const metadata: Metadata = {
  title: { absolute: "Vitreen — Gallery OS for contemporary art galleries" },
  description:
    "Organise artworks, publish your gallery website and share private collector presentations from one set of artwork records.",
  alternates: alternates("en", "/"),
  openGraph: {
    url: "/",
    title: "Vitreen — Gallery OS for contemporary art galleries",
    description:
      "Organise artworks, publish your gallery website and share private collector presentations from one set of artwork records.",
  },
};

export default function Home() {
  return (
    <main className="relative">
      <Nav />
      <Hero />
      <HeroDashboardMock />
      <ProcessFlow />
      <Services />
      <SignatureDemo />
      <QuoteSection />
      <PricingBand />
      <Faq />
      <StatementSplit />
      <CtaBand />
      <Footer />
    </main>
  );
}
