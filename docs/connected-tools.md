# ConnectedTools — use case design

`components/ConnectedTools.tsx`

## Idée

Avant ce composant, Vitreen se présentait comme "un site pour galerie". Ce mock répond à une
objection implicite : _"vous allez encore nous faire changer d'outils ?"_

ConnectedTools montre l'inverse — un seul écran "Gallery OS" au centre, et autour, les
canaux par lesquels une œuvre part déjà chez un collectionneur : email (Gmail) et
WhatsApp. Le message visuel : **Vitreen orchestre, les outils existants restent**.

## Anatomie

### 1. `GalleryOsDashboard` (centre)

Le cœur du composant — réutilisé à 3 endroits du site (voir "Réutilisation").

- Sidebar gauche (26% de largeur) : navigation type CRM — Overview, Artworks (actif),
  Artists, Exhibitions, Inquiries, Sales drafts (badge "2"), Private Selection, Collectors,
  Tools. Footer "Powered by Vitreen".
- Zone principale : header "Œuvres" + compteur ("12 au total · 12 disponibles · 0 vendue"),
  bouton "+ Ajouter", barre de recherche (`⌘K`), pills de filtres (Disponibles, Réservées,
  Vendues, Consignées, En prêt + pill artiste), puis un tableau de 12 œuvres
  (vignette couleur, titre, artiste, année, prix, statut "Available").
- Deux props contrôlent les variantes :
  - `glass` : fond translucide/blur (`bg-white/72 backdrop-blur-md`) — utilisé quand le
    dashboard est superposé à une photo (hero, Showcase).
  - `compact` : sidebar masquée, colonnes réduites à `Titre / Statut`, header simplifié
    avec menu burger — variante mobile.

### 2. `GmailMock` (flottant, haut-droite)

Reproduction fidèle d'un composeur Gmail "New Message" : destinataires, sujet, corps
de mail avec une **photo de mur de galerie générée en CSS pur** (pas d'image — gradients
représentant mur/œuvre/sol/reflet/éclairage de rail), métadonnées de l'œuvre ("Sun Dog"),
et un popover Vitreen flottant en bas à droite du corps du mail.

Message : depuis Gallery OS, on insère une œuvre directement dans un email classique —
pas de nouvelle interface à apprendre pour le collectionneur.

### 3. `WhatsappBotMock` (flottant, bas)

Conversation WhatsApp dans un thème sombre : l'utilisateur envoie une image d'œuvre,
le bot Vitreen répond ("Reçu. 'sans titre' ajoutée à votre Sélection"), puis répond à la
commande `/pdf` en générant un PDF de sélection (2 pages, 44 Ko) directement dans le fil.

Message : les commandes "magiques" (Distribute, Generate PDF) fonctionnent depuis une
conversation existante, sans changer de canal.

### 4. `ActionPill`

Petite pilule flottante (icône + label) — élément de composition "Comet-style" pour
suggérer une action contextuelle au survol/scroll de la section.

## Réutilisation de `GalleryOsDashboard`

| Usage                                          | Variante   | Contexte                                             |
| ---------------------------------------------- | ---------- | ---------------------------------------------------- |
| `ConnectedTools` (section dédiée)              | par défaut | Section "outils connectés" de la home                |
| `HeroDashboardMock` (desktop)                  | `glass`    | Superposé à la photo de galerie dans le hero         |
| `HeroDashboardMock` (mobile)                   | `compact`  | Dashboard plein écran, sidebar masquée               |
| `Showcase`                                     | `glass`    | Même traitement translucide que le hero              |
| `PortfolioPreviewShell` (`/portfolio-preview`) | —          | Page standalone pour partager/iframer le mockup seul |

Un seul composant source de vérité pour le visuel "produit" — toute évolution du dashboard
(couleurs, données, layout) se propage partout où il apparaît.

## Données mock

`SAMPLE_ARTIST` / `SAMPLE_ARTWORK` viennent de `lib/mocks/sampleData.ts` — les 12 lignes
du tableau (`ARTWORK_ROWS`) sont codées en dur dans `ConnectedTools.tsx` avec des couleurs
représentant chaque œuvre (pas de vraies images), pour rester légères et stylées de façon
cohérente.

## Historique (commits clés)

- `11d1a1d` — Add ConnectedTools section — Comet-style composition (création)
- `176988e` — fond blanc, suppression des rotations
- `d6714a7` — GmailMock fidèle au composeur Gmail réel
- `9040b23` → `bc4891a` — itérations de proportions (dashboard 68% → 90% → 80% de largeur,
  Gmail mock réduit, hauteur 16/10 → 16/13)
- `f5b3ce3` — extraction en page `/portfolio-preview` pour partage externe
- `9f0edbd` — réduction de moitié de la hauteur de la barre de recherche (variante `glass`)
