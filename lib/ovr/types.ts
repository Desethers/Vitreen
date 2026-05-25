/**
 * Sanity domain types — single source of truth for documents stored in
 * the OVR dataset. Update these when the Sanity schema changes.
 */

/* ─── Image primitives ─────────────────────────────────────────────── */

export interface SanityImageRef {
  _type?: "image";
  asset?: { _ref?: string; _type?: "reference" };
  crop?: { top?: number; bottom?: number; left?: number; right?: number };
  hotspot?: { x?: number; y?: number; width?: number; height?: number };
}

export interface SanityImageWithUrl {
  _id?: string;
  url?: string;
  metadata?: {
    dimensions?: { width: number; height: number; aspectRatio?: number };
    palette?: { dominant?: { background?: string } };
  };
}

/** Any image payload accepted by image-url builder. */
export type SanityImageSource = SanityImageRef | SanityImageWithUrl | { _id: string } | string;

/* ─── Artist / Artwork ─────────────────────────────────────────────── */

export interface Artist {
  _id: string;
  name: string;
  slug?: { current: string };
  bio?: string;
}

export interface Artwork {
  _id: string;
  title: string;
  year?: string;
  medium?: string;
  dimensions?: string;
  price?: string;
  image?: SanityImageRef;
  artist?: Artist;
}

/* Subset returned by the search endpoint. */
export interface ArtworkSearchHit {
  _id: string;
  title: string;
  year?: string;
  imageUrl?: string;
  artistName?: string;
}

/* ─── Template ─────────────────────────────────────────────────────── */

export interface TemplateBlock {
  type: "cover" | "artwork_single" | "artwork_grid";
  options?: {
    showPrice?: boolean;
    layout?: "single" | "grid";
  };
}

export interface Template {
  _id: string;
  name: string;
  slug: { current: string };
  structure: TemplateBlock[];
}

/* ─── Viewing Room document ────────────────────────────────────────── */

export interface ViewingRoomSlot {
  image?: SanityImageRef;
  title?: string;
  artist?: string;
  year?: string;
  medium?: string;
  dimensions?: string;
  price?: string;
  showPrice?: boolean;
}

export interface ViewingRoomBlock {
  _key: string;
  blockType: string;
  slots?: ViewingRoomSlot[];
  quoteText?: string;
  quoteAuthor?: string;
  textStyle?: string;
  showInquire?: boolean;
  sideTextType?: string;
}

export type ViewingRoomStatus = "draft" | "active" | "expired" | "archived";

export interface ViewingRoomDoc {
  _id: string;
  _type: "viewingRoom";
  token: string;
  status: ViewingRoomStatus;
  title?: string;
  headline?: string;
  galleryName?: string;
  galleryAddress?: string;
  galleryContact?: string;
  recipientName?: string;
  recipientEmail?: string;
  introText?: string;
  blocks?: ViewingRoomBlock[];
  ownerId?: string;
  ownerEmail?: string;
  expiresAt?: string;
  createdAt?: string;
  viewCount?: number;
}

/* ─── Inquiry document ─────────────────────────────────────────────── */

export interface InquiryDoc {
  _id: string;
  _type: "inquiry";
  viewingRoomToken?: string;
  viewingRoomTitle?: string;
  collectorName?: string;
  collectorEmail?: string;
  message?: string;
  slotRef?: string;
  artworkTitle?: string;
  artistName?: string;
  status?: "new" | "read" | "responded" | "archived";
  createdAt?: string;
}
