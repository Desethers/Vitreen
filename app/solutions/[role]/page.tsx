import { notFound } from "next/navigation";
import SolutionPage from "@/components/SolutionPage";
import { ROLE_SLUGS, type RoleSlug } from "@/lib/solutions";

type Params = { role: string };

function isRoleSlug(role: string): role is RoleSlug {
  return (ROLE_SLUGS as readonly string[]).includes(role);
}

export function generateStaticParams(): Params[] {
  return ROLE_SLUGS.map((role) => ({ role }));
}

/* Short, distinct subjects per audience so these pages never compete with the
 * product pages (which describe features) or with each other. */
const SEO: Record<RoleSlug, { title: string; description: string }> = {
  galleries: {
    title: "Software for art galleries",
    description:
      "A connected website and artwork dashboard built around how your gallery already works, from inventory to collector follow-up.",
  },
  artists: {
    title: "Artwork archive for artists",
    description:
      "Keep your studio inventory in order, publish your artist website and prepare private presentations from the same records.",
  },
  advisors: {
    title: "Software for art advisors and dealers",
    description:
      "Build private artwork selections for clients and keep each conversation attached to the works it concerns.",
  },
  collectors: {
    title: "Collection records for collectors",
    description:
      "Keep acquisitions, documents and provenance together, with private viewing access to the works you are offered.",
  },
  estates: {
    title: "Artwork records for artist estates",
    description:
      "Structure a body of work — series, provenance and archival material — so it stays usable across exhibitions and transmission.",
  },
};

export async function generateMetadata({ params }: { params: Promise<Params> }) {
  const { role } = await params;
  if (!isRoleSlug(role)) return {};
  const seo = SEO[role];
  const url = `/solutions/${role}`;
  return {
    title: seo.title,
    description: seo.description,
    alternates: { canonical: url },
    openGraph: {
      url,
      title: `${seo.title} — Vitreen`,
      description: seo.description,
    },
  };
}

export default async function Page({ params }: { params: Promise<Params> }) {
  const { role } = await params;
  if (!isRoleSlug(role)) notFound();
  return <SolutionPage slug={role} />;
}
