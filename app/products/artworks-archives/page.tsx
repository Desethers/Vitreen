import ProductPage from "@/components/ProductPage";

export const metadata = {
  title: "Artworks & Archives — Vitreen",
  description: "Structurez l'inventaire sans remplacer vos outils existants.",
  alternates: { canonical: "/products/artworks-archives" },
  openGraph: {
    url: "/products/artworks-archives",
    title: "Artworks & Archives — Vitreen",
    description: "Structurez l'inventaire sans remplacer vos outils existants.",
  },
};

export default function Page() {
  return <ProductPage slug="artworks-archives" />;
}
