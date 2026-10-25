import { notFound } from "next/navigation";
import PageStructuredData from "@/components/PageStructuredData";
import SolutionPage from "@/components/SolutionPage";
import { ROLE_PATHS, ROLE_PATH_SLUGS, type RolePath } from "@/lib/solutions";
import { SOLUTION_SEO, pageMetadata } from "@/lib/seo";

type Params = { role: string };

export const dynamicParams = false;

function isRolePath(role: string): role is RolePath {
  return (ROLE_PATH_SLUGS as string[]).includes(role);
}

export function generateStaticParams(): Params[] {
  return ROLE_PATH_SLUGS.map((role) => ({ role }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }) {
  const { role } = await params;
  if (!isRolePath(role)) return {};
  const seo = SOLUTION_SEO.en[ROLE_PATHS[role]];
  return pageMetadata({
    lang: "en",
    path: `/solutions/${role}`,
    title: seo.title,
    description: seo.description,
  });
}

export default async function Page({ params }: { params: Promise<Params> }) {
  const { role } = await params;
  if (!isRolePath(role)) notFound();
  const seo = SOLUTION_SEO.en[ROLE_PATHS[role]];
  return (
    <>
      <PageStructuredData
        lang="en"
        path={`/solutions/${role}`}
        title={seo.title}
        description={seo.description}
      />
      <SolutionPage slug={ROLE_PATHS[role]} />
    </>
  );
}
