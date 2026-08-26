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
const toolSlugs = [
  "overview",
  "artwork-inventory",
  "publishing",
  "viewing-rooms",
  "custom-operations",
] as const;

/* Les pages solutions ne se dupliquent pas entre elles (recouvrement de
 * phrases mesuré à 2-10 % le 2026-08-26), mais deux d'entre elles n'ont pas
 * assez de contenu propre pour mériter une demande de crawl sur un domaine
 * encore sans autorité — Google les laisse en « Discovered – currently not
 * indexed » et dépense ailleurs le budget qu'on lui réclame ici.
 *
 * Corps de page mesuré, nav et footer déduits :
 *   galleries 804 · artists 574 · advisors 364 · estates 189 · collectors 47
 *
 * Seuil retenu : ~250 mots de contenu propre. En dessous, la page reste en
 * ligne et liée, elle sort simplement du sitemap — on cesse de la réclamer,
 * on ne la désindexe pas. À réintégrer dès qu'elle est étoffée. */
const SITEMAP_ROLES = ROLE_SLUGS.filter((role) => role !== "collectors" && role !== "estates");

/** Every indexable path, unprefixed. English is served here, French under /fr. */
const paths: string[] = [
  "/",
  "/about",
  "/pricing",
  ...toolSlugs.map((slug) => `/tools/${slug}`),
  ...SITEMAP_ROLES.map((role) => `/solutions/${role}`),
];

function priorityFor(path: string) {
  if (path === "/") return 1;
  if (path === "/tools/overview") return 0.8;
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
