import { notFound } from "next/navigation";
import SolutionPage from "@/components/SolutionPage";
import { ROLE_SLUGS, type RoleSlug } from "@/lib/solutions";
import { translations } from "@/lib/lang/strings";

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
  const content = translations.fr.solutions[role];
  const url = `/solutions/${role}`;
  return {
    title: content.title,
    description: content.subtitle,
    alternates: { canonical: url },
    openGraph: {
      url,
      title: `${content.eyebrow} — Vitreen`,
      description: content.subtitle,
    },
  };
}

export default async function Page({ params }: { params: Promise<Params> }) {
  const { role } = await params;
  if (!isRoleSlug(role)) notFound();
  return <SolutionPage slug={role} />;
}
