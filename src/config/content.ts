/**
 * Teksten van de View Plus Shop. Productteksten staan in src/content/products/*.md.
 * Geen verzonnen cijfers, reviews of levertijden: die voegen we pas toe als Jordan ze bevestigt.
 */

/** Hoe het werkt, in vier stappen. */
export const stappen = [
  { titel: 'Kies je product', tekst: 'Kies een live teller of een NFC-volgstandaard, het platform (Instagram, Facebook of TikTok) en de uitvoering.' },
  { titel: 'Bestel online', tekst: 'Vul je bedrijfsgegevens en bezorgadres in en rond je bestelling af.' },
  { titel: 'Koppel je account', tekst: 'Stroom erop, verbinden met wifi en je account koppelen. Dat doe je in een paar minuten met je telefoon.' },
  { titel: 'Zie je volgers groeien', tekst: 'Gasten tikken op de standaard, volgen je en zien het getal op de teller meteen meedraaien.' },
] as const;

/** Platformen in de paarse band op de homepage (iconen uit Simple Icons). */
export const platformen: readonly { naam: string; icoon?: string; woordmerk?: boolean }[] = [
  { naam: 'Instagram', icoon: 'si:instagram' },
  { naam: 'Facebook', icoon: 'si:facebook' },
  { naam: 'TikTok', icoon: 'si:tiktok' },
  { naam: 'Google-reviews', icoon: 'si:google' },
];

export const faq = [
  {
    vraag: 'Wat is een live volgersteller?',
    antwoord: 'Een teller met mechanische klapcijfers die in je zaak laat zien hoeveel volgers je hebt op Instagram, Facebook of TikTok. Via wifi wordt het getal automatisch bijgewerkt, standaard elke 6 seconden.',
  },
  {
    vraag: 'Welk account heb ik nodig?',
    antwoord: 'Voor Instagram een Instagram Business-account dat gekoppeld is aan een professionele Facebook-pagina. Een persoonlijk account zet je gratis om in de Instagram-app.',
  },
  {
    vraag: 'Wat is het verschil tussen de teller en de volgstandaard?',
    antwoord: 'De volgstandaard maakt volgen makkelijk: gasten tikken erop of scannen de QR-code en staan direct op je profiel. De teller laat het resultaat zien. Samen werken ze het best.',
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
