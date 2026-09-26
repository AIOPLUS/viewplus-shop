# Onderzoek Smiirl (25-09-2026)

Bron: de openbare site https://www.smiirl.com (Engelse versie, regio Nederland ingesteld voor europrijzen). Niet ingelogd op my.smiirl.com. Alles hieronder is wat Smiirl zelf publiceert; controleer het bij je aanmelding als reseller.

## Wat Smiirl verkoopt

| Product | Wat | Adviesprijs NL (excl. btw, 25-09-2026) |
|---|---|---|
| Instagram Counter 5 cijfers | Live volgersteller tot 99.999 | € 299 |
| Instagram Counter 7 cijfers | Live volgersteller tot 9.999.999 | € 449 |
| Facebook Counter 5 / 7 cijfers | Zelfde teller, voor Facebook | Op de Engelse site gelijk aan Instagram ($ 399 / $ 559) |
| TikTok Counter 5 / 7 cijfers | Zelfde teller, voor TikTok | Idem |
| Custom Counter 5 / 7 cijfers | Toont elk getal dat je zelf aanlevert (via Zapier zonder code, of via een eigen API-koppeling), bijvoorbeeld het aantal Google-reviews | € 399 / € 549 |
| The Tag | NFC- en QR-bord (18 × 28 cm, staal met houten voet, 21 magneten) met een actiepagina (reviews, volgers, menu, wifi…). Voorverkoop, levering november 2026 | Startpakket € 24 (introductie, normaal € 48) + € 10 per maand software (verplicht) |
| Refurbished Counters | Gereviseerde tellers | 20% onder de nieuwprijs |

Andere varianten (YouTube, Google) hebben geen eigen pagina; die lopen via de Custom Counter.

## Specificaties van de teller (5 cijfers)

- **Afmeting en gewicht:** 42 × 10,5 × 10,1 cm, 2,1 kg (7 cijfers: 56,4 cm breed, 2,7 kg).
- **Voorkant:** lindehout multiplex met een transparant polycarbonaat scherm. Mechanische klapcijfers, "zoals een ouderwets stationsbord".
- **Netwerk:**
  - wifi 2,4 GHz (802.11 b/g/n) of ethernet (kabel niet meegeleverd);
  - werkt ook via de hotspot van een telefoon;
  - netwerken met inlogpagina alleen met instellingen van de netwerkbeheerder;
  - statisch IP mogelijk.
- **Stroom:** 5V-adapter met stekkers voor EU, UK, VS en AUS, en een kabel van 2,5 m.
- **Bijwerken:** standaard elke 6 seconden. Instelbaar van 30 seconden tot 24 uur.
- **Plaatsing:** op de toonbank, aan de muur (ophanghaken, 30,1 cm uit elkaar), in de etalage, of onderweg met een powerbank en hotspot.
- **Instagram-eis:**
  - een Instagram Business-account, gekoppeld aan een professionele Facebook-pagina;
  - geen abonnement nodig.
- **Installatie:** stroom erop, koppelen via my.smiirl.com, wifi kiezen, account koppelen.

## Uit het helpcentrum (help.smiirl.com, 26-09-2026)

- **Kleuren zijn vast.** Logo en klapcijfers zijn niet aan te passen (afspraak van Smiirl met Meta). Zo zien de tellers eruit:
  - Instagram: kleurverloop-logo op het hout, roze cijfers;
  - Facebook: blauw logo, blauwe cijfers;
  - TikTok: TikTok-logo, zwarte cijfers;
  - Custom Counter: zwarte cijfers met een plek voor je eigen logo.

  Onze illustraties volgen dit (`src/lib/platformen.ts`). Uitzondering: YouTube (rood) en LinkedIn (blauw) staan op verzoek van Jordan in eigen kleur, terwijl de Custom Counter volgens Smiirl altijd zwarte cijfers heeft. Vraag Smiirl of gekleurde cijfers voor resellers mogelijk zijn; zo niet, zet ze terug op zwart.
- **Account:** Instagram vraagt een professioneel account (zakelijk of creator). Voor Instagram en Facebook is ook een persoonlijk Facebook-profiel nodig om te koppelen.
- **Stand:** de teller begint niet bij nul, maar toont direct het huidige aantal.
- **Meerdere tellers** op hetzelfde account kan.
- **Snelheid:** Facebook en Instagram werken binnen 2 tot 10 seconden bij.
- **Facebook:** de teller toont standaard vind-ik-leuks; bij het koppelen kies je "Followers" om volgers te tonen.
- **TikTok:** koppelen via inloggen bij TikTok en toestemming geven; de teller leest alleen het aantal volgers.
- **Custom Counter:**
  - de klapcijfers zijn altijd zwart;
  - het logo wordt gedrukt: drukvlak 7 × 7 cm, wit wordt niet gedrukt (hout zichtbaar), geen pastelkleuren, vectorbestand of minimaal 300 DPI;
  - **niet toegestaan:** de logo's van Facebook en Instagram; en je moet de rechten op het logo hebben;
  - geen levering zonder logo; na goedkeuring van het logo wordt hij binnen 15 dagen verzonden;
  - een getal instellen kan via de API (HTTP GET met teller-id en token), bijvoorbeeld vanuit **Make**: `add-number`, `set-number`, `reset-number`. Zo kunnen we YouTube-abonnees, LinkedIn- of X-volgers doorgeven.

## Resellerprogramma (smiirl.com/en/business/reseller)

- Smiirl zoekt gevestigde bedrijven met ervaring in sales en social media.
- **Er is een minimale afname.** Het aantal staat niet op de site; vraag het op.
- **Wat Smiirl levert:** onboarding, marketingmateriaal en ondersteuning.
- **Geen exclusiviteit per regio.** Er kunnen dus meer resellers in Nederland zijn.
- **Omvang volgens Smiirl:** 29 partners wereldwijd, en meer dan 3.800 tellers verkocht via resellers in het afgelopen jaar.

## Wat dit betekent voor de View Plus Shop

1. **Concurrentie op prijs:** klanten kunnen ook direct bij Smiirl kopen, tegen de adviesprijs. De meerwaarde van View Plus zit in:
   - het advies;
   - de installatie en het koppelen van het Instagram Business-account;
   - en vooral met View Plus Online (social media management). Die combinatie verkopen we als bundel.
2. **Google-reviewteller hoort bij Review Plus** (besluit Jordan, 26-09-2026): de View Plus Shop biedt en promoot hem niet. De Review Plus Shop voegt hem toe, met Google-G, gouden ster met gemiddelde en het aantal reviews.
3. **YouTube, LinkedIn en X** heeft Smiirl niet als kant-en-klare teller. Die bieden we aan via de Custom Counter, met een koppeling op maat (Zapier of API). Dat kan een andere prijs en meer werk bij het installeren betekenen.

## Vragen voor Jordan

1. Ben je al goedgekeurd als Smiirl-reseller? Zo ja:
   - wat is de minimale afname?
   - wat zijn je inkoopprijzen?
   - mogen we de naam Smiirl en hun productfoto's gebruiken?
2. **Levering:** verstuurt Smiirl rechtstreeks naar de klant (dropship), of houden we zelf voorraad aan? En wat is de levertijd?
3. **Verkoopprijzen:** welke prijzen hanteren we? Adviesprijs, of een pakketprijs met installatie?
4. **Garantie en retour:** wat is de garantietermijn van Smiirl, en wat bieden wij? Mag de klant binnen 14 dagen retour sturen, en wie betaalt dat?
5. **Wat betekent "ons eigen label" precies?**
   - verkopen onder de naam View Plus, met de Smiirl-teller zelf;
   - of tellers met een eigen View Plus-uitvoering.
6. **YouTube, LinkedIn en X:** welke prijs rekenen we (via de Custom Counter), en wie regelt de koppeling?
   - Smiirl drukt alleen logo's waar de klant de rechten op heeft. Mag het logo van YouTube, LinkedIn of X erop, of zetten we het logo van de klant erop? Vraag dit na bij Smiirl.
   - De koppeling kan via Make (API van Smiirl); het ophalen van het aantal abonnees of volgers moet per platform uitgezocht worden.
7. **Installatie op locatie:** bieden we dit aan, bijvoorbeeld als aanvulling op een shootdag?
