export interface FaqItem {
  question: string;
  answer: string;
}

export interface GuideLink {
  href: string;
  label: string;
  description: string;
}

export interface SeoPageData {
  slug: string;
  metaTitle: string;
  metaDescription: string;
  heroTitle: string;
  heroSubtitle: string;
  heroPrimaryLabel?: string;
  heroSecondaryCta?: {
    label: string;
    href: string;
  };
  conversionOffer?: {
    eyebrow: string;
    label: string;
    price: string;
    priceNote: string;
    scope: string;
    terms: string[];
  };
  heroCheckpoint?: {
    eyebrow: string;
    title: string;
    items: Array<{ label: string; status: string }>;
  };
  quickFormTitle?: string;
  quickFormSubmitLabel?: string;
  quickFormNote?: string;
  diagnosticLabel?: string;
  diagnosticOptions?: Array<{ value: string; label: string }>;
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
  useCaseItems?: Array<{ title: string; text: string }>;
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
  guideLinks?: GuideLink[];
  internalLinks: Array<{ href: string; label: string }>;
}

export const seoPages: Record<string, SeoPageData> = {
  gestionAdministrative: {
    slug: "gestion_administrative",
    metaTitle: "Pilotage administratif photovoltaïque externalisé",
    metaDescription:
      "Externalisez DP, Consuel, raccordement photovoltaïque, MaPrimeRénov' et CEE avec Sunelys: interlocuteur unique, production sous 48h et suivi clair.",
    heroTitle: "Pilotage administratif photovoltaïque pour installateurs",
    heroSubtitle:
      "Sunelys pilote vos démarches DP, Consuel, raccordement Enedis, MaPrimeRénov' et CEE dans un flux unique pour sécuriser votre croissance sans recruter.",
    heroPrimaryLabel: "Recevoir mon plan de pilotage",
    heroSecondaryCta: {
      label: "Parler à un expert Sunelys",
      href: "/contact?source=gestion_administrative_header",
    },
    conversionOffer: {
      eyebrow: "Offre pilotage complet",
      label: "Gestion administrative complète",
      price: "199 €",
      priceNote: "HT / dossier",
      scope: "Production, dépôt, relances, coordination et suivi jusqu'à validation.",
      terms: [
        "Dossier ponctuel accepté",
        "Aucun abonnement obligatoire",
        "Facturation au réel",
      ],
    },
    quickFormTitle: "Quel flux voulez-vous reprendre en priorité ?",
    quickFormSubmitLabel: "Recevoir mon diagnostic pilotage",
    quickFormNote: "2 informations suffisent pour avoir un point d'action prioritaire sous 24h.",
    diagnosticLabel: "Blocage principal",
    diagnosticOptions: [
      { value: "Relances dispersion", label: "Dossiers dispersés entre équipes et emails" },
      { value: "Compléments fréquents", label: "Beaucoup de demandes de pièces complémentaires" },
      { value: "Mise en service bloquée", label: "Point bloquant en mise en service" },
      { value: "Pilotage global", label: "Je veux un pilotage global" },
      { value: "Je ne sais pas encore", label: "Je ne sais pas encore" },
    ],
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
        "96 % de DP sans pièce complémentaire",
        "Production sous 48h lorsque le dossier est complet",
        "1 357 dossiers pilotés",
      ],
    },
    problemTitle: "Les démarches administratives ralentissent les installations photovoltaïques",
    problemIntro:
      "Entre délais, dossiers incomplets et allers-retours, les équipes installateurs perdent du temps sur des tâches critiques mais non productives.",
    problemItems: [
      {
        title: "Complexité documentaire",
        text: "Les pièces à collecter et à consolider varient selon les projets: DP6, plans, Consuel, Enedis et aides créent des frictions récurrentes.",
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
      "Déclaration préalable complète: pièces, dépôt mairie et suivi jusqu'à validation",
      "Raccordement réseau et dossier Consuel dans un flux coordonné",
      "MaPrimeRénov' et CEE montés et suivis jusqu'à validation",
      "Interlocuteur unique pour centraliser les échanges et les relances",
      "Production sous 48h lorsque les éléments techniques sont complets",
      "Suivi en temps réel des statuts, blocages et validations",
    ],
    detailBlocks: [
      {
        title: "Chaîne administrative complète",
        text: "Sunelys peut piloter DP, raccordement, Consuel, MaPrimeRénov' et CEE dans le même parcours. Cette approche évite de disperser les échanges entre plusieurs interlocuteurs et permet de garder une lecture claire du statut de chaque dossier.",
      },
      {
        title: "Pièces techniques qui bloquent les dossiers",
        text: "Quand une DP bloque sur une pièce précise, Sunelys peut reprendre le contrôle documentaire: DP6 ou document graphique, plan de masse, plan de coupe, notice descriptive, insertion paysagère, pièces DP7/DP8 selon les demandes mairie, puis coordination avec Consuel et raccordement si la suite du parcours est concernée.",
      },
      {
        title: "Garantie zéro pièce complémentaire",
        text: "Les dossiers DP complets sont préparés pour limiter les demandes de complément. Si une pièce complémentaire est réclamée du fait d'un oubli ou d'une erreur Sunelys sur la formule complète, elle est traitée sans frais selon les conditions de l'offre.",
      },
      {
        title: "Tarif au dossier",
        text: "La chaîne administrative complète est proposée à 199 EUR HT par dossier. Le prix unitaire est fixe et la facturation mensuelle se base sur les dossiers réellement traités.",
      },
    ],
    processSteps: [
      "Transmission des éléments techniques",
      "Production du dossier sous 48h si complet",
      "Dépôt, suivi et relances",
      "Validation et suivi en temps réel",
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
      title: "Flux installateur",
      volume: "1 357 dossiers pilotés",
      results: [
        "Production administrative structurée sans recrutement dédié",
        "Meilleure visibilité sur chaque étape DP, Consuel et Enedis",
        "Moins de charge mentale pour les équipes commerciales et travaux",
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
        question: "Quel est le tarif du pilotage complet ?",
        answer:
          "La chaîne administrative complète DP, raccordement et Consuel est proposée à 199 EUR HT par dossier, avec un prix unitaire fixe.",
      },
      {
        question: "Que couvre la garantie zéro pièce complémentaire ?",
        answer:
          "Elle concerne la formule DP complète avec dépôt et suivi assurés par Sunelys. Si un complément vient d'un oubli ou d'une erreur Sunelys, il est traité sans frais selon les conditions de l'offre.",
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
    finalTitle: "Externalisez votre pilotage administratif complet.",
    finalText:
      "Recevez un cadrage de pilotage complet pour identifier vos points de friction, votre volume et le périmètre à déléguer en priorité.",
    guideLinks: [
      {
        href: "/blog/externaliser-administratif-photovoltaique",
        label: "Externaliser l'administratif PV",
        description: "Choisir quoi déléguer, quand le faire et comment garder la maîtrise.",
      },
      {
        href: "/blog/gerer-soi-meme-ou-deleguer-administratif-solaire",
        label: "Gérer ou déléguer ?",
        description: "Comparer gestion interne, délégation et coût caché des dossiers.",
      },
      {
        href: "/blog/cout-gestion-administrative-photovoltaique",
        label: "Coût gestion administrative PV",
        description: "Comparer tarifs externalisés, coût interne et ROI opérationnel.",
      },
      {
        href: "/blog/sous-traiter-declaration-prealable-photovoltaique",
        label: "Sous-traiter ses DP PV",
        description: "Déléguer les déclarations préalables sans perdre la maîtrise du client.",
      },
      {
        href: "/blog/externalisation-administrative-solaire-volume",
        label: "Externalisation administrative solaire",
        description: "Identifier le bon moment pour déléguer selon votre organisation et vos irritants.",
      },
      {
        href: "/blog/declaration-prealable-panneaux-solaires-pieces-delais",
        label: "Pièces et délais d'une DP solaire",
        description: "Le guide pratique pour cadrer les dépôts mairie.",
      },
      {
        href: "/blog/raccordement-enedis-photovoltaique-etapes-delais",
        label: "Raccordement Enedis photovoltaïque",
        description: "Les étapes à suivre pour limiter les blocages réseau.",
      },
    ],
    internalLinks: [
      { href: "/services", label: "Voir les services" },
      { href: "/declaration-prealable-panneaux-solaires", label: "Déclaration préalable" },
      { href: "/dossier-consuel-photovoltaique", label: "Dossier Consuel" },
      { href: "/raccordement-enedis-photovoltaique", label: "Raccordement Enedis" },
      { href: "/edf-oa", label: "EDF OA - compte et contrat d'achat" },
      { href: "/blog/externaliser-administratif-photovoltaique", label: "Externaliser l'administratif photovoltaïque" },
      { href: "/blog/gerer-soi-meme-ou-deleguer-administratif-solaire", label: "Gérer soi-même ou déléguer l'administratif solaire" },
      { href: "/blog/cout-gestion-administrative-photovoltaique", label: "Prix gestion administrative photovoltaïque" },
      { href: "/blog/sous-traiter-declaration-prealable-photovoltaique", label: "Sous-traiter ses déclarations préalables photovoltaïques" },
    ],
  },
  consuel: {
    slug: "consuel_photovoltaique",
    metaTitle: "Dossier Consuel photovoltaïque : guide complet",
    metaDescription:
      "Attestation, pièces, délais et motifs de refus du Consuel PV. Réduisez les retours avec Sunelys.",
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
    guideLinks: [
      {
        href: "/blog/attestation-consuel-photovoltaique",
        label: "Attestation Consuel photovoltaïque",
        description: "Choisir entre attestation bleue ou violette et préparer le SC 144.",
      },
      {
        href: "/blog/delai-consuel-photovoltaique",
        label: "Délai Consuel photovoltaïque",
        description: "Anticiper demande de visa, visite, anomalies et mise en service.",
      },
      {
        href: "/blog/prix-consuel-photovoltaique",
        label: "Prix Consuel photovoltaïque",
        description: "Comprendre les tarifs bleus, violets et les coûts cachés.",
      },
      {
        href: "/blog/consuel-refuse-motifs-solutions",
        label: "Consuel refusé photovoltaïque",
        description: "Identifier les motifs de retour et les actions pour débloquer le visa.",
      },
      {
        href: "/blog/consuel-photovoltaique-delais-dossier",
        label: "Consuel photovoltaïque : dossier et délais",
        description: "Préparer les pièces et limiter les retours avant mise en service.",
      },
      {
        href: "/blog/raccordement-enedis-photovoltaique-etapes-delais",
        label: "Raccordement Enedis photovoltaïque",
        description: "Comprendre l'étape suivante du parcours administratif.",
      },
      {
        href: "/blog/externalisation-administrative-solaire-volume",
        label: "Externalisation administrative solaire",
        description: "Savoir quand déléguer plutôt que continuer en interne.",
      },
    ],
    internalLinks: [
      { href: "/services", label: "Voir les services" },
      { href: "/gestion-administrative-photovoltaique", label: "Gestion administrative photovoltaïque" },
      { href: "/raccordement-enedis-photovoltaique", label: "Raccordement Enedis" },
      { href: "/edf-oa", label: "EDF OA - compte et contrat d'achat" },
      { href: "/blog/attestation-consuel-photovoltaique", label: "Attestation Consuel photovoltaïque" },
      { href: "/blog/delai-consuel-photovoltaique", label: "Délai Consuel photovoltaïque" },
      { href: "/blog/prix-consuel-photovoltaique", label: "Prix Consuel photovoltaïque" },
      { href: "/blog/consuel-refuse-motifs-solutions", label: "Consuel refusé photovoltaïque" },
      { href: "/contact", label: "Contacter Sunelys" },
    ],
  },
  raccordementEnedis: {
    slug: "raccordement_enedis",
    metaTitle: "Raccordement Enedis photovoltaïque : étapes & délais",
    metaDescription:
      "Étapes, délais et coûts du raccordement Enedis solaire. Sunelys suit vos dossiers jusqu'à la mise en service.",
    heroTitle: "Raccordement Enedis photovoltaïque : gestion administrative complète",
    heroSubtitle:
      "Sunelys centralise les étapes administratives du raccordement Enedis pour sécuriser les délais et simplifier le pilotage de vos équipes.",
    heroPrimaryLabel: "Faire cadrer mon raccordement",
    heroSecondaryCta: {
      label: "Voir le tarif détaillé",
      href: "/tarifs#tarifs-photovoltaique",
    },
    conversionOffer: {
      eyebrow: "Offre réseau",
      label: "Raccordement + Consuel",
      price: "89 €",
      priceNote: "HT / dossier",
      scope: "Demande, gestion des échanges, validation et mise en service.",
      terms: [
        "Dossier ponctuel accepté",
        "Aucun abonnement",
        "Facturation au réel",
      ],
    },
    heroCheckpoint: {
      eyebrow: "Lecture rapide du dossier",
      title: "Le jalon qui bloque devient visible dès le premier échange.",
      items: [
        { label: "Demande réseau", status: "À cadrer" },
        { label: "Pièces techniques", status: "À vérifier" },
        { label: "Consuel", status: "À aligner" },
        { label: "Mise en service", status: "À suivre" },
      ],
    },
    quickFormTitle: "Où votre raccordement bloque-t-il aujourd'hui ?",
    quickFormSubmitLabel: "Recevoir mon plan de reprise",
    quickFormNote: "3 informations suffisent. Sunelys vous indique le premier jalon à reprendre sous 24h.",
    diagnosticLabel: "Situation raccordement",
    diagnosticOptions: [
      { value: "Raccordement à déposer", label: "Demande à déposer" },
      { value: "Raccordement en attente", label: "Raccordement en attente" },
      { value: "Consuel à préparer", label: "Consuel à préparer" },
      { value: "Mise en service bloquée", label: "Mise en service bloquée" },
      { value: "Pilotage global", label: "Plusieurs étapes à reprendre" },
      { value: "Je ne sais pas encore", label: "Je ne sais pas encore" },
    ],
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
    finalTitle: "Quel raccordement faut-il reprendre en priorité ?",
    finalText:
      "Indiquez votre volume et le jalon concerné. Sunelys vous répond avec le premier périmètre utile, sans engagement.",
    guideLinks: [
      {
        href: "/blog/etapes-raccordement-enedis-panneaux-solaires",
        label: "Étapes raccordement Enedis",
        description: "La checklist opérationnelle pour suivre chaque jalon jusqu'à mise en service.",
      },
      {
        href: "/blog/raccordement-enedis-photovoltaique-etapes-delais",
        label: "Raccordement Enedis : étapes et dossier",
        description: "Le guide pour mieux préparer et suivre les demandes réseau.",
      },
      {
        href: "/blog/delai-raccordement-enedis-photovoltaique",
        label: "Délai raccordement Enedis",
        description: "Comprendre les délais maximums, la PDR, le Consuel et la mise en service.",
      },
      {
        href: "/blog/cout-raccordement-enedis-photovoltaique",
        label: "Coût raccordement Enedis",
        description: "Identifier devis, travaux réseau et coûts cachés côté installateur.",
      },
      {
        href: "/blog/consuel-photovoltaique-delais-dossier",
        label: "Consuel photovoltaïque",
        description: "Anticiper la conformité avant la mise en service.",
      },
      {
        href: "/blog/externalisation-administrative-solaire-volume",
        label: "Externaliser l'administratif solaire",
        description: "Structurer le suivi quand le volume augmente.",
      },
    ],
    internalLinks: [
      { href: "/services", label: "Voir les services" },
      { href: "/gestion-administrative-photovoltaique", label: "Gestion administrative photovoltaïque" },
      { href: "/blog/etapes-raccordement-enedis-panneaux-solaires", label: "Étapes raccordement Enedis panneaux solaires" },
      { href: "/blog/delai-raccordement-enedis-photovoltaique", label: "Délai raccordement Enedis photovoltaïque" },
      { href: "/blog/cout-raccordement-enedis-photovoltaique", label: "Coût raccordement Enedis photovoltaïque" },
      { href: "/dossier-consuel-photovoltaique", label: "Dossier Consuel" },
      { href: "/edf-oa", label: "EDF OA - compte et contrat d'achat" },
      { href: "/contact", label: "Contacter Sunelys" },
    ],
  },
  declarationPrealable: {
    slug: "declaration_prealable",
    metaTitle: "Déclaration préalable panneaux solaires installateurs",
    metaDescription:
      "Externalisez vos déclarations préalables photovoltaïques: pièces, dépôt mairie, suivi et relances pour limiter les compléments.",
    heroTitle: "Déclaration préalable panneaux solaires pour installateurs",
    heroSubtitle:
      "Sunelys gère le cadrage, les pièces, le dépôt mairie et le suivi des retours pour fiabiliser vos DP photovoltaïques sans charger vos équipes.",
    heroPrimaryLabel: "Faire cadrer ma déclaration préalable",
    heroSecondaryCta: {
      label: "Voir le tarif détaillé",
      href: "/tarifs#tarifs-photovoltaique",
    },
    conversionOffer: {
      eyebrow: "Offre DP complète",
      label: "Déclaration préalable complète",
      price: "119 €",
      priceNote: "HT / dossier",
      scope: "Pièces, dépôt en mairie et suivi de l'instruction jusqu'à validation.",
      terms: [
        "Dossier ponctuel accepté",
        "Aucun abonnement",
        "Dépôt et suivi inclus",
      ],
    },
    quickFormTitle: "Dans quelle situation se trouve votre DP ?",
    quickFormSubmitLabel: "Recevoir mon cadrage DP",
    quickFormNote: "3 informations suffisent. Sunelys vous indique les pièces ou l'étape à reprendre sous 24h.",
    diagnosticLabel: "Situation de la DP",
    diagnosticOptions: [
      { value: "Avant dépôt", label: "Dossier à préparer" },
      { value: "Complément mairie", label: "Complément demandé par la mairie" },
      { value: "DP refusée", label: "Déclaration préalable refusée" },
      { value: "Flux DP à déléguer", label: "Flux régulier à déléguer" },
      { value: "Je ne sais pas encore", label: "Je ne sais pas encore" },
    ],
    fitTitle: "Quand chaque dépôt mairie doit partir propre du premier coup.",
    fitIntro:
      "Cette page est faite pour les installateurs qui veulent éviter les demandes de pièces complémentaires, lisser leurs délais et donner un vrai cadre à leurs dépôts de DP pour panneaux solaires en toiture.",
    fitItems: [
      "Vous déposez plusieurs DP par mois et chaque complément vous décale le chantier.",
      "Les plans, visuels ou informations projet sont récupérés dans l'urgence.",
      "Vous voulez fiabiliser vos dossiers avant mairie, sans dépendre d'une vérification tardive.",
      "Les pièces sensibles comme le DP6, le plan de masse ou l'insertion paysagère prennent trop de temps à contrôler.",
    ],
    proof: {
      quote:
        "Nous sommes ravis des services de Sunelys. Les dossiers sont cadrés sérieusement, les déclarations préalables avancent avec un très haut niveau d'acceptation sans pièces complémentaires, et nous gardons la tranquillité d'esprit d'être en règle sur tout l'administratif.",
      author: "Damien Guillaume",
      role: "dirigeant de SUN WATT FRANCE",
      highlights: [
        "96 % de DP sans pièce complémentaire",
        "Dossiers cadrés sérieusement",
        "Témoignage publié avec accord",
      ],
    },
    problemTitle: "Les démarches administratives ralentissent les installations photovoltaïques",
    problemIntro:
      "Sur un flux installateur, une déclaration préalable solaire incomplète ne crée pas seulement un retard mairie: elle décale les relances client, la planification chantier et les étapes administratives suivantes.",
    problemItems: [
      {
        title: "Pièces manquantes",
        text: "Les dossiers incomplets génèrent des demandes de compléments, notamment sur les pièces graphiques, les plans et les visuels d'insertion.",
      },
      {
        title: "Pièces graphiques sensibles",
        text: "Un DP6 peu lisible, un plan de masse imprécis ou une insertion paysagère incohérente suffit à ralentir l'instruction mairie.",
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
    useCaseItems: [
      {
        title: "Flux régulier de DP toiture",
        text: "Vous avez plusieurs ventes solaires à transformer chaque mois et vous voulez que les dossiers partent avec les bonnes pièces, les bons visuels et un statut clair dès le dépôt.",
      },
      {
        title: "Dossier à reprendre après complément",
        text: "Une mairie demande une précision, une pièce ou un visuel retravaillé. Sunelys reprend le dossier, clarifie les éléments manquants et organise la réponse sans disperser les échanges.",
      },
      {
        title: "Organisation multi-interlocuteurs",
        text: "Commercial, client final, équipe technique et mairie n'avancent pas toujours au même rythme. Sunelys centralise les informations utiles pour éviter les relances doublons et les oublis.",
      },
    ],
    scopeItems: [
      "Constitution de la déclaration préalable panneaux solaires en toiture",
      "Vérification de la complétude des pièces du dossier",
      "Contrôle des pièces sensibles: DP6/document graphique, plan de masse, plan de coupe, notice descriptive et insertion paysagère",
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
        title: "Pièces DP qui bloquent souvent",
        text: "Les blocages viennent souvent de pièces très concrètes: DP6 ou document graphique, plan de masse, plan de coupe, notice descriptive, insertion paysagère, photos de l'environnement proche et lointain, ou pièces complémentaires DP7/DP8 selon les communes. Sunelys vérifie que ces éléments racontent le même projet: adresse, toiture, puissance, implantation, couleur des modules et visibilité depuis l'espace public. L'objectif est d'éviter qu'une secrétaire, un conducteur de travaux ou un commercial doive reprendre seul un visuel ou une pièce technique après retour mairie.",
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
          "Les pièces dépendent du projet. Sunelys vérifie notamment les plans, le DP6 ou document graphique, l'insertion paysagère, la notice et la cohérence générale avant dépôt.",
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
      {
        question: "Peut-on commencer par un flux test de DP ?",
        answer:
          "Oui. Un premier flux de dossiers permet de cadrer les pièces, les statuts et le niveau de suivi avant d'élargir la délégation.",
      },
      {
        question: "Gardez-vous le client final dans la boucle ?",
        answer:
          "Oui. L'objectif est de soulager vos équipes sans brouiller la relation client: les informations utiles sont centralisées et les retours sont suivis avec un statut lisible.",
      },
    ],
    finalTitle: "Quelle partie de vos DP faut-il sortir de l'équipe ?",
    finalText:
      "Indiquez votre volume et la situation actuelle. Sunelys vous répond avec les pièces ou le périmètre à reprendre en priorité.",
    guideLinks: [
      {
        href: "/blog/cerfa-declaration-prealable-panneaux-solaires",
        label: "Cerfa DP panneaux solaires",
        description: "Quel formulaire utiliser et quels champs contrôler avant dépôt.",
      },
      {
        href: "/blog/declaration-prealable-panneaux-solaires-pieces-delais",
        label: "Pièces et délais d'une DP solaire",
        description: "Les informations à préparer avant un dépôt mairie.",
      },
      {
        href: "/blog/delai-declaration-prealable-photovoltaique",
        label: "Délai DP photovoltaïque",
        description: "Anticiper le délai mairie, les secteurs protégés et les compléments.",
      },
      {
        href: "/blog/declaration-prealable-panneaux-solaires-erreurs",
        label: "Erreurs à éviter dans une DP",
        description: "Les points qui ralentissent les chantiers photovoltaïques.",
      },
      {
        href: "/blog/dp-refusee-panneaux-solaires-que-faire",
        label: "DP refusée panneaux solaires",
        description: "Analyser l'arrêté, corriger le dossier et choisir la bonne suite.",
      },
      {
        href: "/blog/declaration-prealable-ou-permis-construire-photovoltaique",
        label: "DP ou permis photovoltaïque",
        description: "Choisir le bon régime selon toiture, sol, ombrière ou maison neuve.",
      },
      {
        href: "/blog/declaration-prealable-panneaux-solaires-toiture",
        label: "Panneaux solaires en toiture",
        description: "Anticiper les cas fréquents sur bâtiment existant.",
      },
      {
        href: "/blog/panneaux-solaires-sans-declaration-prealable",
        label: "Panneaux solaires sans déclaration",
        description: "Reprendre un dossier posé trop vite et limiter les risques.",
      },
    ],
    internalLinks: [
      { href: "/checklist-declaration-prealable-solaire", label: "Checklist déclaration préalable solaire" },
      { href: "/sous-traitance-declaration-prealable-solaire", label: "Sous-traitance DP solaire" },
      { href: "/tarif-declaration-prealable-photovoltaique", label: "Tarif DP photovoltaïque" },
      { href: "/services", label: "Voir les services" },
      { href: "/gestion-administrative-photovoltaique", label: "Gestion administrative photovoltaïque" },
      { href: "/blog/cerfa-declaration-prealable-panneaux-solaires", label: "Cerfa déclaration préalable panneaux solaires" },
      { href: "/blog/declaration-prealable-panneaux-solaires-pieces-delais", label: "Pièces et délais DP solaire" },
      { href: "/blog/delai-declaration-prealable-photovoltaique", label: "Délai déclaration préalable photovoltaïque" },
      { href: "/blog/dp-refusee-panneaux-solaires-que-faire", label: "DP refusée panneaux solaires" },
      { href: "/blog/declaration-prealable-ou-permis-construire-photovoltaique", label: "DP ou permis de construire photovoltaïque" },
      { href: "/blog/declaration-prealable-panneaux-solaires-toiture", label: "DP panneaux solaires toiture" },
      { href: "/dossier-consuel-photovoltaique", label: "Dossier Consuel" },
      { href: "/raccordement-enedis-photovoltaique", label: "Raccordement Enedis" },
      { href: "/edf-oa", label: "EDF OA - compte et contrat d'achat" },
    ],
  },
  sousTraitanceDeclarationPrealable: {
    slug: "sous_traitance_declaration_prealable",
    metaTitle: "Sous-traitance déclaration préalable solaire | Sunelys",
    metaDescription:
      "Confiez vos déclarations préalables solaires à Sunelys: montage, contrôle des pièces, dépôt mairie et suivi pour installateurs photovoltaïques.",
    heroTitle: "Sous-traitance déclaration préalable solaire pour installateurs",
    heroSubtitle:
      "Sunelys prend en charge vos dossiers DP panneaux solaires pour réduire la charge interne, limiter les demandes de complément et sécuriser vos lancements chantier.",
    fitTitle: "Quand vos DP solaires consomment trop de temps commercial et administratif.",
    fitIntro:
      "Cette page s'adresse aux installateurs qui veulent déléguer un flux régulier de déclarations préalables sans perdre la maîtrise des dossiers ni la visibilité sur les retours mairie.",
    fitItems: [
      "Vous traitez plusieurs DP par mois et les pièces arrivent dans des formats dispersés.",
      "Vos équipes commerciales relancent les clients pour des informations administratives.",
      "Les demandes de complément mairie ralentissent votre planning chantier.",
    ],
    proof: {
      quote:
        "Les déclarations préalables avancent avec un très haut niveau d'acceptation sans pièces complémentaires, et nous gardons la tranquillité d'esprit d'être en règle sur tout l'administratif.",
      author: "Damien Guillaume",
      role: "dirigeant de SUN WATT FRANCE",
      highlights: [
        "Dépôts DP mieux cadrés",
        "Moins de retours pour pièces complémentaires",
        "Suivi plus lisible pour les équipes",
      ],
    },
    problemTitle: "La DP solaire devient vite un goulot d'étranglement quand le volume augmente",
    problemIntro:
      "Une déclaration préalable semble simple isolément. Sur un flux installateur, les pièces, les plans, les relances et les retours mairie finissent par bloquer la capacité d'exécution.",
    problemItems: [
      {
        title: "Informations dispersées",
        text: "Les éléments client, projet, toiture et visuels sont récupérés dans plusieurs outils ou boîtes mail.",
      },
      {
        title: "Qualité variable",
        text: "Chaque dossier dépend de la précision des informations transmises par le commercial ou le terrain.",
      },
      {
        title: "Demandes de complément",
        text: "Un dossier parti trop vite crée des retours mairie, décale le chantier et détériore l'expérience client.",
      },
      {
        title: "Charge non facturable",
        text: "Le suivi DP mobilise des équipes qui devraient vendre, produire ou gérer la relation client.",
      },
    ],
    scopeItems: [
      "Collecte et cadrage des informations nécessaires à la DP solaire",
      "Contrôle de cohérence entre projet vendu, toiture et pièces administratives",
      "Relecture des pièces sensibles: DP6, document graphique, plan de masse, plan de coupe, notice et insertion paysagère",
      "Préparation des éléments attendus pour le dépôt mairie",
      "Suivi des retours et demandes de complément",
      "Traçabilité des statuts pour vos équipes commerciales et travaux",
    ],
    detailBlocks: [
      {
        title: "Ce qui peut être sous-traité",
        text: "Sunelys peut prendre en charge le montage du dossier, la vérification des informations, la préparation des pièces administratives, le suivi mairie et la coordination des demandes de complément. Le périmètre exact dépend de votre organisation: certains installateurs délèguent uniquement les DP, d'autres intègrent aussi le Consuel et le raccordement.",
      },
      {
        title: "Reprendre les pièces qui ralentissent la DP",
        text: "La sous-traitance est utile quand la difficulté n'est pas seulement le Cerfa, mais les pièces qui demandent de la rigueur: DP6 ou document graphique, plan de masse, plan de coupe, notice descriptive, insertion paysagère et visuels demandés par la mairie. Sunelys peut reprendre ces points, vérifier la cohérence avec le projet vendu et organiser la réponse si la commune demande un complément.",
      },
      {
        title: "Comment transmettre les dossiers",
        text: "L'objectif est d'éviter les échanges dispersés. Les informations utiles sont cadrées dès l'entrée du dossier: coordonnées client, adresse, typologie toiture, caractéristiques du projet, visuels, plans et contraintes connues. Sunelys qualifie ensuite les points manquants avant dépôt pour limiter les reprises tardives.",
      },
      {
        title: "Quand externaliser",
        text: "La sous-traitance devient pertinente dès que les DP mobilisent trop de temps interne ou créent des retards récurrents. Le bon signal n'est pas seulement le nombre de dossiers, mais la fréquence des relances, des pièces manquantes et des statuts difficiles à suivre.",
      },
    ],
    processSteps: [
      "Vous transmettez le brief et les pièces disponibles",
      "Sunelys contrôle les points sensibles",
      "Le dossier DP est préparé puis suivi",
      "Vos équipes gardent une visibilité claire jusqu'au retour mairie",
    ],
    signalTitle: "Les signes que vos DP doivent sortir du traitement artisanal",
    signalIntro:
      "Quand le volume monte, une méthode standardisée devient plus rentable que des reprises dossier par dossier.",
    signalItems: [
      "Les mêmes pièces sont redemandées plusieurs fois au client.",
      "Le commercial devient le relais administratif du dossier après signature.",
      "Vous ne savez pas immédiatement quelles DP sont prêtes, déposées, bloquées ou à relancer.",
    ],
    caseStudy: {
      title: "Flux installateur DP",
      volume: "10 à 50 dossiers / mois",
      results: [
        "Dossiers cadrés plus tôt",
        "Moins de demandes de complément",
        "Charge administrative interne réduite",
      ],
    },
    faqItems: [
      {
        question: "Peut-on sous-traiter uniquement les déclarations préalables solaires ?",
        answer:
          "Oui. Sunelys peut intervenir uniquement sur les DP ou intégrer ce bloc dans un pilotage administratif plus complet.",
      },
      {
        question: "À partir de quel volume la sous-traitance devient-elle intéressante ?",
        answer:
          "Elle devient utile dès que les DP ralentissent vos équipes ou créent des relances récurrentes. Le volume mensuel sert ensuite à organiser le flux de traitement.",
      },
      {
        question: "Sunelys remplace-t-il l'installateur dans la relation client ?",
        answer:
          "Non. Sunelys agit comme relais administratif. L'installateur garde la relation commerciale et chantier.",
      },
      {
        question: "Comment démarrer ?",
        answer:
          "Un cadrage permet d'identifier vos volumes, les pièces disponibles, les irritants et le niveau de délégation adapté.",
      },
    ],
    finalTitle: "Sous-traitez vos DP solaires avec un cadre clair.",
    finalText:
      "Recevez une première lecture de votre volume et du périmètre à déléguer pour réduire les retours et soulager vos équipes.",
    guideLinks: [
      {
        href: "/blog/sous-traiter-declaration-prealable-photovoltaique",
        label: "Sous-traiter ses DP PV",
        description: "Définir le périmètre, la méthode et les garde-fous de délégation.",
      },
      {
        href: "/blog/cerfa-declaration-prealable-panneaux-solaires",
        label: "Cerfa DP panneaux solaires",
        description: "Sécuriser le formulaire et les champs sensibles avant dépôt.",
      },
      {
        href: "/blog/declaration-prealable-panneaux-solaires-pieces-delais",
        label: "Pièces et délais DP solaire",
        description: "Cadrer les dossiers avant dépôt pour éviter les compléments.",
      },
      {
        href: "/blog/declaration-prealable-panneaux-solaires-erreurs",
        label: "Erreurs fréquentes en DP",
        description: "Repérer les irritants qui consomment du temps interne.",
      },
      {
        href: "/blog/externalisation-administrative-solaire-volume",
        label: "Quand externaliser ?",
        description: "Comparer charge interne, volume et intérêt de la délégation.",
      },
    ],
    internalLinks: [
      { href: "/tarif-declaration-prealable-photovoltaique", label: "Tarif DP photovoltaïque" },
      { href: "/declaration-prealable-panneaux-solaires", label: "Service déclaration préalable" },
      { href: "/blog/sous-traiter-declaration-prealable-photovoltaique", label: "Sous-traiter ses DP photovoltaïques" },
      { href: "/blog/cerfa-declaration-prealable-panneaux-solaires", label: "Cerfa DP panneaux solaires" },
      { href: "/blog/declaration-prealable-panneaux-solaires-pieces-delais", label: "Pièces et délais DP" },
      { href: "/gestion-administrative-photovoltaique", label: "Gestion administrative photovoltaïque" },
      { href: "/contact", label: "Contacter Sunelys" },
    ],
  },
  tarifDeclarationPrealable: {
    slug: "tarif_declaration_prealable",
    metaTitle: "Tarif déclaration préalable photovoltaïque | Sunelys",
    metaDescription:
      "Tarifs DP photovoltaïque Sunelys: formule complète 119 EUR HT, raccordement + Consuel 89 EUR HT, chaîne complète 199 EUR HT.",
    heroTitle: "Tarif déclaration préalable photovoltaïque pour installateurs",
    heroSubtitle:
      "Sunelys propose des tarifs au dossier pour les installateurs: DP complète avec dépôt et suivi, raccordement + Consuel ou chaîne administrative complète DP, raccordement et Consuel.",
    fitTitle: "Quand vous voulez un coût clair par DP avant de déléguer.",
    fitIntro:
      "Cette page aide les installateurs à évaluer le budget de sous-traitance DP avant de confier un flux régulier à Sunelys.",
    fitItems: [
      "Vous voulez comparer le coût d'une DP sous-traitée au temps passé en interne.",
      "Vous avez besoin d'un prix unitaire lisible avant de déléguer.",
      "Vous cherchez un partenaire capable de suivre les dépôts, pas seulement de produire des pièces.",
    ],
    proof: {
      quote:
        "Nous sommes ravis des délais, du suivi et de la réactivité de Sunelys. Le pilotage est plus fluide, les réponses arrivent vite et cela nous permet d'installer nos chantiers beaucoup plus rapidement.",
      author: "Victorion Brice",
      role: "gérant de Be Travaux",
      highlights: [
        "DP complète à 119 EUR HT / dossier",
        "Raccordement + Consuel à 89 EUR HT / dossier",
        "Chaîne complète à 199 EUR HT / dossier",
      ],
    },
    problemTitle: "Le vrai coût d'une DP n'est pas seulement le prix de production",
    problemIntro:
      "Une déclaration préalable mobilise du temps de collecte, de contrôle, de production, de dépôt, de suivi et parfois de reprise après demande de complément.",
    problemItems: [
      {
        title: "Temps interne masqué",
        text: "Le coût réel inclut les relances client, la vérification des pièces et le suivi du retour mairie.",
      },
      {
        title: "Variabilité des dossiers",
        text: "Une DP simple et une DP avec pièces à reprendre ne consomment pas la même énergie opérationnelle.",
      },
      {
        title: "Effet volume",
        text: "Plus le flux est régulier, plus la méthode de transmission, de contrôle et de suivi doit être structurée.",
      },
      {
        title: "Impact chantier",
        text: "Un dossier incomplet peut coûter plus cher en délai perdu qu'en production administrative.",
      },
    ],
    scopeItems: [
      "Déclaration préalable complète: 119 EUR HT par dossier",
      "Raccordement réseau + Consuel: 89 EUR HT par dossier",
      "Chaîne administrative complète DP + raccordement + Consuel: 199 EUR HT par dossier",
      "Tarifs unitaires fixes par dossier",
    ],
    detailBlocks: [
      {
        title: "Ce qui influence le prix",
        text: "Le prix dépend du périmètre confié: DP complète avec dépôt et suivi, raccordement + Consuel ou chaîne administrative complète. Le flux mensuel sert à organiser le traitement, pas à modifier les tarifs unitaires publics.",
      },
      {
        title: "Prix par dossier ou accompagnement complet",
        text: "La DP complète est proposée à 119 EUR HT par dossier, le raccordement + Consuel à 89 EUR HT et la chaîne administrative complète à 199 EUR HT. Cette dernière centralise DP, raccordement et Consuel avec un interlocuteur unique.",
      },
      {
        title: "Garantie DP complète",
        text: "La garantie zéro pièce complémentaire s'applique à la formule DP complète lorsque le dépôt et le suivi sont assurés par Sunelys. Les tarifs publics restent des prix unitaires fixes par dossier.",
      },
    ],
    processSteps: [
      "Vous indiquez votre volume mensuel",
      "Nous identifions le niveau de prise en charge",
      "Nous cadrons le tarif par dossier",
      "Vous démarrez avec un flux test ou récurrent",
    ],
    signalTitle: "Les bons signaux pour demander un tarif DP",
    signalIntro:
      "Le bon moment pour chiffrer arrive quand l'administratif commence à peser sur votre capacité commerciale ou chantier.",
    signalItems: [
      "Vos équipes passent plusieurs heures par semaine sur les DP.",
      "Le volume signé augmente mais le suivi administratif reste manuel.",
      "Vous voulez connaître le coût réel d'une externalisation avant de recruter.",
    ],
    caseStudy: {
      title: "Installateur solaire",
      volume: "Flux DP récurrent",
      results: [
        "Prix par dossier plus lisible",
        "Facturation basée sur les dossiers traités",
        "Délégation progressive sans engagement lourd",
      ],
    },
    faqItems: [
      {
        question: "Quel est le tarif d'une déclaration préalable photovoltaïque ?",
        answer:
          "La déclaration préalable complète est proposée à 119 EUR HT par dossier. Elle inclut les pièces, le dépôt en mairie et le suivi de l'instruction jusqu'à validation.",
      },
      {
        question: "Le tarif inclut-il le suivi mairie ?",
        answer:
          "Oui pour la formule DP complète, qui inclut les pièces, le dépôt en mairie et le suivi de l'instruction jusqu'à validation.",
      },
      {
        question: "Quel est le tarif de la chaîne administrative complète ?",
        answer:
          "La formule complète DP, raccordement réseau et Consuel est proposée à 199 EUR HT par dossier, avec interlocuteur unique et pilotage de A à Z.",
      },
      {
        question: "Y a-t-il un engagement de volume ?",
        answer:
          "Non. Les tarifs unitaires sont fixes par dossier et la facturation suit les dossiers réellement traités.",
      },
      {
        question: "Les tarifs sont-ils fixes ?",
        answer:
          "Oui. Les tarifs publics transmis sont des prix unitaires fixes par dossier.",
      },
    ],
    finalTitle: "Obtenez un tarif DP clair par dossier.",
    finalText:
      "Indiquez votre flux mensuel et recevez un cadrage clair pour savoir combien coûterait la délégation de vos déclarations préalables.",
    guideLinks: [
      {
        href: "/blog/externalisation-administrative-solaire-volume",
        label: "Rentabilité de l'externalisation",
        description: "Identifier le coût caché du traitement administratif interne.",
      },
      {
        href: "/blog/cerfa-declaration-prealable-panneaux-solaires",
        label: "Cerfa DP panneaux solaires",
        description: "Comprendre le formulaire inclus dans le périmètre d'une DP.",
      },
      {
        href: "/blog/declaration-prealable-panneaux-solaires-pieces-delais",
        label: "Pièces et délais DP solaire",
        description: "Comprendre le périmètre réel d'un dossier complet.",
      },
      {
        href: "/blog/declaration-prealable-panneaux-solaires-erreurs",
        label: "Erreurs à éviter",
        description: "Limiter les reprises qui font grimper le coût opérationnel.",
      },
    ],
    internalLinks: [
      { href: "/sous-traitance-declaration-prealable-solaire", label: "Sous-traitance DP solaire" },
      { href: "/tarifs", label: "Tous les tarifs Sunelys" },
      { href: "/declaration-prealable-panneaux-solaires", label: "Service déclaration préalable" },
      { href: "/blog/cerfa-declaration-prealable-panneaux-solaires", label: "Cerfa DP panneaux solaires" },
      { href: "/blog/declaration-prealable-panneaux-solaires-pieces-delais", label: "Pièces et délais DP" },
      { href: "/contact", label: "Recevoir un cadrage" },
    ],
  },
};
