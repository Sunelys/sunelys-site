# Suivi publication SEO Sunelys

Derniere verification : 2026-09-22.

Ce fichier sert de garde-fou pour le calendrier editorial SEO. Il doit etre lu avant toute automation ou preparation de nouvelle semaine.

## Regle de cadence

- Une semaine de contenu = 2 articles maximum.
- Ne jamais avancer vers une nouvelle semaine tant que la semaine precedente n'est pas validee, poussee et verifiee en ligne.
- Le statut local "prepare" ne signifie pas "publie".
- Le statut Git "untracked" ou "modified" signifie que le contenu n'est pas entierement pousse sur `origin/main`.
- Verifier `https://sunelys.fr` avant de considerer une semaine comme publiee.

## Etat courant

Etat global au 2026-09-22, apres verification publique :

- S1 a S4 sont publiees et verifiees en HTTP 200. S4 a ete autorisee par le message utilisateur « fais le » puis poussee avec le commit `9423bbb`. S5 a S8 restent en backlog.
- S1 est validee, poussee et publiee.
- Les deux URLs S1 et les deux URLs S2 repondent en `200` sur `https://sunelys.fr`.
- S2 a ete poussee avec le commit `842572c` et est verifiee en ligne.
- S5 est la prochaine semaine a preparer, lors de la prochaine passe. Ne pas publier S5 sans validation ; ne pas creer S9.

## Tableau de suivi

| Semaine | Contenus | Etat local | Etat Git (S4 actualisee le 2026-09-22) | Etat public (S1-S4 verifies le 2026-09-22 ; S5-S8 historique) | Prochaine action |
|---|---|---|---|---|---|
| S1 | `cerfa-declaration-prealable-panneaux-solaires`, `externaliser-administratif-photovoltaique` | Validee | Poussee sur `origin/main` | 200 / 200 | Terminee |
| S2 | `declaration-prealable-panneaux-solaires-pieces-delais`, `attestation-consuel-photovoltaique` | Validee et publiee | Poussee (`842572c`) | 200 / 200 | Terminee |
| S3 | `delai-declaration-prealable-photovoltaique`, `delai-raccordement-enedis-photovoltaique` | Validee et publiee | Poussee (`8f0eff8`) | 200 / 200 le 2026-09-14 | Terminee |
| S4 | `delai-consuel-photovoltaique`, `sous-traiter-declaration-prealable-photovoltaique` | Validee et publiee | Poussee (`9423bbb`) | 200 / 200 le 2026-09-22 | Terminee |
| S5 | `dp-refusee-panneaux-solaires-que-faire`, `etapes-raccordement-enedis-panneaux-solaires` | Preparee localement, a revalider | Suivis par Git, hors manifeste public | 404 / 404 | Prochaine semaine a preparer ; validation requise |
| S6 | `prix-consuel-photovoltaique`, `gerer-soi-meme-ou-deleguer-administratif-solaire` | Preparee localement, a revalider | Suivis par Git, hors manifeste public | 404 / 404 | Backlog, ne pas publier avant S5 |
| S7 | `declaration-prealable-ou-permis-construire-photovoltaique`, `cout-raccordement-enedis-photovoltaique` | Preparee localement, a revalider | Suivis par Git, hors manifeste public | 404 / 404 | Backlog, ne pas publier avant S6 |
| S8 | `consuel-refuse-motifs-solutions`, `cout-gestion-administrative-photovoltaique` | Preparee localement, a revalider | Suivis par Git, hors manifeste public | 404 / 404 | Backlog, ne pas publier avant S7 |

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
7. Apres deploiement, verifier les URLs publiques en `200`.
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
