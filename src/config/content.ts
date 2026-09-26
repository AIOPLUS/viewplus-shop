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

export const faq = [
  {
    vraag: 'Wat is een live volgersteller?',
    antwoord: 'Een teller met mechanische klapcijfers die in je zaak laat zien hoeveel volgers je hebt op Instagram, Facebook, TikTok, YouTube, LinkedIn of X. Via wifi wordt het getal automatisch bijgewerkt.',
  },
  {
    vraag: 'Welk account heb ik nodig?',
    antwoord: 'Voor Instagram een Instagram Business-account dat gekoppeld is aan een professionele Facebook-pagina. Een persoonlijk account zet je gratis om in de Instagram-app.',
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
