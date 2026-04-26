'use client'
import { useState, useEffect, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { DragDropContext, Droppable, Draggable, DropResult, DraggableProvidedDragHandleProps } from '@hello-pangea/dnd'
import StepNav from '@/components/ovr/StepNav'
import ThemeToggle from '@/components/ovr/ThemeToggle'
import type { Block, BlockType, BlockSlot, ImageItem } from '@/lib/ovr/buildTypes'
import { BLOCK_CONFIGS, makeBlock } from '@/lib/ovr/buildTypes'

// ─── Image slot (droppable via HTML5) ────────────────────────────────────────

function Slot({ slot, image, onDrop, onClear }: {
  slot: BlockSlot
  image: ImageItem | undefined
  onDrop: (imageId: string) => void
  onClear: () => void
}) {
  const [over, setOver] = useState(false)

  return (
    <div
      onDragOver={e => { e.preventDefault(); setOver(true) }}
      onDragLeave={() => setOver(false)}
      onDrop={e => {
        e.preventDefault(); setOver(false)
        const id = e.dataTransfer.getData('text/plain')
        if (id) onDrop(id)
      }}
      className={`relative aspect-[3/4] border-2 flex items-center justify-center transition-colors ${
        over ? 'border-blue-400 bg-blue-50 dark:bg-blue-950/20'
        : image ? 'border-transparent'
        : 'border-dashed border-gray-200 dark:border-gray-700'
      }`}
    >
      {image ? (
        <>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={image.dataUrl} alt={image.title || ''} className="w-full h-full object-contain" />
          <button type="button" onClick={onClear}
            className="absolute top-1.5 right-1.5 p-1 bg-white/90 dark:bg-gray-900/90 border border-gray-200 dark:border-gray-700 text-gray-400 hover:text-red-500 transition-colors">
            <svg width="10" height="10" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>
        </>
      ) : (
        <div className="text-center pointer-events-none">
          <svg className="w-5 h-5 mx-auto text-gray-200 dark:text-gray-700 mb-1" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
            <path d="M2.25 15.75l5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909"/>
          </svg>
          <p className="text-[10px] text-gray-300 dark:text-gray-600">Glisser une image</p>
        </div>
      )}
    </div>
  )
}

// ─── Block card ───────────────────────────────────────────────────────────────

function BlockCard({ block, images, expanded, dragHandleProps, onExpand, onDelete, onUpdate }: {
  block: Block
  images: ImageItem[]
  expanded: boolean
  dragHandleProps: DraggableProvidedDragHandleProps | null | undefined
  onExpand: () => void
  onDelete: () => void
  onUpdate: (b: Block) => void
}) {
  const config = BLOCK_CONFIGS[block.type]
  const tagCls = block.type === 'quote'
    ? 'border-amber-200 text-amber-600 bg-amber-50 dark:border-amber-800 dark:text-amber-400 dark:bg-amber-950/20'
    : block.type === 'side'
    ? 'border-blue-200 text-blue-600 bg-blue-50 dark:border-blue-800 dark:text-blue-400 dark:bg-blue-950/20'
    : 'border-gray-200 text-gray-600 dark:border-gray-700 dark:text-gray-400'

  const resolvedImages = block.slots.map(s => images.find(img => img.id === s.imageId))

  const setSlotImage = (i: number, imageId: string | null) => {
    const slots = block.slots.map((s, j) => j === i ? { imageId } : s)
    onUpdate({ ...block, slots })
  }

  return (
    <div className="border border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900">
      {/* Header */}
      <div className="flex items-center gap-3 px-4 py-3">
        <div {...dragHandleProps} className="shrink-0 text-gray-300 dark:text-gray-600 cursor-grab active:cursor-grabbing touch-none">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="currentColor">
            <circle cx="4" cy="3" r="1.2"/><circle cx="4" cy="7" r="1.2"/><circle cx="4" cy="11" r="1.2"/>
            <circle cx="10" cy="3" r="1.2"/><circle cx="10" cy="7" r="1.2"/><circle cx="10" cy="11" r="1.2"/>
          </svg>
        </div>
        <span className="text-xs text-gray-300 dark:text-gray-600 w-4 tabular-nums shrink-0">{/* index via parent */}</span>

        <button type="button" onClick={onExpand} className="flex-1 flex items-center gap-2 text-left min-w-0">
          <span className={`px-2 py-0.5 text-xs border shrink-0 ${tagCls}`}>{config.label}</span>
          {/* Mini previews */}
          <div className="flex gap-1 shrink-0">
            {resolvedImages.filter(Boolean).map((img, i) => (
              // eslint-disable-next-line @next/next/no-img-element
              <img key={i} src={img!.dataUrl} alt="" className="w-5 h-5 object-cover border border-gray-100 dark:border-gray-800" />
            ))}
          </div>
          {block.quoteText && (
            <span className="text-xs text-gray-400 truncate">"{block.quoteText}"</span>
          )}
          <svg className={`w-3 h-3 text-gray-400 ml-auto shrink-0 transition-transform ${expanded ? 'rotate-180' : ''}`}
            fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M19 9l-7 7-7-7"/></svg>
        </button>

        <button type="button" onClick={onDelete}
          className="shrink-0 text-gray-300 hover:text-red-400 dark:text-gray-600 dark:hover:text-red-500 transition-colors">
          <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/>
          </svg>
        </button>
      </div>

      {/* Expanded edit panel */}
      {expanded && (
        <div className="border-t border-gray-100 dark:border-gray-800 px-4 py-4 space-y-4">
          {block.slots.length > 0 && (
            <div className={`grid gap-3 ${
              block.slots.length === 1 ? 'grid-cols-1 max-w-[160px]' :
              block.slots.length === 2 ? 'grid-cols-2' : 'grid-cols-3'
            }`}>
              {block.slots.map((slot, i) => (
                <div key={i}>
                  <Slot
                    slot={slot}
                    image={resolvedImages[i]}
                    onDrop={imageId => setSlotImage(i, imageId)}
                    onClear={() => setSlotImage(i, null)}
                  />
                  {resolvedImages[i] && (
                    <div className="mt-1.5 space-y-0.5">
                      {resolvedImages[i]!.title && (
                        <p className="text-[11px] text-gray-600 dark:text-gray-400 truncate font-medium">{resolvedImages[i]!.title}</p>
                      )}
                      {resolvedImages[i]!.artist && (
                        <p className="text-[10px] text-gray-400 truncate">{resolvedImages[i]!.artist}</p>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          {config.hasQuote && (
            <div className="space-y-2">
              <textarea value={block.quoteText}
                onChange={e => onUpdate({ ...block, quoteText: e.target.value })}
                placeholder={block.type === 'quote' ? 'Texte ou citation…' : 'Texte d\'accompagnement…'}
                rows={4}
                className="w-full px-3 py-2 text-sm bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-gray-100 placeholder:text-gray-400 dark:placeholder:text-gray-600 focus:outline-none focus:border-gray-400 transition-colors resize-none" />
              {block.type === 'quote' && (
                <input value={block.quoteAuthor}
                  onChange={e => onUpdate({ ...block, quoteAuthor: e.target.value })}
                  placeholder="— Auteur (optionnel)"
                  className="w-full px-3 py-2 text-sm bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-gray-100 placeholder:text-gray-400 dark:placeholder:text-gray-600 focus:outline-none focus:border-gray-400 transition-colors" />
              )}
            </div>
          )}
        </div>
      )}
    </div>
  )
}

// ─── Image sidebar ────────────────────────────────────────────────────────────

function ImageSidebar({ images, onGoToImages }: { images: ImageItem[]; onGoToImages: () => void }) {
  return (
    <aside className="w-48 shrink-0 self-start sticky top-[73px]">
      <div className="flex items-center justify-between mb-3">
        <p className="text-xs uppercase tracking-widest text-gray-400">Images</p>
        <button type="button" onClick={onGoToImages}
          className="text-[10px] text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition-colors underline underline-offset-2">
          Modifier
        </button>
      </div>
      {images.length === 0 ? (
        <div className="border-2 border-dashed border-gray-100 dark:border-gray-800 py-6 text-center">
          <p className="text-xs text-gray-400">Aucune image</p>
          <button type="button" onClick={onGoToImages}
            className="text-xs text-blue-500 mt-1 underline underline-offset-2">
            Ajouter →
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-1.5">
          {images.map(img => (
            <div
              key={img.id}
              draggable
              onDragStart={e => {
                e.dataTransfer.setData('text/plain', img.id)
                e.dataTransfer.effectAllowed = 'copy'
              }}
              className="cursor-grab active:cursor-grabbing group relative"
              title={[img.title, img.artist].filter(Boolean).join(' — ')}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={img.dataUrl} alt={img.title || ''} className="w-full aspect-square object-cover border border-gray-100 dark:border-gray-800 group-hover:border-gray-300 dark:group-hover:border-gray-600 transition-colors" />
              {img.title && (
                <p className="text-[9px] text-gray-400 truncate mt-0.5 leading-tight">{img.title}</p>
              )}
            </div>
          ))}
        </div>
      )}
      <p className="text-[10px] text-gray-300 dark:text-gray-700 mt-3">Glissez une image vers un bloc →</p>
    </aside>
  )
}

// ─── Add block bar ────────────────────────────────────────────────────────────

const BLOCK_TYPES: BlockType[] = ['full', 'pair', 'trio', 'side', 'quote']

function AddBlockBar({ onAdd }: { onAdd: (t: BlockType) => void }) {
  return (
    <div className="flex flex-wrap items-center gap-2 mt-4">
      <span className="text-xs text-gray-400 mr-1">+ Ajouter :</span>
      {BLOCK_TYPES.map(type => (
        <button key={type} type="button" onClick={() => onAdd(type)}
          className="px-3 py-1.5 text-xs border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 hover:border-gray-400 dark:hover:border-gray-500 hover:text-gray-900 dark:hover:text-gray-100 transition-colors">
          {BLOCK_CONFIGS[type].label}
        </button>
      ))}
    </div>
  )
}

// ─── Main ─────────────────────────────────────────────────────────────────────

export default function BuildClient() {
  const router = useRouter()
  const [images, setImages] = useState<ImageItem[]>([])
  const [blocks, setBlocks] = useState<Block[]>([])
  const [expandedId, setExpandedId] = useState<string | null>(null)

  useEffect(() => {
    const imgs = sessionStorage.getItem('vr_images')
    const blks = sessionStorage.getItem('vr_blocks')
    if (imgs) { try { setImages(JSON.parse(imgs)) } catch { /* ignore */ } }
    if (blks) { try { setBlocks(JSON.parse(blks)) } catch { /* ignore */ } }
  }, [])

  const saveBlocks = useCallback((next: Block[]) => {
    setBlocks(next)
    try { sessionStorage.setItem('vr_blocks', JSON.stringify(next)) } catch { /* full */ }
  }, [])

  const addBlock = (type: BlockType) => {
    const b = makeBlock(type)
    const next = [...blocks, b]
    saveBlocks(next)
    setExpandedId(b.id)
  }

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) return
    const items = [...blocks]
    const [moved] = items.splice(result.source.index, 1)
    items.splice(result.destination.index, 0, moved)
    saveBlocks(items)
  }

  return (
    <div className="min-h-screen bg-white dark:bg-[#0a0a0a]">
      <header className="sticky top-0 z-10 bg-white/95 dark:bg-[#0a0a0a]/95 backdrop-blur border-b border-gray-100 dark:border-gray-800 px-8 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <h1 className="text-sm font-medium tracking-widest uppercase text-gray-500 dark:text-gray-400">Viewing Room</h1>
          <ThemeToggle />
        </div>
        <StepNav />
        <button
          onClick={() => { try { sessionStorage.setItem('vr_blocks', JSON.stringify(blocks)) } catch { /* ignore */ }; router.push('/ovr/editor/export') }}
          disabled={blocks.length === 0}
          className="px-5 py-2 bg-gray-900 dark:bg-white dark:text-gray-900 text-white text-sm hover:bg-gray-700 dark:hover:bg-gray-100 disabled:opacity-30 transition-colors">
          Exporter →
        </button>
      </header>

      <main className="px-8 py-8">
        <div className="flex gap-8 max-w-5xl mx-auto">
          {/* Sidebar */}
          <ImageSidebar images={images} onGoToImages={() => router.push('/ovr/editor/images')} />

          {/* Builder */}
          <div className="flex-1 min-w-0">
            <div className="flex items-baseline justify-between mb-6">
              <h2 className="text-xl font-serif text-gray-900 dark:text-gray-100">Mise en page</h2>
              <p className="text-xs text-gray-400">{blocks.length} bloc{blocks.length !== 1 ? 's' : ''}</p>
            </div>

            {blocks.length === 0 ? (
              <div className="border-2 border-dashed border-gray-100 dark:border-gray-800 py-20 flex flex-col items-center gap-4">
                <p className="text-sm text-gray-400 dark:text-gray-500">Commencez par ajouter un bloc</p>
                <AddBlockBar onAdd={addBlock} />
              </div>
            ) : (
              <>
                <DragDropContext onDragEnd={onDragEnd}>
                  <Droppable droppableId="blocks">
                    {provided => (
                      <div {...provided.droppableProps} ref={provided.innerRef} className="space-y-2">
                        {blocks.map((block, index) => (
                          <Draggable key={block.id} draggableId={block.id} index={index}>
                            {(provided, snapshot) => (
                              <div ref={provided.innerRef} {...provided.draggableProps}
                                className={snapshot.isDragging ? 'shadow-xl opacity-90' : ''}>
                                <BlockCard
                                  block={block}
                                  images={images}
                                  expanded={expandedId === block.id}
                                  dragHandleProps={provided.dragHandleProps}
                                  onExpand={() => setExpandedId(expandedId === block.id ? null : block.id)}
                                  onDelete={() => {
                                    saveBlocks(blocks.filter(b => b.id !== block.id))
                                    if (expandedId === block.id) setExpandedId(null)
                                  }}
                                  onUpdate={updated => saveBlocks(blocks.map(b => b.id === updated.id ? updated : b))}
                                />
                              </div>
                            )}
                          </Draggable>
                        ))}
                        {provided.placeholder}
                      </div>
                    )}
                  </Droppable>
                </DragDropContext>
                <AddBlockBar onAdd={addBlock} />
              </>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}
