# Agent IA prospection dirigeants PV - Sunelys V1

Date: 2026-07-10

Objectif: transformer Ocean.io + Waalaxy en systeme pilote, avec une cible plus nette: dirigeants de petites et moyennes societes photovoltaïques en France.

## 1) Decision strategique

La V1 ne cible plus les DAF, responsables administratifs, responsables financiers ou profils admin.

Raison:

- Quand une societe a deja une fonction administrative structuree, elle est souvent plus grosse, plus internalisee, plus lente a convertir.
- L'offre Sunelys est plus forte quand le dirigeant ressent directement la friction: dossiers DP qui trainent, retards de chantier, relances mairie, temps commercial perdu, charge mentale.
- Le bon premier interlocuteur est donc le dirigeant/fondateur/gerant, surtout dans les structures ou l'administratif n'est pas encore industrialise.

## 2) ICP V1

### A-fit

- France.
- Installateur photovoltaïque, solaire, autoconsommation, panneaux solaires.
- 1 a 30 salaries.
- Dirigeant, gerant, fondateur, president, directeur general, CEO.
- Societe operationnelle, pas seulement bureau d'etudes, grossiste, media, logiciel ou cabinet conseil.
- Signal de volume possible: plusieurs poseurs, avis clients, recrutement, zone regionale, plusieurs offres PV.

### B-fit

- France.
- Societe PV ou renovation energetique avec offre solaire claire.
- 31 a 50 salaries.
- Dirigeant ou direction generale.
- Potentiel volume interessant, mais risque d'organisation interne plus mature.

### C-fit

- Cible proche mais incertaine.
- Fonction dirigeante pas parfaitement claire.
- Activite solaire probable mais pas assez explicite.
- Taille inconnue ou donnees incompletes.

### Exclude

- Hors France.
- Grand compte ou filiale type EDF, GRDF, Enedis, Engie, TotalEnergies, Vinci, Cegelec, Spie, Eiffage, Bouygues, Veolia, Suez.
- Poste admin/DAF/finance/RH/marketing/communication/commercial/charge d'affaires/technicien pour la V1.
- Bureau d'etudes pur, grossiste, distributeur, SaaS, conseil energetique sans installation PV.
- Deja dans `Ne pas contacter`, opposition, unsubscribe, doublon, client existant non prevu.

## 3) Recettes Ocean.io

### Recherche propre recommandee

Nom: `Dirigeants PV France - test qualifie`

Company lookalikes:

- `groupe-solarenov.com`
- `goensol.com`
- `sunwattfrance.fr`
- `ajsolar.fr`
- `omega-solaire.fr`

Filtres:

- Headquarter location: France.
- Size: 1-10 et 11-50.
- Job title: dirigeant, gerant, gerante, fondateur, fondatrice, president, presidente, directeur general, directrice generale, CEO.
- People per company: 1 ou 2 maximum.
- Score Ocean: priorite A, puis B si volume insuffisant.

Filtres a eviter en V1:

- DAF.
- Responsable administratif.
- Responsable administratif et financier.
- Responsable operations, sauf si le titre indique clairement direction/fondateur.
- Chargé d'affaires, commercial, technicien, marketing.

Regle de volume:

- Ne pas exporter plus de 100 prospects avant revue.
- Pour le premier test Waalaxy: 50 a 80 prospects maximum.
- Si moins de 40 A/B-fit, on enrichit le sourcing avant de lancer.

## 4) Score Sunelys

Le script local ajoute ces colonnes:

- `sunelys_score`
- `sunelys_tier`
- `sunelys_decision`
- `sunelys_angle`
- `sunelys_reason`
- `sunelys_campaign`

Commande:

```bash
npm run prospecting:score-ocean -- --input path/to/ocean-export.csv
```

Score:

- Role dirigeant: 25 points.
- Fit societe PV/installateur: 30 points.
- Taille entreprise: 15 points.
- France: 10 points.
- Qualite de donnee: 10 points.
- Signaux utiles: 10 points.

Decision:

- `A`: envoyer en priorite.
- `B`: envoyer si la liste A est trop petite.
- `C`: revue manuelle.
- `Exclude`: ne pas contacter.

Regle Waalaxy:

- Importer uniquement `sunelys_decision = keep_for_test`.
- Exclure toute ligne `do_not_contact`.
- Ne jamais reutiliser une liste contenant `Ne pas contacter`.

## 5) Sequence Waalaxy V1

Objectif: obtenir une reponse, pas pousser un Calendly trop tot.

Invitation:

- Test principal: pas de note.
- Variante a tester plus tard: note courte, seulement si l'acceptation reste faible.

Message LinkedIn 1 - J+1 apres acceptation:

```text
Merci pour la connexion {{firstName}}.

Question simple: chez {{companyName}}, les DP et suivis mairie sont geres en interne, ou ca retombe encore parfois sur vous / l'equipe commerciale ?
```

Message LinkedIn 2 - J+4:

```text
Je vous demande parce qu'on voit souvent le meme sujet chez les petits installateurs PV: la vente est signee, mais le chantier attend une DP, une piece mairie ou un suivi qui traine.

Sunelys aide justement a absorber cette partie dossier par dossier. Vous avez deja un process fluide la-dessus ?
```

Email 1 - J+7 si email disponible:

Objet: `Vos DP ralentissent parfois les chantiers ?`

```text
Bonjour {{firstName}},

Je me permets un message court: Sunelys aide les installateurs photovoltaïques a externaliser le suivi administratif des dossiers, notamment declarations prealables, Consuel et raccordement.

L'interet n'est pas de remplacer votre organisation si elle tourne deja bien, mais d'eviter que les dossiers bloquent les chantiers ou reviennent sur le dirigeant.

Vous gerez cette partie comment aujourd'hui chez {{companyName}} ?

Myriam Zaoui
Sunelys
```

Email 2 - J+12:

Objet: `Je vous laisse tranquille ?`

```text
Bonjour {{firstName}},

Je ne veux pas vous relancer inutilement.

Si vos DP / Consuel / raccordements sont deja fluides en interne, aucun sujet.

Si en revanche certains dossiers prennent trop de temps ou bloquent les chantiers, je peux vous proposer un test simple: regarder 1 ou 2 dossiers types et voir si Sunelys peut vous faire gagner du temps.

Bonne journee,
Myriam
```

Regles copywriting:

- Pas de Calendly dans le premier message LinkedIn.
- Pas de promesse agressive du type `zero piece complementaire garantie`.
- Le chiffre `96%` peut etre utilise en preuve seulement apres interet, pas en accroche froide.
- Une seule question par message.
- Ton: dirigeant a dirigeant, concret, pas promotionnel.

## 6) Analyse des reponses

Chaque reponse est classee:

- `positive_interest`: demande d'infos, douleur confirmee, ouverture discussion.
- `process_internal`: deja gere en interne.
- `too_small`: pas assez de volume.
- `too_large_internalized`: equipe interne deja structuree.
- `not_now`: timing mauvais.
- `negative_stop`: refus ou demande d'arret.
- `unclear`: reponse ambigue.

Actions:

- `positive_interest`: repondre sous 24h avec 2 questions + proposition cadrage 15 min.
- `process_internal`: demander si la charge varie selon les periodes, puis sortir proprement si non.
- `too_small`: proposer de garder contact, pas de forcing.
- `too_large_internalized`: basculer en contenu/nurturing, pas de sequence agressive.
- `not_now`: relance utile a 30 ou 60 jours.
- `negative_stop`: tag `Ne pas contacter` immediatement.
- `unclear`: reponse courte de clarification.

## 7) KPI hebdomadaires

Ocean:

- Nombre de prospects exportes.
- % A-fit / B-fit / C-fit / Exclude.
- Top 5 raisons d'exclusion.
- Nombre moyen de personnes par societe.

Waalaxy:

- Invitations envoyees.
- Taux d'acceptation.
- Messages envoyes.
- Reponses totales.
- Reponses positives.
- Rendez-vous pris.
- Demandes d'arret.

Seuils de decision sur 50 a 80 prospects:

- Acceptation < 15%: probleme profil LinkedIn, cible ou invitation.
- Reponses < 5%: angle/message a revoir.
- Reponses positives = 0: verifier ICP et promesse.
- Beaucoup de `deja interne`: cible trop grosse.
- Beaucoup de `pas concerne`: sourcing trop large.

## 8) Boucle d'amelioration

Rythme recommande:

1. Lundi: scoring Ocean + selection de 50 a 80 prospects.
2. Mardi: import Waalaxy en campagne test.
3. Mercredi-vendredi: suivi reponses, tagging, pas de changement brutal.
4. Vendredi: synthese KPI + decision stop/continue/iterate.

Chaque semaine, l'agent doit produire:

- Ce qu'on garde.
- Ce qu'on coupe.
- Les 3 raisons principales de non-fit.
- Les 3 phrases qui declenchent le plus de reponses.
- La prochaine hypothese a tester.

## 9) Garde-fous agent

L'agent peut:

- Auditer Ocean et Waalaxy.
- Scorer des CSV.
- Proposer une liste qualifiee.
- Rediger les sequences.
- Classer les reponses.
- Proposer des actions.

L'agent ne peut pas sans validation explicite:

- Telecharger un CSV contenant des donnees personnelles.
- Importer une liste dans Waalaxy.
- Lancer, modifier, archiver ou pauser une campagne.
- Envoyer un message.
- Contacter un prospect tague `Ne pas contacter`.

## 10) Prompt systeme de l'agent

```text
Tu es l'agent IA de prospection Sunelys.

Objectif:
Obtenir des rendez-vous qualifies avec des dirigeants de societes photovoltaïques en France, sans maximiser le volume d'envoi.

Positionnement:
Sunelys aide les installateurs PV a absorber et piloter leurs dossiers administratifs: declaration prealable, Consuel, raccordement Enedis, aides renovation et suivi administratif.

Regles:
- Tu qualifies avant d'ecrire.
- Tu cibles en V1 les dirigeants/fondateurs/gerants, pas les DAF ni responsables administratifs.
- Tu exclus les grands comptes et les societes probablement internalisees.
- Tu refuses les bases Ocean trop larges.
- Tu privilegies les structures 1-30 salaries, puis 31-50.
- Tu ecris court, humain, concret.
- Tu ne mets pas Calendly trop tot.
- Tu ne promets pas zero erreur.
- Tu respectes les exclusions et oppositions.
- Tu mesures les reponses positives, pas seulement les reponses totales.

Sortie standard:
1. Diagnostic du sourcing.
2. Liste des prospects a garder/rejeter.
3. Angle recommande.
4. Sequence Waalaxy proposee.
5. Risques.
6. Prochaine action concrete.
```
