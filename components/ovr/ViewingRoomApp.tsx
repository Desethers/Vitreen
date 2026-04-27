'use client'
import { useState, useEffect, useRef, useCallback } from 'react'
import dynamic from 'next/dynamic'
import { useOptionalUser, clerkEnabled } from '@/lib/useOptionalUser'
import { DragDropContext, Droppable, Draggable, DropResult, DraggableProvidedDragHandleProps } from '@hello-pangea/dnd'

// Dynamically imported so @clerk/nextjs is never loaded when Clerk is disabled
const UserButton = clerkEnabled
  ? dynamic(() => import('@clerk/nextjs').then(m => ({ default: m.UserButton })), { ssr: false })
  : () => null
import ThemeToggle from '@/components/ovr/ThemeToggle'
import type { Block, BlockType, BlockSlot, ImageItem, VrSetup } from '@/lib/ovr/buildTypes'
import { makeBlock, BLOCK_CONFIGS } from '@/lib/ovr/buildTypes'

// ─── Design tokens ────────────────────────────────────────────────────────────

const input = 'w-full border border-gray-200 dark:border-gray-700 rounded-lg px-3.5 py-2.5 text-sm bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-900/8 focus:border-gray-400 dark:focus:border-gray-500 transition-colors'
const label = 'block text-sm font-normal text-gray-900 dark:text-gray-100 mb-1.5'
const smlabel = 'block text-[10px] font-semibold uppercase tracking-wider text-gray-400 dark:text-gray-500 mb-1.5'

function Field({ name, required, children }: { name: string; required?: boolean; children: React.ReactNode }) {
  return (
    <div>
      <label className={label}>{name}{required && <span className="text-red-500 ml-0.5">*</span>}</label>
      {children}
    </div>
  )
}

// ─── Accordion section ────────────────────────────────────────────────────────

function Accordion({ title, badge, defaultOpen = true, children }: {
  title: string; badge?: number; defaultOpen?: boolean; children: React.ReactNode
}) {
  const [open, setOpen] = useState(defaultOpen)
  return (
    <div className="border-b border-gray-100 dark:border-gray-800">
      <button
        type="button"
        onClick={() => setOpen(x => !x)}
        className="w-full flex items-center justify-between px-5 py-3.5 text-left hover:bg-gray-50 dark:hover:bg-gray-900/50 transition-colors"
      >
        <div className="flex items-center gap-2">
          <span className="text-sm font-normal text-gray-800 dark:text-gray-200">{title}</span>
          {badge !== undefined && badge > 0 && (
            <span className="text-[10px] bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400 px-1.5 py-0.5 rounded-full tabular-nums">
              {badge}
            </span>
          )}
        </div>
        <svg
          className={`w-3.5 h-3.5 text-gray-400 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
          fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"
        >
          <path d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {open && <div className="px-5 pb-5">{children}</div>}
    </div>
  )
}

// ═══════════════════════════════════════════════════════════════════════════════
// PANEL 1 — CONTENU (Infos)
// ═══════════════════════════════════════════════════════════════════════════════

function InfosSection({ setup, onChange }: { setup: VrSetup; onChange: (s: VrSetup) => void }) {
  const set = (k: keyof VrSetup, v: string) => onChange({ ...setup, [k]: v })
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 gap-3.5">
        <Field name="Gallery name" required>
          <input value={setup.galleryName} onChange={e => set('galleryName', e.target.value)}
            placeholder="Vitreen" className={input} autoFocus />
        </Field>
        <Field name="Title">
          <input value={setup.headline} onChange={e => set('headline', e.target.value)}
            placeholder="Viewing Room" className={input} />
        </Field>
        <Field name="Subtitle">
          <input value={setup.title} onChange={e => set('title', e.target.value)}
            placeholder="Spring selection — Jean Dupont" className={input} />
        </Field>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <Field name="Recipient">
          <input value={setup.recipientName} onChange={e => set('recipientName', e.target.value)}
            placeholder="Jean Dupont" className={input} />
        </Field>
        <Field name="Email">
          <input type="email" value={setup.recipientEmail} onChange={e => set('recipientEmail', e.target.value)}
            placeholder="jean@example.com" className={input} />
        </Field>
      </div>
      <Field name="Introduction message">
        <textarea value={setup.introText} onChange={e => set('introText', e.target.value)}
          placeholder="Here is a selection of artworks that I have specially chosen for you…"
          rows={4} className={input + ' resize-none'} />
      </Field>
    </div>
  )
}

// ═══════════════════════════════════════════════════════════════════════════════
// PANEL 2 — MÉDIA (Images)
// ═══════════════════════════════════════════════════════════════════════════════

const IMG_FIELDS = [
  { key: 'title',  placeholder: 'Artwork title' },
  { key: 'artist', placeholder: 'Artist' },
  { key: 'year',   placeholder: 'Year' },
  { key: 'medium', placeholder: 'Medium' },
]

// Parse "W × H cm …" → [w, h] or ['','']
function parseDimCm(s: string): [string, string] {
  const m = s.match(/^(\d+(?:[.,]\d+)?)\s*[×x]\s*(\d+(?:[.,]\d+)?)/)
  return m ? [m[1], m[2]] : ['', '']
}

function DimensionsInput({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  const [w, h] = parseDimCm(value)
  const toIn = (cm: string) => cm ? (parseFloat(cm.replace(',', '.')) / 2.54).toFixed(1) : ''
  const build = (nw: string, nh: string) => {
    if (!nw && !nh) return ''
    const cm = `${nw || '0'} × ${nh || '0'} cm`
    const wIn = toIn(nw); const hIn = toIn(nh)
    return wIn && hIn ? `${cm} (${wIn} × ${hIn} in)` : cm
  }
  return (
    <div>
      <p className={smlabel}>Dimensions</p>
      <div className="flex items-center gap-1">
        <input
          type="number" min="0" value={w} placeholder="W"
          onChange={e => onChange(build(e.target.value, h))}
          className={`${input} [appearance:textfield] min-w-0`}
        />
        <span className="text-gray-400 text-xs shrink-0">×</span>
        <input
          type="number" min="0" value={h} placeholder="H"
          onChange={e => onChange(build(w, e.target.value))}
          className={`${input} [appearance:textfield] min-w-0`}
        />
        <span className="text-gray-400 text-xs shrink-0">cm</span>
      </div>
      {(w || h) && (
        <p className="text-[10px] text-gray-400 mt-1">
          {toIn(w) || '–'} × {toIn(h) || '–'} in
        </p>
      )}
    </div>
  )
}

function ImageRow({ item, onUpdate, onDelete }: {
  item: ImageItem; onUpdate: (u: ImageItem) => void; onDelete: () => void
}) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLInputElement>(null)
  const load = (file: File) => {
    const r = new FileReader()
    r.onload = e => onUpdate({ ...item, dataUrl: e.target?.result as string })
    r.readAsDataURL(file)
  }
  const set = (k: string, v: string | boolean) => onUpdate({ ...item, [k]: v })

  return (
    <div className="border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden">
      <div className="flex items-center gap-3 px-3.5 py-2.5">
        {/* Thumb */}
        <div
          className="w-9 h-9 rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-800 shrink-0 cursor-pointer"
          onClick={() => ref.current?.click()}
          onDragOver={e => e.preventDefault()}
          onDrop={e => { e.preventDefault(); const f = e.dataTransfer.files[0]; if (f?.type.startsWith('image/')) load(f) }}
        >
          {item.dataUrl
            // eslint-disable-next-line @next/next/no-img-element
            ? <img src={item.dataUrl} alt="" className="w-full h-full object-cover" />
            : <div className="w-full h-full flex items-center justify-center">
                <svg className="w-3.5 h-3.5 text-gray-300" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                  <path d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5"/>
                </svg>
              </div>
          }
        </div>
        <input ref={ref} type="file" accept="image/*" className="hidden"
          onChange={e => { const f = e.target.files?.[0]; if (f) load(f) }} />

        {/* Info */}
        <div className="flex-1 min-w-0">
          {item.title
            ? <p className="text-sm font-medium text-gray-900 dark:text-gray-100 truncate leading-tight">{item.title}</p>
            : <p className="text-sm text-gray-400">Untitled</p>}
          {item.artist && <p className="text-xs text-gray-400 truncate">{item.artist}</p>}
        </div>

        {/* Fiche toggle */}
        <button type="button" onClick={() => setOpen(x => !x)}
          className="text-[11px] text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 shrink-0 transition-colors">
          Details
        </button>

        {/* Delete */}
        <button type="button" onClick={onDelete}
          className="text-gray-300 hover:text-gray-600 dark:text-gray-600 dark:hover:text-gray-300 shrink-0 transition-colors">
          <svg width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
          </svg>
        </button>
      </div>

      {open && (
        <div className="border-t border-gray-100 dark:border-gray-800 px-3.5 py-3 grid grid-cols-2 gap-2.5 bg-gray-50 dark:bg-gray-900/50">
          {IMG_FIELDS.map(f => (
            <div key={f.key} className={f.key === 'title' ? 'col-span-2' : ''}>
              <p className={smlabel}>{f.placeholder}</p>
              <input value={(item as unknown as Record<string, string>)[f.key]}
                onChange={e => set(f.key, e.target.value)} placeholder={f.placeholder}
                className={input} />
            </div>
          ))}
          <DimensionsInput value={item.dimensions} onChange={v => set('dimensions', v)} />
          <div>
            <p className={smlabel}>Price</p>
            <input value={item.price} onChange={e => set('price', e.target.value)} placeholder="4,500 €" className={input} />
          </div>
          <div className="flex items-end pb-1">
            <label className="flex items-center gap-1.5 text-xs text-gray-500 cursor-pointer">
              <input type="checkbox" checked={item.showPrice} onChange={e => set('showPrice', e.target.checked)}
                className="rounded border-gray-300" />
              Show price
            </label>
          </div>
        </div>
      )}
    </div>
  )
}

function ImagesSection({ images, onChange }: { images: ImageItem[]; onChange: (imgs: ImageItem[]) => void }) {
  const [over, setOver] = useState(false)
  const ref = useRef<HTMLInputElement>(null)

  const addFiles = (files: File[]) => {
    files.forEach(file => {
      const r = new FileReader()
      r.onload = e => {
        const img: ImageItem = {
          id: Math.random().toString(36).slice(2), dataUrl: e.target?.result as string,
          title: file.name.replace(/\.[^.]+$/, '').replace(/[-_]/g, ' '),
          artist: '', year: '', medium: '', dimensions: '', price: '', showPrice: false,
        }
        onChange([...images, img])
      }
      r.readAsDataURL(file)
    })
  }

  return (
    <div className="space-y-3">
      {/* Drop zone */}
      <div
        onDragOver={e => { e.preventDefault(); setOver(true) }}
        onDragLeave={() => setOver(false)}
        onDrop={e => { e.preventDefault(); setOver(false); const fs = [...e.dataTransfer.files].filter(f => f.type.startsWith('image/')); if (fs.length) addFiles(fs) }}
        onClick={() => ref.current?.click()}
        className={`border-2 border-dashed rounded-xl flex flex-col items-center justify-center py-10 cursor-pointer transition-colors ${
          over ? 'border-gray-400 bg-gray-50 dark:bg-gray-800' : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
        }`}
      >
        <svg className="w-7 h-7 text-gray-300 dark:text-gray-600 mb-2.5" fill="none" stroke="currentColor" strokeWidth="1.2" viewBox="0 0 24 24">
          <path d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5"/>
        </svg>
        <p className="text-sm text-gray-500 dark:text-gray-400">Drop here</p>
        <p className="text-xs text-gray-400 dark:text-gray-600 mt-0.5">or click to browse</p>
        <input ref={ref} type="file" accept="image/*" multiple className="hidden"
          onChange={e => { const fs = [...(e.target.files ?? [])]; if (fs.length) addFiles(fs) }} />
      </div>

      {/* Image list */}
      {images.length > 0 && (
        <div className="space-y-2">
          {images.map(img => (
            <ImageRow key={img.id} item={img}
              onUpdate={u => onChange(images.map(x => x.id === u.id ? u : x))}
              onDelete={() => onChange(images.filter(x => x.id !== img.id))} />
          ))}
          <button type="button" onClick={() => ref.current?.click()}
            className="w-full border border-dashed border-gray-200 dark:border-gray-700 rounded-xl py-2.5 text-sm text-gray-400 hover:border-gray-400 hover:text-gray-600 dark:hover:border-gray-500 dark:hover:text-gray-300 transition-colors flex items-center justify-center gap-1.5">
            <svg width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
            </svg>
            Add images
          </button>
        </div>
      )}
    </div>
  )
}

// ═══════════════════════════════════════════════════════════════════════════════
// PANEL 3 — MISE EN PAGE (Layout)
// ═══════════════════════════════════════════════════════════════════════════════

function LayoutSlot({ slot, image, landscape, cover, onDrop, onClear }: {
  slot: BlockSlot; image: ImageItem | undefined; landscape?: boolean; cover?: boolean; onDrop: (id: string) => void; onClear: () => void
}) {
  const [over, setOver] = useState(false)
  return (
    <div
      onDragOver={e => { e.preventDefault(); setOver(true) }}
      onDragLeave={() => setOver(false)}
      onDrop={e => { e.preventDefault(); setOver(false); const id = e.dataTransfer.getData('text/plain'); if (id) onDrop(id) }}
      className={`relative ${landscape ? 'aspect-[4/3]' : 'aspect-[3/4]'} rounded-lg border-2 flex items-center justify-center transition-colors ${
        over ? 'border-blue-400 bg-blue-50 dark:bg-blue-950/20'
        : image ? 'border-transparent'
        : 'border-dashed border-gray-200 dark:border-gray-700'
      }`}
    >
      {image ? (
        <>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={image.dataUrl} alt={image.title || ''} className={`w-full h-full ${cover ? 'object-cover' : 'object-contain'} rounded-lg`} />
          <button type="button" onClick={onClear}
            className="absolute top-1.5 right-1.5 w-5 h-5 rounded-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-500 hover:text-red-500 flex items-center justify-center shadow-sm transition-colors">
            <svg width="8" height="8" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>
        </>
      ) : (
        <div className="text-center pointer-events-none">
          <svg className="w-4 h-4 mx-auto text-gray-200 dark:text-gray-700 mb-1" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
            <path d="M2.25 15.75l5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909"/>
          </svg>
          <p className="text-[9px] text-gray-300 dark:text-gray-600">Drag</p>
        </div>
      )}
    </div>
  )
}

function BlockCard({ block, images, expanded, dragHandleProps, onExpand, onDelete, onUpdate }: {
  block: Block; images: ImageItem[]; expanded: boolean
  dragHandleProps: DraggableProvidedDragHandleProps | null | undefined
  onExpand: () => void; onDelete: () => void; onUpdate: (b: Block) => void
}) {
  const config = BLOCK_CONFIGS[block.type]
  const resolved = block.slots.map(s => images.find(i => i.id === s.imageId))
  const setSlot = (i: number, imageId: string | null) =>
    onUpdate({ ...block, slots: block.slots.map((s, j) => j === i ? { imageId } : s) })

  const typePills: Record<string, string> = {
    quote:     'bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/20 dark:text-amber-400 dark:border-amber-800',
    quotefull: 'bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/20 dark:text-amber-400 dark:border-amber-800',
    side:      'bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950/20 dark:text-blue-400 dark:border-blue-800',
    imgbio:    'bg-purple-50 text-purple-700 border-purple-200 dark:bg-purple-950/20 dark:text-purple-400 dark:border-purple-800',
  }
  const pill = typePills[block.type] ?? 'bg-gray-100 text-gray-600 border-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-700'

  return (
    <div className={`border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden transition-shadow ${expanded ? 'shadow-sm' : ''}`}>
      <div className="flex items-center gap-2.5 px-3.5 py-2.5 bg-white dark:bg-gray-900">
        <div {...dragHandleProps} className="shrink-0 text-gray-300 dark:text-gray-600 cursor-grab active:cursor-grabbing touch-none">
          <svg width="12" height="12" viewBox="0 0 14 14" fill="currentColor">
            <circle cx="4" cy="3" r="1.2"/><circle cx="4" cy="7" r="1.2"/><circle cx="4" cy="11" r="1.2"/>
            <circle cx="10" cy="3" r="1.2"/><circle cx="10" cy="7" r="1.2"/><circle cx="10" cy="11" r="1.2"/>
          </svg>
        </div>

        <button type="button" onClick={onExpand} className="flex-1 flex items-center gap-2 text-left min-w-0">
          <span className={`px-2 py-0.5 text-[11px] font-medium border rounded-full shrink-0 ${pill}`}>{config.label}</span>
          <div className="flex gap-1 shrink-0">
            {resolved.filter(Boolean).map((img, i) => (
              // eslint-disable-next-line @next/next/no-img-element
              <img key={i} src={img!.dataUrl} alt="" className="w-4 h-4 rounded object-cover" />
            ))}
          </div>
          {block.quoteText && <span className="text-[11px] text-gray-400 truncate italic">"{block.quoteText}"</span>}
          <svg className={`w-3 h-3 text-gray-400 ml-auto shrink-0 transition-transform ${expanded ? 'rotate-180' : ''}`}
            fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M19 9l-7 7-7-7"/></svg>
        </button>

        <button type="button" onClick={onDelete}
          className="shrink-0 text-gray-300 hover:text-gray-500 dark:text-gray-600 dark:hover:text-gray-400 transition-colors">
          <svg width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
          </svg>
        </button>
      </div>

      {expanded && (
        <div className="border-t border-gray-100 dark:border-gray-800 px-3.5 py-3 bg-gray-50 dark:bg-gray-900/50 space-y-3">
          {block.slots.length > 0 && (
            <div className={`grid gap-2 ${block.slots.length === 1 ? 'grid-cols-1 max-w-[100px]' : block.slots.length === 2 ? 'grid-cols-2' : 'grid-cols-3'}`}>
              {block.slots.map((slot, i) => (
                <div key={i}>
                  <LayoutSlot slot={slot} image={resolved[i]} landscape={block.type === 'full' || block.type === 'quotefull'} cover={block.type === 'pair'} onDrop={id => setSlot(i, id)} onClear={() => setSlot(i, null)} />
                  {resolved[i] && (
                    <p className="text-[9px] text-gray-400 truncate mt-1 text-center">{resolved[i]!.title || resolved[i]!.artist}</p>
                  )}
                </div>
              ))}
            </div>
          )}
          {config.hasQuote && (
            <div className="space-y-2">
              <textarea value={block.quoteText} onChange={e => onUpdate({ ...block, quoteText: e.target.value })}
                placeholder={block.type === 'quote' ? 'Text or quote…' : block.type === 'imgbio' ? 'Artist biography…' : 'Accompanying text…'} rows={3}
                className={input + ' resize-none text-sm'} />
              {block.type === 'quote' && (
                <input value={block.quoteAuthor} onChange={e => onUpdate({ ...block, quoteAuthor: e.target.value })}
                  placeholder="— Author (optional)" className={input} />
              )}
            </div>
          )}
          {block.type === 'pair' && (
            <label className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400 cursor-pointer select-none">
              <input type="checkbox" checked={block.showInquire}
                onChange={e => onUpdate({ ...block, showInquire: e.target.checked })}
                className="rounded border-gray-300" />
              Show Inquire button
            </label>
          )}
        </div>
      )}
    </div>
  )
}

const BLOCK_TYPES: BlockType[] = ['full', 'pair', 'trio', 'side', 'quote', 'quotefull', 'imgbio']

// ─── Template thumbnails ───────────────────────────────────────────────────────

function ThumbFull() {
  return <div className="w-full h-6 rounded-sm bg-gray-300 dark:bg-gray-600" />
}
function ThumbPair() {
  return <div className="flex gap-1 w-full"><div className="flex-1 h-8 rounded-sm bg-gray-300 dark:bg-gray-600"/><div className="flex-1 h-8 rounded-sm bg-gray-300 dark:bg-gray-600"/></div>
}
function ThumbTrio() {
  return <div className="flex gap-0.5 w-full"><div className="flex-1 h-7 rounded-sm bg-gray-300 dark:bg-gray-600"/><div className="flex-1 h-7 rounded-sm bg-gray-300 dark:bg-gray-600"/><div className="flex-1 h-7 rounded-sm bg-gray-300 dark:bg-gray-600"/></div>
}
function ThumbText() {
  return <div className="space-y-1 w-full px-2"><div className="h-1.5 bg-gray-300 dark:bg-gray-600 rounded-full w-3/4 mx-auto"/><div className="h-1.5 bg-gray-200 dark:bg-gray-700 rounded-full w-1/2 mx-auto"/></div>
}
function ThumbSide() {
  return <div className="flex gap-1.5 w-full items-center"><div className="w-10 h-9 rounded-sm bg-gray-300 dark:bg-gray-600 shrink-0"/><div className="flex-1 space-y-1"><div className="h-1.5 bg-gray-300 dark:bg-gray-600 rounded-full"/><div className="h-1.5 bg-gray-200 dark:bg-gray-700 rounded-full w-3/4"/><div className="h-1.5 bg-gray-200 dark:bg-gray-700 rounded-full w-1/2"/></div></div>
}
function ThumbQuoteFull() {
  return <div className="space-y-1.5 w-full"><div className="space-y-1 px-3"><div className="h-1.5 bg-gray-300 dark:bg-gray-600 rounded-full w-3/4 mx-auto"/><div className="h-1.5 bg-gray-200 dark:bg-gray-700 rounded-full w-1/2 mx-auto"/></div><div className="w-full h-5 rounded-sm bg-gray-300 dark:bg-gray-600"/></div>
}

const TEMPLATES: {
  id: string
  name: string
  description: string
  thumb: React.ReactNode
  blocks: BlockType[]
  locked?: boolean
}[] = [
  {
    id: 'classic',
    name: 'Classic',
    description: 'Full · Pair · Text',
    thumb: <div className="space-y-1.5"><ThumbFull /><ThumbPair /><ThumbText /></div>,
    blocks: ['full', 'pair', 'quote'],
  },
  {
    id: 'editorial',
    name: 'Editorial',
    description: 'Quote+Full · Pair · Art+text',
    thumb: <div className="space-y-1.5"><ThumbQuoteFull /><ThumbPair /><ThumbSide /></div>,
    blocks: ['quotefull', 'pair', 'side'],
  },
  {
    id: 'intimate',
    name: 'Intimate',
    description: 'Text · Full · Art+text · Full',
    thumb: <div className="space-y-1.5"><ThumbText /><ThumbFull /><ThumbSide /><ThumbFull /></div>,
    blocks: ['quote', 'full', 'side', 'full'],
    locked: true,
  },
  {
    id: 'collection',
    name: 'Collection',
    description: 'Trio · Pair · Trio · Text',
    thumb: <div className="space-y-1.5"><ThumbTrio /><ThumbPair /><ThumbTrio /><ThumbText /></div>,
    blocks: ['trio', 'pair', 'trio', 'quote'],
    locked: true,
  },
]

function TemplatesSection({ onChange, isPro }: { onChange: (b: Block[]) => void; isPro: boolean }) {
  const [applied, setApplied] = useState<string | null>(null)

  const applyTemplate = (tpl: typeof TEMPLATES[number]) => {
    if (tpl.locked && !isPro) return
    const newBlocks = tpl.blocks.map(t => makeBlock(t))
    onChange(newBlocks)
    setApplied(tpl.id)
    setTimeout(() => setApplied(null), 1500)
  }

  return (
    <div className="grid grid-cols-2 gap-2">
      {TEMPLATES.map(tpl => {
        const isLocked = tpl.locked && !isPro
        return (
          <div key={tpl.id} className="relative">
            <button
              type="button"
              onClick={() => applyTemplate(tpl)}
              disabled={isLocked}
              className={`w-full text-left p-3 rounded-xl border transition-all flex flex-col ${
                isLocked
                  ? 'border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900 opacity-50 cursor-not-allowed'
                  : applied === tpl.id
                  ? 'border-gray-900 dark:border-gray-100 bg-gray-50 dark:bg-gray-800'
                  : 'border-gray-200 dark:border-gray-700 hover:border-gray-400 dark:hover:border-gray-500 bg-white dark:bg-gray-900'
              }`}
            >
              <div className="mb-2.5 p-2 bg-gray-50 dark:bg-gray-800 rounded-lg h-24 flex items-center justify-center">
                <div className="w-full">{tpl.thumb}</div>
              </div>
              <p className="text-xs font-medium text-gray-800 dark:text-gray-200 leading-tight">
                {applied === tpl.id ? '✓ Applied' : tpl.name}
              </p>
              <p className="text-[10px] text-gray-400 dark:text-gray-500 mt-0.5 leading-tight">{tpl.description}</p>
            </button>
            {isLocked && (
              <div className="absolute top-2 right-2 flex items-center gap-1 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-full px-1.5 py-0.5">
                <svg width="9" height="9" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" className="text-gray-400">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                </svg>
                <span className="text-[9px] text-gray-400 font-medium">Pro</span>
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}

function LayoutSection({ images, blocks, onChange }: {
  images: ImageItem[]; blocks: Block[]; onChange: (b: Block[]) => void
}) {
  const [expandedId, setExpandedId] = useState<string | null>(null)

  const addBlock = (type: BlockType) => {
    const b = makeBlock(type)
    onChange([...blocks, b])
    setExpandedId(b.id)
  }

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) return
    const items = [...blocks]
    const [moved] = items.splice(result.source.index, 1)
    items.splice(result.destination.index, 0, moved)
    onChange(items)
  }

  return (
    <div className="space-y-4">
      {/* Images pool */}
      {images.length > 0 && (
        <div>
          <p className={smlabel}>Drag to a block</p>
          <div className="grid grid-cols-5 gap-1.5">
            {images.map(img => (
              <div key={img.id} draggable
                onDragStart={e => { e.dataTransfer.setData('text/plain', img.id); e.dataTransfer.effectAllowed = 'copy' }}
                className="cursor-grab active:cursor-grabbing group rounded-lg overflow-hidden"
                title={[img.title, img.artist].filter(Boolean).join(' — ')}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={img.dataUrl} alt={img.title || ''} className="w-full aspect-square object-cover group-hover:opacity-75 transition-opacity rounded-lg" />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Add block buttons */}
      <div className="flex flex-wrap gap-1.5">
        {BLOCK_TYPES.map(t => (
          <button key={t} type="button" onClick={() => addBlock(t)}
            className="px-2.5 py-1 rounded-full text-xs border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 hover:border-gray-400 hover:text-gray-900 dark:hover:border-gray-500 dark:hover:text-gray-100 bg-white dark:bg-gray-900 transition-colors">
            + {BLOCK_CONFIGS[t].label}
          </button>
        ))}
      </div>

      {/* Block list */}
      {blocks.length === 0 ? (
        <div className="border-2 border-dashed border-gray-200 dark:border-gray-700 rounded-xl py-10 flex items-center justify-center">
          <p className="text-xs text-gray-400">Add your first block above</p>
        </div>
      ) : (
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="blocks">
            {provided => (
              <div {...provided.droppableProps} ref={provided.innerRef} className="space-y-2">
                {blocks.map((block, index) => (
                  <Draggable key={block.id} draggableId={block.id} index={index}>
                    {(provided, snapshot) => (
                      <div ref={provided.innerRef} {...provided.draggableProps}
                        className={snapshot.isDragging ? 'shadow-xl opacity-90' : ''}>
                        <BlockCard block={block} images={images}
                          expanded={expandedId === block.id}
                          dragHandleProps={provided.dragHandleProps}
                          onExpand={() => setExpandedId(expandedId === block.id ? null : block.id)}
                          onDelete={() => { onChange(blocks.filter(b => b.id !== block.id)); if (expandedId === block.id) setExpandedId(null) }}
                          onUpdate={updated => onChange(blocks.map(b => b.id === updated.id ? updated : b))} />
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      )}
    </div>
  )
}

// ═══════════════════════════════════════════════════════════════════════════════
// PREVIEW
// ═══════════════════════════════════════════════════════════════════════════════

function PreviewSlot({ imageId, images, landscape, cover, showInquire }: { imageId: string | null; images: ImageItem[]; landscape?: boolean; cover?: boolean; showInquire?: boolean }) {
  const img = images.find(i => i.id === imageId)
  const aspect = landscape ? 'aspect-[4/3]' : 'aspect-[3/4]'
  if (!img?.dataUrl) return (
    <div className={`bg-gray-100 dark:bg-gray-800 ${aspect}`} />
  )
  return (
    <div className="flex flex-col gap-2">
      <div className={`${aspect} overflow-hidden`}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={img.dataUrl} alt={img.title || ''} className={`w-full h-full ${cover ? 'object-cover' : 'object-contain'}`} />
      </div>
      <div className="border-t border-gray-100 dark:border-gray-800 pt-2 space-y-0.5">
        {img.artist && <p className="text-[9px] uppercase tracking-[0.15em] text-gray-400">{img.artist}</p>}
        {img.title && (
          <p className="font-sans text-xs text-gray-900 dark:text-gray-100">
            <em>{img.title}</em>{img.year ? `, ${img.year}` : ''}
          </p>
        )}
        {img.medium && <p className="text-[10px] text-gray-500">{img.medium}</p>}
        {img.dimensions && <p className="text-[10px] text-gray-500">{img.dimensions}</p>}
        {img.showPrice && img.price && <p className="text-[10px] text-gray-900 dark:text-gray-100 mt-1">{img.price}</p>}
      </div>
      {showInquire && (
        <button className="mt-2 w-full border border-gray-900 dark:border-gray-100 text-gray-900 dark:text-gray-100 text-[11px] tracking-widest uppercase py-2 hover:bg-gray-900 hover:text-white dark:hover:bg-white dark:hover:text-gray-900 transition-colors">
          Inquire
        </button>
      )}
    </div>
  )
}

function PreviewBlock({ block, images }: { block: Block; images: ImageItem[] }) {
  if (block.type === 'quote') {
    return (
      <div className="py-12 px-6 text-center max-w-lg mx-auto">
        <p className="font-sans text-xl text-gray-700 dark:text-gray-300 italic leading-relaxed mb-3">
          {block.quoteText || <span className="text-gray-300">Quote…</span>}
        </p>
        {block.quoteAuthor && <p className="text-[10px] text-gray-400 tracking-widest uppercase">{block.quoteAuthor}</p>}
      </div>
    )
  }

  if (block.type === 'full') {
    return (
      <div className="w-full">
        <PreviewSlot imageId={block.slots[0]?.imageId ?? null} images={images} landscape />
      </div>
    )
  }

  if (block.type === 'imgbio') {
    const img = images.find(i => i.id === block.slots[0]?.imageId)
    return (
      <div className="grid grid-cols-2 gap-12 items-start max-w-3xl mx-auto">
        {/* Portrait image */}
        <div className="aspect-[3/4] overflow-hidden">
          {img?.dataUrl
            // eslint-disable-next-line @next/next/no-img-element
            ? <img src={img.dataUrl} alt={img.title || ''} className="w-full h-full object-cover" />
            : <div className="w-full h-full bg-gray-100 dark:bg-gray-800" />}
        </div>
        {/* Bio text */}
        <div className="pt-4 space-y-4">
          {img?.artist && (
            <p className="text-[10px] uppercase tracking-[0.2em] text-gray-400">{img.artist}</p>
          )}
          {img?.title && (
            <p className="font-sans text-sm text-gray-700 dark:text-gray-300 italic">{img.title}{img.year ? `, b. ${img.year}` : ''}</p>
          )}
          {block.quoteText && (
            <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{block.quoteText}</p>
          )}
          {!block.quoteText && (
            <p className="text-sm text-gray-300 dark:text-gray-600 italic">Biography…</p>
          )}
        </div>
      </div>
    )
  }

  if (block.type === 'quotefull') {
    return (
      <div className="space-y-8">
        <div className="text-center max-w-lg mx-auto px-4">
          <p className="font-sans text-xl text-gray-700 dark:text-gray-300 italic leading-relaxed mb-3">
            {block.quoteText || <span className="text-gray-300">Quote…</span>}
          </p>
          {block.quoteAuthor && <p className="text-[10px] text-gray-400 tracking-widest uppercase">{block.quoteAuthor}</p>}
        </div>
        <div className="w-full">
          <PreviewSlot imageId={block.slots[0]?.imageId ?? null} images={images} landscape />
        </div>
      </div>
    )
  }

  if (block.type === 'pair') {
    return (
      <div className="grid grid-cols-2 gap-6">
        {block.slots.map((s, i) => <PreviewSlot key={i} imageId={s.imageId} images={images} cover showInquire={block.showInquire} />)}
      </div>
    )
  }

  if (block.type === 'trio') {
    return (
      <div className="grid grid-cols-3 gap-4">
        {block.slots.map((s, i) => <PreviewSlot key={i} imageId={s.imageId} images={images} />)}
      </div>
    )
  }

  if (block.type === 'side') {
    return (
      <div className="grid grid-cols-2 gap-8 items-center">
        <div className="max-w-[180px] mx-auto w-full">
          <PreviewSlot imageId={block.slots[0]?.imageId ?? null} images={images} />
        </div>
        <div>
          {block.quoteText
            ? <p className="font-sans text-base text-gray-700 dark:text-gray-300 italic leading-relaxed">{block.quoteText}</p>
            : <p className="text-xs text-gray-300 italic">Accompanying text…</p>}
        </div>
      </div>
    )
  }

  return null
}

function ViewingRoomPreview({ setup, images, blocks }: {
  setup: VrSetup; images: ImageItem[]; blocks: Block[]
}) {
  const hasContent = setup.galleryName || setup.title || setup.recipientName || setup.introText || blocks.length > 0

  if (!hasContent) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-[#111111] pl-[422px]">
        <div className="text-center">
          <div className="w-12 h-12 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center mx-auto mb-3">
            <svg className="w-5 h-5 text-gray-300 dark:text-gray-600" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
              <path d="M2.25 15.75l5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909M3 9.75h.008v.008H3V9.75zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0z"/>
            </svg>
          </div>
          <p className="text-sm text-gray-400 dark:text-gray-500">Your preview will appear here</p>
          <p className="text-xs text-gray-300 dark:text-gray-600 mt-1">Fill in the left panel</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-full bg-gray-50 dark:bg-[#111111] pl-[422px] pr-8 py-8">
      <div className="max-w-3xl mx-auto bg-white dark:bg-[#0f0f0f] shadow-[0_2px_40px_rgba(0,0,0,0.06)] dark:shadow-[0_2px_40px_rgba(0,0,0,0.4)] rounded-sm overflow-hidden">
        {/* Cover */}
        <div className="py-16 px-10 text-left border-b border-gray-100 dark:border-gray-800">
          {setup.galleryName && (
            <p className="text-[9px] uppercase tracking-[0.3em] text-gray-400 mb-6">{setup.galleryName}</p>
          )}
          <h1 className="font-sans text-[24px] leading-tight text-gray-900 dark:text-gray-100 mb-1">{setup.headline || 'Viewing Room'}</h1>
          {setup.title && (
            <p className="text-[24px] leading-tight text-gray-400 dark:text-gray-500 mb-4">{setup.title}</p>
          )}
          {setup.recipientName && (
            <p className="text-xs text-gray-500 mb-3">For {setup.recipientName}</p>
          )}
          {setup.introText && (
            <p className="text-xs text-gray-500 leading-relaxed mt-4 italic">{setup.introText}</p>
          )}
        </div>

        {/* Blocks */}
        {blocks.length > 0 && (
          <div className="px-10 py-10 space-y-12">
            {blocks.map(block => (
              <PreviewBlock key={block.id} block={block} images={images} />
            ))}
          </div>
        )}

        {/* Footer */}
        {(setup.galleryName || blocks.length > 0) && (
          <div className="border-t border-gray-100 dark:border-gray-800 py-5 text-center">
            <p className="text-[9px] uppercase tracking-[0.2em] text-gray-300 dark:text-gray-700">
              {setup.galleryName || 'Viewing Room'}
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

// ═══════════════════════════════════════════════════════════════════════════════
// EXPORT PANEL
// ═══════════════════════════════════════════════════════════════════════════════

function ExportPanel({ open, onClose, blocks, images, setup }: {
  open: boolean; onClose: () => void
  blocks: Block[]; images: ImageItem[]; setup: VrSetup
}) {
  const [generating, setGenerating] = useState(false)
  const [saving, setSaving] = useState(false)
  const [shareUrl, setShareUrl] = useState<string | null>(null)
  const [copied, setCopied] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handlePDF = async () => {
    setGenerating(true); setError(null)
    try {
      const res = await fetch('/api/ovr/generate-pdf', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ blocks, images, setup }) })
      if (!res.ok) throw new Error()
      const blob = await res.blob()
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a'); a.href = url; a.download = `viewing-room.pdf`; a.click(); URL.revokeObjectURL(url)
    } catch { setError('Error generating the PDF.') } finally { setGenerating(false) }
  }

  const handleShare = async () => {
    setSaving(true); setError(null)
    try {
      const res = await fetch('/api/ovr/viewing-rooms', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ blocks, images, setup }) })
      if (!res.ok) throw new Error()
      const data = await res.json()
      setShareUrl(`${window.location.origin}/vr/${data.token}`)
    } catch { setError('Error saving the viewing room.') } finally { setSaving(false) }
  }

  const whatsappHref = shareUrl ? `https://wa.me/?text=${encodeURIComponent(`Here is your Viewing Room: ${shareUrl}`)}` : null
  const emailHref = shareUrl ? `mailto:${setup.recipientEmail}?subject=${encodeURIComponent(`Viewing Room — ${setup.galleryName}`)}&body=${encodeURIComponent(`Hello${setup.recipientName ? ` ${setup.recipientName}` : ''},\n\n${setup.introText ? setup.introText + '\n\n' : ''}Here is your viewing room:\n${shareUrl}\n\nBest regards,\n${setup.galleryName}`)}` : null

  if (!open) return null
  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/20 dark:bg-black/50 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-md bg-white dark:bg-gray-900 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 dark:border-gray-800">
          <h2 className="text-base font-semibold text-gray-900 dark:text-gray-100">Export your viewing room</h2>
          <button type="button" onClick={onClose}
            className="w-7 h-7 rounded-full border border-gray-200 dark:border-gray-700 flex items-center justify-center text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition-colors">
            <svg width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>
        </div>

        <div className="px-6 py-5 space-y-5">
          {error && <p className="text-xs text-red-500 bg-red-50 dark:bg-red-950/20 border border-red-100 dark:border-red-800 px-4 py-3 rounded-lg">{error}</p>}

          {shareUrl && (
            <div className="flex items-center gap-2 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-3">
              <svg className="w-3.5 h-3.5 text-gray-400 shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>
              </svg>
              <span className="flex-1 text-xs text-gray-600 dark:text-gray-400 truncate">{shareUrl}</span>
              <button onClick={async () => { await navigator.clipboard.writeText(shareUrl); setCopied(true); setTimeout(() => setCopied(false), 2000) }}
                className="text-xs font-medium text-gray-700 dark:text-gray-300 hover:text-gray-900 shrink-0">{copied ? '✓ Copied' : 'Copy'}</button>
              <a href={shareUrl} target="_blank" rel="noopener noreferrer" className="text-xs font-medium text-gray-700 dark:text-gray-300 hover:text-gray-900 shrink-0">↗</a>
            </div>
          )}

          <div className="flex items-center justify-between gap-4 py-1">
            <div>
              <p className="text-sm font-medium text-gray-900 dark:text-gray-100">Download as PDF</p>
              <p className="text-xs text-gray-400 mt-0.5">High-resolution A4 document</p>
            </div>
            <button onClick={handlePDF} disabled={generating || blocks.length === 0}
              className="shrink-0 px-4 py-2 rounded-full bg-gray-900 dark:bg-white dark:text-gray-900 text-white text-sm hover:bg-gray-700 dark:hover:bg-gray-100 disabled:opacity-40 transition-colors flex items-center gap-1.5">
              {generating ? <><svg className="animate-spin w-3.5 h-3.5" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/></svg>…</> : '↓ PDF'}
            </button>
          </div>

          <div className="border-t border-gray-100 dark:border-gray-800" />

          <div className="flex items-center justify-between gap-4 py-1">
            <div>
              <p className="text-sm font-medium text-gray-900 dark:text-gray-100">Share link</p>
              <p className="text-xs text-gray-400 mt-0.5">Web page accessible to the recipient</p>
            </div>
            <button onClick={handleShare} disabled={saving || blocks.length === 0}
              className="shrink-0 px-4 py-2 rounded-full border border-gray-200 dark:border-gray-700 text-sm text-gray-700 dark:text-gray-300 hover:border-gray-400 disabled:opacity-40 transition-colors bg-white dark:bg-gray-900">
              {saving ? 'Saving…' : shareUrl ? 'Regenerate' : 'Generate'}
            </button>
          </div>

          {shareUrl && (
            <div className="flex gap-2 pt-1">
              {whatsappHref && (
                <a href={whatsappHref} target="_blank" rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-full bg-[#25D366] text-white text-sm hover:bg-[#1ebe5d] transition-colors">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                  </svg>
                  WhatsApp
                </a>
              )}
              {emailHref && (
                <a href={emailHref}
                  className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-full border border-gray-200 dark:border-gray-700 text-sm text-gray-700 dark:text-gray-300 hover:border-gray-400 transition-colors">
                  <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/>
                  </svg>
                  Email
                </a>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

// ═══════════════════════════════════════════════════════════════════════════════
// MAIN APP
// ═══════════════════════════════════════════════════════════════════════════════

const DEFAULT_SETUP: VrSetup = { galleryName: '', headline: '', title: '', recipientName: '', recipientEmail: '', introText: '' }

export default function ViewingRoomApp() {
  const { isPro, isSignedIn } = useOptionalUser()

  const [setup, setSetup] = useState<VrSetup>(DEFAULT_SETUP)
  const [images, setImages] = useState<ImageItem[]>([])
  const [blocks, setBlocks] = useState<Block[]>([])
  const [exportOpen, setExportOpen] = useState(false)

  useEffect(() => {
    try {
      const s = sessionStorage.getItem('vr_setup'); if (s) setSetup(JSON.parse(s))
      const i = sessionStorage.getItem('vr_images'); if (i) setImages(JSON.parse(i))
      const b = sessionStorage.getItem('vr_blocks'); if (b) setBlocks(JSON.parse(b))
    } catch { /* ignore */ }
  }, [])

  const saveSetup = useCallback((s: VrSetup) => { setSetup(s); try { sessionStorage.setItem('vr_setup', JSON.stringify(s)) } catch { /* ignore */ } }, [])
  const saveImages = useCallback((imgs: ImageItem[]) => { setImages(imgs); try { sessionStorage.setItem('vr_images', JSON.stringify(imgs)) } catch { /* ignore */ } }, [])
  const saveBlocks = useCallback((blks: Block[]) => { setBlocks(blks); try { sessionStorage.setItem('vr_blocks', JSON.stringify(blks)) } catch { /* ignore */ } }, [])

  return (
    <div className="h-screen relative overflow-hidden bg-gray-50 dark:bg-[#111111]">

      {/* ── Top-right auth button ───────────────────────────────────────────── */}
      <div className="absolute top-4 right-5 z-20 flex items-center gap-2">
        {isSignedIn && clerkEnabled
          ? <UserButton appearance={{ elements: { avatarBox: 'w-7 h-7' } }} />
          : <a href="/sign-in" className="cursor-pointer text-xs text-white bg-gray-900 hover:bg-gray-700 transition-colors px-3 py-1.5 rounded-[5px]">Se connecter</a>
        }
      </div>

      {/* ── Preview — full screen background ───────────────────────────────── */}
      <main className="absolute inset-0 overflow-y-auto pt-16">
        <ViewingRoomPreview setup={setup} images={images} blocks={blocks} />
      </main>

      {/* ── Side panel — floating overlay ──────────────────────────────────── */}
      <aside className="absolute left-3 top-3 bottom-3 w-[390px] flex flex-col bg-white dark:bg-[#1c1c1c] rounded-[15px] border border-gray-200/70 dark:border-gray-800 shadow-lg overflow-hidden z-10">

        {/* Panel header — Viewing Room + actions */}
        <div className="shrink-0 flex items-center justify-between px-5 py-4 border-b border-gray-100 dark:border-gray-800">
          <span className="text-sm font-medium text-gray-900 dark:text-gray-100 tracking-tight">Viewing Room Studio</span>
          <ThemeToggle />
        </div>

        {/* Scrollable accordion sections */}
        <div className="flex-1 overflow-y-auto">
          <Accordion title="Content" defaultOpen>
            <InfosSection setup={setup} onChange={saveSetup} />
          </Accordion>

          <Accordion title="Media" badge={images.length} defaultOpen>
            <ImagesSection images={images} onChange={saveImages} />
          </Accordion>

          <Accordion title="Layout" badge={blocks.length} defaultOpen>
            <LayoutSection images={images} blocks={blocks} onChange={saveBlocks} />
          </Accordion>

          <Accordion title="Templates" defaultOpen={true}>
            <TemplatesSection onChange={saveBlocks} isPro={isPro} />
          </Accordion>
        </div>
      </aside>

      {/* Export button — fixed bottom right */}
      <button
        onClick={() => setExportOpen(true)}
        disabled={blocks.length === 0}
        className="group cursor-pointer fixed bottom-6 right-6 z-20 text-xs text-white bg-gray-900 hover:bg-gray-700 transition-colors px-3 py-1.5 rounded-[5px] disabled:opacity-30 shadow-lg flex items-center gap-1.5"
      >
        Export
        <span className="relative inline-flex items-center w-3 h-3 overflow-hidden">
          <span className="absolute inset-0 flex items-center justify-center transition-all duration-200 group-hover:translate-x-3 group-hover:opacity-0">›</span>
          <span className="absolute inset-0 flex items-center justify-center transition-all duration-200 -translate-x-3 opacity-0 group-hover:translate-x-0 group-hover:opacity-100">→</span>
        </span>
      </button>

      <ExportPanel
        open={exportOpen}
        onClose={() => setExportOpen(false)}
        blocks={blocks}
        images={images}
        setup={setup}
      />
    </div>
  )
}
