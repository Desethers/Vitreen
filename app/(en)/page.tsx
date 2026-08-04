import type { Metadata } from "next";
import LandingNav from "@/components/landing/LandingNav";
import LandingHero from "@/components/landing/LandingHero";
import LandingProblem from "@/components/landing/LandingProblem";
import LandingProduct from "@/components/landing/LandingProduct";
import LandingOffers from "@/components/landing/LandingOffers";
import LandingMethod from "@/components/landing/LandingMethod";

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
      <LandingProblem />
      <LandingProduct />
      <LandingMethod />
      <LandingOffers />
    </main>
  );
}
