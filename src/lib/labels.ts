import lokaal from '@/data/labels.json';
import { brand } from '@/config/brand';

/**
 * De labels van AIO Plus (Review Plus, View Plus, ...). De centrale lijst staat in de repo reviewplus-site
 * (src/data/labels.json) en wordt gepubliceerd op https://www.reviewplus.io/labels.json. Deze shop haalt die bij het
 * bouwen op; lukt dat niet, dan gebruikt hij de kopie in src/data/labels.json. Zie projects/CLAUDE.md (Labelwisselaar).
 */
export interface Label {
  id: string;
  naam: string;
  omschrijving: string;
  kleur: string;
  url: string;
  status: 'live' | 'binnenkort';
}

/** Dit label: wordt aangevinkt in de wisselaar. */
export const HUIDIG_LABEL = 'viewplus';
/** utm_source voor links naar andere labels. */
const BRON = 'viewplus-shop';
const CENTRALE_LIJST = 'https://www.reviewplus.io/labels.json';

/** Kleur voor labels waarvan de huisstijl nog niet vaststaat. */
const GRIJS = '#a3a3a3';

interface Ruw { id: string; naam: string; omschrijving?: string; kleur?: string; url?: string; status?: string }
interface Lijst { labels: Ruw[]; bundel: Ruw }

async function laad(): Promise<Lijst> {
  try {
    const res = await fetch(CENTRALE_LIJST, { signal: AbortSignal.timeout(5000) });
    if (!res.ok) throw new Error(String(res.status));
    const data = (await res.json()) as Lijst;
    if (!Array.isArray(data.labels) || !data.bundel) throw new Error('onverwacht formaat');
    return data;
  } catch (err) {
    console.warn(`[labels] ${CENTRALE_LIJST} niet bereikbaar (${String(err)}); lokale kopie gebruikt.`);
    return lokaal;
  }
}

const data = await laad();

const normaliseer = (l: Ruw): Label => ({
  id: l.id,
  naam: l.naam,
  omschrijving: l.omschrijving ?? '',
  url: l.url ?? '',
  kleur: l.kleur || GRIJS,
  // Alleen klikbaar als het label live is én een adres heeft.
  status: l.status === 'live' && l.url ? 'live' : 'binnenkort',
});

export const labels: Label[] = data.labels.map(normaliseer);
export const bundel: Label = normaliseer({ ...data.bundel, kleur: '' });

/** Link naar een label, met utm-parameters zodat je in analytics ziet waar bezoekers vandaan komen. */
export function labelLink(label: Label, plek: 'wisselaar' | 'footer' | 'menu'): string {
  // View Plus zelf: naar de hoofdsite van View Plus (die staat in de centrale lijst pas als hij live is).
  const u = new URL(label.id === HUIDIG_LABEL ? `${brand.hoofdsiteUrl}/` : label.url);
  u.searchParams.set('utm_source', BRON);
  u.searchParams.set('utm_medium', 'labelwisselaar');
  u.searchParams.set('utm_content', plek);
  return u.toString();
}
