import type { Metadata } from "next";
import PricingPage from "@/components/PricingPage";

export const metadata: Metadata = {
  title: "Pricing",
  description:
    "A clear setup price and monthly partnership for a Gallery OS built around your gallery.",
  alternates: { canonical: "/pricing" },
  openGraph: {
    url: "/pricing",
    title: "Pricing — Vitreen",
    description:
      "One offer: a connected website, artwork dashboard, gallery add-ins and ongoing support.",
  },
};

export default function Page() {
  return <PricingPage />;
}
