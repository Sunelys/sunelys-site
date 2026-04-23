const routes = [
  "",
  "/services",
  "/parcours",
  "/tarifs",
  "/contact",
  "/gestion-administrative-photovoltaique",
  "/dossier-consuel-photovoltaique",
  "/raccordement-enedis-photovoltaique",
  "/declaration-prealable-panneaux-solaires",
];

export function GET() {
  const baseUrl = "https://sunelys.fr";
  const lastmod = new Date().toISOString();

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes
  .map((route) => {
    const path = route || "/";
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
