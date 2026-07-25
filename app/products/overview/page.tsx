import ToolPage from "@/components/ToolPage";

export const metadata = {
  title: "Gallery OS",
  description:
    "The connected system behind a gallery: artwork records, website publishing, private selections and collector follow-up.",
  alternates: { canonical: "/products/overview" },
  openGraph: {
    url: "/products/overview",
    title: "Gallery OS — Vitreen",
    description:
      "The connected system behind a gallery: artwork records, website publishing, private selections and collector follow-up.",
  },
};

export default function Page() {
  return <ToolPage slug="overview" />;
}
