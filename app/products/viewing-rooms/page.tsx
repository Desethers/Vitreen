import ViewingRoomsProductPage from "@/components/ViewingRoomsProductPage";

export const metadata = {
  title: "Private viewing rooms",
  description:
    "Share private artwork selections with collectors by link or PDF, prepared from your existing inventory.",
  alternates: { canonical: "/products/viewing-rooms" },
  openGraph: {
    url: "/products/viewing-rooms",
    title: "Private viewing rooms — Vitreen",
    description:
      "Share private artwork selections with collectors by link or PDF, prepared from your existing inventory.",
  },
};

export default function Page() {
  return <ViewingRoomsProductPage />;
}
