# Vitreen Playbook

## Purpose

This document defines what Vitreen is, how it is built, how it is sold and how
it is talked about. Read it in full before any product, UX, copywriting, design
or implementation decision.

**Status: current, decided 2026-09-28. Replaces the three-branch playbook of
2026-08-11** (Vitreen Layer / Vitreen Studio / Vitreen Gallery Assistant as a
parent company with three offers). That architecture is obsolete:

- **Studio has left Vitreen.** Since 2026-08-31 it is a separate business,
  R.R Studio, on forart.world, with its own repo and domain. `/studio` on
  vitreen.art redirects there.
- **Gallery Assistant is no longer a separate offer.** The AI assistant is one
  of the three heads of the product, not a product of its own.
- **Layer is no longer a branch name.** Everything Layer described is now
  simply "Vitreen".

If you find material that talks about Layer, Studio, Gallery Assistant as
separate offers, or about Gallery OS, treat it as history.

---

# 1. What Vitreen is

**One product, with three heads, connected by one loop.**

```text
          INVENTORY  ◄──────────►  PERSONAL CRM + AI ASSISTANT
      (what: artworks,              (who: collectors, what they
       availability, prices)         received, what they care about)
                 ▲                            ▲
                 └────────── SELLING ─────────┘
                       Gmail · WhatsApp · PDF
                     (where: the conversation)
```

- **Inventory** knows the works: artists, images, dimensions, prices,
  availability, documents.
- **Personal CRM** knows the people: who each collector is, what they were
  sent, what they asked about, what they opened, when to follow up. The AI
  assistant reads it and works from it.
- **Selling** happens where the gallery already talks to collectors: Gmail and
  WhatsApp, with selections and PDFs as outputs.

None of the three is sold alone. The value is the circulation between them.

## The edge

**Vitreen stays inside the gallery's tools — Gmail and WhatsApp — and
organises the noise that comes out of them.**

Galleries do not lack tools; they drown in scattered conversations. A
collector asks on WhatsApp, follows up by email, is sent a PDF from a phone,
and three weeks later nobody remembers who received what. Vitreen does not
pull the gallery into a new app to fix this. Work keeps happening in Gmail
and WhatsApp; Vitreen sorts what happened there and puts the inventory within
reach of every conversation.

The personal CRM is the **result** of that sorting, not a module the gallery
has to maintain.

Three gestures, three surfaces:

| Gesture  | Surface                                          | The question it answers                                 |
| -------- | ------------------------------------------------ | ------------------------------------------------------- |
| **Sell** | Gmail and WhatsApp, where the gallery already is | "I'm replying to this collector."                       |
| **See**  | **Conversations**, in the dashboard              | "What happened, who is waiting, who received what?"     |
| **Ask**  | The **assistant chat**                           | "What large Elrons do we have available under €15,000?" |

Action happens in Gmail and WhatsApp. The dashboard is where the gallery
looks back and asks — it is not a replacement inbox.

## Who it is for

Contemporary art galleries first. Adjacent sellers who sell unique, high-value
objects through conversation (design galleries, art advisors, dealers) are a
possible later expansion — see §11. Not before the loop works.

## What Vitreen is not

- not an all-in-one gallery platform, not an "operating system"
- not a website builder or CMS
- not a pipeline/deal-stage sales CRM (no funnels, no forecasts, no scoring)
- not a newsletter or marketing automation tool
- not a self-serve viewing room builder (that is viewingroom.studio, §10)
- not an autonomous sales agent

---

# 2. The loop

This is the product. Every feature, screen, page and post must serve it.

```text
1. A request arrives          Gmail or WhatsApp
2. The collector is known     Personal CRM: who, what they already received
3. The works are found        Inventory: available, prices, images
4. The reply is prepared      AI assistant: draft, selection, PDF
5. A human sends it           always — never autonomous
6. The CRM remembers          what was sent, to whom, which works
        ↺ the next conversation starts from step 6
```

## Why step 6 is the differentiator

Every gallery CRM asks someone to type in what happened. Nobody does, so the
CRM is always out of date. In Vitreen the CRM **fills itself because the
gallery sells through Vitreen**: every reply, selection and PDF sent from
Vitreen is recorded against the collector and the works.

> The CRM you never have to fill in.

Claims discipline applies: this is true only for what Vitreen actually
captures. As of 2026-09-28 (`gallery-OS/dashboard/src/lib/conversations/channels.ts`):

- **Gmail** — captures threads opened with the Vitreen add-in and replies to
  a send tracked by Vitreen. No background reading, no history import:
  capture starts at installation.
- **WhatsApp** — captures works prepared from the assistant number for a
  named collector, and the link to the collector's thread. **Messages
  exchanged with collectors are not synced yet.**

Never claim "see everything that happened in WhatsApp" or "your whole inbox,
organised" until the capture does it. See §8, "The plan".

## The concrete case to use everywhere

> Marie writes on WhatsApp: "Anything new from Sacha Elron?"
> The assistant knows Marie already received two Elron works in the spring
> and asked about large formats. It finds the one large Elron still
> available, prepares a reply with a one-page PDF.
> The gallerist reads it, adjusts one line, sends.
> Marie's record now shows the new work, the date and the PDF.

If an explanation of Vitreen cannot be drawn as this loop, it has drifted
from the product.

---

# 3. The three heads

## 3.1 Inventory

The source of truth for the works. Entered once, reused everywhere.

- artists, artworks, images, dimensions, medium, year
- prices and price visibility rules
- availability: available / reserved / sold / NFS
- documents
- import from CSV / Excel and from Artlogic exports

The inventory is the moat, not the promise. It is indispensable — without it
the assistant is a GPT wrapper anyone can copy in a weekend — but it is not
what we sell, show first or name first.

## 3.2 Personal CRM + AI assistant

**"Personal CRM" is the public name.** Personal means: built around people
and relationships, light, filled by what actually happens — not a sales
pipeline to administer.

The CRM holds, per collector:

- identity and channels (email, WhatsApp)
- everything sent through Vitreen: replies, selections, PDFs, with the works
- inquiries received, and on which works
- interests (artists, formats, price range) as observed from conversations
- follow-ups due

The AI assistant works from the CRM and the inventory:

- recognises who is writing and recalls what they already received
- finds available works that fit
- drafts the reply, in the collector's language
- builds the selection or the PDF
- proposes follow-ups

It prepares. The gallery decides. It never invents a price, a date, an
availability or a provenance: if it is not in the records, it is not in the
draft.

## 3.3 Selling: Gmail, WhatsApp, PDF

Vitreen works inside the tools the gallery already uses.

- **Gmail add-in:** search the inventory, insert works, reply to an inquiry,
  see the collector's history, without leaving the inbox.
- **WhatsApp:** the Vitreen assistant number for the team (search, render,
  hand off into the collector thread), next to the gallery's own number.
  Vitreen never operates or replaces the gallery's sales number. Collector
  conversations on the gallery's number are not synced yet (§2).
- **Outputs:** replies, private selections, PDFs — all generated from
  inventory records, all logged in the CRM.

Inside Vitreen, say **"private selection"**, never "viewing room" — that
name belongs to viewingroom.studio (§10). A private selection is a curated
set of works generated from a real conversation, for a known collector, and
recorded in the CRM. It is an output of the loop, not a standalone
publishing tool.

## 3.4 The dashboard

The dashboard is where the gallery **sees** and **asks** (see "The edge",
§1). It is organised around **people and conversations first, works
second**, and has two main surfaces:

**Conversations — see.** The noise from Gmail and WhatsApp, organised:

- who is waiting for a reply, and who should be followed up
- per collector, one thread of everything that circulated — messages,
  replies, selections, PDFs, encounters — with the works involved
- per artwork, where it circulated: to whom, when, in what

This is where the personal CRM lives. The collector record is not a form to
fill in; it is the organised history of the conversations.

**Assistant chat — ask.** Talk to the inventory and the history in plain
language: find works, check availability, recall what a collector received,
prepare a reply, a selection or a PDF. Answers show their sources (the
records they come from) and every prepared output goes through "Review and
send". It is the same assistant as in Gmail and on the WhatsApp assistant
number — one brain, reachable from each surface — not a generic chatbot.

A surface that shows a work without its circulation, or a person without
their history, has broken the thesis — however good it looks in isolation.

The dashboard is not a replacement inbox: replying happens in Gmail and
WhatsApp.

---

# 4. Positioning

## Line

> Vitreen connects your inventory, your collectors and your conversations.
> An AI assistant prepares every reply from your own records — you send it.

(Working line. The current site hero, "Better tools for every way you sell
art.", predates this playbook and should be revisited with the home.)

## Three pillars of the AI

- **Grounded, not generative** — answers only from the gallery's records.
- **Installed, not another app** — in Gmail and WhatsApp.
- **Assisted, not autonomous** — nothing leaves without a human click. This is
  the promise, not a limitation.

## Facing Artlogic

Complementary, never a replacement:

> Artlogic stores your works. Vitreen makes them circulate in your
> conversations — and remembers who received what.

Until a native sync exists, write "from your Artlogic exports", never
"Artlogic integration". Never present the offer in a way that invites a
price comparison with Artlogic.

## Claims discipline (non-negotiable)

- The assistant prepares, a human sends. Never autonomous sending.
- Never an invented price, availability or provenance.
- No "sell more" claim until measured on real clients. Sell speed of reply,
  accuracy and relationship memory.
- "The CRM fills itself" only for what goes through Vitreen.

---

# 5. Vocabulary

**Use**

- personal CRM, collector history, who received what
- Conversations (the dashboard surface), the assistant
- organise the noise, stay in Gmail and WhatsApp
- inventory, artwork records, availability
- in Gmail and WhatsApp
- prepared by the AI, sent by your team
- grounded in your records
- works alongside Artlogic
- the loop, circulation (internally and in build-in-public content)

**Avoid**

- Gallery OS (including "Gallery OS Conversations" — publicly it is just
  "Conversations"), Layer, Studio, Gallery Assistant (as offer names)
- all-in-one platform, operating system, suite
- CMS, website builder, inventory software as the headline
- sales pipeline, deals, funnel, lead scoring (the CRM is personal, not a
  pipeline)
- autopilot, automatic sending, AI-powered everything
- technical jargon on the client side

**Commercial vocabulary:** saying prices is normal. Forbidden: "plan",
"tier", "upgrade", and any feature-comparison table with columns. Acceptable:
monthly, partnership, maintenance, commitment.

---

# 6. Offer and pricing

**Decided 2026-09-28. Replaces the 2026-08-12 offer** (Vitreen Sales
€390/month and Partner €590/month, both with a 12-month commitment). That
offer cost more than Artlogic Professional for a complement to Artlogic, and
asked an unknown founder's first clients for a one-year commitment. The new
product also needs far less installation: the aha comes from connecting
WhatsApp and importing its history, not from a three-week migration.

| Offer                           | Price                                   | Commitment                            |
| ------------------------------- | --------------------------------------- | ------------------------------------- |
| **Founding gallery** (3 places) | €149/month                              | 3 months minimum, then month to month |
| **Vitreen** (public price)      | €249/month, or €199/month billed yearly | None                                  |

Both: **per gallery, unlimited users**, setup included.

**Included:** inventory import from spreadsheets or Artlogic exports, Gmail
add-in, WhatsApp assistant, AI assistant grounded in the gallery's records,
Conversations (collector history), private selections and PDFs, team
onboarding. Founding galleries also get early access to WhatsApp
conversation capture as it ships — never list capture as included before it
works (§2).

**Founding galleries**

- Limited to **three**. The limit is what makes the price a reserved entry,
  not a discount. Once taken, the public price applies to new galleries.
- The price is **kept for as long as the gallery stays**, even when the
  public price rises.
- The three-month minimum covers the setup time.
- In return: 20 minutes of feedback every two weeks during the first three
  months, and permission to write a case study.

**Public price.** Applies once the three founding places are taken and the
WhatsApp capture works. The commitment is a choice that earns a discount
(€199/month billed yearly), never a condition of entry.

**Why these numbers.** Competitors, as of 2026-09: Artlogic Essential from
£130/month and Professional from £266/month (inventory, CRM, invoices,
website, email marketing); Arternal from $110 per user per month; ArtCloud
$99–193 per user per month; Artwork Archive organisation plans $24–139/month;
Wati (WhatsApp team inbox) $59–119/month plus Meta fees; folk (personal CRM)
$24–48 per user per month. A complement to Artlogic must cost clearly less
than Artlogic; per-gallery pricing with unlimited users beats per-user
competitors for any team of two or more.

**Partner is paused.** With three founding galleries the founder is already
in close contact. Partner comes back when clients ask for ongoing guidance —
proposed once the system is in place, never as an option on day one, never
as "Vitreen + options".

**Quoted separately:** a full Artlogic takeover with data cleanup, and any
custom work. The low price must not hide a free migration.

**Included maintenance is a closed list** — the most important scope
protection of the offer: bug fixes, keeping existing features working,
security updates, reasonable technical compatibility, restoration after an
incident. It does **not** cover: new features, new integrations, new
templates, data-structure changes, workflow changes, specific requests.
Saying yes once reopens the boundary for good.

**Rules**

- Never a feature-comparison table with columns.
- Pricing changes happen in one file: `components/landing/Offers.tsx` (cards
  and included list, EN and FR), used by the home and `/pricing`. The pricing
  FAQ lives in `PricingPage.tsx` / `PricingPageFr.tsx`.

**Customisation boundary** — customisable: imports, commercial fields, CRM
fields, templates, tone, visibility rules, Gmail/WhatsApp workflows. Never
customisable: the core architecture, the product as a whole, the roadmap for
one client, tools unrelated to inventory, collectors and sales
conversations.

**Economic principle:** the service funds the product · the product keeps
Vitreen from becoming an agency · the standardised scope protects the solo
founder's time. The low price holds only because installation now takes
days, not weeks — if setup grows back, the price no longer holds.

**Costs per gallery to measure:** WhatsApp provider (e.g. 360dialog), Sanity,
AI inference (Groq). Replies are sent from the WhatsApp app, so no Meta
per-message fees on replies — Meta's pricing changes often, re-check it.

---

# 7. Capacity

With Partner paused, the constraint is **installation and support time per
gallery**, and above all protecting product days. Log real days per
category — installation, founding-gallery feedback, maintenance, product —
from the first gallery.

```text
galleries the founder can carry ≈ (founder days available per month
                                   − product days)
                                  ÷ (maintenance + support days per gallery per month)
```

Product days are not optional: if client work eats them, the loop stops
improving and Vitreen becomes an agency. When Partner returns, each Partner
client adds a monthly session for as long as they stay — never add "a bit of
follow-up" to a regular client, it turns a bounded queue into an infinite
one.

---

# 8. How we build (indie, solo founder)

Vitreen is built the indie-hacker way: one founder, one product, shipped in
small visible steps, built in public. **Indie here is a way of building and
communicating, not a pricing model** — the installation stays personal and
the offer stays founder-led (§6).

## Product rules

- **Build on the loop.** Before building anything, name the step of §2 it
  strengthens. If none, it waits.
- **Connect before adding.** A link between two existing heads is worth more
  than a new module.
- **No new heads.** Inventory, personal CRM + assistant, selling. A fourth
  head is a different product.
- **Hide, never fork.** Legacy modules (website publisher, exhibitions) stay
  behind feature flags; nothing is deleted, no per-client fork.
- **Human validation visible.** Wherever the assistant appears, the
  "Review and send" step is shown, not just asserted.

## Current gap (the priority)

As of 2026-09-28, in `gallery-OS/dashboard`:

- **The collector memory exists.** `src/lib/conversations/memory.ts` builds a
  per-collector history of events (inquiry, message, sent, prepared, note,
  encounter), each with its channel and its works. Conversations
  (`src/app/workspace/conversations`) is built on it.
- **`src/lib/activity.ts` is only a notification feed** (contact as plain
  text in `meta.contactName`). It is not the memory; do not build the CRM on
  it.
- **Capture is the gap.** The memory is only as good as what reaches it
  (§2): Gmail captures only threads opened with the add-in, and WhatsApp
  collector messages are not synced at all. "See what happened in WhatsApp"
  — the heart of the edge — does not work today.

## The plan (decided 2026-09-28)

**WhatsApp first, and Conversations full on day one.** Nothing else is built
until this works at one real gallery.

**Capture scope (decided):** capture **all** 1:1 WhatsApp conversations of
the gallery's WhatsApp Business number. Gmail stays as it is (threads opened
with the add-in + tracked replies). WhatsApp is where the noise is worst and
least organised; background Gmail reading would cost a heavy Google
verification for a smaller gain.

**How:** Meta's **coexistence** mode links the gallery's WhatsApp Business
app and the Cloud API on the **same number**. The gallery keeps using its app;
on connection, up to **180 days of 1:1 history** sync; afterwards every
message — including those the gallery sends from its phone ("echoes") — is
mirrored in near real time. Group chats do not sync; disappearing messages
and live location are disabled. Going through a WhatsApp provider (e.g.
360dialog) is faster than becoming a Meta Tech Provider directly.

Steps, in order:

0. **Check the ground (no code).** Ask 5 galleries whether they use WhatsApp
   Business or a personal WhatsApp on the gallerist's phone. Coexistence only
   works with WhatsApp Business; moving from personal to Business keeps the
   number but is one more ask. Also ask whether they sell through WhatsApp
   groups (not synced).
1. **Capture WhatsApp.** Connect the number in coexistence; ingest messages
   and echoes into the existing memory (`conversations/memory.ts`), attached
   to the collector by phone number; recognise the works mentioned (reuse
   the title/artist matching used for Gmail). **Import the 180-day history
   at installation**: on day one, Conversations already shows six months of
   exchanges sorted by collector, with nothing typed in. That is the aha,
   the demo and the build-in-public post.
2. **Conversations as home screen.** Three lists, no more: _waiting for a
   reply_ (collector wrote last) · _to follow up_ (received something, no
   answer for X days) · _new requests about works_. The AI classifies each
   message (request about a work / logistics / small talk) so only requests
   about works surface.
3. **Assistant chat.** Reads the inventory and the collector memory, cites
   its sources. Everything it prepares goes through "Review and send"; sending
   happens **in the WhatsApp app** with the message prefilled (free, and it is
   the gallery who sends). Same assistant on the assistant number and in
   Gmail.
4. **Gmail: untouched for now.**

**Stop until this works:** multi-tenancy and self-serve (one deployment per
gallery is fine for 5–20 clients), the website publisher, exhibitions, any
new module, any per-client customisation beyond §6.

**Risks to handle before the first real connection:**

- **Trust and GDPR.** Vitreen will store messages between the gallery and
  its collectors: data processing agreement, where the data is hosted
  (Sanity), and one clear sentence for the gallery — "we read your WhatsApp
  Business conversations to organise them; we never send anything."
- **Coexistence limits.** Groups, disappearing messages and live location
  are out. Never promise "all of WhatsApp".

**Metrics:** time to aha (minutes from connection to first conversation
shown) · share of conversations attached to a collector and at least one
work · replies prepared by the assistant, then actually sent · weekly use of
Conversations by the team.

This work happens in a session opened on the `gallery-OS` repo, not here.

## Roadmap

| Piece                                              | Status                                   |
| -------------------------------------------------- | ---------------------------------------- |
| Inventory + CSV/Excel import                       | ✅ Exists                                |
| Gmail add-in                                       | ✅ Working                               |
| WhatsApp assistant number                          | ✅ Working                               |
| AI assistant (grounded drafts, human validation)   | ✅ Live                                  |
| Private selections + PDF                           | ✅ Exists                                |
| Collector memory + Conversations                   | ✅ Exists (`conversations/memory.ts`)    |
| Gmail capture                                      | 🟡 Opened threads + tracked replies only |
| WhatsApp capture via coexistence + 180-day history | 🔴 Priority — step 1 of the plan (§8)    |
| Conversations as home screen                       | 🔴 Next                                  |
| Assistant reads collector memory on every surface  | 🔴 Next                                  |
| Follow-up suggestions                              | 🟡 After the loop is closed              |
| Usage metrics (drafts generated / sent)            | 🟡 After the loop is closed              |
| Autonomous sending                                 | ⛔ Never                                 |

---

# 9. How we communicate

## One story everywhere

Show the loop, never a feature list. Every page, demo and post shows one
circulation: a request, the collector recognised, the works found, the reply
prepared, a human sending, the record updated.

## Website

The home is a linear story, not a SaaS home. Nobody knows Vitreen; a visitor
has no category to file it in. Order:

1. **Recognition** — the moment the gallery lives today: a collector asks,
   the material is elsewhere, nobody remembers what was already sent.
2. **The loop shown** — the Marie case (§2), step by step, with real product
   visuals.
3. **The assistant demonstrated** — a grounded draft with the visible
   "Review and send" step. Sober: no shadow, no colour.
4. **Installation** — how the setup goes, in about a week.
5. **The offer** — founding gallery / public price cards, never a comparison table.
6. **One CTA** — book a call.

Forbidden: any section summarising the product in 3–4 icon "pillars", market
statistics sections, "sell more" claims.

## Build in public

Each post shows one link of the loop that just shipped ("today, a WhatsApp
message attaches itself to the collector's record"). Concrete, visual,
regular. Writing guides per network live in `.claude/social/`.

Share: what shipped, decisions and why, mistakes, lessons from installations,
and numbers once they exist.

Never share: client names without consent, collector names or data, gallery
prices, screenshots with real data. Use the demo gallery (Sacha Elron,
Marie Beaumont…) for every visual.

## Sales

The loop is the demo: three minutes, one real-looking case, end on the
collector record updating.

---

# 10. viewingroom.studio

**viewingroom.studio is a separate product**, with its own brand and domain:
self-serve artwork presentations and private viewing rooms, with signals
(opens, inquiries, follow-ups).

- It is not a head of Vitreen and not a Vitreen offer.
- Vitreen does not build a self-serve viewing room product.
- Vitreen's own selections are outputs of the loop (generated from a
  conversation, for a known collector, logged in the CRM); they are not a
  publishing tool.
- Do not present both on the same page or in the same pitch.
- **Fully separate:** no shared data, no shared CRM, no cross-promotion
  inside the product. viewingroom.studio signals do not feed Vitreen.

---

# 11. Beyond galleries (later)

The loop is not specific to art. It fits anyone selling unique, high-value
objects through conversation rather than a checkout. Selection criteria for
a future vertical:

- unique or small-series objects, high value
- sales happen in conversation, not in a cart
- the habit of sending selections or PDFs
- availability status matters
- relationships drive repeat purchases
- a data model close to artworks

Closest candidates: design galleries and collectible furniture, antique
dealers, art advisors. Further: vintage watches and jewellery (WhatsApp-heavy,
different fields). Avoid: B2B fashion showrooms (sizes, variants, quantities
— a different product).

**Rule:** one engine, no per-vertical build. A vertical is tested with a
landing page and conversations first. Not before the loop is closed (§8).

---

# 12. Open questions

- ~~Capture scope~~ — **decided 2026-09-28**: all 1:1 WhatsApp Business
  conversations via coexistence; Gmail unchanged (§8, "The plan").
- Do target galleries use WhatsApp Business or personal WhatsApp? Do they
  sell through WhatsApp groups (not synced)? — to ask 5 galleries (§8, step 0).
- Promise on the site once WhatsApp capture ships: "see everything that
  happened on your WhatsApp Business" — wording to settle, never "all of
  WhatsApp".

- Founding €149 / public €249 (€199 yearly) are not yet validated
  commercially — revisit after the three founding galleries.
- The connected gallery website (from €4,500, quoted separately) was a Layer
  upsell. With Studio gone and the website outside the three heads, keep,
  move to R.R Studio, or drop?
- First vertical beyond galleries, if any, once the loop is closed.

---

# 13. Session checklist

Before designing, writing or implementing anything for Vitreen:

1. Which step of the loop (§2) does this strengthen?
2. Which head does it belong to — inventory, personal CRM + assistant, or
   selling? If none, it is probably out of scope.
3. Does it connect heads, or add an isolated surface?
4. Is the human "Review and send" step visible wherever the assistant acts?
5. Is every claim true today, in the code? (Check `gallery-OS` before saying
   a capability does or does not exist.)
6. Does it belong to viewingroom.studio or R.R Studio instead?
7. Does it respect the closed maintenance list and the customisation
   boundary?
8. Does it make Vitreen easier, not harder, to explain in one loop?

---

# North Star

> **Inventory knows the works. The personal CRM knows the people.
> The conversation is where they meet — and Vitreen remembers every one.**
