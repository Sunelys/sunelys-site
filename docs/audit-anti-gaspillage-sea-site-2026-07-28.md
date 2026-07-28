# Audit anti-gaspillage SEA / site / conversion Sunelys - 2026-07-28

## Verdict court

La campagne Google Ads ne doit pas continuer telle quelle a 10 EUR / jour.

Le probleme n'est pas un bug de tracking ni un site casse. Le probleme est que Google Ads achete maintenant du trafic reel, mais encore trop generaliste, trop particulier, trop informatif ou pas assez mature pour deleguer un dossier.

Decision recommandee: pause ou reduction immediate de la campagne active, correction du hero landing, puis relance d'un test beaucoup plus strict pendant 7 jours.

## Donnees controlees

- Build local: OK avec `npm run build:ci`.
- Audit marketing local: `reports/marketing-agent/2026-07-28T07-56-26-420Z/audit.md`.
- Rapport leads Google Ads: `reports/google-ads-leads/2026-07-28T07-52-24-565Z/report.md`.
- Google Ads lu en direct dans Chrome, compte `781-087-0154 Sunelys`, `myriam.sunelys@gmail.com`.
- Page auditee: `/lp/delegation-admin-pv`.
- Tracking audite: `src/layouts/BaseLayout.astro`, `src/pages/api/leads.ts`, `src/pages/merci.astro`.

## Chiffres Ads au 2026-07-28

Periode Google Ads visible: `28 juin - 27 juillet 2026`.

Compte:

- `94` clics.
- `1 563` impressions.
- CPC moyen: `1,97 EUR`.
- Cout: `185,40 EUR`.
- Conversions: `0`.
- Entonnoir Google Ads: `47` interactions, `0` lead brut.

Campagne active:

- `Search - Delegation admin PV installateurs`.
- Statut: eligible, diffusion limitee par budget.
- Cout 30 jours: `116,68 EUR`.
- Clics: `42`.
- Conversion: `0`.

Campagnes en veille avec depense historique:

- `Search - Consuel Raccordement`: `27,16 EUR`, `19` clics, `0` conversion.
- `Search - Sous-traitance DP`: `26,96 EUR`, `19` clics, `0` conversion.
- `Search - Pilotage admin PV`: `13,21 EUR`, `9` clics, `0` conversion.
- `Campaign #1`: `1,39 EUR`, `5` clics, `0` conversion.

## Leads

Rapport `npm run marketing:ads:leads -- --days 14`:

- Leads Airtable lus: `13`.
- Leads dans la periode: `3`.
- Test exclu: `1`.
- Leads paid reels detectes: `0`.
- Qualifies: `0`.
- Hot: `0`.

Conclusion: le tracking de leads fonctionne, mais la campagne ne produit pas de lead reel.

## Diagnostic principal

### 1. Le tracking n'est pas la cause prioritaire

Points verifies:

- `PUBLIC_GOOGLE_ADS_CONVERSION_ID=AW-17873515529`.
- Label conversion lead: `nOqICNXLhM4cEIno4MpC`.
- Build rendu contient `AW-17873515529/nOqICNXLhM4cEIno4MpC`.
- Les formulaires envoient les UTM, `gclid`, landing page et source detail.
- La conversion Google Ads est declenchee uniquement apres confirmation du lead sur `/merci`.
- Airtable recoit bien les leads.
- Resend / notification lead existe cote serveur.

Risque secondaire: la conversion Google Ads depend du consentement analytics. Mais meme si un visiteur refusait les cookies, le lead Airtable devrait exister avec les UTM/GCLID. Or il n'y a pas de lead paid reel. Donc la cause prioritaire reste l'intention du trafic et la conversion landing, pas le tag.

### 2. La campagne active a rouvert trop large

La base B2B stricte etait saine mais trop faible en volume. Ensuite, la couche `volume probable` a relance la diffusion avec des mots-cles qui melangent installateurs et particuliers:

- `"declaration prealable photovoltaique"` avec CPC `2,20`.
- `[declaration prealable photovoltaique]` avec CPC `2,20`.
- `"declaration prealable panneaux solaires"` avec CPC `2,20`.
- `"declaration panneau photovoltaique"` avec CPC `2,00`.
- `"declaration mairie panneaux solaires"` avec CPC `2,00`.
- `"demande installation panneau solaire mairie"` avec CPC `1,80`.
- `"raccordement panneaux solaires"` avec CPC `2,20`.
- `"raccordement panneau solaire"` avec CPC `2,00`.
- `"consuel photovoltaique"` avec CPC `2,20`.

Ces requetes ont du volume, mais elles ne disent pas clairement:

- installateur;
- sous-traitance;
- prestataire;
- dossier a deleguer;
- service administratif payant.

Elles peuvent facilement attirer un particulier ou quelqu'un qui veut comprendre la demarche gratuitement.

### 3. Les termes de recherche confirment le bruit

Termes visibles et problematiques:

- `schema electrique raccordement panneau solaire`;
- `comment declarer des panneaux solaires a enedis`;
- `demande installation panneau solaire mairie`;
- `declaration panneau solaire`;
- `autorisation pour poser des panneaux solaires`;
- `demarche administrative pour pose panneaux photovoltaique`;
- `pose panneau solaire declaration`.

Termes moins mauvais mais encore trop ambigus:

- `declaration prealable panneaux solaires toiture`;
- `dossier photovoltaique`;
- `consuel photovoltaique`;
- `raccordement panneaux solaires`.

Lecture: les exclusions ont reduit le bruit, mais la structure achete encore l'intention "je veux faire/poser/comprendre/declarer", pas assez l'intention "je veux deleguer".

### 4. L'annonce DP clique, mais ne convertit pas

Annonce active visible:

- `Declaration prealable PV | DP panneaux solaires | Dossier mairie solaire`.
- Statut: eligible.
- Efficacite: excellente.
- `121` impressions.
- `24` clics.
- CTR: `19,83 %`.
- Cout: `65,40 EUR`.
- Conversion: `0`.

Ce point est critique: ce n'est pas un probleme de CTR. L'annonce donne envie de cliquer, mais elle ne filtre pas assez ou l'intention qui arrive n'est pas celle d'un acheteur B2B.

### 5. La landing est correcte, mais pas assez anti-bruit dans le premier ecran

La page `/lp/delegation-admin-pv` est techniquement propre:

- 1 formulaire.
- 3 champs obligatoires.
- telephone optionnel.
- UTM/GCLID captures.
- `noindex,follow`, logique pour une landing Ads.
- 4 images.
- 17 CTA traces.
- `form_start`, `pricing_view`, `generate_lead`, `lead_converted` presents.

Mais le premier ecran a une faiblesse commerciale:

- Le prix exact n'apparait pas dans le hero.
- Le visuel portail n'apparait pas dans le hero.
- La preuve operationnelle arrive plus bas.
- Le message dominant reste `Recevoir mon diagnostic sous 24h`.
- Le HTML contient encore des styles pour `hero-portal-proof` et `hero-price-strip`, mais ces blocs ne sont pas rendus dans le hero.

Conclusion: la landing rassure apres scroll, mais elle ne filtre pas assez vite les visiteurs non-B2B.

## Notes par axe

| Axe | Note | Diagnostic |
| --- | ---: | --- |
| Tracking technique | 8,5 / 10 | Chaine solide. Pas le blocage principal. |
| Reporting lead | 8 / 10 | Le rapport distingue tests, paid, qualifies et hot. |
| SEA structure actuelle | 4 / 10 | Eligible et active, mais depense sans conversion. |
| Qualite des requetes | 3,5 / 10 | Trop de generique/particulier/informatif. |
| Annonces | 5 / 10 | Bonne accroche, mauvais filtrage achat. |
| Landing Ads | 6,5 / 10 | Formulaire propre, mais hero pas assez prix/preuve/B2B strict. |
| SEO site | 7,5 / 10 | Base saine; pas le levier court terme pour stopper la depense. |
| Decision budget | 3 / 10 | Laisser 10 EUR/j sans conversion n'est plus defendable. |

Score global acquisition payante actuel: `5 / 10`.

## Decision anti-gaspillage

### P0 - Stopper la depense non prouvee

Option la plus stricte:

- Mettre `Search - Delegation admin PV installateurs` en veille pendant 24-48h.
- Faire les corrections landing + annonces + mots-cles.
- Relancer ensuite a `5 EUR / jour` pendant 7 jours.

Option moins radicale:

- Garder la campagne active mais descendre a `3 EUR / jour`.
- Pauser les mots-cles generiques qui ont achete du bruit.
- Ne garder que les requetes B2B explicites.

Ma recommandation: option stricte. Aujourd'hui, continuer a 10 EUR/jour revient a payer l'apprentissage sans preuve.

### P0 - Pauser ou couper les mots-cles trop larges

A couper temporairement:

- `"declaration prealable photovoltaique"`;
- `[declaration prealable photovoltaique]`;
- `"declaration prealable panneaux solaires"`;
- `"declaration panneau photovoltaique"`;
- `"declaration mairie panneaux solaires"`;
- `"demande installation panneau solaire mairie"`;
- `"raccordement panneaux solaires"`;
- `"raccordement panneau solaire"`;
- `"consuel photovoltaique"`.

A garder uniquement si combines avec intention B2B:

- `installateur`;
- `prestataire`;
- `sous traitance`;
- `externaliser`;
- `dossier`;
- `gestion administrative`;
- `service administratif`.

### P0 - Renforcer les mots-cles negatifs

Ajouter ou verifier au niveau campagne:

- `schema`, `schéma`, `schema electrique`, `schéma électrique`;
- `brancher`, `branchement`, `cablage`, `câblage`, `raccorder soi meme`;
- `comment`, `exemple`, `modele`, `modèle`, `pdf`, `cerfa`, `formulaire`;
- `pose`, `poser`, `installateur pour poser`, `artisan pose`, `poseur`;
- `maison`, `particulier`, `kit`, `plug and play`, `autoconsommation maison`;
- `impot`, `impots`, `revenu`, `revente`, `rentabilite`;
- `sans autorisation`, `obligatoire`, `reglementation`.

### P0 - Refaire le hero landing avant relance

Le hero doit afficher au-dessus de la ligne de flottaison:

- `Installateurs PV uniquement`.
- `DP complete 119 EUR HT`.
- `Raccordement + Consuel 89 EUR HT`.
- `Dossier ponctuel accepte`.
- Une capture portail ou preuve de suivi.
- CTA: `Cadrer un dossier a deleguer`, pas seulement `diagnostic gratuit`.

Objectif: decourager les particuliers et les curieux avant qu'ils ne coutent un clic.

### P1 - Recrire les annonces pour filtrer avant le clic

Remplacer l'angle dominant `diagnostic gratuit` par:

- `Installateurs PV uniquement`.
- `Sous-traitance admin PV`.
- `DP 119 EUR HT`.
- `Consuel + raccordement 89 EUR HT`.
- `Dossier ponctuel accepte`.
- `Pas une offre pose particuliers`.

Le diagnostic gratuit doit rester en description, pas en promesse principale.

### P1 - Relancer un test 7 jours propre

Configuration recommandee:

- 1 seule campagne Search.
- Budget: `5 EUR / jour`.
- Duree: 7 jours.
- Depense max test: `35 EUR`.
- Mots-cles: uniquement B2B explicites.
- Objectif: obtenir au moins 1 signal utile, pas maximiser les clics.

Critere d'arret:

- `15` clics sans `form_start`: probleme message / landing.
- `5` form starts sans lead: probleme formulaire / confiance.
- `30 EUR` depenses sans lead: pause et reecriture.

Critere de relance budget:

- 1 lead reel qualifie ou hot.
- Ou termes de recherche tres B2B avec interactions formulaire visibles.

## Conclusion

Ce n'est pas normal de continuer a payer dans cette configuration.

La campagne n'est pas techniquement mauvaise, mais elle est commercialement trop ouverte pour un petit budget. Google trouve des personnes qui cherchent `declaration`, `raccordement`, `consuel`, mais pas assez des professionnels qui veulent payer Sunelys pour deleguer.

La prochaine action rationnelle n'est pas d'ajouter encore quelques negatifs au fil de l'eau. La prochaine action rationnelle est:

1. couper ou reduire fortement la depense;
2. retirer les mots-cles generiques;
3. rendre le hero plus filtrant avec prix + preuve + B2B;
4. relancer petit;
5. juger sur leads reels, pas sur CTR ni score Google.
