# Audit premium SEO / UX / conversion Sunelys - 2026-07-21

## Synthese executive

Sunelys a maintenant une base serieuse: le site est indexable, les pages strategiques existent, la promesse B2B est claire, les tarifs sont visibles, le tracking de conversion est en place et les nouveaux visuels portail renforcent la preuve operationnelle.

Mais le site n'est pas encore au niveau "waouh premium" que la marque peut atteindre. Le principal ecart ne vient pas d'un manque de pages ou d'un bug technique. Il vient de trois sujets:

1. La preuve visible reste encore trop faible: il faut plus d'humain, plus de captures propres, plus de cas reels anonymises, plus de signes de rigueur.
2. Le parcours de conversion est trop dense: beaucoup de CTA, beaucoup de formulaires, beaucoup de sections. C'est bon pour capter, mais ca peut diluer la perception premium.
3. La strategie SEO doit passer d'un ensemble de pages solides a une architecture d'autorite: clusters, maillage, intentions, pages pieces difficiles, et contenus qui parlent vraiment aux installateurs et assistantes qui cherchent une solution concrete.

Verdict: le site est sain et exploitable commercialement. Pour le rendre vraiment premium, il faut moins "ajouter partout" et davantage scenariser la confiance: clarte, autorite, preuves, visuels, parcours simple.

## Notes

| Axe | Note | Lecture |
| --- | ---: | --- |
| SEO technique | 8,4 / 10 | Base saine: 30 pages HTML, 1 H1 par page, metas presentes, canonicals presentes, schema.org actif, sitemap et robots en place. A corriger: lastmod sitemap, descriptions CTR, schemas plus precis. |
| SEO contenu | 7,6 / 10 | Bon socle DP, Consuel, Enedis, EDF OA, tarifs et blog. Potentiel fort sur longue traine: DP6, DP7/DP8, insertion paysagere, plan de masse, Consuel refuse, raccordement bloque. |
| UX conversion | 7,7 / 10 | Promesse claire, formulaires actifs, prix visibles, portail ajoute. Risque: trop de CTA et de formulaires pour une experience premium. |
| Perception premium | 7,1 / 10 | Design coherent et plus rassurant depuis les visuels portail. Pas encore assez humain, photographique et "cabinet expert". |
| Preuve et confiance | 7,4 / 10 | Chiffres, temoignage et portail aident. Il manque des cas clients plus incarnes, une page preuve, des exemples anonymises et des avis Google exploites. |
| Performance percue | 7,0 / 10 | Astro est une bonne base. Risque sur assets publics lourds, scripts tracking, images sociales et fichiers non utiles publies. Lighthouse/PageSpeed a recontroler. |
| Tracking / pilotage | 8,0 / 10 | UTM, gclid, evenements et reporting lead existent. Il manque une lecture fine des abandons formulaire et des micro-conversions. |
| Google Ads / SEA | 7,2 / 10 | La nouvelle structure Search est plus saine. Le volume reste fragile: il faut piloter par termes reels, exclusions, CPC et intention B2B. |

Score global actuel: 7,6 / 10.

Objectif realiste a 30 jours: 8,5 / 10.

Objectif "waouh premium": 9 / 10, mais il faudra des photos reelles, des preuves plus fortes et un parcours plus tranche.

## Controles effectues

Publication deja faite:

- commit de production: `f94f674 Add anonymized portal proof visuals`;
- deploiement Vercel verifie;
- `https://sunelys.fr/gestion-administrative-photovoltaique` repond en `HTTP 200`;
- la page contient bien la section `Portail client inclus`;
- les nouveaux visuels anonymises du portail repondent en `HTTP 200`;
- les anciennes captures brutes publiques du portail repondent maintenant en `404`.

Audit statique local:

- 30 pages HTML generees;
- 0 page avec probleme de H1;
- 0 meta description manquante;
- 0 canonical manquante;
- 0 image sans attribut `alt`;
- 62 formulaires dans le HTML genere;
- 589 CTA traces avec `data-track="cta_..."`;
- sitemap present;
- robots.txt ouvert a l'indexation.

Point de reserve:

- PageSpeed Insights a ete bloque par quota `429`; les notes performance ci-dessus sont donc une evaluation technique basee sur le build, les assets et l'architecture, pas un score Lighthouse officiel.

## Ce qui est deja fort

### Positionnement

Sunelys parle a une cible precise: installateurs photovoltaiques qui veulent deleguer l'administratif. C'est beaucoup plus fort qu'une promesse generique de secretariat ou d'assistance administrative.

La phrase centrale est bonne:

- pilotage administratif photovoltaïque;
- pour installateurs;
- DP, raccordement, Consuel, MaPrimeRenov' et CEE;
- dossiers ponctuels acceptes;
- tarifs au dossier.

Ce positionnement est rare, lisible et monetisable.

### Architecture SEO

Les pages services couvrent les intentions majeures:

- gestion administrative photovoltaïque;
- déclaration préalable panneaux solaires;
- dossier Consuel photovoltaïque;
- raccordement Enedis photovoltaïque;
- EDF OA;
- sous-traitance administrative photovoltaïque;
- tarifs.

Le blog couvre deja plusieurs sujets SEO utiles:

- pieces et delais DP;
- erreurs DP;
- Consuel refuse;
- delais raccordement;
- cout de gestion administrative;
- externalisation administrative solaire.

Cette base permet de construire une autorite thematique serieuse.

### Technique SEO

Les fondamentaux sont bons:

- balise `html lang="fr"`;
- titres et descriptions;
- canonicals;
- Open Graph et Twitter cards;
- schema Organization et WebSite;
- BreadcrumbList automatique;
- schema FAQ et Service selon les pages;
- sitemap XML;
- robots.txt propre.

Ce n'est pas la zone rouge. Le SEO technique ne bloque pas la croissance.

### Conversion

Le site a de vrais points de capture:

- formulaires;
- diagnostic gratuit;
- CTA suivis;
- pages services orientees intention;
- pricing visible;
- promesse de production sous 48h;
- rassurance par chiffres et temoignage.

Le systeme peut deja convertir. Il faut maintenant rendre le parcours plus selectif et plus premium.

### Preuve operationnelle

L'ajout des visuels portail change quelque chose d'important: on ne vend plus seulement une expertise abstraite, on montre une organisation. C'est une bonne direction pour Sunelys, parce que la promesse vendue est autant une methode qu'un service.

## Les vrais freins actuels

### 1. Le site donne encore parfois l'impression d'en faire beaucoup

Le site est riche, mais le premium aime la maitrise. Trop de CTA, trop de formulaires et trop de blocs peuvent donner une impression de pression commerciale.

Constat chiffre:

- 62 formulaires dans le build;
- 589 CTA traces.

Ce n'est pas un bug. Mais c'est un signal: on doit hierarchiser plus fort.

Recommandation:

- garder un CTA principal par zone: `Recevoir mon diagnostic sous 24h`;
- garder les CTA secondaires seulement quand ils aident vraiment: tarifs, services, checklist;
- reduire les formulaires repetes sur les pages longues;
- transformer certains formulaires bas de page en CTA vers un seul formulaire contextualise.

### 2. Le premium manque encore d'humain reel

Les visuels portail sont utiles, mais le site doit montrer davantage Myriam / Sunelys comme cabinet expert.

Aujourd'hui, le visiteur comprend le service. Demain, il doit se dire:

"Je peux confier mes dossiers a cette personne et son systeme."

Manques prioritaires:

- photo professionnelle de Myriam;
- photo bureau / poste de travail / dossiers;
- image de pilotage avec ecran + notes + ambiance claire;
- portrait court "qui pilote vos dossiers";
- preuve de rigueur: controle qualite, process, checklists, statuts.

### 3. Les pages SEO sont bonnes, mais certaines intentions peuvent se cannibaliser

Les pages DP, sous-traitance DP, tarif DP et gestion administrative sont proches. C'est normal, mais il faut leur donner des roles tres differents.

Role recommande:

- `/gestion-administrative-photovoltaique`: page pilier pour la delegation globale.
- `/declaration-prealable-panneaux-solaires`: page informationnelle forte + conversion vers DP complete.
- `/sous-traitance-declaration-prealable-solaire`: page B2B installateurs qui veulent deleguer la DP.
- `/tarif-declaration-prealable-photovoltaique`: page prix et comparaison cout interne vs externalisation.
- `/lp/delegation-admin-pv`: landing SEA, plus courte, plus directe, moins SEO.

Chaque page doit avoir un angle distinct dans son H1, son intro, ses CTA et ses liens internes.

### 4. Le site ne possede pas encore assez de "preuves objets"

Un service administratif est invisible. Pour vendre premium, il faut rendre l'invisible visible.

Preuves a ajouter:

- exemple de suivi dossier anonymise;
- capture portail avec statuts;
- exemple de timeline DP -> mairie -> retour -> validation;
- exemple de checklist pieces;
- mini cas client: probleme, reprise, resultat;
- capture d'un reporting hebdo fictif/anonymise;
- bloc "ce que vous recevez exactement".

Le visiteur doit pouvoir visualiser ce qui se passe apres avoir rempli le formulaire.

### 5. La promesse "dossier ponctuel accepte" doit rester visible

On a eu la bonne intuition: ne pas exclure les petits installateurs. Il ne faut pas dire "a partir de 10 dossiers/mois" en barriere frontale.

Meilleure formulation:

"Dossier ponctuel, pic de charge ou flux mensuel: Sunelys reprend le bon niveau de pilotage selon votre besoin."

Ce message garde les petits installateurs, sans affaiblir l'offre premium.

### 6. Le sitemap doit mieux refleter les changements

Le sitemap production montre encore certaines dates `lastmod` au 2026-07-20 alors que des pages ont ete modifiees le 2026-07-21.

Ce n'est pas grave, mais c'est a corriger:

- automatiser `lastmod` depuis les dates de contenu ou de build;
- ou mettre a jour manuellement les pages modifiees importantes.

### 7. Les assets publics doivent etre nettoyes

Le repertoire public contient des assets lourds et des fichiers qui ne devraient pas forcement etre servis:

- images LinkedIn de 1 a 2,2 Mo;
- sources de visuels;
- `.DS_Store` dans `public/linkedin/`;
- images OG PNG assez lourdes.

Risque:

- poids inutile au deploiement;
- fichiers non necessaires accessibles publiquement;
- manque de proprete technique.

Action:

- deplacer les sources hors `public`;
- supprimer `.DS_Store`;
- convertir les visuels lourds en WebP/AVIF quand ils sont affiches sur le site;
- garder `public` pour les assets reellement servis.

## Audit SEO detaille

### Priorite SEO 1: construire les clusters d'intention

Le SEO doit etre organise autour de 5 familles:

1. Delegation administrative PV
2. Declaration prealable PV
3. Consuel PV
4. Raccordement Enedis PV
5. Aides / EDF OA / CEE / MaPrimeRenov'

Chaque famille doit avoir:

- une page pilier;
- 3 a 6 articles longue traine;
- des liens internes clairs vers l'offre;
- une FAQ;
- un CTA adapte a l'intention.

### Priorite SEO 2: capter les recherches "pieces difficiles"

Ces requetes ne font pas toujours un gros volume, mais elles signalent un vrai blocage:

- DP6 photovoltaïque;
- document graphique DP6 panneaux solaires;
- DP7 DP8 panneaux solaires;
- plan de masse panneaux photovoltaïques;
- plan de coupe panneaux solaires;
- insertion paysagère panneaux solaires;
- notice descriptive déclaration préalable solaire;
- pièce complémentaire mairie panneaux solaires;
- Consuel photovoltaïque refusé;
- raccordement Enedis dossier incomplet.

Recommandation:

- ne pas en faire des campagnes Google Ads dediees avec petit budget;
- les traiter en SEO et dans les sections service;
- creer un guide pilier: `Pieces declaration prealable panneaux solaires: DP6, DP7, DP8, plans et erreurs`.

### Priorite SEO 3: enrichir les meta descriptions pour le CTR

Les metas existent, mais certaines peuvent vendre davantage.

Exemples:

- `Dossier Consuel photovoltaïque`: description actuelle courte. Ajouter l'angle "installateurs", "pieces", "suivi", "mise en service".
- `Raccordement Enedis`: ajouter "Sunelys suit vos demandes, relances et blocages administratifs".
- `Tarifs DP`: mettre le prix et la garantie des le snippet.

Objectif:

- pas seulement decrire la page;
- donner une raison de cliquer.

### Priorite SEO 4: renforcer les donnees structurees

Le site utilise deja schema.org. Il faut maintenant le rendre plus exploitable:

- `Service` avec zone desservie France;
- `Offer` pour DP, raccordement + Consuel, MaPrimeRenov', CEE;
- `FAQPage` sur les pages ou les FAQ sont visibles;
- `LocalBusiness` ou `ProfessionalService` si coherent avec la fiche Google;
- `Review` uniquement si les avis sont reels, visibles et conformes aux regles Google.

Attention: ne pas baliser des avis fictifs ou non visibles.

### Priorite SEO 5: separer SEO et landing Ads

Une page SEO peut etre longue, riche, maillée.

Une landing Ads doit etre plus courte:

- H1 direct;
- prix visibles;
- un message pour installateurs;
- un formulaire court;
- preuve immediate;
- peu de liens sortants;
- CTA unique.

La landing `/lp/delegation-admin-pv` doit rester le laboratoire SEA. Les pages SEO doivent construire l'autorite organique.

## Audit UX / conversion detaille

### Parcours ideal

Le visiteur doit comprendre en moins de 8 secondes:

1. Sunelys gere l'administratif photovoltaïque pour installateurs.
2. Il peut deleguer un dossier ponctuel ou un flux mensuel.
3. Les prix sont clairs.
4. Il y a une methode et un suivi.
5. Il peut demander un diagnostic sans engagement.

### Premier ecran recommande

Pour les pages business principales:

- headline: une promesse concrete, pas abstraite;
- sous-titre: DP, Consuel, Enedis, aides;
- preuve: chiffre + temoignage court + portail;
- prix ou "a partir de" visible;
- un CTA principal;
- une photo humaine ou portail propre.

### Formulaire

Le formulaire doit filtrer sans intimider.

Version recommandee:

Champs obligatoires:

- email professionnel;
- besoin principal;
- volume approximatif;
- message court optionnel.

Champs optionnels:

- telephone;
- urgence;
- societe.

Apres soumission:

- page merci avec promesse de delai;
- recap du besoin;
- proposition de rendez-vous;
- evenement conversion.

### CTA

CTA principal recommande:

`Recevoir mon diagnostic sous 24h`

CTA secondaire:

`Voir les tarifs`

CTA tertiaire:

`Telecharger la checklist`

Eviter d'avoir plusieurs formulations concurrentes au meme endroit:

- diagnostic gratuit;
- audit;
- plan d'action;
- devis;
- contact;
- checklist.

On peut garder plusieurs offres, mais l'action principale doit rester stable.

### Premium design

Le premium ne veut pas dire plus de decoration. Il veut dire:

- moins de bruit;
- plus de precision;
- plus d'espace;
- typographie stable;
- visuels reels;
- modules de preuve elegants;
- couleurs coherentes;
- microcopies nettes.

Actions design prioritaires:

- reduire les blocs qui ressemblent a des cartes marketing generiques;
- creer une grille de preuves plus editorialisee;
- ajouter de vrais visuels photo;
- harmoniser les ratios image;
- utiliser les captures portail comme preuves, pas comme decoration;
- rendre la section tarifs plus "cabinet expert" que "catalogue".

## Audit Google Ads / SEA

### Etat strategique

Les premieres campagnes ont prouve que Google sait trouver du volume, mais avec trop de trafic informatif.

La nouvelle campagne Search est plus saine, mais elle peut manquer de volume si elle reste trop stricte.

Le bon pilotage est:

- volume controle;
- negatifs stricts;
- CPC ajuste sur intentions B2B;
- lecture des termes de recherche;
- pas de relance Performance Max tant que le Search n'a pas valide l'intention.

### Mots-cles a surveiller

Intentions a encourager:

- prestataire administratif photovoltaïque;
- sous-traitance administrative solaire;
- externaliser administratif photovoltaïque;
- declaration prealable photovoltaique installateur;
- dossier Consuel photovoltaïque installateur;
- raccordement Enedis photovoltaïque installateur;
- gestion administrative photovoltaïque.

Intentions a exclure ou surveiller:

- comment;
- schema;
- branchement;
- brancher;
- cablage;
- en parallele;
- exemple;
- pdf;
- cerfa;
- gratuit;
- particulier;
- kit solaire;
- soi meme;
- impot;
- revenus.

### Landing Ads

La landing SEA doit etre plus directe que le site SEO:

- moins de navigation;
- moins de contenus secondaires;
- prix tres haut;
- cible installateurs visible;
- dossier ponctuel visible;
- formulaire court;
- preuve portail et temoignage au-dessus ou juste apres le hero.

## Audit Google Business Profile

La fiche Google Business doit devenir le reflet du positionnement premium.

Priorites:

- garder la fiche qui contient les avis;
- supprimer ou marquer comme doublon la fiche sans avis;
- utiliser le logo complet Sunelys;
- publier les visuels portail anonymises;
- ajouter des photos reelles des que disponibles;
- ajouter une description orientee installateurs;
- publier 1 post par semaine pendant 6 semaines;
- harmoniser services, site, horaires, zone desservie, categories.

Visuels recommandes pour la fiche:

- logo complet;
- couverture avec promesse claire;
- capture portail propre;
- visuel "DP / Consuel / Enedis / aides";
- photo de Myriam;
- photo bureau / pilotage;
- visuel avis ou preuve client si conforme.

## Plan d'action priorise

### P0 - A faire maintenant

1. Nettoyer les assets publics.
   - Supprimer `.DS_Store` de `public`.
   - Sortir les sources LinkedIn lourdes de `public`.
   - Optimiser les images PNG lourdes.

2. Corriger le sitemap `lastmod`.
   - Mettre a jour les pages modifiees le 2026-07-21.
   - Idealement automatiser la date depuis les contenus.

3. Clarifier le parcours de conversion.
   - Un CTA principal stable.
   - Moins de formulaires repetes.
   - Telephone optionnel sur trafic froid.

4. Finaliser la fiche Google Business.
   - Publier les visuels propres.
   - Demander suppression/doublon de la fiche sans avis.
   - Programmer les premiers posts.

### P1 - A faire sous 7 jours

1. Creer une page ou section "preuves".
   - 3 mini cas clients anonymises.
   - 1 timeline de dossier.
   - 1 exemple de reporting.
   - 1 capture portail.

2. Reprendre le hero des pages majeures.
   - Accueil.
   - Gestion administrative photovoltaïque.
   - Landing Ads.
   - Tarifs.

3. Enrichir les pages Consuel et Enedis.
   - Descriptions plus commerciales.
   - Blocs "blocages frequents".
   - CTA adaptes aux dossiers proches mise en service.

4. Ajouter les micro-evenements GA4.
   - `pricing_view`;
   - `form_start`;
   - `form_submit`;
   - `cta_primary_click`;
   - `scroll_50`;
   - `lead_magnet_download`;
   - `phone_click`.

### P2 - A faire sous 30 jours

1. Produire le cluster SEO DP pieces difficiles.
   - DP6;
   - DP7/DP8;
   - plan de masse;
   - insertion paysagere;
   - piece complementaire mairie.

2. Produire le cluster Consuel / Enedis.
   - Consuel refuse;
   - delai Consuel;
   - dossier incomplet;
   - raccordement bloque;
   - mise en service.

3. Creer un systeme editorial premium.
   - 2 articles SEO/mois;
   - 4 posts LinkedIn/mois;
   - 4 posts Google Business/mois;
   - 1 cas client ou preuve/mois.

4. Mettre en place un reporting mensuel.
   - SEO: clics, impressions, pages gagnantes.
   - SEA: cout, clics, termes, conversions.
   - Conversion: taux formulaire par page.
   - Qualite lead: froid, qualifie, hot, devis, deal.

## Prises d'initiative recommandees

### Initiative 1 - Transformer le portail en actif commercial

Ne pas le traiter comme une simple capture. En faire un argument:

"Vous ne confiez pas vos dossiers dans le flou: chaque blocage est suivi, priorise et visible."

Livrables:

- section site;
- visuel GBP;
- post LinkedIn;
- mini video ou GIF plus tard;
- capture dans les propositions commerciales.

### Initiative 2 - Creer une offre d'entree "reprise de dossier bloque"

Elle capte les petits installateurs sans casser le premium.

Angle:

"Une DP, un Consuel ou un raccordement bloque ? Sunelys reprend le dossier et vous dit quoi faire sous 24h."

But:

- convertir les leads froids;
- creer confiance;
- ouvrir ensuite vers flux mensuel.

### Initiative 3 - Assumer le prix comme filtre qualite

Les tarifs ne doivent pas etre caches:

- DP complete: 119 EUR HT;
- raccordement + Consuel: 89 EUR HT;
- MaPrimeRenov': 129 EUR HT;
- CEE: 99 EUR HT;
- pilotage complet: 199 EUR HT.

Le prix visible filtre les curieux, rassure les installateurs et ameliore les clics Ads.

### Initiative 4 - Mettre Myriam au centre

Le luxe, ici, ne vient pas d'un effet graphique. Il vient d'une experte identifiable qui porte la rigueur.

Quand les photos seront disponibles:

- hero ou section "pilotage par Myriam";
- fiche Google;
- page a propos;
- LinkedIn;
- proposition commerciale.

### Initiative 5 - Creer un standard de preuve

Chaque grande page doit contenir:

- 1 preuve chiffree;
- 1 preuve visuelle;
- 1 preuve humaine;
- 1 preuve process;
- 1 CTA.

Ce standard peut devenir la signature Sunelys.

## Roadmap 30 jours

### Semaine 1

- Nettoyage assets publics.
- Correction sitemap.
- Simplification CTA/formulaires sur les pages business.
- Optimisation landing Ads.
- GBP: visuels propres et demande doublon.

### Semaine 2

- Section/page preuves.
- Cas clients anonymises.
- Photos reelles si disponibles.
- Refonte hero accueil et gestion administrative.

### Semaine 3

- Cluster DP pieces difficiles.
- Meta descriptions CTR.
- Maillage interne par intention.
- Post Google Business et LinkedIn autour du portail.

### Semaine 4

- Cluster Consuel/Enedis.
- Controle Search Console et GA4.
- Ajustements Ads selon termes reels.
- Bilan conversion: leads, qualite, cout, pages.

## Conclusion

Sunelys n'a pas besoin d'un site plus "charge". Sunelys a besoin d'un site plus affirme.

La base est saine. Le prochain niveau consiste a rendre la competence tangible:

- un visage;
- une methode;
- des preuves;
- un portail;
- des cas;
- un parcours simple.

Si on applique les P0 et P1, le site peut devenir nettement plus premium sans perdre la conversion. Au contraire: moins de bruit, plus de confiance, plus de leads qualifies.

## Sources de reference

- Google Search Central - Search Essentials: https://developers.google.com/search/docs/essentials
- Google Search Central - SEO Starter Guide: https://developers.google.com/search/docs/fundamentals/seo-starter-guide
- Google Search Central - Snippets et meta descriptions: https://developers.google.com/search/docs/appearance/snippet
- Google Search Central - Donnees structurees: https://developers.google.com/search/docs/appearance/structured-data/intro-structured-data
- Google Search Central - Regles donnees structurees: https://developers.google.com/search/docs/appearance/structured-data/sd-policies
- web.dev - Core Web Vitals: https://web.dev/articles/vitals
- web.dev - INP: https://web.dev/articles/inp
- web.dev - Optimiser le LCP: https://web.dev/articles/optimize-lcp
