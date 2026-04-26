export interface Artist {
  _id: string
  name: string
  slug: { current: string }
  bio?: string
}

export interface Artwork {
  _id: string
  title: string
  year?: string
  medium?: string
  dimensions?: string
  price?: string
  image?: any
  artist?: Artist
}

export interface TemplateBlock {
  type: 'cover' | 'artwork_single' | 'artwork_grid'
  options?: {
    showPrice?: boolean
    layout?: 'single' | 'grid'
  }
}

export interface Template {
  _id: string
  name: string
  slug: { current: string }
  structure: TemplateBlock[]
}
