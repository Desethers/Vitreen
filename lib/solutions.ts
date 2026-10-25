/** Content keys of the solution pages (strings.ts, SolutionPage). */
export const ROLE_SLUGS = ["galleries", "advisors", "artists"] as const;

export type RoleSlug = (typeof ROLE_SLUGS)[number];

/** Published solution pages: public URL segment → content key. Artists is no longer published. */
export const ROLE_PATHS = {
  "art-galleries": "galleries",
  "art-advisors-dealers": "advisors",
} as const satisfies Record<string, RoleSlug>;

export type RolePath = keyof typeof ROLE_PATHS;

export const ROLE_PATH_SLUGS = Object.keys(ROLE_PATHS) as RolePath[];
