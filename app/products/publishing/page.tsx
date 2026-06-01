import ToolPage from "@/components/ToolPage";

export const metadata = {
  title: "Publishing",
  description:
    "Pages web, PDFs et communication collectionneurs depuis la même structure d’œuvres.",
  alternates: { canonical: "/products/publishing" },
  openGraph: {
    url: "/products/publishing",
    title: "Publishing — Vitreen",
    description:
      "Pages web, PDFs et communication collectionneurs depuis la même structure d’œuvres.",
  },
};

export default function Page() {
  return <ToolPage slug="publishing" />;
}
