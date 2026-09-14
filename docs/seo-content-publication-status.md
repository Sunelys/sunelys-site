# Suivi publication SEO Sunelys

Derniere verification : 2026-09-14.

Ce fichier sert de garde-fou pour le calendrier editorial SEO. Il doit etre lu avant toute automation ou preparation de nouvelle semaine.

## Regle de cadence

- Une semaine de contenu = 2 articles maximum.
- Ne jamais avancer vers une nouvelle semaine tant que la semaine precedente n'est pas validee, poussee et verifiee en ligne.
- Le statut local "prepare" ne signifie pas "publie".
- Le statut Git "untracked" ou "modified" signifie que le contenu n'est pas entierement pousse sur `origin/main`.
- Verifier `https://sunelys.fr` avant de considerer une semaine comme publiee.

## Etat courant

Etat global au 2026-09-14, avant verification du deploiement S3 :

- Publication S3 preparee dans un worktree isole ; changements locaux hors S3 preserves.
- S1 et S2 restent publiees ; S3 validee par le message utilisateur « occupe toi en », activee dans le manifeste pour publication. S4 a S8 restent en backlog.
- S1 est validee, poussee et publiee.
- Les deux URLs S1 et les deux URLs S2 repondent en `200` sur `https://sunelys.fr`.
- S2 a ete poussee avec le commit `842572c` et est verifiee en ligne.
- Attendre la verification publique S3 en 200 avant de considerer S4 comme prochaine semaine.

## Tableau de suivi

| Semaine | Contenus | Etat local | Etat Git au 2026-09-05 | Etat public au 2026-09-05 | Prochaine action |
|---|---|---|---|---|---|
| S1 | `cerfa-declaration-prealable-panneaux-solaires`, `externaliser-administratif-photovoltaique` | Validee | Poussee sur `origin/main` | 200 / 200 | Terminee |
| S2 | `declaration-prealable-panneaux-solaires-pieces-delais`, `attestation-consuel-photovoltaique` | Validee et publiee | Poussee (`842572c`) | 200 / 200 | Terminee |
| S3 | `delai-declaration-prealable-photovoltaique`, `delai-raccordement-enedis-photovoltaique` | Validee, activee dans le manifeste | Commit de publication en preparation | 404 / 404 avant deploiement | Verifier les deux URLs apres deploiement |
| S4 | `delai-consuel-photovoltaique`, `sous-traiter-declaration-prealable-photovoltaique` | Preparee localement, a revalider | Suivis par Git, hors manifeste public | 404 / 404 | Backlog, ne pas publier avant S3 |
| S5 | `dp-refusee-panneaux-solaires-que-faire`, `etapes-raccordement-enedis-panneaux-solaires` | Preparee localement, a revalider | Suivis par Git, hors manifeste public | 404 / 404 | Backlog, ne pas publier avant S4 |
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

Validation utilisateur reçue. Deux articles datés du 14 septembre, marqueurs backlog retirés pour aligner l’audit marketing, liens du corps vers S5/S7 retirés, procédure Enedis actuelle ajoutée. Build Node 22.23.0 et audit des 34 pages réussis ; maillage des deux HTML et sitemap vérifiés. S4 à S8 hors manifeste. Aucun changement hors S3 embarqué. Statut public à confirmer après déploiement.
