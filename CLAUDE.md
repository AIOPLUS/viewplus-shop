# viewplus-shop

Webshop van View Plus (shop.viewplus.io, nog niet live): live volgerstellers (reseller van Smiirl) en NFC-volgstandaards. Het algemene overzicht staat in `../CLAUDE.md` en de werking in `README.md`.

## Uitgangspunten

- Zelfde vormgeving als `viewplus-site`: houd componenten, typografie en tokens gelijk. De labelschakelaar wisselt tussen de shops van Review Plus en View Plus.
- Verzin geen prijzen, levertijden of productclaims. Prijzen staan op `null` ("Prijs volgt") tot Jordan ze invult. Specificaties komen van de openbare site van Smiirl (`docs/SMIIRL-ONDERZOEK.md`).
- Productfoto's en de merknaam van Smiirl alleen met hun toestemming; tot die tijd de eigen illustraties (`src/components/shop/Teller.astro`, `Volgstandaard.astro`).

## Waar staat wat

- **Producten, varianten, prijzen**: `src/content/products/*.md` → `/products.json` (Make rekent hiermee).
- **Verzending, btw-notitie**: `src/config/site.ts`. **Menu, labels, e-mail**: `src/config/brand.ts`. **Teksten home**: `src/config/content.ts`.
- **Winkelwagen**: `src/lib/client/winkelwagen.ts` (localStorage), berekening in `src/lib/client/bestelling.ts`.
- **Afrekenen**: `src/pages/afrekenen.astro`, payload `request_type: "bestelling"`, `merk: "viewplus"`. De Make-koppeling volgt later; wacht op Jordan.
