import { getPublicBlogPosts } from "../lib/blogPublication";

const staticRoutes = [
  { path: "", lastmod: "2026-07-24" },
  { path: "/services", lastmod: "2026-07-24" },
  { path: "/parcours", lastmod: "2026-07-24" },
  { path: "/tarifs", lastmod: "2026-07-24" },
  { path: "/contact", lastmod: "2026-07-24" },
  { path: "/blog", lastmod: "2026-07-24" },
  { path: "/a-propos", lastmod: "2026-07-24" },
  { path: "/sunelys", lastmod: "2026-07-24" },
  { path: "/mentions-legales", lastmod: "2026-07-24" },
  { path: "/politique-confidentialite", lastmod: "2026-07-24" },
  { path: "/gestion-administrative-photovoltaique", lastmod: "2026-07-24" },
  { path: "/dossier-consuel-photovoltaique", lastmod: "2026-07-24" },
  { path: "/raccordement-enedis-photovoltaique", lastmod: "2026-07-24" },
  { path: "/edf-oa", lastmod: "2026-07-24" },
  { path: "/declaration-prealable-panneaux-solaires", lastmod: "2026-07-24" },
  { path: "/sous-traitance-declaration-prealable-solaire", lastmod: "2026-07-24" },
  { path: "/sous-traitance-administrative-photovoltaique-installateur", lastmod: "2026-07-24" },
  { path: "/tarif-declaration-prealable-photovoltaique", lastmod: "2026-07-24" },
];

const blogPosts = getPublicBlogPosts() as Array<{
  frontmatter: {
    slug: string;
    pubDate?: string;
    updatedDate?: string;
  };
}>;

export function GET() {
  const baseUrl = "https://sunelys.fr";
  const fallbackLastmod = "2026-06-22";
  const routes = [
    ...staticRoutes,
    ...blogPosts.map((post) => ({
      path: `/blog/${post.frontmatter.slug}`,
      lastmod: post.frontmatter.updatedDate ?? post.frontmatter.pubDate ?? fallbackLastmod,
    })),
  ];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes
  .map((route) => {
    const path = route.path || "/";
    const lastmod = new Date(route.lastmod).toISOString();
    return `  <url>\n    <loc>${baseUrl}${path}</loc>\n    <lastmod>${lastmod}</lastmod>\n  </url>`;
  })
  .join("\n")}
</urlset>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
    },
  });
}
