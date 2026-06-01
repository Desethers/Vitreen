import ToolPage from "@/components/ToolPage";

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
  return <ToolPage slug="custom-operations" />;
}
