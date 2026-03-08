export interface FaqItem {
  question: string;
  answer: string;
}

export interface SeoPageData {
  slug: string;
  metaTitle: string;
  metaDescription: string;
  heroTitle: string;
  heroSubtitle: string;
  problemTitle: string;
  problemIntro: string;
  problemItems: Array<{ title: string; text: string }>;
  scopeItems: string[];
  processSteps: string[];
  caseStudy: {
    title: string;
    volume: string;
    results: string[];
  };
  faqItems: FaqItem[];
  finalTitle: string;
  finalText: string;
  internalLinks: Array<{ href: string; label: string }>;
}

export const seoPages: Record<string, SeoPageData> = {
  gestionAdministrative: {
    slug: "gestion_administrative",
    metaTitle: "Gestion administrative photovoltaïque pour installateurs | Sunelys",
    metaDescription:
      "Externalisez votre gestion administrative photovoltaïque avec Sunelys: constitution de dossier, vérification des pièces, suivi des démarches et coordination opérationnelle.",
    heroTitle: "Gestion administrative photovoltaïque pour installateurs",
    heroSubtitle:
      "Sunelys structure l'ensemble du parcours administratif solaire pour réduire la charge interne, fiabiliser les dossiers et accélérer les installations.",
    problemTitle: "Les démarches administratives ralentissent les installations photovoltaïques",
    problemIntro:
      "Entre délais, dossiers incomplets et allers-retours, les équipes installateurs perdent du temps sur des tâches critiques mais non productives.",
    problemItems: [
      {
        title: "Complexité documentaire",
        text: "Les pièces à collecter et à consolider varient selon les projets et créent des frictions récurrentes.",
      },
      {
        title: "Erreurs de dossier",
        text: "Les oublis de pièces ou incohérences ralentissent les validations administratives.",
      },
      {
        title: "Délais non maîtrisés",
        text: "Les étapes s'allongent quand les relances et le suivi ne sont pas pilotés de façon continue.",
      },
      {
        title: "Temps non facturable",
        text: "Commerciaux et conducteurs de travaux absorbent une charge administrative à faible valeur.",
      },
    ],
    scopeItems: [
      "Constitution des dossiers administratifs photovoltaïques",
      "Vérification des pièces techniques et réglementaires",
      "Échanges administratifs avec les organismes concernés",
      "Suivi des étapes et relances prioritaires",
      "Coordination avec les acteurs du dossier jusqu'à validation",
    ],
    processSteps: [
      "Brief dossier",
      "Constitution administrative",
      "Dépôt et suivi",
      "Validation finale",
    ],
    caseStudy: {
      title: "Installateur régional",
      volume: "30 dossiers / mois",
      results: [
        "Réduction du temps administratif mobilisé en interne",
        "Meilleure visibilité sur l'avancement de chaque dossier",
        "Moins de retours administratifs et de blocages",
      ],
    },
    faqItems: [
      {
        question: "Qu'est-ce que la gestion administrative photovoltaïque ?",
        answer:
          "C'est l'organisation complète des démarches nécessaires au bon déroulement d'un projet solaire: montage des dossiers, échanges administratifs et suivi des validations.",
      },
      {
        question: "À qui s'adresse ce service ?",
        answer:
          "Aux installateurs photovoltaïques qui veulent externaliser l'administratif pour se concentrer sur la vente, la production et la relation client.",
      },
      {
        question: "Sunelys peut-il gérer des volumes élevés de dossiers ?",
        answer:
          "Oui. La méthode Sunelys est pensée pour des flux réguliers et pour des organisations multi-agences.",
      },
      {
        question: "Quels bénéfices concrets pour un installateur ?",
        answer:
          "Moins de charge interne, des dossiers mieux cadrés, une meilleure maîtrise des délais et une expérience client plus fluide.",
      },
      {
        question: "Comment démarrer avec Sunelys ?",
        answer:
          "Un échange de cadrage permet d'analyser vos flux administratifs et de définir le niveau de prise en charge adapté.",
      },
    ],
    finalTitle: "Externalisez l'administratif photovoltaïque.",
    finalText:
      "Planifier un échange de 15 minutes pour identifier vos points de friction et estimer vos gains opérationnels.",
    internalLinks: [
      { href: "/services", label: "Voir les services" },
      { href: "/declaration-prealable-panneaux-solaires", label: "Déclaration préalable" },
      { href: "/dossier-consuel-photovoltaique", label: "Dossier Consuel" },
      { href: "/raccordement-enedis-photovoltaique", label: "Raccordement Enedis" },
    ],
  },
  consuel: {
    slug: "consuel_photovoltaique",
    metaTitle: "Consuel photovoltaïque : préparation et suivi des dossiers | Sunelys",
    metaDescription:
      "Sunelys gère la préparation et le suivi de vos dossiers Consuel photovoltaïques: pièces, coordination administrative et pilotage jusqu'à validation.",
    heroTitle: "Consuel photovoltaïque : préparation et suivi des dossiers",
    heroSubtitle:
      "Sunelys prend en charge le volet administratif Consuel pour sécuriser vos dossiers et accélérer la mise en service de vos installations.",
    problemTitle: "Les démarches administratives ralentissent les installations photovoltaïques",
    problemIntro:
      "Les retours Consuel, les pièces manquantes et les validations tardives pèsent directement sur vos délais de mise en service.",
    problemItems: [
      {
        title: "Dossiers incomplets",
        text: "Les oublis de pièces ralentissent les échanges et augmentent les cycles de correction.",
      },
      {
        title: "Conformité mal anticipée",
        text: "Un manque d'anticipation crée des points de blocage tardifs dans le parcours.",
      },
      {
        title: "Relances dispersées",
        text: "Sans pilotage dédié, les actions administratives ne sont pas priorisées efficacement.",
      },
      {
        title: "Charge interne élevée",
        text: "Les équipes opérationnelles absorbent le suivi Consuel au détriment du terrain.",
      },
    ],
    scopeItems: [
      "Constitution du dossier Consuel photovoltaïque",
      "Vérification de la conformité des pièces administratives",
      "Gestion des échanges et demandes de compléments",
      "Suivi des étapes jusqu'à l'attestation",
      "Coordination continue avec vos équipes",
    ],
    processSteps: [
      "Brief dossier",
      "Constitution administrative",
      "Dépôt et suivi",
      "Validation finale",
    ],
    caseStudy: {
      title: "Installateur régional",
      volume: "30 dossiers / mois",
      results: [
        "Moins de retours liés aux pièces manquantes",
        "Meilleure visibilité des statuts Consuel",
        "Accélération des mises en service",
      ],
    },
    faqItems: [
      {
        question: "Combien de temps prend un Consuel photovoltaïque ?",
        answer:
          "Le délai dépend du niveau de préparation du dossier et de la réactivité sur les éventuels compléments demandés.",
      },
      {
        question: "Quelles pièces sont nécessaires pour un dossier Consuel ?",
        answer:
          "Les pièces varient selon la configuration du projet; Sunelys vérifie leur complétude avant dépôt.",
      },
      {
        question: "Pourquoi externaliser la gestion du Consuel ?",
        answer:
          "Pour réduire les erreurs administratives, fluidifier les échanges et préserver le temps de vos équipes internes.",
      },
      {
        question: "Sunelys intervient-il sur des dossiers déjà engagés ?",
        answer:
          "Oui. Sunelys peut reprendre un dossier en cours pour remettre le suivi sous contrôle.",
      },
      {
        question: "Le service Consuel est-il adapté aux volumes élevés ?",
        answer:
          "Oui. Le modèle de pilotage est dimensionné pour des flux réguliers et des structures en croissance.",
      },
    ],
    finalTitle: "Externalisez l'administratif photovoltaïque.",
    finalText:
      "Planifier un échange de 15 minutes pour cadrer votre flux Consuel et réduire les délais de mise en service.",
    internalLinks: [
      { href: "/services", label: "Voir les services" },
      { href: "/gestion-administrative-photovoltaique", label: "Gestion administrative photovoltaïque" },
      { href: "/raccordement-enedis-photovoltaique", label: "Raccordement Enedis" },
      { href: "/contact", label: "Contacter Sunelys" },
    ],
  },
  raccordementEnedis: {
    slug: "raccordement_enedis",
    metaTitle: "Raccordement Enedis photovoltaïque : gestion administrative complète | Sunelys",
    metaDescription:
      "Sunelys pilote l'administratif du raccordement Enedis photovoltaïque: constitution du dossier, suivi des échanges et coordination jusqu'à validation.",
    heroTitle: "Raccordement Enedis photovoltaïque : gestion administrative complète",
    heroSubtitle:
      "Sunelys centralise les étapes administratives du raccordement Enedis pour sécuriser les délais et simplifier le pilotage de vos équipes.",
    problemTitle: "Les démarches administratives ralentissent les installations photovoltaïques",
    problemIntro:
      "Le raccordement implique de multiples échanges et jalons. Sans pilotage administratif structuré, les retards se multiplient.",
    problemItems: [
      {
        title: "Jalons peu visibles",
        text: "Les étapes réseau manquent de lisibilité et les dépendances sont difficiles à prioriser.",
      },
      {
        title: "Allers-retours fréquents",
        text: "Les demandes de compléments rallongent les cycles lorsque le dossier n'est pas cadré dès le départ.",
      },
      {
        title: "Coordination complexe",
        text: "La gestion multi-interlocuteurs mobilise fortement vos équipes administratives.",
      },
      {
        title: "Risque de dérive délais",
        text: "Sans suivi continu, les échéances de mise en service deviennent incertaines.",
      },
    ],
    scopeItems: [
      "Constitution du dossier de raccordement Enedis",
      "Vérification des pièces et cohérence administrative",
      "Gestion des échanges avec les acteurs du raccordement",
      "Suivi des jalons et relances sur points bloquants",
      "Coordination jusqu'à validation finale du dossier",
    ],
    processSteps: [
      "Brief dossier",
      "Constitution administrative",
      "Dépôt et suivi",
      "Validation finale",
    ],
    caseStudy: {
      title: "Installateur régional",
      volume: "30 dossiers / mois",
      results: [
        "Suivi raccordement plus lisible pour les équipes",
        "Réduction des blocages administratifs",
        "Meilleure maîtrise des délais de mise en service",
      ],
    },
    faqItems: [
      {
        question: "Quel est le délai de raccordement Enedis ?",
        answer:
          "Le délai dépend du projet et de la qualité du dossier. Un pilotage structuré limite les retards évitables.",
      },
      {
        question: "Quelles pièces faut-il préparer pour Enedis ?",
        answer:
          "Les pièces varient selon le contexte du projet; Sunelys les vérifie et les consolide avant dépôt.",
      },
      {
        question: "Sunelys gère-t-il les relances administratives ?",
        answer:
          "Oui, les relances et le suivi des jalons font partie du pilotage administratif.",
      },
      {
        question: "Peut-on déléguer uniquement le raccordement Enedis ?",
        answer:
          "Oui, Sunelys peut intervenir sur un bloc spécifique ou sur le parcours complet.",
      },
      {
        question: "Le service est-il adapté aux installateurs multi-agences ?",
        answer:
          "Oui, le modèle est conçu pour des flux centralisés ou répartis entre plusieurs équipes.",
      },
    ],
    finalTitle: "Externalisez l'administratif photovoltaïque.",
    finalText:
      "Planifier un échange de 15 minutes pour sécuriser votre pilotage de raccordement Enedis.",
    internalLinks: [
      { href: "/services", label: "Voir les services" },
      { href: "/gestion-administrative-photovoltaique", label: "Gestion administrative photovoltaïque" },
      { href: "/dossier-consuel-photovoltaique", label: "Dossier Consuel" },
      { href: "/contact", label: "Contacter Sunelys" },
    ],
  },
  declarationPrealable: {
    slug: "declaration_prealable",
    metaTitle: "Déclaration préalable panneaux solaires : constitution du dossier | Sunelys",
    metaDescription:
      "Sunelys prend en charge la déclaration préalable pour panneaux solaires: constitution du dossier, vérification des pièces et suivi administratif.",
    heroTitle: "Déclaration préalable panneaux solaires : constitution du dossier",
    heroSubtitle:
      "Sunelys structure votre déclaration préalable photovoltaïque pour réduire les refus, limiter les retours et sécuriser le lancement chantier.",
    problemTitle: "Les démarches administratives ralentissent les installations photovoltaïques",
    problemIntro:
      "Un dossier de déclaration préalable incomplet ou imprécis peut retarder tout le planning d'installation.",
    problemItems: [
      {
        title: "Pièces manquantes",
        text: "Les dossiers incomplets génèrent des demandes de compléments et des délais supplémentaires.",
      },
      {
        title: "Dépôt non cadré",
        text: "Un manque de cadrage initial peut conduire à un refus ou à des échanges prolongés.",
      },
      {
        title: "Suivi administratif insuffisant",
        text: "Sans suivi dédié, les étapes d'instruction manquent de visibilité.",
      },
      {
        title: "Impact sur le chantier",
        text: "Chaque retard administratif repousse la planification opérationnelle.",
      },
    ],
    scopeItems: [
      "Constitution de la déclaration préalable panneaux solaires",
      "Vérification de la complétude des pièces du dossier",
      "Gestion des échanges administratifs pendant l'instruction",
      "Suivi des étapes et relances si nécessaire",
      "Coordination jusqu'au retour administratif final",
    ],
    processSteps: [
      "Brief dossier",
      "Constitution administrative",
      "Dépôt et suivi",
      "Validation finale",
    ],
    caseStudy: {
      title: "Installateur régional",
      volume: "30 dossiers / mois",
      results: [
        "Moins de dossiers retournés pour pièces incomplètes",
        "Instruction administrative mieux suivie",
        "Lancement chantier plus prévisible",
      ],
    },
    faqItems: [
      {
        question: "Comment déposer une déclaration préalable pour panneaux solaires ?",
        answer:
          "Le dépôt repose sur un dossier complet et cohérent. Sunelys prépare les pièces et pilote les échanges administratifs.",
      },
      {
        question: "Combien de temps prend une déclaration préalable photovoltaïque ?",
        answer:
          "Le délai varie selon les dossiers et les zones, mais la qualité du dépôt initial est un facteur clé.",
      },
      {
        question: "Quelles pièces faut-il pour une déclaration préalable solaire ?",
        answer:
          "Les pièces dépendent du projet; Sunelys vérifie la complétude et la cohérence avant dépôt.",
      },
      {
        question: "Pourquoi externaliser la déclaration préalable ?",
        answer:
          "Pour limiter les erreurs, accélérer les échanges administratifs et réduire la charge de vos équipes.",
      },
      {
        question: "Sunelys peut-il gérer uniquement ce service ?",
        answer:
          "Oui. Vous pouvez déléguer uniquement la déclaration préalable ou l'intégrer à un pilotage complet.",
      },
    ],
    finalTitle: "Externalisez l'administratif photovoltaïque.",
    finalText:
      "Planifier un échange de 15 minutes pour fiabiliser vos dépôts de déclaration préalable.",
    internalLinks: [
      { href: "/services", label: "Voir les services" },
      { href: "/gestion-administrative-photovoltaique", label: "Gestion administrative photovoltaïque" },
      { href: "/dossier-consuel-photovoltaique", label: "Dossier Consuel" },
      { href: "/raccordement-enedis-photovoltaique", label: "Raccordement Enedis" },
    ],
  },
};
