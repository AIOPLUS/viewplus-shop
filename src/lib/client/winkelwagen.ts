/**
 * Winkelwagen in localStorage (geen persoonsgegevens). Elke regel = product + variant + platform + aantal.
 * Prijzen staan niet in de opslag: die komen altijd uit de catalogus van de huidige build (en Make rekent ze opnieuw uit).
 */
import { readJSON, writeJSON } from './storage';

export interface Regel {
  slug: string;
  variant: string;
  platform: string | null;
  aantal: number;
}

const SLEUTEL = 'vp_winkelwagen';
export const MAX_PER_REGEL = 20;
const EVENT = 'winkelwagen:bijgewerkt';

export function regels(): Regel[] {
  const data = readJSON<Regel[]>('local', SLEUTEL, []);
  return Array.isArray(data) ? data.filter((r) => r && r.slug && r.variant && r.aantal > 0) : [];
}

function opslaan(lijst: Regel[]): void {
  writeJSON('local', SLEUTEL, lijst);
  window.dispatchEvent(new CustomEvent(EVENT));
}

const zelfde = (a: Regel, b: Pick<Regel, 'slug' | 'variant' | 'platform'>) => a.slug === b.slug && a.variant === b.variant && a.platform === b.platform;

export function toevoegen(regel: Regel): void {
  const lijst = regels();
  const bestaand = lijst.find((r) => zelfde(r, regel));
  if (bestaand) bestaand.aantal = Math.min(MAX_PER_REGEL, bestaand.aantal + regel.aantal);
  else lijst.push({ ...regel, aantal: Math.min(MAX_PER_REGEL, regel.aantal) });
  opslaan(lijst);
}

export function zetAantal(index: number, aantal: number): void {
  const lijst = regels();
  if (!lijst[index]) return;
  if (aantal <= 0) lijst.splice(index, 1);
  else lijst[index]!.aantal = Math.min(MAX_PER_REGEL, Math.round(aantal));
  opslaan(lijst);
}

export function leegmaken(): void {
  opslaan([]);
}

export function aantalStuks(): number {
  return regels().reduce((som, r) => som + r.aantal, 0);
}

/** Roept `fn` aan bij elke wijziging, ook vanuit een ander tabblad. */
export function bijWijziging(fn: () => void): void {
  window.addEventListener(EVENT, fn);
  window.addEventListener('storage', (e) => { if (e.key === SLEUTEL) fn(); });
}

/** Verwijdert regels die niet (meer) te koop zijn, bijvoorbeeld na een prijs- of assortimentswijziging. */
export function opschonen(geldig: string[]): void {
  const lijst = regels();
  const over = lijst.filter((r) => geldig.includes(`${r.slug}|${r.variant}`));
  if (over.length !== lijst.length) opslaan(over);
}
