# Vitreen — guide de collaboration

Ce fichier est lu à chaque session. Il sert de mémoire stable du projet :
positionnement, conventions, pièges à éviter. À enrichir au fil du temps.

> **Obligatoire :** lire `vitreen-playbook.md` en entier au début de chaque
> session, avant toute décision produit, UX, copywriting, design ou
> implémentation.

---

## 1. Positionnement (la vision)

Vitreen connecte des **agents IA** à l'inventaire d'œuvres d'une galerie et
transforme ces données existantes en emails, sélections et PDF prêts pour les
collectionneurs — **dans Gmail et WhatsApp**, là où les échanges ont déjà lieu.

Ligne de marque actuellement sur le site :

> **Give your gallery superpowers.**
> Connect AI agents to your artwork inventory and turn existing data into
> collector-ready emails, selections and PDFs for Gmail and WhatsApp.

### L'inversion à retenir

```text
Hier        : le dashboard était le produit, l'agent une fonctionnalité.
Aujourd'hui : l'agent est le produit, le dashboard est sa salle des machines.
```

L'inversion est **commerciale, pas technique**. La base d'œuvres reste
indispensable — sans elle l'agent n'est qu'un wrapper GPT copiable en un
week-end — mais elle n'est plus ce qu'on vend, montre ou nomme.

> La base de données est notre moat, pas notre promesse.

### Face à Artlogic

Complémentaire, jamais remplaçant : « Artlogic stocke vos œuvres. Vitreen les
fait circuler dans vos conversations de vente. » Tant qu'aucune synchro native
n'existe, écrire « à partir de vos exports Artlogic », jamais « intégration
Artlogic ».

### Packaging — une échelle, deux barreaux

L'offre est **verticale**, pas un catalogue. Même produit, même inventaire, deux
niveaux d'aide — c'est ce qui la rend indiluable.

| Barreau           | Prix       | Promesse                                              |
| ----------------- | ---------- | ----------------------------------------------------- |
| **Vitreen Send**  | 450 €/mois | Vos œuvres, prêtes à partir depuis Gmail et WhatsApp  |
| **Vitreen Agent** | 950 €/mois | La réponse est déjà rédigée quand vous ouvrez l'email |

Les deux incluent un **onboarding unique de 4 500 €** (structuration de
l'inventaire — obligatoire, les add-ins ne valent que ce que valent les fiches).
Chiffres publics actuels, validation business encore à faire.

**Règle** : les deux barreaux portent de l'IA. Send a la recherche en langage
naturel et la génération de matériel. L'écart n'est pas « avec ou sans
intelligence » mais **« ça m'aide » contre « ça travaille pour moi »**. Ne jamais
décrire Send comme la version manuelle, basique ou limitée.

**Sous l'échelle**, en services discrets — jamais une carte qui rivalise avec les
barreaux : Site connecté (projet à périmètre fixe) et Coaching IA (à partir de
400 €/session, crédibilisé par le produit : « avec l'équipe qui construit l'IA
des galeries »).

### Positionnement IA

> Vitreen construit des agents IA pour la vente d'art — groundés sur
> l'inventaire de la galerie, installés dans Gmail et WhatsApp, et qui n'envoient
> jamais rien tout seuls.

Trois piliers : **groundé, pas génératif** (ne répond que depuis vos fiches) ·
**installé, pas une app de plus** (dans Gmail et WhatsApp) · **assisté, pas
autonome** (rien ne part sans un clic humain — c'est la promesse, pas une
limite).

Ancienne source Notion _Idées à developper_ (`33f0b73f1fb780ee9f7be92f1e430f79`)
— décrit encore l'architecture Gallery OS, à relire avec prudence.

---

## 2. Vocabulaire

**Préférer**

- « agents IA », « votre inventaire connecté »
- « emails, sélections et PDF prêts pour vos collectionneurs »
- « dans Gmail et WhatsApp »
- « groundé sur vos fiches », « préparé par l'IA, envoyé par votre équipe »
- « fonctionne à côté d'Artlogic »
- « couche commerciale de la galerie »

**Éviter**

- **« Gallery OS »** (retiré du discours — voir playbook §4)
- « plateforme tout-en-un », « operating system », « suite »
- « CMS », « site web pour galeries », « logiciel d'inventaire »
- la base de données en promesse principale
- « autopilot », « envoi automatique », « AI-powered everything »
- jargon technique côté client

### Discipline de claims (non négociable)

- L'agent **prépare**, l'humain **envoie**. Jamais d'envoi autonome. C'est un
  argument de vente, pas une limitation.
- L'IA ne répond que depuis les fiches de la galerie. Jamais un prix inventé.
- Pas de claim « vendez plus » tant que ce n'est pas mesuré sur des pilotes.
  Vendre l'autonomie, la précision et la rapidité de réponse.

---

## 3. Stack & commandes

- **Framework :** Next.js (App Router) + React + TypeScript
- **Bundler dev :** **webpack** (pas Turbopack — incompatible avec le setup)
- **Styling :** Tailwind CSS
- **Animation :** framer-motion
- **i18n :** deux systèmes coexistent, voir §6

```bash
npm run dev
```

Port défini dans `.claude/launch.json` (3000 par défaut, une entrée 3001 existe
aussi).

Un hook pre-commit lance **Prettier en mode check** : lancer
`npx prettier --write` sur les fichiers touchés avant de committer, sinon le
commit est rejeté.

---

## 4. Arborescence

```
app/
  (en)/page.tsx           # Home EN — composée de components/landing/*
  (fr)/fr/page.tsx        # Home FR — composée de components/landing/*Fr
  (en)/pricing, about, products/*, solutions/[role]    # anciennes pages
  (fr)/fr/...                                           # idem FR
components/
  landing/                # LA landing actuelle (voir §5)
  shared/ArtworkAddInMocks.tsx   # mockups Gmail / WhatsApp / import
  ui/Button.tsx
  ContactModal.tsx        # modale contact, i18n via useLang
  Nav.tsx, Hero.tsx, Services.tsx, ...   # anciens composants (legacy)
lib/
  lang/strings.ts         # i18n des anciennes pages uniquement
  seo.ts
public/
  logos/, mockups/whatsapp-figma/, artworks/, ...
```

### Dette connue

- Les pages `/pricing`, `/about`, `/products/*`, `/solutions/*` tournent encore
  sur l'ancien discours Gallery OS (mega-menus, 4 piliers, personas). Aucun lien
  de la home n'y pointe, mais elles restent à recentrer ou supprimer.
- `GalleryOsSearchWidget` dans `ArtworkAddInMocks.tsx` : le texte affiché dit
  bien « Vitreen », mais le **nom de la fonction** garde l'ancien nom. À
  renommer lors d'un prochain passage dans ce fichier.
- `.claude/launch.json` est **actuellement suivi par git** alors que la règle
  était de ne pas le committer (port local, propre à chaque worktree). À retirer
  du suivi si la règle tient.

---

## 5. La landing (`components/landing/`)

Ordre des sections, identique EN et FR :

| #   | Composant        | Rôle                                                             |
| --- | ---------------- | ---------------------------------------------------------------- |
| 1   | `LandingNav`     | Nav plate, 3 ancres + CTA. **Pas de mega-menu.**                 |
| 2   | `LandingHero`    | Promesse + collage produit (Gmail + WhatsApp)                    |
| 3   | `LandingProblem` | Le problème, puis « votre base stocke, Vitreen fait circuler »   |
| 4   | `LandingProduct` | Gmail et WhatsApp, en rangées image/texte alternées              |
| 5   | `LandingAi`      | **Vitreen Agent** : garanties de grounding + brouillon à valider |
| 6   | `LandingSystem`  | Une source → toutes les sorties (socle discret)                  |
| 7   | `LandingOffers`  | Échelle Send / Agent, puis services en dessous                   |
| 8   | `LandingMethod`  | Audit / Connexion / Configuration / Amélioration                 |
| 9   | `LandingFaq`     | Objections : Artlogic, migration, envoi auto, site               |
| 10  | `LandingCta`     | CTA final + footer léger                                         |

Les variantes françaises portent le suffixe `Fr` (`LandingHeroFr`, etc.).

**Règles de composition**

- Le texte est **inline dans les composants**, pas dans `lib/lang/strings.ts`.
  Toute modification doit être portée dans le composant EN **et** son jumeau FR.
- Rythme des fonds : alternance `bg-white` / `bg-[#F5F5F3]` d'une section à
  l'autre, avec `border-t border-[#E8E8E6]`. Vérifier l'alternance après tout
  ajout ou déplacement de section.
- `LandingAi` doit rester **visuellement plus sobre** que les sections
  Gmail/WhatsApp : c'est la démonstration de l'Agent, pas une vitrine de plus.
  Pas d'ombre, pas de couleur.
- `LandingOffers` = **deux barreaux d'une échelle**, mêmes dimensions, Send en
  carte blanche bordée et Agent en carte pleine avec le badge « Recommandé ».
  Site et Coaching passent dessous en services discrets. Jamais quatre cartes
  égales — ce motif recrée le look SaaS que le recentrage cherche à quitter.
- `openContact` est exporté par `LandingNav` et réutilisé partout (EN et FR)
  pour piloter la même `ContactModal`, elle-même localisée via `useLang`.

---

## 6. Règles i18n

Deux systèmes coexistent :

1. **Landing (`components/landing/`)** — texte inline, un composant par langue.
   Modifier toujours la paire (`X.tsx` **et** `XFr.tsx`).
2. **Anciennes pages** — `lib/lang/strings.ts`, blocs `fr` et `en`. Toujours
   mettre à jour les deux.

Français : apostrophes courbes `’`, tirets cadratins `—`, guillemets `« »`.
Les mockups partagés acceptent des props de libellés pour rester dans la bonne
langue (`GalleryOsSearchWidget`, `WhatsAppPdfMockup`) — les passer côté FR.

---

## 7. Workflow Git & worktrees

- Branches : `main` (prod), `Tugan` (travail en cours sur le recentrage).
- Worktrees dans `.claude/worktrees/`, `npm install` après création.
- Prettier avant commit (voir §3).
- Commits en anglais, impératif, sujet court + corps explicatif.

---

## 8. Conventions UI / produit

- **Pas de mega-menu.** La nav est plate — c'est le signal le plus visible du
  changement de catégorie.
- Bordure du header : s'active au scroll uniquement.
- Pas d'icônes décoratives, pas de gradients, pas de faux dashboards.
- Partout où l'agent apparaît, l'étape de validation humaine doit être
  **visible** (bouton « Relire et envoyer »), pas seulement affirmée.

---

## 9. Tokens de design

| Usage                         | Hex                                        |
| ----------------------------- | ------------------------------------------ |
| Texte principal               | `#111110`                                  |
| Texte secondaire              | `#6B6A67`                                  |
| Texte tertiaire / placeholder | `#ADADAA`                                  |
| Bordure / séparateur          | `#E8E8E6` (variantes `#DCDCD8`, `#E1E1DE`) |
| Fond doux                     | `#F5F5F3`                                  |
| Fond                          | `#FFFFFF`                                  |

Classes partagées dans `components/landing/styles.ts` : `SECTION`, `CONTAINER`,
`EYEBROW`, `H2`, `H2_SUB`, `H3`, `BODY`, `BODY_SM`, `LINE_INK`. Les réutiliser
plutôt que de recréer des échelles typographiques.

- `font-display` pour les titres (cf. `app/layout.tsx`)
- Radius : `rounded-[12px]` cartes, `rounded-full` pills
- Ombre panneaux flottants : `shadow-[0_24px_60px_rgba(0,0,0,0.08)]`

---

## 10. Produit (hors de ce repo)

Le dashboard et l'agent vivent dans **`gallery-OS/dashboard/`** — dépôt séparé,
absent de ce workspace.

- Sales agent : `src/lib/sales-agent/` (Groq `openai/gpt-oss-120b`, tool loop,
  groundé sur les données galerie, 6 langues, validation humaine obligatoire,
  envoi via Resend).
- File de brouillons : `/dashboard/sales-drafts` → destinée à devenir l'écran
  d'accueil (« Inbox »).

**Chantier ouvert, non démarré** — spécifié en détail dans `vitreen-playbook.md`
§9 (phases, garde-fous, definition of done) : nav réduite à Inbox / Artworks /
Connections / Settings, modules publisher et viewing rooms masqués par feature
flags (**jamais de fork, rien de supprimé**), onboarding inversé avec aha en J1,
métriques d'usage.

Tant que ce chantier n'est pas livré, le site raconte la nouvelle histoire mais
la démo montre encore l'ancienne. C'est l'écart prioritaire à combler. Le
chantier doit être mené dans une session ouverte sur ce dépôt-là, pas ici.

---

## 11. Roadmap

| Brique                                                | Statut                      |
| ----------------------------------------------------- | --------------------------- |
| Add-in Gmail                                          | ✅ Fonctionnel              |
| WhatsApp Business                                     | ✅ Fonctionnel              |
| Sales Agent (brouillons groundés, validation humaine) | ✅ Live                     |
| Sélections privées + export PDF                       | ✅ Existant                 |
| Base d'œuvres / connecteurs CSV-Excel                 | ✅ Existant                 |
| Inbox comme écran d'accueil                           | 🔴 Phase 1                  |
| Masquage des modules par feature flags                | 🔴 Phase 1                  |
| Onboarding inversé (aha en J1)                        | 🔴 Phase 2                  |
| WhatsApp Business self-service                        | 🔴 Phase 2                  |
| Métriques d'usage (brouillons générés / validés)      | 🔴 Phase 2                  |
| Site connecté                                         | 🟡 Extension, vendue à part |
| Coaching IA                                           | 🟡 Extension, vendue à part |
| Envoi autonome (autopilot)                            | ⛔ Gelé — jamais            |

---

## 12. Social content

Guides de rédaction par réseau dans `.claude/social/` :

- `README.md` — voix globale + matrice IG vs X
- `instagram.md` — ton « luxe calme », carrousels, stories
- `twitter.md` — voix founder, threads, building in public
- `references.md` — chiffres marché, comptes inspirants, glossaire

Lire le fichier concerné avant de rédiger un post.

---

## 13. À faire évoluer dans ce fichier

- [ ] Commandes lint / test / build une fois stabilisées
- [ ] Documenter `components/ovr/` (Viewing Room app)
- [ ] Documenter l'API contact (`/api/contact`)
- [ ] Trancher le sort des anciennes pages (`/pricing`, `/about`, `/products/*`)
- [ ] Valider définitivement les montants du SKU Conversations
