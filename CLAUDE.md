# Vitreen — guide de collaboration

Ce fichier est lu à chaque session. Il sert de mémoire stable du projet : positionnement, conventions, pièges à éviter. À enrichir au fil du temps.

---

## 1. Positionnement (la vision)

**Pivot 2026-08 : Vitreen n'est plus un produit unique, mais une société-mère avec 3 offres distinctes.** Toute décision produit, copywriting ou design doit d'abord identifier à quelle branche elle appartient — voir le [Vitreen Playbook](.claude/PLAYBOOK.md) (référence complète, en anglais) avant de trancher une ambiguïté de positionnement.

### Les 3 branches

1. **Vitreen Layer** — _Software._ « Give the gallery better tools. » L'infrastructure logicielle : base d'œuvres, artistes, expositions, Gmail, WhatsApp, PDF, sélections privées, site web. Le client achète un accès logiciel. Modèle : abonnement.
2. **Vitreen Studio** — _Service._ « Do the digital work for the gallery. » Studio de design digital pour galeries et artistes : sites, identités, lancements d'expositions, campagnes, maintenance. Le client achète un livrable, pas de la technologie. Modèle : projet / retainer.
3. **Vitreen Gallery Assistant** — _AI._ « Help the gallery do its work. » Assistant IA qui cherche, prépare, rédige à partir des données de la galerie — il prépare, la galerie décide. Modèle : abonnement / add-on.

Ces 3 branches se renforcent (Layer ↔ Studio ↔ Gallery Assistant, cross-sell naturel) mais **ne doivent jamais être confondues** dans une même page, un même pitch ou une même feature. Avant d'ajouter quoi que ce soit, se poser la question du Playbook §13 : est-ce que ça stocke/connecte de la donnée (Layer) ? Est-ce que Vitreen est engagé pour produire un livrable (Studio) ? Est-ce que l'IA interprète ou prépare une action (Gallery Assistant) ?

### État de la migration

Le contenu ci-dessous (vocabulaire, roadmap, pricing) décrit encore largement l'ancien positionnement « produit unique » (pré-pivot) et correspond en pratique à **Vitreen Layer**. Il doit être relu et re-scopé par branche au fil des sessions plutôt que pris tel quel comme vérité pour Studio ou Gallery Assistant — ne pas halluciner de pricing/roadmap pour ces deux branches tant qu'ils n'ont pas été explicitement définis avec l'utilisateur.

Source détaillée additionnelle (idées, pricing, killer features côté Layer) : page Notion _Idées à developper_ (ID `33f0b73f1fb780ee9f7be92f1e430f79`).

---

## 2. Vocabulaire

_Ci-dessous : vocabulaire hérité pré-pivot (Layer). Pour le choix des mots par branche (Layer / Studio / Gallery Assistant), voir [Playbook §15](.claude/PLAYBOOK.md#15-copywriting-rules)._

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

## 9. Roadmap produit (état actuel, scope Vitreen Layer)

_Cette roadmap couvre Layer uniquement. Studio et Gallery Assistant n'ont pas encore de roadmap propre — ne pas en inventer._

| Brique                            | Statut                             |
| --------------------------------- | ---------------------------------- |
| CRM / Inventaire                  | ✅ Existant                        |
| Site galerie / Vitrine            | ✅ Existant                        |
| Pages artistes / expositions      | ✅ Existant                        |
| Viewing Room Studio               | 🟡 _Bientôt_ (badge sur la nav)    |
| Distribute (bouton magique)       | 🔴 À développer — _killer feature_ |
| Generate Private Room             | 🔴 À développer                    |
| Export to Story (9:16 IG)         | 🔴 À développer                    |
| AI Copywriter                     | 🔴 À développer                    |
| Viewing Room "Active" (analytics) | 🔴 À développer                    |
| Dashboard / Slack Partner         | 🔴 À développer                    |

---

## 10. Pricing (en réflexion, scope Vitreen Layer)

_Ce pricing couvre Layer uniquement (modèle abonnement, cf. Playbook §10). Studio (projet/retainer) et Gallery Assistant (abonnement/add-on) ont des modèles distincts à définir._

- Pivot vers du **récurrent (SaaS + Service)** plutôt que one-shot
- Setup : ~2 000€
- Monthly Partnership : 300-800€/mois
- Argument : _"Artlogic = 200€/mois pour stocker. Vitreen = 500€/mois pour vendre."_

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

- [ ] Re-scoper vocabulaire / roadmap / pricing par branche (Layer / Studio / Gallery Assistant) suite au pivot 2026-08 — voir §1
- [ ] Ajouter les commandes lint / test / build une fois stabilisées
- [ ] Documenter `components/ovr/` (Viewing Room app)
- [ ] Documenter le contact API (`/api/contact`)
- [ ] Ajouter exemples de "bonnes" vs "mauvaises" formulations marketing
