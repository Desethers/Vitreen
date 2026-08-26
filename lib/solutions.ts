export const ROLE_SLUGS = ["galleries", "advisors", "artists"] as const;

export type RoleSlug = (typeof ROLE_SLUGS)[number];

export const ROLE_HREF: Record<RoleSlug, string> = {
  galleries: "/solutions/galleries",
  advisors: "/solutions/advisors",
  artists: "/solutions/artists",
};
