import StudiesLayout, { type Study } from "@/components/studies/StudiesLayout";

export const metadata = {
  title: "Studies — Editor",
  robots: { index: false, follow: false },
};

const studies: Study[] = [];

export default function StudiesEditorPage() {
  return (
    <StudiesLayout
      title="Editor"
      description="Sections and components from the Viewing Room editor — to be catalogued here."
      studies={studies}
    />
  );
}
