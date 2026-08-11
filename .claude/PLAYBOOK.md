# Vitreen Playbook

## Purpose

This document defines the strategic architecture of Vitreen.

Vitreen is one company building products and services for galleries and the art market.
It operates through three distinct offers:

1. **Vitreen Layer** — software infrastructure
2. **Vitreen Studio** — digital design and services
3. **Vitreen Gallery Assistant** — AI assistance for gallery work

These three offers can reinforce each other, but they must never be confused.

The goal of this playbook is to preserve clear positioning, product boundaries and commercial logic across product, design, copywriting and implementation decisions.

---

# 1. Vitreen Architecture

Vitreen is the parent company.
Its three branches solve different kinds of problems.

```text
                         VITREEN
             ┌────────────┼────────────┐
             │            │            │
           LAYER        STUDIO      GALLERY
                                    ASSISTANT

          Software      Service          AI
        Infrastructure  Execution    Intelligence
```

The distinction can be summarized simply:

## Vitreen Layer

> Give the gallery better tools.

## Vitreen Studio

> Do the digital work for the gallery.

## Vitreen Gallery Assistant

> Help the gallery do its work.

These are not three versions of the same product.
They represent three different customer intentions and three different business models.

---

# 2. Company Thesis

Gallery work increasingly depends on digital infrastructure, digital presentation and digital communication.

But galleries do not all need the same type of help.

Some need better systems.
Some need someone to execute digital work for them.
Some need faster ways to work with the information they already have.

Vitreen addresses these needs separately.

The company thesis is:

> Galleries need better digital infrastructure, better digital execution and better ways to work with their own information.

Vitreen can provide all three without forcing them into one oversized product.

---

# 3. The Three Distinctions

## 01 — Vitreen Layer

### Category

Software.

### Role

Vitreen Layer is the technical infrastructure used to organise gallery information and make it usable across sales and communication workflows.

### Core promise

> Gallery data, connected to the places where the gallery works and sells.

### What the customer buys

The customer buys access to software and connected tools.

### Core capabilities

Vitreen Layer can include:

- artwork database
- artist records
- exhibition records
- image and document management
- prices
- availability
- inventory search
- Gmail integration
- WhatsApp workflows
- PDF generation
- private selections
- website connections
- APIs
- publishing tools
- reusable artwork information

### Core principle

Artwork information should be entered once and reused across multiple surfaces.

```text
Artwork data
     ↓
Database
     ↓
Gmail
WhatsApp
PDF
Private selection
Website
```

Vitreen Layer is responsible for making this circulation possible.

### What Layer is not

Vitreen Layer is not:

- an agency
- a website design service
- a consulting offer
- a generic CRM
- a marketplace
- a creative studio
- an AI chatbot

The product may connect to these activities, but they are not its positioning.

### Product language

Use:

- artwork data
- gallery database
- inventory
- sales tools
- connected information
- Gmail
- WhatsApp
- private selections
- artwork information
- available works
- gallery workflow

Avoid:

- digital transformation agency
- creative services
- bespoke design
- custom websites as the primary offer
- AI-powered everything
- all-in-one platform

---

# 4. Vitreen Studio

## Category

Service.

## Role

Vitreen Studio is a digital design and creative service dedicated to galleries, artists and the art market.

Vitreen Studio sells completed work.
It does not sell software.

### Core promise

> High-quality digital work for galleries and artists.

### What the customer buys

The customer hires Vitreen Studio to produce, improve or operate something.

Typical briefs could be:

- redesign our gallery website
- create our artist website
- launch a new exhibition online
- improve our digital identity
- maintain our website
- create campaign material
- improve our SEO
- design a new digital experience
- help manage our digital presence

### Services

Vitreen Studio can offer:

- gallery websites
- artist websites
- exhibition websites
- digital identities
- editorial design
- landing pages
- exhibition launches
- newsletters
- digital campaigns
- SEO
- content production
- website maintenance
- website updates
- digital art direction
- ongoing creative support

### Core principle

Sell the outcome, not the technology.

The client does not need to know how Vitreen produces the work.

Vitreen Studio may internally use:

- Vitreen Layer
- AI
- automation
- internal components
- design systems
- code generation
- reusable infrastructure

But this is operational leverage, not the product proposition.

### Example

Bad:

> We connect your database to a custom website using Vitreen infrastructure.

Better:

> We design and build gallery websites.

Bad:

> Our technology helps galleries maintain their digital presence.

Better:

> Websites, launches and ongoing digital work for galleries and artists.

### What Studio is not

Vitreen Studio is not:

- a SaaS
- a database product
- an inventory system
- an AI assistant
- a Layer implementation package disguised as an agency
- a technical consulting company

Studio should be understandable even by a client who never buys Vitreen Layer.

### Positioning direction

Preferred:

> **Vitreen Studio**
> A digital studio for contemporary art.

Alternative:

> **Vitreen Studio**
> Digital design for galleries and artists.

Supporting line:

> Websites, identities and ongoing digital work for galleries and artists.

---

# 5. Vitreen Gallery Assistant

## Category

AI product.

## Role

Vitreen Gallery Assistant helps gallery teams work with their own information faster.

It turns gallery data, inventory and context into useful actions and material.

### Core promise

> An AI assistant that knows your gallery.

### What the customer buys

The customer buys assistance.

The assistant should reduce the amount of searching, rewriting, preparing and assembling required in everyday gallery work.

### Core capabilities

Vitreen Gallery Assistant can:

- search inventory conversationally
- find available works
- answer questions about artworks
- prepare collector replies
- draft emails
- generate WhatsApp messages
- prepare PDFs
- create selections
- summarize artist information
- retrieve documents
- prepare follow-ups
- recall relevant collector context
- compare artworks
- suggest material to send
- turn instructions into ready-to-review outputs

### Example interaction

Collector message:

> Do you have any recent works by Sarah below €15,000?

Gallery Assistant:

- searches inventory
- identifies available works
- excludes sold or reserved artworks
- retrieves relevant images and details
- prepares a draft response

The user can then:

- remove works
- change visible information
- hide prices
- generate a PDF
- open the reply in Gmail
- prepare a WhatsApp message

### Core principle

The assistant must be grounded in reliable gallery information.

It should not invent artwork details, prices, availability or provenance.

AI is the interface and reasoning layer.
Gallery data remains the source of truth.

### What Gallery Assistant is not

Gallery Assistant is not:

- a generic ChatGPT wrapper
- a database
- a CRM
- autonomous sales automation
- a replacement for gallery judgment
- an automatic collector relationship manager

It prepares.
The gallery decides.

---

# 6. Relationship Between Layer and Gallery Assistant

Layer and Gallery Assistant are separate products, but they can have a strong technical relationship.

## Layer

Stores and connects information.

## Assistant

Understands requests and acts on that information.

```text
             VITREEN LAYER

Artwork
Artists
Prices
Availability
Documents
Selections
History

                  ↓

       GALLERY ASSISTANT

Search
Reason
Prepare
Draft
Recommend
Assemble
```

A simple distinction:

> Layer answers: "Where is the information?"
> Assistant answers: "What should I do with it?"

### Example

Layer:

> Show artworks under €20,000.

Assistant:

> Find five available works under €20,000 that would make sense after James's previous inquiry, then prepare an email without prices.

The second requires reasoning and context.

---

# 7. Relationship Between Layer and Studio

Studio may use Layer internally or recommend it to clients, but Layer is not required to buy Studio.

A gallery should be able to hire Vitreen Studio only for:

- a website
- a redesign
- an exhibition launch
- a campaign
- digital support

without being forced to migrate to Vitreen Layer.

Likewise, a gallery can use Vitreen Layer without buying creative services from Studio.

This separation protects the clarity of both offers.

### Strategic advantage

Vitreen Studio can use better internal tools than conventional agencies.

This can create:

- faster production
- easier website updates
- reusable gallery information
- lower operating costs
- more consistent outputs
- better margins

But these advantages should remain mostly invisible to the customer.

Studio sells execution.

---

# 8. Relationship Between Studio and Gallery Assistant

These offers solve opposite forms of delegation.

## Studio

> Do it for me.

## Gallery Assistant

> Help me do it myself.

This distinction should remain clear.

Example:

A gallery wants a completely new website.
→ **Vitreen Studio**

A gallery wants help writing an email based on existing artwork information.
→ **Gallery Assistant**

A gallery wants its artwork database connected to Gmail.
→ **Vitreen Layer**

---

# 9. Customer Intent Framework

When deciding where a feature, page or sales request belongs, identify the customer's intention.

## "I need a system."

→ Vitreen Layer

Examples:

- We need a better artwork database.
- We need our inventory in Gmail.
- We want to generate PDFs faster.
- We want our data connected to the website.

## "I need someone to do this."

→ Vitreen Studio

Examples:

- We need a new website.
- Our website needs redesigning.
- We need a digital campaign.
- We need help maintaining the website.

## "I need help doing this."

→ Vitreen Gallery Assistant

Examples:

- What should I reply?
- Find the artworks mentioned by this collector.
- Prepare a selection.
- Write a follow-up.
- Generate a PDF from these works.

This framework should be used before adding any new feature or offer.

---

# 10. Commercial Architecture

The three branches use different economic models.

| Branch            | Customer buys               | Business model        |
| ----------------- | --------------------------- | --------------------- |
| Vitreen Layer     | Infrastructure              | Subscription          |
| Vitreen Studio    | Delivered work              | Project / retainer    |
| Gallery Assistant | Productivity / intelligence | Subscription / add-on |

They can create natural cross-sell opportunities.

### Studio → Layer

During a website project, Vitreen discovers fragmented gallery data.
Layer can solve the underlying infrastructure problem.

### Layer → Studio

A Layer customer wants a new public website or significant redesign.
Studio can deliver it.

### Layer → Gallery Assistant

Once gallery information is structured, the assistant becomes much more useful.

### Gallery Assistant → Layer

A gallery wants more reliable AI results and discovers that its inventory needs better structure.
Layer provides the foundation.

---

# 11. Brand Architecture

Vitreen remains the master brand.

Preferred naming:

- **Vitreen Layer**
- **Vitreen Studio**
- **Vitreen Gallery Assistant**

Do not create separate disconnected brands unless there is a strong future reason.

The relationship should remain visible.

```text
Vitreen
│
├── Layer
├── Studio
└── Gallery Assistant
```

Each branch can have its own visual personality, but they should share:

- typography
- art direction
- tone
- quality standards
- brand logic
- understanding of the art market

---

# 12. Website Architecture

The Vitreen website should not present one enormous list of features.

It should first explain the company, then the three ways Vitreen can help.

Suggested structure:

## Hero

> Digital products and services for galleries.

or

> Building better digital infrastructure for galleries.

Then introduce the three branches.

---

## Vitreen Layer

**Software for gallery data and sales.**

Organise artwork information and use it across Gmail, WhatsApp, private selections and other gallery workflows.

CTA:

> Explore Layer

---

## Vitreen Studio

**A digital studio for contemporary art.**

Websites, identities and ongoing digital work for galleries and artists.

CTA:

> Explore Studio

---

## Vitreen Gallery Assistant

**An AI assistant that knows your gallery.**

Search inventory, prepare collector replies and turn gallery information into ready-to-use material.

CTA:

> Explore Gallery Assistant

---

# 13. Product Boundaries

Before adding anything to Vitreen, ask:

### Does it store, organise, connect or distribute gallery information?

→ Layer

### Is Vitreen being hired to produce the final result?

→ Studio

### Does AI interpret information or prepare an action for the user?

→ Gallery Assistant

If the answer is unclear, the idea is probably crossing product boundaries.

Do not solve this ambiguity by putting the feature everywhere.
Choose one owner.

---

# 14. Design Principles by Branch

## Layer

Should feel:

- operational
- precise
- calm
- reliable
- efficient

Interface priorities:

- information hierarchy
- search
- status
- availability
- quick actions
- structured artwork data

Avoid decorative SaaS patterns.

---

## Studio

Should feel:

- editorial
- visual
- cultural
- premium
- confident

Website priorities:

- projects
- imagery
- typography
- case studies
- art direction
- capabilities
- outcomes

Avoid dashboard language.

---

## Gallery Assistant

Should feel:

- immediate
- conversational
- intelligent
- contextual
- action-oriented

Interface priorities:

- natural language
- gallery objects inside conversation
- suggested actions
- review before execution
- transparent data sources
- easy editing

Avoid a blank generic chatbot interface.

---

# 15. Copywriting Rules

## Company level

Talk about the breadth of Vitreen.

Use:

- products and services for galleries
- digital infrastructure
- digital design
- gallery technology
- tools for gallery work

Do not explain every capability in the hero.

---

## Layer copy

Concrete and operational.

Use words such as:

- inventory
- artwork data
- Gmail
- WhatsApp
- availability
- database
- sales material
- selections

---

## Studio copy

Talk about work delivered.

Use words such as:

- website
- identity
- design
- digital direction
- exhibition
- campaign
- ongoing support

Do not sell infrastructure.

---

## Gallery Assistant copy

Talk about tasks.

Use verbs:

- ask
- find
- prepare
- draft
- search
- select
- retrieve
- summarise
- reply

Avoid vague AI terminology.

---

# 16. Strategic Principle

The strength of Vitreen does not come from forcing everything into one product.

It comes from owning several complementary ways of helping the same market.

Vitreen Layer creates infrastructure.
Vitreen Studio creates outcomes.
Vitreen Gallery Assistant creates leverage for the user.

```text
Infrastructure
      +
Execution
      +
Intelligence
      =
Vitreen
```

The three branches can share knowledge, technology and market expertise internally.

Externally, each one must remain simple enough to understand independently.

---

# 17. Session Checklist

Before designing, writing or implementing anything for Vitreen:

1. Is this Layer, Studio or Gallery Assistant?
2. What exactly is the customer buying?
3. Is this software, service or AI assistance?
4. Are we accidentally combining two offers?
5. Can this branch be understood independently?
6. Does Layer remain infrastructure rather than agency work?
7. Does Studio sell outcomes rather than technology?
8. Does Gallery Assistant provide reasoning rather than simple database functionality?
9. Is there a natural cross-sell without making one branch mandatory?
10. Does the decision make Vitreen easier, not harder, to understand?

If the answer to question one is unclear, clarify the product boundary before proceeding.

---

# 18. Current Summary

## Vitreen Layer

**Software for gallery data and sales.**

Organise artwork information and connect it to the tools galleries already use.

---

## Vitreen Studio

**A digital studio for contemporary art.**

Websites, identities and ongoing digital work for galleries and artists.

---

## Vitreen Gallery Assistant

**An AI assistant that knows your gallery.**

Search, retrieve and turn gallery information into useful actions and collector-ready material.

---

# North Star

Vitreen does not need to be one giant product.

It should become a company with a clear understanding of gallery work and several specialised ways to improve it.

> **Layer provides the infrastructure.**
> **Studio provides the execution.**
> **Gallery Assistant provides the intelligence.**
