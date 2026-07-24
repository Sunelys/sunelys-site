# Audit complet Sunelys site / SEO / SEA / conversion - 2026-07-24

## Synthese executive

Sunelys a une base marketing saine: positionnement B2B clair, tarifs visibles, tracking solide, pages SEO deja en place, landing Ads dediee, Google Ads Search actif et mots-cles negatifs enrichis.

Mais le systeme n'est pas encore au niveau "expert international" en acquisition, parce que la preuve business manque encore: sur les 14 derniers jours, il y a `0` lead Google Ads reel hors test. La campagne depense, les clics arrivent, mais la qualite d'intention et la conversion ne sont pas encore validees.

Diagnostic principal:

1. Le tracking fonctionne. Ce n'est pas le blocage.
2. La campagne Search est techniquement propre, mais encore trop jeune et trop mince.
3. Le trafic Ads contient encore une part d'intention particulier / pose / information.
4. La landing est convaincante sur desktop, mais pas assez visuelle et pas assez directe sur mobile.
5. Le site est riche, mais parfois trop charge pour une perception vraiment premium.

Verdict:

- Site web: bon niveau, a renforcer pour passer de "serieux" a "premium evident".
- SEO: base solide, encore peu de trafic non-marque.
- SEA: structure saine, mais pas encore au niveau expert tant que les leads reels ne sortent pas.
- Conversion: bonne fondation, mais optimisation mobile et preuve visuelle prioritaires.

## Sources controlees

- Build local: `npm run build:ci` passe.
- Audit marketing local: `reports/marketing-agent/2026-07-24T09-25-17-495Z/audit.md`.
- Leads Google Ads hors tests: `reports/google-ads-leads/2026-07-24T09-16-38-406Z/report.md`.
- Google Ads lu dans Chrome connecte au compte `781-087-0154 Sunelys`.
- Landing controlee en rendu local: `/lp/delegation-admin-pv`.
- Home controlee en rendu local: `/`.
- Page SEO controlee en rendu local: `/gestion-administrative-photovoltaique`.
- PageSpeed Insights tente mais bloque par quota Google `429`.

## Notes

| Axe | Note | Lecture |
| --- | ---: | --- |
| Positionnement | 8,5 / 10 | Le focus installateurs PV + administratif solaire est net, rare et monetisable. |
| Tracking / attribution | 8,5 / 10 | UTM, GCLID, GA4, Ads conversion, Airtable et notification lead sont en place. |
| Landing Ads desktop | 7,8 / 10 | Message et formulaire visibles, prix clairs. Manque de preuve visuelle immediate. |
| Landing Ads mobile | 6,7 / 10 | Lisible, mais le formulaire descend trop bas. Trop de hauteur avant action utile. |
| Google Ads Search | 6,8 / 10 | Campagne active et eligible, DP forte, mais 0 conversion et Consuel mediocre. |
| Qualite mots-cles | 6,5 / 10 | Intentions DP correctes, mais encore des recherches particulier/information a filtrer. |
| SEO technique | 8,0 / 10 | Base saine, canonicals et metas presentes. Alertes editoriales a nettoyer. |
| SEO contenu | 7,4 / 10 | Couverture DP/Consuel/Enedis/EDF OA solide, mais autorite non-marque encore faible. |
| UX premium | 7,0 / 10 | Style coherent, mais trop de blocs/cartes/CTA et pas assez de preuve humaine/visuelle. |
| Preuve commerciale | 6,6 / 10 | Portail visible, mais pas assez de cas, avis, process et resultats anonymises. |

Score global actuel: `7,4 / 10`.

Objectif 30 jours: `8,4 / 10`.

Objectif niveau premium fort: `9 / 10`, conditionne par des preuves reelles, photos de Myriam, cas clients anonymises et apprentissage Ads sur des leads reels.

## Google Ads

### Etat constate

Campagne active:

- `Search - Delegation admin PV installateurs`
- Statut: activee, eligible.
- Budget: `10,00 EUR / jour`.
- Score d'optimisation visible: `87,5 %`.
- Periode visible: `24 juin - 23 juillet 2026`.

Performance globale:

- `23` clics.
- `248` impressions.
- CTR global: `9,27 %`.
- CPC moyen: `2,67 EUR`.
- Cout: `61,44 EUR`.
- Conversions: `0`.

Par groupe:

- `Sous-traitance DP`: `16` clics, `114` impressions, CTR `14,04 %`.
- `Consuel Raccordement`: `7` clics, `119` impressions, CTR `5,88 %`.
- `Pilotage complet`: `0` clic, `15` impressions.

Annonces:

- DP: eligible, efficacite `Excellente`, `11` clics, `49` impressions.
- Consuel / raccordement: eligible, efficacite `Mediocre`, `7` clics, `119` impressions.
- Ancienne DP mediocre: en veille.
- Pilotage complet: eligible, efficacite `Moyenne`, aucun clic visible.

### Lecture

La campagne n'est pas cassee. Elle diffuse, depense et les annonces ne sont pas refusees.

Le probleme est commercial:

- aucun lead reel Google Ads sur 14 jours;
- pas assez de donnees de conversion pour laisser Google optimiser;
- Consuel depense avec CTR faible et annonce mediocre;
- Pilotage complet ne trouve pas son marche via les mots-cles actuels;
- DP attire les clics, mais pas encore les demandes.

### Termes de recherche observes

Termes plutot exploitables:

- `declaration prealable panneaux solaires toiture`
- `declaration panneaux photovoltaique`
- `demande prealable panneaux solaires`
- `dp pour panneaux solaires`
- `raccordement panneaux solaires`
- `consuel panneau solaire autoconsommation`

Termes trop particuliers / pose / information, deja exclus ou a surveiller:

- `autorisation pour poser des panneaux solaires`
- `demande pose panneau solaire`
- `declarer panneau solaire enedis`
- variantes autour des impots, pose, demande de travaux, tutoriel, branchement.

Action deja faite le 2026-07-24:

- import de `26` mots-cles negatifs au niveau campagne;
- fichier: `docs/google-ads-web-upload/28-particulier-intent-negative-keywords-2026-07-24.csv`;
- apercu: `26` acceptes, `0` erreur;
- application: terminee.

### Point a ne pas faire maintenant

Ne pas augmenter le budget immediatement.

Raison: on n'a pas encore prouve que les clics restants convertissent. Monter le budget avant d'avoir filtre les intentions et corrige Consuel revient a acheter plus de bruit.

### Actions SEA prioritaires

P0 - Attendre 24 a 48 h apres les exclusions du 2026-07-24.

- Objectif: voir si les prochains clics sont moins particuliers.
- Critere: au moins une recherche clairement B2B ou une demande entrante reelle.

P0 - Corriger l'annonce Consuel / Raccordement.

- L'annonce est eligible mais `Mediocre`.
- Il faut la reconstruire avec 15 titres et 4 descriptions plus proches des mots-cles.
- Angle recommande: `Dossier Consuel PV`, `Raccordement Enedis`, `Installateurs PV`, `89 EUR HT`, `Suivi pieces et relances`, `Dossier ponctuel accepte`.

P1 - Ajouter des marqueurs B2B plus durs dans les annonces.

Exemples:

- `Pour installateurs PV`
- `Service B2B solaire`
- `Sous-traitance dossiers PV`
- `Pas une offre pose particuliers`
- `Diagnostic dossiers sous 24h`

P1 - Revoir les mots-cles actifs.

Etat lu: la campagne active repose surtout sur quelques expressions:

- `"declaration prealable photovoltaique"`
- `[declaration prealable photovoltaique]`
- `"declaration prealable panneaux solaires"`
- `"consuel photovoltaique"`
- `"raccordement panneaux solaires"`
- `"raccordement enedis photovoltaique"`

Plusieurs mots-cles raccordement affichent une diffusion limitee par faible niveau de qualite. Il faut soit mieux faire correspondre annonce + landing, soit reduire l'ambition raccordement si le trafic reste particulier.

P1 - Nettoyer les imports en attente.

Google Ads affiche encore:

- un apercu `24-cpc-focus-keywords-2026-07-21.csv` avec `30 modifications valides`;
- plusieurs anciens imports avec erreurs;
- des actions anciennes a ne pas appliquer sans revalidation.

Decision: ne pas cliquer sur `Appliquer` tant que chaque fichier n'est pas recontrole. Ces lignes sont du bruit operationnel.

## Leads et tracking

### Etat leads 14 jours

Rapport `npm run marketing:ads:leads -- --days 14`:

- leads Airtable lus: `12`;
- leads dans la periode: `10`;
- tests exclus: `1`;
- leads paid reels detectes: `0`;
- qualifies: `0`;
- hot: `0`;
- score moyen: `0`.

Conclusion: il ne faut pas encore juger la rentabilite finale. Il faut juger la qualite de l'entonnoir et obtenir le premier lead payant reel.

### Etat leads 90 jours environ

Audit marketing:

- `12` leads au total;
- `7` qualifies;
- `3` hot;
- score moyen: `60/100`.

Pages les plus interessantes:

- `/contact`: `2` leads, `2` qualifies, `2` hot, score moyen `87`.
- `/gestion-administrative-photovoltaique`: `1` lead qualifie/hot, top channel Paid Search.
- `/lp/delegation-admin-pv`: `1` lead qualifie, service Consuel, mais pas sur les 14 derniers jours hors test.

Lecture:

- Le site sait convertir quand l'intention est bonne.
- Google Ads n'a pas encore amene assez d'intention B2B propre.
- Le formulaire n'est pas le blocage principal.

### Tracking

Points solides:

- UTM et GCLID captures dans les formulaires.
- Evenements `lead_form_submit`, `generate_lead`, `lead_converted`.
- Conversion Ads branchee sur `generate_lead`.
- Redirection vers `/merci`.
- Notification lead via backend.
- Rapport leads hors tests.

Points a surveiller:

- Des valeurs de landing directes bizarres existent dans les rapports (`/qmwjyogv`, etc.). Il faut continuer a normaliser les sources si elles polluent l'analyse.
- Aucun signal d'abandon formulaire n'est exploite dans le rapport quotidien. Utile a ajouter si les clics continuent sans lead.

## Landing Ads

Page: `/lp/delegation-admin-pv`.

### Ce qui fonctionne

- H1 clair: delegation DP, Consuel, Enedis, aides.
- Cible visible: installateurs PV.
- Prix visibles au-dessus de la ligne de flottaison desktop.
- Formulaire court: besoin, volume, email obligatoires.
- Telephone optionnel, donc friction raisonnable.
- Tracking hidden fields complet.
- Page en `noindex,follow`, logique pour une landing SEA.
- Portail et visuels disponibles plus bas.

### Ce qui freine

Desktop:

- Premier ecran tres textuel.
- Le visuel metier / portail apparait trop bas.
- L'oeil voit surtout une promesse et un formulaire, pas encore une preuve.

Mobile:

- Le header, le gros CTA, le menu, le H1, les badges et les prix repoussent le formulaire.
- Le visiteur doit scroller avant d'arriver au diagnostic.
- Pour Ads mobile, c'est trop long.

Message:

- `Installateurs PV uniquement` est visible, mais pas assez dur.
- On doit filtrer plus explicitement les particuliers.

Formulation recommandee au-dessus du formulaire:

`Service reserve aux installateurs photovoltaiques, bureaux d'etudes et equipes admin ENR. Sunelys ne vend pas de panneaux et ne traite pas les demandes de pose particuliers.`

### Optimisation recommandee

P0 - Ajouter une preuve visuelle au-dessus de la ligne de flottaison.

Options:

- mini capture portail dans le hero;
- extrait de checklist dossier;
- timeline DP / Consuel / Enedis;
- bloc "ce que vous recevez".

P0 - Compacter le mobile.

- reduire la taille du H1 sur mobile;
- mettre les badges sur deux colonnes plus compactes;
- garder un seul bouton principal avant le formulaire;
- rendre le formulaire visible plus tot.

P1 - Mettre le prix dans le formulaire.

Exemple:

`DP 119 EUR HT | Raccordement + Consuel 89 EUR HT | Aides des 99 EUR HT`

Cela renforce la coherence entre annonce, prix et action.

P1 - Ne pas rendre le telephone obligatoire maintenant.

Tant qu'il n'y a pas assez de leads, il vaut mieux garder une friction faible. Si les leads deviennent non qualifies, on ajoutera `Entreprise` ou `Site web de l'entreprise` comme champ obligatoire.

## Site web et UX premium

### Ce qui est deja fort

- Direction artistique coherente.
- Typography premium.
- Tarifs visibles.
- Promesse B2B nette.
- Portail mis en avant.
- Pages longues avec profondeur de contenu.
- Plusieurs points de conversion.

### Ce qui manque pour le "waouh"

1. Plus de preuve humaine.

- photo professionnelle de Myriam;
- photo bureau / poste de travail;
- portrait court "qui pilote vos dossiers";
- ton cabinet expert, moins outil marketing.

2. Plus de preuve objet.

- captures propres du portail;
- exemple de suivi anonymise;
- checklist DP;
- timeline dossier;
- exemple de relance / statut.

3. Moins de dispersion.

L'audit local compte beaucoup de formulaires et CTA traces. Ce n'est pas forcement mauvais pour la conversion, mais la perception premium demande plus de respiration et plus de hierarchie.

Regle recommandee:

- 1 CTA principal par section;
- 1 formulaire principal par page longue;
- les autres zones doivent pousser vers le formulaire, pas recreer un formulaire complet partout.

4. Plus de contraste entre pages.

Certaines pages ont des roles proches:

- `/gestion-administrative-photovoltaique`
- `/declaration-prealable-panneaux-solaires`
- `/sous-traitance-declaration-prealable-solaire`
- `/tarif-declaration-prealable-photovoltaique`
- `/lp/delegation-admin-pv`

Il faut conserver chacune, mais clarifier leur role:

- gestion administrative: page pilier.
- declaration prealable: page SEO informationnelle + conversion DP.
- sous-traitance DP: page B2B delegation.
- tarif DP: page prix / ROI.
- landing Ads: page courte, directe, non indexee.

## SEO

### Etat Search Console

Search Console fonctionne.

Constat:

- la requete marque `sunelys` porte encore l'essentiel des clics;
- quelques impressions apparaissent sur DP et Consuel;
- le non-marque est encore faible, mais la base est la.

Requetes observees:

- `consuel bleu`
- `consuel photovoltaique`
- `dossier consuel photovoltaique`
- `dp photovoltaique`
- `declaration prealable panneaux photovoltaiques`
- `demande installation panneau solaire mairie`

Lecture:

- Le site commence a apparaitre sur les bons sujets.
- Il faut maintenant construire l'autorite longue traine.

### Opportunites SEO prioritaires

P1 - Cluster pieces DP.

Creer ou renforcer des contenus autour de:

- `DP6 panneaux solaires`
- `document graphique declaration prealable panneaux solaires`
- `plan de masse panneaux solaires`
- `plan de coupe panneaux solaires`
- `insertion paysagere panneaux solaires`
- `notice descriptive DP panneaux solaires`

Ces sujets ne sont pas forcement assez volumineux pour Ads, mais ils sont bons pour SEO et rassurance.

P1 - Pages cas / methodes.

Creer des pages ou blocs:

- `Comment Sunelys controle une DP avant depot`
- `Exemple de suivi Consuel photovoltaque`
- `Pourquoi les dossiers raccordement Enedis bloquent`

P2 - Nettoyer les alertes editoriales.

L'audit local signale des articles "backlog non protege". En pratique, certains contenus semblent deja publics volontairement. Il faut soit:

- confirmer qu'ils doivent etre publics;
- soit ajouter `publicationStatus: backlog` aux contenus qui ne doivent pas sortir.

P2 - Corriger le faux signal de lien interne image.

`src/data/home.ts` utilise une image du portail comme lien de demo. L'audit le lit comme lien interne inconnu. Ce n'est pas critique, mais il serait plus propre d'avoir une vraie page ou modale "apercu portail" plutot qu'un lien direct vers un JPG.

## Google Business Profile

Non recontrole en profondeur dans cet audit, mais decision marketing:

- garder la fiche principale avec les avis;
- ne pas pousser la fiche secondaire sans avis;
- utiliser les visuels portail propres comme preuves temporaires;
- ajouter les photos de Myriam des qu'elles sont disponibles;
- publier une image de couverture orientee `cabinet expert + portail + administratif solaire`.

Important:

Google peut prendre du temps a valider les changements GBP. Il faut distinguer "modification envoyee" et "modification visible publiquement".

## Plan d'action recommande

### Maintenant

1. Laisser tourner 24 a 48 h apres les exclusions du 2026-07-24.
2. Ne pas augmenter le budget.
3. Corriger l'annonce Consuel / Raccordement.
4. Ajouter sur la landing un message B2B plus dur contre les particuliers.
5. Compacter le hero mobile pour faire remonter le formulaire.

### Cette semaine

1. Ajouter une preuve visuelle dans le hero de la landing Ads.
2. Creer une version plus forte de l'annonce Consuel.
3. Nettoyer les imports Google Ads en attente, sans appliquer les anciens fichiers.
4. Controler les termes de recherche tous les jours pendant la phase d'apprentissage.
5. Ajouter un mini bloc "ce que vous recevez" sur les pages service.

### Ensuite

1. Produire les contenus SEO autour des pieces DP.
2. Ajouter photos de Myriam et visuels reels.
3. Mieux exploiter avis Google et cas clients.
4. Simplifier les pages longues en gardant la conversion, mais avec moins de repetition.
5. Construire un tableau mensuel: depense, clics, termes exclus, leads reels, qualifies, hot, cout par lead qualifie.

## Decision finale

On ne doit pas considerer Google Ads comme "expert" aujourd'hui. On doit le considerer comme une structure saine en phase de calibration.

Le bon niveau d'exigence maintenant:

- pas de budget supplementaire tant que les clics ne sont pas propres;
- pas de nouvelle campagne large;
- correction de Consuel;
- landing mobile plus directe;
- preuve visuelle plus haute;
- suivi quotidien jusqu'au premier lead payant reel.

Quand on aura 3 a 5 leads reels avec source, terme de recherche, landing et qualification, on pourra prendre des decisions plus agressives: budget, enchere, nouveaux groupes, ou expansion SEO/SEA.
