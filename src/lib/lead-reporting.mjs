// A marker excludes a known technical test; a name alone only flags review.
export function classifyLead({ email = '', message = '', status = '', name = '' } = {}) {
  const explicitTest = /\[SUNELYS_TEST\]/i.test(message) || /@(?:example\.(?:com|org|net|test)|[^@]*\.test)$/i.test(email) || /^(test|test technique)$/i.test(status.trim());
  const review = !explicitTest && /\b(test|recette|audit technique)\b/i.test(`${name} ${message}`);
  return explicitTest ? 'test' : review ? 'review' : 'unverified';
}
export function inclusiveDateRange(days, lagDays = 0, now = new Date()) {
  const end = new Date(now);
  end.setUTCDate(end.getUTCDate() - lagDays);
  const start = new Date(end);
  start.setUTCDate(start.getUTCDate() - (Math.max(1, days) - 1));
  return { startDate: start.toISOString().slice(0,10), endDate: end.toISOString().slice(0,10) };
}

export function leadDisposition({ status = '', recordId = '' } = {}, reviews = {}) {
  const normalized = status.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().trim();
  if (/\b(spam|demarchage|hors cible|non qualifie|non qualifiee|perdu)\b/.test(normalized)) return 'non_commercial';
  if (/^(qualifie|qualifiee|qualified|rdv|opportunite|proposition|devis|client|gagne)(\s|$)/.test(normalized)) return 'qualified';
  return reviews[recordId]?.disposition ?? 'unreviewed';
}

export function summarizeLeadDispositions(leads) {
  const summary = { submissions: leads.length, tests: 0, nonCommercial: 0, candidates: 0, qualified: 0, unreviewed: 0 };
  for (const lead of leads) {
    if (lead.isTest || lead.disposition === 'test') summary.tests++;
    else if (lead.disposition === 'non_commercial') summary.nonCommercial++;
    else if (lead.disposition === 'candidate') summary.candidates++;
    else if (lead.disposition === 'qualified') summary.qualified++;
    else summary.unreviewed++;
  }
  return summary;
}
