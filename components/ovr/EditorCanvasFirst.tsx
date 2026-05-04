'use client'
import { useState, useLayoutEffect, useRef, useCallback } from 'react'
import dynamic from 'next/dynamic'
import { DragDropContext, Droppable, Draggable, type DropResult } from '@hello-pangea/dnd'
import { useOptionalUser, clerkEnabled } from '@/lib/useOptionalUser'
import type { Block, BlockType, BlockSlot, ImageItem, VrSetup, TextPool, QuoteItem } from '@/lib/ovr/buildTypes'
import { EMPTY_TEXT_POOL, makeBlock, makeQuote } from '@/lib/ovr/buildTypes'
import { vrCanvasNewQuoteContent } from '@/lib/ovr/vrCanvasPlaceholders'
import { autoCompose } from '@/lib/ovr/autoCompose'
import ThemeToggle from '@/components/ovr/ThemeToggle'
import { ViewingRoomPreview, ExportPanel, SubscriptionModal } from '@/components/ovr/ViewingRoomApp'

const UserButton = clerkEnabled
  ? dynamic(() => import('@clerk/nextjs').then(m => ({ default: m.UserButton })), { ssr: false })
  : () => null

const DEFAULT_SETUP: VrSetup = {
  galleryName: '', headline: '', title: '', recipientName: '', recipientEmail: '',
  introText: '', galleryAddress: '', galleryContact: '',
}

const BLOCK_TYPES: ReadonlySet<BlockType> = new Set(['full', 'pair', 'trio', 'side', 'quote', 'quotefull', 'imgbio'])

function normalizeImage(raw: unknown): ImageItem | null {
  if (!raw || typeof raw !== 'object') return null
  const o = raw as Partial<ImageItem>
  if (typeof o.id !== 'string' || typeof o.dataUrl !== 'string') return null
  return {
    id: o.id,
    dataUrl: o.dataUrl,
    title: typeof o.title === 'string' ? o.title : '',
    artist: typeof o.artist === 'string' ? o.artist : '',
    year: typeof o.year === 'string' ? o.year : '',
    medium: typeof o.medium === 'string' ? o.medium : '',
    dimensions: typeof o.dimensions === 'string' ? o.dimensions : '',
    price: typeof o.price === 'string' ? o.price : '',
    showPrice: !!o.showPrice,
  }
}

function normalizeBlock(raw: unknown): Block | null {
  if (!raw || typeof raw !== 'object') return null
  const o = raw as Partial<Block>
  if (typeof o.id !== 'string' || typeof o.type !== 'string' || !BLOCK_TYPES.has(o.type as BlockType)) return null
  const slots: BlockSlot[] = Array.isArray(o.slots)
    ? o.slots.map((s): BlockSlot => {
        if (!s || typeof s !== 'object') return { imageId: null }
        const si = s as { imageId?: unknown }
        return { imageId: typeof si.imageId === 'string' ? si.imageId : null }
      })
    : []
  return {
    id: o.id,
    type: o.type as BlockType,
    slots,
    quoteText: typeof o.quoteText === 'string' ? o.quoteText : '',
    quoteAuthor: typeof o.quoteAuthor === 'string' ? o.quoteAuthor : '',
    showInquire: !!o.showInquire,
    inquireHidden: o.inquireHidden,
    sideTextType: o.sideTextType,
    textStyle: o.textStyle,
  }
}

// ─── Health bar ──────────────────────────────────────────────────────────────

function computeHealth(setup: VrSetup, images: ImageItem[], blocks: Block[]) {
  const checks = [
    { label: 'Recipient', ok: !!setup.recipientName },
    { label: 'Headline', ok: !!setup.headline },
    { label: 'Images', ok: images.length > 0 },
    { label: 'Layout', ok: blocks.length > 0 },
    { label: 'Titles', ok: images.length > 0 && images.every(i => i.title) },
    { label: 'Prices', ok: images.length > 0 && images.every(i => !i.showPrice || i.price) },
  ]
  const done = checks.filter(c => c.ok).length
  return { done, total: checks.length, checks, ratio: done / checks.length }
}

// ─── Hero entry ──────────────────────────────────────────────────────────────

function HeroEntry({ onUpload }: { onUpload: (files: File[]) => void }) {
  const ref = useRef<HTMLInputElement>(null)
  const [over, setOver] = useState(false)

  const handleFiles = (files: File[]) => {
    const imgs = files.filter(f => f.type.startsWith('image/'))
    if (imgs.length) onUpload(imgs)
  }

  return (
    <div
      onDragOver={e => { e.preventDefault(); setOver(true) }}
      onDragLeave={() => setOver(false)}
      onDrop={e => { e.preventDefault(); setOver(false); handleFiles([...e.dataTransfer.files]) }}
      className={`fixed inset-0 flex flex-col items-center justify-center transition-colors duration-300 ${
        over
          ? 'bg-gray-100 dark:bg-[#181818]'
          : 'bg-gray-50 dark:bg-[#111111]'
      }`}
    >
      <input
        ref={ref}
        type="file"
        accept="image/*"
        multiple
        className="hidden"
        onChange={e => { const fs = [...(e.target.files ?? [])]; handleFiles(fs); e.target.value = '' }}
      />

      {/* Decorative grid */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none opacity-[0.04] dark:opacity-[0.06]"
        style={{
          backgroundImage: 'radial-gradient(circle at center, currentColor 1px, transparent 1px)',
          backgroundSize: '32px 32px',
          color: 'rgb(17 17 17)',
        }}
      />

      <div className="relative z-10 max-w-xl px-6 text-center">
        <p className="hero-fade-up text-[11px] uppercase tracking-[0.3em] text-gray-400 dark:text-gray-600 mb-6">
          Vitreen Studio
        </p>

        <h1 className="hero-fade-up text-[42px] md:text-[56px] leading-[1.05] tracking-[-0.02em] text-gray-900 dark:text-gray-100 font-normal mb-5">
          Drop your artworks.
          <br />
          <span className="text-gray-400 dark:text-gray-500">We compose the room.</span>
        </h1>

        <p className="hero-fade-up hero-fade-up-delay text-[15px] text-gray-500 dark:text-gray-400 leading-relaxed mb-10 max-w-md mx-auto">
          From <strong className="font-medium text-gray-700 dark:text-gray-300">5 images</strong> to a viewing
          room your collector wants to open — in two seconds.
        </p>

        <button
          type="button"
          onClick={() => ref.current?.click()}
          className="hero-fade-up hero-fade-up-delay group inline-flex items-center gap-2.5 bg-gray-900 dark:bg-white text-white dark:text-gray-900 px-7 py-3.5 rounded-full text-[14px] font-medium tracking-tight hover:scale-[1.02] active:scale-[0.98] transition-transform shadow-[0_10px_40px_rgba(0,0,0,0.15)]"
        >
          <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path d="M12 4v16m-8-8h16" />
          </svg>
          Choose images
          <span className="text-[12px] opacity-50 ml-1">or drag them here</span>
        </button>

        <p className="hero-fade-up hero-fade-up-delay text-[12px] text-gray-400 dark:text-gray-600 mt-8">
          JPG · PNG · up to 30 MB each
        </p>
      </div>

      {/* Drop ring overlay */}
      {over && (
        <div className="absolute inset-6 rounded-3xl border-2 border-dashed border-gray-400 dark:border-gray-500 pointer-events-none animate-pulse" />
      )}

      {/* Top-right utilities */}
      <div className="absolute top-5 right-5 flex items-center gap-3 z-20">
        {clerkEnabled ? (
          <UserButton appearance={{ elements: { avatarBox: 'w-7 h-7' } }} />
        ) : null}
        <ThemeToggle />
      </div>
    </div>
  )
}

// ─── Floating action bar ─────────────────────────────────────────────────────

function ActionBar({
  onAddImages, onAddText, onSend, recipientName, sendDisabled,
}: {
  onAddImages: (files: File[]) => void
  onAddText: () => void
  onSend: () => void
  recipientName: string
  sendDisabled: boolean
}) {
  const fileRef = useRef<HTMLInputElement>(null)

  const sendLabel = recipientName ? `Send to ${recipientName}` : 'Send'

  return (
    <div className="fixed top-4 left-1/2 -translate-x-1/2 z-30 vr-shell-fade">
      <input
        ref={fileRef}
        type="file"
        accept="image/*"
        multiple
        className="hidden"
        onChange={e => {
          const fs = [...(e.target.files ?? [])].filter(f => f.type.startsWith('image/'))
          if (fs.length) onAddImages(fs)
          e.target.value = ''
        }}
      />
      <div className="flex items-center gap-1 bg-white/90 dark:bg-[#1c1c1c]/90 backdrop-blur-xl border border-gray-200/70 dark:border-gray-800 rounded-full pl-2 pr-1 py-1 shadow-[0_8px_30px_rgba(0,0,0,0.08)]">
        <button
          type="button"
          onClick={() => fileRef.current?.click()}
          className="flex items-center gap-1.5 px-3 py-1.5 text-[12px] text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors"
          title="Ajouter des images au projet"
        >
          + Add images
        </button>

        <span className="w-px h-4 bg-gray-200 dark:bg-gray-700" />

        <button
          type="button"
          onClick={onAddText}
          className="flex items-center gap-1.5 px-3 py-1.5 text-[12px] text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors"
          title="Insérer un bloc texte dans la preview"
        >
          + Add text
        </button>

        <button
          type="button"
          onClick={onSend}
          disabled={sendDisabled}
          className="ml-1 flex items-center gap-1.5 px-4 py-1.5 text-[12px] bg-gray-900 dark:bg-white text-white dark:text-gray-900 hover:bg-gray-700 dark:hover:bg-gray-200 disabled:opacity-30 disabled:cursor-not-allowed rounded-full transition-colors font-medium"
        >
          {sendLabel}
          <svg width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path d="M5 12h14m-6-6l6 6-6 6"/>
          </svg>
        </button>
      </div>
    </div>
  )
}

// ─── Health pill (top-left) ──────────────────────────────────────────────────

function HealthPill({ ratio, done, total, checks }: ReturnType<typeof computeHealth>) {
  const [open, setOpen] = useState(false)
  const pct = Math.round(ratio * 100)
  const ready = pct === 100

  return (
    <div className="fixed top-4 left-4 z-30 vr-shell-fade">
      <button
        type="button"
        onClick={() => setOpen(o => !o)}
        className="group flex items-center gap-2 bg-white/90 dark:bg-[#1c1c1c]/90 backdrop-blur-xl border border-gray-200/70 dark:border-gray-800 rounded-full px-3 py-1.5 shadow-[0_4px_20px_rgba(0,0,0,0.06)] hover:shadow-[0_6px_24px_rgba(0,0,0,0.1)] transition-shadow"
      >
        <div className="relative w-7 h-7">
          <svg viewBox="0 0 28 28" className="w-7 h-7 -rotate-90">
            <circle cx="14" cy="14" r="11" fill="none" className="stroke-gray-200 dark:stroke-gray-700" strokeWidth="2.5" />
            <circle
              cx="14" cy="14" r="11" fill="none"
              className={ready ? 'stroke-emerald-500' : 'stroke-gray-900 dark:stroke-white'}
              strokeWidth="2.5"
              strokeDasharray={`${(ratio * 2 * Math.PI * 11).toFixed(2)} 999`}
              strokeLinecap="round"
              style={{ transition: 'stroke-dasharray 600ms cubic-bezier(0.16, 1, 0.3, 1)' }}
            />
          </svg>
          <span className={`absolute inset-0 flex items-center justify-center text-[9px] font-medium ${ready ? 'text-emerald-600' : 'text-gray-700 dark:text-gray-300'}`}>
            {ready ? '✓' : `${pct}%`}
          </span>
        </div>
        <div className="text-left pr-1">
          <p className="text-[11px] text-gray-500 dark:text-gray-400 leading-none">{ready ? 'Ready to send' : 'Room status'}</p>
          <p className="text-[12px] text-gray-900 dark:text-gray-100 leading-tight font-medium">{done}/{total} complete</p>
        </div>
        <svg className={`w-3 h-3 text-gray-400 transition-transform duration-200 ${open ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path d="M19 9l-7 7-7-7"/>
        </svg>
      </button>

      {open && (
        <div className="mt-2 w-64 bg-white/95 dark:bg-[#1c1c1c]/95 backdrop-blur-xl border border-gray-200/70 dark:border-gray-800 rounded-2xl p-3 shadow-[0_10px_40px_rgba(0,0,0,0.12)] vr-shell-fade">
          <p className="text-[11px] uppercase tracking-wider text-gray-400 dark:text-gray-600 mb-2 px-1">Checklist</p>
          <ul className="space-y-1">
            {checks.map(c => (
              <li key={c.label} className="flex items-center gap-2 px-1 py-1 text-[12px]">
                <span className={`w-3.5 h-3.5 rounded-full flex items-center justify-center ${c.ok ? 'bg-emerald-500 text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-400'}`}>
                  {c.ok ? <svg width="9" height="9" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M2 6l3 3 5-6"/></svg> : null}
                </span>
                <span className={c.ok ? 'text-gray-700 dark:text-gray-300' : 'text-gray-400 dark:text-gray-500'}>{c.label}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}

// ─── Texts — panel only (quotes / closing + reorder) ─────────────────────────

function PanelAddTextMenu({ atIndex, onPick }: { atIndex: number; onPick: (index: number, kind: 'quote' | 'text') => void }) {
  return (
    <details className="group/add relative" name="panel-text-pool-add">
      <summary
        className="flex h-7 w-7 cursor-pointer list-none items-center justify-center rounded-md border border-transparent text-[15px] leading-none text-gray-400 transition-colors hover:border-gray-200 hover:bg-gray-100 hover:text-gray-700 dark:hover:border-gray-700 dark:hover:bg-gray-800 dark:hover:text-gray-200 [&::-webkit-details-marker]:hidden"
        aria-label="Add quote or text block"
      >
        +
      </summary>
      <div
        role="menu"
        className="absolute left-full top-0 z-50 ml-1 min-w-[7.25rem] overflow-hidden rounded-lg border border-gray-200 bg-white py-0.5 text-[12px] shadow-lg dark:border-gray-700 dark:bg-gray-800"
        onClick={e => e.stopPropagation()}
      >
        <button
          type="button"
          className="block w-full px-3 py-2 text-left text-gray-800 hover:bg-gray-50 dark:text-gray-100 dark:hover:bg-gray-700/50"
          onClick={e => {
            onPick(atIndex, 'quote')
            ;(e.currentTarget.closest('details') as HTMLDetailsElement | null)?.removeAttribute('open')
          }}
        >
          Quote
        </button>
        <button
          type="button"
          className="block w-full px-3 py-2 text-left text-gray-800 hover:bg-gray-50 dark:text-gray-100 dark:hover:bg-gray-700/50"
          onClick={e => {
            onPick(atIndex, 'text')
            ;(e.currentTarget.closest('details') as HTMLDetailsElement | null)?.removeAttribute('open')
          }}
        >
          Text
        </button>
      </div>
    </details>
  )
}

function TextsSection({
  textPool, onChange, inputCls,
}: { textPool: TextPool; onChange: (tp: TextPool) => void; inputCls: string }) {
  const [closingOpen, setClosingOpen] = useState(!!textPool.closing)

  const updateQuote = (id: string, patch: Partial<QuoteItem>) => {
    onChange({ ...textPool, quotes: textPool.quotes.map(q => (q.id === id ? { ...q, ...patch } : q)) })
  }
  const removeQuote = (id: string) => {
    onChange({ ...textPool, quotes: textPool.quotes.filter(q => q.id !== id) })
  }
  const insertAt = (index: number, kind: 'quote' | 'text') => {
    const item: QuoteItem = kind === 'text' ? { ...makeQuote(), kind: 'text' } : makeQuote()
    const quotes = [...textPool.quotes]
    quotes.splice(index, 0, item)
    onChange({ ...textPool, quotes })
  }
  const onQuotesDragEnd = (result: DropResult) => {
    if (!result.destination) return
    if (result.source.droppableId !== 'text-pool-quotes' || result.destination.droppableId !== 'text-pool-quotes') return
    if (result.source.index === result.destination.index) return
    const quotes = Array.from(textPool.quotes)
    const [moved] = quotes.splice(result.source.index, 1)
    quotes.splice(result.destination.index, 0, moved)
    onChange({ ...textPool, quotes })
  }

  return (
    <section>
      <div className="mb-3 flex items-baseline justify-between">
        <h3 className="text-[11px] uppercase tracking-[0.15em] text-gray-400 dark:text-gray-600">Texts</h3>
        <span className="text-[10px] text-gray-400 dark:text-gray-600">
          {textPool.quotes.length} block{textPool.quotes.length === 1 ? '' : 's'}
        </span>
      </div>
      <div className="mb-3">
        {textPool.quotes.length === 0 ? (
          <div className="rounded-lg border border-dashed border-gray-200 py-7 text-center dark:border-gray-700">
            <p className="mb-3 px-4 text-[12px] text-gray-500 dark:text-gray-400">Quotes & texts — drag to reorder.</p>
            <div className="inline-flex gap-2 px-4">
              <button
                type="button"
                onClick={() => insertAt(0, 'quote')}
                className="inline-flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-3 py-2 text-[12px] text-gray-700 transition-colors hover:border-gray-300 hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200 dark:hover:border-gray-600 dark:hover:bg-gray-700/50"
              >
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-gray-100 text-[11px] dark:bg-gray-700">+</span>
                Quote
              </button>
              <button
                type="button"
                onClick={() => insertAt(0, 'text')}
                className="inline-flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-3 py-2 text-[12px] text-gray-700 transition-colors hover:border-gray-300 hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200 dark:hover:border-gray-600 dark:hover:bg-gray-700/50"
              >
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-gray-100 text-[11px] dark:bg-gray-700">+</span>
                Text
              </button>
            </div>
          </div>
        ) : (
          <DragDropContext onDragEnd={onQuotesDragEnd}>
            <div className="mb-1 flex items-center pl-[34px]">
              <PanelAddTextMenu atIndex={0} onPick={insertAt} />
            </div>
            <Droppable droppableId="text-pool-quotes">
              {provided => (
                <div ref={provided.innerRef} {...provided.droppableProps} className="space-y-2">
                  {textPool.quotes.map((q, i) => {
                    const isText = q.kind === 'text'
                    return (
                      <Draggable key={q.id} draggableId={q.id} index={i}>
                        {(dragProvided, snapshot) => (
                          <div
                            ref={dragProvided.innerRef}
                            {...dragProvided.draggableProps}
                            className={`grid grid-cols-[28px_minmax(0,1fr)] gap-2 ${snapshot.isDragging ? 'opacity-90' : ''}`}
                          >
                            <div className="flex flex-col items-center gap-1.5 pt-1.5">
                              <button
                                type="button"
                                {...dragProvided.dragHandleProps}
                                aria-label="Drag to reorder"
                                className="flex h-7 w-7 cursor-grab touch-manipulation items-center justify-center rounded-md border border-transparent text-gray-400 transition-colors hover:border-gray-200 hover:bg-gray-100 hover:text-gray-600 active:cursor-grabbing dark:hover:border-gray-700 dark:hover:bg-gray-800 dark:hover:text-gray-300"
                              >
                                <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24" aria-hidden>
                                  <line x1="9" y1="5" x2="20" y2="5" />
                                  <line x1="9" y1="12" x2="20" y2="12" />
                                  <line x1="9" y1="19" x2="20" y2="19" />
                                  <circle cx="5" cy="5" r="1" fill="currentColor" stroke="none" />
                                  <circle cx="5" cy="12" r="1" fill="currentColor" stroke="none" />
                                  <circle cx="5" cy="19" r="1" fill="currentColor" stroke="none" />
                                </svg>
                              </button>
                              <PanelAddTextMenu atIndex={i + 1} onPick={insertAt} />
                            </div>
                            <div
                              className={`group/q space-y-1.5 rounded-lg border border-gray-200 bg-gray-50/50 p-2.5 transition-colors dark:border-gray-800 dark:bg-gray-900/30 ${
                                snapshot.isDragging ? 'border-gray-400 shadow-lg ring-1 ring-gray-900/10 dark:border-gray-600 dark:ring-white/10' : 'hover:border-gray-300 dark:hover:border-gray-700'
                              }`}
                            >
                              <div className="flex items-center justify-between">
                                <div className="inline-flex rounded-full border border-gray-200 bg-white p-0.5 text-[10px] font-medium dark:border-gray-700 dark:bg-gray-800">
                                  <button
                                    type="button"
                                    onClick={() => updateQuote(q.id, { kind: 'quote' })}
                                    className={`rounded-full px-2 py-0.5 transition-colors ${!isText ? 'bg-gray-900 text-white dark:bg-white dark:text-gray-900' : 'text-gray-400 hover:text-gray-600 dark:hover:text-gray-300'}`}
                                  >
                                    Quote
                                  </button>
                                  <button
                                    type="button"
                                    onClick={() => updateQuote(q.id, { kind: 'text' })}
                                    className={`rounded-full px-2 py-0.5 transition-colors ${isText ? 'bg-gray-900 text-white dark:bg-white dark:text-gray-900' : 'text-gray-400 hover:text-gray-600 dark:hover:text-gray-300'}`}
                                  >
                                    Text
                                  </button>
                                </div>
                                <button
                                  type="button"
                                  onClick={() => removeQuote(q.id)}
                                  className="flex h-5 w-5 items-center justify-center rounded-full text-gray-400 opacity-0 transition-opacity hover:bg-red-50 hover:text-red-500 group-hover/q:opacity-100 dark:hover:bg-red-900/20"
                                  aria-label="Remove"
                                >
                                  <svg width="10" height="10" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M6 6l12 12M6 18L18 6" /></svg>
                                </button>
                              </div>
                              <textarea
                                className={inputCls}
                                placeholder={isText ? 'Narrative text' : 'Quote text'}
                                rows={2}
                                value={q.text}
                                onChange={e => updateQuote(q.id, { text: e.target.value })}
                              />
                              {!isText && (
                                <input
                                  className={inputCls}
                                  placeholder="Author"
                                  value={q.author}
                                  onChange={e => updateQuote(q.id, { author: e.target.value })}
                                />
                              )}
                            </div>
                          </div>
                        )}
                      </Draggable>
                    )
                  })}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
        )}
      </div>
      <div>
        {closingOpen || textPool.closing ? (
          <div className="space-y-1.5">
            <p className="px-1 text-[10px] uppercase tracking-wider text-gray-400 dark:text-gray-600">Closing word</p>
            <textarea
              className={inputCls}
              placeholder="Final note — invitation, signature, gratitude"
              rows={2}
              value={textPool.closing}
              onChange={e => onChange({ ...textPool, closing: e.target.value })}
              onBlur={() => {
                if (!textPool.closing) setClosingOpen(false)
              }}
            />
          </div>
        ) : (
          <button
            type="button"
            onClick={() => setClosingOpen(true)}
            className="flex w-full items-center gap-2 rounded-lg border border-dashed border-gray-200 px-3 py-2 text-[12px] text-gray-500 transition-colors hover:border-gray-300 hover:text-gray-700 dark:border-gray-700 dark:text-gray-400 dark:hover:border-gray-600 dark:hover:text-gray-200"
          >
            <span className="flex h-4 w-4 items-center justify-center rounded-full bg-gray-100 text-[11px] dark:bg-gray-800">+</span>
            Add a closing word
          </button>
        )}
      </div>
    </section>
  )
}

// ─── Settings drawer (slide-in from right) ───────────────────────────────────

function SettingsDrawer({
  open, onClose, setup, onChangeSetup, images, onChangeImages, textPool, onChangeTextPool,
}: {
  open: boolean
  onClose: () => void
  setup: VrSetup
  onChangeSetup: (s: VrSetup) => void
  images: ImageItem[]
  onChangeImages: (imgs: ImageItem[]) => void
  textPool: TextPool
  onChangeTextPool: (tp: TextPool) => void
}) {
  const set = (k: keyof VrSetup, v: string) => onChangeSetup({ ...setup, [k]: v })
  const inputCls = 'w-full border border-gray-200 dark:border-gray-700 rounded-lg px-3 py-2 text-[13px] bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-900/8 focus:border-gray-400 transition-colors'

  return (
    <>
      {open && (
        <div
          className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm vr-shell-fade"
          onClick={onClose}
        />
      )}
      <aside
        className={`fixed top-0 right-0 bottom-0 w-[380px] z-50 bg-white dark:bg-[#1c1c1c] border-l border-gray-200 dark:border-gray-800 flex flex-col transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          open ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="shrink-0 flex items-center justify-between px-5 py-4 border-b border-gray-100 dark:border-gray-800">
          <span className="text-[15px] font-medium text-gray-900 dark:text-gray-100 tracking-tight">Settings</span>
          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-full text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            aria-label="Close"
          >
            <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M6 6l12 12M6 18L18 6"/></svg>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-5 space-y-6">
          <section>
            <h3 className="text-[11px] uppercase tracking-[0.15em] text-gray-400 dark:text-gray-600 mb-3">Recipient</h3>
            <div className="space-y-2.5">
              <input className={inputCls} placeholder="Name" value={setup.recipientName} onChange={e => set('recipientName', e.target.value)} />
              <input className={inputCls} placeholder="Email" type="email" value={setup.recipientEmail} onChange={e => set('recipientEmail', e.target.value)} />
            </div>
          </section>

          <section>
            <h3 className="text-[11px] uppercase tracking-[0.15em] text-gray-400 dark:text-gray-600 mb-3">Headline</h3>
            <div className="space-y-2.5">
              <input className={inputCls} placeholder="Gallery name" value={setup.galleryName} onChange={e => set('galleryName', e.target.value)} />
              <input className={inputCls} placeholder="Headline" value={setup.headline} onChange={e => set('headline', e.target.value)} />
              <input className={inputCls} placeholder="Subtitle" value={setup.title} onChange={e => set('title', e.target.value)} />
              <textarea className={inputCls} placeholder="Personal greeting (shown on cover)" rows={3} value={setup.introText} onChange={e => set('introText', e.target.value)} />
            </div>
          </section>

          <TextsSection textPool={textPool} onChange={onChangeTextPool} inputCls={inputCls} />

          <section>
            <h3 className="text-[11px] uppercase tracking-[0.15em] text-gray-400 dark:text-gray-600 mb-3">Images ({images.length})</h3>
            <div className="grid grid-cols-3 gap-2">
              {images.map(img => (
                <div key={img.id} className="relative group/img aspect-square rounded-lg overflow-hidden border border-gray-200 dark:border-gray-800">
                  {img.dataUrl ? (
                    <img src={img.dataUrl} alt={img.title} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full bg-gray-100 dark:bg-gray-800" />
                  )}
                  <button
                    type="button"
                    onClick={() => onChangeImages(images.filter(x => x.id !== img.id))}
                    className="absolute top-1 right-1 w-5 h-5 rounded-full bg-white/90 text-gray-700 opacity-0 group-hover/img:opacity-100 transition-opacity flex items-center justify-center text-[10px] shadow"
                    aria-label="Remove image"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h3 className="text-[11px] uppercase tracking-[0.15em] text-gray-400 dark:text-gray-600 mb-3">Footer</h3>
            <div className="space-y-2.5">
              <input className={inputCls} placeholder="Address" value={setup.galleryAddress} onChange={e => set('galleryAddress', e.target.value)} />
              <input className={inputCls} placeholder="Contact" value={setup.galleryContact} onChange={e => set('galleryContact', e.target.value)} />
            </div>
          </section>
        </div>
      </aside>
    </>
  )
}

// ─── Main shell ──────────────────────────────────────────────────────────────

export default function EditorCanvasFirst() {
  const { isPro, isSignedIn } = useOptionalUser()

  const [setup, setSetup] = useState<VrSetup>(DEFAULT_SETUP)
  const [images, setImages] = useState<ImageItem[]>([])
  const [blocks, setBlocks] = useState<Block[]>([])
  const [textPool, setTextPool] = useState<TextPool>(EMPTY_TEXT_POOL)
  const [composeSeed, setComposeSeed] = useState(0)
  const [shouldAnimate, setShouldAnimate] = useState(false)
  const [exportOpen, setExportOpen] = useState(false)
  const [paywallOpen, setPaywallOpen] = useState(false)
  const [paywallReason, setPaywallReason] = useState<'template' | 'export_limit'>('template')
  const [hydrated, setHydrated] = useState(false)

  // Hydrate depuis sessionStorage avant le paint client (évite écran « vide » prolongé).
  useLayoutEffect(() => {
    try {
      const s = sessionStorage.getItem('vr_setup')
      if (s) {
        const p = JSON.parse(s) as unknown
        if (p && typeof p === 'object') setSetup({ ...DEFAULT_SETUP, ...(p as VrSetup) })
      }
      const i = sessionStorage.getItem('vr_images')
      if (i) {
        const p = JSON.parse(i) as unknown
        if (Array.isArray(p)) setImages(p.map(normalizeImage).filter((x): x is ImageItem => x !== null))
      }
      const b = sessionStorage.getItem('vr_blocks')
      if (b) {
        const p = JSON.parse(b) as unknown
        if (Array.isArray(p)) setBlocks(p.map(normalizeBlock).filter((x): x is Block => x !== null))
      }
      const t = sessionStorage.getItem('vr_text_pool')
      if (t) {
        const p = JSON.parse(t) as unknown
        if (p && typeof p === 'object') {
          const po = p as Partial<TextPool>
          setTextPool({
            ...EMPTY_TEXT_POOL,
            intro: typeof po.intro === 'string' ? po.intro : '',
            closing: typeof po.closing === 'string' ? po.closing : '',
            quotes: Array.isArray(po.quotes)
              ? po.quotes
                  .map((q: unknown): QuoteItem | null => {
                    if (!q || typeof q !== 'object') return null
                    const o = q as Partial<QuoteItem>
                    if (typeof o.id !== 'string') return null
                    const item: QuoteItem = {
                      id: o.id,
                      text: typeof o.text === 'string' ? o.text : '',
                      author: typeof o.author === 'string' ? o.author : '',
                    }
                    if (o.kind === 'quote' || o.kind === 'text') item.kind = o.kind
                    return item
                  })
                  .filter((x): x is QuoteItem => x != null)
              : [],
          })
        }
      }
    } catch { /* ignore */ }
    setHydrated(true)
  }, [])

  const saveSetup = useCallback((s: VrSetup) => {
    setSetup(s)
    try { sessionStorage.setItem('vr_setup', JSON.stringify(s)) } catch { /* ignore */ }
  }, [])
  const saveImages = useCallback((imgs: ImageItem[]) => {
    setImages(imgs)
    try { sessionStorage.setItem('vr_images', JSON.stringify(imgs)) } catch { /* ignore */ }
  }, [])
  const saveBlocks = useCallback((blks: Block[]) => {
    setBlocks(blks)
    try { sessionStorage.setItem('vr_blocks', JSON.stringify(blks)) } catch { /* ignore */ }
  }, [])
  const saveTextPool = useCallback((tp: TextPool) => {
    setTextPool(tp)
    try { sessionStorage.setItem('vr_text_pool', JSON.stringify(tp)) } catch { /* ignore */ }
  }, [])

  const filesToImages = (files: File[]): Promise<ImageItem[]> =>
    Promise.all(files.map(f => new Promise<ImageItem>(resolve => {
      const r = new FileReader()
      r.onload = e => resolve({
        id: Math.random().toString(36).slice(2),
        dataUrl: e.target?.result as string,
        title: f.name.replace(/\.[^.]+$/, '').replace(/[-_]/g, ' '),
        artist: '', year: '', medium: '', dimensions: '', price: '', showPrice: false,
      })
      r.readAsDataURL(f)
    })))

  const triggerStagger = () => {
    setShouldAnimate(true)
    setTimeout(() => setShouldAnimate(false), 1200)
  }

  // Initial upload from Hero — auto-compose
  const handleHeroUpload = async (files: File[]) => {
    const newImages = await filesToImages(files)
    saveImages(newImages)
    const composed = autoCompose(newImages, textPool, 0)
    saveBlocks(composed)
    setComposeSeed(0)
    triggerStagger()
  }

  // Add images later — append, no recompose
  const handleAddImages = async (files: File[]) => {
    const newImages = await filesToImages(files)
    saveImages([...images, ...newImages])
    const newBlocks = newImages.map(img => {
      const block = makeBlock('full')
      block.slots = [{ imageId: img.id }]
      return block
    })
    saveBlocks([...blocks, ...newBlocks])
  }

  // When the text pool changes from the drawer, recompose immediately so the
  // canvas reflects the new narrative. Keep the same seed so layout stability
  // is preserved across text edits.
  const handleTextPoolChange = (tp: TextPool) => {
    saveTextPool(tp)
    if (images.length > 0 || tp.intro || tp.quotes.length > 0 || tp.closing) {
      const composed = autoCompose(images, tp, composeSeed)
      saveBlocks(composed)
    }
  }

  const insertTextBlock = useCallback((index: number, kind: 'quote' | 'text') => {
    const block = makeBlock('quote')
    block.textStyle = kind
    const seeded = vrCanvasNewQuoteContent(kind)
    block.quoteText = seeded.quoteText
    block.quoteAuthor = seeded.quoteAuthor
    setBlocks(prev => {
      const next = [...prev]
      next.splice(index, 0, block)
      try { sessionStorage.setItem('vr_blocks', JSON.stringify(next)) } catch { /* ignore */ }
      return next
    })
  }, [])

  const insertImageBlock = useCallback((index: number, imageId: string) => {
    setBlocks(prev => {
      const srcIndex = prev.findIndex(b => b.slots.some(s => s.imageId === imageId))
      if (srcIndex === -1) return prev

      const src = prev[srcIndex]
      const restIds = (src.slots.map(s => s.imageId).filter(Boolean) as string[]).filter(id => id !== imageId)
      const withoutImage = prev.flatMap((block, blockIndex) => {
        if (blockIndex !== srcIndex) return [block]
        if (restIds.length === 0) return []
        const type: BlockType = restIds.length === 1 ? 'full' : restIds.length === 2 ? 'pair' : 'trio'
        return [{ ...block, type, slots: restIds.map(id => ({ imageId: id })) }]
      })

      const nextBlock = makeBlock('full')
      nextBlock.slots = [{ imageId }]

      const adjustedIndex = srcIndex < index && restIds.length === 0 ? index - 1 : index
      const next = [...withoutImage]
      next.splice(Math.max(0, Math.min(adjustedIndex, next.length)), 0, nextBlock)
      try { sessionStorage.setItem('vr_blocks', JSON.stringify(next)) } catch { /* ignore */ }
      return next
    })
  }, [])

  const updateBlock = useCallback((id: string, patch: Partial<Block>) => {
    setBlocks(prev => {
      const next = prev.map(b => b.id === id ? { ...b, ...patch } : b)
      try { sessionStorage.setItem('vr_blocks', JSON.stringify(next)) } catch { /* ignore */ }
      return next
    })
  }, [])
  const updateImage = useCallback((id: string, patch: Partial<ImageItem>) => {
    setImages(prev => {
      const next = prev.map(i => i.id === id ? { ...i, ...patch } : i)
      try { sessionStorage.setItem('vr_images', JSON.stringify(next)) } catch { /* ignore */ }
      return next
    })
  }, [])

  const mergeImageIntoQuote = useCallback((srcImageId: string, quoteBlockId: string) => {
    setBlocks(prev => {
      const q = prev.find(b => b.id === quoteBlockId)
      const src = prev.find(b => b.slots.some(s => s.imageId === srcImageId))
      const isImg = (t: string) => t === 'full' || t === 'pair' || t === 'trio'
      if (!q || !src || q.type !== 'quote' || !isImg(src.type)) return prev
      const newQuote: Block = { ...q, type: 'side', slots: [{ imageId: srcImageId }], sideTextType: 'quote' }
      const srcRest = (src.slots.map(s => s.imageId).filter(Boolean) as string[]).filter(id => id !== srcImageId)
      const next = prev.flatMap(b => {
        if (b.id === q.id) return [newQuote]
        if (b.id === src.id) {
          if (srcRest.length === 0) return []
          const srcType: BlockType = srcRest.length === 1 ? 'full' : srcRest.length === 2 ? 'pair' : 'trio'
          return [{ ...b, type: srcType, slots: srcRest.map(id => ({ imageId: id })) }]
        }
        return [b]
      })
      try { sessionStorage.setItem('vr_blocks', JSON.stringify(next)) } catch { /* ignore */ }
      return next
    })
  }, [])

  const mergeQuoteIntoFull = useCallback((quoteBlockId: string, fullBlockId: string) => {
    setBlocks(prev => {
      const q = prev.find(b => b.id === quoteBlockId)
      const f = prev.find(b => b.id === fullBlockId)
      if (!q || !f || q.type !== 'quote' || f.type !== 'full') return prev
      const next = prev.flatMap(b => {
        if (b.id === q.id) return []
        if (b.id === f.id) return [{ ...f, type: 'side' as BlockType, quoteText: q.quoteText, quoteAuthor: q.quoteAuthor, textStyle: q.textStyle, sideTextType: 'quote' as const }]
        return [b]
      })
      try { sessionStorage.setItem('vr_blocks', JSON.stringify(next)) } catch { /* ignore */ }
      return next
    })
  }, [])

  const removeBlock = useCallback((blockId: string) => {
    setBlocks(prev => {
      const next = prev.filter(b => b.id !== blockId)
      try { sessionStorage.setItem('vr_blocks', JSON.stringify(next)) } catch { /* ignore */ }
      return next
    })
  }, [])

  const mergeImage = useCallback((srcImageId: string, dstBlockId: string) => {
    setBlocks(prev => {
      const isImg = (t: string) => t === 'full' || t === 'pair' || t === 'trio'
      const dst = prev.find(b => b.id === dstBlockId)
      const src = prev.find(b => b.slots.some(s => s.imageId === srcImageId))
      if (!dst || !src || !isImg(dst.type) || !isImg(src.type)) return prev
      const dstIds = dst.slots.map(s => s.imageId).filter(Boolean) as string[]
      if (dstIds.includes(srcImageId)) return prev
      if (dstIds.length >= 3) return prev
      const newDstIds = [...dstIds, srcImageId]
      const dstType: BlockType = newDstIds.length === 1 ? 'full' : newDstIds.length === 2 ? 'pair' : 'trio'
      const newDst: Block = { ...dst, type: dstType, slots: newDstIds.map(id => ({ imageId: id })) }
      const srcRest = (src.slots.map(s => s.imageId).filter(Boolean) as string[]).filter(id => id !== srcImageId)
      const next = prev.flatMap(b => {
        if (b.id === dst.id) return [newDst]
        if (b.id === src.id) {
          if (srcRest.length === 0) return []
          const srcType: BlockType = srcRest.length === 1 ? 'full' : srcRest.length === 2 ? 'pair' : 'trio'
          return [{ ...b, type: srcType, slots: srcRest.map(id => ({ imageId: id })) }]
        }
        return [b]
      })
      try { sessionStorage.setItem('vr_blocks', JSON.stringify(next)) } catch { /* ignore */ }
      return next
    })
  }, [])

  const health = computeHealth(setup, images, blocks)
  const sendDisabled = blocks.length === 0

  // Avant hydratation : shell visible (écran vide = div sans contenu + attente effet).
  if (!hydrated) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 dark:bg-[#111111] px-6">
        <p className="text-[11px] uppercase tracking-[0.3em] text-gray-400 dark:text-gray-600 mb-5">Vitreen Studio</p>
        <div className="h-1 w-28 rounded-full bg-gray-200 dark:bg-gray-800 overflow-hidden" aria-hidden>
          <div className="h-full w-2/5 rounded-full bg-gray-400 dark:bg-gray-600 animate-pulse" />
        </div>
        <p className="mt-6 text-[13px] text-gray-500 dark:text-gray-400">Chargement…</p>
      </div>
    )
  }

  // Hero state
  if (images.length === 0) {
    return <HeroEntry onUpload={handleHeroUpload} />
  }

  // Canvas state — flex + min-h-0 : scroll fiable (évite zone vide type « écran blanc » avec absolute/inset-0).
  return (
    <div className="min-h-screen min-h-[100dvh] flex flex-col bg-gray-50 dark:bg-[#111111] relative">
      <main className="flex-1 min-h-0 overflow-y-auto">
        <ViewingRoomPreview
          setup={setup}
          images={images}
          blocks={blocks}
          isPro={isPro}
          noOffset
          blockEnter={shouldAnimate}
          onUpdateSetup={saveSetup}
          onUpdateBlock={updateBlock}
          onUpdateImage={updateImage}
          onMergeImage={mergeImage}
          onMergeImageIntoQuote={mergeImageIntoQuote}
          onMergeQuoteIntoFull={mergeQuoteIntoFull}
          onInsertTextBlock={insertTextBlock}
          onInsertImageBlock={insertImageBlock}
          onRemoveBlock={removeBlock}
        />
      </main>

      <HealthPill {...health} />

      <ActionBar
        onAddImages={handleAddImages}
        onAddText={() => insertTextBlock(blocks.length, 'text')}
        onSend={() => setExportOpen(true)}
        recipientName={setup.recipientName}
        sendDisabled={sendDisabled}
      />

      {/* Top-right utilities — auth + theme */}
      <div className="fixed top-4 right-4 z-30 flex items-center gap-2 vr-shell-fade">
        {clerkEnabled && (
          isSignedIn
            ? <UserButton appearance={{ elements: { avatarBox: 'w-7 h-7' } }} />
            : <a href="https://vitreen.art/sign-in" className="text-[12px] text-white bg-gray-900 hover:bg-gray-700 transition-colors px-4 py-2 rounded-full">Sign in</a>
        )}
        <ThemeToggle />
      </div>

      <ExportPanel
        open={exportOpen}
        onClose={() => setExportOpen(false)}
        blocks={blocks}
        images={images}
        setup={setup}
        onPaywall={() => { setPaywallReason('export_limit'); setPaywallOpen(true) }}
        onChangeSetup={saveSetup}
      />

      {paywallOpen && (
        <SubscriptionModal reason={paywallReason} onClose={() => setPaywallOpen(false)} />
      )}
    </div>
  )
}
