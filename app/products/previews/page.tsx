import ToolPage from "@/components/ToolPage";

export const metadata = {
  title: "Previews",
  description: "Présentations privées d’œuvres pour collectionneurs.",
  alternates: { canonical: "/products/previews" },
  openGraph: {
    url: "/products/previews",
    title: "Previews — Vitreen",
    description: "Présentations privées d’œuvres pour collectionneurs.",
  },
};

export default function Page() {
  return <ToolPage slug="previews" />;
}
