import { NextResponse, type NextRequest } from "next/server";

const COOKIE = "vitreen-lang";
const COOKIE_MAX_AGE = 60 * 60 * 24 * 365; // 1 year

/* Thin/orphan pages with no French counterpart (unlinked, already noindex) —
 * never redirect these, or a French visitor would hit a 404 on /fr/... */
const NO_FRENCH_VERSION = [
  "/portfolio-preview",
  "/tools/inquiries",
  "/tools/mobile",
  "/tools/previews",
  "/studio",
];

/* Les moteurs doivent toujours recevoir l'URL qu'ils ont demandée. La
 * redirection géo ci-dessous s'appuie sur l'IP : dès qu'un crawl part d'une
 * adresse française, chaque URL anglaise répond 307 vers /fr alors qu'elle se
 * déclare canonique dans le sitemap — et toute la branche EN bascule en
 * « Page with redirect » dans Search Console. Google déconseille
 * explicitement les redirections automatiques fondées sur le pays supposé.
 * Les bots sortent donc du mécanisme : ils voient les deux versions, reliées
 * par les balises hreflang. */
/* `inspectiontool` couvre Google-InspectionTool, l'agent de « Tester l'URL
 * en direct » dans Search Console : sans lui, l'outil verrait un 307 là où
 * le vrai Googlebot voit la page. */
const CRAWLER_UA =
  /bot|crawler|spider|crawling|slurp|inspectiontool|google-extended|bingpreview|facebookexternalhit|embedly|quora link preview|outbrain|pinterest|whatsapp|telegram|discord|lighthouse|headlesschrome/i;

function isCrawler(request: NextRequest) {
  return CRAWLER_UA.test(request.headers.get("user-agent") ?? "");
}

function toFrench(request: NextRequest) {
  const url = request.nextUrl.clone();
  url.pathname = `/fr${request.nextUrl.pathname === "/" ? "" : request.nextUrl.pathname}`;
  return NextResponse.redirect(url);
}

export function proxy(request: NextRequest) {
  /* Geo/cookie redirect is a production-only concern (it relies on Vercel's
   * x-vercel-ip-country header, which is absent locally). In dev it only
   * causes confusion: whichever URL you type stays stuck once a stray
   * vitreen-lang cookie is set, since every "/" request bounces to "/fr". */
  if (process.env.NODE_ENV !== "production") {
    return NextResponse.next();
  }

  const { pathname } = request.nextUrl;

  const isFrenchPath = pathname === "/fr" || pathname.startsWith("/fr/");
  const hasNoFrenchVersion = NO_FRENCH_VERSION.some(
    (path) => pathname === path || pathname.startsWith(`${path}/`)
  );

  /* Direct visits to /fr (shared links, search results already showing the
   * fr-FR listing) are always respected — geo only decides the English root.
   * Les crawlers ne sont jamais redirigés, et ne reçoivent pas non plus le
   * cookie de langue (il ne servirait à rien et polluerait la réponse mise en
   * cache). */
  if (isFrenchPath || hasNoFrenchVersion || isCrawler(request)) {
    return NextResponse.next();
  }

  const storedLang = request.cookies.get(COOKIE)?.value;

  if (storedLang === "en") {
    return NextResponse.next();
  }

  if (storedLang === "fr") {
    return toFrench(request);
  }

  /* No stored preference yet: this is a first visit, decide from geo.
   * Vercel sets this header at the edge; it's absent when running locally. */
  const country = request.headers.get("x-vercel-ip-country");

  if (country === "FR") {
    const response = toFrench(request);
    response.cookies.set(COOKIE, "fr", { maxAge: COOKIE_MAX_AGE, path: "/" });
    return response;
  }

  const response = NextResponse.next();
  response.cookies.set(COOKIE, "en", { maxAge: COOKIE_MAX_AGE, path: "/" });
  return response;
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|api|favicon.ico|icon.png|robots.txt|sitemap.xml|.*\\..*).*)",
  ],
};
