import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const faq = z.array(z.object({ vraag: z.string(), antwoord: z.string() })).default([]);

/** Privacyverklaring, verkoopvoorwaarden en bezorging (Markdown). */
const legal = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/legal' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    ingangsdatum: z.string(),
  }),
});

/**
 * Producten van de shop (/<slug>). Prijzen excl. btw per variant; `null` = prijs nog niet bekend
 * (dan toont de shop "Prijs volgt" en kun je het product nog niet in de winkelwagen leggen).
 * /products.json wordt hieruit gemaakt; Make rekent daarmee de bedragen opnieuw uit.
 */
const products = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/products' }),
  schema: z.object({
    slug: z.string(),
    naam: z.string(),
    /** Eén zin voor de productkaart. */
    kort: z.string(),
    /** 40–60 woorden, antwoord-eerst, bovenaan de productpagina. */
    samenvatting: z.string(),
    categorie: z.enum(['teller', 'standaard']),
    /** Welke illustratie de shop toont (er zijn nog geen productfoto's). */
    visual: z.enum(['teller', 'teller-op-maat', 'standaard']),
    /** Platformen waaruit de klant kiest. Leeg = geen keuze. */
    platformen: z.array(z.enum(['Instagram', 'Facebook', 'TikTok'])).default([]),
    varianten: z
      .array(z.object({ id: z.string(), label: z.string(), omschrijving: z.string().optional(), prijs: z.number().min(0).nullable() }))
      .min(1),
    specs: z.array(z.object({ label: z.string(), waarde: z.string() })).default([]),
    voordelen: z.array(z.string()),
    inDeDoos: z.array(z.string()).default([]),
    status: z.enum(['beschikbaar', 'binnenkort', 'op-aanvraag']),
    volgorde: z.number().default(0),
    faq,
  }),
});

export const collections = { legal, products };
