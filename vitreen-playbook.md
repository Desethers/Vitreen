# Vitreen Playbook

## Purpose

This document is the strategic and product context for Vitreen.

Read it at the beginning of every Claude, ChatGPT or Codex session before making
product, UX, copywriting or implementation decisions.

It replaces the previous "Gallery OS" playbook. If you find older material
describing Vitreen as a Gallery OS, a four-pillar platform, a
website-and-dashboard delivery service, or a self-serve SaaS ladder (Vitreen
Send / Vitreen Agent priced as separate monthly tiers), that material is
obsolete — this document overrides it.

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

# 2. What Vitreen is — a founder-led productized service

**Status: current positioning, decided 2026-08.** This section supersedes any
earlier framing of Vitreen as a self-serve SaaS with priced tiers.

## What it is not

- A low-cost SaaS competing head-on with Artlogic or Arternal.
- A generalist digital agency.
- Abstract AI consulting.
- A fully custom forward-deployed-engineering shop, rebuilding software per
  client.
- A different piece of software for every gallery.

## What it is

> An AI-assisted commercial system, installed personally with each gallery,
> from a shared product base.

Every gallery gets the same underlying system. What is personal is the
installation — a solo founder sitting with the gallery, structuring their
inventory, configuring their Gmail and WhatsApp, training their team. What is
shared is the product underneath. Neither half works without the other: pure
software without the personal install is another SaaS a gallery won't trust
with their collector relationships; pure service without the shared product
is an agency, and agencies don't scale to one founder.

## Promise

> **Give your gallery superpowers.**
> We turn your artwork inventory into a practical sales system for Gmail and
> WhatsApp — with AI-assisted replies, selections and PDFs built around the
> way your team works.
> Built personally with each gallery. Powered by a shared Vitreen system.

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

The personal installation is also what keeps Vitreen out of a price war it
cannot win: a gallery does not compare an hour spent with the founder to a
self-serve SaaS line item. Comparing Vitreen to Artlogic on price is the wrong
comparison, and the offer should never invite it.

## Preferred language

Use:

- founder-led, installed personally with your gallery
- AI-assisted sales system
- your artwork inventory, connected
- collector-ready emails, selections and PDFs
- inside Gmail and WhatsApp
- grounded in your records
- prepared by AI, sent by your team
- works alongside Artlogic
- built personally, powered by a shared system

Avoid:

- **Gallery OS** (retired — see §4)
- all-in-one platform, operating system, suite
- CMS, website builder, inventory software
- database as a headline promise
- AI-powered everything, autopilot, autonomous outreach
- marketplace, CRM replacement
- "Artlogic alternative" as the primary framing
- "SaaS", "plan", "tier" as the language of the offer (see §5 — it is one
  engagement, not a subscription ladder)

---

# 3. The three visible surfaces

What a gallery sees and uses, once installed, is exactly three things:

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
flags. Enabled only where the installation calls for them.

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

# 5. The offer — Vitreen Partner

**Status: current pricing doctrine, decided 2026-08.** This replaces the earlier
Send / Agent ladder (€450 and €950 per month as separate SaaS-style tiers).
There is now **one engagement**, not a choice between products.

## Vitreen Partner — a six-month installation

One offer. Everything is included from day one — there is no "which tier"
question in a sales call:

- structuring the artwork inventory
- installing Vitreen
- configuring Gmail and WhatsApp
- building the gallery's own email, selection and PDF formats
- training the team
- adjusting the system against real collector requests as they come in
- a monthly working session
- defined support
- continuous improvement, inside a standardized scope (see §10)

## Reference pricing

> From €950/month for 6 months, then software and support from €250/month.

> These figures are the current reference. They still need final business
> validation — treat them as the working numbers, not as settled.

Read the shape of this, not just the total: the first six months fund the
personal installation work; what remains afterward is a much lighter software
and support fee. The price should visibly step down once the founder's
hands-on time drops — a gallery paying €950/month in month eight, with nothing
being actively installed, is being overcharged, and pricing that behaves that
way will eventually break trust.

## Why one engagement, not a ladder

A ladder invites the question "which tier should I get" — exactly the SaaS
shopping behaviour Vitreen exists to avoid. One engagement, one price, one
conversation: the gallery is deciding whether to work with Vitreen, not which
plan to pick.

---

# 6. Economics of the solo-founder model

This is the reasoning behind §5, kept explicit because every future pricing or
scoping decision should be checked against it.

**The service funds the product.** The six-month engagement price covers the
founder's real installation time. Without it, the product alone (at a SaaS
price) would not cover the hours a gallery actually needs to get set up.

**The product prevents Vitreen from becoming an agency.** Every gallery
installs the same underlying system. The founder's time goes into
configuration, not into building bespoke software per client. Without this, six
months of hands-on work per gallery would just be freelance dev work with
extra steps.

**Personal accompaniment avoids direct comparison with Artlogic.** A relationship
with a founder is not a line item next to a competitor's monthly price. Pure
software pricing invites that comparison; installed, personal, hands-on work
does not.

**Standardized scope protects the founder's time.** See §10. Without a firm
boundary on what gets customized, "personal installation" quietly turns into
unlimited bespoke consulting, and a solo founder cannot serve more than one or
two galleries that way.

Every one of these four points is load-bearing. Weaken one (drop the
installation price to compete on SaaS terms, customize past the boundary for a
demanding client, let the product diverge per client) and the other three stop
holding.

---

# 6b. AI positioning

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

# 7. The six-month arc

What "installed personally" means in practice, in order:

1. **Connect the inventory** — CSV, Excel, Artlogic export, or build the base
   from scratch. This is the first month of the engagement, not a
   self-service step a gallery does alone.
2. **Install the Gmail add-in and connect WhatsApp Business.**
3. **Build the gallery's own formats** — email templates, selection layouts,
   PDF formats, tone.
4. **Train the team.**
5. **First draft generated on a real, live collector email.** This is the aha
   moment. It should land early in the engagement, not at the end.
6. **Adjust against real requests** as they come in, through the monthly
   working session, for the rest of the six months.

The database and the formats exist to make step 5 possible. They are never the
deliverable a gallery is shown as the finish line.

---

# 8. The Sales Agent — what actually runs

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

# 9. Claims discipline

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

# 10. The customization boundary

This is what "standardized scope" (§6) means concretely. It replaces any
earlier vague "20% of delivery time" rule with a direct list.

## You customize

- imports (whatever spreadsheet, export or database a gallery already has)
- the commercial fields that matter to that gallery
- templates (email, selection, PDF)
- tone
- visibility rules (what a collector sees, what stays internal)
- Gmail and WhatsApp workflows

## You do not customize

- the core architecture
- the product as a whole
- the roadmap, for a single client
- tools unrelated to the inventory and to sales conversations

If a client's request falls in the second list, that is a signal to say no, not
a signal to scope a special build. **One shared codebase, no per-client forks,
ever.** A request outside the boundary is a sign to decline the client, not to
expand the boundary.

---

# 11. Design principles

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

# 12. Copywriting rules

Tone: clear, concrete, gallery-native. No abstract SaaS language — Vitreen is
not sold like a SaaS (see §2), so it should not read like one either.

Good:

- Give your gallery superpowers.
- We turn your artwork inventory into a practical sales system for Gmail and
  WhatsApp.
- Built personally with each gallery. Powered by a shared Vitreen system.
- Prepare the reply without leaving the email.
- Turn a message into a presentation.
- Grounded in your records. Sent by your team.
- Artlogic stores your works. Vitreen makes them circulate.

Avoid:

- revolutionize / supercharge / unlock growth / scale your operations
- AI-powered platform, next-generation CMS, all-in-one solution
- seamless end-to-end anything
- any headline whose subject is the database
- "plan", "tier", "subscribe" — this is an engagement, not a subscription pick

Headline logic: concrete over visionary.

---

# 13. Product boundaries

## Vitreen does

- connect artwork data from existing sources, or build the base when needed
- run grounded AI agents over that data
- deliver inside Gmail and WhatsApp
- prepare collector replies, private selections and PDFs
- keep a human validation step on everything that reaches a collector
- install personally with each gallery, on a shared product base

## Vitreen does not

- present itself as an operating system, platform or suite
- sell the dashboard as a product
- become a CRM, a marketplace, an accounting system or a website builder
- become a generalist digital agency or an abstract AI consultancy
- send anything to a collector without an explicit human click
- fork the codebase per client or per offer
- customize the roadmap for a single client
- launch standalone self-serve products beside the main offer
- claim sales impact before it is measured

Frozen until an explicit strategic decision: autopilot (never), standalone
self-serve viewing room studio, assistant capabilities beyond sales drafts.

**Open question, not yet decided:** the previous packaging carried a Connected
Website extension and standalone AI Coaching sessions alongside the Send/Agent
ladder. Vitreen Partner now includes team training directly, which makes
standalone coaching sessions redundant with the core offer. Whether Connected
Website survives as a separate, quoted-after-conversation add-on — or folds
into "what you customize" — has not been decided. Do not silently resurrect
either as a priced item until this is settled.

---

# 14. Where things live

- **Marketing site** — this repository (`Vitreen`). Next.js App Router, EN at
  `app/(en)`, FR at `app/(fr)/fr`, landing components in `components/landing/`.
- **Product** — `gallery-OS/dashboard/` (separate repository, not in this
  workspace). Sales agent at `src/lib/sales-agent/`, drafts queue at
  `/dashboard/sales-drafts`.

Work on the product (navigation flags, renaming, onboarding) must be done in a
session opened on that repository.

**Known gap (2026-08):** the marketing site's pricing section still implements
the retired Send/Agent ladder (`components/landing/LandingOffers.tsx` and its
French twin), not the Vitreen Partner offer in this document. The doctrine has
moved; the landing has not yet been rebuilt to match. Do not treat the current
landing pricing UI as authoritative — this document is.

---

# 15. Open workstream — turning the dashboard into the engine room

**Status: planned, not started.** The marketing site is mid-transition (see
§14); the product has not moved at all yet. Until this workstream ships, a
prospect who sees a demo still meets "Gallery OS". Closing that gap is the
priority.

**Where:** `gallery-OS/dashboard/` — a separate repository, not present in the
marketing workspace. This work must be done in a session opened on that repo.

## Guardrails (apply to every phase)

- **Never fork.** No "agent-only" build, no per-client branch. Everything is
  feature flags and configuration on one shared codebase.
- **Delete nothing.** Modules are hidden, not removed.
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
   Default off; enabled per installation where it fits.
4. **Retire the name.** "Gallery OS" disappears from the dashboard, the add-ins,
   the docs and the onboarding emails. (Already done on the marketing site — the
   Gmail widget displays "Vitreen"; note the function is still named
   `GalleryOsSearchWidget` in `components/shared/ArtworkAddInMocks.tsx` and
   should be renamed on the next pass.)

Definition of done: a new client logging in sees a queue of drafts to review and
nothing that looks like an operating system.

## Phase 2 — product

1. **Support the six-month arc (§7)** in-product: a visible path from inventory
   connection through formats and training to the first live draft.
2. **Usage metrics:** drafts generated, drafts validated, artworks shared,
   time-to-first-reply. These are the product's health signals _and_ the
   evidence a founder needs in the monthly working session — instrument them
   early.
3. **Rework the home screen** so it answers "how many conversations did the
   agent prepare this week?" rather than "how many artworks are in my base?".

## Phase 3 — offer

Migrate the commercial discourse and the pilot clients onto Vitreen Partner
pricing (§5). Retire or recentre the remaining marketing pages still written in
the old frame (`/pricing`, `/about`, `/products/*`, `/solutions/*`).

---

# 16. Target customer

Small contemporary galleries.

They have limited technical capacity, fragmented artwork information, strong
sensitivity to image and wording, small teams, and little time for software
setup.

They do not want a database. They want to answer a collector faster, with the
right work, the right price and material that looks like their gallery. Many
would also rather have someone install this with them than configure it
themselves — that is precisely what the founder-led model sells.

Speak gallery, not software.

---

# 17. Session checklist

1. Does this strengthen the agent, or does it re-expose the dashboard?
2. Does it happen inside Gmail, WhatsApp or the drafts inbox?
3. Is it grounded in the gallery's own records?
4. Does the human validation step remain visible and mandatory?
5. Does it keep the artwork base as infrastructure, not as a promise?
6. Is it one codebase, one engagement, configuration over forks?
7. Does it stay inside the customization boundary (§10)?
8. Are we avoiding SaaS language ("plan", "tier") and the word "Gallery OS"?
9. Can we demonstrate this claim live today?

If any answer is unclear, stop and clarify the product logic before designing or
coding.

---

# 18. North Star

> A small gallery is installed once, personally, onto a shared Vitreen system —
> then answers every collector from Gmail or WhatsApp with the right work, the
> right price and material that looks like the gallery, prepared by an agent
> and sent by a person.
