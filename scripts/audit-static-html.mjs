import { access, readdir, readFile } from "node:fs/promises";
import path from "node:path";

const candidates = [".vercel/output/static", "dist/client"];

const outputRoot = await (async () => {
  for (const candidate of candidates) {
    try {
      await access(candidate);
      return candidate;
    } catch {
      // Try the next Astro output location.
    }
  }
  return null;
})();

if (!outputRoot) {
  console.error("Audit statique impossible : lancez d'abord `npm run build`.");
  process.exit(1);
}

const collectHtml = async (directory) => {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = await Promise.all(
    entries.map(async (entry) => {
      const entryPath = path.join(directory, entry.name);
      if (entry.isDirectory()) return collectHtml(entryPath);
      return entry.isFile() && entry.name.endsWith(".html") ? [entryPath] : [];
    }),
  );
  return files.flat();
};

const htmlFiles = await collectHtml(outputRoot);

if (htmlFiles.length === 0) {
  console.error(`Audit statique impossible : aucune page HTML dans ${outputRoot}.`);
  process.exit(1);
}

const openingTags = (html, tagName) =>
  html.match(new RegExp(`<${tagName}\\b[^>]*>`, "gi")) ?? [];

const hasAttribute = (tag, attribute, expectedValue) => {
  const match = tag.match(
    new RegExp(`\\b${attribute}\\s*=\\s*(?:"([^"]*)"|'([^']*)'|([^\\s>]+))`, "i"),
  );
  if (!match) return false;
  if (expectedValue === undefined) return true;
  return (match[1] ?? match[2] ?? match[3] ?? "").toLowerCase() === expectedValue;
};

const failures = [];

for (const file of htmlFiles) {
  const html = await readFile(file, "utf8");
  const page = `/${path.relative(outputRoot, file).replace(/\\/g, "/")}`;
  const report = (message) => failures.push(`${page} — ${message}`);
  const h1Count = openingTags(html, "h1").length;
  const images = openingTags(html, "img");
  const buttons = openingTags(html, "button");
  const anchors = openingTags(html, "a");
  const leadForms = openingTags(html, "form").filter((tag) =>
    /\bdata-lead-form(?:\s|=|>)/i.test(tag),
  );
  const htmlTag = openingTags(html, "html")[0] ?? "";
  const mains = openingTags(html, "main");
  const metas = openingTags(html, "meta");
  const links = openingTags(html, "link");

  if (h1Count !== 1) report(`${h1Count} titre H1 au lieu d'un`);

  images.forEach((tag, index) => {
    if (!hasAttribute(tag, "alt")) report(`image ${index + 1} sans attribut alt`);
    if (!hasAttribute(tag, "width") || !hasAttribute(tag, "height")) {
      report(`image ${index + 1} sans dimensions explicites`);
    }
  });

  buttons.forEach((tag, index) => {
    if (!hasAttribute(tag, "type")) report(`bouton ${index + 1} sans type explicite`);
  });

  anchors.forEach((tag, index) => {
    if (hasAttribute(tag, "href", "")) report(`lien ${index + 1} avec href vide`);
  });

  leadForms.forEach((tag, index) => {
    if (!hasAttribute(tag, "action") || hasAttribute(tag, "action", "")) {
      report(`formulaire lead ${index + 1} sans destination`);
    }
    if (!hasAttribute(tag, "method", "post")) {
      report(`formulaire lead ${index + 1} sans méthode POST`);
    }
    if (!hasAttribute(tag, "data-conversion-type")) {
      report(`formulaire lead ${index + 1} sans type de conversion`);
    }
  });

  if (!hasAttribute(htmlTag, "lang", "fr")) report("langue de page différente de fr");
  if (!mains.some((tag) => hasAttribute(tag, "id", "contenu"))) {
    report("contenu principal sans repère #contenu");
  }
  if (!metas.some((tag) => hasAttribute(tag, "name", "description"))) {
    report("meta description absente");
  }
  if (!links.some((tag) => hasAttribute(tag, "rel", "canonical"))) {
    report("lien canonique absent");
  }
}

if (failures.length > 0) {
  console.error(`Audit statique : ${failures.length} anomalie(s).`);
  failures.forEach((failure) => console.error(`- ${failure}`));
  process.exit(1);
}

console.log(`Audit statique : ${htmlFiles.length} pages conformes.`);
