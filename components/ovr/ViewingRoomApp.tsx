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

const input = 'w-full border border-gray-200 dark:border-gray-700 rounded-lg px-3.5 py-1.5 text-[12px] bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-900/8 focus:border-gray-400 dark:focus:border-gray-500 transition-colors'
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
              <span className="text-sm font-normal text-gray-800 dark:text-gray-200 shrink-0">{title}</span>
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
      {open && <div className="px-5 pb-5">{children}</div>}
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
          <svg className="w-7 h-7 text-gray-300 dark:text-gray-600 mb-2.5" fill="none" stroke="currentColor" strokeWidth="1.2" viewBox="0 0 24 24">
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

function ArtBlockRow({ block, images, dragHandleProps, imageDragging, onDelete, onUpdate }: {
  block: Block; images: ImageItem[]
  dragHandleProps: DraggableProvidedDragHandleProps | null | undefined
  imageDragging: boolean
  onDelete: () => void; onUpdate: (b: Block) => void
}) {
  const [over, setOver] = useState(false)
  const artworks = block.slots.map(s => images.find(i => i.id === s.imageId)).filter((x): x is ImageItem => Boolean(x))
  const canReceive = block.slots.length < 3

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault(); setOver(false)
    if (!canReceive) return
    const id = e.dataTransfer.getData('text/plain')
    if (!id || block.slots.some(s => s.imageId === id)) return
    const newSlots = [...block.slots, { imageId: id }]
    onUpdate({ ...block, slots: newSlots, type: artBlockType(newSlots.length) })
  }

  const removeArtwork = (imageId: string) => {
    const newSlots = block.slots.filter(s => s.imageId !== imageId)
    if (newSlots.length === 0) { onDelete(); return }
    onUpdate({ ...block, slots: newSlots, type: artBlockType(newSlots.length) })
  }

  const blockLabel = block.slots.length >= 3 ? 'Triptych' : block.slots.length === 2 ? 'Pair' : 'Full page'

  return (
    <div
      onDragOver={e => { if (!imageDragging || !canReceive) return; e.preventDefault(); setOver(true) }}
      onDragLeave={() => setOver(false)}
      onDrop={handleDrop}
      className={`flex items-center gap-2 px-3 py-2 rounded-xl border transition-colors ${
        over ? 'border-blue-400 bg-blue-50 dark:bg-blue-950/20'
        : imageDragging && canReceive ? 'border-dashed border-blue-200 dark:border-blue-800 bg-blue-50/20 dark:bg-blue-950/10'
        : 'border-gray-200 dark:border-gray-700 hover:border-gray-900 dark:hover:border-gray-100 bg-white dark:bg-gray-900'
      }`}
    >
      {/* Drag handle */}
      <div {...dragHandleProps} className="shrink-0 text-gray-300 dark:text-gray-600 cursor-grab active:cursor-grabbing touch-none">
        <svg width="10" height="12" viewBox="0 0 10 12" fill="currentColor">
          <circle cx="2.5" cy="2" r="1.2"/><circle cx="2.5" cy="6" r="1.2"/><circle cx="2.5" cy="10" r="1.2"/>
          <circle cx="7.5" cy="2" r="1.2"/><circle cx="7.5" cy="6" r="1.2"/><circle cx="7.5" cy="10" r="1.2"/>
        </svg>
      </div>

      {/* Block label */}
      <span className="text-[11px] font-medium text-gray-500 dark:text-gray-400 shrink-0 w-[62px]">
        {blockLabel}
      </span>

      {/* Artwork thumbnails */}
      <div className="flex items-center gap-1 flex-1 min-w-0">
        {artworks.map(img => (
          <div key={img.id} className="relative group/art shrink-0">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={img.dataUrl} alt={img.title || ''} className="w-7 h-7 rounded object-cover" />
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
        <input type="checkbox" checked={block.showInquire}
          onChange={e => onUpdate({ ...block, showInquire: e.target.checked })}
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

const TEXT_TYPE_META: Record<string, { label: string; pill: string }> = {
  quote:     { label: 'Text',       pill: 'bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/20 dark:text-amber-400 dark:border-amber-800' },
  quotefull: { label: 'Quote',      pill: 'bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/20 dark:text-amber-400 dark:border-amber-800' },
  side:      { label: 'Art + text', pill: 'bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950/20 dark:text-blue-400 dark:border-blue-800' },
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
  const canReceiveImage = hasImageSlot && !imageSlotFilled
  const slotImage = hasImageSlot ? images.find(i => i.id === block.slots[0]?.imageId) : undefined

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault(); setOver(false)
    if (!canReceiveImage) return
    const id = e.dataTransfer.getData('text/plain')
    if (!id) return
    onUpdate({ ...block, slots: [{ imageId: id }, ...block.slots.slice(1)] })
  }

  return (
    <div
      onDragOver={e => { if (!imageDragging || !canReceiveImage) return; e.preventDefault(); setOver(true) }}
      onDragLeave={() => setOver(false)}
      onDrop={handleDrop}
      className={`border rounded-xl overflow-hidden transition-colors ${
        over ? 'border-blue-400'
        : imageDragging && canReceiveImage ? 'border-dashed border-blue-200 dark:border-blue-800'
        : 'border-gray-200 dark:border-gray-700 hover:border-gray-900 dark:hover:border-gray-100'
      }`}
    >
      <div className="flex items-center gap-2.5 px-3 py-2 bg-white dark:bg-gray-900">
        <div {...dragHandleProps} className="shrink-0 text-gray-300 dark:text-gray-600 cursor-grab active:cursor-grabbing touch-none">
          <svg width="10" height="12" viewBox="0 0 10 12" fill="currentColor">
            <circle cx="2.5" cy="2" r="1.2"/><circle cx="2.5" cy="6" r="1.2"/><circle cx="2.5" cy="10" r="1.2"/>
            <circle cx="7.5" cy="2" r="1.2"/><circle cx="7.5" cy="6" r="1.2"/><circle cx="7.5" cy="10" r="1.2"/>
          </svg>
        </div>

        <button type="button" onClick={onExpand} className="flex-1 flex items-center gap-2 text-left min-w-0">
          <span className={`px-2 py-0.5 text-[10px] font-medium border rounded-full shrink-0 ${meta.pill}`}>
            {meta.label}
          </span>
          {slotImage && (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={slotImage.dataUrl} alt="" className="w-[18px] h-[18px] rounded object-cover shrink-0" />
          )}
          {block.quoteText
            ? <span className="text-[11px] text-gray-400 truncate italic">"{block.quoteText}"</span>
            : <span className="text-[11px] text-gray-300 dark:text-gray-600">Add text…</span>
          }
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
  { type: 'quote',     label: 'Texte',       thumb: <WireText /> },
  { type: 'quotefull', label: 'Citation',    thumb: <WireQuote /> },
  { type: 'side',      label: 'Img + texte', thumb: <WireSide /> },
]

function LayoutSection({ images, blocks, onChange }: {
  images: ImageItem[]; blocks: Block[]; onChange: (b: Block[]) => void
}) {
  const [expandedId, setExpandedId] = useState<string | null>(null)
  const [imageDragging, setImageDragging] = useState(false)
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
    e.preventDefault(); setDropZoneOver(false)
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
            <span className="text-[11px] text-gray-900 dark:text-gray-100 font-medium">Text — click to add</span>
          </div>
        <div className="flex gap-1.5">
          {TEXT_BLOCKS_DEF.map(({ type, label, thumb }) => (
            <button
              key={type}
              type="button"
              onClick={() => addTextBlock(type)}
              className="flex-1 flex flex-col items-center gap-2 pt-2.5 pb-2 rounded-xl border border-gray-200 dark:border-gray-700 hover:border-gray-900 dark:hover:border-gray-100 bg-white dark:bg-gray-900 transition-colors group"
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
          <DragDropContext onDragEnd={onDragEnd}>
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
                              onDelete={() => onChange(blocks.filter(b => b.id !== block.id))}
                              onUpdate={updated => onChange(blocks.map(b => b.id === updated.id ? updated : b))}
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
        onDragOver={e => { if (!imageDragging) return; e.preventDefault(); setDropZoneOver(true) }}
        onDragLeave={() => setDropZoneOver(false)}
        onDrop={handleDropOnNewZone}
        className={`rounded-xl border-2 border-dashed flex items-center justify-center py-4 transition-colors ${
          dropZoneOver ? 'border-blue-400 bg-blue-50 dark:bg-blue-950/20'
          : imageDragging ? 'border-blue-200 dark:border-blue-800 bg-blue-50/20 dark:bg-blue-950/10'
          : 'border-gray-100 dark:border-gray-800'
        }`}
      >
        <p className={`text-[11px] transition-colors ${
          dropZoneOver ? 'text-blue-600 dark:text-blue-400'
          : imageDragging ? 'text-blue-400 dark:text-blue-500'
          : 'text-gray-300 dark:text-gray-700'
        }`}>
          {dropZoneOver ? '+ New block' : imageDragging ? 'Drop to create a new block' : '+ New artwork block'}
        </p>
      </div>

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
    <div className="flex flex-col gap-0">
      {cover ? (
        <div className={`${aspect} overflow-hidden`}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={img.dataUrl} alt={img.title || ''} className="w-full h-full object-cover" />
        </div>
      ) : (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={img.dataUrl} alt={img.title || ''} className="w-full h-auto" />
      )}
      <div className="pt-[10px] flex items-start justify-between gap-4">
        <div className="space-y-0.5">
          {img.artist && <p className="text-[12px] font-normal text-gray-900 dark:text-gray-100">{img.artist}</p>}
          {img.title && (
            <p className="text-[12px] font-normal text-gray-900 dark:text-gray-100">
              <em>{img.title}</em>{img.year ? `, ${img.year}` : ''}
            </p>
          )}
          {img.medium && <p className="text-[12px] font-normal text-gray-400 dark:text-gray-500">{img.medium}</p>}
          {img.dimensions && <p className="text-[12px] font-normal text-gray-400 dark:text-gray-500">{img.dimensions}</p>}
          {img.showPrice && img.price && <p className="text-[12px] font-normal text-gray-900 dark:text-gray-100 mt-1">{img.price}</p>}
        </div>
        {showInquire && (
          <button className="shrink-0 border border-gray-900 dark:border-gray-100 text-gray-900 dark:text-gray-100 text-[11px] tracking-widest uppercase px-[31px] py-1.5 hover:bg-gray-900 hover:text-white dark:hover:bg-white dark:hover:text-gray-900 transition-colors">
            Inquire
          </button>
        )}
      </div>
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
        <PreviewSlot imageId={block.slots[0]?.imageId ?? null} images={images} landscape showInquire={block.showInquire} />
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
        <div>
          <PreviewSlot imageId={block.slots[0]?.imageId ?? null} images={images} cover showInquire={block.showInquire} />
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

function ViewingRoomPreview({ setup, images, blocks, isPro }: {
  setup: VrSetup; images: ImageItem[]; blocks: Block[]; isPro: boolean
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
            <p className="text-sm text-gray-900 dark:text-gray-100 leading-relaxed mt-4 whitespace-pre-wrap">{setup.introText}</p>
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
        {(setup.galleryName || setup.galleryAddress || setup.galleryContact) && (
          <div className="border-t border-gray-100 dark:border-gray-800 py-8 px-10 text-center space-y-0.5">
            {setup.galleryName && (
              <p className="text-[12px] text-gray-400 dark:text-gray-500">{setup.galleryName}</p>
            )}
            {setup.galleryAddress && (
              <p className="text-[12px] text-gray-400 dark:text-gray-500">{setup.galleryAddress}</p>
            )}
            {setup.galleryContact && (
              <p className="text-[12px] text-gray-400 dark:text-gray-500">{setup.galleryContact}</p>
            )}
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

function ExportPanel({ open, onClose, blocks, images, setup, onPaywall }: {
  open: boolean; onClose: () => void
  blocks: Block[]; images: ImageItem[]; setup: VrSetup
  onPaywall: () => void
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
      if (res.status === 402) { onClose(); onPaywall(); return }
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
      if (res.status === 402) { onClose(); onPaywall(); return }
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
      <div className="relative w-full max-w-md bg-white dark:bg-gray-900 rounded-[20px] shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden">
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
            <div className="flex items-center gap-2 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-[20px] px-4 py-3">
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
                  className="flex-1 flex items-center justify-center gap-2 py-1.5 rounded-full bg-[#25D366] text-white text-sm hover:bg-[#1ebe5d] transition-colors">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                  </svg>
                  WhatsApp
                </a>
              )}
              {emailHref && (
                <a href={emailHref}
                  className="flex-1 flex items-center justify-center gap-2 py-1.5 rounded-full border border-gray-200 dark:border-gray-700 text-sm text-gray-700 dark:text-gray-300 hover:border-gray-400 transition-colors">
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
// SUBSCRIPTION MODAL
// ═══════════════════════════════════════════════════════════════════════════════

function SubscriptionModal({ reason, onClose }: {
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
        <ViewingRoomPreview setup={setup} images={images} blocks={blocks} isPro={isPro} />
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
        <div className="flex-1 overflow-y-auto px-[5px] py-[2px] space-y-[2px] bg-white dark:bg-[#1c1c1c]">
          <Accordion title="Content" subtitle={contentSubtitle} defaultOpen titleAbove>
            <InfosSection setup={setup} onChange={saveSetup} />
          </Accordion>

          <Accordion title="Media" badge={images.length} defaultOpen titleAbove cardPaddingTop="pt-4">
            <ImagesSection images={images} onChange={saveImages} />
          </Accordion>

          <Accordion title="Layout" badge={blocks.length} subtitle={layoutSubtitle} defaultOpen titleAbove cardPaddingTop="pt-4">
            <LayoutSection images={images} blocks={blocks} onChange={saveBlocks} />
          </Accordion>

          <Accordion title="Templates" subtitle={templatesSubtitle} defaultOpen={true} titleAbove noBorder>
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
