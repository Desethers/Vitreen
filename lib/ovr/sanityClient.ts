import { createClient } from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";
import type { SanityImageSource } from "./types";

const projectId = (process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "placeholder").trim();
const dataset = (process.env.NEXT_PUBLIC_SANITY_DATASET || "production").trim();

export function getSanityConfigError({
  requireWriteToken = false,
}: { requireWriteToken?: boolean } = {}) {
  if (!projectId || projectId === "placeholder") {
    return "Sanity non configuré : NEXT_PUBLIC_SANITY_PROJECT_ID est manquant.";
  }
  if (!dataset || dataset === "placeholder") {
    return "Sanity non configuré : NEXT_PUBLIC_SANITY_DATASET est manquant.";
  }
  if (requireWriteToken && !process.env.SANITY_API_TOKEN) {
    return "Sanity non configuré : SANITY_API_TOKEN est manquant pour la publication.";
  }
  return null;
}

export const client = createClient({
  projectId,
  dataset,
  apiVersion: "2024-01-01",
  useCdn: true,
});

export const writeClient = createClient({
  projectId,
  dataset,
  apiVersion: "2024-01-01",
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
});

const builder = imageUrlBuilder(client);

export function urlFor(source: SanityImageSource) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return builder.image(source as any);
}

export async function getArtworks(): Promise<import("./types").Artwork[]> {
  return client.fetch<import("./types").Artwork[]>(
    `*[_type == "artwork"] | order(_createdAt desc) {
      _id, title, year, medium, dimensions, price,
      image,
      artist->{ _id, name, slug }
    }`
  );
}

export async function getArtists(): Promise<import("./types").Artist[]> {
  return client.fetch<import("./types").Artist[]>(
    `*[_type == "artist"] | order(name asc) {
      _id, name, slug
    }`
  );
}

export async function searchArtworks(q: string): Promise<import("./types").ArtworkSearchHit[]> {
  if (!q.trim()) return [];
  return client.fetch<import("./types").ArtworkSearchHit[]>(
    `*[_type == "artwork" && (title match $pattern || artist->name match $pattern)] | order(_createdAt desc)[0...12] {
      _id, title, year,
      "imageUrl": image.asset->url,
      "artistName": artist->name
    }`,
    { pattern: `*${q}*` } as Record<string, unknown>
  );
}
