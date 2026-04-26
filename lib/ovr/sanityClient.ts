import { createClient } from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'placeholder'
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'

export const client = createClient({
  projectId,
  dataset,
  apiVersion: '2024-01-01',
  useCdn: true,
})

export const writeClient = createClient({
  projectId,
  dataset,
  apiVersion: '2024-01-01',
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
})

const builder = imageUrlBuilder(client)

export function urlFor(source: any) {
  return builder.image(source)
}

export async function getArtworks() {
  return client.fetch(`*[_type == "artwork"] | order(_createdAt desc) {
    _id, title, year, medium, dimensions, price,
    image,
    artist->{ _id, name, slug }
  }`)
}

export async function getArtists() {
  return client.fetch(`*[_type == "artist"] | order(name asc) {
    _id, name, slug
  }`)
}

export async function searchArtworks(q: string) {
  if (!q.trim()) return []
  return client.fetch(
    `*[_type == "artwork" && (title match $pattern || artist->name match $pattern)] | order(_createdAt desc)[0...12] {
      _id, title, year,
      "imageUrl": image.asset->url,
      "artistName": artist->name
    }`,
    { pattern: `*${q}*` },
  )
}
