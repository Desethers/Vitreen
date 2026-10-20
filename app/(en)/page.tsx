import type { Metadata } from "next";
import LandingNav from "@/components/landing/LandingNav";
import LandingHero from "@/components/landing/LandingHero";
import ConversationSections, {
  CONVERSATION_SECTIONS_EN,
} from "@/components/landing/conversations/ConversationSections";
import LandingOffers from "@/components/landing/LandingOffers";
import LandingFaq from "@/components/landing/LandingFaq";
import LandingCta from "@/components/landing/LandingCta";
import WhoVitreenIsFor from "@/components/WhoVitreenIsFor";

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
      <ConversationSections
        copy={CONVERSATION_SECTIONS_EN}
        afterWhatsApp={<WhoVitreenIsFor lang="en" />}
      />
      <LandingOffers />
      <LandingFaq />
      <LandingCta />
    </main>
  );
}
