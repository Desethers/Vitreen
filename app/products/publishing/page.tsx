import ProductPage from "@/components/ProductPage";

export const metadata = {
  title: "Public & Private Publishing — Vitreen",
  description: "Publiez partout, depuis une seule source.",
  alternates: { canonical: "/products/publishing" },
  openGraph: {
    url: "/products/publishing",
    title: "Public & Private Publishing — Vitreen",
    description: "Publiez partout, depuis une seule source.",
  },
};

export default function Page() {
  return <ProductPage slug="publishing" />;
}
