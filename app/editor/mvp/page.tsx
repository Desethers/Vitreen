'use client'

export const dynamic = 'force-dynamic'

const VARIANTS = [
  {
    slug: 'canvas',
    name: 'Canvas',
    tag: 'Direct manipulation',
    bigIdea: 'No editor chrome. The viewing room IS the canvas. Everything is editable in place. The artifact you compose is exactly the artifact the collector receives.',
    before: 'Lands on a fully composed sample room — placeholders are filled with realistic content so the gallerist sees the destination, not a blank form.',
    during: 'Click any text, edit. Drop images on the page. Subtle hover affordances reveal what is editable. A sticky top bar keeps "you are sending to ___" inescapable.',
    after: 'A single Send button in the top bar. Confirm modal. Done.',
    forWho: 'Galleries that obsess over taste and want to compose with their hands, not configure with a form.',
    bg: '#FAF6EE',
    fg: '#1C1814',
    serif: true,
  },
  {
    slug: 'desk',
    name: 'Desk',
    tag: 'Operator mode',
    bigIdea: 'For galleries that send 20+ viewing rooms a month. A Linear/Notion-grade table with bulk operations, command palette, status tracking (Draft / Sent / Opened / Replied / Sold), and inline composition. Keyboard-first.',
    before: 'A list of every viewing room you have ever sent. Filter by status. Cmd+K to search anything. Press N to start a new one.',
    during: 'Click a row to expand inline — fill in fields, set value, attach. No context-switching to another page.',
    after: 'Send button per row. Status updates as the collector opens, replies, buys.',
    forWho: 'Mid-to-large galleries. Anyone who treats viewing-room sending as a sales pipeline, not a one-off.',
    bg: '#FAFAFA',
    fg: '#0A0A0A',
    serif: false,
  },
  {
    slug: 'pocket',
    name: 'Pocket',
    tag: 'Compose-where-they-read',
    bigIdea: 'Collectors open viewing rooms on their phone — not desktop. So compose ON a real iPhone-shaped surface. The desktop chrome holds tools; the phone holds the truth. WYSIWYG to the actual reading device.',
    before: 'Desktop frame with a centered iPhone mockup. Already populated. Section list on the left, edit panel on the right.',
    during: 'Pick a section (cover, note, artworks, signature). Edit on the right panel. The phone preview animates live. Character counters warn when titles overflow on mobile.',
    after: 'Bottom-right send button. Delivers via email, opens on their phone exactly as composed.',
    forWho: 'Galleries who care that 87% of viewing rooms are opened on iPhones. Stop designing for the desktop fantasy.',
    bg: '#1B1A18',
    fg: '#F5C557',
    serif: false,
  },
  {
    slug: 'proof',
    name: 'Proof',
    tag: 'Print catalogue',
    bigIdea: 'Reframes the viewing room as a deluxe printed catalogue. The editor mimics a press proof — crop marks, paper grain, classical typography, page-by-page composition. Exports as both a press-ready PDF and a digital private link.',
    before: 'Sample 6-page proof: cover · letter · 3 plates · colophon. Crop marks visible. Paper feels real.',
    during: 'Click any text on the page to edit. Navigate plates from the left TOC. Add a plate inline. Toggle crop marks for press output.',
    after: 'Two outputs: Export PDF (4MB press-ready) or Send link (digital edition). The collector receives both.',
    forWho: 'Galleries who print catalogues, work with established collectors, sign every email "with my warmest." Material craft signal.',
    bg: '#15110D',
    fg: '#D4A04C',
    serif: true,
  },
  {
    slug: 'studio',
    name: 'Studio',
    tag: 'Voice-led narration',
    bigIdea: 'No typing. The gallerist records audio over each artwork — a 30–90s walking commentary, like the studio visit they would give in person. The collector listens with the image on their phone. Personal, intimate, unforgeable.',
    before: 'Recording stage with the active artwork hero. Track list on the right (each artwork = one track). Top-bar shows recording progress.',
    during: 'Big record button. Hold spacebar or click. Live waveform. Move to the next track. Re-record any.',
    after: 'When all tracks recorded, send. Collector receives a hybrid — image + audio, swipe between works.',
    forWho: 'Galleries who are great in person and want to scale that. Anyone whose voice is their differentiator.',
    bg: '#0A0A0B',
    fg: '#F43F5E',
    serif: false,
  },
] as const

const FRAMING = {
  before: 'The user has a collector in mind. Not browsing. Not exploring. They have one specific person and one specific message.',
  during: 'The composition itself. Where most viewing-room tools fail — too many fields, too generic, too much like a CMS.',
  after: 'The send moment. Confirm, then ship. The collector opens it, replies, perhaps buys. Status feedback closes the loop.',
}

export default function MvpIndex() {
  return (
    <div className="min-h-screen bg-zinc-50 text-zinc-900 py-14 px-8" style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", "Inter", sans-serif' }}>
      <div className="max-w-[1240px] mx-auto">
        <div className="mb-12 max-w-[760px]">
          <div className="text-[10px] uppercase tracking-[0.32em] text-zinc-500 mb-3">vitreen / editor / mvp explorations · v2</div>
          <h1 className="text-[44px] font-semibold tracking-tight leading-[1.05] mb-5">5 radical ways to compose a private viewing room.</h1>
          <p className="text-[16px] text-zinc-600 leading-relaxed">
            Same job. Same data. Each variant takes a different stance on what kind of tool this should be.
            One is a hand-craft canvas. One is a sales pipeline. One is a pocket-first preview.
            One is a printed catalogue. One is voice. None of them is a form.
          </p>
        </div>

        {/* Universal framing */}
        <div className="mb-10 grid grid-cols-3 gap-5 text-[12px] text-zinc-600 leading-relaxed">
          <div><div className="text-[10px] uppercase tracking-wider text-zinc-400 mb-1.5">Before · the entry context</div>{FRAMING.before}</div>
          <div><div className="text-[10px] uppercase tracking-wider text-zinc-400 mb-1.5">During · the composition</div>{FRAMING.during}</div>
          <div><div className="text-[10px] uppercase tracking-wider text-zinc-400 mb-1.5">After · the send</div>{FRAMING.after}</div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          {VARIANTS.map(v => (
            <a key={v.slug} href={`/editor/${v.slug}`}
              className="group block rounded-2xl overflow-hidden border border-zinc-200 hover:border-zinc-900 hover:shadow-[0_30px_80px_-30px_rgba(0,0,0,0.25)] transition-all">
              <div className="px-7 py-7 flex items-center justify-between" style={{ background: v.bg, color: v.fg, fontFamily: v.serif ? '"EB Garamond", Georgia, serif' : 'inherit' }}>
                <div>
                  <div className="text-[10px] uppercase tracking-[0.32em] opacity-70">/editor/{v.slug}</div>
                  <div className="text-[40px] font-medium tracking-tight mt-1.5 leading-none" style={{ fontStyle: v.serif ? 'italic' : 'normal' }}>{v.name}</div>
                  <div className="text-[12px] mt-2 opacity-70 italic">{v.tag}</div>
                </div>
                <div className="text-[20px] opacity-50 group-hover:opacity-100 group-hover:translate-x-1 transition">→</div>
              </div>
              <div className="bg-white p-7 space-y-5">
                <p className="text-[15px] text-zinc-900 leading-snug font-medium">{v.bigIdea}</p>
                <div className="grid grid-cols-3 gap-4 text-[12px] leading-relaxed pt-1">
                  <div>
                    <div className="text-zinc-400 uppercase tracking-wider text-[9px] mb-1">Before</div>
                    <div className="text-zinc-700">{v.before}</div>
                  </div>
                  <div>
                    <div className="text-zinc-400 uppercase tracking-wider text-[9px] mb-1">During</div>
                    <div className="text-zinc-700">{v.during}</div>
                  </div>
                  <div>
                    <div className="text-zinc-400 uppercase tracking-wider text-[9px] mb-1">After</div>
                    <div className="text-zinc-700">{v.after}</div>
                  </div>
                </div>
                <div className="pt-3 mt-2 border-t border-zinc-100 text-[12px] text-zinc-500 italic leading-relaxed">For: {v.forWho}</div>
              </div>
            </a>
          ))}
        </div>

        <div className="mt-14 text-center text-[12px] text-zinc-400 space-y-1">
          <div>Branch: <code className="font-mono text-zinc-600">editor-mvp-variants</code> · all 5 variants live with seeded sample content</div>
          <div><a href="/editor" className="underline hover:text-zinc-900">↩ back to current /editor</a></div>
        </div>
      </div>
    </div>
  )
}
