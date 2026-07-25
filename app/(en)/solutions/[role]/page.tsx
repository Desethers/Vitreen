import { notFound } from "next/navigation";
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
  const seo = SOLUTION_SEO.en[role];
  return pageMetadata({
    lang: "en",
    path: `/solutions/${role}`,
    title: seo.title,
    description: seo.description,
  });
}

export default async function Page({ params }: { params: Promise<Params> }) {
  const { role } = await params;
  if (!isRoleSlug(role)) notFound();
  return <SolutionPage slug={role} />;
}
