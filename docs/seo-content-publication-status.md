# Suivi publication SEO Sunelys

Derniere verification : 2026-11-02.

Ce fichier sert de garde-fou pour le calendrier editorial SEO. Il doit etre lu avant toute automation ou preparation de nouvelle semaine.

## Regle de cadence

- Une semaine de contenu = 2 articles maximum.
- Ne jamais avancer vers une nouvelle semaine tant que la semaine precedente n'est pas validee, poussee et verifiee en ligne.
- Le statut local "prepare" ne signifie pas "publie".
- Le statut Git "untracked" ou "modified" signifie que le contenu n'est pas entierement pousse sur `origin/main`.
- Verifier les routes canoniques `https://sunelys.fr/blog/<slug>/` et `https://sunelys.fr/sitemap.xml` avant de considerer une semaine comme publiee. Les routes racines `/<slug>/` ne sont pas les URLs des articles.

## Etat courant

Etat global au 2026-11-02, apres verification publique :

- S1 a S8 sont publiees et verifiees en HTTP 200 sur leurs routes canoniques `/blog/<slug>/`. S6 a ete publiee avec `cc34bc0`, S7 avec `d3484d7` et S8 avec `13676bf`.
- S1 est validee, poussee et publiee.
- Les deux URLs S1 et les deux URLs S2 repondent en `200` sur leurs routes canoniques `https://sunelys.fr/blog/<slug>/`.
- S2 a ete poussee avec le commit `842572c` et est verifiee en ligne.
- S9 est validee et publiee avec `1857027` : deux revisions d'articles existants verifiees en ligne le 2 novembre. S10 est le prochain lot a valider ; S10 a S12 restent prepares sans publication.

## Tableau de suivi

| Semaine | Contenus | Etat local | Etat Git verifie le 2026-11-02 | Etat public verifie le 2026-11-02 | Prochaine action |
|---|---|---|---|---|---|
| S1 | `cerfa-declaration-prealable-panneaux-solaires`, `externaliser-administratif-photovoltaique` | Validee | Poussee sur `origin/main` | 200 / 200 | Terminee |
| S2 | `declaration-prealable-panneaux-solaires-pieces-delais`, `attestation-consuel-photovoltaique` | Validee et publiee | Poussee (`842572c`) | 200 / 200 | Terminee |
| S3 | `delai-declaration-prealable-photovoltaique`, `delai-raccordement-enedis-photovoltaique` | Validee et publiee | Poussee (`8f0eff8`) | 200 / 200 le 2026-09-14 | Terminee |
| S4 | `delai-consuel-photovoltaique`, `sous-traiter-declaration-prealable-photovoltaique` | Validee et publiee | Poussee (`9423bbb`) | 200 / 200 le 2026-09-22 | Terminee |
| S5 | `dp-refusee-panneaux-solaires-que-faire`, `etapes-raccordement-enedis-panneaux-solaires` | Validee et publiee | Poussee (`d3eab6a`) | 200 / 200 le 2026-10-05 | Terminee |
| S6 | `prix-consuel-photovoltaique`, `gerer-soi-meme-ou-deleguer-administratif-solaire` | Validee et publiee | Poussee (`cc34bc0`) | 200 / 200 le 2026-10-12 | Terminee |
| S7 | `declaration-prealable-ou-permis-construire-photovoltaique`, `cout-raccordement-enedis-photovoltaique` | Validee et publiee | Poussee (`d3484d7`) | 200 / 200 le 2026-10-19 | Terminee |
| S8 | `consuel-refuse-motifs-solutions`, `cout-gestion-administrative-photovoltaique` | Validee et publiee | Poussee (`13676bf`) | 200 / 200 le 2026-10-26 | Terminee |

## Préparation S9 à S12 du 2 novembre 2026

Demande explicite : « fais un audit seo complet et prepare les prochaines semaines ». Cette demande autorise la préparation groupée de quatre semaines ; elle n'autorise pas leur publication. La règle de publication séquentielle et de validation explicite reste applicable. Deux interventions maximum par semaine, dont deux révisions pour S9.

La vérification du 2 novembre confirme S1-S8 en HTTP 200 et présentes dans le sitemap. Le suivi distant à `e656618` confirme les publications S6 `cc34bc0`, S7 `d3484d7`, S8 `13676bf`. HTTP 200 ne signifie pas indexation : 34 des 40 URLs du sitemap sont indexées selon les inspections Google de cette passe.

| Lot | Contenus | Préparation locale | État Git | État public | Prochaine action |
|---|---|---|---|---|---|
| S9 | `cerfa-declaration-prealable-panneaux-solaires`, `consuel-photovoltaique-delais-dossier` | Révisions validées et publiées | Poussées (`1857027`) | 200 / 200 ; nouveaux textes et métadonnées vérifiés le 2026-11-02 | Terminée ; S10 à valider |
| S10 | `pieces-complementaires-dp-photovoltaique`, `mise-en-service-photovoltaique-apres-consuel` | Deux nouveaux textes rédigés et contrôlés | Non suivis, hors manifeste | Non publiés | Après S9, validation du lot puis publication |
| S11 | `cacsi-autoconsommation-sans-injection-demarches`, `dossier-edf-oa-incomplet-documents` | Deux nouveaux textes rédigés et contrôlés | Non suivis, hors manifeste | Non publiés | Après S10, validation du lot puis publication |
| S12 | `photos-declaration-prealable-panneaux-solaires`, `tableau-suivi-dossiers-photovoltaiques-installateur` | Deux nouveaux textes rédigés et contrôlés | Non suivis, hors manifeste | Non publiés | Après S11, validation du lot puis publication |

Emplacement exact des textes préparés : `/Users/sunelys/Documents/SITE SUNELYS/sunelys-site-seo-novembre-20261102/src/content/blog/`. Ce worktree est basé sur `origin/main=e656618`. Le checkout principal reste à `525e9e8`, trente commits derrière, avec ses modifications préexistantes conservées. Ne pas publier les anciennes copies du checkout principal à la place de ces versions.

- [Audit complet](</Users/sunelys/Documents/SITE SUNELYS/sunelys-site-seo-novembre-20261102/docs/audit-seo-complet-2026-11-02.md>).
- [Calendrier, textes et lots de fichiers](</Users/sunelys/Documents/SITE SUNELYS/sunelys-site-seo-novembre-20261102/docs/seo-calendrier-s9-s12-2026-11-02.md>).
- Contrôles : Node 22.23.0, 23 tests, build normal/audit de 46 pages ; prévisualisation temporaire/audit de 52 pages ; HTTP local, assets, liens et métadonnées des huit contenus conformes.
- Le manifeste final est identique à origin/main. Les six nouvelles routes ne sont pas générées dans le build final et ne figurent pas dans son sitemap.
- Écart explicitement conservé : contenu local préparé ≠ Git poussé ≠ site public. Aucun commit, push ou publication pendant cette préparation.
- Avant publication, fixer les dates réelles, intégrer les liens entrants prévus et contrôler la semaine précédente. Pour S9, vérifier les nouvelles métadonnées et le texte public, pas seulement le code HTTP.

## Publication S9 du 2026-11-02

Validation explicite reçue : « ok pour s9 ». Commit de publication `1857027` poussé sur `main`, limité aux deux articles Cerfa et dossier technique Consuel. Aucun changement du manifeste ni publication de S10-S12.

Vérification publique finale : 2026-11-02 10:05:40 CET. Les deux URLs répondent en HTTP 200, avec les nouveaux titres, descriptions, sections ajoutées et date de modification du 2 novembre dans les données structurées. Canonicals, sitemap et six références d'images contrôlés. Le statut Vercel du commit est `success`.

Contrôles avant publication : Node 22.23.0, 23 tests réussis, build Astro et audit statique de 46 pages ; `git diff --check` conforme. Les seize routes S1-S8 ont été revérifiées en 200 et présentes dans le sitemap avant publication.

État : S9 validée, poussée et publiée. S10 est le prochain lot, à valider séparément. Les six brouillons S10-S12 restent locaux, hors manifeste et non publiés. Le checkout principal ancien reste à `525e9e8`, avec ses changements préexistants ; seul son suivi est synchronisé. Aucun écart entre Git distant, suivi et site public concernant S9. Le travail non publié reste dans le worktree de préparation indiqué ci-dessus.

Preuve détaillée : `/Users/sunelys/Documents/SITE SUNELYS/outputs/audit-seo-2026-11-02/data/publication-s9.json`.

## Definition des statuts

- `Preparee` : les fichiers existent localement et ont passe les controles locaux au moment de leur creation.
- `Validee` : les articles de la semaine ont ete relus et acceptes pour publication.
- `Poussee` : les fichiers de la semaine sont commits et pushes sur `origin/main`.
- `Publiee` : les URLs de la semaine repondent en `200` sur `https://sunelys.fr`.

## Workflow hebdomadaire attendu

1. Lire ce fichier.
2. Identifier la premiere semaine non publiee dans l'ordre.
3. Ne traiter que cette semaine.
4. Relire les deux contenus de la semaine et le maillage associe.
5. Lancer les controles locaux : metadata/assets, `git diff --check`, build Astro, crawl statique, sitemap.
6. Si la semaine est validee manuellement, preparer le commit/push uniquement pour les fichiers de cette semaine et les dependances strictement necessaires.
7. Apres deploiement, verifier les URLs publiques canoniques `/blog/<slug>/` en `200` et leur presence dans `/sitemap.xml`.
8. Mettre ce fichier a jour avec le nouvel etat.

## Interdictions pour l'automation

- Ne pas creer de contenu S9 tant que S2 a S8 ne sont pas publiees dans l'ordre.
- Ne pas publier plus d'une semaine a la fois.
- Ne pas supposer qu'un fichier local est publie.
- Ne pas faire de reset, checkout destructif ou suppression de changements existants.
- Ne pas melanger une semaine de contenu avec des refactors non necessaires.
- Avant toute verification, confirmer que le depot courant est exactement `/Users/sunelys/Documents/SITE SUNELYS/sunelys-site`, que `git rev-parse --show-toplevel` renvoie ce chemin et que `origin` est configure. Si ce controle echoue, arreter la passe et signaler un blocage de configuration sans modifier le depot.

## Publication S3 du 2026-09-14

Validation utilisateur reçue. Deux articles datés du 14 septembre, marqueurs backlog retirés pour aligner l’audit marketing, liens du corps vers S5/S7 retirés, procédure Enedis actuelle ajoutée. Build Node 22.23.0 et audit des 34 pages réussis ; maillage des deux HTML et sitemap vérifiés. S4 à S8 hors manifeste. Aucun changement hors S3 embarqué. Statut public confirmé après déploiement : S1/S2/S3 en 200 et présentes au sitemap ; S4 reste absente du sitemap.

Verification finale : 2026-09-14 10:48:40 CEST. Aucun écart entre suivi, origin/main et site public concernant S3.

## Préparation S4 du 2026-09-22

Contrôle du dépôt exact et de `origin` réussi. Après fetch, `main` et `origin/main` sont à `7b92baa` (avance/retard 0/0). S1 à S3 répondent toutes en HTTP 200 ; les deux URLs S4 répondent en 404. Le suivi, Git et le site public concordent sur la séquence : S4 reste la première semaine non publiée. Deux liens du corps vers S6/S8 ont été retirés de l'article Consuel, et l'information sur les anciennes versions SC 144 a été actualisée. Build Astro avec Node 22.23.0, audit statique (34 pages), `git diff --check` et sitemap conformes. Les modifications préexistantes hors S4 restent intactes. S4 attend une validation explicite avant commit, push et publication.

## Publication S4 du 2026-09-22

Validation utilisateur « fais le » reçue. Commit `9423bbb` limité aux deux articles S4 et au manifeste public, puis poussé sur `main`. Déploiement Vercel réussi. Build Astro Node 22.23.0, audit statique de 36 pages, `git diff --check` et sitemap conformes. Les deux URLs S4 répondent en HTTP 200 et figurent dans le sitemap public. S1 à S3 restent publiées ; S5 à S8 sont toujours hors manifeste. Aucun écart de publication entre suivi, Git et site public. Changements locaux hors S4 préservés.

## Publication S5 du 2026-10-05

Validation utilisateur « publie » reçue. Commit `d3eab6a` limité aux deux articles S5 et au manifeste public, puis poussé sur `main`. Build Astro Node 22.23.0, 20 tests, audit statique de 38 pages, `git diff --check` et sitemap généré conformes. Les deux routes canoniques S5 répondent en HTTP 200 et figurent dans `https://sunelys.fr/sitemap.xml`. Les anciennes routes racines sans `/blog` et `/sitemap-index.xml` restent en 404 : le suivi distingue désormais explicitement ces anciennes routes des URLs canoniques. Aucun écart entre suivi, Git et site public concernant S5. S6 à S8 restent hors manifeste public.

## Publication S6 du 2026-10-12

Validation utilisateur « ok publie » reçue. Commit `cc34bc0` limité aux deux articles S6 et au manifeste public, puis poussé sur `main`. Les liens de corps vers S8, encore non publiée, ont été corrigés ou retirés avant publication. Build Astro Node 22.23.0, 20 tests, audit statique, `git diff --check` et sitemap généré conformes. Les deux routes canoniques S6 répondent en HTTP 200 et figurent dans `https://sunelys.fr/sitemap.xml`. Aucun écart entre suivi, `origin/main` et site public concernant S6. S7 et S8 restent hors manifeste public.

## Publication S7 du 2026-10-19

Validation utilisateur « ok publie » reçue. Commit `d3484d7` limité au manifeste public, les deux contenus S7 et leurs assets étant déjà versionnés et relus. Build Astro Node 22.23.0, 23 tests, audit statique de 42 pages et `git diff --check` conformes. Les deux routes canoniques S7 répondent en HTTP 200 et figurent dans `https://sunelys.fr/sitemap.xml`. Aucun écart entre suivi, `origin/main` et site public concernant S7. S8 reste hors manifeste public.

## Publication S8 du 2026-10-26

Validation utilisateur « publi » reçue. Commit `13676bf` limité au manifeste public, les deux contenus S8 et leurs assets étant déjà versionnés et relus. Build Astro Node 22.23.0, 23 tests, audit statique de 46 pages et `git diff --check` conformes. Les deux routes canoniques S8 répondent en HTTP 200 et figurent dans `https://sunelys.fr/sitemap.xml`. Aucun écart entre suivi, `origin/main` et site public concernant S8. Aucun contenu S9 n'a été créé.
