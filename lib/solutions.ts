import type { SeoPageId } from "@/lib/seoPages";

/** Content keys of the former solution pages (strings.ts, SolutionPage). */
export const ROLE_SLUGS = ["galleries", "advisors", "artists"] as const;

export type RoleSlug = (typeof ROLE_SLUGS)[number];

/** Published solution pages: public URL segment → SeoPage content. Artists is no longer published. */
export const ROLE_PATHS = {
  "art-galleries": "art-galleries",
  "design-galleries": "design-galleries",
  "art-advisors-dealers": "advisors",
  "antique-dealers": "antique-dealers",
} as const satisfies Record<string, SeoPageId>;

export type RolePath = keyof typeof ROLE_PATHS;

export const ROLE_PATH_SLUGS = Object.keys(ROLE_PATHS) as RolePath[];
