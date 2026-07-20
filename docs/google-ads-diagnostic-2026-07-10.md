# Diagnostic Google Ads - 2026-07-10

## Etat constate

- Compte lu: `myriam.sunelys@gmail.com`.
- Campagne existante: `Campaign #1`.
- Type: `Performance Max`.
- Statut campagne au diagnostic initial: activee.
- Statut apres bascule du 2026-07-10: mise en veille.
- Statut Google: eligible, en apprentissage.
- Budget: `10,00 EUR / jour`.
- Objectifs campagne apres correction: `Envois de formulaires de lead` + `Leads par telephone`.
- Groupe de composants: eligible.
- Efficacite annonce: moyenne.
- Periode lue dans Google Ads: `10 juin - 9 juillet 2026`.
- Resultats lus: `209 impressions`, `4 clics`, `0,20 EUR`, `0 conversion`.

## Probleme principal

La campagne diffuse tres peu et n'utilise quasiment pas le budget.

Le reglage le plus problematique etait l'objectif de conversion: la campagne optimisait sur `Leads par telephone`, alors que la page publicitaire pousse surtout le formulaire web.

Correction effectuee: Google Ads utilise maintenant aussi l'objectif `Envois de formulaires de lead` dans `Campaign #1`.

Le site remonte bien les evenements GA4 `lead_form_submit`, `generate_lead` et `lead_converted`, et l'action Google Ads `Lead formulaire site Sunelys` est branchee sur `generate_lead`.

## Risques actuels

- Performance Max donne peu de controle sur les requetes de recherche.
- Le budget de 10 EUR / jour n'est pas consomme, donc augmenter le budget ne reglerait pas le probleme.
- La modification d'objectif peut provoquer une phase d'ajustement de l'algorithme pendant quelques jours.
- L'interface Google Ads affiche un avertissement anti-bloqueur dans la session navigateur, ce qui peut perturber certains clics.

## Decision recommandee

Ne pas augmenter le budget maintenant.

Passer sur un test Search controle, avec mots-cles exact/phrase, mots-cles negatifs et tracking UTM propre.

Pack pret:

- `docs/google-ads-web-upload/01-campaigns.csv`
- `docs/google-ads-web-upload/02-ad-groups.csv`
- `docs/google-ads-web-upload/03-keywords.csv`
- `docs/google-ads-web-upload/04-responsive-search-ads.csv`
- `docs/google-ads-web-upload/05-negative-keywords-paste.txt`

Budget prepare:

- `Search - Pilotage admin PV`: `4 EUR / jour`
- `Search - Sous-traitance DP`: `3 EUR / jour`
- `Search - Consuel Raccordement`: `3 EUR / jour`

Toutes les campagnes sont exportees en `Paused` par defaut.

## Avant activation

1. Conversion Google Ads formulaire web creee: `Lead formulaire site Sunelys`.
2. `generate_lead` branche au tag Ads `AW-17873515529/nOqICNXLhM4cEIno4MpC`.
3. Garder `phone_click`, `booking_click` et `lead_form_submit` en observation secondaire.
4. Importer les campagnes Search en pause.
5. Ajouter les mots-cles negatifs.
6. Activer seulement apres verification du suivi conversion.

## Import Search - etat 2026-07-10

- Fichiers d'import valides localement avec `npm run marketing:ads:validate`.
- Scripts Google Ads `apply` generes dans `docs/google-ads-scripts/`.
- Tentative d'import via Google Ads Scripts bloquee dans la session Codex: l'interface redemande l'autorisation et ouvre une validation par cle d'acces.
- Classeur unique `.xlsx` non retenu dans Google Ads web upload: Google Ads lisait la feuille `README` comme premiere feuille et refusait l'en-tete.
- Solution retenue: import web sequentiel dans une vraie fenetre Chrome, via `Importations > Nouvelle importation`.
- Import campagnes applique avec `docs/google-ads-web-upload/01-campaigns-with-eu-political-multi.csv`:
  3 campagnes acceptees, 0 erreur, 7 modifications appliquees.
- Import groupes d'annonces applique avec `docs/google-ads-web-upload/02-ad-groups.csv`:
  6 groupes acceptes, 0 erreur, 6 modifications appliquees.
- Import mots-cles applique avec `docs/google-ads-web-upload/03-keywords.csv`:
  26 mots-cles acceptes, 0 erreur, 58 modifications appliquees.
- Import annonces RSA applique avec `docs/google-ads-web-upload/04-responsive-search-ads.csv`:
  6 annonces acceptees, 0 erreur, 13 modifications appliquees.
- Les 3 campagnes Search ont ete importees en pause:
  `Search - Pilotage admin PV`, `Search - Sous-traitance DP`, `Search - Consuel Raccordement`.

## Activation Search - etat 2026-07-10

- Mots-cles negatifs ajoutes manuellement au niveau campagne sur les 3 campagnes Search depuis l'interface Google Ads.
- Liste negative appliquee: `docs/google-ads-web-upload/05-negative-keywords-paste.txt`.
- `Campaign #1` Performance Max a ete mise en veille manuellement depuis la table des campagnes.
- Import d'activation applique avec `docs/google-ads-web-upload/08-enable-search-campaigns.csv`:
  3 campagnes acceptees, 0 erreur, 3 modifications appliquees.
- Statut final verifie dans Google Ads:
  `Campaign #1` en veille, `Search - Pilotage admin PV`, `Search - Sous-traitance DP` et `Search - Consuel Raccordement` actives.
- Budget final visible: `10 EUR / jour` au total:
  `4 EUR / jour` + `3 EUR / jour` + `3 EUR / jour`.
- Groupes d'annonces verifiés actifs:
  6 groupes `Actif` / `Eligible`.
- Mots-cles actives manuellement depuis l'interface Google Ads:
  26 mots-cles selectionnes puis passes en `Actif`.
- Annonces Search responsives activees manuellement depuis l'interface Google Ads:
  6 annonces passees en `Actif`, statut Google `Eligible` / `En attente` apres activation.
- Etat de diffusion Search apres correction:
  campagnes Search actives, groupes actifs, mots-cles actifs, annonces actives; la diffusion depend maintenant de la validation Google des annonces et du volume de recherche.
- Note: un premier fichier de bascule `07-campaign-status-switch.csv` a ete teste en apercu. Google Ads a accepte les 3 activations Search mais a refuse la ligne `Campaign #1` car l'ID interne de campagne etait requis. Cette version n'a pas ete appliquee.

## Controle quotidien apres activation

Commande de suivi sans tests:

```bash
npm run marketing:ads:leads -- --days 14
```

Indicateurs prioritaires:

- leads reels Google Ads, hors tests;
- score qualifie / hot dans Airtable;
- campagne, landing page, service, blocage et volume;
- termes de recherche a exclure;
- cout par lead qualifie, pas seulement clics.

## Elargissement mots-cles - 2026-07-13

Motif: apres activation, les campagnes Search etaient actives et les annonces eligibles, mais la diffusion restait quasi nulle (`1` impression Search, `0` clic, `0 EUR`).

Action effectuee: ajout d'une couche de mots-cles plus probables et moins ultra-niche, sans changer le budget et sans changer les campagnes.

Fichier applique dans Google Ads:

- `docs/google-ads-web-upload/09-broaden-search-keywords-2026-07-13.csv`

Resultat Google Ads:

- apercu: `28` modifications acceptees, `0` erreur;
- application: operation terminee, `62` modifications effectuees;
- budget conserve: `10 EUR / jour` total;
- CPC max conserve: `1,50 EUR`;
- exemples ajoutes: `declaration prealable photovoltaique`, `declaration prealable panneaux solaires`, `dp photovoltaique`, `consuel photovoltaique`, `raccordement panneau solaire enedis`.

Controle apres import:

- les nouveaux mots-cles sont visibles dans Google Ads;
- statut: `Active`;
- certains mots-cles sont `En attente / En cours d'examen`, comportement normal juste apres ajout;
- prochains points de controle: impressions, clics, termes de recherche et leads reels hors tests.

## Nettoyage termes et mots-cles B2B - 2026-07-14

Contexte: apres l'elargissement du 2026-07-13, les campagnes Search ont commence a diffuser mais les premiers termes de recherche contenaient des intentions trop particulieres/informatives (`branchement d un panneau solaire`, `comment remplir une declaration prealable`, `cerfa`, `pdf`, `plug and play`, petites installations).

Etat lu avant action:

- periode Google Ads visible: `14 juin - 13 juillet 2026`;
- total compte: `286` impressions, `11` clics, `10,20 EUR`, `0` conversion;
- Search visible:
  - `Search - Sous-traitance DP`: `44` impressions, `4` clics, `5,83 EUR`;
  - `Search - Consuel Raccordement`: `20` impressions, `2` clics, `2,98 EUR`;
  - `Search - Pilotage admin PV`: `0` impression;
- annonces Search: eligibles, pas de refus visible;
- Airtable: `0` lead paid reel, `1` lead test exclu.

Actions effectuees sans changement de budget:

- ajout manuel de `10` nouveaux mots-cles negatifs sur chacune des 3 campagnes Search, soit `30` exclusions ajoutees;
- compteur mots-cles negatifs verifie dans Google Ads: `63` -> `93`;
- exclusions ajoutees: `branchement`, `comment remplir`, `pdf`, `cerfa`, `plug and play`, `inf a 3kw`, `moins de 3kw`, `quelle autorisation`, `soi meme`, `soi-meme`;
- import applique du fichier `docs/google-ads-web-upload/11-high-intent-b2b-keywords-2026-07-14.csv`;
- resultat Google Ads: apercu `18` modifications acceptees, `0` erreur; application terminee avec `42` modifications effectuees;
- budget conserve: `10 EUR / jour` total;
- CPC max conserve: `1,50 EUR`.

Intention des mots-cles ajoutes:

- renforcer les requetes B2B de delegation/prestataire/sous-traitance;
- eviter de reouvrir trop largement les recherches de particuliers;
- donner plus de chances a `Search - Pilotage admin PV`, encore sans impression.

Prochain controle:

- verifier demain les termes de recherche et exclure tout signal particulier/bricolage/information gratuite;
- ne pas augmenter le budget tant qu'il n'y a pas au moins un signal de clic qualifie ou lead payant reel;
- surveiller si les nouveaux mots-cles passent en `Eligible` ou restent bloques en volume trop faible.

## Recherche Keyword Planner pieces DP / Consuel - 2026-07-14

Objectif: verifier l'hypothese des recherches liees aux pieces complexes (`DP6`, `document graphique`, `plan de masse`, `insertion paysagere`) et trouver les expressions qui ont le plus de volume potentiel.

Source:

- Google Ads Keyword Planner;
- compte `781-087-0154 Sunelys`;
- zone France, langue francais, reseau Google;
- historique `juillet 2025 - juin 2026`.

Memo detaille:

- `docs/google-ads-keyword-research-pieces-dp-2026-07-14.md`

Constats principaux:

- `consuel photovoltaique`: environ `320` recherches/mois, deja dans le compte;
- `enedis raccordement photovoltaique`: environ `170` recherches/mois, deja dans le compte;
- `dp panneaux solaires`: environ `110` recherches/mois, deja dans le compte;
- `declaration prealable panneaux solaires`: environ `70` recherches/mois, deja dans le compte;
- plusieurs variantes Consuel/raccordement ont un volume faible a moyen mais une intention claire;
- les termes ultra-precis `DP6`, `DP7`, `DP8`, `document graphique`, `plan de masse`, `plan de coupe`, `notice descriptive`, `insertion paysagere` ne remontent pas avec un volume exact exploitable dans Keyword Planner.

Decision recommandee:

- ne pas augmenter le budget maintenant;
- ne pas creer une grosse campagne dediee `DP6`;
- renforcer legerement Consuel/raccordement avec quelques mots-cles exact/phrase supplementaires;
- utiliser `DP6`, `document graphique`, `plan de masse`, `plan de coupe`, `notice descriptive` et `insertion paysagere` surtout en SEO et dans la landing page pour rassurer les assistantes/installateurs bloques sur une piece precise.

## Renforcement Consuel / raccordement + SEO pieces DP - 2026-07-14

Action Google Ads effectuee apres Keyword Planner, sans changement de budget:

- fichier importe: `docs/google-ads-web-upload/12-consuel-raccordement-keyword-planner-2026-07-14.csv`;
- compte Google Ads: `781-087-0154 Sunelys`;
- campagnes concernees: `Search - Consuel Raccordement`;
- apercu Google Ads: `21` modifications, `20` acceptees, `1` erreur;
- application: operation terminee avec des erreurs, `43` modifications effectuees, `1` erreur;
- erreur identifiee: doublon sur `dossier consuel photovoltaique`, deja present dans le compte;
- budget conserve: `10 EUR / jour` total;
- CPC max conserve: `1,50 EUR`.

Mots-cles ajoutes ou renforces:

- variantes Consuel: `consuel panneaux photovoltaiques`, `consuel installation photovoltaique`, `consuel photovoltaique autoconsommation`, `attestation consuel photovoltaique`, `attestation de conformite photovoltaique`;
- variantes raccordement: `enedis photovoltaique`, `raccordement photovoltaique enedis`, `demande raccordement enedis photovoltaique`, `dossier raccordement photovoltaique`, `enedis raccordement panneaux photovoltaiques`;
- variantes DP exactes: `dp panneau photovoltaique`, `dp panneaux photovoltaiques`, `dp pour panneaux photovoltaiques`.

Action site / SEO effectuee:

- enrichissement de la page `gestion-administrative-photovoltaique`;
- enrichissement de la page `declaration-prealable-photovoltaique`;
- enrichissement de la page `sous-traitance-declaration-prealable-photovoltaique`;
- ajout de signaux de contenu autour des pieces qui bloquent souvent les dossiers: `DP6`, `document graphique`, `plan de masse`, `plan de coupe`, `notice descriptive`, `insertion paysagere`, `DP7` et `DP8`.

Decision:

- ne pas monter le budget pour l'instant;
- laisser Google absorber les nouveaux mots-cles;
- controler demain les termes de recherche et exclure rapidement tout signal particulier, bricolage, tutoriel ou recherche gratuite;
- garder les requetes `DP6` et pieces techniques surtout en SEO tant que Keyword Planner ne montre pas un volume Ads suffisant.

## Exclusions apres premiers clics hors sujet - 2026-07-14 soir

Motif: le controle du jour a montre des termes de recherche encore trop informatifs ou bricolage, notamment autour de `brancher`, `comment brancher`, `en parallele` et `exemple`.

Action effectuee:

- ajout manuel dans Google Ads, onglet `Mots cles a exclure`;
- niveau: campagne;
- campagnes concernees:
  - `Search - Pilotage admin PV`;
  - `Search - Sous-traitance DP`;
  - `Search - Consuel Raccordement`;
- mots-cles ajoutes sur chaque campagne: `brancher`, `comment brancher`, `en parallele`, `exemple`;
- total ajoute: `12` exclusions;
- compteur Google Ads verifie: `93` -> `105` mots-cles negatifs.

Note technique:

- le fichier de trace est `docs/google-ads-web-upload/13-search-quality-negative-keywords-2026-07-14.csv`;
- l'import CSV web a ete teste en apercu mais refuse par Google Ads sur le format des mots-cles negatifs campagne;
- aucune ligne CSV refusee n'a ete appliquee;
- les apercus CSV echoues ont ete supprimes des actions en attente;
- l'ajout final a donc ete fait directement depuis l'interface Google Ads.

Decision:

- continuer a surveiller les termes de recherche avant toute hausse de budget;
- exclure immediatement toute recherche de tutoriel, branchement, schema, exemple gratuit, bricolage ou particulier.

## Exclusions tutoriel / schema / prix - 2026-07-16

Motif: le controle du 2026-07-16 a montre un clic hors sujet clair sur `schema electrique raccordement panneau solaire` dans `Search - Consuel Raccordement`, ainsi que des impressions non qualifiees autour de prix maison, carport et entretien.

Etat lu avant action:

- Airtable: `0` lead paid reel sur les 14 derniers jours, `1` lead test exclu;
- 2026-07-15: `122` impressions, `9` clics, `13,07 EUR`, `0` conversion;
- 2026-07-16 partiel: `57` impressions, `4` clics, `5,85 EUR`, `0` conversion;
- annonces Search: eligibles, pas de refus visible;
- budget conserve: `10 EUR / jour` total.

Action effectuee:

- ajout manuel dans Google Ads, onglet `Mots cles a exclure`;
- niveau: campagne;
- campagnes concernees:
  - `Search - Pilotage admin PV`;
  - `Search - Sous-traitance DP`;
  - `Search - Consuel Raccordement`;
- mots-cles ajoutes sur chaque campagne: variantes accentuees et non accentuees de `schema`, `schema electrique` et `cablage`, plus `plan de branchement`, `prix panneau solaire`, `maison 150m2`, `carport solaire`, `contrat entretien`;
- total ajoute: `39` exclusions;
- compteur Google Ads verifie: `105` -> `144` mots-cles negatifs.

Decision:

- ne pas augmenter le budget tant que les clics tutoriel/bricolage ne sont pas stabilises;
- verifier les termes de recherche au prochain controle et exclure toute requete schema, cablage, prix maison, carport ou entretien non B2B;
- garder le suivi prioritaire sur les conversions et les leads reels, pas seulement sur le volume de clics.
