import ToolPage from "@/components/ToolPage";

export const metadata = {
  title: "Overview",
  description: "Outils connectés pour expositions, publication et communication collectionneurs.",
  alternates: { canonical: "/products/overview" },
  openGraph: {
    url: "/products/overview",
    title: "Overview — Vitreen",
    description: "Outils connectés pour expositions, publication et communication collectionneurs.",
  },
};

export default function Page() {
  return <ToolPage slug="overview" />;
}
