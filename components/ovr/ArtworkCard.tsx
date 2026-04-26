import Image from 'next/image'
import type { Artwork } from '@/lib/ovr/types'
import { urlFor } from '@/lib/ovr/sanityClient'

interface Props {
  artwork: Artwork
  selected: boolean
  onToggle: () => void
}

export default function ArtworkCard({ artwork, selected, onToggle }: Props) {
  const imageUrl = artwork.image ? urlFor(artwork.image).width(400).height(500).fit('crop').url() : null

  return (
    <button
      onClick={onToggle}
      className={`group relative w-full text-left border transition-all duration-150 ${
        selected
          ? 'border-gray-900 dark:border-white ring-1 ring-gray-900 dark:ring-white'
          : 'border-gray-200 dark:border-gray-700 hover:border-gray-400'
      }`}
    >
      <div className="aspect-[4/5] bg-gray-100 dark:bg-gray-800 relative overflow-hidden">
        {imageUrl ? (
          <Image src={imageUrl} alt={artwork.title} fill className="object-cover" sizes="(max-width: 768px) 50vw, 25vw" />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-300 text-xs">No image</div>
        )}
        {selected && (
          <div className="absolute top-2 right-2 w-6 h-6 bg-gray-900 dark:bg-white rounded-full flex items-center justify-center">
            <svg className="w-3 h-3 text-white dark:text-gray-900" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
          </div>
        )}
      </div>
      <div className="p-3">
        {artwork.artist && <p className="text-[10px] uppercase tracking-widest text-gray-400 dark:text-gray-500 mb-0.5">{artwork.artist.name}</p>}
        <p className="text-sm font-medium text-gray-900 dark:text-gray-100 truncate">{artwork.title}</p>
        {artwork.year && <p className="text-xs text-gray-500 dark:text-gray-400">{artwork.year}</p>}
      </div>
    </button>
  )
}
