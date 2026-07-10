/**
 * Sunelys Google Ads bulk apply: campaigns.
 * Generated locally from docs/google-ads-web-upload.
 * This script calls upload.apply().
 */
function main() {
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
