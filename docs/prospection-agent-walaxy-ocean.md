# Agent IA prospection Walaxy / Ocean - Sunelys

Date de cadrage: 2026-07-10

## 1) Point de situation

Objectif business:

- Remettre les campagnes LinkedIn / email au niveau d'un vrai dispositif commercial.
- Obtenir des rendez-vous qualifies avec des installateurs photovoltaïques et structures solaires en France.
- Arreter de payer des outils sans boucle de pilotage claire.

Elements retrouves:

- Drive contient un dossier `SUNELYS x Upsales Agency`.
- Deux bases de prospects principales:
  - `File_SUNELYS_06-2025`: 2568 lignes.
  - `File_SUNELYS_08-08-2025`: 2873 lignes.
- Deux documents de copy:
  - `Copy - SUNELYS - 06-2025`.
  - `Copy - SUNELYS - 08-08-2025`.
- Aucun export de performance Walaxy / Ocean retrouve pour l'instant.

Lecture rapide des bases:

- Juin 2025:
  - 3 lignes seulement contiennent `photovoltaïque`.
  - 29 lignes contiennent `solar`.
  - 2 lignes contiennent `installateur`.
- Aout 2025:
  - 0 ligne contient `photovoltaïque`.
  - 57 lignes contiennent `solar`, majoritairement international.
  - Les premieres lignes montrent beaucoup de pays hors France.

Conclusion: les campagnes semblent probablement construites sur des bases trop larges. Le probleme principal n'est pas uniquement le copywriting. C'est le fit ICP.

## 2) Diagnostic marketing

Ce qui bloque probablement:

1. Ciblage trop large
   - Trop de `environmental services`, climate tech, recyclage, fondations, mobilite, energie generale.
   - Trop de prospects hors France.
   - Pas assez d'installateurs PV ou de societes qui gerent un flux de DP / Consuel / raccordements.

2. Message trop generique
   - Angles actuels: gain de temps, dossiers acceptes, zero piece manquante.
   - Manque: impact business concret pour l'installateur.
   - Les meilleurs angles Sunelys sont: encaissement retarde, chantier bloque, client final qui s'impatiente, commercial qui vend moins car il gere l'administratif, marge qui se degrade.

3. Promesse a securiser
   - Eviter les promesses absolues du type `garantie erreur zero` si elle n'est pas juridiquement ou operationnellement encadree.
   - Preferer: `96% de DP sans piece complementaire` si le chiffre est documente, `objectif: limiter les retours mairie`, `production sous 48h quand le dossier est complet`.

4. Pas de boucle de pilotage visible
   - Sans export Walaxy / Ocean, impossible de dire quelle campagne marche ou non.
   - Il faut suivre: qualite de base, taux d'invitation acceptee, taux de reponse, reponses positives, rendez-vous, clients signes.

## 3) Nouveau role de l'agent IA

L'agent ne doit pas etre seulement un redacteur. Il doit etre un directeur de prospection autonome sous garde-fous.

Nom interne: `Directeur Prospection IA Sunelys`

Missions:

- Auditer les bases de prospects avant envoi.
- Classer chaque prospect en `A-fit`, `B-fit`, `C-fit`, `Exclude`.
- Proposer l'angle de message selon le profil.
- Generer les variantes email / LinkedIn.
- Lire les resultats de campagne.
- Recommander stop / continue / test.
- Preparer les reponses aux prospects.
- Produire chaque semaine un plan d'action priorise.

Interdictions:

- Ne jamais lancer une campagne sur une base non qualifiee.
- Ne jamais contacter les prospects hors ICP sauf justification explicite.
- Ne jamais utiliser de promesse absolue non prouvee.
- Ne jamais relancer une personne qui s'est opposee ou desabonnee.
- Ne jamais multiplier les touches LinkedIn + email sans deduplication.

## 4) ICP a cibler en priorite

### ICP A - Installateurs PV avec volume recurrent

Critere:

- France.
- Installateur photovoltaïque, solaire, autoconsommation, panneaux solaires.
- Dirigeant, fondateur, responsable administratif, responsable operations.
- Signal de volume: equipe commerciale, plusieurs agences, couverture regionale, offres B2C recurrentes, avis clients nombreux.

Angle:

- `Vos commerciaux vendent, Sunelys absorbe l'administratif qui ralentit les chantiers.`

Offre:

- Diagnostic gratuit de 15 min.
- Reprise DP / Consuel / raccordement.
- Tarif unitaire clair.

### ICP B - Petites structures solaires qui saturent

Critere:

- 1 a 30 salaries.
- Dirigeant encore tres implique dans l'operationnel.
- Activite PV claire mais equipe administrative reduite.

Angle:

- `Quand l'administratif retombe sur le dirigeant, la croissance plafonne.`

Offre:

- Demarrer par un lot pilote de 3 a 5 dossiers.

### ICP C - Acteurs PV multi-sites ou en croissance

Critere:

- +30 dossiers/mois potentiels.
- Agences, franchises, reseau commercial, expansion regionale.

Angle:

- `Standardiser le suivi DP / Consuel / raccordement sans recruter trop vite.`

Offre:

- Pilotage complet et reporting.

## 5) Colonnes a ajouter dans les exports Ocean / Walaxy

Pour chaque prospect:

- `icp_tier`: A / B / C / Exclude.
- `icp_reason`: raison courte.
- `country_ok`: oui / non.
- `company_activity`: installateur PV / bureau d'etudes / grossiste / SaaS / hors cible.
- `estimated_volume`: inconnu / 1-10 / 10-30 / +30.
- `pain_angle`: DP / Consuel / raccordement / pilotage global / recrutement evite / encaissement.
- `message_variant`: A / B / C.
- `exclude_reason`: hors France / hors PV / trop grand compte / pas decisionnaire / email douteux.
- `campaign_name`.
- `sequence_step`.
- `last_touch_date`.
- `reply_status`: aucune / negatif / interesse / rdv / client.

## 6) Donnees a exporter pour l'audit reel

Depuis Walaxy:

- Nom de campagne.
- Sequence utilisee.
- Date de lancement.
- Nombre de prospects ajoutes.
- Nombre d'invitations envoyees.
- Taux d'acceptation.
- Messages envoyes.
- Reponses totales.
- Reponses positives.
- Desabonnements / demandes d'arret.
- Prospects en erreur.
- CSV prospects avec statut actuel.

Depuis Ocean:

- Requete ou lookalike source.
- Filtres utilises.
- CSV d'export avec pays, industrie, taille, site, URL LinkedIn.
- Source de l'email et niveau de verification si disponible.

Depuis les emails / CRM:

- Nombre de rendez-vous obtenus.
- Nombre de rendez-vous qualifies.
- Nombre de clients signes.
- CA potentiel par campagne.

## 7) Prompt systeme de l'agent

```text
Tu es le Directeur Prospection IA de Sunelys.

Sunelys aide les installateurs photovoltaïques en France a externaliser et piloter leurs demarches administratives: declaration prealable, Consuel, raccordement Enedis, aides renovation et pilotage complet.

Ton objectif est d'obtenir des rendez-vous qualifies, pas de maximiser le volume d'envois.

Tu travailles comme un expert marketing B2B, copywriter senior, SDR manager et analyste de campagne.

Regles absolues:
- Tu qualifies le ciblage avant d'ecrire.
- Tu refuses les bases trop larges.
- Tu segmentes les prospects par ICP.
- Tu privilegies les douleurs business concretes: chantier bloque, retard d'encaissement, temps commercial perdu, client final qui s'impatiente, surcharge dirigeant.
- Tu ecris court, humain, specifique.
- Tu ne promets jamais "zero erreur" sans preuve.
- Tu respectes les oppositions, desabonnements et exclusions.
- Tu demandes toujours les metriques avant de conclure qu'une campagne fonctionne.

Sortie standard:
1. Diagnostic de la base.
2. Segments prioritaires.
3. Campagnes a lancer / mettre en pause.
4. Messages proposes.
5. KPI a suivre.
6. Action du jour.
```

## 8) Sequences corrigees

### Variante email 1 - Retard administratif

Objet: `Vos dossiers PV ne devraient pas bloquer vos chantiers`

Bonjour {{firstName}},

Quand une DP, un Consuel ou un raccordement traine, ce n'est pas seulement un dossier en attente: c'est souvent un chantier qui decale, un client qui s'impatiente et du temps commercial qui disparait.

Sunelys reprend le pilotage administratif des dossiers photovoltaïques pour aider les installateurs a garder un flux plus clair: DP, Consuel, raccordement, relances et suivi.

On peut regarder en 15 min si un premier perimetre serait utile chez {{company_name}}.

Bonne journee,
Myriam

### Variante email 2 - Dirigeant surcharge

Objet: `Trop de temps perdu sur les DP ?`

Bonjour {{firstName}},

Je vois souvent le meme sujet chez les installateurs PV en croissance: les ventes avancent, mais les DP, Consuel et raccordements finissent par retomber sur le dirigeant ou une petite equipe admin.

Sunelys peut prendre le relais dossier par dossier, avec une production sous 48h quand le dossier est complet et un suivi clair jusqu'a validation.

Vous voulez que je vous dise si cela aurait du sens pour {{company_name}} ?

Myriam

### Relance email

Bonjour {{firstName}},

Je me permets une relance courte.

Si vos dossiers PV sont deja fluides, aucun sujet. Si certaines DP, Consuel ou raccordements prennent trop de place, Sunelys peut reprendre un premier lot test sans changer votre organisation.

Je peux vous proposer un cadrage de 15 min cette semaine.

Myriam

### Invitation LinkedIn

Bonjour {{firstName}}, je travaille avec des installateurs PV sur la partie DP / Consuel / raccordement. Je serais ravie de vous ajouter a mon reseau.

### Message LinkedIn apres acceptation

Merci pour l'ajout {{firstName}}.

Je me permets un message court: Sunelys aide les installateurs PV a reprendre la main sur les dossiers admin qui ralentissent les chantiers: DP, Consuel, raccordement, suivi.

Vous gerez plutot ces sujets en interne aujourd'hui ou vous en externalisez deja une partie ?

## 9) Regles de lancement

Avant campagne:

- Garder uniquement les prospects France + PV clair.
- Retirer les fondations, SaaS, consultants climat, recyclage, mobilite, grands groupes hors PV installateur.
- Garder 100 a 300 prospects ultra qualifies pour un premier test.
- Lancer 2 variantes maximum.
- Separater LinkedIn et email si le prospect n'a pas accepte l'invitation.

Pendant campagne:

- Lire les reponses tous les jours.
- Taguer chaque reponse: interesse / pas maintenant / hors cible / negatif / a rappeler.
- Stopper automatiquement toute sequence apres reponse.
- Ne pas relancer plus de 2 fois sans signal.

Apres campagne:

- Garder seulement les angles qui generent des reponses positives.
- Requalifier les prospects silencieux avant nouveau contact.
- Documenter les objections exactes.

## 10) KPI de pilotage

KPI de qualite de base:

- `% A-fit`
- `% France`
- `% installateurs PV`
- `% emails valides`
- `% doublons`
- `% exclusions`

KPI LinkedIn:

- taux d'acceptation invitation
- taux de reponse apres acceptation
- taux de reponse positive
- taux de rendez-vous

KPI email:

- taux de delivrabilite
- taux d'ouverture si disponible
- taux de reponse
- taux de reponse positive
- taux de desabonnement
- taux de bounce

KPI business:

- rendez-vous qualifies
- opportunites creees
- CA potentiel
- clients signes
- CA signe par campagne

## 11) Plan 7 jours

Jour 1:

- Exporter Walaxy et Ocean.
- Nettoyer les bases et taguer ICP.

Jour 2:

- Creer 3 micro-campagnes: ICP A, ICP B, ICP C.
- Reecrire les sequences avec les angles business.

Jour 3:

- Lancer petit volume sur prospects A-fit uniquement.

Jours 4-5:

- Lire les reponses.
- Ajuster les objections et les variantes.

Jour 7:

- Bilan: garder, corriger, couper.
- Construire la prochaine base avec Ocean lookalike uniquement a partir des meilleurs clients Sunelys.

