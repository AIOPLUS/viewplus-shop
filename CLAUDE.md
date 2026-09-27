# viewplus-shop

Webshop van View Plus, live op https://shop.viewplus.io (sinds 26-09-2026): live volgerstellers (reseller van Smiirl) voor zes platformen en een teller naar keuze. De centrale instructies (bedrijf, labels, tools, werkafspraken) staan in de hub `AIOPLUS/claude`: lokaal `../CLAUDE.md`; in een cloud-chat haalt de SessionStart-hook ze op. Dit bestand bevat alleen wat specifiek is voor deze repo; de werking staat in `README.md`.

**Main staat direct live.** Werk op een branch, draai `npm run check`, open een PR en merge pas na een groene check en Jordans akkoord.

## Uitgangspunten

- De shop is de paarse tweeling van `reviewplus-shop` (zelfde stijl, header, footer en opbouw); de site is de tweeling van `reviewplus-site`. Site en shop bestaan naast elkaar en linken via menu en Shop-knop. De labelwisselaar (`LabelSwitcher.astro`) is in alle repo's gelijk.
- Reviewtellers horen bij de Review Plus Shop, niet hier. De NFC-volgstandaard is geschrapt (26-09-2026).
- Verzin geen prijzen, levertijden of productclaims. Prijzen: 5 cijfers € 499, 7 cijfers € 699 excl. btw (Jordan, 26-09-2026); pre-order-actie met directe betaling via Mollie. Specificaties komen van de openbare site van Smiirl (`docs/SMIIRL-ONDERZOEK.md`).
- Productfoto's en de merknaam van Smiirl alleen met hun toestemming; tot die tijd de eigen illustratie `src/components/shop/Teller.astro`.

## Waar staat wat

- **Producten, varianten, prijzen**: `src/content/products/*.md` → `/products.json` (Make rekent hiermee).
- **Verzending, btw-notitie**: `src/config/site.ts`. **Menu, e-mail**: `src/config/brand.ts`. **Teksten home**: `src/config/content.ts`.
- **Winkelwagen**: `src/lib/client/winkelwagen.ts` (localStorage), berekening in `src/lib/client/bestelling.ts`.
- **Afrekenen**: `src/pages/afrekenen.astro`, payload `request_type: "bestelling"`, `merk: "viewplus"`, `preorder: true`. Make-route 9 in het gedeelde scenario "Review Plus - Shop aanvragen" (Mollie View Plus), live sinds 26-09-2026; zie `README.md` en in de hub `docs/make/MAKE-SCENARIO.md`.
- **CI**: `.github/workflows/ci.yml` draait `npm run check` op elke pull request.
