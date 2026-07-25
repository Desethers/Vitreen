import type { Metadata } from "next";
import PricingPage from "@/components/PricingPage";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  lang: "en",
  path: "/pricing",
  title: "Pricing",
  description:
    "A clear setup price and monthly partnership for a Gallery OS built around your gallery.",
});

export default function Page() {
  return <PricingPage />;
}
