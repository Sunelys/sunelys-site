import test from "node:test";
import assert from "node:assert/strict";
import { matchesGuide, normalizeGuideQuery } from "../src/lib/guide-filter.mjs";

const guide = { title: "Déclaration préalable : les pièces", description: "Cerfa et délais mairie", category: "Déclaration préalable" };
test("guide search ignores accents, case and extra whitespace", () => {
  assert.equal(normalizeGuideQuery("  DÉLAIS  "), "delais");
  assert.equal(matchesGuide(guide, "  PIECES   delais "), true);
});
test("guide filters combine category and all search words", () => {
  assert.equal(matchesGuide(guide, "cerfa", "Déclaration préalable"), true);
  assert.equal(matchesGuide(guide, "cerfa", "Consuel"), false);
  assert.equal(matchesGuide(guide, "cerfa consuel"), false);
  assert.equal(matchesGuide(guide, ""), true);
});
test("empty search data is handled without rendering markup", () => {
  assert.equal(matchesGuide({}, "consuel"), false);
  assert.equal(matchesGuide(guide, "<script>"), false);
});
