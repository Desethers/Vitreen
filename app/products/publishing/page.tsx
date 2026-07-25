import WebsitePublisherProductPage from "@/components/WebsitePublisherProductPage";

export const metadata = {
  title: "Gallery website publishing",
  description:
    "Publish artists, exhibitions and available works to your gallery website from the same artwork records.",
  alternates: { canonical: "/products/publishing" },
  openGraph: {
    url: "/products/publishing",
    title: "Gallery website publishing — Vitreen",
    description:
      "Publish artists, exhibitions and available works to your gallery website from the same artwork records.",
  },
};

export default function Page() {
  return <WebsitePublisherProductPage />;
}
