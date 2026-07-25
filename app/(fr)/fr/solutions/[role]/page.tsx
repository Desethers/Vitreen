import { notFound } from "next/navigation";
import PageStructuredData from "@/components/PageStructuredData";
import SolutionPage from "@/components/SolutionPage";
import { ROLE_SLUGS, type RoleSlug } from "@/lib/solutions";
import { SOLUTION_SEO, pageMetadata } from "@/lib/seo";

type Params = { role: string };

function isRoleSlug(role: string): role is RoleSlug {
  return (ROLE_SLUGS as readonly string[]).includes(role);
}

export function generateStaticParams(): Params[] {
  return ROLE_SLUGS.map((role) => ({ role }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }) {
  const { role } = await params;
  if (!isRoleSlug(role)) return {};
  const seo = SOLUTION_SEO.fr[role];
  return pageMetadata({
    lang: "fr",
    path: `/solutions/${role}`,
    title: seo.title,
    description: seo.description,
  });
}

export default async function Page({ params }: { params: Promise<Params> }) {
  const { role } = await params;
  if (!isRoleSlug(role)) notFound();
  const seo = SOLUTION_SEO.fr[role];
  return (
    <>
      <PageStructuredData
        lang="fr"
        path={`/solutions/${role}`}
        title={seo.title}
        description={seo.description}
      />
      <SolutionPage slug={role} />
    </>
  );
}
