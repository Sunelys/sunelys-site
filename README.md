# Sunelys Website (Astro 5)

Landing vitrine Sunelys en Astro, orientée conversion B2B et SEO.

## Architecture
- Layout global: `src/layouts/BaseLayout.astro`
- Homepage: `src/pages/index.astro`
- Données éditables homepage: `src/data/home.ts`
- Composants landing:
  - `src/components/Header.astro`
  - `src/components/Hero.astro`
  - `src/components/ProofBar.astro`
  - `src/components/FeatureGrid.astro`
  - `src/components/Steps.astro`
  - `src/components/ServicesCards.astro`
  - `src/components/CaseStudy.astro`
  - `src/components/FAQ.astro`
  - `src/components/FinalCTA.astro`
  - `src/components/Footer.astro`

## Design system (tokens)
Les tokens sont définis globalement dans `src/layouts/BaseLayout.astro` (`<style is:global>`):
- Couleurs: `--color-bg`, `--color-surface`, `--color-text`, `--color-muted`, `--color-accent`, `--color-cream`, `--color-hairline`
- Radius: `--radius-sm`, `--radius-md`, `--radius-lg`, `--radius-xl`, `--radius-pill`
- Ombres: `--shadow-ultra`, `--shadow-soft`, `--shadow-hover`
- Typo scale: `--step--1` à `--step-5`
- Shape signature: `--shape-opacity`, `--shape-blur`, `--shape-scale`, `--shape-x`

## Changer la variante de shape (subtle / visible)
Dans `src/layouts/BaseLayout.astro`:
```ts
const SHAPE_MODE: "subtle" | "visible" = "subtle";
```
- `subtle`: opacité faible, blur plus doux
- `visible`: shape plus présente

Les valeurs sont appliquées via `shapeTokens`.

## Modifier le contenu sans toucher au markup
Tout le contenu landing est dans `src/data/home.ts`:
- Hero (titre, sous-titre, preuve, CTA)
- Trusted/proof (logos + métriques)
- Frictions (4 cartes)
- Process (4 étapes)
- Services
- Cas client
- FAQ
- CTA final

## SEO / Tracking
- SEO global (title, meta, canonical, OG, Twitter, JSON-LD Organization/WebSite): `BaseLayout`
- SEO homepage (Service + FAQPage JSON-LD): `src/pages/index.astro`
- Tracking clics CTA: attributs `data-track` + `window.trackEvent`/`dataLayer` dans `BaseLayout`

## Commandes
```bash
npm install
npm run dev
npm run build
```

## Checklist de validation manuelle
- Responsive: header, hero, preview, cards, FAQ, CTA final
- Accessibilité: focus visible, skip-link, contrastes
- SEO: 1 seul H1 sur `/`, metas/canonical/OG présents
- Tracking: clics CTA poussent des événements `data-track`
