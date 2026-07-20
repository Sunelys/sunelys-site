# Google Ads web upload - Sunelys

Ces fichiers sont prepares pour l'import Google Ads via l'interface web Bulk Upload.
Ils restent en pause par defaut.

Budget valide: 10 EUR / jour au total.

- Search - Pilotage admin PV: 4 EUR / jour
- Search - Sous-traitance DP: 3 EUR / jour
- Search - Consuel Raccordement: 3 EUR / jour

Ordre conseille:

1. Importer `01-campaigns.csv`, puis cliquer sur Preview.
2. Importer `02-ad-groups.csv`, puis cliquer sur Preview.
3. Importer `03-keywords.csv`, puis cliquer sur Preview.
4. Importer `04-responsive-search-ads.csv`, puis cliquer sur Preview.
5. Coller les negatifs de `05-negative-keywords-paste.txt`.
6. Ne passer en Enabled qu'apres verification conversion + facturation.

Volumes:

- Campagnes: 3
- Groupes d'annonces: 6
- Mots-cles: 26
- Annonces responsives Search: 6
- Mots-cles negatifs: 21

## Ajustements historiques avant reset - 2026-07-13/14

Les fichiers `09` a `13` documentent les tests et elargissements faits avant la remise a plat du 2026-07-17. Ils servent de trace d'audit, pas de base de reimport prioritaire maintenant.

Fichiers de trace:

- `09-broaden-search-keywords-2026-07-13.csv`
- `10-search-quality-negative-keywords-2026-07-14.csv`
- `11-high-intent-b2b-keywords-2026-07-14.csv`
- `12-consuel-raccordement-keyword-planner-2026-07-14.csv`
- `13-search-quality-negative-keywords-2026-07-14.csv`

Note: `13-search-quality-negative-keywords-2026-07-14.csv` a ete refuse en import web Google Ads au format campagne. Les exclusions correspondantes ont ete appliquees manuellement dans Google Ads; ne pas le reimporter tel quel.

## Reset base saine - 2026-07-17

Objectif: repartir sur une seule campagne Search B2B plus stricte, avec une landing SEA dediee:

`https://sunelys.fr/lp/delegation-admin-pv`

Fichiers prepares:

1. `14-pause-current-search-campaigns-2026-07-17.csv`
2. `15-base-saine-campaigns-2026-07-17.csv`
3. `16-base-saine-ad-groups-2026-07-17.csv`
4. `17-base-saine-keywords-2026-07-17.csv`
5. `18-base-saine-responsive-search-ads-2026-07-17.csv`
6. `19-base-saine-negative-keywords-2026-07-17.csv`

La nouvelle campagne est importee en pause par defaut:

- `Search - Delegation admin PV installateurs`
- Budget: `10 EUR / jour`
- Groupes: `Sous-traitance DP`, `Consuel Raccordement`, `Pilotage complet`
- Cible: requetes B2B avec `sous-traitance`, `prestataire`, `externaliser`, `installateur`

Ordre conseille pour appliquer le reset:

1. Importer la campagne, les groupes, les mots-cles, les annonces et les negatifs en pause.
2. Verifier la landing, les UTM et la conversion Google Ads.
3. Importer le fichier de pause des anciennes campagnes Search.
4. Activer la nouvelle campagne seulement apres verification.

## Ajustement volume controle - 2026-07-20

Objectif: faire prendre du volume a la campagne saine sans rouvrir les requetes bricolage, schema, formulaire, particulier ou gratuit.

Fichiers prepares:

1. `20-volume-controle-keywords-2026-07-20.csv`
2. `21-volume-controle-negative-keywords-2026-07-20.csv`

Regle d'application:

- garder le budget global a 10 EUR / jour;
- ajouter uniquement ces mots-cles B2B controles;
- monter le CPC a 2,20 EUR sur les requetes clairement B2B: installateur, prestataire, sous-traitance, externalisation;
- garder 1,80 EUR sur les requetes plus larges dossier Consuel / raccordement;
- importer les negatifs au niveau groupe d'annonces, format Google Ads accepte;
- verifier les termes de recherche apres les premiers clics.

Application Google Ads:

- `20-volume-controle-keywords-2026-07-20.csv`: applique le 2026-07-20 a 10:57, 14 lignes.
- `21-volume-controle-negative-keywords-2026-07-20.csv`: applique le 2026-07-20 a 11:03, 66 lignes.
