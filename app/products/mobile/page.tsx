import ToolPage from "@/components/ToolPage";

export const metadata = {
  title: "Mobile",
  description: "Publication galerie, même en déplacement.",
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
