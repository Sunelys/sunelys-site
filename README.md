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
const BRANDING_INTENSITY: "subtle" | "bold" = "subtle";
```
- `subtle`: shape plus discrète, blur plus doux
- `bold`: shape plus visible, présence marque renforcée

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

## Placeholders à remplacer
- Logos partenaires: `proofSectionData.logos[]`
- Témoignage: `proofSectionData.testimonial`
- Données d'étude de cas: `caseStudySectionData.results` et `caseStudySectionData.note`

## SEO / Tracking
- SEO global: `BaseLayout` (meta, canonical, OG, Twitter, Organization/WebSite JSON-LD)
- SEO home: `index.astro` (`Service` JSON-LD)
- Tracking CTA: attributs `data-track` + `window.trackEvent` / `dataLayer`

## Commandes
```bash
npm install
npm run dev
npm run build
```

## Checklist review visuelle
- Hero: lisibilité immédiate (offre, cible, bénéfice, CTA)
- Header: sticky, CTA visible, navigation claire
- Contraste: texte/call-to-action lisibles partout
- Rythme: alternance sections éditoriales / produit / conversion
- Mobile: CTA en pleine largeur, blocs non tassés
- Proof: métriques lisibles + placeholders explici