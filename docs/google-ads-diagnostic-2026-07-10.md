# Diagnostic Google Ads - 2026-07-10

## Etat constate

- Compte lu: `myriam.sunelys@gmail.com`.
- Campagne existante: `Campaign #1`.
- Type: `Performance Max`.
- Statut campagne: activee.
- Statut Google: eligible, en apprentissage.
- Budget: `10,00 EUR / jour`.
- Groupe de composants: eligible.
- Efficacite annonce: moyenne.
- Periode lue dans Google Ads: `10 juin - 9 juillet 2026`.
- Resultats lus: `209 impressions`, `4 clics`, `0,20 EUR`, `0 conversion`.

## Probleme principal

La campagne diffuse tres peu et n'utilise quasiment pas le budget.

Le reglage le plus problematique est l'objectif de conversion: la campagne optimise sur `Leads par telephone`, alors que la page publicitaire pousse surtout le formulaire web.

Le site remonte bien les evenements GA4 `lead_form_submit`, `generate_lead` et `lead_converted`, mais Google Ads ne semble pas encore les utiliser comme conversion principale pour cette campagne.

## Risques actuels

- Performance Max donne peu de controle sur les requetes de recherche.
- Le budget de 10 EUR / jour n'est pas consomme, donc augmenter le budget ne reglerait pas le probleme.
- Si Google optimise seulement sur les appels, les formulaires web ne nourrissent pas correctement l'apprentissage.
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

1. Creer ou verifier une conversion Google Ads pour formulaire web.
2. Utiliser `generate_lead` comme conversion principale.
3. Garder `phone_click`, `booking_click` et `lead_form_submit` en observation secondaire.
4. Importer les campagnes Search en pause.
5. Ajouter les mots-cles negatifs.
6. Activer seulement apres verification du suivi conversion.

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
