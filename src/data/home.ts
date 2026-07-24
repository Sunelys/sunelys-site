const bookingUrl = import.meta.env.PUBLIC_BOOKING_URL || "https://calendly.com/contact-sunelys/30min";
const leadFormAction = import.meta.env.PUBLIC_LEAD_FORM_ACTION || "/api/leads";

export const homeSeo = {
  title: "Gestion administrative photovoltaïque | Sunelys",
  description:
    "Sunelys reprend vos dossiers administratifs photovoltaïques bloqués ou chronophages : DP, Consuel, raccordement, EDF OA, MaPrimeRénov' et CEE.",
};

export const heroData = {
  kicker: "Cabinet administratif photovoltaïque",
  title: "Reprenez le contrôle de vos dossiers administratifs PV.",
  subtitle:
    "DP, Consuel, raccordement, EDF OA et aides : Sunelys reprend les démarches qui ralentissent vos équipes et vos chantiers.",
  expertLine:
    "Dossier ponctuel, pic de charge ou flux récurrent, avec un portail et un interlocuteur unique.",
  primaryCta: {
    label: "Recevoir un diagnostic sous 24h",
    href: "/contact?source=hero#contact-form",
    track: "cta_hero_primary_contact",
  },
  secondaryCta: {
    label: "Voir les tarifs fixes",
    href: "/tarifs",
    track: "cta_hero_secondary_pricing",
  },
  leadForm: {
    action: leadFormAction,
    successUrl: "https://sunelys.fr/merci?source=homepage_hero_form",
    submitLabel: "Recevoir mon diagnostic sous 24h",
    note: "3 informations essentielles. Aucun engagement.",
  },
  proofs: [
    "1 357 dossiers ENR pilotés",
    "96 % des DP sans pièce complémentaire",
    "Réponse sous 24h ouvrées",
  ],
  portalDemo: {
    label: "Voir un aperçu du portail →",
    href: "/google-business-profile/sunelys-gbp-portail-dashboard-propre-2026-07-21.jpg",
    track: "cta_hero_portal_demo",
  },
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
    footer: "Dossiers, aides, pièces, statuts et relances centralisés dans un seul espace.",
  },
};

export const trustSectionData = {
  kicker: "Déjà sur le terrain",
  title: "Des dossiers solaires suivis pour des installateurs qui avancent.",
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
    "Sunelys accompagne des installateurs et structures solaires qui veulent garder des dossiers propres, des dépôts mieux cadrés et des clients informés sans mobiliser leurs équipes à chaque relance.",
  metrics: [
    { value: "1357", label: "Dossiers ENR pilotés avec traçabilité" },
    { value: "28", label: "Partenaires et installateurs déjà accompagnés" },
    { value: "2 jours", label: "Pour cadrer une demande complète et exploitable" },
    { value: "96%", label: "Taux d'acceptation des déclarations préalables sans pièce complémentaire" },
  ],
};

export const proofSectionData = {
  kicker: "Retours terrain",
  title: "Ce que les installateurs gagnent quand le suivi administratif tient la route.",
  testimonials: [
    {
      quote:
        "Nous sommes ravis des services de Sunelys. Les dossiers sont cadrés sérieusement, les déclarations préalables avancent avec un très haut niveau d'acceptation sans pièces complémentaires, et nous gardons la tranquillité d'esprit d'être en règle sur tout l'administratif.",
      author: "Damien Guillaume - dirigeant, SUN WATT FRANCE",
      note: "Témoignage nominatif publié avec accord.",
    },
    {
      quote:
        "Nous sommes ravis des délais, du suivi et de la réactivité de Sunelys. Le pilotage est plus fluide, les réponses arrivent vite et cela nous permet d'installer nos chantiers beaucoup plus rapidement.",
      author: "Victorion Brice - gérant, Be Travaux",
      note: "Retour terrain publié avec accord.",
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
  title: "Un relais administratif fiable pour votre pilotage complet.",
  text:
    "Sunelys devient votre relais administratif ENR pour piloter DP, Consuel, raccordement, MaPrimeRénov' et CEE dans une seule logique de production.",
  points: [
    {
      title: "Cadrage administratif",
      text: "Nous identifions les pièces attendues, les risques de blocage et les priorités dossier par dossier.",
    },
    {
      title: "Dépôts et échanges",
      text: "Nous préparons les formalités, les dossiers d'aides et suivons les demandes auprès des interlocuteurs concernés.",
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
    label: "Recevoir un cadrage pilotage complet",
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
      text: "DP, Consuel, raccordement et aides à la rénovation sont pilotés dans une logique continue, pas en silos.",
    },
    {
      title: "Partenaire fiable",
      text: "Un interlocuteur administratif professionnel, réactif et habitué aux contraintes photovoltaïques.",
    },
  ],
  cta: {
    label: "Recevoir un cadrage pilotage complet",
    href: "/contact?source=benefices#contact-form",
    track: "cta_benefits",
  },
};

export const audienceSectionData = {
  kicker: "Pour qui",
  title: "Pensé pour les installateurs qui veulent déléguer sans se fermer de portes.",
  text:
    "Sunelys peut intervenir sur un dossier ponctuel, un pic de charge ou un flux récurrent. Le point commun n'est pas un volume minimum : c'est le besoin de reprendre le contrôle sur des démarches qui consomment trop de temps.",
  items: [
    {
      title: "Petit installateur en croissance",
      text: "Vous avez quelques dossiers par mois, mais chaque blocage DP, Consuel ou raccordement vous coûte déjà du temps et de l'énergie.",
    },
    {
      title: "Structure qui absorbe un pic de charge",
      text: "Vous devez sortir des dossiers rapidement sans dégrader le suivi, la relation client ou la qualité documentaire.",
    },
    {
      title: "Flux récurrent à structurer",
      text: "Vous avez besoin d'un cadre clair, répétable et traçable pour déléguer plus largement sans perdre la maîtrise.",
    },
  ],
  note:
    "Le bon moment pour nous parler : quand les relances, les pièces manquantes ou les statuts flous commencent à ralentir vos ventes, vos chantiers ou vos mises en service.",
  cta: {
    label: "Recevoir un diagnostic sous 24h",
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
        "Même avec un petit volume, un dossier bloqué peut coûter cher en temps et en relation client. On peut cibler une brique précise plutôt que tout déléguer.",
    },
    {
      value: "10-30",
      label: "10-30 dossiers",
      message:
        "C'est souvent le moment où l'administratif devient visible dans l'organisation. Un pilotage structuré aide à absorber plus de flux sans recruter trop vite.",
    },
    {
      value: "+30",
      label: "+30 dossiers",
      message:
        "À ce volume, chaque retour documentaire a un coût réel. Sunelys peut industrialiser votre flux et libérer vos équipes sur la vente.",
    },
  ],
  leadForm: {
    action: leadFormAction,
  },
  emailStepTitle: "Entrez votre email pour recevoir votre cadrage adapté",
  emailLabel: "Email professionnel",
  emailSubmitLabel: "Recevoir mon cadrage",
  emailNote: "Réponse sous 24h • Sans engagement",
  resultCtaLabel: "Réserver un diagnostic de 15 min →",
  ctaHref: bookingUrl,
  phoneLabel: "Ou on vous rappelle : 06 95 90 79 19",
  phoneHref: "tel:+33695907919",
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

export const methodSectionData = {
  kicker: "La méthode Sunelys",
  title: "Vous déléguez ce qui bloque. Vous gardez la visibilité.",
  text:
    "Sunelys reprend le bon périmètre au bon moment : un dossier ponctuel, un pic de charge ou un flux récurrent. Chaque étape reste cadrée, suivie et visible.",
  audiences: [
    {
      label: "Dossier ponctuel",
      text: "Débloquer une démarche précise sans engager tout votre flux.",
    },
    {
      label: "Pic de charge",
      text: "Absorber une série de dossiers sans désorganiser vos équipes.",
    },
    {
      label: "Flux récurrent",
      text: "Installer un cadre fiable, répétable et pilotable dans le temps.",
    },
  ],
  steps: processSectionData.steps,
  cta: {
    label: "Recevoir un diagnostic sous 24h",
    href: "/contact?source=method#contact-form",
    track: "cta_method_primary",
  },
};

export const servicesSectionData = {
  kicker: "Services",
  title: "Les démarches administratives photovoltaïques que vous pouvez déléguer.",
  pricing: {
    eyebrow: "Tarifs fixes",
    text: "Dossiers photovoltaïques à partir de 89 € HT, sans abonnement ni volume minimum.",
    href: "/tarifs",
    label: "Comparer les tarifs",
    track: "cta_services_pricing",
  },
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
    {
      label: "Service 04",
      title: "EDF OA",
      benefit: "Un espace producteur activé et un contrat d'achat suivi jusqu'à signature.",
      description:
        "Vérification des références, accompagnement à l'activation, suivi du dossier EDF OA et sécurisation de la signature client.",
      ctaLabel: "Voir l'offre",
      href: "/edf-oa",
      track: "cta_service_edf_oa",
    },
    {
      label: "Service 05",
      title: "MaPrimeRénov' + CEE",
      benefit: "Des dossiers d'aides montés et suivis jusqu'à validation.",
      description:
        "Éligibilité, dépôt ANAH, contrôle CEE, pièces client et suivi jusqu'au versement ou à la validation.",
      ctaLabel: "Voir les tarifs",
      href: "/tarifs#aides-renovation",
      track: "cta_service_aides_renovation",
    },
  ],
};

export const portalSectionData = {
  kicker: "Portail Sunelys",
  title: "Un portail utile, mais au service d'un vrai pilotage humain.",
  text: "Le portail centralise les dossiers, les pièces et les validations pour rendre l'administratif plus lisible, plus traçable et plus simple à piloter au quotidien.",
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
    src: "/google-business-profile/sunelys-gbp-portail-dashboard-propre-2026-07-21.jpg",
    alt: "Vue d'ensemble anonymisée du portail Sunelys avec synthèse des dossiers, pièces à transmettre et demandes de documents.",
  },
  secondaryImage: {
    src: "/google-business-profile/sunelys-gbp-portail-dossiers-propre-2026-07-21.jpg",
    alt: "Liste anonymisée des dossiers dans le portail Sunelys avec progression et prochaine étape visibles.",
  },
};

export const caseStudySectionData = {
  kicker: "Exemple de flux",
  title: "Quand un flux multi-agences est enfin piloté avec plus de tenue et moins de retours.",
  context: "Installateur multi-agences, 20-30 dossiers/mois, France.",
  narrative:
    "Sur ce type d'organisation, l'enjeu n'est pas seulement de gagner du temps. Il s'agit surtout d'absorber davantage de volume, de réduire les retours documentaires et de rendre les délais administratifs beaucoup plus lisibles pour toute l'équipe.",
  results: [
    { value: "-40%", label: "de dossiers retournés pour pièces incomplètes" },
    { value: "+18", label: "dossiers/mois absorbés sans charge interne supplémentaire" },
    { value: "8 jours", label: "délai moyen DP en jours ouvrés" },
  ],
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
        "Les tarifs transmis sont des prix unitaires par dossier selon le périmètre confié : DP complète, raccordement + Consuel, chaîne administrative complète, MaPrimeRénov', CEE ou pack MaPrimeRénov' + CEE.",
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
  title: "Faites diagnostiquer vos dossiers administratifs bloqués.",
  text:
    "Expliquez-nous votre volume, vos délais et vos blocages. Nous revenons vers vous avec le premier périmètre à reprendre en priorité, sans vous imposer un flux complet si un dossier ponctuel suffit.",
  primaryCta: {
    label: "Recevoir un diagnostic sous 24h",
    href: "/contact?source=final#contact-form",
    track: "cta_final_form_primary",
  },
  secondaryCta: {
    label: "Réserver 15 min en option",
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
      value: "Créneau optionnel après diagnostic",
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
