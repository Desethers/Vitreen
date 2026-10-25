import { notFound } from "next/navigation";
import PageStructuredData from "@/components/PageStructuredData";
import SeoPage from "@/components/SeoPage";
import { ROLE_PATHS, ROLE_PATH_SLUGS, type RolePath } from "@/lib/solutions";
import { seoPageProps } from "@/lib/seoPages";

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
  return seoPageProps(ROLE_PATHS[role], "en", `/solutions/${role}`).metadata;
}

export default async function Page({ params }: { params: Promise<Params> }) {
  const { role } = await params;
  if (!isRolePath(role)) notFound();
  const { seo } = seoPageProps(ROLE_PATHS[role], "en", `/solutions/${role}`);
  return (
    <>
      <PageStructuredData {...seo} />
      <SeoPage id={ROLE_PATHS[role]} lang="en" />
    </>
  );
}
