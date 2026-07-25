import type { MetadataRoute } from "next";
import { ROLE_SLUGS } from "@/lib/solutions";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://vitreen.art";

/* Only the product pages we actually link to and want indexed. The templated
 * offshoots (inquiries, mobile, previews) stay out until they carry a subject
 * of their own — they currently restate viewing-rooms and publishing. */
const toolSlugs = [
  "overview",
  "archive",
  "publishing",
  "viewing-rooms",
  "custom-operations",
] as const;

const staticRoutes = ["/", "/pricing"] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const routes: MetadataRoute.Sitemap = staticRoutes.map((path) => ({
    url: `${SITE_URL}${path}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: path === "/" ? 1 : 0.7,
  }));

  const toolRoutes: MetadataRoute.Sitemap = toolSlugs.map((slug) => ({
    url: `${SITE_URL}/products/${slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: slug === "overview" ? 0.8 : 0.7,
  }));

  const solutionRoutes: MetadataRoute.Sitemap = ROLE_SLUGS.map((role) => ({
    url: `${SITE_URL}/solutions/${role}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [...routes, ...toolRoutes, ...solutionRoutes];
}
