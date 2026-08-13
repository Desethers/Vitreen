import type { Metadata } from "next";
import LandingNav from "@/components/landing/LandingNav";
import LandingHero from "@/components/landing/LandingHero";
import LandingHowItWorks from "@/components/landing/LandingHowItWorks";
import LandingRecognition from "@/components/landing/LandingRecognition";
import LandingProblemStatement from "@/components/landing/LandingProblemStatement";
import LandingInventorySetup from "@/components/landing/LandingInventorySetup";
import LandingOutputs from "@/components/landing/LandingOutputs";
import Difference from "@/components/Difference";
import WhoVitreenIsFor from "@/components/WhoVitreenIsFor";
import LandingOffers from "@/components/landing/LandingOffers";
import StatementSplit from "@/components/StatementSplit";
import LandingFaq from "@/components/landing/LandingFaq";
import LandingCta from "@/components/landing/LandingCta";

import { alternates } from "@/lib/seo";

export const metadata: Metadata = {
  title: { absolute: "Vitreen — Sales tools for contemporary galleries" },
  description:
    "Vitreen connects your artwork data to Gmail and WhatsApp, so your team can find works, prepare presentations and respond to collectors without leaving the conversation.",
  alternates: alternates("en", "/"),
  openGraph: {
    url: "/",
    title: "Vitreen — Sales tools for contemporary galleries",
    description:
      "Vitreen connects your artwork data to Gmail and WhatsApp, so your team can find works, prepare presentations and respond to collectors without leaving the conversation.",
  },
};

export default function Home() {
  return (
    <main className="relative bg-white">
      <LandingNav />
      <LandingHero />
      <LandingOutputs />
      <LandingHowItWorks />
      <LandingRecognition />
      <LandingProblemStatement />
      <LandingInventorySetup />
      <WhoVitreenIsFor />
      <Difference />
      <LandingOffers />
      <LandingFaq />
      <StatementSplit />
      <LandingCta />
    </main>
  );
}
