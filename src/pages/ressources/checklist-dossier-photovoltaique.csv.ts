import { dossierChecklist } from "../../data/dossierChecklist";
export const prerender = true;
export function GET() {
  const quote = (value: string) => `"${value.replaceAll('"', '""')}"`;
  const rows = [["Étape", "Élément", "Détail", "Disponible", "Prochaine action"], ...dossierChecklist.flatMap(group => group.items.map(item => [group.label, item.title, item.detail, "", ""]))];
  const csv = "\uFEFF" + rows.map(row => row.map(quote).join(";")).join("\r\n");
  return new Response(csv, { headers: { "Content-Type": "text/csv; charset=utf-8", "Content-Disposition": 'attachment; filename="checklist-dossier-photovoltaique-sunelys.csv"', "X-Robots-Tag": "noindex" } });
}
