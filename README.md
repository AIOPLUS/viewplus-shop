# shop.viewplus.io

De webshop van View Plus: **live volgerstellers** met klapcijfers, voor Instagram, Facebook, TikTok, YouTube, LinkedIn of X, of voor een getal naar keuze, met 5 of 7 cijfers. View Plus verkoopt de tellers als reseller (Smiirl, zie `docs/SMIIRL-ONDERZOEK.md`) onder het eigen label.

Anders dan `reviewplus-shop` (gratis leads) is dit een echte verkoopshop: winkelwagen, afrekenen, betalen via Mollie (vanuit Make).

## Site en shop naast elkaar, net als bij Review Plus

- **De shop is de paarse tweeling van de Review Plus-shop** (`AIOPLUS/reviewplus-shop`): zelfde stijl (`src/styles/`), header, footer, productkaarten, productpagina, "Zo werkt het", FAQ en CTA-band. Alleen de kleur (paars) en de inhoud verschillen.
- **De site (`viewplus-site`) is de tweeling van reviewplus-site** en linkt alleen via de Shop-knop naar de shop (`PUBLIC_SHOP_URL`).
- Het menu van de shop verwijst naar de pagina's van de site, met "Shop" als actieve plek (`mainNav` in `src/config/brand.ts`, adres uit `PUBLIC_HOOFDSITE_URL`).
- Het beeldmerk in de header is de **labelwisselaar van AIO Plus** (zoals op reviewplus.io): labels uit https://www.reviewplus.io/labels.json, met een kopie in `src/data/labels.json`. View Plus linkt naar de hoofdsite van View Plus.

## Pagina's

| URL | Bestand |
|---|---|
| `/` | `src/pages/index.astro` (hero met een teller die je zelf laat klappen, producten, beter samen, hoe het werkt, FAQ) |
| `/<product>` | `src/pages/[product].astro` + `src/content/products/*.md` |
| `/winkelwagen` | `src/pages/winkelwagen.astro` (inhoud in localStorage, `src/lib/client/winkelwagen.ts`) |
| `/afrekenen` | `src/pages/afrekenen.astro` (bedrijf, bezorgadres met PDOK-aanvulling, contact, akkoord) |
| `/bedankt` | `src/pages/bedankt.astro` |
| `/contact` | Advies of offerte (`?product=<slug>` vult het product in) |
| `/voor/<branche>` | `src/pages/voor/[sector].astro` + `src/content/sectors/*.md` (horeca, winkels, beauty en wellness), zoals in de Review Plus-shop |
| `/bezorging-en-retour`, `/term-and-conditions`, `/privacy-policy` | `src/content/legal/*.md` |
| `/products.json` | Catalogus voor Make (prijzen per variant, btw, verzending) |

## Producten beheren

- Eén bestand per product in `src/content/products/` (schema in `src/content.config.ts`).
- **Prijzen per variant, excl. btw.** Nu: 5 cijfers € 499 en 7 cijfers € 699 (besluit Jordan 26-09-2026, gelijk aan de reviewteller van Review Plus). `prijs: null` betekent "Prijs volgt": dan toont de shop een offerteknop.
- **Pre-order-actie:** producten met `status: pre-order` krijgen een badge en pre-orderteksten (`PREORDER` in `src/config/site.ts`). De klant bestelt en betaalt direct via Mollie; wij verzenden zodra de tellers binnen zijn.
- **Verzendkosten en levertijd**: `VERZENDING` in `src/config/site.ts` (nu nog onbekend).
- **Illustraties**: `src/components/shop/Teller.astro` (klapcijfers; `src/lib/client/teller.ts` laat hem omklappen en van platform en aantal cijfers wisselen). De homepage heeft een tellerkiezer zoals op smiirl.com (`TellerKiezer.astro`). Platformen en kleuren (zoals de echte tellers): `src/lib/platformen.ts`. Platformpagina's `/volgersteller/<platform>` met teksten in `src/config/platformpaginas.ts`. Er zijn nog geen productfoto's; die van Smiirl gebruiken we alleen met hun toestemming.

## Pre-order naar Make (nog niet gekoppeld)

`/afrekenen` stuurt JSON naar `PUBLIC_LEAD_WEBHOOK_URL`:

```json
{
  "request_type": "bestelling",
  "merk": "viewplus",
  "preorder": true,
  "lead_source": "shop",
  "lead_ref": "VPS-…",
  "regels": [{ "product": "live-volgersteller", "variant": "5-cijfers", "platform": "Instagram", "aantal": 1 }],
  "bedrijf": { "naam": "", "land": "NL", "bedrijfsnummer_type": "kvk", "bedrijfsnummer": "", "btw_nummer": "" },
  "adres": { "straat": "", "huisnummer": "", "toevoeging": "", "postcode": "", "plaats": "", "land": "NL" },
  "contact": { "voornaam": "", "achternaam": "", "email": "", "telefoon": "" },
  "account": "@jouwzaak",
  "akkoord": { "voorwaarden": true, "bevoegd": true, "voorwaarden_versie": "", "tijdstip": "" },
  "turnstile_token": ""
}
```

Make rekent de bedragen opnieuw uit met `/products.json` (btw 21%, verlegd voor Belgische bedrijven met een geldig btw-nummer), maakt een Mollie-betaling en antwoordt `{ "ok": true, "checkoutUrl": "https://…" }`. Zonder `checkoutUrl` gaat de klant naar `/bedankt`. Zolang de webhook leeg is, meldt de shop dat online bestellen nog niet gekoppeld is en verwijst hij naar het e-mailadres.

## Lokaal

```bash
npm install
npm run dev      # http://localhost:4321
npm run check    # typecheck + lint + build + linkcheck
```

## Live zetten (later)

1. GitHub-repo `AIOPLUS/viewplus-shop` aanmaken en Pages aanzetten (eerst testversie op aioplus.github.io/viewplus-shop).
Volledige checklist voor site én shop: `../viewplus-site/docs/LIVEGANG.md`.

2. `public/CNAME` met `shop.viewplus.io`; GitHub-variabelen `SITE_URL=https://shop.viewplus.io`, `BASE_PATH=/`, `PUBLIC_HOOFDSITE_URL=https://www.viewplus.io` (op de testversie: `https://aioplus.github.io/viewplus-site`). Zet in viewplus-site `PUBLIC_SHOP_URL=https://shop.viewplus.io`.
3. DNS bij GoDaddy: `shop` als CNAME naar `aioplus.github.io`.
4. Make-route `bestelling` bouwen (met Mollie) en de webhook-URL zetten.
5. View Plus in `reviewplus-site/src/data/labels.json` op `status: "live"` zetten en alle sites opnieuw deployen (labelwisselaar).

## Nog te doen (Jordan)

Zie de vragen onderaan `docs/SMIIRL-ONDERZOEK.md`. Kort:

- Resellerstatus, inkoop- en verkoopprijzen, minimale afname, levering (dropship of voorraad) en levertijd.
- Naam en productfoto's van Smiirl gebruiken (toestemming)?
- YouTube, LinkedIn en X lopen bij Smiirl via de Custom Counter (koppeling via Zapier of API): welke prijs rekenen we daarvoor, en hoe regelen we de koppeling?
- Verkoopvoorwaarden, bezorging en retour, garantie. Verkopen we alleen aan bedrijven (zoals nu: KvK verplicht)?
- Mailbox support@viewplus.io activeren.
