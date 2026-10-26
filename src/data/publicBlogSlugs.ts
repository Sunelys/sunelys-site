// Keep public blog visibility explicit so weekly SEO releases stay deliberate.
// Adding a slug here is the switch that makes an article visible in routes,
// sitemap, service guides, and internal linking.
export const publicBlogSlugs = [
  // Guide transversal des demarches, distinct des articles specialises.
  "demarches-administratives-photovoltaique",
  // S1
  "cerfa-declaration-prealable-panneaux-solaires",
  "externaliser-administratif-photovoltaique",

  // S2
  "declaration-prealable-panneaux-solaires-pieces-delais",
  "attestation-consuel-photovoltaique",

  // S3
  "delai-declaration-prealable-photovoltaique",
  "delai-raccordement-enedis-photovoltaique",

  // S4
  "delai-consuel-photovoltaique",
  "sous-traiter-declaration-prealable-photovoltaique",

  // S5
  "dp-refusee-panneaux-solaires-que-faire",
  "etapes-raccordement-enedis-panneaux-solaires",

  // S6
  "prix-consuel-photovoltaique",
  "gerer-soi-meme-ou-deleguer-administratif-solaire",

  // S7
  "declaration-prealable-ou-permis-construire-photovoltaique",
  "cout-raccordement-enedis-photovoltaique",

  // S8
  "consuel-refuse-motifs-solutions",
  "cout-gestion-administrative-photovoltaique",

  // Already-live supporting articles
  "consuel-photovoltaique-delais-dossier",
  "declaration-prealable-panneaux-solaires-erreurs",
  "declaration-prealable-panneaux-solaires-toiture",
  "externalisation-administrative-solaire-volume",
  "panneaux-solaires-sans-declaration-prealable",
  "raccordement-enedis-photovoltaique-etapes-delais",
] as const;

export type PublicBlogSlug = (typeof publicBlogSlugs)[number];
