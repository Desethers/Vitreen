import ToolPage from "@/components/ToolPage";

export const metadata = {
  title: "Inquiries",
  description: "Suivez l’intérêt collectionneur à travers œuvres et partages privés.",
  /* Templated offshoot that restates viewing-rooms / publishing and is not
   * linked from the site. Keep it reachable but out of the index until it
   * carries a subject of its own. */
  robots: { index: false, follow: true },
  alternates: { canonical: "/products/inquiries" },
  openGraph: {
    url: "/products/inquiries",
    title: "Inquiries — Vitreen",
    description: "Suivez l’intérêt collectionneur à travers œuvres et partages privés.",
  },
};

export default function Page() {
  return <ToolPage slug="inquiries" />;
}
