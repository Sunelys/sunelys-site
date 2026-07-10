/**
 * Sunelys - import Search en pause.
 * Cree 3 campagnes Search, 6 groupes, 26 mots-cles et 6 annonces responsives.
 * Tout est importe en pause. Ne pas activer sans controle conversion.
 */

function run_campaigns() {
  const columns = [
  "Action",
  "Campaign status",
  "Campaign",
  "Campaign type",
  "Networks",
  "Budget",
  "Budget type",
  "Bid strategy type",
  "Language",
  "Location",
  "Final URL suffix",
  "Label"
];
  const rows = [
  {
    "Action": "Add",
    "Campaign status": "Paused",
    "Campaign": "Search - Pilotage admin PV",
    "Campaign type": "Search",
    "Networks": "Google Search",
    "Budget": "4",
    "Budget type": "Daily",
    "Bid strategy type": "Manual CPC",
    "Language": "fr",
    "Location": "France",
    "Final URL suffix": "utm_source=google&utm_medium=cpc&utm_campaign=search_pilotage_admin_pv&utm_content={creative}&utm_term={keyword}",
    "Label": "Sunelys lead gen test 10eur daily"
  },
  {
    "Action": "Add",
    "Campaign status": "Paused",
    "Campaign": "Search - Sous-traitance DP",
    "Campaign type": "Search",
    "Networks": "Google Search",
    "Budget": "3",
    "Budget type": "Daily",
    "Bid strategy type": "Manual CPC",
    "Language": "fr",
    "Location": "France",
    "Final URL suffix": "utm_source=google&utm_medium=cpc&utm_campaign=search_sous_traitance_dp&utm_content={creative}&utm_term={keyword}",
    "Label": "Sunelys lead gen test 10eur daily"
  },
  {
    "Action": "Add",
    "Campaign status": "Paused",
    "Campaign": "Search - Consuel Raccordement",
    "Campaign type": "Search",
    "Networks": "Google Search",
    "Budget": "3",
    "Budget type": "Daily",
    "Bid strategy type": "Manual CPC",
    "Language": "fr",
    "Location": "France",
    "Final URL suffix": "utm_source=google&utm_medium=cpc&utm_campaign=search_consuel_raccordement&utm_content={creative}&utm_term={keyword}",
    "Label": "Sunelys lead gen test 10eur daily"
  }
];
  const upload = AdsApp.bulkUploads().newCsvUpload(columns, {
    moneyInMicros: false,
    fileLocale: 'en_US'
  });

  rows.forEach(function(row) {
    upload.append(row);
  });

  upload.forCampaignManagement();
  upload.apply();
}

function run_adGroups() {
  const columns = [
  "Action",
  "Campaign",
  "Ad group",
  "Status"
];
  const rows = [
  {
    "Action": "Add",
    "Campaign": "Search - Pilotage admin PV",
    "Ad group": "Pilotage complet",
    "Status": "Paused"
  },
  {
    "Action": "Add",
    "Campaign": "Search - Pilotage admin PV",
    "Ad group": "Externalisation administrative",
    "Status": "Paused"
  },
  {
    "Action": "Add",
    "Campaign": "Search - Sous-traitance DP",
    "Ad group": "Sous-traitance DP",
    "Status": "Paused"
  },
  {
    "Action": "Add",
    "Campaign": "Search - Sous-traitance DP",
    "Ad group": "Blocage mairie DP",
    "Status": "Paused"
  },
  {
    "Action": "Add",
    "Campaign": "Search - Consuel Raccordement",
    "Ad group": "Consuel PV",
    "Status": "Paused"
  },
  {
    "Action": "Add",
    "Campaign": "Search - Consuel Raccordement",
    "Ad group": "Raccordement Enedis",
    "Status": "Paused"
  }
];
  const upload = AdsApp.bulkUploads().newCsvUpload(columns, {
    moneyInMicros: false,
    fileLocale: 'en_US'
  });

  rows.forEach(function(row) {
    upload.append(row);
  });

  upload.forCampaignManagement();
  upload.apply();
}

function run_keywords() {
  const columns = [
  "Action",
  "Keyword status",
  "Campaign",
  "Ad group",
  "Keyword",
  "Match Type",
  "Default max. CPC",
  "Final URL",
  "Label"
];
  const rows = [
  {
    "Action": "Add",
    "Keyword status": "Paused",
    "Campaign": "Search - Pilotage admin PV",
    "Ad group": "Pilotage complet",
    "Keyword": "gestion administrative photovoltaïque",
    "Match Type": "Phrase match",
    "Default max. CPC": "1.50",
    "Final URL": "https://sunelys.fr/gestion-administrative-photovoltaique?utm_source=google&utm_medium=cpc&utm_campaign=search_pilotage_admin_pv&utm_content=pilotage_complet",
    "Label": "Pilotage global"
  },
  {
    "Action": "Add",
    "Keyword status": "Paused",
    "Campaign": "Search - Pilotage admin PV",
    "Ad group": "Pilotage complet",
    "Keyword": "gestion administrative photovoltaïque",
    "Match Type": "Exact match",
    "Default max. CPC": "1.50",
    "Final URL": "https://sunelys.fr/gestion-administrative-photovoltaique?utm_source=google&utm_medium=cpc&utm_campaign=search_pilotage_admin_pv&utm_content=pilotage_complet",
    "Label": "Pilotage global"
  },
  {
    "Action": "Add",
    "Keyword status": "Paused",
    "Campaign": "Search - Pilotage admin PV",
    "Ad group": "Pilotage complet",
    "Keyword": "pilotage administratif photovoltaïque",
    "Match Type": "Phrase match",
    "Default max. CPC": "1.50",
    "Final URL": "https://sunelys.fr/gestion-administrative-photovoltaique?utm_source=google&utm_medium=cpc&utm_campaign=search_pilotage_admin_pv&utm_content=pilotage_complet",
    "Label": "Pilotage global"
  },
  {
    "Action": "Add",
    "Keyword status": "Paused",
    "Campaign": "Search - Pilotage admin PV",
    "Ad group": "Pilotage complet",
    "Keyword": "gestion dossier photovoltaïque",
    "Match Type": "Phrase match",
    "Default max. CPC": "1.50",
    "Final URL": "https://sunelys.fr/gestion-administrative-photovoltaique?utm_source=google&utm_medium=cpc&utm_campaign=search_pilotage_admin_pv&utm_content=pilotage_complet",
    "Label": "Pilotage global"
  },
  {
    "Action": "Add",
    "Keyword status": "Paused",
    "Campaign": "Search - Pilotage admin PV",
    "Ad group": "Pilotage complet",
    "Keyword": "suivi administratif photovoltaïque",
    "Match Type": "Phrase match",
    "Default max. CPC": "1.50",
    "Final URL": "https://sunelys.fr/gestion-administrative-photovoltaique?utm_source=google&utm_medium=cpc&utm_campaign=search_pilotage_admin_pv&utm_content=pilotage_complet",
    "Label": "Pilotage global"
  },
  {
    "Action": "Add",
    "Keyword status": "Paused",
    "Campaign": "Search - Pilotage admin PV",
    "Ad group": "Externalisation administrative",
    "Keyword": "externaliser administratif photovoltaïque",
    "Match Type": "Phrase match",
    "Default max. CPC": "1.50",
    "Final URL": "https://sunelys.fr/gestion-administrative-photovoltaique?utm_source=google&utm_medium=cpc&utm_campaign=search_pilotage_admin_pv&utm_content=externalisation_administrative",
    "Label": "Externalisation"
  },
  {
    "Action": "Add",
    "Keyword status": "Paused",
    "Campaign": "Search - Pilotage admin PV",
    "Ad group": "Externalisation administrative",
    "Keyword": "externaliser administratif photovoltaïque",
    "Match Type": "Exact match",
    "Default max. CPC": "1.50",
    "Final URL": "https://sunelys.fr/gestion-administrative-photovoltaique?utm_source=google&utm_medium=cpc&utm_campaign=search_pilotage_admin_pv&utm_content=externalisation_administrative",
    "Label": "Externalisation"
  },
  {
    "Action": "Add",
    "Keyword status": "Paused",
    "Campaign": "Search - Pilotage admin PV",
    "Ad group": "Externalisation administrative",
    "Keyword": "sous traiter administratif solaire",
    "Match Type": "Phrase match",
    "Default max. CPC": "1.50",
    "Final URL": "https://sunelys.fr/gestion-administrative-photovoltaique?utm_source=google&utm_medium=cpc&utm_campaign=search_pilotage_admin_pv&utm_content=externalisation_administrative",
    "Label": "Externalisation"
  },
  {
    "Action": "Add",
    "Keyword status": "Paused",
    "Campaign": "Search - Pilotage admin PV",
    "Ad group": "Externalisation administrative",
    "Keyword": "externalisation administrative solaire",
    "Match Type": "Phrase match",
    "Default max. CPC": "1.50",
    "Final URL": "https://sunelys.fr/gestion-administrative-photovoltaique?utm_source=google&utm_medium=cpc&utm_campaign=search_pilotage_admin_pv&utm_content=externalisation_administrative",
    "Label": "Externalisation"
  },
  {
    "Action": "Add",
    "Keyword status": "Paused",
    "Campaign": "Search - Pilotage admin PV",
    "Ad group": "Externalisation administrative",
    "Keyword": "prestataire administratif photovoltaïque",
    "Match Type": "Phrase match",
    "Default max. CPC": "1.50",
    "Final URL": "https://sunelys.fr/gestion-administrative-photovoltaique?utm_source=google&utm_medium=cpc&utm_campaign=search_pilotage_admin_pv&utm_content=externalisation_administrative",
    "Label": "Externalisation"
  },
  {
    "Action": "Add",
    "Keyword status": "Paused",
    "Campaign": "Search - Sous-traitance DP",
    "Ad group": "Sous-traitance DP",
    "Keyword": "sous traitance déclaration préalable photovoltaïque",
    "Match Type": "Phrase match",
    "Default max. CPC": "1.50",
    "Final URL": "https://sunelys.fr/sous-traitance-declaration-prealable-solaire?utm_source=google&utm_medium=cpc&utm_campaign=search_sous_traitance_dp&utm_content=sous_traitance_dp",
    "Label": "DP"
  },
  {
    "Action": "Add",
    "Keyword status": "Paused",
    "Campaign": "Search - Sous-traitance DP",
    "Ad group": "Sous-traitance DP",
    "Keyword": "sous traitance déclaration préalable photovoltaïque",
    "Match Type": "Exact match",
    "Default max. CPC": "1.50",
    "Final URL": "https://sunelys.fr/sous-traitance-declaration-prealable-solaire?utm_source=google&utm_medium=cpc&utm_campaign=search_sous_traitance_dp&utm_content=sous_traitance_dp",
    "Label": "DP"
  },
  {
    "Action": "Add",
    "Keyword status": "Paused",
    "Campaign": "Search - Sous-traitance DP",
    "Ad group": "Sous-traitance DP",
    "Keyword": "déléguer déclaration préalable solaire",
    "Match Type": "Phrase match",
    "Default max. CPC": "1.50",
    "Final URL": "https://sunelys.fr/sous-traitance-declaration-prealable-solaire?utm_source=google&utm_medium=cpc&utm_campaign=search_sous_traitance_dp&utm_content=sous_traitance_dp",
    "Label": "DP"
  },
  {
    "Action": "Add",
    "Keyword status": "Paused",
    "Campaign": "Search - Sous-traitance DP",
    "Ad group": "Sous-traitance DP",
    "Keyword": "declaration préalable panneaux solaires installateur",
    "Match Type": "Phrase match",
    "Default max. CPC": "1.50",
    "Final URL": "https://sunelys.fr/sous-traitance-declaration-prealable-solaire?utm_source=google&utm_medium=cpc&utm_campaign=search_sous_traitance_dp&utm_content=sous_traitance_dp",
    "Label": "DP"
  },
  {
    "Action": "Add",
    "Keyword status": "Paused",
    "Campaign": "Search - Sous-traitance DP",
    "Ad group": "Sous-traitance DP",
    "Keyword": "dossier dp photovoltaïque professionnel",
    "Match Type": "Phrase match",
    "Default max. CPC": "1.50",
    "Final URL": "https://sunelys.fr/sous-traitance-declaration-prealable-solaire?utm_source=google&utm_medium=cpc&utm_campaign=search_sous_traitance_dp&utm_content=sous_traitance_dp",
    "Label": "DP"
  },
  {
    "Action": "Add",
    "Keyword status": "Paused",
    "Campaign": "Search - Sous-traitance DP",
    "Ad group": "Blocage mairie DP",
    "Keyword": "complément mairie panneaux solaires",
    "Match Type": "Phrase match",
    "Default max. CPC": "1.50",
    "Final URL": "https://sunelys.fr/declaration-prealable-panneaux-solaires?utm_source=google&utm_medium=cpc&utm_campaign=search_sous_traitance_dp&utm_content=blocage_mairie_dp",
    "Label": "Blocage mairie"
  },
  {
    "Action": "Add",
    "Keyword status": "Paused",
    "Campaign": "Search - Sous-traitance DP",
    "Ad group": "Blocage mairie DP",
    "Keyword": "déclaration préalable refusée panneaux solaires",
    "Match Type": "Phrase match",
    "Default max. CPC": "1.50",
    "Final URL": "https://sunelys.fr/declaration-prealable-panneaux-solaires?utm_source=google&utm_medium=cpc&utm_campaign=search_sous_traitance_dp&utm_content=blocage_mairie_dp",
    "Label": "Blocage mairie"
  },
  {
    "Action": "Add",
    "Keyword status": "Paused",
    "Campaign": "Search - Sous-traitance DP",
    "Ad group": "Blocage mairie DP",
    "Keyword": "dossier déclaration préalable incomplet photovoltaïque",
    "Match Type": "Phrase match",
    "Default max. CPC": "1.50",
    "Final URL": "https://sunelys.fr/declaration-prealable-panneaux-solaires?utm_source=google&utm_medium=cpc&utm_campaign=search_sous_traitance_dp&utm_content=blocage_mairie_dp",
    "Label": "Blocage mairie"
  },
  {
    "Action": "Add",
    "Keyword status": "Paused",
    "Campaign": "Search - Consuel Raccordement",
    "Ad group": "Consuel PV",
    "Keyword": "dossier consuel photovoltaïque installateur",
    "Match Type": "Phrase match",
    "Default max. CPC": "1.50",
    "Final URL": "https://sunelys.fr/dossier-consuel-photovoltaique?utm_source=google&utm_medium=cpc&utm_campaign=search_consuel_raccordement&utm_content=consuel_pv",
    "Label": "Consuel"
  },
  {
    "Action": "Add",
    "Keyword status": "Paused",
    "Campaign": "Search - Consuel Raccordement",
    "Ad group": "Consuel PV",
    "Keyword": "dossier consuel photovoltaïque",
    "Match Type": "Exact match",
    "Default max. CPC": "1.50",
    "Final URL": "https://sunelys.fr/dossier-consuel-photovoltaique?utm_source=google&utm_medium=cpc&utm_campaign=search_consuel_raccordement&utm_content=consuel_pv",
    "Label": "Consuel"
  },
  {
    "Action": "Add",
    "Keyword status": "Paused",
    "Campaign": "Search - Consuel Raccordement",
    "Ad group": "Consuel PV",
    "Keyword": "consuel photovoltaïque dossier",
    "Match Type": "Phrase match",
    "Default max. CPC": "1.50",
    "Final URL": "https://sunelys.fr/dossier-consuel-photovoltaique?utm_source=google&utm_medium=cpc&utm_campaign=search_consuel_raccordement&utm_content=consuel_pv",
    "Label": "Consuel"
  },
  {
    "Action": "Add",
    "Keyword status": "Paused",
    "Campaign": "Search - Consuel Raccordement",
    "Ad group": "Consuel PV",
    "Keyword": "suivi consuel photovoltaïque",
    "Match Type": "Phrase match",
    "Default max. CPC": "1.50",
    "Final URL": "https://sunelys.fr/dossier-consuel-photovoltaique?utm_source=google&utm_medium=cpc&utm_campaign=search_consuel_raccordement&utm_content=consuel_pv",
    "Label": "Consuel"
  },
  {
    "Action": "Add",
    "Keyword status": "Paused",
    "Campaign": "Search - Consuel Raccordement",
    "Ad group": "Raccordement Enedis",
    "Keyword": "raccordement enedis photovoltaïque installateur",
    "Match Type": "Phrase match",
    "Default max. CPC": "1.50",
    "Final URL": "https://sunelys.fr/raccordement-enedis-photovoltaique?utm_source=google&utm_medium=cpc&utm_campaign=search_consuel_raccordement&utm_content=raccordement_enedis",
    "Label": "Raccordement"
  },
  {
    "Action": "Add",
    "Keyword status": "Paused",
    "Campaign": "Search - Consuel Raccordement",
    "Ad group": "Raccordement Enedis",
    "Keyword": "suivi raccordement photovoltaïque",
    "Match Type": "Phrase match",
    "Default max. CPC": "1.50",
    "Final URL": "https://sunelys.fr/raccordement-enedis-photovoltaique?utm_source=google&utm_medium=cpc&utm_campaign=search_consuel_raccordement&utm_content=raccordement_enedis",
    "Label": "Raccordement"
  },
  {
    "Action": "Add",
    "Keyword status": "Paused",
    "Campaign": "Search - Consuel Raccordement",
    "Ad group": "Raccordement Enedis",
    "Keyword": "dossier raccordement enedis photovoltaïque",
    "Match Type": "Phrase match",
    "Default max. CPC": "1.50",
    "Final URL": "https://sunelys.fr/raccordement-enedis-photovoltaique?utm_source=google&utm_medium=cpc&utm_campaign=search_consuel_raccordement&utm_content=raccordement_enedis",
    "Label": "Raccordement"
  },
  {
    "Action": "Add",
    "Keyword status": "Paused",
    "Campaign": "Search - Consuel Raccordement",
    "Ad group": "Raccordement Enedis",
    "Keyword": "raccordement enedis photovoltaïque",
    "Match Type": "Exact match",
    "Default max. CPC": "1.50",
    "Final URL": "https://sunelys.fr/raccordement-enedis-photovoltaique?utm_source=google&utm_medium=cpc&utm_campaign=search_consuel_raccordement&utm_content=raccordement_enedis",
    "Label": "Raccordement"
  }
];
  const upload = AdsApp.bulkUploads().newCsvUpload(columns, {
    moneyInMicros: false,
    fileLocale: 'en_US'
  });

  rows.forEach(function(row) {
    upload.append(row);
  });

  upload.forCampaignManagement();
  upload.apply();
}

function run_responsiveSearchAds() {
  const columns = [
  "Action",
  "Ad status",
  "Campaign",
  "Ad group",
  "Ad type",
  "Headline 1",
  "Headline 2",
  "Headline 3",
  "Headline 4",
  "Headline 5",
  "Headline 6",
  "Headline 7",
  "Headline 8",
  "Headline 9",
  "Headline 10",
  "Description",
  "Description 2",
  "Description 3",
  "Description 4",
  "Path 1",
  "Path 2",
  "Final URL",
  "Label"
];
  const rows = [
  {
    "Action": "Add",
    "Ad status": "Paused",
    "Campaign": "Search - Pilotage admin PV",
    "Ad group": "Pilotage complet",
    "Ad type": "Responsive search ad",
    "Headline 1": "Diagnostic gratuit",
    "Headline 2": "Pilotage complet",
    "Headline 3": "DP Consuel Raccordement",
    "Headline 4": "Pour installateurs PV",
    "Headline 5": "Reponse sous 24h",
    "Headline 6": "Gagnez du temps",
    "Headline 7": "Flux administratif clair",
    "Headline 8": "Visibilite par dossier",
    "Headline 9": "Tarifs fixes dossier",
    "Headline 10": "Admin solaire pilotee",
    "Description": "Sunelys pilote DP, Consuel et raccordement pour vos dossiers photovoltaiques.",
    "Description 2": "Recevez un diagnostic gratuit sous 24h et le premier perimetre a deleguer.",
    "Description 3": "Tarifs fixes par dossier pour les installateurs qui traitent du volume.",
    "Description 4": "Reduisez les retours, relances et blocages avant chantier ou mise en service.",
    "Path 1": "pilotage",
    "Path 2": "admin-pv",
    "Final URL": "https://sunelys.fr/gestion-administrative-photovoltaique?utm_source=google&utm_medium=cpc&utm_campaign=search_pilotage_admin_pv&utm_content=rsa_diagnostic",
    "Label": "Diagnostic dossiers bloques"
  },
  {
    "Action": "Add",
    "Ad status": "Paused",
    "Campaign": "Search - Pilotage admin PV",
    "Ad group": "Externalisation administrative",
    "Ad type": "Responsive search ad",
    "Headline 1": "Externalisez vos dossiers",
    "Headline 2": "Diagnostic gratuit",
    "Headline 3": "Admin solaire pilotee",
    "Headline 4": "Pilotage complet",
    "Headline 5": "Pour installateurs PV",
    "Headline 6": "Reponse sous 24h",
    "Headline 7": "Moins de retours",
    "Headline 8": "Gagnez du temps",
    "Headline 9": "Tarifs fixes dossier",
    "Headline 10": "Flux administratif clair",
    "Description": "Externalisez DP, Consuel et raccordement sans perdre la visibilite sur vos dossiers.",
    "Description 2": "Sunelys reprend le flux administratif prioritaire et repond sous 24h.",
    "Description 3": "Un diagnostic clair pour savoir quoi deleguer avant de changer votre organisation.",
    "Description 4": "Ideal pour les structures solaires avec volume recurrent de dossiers.",
    "Path 1": "externaliser",
    "Path 2": "admin-pv",
    "Final URL": "https://sunelys.fr/gestion-administrative-photovoltaique?utm_source=google&utm_medium=cpc&utm_campaign=search_pilotage_admin_pv&utm_content=rsa_diagnostic",
    "Label": "Diagnostic dossiers bloques"
  },
  {
    "Action": "Add",
    "Ad status": "Paused",
    "Campaign": "Search - Sous-traitance DP",
    "Ad group": "Sous-traitance DP",
    "Ad type": "Responsive search ad",
    "Headline 1": "Sous-traitez vos DP",
    "Headline 2": "Evitez retours mairie",
    "Headline 3": "Diagnostic gratuit",
    "Headline 4": "Reponse sous 24h",
    "Headline 5": "Pour installateurs PV",
    "Headline 6": "DP solaire sans friction",
    "Headline 7": "Tarifs fixes dossier",
    "Headline 8": "Moins de retours",
    "Headline 9": "Dossiers PV bloques",
    "Headline 10": "Cadrage en 15 min",
    "Description": "Sunelys cadre, controle et suit vos declarations prealables photovoltaiques.",
    "Description 2": "Recevez un diagnostic gratuit pour prioriser vos DP a reprendre.",
    "Description 3": "Reduisez les complements mairie et gardez une vision claire par dossier.",
    "Description 4": "Tarifs unitaires fixes pour traiter un flux recurrent de dossiers DP.",
    "Path 1": "dp",
    "Path 2": "sous-traitance",
    "Final URL": "https://sunelys.fr/sous-traitance-declaration-prealable-solaire?utm_source=google&utm_medium=cpc&utm_campaign=search_sous_traitance_dp&utm_content=rsa_diagnostic",
    "Label": "Diagnostic dossiers bloques"
  },
  {
    "Action": "Add",
    "Ad status": "Paused",
    "Campaign": "Search - Sous-traitance DP",
    "Ad group": "Blocage mairie DP",
    "Ad type": "Responsive search ad",
    "Headline 1": "Evitez retours mairie",
    "Headline 2": "Dossiers PV bloques",
    "Headline 3": "Diagnostic gratuit",
    "Headline 4": "DP solaire sans friction",
    "Headline 5": "Reponse sous 24h",
    "Headline 6": "Sous-traitez vos DP",
    "Headline 7": "Moins de retours",
    "Headline 8": "Pour installateurs PV",
    "Headline 9": "Cadrage en 15 min",
    "Headline 10": "Tarifs fixes dossier",
    "Description": "Un complement mairie ralentit vos chantiers ? Sunelys aide a cadrer la reprise.",
    "Description 2": "Identifiez les points bloquants et le premier perimetre a deleguer.",
    "Description 3": "Diagnostic gratuit sous 24h pour installateurs photovoltaiques.",
    "Description 4": "DP, pieces, suivi et relances dans un flux plus lisible.",
    "Path 1": "dp",
    "Path 2": "mairie",
    "Final URL": "https://sunelys.fr/declaration-prealable-panneaux-solaires?utm_source=google&utm_medium=cpc&utm_campaign=search_sous_traitance_dp&utm_content=rsa_diagnostic",
    "Label": "Diagnostic dossiers bloques"
  },
  {
    "Action": "Add",
    "Ad status": "Paused",
    "Campaign": "Search - Consuel Raccordement",
    "Ad group": "Consuel PV",
    "Ad type": "Responsive search ad",
    "Headline 1": "Dossier Consuel suivi",
    "Headline 2": "Diagnostic gratuit",
    "Headline 3": "Besoin urgent ?",
    "Headline 4": "Reponse sous 24h",
    "Headline 5": "Pour installateurs PV",
    "Headline 6": "Mise en service fluide",
    "Headline 7": "Pilotage complet",
    "Headline 8": "Moins de retours",
    "Headline 9": "Dossiers PV bloques",
    "Headline 10": "Visibilite par dossier",
    "Description": "Sunelys prepare et suit vos dossiers Consuel photovoltaiques jusqu'a validation.",
    "Description 2": "Diagnostic gratuit pour identifier ce qui bloque la mise en service.",
    "Description 3": "Gardez une vision claire sur les pieces, relances et statuts Consuel.",
    "Description 4": "Un relais administratif pour les installateurs qui traitent du volume.",
    "Path 1": "consuel",
    "Path 2": "pv",
    "Final URL": "https://sunelys.fr/dossier-consuel-photovoltaique?utm_source=google&utm_medium=cpc&utm_campaign=search_consuel_raccordement&utm_content=rsa_diagnostic",
    "Label": "Diagnostic dossiers bloques"
  },
  {
    "Action": "Add",
    "Ad status": "Paused",
    "Campaign": "Search - Consuel Raccordement",
    "Ad group": "Raccordement Enedis",
    "Ad type": "Responsive search ad",
    "Headline 1": "Raccordement suivi",
    "Headline 2": "Diagnostic gratuit",
    "Headline 3": "Besoin urgent ?",
    "Headline 4": "Reponse sous 24h",
    "Headline 5": "Pour installateurs PV",
    "Headline 6": "Pilotage complet",
    "Headline 7": "Dossiers PV bloques",
    "Headline 8": "Visibilite par dossier",
    "Headline 9": "Moins de retours",
    "Headline 10": "Flux administratif clair",
    "Description": "Sunelys suit les dossiers Enedis pour reduire les angles morts administratifs.",
    "Description 2": "Recevez un diagnostic gratuit sur votre blocage raccordement ou mise en service.",
    "Description 3": "DP, Consuel et raccordement peuvent etre pilotes dans un meme flux.",
    "Description 4": "Plus de visibilite sur les statuts, relances et pieces attendues.",
    "Path 1": "raccordement",
    "Path 2": "enedis",
    "Final URL": "https://sunelys.fr/raccordement-enedis-photovoltaique?utm_source=google&utm_medium=cpc&utm_campaign=search_consuel_raccordement&utm_content=rsa_diagnostic",
    "Label": "Diagnostic dossiers bloques"
  }
];
  const upload = AdsApp.bulkUploads().newCsvUpload(columns, {
    moneyInMicros: false,
    fileLocale: 'en_US'
  });

  rows.forEach(function(row) {
    upload.append(row);
  });

  upload.forCampaignManagement();
  upload.apply();
}

function main() {
  run_campaigns();
  run_adGroups();
  run_keywords();
  run_responsiveSearchAds();
}
