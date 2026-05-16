# Sunelys Website (Astro 5)

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
- Les articles sont automatiquement ajoutés au sitemap via `src/pages/sitemap.xml.ts`.

- Images blog: `coverImage` et `coverAlt` dans le frontmatter des articles
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
- Tracking centralise: attributs `data-track` + `window.trackEvent`
- Sorties tracking supportees: `dataLayer` (GTM), GA4 via `gtag`, Matomo via `_paq`
- Evenements couverts: clics CTA, telephone, email, quiz, clic estimation, soumission formulaire contact

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

### Champs Airtable optionnels
L'API envoie toujours le nom et l'email. Les autres champs ne sont transmis que si la variable d'environnement indique le nom exact de la colonne Airtable:
```bash
AIRTABLE_FIELD_COMPANY=Societe
AIRTABLE_FIELD_PHONE=Telephone
AIRTABLE_FIELD_VOLUME=Volume
AIRTABLE_FIELD_NEED=Besoin
AIRTABLE_FIELD_MESSAGE=Message
AIRTABLE_FIELD_STATUS=Statut
AIRTABLE_FIELD_PIPELINE=Pipeline
AIRTABLE_FIELD_OWNER=Responsable
AIRTABLE_FIELD_FOLLOW_UP_SLA=SLA relance
AIRTABLE_FIELD_SOURCE=Source
AIRTABLE_FIELD_FIRST_REFERRER=Premier referrer
AIRTABLE_FIELD_LANDING_PAGE=Landing page
AIRTABLE_FIELD_UTM_SOURCE=UTM source
AIRTABLE_FIELD_UTM_MEDIUM=UTM medium
AIRTABLE_FIELD_UTM_CAMPAIGN=UTM campaign
AIRTABLE_FIELD_UTM_TERM=UTM term
AIRTABLE_FIELD_UTM_CONTENT=UTM content
AIRTABLE_FIELD_GCLID=GCLID
AIRTABLE_FIELD_FBCLID=FBCLID
AIRTABLE_FIELD_MSCLKID=MSCLKID
```

### Nommage des evenements
Les evenements envoyes reprennent les valeurs `data-track` dans le code, par exemple:
- `cta_hero_primary`
- `cta_final_phone`
- `quiz_volume_selected`
- `contact_form_submit`

Le payload inclut quand disponible: page, label, href, source, volume, besoin, UTM, referrer et landing page.

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
La version attendue est `v20.20.0` (fichier `.nvmrc`).

2. Recharger Node 20 puis relancer:
```bash
nvm use
npm run build
```

3. Correction locale appliquée pour les disques externes:
- Astro/Vite utilise maintenant un cache dans `/tmp/sunelys-site-vite-cache` au lieu de `node_modules/.vite`.
- Le watcher Vite ignore les fichiers macOS `._*` générés par certains volumes externes.

4. Si blocage local persistant:
- arrêter le serveur dev en cours avec `Ctrl + C`
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
