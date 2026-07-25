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
  title: { absolute: "Vitreen — Gallery OS pour galeries d’art contemporain" },
  description:
    "Organisez vos œuvres, publiez le site de votre galerie et partagez des présentations privées depuis les mêmes fiches d’œuvres.",
  alternates: alternates("fr", "/"),
  openGraph: {
    url: "/fr",
    title: "Vitreen — Gallery OS pour galeries d’art contemporain",
    description:
      "Organisez vos œuvres, publiez le site de votre galerie et partagez des présentations privées depuis les mêmes fiches d’œuvres.",
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
