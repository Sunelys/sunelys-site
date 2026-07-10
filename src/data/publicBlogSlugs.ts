// Keep public blog visibility explicit so weekly SEO releases stay deliberate.
// Adding a slug here is the switch that makes an article visible in routes,
// sitemap, service guides, and internal linking.
export const publicBlogSlugs = [
  // S1
  "cerfa-declaration-prealable-panneaux-solaires",
  "externaliser-administratif-photovoltaique",

  // S2
  "declaration-prealable-panneaux-solaires-pieces-delais",
  "attestation-consuel-photovoltaique",

  // Already-live supporting articles
  "consuel-photovoltaique-delais-dossier",
  "declaration-prealable-panneaux-solaires-erreurs",
  "declaration-prealable-panneaux-solaires-toiture",
  "externalisation-administrative-solaire-volume",
  "panneaux-solaires-sans-declaration-prealable",
  "raccordement-enedis-photovoltaique-etapes-delais",
] as const;

export type PublicBlogSlug = (typeof publicBlogSlugs)[number];
