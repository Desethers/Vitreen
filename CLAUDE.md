# Vitreen — guide de collaboration

Ce fichier est lu à chaque session. Il sert de mémoire stable du projet :
positionnement, conventions, pièges à éviter. À enrichir au fil du temps.

> **Obligatoire :** lire `vitreen-playbook.md` en entier au début de chaque
> session, avant toute décision produit, UX, copywriting, design ou
> implémentation.

---

## 1. Positionnement (la vision)

**Vitreen est un founder-led productized service pour galeries contemporaines**
(décidé 2026-08). Ce n'est ni un SaaS low-cost face à Artlogic, ni une agence
généraliste, ni du conseil IA abstrait, ni du développement custom par galerie.

> Un système commercial assisté par IA, installé personnellement avec chaque
> galerie, à partir d'un socle produit commun.

Ce qui est personnel, c'est l'installation — un fondateur solo, assis avec la
galerie, qui structure l'inventaire, configure Gmail et WhatsApp, forme
l'équipe. Ce qui est partagé, c'est le produit derrière. Sans le socle commun,
c'est de l'agence ; sans l'installation personnelle, c'est un SaaS de plus.

Ligne de marque actuellement sur le site :

> **Give your gallery superpowers.**
> We turn your artwork inventory into a practical sales system for Gmail and
> WhatsApp — with AI-assisted replies, selections and PDFs built around the
> way your team works.
> Built personally with each gallery. Powered by a shared Vitreen system.

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

L'installation personnelle sert aussi à éviter une comparaison de prix perdue
d'avance : une galerie ne compare pas une heure passée avec le fondateur à une
ligne SaaS. Ne jamais présenter l'offre d'une façon qui invite à comparer
Vitreen à Artlogic sur le prix.

### Offre — Vitreen Partner

**Une seule offre**, pas une échelle de plans. Un accompagnement de six mois :
structuration de l'inventaire, installation, configuration Gmail/WhatsApp,
formats email/sélections/PDF, formation de l'équipe, ajustements sur des
demandes réelles, réunion mensuelle, support défini, amélioration continue dans
un périmètre standardisé.

> À partir de 950 €/mois pendant 6 mois, puis logiciel et support à partir de
> 250 €/mois.

Chiffres actuels, validation business encore à faire. Le prix doit visiblement
baisser une fois l'installation terminée — une galerie qui paie encore 950 €
en mois 8 sans rien d'actif en cours d'installation est surfacturée.

**Principe économique** (à ne jamais perdre de vue) : le service finance le
produit · le produit empêche Vitreen de devenir une agence · l'accompagnement
personnel évite la comparaison directe avec Artlogic · le périmètre
standardisé protège le temps du solo founder. Les quatre tiennent ensemble —
affaiblir l'un fait céder les trois autres.

**Frontière de personnalisation** — personnalisable : imports, champs
commerciaux, modèles, ton, règles de visibilité, workflows Gmail/WhatsApp.
Jamais personnalisable : l'architecture centrale, le produit entier, la
roadmap pour un seul client, des outils sans rapport avec l'inventaire et les
conversations commerciales. Une demande hors périmètre est un signal pour
refuser le client, pas pour l'accepter.

**Statut à trancher** : l'ancienne offre portait Site connecté et Coaching IA
en extensions séparées. Partner inclut désormais la formation d'équipe, ce qui
rend le coaching autonome redondant. Le sort de Site connecté (extension à
part vs absorbé dans « ce qu'on personnalise ») n'est pas décidé — ne pas le
refaire apparaître comme article facturé sans trancher.

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

| #   | Composant        | Rôle                                                                                                                                  |
| --- | ---------------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| 1   | `LandingNav`     | Nav plate, 3 ancres + CTA. **Pas de mega-menu.**                                                                                      |
| 2   | `LandingHero`    | Promesse + collage produit (Gmail + WhatsApp)                                                                                         |
| 3   | `LandingProblem` | Le problème, puis « votre base stocke, Vitreen fait circuler »                                                                        |
| 4   | `LandingProduct` | Gmail et WhatsApp, en rangées image/texte alternées                                                                                   |
| 5   | `LandingAi`      | Démo de l'agent : garanties de grounding + brouillon à valider (l'eyebrow affiche « Vitreen Agent », nom de tier périmé — à renommer) |
| 6   | `LandingSystem`  | Une source → toutes les sorties (socle discret)                                                                                       |
| 7   | `LandingOffers`  | ⚠️ Échelle Send / Agent (**périmée**, voir note ci-dessous)                                                                           |
| 8   | `LandingMethod`  | Audit / Connexion / Configuration / Amélioration                                                                                      |
| 9   | `LandingFaq`     | Objections : Artlogic, migration, envoi auto, site                                                                                    |
| 10  | `LandingCta`     | CTA final + footer léger                                                                                                              |

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
- `LandingOffers` implémente encore l'échelle Send (450 €/mois) / Agent
  (950 €/mois) — **cette structure est périmée** depuis le pivot vers Vitreen
  Partner (playbook §5). Le code n'a pas encore été mis à jour ; ne pas s'y
  fier comme référence de pricing, et ne pas la recopier ailleurs. Prochaine
  session de code sur la landing : refaire cette section en une seule offre
  Partner (voir playbook §5 et §6).
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
§15 (phases, garde-fous, definition of done) : nav réduite à Inbox / Artworks /
Connections / Settings, modules publisher et viewing rooms masqués par feature
flags (**jamais de fork, rien de supprimé**), onboarding inversé avec aha en J1,
métriques d'usage.

Tant que ce chantier n'est pas livré, le site raconte la nouvelle histoire mais
la démo montre encore l'ancienne. C'est l'écart prioritaire à combler. Le
chantier doit être mené dans une session ouverte sur ce dépôt-là, pas ici.

---

## 11. Roadmap

| Brique                                                | Statut                                        |
| ----------------------------------------------------- | --------------------------------------------- |
| Add-in Gmail                                          | ✅ Fonctionnel                                |
| WhatsApp Business                                     | ✅ Fonctionnel                                |
| Sales Agent (brouillons groundés, validation humaine) | ✅ Live                                       |
| Sélections privées + export PDF                       | ✅ Existant                                   |
| Base d'œuvres / connecteurs CSV-Excel                 | ✅ Existant                                   |
| Inbox comme écran d'accueil                           | 🔴 Phase 1                                    |
| Masquage des modules par feature flags                | 🔴 Phase 1                                    |
| Onboarding inversé (aha en J1)                        | 🔴 Phase 2                                    |
| WhatsApp Business self-service                        | 🔴 Phase 2                                    |
| Métriques d'usage (brouillons générés / validés)      | 🔴 Phase 2                                    |
| Landing recentrée sur l'offre Vitreen Partner         | 🔴 À faire (code périmé, voir §5)             |
| Site connecté                                         | 🟠 Statut à trancher (playbook §13)           |
| Coaching IA autonome                                  | ⛔ Redondant avec Partner (formation incluse) |
| Envoi autonome (autopilot)                            | ⛔ Gelé — jamais                              |

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
- [ ] Valider définitivement les montants de l'offre Vitreen Partner
- [ ] Reconstruire `LandingOffers`/`LandingOffersFr` autour de Partner (le code
      montre encore l'ancienne échelle Send/Agent, périmée)
- [ ] Trancher le sort de l'extension Site connecté (playbook §13)
