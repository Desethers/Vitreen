import ToolPage from "@/components/ToolPage";

export const metadata = {
  title: "Inquiries",
  description: "Suivez l’intérêt collectionneur à travers œuvres et partages privés.",
  alternates: { canonical: "/tools/inquiries" },
  openGraph: {
    url: "/tools/inquiries",
    title: "Inquiries — Vitreen",
    description: "Suivez l’intérêt collectionneur à travers œuvres et partages privés.",
  },
};

export default function Page() {
  return <ToolPage slug="inquiries" />;
}
