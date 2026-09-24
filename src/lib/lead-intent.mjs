export const leadNeeds = [
  ["Declaration prealable", "Déclaration préalable"],
  ["Raccordement Enedis + Consuel", "Raccordement + Consuel"],
  ["Consuel", "Consuel"],
  ["Raccordement Enedis", "Raccordement Enedis"],
  ["EDF OA – Compte et contrat d’achat", "EDF OA"],
  ["MaPrimeRenov", "MaPrimeRénov'"],
  ["CEE", "CEE"],
  ["MaPrimeRenov + CEE", "MaPrimeRénov' + CEE"],
  ["Pilotage complet", "Pilotage complet"],
  ["Je ne sais pas encore", "Je ne sais pas encore"],
];

export function resolveLeadIntent(value = "") {
  if (leadNeeds.some(([need]) => need === value)) return value;
  const source = value.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/[^a-z0-9]+/g, " ");
  if (/pilotage|chaine complete|gestion|administrative/.test(source)) return "Pilotage complet";
  if (/aides renovation/.test(source) || (/cee/.test(source) && /prime|mpr/.test(source))) return "MaPrimeRenov + CEE";
  if (/consuel/.test(source) && /raccordement|enedis|reseau/.test(source)) return "Raccordement Enedis + Consuel";
  if (/declaration|prealable|\bdp\b/.test(source)) return "Declaration prealable";
  if (/edf.*oa/.test(source)) return "EDF OA – Compte et contrat d’achat";
  if (/consuel/.test(source)) return "Consuel";
  if (/raccordement|enedis/.test(source)) return "Raccordement Enedis";
  if (/prime.*renov|\bmpr\b/.test(source)) return "MaPrimeRenov";
  if (/\bcee\b/.test(source)) return "CEE";
  if (/diagnostic|sticky|header/.test(source)) return "Je ne sais pas encore";
  return "";
}
