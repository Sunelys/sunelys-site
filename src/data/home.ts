export const homeSeo = {
  title: "Sunelys | Infrastructure administrative photovoltaïque pour installateurs",
  description:
    "Sunelys pilote DP, Consuel et raccordement de bout en bout pour alléger la charge administrative et accélérer les chantiers photovoltaïques.",
};

export const heroData = {
  kicker: "Plateforme administrative photovoltaïque",
  title: "L'infrastructure administrative\ndes installateurs photovoltaïques.",
  titleVariants: [
    "L'infrastructure administrative des installateurs photovoltaïques.",
    "Une exécution administrative au niveau de vos installations.",
  ],
  subtitle:
    "Sunelys orchestre les démarches administratives du solaire : déclarations préalables, Consuel et raccordement Enedis. Vos équipes installent. Nous gérons l'administratif.",
  primaryCta: {
    label: "Planifier un échange",
    href: "/contact",
    track: "cta_hero_primary",
  },
  secondaryCta: {
    label: "Découvrir le fonctionnement",
    href: "/parcours",
    track: "cta_hero_secondary",
  },
  proofs: [
    "+1000 dossiers traités",
    "+50 installateurs partenaires",
    "Cadrage moyen 6 jours",
  ],
  preview: {
    label: "Portail Sunelys",
    title: "Pilotage administratif en temps réel",
    projects: [
      { name: "Projet Martin", progress: "DP déposée", status: "DP validée" },
      { name: "Projet Dubois", progress: "Consuel en attente", status: "Consuel en cours" },
      { name: "Projet Leroy", progress: "Raccordement Enedis", status: "Raccordement planifié" },
    ],
    timeline: ["Cadrage", "Dépôt DP", "Consuel", "Raccordement", "Mise en service"],
    documents: ["Plan de masse signé", "Schéma unifilaire", "Attestation installateur", "Photos chantier"],
    footer: "Timeline administrative, pièces jointes et statuts centralisés dans un seul espace.",
  },
};

export const proofSectionData = {
  kicker: "Ils nous font confiance",
  title: "Une exécution administrative robuste, à l'échelle des installateurs exigeants.",
  logos: [
    { name: "Partenaire 01 (logo à remplacer)", src: "" },
    { name: "Partenaire 02 (logo à remplacer)", src: "" },
    { name: "Partenaire 03 (logo à remplacer)", src: "" },
    { name: "Partenaire 04 (logo à remplacer)", src: "" },
  ],
  metrics: [
    { value: "+1000", label: "dossiers photovoltaïques pilotés" },
    { value: "+50", label: "installateurs partenaires actifs" },
    { value: "6j", label: "cadrage administratif moyen" },
  ],
  testimonial: {
    quote:
      "Sunelys nous a permis de reprendre le contrôle des délais administratifs sans alourdir nos équipes terrain.",
    author: "Installateur partenaire (anonymisé) - Région Sud",
    note: "Témoignage à valider/remplacer dans src/data/home.ts",
  },
};

export const frictionSectionData = {
  kicker: "Les points de friction",
  title: "Les démarches administratives ralentissent votre croissance.",
  cards: [
    {
      title: "DP refusées",
      consequence: "Retards de lancement et cycle de validation allongé.",
      solution: "Sunelys verrouille la qualité documentaire en amont.",
    },
    {
      title: "Délais Consuel",
      consequence: "Mises en service repoussées et tension client.",
      solution: "Sunelys anticipe les pièces et pilote les validations.",
    },
    {
      title: "Raccordement Enedis",
      consequence: "Dépendances mal visibles et coordination fragile.",
      solution: "Sunelys centralise chaque étape réseau dans un workflow unique.",
    },
    {
      title: "Gestion chronophage",
      consequence: "Vos équipes commerciales et travaux perdent du temps utile.",
      solution: "Sunelys prend en charge la mécanique administrative.",
    },
  ],
  closing:
    "Sunelys prend la mécanique administrative en charge. Vous gardez la relation commerciale et la maîtrise de vos chantiers.",
};

export const processSectionData = {
  kicker: "Comment ça marche",
  title: "Un workflow en 4 étapes, pensé pour rester fluide.",
  steps: [
    {
      title: "Vous transmettez le dossier",
      text: "Informations chantier et pièces initiales sont centralisées dès l'entrée en flux.",
    },
    {
      title: "Sunelys pilote les démarches",
      text: "DP, Consuel et raccordement sont orchestrés selon un standard documentaire unique.",
    },
    {
      title: "Vous suivez l'avancement",
      text: "Statuts, alertes et prochaines actions restent visibles dans le portail.",
    },
    {
      title: "Le dossier avance sans friction",
      text: "Moins de retours, moins d'aléas, plus de maîtrise opérationnelle.",
    },
  ],
};

export const servicesSectionData = {
  kicker: "Services",
  title: "Trois services structurants pour industrialiser vos flux.",
  cards: [
    {
      label: "Service 01",
      title: "Déclaration préalable",
      benefit: "Des dossiers complets pour limiter les refus et les retours.",
      description:
        "Constitution, contrôle qualité et suivi mairie pour sécuriser chaque démarrage chantier.",
      ctaLabel: "Voir le service",
      href: "/declaration-prealable-panneaux-solaires",
      track: "cta_service_dp",
    },
    {
      label: "Service 02",
      title: "Consuel",
      benefit: "Une conformité anticipée pour accélérer les mises en service.",
      description:
        "Préparation des pièces, suivi des retours et pilotage jusqu'à la validation finale.",
      ctaLabel: "Voir le service",
      href: "/dossier-consuel-photovoltaique",
      track: "cta_service_consuel",
    },
    {
      label: "Service 03",
      title: "Raccordement",
      benefit: "Un suivi Enedis centralisé pour mieux maîtriser les délais.",
      description:
        "Coordination administrative de bout en bout avec traçabilité complète de chaque jalon.",
      ctaLabel: "Voir le service",
      href: "/raccordement-enedis-photovoltaique",
      track: "cta_service_enedis",
    },
  ],
};

export const portalSectionData = {
  kicker: "Portail Sunelys",
  title: "Une plateforme dédiée à la qualité d'exécution administrative.",
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
  title: "Industrialiser les dossiers sans dégrader la qualité d'expérience client.",
  client: "Installateur multi-agences (anonymisé)",
  context: "Volume moyen: 20+ dossiers/mois",
  narrative:
    "Après déploiement du pilotage Sunelys, l'équipe a réduit les points de blocage administratifs et sécurisé ses délais de mise en service.",
  results: [
    { value: "Moins de retours", label: "dossiers plus complets dès l'envoi" },
    { value: "Plus de visibilité", label: "suivi unifié pour les équipes internes" },
    { value: "Charge allégée", label: "temps commercial recentré sur la vente" },
  ],
  note: "Version anonymisée. Remplacez ce bloc par vos résultats validés.",
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
    "Sunelys transforme les démarches en infrastructure fluide : un système clair, fiable et traçable, aligné avec vos standards de production.",
};

export const finalCtaSectionData = {
  kicker: "Plan d'action rapide",
  title: "Planifier un échange de 15 minutes.",
  text:
    "Un échange court pour cadrer vos points de friction, estimer les gains possibles et valider si Sunelys s'intègre à votre organisation.",
  primaryCta: {
    label: "Planifier un échange de 15 minutes",
    href: "/contact",
    track: "cta_final_primary",
  },
  secondaryCta: {
    label: "Voir les services",
    href: "/services",
    track: "cta_final_secondary",
  },
};
