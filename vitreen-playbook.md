# Vitreen Playbook

## Purpose

This document is the strategic and product context for Vitreen.

Read it at the beginning of every Claude, ChatGPT or Codex session before making
product, UX, copywriting or implementation decisions.

It replaces the previous "Gallery OS" playbook. If you find older material
describing Vitreen as a Gallery OS, a four-pillar platform, or a
website-and-dashboard delivery service, that material is obsolete — this
document overrides it.

---

# 1. Product Thesis — the inversion

Vitreen sells **AI agents connected to a gallery's artwork inventory**, working
inside the tools where collector conversations already happen: Gmail and
WhatsApp.

The single most important idea in this document:

```text
Yesterday: the dashboard was the product, the agent was a feature.
Today:     the agent is the product, the dashboard is its engine room.
```

This inversion is commercial, not technical. The artwork database still exists,
still matters, and still has to be excellent — but it is no longer what we sell,
show, or name.

## Why the data layer cannot be removed

The agent is only worth something because it is grounded on a clean artwork
base. It answers from real records: real prices, real availability, real
provenance, real images.

Remove that layer and Vitreen becomes a GPT wrapper that anyone can copy in a
weekend.

Keep it invisible in the pitch, keep it excellent in the product. That tension
is the whole strategy:

> The database is our moat, not our promise.

---

# 2. Positioning

## Main positioning

> Vitreen connects AI agents to a gallery's artwork inventory and turns existing
> data into collector-ready emails, selections and PDFs, inside Gmail and
> WhatsApp.

Brand line (currently on the site):

> **Give your gallery superpowers.**

## Relationship to Artlogic and other incumbents

Vitreen is **complementary**, not a replacement:

> Artlogic stores your works. Vitreen makes them circulate in your sales
> conversations.

Vitreen connects to whatever exists — Artlogic exports, spreadsheets, folders,
an existing database — or builds the artwork base when a gallery has none.

Honesty rule: as long as no native Artlogic sync exists, write "from your
Artlogic exports", never "Artlogic integration". A complementarity claim that
collapses on the first technical question in a demo destroys more trust than it
creates.

## Preferred language

Use:

- AI agents for gallery sales
- your artwork inventory, connected
- collector-ready emails, selections and PDFs
- inside Gmail and WhatsApp
- grounded in your records
- prepared by AI, sent by your team
- works alongside Artlogic
- the commercial layer of the gallery

Avoid:

- **Gallery OS** (retired — see §4)
- all-in-one platform, operating system, suite
- CMS, website builder, inventory software
- database as a headline promise
- AI-powered everything, autopilot, autonomous outreach
- marketplace, CRM replacement
- "Artlogic alternative" as the primary framing

---

# 3. The three visible surfaces

What a customer sees, uses, and pays for is exactly three things:

### 1. The Gmail add-in

Search the inventory from inside an email. Insert artwork cards, a private link
or a PDF into the message being written. Or let the agent draft the full reply
from the incoming email.

### 2. WhatsApp Business

Natural-language requests turned into material: "available works by Marina Perez
under €20,000", "create a selection with these four works", "prepare a PDF
without visible prices" — answered with a clean private link or PDF.

### 3. The validation inbox

The drafts queue (`/dashboard/sales-drafts` today) becomes the **home screen of
the app**, renamed Inbox or Drafts. It is where the gallery reviews what the
agent prepared and clicks send.

Everything else in the product sits behind these three surfaces.

---

# 4. The engine room

The dashboard formerly known as Gallery OS becomes a console: minimal,
functional, unnamed.

## Visible navigation

1. **Inbox** — AI drafts waiting for validation. This is the landing screen.
2. **Artworks** — the base, presented as "your data", never as an inventory
   product.
3. **Connections** — CSV/Excel import, Artlogic exports, add-in status.
4. **Settings**

## Hidden by default

Website publisher, viewing rooms, exhibition modules: hidden behind feature
flags. Enabled for existing clients and for the Connected Website extension.

**Nothing is deleted. Nothing is forked.** Modules are hidden by configuration —
one shared codebase, always. A separate "agent-only" build would be a
maintenance disaster and is forbidden.

A new client must never see something that looks like an OS.

## The home screen test

The dashboard home must answer:

> How many conversations did the agent prepare for me this week?

Not:

> How many artworks are in my base?

If the first screen counts records instead of conversations, the inversion has
failed.

---

# 5. Offer & packaging — one ladder, two rungs

The offer is a **vertical ladder**, not a catalogue. Same product, same
inventory, two levels of help. This is what keeps it undilutable: a ladder
cannot spread sideways the way a list of bricks can.

```text
Inventory → Conversation.
Send: you write, faster.    Agent: it writes, you approve.
```

## Rung 1 — Vitreen Send · €450/month

> Your artworks, ready to send from Gmail and WhatsApp.

- Gmail and WhatsApp add-ins
- Natural-language search across the inventory
- Private selections and PDF export
- Artwork data connected (Artlogic exports, spreadsheets, existing database)

## Rung 2 — Vitreen Agent · €950/month

> The reply is already drafted when you open the email.

Everything in Send, plus:

- Collector replies drafted from the incoming email
- Alternatives proposed when a work is sold
- Price-on-request discretion handled automatically
- Answers in the collector's language
- Nothing sends without a human click

**Both include a €4,500 one-time onboarding** — structuring the inventory. It is
the same work either way, and it is mandatory: the add-ins are only as precise
as the records behind them. 12-month partnership, hosting and support included.

> These figures are what the marketing site shows today. They still need a final
> business validation — treat them as the current public numbers, not as a
> settled decision.

## Why Send must not look crippled

In 2026, a tier advertised as "the one without AI" reads as the crippled
version, and everyone waits for the other. So **both rungs carry AI** —
natural-language search and generated material are in Send. The gap is not
intelligence versus none; it is:

> "It helps me" versus "it works for me."

Never describe Send as the manual, basic or limited plan.

## Services, below the ladder

Sold separately, listed small, never given a card that competes with the rungs:

- **Connected Website** — a site built on the same inventory, for galleries that
  need one. Fixed scope, quoted after a first conversation. Always paired with
  the de-escalation line: "Already have a site? Vitreen works alongside it."
- **AI Coaching** — hands-on sessions bringing AI into daily gallery work. From
  €400 per session. Its credibility comes from the product: _taught by the team
  that builds AI for galleries_. Not generic consulting, and it must never
  develop an autonomous "AI transformation" discourse — that would cannibalise
  the brand.

## Hierarchy rule

Two rungs, then services. Never four equal cards, never a grid that lets the
website or coaching sit at the same weight as the ladder.

---

# 5b. AI positioning

> **Vitreen builds AI agents for art sales — grounded in the gallery's own
> inventory, working inside Gmail and WhatsApp, and never sending anything on
> their own.**

Three pillars. Each one is a differentiator no one in the art market can copy
without building the same data layer first:

**Grounded, not generative.** The agent answers only from the gallery's records.
It never invents a price, an availability or a provenance. Use the contrast:
most AI knows everything about the world and nothing about you; this one knows
only your works — which is exactly the point.

**Embedded, not another app.** It works inside Gmail and WhatsApp. No gallery
wants one more chat window to open.

**Assisted, not autonomous.** Nothing reaches a collector without a human click.
This is not a technical limitation, it is the promise: the gallery keeps its own
voice with its collectors.

---

# 6. Onboarding — inverted

The old onboarding said "we build your system". The new one delivers the agent.

1. **Connect the inventory** — CSV, Excel, Artlogic export, or build the base.
2. **Install the Gmail add-in.**
3. **Connect WhatsApp Business.**
4. **First draft generated on a real email.**

Step 4 is the aha moment. It must happen on **day one**, not in week three.

The database appears only as step 1 of a setup. It is never a destination.

---

# 7. The Sales Agent — what actually runs

Built and working (`gallery-OS/dashboard/src/lib/sales-agent/`):

- **Trigger** — an incoming collector email (add-in webhook or manual
  generation) passes a purchase-intent filter before anything runs.
- **Grounded generation** — a Groq-powered agent (`openai/gpt-oss-120b`, tool
  loop) works exclusively from gallery data through tools: contact lookup,
  artwork details, search, similar works, recent inquiries, gallery settings. It
  never invents a price, an availability or an artwork.
- **Output** — a typed draft reply in the sender's language (fr/en/de/es/it/zh),
  with VIP tone handling, sold-work alternatives and price-on-request
  discretion, queued in the drafts inbox.
- **Human validation, always** — a draft becomes `sent` only after an explicit
  human click (delivery via Resend). There is no autopilot, by design.

This is demonstrable live. It is the strongest asset we have: most AI landing
pages cannot show anything.

---

# 8. Claims discipline

Non-negotiable:

- **Never** claim autonomous sending, autopilot, or proactive outreach. The
  agent prepares, a human sends. Frame this as a **selling point** — the gallery
  keeps control of its collector voice — never as a limitation.
- **Never** claim the AI knows anything beyond the gallery's own records.
  "It can only answer from your records" is the central argument, not model
  power.
- **Never** claim "better sales" or conversion impact before it is measured
  across pilots. Sell **autonomy** (verifiable at delivery), **accuracy** (daily
  proof) and **speed of reply** (observable). Time saved is support, not
  headline.
- Roadmap capabilities (long-term follow-up memory, proactive outreach) are
  announced as roadmap or not at all.

---

# 9. Open workstream — turning the dashboard into the engine room

**Status: planned, not started.** The marketing site already tells the new
story; the product does not yet. Until this workstream ships, a prospect who
sees a demo still meets "Gallery OS". Closing that gap is the priority.

**Where:** `gallery-OS/dashboard/` — a separate repository, not present in the
marketing workspace. This work must be done in a session opened on that repo.

## Guardrails (apply to every phase)

- **Never fork.** No "agent-only" build, no per-client branch. Everything is
  feature flags and configuration on one shared codebase. A fork would be a
  maintenance disaster and is forbidden.
- **Delete nothing.** Modules are hidden, not removed. Existing clients keep
  what they have; the Connected Website extension re-enables the publisher.
- **No schema change in phase 1.** If a task seems to require one, it belongs to
  phase 2.
- Keep the human validation step visible everywhere the agent appears.

## Phase 1 — configuration (days)

1. **Inbox as home screen.** The drafts queue (`/dashboard/sales-drafts`)
   becomes the landing route after login, renamed Inbox (or Drafts).
2. **Reduce the navigation** to four entries: Inbox, Artworks, Connections,
   Settings. Artworks is presented as "your data", never as an inventory
   product.
3. **Hide behind flags:** website publisher, viewing rooms, exhibition modules.
   Default off for new clients, on for existing ones and for the Connected
   Website extension.
4. **Retire the name.** "Gallery OS" disappears from the dashboard, the add-ins,
   the docs and the onboarding emails. (Already done on the marketing site — the
   Gmail widget displays "Vitreen"; note the function is still named
   `GalleryOsSearchWidget` in `components/shared/ArtworkAddInMocks.tsx` and
   should be renamed on the next pass.)

Definition of done: a new client logging in sees a queue of drafts to review and
nothing that looks like an operating system.

## Phase 2 — product

1. **Invert the onboarding:** connect the inventory (CSV, Excel, Artlogic
   export) → install the Gmail add-in → connect WhatsApp Business → **first
   draft generated on a real email**. That last step is the aha moment and must
   land on day one, not in week three. A `ConnectInventoryMockup` already exists
   on the marketing side as a visual reference for step 1.
2. **Self-service WhatsApp Business connection**, so onboarding no longer
   depends on us.
3. **Usage metrics:** drafts generated, drafts validated, artworks shared,
   time-to-first-reply. These are the product's health signals _and_ the ARR
   narrative for any future acquisition conversation — instrument them early.
4. **Rework the home screen** so it answers "how many conversations did the
   agent prepare this week?" rather than "how many artworks are in my base?".

## Phase 3 — offer

Migrate the commercial discourse and the pilot clients onto the single SKU. The
publisher is only ever sold as an extension from that point on. Retire or
recentre the remaining marketing pages still written in the old frame
(`/pricing`, `/about`, `/products/*`, `/solutions/*`).

---

# 10. Target customer

Small contemporary galleries.

They have limited technical capacity, fragmented artwork information, strong
sensitivity to image and wording, small teams, and little time for software
setup.

They do not want a database. They want to answer a collector faster, with the
right work, the right price and material that looks like their gallery.

Speak gallery, not software.

---

# 11. Delivery discipline

- **One shared codebase. No per-client forks, ever.** Differences are
  configuration, not code.
- Customization budget: max 20% of delivery time per gallery (theme, visible
  fields, PDF formats). Core schema, agent grounding logic and relationships are
  never customized.
- If a client's custom demands exceed the budget, that is a signal to refuse the
  client, not to work more.

---

# 12. Design principles

1. **Simple before powerful.** The interface must feel simple to a
   non-technical gallery user.
2. **Database without database anxiety.** Structured data, no enterprise
   database feel.
3. **Work with existing habits.** Email, WhatsApp, PDFs, spreadsheets — connect
   to them instead of replacing them.
4. **Controlled outputs.** Galleries care about discretion: what is visible,
   which price shows, whether availability appears, public or private.
5. **Gallery-native, editorial, calm.** White space, restrained typography,
   clear hierarchy, subtle interactions. No gradients, no fake complexity, no
   decorative bento sections.
6. **Show the human checkpoint.** Wherever the agent appears, the review-and-send
   step should be visible, not merely claimed.

---

# 13. Copywriting rules

Tone: clear, concrete, gallery-native. No abstract SaaS language.

Good:

- Give your gallery superpowers.
- Connect AI agents to your artwork inventory.
- Prepare the reply without leaving the email.
- Turn a message into a presentation.
- Grounded in your records. Sent by your team.
- Artlogic stores your works. Vitreen makes them circulate.

Avoid:

- revolutionize / supercharge / unlock growth / scale your operations
- AI-powered platform, next-generation CMS, all-in-one solution
- seamless end-to-end anything
- any headline whose subject is the database

Headline logic: concrete over visionary.

---

# 14. Product boundaries

## Vitreen does

- connect artwork data from existing sources, or build the base when needed
- run grounded AI agents over that data
- deliver inside Gmail and WhatsApp
- prepare collector replies, private selections and PDFs
- keep a human validation step on everything that reaches a collector
- sell a connected website and AI coaching as separate extensions

## Vitreen does not

- present itself as an operating system, platform or suite
- sell the dashboard as a product
- become a CRM, a marketplace, an accounting system or a website builder
- send anything to a collector without an explicit human click
- fork the codebase per client or per offer
- launch standalone self-serve products beside the main offer
- claim sales impact before it is measured

Frozen until an explicit strategic decision: autopilot (never), standalone
self-serve viewing room studio, assistant capabilities beyond sales drafts.

---

# 15. Where things live

- **Marketing site** — this repository (`Vitreen`). Next.js App Router, EN at
  `app/(en)`, FR at `app/(fr)/fr`, landing components in `components/landing/`.
- **Product** — `gallery-OS/dashboard/` (separate repository, not in this
  workspace). Sales agent at `src/lib/sales-agent/`, drafts queue at
  `/dashboard/sales-drafts`.

Work on the product (navigation flags, renaming, onboarding) must be done in a
session opened on that repository.

---

# 16. Session checklist

1. Does this strengthen the agent, or does it re-expose the dashboard?
2. Does it happen inside Gmail, WhatsApp or the drafts inbox?
3. Is it grounded in the gallery's own records?
4. Does the human validation step remain visible and mandatory?
5. Does it keep the artwork base as infrastructure, not as a promise?
6. Is it one codebase, one SKU, configuration over forks?
7. Are the extensions still visibly subordinate?
8. Are we avoiding SaaS language and the word "Gallery OS"?
9. Can we demonstrate this claim live today?

If any answer is unclear, stop and clarify the product logic before designing or
coding.

---

# 17. North Star

> A small gallery connects its artwork inventory once, then answers every
> collector from Gmail or WhatsApp with the right work, the right price and
> material that looks like the gallery — prepared by an agent, sent by a person.
