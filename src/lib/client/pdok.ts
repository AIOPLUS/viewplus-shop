/**
 * Nederlands adres aanvullen met de gratis PDOK Locatieserver (overheid), zoals in de Review Plus-shop.
 * Geeft 'ongeldig' als postcode of huisnummer nog niet compleet is, null als er niets gevonden is.
 */
import { validatePostcode } from '@/lib/validation';

let volgnummer = 0;

export async function zoekAdres(postcodeInvoer: string, huisnummerInvoer: string): Promise<{ straat: string; plaats: string } | null | 'ongeldig'> {
  const pc = validatePostcode('NL', postcodeInvoer);
  const nr = huisnummerInvoer.match(/^\d+/)?.[0];
  if (!pc.ok || !nr) return 'ongeldig';
  const mijn = ++volgnummer;
  try {
    const q = `${pc.value.replace(' ', '')} ${nr}`;
    const res = await fetch(`https://api.pdok.nl/bzk/locatieserver/search/v3_1/free?q=${encodeURIComponent(q)}&fq=type:adres&rows=1&fl=straatnaam,woonplaatsnaam,postcode,huisnummer`);
    const json = (await res.json()) as { response: { docs: { straatnaam: string; woonplaatsnaam: string; postcode: string; huisnummer: number }[] } };
    if (mijn !== volgnummer) return 'ongeldig'; // er is intussen een nieuwere zoekopdracht
    const doc = json.response.docs[0];
    return doc && doc.postcode === pc.value.replace(' ', '') && String(doc.huisnummer) === nr ? { straat: doc.straatnaam, plaats: doc.woonplaatsnaam } : null;
  } catch {
    return null;
  }
}
