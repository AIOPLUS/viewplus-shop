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

/**
 * Logo zoals het op de houten teller staat. Instagram is een kleurverloop over het glyph; daarvoor staat `__ID__` in de
 * body, die per teller door een uniek id vervangen moet worden (twee verlopen met hetzelfde id botsen).
 */
export function tellerLogo(logo: string): { body: string; viewBox: string } {
  if (logo !== 'instagram-verloop') return brandIcon(logo);
  const { body, viewBox } = brandIcon('si:instagram');
  const stops = [['0', '#feda75'], ['.3', '#fa7e1e'], ['.55', '#d62976'], ['.8', '#962fbf'], ['1', '#4f5bd5']]
    .map(([o, c]) => `<stop offset="${o}" stop-color="${c}"/>`).join('');
  return { viewBox, body: `<defs><linearGradient id="__ID__" x1="0" y1="1" x2="1" y2="0">${stops}</linearGradient></defs>${body.replaceAll('currentColor', 'url(#__ID__)')}` };
}

/** Logo's en cijferkleuren van alle platformen, als gegevens voor scripts die de live teller van platform laten wisselen. */
export async function platformIconen(): Promise<Record<string, { viewBox: string; body: string; flap: readonly [string, string] }>> {
  const { PLATFORMEN, platformStijl } = await import('./platformen');
  return Object.fromEntries(PLATFORMEN.map((p) => [p, { ...tellerLogo(platformStijl[p].logo), flap: platformStijl[p].flap }]));
}
