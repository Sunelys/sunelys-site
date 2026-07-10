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
