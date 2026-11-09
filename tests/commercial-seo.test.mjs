import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { seoPages } from "../src/data/seoPages.ts";

const page = seoPages.gestionAdministrative;

test("commercial page targets administrative delegation without changing the offer", () => {
  assert.match(page.metaTitle, /Gestion administrative photovoltaïque/);
  assert.match(page.heroSubtitle, /Installateurs photovoltaïques/);
  assert.equal(page.conversionOffer.price, "199 €");
  assert.equal(page.conversionOffer.priceNote, "HT / dossier");
  assert.match(page.conversionOffer.scope, /hors de ce forfait/);
  assert.ok(page.conversionOffer.terms.includes("Aucun abonnement obligatoire"));
  assert.equal(page.detailBlocks.length, 4);
  assert.equal(page.faqItems.length, 7);
  assert.match(page.faqItems.map(item => item.answer).join(" "), /date garantie/);
  assert.match(page.detailBlocks.map(item => item.text).join(" "), /un dépôt ne vaut pas accord/);
});

test("existing guides link to the commercial page and the Consuel price guide in context", () => {
  const cerfa = readFileSync(new URL("../src/content/blog/cerfa-declaration-prealable-panneaux-solaires.md", import.meta.url), "utf8");
  const consuel = readFileSync(new URL("../src/content/blog/attestation-consuel-photovoltaique.md", import.meta.url), "utf8");
  assert.match(cerfa, /\[service de gestion administrative photovoltaïque pour installateurs\]\(\/gestion-administrative-photovoltaique\)/);
  assert.match(consuel, /\[prix du Consuel photovoltaïque\]\(\/blog\/prix-consuel-photovoltaique\)/);
});
