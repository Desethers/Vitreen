# Vitreen — guide de collaboration

Ce fichier est lu à chaque session. Il sert de mémoire stable du projet :
positionnement, conventions, pièges à éviter. À enrichir au fil du temps.

> **Obligatoire :** lire `vitreen-playbook.md` en entier au début de chaque
> session, avant toute décision produit, UX, copywriting, design ou
> implémentation.

---

## 1. Positionnement (la vision)

> **Pivot 2026-08-11 : Vitreen n'est plus un produit unique, mais une
> société-mère avec 3 offres distinctes — Vitreen Layer, Vitreen Studio,
> Vitreen Gallery Assistant.** Voir `vitreen-playbook.md` (réécrit à cette
> date) pour l'architecture complète. Tout ce qui suit dans ce §1 (founder-led
> productized service, mécanisme fiche→sélection→Gmail/WhatsApp/PDF, pricing
> Setup/Partner) reste valide mais décrit désormais **Vitreen Layer**
> spécifiquement, pas la société entière. Avant toute décision, identifier la
> branche concernée (Playbook §17) — ne pas mélanger Layer, Studio et Gallery
> Assistant dans une même page ou un même pitch.

### Vitreen Layer — positionnement détaillé (hérité du pivot du 2026-08, toujours d'actualité pour cette branche)

**Vitreen Layer est un founder-led productized service pour galeries contemporaines**
(décidé 2026-08). Ce n'est ni un SaaS low-cost face à Artlogic, ni une agence
généraliste, ni du conseil IA abstrait, ni du développement custom par galerie.

Ce qui est personnel, c'est l'installation — un fondateur solo, assis avec la
galerie, qui structure l'inventaire, configure Gmail et WhatsApp, forme le solo galeriste ou
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

### Le mécanisme — comment une fiche circule (décidé 2026-08, playbook §1)

```text
Fiche œuvre (la base)
   → packagée en sélection privée / viewing room
   → livrée en réponse Gmail, message WhatsApp, ou PDF
```

C'est la boucle concrète que tout le reste sert à rendre fiable et rapide.
« Sélection privée » et « viewing room » désignent le **même objet** : un
ensemble d'œuvres curaté et permissionné, généré à la demande depuis une
vraie conversation — à ne pas confondre avec un studio de viewing rooms
en self-service qu'une galerie construirait et maintiendrait elle-même
(ce produit-là reste gelé, playbook §15). Toute explication de Vitreen qui
ne se dessine pas comme ce schéma en trois étapes a dérivé du produit réel.

### Face à Artlogic

Complémentaire, jamais remplaçant : « Artlogic stocke vos œuvres. Vitreen les
fait circuler dans vos conversations de vente. » Tant qu'aucune synchro native
n'existe, écrire « à partir de vos exports Artlogic », jamais « intégration
Artlogic ».

L'installation personnelle sert aussi à éviter une comparaison de prix perdue
d'avance : une galerie ne compare pas une heure passée avec le fondateur à une
ligne SaaS. Ne jamais présenter l'offre d'une façon qui invite à comparer
Vitreen à Artlogic sur le prix.

### Offre — Vitreen ou Vitreen Partner

**Pivot de prix (décidé 2026-08-09, remplace celui du 2026-08-08)** : l'offre
de base n'est plus un projet unique mais **une installation + un abonnement
mensuel**. Elle s'appelle simplement **Vitreen** (plus « Vitreen Setup »).
Partner reste une option mensuelle supplémentaire, activée après installation.

```text
Vitreen          → installation + mensuel.   Le système est installé, puis maintenu.
Vitreen Partner  → un mensuel en plus.       Activé une fois le système en place.
```

| Offre               | Prix                                    | Promesse                                    |
| ------------------- | --------------------------------------- | ------------------------------------------- |
| **Vitreen**         | dès 1 500 € d'installation + 149 €/mois | Votre système, installé et maintenu         |
| **Vitreen Partner** | + 350 €/mois, disponible après Setup    | Un système qui continue d'évoluer avec vous |

**Vitreen** inclut : migration de la base d'œuvres (artistes, œuvres, images,
prix, disponibilité), add-in Gmail, outils de vente WhatsApp, configuration
Gmail/WhatsApp, configuration de l'assistant IA, éditeur de sélections et
suivi, prise en main de l'équipe. Livré en ~3 semaines. Le mensuel de 149 €
porte l'hébergement, l'inférence et la maintenance technique ; il ne finance
pas de nouvelles fonctionnalités ni d'évolution de workflow — c'est ce que
Partner ajoute.

**La maintenance incluse dans le mensuel de base est une liste fermée**, et
c'est la protection de périmètre la plus importante de toute l'offre. Elle
couvre uniquement :
correction de bugs, maintien du fonctionnement existant, mises à jour de
sécurité, compatibilité technique raisonnable, restauration en cas de problème.
Elle ne couvre pas : nouvelles fonctionnalités, nouvelles intégrations,
nouveaux templates, changement de structure de données, évolution de workflow,
demandes spécifiques. Dire oui une fois rouvre la frontière définitivement.

**Partner** inclut : session de travail mensuelle, améliorations de workflow,
nouveaux formats email et PDF, formation et accompagnement de l'équipe,
configuration de l'assistant IA, accompagnement inventaire et données,
assistance technique prioritaire.

Chiffres actuels, validation business encore à faire.

**Ancienne règle levée (2026-08-08) : « Ne jamais vendre Partner comme Setup +
options »** ne tient plus littéralement — c'est désormais exactement le
modèle : Partner est un module additionnel, débloqué après Setup, à 350 €/mois.
Ce qui reste vrai et à préserver : ne pas présenter ce module en tableau
comparatif à colonnes de features (voir Vocabulaire ci-dessous), et garder la
différence de ton entre les deux — Setup se choisit, Partner se propose une
fois le système en place, pas au même moment ni sur le même écran de décision.

**Principe économique** (à ne jamais perdre de vue) : le service finance le
produit · le produit empêche Vitreen de devenir une agence · l'accompagnement
personnel évite la comparaison directe avec Artlogic · le périmètre
standardisé protège le temps du solo founder. Les quatre tiennent ensemble —
affaiblir l'un fait céder les trois autres.

**Capacité** : c'est le **nombre de clients Partner** qui contraint, pas le
nombre de Setup. Un Setup livré ne consomme que de la maintenance, qui se
groupe entre clients ; un Partner consomme une session mensuelle à vie. D'où
l'interdiction de mélanger les deux — « un peu de suivi » ajouté à un client
Setup transforme une queue bornée en queue infinie. Plafond exact encore
inconnu : logger les jours réels (installation / sessions Partner / maintenance
Setup) puis appliquer la formule du playbook §6.

**Frontière de personnalisation** — personnalisable : imports, champs
commerciaux, modèles, ton, règles de visibilité, workflows Gmail/WhatsApp.
Jamais personnalisable : l'architecture centrale, le produit entier, la
roadmap pour un seul client, des outils sans rapport avec l'inventaire et les
conversations commerciales.

**Budget temps** : côté Partner, la session mensuelle **est** le budget ; côté
Setup, la livraison est le budget et la maintenance n'en est pas un second.

**Vocabulaire** : dire les prix est normal. Interdit : « plan », « tier »,
« upgrade », et tout tableau comparatif à colonnes de features. Acceptable :
« installation », « mensuel », « partenariat », « maintenance ». Le mensuel
existe désormais dans l'offre de base, mais on le nomme « mensuel », pas
« abonnement » ni « souscription » — le registre reste celui d'un système
installé et maintenu, pas d'un SaaS.

**Question tranchée par le pivot du 2026-08-09** : le sort d'un client au mois
13 et la couverture des coûts d'hébergement/inférence ne sont plus des
questions ouvertes — le mensuel de 149 € les porte en continu, au lieu des
12 mois de maintenance financés par un paiement unique.

**Statut tranché (2026-08-08)** : Site connecté redevient un article facturé à
part — « Site de galerie connecté, à partir de 4 500 €, devisé comme un projet
séparé ». Présenté comme upsell sous les cartes Setup/Partner (« Expand
Vitreen »), jamais comme une ligne de plus dans le tableau Setup/Partner
lui-même. Coaching IA autonome reste redondant (formation d'équipe déjà
incluse dans Setup et Partner).

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

### Vitreen Studio et Vitreen Gallery Assistant — pas encore travaillés dans ce repo

Aucun positionnement détaillé, pricing ou structure de page n'a encore été
défini pour ces deux branches au-delà de `vitreen-playbook.md`. Ne pas
inventer de services, de tarifs ou de wording pour Studio/Gallery Assistant —
clarifier avec l'utilisateur avant d'avancer. Repères rapides (Playbook §3-5) :

- **Vitreen Studio** : « Do the digital work for the gallery. » Studio de
  design digital (sites, identités, lancements d'expo, campagnes). Vend un
  livrable, pas de la techno. Modèle projet/retainer.
- **Vitreen Gallery Assistant** : « Help the gallery do its work. » Assistant
  IA qui cherche/prépare/rédige à partir des données de la galerie — elle
  prépare, la galerie décide. Recouvre probablement le Sales Agent existant
  (§10 ci-dessous) plutôt que d'être un nouveau chantier séparé — à confirmer
  avec l'utilisateur avant de traiter les deux comme indépendants.

---

## 2. Vocabulaire

_Le vocabulaire ci-dessous est celui de **Vitreen Layer**. Pour Studio/Gallery
Assistant, voir Playbook §15 (pas encore adapté au registre FR de ce repo)._

**Préférer**

- « agents IA », « votre inventaire connecté »
- « emails, sélections et PDF prêts pour vos collectionneurs »
- « dans Gmail et WhatsApp »
- « groundé sur vos fiches », « préparé par l'IA, envoyé par votre équipe »
- « fonctionne à côté d'Artlogic »
- « couche commerciale de la galerie »

**Éviter**

- **« Gallery OS »** (retiré du discours — voir playbook §12)
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

- Les pages `/about`, `/products/*`, `/solutions/*` tournent encore sur
  l'ancien discours Gallery OS (mega-menus, 4 piliers, personas). Aucun lien
  de la home n'y pointe, mais elles restent à recentrer ou supprimer.
  **`/pricing` fait exception** : `components/PricingPage.tsx`/`PricingPageFr.tsx`
  sont à jour sur Setup/Partner (pivot de prix du 2026-08-08, voir §1) et
  liés depuis le footer (`LandingCta`/`LandingCtaFr`).
- `GalleryOsSearchWidget` dans `ArtworkAddInMocks.tsx` : le texte affiché dit
  bien « Vitreen », mais le **nom de la fonction** garde l'ancien nom. À
  renommer lors d'un prochain passage dans ce fichier.
- `.claude/launch.json` est **actuellement suivi par git** alors que la règle
  était de ne pas le committer (port local, propre à chaque worktree). À retirer
  du suivi si la règle tient.

---

## 5. La landing (`components/landing/`)

**Doctrine (décidée 2026-08, playbook §17) : la home est un funnel, pas une
home SaaS.** Personne ne connaît Vitreen — un visiteur n'a pas de catégorie où
ranger le produit. Donc pas de hero + grille de features + tableau de prix
qui se disputent l'écran : un récit linéaire, où chaque section ne se comprend
qu'après avoir vu la précédente, qui se termine sur **une seule** action
(prendre rendez-vous). L'ordre voulu : reconnaissance du problème → le
mécanisme montré concrètement (fiche → sélection/viewing room → Gmail/
WhatsApp/PDF, cf. §1 ci-dessus) → l'agent démontré en direct → comment
l'installation se déroule → l'offre (jamais en tableau comparatif) → CTA.
Interdit : toute section qui résume le produit en 3-4 « piliers » avec icône —
c'est un retour au réflexe SaaS, pas une étape de funnel.

Ordre des sections **tel que documenté historiquement** — attention, ne
reflète plus `app/(en)/page.tsx` réel (voir écart signalé plus bas) :

| #   | Composant            | Rôle                                                                                                                                  |
| --- | -------------------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| 1   | `LandingNav`         | Nav plate, 3 ancres + CTA. **Pas de mega-menu.**                                                                                      |
| 2   | `LandingHero`        | Promesse (le collage produit historique en a été retiré, voir note ci-dessous)                                                        |
| 2b  | `LandingRecognition` | ⚠️ Nouveau, non commité — bonne ébauche de l'étape « reconnaissance » du funnel : le moment vécu par la galerie avant Vitreen         |
| 3   | `LandingProblem`     | Le problème, puis « votre base stocke, Vitreen fait circuler »                                                                        |
| 4   | `LandingProduct`     | Gmail et WhatsApp, en rangées image/texte alternées (voir régression ci-dessous)                                                      |
| 5   | `LandingAi`          | Démo de l'agent : garanties de grounding + brouillon à valider (l'eyebrow affiche « Vitreen Agent », nom de tier périmé — à renommer) |
| 6   | `LandingSystem`      | Une source → toutes les sorties (socle discret)                                                                                       |
| 7   | `LandingOffers`      | Cartes Vitreen / Vitreen Partner — mêmes `OfferCard` que `/pricing` (à jour 2026-08-09)                                               |
| 8   | `LandingMethod`      | Audit / Connexion / Configuration / Amélioration                                                                                      |
| 9   | `LandingFaq`         | Objections : Artlogic, migration, envoi auto, site — doivent arriver **après** le mécanisme montré, pas avant                         |
| 10  | `LandingCta`         | CTA final + footer léger                                                                                                              |

Les variantes françaises portent le suffixe `Fr` (`LandingHeroFr`, etc.).

**⚠️ État réel de `app/(en)/page.tsx` au 2026-08-05 :** la page ne monte que
`LandingNav`, `LandingHero`, `HeroDashboardMock`, `LandingRecognition`,
`LandingProblem`, `LandingProduct`, `LandingMethod`, `LandingOffers` — dans cet
ordre. **`LandingAi`, `LandingSystem`, `LandingFaq`, `LandingCta` existent en
code mais ne sont montés nulle part**, même avant les changements non commités
actuels — la table ci-dessus décrit une intention documentée, pas l'état réel
du fichier. En plus de ça, un passage récent non commité sur `Tugan` a ajouté
`LandingRecognition.tsx` (bonne base pour l'étape « reconnaissance ») mais a
aussi **réintroduit `ServicesGrid`** (la grille de cartes produit de l'ancien
Gallery OS, pointant vers `/products/archive`, `/products/viewing-rooms`,
`/products/custom-operations`) dans `LandingHero` et `LandingProduct` — le
pattern « grille de features » que la doctrine funnel interdit. Les deux sont
à traiter comme un chantier à reprendre, pas comme une référence.

**Règles de composition**

- Le texte est **inline dans les composants**, pas dans `lib/lang/strings.ts`.
  Toute modification doit être portée dans le composant EN **et** son jumeau FR.
- Rythme des fonds : alternance `bg-white` / `bg-[#F5F5F3]` d'une section à
  l'autre, avec `border-t border-[#E8E8E6]`. Vérifier l'alternance après tout
  ajout ou déplacement de section.
- `LandingAi` doit rester **visuellement plus sobre** que les sections
  Gmail/WhatsApp : c'est la démonstration de l'Agent, pas une vitrine de plus.
  Pas d'ombre, pas de couleur.
- `LandingOffers`/`LandingOffersFr` sont **à jour** depuis le 2026-08-09 : les
  deux montent les mêmes `OfferCard` que `components/PricingPage.tsx` (Vitreen
  dès 1 500 € + 149 €/mois, Partner + 350 €/mois). La version FR portait encore
  l'ancienne échelle Send (450 €/mois) / Agent (950 €/mois) et a été réécrite —
  au passage ont disparu la mention « onboarding unique de 4 500 € » (qui
  contredisait le nouveau prix) et le bloc « Également disponible » (Site
  connecté sans prix + Coaching IA à 400 €/session, tous deux périmés).
  **Toute modification de pricing doit être portée dans les quatre fichiers** :
  `PricingPage.tsx`, `PricingPageFr.tsx`, `LandingOffers.tsx`,
  `LandingOffersFr.tsx`. Reste à faire sur cette section : la réordonner selon
  la doctrine funnel (playbook §17).
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
§18 (phases, garde-fous, definition of done) : nav réduite à cinq entrées —
Inbox / Artworks / **Selections** (sélections privées et viewing rooms,
désormais surface visible du produit, pas un module masqué — playbook §12) /
Connections / Settings. Seuls le publisher de site et les modules d'exposition
restent masqués par feature flags (**jamais de fork, rien de supprimé**).
Onboarding inversé avec aha en J1, métriques d'usage.

Tant que ce chantier n'est pas livré, le site raconte la nouvelle histoire mais
la démo montre encore l'ancienne. C'est l'écart prioritaire à combler. Le
chantier doit être mené dans une session ouverte sur ce dépôt-là, pas ici.

---

## 11. Roadmap (scope Vitreen Layer)

_Studio et Gallery Assistant n'ont pas de roadmap propre — ne pas en inventer._

| Brique                                                | Statut                                                 |
| ----------------------------------------------------- | ------------------------------------------------------ |
| Add-in Gmail                                          | ✅ Fonctionnel                                         |
| WhatsApp Business                                     | ✅ Fonctionnel                                         |
| Sales Agent (brouillons groundés, validation humaine) | ✅ Live                                                |
| Sélections privées + export PDF (viewing rooms)       | ✅ Existant — surface centrale du mécanisme (§1)       |
| Base d'œuvres / connecteurs CSV-Excel                 | ✅ Existant                                            |
| Inbox comme écran d'accueil                           | 🔴 Phase 1                                             |
| Nav produit : ajouter Selections en 3ᵉ entrée visible | 🔴 Phase 1 (playbook §12, §18)                         |
| Masquage des modules restants par feature flags       | 🔴 Phase 1                                             |
| Onboarding inversé (aha en J1)                        | 🔴 Phase 2                                             |
| WhatsApp Business self-service                        | 🔴 Phase 2                                             |
| Métriques d'usage (brouillons générés / validés)      | 🔴 Phase 2                                             |
| Cartes pricing alignées home + /pricing               | ✅ Fait 2026-08-09 (4 fichiers, voir §5)               |
| Réordonner la home selon la doctrine funnel           | 🔴 À faire (playbook §17)                              |
| Sort d'un client au mois 13                           | ✅ Tranché — le mensuel 149 € le porte en continu (§1) |
| Site connecté                                         | ✅ Tranché — offre séparée, à partir de 4 500 € (§1)   |
| Coaching IA autonome                                  | ⛔ Redondant (formation incluse dans les deux offres)  |
| Envoi autonome (autopilot)                            | ⛔ Gelé — jamais                                       |

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

- [ ] Repenser la home EN/FR selon l'architecture à 3 branches (Playbook §12) —
      elle décrit aujourd'hui Layer seul, pas la société entière
- [ ] Définir positionnement, services et pricing de Vitreen Studio et
      Vitreen Gallery Assistant (rien de fait au-delà de `vitreen-playbook.md`)
- [ ] Clarifier si Gallery Assistant = le Sales Agent existant (§10) renommé,
      ou un chantier distinct
- [ ] Commandes lint / test / build une fois stabilisées
- [ ] Documenter `components/ovr/` (Viewing Room app)
- [ ] Documenter l'API contact (`/api/contact`)
- [ ] Trancher le sort des anciennes pages (`/about`, `/products/*`)
- [ ] Valider définitivement les montants Vitreen (dès 1 500 € + 149 €/mois),
      Partner (+350 €/mois) et le module Site connecté (4 500 €) — pivot du
      2026-08-09, encore non validé côté business
- [ ] Réordonner la home EN/FR selon la doctrine funnel (playbook §17) :
      reconnaissance → mécanisme montré → agent démontré → installation →
      offre → CTA
- [ ] Retirer `ServicesGrid` (grille produit legacy) de `LandingHero` et
      `LandingProduct` — réintroduit par erreur, incompatible avec la
      doctrine funnel (voir §5)
- [ ] Décider si/où le mécanisme (fiche → sélection/viewing room →
      Gmail/WhatsApp/PDF) est montré visuellement sur la home — c'est l'étape
      2 du funnel et elle n'existe pas encore en composant dédié
- [ ] Mesurer le plafond de capacité sur les premiers clients (playbook §6)
