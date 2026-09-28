# Vitreen — guide de collaboration

Ce fichier est lu à chaque session. Il sert de mémoire stable du projet :
positionnement, conventions, pièges à éviter. À enrichir au fil du temps.

> **Obligatoire :** lire `vitreen-playbook.md` en entier au début de chaque
> session, avant toute décision produit, UX, copywriting, design ou
> implémentation. Le playbook est la source de vérité sur la stratégie ; ce
> fichier n'en garde que l'essentiel et les conventions du repo.

---

## 1. Positionnement

> **Recentrage du 2026-09-28 : un seul produit, trois têtes, une boucle.**
> Remplace l'architecture en 3 branches du 2026-08-11 (Layer / Studio /
> Gallery Assistant), désormais caduque :
>
> - **Studio a quitté Vitreen** le 2026-08-31 → R.R Studio sur forart.world
>   (repo et domaine séparés, `/studio` redirige). Rien de Studio ici.
> - **Gallery Assistant** n'est plus une offre : l'assistant IA est une des
>   têtes du produit.
> - **Layer** n'est plus un nom : c'est simplement « Vitreen ».
> - **viewingroom.studio** est un **produit totalement séparé** (aucune donnée
>   ni CRM partagés, jamais dans le même pitch).

### Le produit

```text
        INVENTAIRE  ◄──────────►  PERSONAL CRM + ASSISTANT IA
     (quoi : œuvres,              (qui : collectionneurs, ce qu'ils
      dispo, prix)                 ont reçu, ce qui les intéresse)
              ▲                            ▲
              └────────── VENTE ───────────┘
                    Gmail · WhatsApp · PDF
```

**L'avantage :** Vitreen reste dans les outils de la galerie — Gmail et
WhatsApp — et **organise le bruit** qui en sort. Le personal CRM est le
résultat de ce tri, pas un module à remplir. Trois gestes :

- **Vendre** — dans Gmail et WhatsApp, là où la galerie travaille déjà
- **Voir** — **Conversations**, dans le dashboard : qui attend, qui a reçu quoi
- **Demander** — le **chat de l'assistant**, qui parle à l'inventaire

### La boucle (playbook §2)

```text
1. Une demande arrive          Gmail ou WhatsApp
2. Le collectionneur est connu Personal CRM : qui, ce qu'il a déjà reçu
3. Les œuvres sont trouvées    Inventaire : dispo, prix, images
4. La réponse est préparée     Assistant : brouillon, sélection, PDF
5. Un humain envoie            toujours — jamais d'envoi autonome
6. Le CRM se souvient          quoi, à qui, quelles œuvres
```

Toute explication de Vitreen qui ne se dessine pas comme cette boucle a
dérivé du produit. Le cas de démo à utiliser partout (Marie, Sacha Elron) est
dans le playbook §2.

**Discipline de capture :** « le CRM se remplit tout seul » n'est vrai que
pour ce que Vitreen capte. Au 2026-09-28 : Gmail = fils ouverts avec l'add-in

- réponses aux envois suivis ; WhatsApp = messages collectionneurs **pas
  encore synchronisés**. Ne jamais promettre « voir tout WhatsApp » avant que la
  capture existe (plan : playbook §8).

### Face à Artlogic

Complémentaire, jamais remplaçant : « Artlogic stocke vos œuvres. Vitreen les
fait circuler dans vos conversations — et se souvient de qui a reçu quoi. »
Tant qu'aucune synchro native n'existe, écrire « à partir de vos exports
Artlogic », jamais « intégration Artlogic ». Ne jamais inviter à une
comparaison de prix avec Artlogic.

### Offre (inchangée depuis le 2026-08-12)

| Offre               | Prix       | Engagement                              |
| ------------------- | ---------- | --------------------------------------- |
| **Vitreen Sales**   | 390 €/mois | 12 mois · setup inclus                  |
| **Vitreen Partner** | 590 €/mois | 12 mois · accompagnement continu inclus |

Détail des contenus, liste fermée de maintenance, frontière de
personnalisation, principe économique et capacité : playbook §6–7. Points à
retenir :

- **La maintenance incluse est une liste fermée** (bugs, maintien de
  l'existant, sécurité, compatibilité, restauration). Pas de nouvelles
  fonctionnalités, intégrations, templates ni évolutions de workflow. Dire
  oui une fois rouvre la frontière définitivement.
- **Sales se choisit, Partner se propose** une fois le système en place. Jamais
  de tableau comparatif à colonnes.
- **La capacité se joue sur le nombre de clients Partner**, pas Sales.
- **Toute modification de pricing se porte dans quatre fichiers** :
  `PricingPage.tsx`, `PricingPageFr.tsx`, `LandingOffers.tsx`,
  `LandingOffersFr.tsx`.

### Positionnement IA

Trois piliers : **groundé, pas génératif** (ne répond que depuis les fiches) ·
**installé, pas une app de plus** (dans Gmail et WhatsApp) · **assisté, pas
autonome** (rien ne part sans un clic humain — c'est la promesse, pas une
limite).

### Indie hacker

Vitreen se construit à la manière indie : un fondateur, un produit, des petits
pas visibles, du build in public. **C'est une manière de construire et de
communiquer, pas un modèle de prix** : l'installation reste personnelle
(playbook §8–9).

---

## 2. Vocabulaire

**Préférer**

- « personal CRM », « historique du collectionneur », « qui a reçu quoi »
- « Conversations » (la surface du dashboard), « l'assistant »
- « dans Gmail et WhatsApp », « organiser le bruit »
- « préparé par l'IA, envoyé par votre équipe », « groundé sur vos fiches »
- « fonctionne à côté d'Artlogic »
- « sélection privée » (**jamais « viewing room »** côté Vitreen : ce nom
  appartient à viewingroom.studio)

**Éviter**

- « Gallery OS » (y compris « Gallery OS Conversations »), « Layer »,
  « Studio », « Gallery Assistant » comme noms d'offre
- « plateforme tout-en-un », « operating system », « suite »
- « CMS », « site web pour galeries », « logiciel d'inventaire » en promesse
- « pipeline », « deals », « lead scoring » (le CRM est personnel, pas un
  pipeline)
- « autopilot », « envoi automatique », « AI-powered everything »
- « plan », « tier », « upgrade » ; tout tableau comparatif à colonnes
- jargon technique côté client

### Discipline de claims (non négociable)

- L'agent **prépare**, l'humain **envoie**. Jamais d'envoi autonome.
- L'IA ne répond que depuis les fiches de la galerie. Jamais un prix inventé.
- Pas de claim « vendez plus » tant que ce n'est pas mesuré sur des clients.
- « Le CRM se remplit tout seul » seulement pour ce que Vitreen capte (§1).

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

Port défini dans `.claude/launch.json` (entrée `vitreen` sur 3001, entrée
`vitreen-3000` sur 3000).

Un hook pre-commit lance **Prettier en mode check** : lancer
`npx prettier --write` sur les fichiers touchés avant de committer, sinon le
commit est rejeté.

---

## 4. Arborescence

```
app/
  (en)/page.tsx           # Home EN
  (fr)/fr/page.tsx        # Home FR
  (en)/pricing, about, tools/*, solutions/[role]   # pages secondaires
  (fr)/fr/...                                      # idem FR
components/
  landing/                # sections de la home (voir §5)
  shared/ArtworkAddInMocks.tsx   # mockups Gmail / WhatsApp / import
  PricingPage.tsx, PricingPageFr.tsx
  ContactModal.tsx        # modale contact, i18n via useLang
lib/
  lang/strings.ts         # i18n des anciennes pages uniquement
  seo.ts
public/
```

### Dette connue

- `tools/viewing-rooms` : le nom de la page contredit la règle « jamais
  viewing room côté Vitreen ». À renommer (« private selections ») ou retirer.
- `/about`, `/solutions/*` : discours antérieur au recentrage du 2026-09-28,
  à relire.
- Footer : garde une colonne « Vitreen Studio » qui pointe vers forart.world —
  à confirmer ou retirer.
- `GalleryOsSearchWidget` dans `ArtworkAddInMocks.tsx` : le texte affiché dit
  « Vitreen », mais le **nom de la fonction** garde l'ancien nom.
- `.claude/launch.json` est suivi par git alors qu'il est propre à chaque
  machine/worktree.

---

## 5. La landing (`components/landing/`)

**Doctrine (playbook §9) : la home est un récit linéaire, pas une home SaaS.**
Personne ne connaît Vitreen. Ordre voulu :

1. **Reconnaissance** — le moment vécu : un collectionneur demande, le
   matériel est ailleurs, personne ne se souvient de ce qui a été envoyé.
2. **La boucle montrée** — le cas Marie, étape par étape, avec de vrais
   visuels produit.
3. **L'assistant démontré** — un brouillon groundé avec l'étape « Relire et
   envoyer » visible. Sobre : pas d'ombre, pas de couleur.
4. **L'installation** — comment ça se passe, ~3 semaines.
5. **L'offre** — cartes Sales / Partner, jamais de tableau comparatif.
6. **Un seul CTA** — prendre rendez-vous.

Interdit : toute section qui résume le produit en 3-4 « piliers » avec icône,
les sections de statistiques de marché, les claims « vendez plus ».

**État réel de `app/(en)/page.tsx` au 2026-09-28** — ne suit pas encore la
doctrine :

```text
LandingNav → LandingHero → LandingOutputs → LandingRecognition →
WhoVitreenIsFor → LandingOffers → LandingFaq → StatementSplit → LandingCta
```

- `StatementSplit` = le bloc de stats de marché (« Online art is redefining
  the economics… », « Vitreen deploys native distribution… ») : discours
  Gallery OS, interdit par la doctrine. À retirer.
- `LandingFaq` : la question « What is the difference between Send and
  Agent? » renvoie à d'anciens noms d'offre.
- Le hero (« Better tools for every way you sell art. ») et le titre de page
  (« Sales tools for art galleries ») sont antérieurs au recentrage.
- La boucle (étape 2 du récit) n'a pas encore de section dédiée.

**Règles de composition**

- Le texte est **inline dans les composants**, pas dans `lib/lang/strings.ts`.
  Toute modification doit être portée dans le composant EN **et** son jumeau FR
  (suffixe `Fr`).
- Rythme des fonds : alternance `bg-white` / `bg-[#F5F5F3]` d'une section à
  l'autre, avec `border-t border-[#E8E8E6]`. Vérifier l'alternance après tout
  ajout ou déplacement de section.
- `LandingOffers`/`LandingOffersFr` montent les mêmes `OfferCard` que
  `components/PricingPage.tsx`.
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

- Branches : `main` (prod), branches de travail (`tuganV3` actuellement).
- Worktrees dans `.claude/worktrees/`, `npm install` après création.
- Prettier avant commit (voir §3).
- Commits en anglais, impératif, sujet court + corps explicatif.

---

## 8. Conventions UI / produit

- **Pas de mega-menu.** La nav est plate.
- Bordure du header : s'active au scroll uniquement.
- Pas d'icônes décoratives, pas de gradients, pas de faux dashboards.
- Partout où l'agent apparaît, l'étape de validation humaine doit être
  **visible** (bouton « Relire et envoyer »), pas seulement affirmée.
- Visuels : uniquement la galerie de démo (Sacha Elron, Marie Beaumont…),
  jamais de vraies données client.

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

Le dashboard et l'assistant vivent dans **`/Users/raphael/Travail/Web/gallery-OS/dashboard/`**
— dépôt séparé. **Tout chantier produit se mène dans une session ouverte sur
ce dépôt-là, pas ici.** Vérifier son code avant d'affirmer qu'une capacité
existe ou non.

Repères au 2026-09-28 :

- Single-tenant : un projet/dataset Sanity par déploiement, une galerie par
  instance.
- Mémoire par collectionneur : `src/lib/conversations/memory.ts` (événements
  avec canal + œuvres), surface `src/app/workspace/conversations`.
- `src/lib/activity.ts` n'est qu'un flux de notifications — pas la mémoire.
- Capture : `src/lib/conversations/channels.ts` décrit ce que chaque canal
  capte et ne capte pas.
- Assistant : `src/lib/sales-agent/` (Groq, tool loop, groundé, validation
  humaine obligatoire) ; numéro assistant WhatsApp : `src/lib/whatsapp/`.
- Add-in Gmail : `gallery-OS/apps/gmail-addon/`.

**Plan produit (playbook §8, décidé 2026-09-28) : WhatsApp d'abord.**

0. Demander à 5 galeries : WhatsApp Business ou personnel ? ventes en groupes ?
1. Capter tout WhatsApp Business en **coexistence** Meta (même numéro, app +
   API, **180 jours d'historique** importés à l'installation → Conversations
   rempli dès le J1).
2. Conversations comme écran d'accueil : attend une réponse · à relancer ·
   nouvelles demandes sur des œuvres.
3. Chat assistant : inventaire + mémoire, sources citées, envoi dans l'app
   WhatsApp avec message pré-rempli.
4. Gmail : inchangé pour l'instant.

En pause tant que ça ne marche pas chez une vraie galerie : multi-tenant,
self-serve, publisher de site, expositions, tout nouveau module.

---

## 11. Roadmap

| Brique                                           | Statut                                       |
| ------------------------------------------------ | -------------------------------------------- |
| Inventaire + import CSV/Excel                    | ✅ Existe                                    |
| Add-in Gmail                                     | ✅ Fonctionnel                               |
| Numéro assistant WhatsApp                        | ✅ Fonctionnel                               |
| Assistant IA (brouillons groundés, validation)   | ✅ Live                                      |
| Sélections privées + PDF                         | ✅ Existe                                    |
| Mémoire collectionneur + Conversations           | ✅ Existe                                    |
| Capture Gmail                                    | 🟡 Fils ouverts + réponses suivies           |
| Capture WhatsApp (coexistence + 180 j)           | 🔴 Priorité — étape 1 du plan                |
| Conversations comme écran d'accueil              | 🔴 Ensuite                                   |
| Assistant lit la mémoire sur toutes les surfaces | 🔴 Ensuite                                   |
| Home réécrite autour de la boucle                | 🔴 À faire (§5)                              |
| Élargir au-delà des galeries                     | 🟡 Plus tard, après la boucle (playbook §11) |
| Envoi autonome (autopilot)                       | ⛔ Jamais                                    |

---

## 12. Social content

Guides de rédaction par réseau dans `.claude/social/` :

- `README.md` — voix globale + matrice IG vs X
- `instagram.md` — ton « luxe calme », carrousels, stories
- `twitter.md` — voix founder, threads, building in public
- `references.md` — chiffres marché, comptes inspirants, glossaire

Lire le fichier concerné avant de rédiger un post. Build in public : chaque
post montre un maillon de la boucle qui vient d'être livré. Jamais de nom de
client sans accord, jamais de données de collectionneurs ni de prix réels.

---

## 13. Questions ouvertes

- [ ] Réponses des 5 galeries : WhatsApp Business ou personnel ? groupes ?
- [ ] RGPD avant la première connexion réelle : DPA, hébergement des
      données (Sanity), phrase de confiance pour la galerie
- [ ] Formulation de la promesse site une fois la capture WhatsApp livrée
- [ ] Réécrire la home EN/FR autour de la boucle (§5)
- [ ] Sort de la fin des 12 mois d'engagement (reconduction, sortie)
- [ ] Partner conditionné à Sales ou non (la FAQ `/pricing` le dit, les
      cartes non)
- [ ] Valider les montants Sales 390 € / Partner 590 €
- [ ] Site connecté (à partir de 4 500 €) : garder, basculer vers R.R Studio,
      ou abandonner
- [ ] Commandes lint / test / build une fois stabilisées
- [ ] Documenter l'API contact (`/api/contact`)
