export function normalizeGuideQuery(value) {
  return String(value ?? "").normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLocaleLowerCase("fr").trim();
}

export function matchesGuide(guide, query = "", category = "") {
  if (category && guide.category !== category) return false;
  const text = normalizeGuideQuery([guide.title, guide.description, guide.category].join(" "));
  return normalizeGuideQuery(query).split(/\s+/).filter(Boolean).every((word) => text.includes(word));
}
