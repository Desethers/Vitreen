import type { Lang } from "@/lib/lang";
import { HTML_LANG, SITE_NAME, SITE_URL, localeUrls } from "@/lib/seo";

type Breadcrumb = {
  name: string;
  path: string;
};

export default function PageStructuredData({
  lang,
  path,
  title,
  description,
  section,
}: {
  lang: Lang;
  path: string;
  title: string;
  description: string;
  section?: Breadcrumb;
}) {
  const pageUrl = `${SITE_URL}${localeUrls(path)[lang]}`;
  const homeUrl = `${SITE_URL}${localeUrls("/")[lang]}`;
  const breadcrumbs = [
    { name: lang === "fr" ? "Accueil" : "Home", url: homeUrl },
    ...(section
      ? [{ name: section.name, url: `${SITE_URL}${localeUrls(section.path)[lang]}` }]
      : []),
    { name: title, url: pageUrl },
  ];

  const graph = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${pageUrl}#webpage`,
        url: pageUrl,
        name: `${title} — ${SITE_NAME}`,
        description,
        inLanguage: HTML_LANG[lang],
        isPartOf: { "@id": `${SITE_URL}/#website` },
        breadcrumb: { "@id": `${pageUrl}#breadcrumb` },
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${pageUrl}#breadcrumb`,
        itemListElement: breadcrumbs.map((item, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name: item.name,
          item: item.url,
        })),
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(graph).replace(/</g, "\\u003c") }}
    />
  );
}
