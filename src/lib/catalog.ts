import { getCollection, type CollectionEntry } from 'astro:content';
import { VERZENDING } from '@/config/site';
import { euro } from './prijs';

export type Product = CollectionEntry<'products'>;
export { platformStijl, type Platform } from './platformen';

/** Alle producten, op volgorde. */
export async function producten(): Promise<Product[]> {
  return (await getCollection('products')).sort((a, b) => a.data.volgorde - b.data.volgorde);
}

/** Laagste bekende prijs van een product, of null als er nog geen prijs is. */
export function vanafPrijs(p: Product): number | null {
  const prijzen = p.data.varianten.map((v) => v.prijs).filter((x): x is number => x !== null);
  return prijzen.length ? Math.min(...prijzen) : null;
}

/** "vanaf € 299" of "Prijs volgt". */
export function prijsLabel(p: Product): string {
  const vanaf = vanafPrijs(p);
  if (vanaf === null) return 'Prijs volgt';
  const meerdere = new Set(p.data.varianten.map((v) => v.prijs)).size > 1;
  return `${meerdere ? 'vanaf ' : ''}€ ${euro(vanaf)}`;
}

/** Compacte catalogus voor de winkelwagen en Make (/products.json). */
export function catalogusData(lijst: Product[]) {
  return {
    valuta: 'EUR',
    prijzen: 'excl. btw',
    btw: 0.21,
    verzending: VERZENDING,
    producten: lijst.map((p) => ({
      slug: p.data.slug,
      naam: p.data.naam,
      categorie: p.data.categorie,
      status: p.data.status,
      platformen: p.data.platformen,
      varianten: p.data.varianten.map((v) => ({ id: v.id, label: v.label, prijs: v.prijs })),
    })),
  };
}
