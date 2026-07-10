/**
 * Sunelys Google Ads bulk apply: keywords.
 * Generated locally from docs/google-ads-web-upload.
 * This script calls upload.apply().
 */
function main() {
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
