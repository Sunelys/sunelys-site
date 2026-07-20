# Sunelys Website (Astro 7)

Landing page Sunelys orientée conversion B2B, avec direction artistique premium (luxe minimaliste + SaaS haut de gamme).

## Structure
- Layout global: `src/layouts/BaseLayout.astro`
- Home: `src/pages/index.astro`
- Données éditables: `src/data/home.ts`
- Composants home:
  - `src/components/Header.astro`
  - `src/components/Hero.astro`
  - `src/components/ProofSection.astro`
  - `src/components/FrictionSection.astro`
  - `src/components/ProcessSection.astro`
  - `src/components/ServicesSection.astro`
  - `src/components/PortalSection.astro`
  - `src/components/CaseStudySection.astro`
  - `src/components/VisionSection.astro`
  - `src/components/FinalCTASection.astro`
  - `src/components/Footer.astro`

## Design tokens (global)
Définis dans `src/layouts/BaseLayout.astro`:
- `--bg`
- `--bg-soft`
- `--surface`
- `--surface-elevated`
- `--text`
- `--text-muted`
- `--line`
- `--accent`
- `--accent-soft`
- `--shadow-sm`
- `--shadow-md`
- `--radius-sm`
- `--radius-md`
- `--radius-xl`
- `--max-width`
- `--section-gap`
- `--container-padding`

## Intensité branding (subtle / bold)
Dans `src/layouts/BaseLayout.astro`:
```ts
const BRANDING_INTENSITY: "subtle" | "bold" = "bold";
```
- `subtle`: shape plus discrète, blur plus doux
- `bold`: shape plus visible, présence marque renforcée
- Variables shape associées:
  - `--shape-opacity`
  - `--shape-blur`
  - `--shape-scale`
  - `--shape-x`
  - `--shape-y`

## Zones de contenu à éditer facilement
Tout est dans `src/data/home.ts`:
- `heroData`
- `proofSectionData`
- `frictionSectionData`
- `processSectionData`
- `servicesSectionData`
- `portalSectionData`
- `caseStudySectionData`
- `visionSectionData`
- `finalCtaSectionData`

## Preuves sociales et visuels
- Logos partenaires: `trustSectionData.logos[]`
- Témoignages: `proofSectionData.testimonials[]`
- Chiffres clés: `trustSectionData.metrics[]`
- Image métier homepage: `public/images/site/solar-admin-coordination-2026.webp`

## Blog SEO
- Index blog: `src/pages/blog/index.astro`
- Page article: `src/pages/blog/[slug].astro`
- Articles Markdown: `src/content/blog/*.md`
- Carte article: `src/components/blog/BlogCard.astro`
- Chaque article doit inclure `slug`, `title`, `seoTitle`, `description`, `pubDate`, `category`, `readingTime` et `keywords` dans le frontmatter.
- Champs recommandés: `updatedDate`, `coverImage`, `coverAlt`, `ogImage`, `primaryServiceHref`, `relatedLinks`.
- Les articles sont automatiquement ajoutés au sitemap via `src/pages/sitemap.xml.ts` avec `lastmod` depuis `updatedDate` ou `pubDate`.

- Images blog visibles: `coverImage` et `coverAlt` dans le frontmatter des articles
- Images de partage social: `ogImage` en 1200 x 630 px dans `public/images/og/`
- Composant image réutilisable: `src/components/MediaFrame.astro`
- Chaque article doit utiliser un visuel spécifique dans `public/images/blog/` ou une capture réelle dédiée.

### Arborescence images recommandée
- `public/images/site/` : visuels structurels du site (hero, portail, cas client, process)
- `public/images/blog/` : couvertures et visuels d'articles
- `public/images/clients/` : logos et références clients autorisés à diffusion

### Convention de nommage
- site : `portal-preview-2026.webp`, `case-study-solar-b2b.webp`
- blog : `consuel-photovoltaique-checklist.webp`, `declaration-prealable-erreurs.webp`
- clients : `sunwatt-france-logo.svg`, `groupe-solarenov-logo.svg`

Remplacement conseillé: déposer vos vrais visuels dans `public/images/site/`, `public/images/blog/` ou `public/images/clients/`, puis mettre à jour `src/data/home.ts` et le frontmatter des articles.

Rythme recommandé: 2 brouillons par semaine, validation humaine avant publication. Priorité aux requêtes proches de l intention client: DP, Consuel, raccordement Enedis, erreurs administratives, volume dossiers, externalisation administrative solaire.

## SEO / Tracking
- SEO global: `BaseLayout` (meta, canonical, OG, Twitter, Organization/WebSite JSON-LD)
- SEO home: `index.astro` (`Service` + `FAQPage` JSON-LD)
- SEO articles: `BlogPosting` + auteur `Person`, encart auteur, lead magnet checklist et liens internes.
- SEO pages services: `Service`, `FAQPage`, breadcrumbs et guides associés.
- Tracking centralisé: attributs `data-track` + `window.trackEvent`
- Sorties tracking supportées: `dataLayer` (GTM), GA4 via `gtag`, Matomo via `_paq`
- Événements couverts: clics CTA, téléphone, email, Calendly, quiz, checklist, soumissions formulaires et `lead_converted`.

### Activer GA4
Dans Vercel > Project Settings > Environment Variables, ajouter:
```bash
PUBLIC_GA4_ID=G-XXXXXXXXXX
```
Puis redeployer. En local, copier `.env.example` vers `.env` et renseigner la valeur.

### Activer Search Console
Dans Google Search Console, choisir la validation par balise meta, puis copier uniquement le contenu de l'attribut `content`:
```bash
PUBLIC_GOOGLE_SITE_VERIFICATION=xxxxxxxxxxxxxxxx
```
Puis redeployer. La balise `google-site-verification` sera injectee automatiquement dans le `<head>`.

### Activer Matomo
Dans Vercel > Project Settings > Environment Variables, ajouter:
```bash
PUBLIC_MATOMO_URL=https://votre-matomo.example.com
PUBLIC_MATOMO_SITE_ID=1
```
Puis redeployer. Ne pas mettre de slash final dans l'URL Matomo.

### Alerte optionnelle si Airtable refuse un lead
Pour recevoir une alerte quand Airtable rejette une creation de lead, ajouter un webhook compatible JSON:
```bash
LEAD_ALERT_WEBHOOK_URL=https://votre-webhook.example.com/leads-alert
```
Le formulaire continue d'utiliser Airtable comme destination principale. Cette URL sert uniquement de filet de securite en cas d'erreur Airtable.

### Alerte e-mail quand un nouveau lead arrive
L'API `/api/leads` peut envoyer un e-mail apres creation reussie du lead dans Airtable. Le formulaire reste fonctionnel meme si l'alerte e-mail echoue.

Dans Vercel > Project Settings > Environment Variables, ajouter:
```bash
RESEND_API_KEY=re_xxxxxxxxxxxxx
LEAD_NOTIFICATION_FROM=Sunelys <alertes@sunelys.fr>
LEAD_NOTIFICATION_TO=contact@sunelys.fr
```

`LEAD_NOTIFICATION_TO` accepte plusieurs destinataires separes par des virgules. Le domaine d'envoi doit etre valide dans Resend. Optionnellement, `LEAD_NOTIFICATION_WEBHOOK_URL` peut recevoir le meme evenement en JSON.

### Reporting leads qualifies
`npm run marketing:audit` lit aussi Airtable en lecture pour produire un bloc `Lead quality reporting` dans `reports/marketing-agent/latest.md`.
Le rapport agrège uniquement des données non personnelles: landing page, canal, service demandé, type de conversion, volume, score qualité et trous de qualification.

Variables utiles:
```bash
AIRTABLE_LEADS_VIEW=Leads qualifiés
MARKETING_LEADS_MAX_RECORDS=5000
```
`AIRTABLE_LEADS_VIEW` est optionnel. Sans vue dédiée, l'agent lit la table configurée dans `AIRTABLE_LEADS_TABLE`.

### Champs Airtable optionnels
L'API envoie toujours le nom et l'email. Les autres champs ne sont transmis que si la variable d'environnement indique le nom exact de la colonne Airtable:
```bash
AIRTABLE_FIELD_COMPANY=Société
AIRTABLE_FIELD_PHONE=Téléphone
AIRTABLE_FIELD_VOLUME=Volume dossiers/mois
AIRTABLE_FIELD_NEED=Besoin principal
AIRTABLE_FIELD_MESSAGE=Commentaire
AIRTABLE_FIELD_CONVERSION_TYPE=
AIRTABLE_FIELD_LEAD_STAGE=
AIRTABLE_FIELD_SERVICE_INTEREST=
AIRTABLE_FIELD_LEAD_SOURCE_DETAIL=
AIRTABLE_FIELD_QUALIFICATION_HINT=
AIRTABLE_FIELD_STATUS=Statut
AIRTABLE_FIELD_PIPELINE=
AIRTABLE_FIELD_OWNER=
AIRTABLE_FIELD_FOLLOW_UP_SLA=
AIRTABLE_FIELD_SOURCE=Source
AIRTABLE_FIELD_FIRST_REFERRER=
AIRTABLE_FIELD_LANDING_PAGE=Landing page
AIRTABLE_FIELD_UTM_SOURCE=UTM source
AIRTABLE_FIELD_UTM_MEDIUM=UTM medium
AIRTABLE_FIELD_UTM_CAMPAIGN=UTM campaign
AIRTABLE_FIELD_UTM_TERM=
AIRTABLE_FIELD_UTM_CONTENT=
AIRTABLE_FIELD_GCLID=
AIRTABLE_FIELD_FBCLID=
AIRTABLE_FIELD_MSCLKID=
```
L'API normalise les valeurs envoyées vers les listes Airtable existantes: `DP`, `Consuel`, `Raccordement`, `Gestion admin`, `Pilotage complet`, ainsi que les volumes `1-10`, `10-30`, `+30`.

### Nommage des evenements
Les evenements envoyes reprennent les valeurs `data-track` dans le code, par exemple:
- `cta_hero_primary`
- `cta_final_phone`
- `quiz_volume_selected`
- `contact_form_submit`

Les evenements normalises a suivre en priorite sont:
- `lead_converted`: conversion primaire sur confirmation de demande.
  - `conversion_type` recommandé: `form_contact`, `booking`, `phone_click`, `email_click`, `checklist_download`, `quiz_submit`.
- `lead_form_submit`: envoi d'un formulaire de lead.
- `contact_form_submit`: formulaire contact principal.
- `booking_click`: clic vers le calendrier.
- `phone_click`: appel depuis le site.
- `blog_to_service_click`: passage d'un article vers une page business.

Le payload inclut quand disponible: page, label, href, source, volume, besoin, type de conversion, etape lead, service interesse, UTM, referrer et landing page.

## Agent marketing IA

Un agent local est disponible pour auditer le site comme un directeur marketing: SEO, contenus, maillage, tracking, opportunites Search Console/GA4 et recommandations priorisees.

```bash
npm run marketing:audit
npm run marketing:audit:no-ai
npm run marketing:apply
npm run marketing:google:auth
npm run marketing:google:test
npm run marketing:leads:test
npm run marketing:pulse
npm run marketing:pulse:watch
```

- `marketing:audit` genere un rapport dans `reports/marketing-agent/`.
- `marketing:audit:no-ai` force l'audit sans OpenAI.
- `marketing:apply` applique uniquement des corrections deterministes et prudentes.
- `marketing:google:auth` connecte le compte Google en OAuth local.
- `marketing:google:test` verifie les acces directs GA4 et Search Console.
- `marketing:leads:test` verifie la connexion Airtable leads sans afficher de donnees personnelles.
- `marketing:pulse:watch` lance l’audit en continu avec une fréquence par défaut de 360 min et un seuil d’alerte P0 à 2.

Configuration detaillee: `docs/marketing-agent.md`.

Variables optionnelles principales:
```bash
OPENAI_API_KEY=
MARKETING_AGENT_MODEL=gpt-5.5
GOOGLE_APPLICATION_CREDENTIALS=
GA4_PROPERTY_ID=
GOOGLE_SEARCH_CONSOLE_SITE_URL=https://sunelys.fr/
MARKETING_PULSE_MAX_P0=0          # alertes si plus de 0 priorité P0
MARKETING_PULSE_INTERVAL_MINUTES=360 # fréquence watch en minutes
MARKETING_PULSE_WEBHOOK=           # webhook Slack/Notion/Make, optionnel
```

## Commandes
```bash
nvm use
npm install
npm run dev
npm run build
```

## Diagnostic build (si `astro build` semble bloqué)
1. Vérifier la version Node:
```bash
node -v
```
La version attendue est `v22.23.0` en local (fichier `.nvmrc`). Le projet demande Node `>=22.12.0 <23`.

2. Recharger Node 22 puis relancer:
```bash
nvm use
npm run build
```

3. Correction locale appliquée pour les disques externes:
- Astro/Vite utilise maintenant un cache dans `/tmp/sunelys-site-vite-cache` au lieu de `node_modules/.vite`.
- Le watcher Vite ignore les fichiers macOS `._*` générés par certains volumes externes.

4. Si blocage local persistant:
- arrêter le serveur dev en cours avec `Ctrl + C`
- avec Astro 7, si le serveur tourne en arrière-plan: `npm exec -- astro dev stop`
- relancer `npm run dev`
- valider avec `npm run build:ci`
- si besoin, valider la build via Vercel (environnement propre)

## Checklist review visuelle
- Hero: lisibilité immédiate (offre, cible, bénéfice, CTA)
- Header: sticky, CTA visible, navigation claire
- Contraste: texte/call-to-action lisibles partout
- Rythme: alternance sections éditoriales / produit / conversion
- Mobile: CTA en pleine largeur, blocs non tassés
- Proof: métriques lisibles + placeholders explicites
- Portal: impression claire de plateforme
- Final CTA: impact visuel + action claire
