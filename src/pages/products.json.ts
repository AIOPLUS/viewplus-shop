import type { APIRoute } from 'astro';
import { producten, catalogusData } from '@/lib/catalog';

/** Catalogus voor Make: prijzen per variant (excl. btw), btw en verzending. Make rekent bestellingen hiermee opnieuw uit. */
export const GET: APIRoute = async () =>
  new Response(JSON.stringify(catalogusData(await producten()), null, 2), { headers: { 'Content-Type': 'application/json; charset=utf-8' } });
