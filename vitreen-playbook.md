# Vitreen Playbook

## Purpose

This document is the strategic and product context for Vitreen / Gallery OS.

Read this file at the beginning of every ChatGPT, Claude or Codex session before making product, UX, copywriting or implementation decisions.

The goal is to keep Vitreen coherent.

Vitreen is not a generic SaaS, not a simple CMS, not a website template and not an Artlogic clone.

Vitreen is a forward-deployed gallery infrastructure service: we audit how a gallery works, understand what it needs, connect to its existing tools, then build a custom dashboard and connected website around the team’s real workflow.

---

# 1. Product Thesis

Galleries should not recreate the same artwork information in different places.

Most gallery work depends on the same core data:

- artwork details
- artist information
- images
- prices
- availability
- documents
- exhibition history
- collector-facing material
- private notes

But this information is usually scattered across folders, spreadsheets, PDFs, emails, CMS tools, InDesign files, WhatsApp messages and external providers.

Vitreen turns artwork information into reusable infrastructure.

One structured artwork record should be usable across:

- the gallery dashboard
- the public website
- artist pages
- exhibition pages
- emails
- PDFs
- private selections
- collector follow-ups
- internal operations

Core logic:

```text
Enter artwork information once.
Structure it properly.
Reuse it everywhere the gallery works.
```

---

# 2. Positioning

## Main positioning

Vitreen is a Gallery OS built and configured around each gallery.

It combines product, design engineering and done-for-you service.

Vitreen should be framed as:

> A custom Gallery OS for contemporary galleries: audit, connect, build and operate.

## Strategic posture

Vitreen is not trying to sell another generic tool to galleries.

Vitreen enters through the real workflow of the gallery:

1. Audit how the gallery currently works.
2. Identify where artwork data is duplicated, lost or blocked.
3. Connect to existing tools and habits where possible.
4. Build a dashboard and website that match the gallery’s operations.
5. Stay as a long-term partner for updates, improvements and support.

## Preferred language

Use:

- Gallery OS
- Gallery infrastructure
- custom dashboard
- connected website
- artwork source of truth
- private selections
- gallery workflow
- built around your gallery
- audit, connect, build, operate
- done-for-you partner
- website powered by artwork records
- collector-facing sales material

Avoid:

- generic SaaS
- all-in-one platform
- marketplace
- CRM replacement
- website template
- no-code tool
- AI-powered everything
- automation for everything
- Artlogic alternative as the primary framing

Vitreen can compete with gallery software, but it should not sound like a feature-by-feature Artlogic clone.

The stronger angle is:

> Vitreen reduces switching cost by building around the way the gallery already works.

---

# 3. Offer Model

Vitreen is not pure self-serve SaaS at the beginning.

The offer is closer to a forward-deployed design engineering service for galleries.

## Service structure

### 1. Audit

Understand the gallery’s current workflow:

- how artworks are stored
- how images are managed
- how prices and availability are tracked
- how the website is updated
- how collector requests are handled
- how PDFs and selections are prepared
- which tools are already used
- where the team loses time
- where sales opportunities are blocked

### 2. Connect

Map and connect existing systems where useful:

- spreadsheets
- folders
- image libraries
- website content
- email workflows
- existing databases
- manual processes
- internal conventions

The goal is not to force the gallery into a completely new system.

The goal is to create a connected operating layer around what already works.

### 3. Build

Build a custom Gallery OS:

- artwork management dashboard
- artist records
- exhibition records
- connected website
- publishing workflows
- private selections
- sales material preparation
- gallery-specific content structure

The product should be custom enough to fit the gallery, but structured enough to become repeatable across galleries.

### 4. Operate

Vitreen can remain as a partner:

- maintain the website
- improve the dashboard
- adapt workflows
- prepare new sections
- support publishing
- help with artwork data structure
- reduce technical dependency for the gallery team

This is a done-for-you service layer, not just software access.

---

# 3b. Strategic Decisions — July 2026 audit

These arbitrages were made after a full product/GTM/business audit. They override anything contradictory elsewhere in this document.

## Entry offer

One offer, fixed scope, sold first:

> Connected website + artwork core (dashboard) + Gmail/WhatsApp add-ins + simple PDF export. Delivered in ~3 weeks.

Viewing rooms are included as a capability. The Sales Agent (AI-prepared draft replies, always human-validated) is live and demonstrable — see Pillar 3 for what may and may not be claimed.

## Pricing posture

- Setup: 4 000–6 000 € (target 5 000 €). The old 2 000 € figure is underpriced: real delivery is 15–25 days of work — do not anchor there.
- Subscription: 350–500 €/month (target 400 €), 12-month commitment, includes hosting, updates and ~2h of operate per month.
- First 3 pilot clients: 2 500 € setup displayed as an explicit −50% pilot discount (never as the normal price), in exchange for a case study, metrics access and 2 qualified introductions.

## Delivery discipline

- Customization budget: max 20% of delivery time per gallery (theme, page structures, visible fields, PDF formats). Core schema, publishing logic and relationships are never customized.
- One shared codebase. No per-client forks, ever.
- If a client's custom demands exceed the budget, that is a signal to refuse the client, not to work more.

## Claims discipline

- Sell **autonomy** first (verifiable at delivery), accuracy as daily proof, time saved as support.
- Never claim "better sales" until measured across pilots (inquiry response time, site update frequency, PDF prep time — before/after).

## Frozen until further notice

- Autonomous sending of AI replies (autopilot) — never. Drafts exist and work (see Pillar 3), but nothing reaches a collector without an explicit human click.
- Assistant capabilities beyond sales drafts (long-term follow-up memory, proactive outreach) — announced as roadmap only.
- Standalone self-serve Viewing Room Studio (removed from site) — see Pillar 4.
- Marketing site refinements beyond what the entry offer needs.

---

# 4. Target Customer

## Primary target

Small contemporary galleries.

These galleries often have:

- limited internal technical capacity
- strong need for presentation quality
- fragmented artwork information
- dependency on external web providers
- manual sales material workflows
- small teams or solo founders
- limited time for software setup
- high sensitivity to image, wording and collector communication

## User psychology

The target user does not want “a database”.

They want:

- a cleaner website
- less dependency on a web provider
- faster updates
- fewer errors
- better private material for collectors
- more control over artworks, artists and exhibitions
- a system that fits how the gallery already works

The product should translate technical architecture into gallery-native language.

Do not make the gallery feel like it has to become technical.

---

# 5. Business Promise

The primary business promise is not just “save time”.

The strongest promise is:

## Autonomy without external dependency

The gallery can update key content and manage artwork information without waiting for an external provider every time.

This matters because gallery websites and sales material need frequent, precise and contextual updates.

## Better collector conversion

Collector-facing material becomes faster, cleaner and more accurate.

Vitreen helps the gallery respond with the right artwork, the right information and the right presentation at the right moment.

This supports sales by reducing friction in the private conversation between gallery and collector.

## Core business message

Vitreen gives small contemporary galleries a more autonomous and sales-ready operating system.

---

# 6. MVP / Current Product Focus

The first real product focus is:

> Artwork dashboard + connected gallery website + Gmail/WhatsApp add-ins.

This is the foundation — and the entry offer sold to galleries.

The Gmail and WhatsApp add-ins are working and easy to deploy. They are part of the entry bundle because they are the most differentiating, most demonstrable features: no agency and no incumbent can replicate "search an artwork inside Gmail" or "send a clean PDF from WhatsApp" in a 5-minute demo.

Everything else depends on the quality of the artwork records and the connection between internal data and public website output.

## MVP foundation

The core system should include:

- artwork records
- artist records
- exhibition records
- image and document management
- prices and availability
- publishing status
- website connection
- basic content update workflows
- reusable data structure

## Why this first

The dashboard + website connection creates the clearest immediate value:

- galleries understand the website problem
- the output is visible
- the workflow is concrete
- autonomy is easy to explain
- it creates the base for future assistant and private sales features

---

# 7. Product Pillars

Vitreen / Gallery OS is organized around four pillars.

These pillars are not separate products. They are connected surfaces built on the same artwork data.

Product navigation labels:

- Artworks Management
- Website Publisher
- Gallery Assistant
- Private Selections

Strategic roles:

- Source of truth
- Public website output
- Daily gallery work
- Private sales material

---

## Pillar 1 — Artworks Management

### Role

Artworks Management is the source of truth of the Gallery OS.

It gives the gallery one structured place to manage artworks, artists, images, prices, availability, documents, exhibition history and internal notes.

### Core idea

> Every artwork record should be complete enough to support publishing, sales, communication and internal operations.

### User value

The gallery can keep artwork information clean, complete and reusable.

### What it replaces

- scattered folders
- repeated spreadsheets
- manual artwork lists
- inconsistent prices
- outdated availability
- lost images and documents
- duplicated captions

### Product principle

Do not make this feel like heavy inventory software.

It should feel like a clear, elegant and operational artwork workspace.

---

## Pillar 2 — Website Publisher

### Role

Website Publisher connects the gallery database to the public gallery website.

The gallery can publish artworks, artists and exhibitions online without using a separate website admin or asking a developer for every update.

### Core idea

> The website should be an output of the artwork database, not a separate place where content is recreated manually.

### User value

The gallery keeps its website aligned with internal records.

### What it replaces

- separate CMS
- manual website updates
- duplicated artist pages
- outdated exhibition pages
- dependency on external providers for small content changes

### Product principle

Do not frame this as “build a website”.

Frame it as:

> The gallery website stays connected to the gallery’s artwork records.

---

## Pillar 3 — Gallery Assistant

### Role

Gallery Assistant turns structured gallery data into daily working material.

It helps prepare emails, captions, artwork lists, PDFs, collector replies, follow-ups and internal documents from existing artwork records.

### Core idea

> The gallery should work from its existing records instead of recreating the same material for every message, document or request.

### User value

The gallery saves time on repetitive but sensitive work.

### What it replaces

- copy-pasting artwork information
- rewriting captions manually
- downloading images one by one
- rebuilding PDFs
- checking availability in another tab
- preparing collector replies from scratch

### Product principle

Do not present the assistant as magic AI.

Present it as a practical gallery assistant that uses reliable artwork records to prepare useful outputs.

The assistant supports the gallery team. It does not replace its judgment.

### Status — Sales Agent v1 is live (July 2026)

The first AI capability is built and working in Gallery OS (`gallery-OS/dashboard/src/lib/sales-agent/`):

- **Trigger** — an incoming collector email (add-in sidebar webhook or manual generation) passes a purchase-intent filter before anything runs.
- **Grounded generation** — a Groq-powered agent (`openai/gpt-oss-120b`, tool loop) works exclusively from gallery data via tools: contact lookup, artwork details, search, similar works, recent inquiries, gallery settings. It never invents a price, an availability or an artwork.
- **Output** — a typed draft reply in the sender's language (fr/en/de/es/it/zh), with VIP tone handling, sold-work alternatives and price-on-request discretion, queued in `/dashboard/sales-drafts`.
- **Human validation, always** — a draft only becomes `sent` after an explicit human click (delivery via Resend). There is no autopilot, by design.

### Claims discipline for the assistant

- Sell what runs: AI-prepared sales drafts, reviewed and sent by the gallery. This is demonstrable live.
- Do not promise autonomous sending, proactive outreach or long-term follow-up memory — those remain roadmap and must be announced as such.
- The human-in-the-loop design is a selling point, not a limitation: galleries keep full control of their collector voice.

---

## Pillar 4 — Private Selections

### Role

Viewing Rooms let galleries create and share private artwork selections directly from their inventory.

The gallery can select works, control visible information, share a private link and keep the selection updated when availability changes.

### Status decision (July 2026)

Viewing Rooms are a **capability of the Gallery OS**, not a standalone product.

The self-serve standalone product (public pricing, Stripe checkout, sign-up at /viewingroom-studio) has been removed from the site: a self-serve SaaS inside a done-for-you premium brand weakens both. The editor and dashboard remain as the delivery tool used within the Gallery OS offer.

Do not reintroduce a standalone self-serve viewing room product without an explicit strategic decision.

### Core idea

> Private sales material should be fast to prepare, elegant to share and connected to inventory.

### User value

The gallery can create collector-facing selections without rebuilding PDFs or sending scattered attachments.

### What it replaces

- static PDF selections
- manual image folders
- long email threads
- outdated collector material
- repeated private selections rebuilt from scratch

### Product principle

Do not frame this as a public platform.

Frame it as a private sales workspace for galleries.

---

# 8. System Logic

The strength of Vitreen is not each feature in isolation.

The strength is the connection between surfaces.

A single artwork record can become:

- a website artwork page
- an artist page entry
- an exhibition page item
- a sales email
- a PDF selection
- a private viewing room
- a collector follow-up
- an internal note

Core formula:

```text
One artwork record.
Multiple gallery outputs.
```

This is the core value of Vitreen.

---

# 9. Customization Principle

Each gallery gets a configured version of the system.

Vitreen should not force every gallery into the same rigid structure.

But customization should be controlled.

## Customizable

- website layout
- artist page structure
- exhibition page structure
- artwork fields
- visibility rules
- sales material formats
- private selection templates
- dashboard priorities
- content workflow

## Should remain standardized

- core artwork record logic
- artist / artwork / exhibition relationships
- publishing status
- availability logic
- image/document handling
- reuse of artwork data across outputs
- four product pillars
- visual clarity
- navigation logic

The product should become repeatable through a shared core and configurable surfaces.

---

# 10. Design Principles

## 1. Simple before powerful

The interface should feel simple to a non-technical gallery user.

Do not expose complexity too early.

## 2. Database without database anxiety

Vitreen contains structured data, but it should not feel like enterprise database software.

Avoid dense tables when a more visual or guided structure is better.

Use hierarchy and progressive disclosure.

## 3. Work with existing habits

Galleries already use email, folders, PDFs, WhatsApp, websites and spreadsheets.

Vitreen should connect to these habits instead of pretending they do not exist.

## 4. Reuse is the product

The UX should constantly reinforce that artwork information can be reused across surfaces.

The user should feel:

> I already entered this once. Now I can use it everywhere.

## 5. Controlled outputs

Galleries care about presentation, discretion and accuracy.

Every output should feel controlled:

- what information is visible
- what price is shown
- whether availability appears
- which images are used
- whether the selection is private or public

## 6. Gallery-native interface

Avoid generic SaaS dashboards.

Vitreen should feel calm, precise, editorial and gallery-native.

Preferred qualities:

- white space
- restrained typography
- simple cards
- clear hierarchy
- subtle interactions
- visual confidence
- no excessive gradients
- no fake complexity
- no decorative bento sections without product meaning

---

# 11. UX Rules

## Navigation

The product navigation should reflect the four pillars:

- Artworks Management
- Website Publisher
- Gallery Assistant
- Viewing Room Studio

These should feel like parts of one system, not disconnected apps.

## Search

Search is a core interaction.

The user should be able to find artworks, artists, exhibitions and records quickly.

Search should support:

- artwork title
- artist name
- availability
- price
- medium
- year
- exhibition
- collector context when relevant

Search should not feel hidden or secondary.

## Artwork record

The artwork record is the central object of Vitreen.

A strong artwork record should include:

- title
- artist
- year
- medium
- dimensions
- images
- price
- availability
- documents
- exhibition history
- publication status
- private notes
- sales context

## Publishing

Publishing should feel like selecting where the artwork data goes.

Do not create a separate CMS mental model.

Use language like:

- publish to website
- update artist page
- add to exhibition page
- hide from public website
- include in private selection

## Assistant

The assistant should always be grounded in gallery data.

It should not generate unsupported content.

It should prepare drafts, selections and outputs that the gallery can review.

## Viewing rooms

Viewing rooms should be private, controlled and elegant.

The gallery should be able to decide:

- visible price or hidden price
- availability visible or hidden
- selected images
- order of works
- collector-facing notes
- expiration or access control if needed

---

# 12. Copywriting Rules

## Tone

Use clear, simple, gallery-native language.

The copy should sound like it understands gallery operations.

Avoid abstract SaaS language.

## Good wording

Use:

- Keep artwork records complete and organised.
- Update your website from your artwork database.
- Prepare collector replies from existing artwork records.
- Create private selections directly from your inventory.
- One artwork record, reused across the gallery.
- Your website stays aligned with your gallery data.
- Built around the way your gallery already works.
- Audit your workflow, connect your tools, build your Gallery OS.

## Avoid

Avoid:

- revolutionize your workflow
- supercharge your gallery
- AI-powered everything
- seamless end-to-end platform
- unlock growth
- automate your gallery
- next-generation CMS
- scale your operations
- all-in-one solution

## Preferred headline logic

Headlines should be concrete.

Bad:

> The future of gallery management.

Better:

> Manage artwork information once. Use it everywhere.

Bad:

> An AI-powered platform for modern galleries.

Better:

> Turn artwork records into website pages, emails, PDFs and private selections.

---

# 13. Implementation Rules for Codex

When working on the codebase, preserve the strategic structure of Vitreen.

Before implementing a feature, identify which pillar it belongs to:

- Artworks Management
- Website Publisher
- Gallery Assistant
- Viewing Room Studio

Do not create new product categories unless explicitly requested.

Do not introduce a new design system if existing components already exist.

Work with the existing UI language.

Prefer improving:

- hierarchy
- spacing
- copy
- state clarity
- interaction logic
- responsiveness
- data structure
- reuse between components

Avoid:

- decorative redesigns
- unnecessary modals
- fake dashboards
- generic SaaS layouts
- duplicate components
- large architecture changes without reason
- changing card dimensions unless explicitly requested
- breaking existing visual consistency

Every implementation should reinforce:

> One artwork record reused across multiple gallery outputs.

---

# 14. Product Boundaries

## Vitreen should do

- audit gallery workflows
- centralize artwork records
- configure a dashboard around the gallery
- connect artwork data to the website
- give the gallery autonomy over key updates
- prepare sales and communication material
- create private collector selections
- reduce duplicated data entry
- improve accuracy across outputs
- support existing gallery workflows
- remain as a done-for-you partner

## Vitreen should not do initially

- become a full CRM
- become a marketplace
- replace every existing gallery tool
- become a generic website builder
- become an accounting system
- become a complex enterprise inventory suite
- overpromise automation
- use AI without reliable artwork data
- compete only by copying Artlogic feature by feature
- launch standalone self-serve products next to the done-for-you offer
- claim "better sales" or conversion impact before it is measured with real clients (sell autonomy and accuracy instead)

---

# 15. Session Checklist

At the beginning of every session, check:

1. Which pillar are we working on?
2. What gallery workflow does this improve?
3. Is this connected to artwork records?
4. Does this reduce duplicated work?
5. Does this increase gallery autonomy?
6. Does this improve collector-facing sales material?
7. Does this make the product clearer for a non-technical gallery user?
8. Are we avoiding generic SaaS language?
9. Are we preserving the existing visual system?
10. Does this strengthen the Gallery OS positioning?

If the answer is unclear, stop and clarify the product logic before designing or coding.

---

# 16. Current Product Summary

## Artworks Management

Keep every artwork record complete and organised.

Manage artworks, artists, images, prices, availability and documents from one central place.

## Website Publisher

Update the gallery website from the artwork database.

Publish artworks, artists and exhibitions online without using a separate CMS.

## Gallery Assistant

Turn gallery data into daily working material.

Prepare emails, captions, lists, PDFs and follow-ups faster from existing artwork records.

## Private Selections

Create private selections for collectors.

Build, share and update curated viewing rooms directly from the gallery inventory.

---

# 17. North Star

Vitreen exists to make gallery information circulate better.

The long-term product vision:

> A small contemporary gallery enters artwork information once, then uses it across every important surface of its work: website, sales, communication, private selections and collector follow-up.

This is the Gallery OS.
