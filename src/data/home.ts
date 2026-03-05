type MetricsMode = "prudent" | "qualitative";

export const CONTENT_MODE: {
  showLogos: boolean;
  metrics: MetricsMode;
  showVideoEmbed: boolean;
} = {
  // Passez a true quand vous avez les vrais logos clients utilisables.
  showLogos: false,
  // "prudent" = chiffres prudents, "qualitative" = sans chiffres.
  metrics: "qualitative",
  // Passez a true des que l'URL video est validee.
  showVideoEmbed: false,
};

export const trustLogos = [
  { name: "Partenaire installateur national", src: "" },
  { name: "Reseau d'agences regionales", src: "" },
  { name: "Bureau d'etudes partenaire", src: "" },
  { name: "Integrateur tertiaire", src: "" },
];

const trustMetricsPresets: Record<
  MetricsMode,
  Array<{ label: string; value: string }>
> = {
  prudent: [
    { label: "Delai moyen de cadrage", value: "48h" },
    { label: "Poles d'expertise", value: "3" },
    { label: "Dossiers suivis / an", value: "120+" },
    { label: "Partenaires installateurs", value: "18+" },
  ],
  qualitative: [
    { label: "Pilotage administratif de A a Z", value: "DP / Consuel / Enedis" },
    { label: "Methode", value: "Process standardise et documente" },
    { label: "Suivi", value: "Reporting clair pour vos equipes" },
    { label: "Engagement", value: "Fiabilite et delais maitrises" },
  ],
};

export const trustMetrics = trustMetricsPresets[CONTENT_MODE.metrics];

export const testimonials = [
  {
    quote:
      "Depuis que Sunelys suit nos dossiers, nos commerciaux restent concentres sur la relation client et nous avons beaucoup moins de retours administratifs.",
    author: "Responsable exploitation",
    company: "Installateur PV (anonymise)",
    region: "Occitanie",
  },
  {
    quote:
      "Nous avions des blocages recurrents sur Consuel et raccordement. Le pilotage Sunelys a remis de la visibilite sur chaque dossier.",
    author: "Dirigeant",
    company: "Structure ENR multi-agences (anonymise)",
    region: "PACA",
  },
];

export const painPoints = [
  "Dossiers de declaration prealable incomplets ou refuses",
  "Pieces manquantes qui bloquent l'instruction des demandes",
  "Retards Consuel qui decalent la mise en service",
  "Suivi raccordement Enedis chronophage et peu lisible",
];

export const quizOptions = [
  {
    value: "1-10",
    label: "1-10",
    message:
      "Vous pouvez standardiser rapidement vos depots et securiser les delais de traitement.",
  },
  {
    value: "10-30",
    label: "10-30",
    message:
      "Un pilotage dedie peut absorber vos pics d'activite et soulager vos equipes internes.",
  },
  {
    value: "+30",
    label: "+30",
    message:
      "Un dispositif structure est recommande pour fiabiliser vos flux et accelerer vos cycles.",
  },
];

export const caseStudies = [
  {
    title: "Cas client - Installateur regional (anonymise)",
    context: "Sud-Est, 20 a 30 dossiers/mois",
    results: [
      "Temps de traitement interne reduit d'environ 30%",
      "Passage de 11 a 4 allers-retours moyens par dossier",
      "Dossier plus lisible pour la coordination DP, Consuel et Enedis",
    ],
    ctaHref: "/services",
    ctaLabel: "Voir comment on fait",
  },
];

export const videoPresentation = {
  title: "Sunelys en 60 secondes",
  description:
    "Comment nous structurons votre administratif photovoltaïque de la declaration prealable a la mise en service.",
  // Remplacez par votre URL YouTube/Vimeo, puis activez CONTENT_MODE.showVideoEmbed.
  embedUrl: "",
  posterImage: "/brand/logo-full.svg",
  posterAlt: "Presentation Sunelys",
  fallbackCtaHref: "/contact",
  fallbackCtaLabel: "Recevoir la presentation",
};
