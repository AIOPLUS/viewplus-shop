/**
 * Teksten van de platformpagina's (/volgersteller/<platform>), naar het voorbeeld van smiirl.com/discover.
 * Feiten komen uit het helpcentrum van Smiirl (help.smiirl.com, 26-09-2026); zie docs/SMIIRL-ONDERZOEK.md.
 * Geen prijzen, levertijden of resultaten: die volgen als Jordan ze bevestigt.
 */
import type { Platform } from '@/lib/platformen';

export interface PlatformPagina {
  slug: string;
  /** "Instagram-volgersteller" */
  naam: string;
  metaTitle: string;
  metaDescription: string;
  intro: string;
  kleur: string;
  nodig: string[];
  koppelen: string[];
  faq: { vraag: string; antwoord: string }[];
}

const MAATWERK_KOPPELEN = (wat: string) => [
  `Er is geen kant-en-klare teller voor dit platform. We gebruiken de teller naar keuze en zetten een koppeling op maat op die je aantal ${wat} doorgeeft.`,
  'Welk logo er op de teller komt, stemmen we met je af.',
  'Stroom erop, verbinden met wifi, en de koppeling doet de rest.',
];

const MAATWERK_FAQ = (platform: string) => [
  {
    vraag: `Werkt de ${platform}-teller net zo snel als die voor Instagram?`,
    antwoord: 'Niet altijd. Hoe vaak het getal wordt bijgewerkt, hangt af van de koppeling op maat. Dat stemmen we vooraf met je af.',
  },
  {
    vraag: 'Waarom zijn de cijfers zwart?',
    antwoord: `De ${platform}-teller is een teller naar keuze met een koppeling op maat. Die heeft altijd zwarte klapcijfers; de kleur is niet aan te passen.`,
  },
];

export const platformPaginas: Record<Platform, PlatformPagina> = {
  Instagram: {
    slug: 'instagram',
    naam: 'Instagram-volgersteller',
    metaTitle: 'Instagram-volgersteller voor je zaak | View Plus Shop',
    metaDescription: 'Laat in je zaak live zien hoeveel Instagram-volgers je hebt. Roze klapcijfers die meedraaien bij elke nieuwe volger. 5 of 7 cijfers, voor Nederland en België.',
    intro: 'Laat in je zaak live zien hoeveel volgers je hebt op Instagram. Bij elke nieuwe volger klappen de roze cijfers binnen enkele seconden om. Gasten zien het, pakken hun telefoon en volgen je ook.',
    kleur: 'roze klapcijfers met het Instagram-logo',
    nodig: [
      'Een professioneel Instagram-account (zakelijk of creator)',
      'Een Facebook-pagina die aan dat account gekoppeld is',
      'Een persoonlijk Facebook-profiel om de koppeling te maken',
      'Wifi (2,4 GHz) of een netwerkkabel, en een stopcontact',
    ],
    koppelen: [
      'Stroom erop en verbinden met wifi of een netwerkkabel.',
      'Koppel je Instagram-account via je telefoon of computer; je wordt daarvoor even naar Facebook gestuurd.',
      'De teller toont meteen je huidige aantal volgers en telt vanaf dan live mee.',
    ],
    faq: [
      {
        vraag: 'Waarom heb ik een Facebook-profiel nodig voor Instagram?',
        antwoord: 'Instagram en Facebook horen allebei bij Meta. Meta vraagt dat elke koppeling met een zakelijk account via een persoonlijk Facebook-profiel loopt. Dat profiel heb je alleen nodig om de koppeling te maken.',
      },
      {
        vraag: 'Ik heb een persoonlijk Instagram-account. Kan dat ook?',
        antwoord: 'Zet het eerst om naar een professioneel account (zakelijk of creator). Dat doe je gratis in de instellingen van de Instagram-app.',
      },
      {
        vraag: 'Hoe snel verandert het getal?',
        antwoord: 'Binnen enkele seconden na een nieuwe volger. Wil je dat minder vaak, dan kun je het bijwerken ook trager instellen.',
      },
    ],
  },
  Facebook: {
    slug: 'facebook',
    naam: 'Facebook-volgersteller',
    metaTitle: 'Facebook-volgersteller voor je zaak | View Plus Shop',
    metaDescription: 'Laat in je zaak live zien hoeveel volgers je Facebook-pagina heeft. Blauwe klapcijfers die meedraaien bij elke nieuwe volger. 5 of 7 cijfers.',
    intro: 'Laat in je zaak live zien hoeveel volgers je Facebook-pagina heeft. De blauwe klapcijfers draaien mee bij elke nieuwe volger, zodat je gasten zien dat je zaak leeft.',
    kleur: 'blauwe klapcijfers met het Facebook-logo',
    nodig: [
      'Een Facebook-pagina voor je zaak',
      'Een persoonlijk Facebook-profiel om de koppeling te maken',
      'Wifi (2,4 GHz) of een netwerkkabel, en een stopcontact',
    ],
    koppelen: [
      'Stroom erop en verbinden met wifi of een netwerkkabel.',
      'Koppel je Facebook-pagina via je telefoon of computer.',
      'Kies of de teller je volgers of je vind-ik-leuks toont. Hij begint meteen bij je huidige aantal.',
    ],
    faq: [
      {
        vraag: 'Toont de teller volgers of vind-ik-leuks?',
        antwoord: 'Dat kies je zelf bij het koppelen: het aantal volgers of het aantal vind-ik-leuks van je pagina.',
      },
      {
        vraag: 'Kan ik meerdere tellers aan dezelfde pagina koppelen?',
        antwoord: 'Ja, bijvoorbeeld één bij de kassa en één in de etalage, of één per vestiging.',
      },
    ],
  },
  TikTok: {
    slug: 'tiktok',
    naam: 'TikTok-volgersteller',
    metaTitle: 'TikTok-volgersteller voor je zaak | View Plus Shop',
    metaDescription: 'Laat in je zaak live zien hoeveel TikTok-volgers je hebt. Zwarte klapcijfers met het TikTok-logo, 5 of 7 cijfers. Voor Nederland en België.',
    intro: 'Laat in je zaak live zien hoeveel volgers je hebt op TikTok. Ideaal als je je werk in korte video’s laat zien: gasten die je teller zien, volgen je om de volgende video niet te missen.',
    kleur: 'zwarte klapcijfers met het TikTok-logo',
    nodig: ['Je TikTok-account', 'Wifi (2,4 GHz) of een netwerkkabel, en een stopcontact'],
    koppelen: [
      'Stroom erop en verbinden met wifi of een netwerkkabel.',
      'Log in bij TikTok en geef toestemming om je aantal volgers te lezen. Verder kan de teller niets met je account.',
      'De teller toont je huidige aantal volgers en telt vanaf dan mee.',
    ],
    faq: [
      {
        vraag: 'Kan de teller iets plaatsen of wijzigen op mijn TikTok?',
        antwoord: 'Nee. De teller leest alleen je aantal volgers.',
      },
      {
        vraag: 'Waarom zijn de cijfers zwart?',
        antwoord: 'Zo ziet de TikTok-teller eruit, in de stijl van TikTok. De kleuren zijn niet aan te passen.',
      },
    ],
  },
  YouTube: {
    slug: 'youtube',
    naam: 'YouTube-abonneeteller',
    metaTitle: 'YouTube-abonneeteller voor je zaak of studio | View Plus Shop',
    metaDescription: 'Laat live zien hoeveel abonnees je YouTube-kanaal heeft, met mechanische klapcijfers. Koppeling op maat, 5 of 7 cijfers.',
    intro: 'Laat in je zaak, studio of kantoor live zien hoeveel abonnees je YouTube-kanaal heeft. Met dezelfde mechanische klapcijfers als onze andere tellers, en een koppeling die we voor je op maat maken.',
    kleur: 'zwarte klapcijfers',
    nodig: ['Je YouTube-kanaal', 'Wifi (2,4 GHz) of een netwerkkabel, en een stopcontact', 'Een koppeling op maat; die stemmen we met je af'],
    koppelen: MAATWERK_KOPPELEN('abonnees'),
    faq: MAATWERK_FAQ('YouTube'),
  },
  LinkedIn: {
    slug: 'linkedin',
    naam: 'LinkedIn-volgersteller',
    metaTitle: 'LinkedIn-volgersteller voor kantoor en beurs | View Plus Shop',
    metaDescription: 'Laat live zien hoeveel volgers je LinkedIn-bedrijfspagina heeft, op kantoor of op je beursstand. Koppeling op maat, 5 of 7 cijfers.',
    intro: 'Laat op kantoor, bij de receptie of op je beursstand zien hoeveel volgers je LinkedIn-bedrijfspagina heeft. Een blikvanger die je team motiveert en bezoekers laat volgen.',
    kleur: 'zwarte klapcijfers',
    nodig: ['Je LinkedIn-bedrijfspagina', 'Wifi (2,4 GHz) of een netwerkkabel, en een stopcontact', 'Een koppeling op maat; die stemmen we met je af'],
    koppelen: MAATWERK_KOPPELEN('volgers'),
    faq: MAATWERK_FAQ('LinkedIn'),
  },
  X: {
    slug: 'x',
    naam: 'X-volgersteller',
    metaTitle: 'X-volgersteller (voorheen Twitter) | View Plus Shop',
    metaDescription: 'Laat live zien hoeveel volgers je hebt op X (voorheen Twitter), met mechanische klapcijfers. Koppeling op maat, 5 of 7 cijfers.',
    intro: 'Laat live zien hoeveel volgers je hebt op X, voorheen Twitter. Met mechanische klapcijfers die meedraaien, en een koppeling die we voor je op maat maken.',
    kleur: 'zwarte klapcijfers',
    nodig: ['Je X-account', 'Wifi (2,4 GHz) of een netwerkkabel, en een stopcontact', 'Een koppeling op maat; die stemmen we met je af'],
    koppelen: MAATWERK_KOPPELEN('volgers'),
    faq: MAATWERK_FAQ('X'),
  },
};
