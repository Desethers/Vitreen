# Archive des sections

Historique visuel des sections de la home Vitreen, depuis le premier commit de `main`
(2026-08-26). Visible sur `/archive` (non indexée).

- `versions/<section>/<Composant>_<date>_<sha>.tsx` : snapshot figé du fichier tel qu’il
  était à ce commit (EN uniquement ; les jumeaux `Fr` suivent la même histoire).
  Les imports relatifs ont été réécrits en `@/…` et pointent vers les composants **actuels**
  (sauf `HeroObjects` et `OfferCard`, snapshotés à la date voulue). Ne pas modifier.
- `registry.tsx` : liste des sections/versions + mockups encore dans le repo.
- Ajouter une nouvelle version avant de réécrire une section : copier le fichier actuel dans
  `versions/<section>/` avec le nom `<Composant>_<date>_<sha>.tsx`, puis l’ajouter au registre.
