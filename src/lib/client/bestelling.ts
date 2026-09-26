/**
 * Rekent een bestelling uit met de catalogus van de huidige build (dezelfde gegevens als /products.json).
 * Make rekent bij het afrekenen alles opnieuw uit; dit is alleen voor de weergave.
 */
import type { Regel } from './winkelwagen';

export interface Catalogus {
  btw: number;
  verzending: { kosten: number | null; gratisVanaf: number | null; levertijd: string };
  producten: { slug: string; naam: string; categorie: 'teller'; platformen: string[]; varianten: { id: string; label: string; prijs: number | null }[] }[];
}

export interface Lijn {
  index: number;
  slug: string;
  naam: string;
  variant: string;
  variantId: string;
  platform: string | null;
  aantal: number;
  prijs: number;
  totaal: number;
}

export interface Berekening {
  lijnen: Lijn[];
  subtotaal: number;
  /** null = verzendkosten nog niet bekend */
  verzending: number | null;
  btw: number;
  totaal: number;
  verlegd: boolean;
}

const rond = (n: number) => Math.round(n * 100) / 100;

export function bereken(regels: Regel[], cat: Catalogus, verlegd = false): Berekening {
  const lijnen: Lijn[] = [];
  regels.forEach((r, index) => {
    const product = cat.producten.find((p) => p.slug === r.slug);
    const variant = product?.varianten.find((v) => v.id === r.variant);
    if (!product || !variant || variant.prijs === null) return; // onbekend of (nog) zonder prijs: niet meerekenen
    lijnen.push({ index, slug: r.slug, naam: product.naam, variant: variant.label, variantId: variant.id, platform: r.platform, aantal: r.aantal, prijs: variant.prijs, totaal: rond(variant.prijs * r.aantal) });
  });
  const subtotaal = rond(lijnen.reduce((s, l) => s + l.totaal, 0));
  const v = cat.verzending;
  const verzending = v.kosten === null ? null : v.gratisVanaf !== null && subtotaal >= v.gratisVanaf ? 0 : v.kosten;
  const basis = subtotaal + (verzending ?? 0);
  const btw = verlegd ? 0 : rond(basis * cat.btw);
  return { lijnen, subtotaal, verzending, btw, totaal: rond(basis + btw), verlegd };
}

export const euro = (n: number) => `€ ${n.toLocaleString('nl-NL', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
