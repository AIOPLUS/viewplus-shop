import simpleIcons from '@iconify-json/simple-icons/icons.json';
import logos from '@iconify-json/logos/icons.json';

type IconSet = {
  icons: Record<string, { body: string; width?: number; height?: number }>;
  aliases?: Record<string, { parent: string }>;
  width?: number;
  height?: number;
};

const sets: Record<string, IconSet> = { si: simpleIcons as IconSet, logos: logos as IconSet };

/** SVG-gegevens van een merklogo uit Iconify ("si:github" = Simple Icons, "logos:google-workspace" = SVG Logos). Alleen tijdens de build. */
export function brandIcon(id: string): { body: string; viewBox: string } {
  const [prefix, name] = id.split(':');
  const set = sets[prefix];
  if (!set) throw new Error(`Onbekende iconenset: ${prefix}`);
  const icon = set.icons[name] ?? set.icons[set.aliases?.[name]?.parent ?? ''];
  if (!icon) throw new Error(`Icoon niet gevonden: ${id}`);
  const w = icon.width ?? set.width ?? 24;
  const h = icon.height ?? set.height ?? 24;
  return { body: icon.body, viewBox: `0 0 ${w} ${h}` };
}

/** Iconen en kleuren van alle platformen, als gegevens voor scripts die de live teller van platform laten wisselen. */
export async function platformIconen(): Promise<Record<string, { viewBox: string; body: string; achtergrond: string }>> {
  const { PLATFORMEN, platformStijl } = await import('./platformen');
  return Object.fromEntries(PLATFORMEN.map((p) => [p, { ...brandIcon(platformStijl[p].icoon), achtergrond: platformStijl[p].achtergrond }]));
}
