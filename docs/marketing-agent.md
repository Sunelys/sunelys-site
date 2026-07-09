# Agent marketing IA Sunelys

Ce projet contient un agent local qui joue le role de directeur marketing: audit SEO, controle du contenu, signaux de tracking, donnees GA4/Search Console optionnelles, recommandations et corrections prudentes.

## Commandes

```bash
npm run marketing:audit
npm run marketing:audit:no-ai
npm run marketing:apply
npm run marketing:pulse
npm run marketing:pulse:watch
npm run marketing:google:auth
npm run marketing:google:test
npm run marketing:leads:test
npm run marketing:leads:normalize
npm run marketing:leads:normalize -- --max 50 --apply
```

- `marketing:audit` cree un rapport dans `reports/marketing-agent/`.
- `marketing:audit:no-ai` force le mode sans OpenAI.
- `marketing:apply` applique uniquement les corrections deterministes marquees comme sures par le script.
- `marketing:pulse` lance un cycle d’audit en mode opérateur.
- `marketing:pulse:watch` lance en continu avec des réglages par défaut (`--interval 360 --max-p0 2`).
  - `--watch` répète l’audit (mode continu)
  - `--interval 360` définit la fréquence en minutes
  - `--max-p0 1` alerte si plus de 1 priorité P0
  - `--webhook <url>` envoie un résumé JSON en POST (pour Slack/Notion/Make)
- `marketing:google:auth` autorise le compte Google en OAuth local et cree un token dans `secrets/`.
- `marketing:google:test` teste les acces GA4 et Search Console sans lancer tout l'audit.
- `marketing:leads:test` teste la connexion Airtable leads sans afficher de valeurs de leads.
- `marketing:leads:normalize` lance une normalisation en lot des leads historiques (landing page, type de conversion, besoin, étape bloquée) en inferant les champs manquants depuis les infos déjà disponibles.
  - Sans `--apply` : dry-run (affiche les changements prévisionnels sans écrire).
  - Avec `--apply` : écrit réellement dans Airtable.

Les rapports generes sont ignores par Git car ils peuvent contenir des donnees Analytics/Search Console.

## Donnees utilisees

L'agent fonctionne toujours avec les donnees locales:

- pages Astro dans `src/pages/`
- articles Markdown dans `src/content/blog/`
- sitemap, routes, liens internes, images et frontmatter
- tracking `data-track` et `trackEvent`
- garde-fou editorial `docs/seo-content-publication-status.md`

Les connecteurs externes sont optionnels:

- GA4 via `GA4_PROPERTY_ID`
- Search Console via `GOOGLE_SEARCH_CONSOLE_SITE_URL`
- Airtable leads via `AIRTABLE_API_KEY`, `AIRTABLE_BASE_ID` et `AIRTABLE_LEADS_TABLE`
- PageSpeed Insights via `MARKETING_AGENT_PAGESPEED=1`
- Synthese IA via `OPENAI_API_KEY`

## Reporting leads Airtable

Quand Airtable est configure, `npm run marketing:audit` ajoute un bloc `Lead quality reporting` au rapport.
Ce bloc sert a rapprocher les pages d'entree et les canaux de la qualite commerciale, sans exposer de donnees personnelles.

Avant le premier audit leads, lancer:

```bash
npm run marketing:leads:test
```

Le reporting agrège:

- leads totaux, qualifies, chauds et score moyen
- landing pages qui generent des leads
- canaux declares ou deduits des UTM/referrers/click IDs
- services demandes et types de conversion
- etapes administratives bloquees, depuis une colonne Airtable dediee ou depuis `Blocage: ...` dans le commentaire
- sessions GA4 par landing page quand GA4 est disponible
- trous de qualification: landing page, canal, service, etape bloquee, volume, societe ou telephone manquants

Variables utiles:

```bash
AIRTABLE_LEADS_VIEW=
MARKETING_LEADS_MAX_RECORDS=5000
AIRTABLE_FIELD_BLOCKED_STAGE=
MARKETING_PULSE_MAX_P0=0
MARKETING_PULSE_INTERVAL_MINUTES=1440
MARKETING_PULSE_WEBHOOK=
```

`AIRTABLE_LEADS_VIEW` peut pointer vers une vue Airtable filtree, par exemple une vue qui exclut les tests ou les spams.
Si elle est vide, l'agent lit la table `AIRTABLE_LEADS_TABLE`.
`AIRTABLE_FIELD_BLOCKED_STAGE` est optionnel. Tant que la colonne n'existe pas dans Airtable, l'API ajoute le contexte au champ commentaire avec `Blocage: ...`, et l'agent sait l'extraire pour le reporting.
`MARKETING_PULSE_MAX_P0` définit le seuil d'alerte: `npm run marketing:pulse` retourne un code non-zéro si le nombre de priorités P0 dépasse cette valeur.
`MARKETING_PULSE_INTERVAL_MINUTES` fixe la cadence par défaut du mode `--watch`.
`MARKETING_PULSE_WEBHOOK` permet d’envoyer un résumé automatique vers Slack/Notion/Make.
La synthese IA recoit uniquement les agrégats du rapport, pas les emails, noms, telephones ou messages individuels.
Lors de la creation d'un lead, l'API normalise les champs Airtable en listes: besoin principal, source et volume. Cela evite les variantes de libelles qui rendraient le reporting inexploitable.
Le layout remplit aussi automatiquement les champs caches d'attribution (`landing_page`, referrer, UTM et click IDs) au chargement puis juste avant chaque envoi de formulaire. Si un champ manque cote navigateur, l'API deduit une valeur de secours depuis le referrer, `source_page`, les UTM et les click IDs disponibles.

## Configuration Google

Deux modes sont supportes:

- OAuth local: recommande ici, car l'organisation Google Cloud bloque la creation de cles de comptes de service avec la regle `iam.disableServiceAccountKeyCreation`.
- Compte de service: possible uniquement si l'organisation autorise la creation de cles JSON.

Dans les deux cas, les rapports utilisent uniquement des scopes lecture.

## Configuration OAuth local

### 1. Creer un client OAuth

Dans Google Cloud Console:

1. Ouvrir APIs & Services > Credentials.
2. Si l'ecran de consentement est demande, configurer une application interne ou externe selon le compte Google disponible.
3. Creer un OAuth Client ID de type Desktop app.
4. Telecharger le JSON du client OAuth.
5. Placer ce fichier ici:

```bash
secrets/google-oauth-client.json
```

Configurer `.env.local`:

```bash
GOOGLE_OAUTH_CLIENT_CREDENTIALS=./secrets/google-oauth-client.json
GOOGLE_OAUTH_TOKEN=./secrets/google-oauth-token.json
GA4_PROPERTY_ID=123456789
GOOGLE_SEARCH_CONSOLE_SITE_URL=https://sunelys.fr/
```

### 2. Autoriser le compte Google

Lancer:

```bash
npm run marketing:google:auth
```

La commande affiche une URL Google. Ouvrir cette URL dans le navigateur connecte au compte Google ayant acces a GA4 et Search Console, puis accepter les scopes lecture:

```bash
https://www.googleapis.com/auth/analytics.readonly
https://www.googleapis.com/auth/webmasters.readonly
```

Le script enregistre ensuite un refresh token local dans:

```bash
secrets/google-oauth-token.json
```

### 3. Tester

```bash
npm run marketing:google:test
```

Quand le test GA4 et Search Console est OK:

```bash
npm run marketing:audit
```

## Configuration compte de service

### 1. Creer le compte de service

Dans Google Cloud Console:

1. Creer ou choisir un projet Google Cloud.
2. Activer les APIs:
   - Google Analytics Data API
   - Google Search Console API
3. Creer un service account.
4. Creer une cle JSON pour ce service account.
5. Placer le fichier ici:

```bash
secrets/google-service-account.json
```

Le dossier `secrets/` est ignore par Git.

Configurer ensuite `.env.local`:

```bash
GOOGLE_APPLICATION_CREDENTIALS=./secrets/google-service-account.json
```

Alternative possible si l'hebergement n'accepte pas de fichier JSON:

```bash
GOOGLE_SERVICE_ACCOUNT_JSON='{"type":"service_account",...}'
```

### 2. Autoriser GA4

Dans Google Analytics:

1. Ouvrir Admin.
2. Copier l'ID numerique de la propriete GA4.
3. Ajouter dans `.env.local`:

```bash
GA4_PROPERTY_ID=123456789
```

4. Aller dans Property access management.
5. Ajouter l'email du service account comme utilisateur avec un role de lecture, par exemple Viewer ou Analyst.

L'email ressemble a:

```bash
sunelys-marketing-agent@votre-projet.iam.gserviceaccount.com
```

### 3. Autoriser Search Console

Dans Google Search Console:

1. Ouvrir la propriete du site.
2. Aller dans Settings > Users and permissions.
3. Ajouter l'email du service account comme utilisateur.
4. Renseigner l'identifiant exact de propriete dans `.env.local`.

Pour une propriete prefixe URL:

```bash
GOOGLE_SEARCH_CONSOLE_SITE_URL=https://sunelys.fr/
```

Pour une propriete domaine, utiliser le format Search Console exact:

```bash
GOOGLE_SEARCH_CONSOLE_SITE_URL=sc-domain:sunelys.fr
```

### 4. Tester la connexion

Lancer:

```bash
npm run marketing:google:test
```

Le test affiche:

- l'email du service account detecte ;
- si GA4 repond avec des evenements ;
- si Search Console repond avec des requetes ;
- les proprietes Search Console accessibles ;
- la correction a faire si une permission manque.

Quand les deux tests sont OK, lancer:

```bash
npm run marketing:audit
```

### Acces requis

- Google Analytics Data API: acces lecture sur la propriete GA4.
- Search Console API: utilisateur de la propriete Search Console.

Le testeur utilise uniquement des scopes lecture:

```bash
https://www.googleapis.com/auth/analytics.readonly
https://www.googleapis.com/auth/webmasters.readonly
```

### Erreurs frequentes

- `GA4_PROPERTY_ID is missing`: renseigner l'ID numerique de propriete GA4.
- `HTTP 403` cote GA4: ajouter l'email du service account dans GA4 Property access management.
- `HTTP 403` cote Search Console: ajouter l'email du service account dans Users and permissions.
- `Search analytics HTTP 403/404`: verifier que `GOOGLE_SEARCH_CONSOLE_SITE_URL` correspond exactement a la propriete Search Console.
- `missing client_email or private_key`: le JSON fourni n'est pas une cle de service account valide.

## Garde-fous

L'agent ne publie pas de contenu seul. Il respecte la cadence definie dans `docs/seo-content-publication-status.md`:

- deux articles maximum par semaine
- pas de nouvelle semaine tant que la precedente n'est pas validee et publiee
- pas de supposition qu'un fichier local est deja public

Le mode `apply` est limite aux corrections metadata deterministes, par exemple:

- ajouter `updatedDate` quand il peut reprendre `pubDate`
- proteger en `publicationStatus: "backlog"` un slug que le garde-fou editorial classe explicitement en backlog

## Strategie recommandee

1. Lancer `npm run marketing:audit:no-ai` pour valider l'audit local.
2. Brancher GA4 et Search Console.
3. Lancer `npm run marketing:audit` pour obtenir une synthese IA priorisee.
4. Lire `reports/marketing-agent/latest.md`.
5. Lancer `npm run marketing:apply` uniquement pour les corrections metadata sures.
6. Faire les changements editoriaux plus ambitieux dans une branche ou une session Codex dediee.
