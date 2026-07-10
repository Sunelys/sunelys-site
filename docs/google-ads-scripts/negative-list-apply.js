function main() {
  const listName = 'Sunelys - Exclusions Search B2B';
  const targetCampaignNames = [
    'Search - Pilotage admin PV',
    'Search - Sous-traitance DP',
    'Search - Consuel Raccordement'
  ];
  const negatives = [
    'particulier',
    'aide panneau solaire',
    'prime panneau solaire',
    'ma prime renov',
    'gratuit pdf',
    'cerfa pdf',
    'schema gratuit',
    'forum',
    'avis particulier',
    'emploi',
    'recrutement',
    'formation',
    'stage',
    'salaire',
    'bricolage',
    'kit solaire',
    'batterie solaire',
    'panneau solaire prix particulier',
    'simulateur',
    'modele gratuit',
    'exemple gratuit'
  ];

  const list = getOrCreateNegativeKeywordList(listName);
  const existing = {};
  const negativeIterator = list.negativeKeywords().get();
  while (negativeIterator.hasNext()) {
    const keyword = negativeIterator.next();
    existing[keyword.getText().toLowerCase()] = true;
  }

  const missing = negatives.filter(function(keyword) {
    return !existing[keyword.toLowerCase()];
  });
  if (missing.length) {
    list.addNegativeKeywords(missing);
  }

  const attachedCampaignIds = {};
  const attachedCampaignIterator = list.campaigns().get();
  while (attachedCampaignIterator.hasNext()) {
    attachedCampaignIds[attachedCampaignIterator.next().getId()] = true;
  }

  let attachedCount = 0;
  const campaignIterator = AdsApp.campaigns()
    .withCondition('Status in [ENABLED, PAUSED]')
    .get();
  while (campaignIterator.hasNext()) {
    const campaign = campaignIterator.next();
    if (targetCampaignNames.indexOf(campaign.getName()) === -1) {
      continue;
    }
    if (!attachedCampaignIds[campaign.getId()]) {
      campaign.addNegativeKeywordList(list);
      attachedCount++;
    }
  }

  Logger.log('Negative list: ' + listName);
  Logger.log('Keywords added: ' + missing.length);
  Logger.log('Campaign attachments added: ' + attachedCount);
}

function getOrCreateNegativeKeywordList(listName) {
  const iterator = AdsApp.negativeKeywordLists()
    .withCondition("Name = '" + listName.replace(/'/g, "\\'") + "'")
    .get();
  if (iterator.hasNext()) {
    return iterator.next();
  }
  return AdsApp.newNegativeKeywordListBuilder()
    .withName(listName)
    .build()
    .getResult();
}
