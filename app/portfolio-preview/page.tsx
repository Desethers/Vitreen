import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import HeroDashboardMock from "@/components/HeroDashboardMock";
import PortfolioPreviewShell from "@/components/PortfolioPreviewShell";

export default function PortfolioPreviewPage() {
  return (
    <PortfolioPreviewShell>
      <Nav />
      <Hero />
      <HeroDashboardMock />
    </PortfolioPreviewShell>
  );
}
