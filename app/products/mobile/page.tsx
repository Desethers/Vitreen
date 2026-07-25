import ToolPage from "@/components/ToolPage";

export const metadata = {
  title: "Mobile",
  description: "Publication galerie, même en déplacement.",
  /* Templated offshoot that restates viewing-rooms / publishing and is not
   * linked from the site. Keep it reachable but out of the index until it
   * carries a subject of its own. */
  robots: { index: false, follow: true },
  alternates: { canonical: "/products/mobile" },
  openGraph: {
    url: "/products/mobile",
    title: "Mobile — Vitreen",
    description: "Publication galerie, même en déplacement.",
  },
};

export default function Page() {
  return <ToolPage slug="mobile" />;
}
