import type { APIRoute } from "astro";
import { readFile } from "node:fs/promises";
import { resolve } from "node:path";
import sharp from "sharp";
import { getPublicBlogPosts } from "../../../lib/blogPublication";

export const prerender = true;
export function getStaticPaths() {
  return [
    { params: { slug: "identite" }, props: { title: "", category: "" } },
    ...getPublicBlogPosts().map(({ frontmatter }) => ({
      params: { slug: frontmatter.slug },
      props: { title: frontmatter.title, category: frontmatter.category },
    })),
  ];
}

const escapeText = (text: string) => String(text).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

export const GET: APIRoute = async ({ props }) => {
  const identityOnly = !props.title;
  const logo = await sharp(await readFile(resolve("public/brand/f1/sunelys-signature-blanc.svg")))
    .resize(identityOnly ? 880 : 330).png().toBuffer();
  const overlays: sharp.OverlayOptions[] = [{ input: logo, top: identityOnly ? 235 : 56, left: identityOnly ? 160 : 64 }];
  if (!identityOnly) {
    const fontfile = resolve("public/brand/f1/source-sans-3.ttf");
    const title = await sharp({ text: { text: `<span foreground="#f7f7f5">${escapeText(props.title)}</span>`, font: "Source Sans 3 58", fontfile, width: 1060, height: 265, rgba: true, wrap: "word" } }).png().toBuffer();
    const category = await sharp({ text: { text: `<span foreground="#dbad8f">${escapeText(props.category || "Guides installateurs")}</span>`, font: "Source Sans 3 27", fontfile, rgba: true } }).png().toBuffer();
    const footer = await sharp({ text: { text: '<span foreground="#bac0c1">Guides pour les professionnels du solaire   ·   sunelys.fr</span>', font: "Source Sans 3 24", fontfile, rgba: true } }).png().toBuffer();
    overlays.push({ input: category, top: 158, left: 64 }, { input: title, top: 222, left: 60 }, { input: footer, top: 560, left: 64 });
  }
  const png = await sharp({ create: { width: 1200, height: 630, channels: 4, background: "#151718" } }).composite(overlays).png().toBuffer();
  return new Response(new Uint8Array(png), { headers: { "Content-Type": "image/png" } });
};
