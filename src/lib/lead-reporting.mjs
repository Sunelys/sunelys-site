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
