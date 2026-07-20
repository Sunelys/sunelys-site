# Audit Google Ads + site + visuels Sunelys - 2026-07-20

## Verdict

Le probleme actuel n'est pas un bug site ni un tracking casse.

Le probleme est double:

1. Les anciennes campagnes ont prouve qu'il y a du volume, mais elles ont achete trop de clics informatifs ou particuliers.
2. La nouvelle campagne "base saine" est beaucoup plus propre, mais elle est probablement trop stricte pour prendre rapidement du volume avec seulement 10 EUR/jour.

Cote site, la promesse est bonne et le ton premium est coherent. Mais la page est trop abstraite visuellement: elle repose surtout sur typographie, cartes, gradients et formulaires. Pour vendre une delegation administrative premium, il faut plus de preuves visibles: humain, portail, exemples de suivi, dossiers anonymises, process concret.

## Donnees observees

### Leads

Commande:

```bash
npm run marketing:ads:leads -- --days 14
```

Resultat du 2026-07-20:

- 9 leads dans la periode 2026-07-07 -> 2026-07-20.
- 1 test Google Ads exclu.
- 0 lead Google Ads reel.
- 0 lead qualifie.
- 0 lead hot.

Correction effectuee pendant cet audit:

- le script de suivi connaissait les anciennes campagnes:
  - `search_pilotage_admin_pv`;
  - `search_sous_traitance_dp`;
  - `search_consuel_raccordement`;
- il ne connaissait pas encore la nouvelle campagne:
  - `search_delegation_admin_pv`.

Action faite:

- ajout de `search_delegation_admin_pv` dans `scripts/marketing-google-ads-leads.mjs`;
- verification OK avec `npm run marketing:ads:leads -- --days 14`;
- verification OK avec `npm run build:ci`.

Impact:

- si la nouvelle campagne genere un lead, il sera maintenant bien reconnu dans le reporting quotidien.

## Google Ads

### Etat lu dans Google Ads

Compte:

- `781-087-0154 Sunelys`;
- `myriam.sunelys@gmail.com`.

Periode Google Ads visible:

- 30 derniers jours, 20 juin -> 19 juillet 2026.

Total compte:

- 1 187 impressions;
- 52 clics;
- 68,72 EUR depenses;
- 0 conversion.

Campagnes visibles:

- `Search - Sous-traitance DP`: ancienne campagne, depense historique, maintenant en veille;
- `Search - Consuel Raccordement`: ancienne campagne, depense historique, maintenant en veille;
- `Search - Pilotage admin PV`: ancienne campagne, depense historique, maintenant en veille;
- `Campaign #1`: Performance Max, en veille;
- `Search - Delegation admin PV installateurs`: eligible, 0 impression, 0 clic, 0 EUR.

### Ce que ca veut dire

Il ne faut pas conclure que Google Ads ne peut pas marcher.

Les anciennes campagnes ont demontre que Google trouve du trafic. Le probleme est que le trafic etait trop large: tutoriels, schemas, particuliers, personnes qui cherchent a comprendre ou faire seules.

La nouvelle campagne est la bonne direction strategique, mais elle est devenue tres restrictive:

- mots-cles B2B tres precis;
- beaucoup de negatifs;
- budget limite;
- CPC max 1,50 EUR;
- campagne recente.

Avec cette combinaison, Google peut rester a 0 impression si le volume exact est faible ou si l'enchere est trop basse sur les rares requetes interessantes.

### Termes de recherche problematiques observes

Exemples de clics ou signaux a exclure:

- `schema electrique raccordement panneau solaire`;
- `comment declarer des panneaux solaires a enedis`;
- `panneau solaire sans autorisation`;
- `pose panneau solaire declaration`;
- requetes autour de schema, cablage, branchement, formulaire, gratuit, particulier, maison.

Ces termes confirment que le filtrage est necessaire.

### Cause probable du blocage actuel

La cause la plus probable n'est pas "pas assez de budget".

La cause probable est:

- ancienne base: trop large, donc depense inutile;
- nouvelle base: trop etroite, donc pas assez de volume;
- CPC a 1,50 EUR probablement trop bas pour certaines requetes B2B rares;
- landing Ads tres directe mais encore peu incarneee visuellement.

## Solution Google Ads recommandee

### Ne pas faire

- Ne pas relancer les anciennes campagnes larges telles quelles.
- Ne pas augmenter le budget global tant que la nouvelle structure ne diffuse pas proprement.
- Ne pas ajouter des mots-cles "comment", "schema", "autorisation", "cerfa", "prix maison", "kit", "particulier".

### Faire maintenant

1. Garder une seule campagne principale:

`Search - Delegation admin PV installateurs`

2. Garder le budget a 10 EUR/jour pendant le reset.

3. Monter legerement le CPC max sur les mots-cles les plus B2B:

- de 1,50 EUR a 2,20 EUR sur les requetes `prestataire`, `sous traitance`, `externaliser`, `installateur`;
- garder 1,50 EUR sur les variantes plus larges si on les rouvre.

4. Ajouter une couche "volume controle" sans revenir au bricolage:

Mots-cles phrase/exact a tester:

- `declaration prealable photovoltaique installateur`;
- `declaration prealable panneaux solaires installateur`;
- `dossier dp photovoltaïque installateur`;
- `dossier consuel photovoltaique installateur`;
- `raccordement enedis photovoltaique installateur`;
- `prestataire administratif photovoltaique`;
- `sous traitance administrative solaire`;
- `externalisation administrative solaire`.

Fichier d'import prepare:

- `docs/google-ads-web-upload/20-volume-controle-keywords-2026-07-20.csv`.

Statut:

- applique dans Google Ads le 2026-07-20 a 10:57;
- 14 lignes ajoutees;
- operation terminee.

5. Conserver les negatifs stricts:

- `comment`;
- `schema`;
- `branchement`;
- `cablage`;
- `pdf`;
- `cerfa`;
- `formulaire`;
- `gratuit`;
- `sans autorisation`;
- `particulier`;
- `maison`;
- `kit solaire`;
- `soi meme`;
- `exemple`;
- `impot`;
- `revenus`.

Fichier de negatifs prepare:

- `docs/google-ads-web-upload/21-volume-controle-negative-keywords-2026-07-20.csv`.

Statut:

- applique dans Google Ads le 2026-07-20 a 11:03;
- 66 lignes ajoutees au niveau des groupes d'annonces;
- operation terminee.

6. Revoir apres 72h:

- si 0 impression: elargir un cran ou augmenter CPC sur B2B;
- si impressions mais 0 clic: annonces trop filtrees ou CTR faible;
- si clics hors sujet: negatifs;
- si clics qualifies mais 0 formulaire: probleme landing/confiance/friction;
- si form_start mais 0 submit: probleme formulaire.

### Action appliquee le 2026-07-20 soir

Comme la campagne saine restait a 0 impression apres l'ajustement B2B strict, une couche supplementaire de volume probable a ete appliquee sans augmenter le budget:

- budget maintenu a 10 EUR / jour;
- 23 mots-cles ajoutes en phrase/exact match;
- ciblage elargi vers les recherches plus probables: declaration prealable photovoltaique, DP panneau solaire, raccordement panneaux solaires, Consuel photovoltaique, gestion administrative photovoltaique;
- CPC max maintenu entre 1,80 EUR et 2,50 EUR;
- 15 nouvelles exclusions ajoutees, 66 autres lignes d'exclusion etaient deja presentes;
- total mots-cles de la campagne active: 122 -> 145.

Fichiers appliques:

- `docs/google-ads-web-upload/22-volume-probable-keywords-2026-07-20.csv`;
- `docs/google-ads-web-upload/23-volume-probable-negative-keywords-2026-07-20.csv`.

Point de controle:

- attendre la validation Google des nouveaux mots-cles;
- verifier impressions, clics, cout et termes de recherche a J+1 puis J+2;
- si encore 0 impression apres 48h, prochain levier: CPC sur les requetes prioritaires ou budget a 12-15 EUR / jour.

## Site / UX / conversion

### Landing Ads

Page auditee:

- `/lp/delegation-admin-pv`

Points forts:

- H1 clair et oriente delegation;
- prix visibles dans le premier ecran;
- cible "installateurs PV uniquement";
- dossier ponctuel accepte;
- formulaire reduit a 3 champs obligatoires;
- telephone optionnel;
- offres DP, Consuel + raccordement, MaPrimeRenov' et CEE presentes.

Points faibles:

- seulement 1 image dans le DOM: le logo;
- pas de photo metier dans le hero;
- pas de capture portail dans le premier ecran;
- pas de visage Myriam / equipe dans la page;
- peu de preuves visuelles de suivi administratif;
- page tres premium mais un peu froide;
- la promesse "diagnostic" reste dominante, alors que les annonces doivent vendre "delegation concrete au dossier".

### Page SEO principale

Page auditee:

- `/gestion-administrative-photovoltaique`

Points forts:

- contenu riche;
- SEO solide;
- offres et tarifs presents;
- preuves textuelles;
- longue traine DP6, Consuel, Enedis, MaPrimeRenov', CEE.

Points faibles:

- seulement le logo en image dans le DOM;
- beaucoup de cartes/formulaires/sections;
- telephone obligatoire dans certains formulaires;
- trop de CTA pour une arrivee SEA;
- impression de competence, mais peu d'incarnation visuelle.

## Audit visuel

La sensation "il n'y a pas assez de visuels" est juste.

Le site a un univers premium, mais il manque 4 familles de visuels:

1. Visuels humains

- photo Myriam;
- portrait sobre avec signature;
- bloc "Votre interlocutrice administrative PV";
- photo moins corporate et plus solaire/terrain si possible.

2. Visuels produit / portail

- capture du portail Sunelys;
- statut de dossiers anonymises;
- timeline DP -> Consuel -> Enedis -> mise en service;
- bloc "avant / apres" sur le suivi d'un dossier.

3. Visuels preuve metier

- exemple anonymise de checklist DP;
- exemple de pieces controlees: DP6, plan de masse, notice, Consuel, Enedis;
- mini schema de process, pas trop decoratif.

4. Visuels energie / contexte

- photo solaire sobre et premium;
- image d'une personne qui travaille sur plans/dossier;
- details de toit/panneaux/logiciel, mais sans effet stock trop generique.

## Benchmark rapide VD2E

Source consultee:

- https://vd2e.fr/declaration-prealable-de-travaux-panneaux-solaires-photovoltaiques/

VD2E met en avant:

- une promesse tres simple sur les DP mairie;
- envoi sous 24h;
- experts dedies;
- volume mensuel;
- contact dedie;
- photo metier;
- process clair;
- manager nomme;
- equipe de 22 specialistes sur le pole mairie.

Lecture pour Sunelys:

- Sunelys est plus premium et plus sobre;
- VD2E parait plus massif et plus concret;
- Sunelys doit compenser par plus de precision, plus d'incarnation et plus de preuve operationnelle;
- il ne faut pas copier le style VD2E, mais reprendre la logique de preuves visibles.

## Solution site recommandee

### Sprint 1 - conversion + visuels

Modifier la landing Ads en priorite:

1. Ajouter un bloc visuel dans le hero ou juste sous le hero:

- capture portail Sunelys;
- 3 dossiers anonymises;
- statuts DP / Consuel / Enedis;
- petit label "Exemple de suivi, donnees anonymisees".

2. Ajouter une bande "preuves immediates":

- 1 357 dossiers pilotes;
- 96 % de DP sans piece complementaire;
- production sous 48h si dossier complet;
- dossier ponctuel accepte.

3. Ajouter un bloc humain:

- photo Myriam;
- "Votre interlocutrice administrative PV";
- texte court: "Je cadre le premier dossier a deleguer, puis on mesure ce qui soulage vraiment vos equipes."

4. Ajouter une section "avant / apres":

- avant: mails, statuts flous, relances dispersées;
- apres: statut clair, prochaine action, piece manquante, responsable.

5. Garder le formulaire en 3 champs obligatoires.

### Sprint 2 - SEO premium

Sur les pages SEO:

- ajouter une image hero metier ou un mockup portail;
- ajouter des visuels par service;
- ajouter des captures anonymisees de documents / process;
- reduire le sentiment "mur de cartes";
- garder la richesse SEO mais aerer avec preuves visuelles.

### Sprint 3 - tracking comportemental

Ajouter ou verifier les evenements:

- `form_start`;
- `pricing_view`;
- `cta_primary_click`;
- `phone_click`;
- `booking_click`;
- `scroll_50`;
- `visual_proof_view`.

Objectif:

- savoir si les visiteurs quittent avant le formulaire;
- savoir si les prix sont vus;
- savoir si la page manque de confiance;
- distinguer probleme Ads et probleme conversion.

## Decision prioritaire

La prochaine action utile n'est pas "plus de mots-cles" ni "plus de budget".

La prochaine action utile est:

1. fiabiliser le reporting de la nouvelle campagne, fait;
2. faire diffuser la nouvelle campagne avec un peu plus de volume B2B et/ou CPC;
3. ajouter de vraies preuves visuelles sur la landing Ads;
4. mesurer les micro-conversions;
5. juger apres 30 a 50 clics propres.

Si on fait seulement Ads sans renforcer la page, on risque de payer des clics propres qui ne convertissent pas assez.

Si on fait seulement le design sans corriger la diffusion, on aura une belle page sans trafic qualifie.

La solution est donc un duo:

- acquisition plus controlee;
- page plus incarnee, plus visuelle, mais toujours orientee conversion.
