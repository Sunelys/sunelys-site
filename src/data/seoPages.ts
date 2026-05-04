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
  fitTitle: string;
  fitIntro: string;
  fitItems: string[];
  proof: {
    quote: string;
    author: string;
    role: string;
    highlights: string[];
  };
  problemTitle: string;
  problemIntro: string;
  problemItems: Array<{ title: string; text: string }>;
  scopeItems: string[];
  detailBlocks?: Array<{ title: string; text: string }>;
  processSteps: string[];
  signalTitle: string;
  signalIntro: string;
  signalItems: string[];
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
    fitTitle: "Quand vos équipes passent plus de temps à suivre les dossiers qu'à produire.",
    fitIntro:
      "Cette page parle aux installateurs qui veulent retrouver un pilotage propre sans continuer à faire absorber l'administratif par les commerciaux et les conducteurs de travaux.",
    fitItems: [
      "Vous traitez plusieurs dossiers chaque mois avec des statuts dispersés.",
      "Les relances clients, mairies, Consuel ou Enedis vivent dans plusieurs boîtes mail.",
      "Vos équipes terrain perdent du temps sur des tâches de suivi non facturables.",
    ],
    proof: {
      quote:
        "Nous avons enfin un suivi réactif et structuré. Les dossiers avancent mieux, les échanges sont fluides et nos chantiers se lancent plus vite.",
      author: "Victorion Brice",
      role: "gérant de Be Travaux",
      highlights: [
        "Délais mieux tenus sur les flux administratifs",
        "Suivi plus lisible pour les équipes",
        "Lancements chantier accélérés",
      ],
    },
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
    signalTitle: "Les signaux qui montrent que l'administratif freine déjà votre croissance",
    signalIntro:
      "Ce n'est pas un sujet de confort. C'est souvent le point qui commence à dégrader vos délais, votre visibilité interne et l'expérience client.",
    signalItems: [
      "Les dossiers avancent, mais personne ne sait exactement lesquels sont bloqués et pourquoi.",
      "Les mêmes informations sont redemandées plusieurs fois au client ou aux équipes.",
      "Le volume augmente, mais le pilotage reste artisanal entre tableaux, emails et portails.",
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
      "Recevez un cadrage gratuit pour identifier vos points de friction, votre volume et le périmètre à déléguer en priorité.",
    internalLinks: [
      { href: "/services", label: "Voir les services" },
      { href: "/declaration-prealable-panneaux-solaires", label: "Déclaration préalable" },
      { href: "/dossier-consuel-photovoltaique", label: "Dossier Consuel" },
      { href: "/raccordement-enedis-photovoltaique", label: "Raccordement Enedis" },
    ],
  },
  consuel: {
    slug: "consuel_photovoltaique",
    metaTitle: "Consuel pour installateurs photovoltaïques — Sunelys",
    metaDescription:
      "Déléguez vos dossiers Consuel photovoltaïques: pièces, suivi et relances pour installateurs. Sunelys cadre vos flux et vos délais.",
    heroTitle: "Consuel photovoltaïque : préparation et suivi des dossiers",
    heroSubtitle:
      "Sunelys prend en charge le volet administratif Consuel pour sécuriser vos dossiers et accélérer la mise en service de vos installations.",
    fitTitle: "Quand le Consuel devient le point de blocage entre chantier terminé et mise en service.",
    fitIntro:
      "Cette page s'adresse aux installateurs qui veulent éviter les allers-retours inutiles, mieux préparer leurs pièces et garder de la visibilité sur les validations.",
    fitItems: [
      "Vous perdez du temps sur des pièces incomplètes ou des compléments tardifs.",
      "Le suivi Consuel est repris en urgence par les équipes opérationnelles.",
      "Les mises en service glissent faute de dossier bien préparé dès le départ.",
    ],
    proof: {
      quote:
        "Nous sommes ravis des délais, du suivi et de la réactivité de Sunelys. Le pilotage est plus fluide, les réponses arrivent vite et cela nous permet d'installer nos chantiers beaucoup plus rapidement.",
      author: "Victorion Brice",
      role: "gérant de Be Travaux",
      highlights: [
        "Suivi plus réactif des dossiers",
        "Réponses plus rapides côté administratif",
        "Chantiers lancés plus sereinement",
      ],
    },
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
    detailBlocks: [
      {
        title: "Quels documents fournir ?",
        text: "Pour préparer un dossier Consuel photovoltaïque, l'installateur doit réunir les informations client, l'adresse du chantier, les caractéristiques de l'installation, les éléments de puissance, le schéma unifilaire, les références du matériel posé, les photos demandées et les attestations utiles selon la configuration. Sunelys vérifie la cohérence entre les pièces techniques et les informations administratives avant transmission. Cette étape évite les écarts entre devis, chantier réel et formulaire, qui créent souvent des compléments. Lorsque plusieurs équipes interviennent, nous cadrons aussi qui fournit quoi afin que le commercial, le conducteur de travaux et l'administratif ne relancent pas le même client en parallèle.",
      },
      {
        title: "Quel délai prévoir ?",
        text: "Le délai dépend surtout de la qualité du dossier disponible au départ et de la rapidité de réponse aux demandes de complément. Pour un flux installateur, l'enjeu est de préparer un dossier complet en amont, puis de suivre l'avancement sans perdre les relances dans les emails. Sunelys structure les pièces, qualifie les points manquants et centralise le statut jusqu'à validation. En pratique, le cadrage en amont permet d'éviter que le Consuel devienne le point de blocage de la mise en service, surtout quand plusieurs dossiers arrivent en même temps.",
      },
      {
        title: "Quelles erreurs éviter ?",
        text: "Les erreurs les plus fréquentes sont les informations techniques incohérentes, les pièces non nommées, les photos insuffisantes, les changements chantier non répercutés dans le dossier et les relances faites trop tard. Il faut aussi éviter de déposer sans contrôle qualité lorsque le volume augmente : un dossier incomplet semble gagner du temps, mais il en fait perdre au moment des retours. Sunelys met en place une vérification documentaire et un suivi lisible pour réduire ces allers-retours, préserver le planning de mise en service et libérer vos équipes terrain. Chaque dossier conserve un statut clair afin que la prochaine action soit identifiable sans rouvrir tout l'historique.",
      },
    ],
    processSteps: [
      "Brief dossier",
      "Constitution administrative",
      "Dépôt et suivi",
      "Validation finale",
    ],
    signalTitle: "Les signes qu'il faut remettre le flux Consuel sous contrôle",
    signalIntro:
      "Dès que le Consuel repose sur des relances improvisées, il se transforme en source directe de retard et de tension interne.",
    signalItems: [
      "Le dossier part sans contrôle qualité suffisant parce que le planning pousse.",
      "Les équipes terrain découvrent trop tard qu'une pièce ou une photo manque.",
      "Vous ne distinguez plus clairement les dossiers prêts, en attente ou à relancer.",
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
      "Recevez un cadrage gratuit pour cadrer votre flux Consuel et réduire les délais de mise en service.",
    internalLinks: [
      { href: "/services", label: "Voir les services" },
      { href: "/gestion-administrative-photovoltaique", label: "Gestion administrative photovoltaïque" },
      { href: "/raccordement-enedis-photovoltaique", label: "Raccordement Enedis" },
      { href: "/contact", label: "Contacter Sunelys" },
    ],
  },
  raccordementEnedis: {
    slug: "raccordement_enedis",
    metaTitle: "Raccordement pour installateurs photovoltaïques — Sunelys",
    metaDescription:
      "Confiez le raccordement photovoltaïque à Sunelys: dossier, échanges Enedis et suivi des jalons pour installateurs solaires.",
    heroTitle: "Raccordement Enedis photovoltaïque : gestion administrative complète",
    heroSubtitle:
      "Sunelys centralise les étapes administratives du raccordement Enedis pour sécuriser les délais et simplifier le pilotage de vos équipes.",
    fitTitle: "Quand le raccordement devient une suite de jalons flous et de relances dispersées.",
    fitIntro:
      "Cette page est pensée pour les installateurs qui veulent sortir du brouillard sur les demandes Enedis, les pièces, les retours et les dépendances chantier.",
    fitItems: [
      "Vous manquez de lisibilité sur les étapes réseau et leurs prochaines actions.",
      "Les demandes de compléments rallongent les cycles et immobilisent vos équipes.",
      "Le raccordement dépend de plusieurs interlocuteurs et personne ne tient la vue d'ensemble.",
    ],
    proof: {
      quote:
        "Le suivi est beaucoup plus réactif et on sait enfin où en sont vraiment les dossiers. Cela nous aide à installer nos chantiers plus rapidement.",
      author: "Victorion Brice",
      role: "gérant de Be Travaux",
      highlights: [
        "Relances plus régulières",
        "Jalons mieux pilotés",
        "Planning chantier plus lisible",
      ],
    },
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
    detailBlocks: [
      {
        title: "Quels documents fournir ?",
        text: "Un raccordement photovoltaïque demande des informations administratives fiables, les coordonnées du client, l'adresse précise du site, les caractéristiques de l'installation, la puissance, le type d'autoconsommation ou de vente, les références techniques, les plans utiles et les justificatifs demandés selon le cas. Sunelys rassemble ces éléments dans un dossier cohérent, vérifie les champs sensibles et identifie les pièces manquantes avant que la demande ne bloque. Pour les installateurs qui traitent plusieurs chantiers par mois, cette consolidation évite les relances dispersées entre Enedis, le client, le bureau d'étude et les équipes commerciales.",
      },
      {
        title: "Quel délai prévoir ?",
        text: "Le délai de raccordement varie selon la configuration du projet, le traitement réseau et les échanges nécessaires. Ce que l'installateur peut maîtriser, c'est la qualité du dossier initial, la vitesse de réponse aux demandes et la visibilité sur chaque jalon. Sunelys organise le suivi pour savoir où se trouve le dossier, quelle action est attendue et quel point mérite une relance. Cette méthode limite les angles morts, particulièrement lorsque les mises en service dépendent de plusieurs interlocuteurs et que les équipes internes manquent de temps pour suivre chaque portail.",
      },
      {
        title: "Quelles erreurs éviter ?",
        text: "Les principales erreurs sont les adresses imprécises, les puissances mal renseignées, les pièces techniques contradictoires, les demandes déposées avec des informations incomplètes ou les relances oubliées après une demande de complément. Il faut aussi éviter de gérer le raccordement comme une tâche isolée : il impacte le planning chantier, la relation client et la mise en service. Sunelys centralise les statuts et les échanges afin de réduire les blocages administratifs, clarifier les responsabilités et garder un historique exploitable pour vos équipes. Le portail permet ensuite de retrouver rapidement le dossier, les pièces déjà transmises et les points encore ouverts. Vos équipes savent ainsi quoi traiter en priorité.",
      },
    ],
    processSteps: [
      "Brief dossier",
      "Constitution administrative",
      "Dépôt et suivi",
      "Validation finale",
    ],
    signalTitle: "Les signaux qu'un pilotage raccordement dédié devient nécessaire",
    signalIntro:
      "Le raccordement ne bloque pas toujours au même endroit. Sans méthode, c'est justement cette variabilité qui déstabilise les plannings.",
    signalItems: [
      "Les dossiers restent techniquement faisables mais administrativement difficiles à suivre.",
      "Vos commerciaux, le bureau d'étude et l'administratif relancent sans pilotage commun.",
      "Les mises en service deviennent imprévisibles à cause des statuts et dépendances réseau.",
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
      "Recevez un cadrage gratuit pour sécuriser votre pilotage de raccordement Enedis.",
    internalLinks: [
      { href: "/services", label: "Voir les services" },
      { href: "/gestion-administrative-photovoltaique", label: "Gestion administrative photovoltaïque" },
      { href: "/dossier-consuel-photovoltaique", label: "Dossier Consuel" },
      { href: "/contact", label: "Contacter Sunelys" },
    ],
  },
  declarationPrealable: {
    slug: "declaration_prealable",
    metaTitle: "Déclaration préalable panneaux solaires pour installateurs | Sunelys",
    metaDescription:
      "Externalisez vos déclarations préalables panneaux solaires: pièces toiture, dépôt mairie et suivi pour installateurs photovoltaïques avec Sunelys.",
    heroTitle: "Déclaration préalable panneaux solaires : pièces, dépôt mairie et suivi",
    heroSubtitle:
      "Sunelys structure vos déclarations préalables solaires pour réduire les refus, limiter les demandes de pièces complémentaires et sécuriser le lancement chantier.",
    fitTitle: "Quand chaque dépôt mairie doit partir propre du premier coup.",
    fitIntro:
      "Cette page est faite pour les installateurs qui veulent éviter les demandes de pièces complémentaires, lisser leurs délais et donner un vrai cadre à leurs dépôts de DP pour panneaux solaires en toiture.",
    fitItems: [
      "Vous déposez plusieurs DP par mois et chaque complément vous décale le chantier.",
      "Les plans, visuels ou informations projet sont récupérés dans l'urgence.",
      "Vous voulez fiabiliser vos dossiers avant mairie, sans dépendre d'une vérification tardive.",
    ],
    proof: {
      quote:
        "Nous sommes ravis des délais, du suivi et de la réactivité de Sunelys. Le pilotage est plus fluide, les réponses arrivent vite et cela nous permet d'installer nos chantiers beaucoup plus rapidement.",
      author: "Victorion Brice",
      role: "gérant de Be Travaux",
      highlights: [
        "Délais mieux suivis dès le dépôt",
        "Pilotage plus lisible pour les équipes",
        "Chantiers installés plus rapidement",
      ],
    },
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
      "Constitution de la déclaration préalable panneaux solaires en toiture",
      "Vérification de la complétude des pièces du dossier",
      "Gestion des échanges administratifs pendant l'instruction",
      "Suivi des étapes et relances si nécessaire",
      "Coordination jusqu'au retour administratif final",
    ],
    detailBlocks: [
      {
        title: "Quels documents fournir ?",
        text: "Pour une déclaration préalable solaire, l'installateur doit généralement réunir les informations du propriétaire, l'adresse exacte, les caractéristiques du projet, les plans demandés, les visuels de toiture ou de façade, les éléments d'intégration et les pièces permettant à la mairie de comprendre l'impact visuel. Pour des panneaux solaires en toiture, la lisibilité de l'insertion, de la pente, de la couleur des modules et de la visibilité depuis l'espace public compte beaucoup. Selon la commune, la zone ou les contraintes patrimoniales, des éléments complémentaires peuvent être nécessaires. Sunelys vérifie la complétude du dossier, la cohérence entre le projet vendu et les pièces préparées, puis organise les échanges pour éviter que le client ou vos équipes terrain ne soient sollicités plusieurs fois pour la même information.",
      },
      {
        title: "Quel délai prévoir ?",
        text: "Le délai d'instruction dépend de la commune, de la zone concernée et de la qualité du dépôt initial. Pour un installateur photovoltaïque, le vrai levier consiste à envoyer un dossier complet dès le départ, puis à suivre l'instruction sans laisser passer une demande de complément. Sunelys prépare les éléments, contrôle les points sensibles et garde une traçabilité du statut. Sur un volume régulier, ce pilotage évite que les déclarations préalables solaires deviennent un goulot d'étranglement entre la vente, la planification chantier et les étapes Consuel ou raccordement.",
      },
      {
        title: "Quelles erreurs éviter ?",
        text: "Les erreurs qui ralentissent le plus une DP sont les plans incomplets, les visuels peu lisibles, une adresse ou une parcelle mal renseignée, une incohérence entre la puissance annoncée et les pièces, ou un dépôt qui ne tient pas compte des exigences locales. Il faut aussi éviter de disperser les informations dans plusieurs boîtes mail ou fichiers non suivis. Sunelys structure le contrôle documentaire, clarifie les pièces attendues et suit les retours pour limiter les demandes de complément, les refus évitables et les retards de lancement chantier. Cette rigueur facilite aussi le passage vers les étapes Consuel et raccordement. Le client final reçoit une information plus stable.",
      },
      {
        title: "Dans quels cas une DP est-elle demandée ?",
        text: "Les panneaux solaires en toiture nécessitent souvent une déclaration préalable lorsque l'aspect extérieur du bâtiment est modifié. Le besoin exact dépend du projet, de la commune, de la visibilité et des règles locales d'urbanisme. Pour un installateur, l'enjeu n'est pas de trancher chaque cas au dernier moment, mais de cadrer dès la vente si une DP est probable, quelles pièces seront nécessaires et qui suit le retour mairie. Sunelys aide à structurer ce réflexe pour que la déclaration préalable panneaux solaires ne devienne pas une étape improvisée après signature.",
      },
    ],
    processSteps: [
      "Brief dossier",
      "Constitution administrative",
      "Dépôt et suivi",
      "Validation finale",
    ],
    signalTitle: "Les signes qu'il faut reprendre la main sur vos déclarations préalables",
    signalIntro:
      "Une DP mal cadrée ne vous coûte pas seulement du temps administratif. Elle désorganise la suite du projet et fragilise toute la chaîne chantier.",
    signalItems: [
      "Vos dépôts repartent trop souvent avec une pièce manquante ou un visuel à reprendre.",
      "Le planning chantier dépend d'un retour mairie qui manque de visibilité.",
      "Les informations projet sont encore recoupées à la main entre vente, technique et administratif.",
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
        question: "Faut-il une déclaration préalable pour des panneaux solaires en toiture ?",
        answer:
          "Dans de nombreux cas, oui, car les panneaux modifient l'aspect extérieur du bâtiment. Les règles varient selon la commune et la zone.",
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
      "Recevez un cadrage gratuit pour fiabiliser vos dépôts de déclaration préalable.",
    internalLinks: [
      { href: "/services", label: "Voir les services" },
      { href: "/gestion-administrative-photovoltaique", label: "Gestion administrative photovoltaïque" },
      { href: "/blog/declaration-prealable-panneaux-solaires-pieces-delais", label: "Pièces et délais DP solaire" },
      { href: "/blog/declaration-prealable-panneaux-solaires-toiture", label: "DP panneaux solaires toiture" },
      { href: "/dossier-consuel-photovoltaique", label: "Dossier Consuel" },
      { href: "/raccordement-enedis-photovoltaique", label: "Raccordement Enedis" },
    ],
  },
};
