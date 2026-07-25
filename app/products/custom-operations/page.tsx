import GalleryAssistantProductPage from "@/components/GalleryAssistantProductPage";

export const metadata = {
  title: "Gallery assistant",
  description:
    "Prepare collector replies and sales material from your own gallery records, reviewed before anything is sent.",
  alternates: { canonical: "/products/custom-operations" },
  openGraph: {
    url: "/products/custom-operations",
    title: "Gallery assistant — Vitreen",
    description:
      "Prepare collector replies and sales material from your own gallery records, reviewed before anything is sent.",
  },
};

export default function Page() {
  return <GalleryAssistantProductPage />;
}
