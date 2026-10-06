import type { Metadata } from "next";
import LandingNav from "@/components/landing/LandingNav";
import LandingHero from "@/components/landing/LandingHero";
import LandingRecognition from "@/components/landing/LandingRecognition";
import LandingOutputs from "@/components/landing/LandingOutputs";
import LandingRelationships from "@/components/landing/LandingRelationships";
import WhoVitreenIsFor from "@/components/WhoVitreenIsFor";
import LandingOffers from "@/components/landing/LandingOffers";
import StatementSplit from "@/components/StatementSplit";
import LandingFaq from "@/components/landing/LandingFaq";
import LandingCta from "@/components/landing/LandingCta";

import { alternates } from "@/lib/seo";

export const metadata: Metadata = {
  title: { absolute: "Vitreen — Sales and inventory software for art galleries" },
  description:
    "Sales and inventory tools for art galleries and dealers in design and collectible objects.",
  alternates: alternates("en", "/"),
  openGraph: {
    url: "/",
    title: "Vitreen — Sales and inventory software for art galleries",
    description:
      "Sales and inventory tools for art galleries and dealers in design and collectible objects.",
  },
};

export default function Home() {
  return (
    <main className="relative bg-white">
      <LandingNav />
      <LandingHero />
      <LandingOutputs />
      <LandingRecognition />
      <LandingRelationships />
      <WhoVitreenIsFor />
      <LandingOffers />
      <LandingFaq />
      <StatementSplit />
      <LandingCta />
    </main>
  );
}
