'use client'
import { useState, useEffect, useRef } from 'react'

export const dynamic = 'force-dynamic'

type Status = 'draft' | 'sent' | 'opened' | 'replied' | 'sold'
type Row = {
  id: string
  recipient: string
  email: string
  title: string
  artworks: number
  value: number
  status: Status
  updated: string
  selected?: boolean
}

const SEED: Row[] = [
  { id: '1',  recipient: 'Jean Dupont',         email: 'jean@collector.com',        title: 'Spring Selection — Levy, Marot, Renard',  artworks: 6, value: 84000,  status: 'opened',  updated: '2h ago' },
  { id: '2',  recipient: 'Marina Forster',      email: 'm.forster@gallerist.de',    title: 'Etienne Marot · solo selection',           artworks: 4, value: 36000,  status: 'replied', updated: '1d ago' },
  { id: '3',  recipient: 'Aki Tanaka',          email: 'aki@kyotoprivate.jp',       title: 'New paper works — Renard',                  artworks: 3, value: 18000,  status: 'sold',    updated: '3d ago' },
  { id: '4',  recipient: 'Lisa & Marc Berger',  email: 'lisa@bergercollection.ch',  title: 'Anna Levy · early & recent',                artworks: 8, value: 142000, status: 'sent',    updated: '5h ago' },
  { id: '5',  recipient: 'Hiroshi Sato',        email: 'sato.h@artmuseum.org',      title: 'Group · figurative spectral',               artworks: 5, value: 0,      status: 'draft',   updated: 'just now' },
  { id: '6',  recipient: 'Pauline Roche',       email: 'p@rocheprivate.fr',         title: 'Sculpture small format',                    artworks: 11, value: 96000,  status: 'opened',  updated: '8h ago' },
  { id: '7',  recipient: 'Damien Lefèvre',      email: 'damien@lefevreart.com',     title: 'Marot — large works',                       artworks: 2, value: 22000,  status: 'sent',    updated: '12h ago' },
  { id: '8',  recipient: 'Sofia Karolyi',       email: 's.karolyi@privatebanking.eu',title: 'Curated for living room east',              artworks: 7, value: 64000,  status: 'replied', updated: '4d ago' },
]

const STATUS: Record<Status, { dot: string; label: string; color: string }> = {
  draft:   { dot: 'bg-zinc-400',     label: 'Draft',    color: 'text-zinc-500' },
  sent:    { dot: 'bg-blue-500',     label: 'Sent',     color: 'text-blue-600' },
  opened:  { dot: 'bg-amber-500',    label: 'Opened',   color: 'text-amber-700' },
  replied: { dot: 'bg-violet-500',   label: 'Replied',  color: 'text-violet-700' },
  sold:    { dot: 'bg-emerald-500',  label: 'Sold',     color: 'text-emerald-700' },
}

const fmt = (n: number) => n === 0 ? '—' : '€ ' + n.toLocaleString('en-US')

export default function DeskEditor() {
  const [rows, setRows] = useState<Row[]>(SEED)
  const [selected, setSelected] = useState<string | null>(null)
  const [filter, setFilter] = useState<Status | 'all'>('all')
  const [search, setSearch] = useState('')
  const [palette, setPalette] = useState(false)
  const [paletteQuery, setPaletteQuery] = useState('')
  const palRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    const h = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') { e.preventDefault(); setPalette(p => !p) }
      if (e.key === 'Escape') { setPalette(false); setSelected(null) }
      if (e.key.toLowerCase() === 'n' && !selected && !palette && document.activeElement?.tagName !== 'INPUT') {
        e.preventDefault()
        const id = Math.random().toString(36).slice(2)
        setRows(r => [{ id, recipient: '', email: '', title: '', artworks: 0, value: 0, status: 'draft', updated: 'just now' }, ...r])
        setSelected(id)
      }
    }
    window.addEventListener('keydown', h)
    return () => window.removeEventListener('keydown', h)
  }, [selected, palette])

  useEffect(() => { if (palette) palRef.current?.focus() }, [palette])

  const visible = rows.filter(r =>
    (filter === 'all' || r.status === filter) &&
    (!search || (r.recipient + r.email + r.title).toLowerCase().includes(search.toLowerCase()))
  )

  const setRow = (id: string, patch: Partial<Row>) => setRows(rs => rs.map(r => r.id === id ? { ...r, ...patch, updated: 'just now' } : r))
  const send = (id: string) => setRow(id, { status: 'sent' })

  const counts: Record<Status | 'all', number> = { all: rows.length, draft: 0, sent: 0, opened: 0, replied: 0, sold: 0 }
  rows.forEach(r => counts[r.status]++)

  return (
    <div className="min-h-screen bg-zinc-50 text-zinc-900" style={{ fontFamily: 'ui-sans-serif, -apple-system, "Inter", sans-serif' }}>
      {/* Top chrome */}
      <header className="border-b border-zinc-200 bg-white">
        <div className="px-6 py-3 flex items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="text-[14px] font-semibold tracking-tight">Vitreen Desk</div>
            <span className="text-zinc-300">/</span>
            <span className="text-[13px] text-zinc-500">Viewing rooms</span>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={() => setPalette(true)} className="flex items-center gap-2 px-2.5 py-1.5 text-[12px] text-zinc-500 hover:text-zinc-900 border border-zinc-200 rounded-md hover:border-zinc-400 transition">
              <span>Search</span><span className="font-mono text-[10px] bg-zinc-100 px-1.5 py-0.5 rounded">⌘ K</span>
            </button>
            <button onClick={() => {
              const id = Math.random().toString(36).slice(2)
              setRows(r => [{ id, recipient: '', email: '', title: '', artworks: 0, value: 0, status: 'draft', updated: 'just now' }, ...r])
              setSelected(id)
            }} className="px-3 py-1.5 text-[12px] font-medium bg-zinc-900 text-white rounded-md hover:bg-zinc-700 transition flex items-center gap-1.5">
              New room <span className="font-mono text-[10px] opacity-60">N</span>
            </button>
          </div>
        </div>
        <div className="px-6 pb-2 flex items-center gap-1 text-[12px]">
          {(['all','draft','sent','opened','replied','sold'] as const).map(s => (
            <button key={s} onClick={() => setFilter(s)}
              className={`px-2.5 py-1 rounded-md flex items-center gap-1.5 transition ${filter === s ? 'bg-zinc-900 text-white' : 'text-zinc-500 hover:text-zinc-900 hover:bg-zinc-100'}`}>
              {s !== 'all' && <span className={`w-1.5 h-1.5 rounded-full ${STATUS[s as Status].dot}`} />}
              <span className="capitalize">{s}</span>
              <span className={`tabular-nums text-[11px] ${filter === s ? 'opacity-60' : 'text-zinc-400'}`}>{counts[s]}</span>
            </button>
          ))}
        </div>
      </header>

      {/* Table */}
      <div className="px-6 pt-4">
        <div className="bg-white border border-zinc-200 rounded-lg overflow-hidden">
          <div className="grid grid-cols-[24px_1fr_2fr_60px_110px_100px_90px_60px] gap-3 px-4 py-2.5 border-b border-zinc-200 text-[10px] uppercase tracking-wider text-zinc-400 font-medium">
            <div></div>
            <div>Recipient</div>
            <div>Subject</div>
            <div className="text-right tabular-nums">Works</div>
            <div className="text-right tabular-nums">Value</div>
            <div>Status</div>
            <div>Updated</div>
            <div></div>
          </div>
          {visible.length === 0 ? (
            <div className="px-4 py-12 text-center text-[13px] text-zinc-400">No rooms match. Press <span className="font-mono text-[11px] bg-zinc-100 px-1 rounded">N</span> to start one.</div>
          ) : visible.map(r => (
            <Row key={r.id} row={r} expanded={selected === r.id} onSelect={() => setSelected(s => s === r.id ? null : r.id)} onChange={p => setRow(r.id, p)} onSend={() => send(r.id)} />
          ))}
        </div>
        <div className="text-[11px] text-zinc-400 mt-3 px-1 flex items-center gap-4">
          <span><span className="font-mono">N</span> new · <span className="font-mono">↵</span> open · <span className="font-mono">⌘K</span> search · <span className="font-mono">esc</span> close</span>
          <span className="ml-auto tabular-nums">{visible.length} of {rows.length}</span>
        </div>
      </div>

      {/* Command palette */}
      {palette && (
        <div className="fixed inset-0 bg-zinc-900/30 backdrop-blur-sm z-50 flex items-start justify-center pt-32 px-4" onClick={() => setPalette(false)}>
          <div className="bg-white w-full max-w-[560px] rounded-xl shadow-2xl overflow-hidden border border-zinc-200" onClick={e => e.stopPropagation()}>
            <input ref={palRef} value={paletteQuery} onChange={e => setPaletteQuery(e.target.value)} placeholder="Search recipient, subject, or type a command…"
              className="w-full px-4 py-3.5 text-[14px] outline-none border-b border-zinc-100 placeholder:text-zinc-400" />
            <div className="max-h-[360px] overflow-y-auto py-2">
              {[
                { hint: 'Action', label: 'New viewing room', shortcut: 'N', onClick: () => { setPalette(false); const id = Math.random().toString(36).slice(2); setRows(r => [{ id, recipient: '', email: '', title: '', artworks: 0, value: 0, status: 'draft', updated: 'just now' }, ...r]); setSelected(id) } },
                ...rows.filter(r => !paletteQuery || (r.recipient + r.title).toLowerCase().includes(paletteQuery.toLowerCase())).slice(0, 6).map(r => ({
                  hint: 'Room', label: `${r.recipient} — ${r.title}`, shortcut: '↵', onClick: () => { setPalette(false); setSelected(r.id); setSearch('') }
                })),
              ].map((it, i) => (
                <button key={i} onClick={it.onClick} className="w-full px-4 py-2 text-left flex items-center gap-3 hover:bg-zinc-100 text-[13px]">
                  <span className="text-[10px] uppercase tracking-wider text-zinc-400 w-12">{it.hint}</span>
                  <span className="flex-1 text-zinc-800 truncate">{it.label}</span>
                  <span className="font-mono text-[10px] text-zinc-400">{it.shortcut}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

function Row({ row, expanded, onSelect, onChange, onSend }: { row: Row; expanded: boolean; onSelect: () => void; onChange: (p: Partial<Row>) => void; onSend: () => void }) {
  const st = STATUS[row.status]
  return (
    <div className={`border-b border-zinc-100 last:border-b-0 transition-colors ${expanded ? 'bg-zinc-50' : 'hover:bg-zinc-50/60'}`}>
      <button onClick={onSelect} className="w-full grid grid-cols-[24px_1fr_2fr_60px_110px_100px_90px_60px] gap-3 px-4 py-2.5 text-left items-center text-[13px]">
        <span className={`w-1.5 h-1.5 rounded-full ${st.dot} mx-auto`} />
        <span className="text-zinc-900 truncate">{row.recipient || <span className="text-zinc-400 italic">no recipient</span>}</span>
        <span className="text-zinc-600 truncate">{row.title || <span className="text-zinc-400 italic">untitled</span>}</span>
        <span className="text-right tabular-nums text-zinc-500">{row.artworks || '—'}</span>
        <span className="text-right tabular-nums text-zinc-700">{fmt(row.value)}</span>
        <span className={`text-[11px] uppercase tracking-wider font-medium ${st.color}`}>{st.label}</span>
        <span className="text-[11px] text-zinc-400">{row.updated}</span>
        <span className="text-[12px] text-zinc-300 text-right">{expanded ? '−' : '＋'}</span>
      </button>
      {expanded && (
        <div className="px-4 pb-4 pt-2 grid grid-cols-2 gap-3 text-[12px] bg-zinc-50">
          <div className="space-y-2">
            <Field label="Recipient name"><input value={row.recipient} onChange={e => onChange({ recipient: e.target.value })} placeholder="Jean Dupont" className="cell" /></Field>
            <Field label="Email"><input value={row.email} onChange={e => onChange({ email: e.target.value })} placeholder="jean@collector.com" className="cell font-mono text-[12px]" /></Field>
            <Field label="Subject"><input value={row.title} onChange={e => onChange({ title: e.target.value })} placeholder="Spring selection" className="cell" /></Field>
          </div>
          <div className="space-y-2">
            <Field label="Artworks"><input type="number" value={row.artworks || ''} onChange={e => onChange({ artworks: parseInt(e.target.value) || 0 })} placeholder="0" className="cell tabular-nums" /></Field>
            <Field label="Value (EUR)"><input type="number" value={row.value || ''} onChange={e => onChange({ value: parseInt(e.target.value) || 0 })} placeholder="0" className="cell tabular-nums" /></Field>
            <div className="flex items-end justify-end gap-2 pt-2">
              <button className="px-3 py-1.5 text-[12px] text-zinc-600 hover:text-zinc-900 border border-zinc-300 rounded-md bg-white hover:bg-zinc-50">Open editor</button>
              <button onClick={onSend} disabled={row.status !== 'draft'} className="px-3 py-1.5 text-[12px] font-medium bg-zinc-900 text-white rounded-md hover:bg-zinc-700 disabled:opacity-40 disabled:cursor-not-allowed">Send →</button>
            </div>
          </div>
          <style jsx>{`.cell { width:100%; padding:6px 10px; background:white; border:1px solid #e4e4e7; border-radius:6px; outline:none; font-size:13px; }.cell:focus { border-color: #18181b; }`}</style>
        </div>
      )}
    </div>
  )
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="text-[10px] uppercase tracking-wider text-zinc-400 font-medium block mb-1">{label}</span>
      {children}
    </label>
  )
}
