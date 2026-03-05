# Sunelys Website

Site vitrine Sunelys sous Astro, optimise conversion + SEO.

## Stack & structure
- Framework: Astro 5 (routing fichier)
- Styles: CSS natif
- Donnees CRO homepage: `src/data/home.ts`
- Layout global / SEO / tracking / theme shape: `src/layouts/BaseLayout.astro`
- Pages:
  - `src/pages/index.astro` (`/`)
  - `src/pages/parcours.astro` (`/parcours`)
  - `src/pages/services.astro` (`/services`)
  - `src/pages/tarifs.astro` (`/tarifs`)
  - `src/pages/contact.astro` (`/contact`)
  - pages SEO dediees:
    - `/gestion-administrative-photovoltaique`
    - `/dossier-consuel-photovoltaique`
    - `/raccordement-enedis-photovoltaique`

## Changelog recent
- Homepage CRO: hero business, section pain points, process, preuve sociale, mini-tunnel, cas client, zone video/fallback.
- SEO global: title/meta/canonical/OG/Twitter, `Organization` + `WebSite` JSON-LD.
- SEO home/pages dediees: H1 unique + FAQ + `FAQPage` JSON-LD.
- Tracking: `window.dataLayer` + `window.trackEvent`, CTAs/quiz/form relies via `data-track`.
- Accessibilite: focus visibles, skip-link, quiz avec `aria-pressed`, labels formulaire.
- Branding: integration SVG charte (`public/brand/*`) + shape premium configurable.

## Placeholders a remplacer (exactement ou)
### 1) Donnees metier homepage
Modifier `src/data/home.ts`:
- `CONTENT_MODE.showLogos`: `false` si pas de logos clients, `true` quand prets.
- `CONTENT_MODE.metrics`: `"prudent"` ou `"qualitative"`.
- `trustLogos`: renseigner `src` de chaque logo client (sinon section masquee).
- `trustMetricsPresets.prudent`: vos chiffres reels (dossiers/an, partenaires, delai).
- `testimonials`: 2 retours clients valides (ou anonymises verifies).
- `caseStudies`: cas client reel + resultat concret.
- `videoPresentation.embedUrl`: URL YouTube/Vimeo puis `CONTENT_MODE.showVideoEmbed = true`.

### 2) Variante shape A/B
Modifier `src/layouts/BaseLayout.astro`:
- constante: `const SHAPE_VARIANT: "A" | "B" = "A";`
- `A` = discret (premium epure), `B` = plus visible.

### 3) Coordonnees / tracking
- Footer + schema org: `src/layouts/BaseLayout.astro`
- Formulaire contact: `src/pages/contact.astro`

## Build bloque: diagnostic + fix non intrusif
Constat observe:
- Le blocage percu vient surtout de processus build en parallele + cache `.astro` stale.
- Apres nettoyage, build valide en `Node v20.20.0` et `Node v24.14.0`.

Fix retenu:
1. Pin Node: `.nvmrc` = `v20.20.0` + `engines.node = "20.x"` dans `package.json`.
2. Si blocage local:
   - `source ~/.zshrc && nvm use 20` (version recommandee equipe/CI)
   - `pkill -f 'sunelys-site/node_modules/.bin/astro build'` (si process zombie)
   - `mv .astro .astro.bak.builddiag` (ou suppression du cache)
   - `npm run build`
3. Validation CI:
   - `npm run build:ci` (force `CI=1` + telemetrie off)

Checks techniques deja faits:
- Build statique: 8 pages generees.
- H1/meta/canonical/OG verifiees en sortie `dist`.
- `astro.config.mjs`: pas d'integration/adapter bloquant (config simple `site`).
- Assets SVG et imports verifies.

## Lighthouse / perf
- Tentative locale `npx lighthouse` non fiable dans cet environnement (commande bloquee).
- Verification perf manuelle appliquee:
  - images lazy quand non critiques
  - embed video charge au clic
  - pas de dependance front lourde ajoutee
  - CSS natif leger

## Checklist manuelle pre-merge
- [ ] Responsive mobile/tablette: hero, quiz, video, cards, footer.
- [ ] Quiz: options cliquables + message + redirect `/contact?volume=...`.
- [ ] Contact: volume pre-rempli + envoi `mailto` + event de tracking.
- [ ] A11y: focus visible clavier, aria quiz, labels formulaire.
- [ ] SEO: 1 seul H1/page, metas + canonical + OG image.
- [ ] JSON-LD: `Organization`/`WebSite` global + `FAQPage` pages concernees.
- [ ] Tracking: events `data-track` dans `window.dataLayer`.

## Commandes
```bash
npm install
npm run dev
npm run build
npm run build:ci
npm run preview
```
