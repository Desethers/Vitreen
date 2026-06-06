import StudiesLayout, { type Study } from "@/components/studies/StudiesLayout";

export const metadata = {
  title: "Studies — Solution",
  robots: { index: false, follow: false },
};

const studies: Study[] = [];

export default function StudiesSolutionPage() {
  return (
    <StudiesLayout
      title="Solution"
      description="Sections and components used across the solution pages — to be catalogued here."
      studies={studies}
    />
  );
}
