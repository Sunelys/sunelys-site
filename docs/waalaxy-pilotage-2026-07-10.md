# Pilotage Waalaxy + Ocean - Sunelys

Date: 2026-07-10

Objectif: piloter la prospection dirigeants PV comme un systeme, pas comme une suite d'outils separes.

## 1) Etat Waalaxy verifie

Compte: Myriam Zaoui.

Credits visibles: 500.

Campagnes actives au premier audit: 3.

Campagnes actives apres nettoyage du 2026-07-10 a 16:54 CEST: 1.

### Point du 2026-07-14 a 15:59 CEST

Vue globale Waalaxy:

- Campagnes en cours: 1.
- Campagnes en pause: 2.
- Brouillons: 0.
- Campagnes archivees: 3.
- Credits visibles: 500.
- Inbox: 4 non lus visibles.

Campagne active:

- `Dirigeants PV - Test diagnostic admin - 2026-07-10`
- 14 prospects affiches dans la vue globale.
- Statut: en cours.
- Sequence: invitation + 2 messages.

Statistiques campagne test sur les 30 derniers jours:

- Invitations envoyees: 14.
- Invitations acceptees: 1.
- Taux d'acceptation: 7,1%.
- Messages envoyes: 1.
- Messages repondus: 0.
- Taux de reponse: 0%.

Etat prospects campagne test:

- 14 prospects actifs.
- 14 sont en attente d'une condition.
- Les premiers prospects visibles sont a l'etape `Invitation envoyee`.
- Tags visibles: `ICP_DIRIGEANT_PV` + tags additionnels compactes en `+2`.

Campagnes en pause:

- `Leads Dirigeants - DP offerte - Juin 2026`.
- `DAF PV — Invit + 2 Msg + 2 Emails — Juin 2026`.

Controle Inbox:

- Les conversations visibles sont encore principalement issues des anciennes sequences.
- Aucun signal de reponse chaude detecte pour le test dirigeants.
- La conversation Pierre Halbeisen reste classee `process_internal / cloture polie`.

Lecture:

- Le test propre tourne bien seul.
- Le volume envoye reste trop faible pour conclure definitivement.
- Le taux d'acceptation de 7,1% est faible a ce stade, mais repose sur seulement 14 invitations.
- Action recommandee: attendre un peu plus de volume avant de modifier la sequence, puis verifier si le probleme vient du ciblage, du profil LinkedIn ou de l'absence de note d'invitation.

### Audit du 2026-07-20

Les statistiques Waalaxy sur les 30 derniers jours donnent une lecture comparable des deux tests:

| Campagne | Invitations | Acceptees | Taux d'acceptation | Messages envoyes | Reponses |
| --- | ---: | ---: | ---: | ---: | ---: |
| `Dirigeants PV - Test diagnostic admin - 2026-07-10` | 14 | 2 | 14,3% | 3 | 0 |
| `Dirigeants PV - A-fit strict - Sans note - 2026-07-14` | 14 | 2 | 14,3% | 1 | 0 |

Constats:

- Les 14 prospects de chaque campagne sont actifs et attendent une condition de sequence; ce statut n'est pas une erreur Waalaxy.
- Le ciblage A-fit strict ne fait pas mieux que le lot initial sur l'acceptation, mais ne fait pas moins bien non plus.
- Le signal faible est apres acceptation: 4 acceptations cumulees, 4 messages envoyes et aucune reponse. Le premier lot donne deja une alerte sur l'angle de message, mais le volume reste trop faible pour trancher.
- Aucun changement n'est applique pendant cet audit. Les anciennes campagnes restent en pause.

Decision:

- Ne pas relancer un nouveau lot tant que les 4 acceptations n'ont pas recu la sequence complete.
- Preparer ensuite une variante de premier message plus courte et plus orientee dirigeant, a tester sur un nouveau lot separe plutot que de modifier les campagnes en cours.

### Test parallele A-fit strict lance le 2026-07-14

Nom: `Dirigeants PV - A-fit strict - Sans note - 2026-07-14`

URL Waalaxy: `https://app.waalaxy.com/campaigns/6a56486f19226da3fd17e3e7/prospects/details`

Statut: en cours. Waalaxy affiche 14 prospects qui vont bientot recevoir une action.

Objectif: isoler l'effet de la qualite de ciblage. La sequence reste volontairement identique au test initial; seule la cohorte change.

- Liste source: `Dirigeants PV - A-fit strict - 2026-07-14`.
- Sourcing Ocean puis verification manuelle: dirigeants, fondateurs ou gerants de societes francaises de 1 a 10 salaries avec activite photovoltaique d'installation clairement etablie.
- Cohorte brute: 15 profils; 14 ajoutes a la campagne. Le quinzieme etait deja connecte sur LinkedIn et n'a donc pas recu d'invitation.
- Tags: `A_FIT_STRICT`, `ICP_DIRIGEANT_PV`, `SOURCE_OCEAN`, `TEST_A_FIT_2026-07-14`.
- Invitation: sans note, contrainte par l'abonnement Waalaxy.
- Sequence: attente de 5 jours apres acceptation, message de diagnostic, attente de 5 jours, second message de qualification.
- Integration CRM: non activee, car aucun connecteur n'est configure.

Protocole de lecture:

- Comparer le taux d'acceptation de ce lot au test initial apres 7 jours, sans modifier les messages entre-temps.
- Lire les reponses et les demandes d'arret apres les premiers messages pour determiner si le gain vient du ciblage strict ou si l'angle doit evoluer.
- Les anciennes campagnes en pause restent inchangees.

### Campagne test propre

Nom: `Dirigeants PV - Test diagnostic admin - 2026-07-10`

URL Waalaxy: `https://app.waalaxy.com/campaigns/6a51013c814811ff33d2ac77/prospects/details`

Statut initial: en cours.

Sequence: invitation + 2 messages LinkedIn.

Prospects actifs: 15.

Etat observe:

- 6 vont bientot recevoir une action.
- 9 sont en attente d'une condition.
- Taux de reponse actuel: 0%, normal au lancement.

Import source:

- Liste: `Dirigeants PV - Test qualifie - 2026-07-10`.
- Import: 42 scannes, 15 ajoutes, 27 doublons, 0 faux positifs.
- Tags appliques: `TEST_DIR_PV_2026-07-10`, `SOURCE_OCEAN`, `ICP_DIRIGEANT_PV`.

Decision: ne pas modifier cette campagne pendant les premiers jours. Elle doit servir de test propre.

### Ancienne campagne dirigeants

Nom: `Leads Dirigeants - DP offerte - Juin 2026`

URL Waalaxy: `https://app.waalaxy.com/campaigns/6a43ad94e5e9cfb303b255e8/prospects/details`

Statut: en cours.

Sequence: invitation + 2 messages + 2 emails.

Prospects actifs: 89.

Etat observe:

- 89 sont en attente d'une condition.
- 3 ont termine la campagne.
- Taux de reponse affiche: 30%.
- Les premiers prospects visibles n'ont pas de tag.

Risque: cette campagne parle aux dirigeants, mais l'angle historique est plus agressif (`DP offerte`, promesse forte, email assez tot). Elle peut produire des reponses, mais moins propres pour apprendre ce qui marche vraiment.

Decision recommandee: ne plus ajouter de prospects dans cette campagne. Choisir ensuite entre la laisser finir ou la mettre en pause apres validation.

Action realisee le 2026-07-10 a 16:54 CEST: campagne mise en pause dans Waalaxy pour isoler le test propre.

Etat apres pause:

- Waalaxy affiche la campagne en `En pause`.
- 89 prospects affiches en pause.
- Vue globale campagnes apres action: 1 campagne en cours, 2 campagnes en pause.

### Ancienne campagne DAF / admin

Nom: `DAF PV — Invit + 2 Msg + 2 Emails — Juin 2026`

URL Waalaxy: `https://app.waalaxy.com/campaigns/6a38f2a4c9179611e831f6bd/prospects/details`

Statut: en cours.

Sequence: invitation + 2 messages + 2 emails.

Prospects actifs: 254.

Etat observe:

- 254 sont en attente d'une condition.
- 189 sont sortis manuellement.
- 8 ont termine la campagne.
- Taux de reponse affiche: 13,4%.
- Les premiers prospects visibles sont dans la liste `DAF/ADMIN` et sans tag.

Risque: cette campagne ne correspond plus a la strategie V1. Elle vise des profils admin/DAF alors que la cible prioritaire est maintenant dirigeant/fondateur/gerant de petites structures PV.

Decision recommandee: demander validation puis mettre en pause cette campagne. A minima, ne plus l'alimenter.

Action realisee le 2026-07-10 a 16:52 CEST: campagne mise en pause dans Waalaxy apres validation.

Etat apres pause:

- Waalaxy affiche la campagne en `En pause`.
- Vue globale campagnes: 2 campagnes en cours, 1 campagne en pause.
- Dans la campagne DAF/admin: 250 prospects affiches en pause, 4 encore en attente d'une condition selon la repartition interne Waalaxy.

## 2) Decision strategique

La direction est bonne: attaquer directement les dirigeants des petites societes PV.

Pourquoi:

- Les profils DAF/admin existent surtout dans des organisations plus grosses ou deja internalisees.
- Le dirigeant est celui qui ressent la friction quand les DP, Consuel, raccordements ou relances mairie ralentissent les chantiers.
- L'objectif n'est pas de vendre un rendez-vous tout de suite, mais d'obtenir une reponse de diagnostic.

Positionnement du test:

> "Est-ce que vos dossiers administratifs PV sont deja fluides, ou est-ce que ca retombe encore parfois sur vous ou l'equipe commerciale ?"

Ce positionnement est meilleur que:

- "Premiere DP offerte"
- "Zero piece complementaire"
- Calendly trop tot
- Sequence email trop agressive avant qualification

## 3) Amelioration Ocean V1.1 appliquee

Script mis a jour: `scripts/prospecting-ocean-score.mjs`

Nouvelle sortie creee:

`outputs/prospecting-score/ocean-dirigeants-pv-2026-07-10-scored-v1-1.csv`

Resultat V1.1 sur l'export Ocean du 2026-07-10:

- 66 prospects scores.
- 11 A-fit.
- 30 B-fit.
- 23 C-fit.
- 2 Exclude.
- 41 recommandes pour test Waalaxy.

Ameliorations ajoutees:

- Exclusion plus stricte des responsables d'affaires, charges d'affaires, chefs de projet, conducteurs de travaux, responsables operations, commerciaux et account managers quand ils ne sont pas de vrais dirigeants cibles.
- Exclusion plus nette des societes hors cible: grossistes, distributeurs, logiciels, SaaS, medias.
- Exclusion des conseils ou bureaux d'etudes sans signal d'installation.
- Regle nuancee: un dirigeant qui mentionne aussi un role operationnel n'est garde que si le contexte PV/installateur est visible.

Point important: la campagne deja lancee n'a pas ete modifiee. La V1.1 servira au prochain import Ocean.

## 4) Regles de pilotage cette semaine

### Pendant 5 a 7 jours

Ne pas changer:

- La sequence du test `Dirigeants PV`.
- Les messages deja lances.
- Les tags de tracking.

Suivre chaque jour:

- Invitations envoyees.
- Acceptations.
- Messages envoyes.
- Reponses.
- Reponses positives.
- Demandes d'arret ou signaux negatifs.

Mettre a jour le fichier:

`outputs/waalaxy-response-tracker-2026-07-10/suivi-reponses-waalaxy-dirigeants-pv-2026-07-10.xlsx`

### Seuils de decision

Apres 7 jours ou environ 50 invitations envoyees:

- Acceptation < 15%: revoir ciblage, profil LinkedIn ou invitation.
- Acceptation 15-25%: correct pour continuer en petit volume.
- Acceptation > 25%: bon signal, garder la cible.
- Reponses < 5% apres acceptations: angle message a revoir.
- Reponses positives >= 2 sur le premier lot: creer un lot Ocean V2 similaire.
- Beaucoup de "deja gere en interne": cible trop grosse.
- Beaucoup de "pas concerne": sourcing trop large ou mauvais secteur.
- Demandes d'arret: tag `Ne pas contacter` immediatement.

## 5) Reponses types

### Si interet clair

```text
Merci {{firstName}}.

Pour voir si Sunelys peut vraiment aider, j'aurais juste deux questions:
- vous avez environ combien de dossiers DP / Consuel / raccordement par mois ?
- le blocage principal est plutot le montage du dossier, les relances mairie/Enedis, ou le suivi global ?
```

Si la reponse confirme un besoin:

```text
Ok, c'est typiquement le genre de cas ou on peut vous faire gagner du temps.

Le plus simple serait de regarder 1 ou 2 dossiers types et voir si l'appui Sunelys a du sens. Vous preferez que je vous propose un court creneau ou que je vous envoie d'abord le fonctionnement ?
```

### Si deja internalise

```text
Parfait, c'est souvent le meilleur cas quand le volume le justifie.

Vous gardez quand meme un appui externe en backup sur les pics de charge, ou tout est absorbe en interne ?
```

### Si pas concerne / trop petit

```text
Compris, merci pour le retour.

Je ne vous embete pas davantage. Je garde simplement le contact si le volume de dossiers evolue plus tard.
```

### Si refus ou stop

```text
Bien note, je ne vous relance pas.

Bonne continuation.
```

Action interne: taguer `Ne pas contacter`.

## 6) Controle Inbox

Controle realise le 2026-07-10 a 16:55 CEST.

Constat:

- Badge Inbox visible: 4 non lus.
- Les conversations visibles sont majoritairement liees aux anciennes sequences, avec plusieurs derniers messages envoyes par Myriam.
- Conversation Pierre Halbeisen ouverte en lecture seule.

Classification Pierre Halbeisen:

- Reponse initiale: il indique avoir deja quelqu'un pour s'en occuper et revenir si besoin.
- Reponse envoyee ensuite par Myriam: cloture propre en position `plan B`.
- Dernier message prospect: `Merci`.
- Classification: `process_internal / cloture polie`.
- Action recommandee: ne pas relancer maintenant.

## 7) Decisions a valider

### Priorite 1

Mise en pause de la campagne `DAF PV — Invit + 2 Msg + 2 Emails — Juin 2026`: fait le 2026-07-10 a 16:52 CEST.

Raison: elle ne correspond plus a l'ICP dirigeant PV V1 et contient encore 254 prospects actifs.

### Priorite 2

Mise en pause de `Leads Dirigeants - DP offerte - Juin 2026`: fait le 2026-07-10 a 16:54 CEST.

Raison: isoler totalement le test propre et eviter que l'ancien angle `DP offerte` brouille les signaux.

### Priorite 3

Continuer le test `Dirigeants PV - Test diagnostic admin - 2026-07-10` sans changement jusqu'aux premiers signaux.

## 8) Mode agent IA cible

L'agent doit executer cette boucle:

1. Sourcing Ocean sur ICP dirigeants PV.
2. Scoring local V1.1.
3. Revue des A-fit et B-fit.
4. Import Waalaxy uniquement des `keep_for_test`.
5. Sequence courte, sans Calendly initial.
6. Lecture quotidienne des reponses.
7. Classification des reponses dans le tracker.
8. Recommandation hebdomadaire: garder, couper, ajuster, scaler.

Garde-fous:

- Pas de contact avec un prospect marque `Ne pas contacter`.
- Pas d'import massif sans revue.
- Pas de changement de campagne active sans validation.
- Pas d'envoi manuel de message sans validation.
- Pas d'upload Google Drive/Sheets de donnees personnelles sans accord explicite.

## 9) Prochaine action recommandee

Laisser tourner les deux tests propres, sans changer leurs sequences pendant la fenetre d'observation:

- `Dirigeants PV - Test diagnostic admin - 2026-07-10`.
- `Dirigeants PV - A-fit strict - Sans note - 2026-07-14`.

Ne pas relancer les anciennes campagnes pendant la periode de test.

Faire un premier point d'analyse apres les premieres acceptations ou dans 48 heures, selon ce qui arrive avant; comparer ensuite les deux cohortes au bout de 7 jours.

Priorite operationnelle: surveiller l'Inbox et classer les reponses, sans envoyer de reponse manuelle sans validation.
