import type { Metadata } from "next";
import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import HeroDashboardMock from "@/components/HeroDashboardMock";
import PortfolioPreviewShell from "@/components/PortfolioPreviewShell";

/* Embeddable showcase of the homepage hero — same content as "/", so it must
 * never compete with it in search. */
export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

export default function PortfolioPreviewPage() {
  return (
    <PortfolioPreviewShell>
      <Nav />
      <Hero />
      <HeroDashboardMock />
    </PortfolioPreviewShell>
  );
}
