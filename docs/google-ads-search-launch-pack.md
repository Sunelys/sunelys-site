# Google Ads Search - Pack de lancement Sunelys

Objectif: lancer un test Search tres cible pour capter des installateurs photovoltaïques avec un besoin administratif immediat, sans optimiser sur des formulaires faibles.

Sources Google utilisees:

- Creation d'une campagne Search: https://support.google.com/google-ads/answer/9510373
- Annonces Search responsives: https://support.google.com/google-ads/answer/7684791
- Mots-cles negatifs: https://support.google.com/google-ads/answer/2453972
- Final URL suffix et suivi: https://support.google.com/google-ads/answer/9054021
- Parametres ValueTrack: https://support.google.com/google-ads/answer/6305348

## Regles de lancement

- Type: Search uniquement.
- Reseaux: Search Google, puis Search partners a tester seulement apres 7 jours.
- Localisation: France.
- Langue: francais.
- Objectif: leads.
- Conversion principale: `generate_lead`.
- Conversions secondaires a observer: `lead_form_submit`, `lead_converted`, `booking_click`, `phone_click`.
- Optimisation commerciale: lead qualifie / hot dans Airtable, pas volume brut.
- Budget test valide: 10 EUR / jour au total, campagnes importees en pause.

Google limite les annonces responsives Search a 30 caracteres par titre et 90 caracteres par description. Les assets fournis dans `google-ads-rsa-assets.csv` respectent ces limites.

## Campagnes

### 1. Search - Pilotage admin PV

Landing principale:

```text
https://sunelys.fr/gestion-administrative-photovoltaique
```

But: capter les dirigeants et responsables operations qui cherchent a externaliser ou structurer le flux administratif.

Ad groups:

- Pilotage complet
- Externalisation administrative

Budget de test: 4 EUR / jour.

### 2. Search - Sous-traitance DP

Landing principale:

```text
https://sunelys.fr/sous-traitance-declaration-prealable-solaire
```

But: capter les installateurs qui veulent deleguer les declarations prealables ou reduire les retours mairie.

Ad groups:

- Sous-traitance DP
- Blocage mairie DP

Budget de test: 3 EUR / jour.

### 3. Search - Consuel Raccordement

Landing principales:

```text
https://sunelys.fr/dossier-consuel-photovoltaique
https://sunelys.fr/raccordement-enedis-photovoltaique
```

But: capter les blocages proches mise en service et les besoins de suivi administratif.

Ad groups:

- Consuel PV
- Raccordement Enedis

Budget de test: 3 EUR / jour.

## Suivi UTM

Option simple par URL finale:

```text
?utm_source=google&utm_medium=cpc&utm_campaign=search_pilotage_admin_pv&utm_content=rsa_diagnostic
```

Option campagne avec Final URL suffix:

```text
utm_source=google&utm_medium=cpc&utm_campaign={campaignid}&utm_content={creative}&utm_term={keyword}
```

Important: eviter les ancres `#contact-form` dans les URLs finales Google Ads. Les parametres UTM doivent rester dans l'URL finale ou dans le suffixe final.

## Checklist avant activation

- Le formulaire diagnostic est visible sur les pages ciblees.
- Un test de formulaire remonte bien dans Airtable.
- GA4 recoit `generate_lead`.
- Le champ `utm_source=google` remonte dans Airtable.
- Le champ `utm_campaign` remonte dans Airtable.
- Les champs `volume`, `need`, `blocked_stage` sont presents.
- Les mots-cles negatifs sont ajoutes avant mise en ligne.
- Budget journalier confirme avant activation.

## Routine des 14 premiers jours

Jour 1:

- Verifier impressions, clics, termes de recherche, conversions.
- Couper toute requete particulier / aide / prime / emploi / formation.

Jours 2-4:

- Ajouter les mauvais termes de recherche en negatifs.
- Verifier que les leads ont une landing page et une UTM.
- Ne pas juger uniquement au CTR.

Jours 5-7:

- Conserver les ad groups avec signaux qualifiants: volume 10-30, +30, pilotage global, Consuel a preparer, raccordement en attente.
- Mettre en pause les groupes qui generent des demandes faibles ou hors cible.

Jours 8-14:

- Reallouer le budget vers la campagne qui produit les meilleurs leads qualifies.
- Tester une variante d'annonce orientee "dossiers bloques" contre une variante "gain de temps".

## Fichiers du pack

- `docs/google-ads-search-keywords.csv`
- `docs/google-ads-rsa-assets.csv`
- `docs/google-ads-negative-keywords.csv`
- `docs/google-ads-editor/`
- `docs/google-ads-web-upload/`

## Validation locale

Avant modification ou import:

```bash
npm run marketing:ads:validate
```

Cette commande verifie les limites Google Ads principales du pack:

- titres Search responsifs: 30 caracteres maximum
- descriptions: 90 caracteres maximum
- chemins affiches: 15 caracteres maximum
- URLs finales valides

Pour generer les fichiers separes compatibles avec Google Ads Editor:

```bash
npm run marketing:ads:editor-export -- --daily-budget-total 10
```

Les campagnes exportees sont en `Paused` par defaut avec une repartition 4 / 3 / 3, soit 10 EUR / jour au total. Ne les activez qu'apres validation du suivi des conversions.

Pour generer les fichiers compatibles avec l'import web Google Ads Bulk Upload:

```bash
npm run marketing:ads:web-upload-export -- --daily-budget-total 10
```

Ces fichiers suivent les modeles officiels Google Ads Bulk Upload:

- `docs/google-ads-web-upload/01-campaigns.csv`
- `docs/google-ads-web-upload/02-ad-groups.csv`
- `docs/google-ads-web-upload/03-keywords.csv`
- `docs/google-ads-web-upload/04-responsive-search-ads.csv`
- `docs/google-ads-web-upload/05-negative-keywords-paste.txt`

## Controle leads paid apres lancement

Une fois les campagnes activees, suivre la qualite des leads Airtable sans afficher de donnees personnelles:

```bash
npm run marketing:ads:leads -- --days 14
```

La commande genere un rapport dans `reports/google-ads-leads/` et controle:

- leads paid detectes via `utm_source=google`, `utm_medium=cpc`, `utm_campaign`, GCLID ou signaux Google Ads
- repartition par campagne, landing page, service, blocage et volume
- score qualifie / hot par campagne
- trous de tracking ou de qualification a corriger avant d'augmenter le budget

Les leads marques comme test sont exclus par defaut. Pour verifier un lead test Google Ads:

```bash
npm run marketing:ads:leads -- --days 1 --include-tests
```
