export const homeSeo = {
  title: "Sunelys | L'infrastructure administrative des installateurs photovoltaïques",
  description:
    "DP, Consuel et raccordement pilotés de bout en bout pour réduire la charge administrative et accélérer les chantiers.",
};

export const heroData = {
  kicker: "Plateforme premium de gestion administrative photovoltaïque",
  title: "L'infrastructure administrative des installateurs photovoltaïques.",
  titleVariants: [
    "Externalisez l'administratif. Accélérez vos chantiers.",
    "Une exécution administrative au niveau de vos installations.",
  ],
  subtitle:
    "Déclaration préalable, Consuel et raccordement orchestrés dans un flux unique, lisible et rigoureux.",
  primaryCta: {
    label: "Planifier un échange de 15 minutes",
    href: "/contact",
    track: "cta_hero_primary",
  },
  secondaryCta: {
    label: "Voir les services",
    href: "/services",
    track: "cta_hero_secondary",
  },
  proofs: [
    "+1000 dossiers traités",
    "+50 installateurs partenaires",
    "Cadrage moyen 6 jours",
  ],
  preview: {
    label: "Portail Sunelys",
    title: "Un cockpit administratif en temps réel",
    columns: [
      {
        heading: "Dossiers en cours",
        items: [
          { name: "DP - Site Horizon", status: "Déposé" },
          { name: "Consuel - Lot B12", status: "Pré-contrôle" },
        ],
      },
      {
        heading: "Alertes",
        items: [
          { name: "Pièce manquante", status: "Raccordement C4" },
          { name: "Validation attendue", status: "Consuel B12" },
        ],
      },
      {
        heading: "Avancement",
        items: [
          { name: "Dossiers clôturés", status: "32 ce mois-ci" },
          { name: "SLA conformité", status: "97%" },
        ],
      },
    ],
    footer: "Suivi unifié installateur + client, avec traçabilité complète.",
  },
};

export const proofSectionData = {
  kicker: "Crédibilité",
  title: "Ils nous confient leurs flux administratifs.",
  logos: [
    { name: "Logo partenaire (placeholder)", src: "" },
    { name: "Logo partenaire (placeholder)", src: "" },
    { name: "Logo partenaire (placeholder)", src: "" },
    { name: "Logo partenaire (placeholder)", src: "" },
  ],
  metrics: [
    { value: "+1000", label: "dossiers photovoltaïques traités" },
    { value: "+50", label: "installateurs partenaires" },
    { value: "6j", label: "cadrage moyen" },
  ],
  testimonial: {
    quote:
      "Placeholder témoignage: à remplacer par un retour client validé, nominatif ou anonymisé.",
    author: "Installateur photovoltaïque",
    note: "Bloc éditable dans src/data/home.ts",
  },
};

export const frictionSectionData = {
  kicker: "Frictions terrain",
  title: "L'administratif devient vite un goulot d'étranglement.",
  cards: [
    {
      title: "DP incomplètes ou refusées",
      consequence: "Retards de lancement et multiplication des échanges.",
      solution: "Sunelys structure le dossier en amont pour fiabiliser l'instruction.",
    },
    {
      title: "Délais Consuel",
      consequence: "Mise en service décalée et tension avec le client final.",
      solution: "Sunelys anticipe les pièces et suit la conformité jusqu'à validation.",
    },
    {
      title: "Raccordement mal piloté",
      consequence: "Perte de visibilité sur l'avancement et les dépendances.",
      solution: "Sunelys centralise les étapes Enedis dans un flux lisible.",
    },
    {
      title: "Temps perdu par vos équipes",
      consequence: "Commerciaux et conducteurs détournés de la production utile.",
      solution: "Sunelys prend la charge administrative pour libérer vos ressources.",
    },
  ],
  closing:
    "Résultat: des dossiers plus robustes, des délais mieux maîtrisés et une expérience client plus fluide.",
};

export const processSectionData = {
  kicker: "Comment ça marche",
  title: "Une méthode simple, claire et pilotable.",
  steps: [
    {
      title: "Vous transmettez le dossier",
      text: "Données projet et pièces initiales sont consolidées dès l'entrée en flux.",
    },
    {
      title: "Sunelys pilote les démarches",
      text: "DP, Consuel et raccordement sont orchestrés selon un standard de qualité unique.",
    },
    {
      title: "Vous suivez l'avancement",
      text: "Statuts, points de blocage et prochaines actions restent visibles en continu.",
    },
    {
      title: "Le dossier avance sans friction",
      text: "Moins d'imprévus administratifs, plus de maîtrise opérationnelle.",
    },
  ],
};

export const servicesSectionData = {
  kicker: "Services",
  title: "Des blocs de service pensés comme des produits.",
  cards: [
    {
      label: "Service 01",
      title: "Déclaration préalable",
      benefit: "Des dossiers mieux cadrés pour limiter les retours.",
      description:
        "Constitution, contrôle et suivi mairie pour sécuriser les phases de démarrage chantier.",
      ctaLabel: "Voir le service",
      href: "/gestion-administrative-photovoltaique",
      track: "cta_service_dp",
    },
    {
      label: "Service 02",
      title: "Consuel",
      benefit: "Une conformité anticipée pour réduire les délais.",
      description:
        "Préparation documentaire et pilotage du dossier jusqu'à la validation finale.",
      ctaLabel: "Voir le service",
      href: "/dossier-consuel-photovoltaique",
      track: "cta_service_consuel",
    },
    {
      label: "Service 03",
      title: "Raccordement",
      benefit: "Un suivi réseau centralisé, plus lisible et plus stable.",
      description:
        "Coordination administrative des étapes Enedis avec traçabilité complète.",
      ctaLabel: "Voir le service",
      href: "/raccordement-enedis-photovoltaique",
      track: "cta_service_enedis",
    },
  ],
};

export const portalSectionData = {
  kicker: "Portail Sunelys",
  title: "Une logique de plateforme, pas seulement une prestation.",
  text: "Le portail centralise vos dossiers, vos pièces et vos validations pour garder une vision claire à chaque étape.",
  benefits: [
    "Suivi des dossiers en temps réel",
    "Centralisation des pièces administratives",
    "Traçabilité complète des actions",
  ],
  cta: {
    label: "Découvrir le portail",
    href: "https://portail.sunelys.fr/login",
    track: "cta_portal_section",
  },
};

export const caseStudySectionData = {
  kicker: "Cas client",
  title: "Une étude de cas pensée pour la preuve, pas pour l'effet marketing.",
  client: "Installateur régional (anonymisé)",
  context: "Volume: 20+ dossiers / mois",
  narrative:
    "Après mise en place d'un pilotage administratif structuré, l'équipe a réduit les blocages récurrents et gagné en visibilité sur l'ensemble du pipeline.",
  results: [
    { value: "Moins de retours", label: "dossiers plus complets à l'envoi" },
    { value: "Plus de lisibilité", label: "statuts clairs pour les équipes" },
    { value: "Charge allégée", label: "temps interne mieux utilisé" },
  ],
  note: "Résultats détaillés à compléter avec vos données validées.",
  cta: {
    label: "Parler de votre contexte",
    href: "/contact",
    track: "cta_case_study",
  },
};

export const visionSectionData = {
  kicker: "Vision",
  title: "L'administratif photovoltaïque ne devrait jamais ralentir un installateur.",
  text:
    "Sunelys transforme les démarches en infrastructure fluide: un système clair, fiable et orienté performance opérationnelle.",
};

export const finalCtaSectionData = {
  kicker: "Dernière étape",
  title: "Faites le point sur vos flux administratifs en 15 minutes.",
  text:
    "Un échange rapide pour identifier vos points de friction, estimer les gains possibles et voir si Sunelys est adapté à votre organisation.",
  primaryCta: {
    label: "Planifier un échange",
    href: "/contact",
    track: "cta_final_primary",
  },
  secondaryCta: {
    label: "Réserver un échange",
    href: "/contact",
    track: "cta_final_secondary",
  },
};
