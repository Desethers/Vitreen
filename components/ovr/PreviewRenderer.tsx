import type { Artwork } from '@/lib/ovr/types'
import { urlFor } from '@/lib/ovr/sanityClient'

interface Props {
  artworks: Artwork[]
  showPrice: boolean
  galleryName: string
  template: string
}

export default function PreviewRenderer({ artworks, showPrice, galleryName }: Props) {
  const artists = [...new Set(artworks.map(a => a.artist?.name).filter(Boolean))]

  return (
    <div className="space-y-2">
      {/* Cover */}
      <div className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 aspect-[1/1.414] flex flex-col items-center justify-center p-12 text-center shadow-sm">
        <p className="text-[9px] uppercase tracking-[0.3em] text-gray-400 dark:text-gray-500 mb-8">{galleryName}</p>
        <h2 className="font-serif text-2xl text-gray-900 dark:text-gray-100 mb-6">Viewing Room</h2>
        {artists.length > 0 && <p className="text-xs text-gray-400 dark:text-gray-500 tracking-wide">{artists.join(' · ')}</p>}
      </div>

      {artworks.map((artwork) => {
        const imageUrl = artwork.image ? urlFor(artwork.image).width(600).height(750).fit('max').url() : null
        return (
          <div key={artwork._id} className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 aspect-[1/1.414] flex flex-col p-8 shadow-sm">
            <div className="flex-1 flex items-center justify-center mb-6">
              {imageUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={imageUrl} alt={artwork.title} className="max-w-full object-contain" style={{ maxHeight: '60%' }} />
              ) : (
                <div className="w-full h-[55%] bg-gray-50 dark:bg-gray-800 flex items-center justify-center">
                  <span className="text-gray-200 text-xs">Pas d&apos;image</span>
                </div>
              )}
            </div>
            <div className="border-t border-gray-100 dark:border-gray-800 pt-4 flex-shrink-0">
              {artwork.artist && <p className="text-[9px] uppercase tracking-[0.2em] text-gray-400 dark:text-gray-500 mb-1">{artwork.artist.name}</p>}
              <p className="font-serif text-sm text-gray-900 dark:text-gray-100 mb-1">
                <em>{artwork.title}</em>{artwork.year ? `, ${artwork.year}` : ''}
              </p>
              {artwork.medium && <p className="text-[10px] text-gray-500">{artwork.medium}</p>}
              {artwork.dimensions && <p className="text-[10px] text-gray-500">{artwork.dimensions}</p>}
              {showPrice && artwork.price && <p className="text-[10px] text-gray-900 dark:text-gray-100 mt-2">{artwork.price}</p>}
            </div>
          </div>
        )
      })}
    </div>
  )
}
