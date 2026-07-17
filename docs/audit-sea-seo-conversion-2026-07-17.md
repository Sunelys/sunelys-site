# Audit complet SEA / SEO / conversion Sunelys - 2026-07-17

## Verdict court

Le probleme principal n'est plus la diffusion Google Ads ni le tracking. Les campagnes Search depensent maintenant, les annonces sont eligibles, les UTM et conversions formulaire sont en place, et le lead test confirme la chaine.

Le probleme principal est l'alignement entre:

1. les requetes achetees;
2. le niveau d'intention reel des clics;
3. la promesse des annonces;
4. la premiere section de la landing page;
5. la friction du formulaire.

En clair: on attire encore trop de recherches informatives ou particulieres, puis on demande beaucoup d'informations avant d'avoir suffisamment filtre et rassure. Il faut repartir sur une base plus stricte, plus B2B, plus mesurable.

## Donnees observees

### Leads et tracking

- Commande de controle: `npm run marketing:ads:leads -- --days 14`.
- Periode analysee: 2026-07-04 -> 2026-07-17.
- Leads Airtable lus: 10.
- Leads dans la periode: 9.
- Leads test exclus: 1.
- Leads Google Ads reels detectes: 0.
- Leads qualifies/hot Google Ads: 0.

Lecture: le tracking fonctionne pour le test, mais aucun lead paid reel n'est encore remonte.

### Historique Google Ads

Etat initial Performance Max:

- `Campaign #1`, Performance Max, 10 EUR/jour.
- Periode lue initialement: 10 juin - 9 juillet 2026.
- Resultat: 209 impressions, 4 clics, 0,20 EUR, 0 conversion.
- Probleme: tres faible diffusion et peu de controle sur les requetes.

Bascule effectuee:

- `Campaign #1` mise en veille.
- 3 campagnes Search actives:
  - `Search - Pilotage admin PV`: 4 EUR/jour.
  - `Search - Sous-traitance DP`: 3 EUR/jour.
  - `Search - Consuel Raccordement`: 3 EUR/jour.
- 6 groupes d'annonces.
- 6 RSA.
- Objectif prioritaire: lead formulaire web.

Premiers resultats apres elargissement:

- 2026-07-13 / 2026-07-14: les campagnes commencent a diffuser, mais les termes contiennent deja des intentions hors cible: `branchement`, `comment remplir`, `cerfa`, `pdf`, `plug and play`, petites puissances, particulier.
- 2026-07-15: 122 impressions, 9 clics, 13,07 EUR, 0 conversion.
- 2026-07-16 partiel documente: 57 impressions, 4 clics, 5,85 EUR, 0 conversion.
- Derniere lecture 2026-07-16 complete: environ 303 impressions, 13 clics, 19,07 EUR, 0 conversion.
- Derniere lecture 2026-07-17: environ 290 impressions, 10 clics, 13,08 EUR, 0 conversion.

Lecture: on n'est plus dans un probleme "Google ne diffuse pas". On est dans un probleme "Google diffuse, mais pas encore sur assez de personnes pretes a deleguer".

### Termes et intentions observes

Termes payants ou visibles qui confirment le risque:

- `schema electrique raccordement panneau solaire`;
- `comment declarer des panneaux solaires a enedis`;
- `panneau solaire sans autorisation`;
- `declaration pose panneau solaire`;
- requetes autour de `autorisation`, `reglementation`, `comment connecter`, `raccorder`, `gratuit`, `entretien`.

Les exclusions deja ajoutees vont dans le bon sens:

- `branchement`, `brancher`, `comment brancher`, `comment remplir`;
- `pdf`, `cerfa`, `plug and play`;
- petites installations;
- `schema`, `schema electrique`, `cablage`;
- `plan de branchement`, `prix panneau solaire`, `maison 150m2`, `carport solaire`, `contrat entretien`.

Mais le signal montre que les mots-cles d'elargissement ont ouvert trop grand.

## Audit campagnes Google Ads

### Ce qui est bon

- Le passage de Performance Max vers Search etait la bonne decision.
- Les campagnes sont propres, nommees clairement, avec UTM.
- Le CPC max a 1,50 EUR reste raisonnable.
- Les exclusions ont ete traitees rapidement.
- Les mots-cles B2B ajoutent la bonne direction: `prestataire`, `sous traitance`, `externaliser`, `installateur`.

### Ce qui bloque

1. Budget trop fragmente.

Avec 10 EUR/jour, repartir le budget entre 3 campagnes et 6 groupes d'annonces ralentit l'apprentissage. Chaque groupe recoit trop peu de clics pour conclure vite.

2. Trop de mots-cles "probleme general".

Les requetes type `declaration prealable panneaux solaires`, `consuel photovoltaique`, `raccordement panneaux solaires` ont du volume, mais elles melangent:

- installateurs;
- particuliers;
- secretaires internes;
- personnes qui veulent comprendre;
- personnes qui veulent faire seules;
- personnes qui cherchent un document, un schema, un CERFA ou un prix.

3. Les annonces filtrent encore trop peu.

Les RSA actuelles contiennent bien `Pour installateurs PV`, mais la promesse dominante reste souvent:

- `Diagnostic gratuit`;
- `Reponse sous 24h`;
- `Gagnez du temps`;
- `Dossiers PV bloques`.

Ces angles sont utiles, mais pas assez discriminants. Ils peuvent attirer quelqu'un qui veut une reponse gratuite, pas quelqu'un qui veut acheter une delegation.

4. Les annonces ne mettent pas assez le prix et le perimetre.

Pour un petit budget, il vaut mieux payer moins de clics mais plus qualifies. Il faut assumer plus tot:

- `Installateurs PV uniquement`;
- `DP complete 119 EUR HT`;
- `Raccordement + Consuel 89 EUR HT`;
- `Dossier ponctuel accepte`;
- `Sous-traitance administrative solaire`.

## Audit landing page / UX

### Ce qui est fort

- Le positionnement premium est coherent.
- Le design est rassurant, haut de gamme, serieux.
- Le H1 est clair: `Pilotage administratif photovoltaïque pour installateurs`.
- La preuve est presente: dossiers pilotes, production sous 48h, taux de DP sans piece complementaire.
- Les prix sont visibles plus bas.
- Le message "dossier ponctuel accepte" corrige bien le risque de se priver des petits installateurs.
- Les services ajoutes sont bien presents: DP, raccordement + Consuel, MaPrimeRenov', CEE.

### Ce qui bloque probablement la conversion Ads

1. La landing reste trop "pilotage complet" pour des clics tres precis.

Si la personne arrive via `declaration prealable panneaux solaires`, `consuel photovoltaique` ou `raccordement enedis photovoltaique`, elle doit comprendre immediatement qu'elle peut deleguer la brique precise, pas seulement un pilotage global.

2. Les tarifs ne sont pas assez visibles dans le premier ecran.

Pour filtrer les particuliers et les curieux, les prix doivent etre plus haut:

- DP complete: 119 EUR HT.
- Raccordement + Consuel: 89 EUR HT.
- MaPrimeRenov': 129 EUR HT.
- CEE: 99 EUR HT.

3. Le formulaire hero est trop exigeant pour un clic froid.

Au-dessus de la ligne de flottaison, le formulaire demande 5 champs obligatoires:

- email professionnel;
- telephone;
- volume mensuel;
- etape bloquee;
- urgence.

Le telephone obligatoire est probablement le plus gros frein. Sur un trafic encore froid, beaucoup de visiteurs ne veulent pas donner leur numero avant d'avoir valide que Sunelys correspond exactement a leur besoin.

4. Sur mobile, l'action est retardee.

La page est belle, mais le premier ecran mobile montre surtout le header, le H1, les badges et les CTA. Le formulaire arrive plus bas. Le header prend beaucoup de place pour une page Ads.

5. Trop de CTA concurrents.

La page contient beaucoup d'entrees:

- diagnostic gratuit;
- tarifs;
- checklist;
- diagnostic sous 24h;
- offres;
- services;
- liens blogs.

Pour du SEO, c'est riche. Pour du SEA, c'est trop disperse. Une landing Ads devrait avoir un chemin dominant.

## Audit tracking / mesure

### Ce qui est solide

- Les UTM et clic IDs sont stockes en local.
- Les champs d'attribution sont synchronises dans les formulaires.
- Les evenements `form_submit`, `lead_form_submit`, `generate_lead`, `lead_converted` sont envoyes.
- La conversion Google Ads est declenchee sur `generate_lead`.
- Le test Google Ads a ete exclu proprement des rapports.

### Ce qui manque pour arreter de deviner

Aujourd'hui, on sait qu'il n'y a pas de lead. Mais on ne sait pas encore si les visiteurs:

- quittent avant de cliquer;
- cliquent mais ne commencent pas le formulaire;
- commencent le formulaire et bloquent au telephone;
- abandonnent sur les selects;
- cliquent telephone ou Calendly;
- scrollent jusqu'aux prix.

Evenements a ajouter ou verifier dans GA4:

- `pricing_view`;
- `cta_primary_click`;
- `form_start`;
- `form_field_focus_phone`;
- `form_step_complete`;
- `form_error`;
- `scroll_50`;
- `mobile_sticky_cta_click`.

Ces evenements doivent rester en mesure secondaire, pas en conversion principale Google Ads au depart.

## Audit SEO

### Ce qui est bon

- Les pages services couvrent les bons themes:
  - gestion administrative photovoltaïque;
  - declaration prealable;
  - sous-traitance DP;
  - dossier Consuel;
  - raccordement Enedis;
  - tarifs.
- Les contenus mentionnent maintenant les pieces complexes: DP6, document graphique, plan de masse, plan de coupe, notice descriptive, insertion paysagere, DP7/DP8.
- C'est excellent pour prouver l'expertise.

### Ce qu'il faut faire en SEO, pas en Ads

Les recherches `DP6`, `DP7`, `document graphique`, `plan de masse`, `insertion paysagere` sont tres interessantes, mais Keyword Planner montre peu ou pas de volume exploitable exact. Elles doivent nourrir:

- une section longue traine sur la page DP;
- un article guide "pieces DP panneaux solaires";
- un bloc de conversion pour les assistantes / secretaires / installateurs bloques;
- des exemples de pieces gerees par Sunelys.

Il ne faut pas en faire une campagne Ads dediee avec 10 EUR/jour.

## Recommandation de reset SEA

### Objectif

Repartir sur moins de campagnes, plus d'intention B2B, plus de filtrage et une landing plus directe.

### Structure conseillee pendant 7 jours

Option recommandee:

- 1 campagne Search principale a 8 EUR/jour: `Search - Delegation admin PV installateurs`.
- 1 micro-campagne test a 2 EUR/jour ou mise en pause: `Search - Consuel/Raccordement exact`.

Ou, encore plus strict:

- 1 seule campagne a 10 EUR/jour pendant 7 jours pour accelerer la lecture.

### Groupes d'annonces prioritaires

1. Sous-traitance DP / prestataire DP:

- `sous traitance declaration prealable photovoltaique`;
- `prestataire declaration prealable photovoltaique`;
- `sous traitant dp photovoltaique`;
- `externaliser declaration prealable panneaux solaires`;
- `gestion declaration prealable installateur photovoltaique`.

2. Consuel + raccordement installateur:

- `dossier consuel photovoltaique installateur`;
- `prestataire consuel photovoltaique`;
- `sous traitance consuel photovoltaique`;
- `prestataire raccordement enedis photovoltaique`;
- `suivi raccordement enedis installateur`.

3. Pilotage administratif B2B:

- `gestion administrative installateur photovoltaique`;
- `prestataire dossier photovoltaique`;
- `externalisation dossier photovoltaique`;
- `sous traitance administratif photovoltaique`.

### Mots-cles a limiter ou mettre en observation

A reduire fortement si le budget reste a 10 EUR/jour:

- `declaration prealable panneaux solaires`;
- `dp panneaux solaires`;
- `consuel photovoltaique`;
- `raccordement panneaux solaires`;
- `dossier photovoltaique`;
- `enedis photovoltaique`.

Ces termes ont du volume, mais ils coutent vite cher en clics informatifs.

### Negatifs a renforcer

Ajouter ou verifier:

- `comment`;
- `comment declarer`;
- `comment faire`;
- `sans autorisation`;
- `schema`;
- `schema electrique`;
- `branchement`;
- `brancher`;
- `cablage`;
- `en parallele`;
- `exemple`;
- `pdf`;
- `cerfa`;
- `gratuit`;
- `modele`;
- `formulaire`;
- `impot`;
- `revenus`;
- `particulier`;
- `soi meme`;
- `plug and play`;
- `kit solaire`;
- `au sol`;
- `maison`;
- `prix installation`;
- `entretien`.

Attention: ne pas exclure trop vite `aide` ou `prime` de maniere large si on veut vendre MaPrimeRenov' / CEE. Il faut exclure plutot les recherches manifestement particulieres autour de ces mots.

## Recommandation annonces

### Principe

Moins de "diagnostic gratuit" en titre principal. Plus de filtrage B2B et prix.

### Angles a tester

RSA 1 - DP:

- `Sous-traitez vos DP solaires`
- `Installateurs PV uniquement`
- `DP complete 119 EUR HT`
- `Dossier ponctuel accepte`
- `Depot mairie + suivi`
- `Evitez les complements`
- `Reponse sous 24h`

Descriptions:

- `Sunelys prepare, depose et suit vos declarations prealables PV. Service pense pour installateurs, dossier ponctuel ou flux recurrent.`
- `Prix fixe: DP complete 119 EUR HT. Diagnostic gratuit pour cadrer le premier dossier a deleguer.`

RSA 2 - Consuel / raccordement:

- `Consuel + raccordement PV`
- `89 EUR HT par dossier`
- `Pour installateurs solaires`
- `Suivi Enedis et Consuel`
- `Dossier ponctuel accepte`
- `Mise en service plus lisible`

Descriptions:

- `Sunelys suit vos dossiers Consuel et raccordement Enedis pour reduire les relances et les angles morts administratifs.`
- `Service B2B pour installateurs PV. Tarif fixe raccordement + Consuel: 89 EUR HT.`

RSA 3 - Pilotage complet:

- `Admin PV externalisee`
- `DP Consuel Enedis aides`
- `Pour installateurs PV`
- `Sans recrutement admin`
- `199 EUR HT pilotage complet`
- `Dossier ou flux mensuel`

Descriptions:

- `Deleguez DP, raccordement, Consuel, MaPrimeRenov' et CEE dans un flux clair. Dossier ponctuel ou volume mensuel.`

## Recommandation landing Ads

Creer une variante SEA plus directe, meme si la page SEO reste riche.

### Premier ecran recommande

H1:

`Installateurs PV: deleguez vos dossiers DP, Consuel, Enedis et aides`

Sous-titre:

`Sunelys reprend vos demarches administratives au dossier, sans minimum mensuel: DP complete 119 EUR HT, raccordement + Consuel 89 EUR HT, MaPrimeRenov' et CEE en suivi.`

Badges:

- `Installateurs uniquement`
- `Dossier ponctuel accepte`
- `Prix fixes HT`
- `Reponse sous 24h`

Formulaire hero:

- email professionnel obligatoire;
- besoin principal obligatoire;
- volume obligatoire;
- telephone optionnel;
- message optionnel.

Ou en 2 etapes:

Etape 1:

- besoin;
- volume;
- email.

Etape 2 apres clic:

- telephone;
- urgence;
- details.

### Pourquoi

Le visiteur Google Ads n'a pas encore assez confiance pour donner tout de suite son telephone. Il faut d'abord obtenir un signal d'intention, puis qualifier.

## Recommandation communication premium + conversion

Le design premium est un bon actif, il ne faut pas le casser. Mais le luxe doit servir la confiance operationnelle, pas seulement l'esthetique.

Ajouter en priorite:

1. Un bloc "ce que vous deleguez exactement":
   - DP;
   - Consuel;
   - raccordement;
   - MaPrimeRenov';
   - CEE.

2. Un bloc "prix fixes":
   - DP complete 119 EUR HT;
   - raccordement + Consuel 89 EUR HT;
   - MaPrimeRenov' 129 EUR HT;
   - CEE 99 EUR HT;
   - pilotage complet 199 EUR HT si pertinent.

3. Un bloc preuve operationnelle:
   - exemple anonymise de suivi dossier;
   - delai de production quand pieces completes;
   - taux de DP sans piece complementaire;
   - nombre de dossiers pilotes.

4. Un filtre clair:
   - `Service reserve aux installateurs, entreprises solaires et equipes administratives PV.`

Ce filtre peut baisser le taux de clic, mais ameliorer la qualite des clics.

## Plan d'action recommande

### Priorite 1 - Aujourd'hui / demain

1. Ne pas augmenter le budget tant que la qualite des clics n'est pas stabilisee.
2. Recentrer les campagnes sur les mots `prestataire`, `sous-traitance`, `externaliser`, `installateur`.
3. Mettre les mots plus larges en pause ou les isoler avec tres faible budget.
4. Ajouter les negatifs restants autour de `comment`, `sans autorisation`, `gratuit`, `modele`, `particulier`.
5. Recrire les annonces avec prix + `installateurs PV uniquement`.

### Priorite 2 - Cette semaine

1. Creer une landing SEA plus courte, plus directe, avec prix dans le premier ecran.
2. Rendre le telephone optionnel sur le formulaire hero ou passer en formulaire 2 etapes.
3. Ajouter les micro-evenements `form_start`, `pricing_view`, `cta_primary_click`.
4. Garder la page actuelle pour SEO et enrichir les blocs DP6 / pieces techniques.

### Priorite 3 - Apres 7 jours de nouvelle base

1. Juger sur au moins 30 a 50 clics mieux qualifies.
2. Si 0 `form_start`, probleme de message/page.
3. Si `form_start` mais 0 lead, probleme de formulaire/friction.
4. Si leads non qualifies, probleme de mots-cles/annonces.
5. Si 1 lead qualifie, doubler progressivement le budget du groupe qui l'a genere.

## Decision finale

On ne doit pas continuer a tatonner en ajoutant toujours plus de mots-cles ou de budget.

La bonne suite est:

1. resserrer fortement l'achat media sur les requetes B2B;
2. filtrer dans les annonces avec prix et cible installateur;
3. simplifier la landing SEA;
4. mesurer les micro-conversions;
5. attendre un vrai signal avant de scaler.

Le site a une base premium et credible. Maintenant, il faut le rendre plus chirurgical pour Google Ads.
