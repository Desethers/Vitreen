// ─── Image pool (step 2) ──────────────────────────────────────────────────────

export interface ImageItem {
  id: string
  dataUrl: string
  title: string
  artist: string
  year: string
  medium: string
  dimensions: string
  price: string
  showPrice: boolean
}

// ─── Layout blocks (step 3) ───────────────────────────────────────────────────

export type BlockType = 'full' | 'pair' | 'trio' | 'side' | 'quote' | 'quotefull' | 'imgbio'

/** A slot in a block holds a reference to an ImageItem by ID */
export interface BlockSlot {
  imageId: string | null
}

export interface Block {
  id: string
  type: BlockType
  slots: BlockSlot[]
  quoteText: string
  quoteAuthor: string
  showInquire: boolean
}

// ─── Setup (step 1) ───────────────────────────────────────────────────────────

export interface VrSetup {
  galleryName: string
  headline: string
  title: string
  recipientName: string
  recipientEmail: string
  introText: string
}

// ─── Config ───────────────────────────────────────────────────────────────────

export const BLOCK_CONFIGS: Record<BlockType, {
  label: string
  description: string
  slotCount: number
  hasQuote: boolean
}> = {
  full:      { label: 'Full page',    description: 'One artwork full width',        slotCount: 1, hasQuote: false },
  pair:      { label: 'Pair',        description: 'Two artworks side by side',     slotCount: 2, hasQuote: false },
  trio:      { label: 'Triptych',    description: 'Three artworks in a row',       slotCount: 3, hasQuote: false },
  side:      { label: 'Art + text',  description: 'Image left, text right',        slotCount: 1, hasQuote: true  },
  quote:     { label: 'Text',        description: 'Quote or introduction',         slotCount: 0, hasQuote: true  },
  quotefull: { label: 'Quote + Full', description: 'Quote above a full-width image', slotCount: 1, hasQuote: true },
  imgbio:    { label: 'Img + Bio',    description: 'Portrait image with artist bio',  slotCount: 1, hasQuote: true },
}

export function makeBlock(type: BlockType): Block {
  return {
    id: Math.random().toString(36).slice(2),
    type,
    slots: Array.from({ length: BLOCK_CONFIGS[type].slotCount }, () => ({ imageId: null })),
    quoteText: '',
    quoteAuthor: '',
    showInquire: false,
  }
}

export function makeImage(): ImageItem {
  return {
    id: Math.random().toString(36).slice(2),
    dataUrl: '',
    title: '', artist: '', year: '', medium: '', dimensions: '', price: '',
    showPrice: false,
  }
}
