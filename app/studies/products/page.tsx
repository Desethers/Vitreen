import StudiesLayout, { type Study } from "@/components/studies/StudiesLayout";

export const metadata = {
  title: "Studies — Products",
  robots: { index: false, follow: false },
};

const studies: Study[] = [];

export default function StudiesProductsPage() {
  return (
    <StudiesLayout
      title="Products"
      description="Sections and components used across the product pages — to be catalogued here."
      studies={studies}
    />
  );
}
