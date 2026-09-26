# viewplus-shop

Webshop van View Plus (shop.viewplus.io, nog niet live): live volgerstellers (reseller van Smiirl) voor zes platformen en een teller naar keuze. De NFC-volgstandaard is op verzoek van Jordan geschrapt (26-09-2026). Het algemene overzicht staat in `../CLAUDE.md` en de werking in `README.md`.

## Uitgangspunten

- De shop is de paarse tweeling van `review plus shop` (zelfde stijl, header, footer en opbouw); de site is de tweeling van `reviewplus-site`. Site en shop bestaan naast elkaar en linken alleen via menu en Shop-knop. De labelschakelaar wisselt tussen de shops van Review Plus en View Plus.
- Verzin geen prijzen, levertijden of productclaims. Prijzen: 5 cijfers € 499, 7 cijfers € 699 excl. btw (Jordan, 26-09-2026); pre-order-actie met directe betaling via Mollie. Specificaties komen van de openbare site van Smiirl (`docs/SMIIRL-ONDERZOEK.md`).
- Productfoto's en de merknaam van Smiirl alleen met hun toestemming; tot die tijd de eigen illustratie `src/components/shop/Teller.astro`.

## Waar staat wat

- **Producten, varianten, prijzen**: `src/content/products/*.md` → `/products.json` (Make rekent hiermee).
- **Verzending, btw-notitie**: `src/config/site.ts`. **Menu, labels, e-mail**: `src/config/brand.ts`. **Teksten home**: `src/config/content.ts`.
- **Winkelwagen**: `src/lib/client/winkelwagen.ts` (localStorage), berekening in `src/lib/client/bestelling.ts`.
- **Afrekenen**: `src/pages/afrekenen.astro`, payload `request_type: "bestelling"`, `merk: "viewplus"`, `preorder: true`. De Make-route (Mollie) is nog niet gebouwd; overleg eerst, want het scenario is gedeeld met de Review Plus Shop.
