import GalleryAssistantProductPage from "@/components/GalleryAssistantProductPage";

export const metadata = {
  title: "Custom Operations",
  description: "Workflows sur mesure adaptés à votre galerie.",
  alternates: { canonical: "/products/custom-operations" },
  openGraph: {
    url: "/products/custom-operations",
    title: "Custom Operations — Vitreen",
    description: "Workflows sur mesure adaptés à votre galerie.",
  },
};

export default function Page() {
  return <GalleryAssistantProductPage />;
}
