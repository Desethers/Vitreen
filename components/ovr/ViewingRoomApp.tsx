'use client'
import { useState, useEffect, useRef, useCallback } from 'react'
import dynamic from 'next/dynamic'
import { useOptionalUser, clerkEnabled } from '@/lib/useOptionalUser'
import { DragDropContext, Droppable, Draggable, DropResult, DragStart, DraggableProvidedDragHandleProps } from '@hello-pangea/dnd'

// Dynamically imported so @clerk/nextjs is never loaded when Clerk is disabled
const UserButton = clerkEnabled
  ? dynamic(() => import('@clerk/nextjs').then(m => ({ default: m.UserButton })), { ssr: false })
  : () => null

import ThemeToggle from '@/components/ovr/ThemeToggle'
import type { Block, BlockType, BlockSlot, ImageItem, VrSetup, TextPool, QuoteItem } from '@/lib/ovr/buildTypes'
import { isVrCanvasQuotePlaceholder } from '@/lib/ovr/vrCanvasPlaceholders'
import { makeBlock, BLOCK_CONFIGS, makeQuote } from '@/lib/ovr/buildTypes'
import { buildInquireHref } from '@/lib/ovr/pdfInquireHref'

// ─── Design tokens ────────────────────────────────────────────────────────────

const input = 'w-full border border-gray-200 dark:border-gray-700 rounded-lg px-3.5 py-1.5 text-[12px] bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-900/8 focus:border-gray-400 dark:focus:border-gray-500 transition-colors'
const label = 'block text-[13px] font-normal text-gray-900 dark:text-gray-100 mb-1.5'
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

function Accordion({ title, badge, icon, subtitle, defaultOpen = true, children, titleAbove, cardRounded = 'rounded-[20px]', cardPaddingTop = 'pt-0', noBorder }: {
  title: string; badge?: number; icon?: React.ReactNode; subtitle?: string; defaultOpen?: boolean; children: React.ReactNode; titleAbove?: boolean; cardRounded?: string; cardPaddingTop?: string; noBorder?: boolean
}) {
  const [open, setOpen] = useState(defaultOpen)

  if (titleAbove) {
    return (
      <div>
        <p className="pl-[15px] pr-1 pt-3 pb-2 text-[16px] font-medium text-gray-900 dark:text-gray-100 tracking-tight">{title}</p>
        <div className={`${cardRounded} ${noBorder ? '' : 'border border-gray-200/80 dark:border-gray-800'} bg-white dark:bg-[#1c1c1c] overflow-hidden`}>
          <div className={`px-5 pb-5 ${cardPaddingTop}`}>{children}</div>
        </div>
      </div>
    )
  }

  return (
    <div className="rounded-[20px] border border-gray-200/80 dark:border-gray-800 bg-white dark:bg-[#1c1c1c] overflow-hidden">
      <button
        type="button"
        onClick={() => setOpen(x => !x)}
        className="w-full flex items-center justify-between px-5 py-3 text-left hover:bg-gray-50 dark:hover:bg-gray-900/50 transition-colors gap-3"
      >
        <div className="flex items-center gap-2 min-w-0 flex-1">
          {icon && <span className="text-gray-900 dark:text-gray-100 shrink-0">{icon}</span>}
          <div className="flex flex-col items-start min-w-0 flex-1">
            <div className="flex items-center gap-2 max-w-full">
              <span className="text-sm font-medium text-gray-800 dark:text-gray-200 shrink-0">{title}</span>
              {badge !== undefined && badge > 0 && (
                <span className="text-[10px] bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400 px-1.5 py-0.5 rounded-full tabular-nums shrink-0">
                  {badge}
                </span>
              )}
            </div>
            {!open && subtitle && (
              <span className="text-[11px] text-gray-400 dark:text-gray-500 truncate max-w-full mt-0.5">{subtitle}</span>
            )}
          </div>
        </div>
        <svg
          className={`w-3.5 h-3.5 text-gray-400 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
          fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"
        >
          <path d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {open && <div className={`px-5 pb-5 ${cardPaddingTop}`}>{children}</div>}
    </div>
  )
}

// ═══════════════════════════════════════════════════════════════════════════════
// PANEL 1 — CONTENU (Infos)
// ═══════════════════════════════════════════════════════════════════════════════

type ContentGroup = 'identity' | 'recipient' | 'intro'

function InfosSection({ setup, onChange }: { setup: VrSetup; onChange: (s: VrSetup) => void }) {
  const set = (k: keyof VrSetup, v: string) => onChange({ ...setup, [k]: v })
  const [open, setOpen] = useState<ContentGroup | null>('identity')
  const [footerEditing, setFooterEditing] = useState(false)
  const [footerDraft, setFooterDraft] = useState({ address: setup.galleryAddress, contact: setup.galleryContact })
  const footerRef = useRef<HTMLInputElement>(null)

  const toggle = (g: ContentGroup) => setOpen(prev => prev === g ? null : g)

  useEffect(() => { if (footerEditing) footerRef.current?.focus() }, [footerEditing])
  useEffect(() => {
    if (!footerEditing) setFooterDraft({ address: setup.galleryAddress, contact: setup.galleryContact })
  }, [setup.galleryAddress, setup.galleryContact, footerEditing])

  const saveFooter = () => { onChange({ ...setup, galleryAddress: footerDraft.address, galleryContact: footerDraft.contact }); setFooterEditing(false) }
  const cancelFooter = () => { setFooterDraft({ address: setup.galleryAddress, contact: setup.galleryContact }); setFooterEditing(false) }

  const identitySummary = [setup.headline, setup.title].filter(Boolean).join(' · ') || setup.galleryName || '—'
  const recipientSummary = [setup.recipientName, setup.recipientEmail].filter(Boolean).join(' · ') || 'No recipient'
  const introSummary = setup.introText ? 'Message added' : 'No message'

  const rowCls = 'w-full flex items-center gap-2.5 px-5 py-2.5 text-left hover:bg-gray-50 dark:hover:bg-gray-900/30 transition-colors'
  const bodyCls = 'px-5 py-3.5 space-y-3 bg-white dark:bg-[#1c1c1c] border-t border-gray-100 dark:border-gray-800'
  const chevron = (isOpen: boolean) => (
    <svg className={`w-3 h-3 text-gray-400 transition-transform duration-200 shrink-0 ${isOpen ? 'rotate-180' : ''}`}
      fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M19 9l-7 7-7-7"/></svg>
  )

  return (
    <div className="-mx-5 -mb-5">

      {/* ── Identité de la salle ── */}
      <div className="border-b border-gray-100 dark:border-gray-800">
        <button type="button" onClick={() => toggle('identity')} className={rowCls}>
          <div className="w-6 h-6 rounded-[4px] bg-[#F5F5F3] dark:bg-gray-800 flex items-center justify-center shrink-0">
            <svg width="11" height="11" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24" className="text-gray-500 dark:text-gray-400">
              <rect x="4" y="2" width="16" height="20" rx="2"/><path d="M8 7h8M8 11h8M8 15h5"/>
            </svg>
          </div>
          <div className="flex flex-col items-start flex-1 min-w-0">
            <span className="text-[13px] text-gray-900 dark:text-gray-100 tracking-[-0.01em] leading-snug">Headline</span>
            {open !== 'identity' && <span className="text-[11px] text-gray-400 dark:text-gray-500 truncate max-w-full">{identitySummary}</span>}
          </div>
          {chevron(open === 'identity')}
        </button>
        {open === 'identity' && (
          <div className={bodyCls}>
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
        )}
      </div>

      {/* ── Destinataire ── */}
      <div className="border-b border-gray-100 dark:border-gray-800">
        <button type="button" onClick={() => toggle('recipient')} className={rowCls}>
          <div className="w-6 h-6 rounded-[4px] bg-[#F2FAF8] dark:bg-emerald-950/30 flex items-center justify-center shrink-0">
            <svg width="11" height="11" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24" className="text-emerald-600 dark:text-emerald-400">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
            </svg>
          </div>
          <div className="flex flex-col items-start flex-1 min-w-0">
            <span className="text-[13px] text-gray-900 dark:text-gray-100 tracking-[-0.01em] leading-snug">Recipient</span>
            {open !== 'recipient' && <span className="text-[11px] text-gray-400 dark:text-gray-500 truncate max-w-full">{recipientSummary}</span>}
          </div>
          {chevron(open === 'recipient')}
        </button>
        {open === 'recipient' && (
          <div className={bodyCls}>
            <div className="grid grid-cols-2 gap-2">
              <Field name="Name">
                <input value={setup.recipientName} onChange={e => set('recipientName', e.target.value)}
                  placeholder="Jean Dupont" className={input} autoFocus />
              </Field>
              <Field name="Email">
                <input type="email" value={setup.recipientEmail} onChange={e => set('recipientEmail', e.target.value)}
                  placeholder="jean@example.com" className={input} />
              </Field>
            </div>
            <p className="text-[11px] text-gray-400 dark:text-gray-500">Leave empty for a public room.</p>
          </div>
        )}
      </div>

      {/* ── Message d'introduction ── */}
      <div>
        <button type="button" onClick={() => toggle('intro')} className={rowCls}>
          <div className="w-6 h-6 rounded-[4px] bg-[#FAF8F2] dark:bg-amber-950/30 flex items-center justify-center shrink-0">
            <svg width="11" height="11" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24" className="text-amber-600 dark:text-amber-400">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
            </svg>
          </div>
          <div className="flex flex-col items-start flex-1 min-w-0">
            <span className="text-[13px] text-gray-900 dark:text-gray-100 tracking-[-0.01em] leading-snug">Introduction</span>
            {open !== 'intro' && <span className="text-[11px] text-gray-400 dark:text-gray-500 truncate max-w-full">{introSummary}</span>}
          </div>
          {chevron(open === 'intro')}
        </button>
        {open === 'intro' && (
          <div className={bodyCls}>
            <textarea value={setup.introText} onChange={e => set('introText', e.target.value)}
              placeholder="Here is a selection of works I have chosen especially for you…"
              rows={6} className={input + ' resize-none leading-[1.55]'} autoFocus />
            <p className="text-[11px] text-gray-400 dark:text-gray-500">Shown before the artworks. Leave empty for no message.</p>
          </div>
        )}
      </div>

      {/* ── Pied de page galerie — card détachée ── */}
      <div className="mt-2 px-[8px] pb-[8px]">
      <div className="rounded-xl bg-gray-50 dark:bg-gray-900/50 px-4 py-3 space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-semibold uppercase tracking-[0.08em] text-gray-400 dark:text-gray-500">Gallery footer</span>
          {footerEditing ? (
            <div className="flex items-center gap-2.5">
              <button type="button" onClick={cancelFooter}
                className="text-[11px] text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition-colors">Cancel</button>
              <button type="button" onClick={saveFooter}
                className="text-[11px] bg-gray-900 dark:bg-white dark:text-gray-900 text-white px-2.5 py-1 rounded-[4px] hover:bg-gray-700 dark:hover:bg-gray-100 transition-colors">Save</button>
            </div>
          ) : (
            <button type="button" onClick={() => setFooterEditing(true)}
              className="text-[11px] text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 underline underline-offset-2 transition-colors">Edit</button>
          )}
        </div>
        {footerEditing ? (
          <div className="space-y-2">
            <input ref={footerRef} value={footerDraft.address}
              onChange={e => setFooterDraft(d => ({ ...d, address: e.target.value }))}
              placeholder="12 rue de la Paix, 75001 Paris" className={input} />
            <input value={footerDraft.contact}
              onChange={e => setFooterDraft(d => ({ ...d, contact: e.target.value }))}
              placeholder="contact@gallery.com · +33 1 23 45 67 89" className={input} />
            <p className="text-[11px] text-gray-400 dark:text-gray-500">This info appears across all your rooms.</p>
          </div>
        ) : (
          <div className="space-y-1">
            <div className="flex items-start gap-1.5">
              <svg width="10" height="10" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24" className="text-gray-400 shrink-0 mt-[1px]">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
              </svg>
              <span className={`text-[11px] ${setup.galleryAddress ? 'text-gray-500 dark:text-gray-400' : 'text-gray-300 dark:text-gray-600'}`}>
                {setup.galleryAddress || 'Address —'}
              </span>
            </div>
            <div className="flex items-start gap-1.5">
              <svg width="10" height="10" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24" className="text-gray-400 shrink-0 mt-[1px]">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/>
              </svg>
              <span className={`text-[11px] ${setup.galleryContact ? 'text-gray-500 dark:text-gray-400' : 'text-gray-300 dark:text-gray-600'}`}>
                {setup.galleryContact || 'Contact —'}
              </span>
            </div>
          </div>
        )}
      </div>
      </div>

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

function DimensionsInput({ value, onChange, inline }: { value: string; onChange: (v: string) => void; inline?: boolean }) {
  const [w, h] = parseDimCm(value)
  const toIn = (cm: string) => cm ? (parseFloat(cm.replace(',', '.')) / 2.54).toFixed(1) : ''
  const [raw, setRaw] = useState(w && h ? `${w} × ${h}` : w || h ? `${w || h}` : '')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const txt = e.target.value
    setRaw(txt)
    const parts = txt.split(/[x×\s]+/).map(s => s.trim()).filter(Boolean)
    const nw = parts[0] || ''; const nh = parts[1] || ''
    if (!nw && !nh) { onChange(''); return }
    const cm = `${nw || '0'} × ${nh || '0'} cm`
    const wIn = toIn(nw); const hIn = toIn(nh)
    onChange(wIn && hIn ? `${cm} (${wIn} × ${hIn} in)` : cm)
  }

  const parts = raw.split(/[x×\s]+/).map(s => s.trim()).filter(Boolean)
  const rw = parts[0] || ''; const rh = parts[1] || ''

  if (inline) return (
    <div className="flex items-center gap-3 px-3.5 py-[7px]">
      <span className="w-[68px] shrink-0 text-[10px] text-gray-400 dark:text-gray-500">Dimensions</span>
      <div className="flex-1 flex items-center gap-1 min-w-0">
        <input type="text" value={raw} placeholder="H × W" onChange={handleChange}
          className="flex-1 bg-transparent border-none outline-none text-[12px] text-gray-700 dark:text-gray-300 placeholder:text-gray-200 dark:placeholder:text-gray-700 focus:outline-none min-w-0" />
        <span className="text-[10px] text-gray-400 shrink-0">cm</span>
        {(rw || rh) && <span className="text-[10px] text-gray-400 shrink-0">{toIn(rw) || '–'}×{toIn(rh) || '–'} in</span>}
      </div>
    </div>
  )

  return (
    <div>
      <p className={smlabel}>Dimensions</p>
      <div className="flex items-center gap-1.5">
        <input
          type="text" value={raw} placeholder="H × W"
          onChange={handleChange}
          className={`${input} min-w-0`}
        />
        <span className="text-gray-400 text-xs shrink-0">cm</span>
      </div>
      {(rw || rh) && (
        <p className="text-[10px] text-gray-400 mt-1">
          {toIn(rw) || '–'} × {toIn(rh) || '–'} in
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
      <div className="flex items-center gap-3 px-3 py-2">
        {/* Thumb */}
        <div
          className="w-8 h-8 rounded-md overflow-hidden bg-gray-100 dark:bg-gray-800 shrink-0 cursor-pointer"
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
            ? <p className="text-[13px] text-gray-900 dark:text-gray-100 tracking-[-0.01em] leading-snug truncate">{item.title}</p>
            : <p className="text-[13px] text-gray-400 tracking-[-0.01em]">Untitled</p>}
          {item.artist && <p className="text-[11px] text-gray-400 truncate">{item.artist}</p>}
        </div>

        {/* Fiche toggle */}
        <button type="button" onClick={() => setOpen(x => !x)}
          className="text-[11px] text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 shrink-0 transition-colors">
          Details
        </button>

        {/* Delete */}
        <button type="button" onClick={onDelete}
          className="text-gray-300 hover:text-gray-500 dark:text-gray-600 dark:hover:text-gray-400 shrink-0 transition-colors">
          <svg width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
          </svg>
        </button>
      </div>

      {open && (
        <div className="border-t border-gray-100 dark:border-gray-800 divide-y divide-gray-100 dark:divide-gray-800 bg-white dark:bg-[#1c1c1c]">
          {IMG_FIELDS.map(f => (
            <div key={f.key} className="flex items-center gap-3 px-3.5 py-[7px]">
              <span className="w-[68px] shrink-0 text-[10px] text-gray-400 dark:text-gray-500">{f.placeholder}</span>
              <input value={(item as unknown as Record<string, string>)[f.key]}
                onChange={e => set(f.key, e.target.value)} placeholder="—"
                className="flex-1 bg-transparent border-none outline-none text-[12px] text-gray-700 dark:text-gray-300 placeholder:text-gray-200 dark:placeholder:text-gray-700 focus:outline-none min-w-0" />
            </div>
          ))}
          <DimensionsInput value={item.dimensions} onChange={v => set('dimensions', v)} inline />
          <div className="flex items-center gap-3 px-3.5 py-[7px]">
            <span className="w-[68px] shrink-0 text-[10px] text-gray-400 dark:text-gray-500">Price</span>
            <input value={item.price} onChange={e => set('price', e.target.value)} placeholder="—"
              className="flex-1 bg-transparent border-none outline-none text-[12px] text-gray-700 dark:text-gray-300 placeholder:text-gray-200 dark:placeholder:text-gray-700 focus:outline-none min-w-0" />
          </div>
          <div className="flex items-center gap-3 px-3.5 py-[7px]">
            <span className="w-[68px] shrink-0 text-[10px] text-gray-400 dark:text-gray-500" />
            <label className="flex items-center gap-1.5 text-[11px] text-gray-400 cursor-pointer">
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

  const hasImages = images.length > 0

  return (
    <div className="space-y-3">
      <input ref={ref} type="file" accept="image/*" multiple className="hidden"
        onChange={e => { const fs = [...(e.target.files ?? [])]; if (fs.length) addFiles(fs); e.target.value = '' }} />

      {/* Empty state: full drop zone */}
      {!hasImages && (
        <div
          onDragOver={e => { e.preventDefault(); setOver(true) }}
          onDragLeave={() => setOver(false)}
          onDrop={e => { e.preventDefault(); setOver(false); const fs = [...e.dataTransfer.files].filter(f => f.type.startsWith('image/')); if (fs.length) addFiles(fs) }}
          onClick={() => ref.current?.click()}
          className={`border-2 border-dashed rounded-xl flex flex-col items-center justify-center py-6 cursor-pointer transition-colors ${
            over ? 'border-gray-400 bg-gray-50 dark:bg-gray-800' : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
          }`}
        >
          <svg className="w-7 h-7 text-gray-300 dark:text-gray-600 mb-2.5" fill="none" stroke="currentColor" strokeWidth="0.8" viewBox="0 0 24 24">
            <path d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5"/>
          </svg>
          <p className="text-sm text-gray-500 dark:text-gray-400">Drop here</p>
          <p className="text-xs text-gray-400 dark:text-gray-600 mt-0.5">or click to browse</p>
        </div>
      )}

      {/* With images: list + compact add strip */}
      {hasImages && (
        <div className="space-y-2">
          {images.map(img => (
            <ImageRow key={img.id} item={img}
              onUpdate={u => onChange(images.map(x => x.id === u.id ? u : x))}
              onDelete={() => onChange(images.filter(x => x.id !== img.id))} />
          ))}
          <button
            type="button"
            onClick={() => ref.current?.click()}
            onDragOver={e => { e.preventDefault(); setOver(true) }}
            onDragLeave={() => setOver(false)}
            onDrop={e => { e.preventDefault(); setOver(false); const fs = [...e.dataTransfer.files].filter(f => f.type.startsWith('image/')); if (fs.length) addFiles(fs) }}
            className={`w-full border border-dashed rounded-xl py-2 text-[12px] flex items-center justify-center gap-1.5 transition-colors ${
              over ? 'border-gray-400 text-gray-600 bg-gray-50 dark:bg-gray-800' : 'border-gray-200 dark:border-gray-700 text-gray-400 hover:border-gray-400 hover:text-gray-600 dark:hover:border-gray-500 dark:hover:text-gray-300'
            }`}
          >
            <svg width="11" height="11" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
            </svg>
            Add image
          </button>
        </div>
      )}
    </div>
  )
}

// ═══════════════════════════════════════════════════════════════════════════════
// PANEL 3 — MISE EN PAGE (Layout)
// ═══════════════════════════════════════════════════════════════════════════════

function artBlockType(count: number): BlockType {
  return count >= 3 ? 'trio' : count === 2 ? 'pair' : 'full'
}

const CHIP_COLORS = [
  'bg-rose-300', 'bg-orange-300', 'bg-amber-300', 'bg-lime-300',
  'bg-emerald-300', 'bg-teal-300', 'bg-sky-300', 'bg-violet-300', 'bg-pink-300',
]

function chipBg(id: string): string {
  let h = 0
  for (let i = 0; i < id.length; i++) h = (h * 31 + id.charCodeAt(i)) & 0xffff
  return CHIP_COLORS[h % CHIP_COLORS.length]
}

// ─── Artwork chip (tray) ───────────────────────────────────────────────────────

function ArtworkChip({ img, placed, onDragStart, onDragEnd }: {
  img: ImageItem; placed: boolean; onDragStart: () => void; onDragEnd: () => void
}) {
  return (
    <div
      draggable={!placed}
      onDragStart={e => { e.dataTransfer.setData('text/plain', img.id); e.dataTransfer.effectAllowed = 'copy'; onDragStart() }}
      onDragEnd={onDragEnd}
      title={[img.title, img.artist].filter(Boolean).join(' — ') + (placed ? ' (placée)' : '')}
      className={`relative rounded-lg overflow-hidden group transition-all ${
        placed ? 'opacity-40 cursor-default' : 'cursor-grab active:cursor-grabbing'
      }`}
    >
      <div className={`aspect-square w-full ${!img.dataUrl ? chipBg(img.id) : ''}`}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        {img.dataUrl && <img src={img.dataUrl} alt={img.title || ''} className="w-full h-full object-cover group-hover:opacity-80 transition-opacity" />}
      </div>
      {placed && (
        <div className="absolute top-0.5 right-0.5 w-3.5 h-3.5 bg-white dark:bg-gray-900 rounded-full flex items-center justify-center shadow-sm">
          <svg width="7" height="7" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24" className="text-gray-500">
            <path d="M5 13l4 4L19 7"/>
          </svg>
        </div>
      )}
    </div>
  )
}

// ─── Art block row (full / pair / trio) ───────────────────────────────────────

function ArtBlockRow({ block, images, dragHandleProps, imageDragging, textDragging, onDelete, onUpdate, onAppendText }: {
  block: Block; images: ImageItem[]
  dragHandleProps: DraggableProvidedDragHandleProps | null | undefined
  imageDragging: boolean; textDragging: string | null
  onDelete: () => void; onUpdate: (b: Block) => void
  onAppendText: (type: BlockType) => void
}) {
  const [over, setOver] = useState(false)
  const [textOver, setTextOver] = useState(false)
  const artworks = block.slots.map(s => images.find(i => i.id === s.imageId)).filter((x): x is ImageItem => Boolean(x))
  const filledCount = block.slots.filter(s => s.imageId !== null).length
  const canReceive = filledCount < 3

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault(); setOver(false)
    if (!canReceive) return
    const id = e.dataTransfer.getData('text/plain')
    if (!id || block.slots.some(s => s.imageId === id)) return
    const emptyIdx = block.slots.findIndex(s => s.imageId === null)
    const newSlots = emptyIdx !== -1
      ? block.slots.map((s, i) => i === emptyIdx ? { ...s, imageId: id } : s)
      : [...block.slots, { imageId: id }]
    const newFilledCount = newSlots.filter(s => s.imageId !== null).length
    onUpdate({ ...block, slots: newSlots, type: artBlockType(newFilledCount) })
  }

  const removeArtwork = (imageId: string) => {
    const newSlots = block.slots.filter(s => s.imageId !== imageId)
    if (newSlots.length === 0) { onDelete(); return }
    onUpdate({ ...block, slots: newSlots, type: artBlockType(newSlots.length) })
  }

  const blockIcon = filledCount >= 3
    ? /* triptych: page with 3 columns + full strip on top */
      <svg width="20" height="26" viewBox="0 0 20 26" fill="none" className="text-gray-400 dark:text-gray-500 shrink-0">
        <rect x="0.75" y="0.75" width="18.5" height="24.5" rx="2" stroke="currentColor" strokeWidth="0.8"/>
        <rect x="2.5" y="2.5" width="15" height="8" rx="1" fill="currentColor" opacity="0.25"/>
        <rect x="2.5" y="12" width="4.5" height="6" rx="1" fill="currentColor" opacity="0.5"/>
        <rect x="7.75" y="12" width="4.5" height="6" rx="1" fill="currentColor" opacity="0.5"/>
        <rect x="13" y="12" width="4.5" height="6" rx="1" fill="currentColor" opacity="0.5"/>
      </svg>
    : filledCount === 2
    ? /* diptych: page with 2 columns */
      <svg width="20" height="26" viewBox="0 0 20 26" fill="none" className="text-gray-400 dark:text-gray-500 shrink-0">
        <rect x="0.75" y="0.75" width="18.5" height="24.5" rx="2" stroke="currentColor" strokeWidth="0.8"/>
        <rect x="2.5" y="2.5" width="15" height="8" rx="1" fill="currentColor" opacity="0.25"/>
        <rect x="2.5" y="12" width="7" height="10" rx="1" fill="currentColor" opacity="0.5"/>
        <rect x="10.5" y="12" width="7" height="10" rx="1" fill="currentColor" opacity="0.5"/>
      </svg>
    : /* full: page with one image */
      <svg width="20" height="26" viewBox="0 0 20 26" fill="none" className="text-gray-400 dark:text-gray-500 shrink-0">
        <rect x="0.75" y="0.75" width="18.5" height="24.5" rx="2" stroke="currentColor" strokeWidth="0.8"/>
        <rect x="2.5" y="2.5" width="15" height="8" rx="1" fill="currentColor" opacity="0.25"/>
        <rect x="2.5" y="12" width="15" height="11.5" rx="1" fill="currentColor" opacity="0.5"/>
      </svg>

  const handleTextDrop = (e: React.DragEvent) => {
    const textType = e.dataTransfer.getData('application/x-text-type') as BlockType | ''
    if (!textType) return
    e.preventDefault(); setTextOver(false)
    if (block.type === 'full') {
      onUpdate({ ...block, type: 'side', sideTextType: textType === 'quotefull' ? 'quotefull' : 'quote' })
      return
    }
    onAppendText(textType)
  }

  return (
    <div
      onDragOver={e => {
        if (imageDragging && canReceive) { e.preventDefault(); setOver(true); return }
        if (textDragging) { e.preventDefault(); setTextOver(true) }
      }}
      onDragLeave={() => { setOver(false); setTextOver(false) }}
      onDrop={e => { handleTextDrop(e); if (!e.defaultPrevented) handleDrop(e) }}
      className={`flex items-center gap-2 px-3 py-3 rounded-xl border transition-colors ${
        textOver ? 'border-violet-400 bg-violet-50 dark:bg-violet-950/20'
        : over ? 'border-blue-400 bg-blue-50 dark:bg-blue-950/20'
        : imageDragging && canReceive ? 'border-dashed border-blue-200 dark:border-blue-800 bg-blue-50/20 dark:bg-blue-950/10'
        : textDragging ? 'border-dashed border-violet-200 dark:border-violet-800'
        : 'border-gray-200 dark:border-gray-700 hover:border-gray-900 dark:hover:border-gray-100 bg-white dark:bg-gray-900'
      }`}
    >
      {/* Drag handle */}
      <div {...dragHandleProps} className="shrink-0 text-gray-300 dark:text-gray-600 hover:text-blue-400 active:text-blue-500 cursor-grab active:cursor-grabbing touch-none transition-colors">
        <svg width="10" height="12" viewBox="0 0 10 12" fill="currentColor">
          <circle cx="2.5" cy="2" r="1.2"/><circle cx="2.5" cy="6" r="1.2"/><circle cx="2.5" cy="10" r="1.2"/>
          <circle cx="7.5" cy="2" r="1.2"/><circle cx="7.5" cy="6" r="1.2"/><circle cx="7.5" cy="10" r="1.2"/>
        </svg>
      </div>

      {/* Block icon */}
      <div className="shrink-0 w-5 flex items-center justify-center">
        {blockIcon}
      </div>

      {/* Artwork thumbnails */}
      <div className="flex items-center gap-1 flex-1 min-w-0">
        {artworks.map(img => (
          <div key={img.id} className="relative group/art shrink-0">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={img.dataUrl} alt={img.title || ''} className="w-9 h-9 rounded object-cover" />
            <button
              type="button"
              onClick={() => removeArtwork(img.id)}
              className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-400 hover:text-red-500 flex items-center justify-center opacity-0 group-hover/art:opacity-100 transition-opacity shadow-sm"
            >
              <svg width="6" height="6" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
              </svg>
            </button>
          </div>
        ))}
        {imageDragging && canReceive && (
          <div className="w-7 h-7 rounded border-2 border-dashed border-blue-300 dark:border-blue-700 flex items-center justify-center shrink-0">
            <svg width="8" height="8" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24" className="text-blue-400">
              <path d="M12 5v14M5 12h14"/>
            </svg>
          </div>
        )}
      </div>

      {/* Inquire toggle */}
      <label className="flex items-center gap-1 text-[10px] text-gray-400 dark:text-gray-500 cursor-pointer select-none shrink-0" title="Show Inquire button">
        <input type="checkbox" checked={!block.inquireHidden}
          onChange={e => onUpdate({ ...block, showInquire: e.target.checked, inquireHidden: !e.target.checked })}
          className="rounded border-gray-300 w-3 h-3 shrink-0" />
        Inquire
      </label>

      {/* Delete */}
      <button type="button" onClick={onDelete}
        className="shrink-0 text-gray-300 hover:text-gray-500 dark:text-gray-600 dark:hover:text-gray-400 transition-colors">
        <svg width="11" height="11" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
        </svg>
      </button>
    </div>
  )
}

// ─── Text block row ────────────────────────────────────────────────────────────

const TEXT_TYPE_META: Record<string, { label: string; pill: string; icon?: React.ReactNode }> = {
  quote:     { label: 'Text',  pill: 'bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/20 dark:text-amber-400 dark:border-amber-800', icon: (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" className="text-gray-400 dark:text-gray-500 shrink-0">
      <path d="M3 5h12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M9 5v9"  stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  ) },
  quotefull: { label: 'Quote', pill: 'bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/20 dark:text-amber-400 dark:border-amber-800', icon: (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" className="text-gray-400 dark:text-gray-500 shrink-0">
      <path d="M4 4v5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M4 9c0 2-1 3-2.5 3.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
      <path d="M10 4v5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M10 9c0 2-1 3-2.5 3.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
    </svg>
  ) },
  side:      { label: 'Art + text', pill: 'bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950/20 dark:text-blue-400 dark:border-blue-800', icon: (
    <svg width="20" height="26" viewBox="0 0 20 26" fill="none" className="text-gray-400 dark:text-gray-500 shrink-0">
      <rect x="0.75" y="0.75" width="18.5" height="24.5" rx="2" stroke="currentColor" strokeWidth="0.8"/>
      <rect x="2.5" y="2.5" width="7" height="21" rx="1" fill="currentColor" opacity="0.4"/>
      <rect x="11.5" y="6" width="6" height="1.5" rx="0.5" fill="currentColor" opacity="0.3"/>
      <rect x="11.5" y="10" width="6" height="1.5" rx="0.5" fill="currentColor" opacity="0.3"/>
      <rect x="11.5" y="14" width="4" height="1.5" rx="0.5" fill="currentColor" opacity="0.3"/>
    </svg>
  ) },
  imgbio:    { label: 'Img + Bio',  pill: 'bg-purple-50 text-purple-700 border-purple-200 dark:bg-purple-950/20 dark:text-purple-400 dark:border-purple-800' },
}

function TextBlockRow({ block, expanded, images, imageDragging, dragHandleProps, onDelete, onExpand, onUpdate }: {
  block: Block; expanded: boolean; images: ImageItem[]; imageDragging: boolean
  dragHandleProps: DraggableProvidedDragHandleProps | null | undefined
  onDelete: () => void; onExpand: () => void; onUpdate: (b: Block) => void
}) {
  const [over, setOver] = useState(false)
  const meta = TEXT_TYPE_META[block.type] ?? { label: block.type, pill: 'bg-gray-100 text-gray-600 border-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-700' }
  const hasImageSlot = BLOCK_CONFIGS[block.type].slotCount > 0
  const imageSlotFilled = hasImageSlot && !!block.slots[0]?.imageId
  const canReceiveImage = (hasImageSlot && !imageSlotFilled) || block.type === 'quote'
  const slotImage = hasImageSlot ? images.find(i => i.id === block.slots[0]?.imageId) : undefined

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault(); setOver(false)
    const id = e.dataTransfer.getData('text/plain')
    if (!id) return
    if (block.type === 'quote') {
      onUpdate({ ...block, type: 'side', slots: [{ imageId: id }] })
      return
    }
    if (!canReceiveImage) return
    onUpdate({ ...block, slots: [{ imageId: id }, ...block.slots.slice(1)] })
  }

  return (
    <div
      onDragOver={e => { if (!canReceiveImage) return; if (!e.dataTransfer.types.includes('text/plain')) return; e.preventDefault(); setOver(true) }}
      onDragLeave={() => setOver(false)}
      onDrop={handleDrop}
      className={`border rounded-xl overflow-hidden transition-colors ${
        over ? 'border-blue-400'
        : imageDragging && canReceiveImage ? 'border-dashed border-blue-200 dark:border-blue-800'
        : 'border-gray-200 dark:border-gray-700 hover:border-gray-900 dark:hover:border-gray-100'
      }`}
    >
      <div className="flex items-center gap-2.5 px-3 py-3 bg-white dark:bg-gray-900">
        <div {...dragHandleProps} className="shrink-0 text-gray-300 dark:text-gray-600 hover:text-blue-400 active:text-blue-500 cursor-grab active:cursor-grabbing touch-none transition-colors">
          <svg width="10" height="12" viewBox="0 0 10 12" fill="currentColor">
            <circle cx="2.5" cy="2" r="1.2"/><circle cx="2.5" cy="6" r="1.2"/><circle cx="2.5" cy="10" r="1.2"/>
            <circle cx="7.5" cy="2" r="1.2"/><circle cx="7.5" cy="6" r="1.2"/><circle cx="7.5" cy="10" r="1.2"/>
          </svg>
        </div>

        {/* Layout icon */}
        <div className="shrink-0 w-5 flex items-center justify-center">
          {meta.icon ?? <span className={`px-2 py-0.5 text-[10px] font-medium border rounded-full ${meta.pill}`}>{meta.label}</span>}
        </div>

        {/* Side block slots — outside expand button (contains its own buttons) */}
        {block.type === 'side' && (
          <div className="flex items-center gap-1.5 shrink-0">
            {slotImage ? (
              <div className="relative group/slot shrink-0">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={slotImage.dataUrl} alt="" className="w-9 h-9 rounded object-cover" />
                <button
                  type="button"
                  onClick={() => onUpdate({ ...block, slots: [{ imageId: null }, ...block.slots.slice(1)] })}
                  className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-400 hover:text-red-500 flex items-center justify-center opacity-0 group-hover/slot:opacity-100 transition-opacity shadow-sm"
                >
                  <svg width="6" height="6" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                    <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
                  </svg>
                </button>
              </div>
            ) : (
              <div className="w-9 h-9 rounded border border-dashed border-gray-200 dark:border-gray-700 flex items-center justify-center shrink-0">
                <svg width="10" height="10" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" className="text-gray-300 dark:text-gray-600">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3"/>
                </svg>
              </div>
            )}
            <span className="text-[10px] text-gray-300 dark:text-gray-600 select-none">+</span>
            <div className="relative group/text shrink-0 w-9 h-9 rounded border border-gray-200 dark:border-gray-700 flex items-center justify-center">
              {block.sideTextType === 'quotefull' ? (
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none" className="text-gray-400 dark:text-gray-500">
                  <path d="M4 4v5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                  <path d="M4 9c0 2-1 3-2.5 3.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
                  <path d="M10 4v5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                  <path d="M10 9c0 2-1 3-2.5 3.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
                </svg>
              ) : (
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none" className="text-gray-400 dark:text-gray-500">
                  <path d="M3 5h12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                  <path d="M9 5v9"  stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
              )}
              <button
                type="button"
                onClick={() => onUpdate({ ...block, type: slotImage ? 'full' : 'quote', slots: slotImage ? [{ imageId: slotImage.id }] : [] })}
                className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-400 hover:text-red-500 flex items-center justify-center opacity-0 group-hover/text:opacity-100 transition-opacity shadow-sm"
              >
                <svg width="6" height="6" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
                </svg>
              </button>
            </div>
          </div>
        )}

        {/* Non-side slot image */}
        {block.type !== 'side' && slotImage && (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={slotImage.dataUrl} alt="" className="w-9 h-9 rounded object-cover shrink-0" />
        )}

        {/* Expand button — text preview + arrow only */}
        <button type="button" onClick={onExpand} className="flex-1 flex items-center gap-2 text-left min-w-0">
          {block.type !== 'side' && (block.quoteText
            ? <span className="text-[11px] text-gray-400 truncate italic">"{block.quoteText}"</span>
            : <span className="text-[11px] text-gray-300 dark:text-gray-600">Add text…</span>
          )}
          <svg className={`w-3 h-3 text-gray-400 ml-auto shrink-0 transition-transform ${expanded ? 'rotate-180' : ''}`}
            fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M19 9l-7 7-7-7"/></svg>
        </button>

        <button type="button" onClick={onDelete}
          className="shrink-0 text-gray-300 hover:text-gray-500 dark:text-gray-600 dark:hover:text-gray-400 transition-colors">
          <svg width="11" height="11" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
          </svg>
        </button>
      </div>

      {expanded && (
        <div className="border-t border-gray-100 dark:border-gray-800 px-3 py-3 bg-gray-50 dark:bg-gray-900/50 space-y-2">
          {hasImageSlot && (
            <div className={`flex items-center gap-2 px-2 py-1.5 rounded-lg border border-dashed text-[10px] transition-colors ${
              slotImage ? 'border-transparent' : over || (imageDragging && canReceiveImage) ? 'border-blue-300 dark:border-blue-700 bg-blue-50/30 text-blue-500' : 'border-gray-200 dark:border-gray-700 text-gray-400'
            }`}>
              {slotImage ? (
                <>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={slotImage.dataUrl} alt="" className="w-6 h-6 rounded object-cover shrink-0" />
                  <span className="flex-1 truncate text-gray-500">{slotImage.title || slotImage.artist}</span>
                  <button type="button" onClick={() => onUpdate({ ...block, slots: [{ imageId: null }, ...block.slots.slice(1)] })}
                    className="text-gray-300 hover:text-gray-500 shrink-0">
                    <svg width="10" height="10" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
                    </svg>
                  </button>
                </>
              ) : (
                <span>Drag an artwork here to add an image</span>
              )}
            </div>
          )}
          <textarea value={block.quoteText} onChange={e => onUpdate({ ...block, quoteText: e.target.value })}
            placeholder={block.type === 'quote' ? 'Your text or quote…' : block.type === 'side' ? 'Accompanying text…' : block.type === 'imgbio' ? 'Artist biography…' : 'Text…'}
            rows={3} className={input + ' resize-none text-sm'} autoFocus />
          {block.type === 'quote' && (
            <input value={block.quoteAuthor} onChange={e => onUpdate({ ...block, quoteAuthor: e.target.value })}
              placeholder="— Author (optional)" className={input} />
          )}
        </div>
      )}
    </div>
  )
}

// ─── Template thumbnails ───────────────────────────────────────────────────────

function ThumbFull() {
  return <div className="w-full h-4 rounded-sm bg-gray-300 dark:bg-gray-600" />
}
function ThumbPair() {
  return <div className="flex gap-1 w-full"><div className="flex-1 h-6 rounded-sm bg-gray-300 dark:bg-gray-600"/><div className="flex-1 h-6 rounded-sm bg-gray-300 dark:bg-gray-600"/></div>
}
function ThumbTrio() {
  return <div className="flex gap-0.5 w-full"><div className="flex-1 h-[14px] rounded-sm bg-gray-300 dark:bg-gray-600"/><div className="flex-1 h-[14px] rounded-sm bg-gray-300 dark:bg-gray-600"/><div className="flex-1 h-[14px] rounded-sm bg-gray-300 dark:bg-gray-600"/></div>
}
function ThumbText() {
  return <div className="space-y-1 w-full px-2"><div className="h-1.5 bg-gray-300 dark:bg-gray-600 rounded-full w-3/4 mx-auto"/><div className="h-1.5 bg-gray-200 dark:bg-gray-700 rounded-full w-1/2 mx-auto"/></div>
}
function ThumbSide() {
  return <div className="flex gap-1 w-full items-center"><div className="w-8 h-6 rounded-sm bg-gray-300 dark:bg-gray-600 shrink-0"/><div className="flex-1 space-y-1"><div className="h-1.5 bg-gray-300 dark:bg-gray-600 rounded-full"/><div className="h-1.5 bg-gray-200 dark:bg-gray-700 rounded-full w-3/4"/><div className="h-1.5 bg-gray-200 dark:bg-gray-700 rounded-full w-1/2"/></div></div>
}
function ThumbQuoteFull() {
  return <div className="space-y-1 w-full"><div className="space-y-1 px-3"><div className="h-1.5 bg-gray-300 dark:bg-gray-600 rounded-full w-3/4 mx-auto"/><div className="h-1.5 bg-gray-200 dark:bg-gray-700 rounded-full w-1/2 mx-auto"/></div><div className="w-full h-4 rounded-sm bg-gray-300 dark:bg-gray-600"/></div>
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
    thumb: <div className="space-y-1"><ThumbFull /><ThumbPair /><ThumbText /></div>,
    blocks: ['full', 'pair', 'quote'],
  },
  {
    id: 'editorial',
    name: 'Editorial',
    description: 'Full · Pair · Art+text',
    thumb: <div className="space-y-1"><ThumbFull /><ThumbPair /><ThumbSide /></div>,
    blocks: ['full', 'pair', 'side'],
  },
  {
    id: 'intimate',
    name: 'Intimate',
    description: 'Text · Full · Art+text · Full',
    thumb: <div className="space-y-1"><ThumbText /><ThumbFull /><ThumbSide /><ThumbFull /></div>,
    blocks: ['quote', 'full', 'side', 'full'],
    locked: true,
  },
  {
    id: 'collection',
    name: 'Collection',
    description: 'Trio · Pair · Trio · Text',
    thumb: <div className="space-y-1"><ThumbTrio /><ThumbPair /><ThumbTrio /><ThumbText /></div>,
    blocks: ['trio', 'pair', 'trio', 'quote'],
    locked: true,
  },
]

function TemplatesSection({ blocks, onChange, isPro, onPaywall }: { blocks: Block[]; onChange: (b: Block[]) => void; isPro: boolean; onPaywall: () => void }) {
  const [applied, setApplied] = useState<string | null>(null)
  const [activeIdx, setActiveIdx] = useState(0)
  const scrollRef = useRef<HTMLDivElement>(null)

  const handleScroll = () => {
    const el = scrollRef.current
    if (!el) return
    const cardW = 120 + 8 // width + gap
    setActiveIdx(Math.round(el.scrollLeft / cardW))
  }

  const applyTemplate = (tpl: typeof TEMPLATES[number]) => {
    if (tpl.locked && !isPro) { onPaywall(); return }
    const existingImageIds = blocks.flatMap(b => b.slots.map(s => s.imageId).filter((id): id is string => id !== null))
    const existingQuote = blocks.find(b => b.quoteText)?.quoteText ?? ''
    const existingAuthor = blocks.find(b => b.quoteAuthor)?.quoteAuthor ?? ''

    let imageCursor = 0
    let quoteUsed = false
    const newBlocks = tpl.blocks.map(t => {
      const block = makeBlock(t)
      block.slots = block.slots.map(() => {
        const id = existingImageIds[imageCursor] ?? null
        imageCursor++
        return { imageId: id }
      })
      if (BLOCK_CONFIGS[t].hasQuote && !quoteUsed && (existingQuote || existingAuthor)) {
        block.quoteText = existingQuote
        block.quoteAuthor = existingAuthor
        quoteUsed = true
      }
      return block
    })
    onChange(newBlocks)
    setApplied(tpl.id)
    setTimeout(() => setApplied(null), 1500)
  }

  return (
    <div className="space-y-2">
    <div ref={scrollRef} onScroll={handleScroll} className="-mx-5 pl-[15px] pr-5 overflow-x-auto [&::-webkit-scrollbar]:hidden" style={{ scrollbarWidth: 'none' }}>
      <div className="flex gap-2 pb-1" style={{ width: 'max-content' }}>
        {TEMPLATES.map(tpl => {
          const isLocked = tpl.locked && !isPro
          return (
            <div key={tpl.id} className="relative w-[120px] shrink-0">
              <button
                type="button"
                onClick={() => applyTemplate(tpl)}
                className={`w-full text-left p-2.5 rounded-[20px] border transition-all flex flex-col ${
                  isLocked
                    ? 'border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900 cursor-pointer hover:border-gray-300'
                    : applied === tpl.id
                    ? 'border-gray-900 dark:border-gray-100 bg-gray-50 dark:bg-gray-800'
                    : 'border-gray-200 dark:border-gray-700 hover:border-gray-400 dark:hover:border-gray-500 bg-white dark:bg-gray-900'
                }`}
              >
                <div className="mb-2 p-2 bg-gray-50 dark:bg-gray-800 rounded-lg h-24 overflow-hidden flex items-center justify-center">
                  <div className="w-full">{tpl.thumb}</div>
                </div>
                <p className="text-[11px] font-medium text-gray-800 dark:text-gray-200 leading-tight truncate">
                  {applied === tpl.id ? '✓ Applied' : tpl.name}
                </p>
                <p className="text-[10px] text-gray-400 dark:text-gray-500 mt-0.5 leading-tight truncate">{tpl.description}</p>
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
    </div>
    {/* Dots */}
    <div className="flex justify-center gap-1.5">
      {TEMPLATES.map((_, i) => (
        <div key={i} className={`rounded-full transition-all duration-200 ${i === activeIdx ? 'w-3 h-1.5 bg-gray-500 dark:bg-gray-400' : 'w-1.5 h-1.5 bg-gray-200 dark:bg-gray-700'}`} />
      ))}
    </div>
    </div>
  )
}

function WireText() {
  return (
    <div className="w-full flex flex-col items-center gap-[3px] py-0.5 px-1">
      <div className="h-[3px] bg-gray-300 dark:bg-gray-600 rounded-full w-[88%]" />
      <div className="h-[3px] bg-gray-200 dark:bg-gray-700 rounded-full w-[78%]" />
      <div className="h-[3px] bg-gray-200 dark:bg-gray-700 rounded-full w-[92%]" />
      <div className="h-[3px] bg-gray-200 dark:bg-gray-700 rounded-full w-[65%]" />
      <div className="h-[3px] bg-gray-150 dark:bg-gray-750 rounded-full w-[38%] mt-px" />
    </div>
  )
}

function WireQuote() {
  return (
    <div className="w-full flex flex-col gap-[3px] py-0.5 px-1">
      <div className="flex flex-col items-center gap-[3px] px-1">
        <div className="h-[3px] bg-gray-300 dark:bg-gray-600 rounded-full w-[80%]" />
        <div className="h-[3px] bg-gray-200 dark:bg-gray-700 rounded-full w-[65%]" />
        <div className="h-[3px] bg-gray-200 dark:bg-gray-700 rounded-full w-[45%]" />
      </div>
      <div className="w-full h-[11px] bg-gray-300 dark:bg-gray-600 rounded-sm mt-px" />
    </div>
  )
}

function WireSide() {
  return (
    <div className="w-full flex gap-1 items-stretch px-0.5 py-0.5">
      <div className="w-[42%] h-[26px] bg-gray-300 dark:bg-gray-600 rounded-sm shrink-0" />
      <div className="flex-1 flex flex-col justify-center gap-[3px]">
        <div className="h-[3px] bg-gray-300 dark:bg-gray-600 rounded-full w-full" />
        <div className="h-[3px] bg-gray-200 dark:bg-gray-700 rounded-full w-[85%]" />
        <div className="h-[3px] bg-gray-200 dark:bg-gray-700 rounded-full w-[70%]" />
        <div className="h-[3px] bg-gray-200 dark:bg-gray-700 rounded-full w-[55%]" />
      </div>
    </div>
  )
}

const TEXT_BLOCKS_DEF: { type: BlockType; label: string; thumb: React.ReactNode }[] = [
  { type: 'quote',     label: 'Text',  thumb: <WireText /> },
  { type: 'quotefull', label: 'Quote', thumb: <WireQuote /> },
]

function LayoutSection({ images, blocks, onChange, onBlockDragStart, onBlockDragEnd }: {
  images: ImageItem[]; blocks: Block[]; onChange: (b: Block[]) => void
  onBlockDragStart?: (id: string) => void; onBlockDragEnd?: () => void
}) {
  const [expandedId, setExpandedId] = useState<string | null>(null)
  const [imageDragging, setImageDragging] = useState(false)
  const [textDragging, setTextDragging] = useState<string | null>(null)
  const [dropZoneOver, setDropZoneOver] = useState(false)

  const usedIds = new Set(blocks.flatMap(b => b.slots.map(s => s.imageId).filter((id): id is string => id !== null)))
  const isArtBlock = (b: Block) => ['full', 'pair', 'trio'].includes(b.type)

  const addTextBlock = (type: BlockType) => {
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

  const handleDropOnNewZone = (e: React.DragEvent) => {
    e.preventDefault(); setDropZoneOver(false); setTextDragging(null)
    const textType = e.dataTransfer.getData('application/x-text-type') as BlockType | ''
    if (textType) {
      const b = makeBlock(textType)
      onChange([...blocks, b])
      setExpandedId(b.id)
      return
    }
    const id = e.dataTransfer.getData('text/plain')
    if (!id) return
    const b = makeBlock('full')
    b.slots = [{ imageId: id }]
    onChange([...blocks, b])
  }

  return (
    <div className="space-y-5">

      {/* Artwork tray */}
      {images.length > 0 && (
        <div>
          <div className="flex items-center gap-1.5 mb-2">
            <svg width="12" height="12" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24" className="text-gray-900 dark:text-gray-100"><rect x="3" y="3" width="8" height="8" rx="1"/><rect x="13" y="3" width="8" height="8" rx="1"/><rect x="3" y="13" width="8" height="8" rx="1"/><rect x="13" y="13" width="8" height="8" rx="1"/></svg>
            <span className="text-[11px] text-gray-900 dark:text-gray-100 font-medium">Artworks — drag to place</span>
          </div>
          <div className="grid grid-cols-5 gap-1.5">
            {images.map(img => (
              <ArtworkChip
                key={img.id}
                img={img}
                placed={usedIds.has(img.id)}
                onDragStart={() => setImageDragging(true)}
                onDragEnd={() => setImageDragging(false)}
              />
            ))}
          </div>
          {imageDragging && (
            <p className="text-[10px] text-blue-500 dark:text-blue-400 mt-1.5 leading-snug">
              Drop on a block to group · Drop below to create a new block
            </p>
          )}
        </div>
      )}

      {/* Text tray */}
      <div>
        <div className="flex items-center gap-1.5 mb-2">
            <svg width="12" height="12" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24" className="text-gray-900 dark:text-gray-100"><path d="M4 7V4h16v3M9 20h6M12 4v16"/></svg>
            <span className="text-[11px] text-gray-900 dark:text-gray-100 font-medium">Text — click or drag</span>
          </div>
        <div className="flex gap-1.5">
          {TEXT_BLOCKS_DEF.map(({ type, label, thumb }) => (
            <button
              key={type}
              type="button"
              draggable
              onDragStart={e => { e.dataTransfer.setData('application/x-text-type', type); e.dataTransfer.effectAllowed = 'copy'; setTextDragging(type) }}
              onDragEnd={() => setTextDragging(null)}
              onClick={() => addTextBlock(type)}
              className="flex-1 flex flex-col items-center gap-2 pt-2.5 pb-2 rounded-xl border border-gray-200 dark:border-gray-700 hover:border-gray-900 dark:hover:border-gray-100 bg-white dark:bg-gray-900 transition-colors group cursor-grab active:cursor-grabbing"
            >
              <div className="w-full px-1">{thumb}</div>
              <span className="text-[10px] font-medium text-gray-500 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-gray-100 transition-colors">{label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Empty state hint */}
      {images.length === 0 && blocks.length === 0 && (
        <p className="text-[11px] text-gray-400 dark:text-gray-500 text-center py-1 leading-relaxed">
          Add artworks in the Media section,<br/>then drag them here to build your layout.
        </p>
      )}

      {/* Block sequence */}
      {blocks.length > 0 && (
        <div>
          <div className="flex items-center gap-1.5 mb-2">
            <svg width="12" height="12" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24" className="text-gray-900 dark:text-gray-100"><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><circle cx="3" cy="6" r="1" fill="currentColor" stroke="none"/><circle cx="3" cy="12" r="1" fill="currentColor" stroke="none"/><circle cx="3" cy="18" r="1" fill="currentColor" stroke="none"/></svg>
            <span className="text-[11px] text-gray-900 dark:text-gray-100 font-medium">Sequence</span>
          </div>
          <DragDropContext
            onDragStart={(start: DragStart) => onBlockDragStart?.(start.draggableId)}
            onDragEnd={result => { onBlockDragEnd?.(); onDragEnd(result) }}
          >
            <Droppable droppableId="blocks">
              {provided => (
                <div {...provided.droppableProps} ref={provided.innerRef} className="space-y-1.5">
                  {blocks.map((block, index) => (
                    <Draggable key={block.id} draggableId={block.id} index={index}>
                      {(provided, snapshot) => (
                        <div ref={provided.innerRef} {...provided.draggableProps}
                          className={snapshot.isDragging ? 'shadow-xl opacity-90' : ''}>
                          {isArtBlock(block) ? (
                            <ArtBlockRow
                              block={block}
                              images={images}
                              dragHandleProps={provided.dragHandleProps}
                              imageDragging={imageDragging}
                              textDragging={textDragging}
                              onDelete={() => onChange(blocks.filter(b => b.id !== block.id))}
                              onUpdate={updated => onChange(blocks.map(b => b.id === updated.id ? updated : b))}
                              onAppendText={type => {
                                const tb = makeBlock(type)
                                const next = [...blocks]
                                next.splice(index + 1, 0, tb)
                                onChange(next)
                                setExpandedId(tb.id)
                              }}
                            />
                          ) : (
                            <TextBlockRow
                              block={block}
                              expanded={expandedId === block.id}
                              images={images}
                              imageDragging={imageDragging}
                              dragHandleProps={provided.dragHandleProps}
                              onDelete={() => { onChange(blocks.filter(b => b.id !== block.id)); if (expandedId === block.id) setExpandedId(null) }}
                              onExpand={() => setExpandedId(expandedId === block.id ? null : block.id)}
                              onUpdate={updated => onChange(blocks.map(b => b.id === updated.id ? updated : b))}
                            />
                          )}
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
        </div>
      )}

      {/* New block drop zone */}
      <div
        onDragOver={e => { if (!imageDragging && !textDragging) return; e.preventDefault(); setDropZoneOver(true) }}
        onDragLeave={() => setDropZoneOver(false)}
        onDrop={handleDropOnNewZone}
        className={`rounded-xl border-2 border-dashed flex items-center justify-center py-4 transition-colors ${
          dropZoneOver ? 'border-blue-400 bg-blue-50 dark:bg-blue-950/20'
          : (imageDragging || textDragging) ? 'border-blue-200 dark:border-blue-800 bg-blue-50/20 dark:bg-blue-950/10'
          : 'border-gray-100 dark:border-gray-800'
        }`}
      >
        <p className={`text-[11px] transition-colors ${
          dropZoneOver ? 'text-blue-600 dark:text-blue-400'
          : (imageDragging || textDragging) ? 'text-blue-400 dark:text-blue-500'
          : 'text-gray-300 dark:text-gray-700'
        }`}>
          {dropZoneOver ? '+ New block' : (imageDragging || textDragging) ? 'Drop to add to sequence' : '+ New artwork block'}
        </p>
      </div>

    </div>
  )
}

// ═══════════════════════════════════════════════════════════════════════════════
// PREVIEW
// ═══════════════════════════════════════════════════════════════════════════════

function Editable({
  value, onChange, placeholder, className, as: Tag = 'span', multiline,
}: {
  value: string
  onChange: (v: string) => void
  placeholder?: string
  className?: string
  as?: 'span' | 'div' | 'h1'
  multiline?: boolean
}) {
  const ref = useRef<HTMLElement | null>(null)
  useEffect(() => {
    const el = ref.current
    if (el && el.innerText !== value) el.innerText = value
  }, [value])
  return (
    <Tag
      ref={ref as never}
      contentEditable
      suppressContentEditableWarning
      data-placeholder={placeholder}
      onBlur={() => {
        const v = ref.current?.innerText.replace(/ /g, ' ') ?? ''
        if (v !== value) onChange(v)
      }}
      onKeyDown={e => {
        if (e.key === 'Escape') (e.currentTarget as HTMLElement).blur()
        if (!multiline && e.key === 'Enter') { e.preventDefault(); (e.currentTarget as HTMLElement).blur() }
      }}
      onPaste={e => {
        e.preventDefault()
        const text = e.clipboardData.getData('text/plain')
        document.execCommand('insertText', false, text)
      }}
      className={`${className ?? ''} vr-editable outline-none rounded-sm transition-shadow`}
    />
  )
}

function findScrollParent(el: HTMLElement | null): HTMLElement | null {
  let node = el?.parentElement ?? null
  while (node) {
    const style = window.getComputedStyle(node)
    const canScroll = /(auto|scroll|overlay)/.test(style.overflowY)
    if (canScroll && node.scrollHeight > node.clientHeight) return node
    node = node.parentElement
  }
  return null
}

function useDragAutoScroll(active: boolean, rootRef: React.RefObject<HTMLElement | null>) {
  const pointerYRef = useRef<number | null>(null)
  const rafRef = useRef<number | null>(null)

  useEffect(() => {
    if (!active) {
      pointerYRef.current = null
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current)
        rafRef.current = null
      }
      return
    }

    const getScroller = () => {
      const parent = findScrollParent(rootRef.current)
      return parent ?? document.scrollingElement as HTMLElement | null
    }

    const tick = () => {
      const y = pointerYRef.current
      const scroller = getScroller()
      if (y !== null && scroller) {
        const rect = scroller === document.scrollingElement
          ? { top: 0, bottom: window.innerHeight }
          : scroller.getBoundingClientRect()
        const edge = Math.min(140, Math.max(84, (rect.bottom - rect.top) * 0.22))
        let delta = 0

        if (y < rect.top + edge) {
          const intensity = (rect.top + edge - y) / edge
          delta = -Math.ceil(34 * intensity * intensity)
        } else if (y > rect.bottom - edge) {
          const intensity = (y - (rect.bottom - edge)) / edge
          delta = Math.ceil(34 * intensity * intensity)
        }

        if (delta !== 0) scroller.scrollTop += delta
      }
      rafRef.current = requestAnimationFrame(tick)
    }

    const updatePointer = (event: DragEvent) => {
      if (event.clientY > 0) pointerYRef.current = event.clientY
    }
    const stop = () => {
      pointerYRef.current = null
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current)
        rafRef.current = null
      }
    }

    window.addEventListener('dragover', updatePointer)
    window.addEventListener('drag', updatePointer)
    window.addEventListener('drop', stop)
    window.addEventListener('dragend', stop)
    rafRef.current = requestAnimationFrame(tick)

    return () => {
      window.removeEventListener('dragover', updatePointer)
      window.removeEventListener('drag', updatePointer)
      window.removeEventListener('drop', stop)
      window.removeEventListener('dragend', stop)
      stop()
    }
  }, [active, rootRef])
}

function PreviewSlot({ imageId, images, landscape, cover, showInquire, inquireCompact, inquireTiny, onHideInquire, onRestoreInquire, onClearImage, onUpdateImage, draggable, onDragStartImage, onDragEndImage, onDropImage }: { imageId: string | null; images: ImageItem[]; landscape?: boolean; cover?: boolean; showInquire?: boolean; inquireCompact?: boolean; inquireTiny?: boolean; onHideInquire?: () => void; onRestoreInquire?: () => void; onClearImage?: () => void; onUpdateImage?: (id: string, patch: Partial<ImageItem>) => void; draggable?: boolean; onDragStartImage?: (id: string) => void; onDragEndImage?: () => void; onDropImage?: (imageId: string) => void }) {
  const [dropOver, setDropOver] = useState(false)
  const img = images.find(i => i.id === imageId)
  const aspect = landscape ? 'aspect-[4/3]' : 'aspect-[3/4]'
  if (!img?.dataUrl) return (
    <div
      className={`${aspect} transition-colors ${onDropImage ? 'cursor-copy' : ''} ${dropOver ? 'bg-blue-100 dark:bg-blue-900/30 ring-2 ring-blue-400 ring-inset' : 'bg-gray-100 dark:bg-gray-800'}`}
      onDragOver={onDropImage ? e => { if (e.dataTransfer.types.includes('text/x-vr-image')) { e.preventDefault(); e.dataTransfer.dropEffect = 'move'; setDropOver(true) } } : undefined}
      onDragLeave={onDropImage ? () => setDropOver(false) : undefined}
      onDrop={onDropImage ? e => { const id = e.dataTransfer.getData('text/x-vr-image'); if (id) { e.preventDefault(); setDropOver(false); onDropImage(id) } } : undefined}
    >
      {onDropImage && (
        <div className={`flex h-full items-center justify-center transition-opacity ${dropOver ? 'opacity-100' : 'opacity-0'}`}>
          <span className="text-[11px] text-blue-500">Drop image here</span>
        </div>
      )}
    </div>
  )
  const editing = !!onUpdateImage
  const hasNameTitle = editing || !!img.artist || !!img.title || !!img.year
  const hasMediumSize = editing || !!img.medium || !!img.dimensions
  const shouldShowInquire = showInquire ?? true
  const showInquireTopRight = !inquireTiny
  /** Bloc secondaire (medium, dimensions, prix) : toujours visible en édition inline pour pouvoir remplir les champs vides. */
  const showMetaBlock = hasMediumSize || editing || (!showInquireTopRight && (shouldShowInquire || !!onRestoreInquire))
  const set = (k: keyof ImageItem) => (v: string) => onUpdateImage?.(img.id, { [k]: v } as Partial<ImageItem>)
  const dragAttrs = draggable ? {
    draggable: true,
    onDragStart: (e: React.DragEvent) => {
      e.dataTransfer.effectAllowed = 'move'
      e.dataTransfer.setData('text/x-vr-image', img.id)
      onDragStartImage?.(img.id)
    },
    onDragEnd: () => onDragEndImage?.(),
  } : {}
  const dragCls = draggable ? 'cursor-grab active:cursor-grabbing' : ''
  return (
    <div className="group/slot flex flex-col gap-0">
      {cover ? (
        <div className={`group/image-slot relative ${aspect} overflow-hidden ${dragCls}`} {...dragAttrs}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={img.dataUrl} alt={img.title || ''} className="w-full h-full object-cover pointer-events-none" />
          {onClearImage && (
            <button
              type="button"
              onClick={onClearImage}
              className="absolute bottom-2 right-2 z-[5] flex h-7 w-7 items-center justify-center rounded-full border border-gray-200/90 bg-white/95 text-gray-500 shadow-sm backdrop-blur-sm transition-all hover:border-red-200 hover:text-red-500 opacity-0 group-hover/image-slot:opacity-100 dark:border-gray-600/90 dark:bg-[#0f0f0f]/95 dark:text-gray-400 dark:hover:border-red-900/60 dark:hover:text-red-400"
              aria-label="Retirer cette œuvre du bloc"
              title="Retirer cette œuvre du bloc"
            >
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                <path d="M4.5 6.5h15" />
                <path d="M9.5 6.5V4.75h5v1.75" />
                <path d="M7.25 9l.55 9.25c.04.7.62 1.25 1.32 1.25h5.76c.7 0 1.28-.55 1.32-1.25L16.75 9" />
                <path d="M10.5 11.25v5.5M13.5 11.25v5.5" />
              </svg>
            </button>
          )}
        </div>
      ) : (
        <div className={`group/image-slot relative ${dragCls}`} {...dragAttrs}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={img.dataUrl} alt={img.title || ''} className="w-full h-auto pointer-events-none" />
          {onClearImage && (
            <button
              type="button"
              onClick={onClearImage}
              className="absolute bottom-2 right-2 z-[5] flex h-7 w-7 items-center justify-center rounded-full border border-gray-200/90 bg-white/95 text-gray-500 shadow-sm backdrop-blur-sm transition-all hover:border-red-200 hover:text-red-500 opacity-0 group-hover/image-slot:opacity-100 dark:border-gray-600/90 dark:bg-[#0f0f0f]/95 dark:text-gray-400 dark:hover:border-red-900/60 dark:hover:text-red-400"
              aria-label="Retirer cette œuvre du bloc"
              title="Retirer cette œuvre du bloc"
            >
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                <path d="M4.5 6.5h15" />
                <path d="M9.5 6.5V4.75h5v1.75" />
                <path d="M7.25 9l.55 9.25c.04.7.62 1.25 1.32 1.25h5.76c.7 0 1.28-.55 1.32-1.25L16.75 9" />
                <path d="M10.5 11.25v5.5M13.5 11.25v5.5" />
              </svg>
            </button>
          )}
        </div>
      )}
      <div className="pt-1.5 flex items-start justify-between gap-4">
        <div className="space-y-0 flex-1 min-w-0">
          {hasNameTitle && (
            <div className="space-y-0">
              {(img.artist || editing) && (
                editing
                  ? <p className="text-[12px] leading-[1.35] font-normal text-gray-900 dark:text-gray-100"><Editable value={img.artist} onChange={set('artist')} placeholder="Artist" /></p>
                  : <p className="text-[12px] leading-[1.35] font-normal text-gray-900 dark:text-gray-100">{img.artist}</p>
              )}
              {(img.title || editing) && (
                editing ? (
                  <p className="text-[12px] leading-[1.35] font-normal text-gray-900 dark:text-gray-100">
                    <em><Editable value={img.title} onChange={set('title')} placeholder="Title" /></em>
                    {(img.year || editing) && <>, <Editable value={img.year} onChange={set('year')} placeholder="Year" /></>}
                  </p>
                ) : (
                  <p className="text-[12px] leading-[1.35] font-normal text-gray-900 dark:text-gray-100">
                    <em>{img.title}</em>{img.year ? `, ${img.year}` : ''}
                  </p>
                )
              )}
            </div>
          )}
          {showMetaBlock && (
            <div className={`space-y-0 ${hasNameTitle ? 'mt-[8px]' : 'mt-[1px]'}`}>
              {(img.medium || editing) && (
                editing
                  ? <p className="text-[12px] leading-[1.35] font-normal text-gray-400 dark:text-gray-500"><Editable value={img.medium} onChange={set('medium')} placeholder="Medium" /></p>
                  : <p className="text-[12px] leading-[1.35] font-normal text-gray-400 dark:text-gray-500">{img.medium}</p>
              )}
              {(img.dimensions || editing) && (
                editing
                  ? <p className="text-[12px] leading-[1.35] font-normal text-gray-400 dark:text-gray-500"><Editable value={img.dimensions} onChange={set('dimensions')} placeholder="Dimensions" /></p>
                  : <p className="text-[12px] leading-[1.35] font-normal text-gray-400 dark:text-gray-500">{img.dimensions}</p>
              )}
              {editing ? (
                <p className="text-[12px] font-normal text-gray-900 dark:text-gray-100 mt-1">
                  <Editable value={img.price} onChange={set('price')} placeholder="Price" />
                </p>
              ) : (
                img.showPrice && !!img.price?.trim() ? (
                  <p className="text-[12px] font-normal text-gray-900 dark:text-gray-100 mt-1">{img.price}</p>
                ) : null
              )}
              {/* Triptych: inquire inline */}
              {!showInquireTopRight && shouldShowInquire && (
                <span className="group/inquire relative mt-1 inline-flex items-center">
                  <button type="button" className="text-[11px] font-normal text-gray-900 underline underline-offset-2 dark:text-gray-100">
                    Inquire
                  </button>
                  {onHideInquire && (
                    <button
                      type="button"
                      onClick={(e) => { e.stopPropagation(); onHideInquire() }}
                      className="absolute -right-4 top-1/2 flex h-3.5 w-3.5 -translate-y-1/2 items-center justify-center rounded-full border border-gray-200 bg-white text-[8px] leading-none text-gray-400 opacity-0 shadow-sm transition-all hover:border-red-200 hover:text-red-500 group-hover/inquire:opacity-100 dark:border-gray-700 dark:bg-[#0f0f0f] dark:hover:border-red-900/60 dark:hover:text-red-400"
                      aria-label="Masquer Inquire"
                      title="Masquer Inquire"
                    >
                      ×
                    </button>
                  )}
                </span>
              )}
              {!showInquireTopRight && !shouldShowInquire && onRestoreInquire && (
                <button
                  type="button"
                  onClick={(e) => { e.stopPropagation(); onRestoreInquire() }}
                  className="mt-1 text-[11px] font-normal text-gray-400 underline underline-offset-2 transition-colors hover:text-gray-900 dark:text-gray-500 dark:hover:text-gray-100"
                >
                  + Inquire
                </button>
              )}
            </div>
          )}
        </div>
        {/* Single/diptych: inquire top-right aligned with artist */}
        {showInquireTopRight && shouldShowInquire && (
          <span className="group/inquire relative shrink-0 inline-flex items-center">
            <button type="button" className="rounded-[2px] border border-rose-300 px-6 py-1.5 text-[11px] font-normal text-gray-900 transition-colors hover:border-gray-900 hover:bg-gray-900 hover:text-white dark:border-rose-700 dark:text-gray-100 dark:hover:border-white dark:hover:bg-white dark:hover:text-gray-900">
              Inquire
            </button>
            {onHideInquire && (
              <button
                type="button"
                onClick={(e) => { e.stopPropagation(); onHideInquire() }}
                className="absolute -right-4 top-1/2 flex h-3.5 w-3.5 -translate-y-1/2 items-center justify-center rounded-full border border-gray-200 bg-white text-[8px] leading-none text-gray-400 opacity-0 shadow-sm transition-all hover:border-red-200 hover:text-red-500 group-hover/inquire:opacity-100 dark:border-gray-700 dark:bg-[#0f0f0f] dark:hover:border-red-900/60 dark:hover:text-red-400"
                aria-label="Masquer Inquire"
                title="Masquer Inquire"
              >
                ×
              </button>
            )}
          </span>
        )}
        {showInquireTopRight && !shouldShowInquire && onRestoreInquire && (
          <button
            type="button"
            onClick={(e) => { e.stopPropagation(); onRestoreInquire() }}
            className="shrink-0 text-[11px] font-normal text-gray-400 underline underline-offset-2 transition-colors hover:text-gray-900 dark:text-gray-500 dark:hover:text-gray-100"
          >
            + Inquire
          </button>
        )}
      </div>
    </div>
  )
}

function PreviewBlock({ block, images, onUpdateBlock, onUpdateImage, onRemoveBlock, draggableImages, onDragStartImage, onDragEndImage }: { block: Block; images: ImageItem[]; onUpdateBlock?: (id: string, patch: Partial<Block>) => void; onUpdateImage?: (id: string, patch: Partial<ImageItem>) => void; onRemoveBlock?: (blockId: string) => void; draggableImages?: boolean; onDragStartImage?: (id: string) => void; onDragEndImage?: () => void }) {
  const [orientations, setOrientations] = useState<Record<string, 'portrait' | 'landscape'>>({})

  useEffect(() => {
    ;(block.slots ?? []).forEach(slot => {
      if (!slot.imageId) return
      const id = slot.imageId
      const img = images.find(i => i.id === id)
      if (!img?.dataUrl) return
      const el = new window.Image()
      el.onload = () => setOrientations(p => p[id] ? p : { ...p, [id]: el.naturalHeight > el.naturalWidth ? 'portrait' : 'landscape' })
      el.src = img.dataUrl
    })
  }, [block.slots, images])

  const editing = !!onUpdateBlock
  const setQT = (v: string) => onUpdateBlock?.(block.id, { quoteText: v })
  const setQA = (v: string) => onUpdateBlock?.(block.id, { quoteAuthor: v })
  const hideInquire = () => onUpdateBlock?.(block.id, { showInquire: false, inquireHidden: true })
  const restoreInquire = () => onUpdateBlock?.(block.id, { showInquire: true, inquireHidden: false })
  const restoreInquireAction = editing ? restoreInquire : undefined
  const imageCount = block.slots.filter(s => s.imageId !== null).length
  const canClearSingleImage = imageCount > 1
  const clearImageFromBlock = (imageId: string | null) => {
    if (!imageId) return
    const kept = block.slots.filter(s => s.imageId !== imageId)
    const occupied = kept.filter((s): s is BlockSlot & { imageId: string } => s.imageId !== null)
    const artOnlyBlock = block.type === 'full' || block.type === 'pair' || block.type === 'trio'

    if (occupied.length === 0 && artOnlyBlock) {
      onRemoveBlock?.(block.id)
      return
    }
    if (occupied.length === 0 && onUpdateBlock) {
      onUpdateBlock(block.id, {
        slots: block.slots.map(slot => (slot.imageId === imageId ? { ...slot, imageId: null } : slot)),
      })
      return
    }
    if (!onUpdateBlock) return
    onUpdateBlock(block.id, {
      slots: occupied.map(s => ({ imageId: s.imageId })),
      type: artBlockType(occupied.length),
    })
  }

  if (block.type === 'quote') {
    const asText = block.textStyle === 'text'
    const seedGray = isVrCanvasQuotePlaceholder(block)
    const bodyCls = asText
      ? `font-sans text-base leading-relaxed mb-3 ${seedGray ? 'text-gray-400 dark:text-gray-500' : 'text-gray-800 dark:text-gray-200'}`
      : `font-sans text-xl italic leading-relaxed mb-3 ${seedGray ? 'text-gray-400 dark:text-gray-500' : 'text-gray-700 dark:text-gray-300'}`
    const authorCls = `text-[10px] tracking-widest uppercase ${seedGray ? 'text-gray-400 dark:text-gray-500' : 'text-gray-400'}`
    return (
      <div className={asText ? 'py-10 px-6 max-w-2xl mx-auto' : 'py-12 px-6 text-center max-w-lg mx-auto'}>
        <p className={bodyCls}>
          {editing
            ? (
              <Editable
                value={block.quoteText}
                onChange={setQT}
                placeholder={asText ? 'Text…' : 'Quote…'}
                multiline
                className={seedGray ? 'text-gray-400 dark:text-gray-500' : undefined}
              />
            )
            : (block.quoteText || <span className="text-gray-300">{asText ? 'Text…' : 'Quote…'}</span>)}
        </p>
        {!asText && (block.quoteAuthor || editing) && (
          <p className={authorCls}>
            {editing ? (
              <Editable
                value={block.quoteAuthor}
                onChange={setQA}
                placeholder="Author"
                className={seedGray ? 'text-gray-400 dark:text-gray-500' : undefined}
              />
            ) : block.quoteAuthor}
          </p>
        )}
      </div>
    )
  }

  if (block.type === 'full') {
    return (
      <div className="w-full">
        <PreviewSlot imageId={block.slots[0]?.imageId ?? null} images={images} landscape showInquire={!block.inquireHidden} onHideInquire={hideInquire} onRestoreInquire={restoreInquireAction} onClearImage={canClearSingleImage ? () => clearImageFromBlock(block.slots[0]?.imageId ?? null) : undefined} onUpdateImage={onUpdateImage} draggable={draggableImages} onDragStartImage={onDragStartImage} onDragEndImage={onDragEndImage} />
      </div>
    )
  }

  if (block.type === 'imgbio') {
    const img = images.find(i => i.id === block.slots[0]?.imageId)
    const setImg = (k: keyof ImageItem) => (v: string) => img && onUpdateImage?.(img.id, { [k]: v } as Partial<ImageItem>)
    return (
      <div className="mx-auto grid max-w-3xl grid-cols-1 items-start gap-6 sm:grid-cols-2 sm:gap-12">
        {/* Portrait image */}
        <div className="aspect-[3/4] overflow-hidden">
          {img?.dataUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={img.dataUrl} alt={img.title || ''} className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full bg-gray-100 dark:bg-gray-800" />
          )}
        </div>
        {/* Bio text */}
        <div className="pt-4 space-y-4">
          {(img?.artist || (editing && img)) && (
            <p className="text-[10px] uppercase tracking-[0.2em] text-gray-400">
              {editing && img ? <Editable value={img.artist} onChange={setImg('artist')} placeholder="Artist" /> : img?.artist}
            </p>
          )}
          {(img?.title || (editing && img)) && (
            editing && img ? (
              <p className="font-sans text-sm text-gray-700 dark:text-gray-300 italic">
                <Editable value={img.title} onChange={setImg('title')} placeholder="Title" />
                {(img.year || editing) && <>, b. <Editable value={img.year} onChange={setImg('year')} placeholder="Year" /></>}
              </p>
            ) : (
              <p className="font-sans text-sm text-gray-700 dark:text-gray-300 italic">{img?.title}{img?.year ? `, b. ${img.year}` : ''}</p>
            )
          )}
          {editing
            ? <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed"><Editable value={block.quoteText} onChange={setQT} placeholder="Biography…" multiline /></p>
            : (block.quoteText
                ? <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{block.quoteText}</p>
                : <p className="text-sm text-gray-300 dark:text-gray-600 italic">Biography…</p>)}
        </div>
      </div>
    )
  }

  if (block.type === 'quotefull') {
    return (
      <div className="space-y-8">
        <div className="text-center max-w-lg mx-auto px-4">
          <p className="font-sans text-xl text-gray-700 dark:text-gray-300 italic leading-relaxed mb-3">
            {editing
              ? <Editable value={block.quoteText} onChange={setQT} placeholder="Quote…" multiline />
              : (block.quoteText || <span className="text-gray-300">Quote…</span>)}
          </p>
          {(block.quoteAuthor || editing) && (
            <p className="text-[10px] text-gray-400 tracking-widest uppercase">
              {editing ? <Editable value={block.quoteAuthor} onChange={setQA} placeholder="Author" /> : block.quoteAuthor}
            </p>
          )}
        </div>
        <div className="w-full">
          <PreviewSlot imageId={block.slots[0]?.imageId ?? null} images={images} landscape showInquire={!block.inquireHidden} onHideInquire={hideInquire} onRestoreInquire={restoreInquireAction} onClearImage={() => clearImageFromBlock(block.slots[0]?.imageId ?? null)} onUpdateImage={onUpdateImage} />
        </div>
      </div>
    )
  }

  if (block.type === 'pair') {
    const allSlots = block.slots.length >= 2 ? block.slots.slice(0, 2) : [...block.slots, { imageId: null as null }]
    const filled = allSlots.filter(s => s.imageId !== null)
    const hasEmpty = allSlots.some(s => s.imageId === null)
    const makeDropPair = onUpdateBlock ? (i: number) => (imgId: string) => {
      const newSlots = allSlots.map((s, idx) => idx === i ? { imageId: imgId } : s)
      const newFilled = newSlots.filter(s => s.imageId !== null).length
      onUpdateBlock(block.id, { slots: newSlots, type: artBlockType(newFilled) })
    } : undefined
    if (filled.length === 1 && !hasEmpty) {
      return <div className="w-full"><PreviewSlot imageId={filled[0].imageId} images={images} landscape showInquire={!block.inquireHidden} inquireCompact onHideInquire={hideInquire} onRestoreInquire={restoreInquireAction} onClearImage={canClearSingleImage ? () => clearImageFromBlock(filled[0].imageId) : undefined} onUpdateImage={onUpdateImage} draggable={draggableImages} onDragStartImage={onDragStartImage} onDragEndImage={onDragEndImage} /></div>
    }
    return <div className="grid grid-cols-2 gap-3 sm:gap-6">{allSlots.map((s, i) => <PreviewSlot key={s.imageId ?? `empty-${i}`} imageId={s.imageId} images={images} cover showInquire={!block.inquireHidden} inquireCompact onHideInquire={hideInquire} onRestoreInquire={restoreInquireAction} onClearImage={s.imageId ? () => clearImageFromBlock(s.imageId) : undefined} onUpdateImage={onUpdateImage} draggable={draggableImages && !!s.imageId} onDragStartImage={onDragStartImage} onDragEndImage={onDragEndImage} onDropImage={!s.imageId && makeDropPair ? makeDropPair(i) : undefined} />)}</div>
  }

  if (block.type === 'trio') {
    const allSlots = block.slots.length >= 3 ? block.slots.slice(0, 3) : [...block.slots, ...Array(3 - block.slots.length).fill(null).map(() => ({ imageId: null as null }))]
    const filled = allSlots.filter(s => s.imageId !== null)
    const knownOrientations = filled.map(s => s.imageId ? orientations[s.imageId] : undefined).filter(Boolean)
    const portraitCount = knownOrientations.filter(o => o === 'portrait').length
    const isPortrait = portraitCount > knownOrientations.length / 2
    const hasEmpty = allSlots.some(s => s.imageId === null)
    const makeDropTrio = onUpdateBlock ? (i: number) => (imgId: string) => {
      const newSlots = allSlots.map((s, idx) => idx === i ? { imageId: imgId } : s)
      const newFilled = newSlots.filter(s => s.imageId !== null).length
      onUpdateBlock(block.id, { slots: newSlots, type: artBlockType(newFilled) })
    } : undefined
    if (hasEmpty) {
      return <div className="grid grid-cols-3 gap-2 sm:gap-4">{allSlots.map((s, i) => <PreviewSlot key={s.imageId ?? `empty-${i}`} imageId={s.imageId} images={images} cover landscape={!isPortrait} showInquire={!block.inquireHidden} inquireCompact inquireTiny onHideInquire={hideInquire} onRestoreInquire={restoreInquireAction} onClearImage={s.imageId ? () => clearImageFromBlock(s.imageId) : undefined} onUpdateImage={onUpdateImage} draggable={draggableImages && !!s.imageId} onDragStartImage={onDragStartImage} onDragEndImage={onDragEndImage} onDropImage={!s.imageId && makeDropTrio ? makeDropTrio(i) : undefined} />)}</div>
    }
    const cols = filled.length >= 3 ? 'grid-cols-3' : filled.length === 2 ? 'grid-cols-2' : ''
    return cols
      ? <div className={`grid ${cols} gap-2 sm:gap-4`}>{filled.map((s) => <PreviewSlot key={s.imageId ?? ''} imageId={s.imageId} images={images} cover landscape={!isPortrait} showInquire={!block.inquireHidden} inquireCompact inquireTiny={filled.length >= 3} onHideInquire={hideInquire} onRestoreInquire={restoreInquireAction} onClearImage={() => clearImageFromBlock(s.imageId)} onUpdateImage={onUpdateImage} draggable={draggableImages} onDragStartImage={onDragStartImage} onDragEndImage={onDragEndImage} />)}</div>
      : <div className="w-full"><PreviewSlot imageId={filled[0]?.imageId ?? null} images={images} landscape={!isPortrait} cover showInquire={!block.inquireHidden} inquireCompact onHideInquire={hideInquire} onRestoreInquire={restoreInquireAction} onClearImage={canClearSingleImage ? () => clearImageFromBlock(filled[0]?.imageId ?? null) : undefined} onUpdateImage={onUpdateImage} draggable={draggableImages} onDragStartImage={onDragStartImage} onDragEndImage={onDragEndImage} /></div>
  }

  if (block.type === 'side') {
    const asText = block.textStyle === 'text'
    const textCls = asText
      ? 'font-sans text-base text-gray-800 dark:text-gray-200 leading-relaxed'
      : 'font-sans text-base text-gray-700 dark:text-gray-300 italic leading-relaxed'
    const handleDropSideImage = onUpdateBlock
      ? (imgId: string) => onUpdateBlock(block.id, { slots: [{ imageId: imgId }] })
      : undefined
    return (
      <div className="grid grid-cols-1 items-center gap-5 sm:grid-cols-2 sm:gap-8">
        <div>
          <PreviewSlot imageId={block.slots[0]?.imageId ?? null} images={images} cover showInquire={!block.inquireHidden} onHideInquire={hideInquire} onRestoreInquire={restoreInquireAction} onClearImage={() => clearImageFromBlock(block.slots[0]?.imageId ?? null)} onUpdateImage={onUpdateImage} onDropImage={handleDropSideImage} draggable={draggableImages} onDragStartImage={onDragStartImage} onDragEndImage={onDragEndImage} />
        </div>
        <div>
          {editing
            ? <p className={textCls}><Editable value={block.quoteText} onChange={setQT} placeholder={asText ? 'Accompanying text…' : 'Quote…'} multiline /></p>
            : (block.quoteText
                ? <p className={textCls}>{block.quoteText}</p>
                : <p className={`text-xs text-gray-300 ${asText ? '' : 'italic'}`}>{asText ? 'Accompanying text…' : 'Quote…'}</p>)}
          {!asText && (block.quoteAuthor || editing) && (
            <p className="mt-3 text-[10px] tracking-widest uppercase text-gray-400">
              {editing ? <Editable value={block.quoteAuthor} onChange={setQA} placeholder="Author" /> : block.quoteAuthor}
            </p>
          )}
        </div>
      </div>
    )
  }

  return null
}

function BlockHost({ block, images, draggingImageId, draggingBlockId, draggingTextKind, draggingMoveBlockId, draggingMoveBlockFilledCount, onMergeImage, onMergeImageIntoQuote, onMergeQuoteIntoFull, onMergeMoveBlock, onUpdateBlock, onUpdateImage, onDragStartImage, onDragEndImage, onDragStartBlock, onDragEndBlock, onDragStartMoveBlock, onDragEndMoveBlock, onRemoveBlock }: {
  block: Block; images: ImageItem[]
  draggingImageId: string | null
  draggingBlockId: string | null
  draggingTextKind: 'quote' | 'text' | null
  draggingMoveBlockId: string | null
  draggingMoveBlockFilledCount?: number
  onMergeImage?: (srcImageId: string, dstBlockId: string) => void
  onMergeImageIntoQuote?: (srcImageId: string, quoteBlockId: string) => void
  onMergeQuoteIntoFull?: (quoteBlockId: string, fullBlockId: string) => void
  onMergeMoveBlock?: (srcBlockId: string, dstBlockId: string) => void
  onUpdateBlock?: (id: string, patch: Partial<Block>) => void
  onUpdateImage?: (id: string, patch: Partial<ImageItem>) => void
  onDragStartImage: (id: string) => void
  onDragEndImage: () => void
  onDragStartBlock: (id: string, kind: 'quote' | 'text') => void
  onDragEndBlock: () => void
  onDragStartMoveBlock?: (id: string) => void
  onDragEndMoveBlock?: () => void
  onRemoveBlock?: (blockId: string) => void
}) {
  const [over, setOver] = useState(false)
  useEffect(() => {
    const end = () => setOver(false)
    window.addEventListener('dragend', end)
    return () => window.removeEventListener('dragend', end)
  }, [])
  const isImageBlock = block.type === 'full' || block.type === 'pair' || block.type === 'trio'
  const isQuoteBlock = block.type === 'quote'
  const filledCount = (block.slots ?? []).filter(s => s.imageId).length
  const isImageSource = !!draggingImageId && (block.slots ?? []).some(s => s.imageId === draggingImageId)
  const isBlockSource = draggingBlockId === block.id
  const isMoveBlockSource = draggingMoveBlockId === block.id

  // What kind of drop does this block accept right now?
  const acceptsImage = isImageBlock && !isImageSource && filledCount < 3 && !!onMergeImage
  const acceptsImageAsSide = isQuoteBlock && !!onMergeImageIntoQuote
  const acceptsQuote = isImageBlock && block.type === 'full' && !isBlockSource && !!onMergeQuoteIntoFull
  const acceptsMoveBlock = !!onMergeMoveBlock && !!draggingMoveBlockId && !isMoveBlockSource &&
    isImageBlock && (filledCount + (draggingMoveBlockFilledCount ?? 0)) <= 3

  const label = (() => {
    if (!over) return null
    if (draggingImageId && isQuoteBlock) return block.textStyle === 'text' ? 'Pair image + text' : 'Pair image + quote'
    if (draggingImageId && isImageBlock) return filledCount === 1 ? 'Make diptych' : 'Make triptych'
    if (draggingBlockId && isImageBlock) return draggingTextKind === 'text' ? 'Pair image + text' : 'Pair image + quote'
    if (draggingMoveBlockId && acceptsMoveBlock) return filledCount === 1 ? 'Make diptych' : 'Make triptych'
    return null
  })()

  const handleDragOver = (e: React.DragEvent) => {
    const types = e.dataTransfer.types
    const hasImage = types.includes('text/x-vr-image')
    const hasBlock = types.includes('text/x-vr-block')
    const hasMoveBlock = types.includes('text/x-vr-block-move')
    const valid = (hasImage && (acceptsImage || acceptsImageAsSide)) || (hasBlock && acceptsQuote) || (hasMoveBlock && acceptsMoveBlock)
    if (!valid) return
    e.preventDefault()
    e.dataTransfer.dropEffect = 'move'
    if (!over) setOver(true)
  }
  const handleDrop = (e: React.DragEvent) => {
    const imgId = e.dataTransfer.getData('text/x-vr-image')
    const blkId = e.dataTransfer.getData('text/x-vr-block')
    const moveId = e.dataTransfer.getData('text/x-vr-block-move')
    setOver(false)
    if (imgId) {
      e.preventDefault()
      if (acceptsImageAsSide) onMergeImageIntoQuote?.(imgId, block.id)
      else if (acceptsImage) onMergeImage?.(imgId, block.id)
      // Réinitialiser tout de suite : après merge la destination contient la même imageId que draggingImageId,
      // donc isImageSource resterait vrai jusqu'à dragend (souvent absent) → preview bloquée en opacity-50.
      onDragEndImage()
    } else if (blkId) {
      e.preventDefault()
      if (acceptsQuote) onMergeQuoteIntoFull?.(blkId, block.id)
      onDragEndBlock()
    } else if (moveId && acceptsMoveBlock) {
      e.preventDefault()
      onMergeMoveBlock?.(moveId, block.id)
      onDragEndMoveBlock?.()
    }
  }

  const draggableBlock = isQuoteBlock && !!onMergeQuoteIntoFull
  const draggableMoveBlock = !!onDragStartMoveBlock

  return (
    <div
      onDragOver={handleDragOver}
      onDragLeave={() => setOver(false)}
      onDrop={handleDrop}
      className={`group/host relative rounded-md transition-[opacity,box-shadow,transform] ${onRemoveBlock ? 'hover:ring-1 hover:ring-gray-200/80 hover:ring-offset-8 hover:ring-offset-white dark:hover:ring-gray-800 dark:hover:ring-offset-[#0f0f0f]' : ''} ${over ? 'ring-2 ring-emerald-400/80 ring-offset-8 ring-offset-white dark:ring-offset-[#0f0f0f]' : ''} ${isMoveBlockSource ? 'opacity-35' : ''}`}
    >
      {label && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded-full bg-emerald-500 text-white text-[10px] font-medium tracking-wide shadow z-10 pointer-events-none">
          {label}
        </div>
      )}
      {draggableMoveBlock && (
        <button
          type="button"
          draggable
          onDragStart={(e) => {
            e.dataTransfer.effectAllowed = 'move'
            e.dataTransfer.setData('text/x-vr-block-move', block.id)
            onDragStartMoveBlock?.(block.id)
          }}
          onDragEnd={() => onDragEndMoveBlock?.()}
          aria-label="Déplacer ce bloc"
          title="Déplacer ce bloc"
          className="absolute left-[-8px] top-1/2 z-20 flex h-8 w-8 -translate-x-1/2 -translate-y-1/2 cursor-grab items-center justify-center rounded-full border border-gray-200/80 bg-white/95 text-gray-400 opacity-0 shadow-sm backdrop-blur transition-[opacity,color,background-color,border-color,transform] hover:border-gray-300 hover:bg-white hover:text-gray-800 active:cursor-grabbing active:scale-95 group-hover/host:opacity-100 dark:border-gray-700/80 dark:bg-[#0f0f0f]/95 dark:hover:border-gray-600 dark:hover:bg-[#181818] dark:hover:text-gray-100"
        >
          <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
            <circle cx="9" cy="6" r="1.5"/><circle cx="15" cy="6" r="1.5"/><circle cx="9" cy="12" r="1.5"/><circle cx="15" cy="12" r="1.5"/><circle cx="9" cy="18" r="1.5"/><circle cx="15" cy="18" r="1.5"/>
          </svg>
        </button>
      )}
      {draggableBlock && (
        <button
          type="button"
          draggable
          onDragStart={(e) => {
            const kind = block.textStyle === 'text' ? 'text' : 'quote'
            e.dataTransfer.effectAllowed = 'move'
            e.dataTransfer.setData('text/x-vr-block', block.id)
            e.dataTransfer.setData('text/x-vr-text-kind', kind)
            onDragStartBlock(block.id, kind)
          }}
          onDragEnd={() => onDragEndBlock()}
          aria-label="Drag to pair with image"
          title="Drag to pair with image"
          className="absolute left-0 top-1/2 z-10 flex h-7 w-7 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-gray-200/80 bg-white/90 text-gray-400 opacity-0 shadow-sm backdrop-blur transition-[opacity,color,background-color,border-color] hover:border-gray-300 hover:bg-white hover:text-gray-700 active:cursor-grabbing group-hover/host:opacity-100 dark:border-gray-700/80 dark:bg-[#0f0f0f]/90 dark:hover:border-gray-600 dark:hover:bg-[#181818] dark:hover:text-gray-200"
        >
          <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><circle cx="9" cy="6" r="1.5"/><circle cx="15" cy="6" r="1.5"/><circle cx="9" cy="12" r="1.5"/><circle cx="15" cy="12" r="1.5"/><circle cx="9" cy="18" r="1.5"/><circle cx="15" cy="18" r="1.5"/></svg>
        </button>
      )}
      {onRemoveBlock && (
        <button
          type="button"
          onClick={(e) => { e.stopPropagation(); onRemoveBlock(block.id) }}
          aria-label="Supprimer tout le bloc"
          title="Supprimer tout le bloc"
          className="absolute right-[-2px] top-[-2px] z-20 flex h-6 w-6 translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-gray-200/80 bg-white/95 text-gray-400 opacity-0 shadow-sm backdrop-blur transition-[opacity,color,background-color,border-color] hover:border-red-200 hover:bg-white hover:text-red-500 group-hover/host:opacity-100 dark:border-gray-700/80 dark:bg-[#0f0f0f]/95 dark:hover:border-red-900/60 dark:hover:bg-[#181818] dark:hover:text-red-400"
        >
          <svg width="11" height="11" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden>
            <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
      )}
      <div className="group">
        <PreviewBlock
          block={block}
          images={images}
          onUpdateBlock={onUpdateBlock}
          onUpdateImage={onUpdateImage}
          onRemoveBlock={onRemoveBlock}
          draggableImages={!!onMergeImage && isImageBlock}
          onDragStartImage={onDragStartImage}
          onDragEndImage={onDragEndImage}
        />
      </div>
    </div>
  )
}

/** Discrete inline actions in the preview sheet. */
function PreviewInlineTextAddStrip({
  onPick, onDropImage, draggingImageId, onDropBlock, draggingMoveBlockId,
}: {
  onPick: (kind: 'quote' | 'text') => void
  onDropImage?: (imageId: string) => void
  draggingImageId?: string | null
  onDropBlock?: (blockId: string) => void
  draggingMoveBlockId?: string | null
}) {
  const [over, setOver] = useState(false)
  useEffect(() => {
    const end = () => setOver(false)
    window.addEventListener('dragend', end)
    return () => window.removeEventListener('dragend', end)
  }, [])
  return (
    <div
      onDragOver={e => {
        const movingBlock = !!draggingMoveBlockId && !!onDropBlock && e.dataTransfer.types.includes('text/x-vr-block-move')
        const movingImage = !!draggingImageId && !!onDropImage
        if (!movingBlock && !movingImage) return
        e.preventDefault()
        e.dataTransfer.dropEffect = 'move'
        setOver(true)
      }}
      onDragLeave={() => setOver(false)}
      onDrop={e => {
        const blockId = e.dataTransfer.getData('text/x-vr-block-move')
        if (blockId && onDropBlock) {
          e.preventDefault()
          setOver(false)
          onDropBlock(blockId)
          return
        }
        const imageId = e.dataTransfer.getData('text/x-vr-image')
        if (!imageId || !onDropImage) return
        e.preventDefault()
        setOver(false)
        onDropImage(imageId)
      }}
      className="group/inline-add relative z-20 h-0"
    >
      <div
        className={`absolute inset-x-0 top-0 flex h-8 -translate-y-1/2 items-center justify-center rounded-lg transition-colors ${
          over && draggingMoveBlockId ? 'bg-blue-50 dark:bg-blue-950/20'
          : over ? 'bg-emerald-50 dark:bg-emerald-950/20'
          : draggingMoveBlockId ? 'bg-blue-50/60 dark:bg-blue-950/10'
          : draggingImageId ? 'bg-gray-50/70 dark:bg-gray-900/40'
          : ''
        }`}
      >
        {draggingMoveBlockId ? (
          <span className={`rounded-full px-2 py-0.5 text-[11px] transition-colors ${over ? 'text-blue-600 dark:text-blue-400' : 'text-blue-400 dark:text-blue-500'}`}>
            Move block here
          </span>
        ) : draggingImageId ? (
          <span className={`rounded-full px-2 py-0.5 text-[11px] transition-colors ${over ? 'text-emerald-600 dark:text-emerald-400' : 'text-gray-400 dark:text-gray-500'}`}>
            Drop image here
          </span>
        ) : (
          <div className="relative inline-flex items-center justify-center gap-2">
            <button
              type="button"
              onClick={() => onPick('text')}
              className="rounded-md px-2 py-1 text-[11px] text-gray-400/70 opacity-0 transition-[opacity,color,background-color] hover:bg-gray-100 hover:text-gray-800 group-hover/inline-add:opacity-100 dark:text-gray-500 dark:hover:bg-gray-800/80 dark:hover:text-gray-100"
            >
              + Text
            </button>
            <span className="select-none text-[11px] text-gray-300 opacity-0 transition-opacity group-hover/inline-add:opacity-100 dark:text-gray-600" aria-hidden>
              ·
            </span>
            <button
              type="button"
              onClick={() => onPick('quote')}
              className="rounded-md px-2 py-1 text-[11px] text-gray-400/70 opacity-0 transition-[opacity,color,background-color] hover:bg-gray-100 hover:text-gray-800 group-hover/inline-add:opacity-100 dark:text-gray-500 dark:hover:bg-gray-800/80 dark:hover:text-gray-100"
            >
              + Quote
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export function ViewingRoomPreview({ setup, images, blocks, isPro, draggingBlockId, noOffset, blockEnter, onUpdateSetup, onUpdateBlock, onUpdateImage, onMergeImage, onMergeImageIntoQuote, onMergeQuoteIntoFull, onMergeMoveBlock, onInsertTextBlock, onInsertImageBlock, onMoveBlock, onRemoveBlock }: {
  setup: VrSetup; images: ImageItem[]; blocks: Block[]; isPro: boolean; draggingBlockId?: string | null; noOffset?: boolean; blockEnter?: boolean
  onUpdateSetup?: (s: VrSetup) => void
  onUpdateBlock?: (id: string, patch: Partial<Block>) => void
  onUpdateImage?: (id: string, patch: Partial<ImageItem>) => void
  onMergeImage?: (srcImageId: string, dstBlockId: string) => void
  onMergeImageIntoQuote?: (srcImageId: string, quoteBlockId: string) => void
  onMergeQuoteIntoFull?: (quoteBlockId: string, fullBlockId: string) => void
  onMergeMoveBlock?: (srcBlockId: string, dstBlockId: string) => void
  onInsertTextBlock?: (index: number, kind: 'quote' | 'text') => void
  onInsertImageBlock?: (index: number, imageId: string) => void
  onMoveBlock?: (blockId: string, toIndex: number) => void
  onRemoveBlock?: (blockId: string) => void
}) {
  const editing = !!onUpdateSetup
  const setS = (k: keyof VrSetup) => (v: string) => onUpdateSetup?.({ ...setup, [k]: v })
  const [draggingImageId, setDraggingImageId] = useState<string | null>(null)
  const [draggingBlockIdLocal, setDraggingBlockIdLocal] = useState<string | null>(null)
  const [draggingTextKind, setDraggingTextKind] = useState<'quote' | 'text' | null>(null)
  const [draggingMoveBlockId, setDraggingMoveBlockId] = useState<string | null>(null)
  const previewRootRef = useRef<HTMLDivElement | null>(null)

  const clearPreviewDrag = useCallback(() => {
    setDraggingImageId(null)
    setDraggingBlockIdLocal(null)
    setDraggingTextKind(null)
    setDraggingMoveBlockId(null)
  }, [])

  useEffect(() => {
    window.addEventListener('dragend', clearPreviewDrag)
    return () => window.removeEventListener('dragend', clearPreviewDrag)
  }, [clearPreviewDrag])

  useDragAutoScroll(!!draggingImageId || !!draggingBlockIdLocal || !!draggingMoveBlockId, previewRootRef)

  const draggingMoveBlockFilledCount = draggingMoveBlockId
    ? (blocks.find(b => b.id === draggingMoveBlockId)?.slots.filter(s => s.imageId !== null).length ?? 0)
    : 0

  const hasContent = setup.galleryName || setup.title || setup.recipientName || setup.introText || blocks.length > 0 || editing
  const offsetCls = noOffset ? '' : 'pl-[422px]'

  if (!hasContent) {
    return (
      <div className={`flex items-center justify-center min-h-screen bg-gray-50 dark:bg-[#111111] ${offsetCls}`}>
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
    <div ref={previewRootRef} className={`min-h-full bg-gray-50 dark:bg-[#111111] ${offsetCls} ${noOffset ? 'px-3 sm:px-5 md:px-8' : 'pr-8'} py-4 md:py-8`}>
      <div className="max-w-3xl mx-auto bg-white dark:bg-[#0f0f0f] shadow-[0_2px_40px_rgba(0,0,0,0.06)] dark:shadow-[0_2px_40px_rgba(0,0,0,0.4)] rounded-sm overflow-hidden">
        {/* Cover */}
        <div className="px-5 py-8 pb-5 text-left sm:px-7 md:px-10 md:py-12 md:pb-6">
          {(setup.galleryName || editing) && (
            <p className="text-[9px] uppercase tracking-[0.3em] text-gray-400 mb-6">
              {editing ? <Editable value={setup.galleryName} onChange={setS('galleryName')} placeholder="Gallery name" /> : setup.galleryName}
            </p>
          )}
          <h1 className="font-sans text-[21px] leading-tight text-gray-900 dark:text-gray-100 mb-1 md:text-[24px]">
            {editing ? <Editable value={setup.headline} onChange={setS('headline')} placeholder="Viewing Room" /> : (setup.headline || 'Viewing Room')}
          </h1>
          {(setup.title || editing) && (
            <p className="mb-4 text-[21px] leading-tight text-gray-400 dark:text-gray-500 md:text-[24px]">
              {editing ? <Editable value={setup.title} onChange={setS('title')} placeholder="Subtitle" /> : setup.title}
            </p>
          )}
          {(setup.recipientName || editing) && (
            <p className="text-xs text-gray-500 mb-3">
              For {editing ? <Editable value={setup.recipientName} onChange={setS('recipientName')} placeholder="Recipient" /> : setup.recipientName}
            </p>
          )}
          {(setup.introText || editing) && (
            <p className="text-sm text-gray-900 dark:text-gray-100 leading-relaxed mt-4 whitespace-pre-wrap">
              {editing ? <Editable value={setup.introText} onChange={setS('introText')} placeholder="Personal greeting…" multiline /> : setup.introText}
            </p>
          )}
        </div>
        <div className="mx-5 border-t border-gray-100 dark:border-gray-800 sm:mx-7 md:mx-10" />

        {editing && onInsertTextBlock && blocks.length === 0 && (
          <div className="mx-5 sm:mx-7 md:mx-10">
            <PreviewInlineTextAddStrip
              onPick={kind => onInsertTextBlock(0, kind)}
              onDropImage={onInsertImageBlock ? imageId => { onInsertImageBlock(0, imageId); clearPreviewDrag() } : undefined}
              draggingImageId={draggingImageId}
              onDropBlock={onMoveBlock ? blockId => { onMoveBlock(blockId, 0); clearPreviewDrag() } : undefined}
              draggingMoveBlockId={draggingMoveBlockId}
            />
          </div>
        )}

        {/* Blocks */}
        {blocks.length > 0 && (
          <div className="px-5 pt-4 pb-5 sm:px-7 md:px-10 md:pt-5 md:pb-6">
            {blocks.map((block, i) => (
              <div
                key={block.id}
                className="space-y-2"
              >
                {editing && onInsertTextBlock && (
                  <PreviewInlineTextAddStrip
                    onPick={kind => onInsertTextBlock(i, kind)}
                    onDropImage={onInsertImageBlock ? imageId => { onInsertImageBlock(i, imageId); clearPreviewDrag() } : undefined}
                    draggingImageId={draggingImageId}
                    onDropBlock={onMoveBlock ? blockId => { onMoveBlock(blockId, i); clearPreviewDrag() } : undefined}
                    draggingMoveBlockId={draggingMoveBlockId}
                  />
                )}
                <div
                  style={blockEnter ? { animation: `vrBlockEnter 600ms cubic-bezier(0.16, 1, 0.3, 1) ${i * 120}ms both` } : undefined}
                  className={`py-5 transition-all duration-200 ${draggingBlockId === block.id ? '-translate-y-1 shadow-2xl rounded-xl ring-1 ring-gray-900/8' : ''}`}
                >
                  <BlockHost
                    block={block}
                    images={images}
                    draggingImageId={draggingImageId}
                    draggingBlockId={draggingBlockIdLocal}
                    draggingTextKind={draggingTextKind}
                    draggingMoveBlockId={draggingMoveBlockId}
                    draggingMoveBlockFilledCount={draggingMoveBlockFilledCount}
                    onMergeImage={onMergeImage}
                    onMergeImageIntoQuote={onMergeImageIntoQuote}
                    onMergeQuoteIntoFull={onMergeQuoteIntoFull}
                    onMergeMoveBlock={onMergeMoveBlock ? (srcId, dstId) => { onMergeMoveBlock(srcId, dstId); clearPreviewDrag() } : undefined}
                    onUpdateBlock={onUpdateBlock}
                    onUpdateImage={onUpdateImage}
                    onDragStartImage={setDraggingImageId}
                    onDragEndImage={clearPreviewDrag}
                    onDragStartBlock={(id, kind) => { setDraggingBlockIdLocal(id); setDraggingTextKind(kind) }}
                    onDragEndBlock={clearPreviewDrag}
                    onDragStartMoveBlock={onMoveBlock ? setDraggingMoveBlockId : undefined}
                    onDragEndMoveBlock={clearPreviewDrag}
                    onRemoveBlock={onRemoveBlock}
                  />
                </div>
              </div>
            ))}
            {editing && onInsertTextBlock && (
              <PreviewInlineTextAddStrip
                onPick={kind => onInsertTextBlock(blocks.length, kind)}
                onDropImage={onInsertImageBlock ? imageId => { onInsertImageBlock(blocks.length, imageId); clearPreviewDrag() } : undefined}
                draggingImageId={draggingImageId}
                onDropBlock={onMoveBlock ? blockId => { onMoveBlock(blockId, blocks.length); clearPreviewDrag() } : undefined}
                draggingMoveBlockId={draggingMoveBlockId}
              />
            )}
          </div>
        )}

        {/* Footer */}
        {(setup.galleryName || setup.galleryAddress || setup.galleryContact || editing) && (
          <div>
          <div className="mx-5 border-t border-gray-100 dark:border-gray-800 sm:mx-7 md:mx-10" />
          <div className="space-y-0.5 px-5 py-7 text-center sm:px-7 md:px-10 md:py-8">
            {(setup.galleryName || editing) && (
              <p className="text-[12px] text-gray-400 dark:text-gray-500">
                {editing ? <Editable value={setup.galleryName} onChange={setS('galleryName')} placeholder="Gallery name" /> : setup.galleryName}
              </p>
            )}
            {(setup.galleryAddress || editing) && (
              <p className="text-[12px] text-gray-400 dark:text-gray-500">
                {editing ? <Editable value={setup.galleryAddress} onChange={setS('galleryAddress')} placeholder="Address" /> : setup.galleryAddress}
              </p>
            )}
            {(setup.galleryContact || editing) && (
              <p className="text-[12px] text-gray-400 dark:text-gray-500">
                {editing ? <Editable value={setup.galleryContact} onChange={setS('galleryContact')} placeholder="Contact" /> : setup.galleryContact}
              </p>
            )}
          </div>
          </div>
        )}

        {/* Watermark */}
        {!isPro && (
          <div className="py-4 text-center">
            <p className="text-[12px] text-gray-300 dark:text-gray-700 tracking-wide">Designed with care by <span className="font-medium">Vitreen</span></p>
          </div>
        )}
      </div>
    </div>
  )
}

// ═══════════════════════════════════════════════════════════════════════════════
// EXPORT PANEL
// ═══════════════════════════════════════════════════════════════════════════════

function ExportPhonePreview({ setup, images, blocks }: { setup: VrSetup; images: ImageItem[]; blocks: Block[] }) {
  const imageById = new Map(images.map(img => [img.id, img]))
  const caption = (img?: ImageItem, showInquire = false, inquireTiny = false) => img ? (
    <div className="mt-1 flex items-start justify-between gap-1.5 text-left text-[5.5px] leading-[1.15]">
      <div className="min-w-0">
        {img.artist ? <p className="truncate font-normal text-gray-900">{img.artist}</p> : null}
        {(img.title || img.year) ? <p className="truncate text-gray-900"><em>{img.title}</em>{img.year ? `, ${img.year}` : ''}</p> : null}
        {img.medium ? <p className="truncate text-gray-400">{img.medium}</p> : null}
        {img.dimensions ? <p className="truncate text-gray-400">{img.dimensions}</p> : null}
        {img.showPrice && img.price ? <p className="truncate font-normal text-gray-900">{img.price}</p> : null}
        {showInquire && inquireTiny ? (
          <p className="mt-[2px] font-normal text-gray-900 underline underline-offset-1">Inquire</p>
        ) : null}
      </div>
      {showInquire && !inquireTiny ? (
        <span className="shrink-0 border-[0.5px] border-gray-900 px-1.5 py-[2px] text-[4.5px] uppercase tracking-[0.12em] text-gray-900">
          Inquire
        </span>
      ) : null}
    </div>
  ) : null
  const art = (imageId: string | null, className = '', fit: 'cover' | 'contain' = 'cover', showInquire = false, inquireTiny = false) => {
    const img = imageId ? imageById.get(imageId) : undefined
    return (
      <div className="min-w-0">
        <div className={`${className} overflow-hidden bg-white`}>
          {img?.dataUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={img.dataUrl}
              alt={img.title || ''}
              className={`h-full w-full object-center ${fit === 'cover' ? 'object-cover' : 'object-contain'}`}
            />
          ) : (
            <div className="h-full w-full bg-gray-100" />
          )}
        </div>
        {caption(img, showInquire, inquireTiny)}
      </div>
    )
  }

  const screen = (
    <div className="min-h-full bg-white">
      <div className="px-5 pb-6 pt-14">
        {setup.galleryName ? <p className="mb-3 text-[5px] uppercase tracking-[0.22em] text-gray-400">{setup.galleryName}</p> : null}
        <p className="text-[11px] leading-tight text-gray-900">{setup.headline || 'Viewing Room'}</p>
        {setup.title ? <p className="text-[11px] leading-tight text-gray-400">{setup.title}</p> : null}
        {setup.recipientName ? <p className="mt-2 text-[6px] text-gray-500">For {setup.recipientName}</p> : null}
        {setup.introText ? <p className="mt-2 line-clamp-3 text-[7px] leading-snug text-gray-700">{setup.introText}</p> : null}
      </div>
      <div className="mx-5 border-t border-gray-100" />
      <div className="space-y-5 py-4">
        {blocks.slice(0, 8).map(block => {
          if (block.type === 'quote') {
            return <p key={block.id} className="px-6 py-4 text-center text-[8px] italic leading-snug text-gray-500">{block.quoteText || 'Quote…'}</p>
          }
          if (block.type === 'pair' || block.type === 'trio') {
            const filled = block.slots.filter(s => s.imageId)
            const isTinyTriptych = filled.length >= 3
            return (
              <div key={block.id} className={`grid ${filled.length >= 3 ? 'grid-cols-3' : 'grid-cols-2'} gap-3 px-4`}>
                {filled.slice(0, 3).map(slot => <div key={slot.imageId} className="min-w-0">{art(slot.imageId, 'aspect-[4/3]', 'cover', !block.inquireHidden, isTinyTriptych)}</div>)}
              </div>
            )
          }
          if (block.type === 'side') {
            return (
              <div key={block.id} className="grid grid-cols-2 gap-3 items-center px-5">
                {art(block.slots[0]?.imageId ?? null, 'aspect-[3/4]', 'cover', !block.inquireHidden)}
                <p className="line-clamp-5 text-[7px] italic leading-snug text-gray-500">{block.quoteText || 'Text…'}</p>
              </div>
            )
          }
          return <div key={block.id} className="px-4">{art(block.slots[0]?.imageId ?? null, 'aspect-[4/3]', 'cover', !block.inquireHidden)}</div>
        })}
      </div>
      <div className="h-20" />
    </div>
  )

  return (
    <div className="relative flex h-full w-full items-end justify-center overflow-hidden rounded-[48px] bg-[#070808] px-6 pb-2 pt-2 shadow-2xl sm:px-8 sm:pb-3 sm:pt-2">
      <div className="pointer-events-none absolute inset-0 rounded-[48px] bg-[radial-gradient(circle_at_22%_12%,rgba(255,255,255,0.12),transparent_30%),radial-gradient(circle_at_80%_78%,rgba(255,255,255,0.08),transparent_34%)]" />
      <div className="pointer-events-none absolute inset-[1px] rounded-[47px] border border-white/10" />
      <div className="pointer-events-none absolute -right-16 top-10 h-56 w-56 rounded-full bg-white/10 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 left-8 h-52 w-52 rounded-full bg-black blur-3xl" />

      <div className="relative z-10 h-[540px] w-[268px] shrink-0 translate-y-20 rounded-[52px] bg-gradient-to-br from-zinc-300 via-zinc-950 to-black p-[5px] shadow-[0_38px_90px_rgba(15,23,42,0.34),inset_0_1px_0_rgba(255,255,255,0.45)]">
        <div className="absolute -left-1 top-24 h-14 w-1 rounded-l-full bg-zinc-800/80" />
        <div className="absolute -right-1 top-32 h-20 w-1 rounded-r-full bg-zinc-800/80" />
        <div className="absolute inset-[2px] rounded-[50px] border border-white/25 pointer-events-none" />
        <div className="relative h-full w-full overflow-hidden rounded-[46px] bg-white ring-1 ring-black/80">
          <div className="absolute left-1/2 top-3 z-30 h-6 w-24 -translate-x-1/2 rounded-full bg-black shadow-[inset_0_1px_1px_rgba(255,255,255,0.18),0_1px_8px_rgba(0,0,0,0.25)]" />
          <div className="h-full overflow-hidden bg-white">
            <div className="h-full overflow-y-auto bg-white px-2">
              {screen}
            </div>
          </div>
          <div className="pointer-events-none absolute inset-0 z-20 bg-[linear-gradient(112deg,rgba(255,255,255,0.42)_0%,rgba(255,255,255,0.16)_17%,transparent_35%,transparent_62%,rgba(255,255,255,0.24)_78%,transparent_100%)] mix-blend-screen" />
          <div className="pointer-events-none absolute -right-16 -top-12 z-20 h-[120%] w-28 rotate-[12deg] bg-white/30 blur-2xl" />
          <div className="pointer-events-none absolute inset-x-0 top-0 z-20 h-36 bg-gradient-to-b from-white/30 to-transparent" />
        </div>
      </div>
    </div>
  )
}

export function ExportPanel({ open, onClose, blocks, images, setup, onPaywall, onChangeSetup }: {
  open: boolean; onClose: () => void
  blocks: Block[]; images: ImageItem[]; setup: VrSetup
  onPaywall: () => void
  /** Si défini : édition email destinataire dans ce modal (persisté avec saveSetup). */
  onChangeSetup?: (s: VrSetup) => void
}) {
  const [generating, setGenerating] = useState(false)
  const [saving, setSaving] = useState(false)
  const [preparingPayload, setPreparingPayload] = useState(false)
  const [sharingChannel, setSharingChannel] = useState<'email' | 'whatsapp' | null>(null)
  const [shareUrl, setShareUrl] = useState<string | null>(null)
  const [copied, setCopied] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)
  const lastExportRef = useRef<{ fingerprint: string; url: string } | null>(null)

  const makeExportFingerprint = useCallback(() => {
    const usedImageIds = new Set(
      blocks.flatMap(b => b.slots.map(s => s.imageId).filter((id): id is string => Boolean(id)))
    )
    const imageSig = (value: string) => value ? `${value.length}:${value.slice(0, 64)}:${value.slice(-64)}` : ''
    const usedImages = images
      .filter(img => usedImageIds.has(img.id))
      .map(img => ({
        id: img.id,
        dataUrl: imageSig(img.dataUrl),
        title: img.title,
        artist: img.artist,
        year: img.year,
        medium: img.medium,
        dimensions: img.dimensions,
        price: img.price,
        showPrice: !!img.showPrice,
      }))
      .sort((a, b) => a.id.localeCompare(b.id))

    const blockSnapshot = blocks.map(block => ({
      id: block.id,
      type: block.type,
      quoteText: block.quoteText,
      quoteAuthor: block.quoteAuthor,
      showInquire: !block.inquireHidden,
      inquireHidden: !!block.inquireHidden,
      sideTextType: block.sideTextType ?? null,
      textStyle: block.textStyle ?? null,
      slots: block.slots.map(slot => slot.imageId ?? null),
    }))

    return JSON.stringify({
      setup,
      blocks: blockSnapshot,
      images: usedImages,
    })
  }, [blocks, images, setup])

  const optimizeImageDataUrl = async (dataUrl: string, maxDim = 2400, quality = 0.86, compressAbove = 1_800_000) => {
    if (!dataUrl.startsWith('data:image/')) return dataUrl
    // Avoid huge request bodies that can be truncated by platform limits.
    if (dataUrl.length < compressAbove) return dataUrl

    return new Promise<string>((resolve) => {
      const img = new window.Image()
      img.onload = () => {
        const largest = Math.max(img.naturalWidth, img.naturalHeight)
        if (!largest) {
          resolve(dataUrl)
          return
        }
        const scale = Math.min(1, maxDim / largest)
        const width = Math.max(1, Math.round(img.naturalWidth * scale))
        const height = Math.max(1, Math.round(img.naturalHeight * scale))

        const canvas = document.createElement('canvas')
        canvas.width = width
        canvas.height = height
        const ctx = canvas.getContext('2d')
        if (!ctx) {
          resolve(dataUrl)
          return
        }
        ctx.drawImage(img, 0, 0, width, height)
        try {
          const compressed = canvas.toDataURL('image/jpeg', quality)
          resolve(compressed || dataUrl)
        } catch {
          resolve(dataUrl)
        }
      }
      img.onerror = () => resolve(dataUrl)
      img.src = dataUrl
    })
  }

  const buildExportPayload = async ({ kind = 'pdf' }: { kind?: 'pdf' | 'share' } = {}) => {
    setPreparingPayload(true)
    try {
      const usedImageIds = new Set(
        blocks.flatMap(b => b.slots.map(s => s.imageId).filter((id): id is string => Boolean(id)))
      )
      const usedImages = images.filter(i => usedImageIds.has(i.id))
      const imageOpts = kind === 'share'
        ? { maxDim: 1500, quality: 0.8, compressAbove: 260_000 }
        : { maxDim: 2400, quality: 0.86, compressAbove: 1_800_000 }
      const optimizedImages = await Promise.all(
        usedImages.map(async (img) => ({
          ...img,
          dataUrl: await optimizeImageDataUrl(img.dataUrl, imageOpts.maxDim, imageOpts.quality, imageOpts.compressAbove),
        }))
      )
      return {
        blocks,
        images: optimizedImages,
        setup,
        inquireHref: buildInquireHref(setup, shareUrl),
      }
    } finally {
      setPreparingPayload(false)
    }
  }

  const ensureShareUrl = async ({ force = false }: { force?: boolean } = {}) => {
    const fingerprint = makeExportFingerprint()
    setError(null)
    setSuccess(null)
    if (
      !force &&
      shareUrl &&
      lastExportRef.current?.url === shareUrl &&
      lastExportRef.current.fingerprint === fingerprint
    ) {
      return shareUrl
    }
    setSaving(true)
    try {
      const payload = await buildExportPayload({ kind: 'share' })
      const res = await fetch('/api/ovr/viewing-rooms', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      if (res.status === 402) { onClose(); onPaywall(); return null }
      if (res.status === 401) {
        setError('Please sign in to generate a share link.')
        return null
      }
      if (!res.ok) {
        let message = 'Error saving the viewing room.'
        try {
          const payload = await res.json()
          if (payload?.error) message = String(payload.error)
        } catch { /* ignore */ }
        throw new Error(message)
      }
      const data = await res.json()
      const base =
        process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, '') || window.location.origin
      const nextUrl = `${base}/vr/${data.token}`
      setShareUrl(nextUrl)
      lastExportRef.current = { fingerprint, url: nextUrl }
      return nextUrl
    } catch (e) {
      const raw = e instanceof Error ? e.message : 'Error saving the viewing room.'
      const message = /Unterminated string in JSON|Unexpected end of JSON input/i.test(raw)
        ? 'Payload too large while generating the share link. Try with fewer or lighter images.'
        : /request body too large|body exceeded|payload too large|entity too large|413/i.test(raw)
          ? 'Payload too large while generating the share link. Try with fewer or lighter images.'
        : /dataset not found|project id "placeholder"|sanity non configur/i.test(raw)
          ? 'Le partage n’est pas configuré en production (Sanity). Ajoute les variables SANITY sur Vercel.'
          : raw
      setError(message)
      return null
    } finally {
      setSaving(false)
    }
  }

  const handlePDF = async () => {
    setGenerating(true)
    setError(null)
    setSuccess(null)
    try {
      const payload = await buildExportPayload({ kind: 'pdf' })
      const res = await fetch('/api/ovr/generate-pdf', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      if (res.status === 402) { onClose(); onPaywall(); return }
      if (res.status === 401) {
        setError('Please sign in to export the PDF.')
        return
      }
      if (!res.ok) {
        let message = 'Error generating the PDF.'
        try {
          const payload = await res.json()
          if (payload?.error) message = String(payload.error)
        } catch { /* ignore */ }
        throw new Error(message)
      }
      const blob = await res.blob()
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = 'viewing-room.pdf'
      a.click()
      URL.revokeObjectURL(url)
    } catch (e) {
      const raw = e instanceof Error ? e.message : 'Error generating the PDF.'
      const message = /Unterminated string in JSON|Unexpected end of JSON input/i.test(raw)
        ? 'Payload too large while generating the PDF. Try with fewer or lighter images.'
        : raw
      setError(message)
    } finally {
      setGenerating(false)
    }
  }

  const handleShare = async () => {
    await ensureShareUrl({ force: !!shareUrl })
  }

  const openShareChannel = async (channel: 'email' | 'whatsapp') => {
    setSharingChannel(channel)
    setError(null)
    setSuccess(null)
    try {
      const url = await ensureShareUrl()
      if (!url) return

      if (channel === 'whatsapp') {
        const whatsappHref = `https://wa.me/?text=${encodeURIComponent(`Here is your Viewing Room: ${url}`)}`
        window.open(whatsappHref, '_blank', 'noopener,noreferrer')
        return
      }

      const emailTo = setup.recipientEmail?.trim()
      if (!emailTo || !emailTo.includes('@')) {
        setError('Indique l’email du destinataire ci-dessous pour envoyer le lien.')
        return
      }

      const res = await fetch('/api/ovr/share-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          recipientEmail: emailTo,
          recipientName: setup.recipientName,
          galleryName: setup.galleryName,
          galleryAddress: setup.galleryAddress,
          galleryContact: setup.galleryContact,
          introText: setup.introText,
          shareUrl: url,
        }),
      })
      if (!res.ok) {
        let message = 'Error sending email.'
        try {
          const payload = await res.json()
          if (payload?.error) message = String(payload.error)
        } catch { /* ignore */ }
        throw new Error(message)
      }
      setSuccess('Email sent successfully.')
    } catch (e) {
      const message = e instanceof Error ? e.message : 'Error sending email.'
      setError(message)
    } finally {
      setSharingChannel(null)
    }
  }

  const copyShareUrl = async () => {
    if (!shareUrl) return
    try {
      await navigator.clipboard.writeText(shareUrl)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      setError('Impossible de copier le lien.')
    }
  }

  const hasContent = blocks.length > 0
  const isBusy = saving || generating || preparingPayload
  const allActionsDisabled = isBusy || sharingChannel !== null || !hasContent
  const usedImageCount = new Set(blocks.flatMap(b => b.slots.map(s => s.imageId).filter(Boolean))).size

  if (!open) return null
  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center p-2 sm:items-center sm:p-4">
      <div className="absolute inset-0 bg-black/20 dark:bg-black/50 backdrop-blur-sm" onClick={onClose} />

      <div className="relative flex w-full max-w-[940px] items-stretch justify-center gap-4 lg:gap-5">
      <div className="relative flex max-h-[calc(100dvh-1rem)] w-full max-w-md flex-col overflow-hidden rounded-t-[32px] border border-gray-200 bg-white shadow-2xl dark:border-gray-700 dark:bg-gray-900 sm:max-h-[calc(100dvh-2rem)] sm:rounded-[40px] lg:h-[560px]">
        <div className="flex items-center justify-between gap-4 border-b border-gray-100 px-5 py-4 dark:border-gray-800 sm:px-7 sm:py-5">
          <div>
            <h2 className="text-base font-semibold text-gray-900 dark:text-gray-100">Export your viewing room</h2>
            <p className="mt-0.5 text-xs text-gray-400 sm:hidden">PDF, email, WhatsApp</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-gray-200 text-gray-400 transition-colors hover:text-gray-700 dark:border-gray-700 dark:hover:text-gray-200"
            aria-label="Close export modal"
          >
            <svg width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        <div className="flex min-h-0 flex-1 overflow-y-auto overscroll-contain px-5 py-4 [scrollbar-width:none] [-ms-overflow-style:none] sm:px-7 sm:py-5 [&::-webkit-scrollbar]:hidden">
          <div className="flex w-full flex-col gap-5">
          <div className="space-y-4 sm:space-y-5">
          {error ? <p className="text-xs text-red-600 dark:text-red-300 bg-red-50 dark:bg-red-950/20 border border-red-100 dark:border-red-900/60 px-4 py-3 rounded-lg">{error}</p> : null}
          {success ? <p className="text-xs text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-100 dark:border-emerald-900/60 px-4 py-3 rounded-lg">{success}</p> : null}

          <div className="flex flex-col gap-3 rounded-[24px] border border-gray-100 p-4 dark:border-gray-800 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm font-medium text-gray-900 dark:text-gray-100">Download as PDF</p>
              <p className="text-xs text-gray-400 mt-0.5">High-resolution A4 document</p>
            </div>
            <button
              type="button"
              onClick={handlePDF}
              disabled={!hasContent || isBusy}
              className="h-11 w-full rounded-full border border-gray-200 bg-white px-5 text-sm text-gray-700 transition-colors hover:border-gray-400 disabled:opacity-40 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 sm:h-10 sm:w-auto sm:min-w-[92px]"
            >
              {generating ? 'Exporting…' : 'PDF'}
            </button>
          </div>

          <div className="space-y-3">
            <div className="flex flex-col gap-3 rounded-[24px] border border-gray-100 p-4 dark:border-gray-800 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-sm font-medium text-gray-900 dark:text-gray-100">Share by email or WhatsApp</p>
                <p className="text-xs text-gray-400 mt-0.5">
                  {shareUrl
                    ? 'Use the buttons below to email the link or open WhatsApp.'
                    : 'Generate a private viewing room link first.'}
                </p>
              </div>
              <button
                type="button"
                onClick={handleShare}
                disabled={!hasContent || isBusy}
                className="h-11 w-full rounded-full border border-gray-200 bg-white px-5 text-sm text-gray-700 transition-colors hover:border-gray-400 disabled:opacity-40 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 sm:h-10 sm:w-auto sm:min-w-[112px]"
              >
                {preparingPayload ? 'Preparing…' : saving ? 'Generating…' : shareUrl ? 'Regenerate' : 'Generate'}
              </button>
            </div>

            {shareUrl ? (
              <div className="space-y-3 rounded-[24px] bg-gray-50/80 p-3 dark:bg-gray-800/35 sm:p-4">
                <div className="space-y-2">
                  <input
                    type="email"
                    className={`${input} h-11 text-sm sm:h-10`}
                    placeholder="recipient@example.com"
                    autoComplete="email"
                    value={setup.recipientEmail}
                    readOnly={!onChangeSetup}
                    onChange={e => onChangeSetup?.({ ...setup, recipientEmail: e.target.value })}
                  />
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => openShareChannel('email')}
                      disabled={allActionsDisabled}
                      className="h-11 rounded-full bg-gray-900 text-sm text-white transition-colors hover:bg-gray-700 disabled:opacity-40 dark:bg-white dark:text-gray-900 dark:hover:bg-gray-100"
                    >
                      {sharingChannel === 'email' ? 'Sending…' : 'Email'}
                    </button>
                    <button
                      type="button"
                      onClick={() => openShareChannel('whatsapp')}
                      disabled={allActionsDisabled}
                      className="h-11 rounded-full bg-[#25D366] text-sm text-white transition-colors hover:bg-[#1ebe5d] disabled:opacity-40"
                    >
                      {sharingChannel === 'whatsapp' ? 'Opening…' : 'WhatsApp'}
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between gap-3 px-1 text-sm">
                  <span className="truncate text-xs text-gray-400">Private link ready</span>
                  <button type="button" onClick={copyShareUrl} className="font-medium text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100">
                    {copied ? 'Copied' : 'Copy link'}
                  </button>
                  <a href={shareUrl} target="_blank" rel="noopener noreferrer" className="font-medium text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100">↗</a>
                </div>
              </div>
            ) : null}
          </div>
        </div>
          <div className="rounded-[22px] border border-gray-100 bg-gray-50/70 px-4 py-3 text-[11px] text-gray-500 dark:border-gray-800 dark:bg-gray-800/40 dark:text-gray-400">
            {[
              ['Layout preview ready', hasContent],
              ['Artwork captions included', usedImageCount > 0],
              ['Email renders the designed room', !!shareUrl],
            ].map(([label, ok]) => (
              <div key={String(label)} className="flex items-center gap-2 py-0.5">
                <span className={`flex h-3.5 w-3.5 items-center justify-center rounded-full border ${ok ? 'border-emerald-200 bg-emerald-50 text-emerald-600' : 'border-gray-200 bg-white text-gray-300 dark:border-gray-700 dark:bg-gray-900'}`}>
                  {ok ? (
                    <svg width="8" height="8" fill="none" stroke="currentColor" strokeWidth="2.4" viewBox="0 0 24 24">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  ) : null}
                </span>
                <span>{label}</span>
              </div>
            ))}
          </div>
          </div>
      </div>
      </div>

      <div className="hidden h-[560px] max-h-[calc(100dvh-2rem)] w-full max-w-md min-w-[280px] flex-1 items-center justify-center overflow-hidden lg:flex">
        <ExportPhonePreview setup={setup} images={images} blocks={blocks} />
      </div>
      </div>
    </div>
  )
}

// ═══════════════════════════════════════════════════════════════════════════════
// SUBSCRIPTION MODAL
// ═══════════════════════════════════════════════════════════════════════════════

export function SubscriptionModal({ reason, onClose }: {
  reason: 'template' | 'export_limit'
  onClose: () => void
}) {
  const [loading, setLoading] = useState(false)
  const { isSignedIn } = useOptionalUser()
  const stripeConfigured = process.env.NEXT_PUBLIC_STRIPE_CONFIGURED === 'true'

  const handleSubscribe = async () => {
    if (!stripeConfigured) { onClose(); return }
    if (!isSignedIn) {
      window.location.href = 'https://vitreen.art/sign-in'
      return
    }
    setLoading(true)
    try {
      const res = await fetch('/api/stripe/checkout', { method: 'POST' })
      const data = await res.json()
      if (data.url) window.location.href = data.url
      else setLoading(false)
    } catch {
      setLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 lg:left-[406px] z-50 flex items-center justify-center">
      {/* Blurred backdrop — preview area only */}
      <div className="absolute inset-0 backdrop-blur-md bg-white/50 dark:bg-black/50" onClick={onClose} />

      {/* Modal */}
      <div className="relative bg-white dark:bg-[#1c1c1c] rounded-[20px] border border-gray-200 dark:border-gray-700 shadow-2xl w-full max-w-sm mx-4 overflow-hidden">
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-7 h-7 flex items-center justify-center rounded-full border border-gray-200 dark:border-gray-700 text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition-colors"
        >
          <svg width="11" height="11" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>

        {/* Content */}
        <div className="px-7 pt-8 pb-7">
          {/* Icon */}
          <div className="w-10 h-10 rounded-xl bg-gray-900 dark:bg-white flex items-center justify-center mb-5">
            <svg width="18" height="18" fill="none" stroke="white" className="dark:stroke-gray-900" strokeWidth="1.5" viewBox="0 0 24 24">
              <path d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
            </svg>
          </div>

          <p className="text-[10px] uppercase tracking-[0.18em] text-gray-400 mb-2">
            {reason === 'export_limit' ? 'Free limit reached' : 'Pro feature'}
          </p>
          <h2 className="text-xl font-medium text-gray-900 dark:text-gray-100 mb-2">
            {reason === 'export_limit'
              ? 'You\'ve used your 3 free exports'
              : 'This template is Pro'}
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed mb-6">
            {reason === 'export_limit'
              ? 'Upgrade to continue exporting — unlimited PDF, unlimited share links.'
              : 'Access all templates, unlimited exports and private share links.'}
          </p>

          {/* Price */}
          <div className="flex items-end gap-1 mb-6">
            <span className="text-4xl font-medium text-gray-900 dark:text-gray-100 leading-none">$19</span>
            <span className="text-sm text-gray-400 mb-0.5">/ month</span>
          </div>

          {/* Features */}
          <ul className="space-y-2 mb-7">
            {['Unlimited exports (PDF + share links)', 'All Pro templates', 'Cancel anytime'].map(f => (
              <li key={f} className="flex items-center gap-2.5 text-sm text-gray-600 dark:text-gray-400">
                <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" className="shrink-0 text-gray-900 dark:text-gray-100">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                {f}
              </li>
            ))}
          </ul>

          {/* CTA */}
          <button
            onClick={handleSubscribe}
            disabled={loading}
            className="w-full cursor-pointer bg-gray-900 dark:bg-white dark:text-gray-900 text-white text-sm font-medium py-3 rounded-[8px] hover:bg-gray-700 dark:hover:bg-gray-100 transition-colors disabled:opacity-50"
          >
            {loading ? 'Redirecting…' : 'Subscribe — $19 / month'}
          </button>
          <p className="text-center text-[11px] text-gray-400 mt-3">Secure payment · Cancel anytime</p>
        </div>
      </div>
    </div>
  )
}

// ═══════════════════════════════════════════════════════════════════════════════
// MAIN APP
// ═══════════════════════════════════════════════════════════════════════════════

const DEFAULT_SETUP: VrSetup = { galleryName: '', headline: '', title: '', recipientName: '', recipientEmail: '', introText: '', galleryAddress: '', galleryContact: '' }

export default function ViewingRoomApp() {
  const { isPro, isSignedIn } = useOptionalUser()

  const [setup, setSetup] = useState<VrSetup>(DEFAULT_SETUP)
  const [images, setImages] = useState<ImageItem[]>([])
  const [blocks, setBlocks] = useState<Block[]>([])
  const [draggingBlockId, setDraggingBlockId] = useState<string | null>(null)
  const [exportOpen, setExportOpen] = useState(false)
  const [mobileTab, setMobileTab] = useState<'edit' | 'preview'>('edit')
  const [paywallOpen, setPaywallOpen] = useState(false)
  const [paywallReason, setPaywallReason] = useState<'template' | 'export_limit'>('template')

  const openPaywall = (reason: 'template' | 'export_limit') => {
    setPaywallReason(reason)
    setPaywallOpen(true)
  }

  const handleExportClick = () => {
    setExportOpen(true)
  }

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

  const contentSubtitle = [setup.galleryName, setup.title || setup.headline, setup.recipientName].filter(Boolean).join(' · ')
  const layoutSubtitle = blocks.map(b => BLOCK_CONFIGS[b.type].label).join(' · ')
  const activeTemplate = TEMPLATES.find(t => t.blocks.length === blocks.length && t.blocks.every((bt, i) => bt === blocks[i]?.type))
  const templatesSubtitle = activeTemplate?.name ?? ''

  return (
    <div className="h-screen relative overflow-hidden bg-gray-50 dark:bg-[#111111]">

      {/* ── Top-right auth button — desktop only ───────────────────────────── */}
      {clerkEnabled && (
        <div className="hidden lg:flex absolute top-4 right-5 z-20 items-center gap-2">
          {isSignedIn
            ? <UserButton appearance={{ elements: { avatarBox: 'w-7 h-7' } }} />
            : <a href="https://vitreen.art/sign-in" className="cursor-pointer text-xs text-white bg-gray-900 hover:bg-gray-700 transition-colors px-5 py-2.5 rounded-[5px]">Sign in</a>
          }
        </div>
      )}

      {/* ── Preview — full screen background (desktop) / tab view (mobile) ── */}
      <main className={[
        "absolute inset-0 overflow-y-auto",
        "lg:pt-16",
        // mobile: only visible on preview tab, add bottom padding for tab bar
        "max-lg:pb-16",
        mobileTab === 'preview' ? "max-lg:block" : "max-lg:hidden",
      ].join(" ")}>
        <ViewingRoomPreview setup={setup} images={images} blocks={blocks} isPro={isPro} draggingBlockId={draggingBlockId} />
      </main>

      {/* ── Side panel — floating overlay (desktop) / full screen (mobile) ── */}
      <aside className={[
        "flex flex-col bg-white dark:bg-[#1c1c1c] overflow-hidden z-20",
        "max-lg:absolute max-lg:inset-0 max-lg:pb-16",
        mobileTab === 'edit' ? "max-lg:flex" : "max-lg:hidden",
        "lg:absolute lg:left-3 lg:top-3 lg:bottom-3 lg:w-[370px] lg:rounded-[20px] lg:border lg:border-gray-200/70 lg:dark:border-gray-800 lg:shadow-lg",
      ].join(" ")}>

        {/* Panel header */}
        <div className="shrink-0 flex items-center justify-between px-5 py-4 border-b border-gray-100 dark:border-gray-800">
          <span className="text-base font-medium text-gray-900 dark:text-gray-100 tracking-tight">Viewing Room Studio</span>
          <div className="flex items-center gap-3">
            {/* Mobile: auth button inline in header */}
            {clerkEnabled && (
              <div className="lg:hidden">
                {isSignedIn
                  ? <UserButton appearance={{ elements: { avatarBox: 'w-7 h-7' } }} />
                  : <a href="https://vitreen.art/sign-in" className="cursor-pointer text-xs text-white bg-gray-900 hover:bg-gray-700 transition-colors px-5 py-2.5 rounded-[5px]">Sign in</a>
                }
              </div>
            )}
            <ThemeToggle />
          </div>
        </div>

        {/* Scrollable accordion sections */}
        <div className="flex-1 overflow-y-auto px-[5px] pt-3 pb-[2px] space-y-3 bg-white dark:bg-[#1c1c1c]">
          <Accordion title="Content" subtitle={contentSubtitle} defaultOpen>
            <InfosSection setup={setup} onChange={saveSetup} />
          </Accordion>

          <Accordion title="Media" badge={images.length} defaultOpen cardPaddingTop="pt-3">
            <ImagesSection images={images} onChange={saveImages} />
          </Accordion>

          <Accordion title="Layout" badge={blocks.length} subtitle={layoutSubtitle} defaultOpen cardPaddingTop="pt-3">
            <LayoutSection images={images} blocks={blocks} onChange={saveBlocks} onBlockDragStart={setDraggingBlockId} onBlockDragEnd={() => setDraggingBlockId(null)} />
          </Accordion>

          <Accordion title="Templates" subtitle={templatesSubtitle} defaultOpen={true}>
            <TemplatesSection blocks={blocks} onChange={saveBlocks} isPro={isPro} onPaywall={() => openPaywall('template')} />
          </Accordion>
        </div>
      </aside>

      {/* ── Mobile bottom tab bar ───────────────────────────────────────────── */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-30 bg-white dark:bg-[#1c1c1c] border-t border-gray-100 dark:border-gray-800 flex">
        <button
          onClick={() => setMobileTab('edit')}
          className={[
            "flex-1 flex flex-col items-center justify-center gap-1 py-3 text-[11px] transition-colors",
            mobileTab === 'edit'
              ? "text-gray-900 dark:text-gray-100 font-medium"
              : "text-gray-400 dark:text-gray-600",
          ].join(" ")}
        >
          <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
            <path d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487z" />
          </svg>
          Edit
        </button>
        <button
          onClick={() => setMobileTab('preview')}
          className={[
            "flex-1 flex flex-col items-center justify-center gap-1 py-3 text-[11px] transition-colors",
            mobileTab === 'preview'
              ? "text-gray-900 dark:text-gray-100 font-medium"
              : "text-gray-400 dark:text-gray-600",
          ].join(" ")}
        >
          <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
            <path d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
            <path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          Preview
        </button>
      </nav>

      {/* ── Export button — fixed bottom right (desktop) / hidden on mobile edit, shown on preview ── */}
      <button
        onClick={handleExportClick}
        disabled={blocks.length === 0}
        className={[
          "group cursor-pointer fixed bottom-6 right-6 z-20 text-xs text-white bg-gray-900 hover:bg-gray-700 transition-colors px-5 py-2.5 rounded-[5px] disabled:opacity-30 shadow-lg flex items-center gap-1.5",
          // on mobile, only show on preview tab
          mobileTab === 'edit' ? "max-lg:hidden" : "max-lg:bottom-20",
        ].join(" ")}
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
        onPaywall={() => openPaywall('export_limit')}
        onChangeSetup={saveSetup}
      />

      {paywallOpen && (
        <SubscriptionModal
          reason={paywallReason}
          onClose={() => setPaywallOpen(false)}
        />
      )}
    </div>
  )
}
