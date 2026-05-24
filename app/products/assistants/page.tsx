import ProductPage from "@/components/ProductPage";

export const metadata = {
  title: "Gallery Assistants — Vitreen",
  description: "Soutenez la publication, les ventes et les opérations quotidiennes.",
  alternates: { canonical: "/products/assistants" },
  openGraph: {
    url: "/products/assistants",
    title: "Gallery Assistants — Vitreen",
    description: "Soutenez la publication, les ventes et les opérations quotidiennes.",
  },
};

export default function Page() {
  return <ProductPage slug="assistants" />;
}
