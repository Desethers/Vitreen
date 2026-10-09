import type { Metadata } from "next";
import LandingNav from "@/components/landing/LandingNav";
import LandingHero from "@/components/landing/LandingHero";
import LandingRecognition from "@/components/landing/LandingRecognition";
import LandingRelationships from "@/components/landing/LandingRelationships";
import LandingPillars from "@/components/landing/LandingPillars";
import LandingHowItWorks from "@/components/landing/LandingHowItWorks";
import LandingFounder from "@/components/landing/LandingFounder";
import LandingPromises from "@/components/landing/LandingPromises";
import WhoVitreenIsFor from "@/components/WhoVitreenIsFor";
import LandingOffers from "@/components/landing/LandingOffers";
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
      <LandingRecognition />
      <LandingPillars />
      <LandingRelationships />
      <LandingHowItWorks />
      <LandingPromises />
      <LandingFounder />
      <WhoVitreenIsFor />
      <LandingOffers />
      <LandingFaq />
      <LandingCta />
    </main>
  );
}
