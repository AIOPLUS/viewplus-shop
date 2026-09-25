# shop.viewplus.io

De webshop van View Plus: **live volgerstellers** (klapcijfers voor Instagram, Facebook, TikTok of een getal naar keuze) en **NFC-volgstandaards**. View Plus verkoopt de tellers als reseller (Smiirl, zie `docs/SMIIRL-ONDERZOEK.md`) onder het eigen label.

Anders dan `reviewplus-shop` (gratis leads) is dit een echte verkoopshop: winkelwagen, afrekenen, betalen via Mollie (vanuit Make).

## Site en shop naast elkaar, net als bij Review Plus

- **De shop is de paarse tweeling van de Review Plus-shop** (`AIOPLUS/reviewplus-shop`): zelfde stijl (`src/styles/`), header, footer, productkaarten, productpagina, "Zo werkt het", FAQ en CTA-band. Alleen de kleur (paars) en de inhoud verschillen.
- **De site (`viewplus-site`) is de tweeling van reviewplus-site** en linkt alleen via de Shop-knop naar de shop (`PUBLIC_SHOP_URL`).
- Het menu van de shop verwijst naar de pagina's van de site, met "Shop" als actieve plek (`mainNav` in `src/config/brand.ts`, adres uit `PUBLIC_HOOFDSITE_URL`).
- De labelschakelaar bovenaan wisselt tussen de **shops**: shop.reviewplus.io ↔ shop.viewplus.io.

## Pagina's

| URL | Bestand |
|---|---|
| `/` | `src/pages/index.astro` (hero met een teller die je zelf laat klappen, producten, beter samen, hoe het werkt, FAQ) |
| `/<product>` | `src/pages/[product].astro` + `src/content/products/*.md` |
| `/winkelwagen` | `src/pages/winkelwagen.astro` (inhoud in localStorage, `src/lib/client/winkelwagen.ts`) |
| `/afrekenen` | `src/pages/afrekenen.astro` (bedrijf, bezorgadres met PDOK-aanvulling, contact, akkoord) |
| `/bedankt` | `src/pages/bedankt.astro` |
| `/contact` | Advies of offerte (`?product=<slug>` vult het product in) |
| `/bezorging-en-retour`, `/term-and-conditions`, `/privacy-policy` | `src/content/legal/*.md` |
| `/products.json` | Catalogus voor Make (prijzen per variant, btw, verzending) |

## Producten beheren

- Eén bestand per product in `src/content/products/` (schema in `src/content.config.ts`).
- **Prijzen per variant, excl. btw.** `prijs: null` betekent "Prijs volgt": de shop toont dan een knop voor een offerte en je kunt het product nog niet in de winkelwagen leggen. Nu staan alle prijzen op `null` (TODO Jordan).
- **Verzendkosten en levertijd**: `VERZENDING` in `src/config/site.ts` (nu nog onbekend).
- **Illustraties**: `src/components/shop/Teller.astro` (klapcijfers, met animatie via `src/lib/client/teller.ts`) en `Volgstandaard.astro`. Er zijn nog geen productfoto's; die van Smiirl gebruiken we alleen met hun toestemming.

## Bestelling naar Make (nog niet gekoppeld)

`/afrekenen` stuurt JSON naar `PUBLIC_LEAD_WEBHOOK_URL`:

```json
{
  "request_type": "bestelling",
  "merk": "viewplus",
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
2. `public/CNAME` met `shop.viewplus.io`; GitHub-variabelen `SITE_URL=https://shop.viewplus.io`, `BASE_PATH=/`, `PUBLIC_HOOFDSITE_URL=https://www.viewplus.io` (op de testversie: `https://aioplus.github.io/viewplus-site`). Zet in viewplus-site `PUBLIC_SHOP_URL=https://shop.viewplus.io`.
3. DNS bij GoDaddy: `shop` als CNAME naar `aioplus.github.io`.
4. Make-route `bestelling` bouwen (met Mollie) en de webhook-URL zetten.
5. In `reviewplus-shop` de labelschakelaar toevoegen, zodat je ook van shop.reviewplus.io naar deze shop wisselt.

## Nog te doen (Jordan)

Zie de vragen onderaan `docs/SMIIRL-ONDERZOEK.md`. Kort:

- Resellerstatus, inkoop- en verkoopprijzen, minimale afname, levering (dropship of voorraad) en levertijd.
- Naam en productfoto's van Smiirl gebruiken (toestemming)?
- Specificaties en prijs van de NFC-volgstandaard.
- Verkoopvoorwaarden, bezorging en retour, garantie. Verkopen we alleen aan bedrijven (zoals nu: KvK verplicht)?
- Mailbox support@viewplus.io activeren.
