import type { MetadataRoute } from "next";
import { ROLE_SLUGS } from "@/lib/solutions";
import { SITE_URL, localeUrls } from "@/lib/seo";

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

/** Every indexable path, unprefixed. English is served here, French under /fr. */
const paths: string[] = [
  "/",
  "/about",
  "/pricing",
  ...toolSlugs.map((slug) => `/tools/${slug}`),
  ...ROLE_SLUGS.map((role) => `/solutions/${role}`),
];

function priorityFor(path: string) {
  if (path === "/") return 1;
  if (path === "/tools/overview") return 0.8;
  return 0.7;
}

export default function sitemap(): MetadataRoute.Sitemap {
  /* Each entry declares both languages so the two versions are paired rather
   * than read as duplicates. */
  return paths.flatMap((path) => {
    const urls = localeUrls(path);
    const languages = {
      "en-GB": `${SITE_URL}${urls.en}`,
      "fr-FR": `${SITE_URL}${urls.fr}`,
      "x-default": `${SITE_URL}${urls.en}`,
    };

    return (["en", "fr"] as const).map((lang) => ({
      url: `${SITE_URL}${urls[lang]}`,
      changeFrequency: path === "/" ? ("weekly" as const) : ("monthly" as const),
      priority: priorityFor(path),
      alternates: { languages },
    }));
  });
}
