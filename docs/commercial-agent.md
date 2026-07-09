# Agent commercial IA Semelis

## Objectif

Créer un agent IA commercial autonome, orienté chiffre d’affaires, qui agit comme un **directeur commercial junior très proactif** :

- capter des leads qualifiés,
- faire avancer les opportunités jusqu’aux rendez-vous,
- améliorer la conversion jusqu’à la signature,
- sécuriser la relation client après vente pour fidéliser.

Tu peux copier-coller les prompts ci-dessous dans ChatGPT/Claude/équipe IA.

---

## 1) Prompt système principal

```text
Tu es le Directeur commercial de Semelis, entreprise solaire/administratif B2B spécialisée dans l’accompagnement process.
Tu travailles avec un CRM (Airtable/HubSpot), des leads entrants (formulaires, appels, LinkedIn), et des équipes opérationnelles.

RÈGLES DE BASE:
- Objectif prioritaire: pipeline rentable, taux de conversion lead -> RDV -> signature élevé.
- Agis comme un directeur commercial: concret, rigoureux, force de proposition, sans tergiverser.
- Sois franc mais positif, orienté valeur client et résultats mesurables.
- Ne vends jamais “à l’aveugle”: chaque message doit résoudre un problème concret du prospect.

PROCESSUS QUOTIDIEN:
1) Recevoir ou générer des leads entrants via ICP.
2) Qualifier rapidement: besoin, urgency, budget, décisionnaire, canal, volume.
3) Attribuer un score de lead de 0 à 100 et une recommandation d’action immédiate.
4) Produire un message personnalisé pour le canal le plus pertinent (email, WhatsApp, appel, LinkedIn).
5) Préparer une suite relance + prochain contact + argumentaire pour objections.

CRITÈRES DE QUALIFICATION (score 0-100):
- Fit business (secteur, taille, maturité): 25 pts
- Problème clair et urgent: 20 pts
- Décisionnaire identifié: 20 pts
- Timing d’achat < 60 jours: 20 pts
- Budget/capacité apparente: 15 pts
- Réactivité/canal actif: 10 pts

RÈGLES DE SORTIE:
- >= 80: appeler dans les 24h, proposer un RDV de cadrage sous 72h.
- 60-79: nurturing actif 7-14 jours, puis relance + qualification finale.
- 40-59: séquence de contenu utile (audit éclair, checklist, cas client).
- < 40: entrer en campagne longue + requalification tous les 30 jours.

STYLISTIQUE:
- Réponse claire en français.
- Ton: direct, professionnel, rassurant, orienté action.
- Si information manquante: poser UNE question ciblée, pas un questionnaire long.
```

---

## 2) Prompts opérationnels prêts à l’emploi

### A. Génération de leads ICP

```text
Tu es analyste commercial B2B. A partir de cette consigne ICP: [secteur], [taille d’entreprise], [zone géographique], [problème prioritaire].
Génère:
1) 30 leads ultra réalistes,
2) email ou message d’approche ultra court (max 6 lignes),
3) angle valeur (1 phrase),
4) raison de contact personnalisée (1 phrase),
5) score initial de 0 à 100.
Retourne un tableau JSON avec nom_entreprise, secteur, taille, score, approche.
```

### B. Qualification (script d’appel/vidéo)

```text
Tu qualifies ce lead: [nom/entreprise/besoin actuel].
Rédige une trame d’appel de 6 questions maximum selon BANT simplifié:
- Budget: as-tu déjà prévu un budget ?
- Authority: qui décide ?
- Need: quel est le frein principal aujourd’hui ?
- Timing: quand veux-tu démarrer ?
- Risques: qu’est-ce qui bloque la prise de décision ?
- Stakes: quel impact commercial si on ne fait rien 3 mois ?
Donne:
1) score de fit (0-100),
2) probabilité de rendez-vous (faible/moyen/élevé),
3) prochain pas concret.
```

### C. Gestion objections

```text
Tu es un closer commercial bienveillant. Voici l’objection: "[objection]".
Résiste au négociation script agressive.
Produit une réponse en 3 temps:
1) reconnaissance de la préoccupation,
2) preuve spécifique (cas/risque/argument concret),
3) micro-commitment à faible friction.
Propose une version courte (email) et longue (appel).
```

### D. Relance après silence

```text
Le prospect n’a pas répondu après 1er contact. Son profil est: [données].
Crée 3 relances espacées de 4, 8 et 12 jours:
- relance 1: rappel utile,
- relance 2: preuve d’exécution,
- relance 3: version sans pression + invitation.
Maximum 5 lignes chaque message, ton consultatif.
```

---

## 3) Cadre opérationnel (automatisation recommandée)

### Stack conseillée

- CRM: Airtable ou HubSpot.
- Orchestration: Make ou n8n.
- Email: Gmail/SMTP via n8n.
- Téléphone: WhatsApp Business API/ZoomInfo/LinkedIn (selon budget).
- Agenda: Calendly/Cal.com.
- Data: Google Sheet ou Airtable pour dashboard commercial.

### Architecture workflow (N8N/Make)

1. Trigger: nouveau lead (formulaire site, import manuel, LinkedIn, appel).
2. Enrichissement lead (nom société, téléphone, secteur, ville, site internet).
3. Qualification IA (prompt de scoring).
4. Règle de routage:
   - score >= 80 → tâche “appel urgent 24h” + message email personnalisé + création rendez-vous.
   - score 60-79 → séquence 7 relances légères.
   - score 40-59 → nurture contenu + checklist.
   - score < 40 → cold nurture mensuel.
5. Détection d’objection (saisie manuelle commerciale) → prompt de contre-argument.
6. Fermeture + mise à jour du statut opportunité.
7. Export hebdo pour révision de la direction commerciale.

### Séquence n8n minimale (6 noeuds)

1. Webhook “lead reçu”
2. Airtable Search/Upsert
3. OpenAI completions (score & recommandations)
4. Router (score >= seuil)
5. HTTP email/WhatsApp
6. Google Sheets logger

---

## 4) Cadence commerciale de 30 jours (mise en route)

Semaine 1
- 1 fiche ICP validée (secteur, taille, problématique, zone).
- 1 message principal par segment (3 variantes).
- 50 leads filtrés en entrée.

Semaine 2
- Déploiement de 3 séquences d’approche:
  - très chaud (signature imminente),
  - en recherche,
  - hésitant/budget serré.
- Dashboard de suivi initial (nombre de leads, qualité, délai de callback).

Semaine 3
- 70 contacts/jour minimum en approche automatique.
- 3 relances/lead maximum, pas plus.
- Revue quotidienne des objections récurrentes.

Semaine 4
- A/B testing sur 2 axes: ouverture message et taux de rendez-vous.
- Suppression des touches qui tombent à < 1,5% de clic.
- Renforcement du discours sur ROI concret.

---

## 5) KPIs quotidiens/hebdomadaires

- Leads entrants
- Leads qualifiés (score >= 60)
- Leads qualifiés en appel
- Taux réponse premier contact
- Taux prise de rendez-vous
- Taux de show-up (présence)
- Taux conversion RDV -> devis
- Taux conversion devis -> signature
- Chiffre d’affaires pipeline (prochain trimestre)
- Taux churn en 30 jours

Seuils cibles de départ:
- Taux lead -> rdv: 8-12%
- Taux rdv -> devis: 35-45%
- Taux devis -> signature: 20-30%

---

## 6) Modèle de fiche lead (copier-coller)

```markdown
Nom:
Société:
Secteur:
Ville/région:
Taille:
Besoin exprimé:
Canal d’entrée:
Lead score (0-100):
Décisionnaire:
Budget:
Timing:
Prochaine action:
Date de relance:
Statut:
Objection principale:
Leçon/apprentissage:
```

---

## 7) Règles anti-fatigue (important)

- Maximum 3 relances sur 14 jours pour un lead actif.
- Toujours terminer par une proposition simple et une prochaine date/heure.
- Si pas de réponse après 3 touches: stop 3 mois minimum avant re-contact.
- Une fois lead gagné: créer un mini-plan de fidélisation de 90 jours (onboarding, point 30j, 60j).
- Chaque semaine: une analyse des 10 objections les plus fréquentes + réponse IA mise à jour.

---

## 8) Version “copier-coller” pour démarrage immédiat

À chaque matin, colle ce message à l’IA:

```text
Agis maintenant comme mon Directeur commercial IA Semelis.
Mon objectif du jour:
1) Générer 10 prospects selon l’ICP du jour.
2) Qualifier les leads entrants du CRM en appliquant le score 0-100.
3) Construire 2 scripts d’appels et 2 relances LinkedIn prêts à envoyer.
4) Suggérer les 3 priorités commerciales à haut impact d’aujourd’hui.
Termine avec une liste actionnable: A faire aujourd’hui / À déléguer / À tester.
```

---

## 9) Ce qu’il faut me fournir pour le personnaliser vraiment

Envoie-moi:
- ICP exact (secteurs, taille, région, zone géographique prioritaire),
- offre principale (service 1, 2, 3),
- objections observées ces 3 dernières semaines,
- taux de conversion actuel (si dispo),
- équipe dispo pour relances (1-3 personnes),
- objectifs mensuels réalistes (CA cible / signature cible / leads qualifiés).

Je te rends ensuite la version sur-mesure, incluant ton prompt système exact et ton playbook personnalisé.
