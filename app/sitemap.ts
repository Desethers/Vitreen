import type { MetadataRoute } from "next";
import { ROLE_SLUGS } from "@/lib/solutions";
import { SITE_URL, localeUrls } from "@/lib/seo";

/* Les canoniques rendues par `alternates()` n'ont pas de slash final ("/" est
 * résolu en https://vitreen.art). Le sitemap doit déclarer exactement la même
 * chaîne, sinon la racine y apparaît sous une forme que la page elle-même ne
 * revendique pas. */
function abs(path: string) {
  return `${SITE_URL}${path === "/" ? "" : path}`;
}

/* Only the product pages we actually link to and want indexed. The templated
 * offshoots (inquiries, mobile, previews) stay out until they carry a subject
 * of their own — they currently restate viewing-rooms and publishing. */
const toolSlugs = ["artwork-inventory", "viewing-rooms", "sales-assistant"] as const;

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
  return 0.7;
}

export default function sitemap(): MetadataRoute.Sitemap {
  /* Each entry declares both languages so the two versions are paired rather
   * than read as duplicates. */
  const entries: MetadataRoute.Sitemap = paths.flatMap((path) => {
    const urls = localeUrls(path);
    const languages = {
      "en-GB": abs(urls.en),
      "fr-FR": abs(urls.fr),
      "x-default": abs(urls.en),
    };

    return (["en", "fr"] as const).map((lang) => ({
      url: abs(urls[lang]),
      changeFrequency: path === "/" ? ("weekly" as const) : ("monthly" as const),
      priority: priorityFor(path),
      alternates: { languages },
    }));
  });

  /* Vitreen Studio is a separate static build served under /studio, with its
   * FR version at /studio/fr rather than the usual /fr prefix — it can't go
   * through the paths/localeUrls machinery above. */
  const studioLanguages = {
    "en-GB": `${SITE_URL}/studio`,
    "fr-FR": `${SITE_URL}/studio/fr`,
    "x-default": `${SITE_URL}/studio`,
  };
  entries.push(
    {
      url: `${SITE_URL}/studio`,
      changeFrequency: "monthly",
      priority: 0.7,
      alternates: { languages: studioLanguages },
    },
    {
      url: `${SITE_URL}/studio/fr`,
      changeFrequency: "monthly",
      priority: 0.7,
      alternates: { languages: studioLanguages },
    }
  );

  return entries;
}
