/** Btw-tarief voor Nederland (en België zonder verlegging). Prijzen in content.ts zijn exclusief btw. */
export const BTW = 0.21;

/** 181.4395 → "181,44" */
export function formatEuro(n: number): string {
  return n.toLocaleString('nl-NL', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

/** Hele bedragen zonder centen: 1300 → "1.300", 90.75 → "90,75". */
export function euro(n: number): string {
  return Number.isInteger(n) ? n.toLocaleString('nl-NL') : formatEuro(n);
}

/** Bedrag inclusief btw, afgerond op centen. */
export function inclBtw(excl: number): number {
  return Math.round(excl * (1 + BTW) * 100) / 100;
}

/** 75 → "90,75" */
export function inclBtwTekst(excl: number): string {
  return euro(inclBtw(excl));
}
