/**
 * Teksten van de View Plus Shop. Productteksten staan in src/content/products/*.md.
 * Geen verzonnen cijfers, reviews of levertijden: die voegen we pas toe als Jordan ze bevestigt.
 */

/** Hoe het werkt, in vier stappen. */
export const stappen = [
  { titel: 'Kies je teller', tekst: 'Kies het platform (Instagram, Facebook, TikTok, YouTube, LinkedIn of X) of je eigen getal, en 5 of 7 cijfers.' },
  { titel: 'Bestel online', tekst: 'Vul je bedrijfsgegevens en bezorgadres in en rond je bestelling af.' },
  { titel: 'Koppel je account', tekst: 'Stroom erop, verbinden met wifi en je account koppelen. Dat doe je in een paar minuten met je telefoon.' },
  { titel: 'Zie je volgers groeien', tekst: 'Gasten zien het getal, pakken hun telefoon en volgen je. Bij elke nieuwe volger klappen de cijfers om.' },
] as const;

/**
 * Ideeën per soort zaak (homepage), naar het voorbeeld van smiirl.com. Alleen ideeën, geen resultaten of klantnamen.
 * `sector` linkt naar een sectorpagina als die bestaat; anders naar het product.
 */
export const ideeen: { titel: string; tekst: string; product: 'live-volgersteller' | 'live-teller-op-maat'; sector?: string }[] = [
  { titel: 'Café en bar', tekst: 'Trakteer bij elke 1.000 volgers op een rondje. De teller laat iedereen zien wanneer het zover is.', product: 'live-volgersteller', sector: 'horeca' },
  { titel: 'Restaurant', tekst: 'Zet de teller bij de ingang of de kassa. Gasten zien hem bij binnenkomst en bij het afrekenen.', product: 'live-volgersteller', sector: 'horeca' },
  { titel: 'Kapper en salon', tekst: 'Je klanten zitten er even. Zet de teller in hun zicht en laat op TikTok of Instagram je werk zien.', product: 'live-volgersteller', sector: 'beauty-en-wellness' },
  { titel: 'Sportschool', tekst: 'Vier mijlpalen samen met je leden, bijvoorbeeld met een challenge bij elke 100 nieuwe volgers.', product: 'live-volgersteller', sector: 'beauty-en-wellness' },
  { titel: 'Winkel en boutique', tekst: 'In de etalage trekken de omklappende cijfers de aandacht van voorbijgangers.', product: 'live-volgersteller', sector: 'winkels' },
  { titel: 'Markten en beurzen', tekst: 'Neem de teller mee. Met een powerbank en de hotspot van je telefoon werkt hij ook onderweg.', product: 'live-volgersteller' },
  { titel: 'Kantoor en B2B', tekst: 'Laat je LinkedIn-volgers of YouTube-abonnees zien op kantoor, bij de receptie of op je beursstand.', product: 'live-volgersteller' },
  { titel: 'Goed doel en team', tekst: 'Tel opgehaalde donaties, leveringen of Google-reviews live mee met de teller naar keuze.', product: 'live-teller-op-maat' },
];

export const faq = [
  {
    vraag: 'Wat is een live volgersteller?',
    antwoord: 'Een teller met mechanische klapcijfers die in je zaak laat zien hoeveel volgers je hebt op Instagram, Facebook, TikTok, YouTube, LinkedIn of X. Via wifi wordt het getal automatisch bijgewerkt.',
  },
  {
    vraag: 'Welk account heb ik nodig?',
    antwoord: 'Voor Instagram een professioneel account (zakelijk of creator) dat gekoppeld is aan een Facebook-pagina, en een persoonlijk Facebook-profiel om de koppeling te maken. Een persoonlijk Instagram-account zet je gratis om in de Instagram-app.',
  },
  {
    vraag: 'Kies ik 5 of 7 cijfers?',
    antwoord: 'Met 5 cijfers tel je tot 99.999, met 7 cijfers tot 9.999.999. Voor de meeste lokale zaken zijn 5 cijfers genoeg; groei je hard, kies dan 7.',
  },
  {
    vraag: 'Werkt de teller ook voor YouTube, LinkedIn en X?',
    antwoord: 'Ja. Voor Instagram, Facebook en TikTok koppel je je account direct. Voor YouTube, LinkedIn en X stemmen we de koppeling met je af.',
  },
  {
    vraag: 'Kan ik ook mijn Google-reviews laten meetellen?',
    antwoord: 'Ja, met de live teller naar keuze. Die toont elk getal dat je koppelt, zoals je aantal Google-reviews. Wil je ook méér reviews, kijk dan bij ons zusterlabel Review Plus.',
  },
  {
    vraag: 'Helpen jullie ook met mijn social media?',
    antwoord: 'Ja. Met View Plus Online nemen we je social media volledig uit handen, van fotografie tot posts en reacties. Zo hebben nieuwe volgers ook iets om naar te kijken.',
  },
] as const;
