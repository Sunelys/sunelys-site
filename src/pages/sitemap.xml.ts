const staticRoutes = [
  "",
  "/services",
  "/parcours",
  "/tarifs",
  "/contact",
  "/blog",
  "/gestion-administrative-photovoltaique",
  "/dossier-consuel-photovoltaique",
  "/raccordement-enedis-photovoltaique",
  "/declaration-prealable-panneaux-solaires",
];

const blogPosts = Object.values(
  import.meta.glob("../content/blog/*.md", { eager: true }),
) as Array<{
  frontmatter: {
    slug: string;
    pubDate?: string;
    updatedDate?: string;
  };
}>;

export function GET() {
  const baseUrl = "https://sunelys.fr";
  const now = new Date().toISOString();
  const routes = [
    ...staticRoutes.map((path) => ({ path, lastmod: now })),
    ...blogPosts.map((post) => ({
      path: `/blog/${post.frontmatter.slug}`,
      lastmod: post.frontmatter.updatedDate ?? post.frontmatter.pubDate ?? now,
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
