import ProductPage from "@/components/ProductPage";

export const metadata = {
  title: "Collector Relationships — Vitreen",
  description: "Conversations, demandes et suivis connectés aux bonnes œuvres.",
  alternates: { canonical: "/products/collector-relationships" },
  openGraph: {
    url: "/products/collector-relationships",
    title: "Collector Relationships — Vitreen",
    description: "Conversations, demandes et suivis connectés aux bonnes œuvres.",
  },
};

export default function Page() {
  return <ProductPage slug="collector-relationships" />;
}
