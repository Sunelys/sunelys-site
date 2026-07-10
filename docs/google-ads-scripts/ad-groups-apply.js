/**
 * Sunelys Google Ads bulk apply: ad-groups.
 * Generated locally from docs/google-ads-web-upload.
 * This script calls upload.apply().
 */
function main() {
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
