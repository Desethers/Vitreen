'use client'
import { useState, useEffect, useRef, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import StepNav from '@/components/ovr/StepNav'
import ThemeToggle from '@/components/ovr/ThemeToggle'
import type { ImageItem } from '@/lib/ovr/buildTypes'

const FIELDS = [
  { key: 'title',      label: 'Titre',       placeholder: 'Titre de l\'œuvre' },
  { key: 'artist',     label: 'Artiste',     placeholder: 'Nom de l\'artiste' },
  { key: 'year',       label: 'Année',       placeholder: '2024' },
  { key: 'medium',     label: 'Technique',   placeholder: 'Huile sur toile' },
  { key: 'dimensions', label: 'Dimensions',  placeholder: '80 × 100 cm' },
]

function ImageCard({
  item, index, onUpdate, onDelete,
}: {
  item: ImageItem; index: number
  onUpdate: (u: ImageItem) => void
  onDelete: () => void
}) {
  const [expanded, setExpanded] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  const loadFile = (file: File) => {
    const reader = new FileReader()
    reader.onload = e => onUpdate({ ...item, dataUrl: e.target?.result as string })
    reader.readAsDataURL(file)
  }

  const set = (k: string, v: string | boolean) => onUpdate({ ...item, [k]: v })

  return (
    <div className="border border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900">
      {/* Image area */}
      <div
        onDragOver={e => e.preventDefault()}
        onDrop={e => { e.preventDefault(); const f = e.dataTransfer.files[0]; if (f?.type.startsWith('image/')) loadFile(f) }}
        className="relative"
      >
        {item.dataUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={item.dataUrl} alt="" className="w-full aspect-[4/3] object-cover" />
        ) : (
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            className="w-full aspect-[4/3] flex flex-col items-center justify-center gap-2 bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors cursor-pointer border-b border-gray-100 dark:border-gray-800"
          >
            <svg className="w-6 h-6 text-gray-300 dark:text-gray-600" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
              <path d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5"/>
            </svg>
            <span className="text-xs text-gray-400 dark:text-gray-500">Déposer ou cliquer</span>
          </button>
        )}
        {item.dataUrl && (
          <div className="absolute top-2 right-2 flex gap-1">
            <button type="button" onClick={() => inputRef.current?.click()}
              className="p-1.5 bg-white/90 dark:bg-gray-900/90 border border-gray-200 dark:border-gray-700 text-gray-500 hover:text-gray-900 dark:hover:text-white transition-colors">
              <svg width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
            </button>
          </div>
        )}
        <input ref={inputRef} type="file" accept="image/*" className="hidden"
          onChange={e => { const f = e.target.files?.[0]; if (f) loadFile(f) }} />
      </div>

      {/* Index badge */}
      <div className="flex items-center justify-between px-3 py-2 border-b border-gray-50 dark:border-gray-800">
        <span className="text-xs text-gray-400 tabular-nums">#{index + 1}</span>
        <div className="flex items-center gap-2">
          <button type="button" onClick={() => setExpanded(x => !x)}
            className="text-xs text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition-colors">
            {expanded ? 'Masquer' : 'Fiche'}
          </button>
          <button type="button" onClick={onDelete}
            className="text-gray-300 hover:text-red-400 dark:text-gray-600 dark:hover:text-red-500 transition-colors">
            <svg width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/>
            </svg>
          </button>
        </div>
      </div>

      {/* Caption fields — always show title/artist, expand for rest */}
      <div className="px-3 py-2.5 space-y-1.5">
        {FIELDS.slice(0, expanded ? FIELDS.length : 2).map(f => (
          <input key={f.key}
            value={(item as unknown as Record<string, string>)[f.key]}
            onChange={e => set(f.key, e.target.value)}
            placeholder={f.placeholder}
            className="w-full px-2 py-1.5 text-xs bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 text-gray-800 dark:text-gray-200 placeholder:text-gray-300 dark:placeholder:text-gray-600 focus:outline-none focus:border-gray-300 dark:focus:border-gray-600 transition-colors" />
        ))}
        {expanded && (
          <div className="flex gap-2 items-center pt-0.5">
            <input value={item.price} onChange={e => set('price', e.target.value)} placeholder="Prix"
              className="flex-1 px-2 py-1.5 text-xs bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 text-gray-800 dark:text-gray-200 placeholder:text-gray-300 dark:placeholder:text-gray-600 focus:outline-none focus:border-gray-300 dark:focus:border-gray-600 transition-colors" />
            <label className="flex items-center gap-1 text-[11px] text-gray-400 cursor-pointer shrink-0">
              <input type="checkbox" checked={item.showPrice} onChange={e => set('showPrice', e.target.checked)} />
              Afficher
            </label>
          </div>
        )}
      </div>
    </div>
  )
}

// ─── Drop zone to add new images ──────────────────────────────────────────────

function DropZone({ onFiles }: { onFiles: (files: File[]) => void }) {
  const [over, setOver] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  return (
    <div
      onDragOver={e => { e.preventDefault(); setOver(true) }}
      onDragLeave={() => setOver(false)}
      onDrop={e => {
        e.preventDefault(); setOver(false)
        const files = [...e.dataTransfer.files].filter(f => f.type.startsWith('image/'))
        if (files.length) onFiles(files)
      }}
      onClick={() => inputRef.current?.click()}
      className={`border-2 border-dashed rounded-none flex flex-col items-center justify-center py-12 px-8 cursor-pointer transition-colors ${
        over ? 'border-gray-400 bg-gray-50 dark:bg-gray-800' : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
      }`}
    >
      <svg className="w-8 h-8 text-gray-300 dark:text-gray-600 mb-3" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
        <path d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5"/>
      </svg>
      <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Déposez vos images ici</p>
      <p className="text-xs text-gray-400 dark:text-gray-600">ou cliquez pour sélectionner — plusieurs fichiers acceptés</p>
      <input ref={inputRef} type="file" accept="image/*" multiple className="hidden"
        onChange={e => { const files = [...(e.target.files ?? [])]; if (files.length) onFiles(files) }} />
    </div>
  )
}

// ─── Main ─────────────────────────────────────────────────────────────────────

export default function ImagesClient() {
  const router = useRouter()
  const [images, setImages] = useState<ImageItem[]>([])

  useEffect(() => {
    const saved = sessionStorage.getItem('vr_images')
    if (saved) { try { setImages(JSON.parse(saved)) } catch { /* ignore */ } }
  }, [])

  const save = useCallback((next: ImageItem[]) => {
    setImages(next)
    try { sessionStorage.setItem('vr_images', JSON.stringify(next)) } catch { /* full */ }
  }, [])

  const addFiles = (files: File[]) => {
    files.forEach(file => {
      const reader = new FileReader()
      reader.onload = e => {
        const dataUrl = e.target?.result as string
        const img: ImageItem = {
          id: Math.random().toString(36).slice(2),
          dataUrl,
          title: file.name.replace(/\.[^.]+$/, '').replace(/[-_]/g, ' '),
          artist: '', year: '', medium: '', dimensions: '', price: '', showPrice: false,
        }
        setImages(prev => {
          const next = [...prev, img]
          try { sessionStorage.setItem('vr_images', JSON.stringify(next)) } catch { /* full */ }
          return next
        })
      }
      reader.readAsDataURL(file)
    })
  }

  const updateImage = (id: string, updated: ImageItem) => save(images.map(i => i.id === id ? updated : i))
  const deleteImage = (id: string) => save(images.filter(i => i.id !== id))

  return (
    <div className="min-h-screen bg-white dark:bg-[#0a0a0a]">
      <header className="sticky top-0 z-10 bg-white/95 dark:bg-[#0a0a0a]/95 backdrop-blur border-b border-gray-100 dark:border-gray-800 px-8 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <h1 className="text-sm font-medium tracking-widest uppercase text-gray-500 dark:text-gray-400">Viewing Room</h1>
          <ThemeToggle />
        </div>
        <StepNav />
        <button
          onClick={() => { try { sessionStorage.setItem('vr_images', JSON.stringify(images)) } catch { /* ignore */ }; router.push('/ovr/editor/build') }}
          disabled={images.length === 0}
          className="px-5 py-2 bg-gray-900 dark:bg-white dark:text-gray-900 text-white text-sm hover:bg-gray-700 dark:hover:bg-gray-100 disabled:opacity-30 transition-colors">
          Mise en page →
        </button>
      </header>

      <main className="px-8 py-8 max-w-6xl mx-auto">
        <div className="flex items-baseline justify-between mb-6">
          <h2 className="text-xl font-serif text-gray-900 dark:text-gray-100">Images</h2>
          <p className="text-xs text-gray-400">{images.length} image{images.length !== 1 ? 's' : ''}</p>
        </div>

        <div className="mb-6">
          <DropZone onFiles={addFiles} />
        </div>

        {images.length > 0 && (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {images.map((item, i) => (
              <ImageCard
                key={item.id} item={item} index={i}
                onUpdate={u => updateImage(item.id, u)}
                onDelete={() => deleteImage(item.id)}
              />
            ))}
          </div>
        )}
      </main>
    </div>
  )
}
