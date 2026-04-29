const bookingUrl = import.meta.env.PUBLIC_BOOKING_URL || "https://calendly.com/contact-sunelys/30min";
const leadFormAction = import.meta.env.PUBLIC_LEAD_FORM_ACTION || "https://formsubmit.co/contact@sunelys.fr";
const leadSuccessUrl = "https://sunelys.fr/merci?source=hero-lead";

export const homeSeo = {
  title: "Gestion administrative photovoltaïque France | Sunelys",
  description:
    "Sunelys externalise la gestion administrative photovoltaïque pour les professionnels du solaire : DP, Consuel, raccordement Enedis, suivi et accompagnement administratif solaire en France.",
};

export const heroData = {
  kicker: "Pour installateurs photovoltaïques et structures qui traitent du volume",
  title: "DP, Consuel, raccordement :\nreprenez la main sur vos dossiers.",
  titleVariants: [
    "Externalisez l'administratif solaire. Accélérez vos dossiers.",
    "Moins de charge administrative. Plus de dossiers photovoltaïques maîtrisés.",
  ],
  subtitle:
    "Transmettez une demande complète sous 2 jours et suivez DP, Consuel, raccordement dans un portail dédié. Sunelys cadre, suit et pilote vos démarches administratives photovoltaïques en France.",
  primaryCta: {
    label: "Recevoir un cadrage gratuit",
    href: "#hero-lead-form",
    track: "cta_hero_form_focus",
  },
  secondaryCta: {
    label: "Réserver un audit Calendly",
    href: bookingUrl,
    track: "cta_hero_calendly_secondary",
  },
  leadForm: {
    action: leadFormAction,
    successUrl: leadSuccessUrl,
    submitLabel: "Recevoir un cadrage gratuit",
    note: "Réponse sous 24h • Sans engagement",
  },
  proofs: [
    "Demande complète sous 2 jours — DP, Consuel et raccordement centralisés dans votre portail dédié.",
  ],
  portalDemo: {
    label: "Voir une démo du portail →",
    href: "/images/site/portal-overview-2026-04-23.png",
    track: "cta_hero_portal_demo",
  },
  ctaNote: "Cadrage sans engagement pour qualifier votre volume, vos blocages et le périmètre à déléguer.",
  preview: {
    variant: "full",
    label: "Portail Sunelys",
    title: "Pilotage administratif en temps réel",
    projects: [
      { name: "Projet Martin", progress: "DP déposée", status: "DP validée" },
      { name: "Projet Dubois", progress: "Consuel en attente", status: "Consuel en cours" },
      { name: "Projet Leroy", progress: "Raccordement Enedis", status: "Raccordement planifié" },
    ],
    timeline: ["Cadrage", "Dépôt DP", "Consuel", "Raccordement", "Mise en service"],
    documents: ["Plan de masse signé", "Schéma unifilaire", "Attestation installateur", "Photos chantier"],
    footer: "Dossiers, pièces, statuts et relances centralisés dans un seul espace.",
  },
};

export const proofSectionData = {
  kicker: "Preuve et réassurance",
  title: "Des flux administratifs pilotés à grande échelle.",
  logos: [
    {
      name: "Sunwatt France",
      src: "/images/site/client-sunwatt-france.png",
    },
    {
      name: "Terra ENR",
      src: "/images/site/client-terra-enr.png",
    },
    {
      name: "Groupe Solarenov",
      src: "/images/site/client-groupe-solarenov.png",
    },
    {
      name: "Ensol",
      src: "/images/site/client-ensol.webp",
    },
    {
      name: "Be Travaux",
      src: "/images/site/client-betravaux.png",
    },
  ],
  trustNote:
    "Des installateurs et structures solaires s'appuient sur Sunelys pour cadrer les pièces, suivre les statuts et garder une exécution administrative lisible.",
  metrics: [
    { value: "+5000", label: "dossiers photovoltaïques pilotés" },
    { value: "+50", label: "partenaires et installateurs accompagnés" },
    { value: "2 jours", label: "pour transmettre une demande complète" },
  ],
  testimonials: [
    {
      quote:
        "Nous sommes ravis des services de Sunelys. Les dossiers sont cadrés sérieusement, les déclarations préalables avancent avec un très haut niveau d'acceptation sans pièces complémentaires, et nous gardons la tranquillité d'esprit d'être en règle sur tout l'administratif.",
      author: "Damien Guillaume - dirigeant, SUN WATT FRANCE",
      note: "Témoignage publié avec l'accord de Damien Guillaume.",
    },
  ],
};

export const frictionSectionData = {
  kicker: "Le problème",
  title: "Les démarches administratives ralentissent votre croissance commerciale.",
  cards: [
    {
      title: "Temps perdu",
      consequence: "Commerciaux et conducteurs de travaux passent trop de temps à relancer, vérifier et compléter les pièces.",
      solution: "Sunelys absorbe cette charge pour recentrer vos équipes sur la vente, le suivi client et le terrain.",
    },
    {
      title: "Dossiers incomplets",
      consequence: "Une pièce manquante ou une erreur de cadrage crée des retours, des blocages et des délais supplémentaires.",
      solution: "Sunelys contrôle la qualité documentaire avant dépôt pour limiter les refus et les allers-retours.",
    },
    {
      title: "Délais mal maîtrisés",
      consequence: "DP, Consuel et raccordement Enedis avancent chacun avec leurs contraintes, parfois sans visibilité claire.",
      solution: "Sunelys suit les étapes, les statuts et les relances dans une logique de pilotage continu.",
    },
    {
      title: "Volume difficile à absorber",
      consequence: "Quand les dossiers augmentent, l'administratif devient un frein direct à la capacité commerciale.",
      solution: "Sunelys structure une sous-traitance administrative solaire simple, récurrente et scalable.",
    },
  ],
  closing:
    "L'enjeu n'est pas seulement de déléguer des tâches. C'est de sécuriser un flux administratif complet sans ralentir vos ventes ni vos chantiers.",
};

export const solutionSectionData = {
  kicker: "La solution Sunelys",
  title: "Une équipe dédiée pour piloter vos démarches de bout en bout.",
  text:
    "Sunelys devient votre relais administratif photovoltaïque. Nous réceptionnons les informations, vérifions les pièces, préparons les dossiers, suivons les échanges et gardons une traçabilité claire jusqu'à la validation.",
  points: [
    {
      title: "Cadrage administratif",
      text: "Nous identifions les pièces attendues, les risques de blocage et les priorités dossier par dossier.",
    },
    {
      title: "Dépôts et échanges",
      text: "Nous préparons les formalités et suivons les demandes auprès des interlocuteurs concernés.",
    },
    {
      title: "Suivi opérationnel",
      text: "Vous gardez une vision claire des statuts, des relances et des prochaines actions.",
    },
    {
      title: "Relation professionnelle",
      text: "Un accompagnement administratif solaire sobre, fiable, aligné avec votre niveau d'exigence client.",
    },
  ],
  cta: {
    label: "Recevoir un cadrage gratuit",
    href: "/contact?source=solution#contact-form",
    track: "cta_solution",
  },
};

export const benefitsSectionData = {
  kicker: "Bénéfices métier",
  title: "Une externalisation administrative solaire qui améliore votre capacité d'exécution.",
  text:
    "Le rôle de Sunelys est simple : réduire la charge interne, fluidifier les dossiers et vous aider à absorber plus de volume sans perdre en qualité.",
  items: [
    {
      title: "Gain de temps",
      text: "Vos équipes passent moins de temps sur les pièces, les relances et les suivis administratifs.",
    },
    {
      title: "Meilleure organisation",
      text: "Chaque dossier avance avec un cadre clair, des statuts lisibles et des priorités identifiées.",
    },
    {
      title: "Externalisation simple",
      text: "Vous déléguez les démarches sans créer une organisation lourde ni multiplier les outils.",
    },
    {
      title: "Traitement fluide",
      text: "DP, Consuel et raccordement sont pilotés dans une logique continue, pas en silos.",
    },
    {
      title: "Partenaire fiable",
      text: "Un interlocuteur administratif professionnel, réactif et habitué aux contraintes photovoltaïques.",
    },
  ],
  cta: {
    label: "Recevoir un cadrage gratuit",
    href: "/contact?source=benefices#contact-form",
    track: "cta_benefits",
  },
};

export const audienceSectionData = {
  kicker: "Pour qui",
  title: "Pensé pour les structures solaires qui veulent traiter plus de dossiers sans surcharge.",
  text:
    "Sunelys accompagne les professionnels qui ont besoin d'un relais administratif fiable, structuré et capable de suivre un flux récurrent.",
  items: [
    {
      title: "Sociétés commercialistes du solaire",
      text: "Vous générez des ventes et souhaitez éviter que l'administratif ralentisse la transformation chantier.",
    },
    {
      title: "Professionnels du photovoltaïque",
      text: "Vous voulez sécuriser DP, Consuel et raccordement sans mobiliser vos équipes sur chaque relance.",
    },
    {
      title: "Structures qui traitent du volume",
      text: "Vous avez besoin d'un flux clair, répétable et traçable pour absorber davantage de dossiers.",
    },
  ],
  note:
    "Le bon moment pour nous parler : quand les relances, les pièces manquantes ou le volume commencent à grignoter le temps commercial et opérationnel.",
  cta: {
    label: "Recevoir un cadrage gratuit",
    href: "/contact?source=audience#contact-form",
    track: "cta_audience_primary",
  },
};

export const quizSectionData = {
  kicker: "Diagnostic rapide",
  title: "Combien de dossiers devez-vous absorber chaque mois ?",
  question: "Sélectionnez votre volume pour recevoir un cadrage adapté à votre organisation.",
  options: [
    {
      value: "1-10",
      label: "1-10 dossiers",
      message:
        "Votre priorité est probablement de sécuriser les dépôts sans complexifier l'organisation. On peut cadrer les tâches à déléguer et le bon niveau d'accompagnement en 15 minutes.",
    },
    {
      value: "10-30",
      label: "10-30 dossiers",
      message:
        "À ce volume, les retours administratifs et les relances commencent à peser. Sunelys peut structurer un flux récurrent et plus lisible.",
    },
    {
      value: "+30",
      label: "+30 dossiers",
      message:
        "Votre enjeu est l'industrialisation : priorisation, visibilité, qualité documentaire et capacité à absorber le flux sans surcharge interne.",
    },
  ],
  leadForm: {
    action: leadFormAction,
  },
  ctaLabel: "Réserver un audit Calendly en option",
  ctaHref: bookingUrl,
};

export const processSectionData = {
  kicker: "Process",
  title: "Un parcours simple, lisible, sans friction inutile.",
  steps: [
    {
      title: "Prise de contact",
      text: "Vous nous présentez votre volume, vos irritants et les démarches à externaliser.",
    },
    {
      title: "Analyse du besoin",
      text: "Nous cadrons les flux, les pièces attendues, les priorités et les modes de suivi.",
    },
    {
      title: "Gestion des démarches",
      text: "Sunelys pilote DP, Consuel, raccordement et échanges administratifs selon le périmètre retenu.",
    },
    {
      title: "Suivi continu",
      text: "Vous gardez une vision claire des statuts, des blocages et des prochaines actions.",
    },
  ],
};

export const servicesSectionData = {
  kicker: "Services",
  title: "Les démarches administratives photovoltaïques que vous pouvez déléguer.",
  cards: [
    {
      label: "Service 01",
      title: "Déclaration préalable",
      benefit: "Des dossiers complets pour limiter les refus et sécuriser le lancement chantier.",
      description:
        "Constitution, vérification des pièces, dépôt et suivi mairie jusqu'au retour administratif.",
      ctaLabel: "Voir le service",
      href: "/declaration-prealable-panneaux-solaires",
      track: "cta_service_dp",
    },
    {
      label: "Service 02",
      title: "Consuel",
      benefit: "Un suivi structuré pour réduire les retours et accélérer les mises en service.",
      description:
        "Préparation du dossier, coordination des pièces, suivi des demandes et accompagnement jusqu'à validation.",
      ctaLabel: "Voir le service",
      href: "/dossier-consuel-photovoltaique",
      track: "cta_service_consuel",
    },
    {
      label: "Service 03",
      title: "Raccordement",
      benefit: "Une coordination Enedis plus lisible pour mieux maîtriser les délais réseau.",
      description:
        "Suivi des étapes, relances, pièces attendues et traçabilité complète du parcours raccordement.",
      ctaLabel: "Voir le service",
      href: "/raccordement-enedis-photovoltaique",
      track: "cta_service_enedis",
    },
  ],
};

export const portalSectionData = {
  kicker: "Portail Sunelys",
  title: "Un suivi clair pour vos équipes et vos clients.",
  text: "Le portail centralise les dossiers, les pièces et les validations pour rendre l'administratif plus lisible, plus traçable et plus facile à piloter.",
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
  image: {
    src: "/images/site/portal-overview-2026-04-23.png",
    alt: "Vue d'ensemble du portail Sunelys avec synthèse des dossiers, pièces à transmettre et demandes de documents.",
  },
  secondaryImage: {
    src: "/images/site/portal-dossiers-2026-04-23.png",
    alt: "Liste des dossiers existants dans le portail Sunelys avec progression et prochaine étape visibles.",
  },
};

export const caseStudySectionData = {
  kicker: "Cas client",
  title: "SUN WATT FRANCE : une gestion DP plus fluide, plus propre et plus rassurante.",
  client: "Damien Guillaume, dirigeant - SUN WATT FRANCE",
  context: "Témoignage nominatif validé pour publication",
  narrative:
    "Pour SUN WATT FRANCE, la valeur perçue ne tient pas seulement à la délégation administrative. Elle tient aussi à la qualité des dépôts, à l'absence de pièces complémentaires sur les dossiers bien cadrés, et à la tranquillité d'esprit de savoir les démarches suivies sérieusement et en règle.",
  results: [
    { value: "DP accordées", label: "avec un très haut niveau de validation sur les dossiers cadrés" },
    { value: "0 pièce", label: "complémentaire sur les dépôts correctement préparés" },
    { value: "Esprit tranquille", label: "sur la conformité administrative et le suivi des démarches" },
  ],
  note:
    "Focus mis sur la qualité des dépôts et la sérénité opérationnelle plutôt que sur une simple baisse de charge interne.",
  secondaryCase: {
    title: "Autre retour terrain",
    quote:
      "Nous sommes ravis des délais, du suivi et de la réactivité de Sunelys. Le pilotage est plus fluide, les réponses arrivent vite et cela nous permet d'installer nos chantiers beaucoup plus rapidement.",
    author: "Victorion Brice - gérant, Be Travaux",
  },
  cta: {
    label: "Parler de votre contexte",
    href: "/contact?source=cas-client",
    track: "cta_case_study",
  },
};

export const visionSectionData = {
  kicker: "Positionnement",
  title: "L'administratif photovoltaïque ne devrait jamais limiter votre croissance.",
  text:
    "Sunelys transforme les démarches en flux clair : une sous-traitance administrative solaire professionnelle, pensée pour la qualité, la réactivité et la continuité opérationnelle.",
};

export const faqSectionData = {
  kicker: "Questions fréquentes",
  title: "Les réponses clés avant de déléguer votre administratif solaire.",
  items: [
    {
      question: "Travaillez-vous partout en France ?",
      answer:
        "Oui. Sunelys accompagne les démarches administratives photovoltaïques en France, avec un suivi à distance structuré et des échanges centralisés.",
    },
    {
      question: "Faites-vous l'installation photovoltaïque ?",
      answer:
        "Non. Sunelys ne réalise pas les installations. Nous intervenons comme partenaire administratif pour les professionnels du solaire : DP, Consuel, raccordement et suivi documentaire.",
    },
    {
      question: "Comment fonctionne la tarification ?",
      answer:
        "La tarification dépend du volume, des démarches à déléguer et du niveau de suivi attendu. Le plus simple est de planifier un échange pour cadrer un devis adapté.",
    },
    {
      question: "Quels types de clients accompagnez-vous ?",
      answer:
        "Nous accompagnons principalement des sociétés commercialistes du solaire, installateurs photovoltaïques et structures qui traitent un volume régulier de dossiers.",
    },
    {
      question: "Pouvez-vous reprendre des dossiers déjà en cours ?",
      answer:
        "Oui, selon l'état du dossier et les pièces disponibles. Nous commençons par analyser le contexte pour identifier ce qui peut être repris proprement.",
    },
  ],
};

export const finalCtaSectionData = {
  kicker: "Passage à l'action",
  title: "Recevez un cadrage gratuit pour vos flux administratifs.",
  text:
    "Transmettez votre volume et vos blocages : nous revenons vers vous avec une lecture claire du périmètre à déléguer en priorité.",
  primaryCta: {
    label: "Recevoir un cadrage gratuit",
    href: "/contact?source=final#contact-form",
    track: "cta_final_form_primary",
  },
  secondaryCta: {
    label: "Réserver un audit Calendly en option",
    href: bookingUrl,
    track: "cta_final_calendar_secondary",
  },
  contactPoints: [
    {
      label: "Formulaire",
      value: "Reponse sous 24h ouvrées",
      href: "/contact?source=formulaire-final#contact-form",
      track: "cta_final_form",
    },
    {
      label: "Calendly",
      value: "Créneau optionnel après cadrage",
      href: bookingUrl,
      track: "cta_final_calendar",
    },
    {
      label: "Téléphone",
      value: "06 95 90 79 19",
      href: "tel:+33695907919",
      track: "cta_final_phone",
    },
  ],
};
