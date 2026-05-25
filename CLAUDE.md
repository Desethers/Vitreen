# Vitreen — guide de collaboration

Ce fichier est lu à chaque session. Il sert de mémoire stable du projet : positionnement, conventions, pièges à éviter. À enrichir au fil du temps.

---

## 1. Positionnement (la vision)

Every gallery develops its own way of working — across artworks, publishing, collector relationships and internal coordination. Vitreen helps connect these fragmented activities into a more coherent working environment without forcing galleries into rigid software workflows.

### Pitch de vente

Vitreen aide les galeries d’art à faire circuler leurs œuvres plus rapidement et plus simplement auprès de leurs collectionneurs.

Concrètement, on connecte les archives, inventaires ou bases de données existantes de la galerie, puis on transforme ces œuvres en matériel collector prêt à être partagé : viewing rooms, sélections privées, PDFs, pages web ou échanges WhatsApp.

L’idée n’est pas de remplacer les habitudes de travail des galeries avec une nouvelle plateforme lourde, mais plutôt de construire une couche opérationnelle discrète autour de leurs outils existants pour fluidifier la diffusion des œuvres et les conversations de vente.

### 4 piliers

**1. Artworks & Archives**
Organise artworks, exhibitions and archives across existing gallery systems. Vitreen structures artwork information, exhibition history, inventory and archival material from spreadsheets, legacy CMSs, PDFs or gallery databases — without replacing existing tools.

**2. Public & Private Publishing**
Publish artworks across websites, viewing rooms, collector PDFs and private sharing channels. Vitreen helps galleries move seamlessly between public presentation and private distribution while maintaining consistency around artworks and exhibitions.

**3. Collector Relationships**
Keep collector inquiries, follow-ups and sales conversations connected to the right artworks. Vitreen helps galleries preserve continuity across collector interactions and sales preparation without introducing unnecessary CRM complexity.

**4. Gallery Assistants**
Assist galleries across publishing, collector communication and operational preparation using gallery-specific context. The goal is not to automate relationships, but to give galleries more time to focus on artists, exhibitions and collectors.

Source détaillée (idées, pricing, killer features) : page Notion *Idées à developper* (ID `33f0b73f1fb780ee9f7be92f1e430f79`).

---

## 2. Vocabulaire

**Préférer**
- "Sales Journey", "Collector Engagement"
- "Distribute" (le bouton magique)
- "Viewing Room", "Private Viewing"
- "Partner", "Digital Sales Partner"

**Éviter**
- "CMS", "Responsive", "Sites web pour galeries"
- "Studio de création de sites"
- Jargon technique côté client

---

## 3. Stack & commandes

- **Framework :** Next.js (App Router) + React + TypeScript
- **Bundler dev :** **webpack** (pas Turbopack — incompatible avec le setup actuel)
- **Styling :** Tailwind CSS
- **Animation :** framer-motion
- **i18n :** `lib/lang.tsx` (FR/EN, contexte React custom)

Dev server (port 3001 par défaut) :
```bash
npm run dev          # webpack
```

Le port est défini dans `.claude/launch.json` (chaque worktree a le sien — ne pas commiter).

---

## 4. Arborescence

```
app/                    # Routes Next.js (App Router)
components/             # Composants React
  ui/                   # Primitives (Button, etc.)
  ovr/                  # Viewing Room app
  Nav.tsx               # Navbar + mega-menus Product & Solutions
  Audiences.tsx, Showcase.tsx, ...
lib/
  lang.tsx              # i18n FR/EN — source unique de vérité texte
public/                 # Images, fonts, vidéos
  paula-cooper-background.jpg
  gallery hero mock/, krea/, artworks/, ...
```

---

## 5. Tokens de design

Couleurs :
| Usage | Hex |
| --- | --- |
| Texte principal | `#111110` |
| Texte secondaire | `#6B6A67` |
| Texte tertiaire / placeholder | `#ADADAA` |
| Bordure / séparateur | `#E8E8E6` |
| Fond doux | `#F5F5F3` |
| Fond | `#FFFFFF` |

Typographie :
- `font-display` pour les titres (cf. `app/layout.tsx`)
- Sans-serif système pour le reste

Tailles courantes dans la nav et menus :
- Eyebrows / labels gris : `text-[10px]` ou `text-[11px]` (pas d'uppercase par défaut)
- Items menu : `text-[14px]` (`font-display`)
- Descriptions : `text-[11px]` à `text-[12px]`

Radius :
- Cartes / dropdowns : `rounded-lg`
- Pills / badges : `rounded-full`
- Images dans dropdowns : `rounded-md`

Ombres : `shadow-[0_24px_60px_rgba(0,0,0,0.08)]` pour les panneaux flottants.

---

## 6. Règles i18n

- **Toujours mettre à jour FR ET EN** dans `lib/lang.tsx`. Jamais l'un sans l'autre.
- Caractères spéciaux français : utiliser `’` pour apostrophes courbes, `—` pour tirets cadratins (le fichier les utilise en escape).
- Quand on ajoute un menu/section, ajouter la structure complète dans les deux blocs `fr` et `en`.

---

## 7. Workflow Git & worktrees

- Worktrees vivent dans `.claude/worktrees/`
- Chaque worktree a son propre `node_modules` — il faut faire `npm install` après création.
- **Ne jamais commiter** `.claude/launch.json` (port local, propre à chaque worktree).
- Branches actives : `main` (prod), `V2` (refonte en cours).

---

## 8. Conventions UI / produit

- **Mega-menus** (Product, Solutions) : trigger sur hover ET clic, panneau positionné `absolute top-full left-1/2 -translate-x-1/2`. Animation `framer-motion` (`opacity` + `y`).
- **Bordure header** s'active quand : page scrollée OU mega-menu ouvert (`scrolled || megaMenuOpen`).
- **Pas d'icônes décoratives** dans les menus (on a explicitement écarté les avatars-lettres style Legora).

---

## 9. Roadmap produit (état actuel)

| Brique | Statut |
| --- | --- |
| CRM / Inventaire | ✅ Existant |
| Site galerie / Vitrine | ✅ Existant |
| Pages artistes / expositions | ✅ Existant |
| Viewing Room Studio | 🟡 *Bientôt* (badge sur la nav) |
| Distribute (bouton magique) | 🔴 À développer — *killer feature* |
| Generate Private Room | 🔴 À développer |
| Export to Story (9:16 IG) | 🔴 À développer |
| AI Copywriter | 🔴 À développer |
| Viewing Room "Active" (analytics) | 🔴 À développer |
| Dashboard / Slack Partner | 🔴 À développer |

---

## 10. Pricing (en réflexion)

- Pivot vers du **récurrent (SaaS + Service)** plutôt que one-shot
- Setup : ~2 000€
- Monthly Partnership : 300-800€/mois
- Argument : *"Artlogic = 200€/mois pour stocker. Vitreen = 500€/mois pour vendre."*

Détails dans la page Notion.

---

## 11. Social content

Guides de rédaction par réseau dans `.claude/social/` :
- `README.md` — voix globale + matrice IG vs X
- `instagram.md` — ton "luxe calme", carrousels, stories
- `twitter.md` — voix founder, threads, building in public
- `references.md` — chiffres marché, comptes inspirants, glossaire

Quand on me demande "écris un post IG sur X", je lis le fichier concerné avant de rédiger.

## 12. À faire évoluer dans ce CLAUDE.md

- [ ] Ajouter les commandes lint / test / build une fois stabilisées
- [ ] Documenter `components/ovr/` (Viewing Room app)
- [ ] Documenter le contact API (`/api/contact`)
- [ ] Ajouter exemples de "bonnes" vs "mauvaises" formulations marketing
