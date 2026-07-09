# Playbook n8n prêt-à-brancher (Sunelys — lead commercial)

Objectif: automatiser l’agent commercial Sunelys sans casser le site.

- Entrée de lead: `POST /api/leads` actuel **ou** webhook n8n.
- Qualification basée sur la donnée existante : `volume`, `need`, `blocked_stage`, `phone`, `email`, etc.
- Routage commercial automatique (HOT / WARM / COOL / COLD).
- Sorties: priorité, messages de relance, tâches CRM, notifications équipe.

---

## 1) Option recommandée (simple à brancher)

### Entrée recommandée
- Utiliser `/api/leads` (site actuel) → webhook n8n via appel interne.
- Puis workflow n8n fait :
  1. normalisation lead,
  2. scoring,
  3. branchement commercial,
  4. écritures Airtable (score + statut + prochaine action),
  5. alertes automatisées (Slack/Email) + relances planifiées.

### Pourquoi ça marche bien
- Tu n’as pas à changer la logique UX du site.
- Les champs entrants sont déjà propres pour Sunelys.
- Tu récupères un lead pipeline exploitable le jour même (et pas seulement un lead brut).

---

## 2) Pré-requis

- Table/colonne Airtable existante pour leads (ou HubSpot équivalent).
- Variables d’environnement n8n :
  - `SUNELYS_AIRTABLE_TOKEN`
  - `SUNELYS_AIRTABLE_BASE_ID`
  - `SUNELYS_AIRTABLE_TABLE` (ex: `Leads`)
  - `SUNELYS_OPENAI_API_KEY` (optionnel, si tu veux génération IA de scripts)
  - `SUNELYS_SLACK_WEBHOOK` (optionnel)
  - `SUNELYS_TEAM_EMAIL` (optionnel si SMTP)

---

## 3) Schéma de workflow n8n

Nœuds clés:
1. `Webhook` (ou `Airtable Trigger`)
2. `Function` → normalisation + scoring
3. `Airtable: Create/Update` → persist `Lead score`, `Segment`, `Status`, `Next action`
4. `If` HOT (score >= 80)
5. `If` WARM (score >= 60)
6. `If` COOL (score >= 40)
7. `Slack` + `Email` / `OpenAI` selon segment
8. `Wait` (relance planifiée) + ré-import si nécessaire

---

## 4) Logique de score (alignée Sunelys)

```js
score = industry_fit(25)
      + volume({1-10:5,10-30:20,+30:25})
      + blocked_stage({Avant dépôt:10,Complément mairie:15,Consuel:15,Raccordement en attente:18,Mise en service bloquée:20,Pilotage global:22,Je ne sais pas encore:5})
      + need({Déclaration prealable:20,Consuel:18,Raccordement Enedis:18,Pilotage complet:25})
      + contact_quality({email_only:5,email+phone:10,direct_phone_or_booking:15})
      + urgency({immediate:20,1-4 semaines:12,non_urgent:6})
      + region_signal(5)
```

Segmentation:
- `HOT` >= 80
- `WARM` 60–79
- `COOL` 40–59
- `COLD` < 40

Actions:
- `HOT`: appel commercial sous 24h + rdv cadrage
- `WARM`: relance contenu + qualification finale
- `COOL`: nurture utile (checklist/cas client) + re-qualification
- `COLD`: réactivation mensuelle max

---

## 5) JSON d’import n8n (copier-coller)

Ce JSON est prêt à créer comme base, ensuite tu changes les noms de champs/IDs.

```json
{
  "name": "Sunelys - Lead Intake Commercial IA",
  "nodes": [
    {
      "parameters": {
        "path": "sunelys-lead-intake",
        "httpMethod": "POST",
        "responseMode": "onReceived",
        "responseData": "firstEntryJson"
      },
      "id": 1,
      "name": "Webhook - Lead Intake",
      "type": "n8n-nodes-base.webhook",
      "typeVersion": 2,
      "position": [260, 300]
    },
    {
      "parameters": {
        "functionCode": "const raw = $json.body || $json;\nconst pick = (k) => String(raw[k] || '').trim();\nconst volume = pick('volume');\nconst need = pick('need') || pick('service_interest');\nconst blocked = pick('blocked_stage') || 'Je ne sais pas encore';\nconst sourcePage = pick('source') || pick('landing_page') || pick('source_page') || 'Site';\nconst phone = pick('phone');\nconst email = pick('email').toLowerCase();\n\nconst normNeed = (() => {\n  const n = need.toLowerCase();\n  if (n.includes('consuel')) return 'Consuel';\n  if (n.includes('raccordement') || n.includes('enedis')) return 'Raccordement Enedis';\n  if (n.includes('pilotage') || n.includes('gestion')) return 'Pilotage complet';\n  if (n.includes('declaration') || n.includes('dp')) return 'Déclaration prealable';\n  return need || 'Inconnu';\n})();\n\nconst volumeScore = volume === '1-10' ? 5 : volume === '10-30' ? 20 : volume === '+30' ? 25 : 5;\nconst blockedScore = {\n  'Avant dépôt': 10,\n  'Complément mairie': 15,\n  'Consuel à préparer': 15,\n  'Raccordement en attente': 18,\n  'Mise en service bloquée': 20,\n  'Pilotage global': 22,\n  'Je ne sais pas encore': 5,\n}[blocked] || 5;\n\nconst needScore = {\n  'Déclaration prealable': 20,\n  'Consuel': 18,\n  'Raccordement Enedis': 18,\n  'Pilotage complet': 25,\n}[normNeed] || 10;\n\nconst contactScore = phone ? 10 : (email ? 5 : 0);\n\nconst urgency = pick('follow_up_sla').toLowerCase().includes('24') ? 'immediate'\n  : pick('lead_stage').toLowerCase().includes('chauff') ? '1-4 semaines'\n  : 'non_urgent';\nconst urgencyScore = urgency === 'immediate' ? 20 : urgency === '1-4 semaines' ? 12 : 6;\n\nconst regionSignal = sourcePage.includes('/gestion-administrative-photovoltaique') ? 5 : 2;\n\nconst score = 25 + volumeScore + blockedScore + needScore + contactScore + urgencyScore + regionSignal;\nlet segment = 'COLD';\nif (score >= 80) segment = 'HOT';\nelse if (score >= 60) segment = 'WARM';\nelse if (score >= 40) segment = 'COOL';\n\nconst nextAction = segment === 'HOT'\n  ? 'Appeler sous 24h et proposer un cadrage de 15 min'\n  : segment === 'WARM'\n  ? 'Envoyer séquence de qualification + 2 relances en 7 jours'\n  : segment === 'COOL'\n  ? 'Nurturing checklist + preuve social + requalification'\n  : 'Pause 30 jours, puis relecture';\n\nreturn [{\n  json: {\n    ...raw,\n    lead_score: score,\n    lead_segment: segment,\n    volume,\n    need_norm: normNeed,\n    blocked_stage_norm: blocked,\n    source_page: sourcePage,\n    next_action: nextAction,\n    phone,\n    email,\n  },\n}];"
      },
      "id": 2,
      "name": "Normalize + score",
      "type": "n8n-nodes-base.function",
      "typeVersion": 2,
      "position": [520, 300]
    },
    {
      "parameters": {
        "conditions": {
          "number": [
            {
              "value1": "={{$json[\"lead_score\"]}}",
              "operation": "largerEqual",
              "value2": 80
            }
          ]
        }
      },
      "id": 3,
      "name": "IF HOT >= 80",
      "type": "n8n-nodes-base.if",
      "typeVersion": 2,
      "position": [760, 220]
    },
    {
      "parameters": {
        "conditions": {
          "number": [
            {
              "value1": "={{$json[\"lead_score\"]}}",
              "operation": "largerEqual",
              "value2": 60
            }
          ]
        }
      },
      "id": 4,
      "name": "IF WARM >= 60",
      "type": "n8n-nodes-base.if",
      "typeVersion": 2,
      "position": [1020, 220]
    },
    {
      "parameters": {
        "conditions": {
          "number": [
            {
              "value1": "={{$json[\"lead_score\"]}}",
              "operation": "largerEqual",
              "value2": 40
            }
          ]
        }
      },
      "id": 5,
      "name": "IF COOL >= 40",
      "type": "n8n-nodes-base.if",
      "typeVersion": 2,
      "position": [1280, 220]
    },
    {
      "parameters": {
        "url": "https://api.airtable.com/v0/{{$env.SUNELYS_AIRTABLE_BASE_ID}}/{{$env.SUNELYS_AIRTABLE_TABLE}}",
        "method": "POST",
        "authentication": "predefinedCredentialType",
        "sendBody": true,
        "bodyParameters": {
          "parameters": [
            {
              "name": "records[0][fields][Lead score]",
              "value": "={{$json.lead_score}}"
            },
            {
              "name": "records[0][fields][Segment]",
              "value": "={{$json.lead_segment}}"
            },
            {
              "name": "records[0][fields][Action commerciale]",
              "value": "={{$json.next_action}}"
            },
            {
              "name": "records[0][fields][Status]",
              "value": "Qualified"
            }
          ]
        },
        "options": {}
      },
      "id": 6,
      "name": "Airtable - update score",
      "type": "n8n-nodes-base.httpRequest",
      "typeVersion": 4,
      "position": [1500, 220]
    },
    {
      "parameters": {
        "url": "{{$env.SUNELYS_SLACK_WEBHOOK}}",
        "method": "POST",
        "sendBody": true,
        "bodyParameters": {
          "parameters": [
            {
              "name": "text",
              "value": "🚨 SUNELYS [{{$json.lead_segment}}] - {{$json.name || 'Lead sans nom'}} | Score {{$json.lead_score}} | Vol {{$json.volume}} | Need {{$json.need_norm}} | Étape {{$json.blocked_stage_norm}} | Email {{$json.email}}"
            }
          ]
        },
        "options": {}
      },
      "id": 7,
      "name": "Notify Slack",
      "type": "n8n-nodes-base.httpRequest",
      "typeVersion": 4,
      "position": [1500, 380]
    },
    {
      "parameters": {
        "url": "https://api.openai.com/v1/chat/completions",
        "method": "POST",
        "sendBody": true,
        "bodyParameters": {
          "parameters": [
            {
              "name": "model",
              "value": "gpt-5.5"
            },
            {
              "name": "temperature",
              "value": 0.25
            },
            {
              "name": "messages",
              "value": "=[{ \"role\": \"system\", \"content\": \"Tu es un sales SDR Sunelys. Réponds en français, 3 lignes max.\"\n+}, { \"role\": \"user\", \"content\": \"Crée une prise de contact pour lead SEGMENT {{$json.lead_segment}} Score {{$json.lead_score}}. Volume {{$json.volume}}. Besoin {{$json.need_norm}}. Bloqué à {{$json.blocked_stage_norm}}. Email {{$json.email}}.\" }]"
            }
          ]
        },
        "headerParameters": {
          "parameters": [
            {
              "name": "Authorization",
              "value": "=Bearer {{$env.SUNELYS_OPENAI_API_KEY}}"
            },
            {
              "name": "Content-Type",
              "value": "application/json"
            }
          ]
        },
        "options": {}
      },
      "id": 8,
      "name": "OpenAI script",
      "type": "n8n-nodes-base.httpRequest",
      "typeVersion": 4,
      "position": [1500, 520]
    }
  ],
  "connections": {
    "Webhook - Lead Intake": {
      "main": [
        [
          {
            "node": "Normalize + score",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "Normalize + score": {
      "main": [
        [
          {
            "node": "IF HOT >= 80",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "IF HOT >= 80": {
      "main": [
        [
          {
            "node": "Airtable - update score",
            "type": "main",
            "index": 0
          }
        ],
        [
          {
            "node": "IF WARM >= 60",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "IF WARM >= 60": {
      "main": [
        [
          {
            "node": "Airtable - update score",
            "type": "main",
            "index": 0
          }
        ],
        [
          {
            "node": "IF COOL >= 40",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "IF COOL >= 40": {
      "main": [
        [
          {
            "node": "Airtable - update score",
            "type": "main",
            "index": 0
          }
        ],
        [
          {
            "node": "Airtable - update score",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "Airtable - update score": {
      "main": [
        [
          {
            "node": "Notify Slack",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "Notify Slack": {
      "main": [
        [
          {
            "node": "OpenAI script",
            "type": "main",
            "index": 0
          }
        ]
      ]
    }
  },
  "active": false,
  "settings": {
    "executionOrder": "v1"
  }
}
```

⚠️ Remarques importantes:
- Ce JSON est un **template**. Selon ton n8n, remplace `messages`/`bodyParameters` si ton parser est différent.
- Les champs Airtable (`Lead score`, `Segment`, etc.) doivent exister dans ta table ou adapter les noms.
- Si tu veux éviter d’éditer tout le site, active ensuite une règle côté API `/api/leads` pour poster un mirror au webhook n8n (`fetch` après création Airtable).

---

## 6) Variante si tu préfères Airtable Trigger

1. Remplacer le nœud Webhook par `Airtable Trigger` (ou cron + Airtable Search dans table “Leads”).
2. Activer la vue “Leads non traités”.
3. Raccorder directement le `Normalize + score` avec la sortie du trigger.
4. Même logique de routage + mises à jour + alertes.

---

## 7) Répartition des branches prête à utiliser

- `HOT`: appeler sous 24h, message call + message WhatsApp + création tâche “rdv cadrage 15 min”.
- `WARM`: email personnalisé + 2 relances sur 10 jours (J+2, J+7).
- `COOL`: mini nurture (checklist + cas client) + requalification à J+14.
- `COLD`: désactiver en actif, relance trimestrielle de réactivation via campagne courte.

---

## 8) Check d’exploitation (3 minutes)

- webhook actif (ou trigger Airtable actif)
- 1 lead test par segment
- score cohérent > 80 pour un lead pilotage global +30, <40 pour info partielle
- notification Slack reçue avec `Segment + score + email`
- enregistrement Airtable enrichi dans < 30 sec
