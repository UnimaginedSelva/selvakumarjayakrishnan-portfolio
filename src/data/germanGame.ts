export interface VocabItem {
  german: string
  pronunciation: string
  english: string
}

export interface VerbItem {
  infinitive: string
  english: string
  auxiliary: 'haben' | 'sein'
  pastParticiple: string
  conjugations: { ich: string; du: string; erSieEs: string; wir: string; ihr: string; sie: string }
}

export type LevelItem = VocabItem | VerbItem

export interface GameLevel {
  id: string
  title: string
  description: string
  type: 'vocab' | 'verb' | 'phrase'
  items: LevelItem[]
}

export const gameSource = {
  title: 'German For Dummies',
  author: 'Paulina Christensen, Anne Fox, and Wendy Foster',
}

export const levels: GameLevel[] = [
  {
    "id": "ch1-everyday-words",
    "title": "Everyday Words",
    "description": "Cognates and common one-word reactions from Chapter 1",
    "type": "vocab",
    "items": [
      {
        "german": "die Adresse",
        "pronunciation": "dee ah-drês-e",
        "english": "address"
      },
      {
        "german": "der Aspekt",
        "pronunciation": "dêr âs-pêkt",
        "english": "aspect"
      },
      {
        "german": "der Bär",
        "pronunciation": "dêr bear [as in English]",
        "english": "bear"
      },
      {
        "german": "blond",
        "pronunciation": "blont",
        "english": "blond(e)"
      },
      {
        "german": "die Bluse",
        "pronunciation": "dee blooh-ze",
        "english": "blouse"
      },
      {
        "german": "braun",
        "pronunciation": "brown [as in English]",
        "english": "brown"
      },
      {
        "german": "die Demokratie",
        "pronunciation": "dee dê-moh-krâ-tee",
        "english": "democracy"
      },
      {
        "german": "direkt",
        "pronunciation": "di-rêkt",
        "english": "direct"
      },
      {
        "german": "der Doktor",
        "pronunciation": "dêr dok-tohr",
        "english": "doctor"
      },
      {
        "german": "exzellent",
        "pronunciation": "êx-tsel-ênt",
        "english": "excellent"
      },
      {
        "german": "fantastisch",
        "pronunciation": "fân-tâs-tish",
        "english": "fantastic"
      },
      {
        "german": "das Glas",
        "pronunciation": "dâs glahs",
        "english": "glass"
      },
      {
        "german": "das Haus",
        "pronunciation": "dâs hous",
        "english": "house"
      },
      {
        "german": "hungrig",
        "pronunciation": "hoong-riH",
        "english": "hungry"
      },
      {
        "german": "die Industrie",
        "pronunciation": "dee in-dooh-stree",
        "english": "industry"
      },
      {
        "german": "der Kaffee",
        "pronunciation": "dêr kâf-ey",
        "english": "coffee"
      },
      {
        "german": "die Komödie",
        "pronunciation": "dee koh-mer-dee-e",
        "english": "comedy"
      },
      {
        "german": "die Kondition",
        "pronunciation": "dee kon-di-tsee-ohn",
        "english": "condition"
      },
      {
        "german": "das Konzert",
        "pronunciation": "dâs kon-tsêrt",
        "english": "concert"
      },
      {
        "german": "die Kultur",
        "pronunciation": "dee kool-toohr",
        "english": "culture"
      },
      {
        "german": "logisch",
        "pronunciation": "loh-gish",
        "english": "logical"
      },
      {
        "german": "das Mandat",
        "pronunciation": "dâs mân-daht",
        "english": "mandate"
      },
      {
        "german": "der Mann",
        "pronunciation": "dêr mân",
        "english": "man"
      },
      {
        "german": "die Maschine",
        "pronunciation": "dee mâ-sheen-e",
        "english": "machine"
      },
      {
        "german": "die Maus",
        "pronunciation": "dee mouse [as in English]",
        "english": "mouse"
      },
      {
        "german": "die Methode",
        "pronunciation": "dee mê-toh-de",
        "english": "method"
      },
      {
        "german": "die Mobilität",
        "pronunciation": "dee moh-bi-li-tait",
        "english": "mobility"
      },
      {
        "german": "die Musik",
        "pronunciation": "dee mooh-zeek",
        "english": "music"
      },
      {
        "german": "die Nationalität",
        "pronunciation": "dee nât-see-oh-nahl-i-tait",
        "english": "nationality"
      },
      {
        "german": "die Natur",
        "pronunciation": "dee nâ-toohr",
        "english": "nature"
      },
      {
        "german": "offiziell",
        "pronunciation": "oh-fits-ee-êl",
        "english": "official (adjective)"
      },
      {
        "german": "der Ozean",
        "pronunciation": "dêr oh-tsê-ân",
        "english": "ocean"
      },
      {
        "german": "das Papier",
        "pronunciation": "dâs pâ-peer",
        "english": "paper"
      },
      {
        "german": "das Parlament",
        "pronunciation": "dâs pâr-lâ-mênt",
        "english": "parliament"
      },
      {
        "german": "perfekt",
        "pronunciation": "pêr-fêkt",
        "english": "perfect"
      },
      {
        "german": "politisch",
        "pronunciation": "poh-li-tish",
        "english": "political"
      },
      {
        "german": "potenziell",
        "pronunciation": "po-tên-tsee-êl",
        "english": "potential (adjective)"
      },
      {
        "german": "praktisch",
        "pronunciation": "prâk-tish",
        "english": "practical"
      },
      {
        "german": "das Programm",
        "pronunciation": "dâs proh-grâm",
        "english": "program"
      },
      {
        "german": "das Salz",
        "pronunciation": "dâs zâlts",
        "english": "salt"
      },
      {
        "german": "der Scheck",
        "pronunciation": "dêr shêk",
        "english": "check"
      },
      {
        "german": "sonnig",
        "pronunciation": "zon-iH",
        "english": "sunny"
      },
      {
        "german": "der Supermarkt",
        "pronunciation": "dêr zooh-pêr-mârkt",
        "english": "supermarket"
      },
      {
        "german": "das Telefon",
        "pronunciation": "dâs tê-le-fohn",
        "english": "telephone"
      },
      {
        "german": "die Theorie",
        "pronunciation": "dee tey-ohr-ee",
        "english": "theory"
      },
      {
        "german": "die Tragödie",
        "pronunciation": "dee trâ-ger-dee-e",
        "english": "tragedy"
      },
      {
        "german": "die Walnuss",
        "pronunciation": "dee vahl-noohs",
        "english": "walnut"
      },
      {
        "german": "Prima!/Klasse!/Toll!",
        "pronunciation": "pree-mah!/klâs-e!/tôl!",
        "english": "Great!"
      },
      {
        "german": "Fertig.",
        "pronunciation": "fêrt-iH.",
        "english": "Ready./Finished."
      },
      {
        "german": "Quatsch!",
        "pronunciation": "qvâch!",
        "english": "Nonsense!/How silly of me!"
      },
      {
        "german": "Einverstanden.",
        "pronunciation": "ayn-fêr-shtând-en.",
        "english": "Agreed./Okay."
      },
      {
        "german": "Vielleicht.",
        "pronunciation": "fee-layHt.",
        "english": "Maybe./Perhaps."
      },
      {
        "german": "Mach's gut.",
        "pronunciation": "mâHs gooht.",
        "english": "Take it easy."
      },
      {
        "german": "Wie, bitte?",
        "pronunciation": "vee bi-te?",
        "english": "[I beg your] pardon?/What did you say?"
      },
      {
        "german": "Macht nichts.",
        "pronunciation": "mâHt niHts.",
        "english": "Never mind./That's okay."
      },
      {
        "german": "Nicht der Rede wert.",
        "pronunciation": "niHt dêr rey-de vêrt.",
        "english": "Don't mention it."
      },
      {
        "german": "Schade!",
        "pronunciation": "shah-de!",
        "english": "Too bad!/What a pity!"
      },
      {
        "german": "So ein Pech!",
        "pronunciation": "zoh ayn pêH!",
        "english": "Bad luck!"
      },
      {
        "german": "Viel Glück!",
        "pronunciation": "feel gluek!",
        "english": "Good luck!"
      },
      {
        "german": "Oder?",
        "pronunciation": "oh-der?",
        "english": "Isn't that true?/Don't you think so?"
      },
      {
        "german": "Bis dann!",
        "pronunciation": "bis dân!",
        "english": "See you then!"
      },
      {
        "german": "Bis bald!",
        "pronunciation": "bis bâlt!",
        "english": "See you soon!"
      }
    ]
  },
  {
    "id": "ch3-greetings",
    "title": "Greetings & Small Talk",
    "description": "Hellos, goodbyes, and introducing yourself from Chapter 3",
    "type": "vocab",
    "items": [
      {
        "german": "Grüezi",
        "pronunciation": "grue-e-tsee",
        "english": "hello"
      },
      {
        "german": "salut",
        "pronunciation": "sâ-lue",
        "english": "hi and bye (between close friends)"
      },
      {
        "german": "Grüß Gott",
        "pronunciation": "grues gôt",
        "english": "hello"
      },
      {
        "german": "Servus",
        "pronunciation": "sêr-voohs",
        "english": "hi and bye (between good friends)"
      },
      {
        "german": "Ciao",
        "pronunciation": "chou",
        "english": "goodbye (informal)"
      },
      {
        "german": "Guten Morgen!",
        "pronunciation": "gooh-ten mor-gen!",
        "english": "Good morning!"
      },
      {
        "german": "Guten Tag!",
        "pronunciation": "gooh-ten tahk!",
        "english": "Hello!"
      },
      {
        "german": "Guten Abend!",
        "pronunciation": "gooh-ten ah-bent!",
        "english": "Good evening!"
      },
      {
        "german": "Hallo!",
        "pronunciation": "hâ-loh!",
        "english": "Hello!"
      },
      {
        "german": "Auf Wiedersehen!",
        "pronunciation": "ouf vee-der-zey-en!",
        "english": "Goodbye!"
      },
      {
        "german": "Gute Nacht!",
        "pronunciation": "gooh-te nâHt!",
        "english": "Good night!"
      },
      {
        "german": "War nett, Sie kennenzulernen.",
        "pronunciation": "vahr nêt, zee kên-en-tsoo-lêrn-en.",
        "english": "It was nice meeting you."
      },
      {
        "german": "Tschüs!",
        "pronunciation": "chues!",
        "english": "Bye!"
      },
      {
        "german": "Wie geht es Ihnen?",
        "pronunciation": "vee geyt ês een-en?",
        "english": "How are you? (formal)"
      },
      {
        "german": "Wie geht es dir?",
        "pronunciation": "vee geyt ês deer?",
        "english": "How are you? (informal, singular)"
      },
      {
        "german": "Wie geht's?",
        "pronunciation": "vee geyts?",
        "english": "How's it going?"
      },
      {
        "german": "Wie geht es euch?",
        "pronunciation": "vee geyt ês oyH?",
        "english": "How are you? (informal, plural)"
      },
      {
        "german": "Herr",
        "pronunciation": "hêr",
        "english": "Mr."
      },
      {
        "german": "Frau",
        "pronunciation": "frou",
        "english": "Mrs./Ms."
      },
      {
        "german": "Fräulein",
        "pronunciation": "froy-layn",
        "english": "Miss (archaic, no longer used)"
      },
      {
        "german": "Entschuldigung!",
        "pronunciation": "ênt-shool-dee-goong!",
        "english": "Excuse me!"
      },
      {
        "german": "Danke, gut.",
        "pronunciation": "dân-ke, gooht.",
        "english": "Thanks, I'm fine."
      },
      {
        "german": "Gut, danke.",
        "pronunciation": "gooht, dân-ke.",
        "english": "Fine, thanks."
      },
      {
        "german": "Sehr gut.",
        "pronunciation": "zeyr gooht.",
        "english": "Very good."
      },
      {
        "german": "Ganz gut.",
        "pronunciation": "gânts gooht.",
        "english": "Really good."
      },
      {
        "german": "Es geht.",
        "pronunciation": "ês geyt.",
        "english": "So, so."
      },
      {
        "german": "Nicht so gut.",
        "pronunciation": "niHt zoh gooht.",
        "english": "Not so good."
      },
      {
        "german": "Und Ihnen?",
        "pronunciation": "oont een-en?",
        "english": "And you? (formal)"
      },
      {
        "german": "Und dir?",
        "pronunciation": "oont deer?",
        "english": "And you? (informal, singular)"
      },
      {
        "german": "Und euch?",
        "pronunciation": "oont oyH?",
        "english": "And you? (informal, plural)"
      },
      {
        "german": "Das ist . . .",
        "pronunciation": "dâs ist . . .",
        "english": "This is . . ."
      },
      {
        "german": "Freut mich.",
        "pronunciation": "froyt miH",
        "english": "Nice to meet you."
      },
      {
        "german": "Mich auch.",
        "pronunciation": "miH ouH",
        "english": "Pleased to meet you, too."
      },
      {
        "german": "Darf ich Ihnen . . . vorstellen?",
        "pronunciation": "dârf iH een-en . . . fohr-shtêl-len?",
        "english": "May I introduce you to . . . ?"
      },
      {
        "german": "Freut mich, Sie kennenzulernen.",
        "pronunciation": "froyt miH, zee kên-en-tsoo-lêrn-en.",
        "english": "I'm pleased to meet you."
      },
      {
        "german": "Meinerseits.",
        "pronunciation": "mayn-er-zayts.",
        "english": "The pleasure is all mine."
      },
      {
        "german": "auch",
        "pronunciation": "ouH",
        "english": "also"
      },
      {
        "german": "gut",
        "pronunciation": "gooht",
        "english": "good"
      },
      {
        "german": "sehr",
        "pronunciation": "zeyr",
        "english": "very"
      },
      {
        "german": "freuen",
        "pronunciation": "froy-en",
        "english": "to be glad/pleased"
      },
      {
        "german": "kennenlernen",
        "pronunciation": "kên-en-lêrn-en",
        "english": "to become acquainted with/to get to know"
      },
      {
        "german": "vorstellen",
        "pronunciation": "fohr-shtêl-len",
        "english": "to introduce"
      },
      {
        "german": "der Freund",
        "pronunciation": "der froynt",
        "english": "friend (male)"
      },
      {
        "german": "die Freundin",
        "pronunciation": "dee froyn-din",
        "english": "friend (female)"
      },
      {
        "german": "Mein Name ist. . . .",
        "pronunciation": "mayn nah-me ist. . . .",
        "english": "My name is . . ."
      },
      {
        "german": "Ich heiße. . . .",
        "pronunciation": "iH hay-se. . . .",
        "english": "My name is . . ./I'm called . . ."
      }
    ]
  },
  {
    "id": "ch4-numbers",
    "title": "Numbers",
    "description": "Zero through one thousand, from Chapter 4",
    "type": "vocab",
    "items": [
      {
        "german": "null",
        "pronunciation": "nool",
        "english": "zero"
      },
      {
        "german": "eins",
        "pronunciation": "ayns",
        "english": "one"
      },
      {
        "german": "zwei",
        "pronunciation": "tsvay",
        "english": "two"
      },
      {
        "german": "drei",
        "pronunciation": "dray",
        "english": "three"
      },
      {
        "german": "vier",
        "pronunciation": "feer",
        "english": "four"
      },
      {
        "german": "fünf",
        "pronunciation": "fuenf",
        "english": "five"
      },
      {
        "german": "sechs",
        "pronunciation": "zêks",
        "english": "six"
      },
      {
        "german": "sieben",
        "pronunciation": "zee-ben",
        "english": "seven"
      },
      {
        "german": "acht",
        "pronunciation": "âHt",
        "english": "eight"
      },
      {
        "german": "neun",
        "pronunciation": "noyn",
        "english": "nine"
      },
      {
        "german": "zehn",
        "pronunciation": "tseyn",
        "english": "ten"
      },
      {
        "german": "elf",
        "pronunciation": "êlf",
        "english": "eleven"
      },
      {
        "german": "zwölf",
        "pronunciation": "tsverlf",
        "english": "twelve"
      },
      {
        "german": "dreizehn",
        "pronunciation": "dray-tseyn",
        "english": "thirteen"
      },
      {
        "german": "vierzehn",
        "pronunciation": "feer-tseyn",
        "english": "fourteen"
      },
      {
        "german": "fünfzehn",
        "pronunciation": "fuenf-tseyn",
        "english": "fifteen"
      },
      {
        "german": "sechzehn",
        "pronunciation": "zêH-tseyn",
        "english": "sixteen"
      },
      {
        "german": "siebzehn",
        "pronunciation": "zeep-tseyn",
        "english": "seventeen"
      },
      {
        "german": "achtzehn",
        "pronunciation": "âHt-tseyn",
        "english": "eighteen"
      },
      {
        "german": "neunzehn",
        "pronunciation": "noyn-tseyn",
        "english": "nineteen"
      },
      {
        "german": "zwanzig",
        "pronunciation": "tsvân-tsiH",
        "english": "twenty"
      },
      {
        "german": "einundzwanzig",
        "pronunciation": "ayn-oont-tsvân-tsiH",
        "english": "twenty-one"
      },
      {
        "german": "zweiundzwanzig",
        "pronunciation": "tsvay-oont-tsvân-tsiH",
        "english": "twenty-two"
      },
      {
        "german": "dreiundzwanzig",
        "pronunciation": "dray-oont-tsvân-tsiH",
        "english": "twenty-three"
      },
      {
        "german": "vierundzwanzig",
        "pronunciation": "feer-oont-tsvân-tsiH",
        "english": "twenty-four"
      },
      {
        "german": "fünfundzwanzig",
        "pronunciation": "fuenf-oont-tsvân-tsiH",
        "english": "twenty-five"
      },
      {
        "german": "dreißig",
        "pronunciation": "dray-siH",
        "english": "thirty"
      },
      {
        "german": "vierzig",
        "pronunciation": "feer-tsiH",
        "english": "forty"
      },
      {
        "german": "fünfzig",
        "pronunciation": "fuenf-tsiH",
        "english": "fifty"
      },
      {
        "german": "sechzig",
        "pronunciation": "zêH-tsiH",
        "english": "sixty"
      },
      {
        "german": "siebzig",
        "pronunciation": "zeep-tsiH",
        "english": "seventy"
      },
      {
        "german": "achtzig",
        "pronunciation": "âHt-tsiH",
        "english": "eighty"
      },
      {
        "german": "neunzig",
        "pronunciation": "noyn-tsiH",
        "english": "ninety"
      },
      {
        "german": "hundert",
        "pronunciation": "hoon-dert",
        "english": "one hundred"
      },
      {
        "german": "zweihundert",
        "pronunciation": "tsvay-hoon-dert",
        "english": "two hundred"
      },
      {
        "german": "dreihundert",
        "pronunciation": "dray-hoon-dert",
        "english": "three hundred"
      },
      {
        "german": "vierhundert",
        "pronunciation": "feer-hoon-dert",
        "english": "four hundred"
      },
      {
        "german": "fünfhundert",
        "pronunciation": "fuenf-hoon-dert",
        "english": "five hundred"
      },
      {
        "german": "tausend",
        "pronunciation": "tou-zent",
        "english": "one thousand"
      }
    ]
  },
  {
    "id": "ch4-time",
    "title": "Time, Days & Months",
    "description": "Telling time, weekdays, and months from Chapter 4",
    "type": "vocab",
    "items": [
      {
        "german": "Wie viel Uhr ist es?",
        "pronunciation": "vee feel oohr ist ês?",
        "english": "What time is it?"
      },
      {
        "german": "Wie spät ist es?",
        "pronunciation": "vee shpait ist ês?",
        "english": "What time is it?"
      },
      {
        "german": "Es ist . . . Uhr.",
        "pronunciation": "ês ist . . . oohr.",
        "english": "It's . . . o'clock."
      },
      {
        "german": "Viertel",
        "pronunciation": "feer-tel",
        "english": "quarter"
      },
      {
        "german": "nach",
        "pronunciation": "nâH",
        "english": "past/after"
      },
      {
        "german": "vor",
        "pronunciation": "fohr",
        "english": "to/before"
      },
      {
        "german": "halb",
        "pronunciation": "hâlp",
        "english": "half"
      },
      {
        "german": "Mitternacht",
        "pronunciation": "mit-er-nâHt",
        "english": "midnight"
      },
      {
        "german": "der Morgen",
        "pronunciation": "dêr mor-gen",
        "english": "morning (4:00 a.m. to noon)"
      },
      {
        "german": "der Vormittag",
        "pronunciation": "dêr fohr-mi-tahk",
        "english": "morning (9:00 a.m. to noon)"
      },
      {
        "german": "der Mittag",
        "pronunciation": "dêr mi-tahk",
        "english": "noon"
      },
      {
        "german": "der Nachmittag",
        "pronunciation": "dêr nâH-mi-tahk",
        "english": "afternoon"
      },
      {
        "german": "die Nacht",
        "pronunciation": "dee nâHt",
        "english": "night"
      },
      {
        "german": "Montag",
        "pronunciation": "mohn-tahk",
        "english": "Monday"
      },
      {
        "german": "Dienstag",
        "pronunciation": "deens-tahk",
        "english": "Tuesday"
      },
      {
        "german": "Mittwoch",
        "pronunciation": "mit-voH",
        "english": "Wednesday"
      },
      {
        "german": "Donnerstag",
        "pronunciation": "don-ers-tahk",
        "english": "Thursday"
      },
      {
        "german": "Freitag",
        "pronunciation": "fray-tâk",
        "english": "Friday"
      },
      {
        "german": "Samstag/Sonnabend",
        "pronunciation": "zâms-tahk/zon-ah-bênt",
        "english": "Saturday"
      },
      {
        "german": "Sonntag",
        "pronunciation": "zon-tahk",
        "english": "Sunday"
      },
      {
        "german": "heute",
        "pronunciation": "hoy-te",
        "english": "today"
      },
      {
        "german": "gestern",
        "pronunciation": "gês-tern",
        "english": "yesterday"
      },
      {
        "german": "vorgestern",
        "pronunciation": "fohr-gês-tern",
        "english": "the day before yesterday"
      },
      {
        "german": "morgen",
        "pronunciation": "mor-gen",
        "english": "tomorrow"
      },
      {
        "german": "übermorgen",
        "pronunciation": "ue-ber-mor-gen",
        "english": "the day after tomorrow"
      },
      {
        "german": "Januar",
        "pronunciation": "yâ-noo-ahr",
        "english": "January"
      },
      {
        "german": "Februar",
        "pronunciation": "fey-broo-ahr",
        "english": "February"
      },
      {
        "german": "März",
        "pronunciation": "mêrts",
        "english": "March"
      },
      {
        "german": "April",
        "pronunciation": "ah-pril",
        "english": "April"
      },
      {
        "german": "Mai",
        "pronunciation": "may",
        "english": "May"
      },
      {
        "german": "Juni",
        "pronunciation": "yooh-nee",
        "english": "June"
      },
      {
        "german": "Juli",
        "pronunciation": "yooh-lee",
        "english": "July"
      },
      {
        "german": "August",
        "pronunciation": "ou-goost",
        "english": "August"
      },
      {
        "german": "September",
        "pronunciation": "zêp-têm-ber",
        "english": "September"
      },
      {
        "german": "Oktober",
        "pronunciation": "ok-toh-ber",
        "english": "October"
      },
      {
        "german": "November",
        "pronunciation": "no-vêm-ber",
        "english": "November"
      },
      {
        "german": "Dezember",
        "pronunciation": "dey-tsêm-ber",
        "english": "December"
      }
    ]
  },
  {
    "id": "ch4-shopping",
    "title": "Shopping & Measurements",
    "description": "Weights, quantities, and market phrases from Chapter 4",
    "type": "vocab",
    "items": [
      {
        "german": "Liter",
        "pronunciation": "lee-ter",
        "english": "liter"
      },
      {
        "german": "Kilometer",
        "pronunciation": "ki-lo-mey-ter",
        "english": "kilometer"
      },
      {
        "german": "Stück",
        "pronunciation": "shtuek",
        "english": "piece"
      },
      {
        "german": "Scheibe",
        "pronunciation": "shay-be",
        "english": "slice"
      },
      {
        "german": "Ich hätte gern. . . .",
        "pronunciation": "iH hêt-e gêrn. . . .",
        "english": "I would like to have . . ."
      },
      {
        "german": "das Kilo",
        "pronunciation": "dâs kee-loh",
        "english": "kilogram"
      },
      {
        "german": "das Pfund",
        "pronunciation": "dâs pfoont",
        "english": "pound"
      },
      {
        "german": "das Gramm",
        "pronunciation": "dâs grâm",
        "english": "gram"
      },
      {
        "german": "wie viel",
        "pronunciation": "vee feel",
        "english": "how much"
      },
      {
        "german": "wie viele",
        "pronunciation": "vee fee-le",
        "english": "how many"
      },
      {
        "german": "Das wär's.",
        "pronunciation": "dâs vêrs",
        "english": "That's it."
      },
      {
        "german": "Was darf es sein?",
        "pronunciation": "vâs dârf ês zayn?",
        "english": "What would you like?"
      },
      {
        "german": "Sonst noch etwas?",
        "pronunciation": "zonst noH êt-vâs?",
        "english": "Anything else?"
      }
    ]
  },
  {
    "id": "verb-conjugations",
    "title": "Verb Conjugations",
    "description": "Present-tense conjugations of key regular and irregular verbs",
    "type": "verb",
    "items": [
      {
        "infinitive": "haben",
        "english": "to have",
        "auxiliary": "haben",
        "pastParticiple": "gehabt",
        "conjugations": {
          "ich": "habe",
          "du": "hast",
          "erSieEs": "hat",
          "wir": "haben",
          "ihr": "habt",
          "sie": "haben"
        }
      },
      {
        "infinitive": "werden",
        "english": "will / to become",
        "auxiliary": "sein",
        "pastParticiple": "geworden",
        "conjugations": {
          "ich": "werde",
          "du": "wirst",
          "erSieEs": "wird",
          "wir": "werden",
          "ihr": "werdet",
          "sie": "werden"
        }
      },
      {
        "infinitive": "beginnen",
        "english": "to begin",
        "auxiliary": "haben",
        "pastParticiple": "begonnen",
        "conjugations": {
          "ich": "beginne",
          "du": "beginnst",
          "erSieEs": "beginnt",
          "wir": "beginnen",
          "ihr": "beginnt",
          "sie": "beginnen"
        }
      },
      {
        "infinitive": "bleiben",
        "english": "to stay, remain",
        "auxiliary": "sein",
        "pastParticiple": "geblieben",
        "conjugations": {
          "ich": "bleibe",
          "du": "bleibst",
          "erSieEs": "bleibt",
          "wir": "bleiben",
          "ihr": "bleibt",
          "sie": "bleiben"
        }
      },
      {
        "infinitive": "bringen",
        "english": "to bring",
        "auxiliary": "haben",
        "pastParticiple": "gebracht",
        "conjugations": {
          "ich": "bringe",
          "du": "bringst",
          "erSieEs": "bringt",
          "wir": "bringen",
          "ihr": "bringt",
          "sie": "bringen"
        }
      },
      {
        "infinitive": "denken",
        "english": "to think",
        "auxiliary": "haben",
        "pastParticiple": "gedacht",
        "conjugations": {
          "ich": "denke",
          "du": "denkst",
          "erSieEs": "denkt",
          "wir": "denken",
          "ihr": "denkt",
          "sie": "denken"
        }
      },
      {
        "infinitive": "dürfen",
        "english": "may, to be allowed to (modal verb)",
        "auxiliary": "haben",
        "pastParticiple": "gedurft",
        "conjugations": {
          "ich": "darf",
          "du": "darfst",
          "erSieEs": "darf",
          "wir": "dürfen",
          "ihr": "dürft",
          "sie": "dürfen"
        }
      },
      {
        "infinitive": "essen",
        "english": "to eat",
        "auxiliary": "haben",
        "pastParticiple": "gegessen",
        "conjugations": {
          "ich": "esse",
          "du": "isst",
          "erSieEs": "isst",
          "wir": "essen",
          "ihr": "esst",
          "sie": "essen"
        }
      },
      {
        "infinitive": "fahren",
        "english": "to drive, travel, ride, go",
        "auxiliary": "sein",
        "pastParticiple": "gefahren",
        "conjugations": {
          "ich": "fahre",
          "du": "fährst",
          "erSieEs": "fährt",
          "wir": "fahren",
          "ihr": "fahrt",
          "sie": "fahren"
        }
      },
      {
        "infinitive": "fliegen",
        "english": "to fly",
        "auxiliary": "sein",
        "pastParticiple": "geflogen",
        "conjugations": {
          "ich": "fliege",
          "du": "fliegst",
          "erSieEs": "fliegt",
          "wir": "fliegen",
          "ihr": "fliegt",
          "sie": "fliegen"
        }
      },
      {
        "infinitive": "geben",
        "english": "to give",
        "auxiliary": "haben",
        "pastParticiple": "gegeben",
        "conjugations": {
          "ich": "gebe",
          "du": "gibst",
          "erSieEs": "gibt",
          "wir": "geben",
          "ihr": "gebt",
          "sie": "geben"
        }
      },
      {
        "infinitive": "gehen",
        "english": "to go",
        "auxiliary": "sein",
        "pastParticiple": "gegangen",
        "conjugations": {
          "ich": "gehe",
          "du": "gehst",
          "erSieEs": "geht",
          "wir": "gehen",
          "ihr": "geht",
          "sie": "gehen"
        }
      },
      {
        "infinitive": "halten",
        "english": "to hold, keep, stop, consider",
        "auxiliary": "haben",
        "pastParticiple": "gehalten",
        "conjugations": {
          "ich": "halte",
          "du": "hältst",
          "erSieEs": "hält",
          "wir": "halten",
          "ihr": "haltet",
          "sie": "halten"
        }
      },
      {
        "infinitive": "helfen",
        "english": "to help, assist",
        "auxiliary": "haben",
        "pastParticiple": "geholfen",
        "conjugations": {
          "ich": "helfe",
          "du": "hilfst",
          "erSieEs": "hilft",
          "wir": "helfen",
          "ihr": "helft",
          "sie": "helfen"
        }
      },
      {
        "infinitive": "kennen",
        "english": "to know (by acquaintance), be familiar with",
        "auxiliary": "haben",
        "pastParticiple": "gekannt",
        "conjugations": {
          "ich": "kenne",
          "du": "kennst",
          "erSieEs": "kennt",
          "wir": "kennen",
          "ihr": "kennt",
          "sie": "kennen"
        }
      },
      {
        "infinitive": "kommen",
        "english": "to come",
        "auxiliary": "sein",
        "pastParticiple": "gekommen",
        "conjugations": {
          "ich": "komme",
          "du": "kommst",
          "erSieEs": "kommt",
          "wir": "kommen",
          "ihr": "kommt",
          "sie": "kommen"
        }
      },
      {
        "infinitive": "können",
        "english": "can, to be able to (modal verb)",
        "auxiliary": "haben",
        "pastParticiple": "gekonnt",
        "conjugations": {
          "ich": "kann",
          "du": "kannst",
          "erSieEs": "kann",
          "wir": "können",
          "ihr": "könnt",
          "sie": "können"
        }
      },
      {
        "infinitive": "laufen",
        "english": "to run, walk",
        "auxiliary": "sein",
        "pastParticiple": "gelaufen",
        "conjugations": {
          "ich": "laufe",
          "du": "läufst",
          "erSieEs": "läuft",
          "wir": "laufen",
          "ihr": "lauft",
          "sie": "laufen"
        }
      },
      {
        "infinitive": "lesen",
        "english": "to read",
        "auxiliary": "haben",
        "pastParticiple": "gelesen",
        "conjugations": {
          "ich": "lese",
          "du": "liest",
          "erSieEs": "liest",
          "wir": "lesen",
          "ihr": "lest",
          "sie": "lesen"
        }
      },
      {
        "infinitive": "liegen",
        "english": "to lie, be situated",
        "auxiliary": "haben",
        "pastParticiple": "gelegen",
        "conjugations": {
          "ich": "liege",
          "du": "liegst",
          "erSieEs": "liegt",
          "wir": "liegen",
          "ihr": "liegt",
          "sie": "liegen"
        }
      },
      {
        "infinitive": "mögen",
        "english": "to like (to), to want (modal verb)",
        "auxiliary": "haben",
        "pastParticiple": "gemocht",
        "conjugations": {
          "ich": "mag",
          "du": "magst",
          "erSieEs": "mag",
          "wir": "mögen",
          "ihr": "mögt",
          "sie": "mögen"
        }
      },
      {
        "infinitive": "müssen",
        "english": "to have to, must (modal verb)",
        "auxiliary": "haben",
        "pastParticiple": "gemusst",
        "conjugations": {
          "ich": "muss",
          "du": "musst",
          "erSieEs": "muss",
          "wir": "müssen",
          "ihr": "müsst",
          "sie": "müssen"
        }
      },
      {
        "infinitive": "nehmen",
        "english": "to take",
        "auxiliary": "haben",
        "pastParticiple": "genommen",
        "conjugations": {
          "ich": "nehme",
          "du": "nimmst",
          "erSieEs": "nimmt",
          "wir": "nehmen",
          "ihr": "nehmt",
          "sie": "nehmen"
        }
      },
      {
        "infinitive": "schreiben",
        "english": "to write",
        "auxiliary": "haben",
        "pastParticiple": "geschrieben",
        "conjugations": {
          "ich": "schreibe",
          "du": "schreibst",
          "erSieEs": "schreibt",
          "wir": "schreiben",
          "ihr": "schreibt",
          "sie": "schreiben"
        }
      },
      {
        "infinitive": "sehen",
        "english": "to see",
        "auxiliary": "haben",
        "pastParticiple": "gesehen",
        "conjugations": {
          "ich": "sehe",
          "du": "siehst",
          "erSieEs": "sieht",
          "wir": "sehen",
          "ihr": "seht",
          "sie": "sehen"
        }
      },
      {
        "infinitive": "sitzen",
        "english": "to sit",
        "auxiliary": "haben",
        "pastParticiple": "gesessen",
        "conjugations": {
          "ich": "sitze",
          "du": "sitzt",
          "erSieEs": "sitzt",
          "wir": "sitzen",
          "ihr": "sitzt",
          "sie": "sitzen"
        }
      },
      {
        "infinitive": "sollen",
        "english": "to be supposed to, should (modal verb)",
        "auxiliary": "haben",
        "pastParticiple": "gesollt",
        "conjugations": {
          "ich": "soll",
          "du": "sollst",
          "erSieEs": "soll",
          "wir": "sollen",
          "ihr": "sollt",
          "sie": "sollen"
        }
      },
      {
        "infinitive": "sprechen",
        "english": "to speak",
        "auxiliary": "haben",
        "pastParticiple": "gesprochen",
        "conjugations": {
          "ich": "spreche",
          "du": "sprichst",
          "erSieEs": "spricht",
          "wir": "sprechen",
          "ihr": "sprecht",
          "sie": "sprechen"
        }
      },
      {
        "infinitive": "stehen",
        "english": "to stand, be located",
        "auxiliary": "haben",
        "pastParticiple": "gestanden",
        "conjugations": {
          "ich": "stehe",
          "du": "stehst",
          "erSieEs": "steht",
          "wir": "stehen",
          "ihr": "steht",
          "sie": "stehen"
        }
      },
      {
        "infinitive": "tragen",
        "english": "to carry, wear",
        "auxiliary": "haben",
        "pastParticiple": "getragen",
        "conjugations": {
          "ich": "trage",
          "du": "trägst",
          "erSieEs": "trägt",
          "wir": "tragen",
          "ihr": "tragt",
          "sie": "tragen"
        }
      },
      {
        "infinitive": "treffen",
        "english": "to meet",
        "auxiliary": "haben",
        "pastParticiple": "getroffen",
        "conjugations": {
          "ich": "treffe",
          "du": "triffst",
          "erSieEs": "trifft",
          "wir": "treffen",
          "ihr": "trefft",
          "sie": "treffen"
        }
      },
      {
        "infinitive": "trinken",
        "english": "to drink",
        "auxiliary": "haben",
        "pastParticiple": "getrunken",
        "conjugations": {
          "ich": "trinke",
          "du": "trinkst",
          "erSieEs": "trinkt",
          "wir": "trinken",
          "ihr": "trinkt",
          "sie": "trinken"
        }
      },
      {
        "infinitive": "verlieren",
        "english": "to lose",
        "auxiliary": "haben",
        "pastParticiple": "verloren",
        "conjugations": {
          "ich": "verliere",
          "du": "verlierst",
          "erSieEs": "verliert",
          "wir": "verlieren",
          "ihr": "verliert",
          "sie": "verlieren"
        }
      },
      {
        "infinitive": "verstehen",
        "english": "to understand",
        "auxiliary": "haben",
        "pastParticiple": "verstanden",
        "conjugations": {
          "ich": "verstehe",
          "du": "verstehst",
          "erSieEs": "versteht",
          "wir": "verstehen",
          "ihr": "versteht",
          "sie": "verstehen"
        }
      },
      {
        "infinitive": "wissen",
        "english": "to know (a fact)",
        "auxiliary": "haben",
        "pastParticiple": "gewusst",
        "conjugations": {
          "ich": "weiß",
          "du": "weißt",
          "erSieEs": "weiß",
          "wir": "wissen",
          "ihr": "wisst",
          "sie": "wissen"
        }
      },
      {
        "infinitive": "wollen",
        "english": "to want, to intend (modal verb)",
        "auxiliary": "haben",
        "pastParticiple": "gewollt",
        "conjugations": {
          "ich": "will",
          "du": "willst",
          "erSieEs": "will",
          "wir": "wollen",
          "ihr": "wollt",
          "sie": "wollen"
        }
      }
    ]
  },
  {
    "id": "ch18-media",
    "title": "Media & Culture",
    "description": "TV, radio, and food terms for picking up German quickly",
    "type": "phrase",
    "items": [
      {
        "german": "Nachrichten",
        "pronunciation": "nâH-reeH-ten",
        "english": "News — the term you'll see on German TV/radio sites when looking for news programming."
      },
      {
        "german": "Tatort",
        "pronunciation": "taht-ort",
        "english": "Crime Scene — a long-running German TV murder-mystery series, good for casual listening practice."
      },
      {
        "german": "Deutsche Welle",
        "pronunciation": "doy-che vêl-e",
        "english": "Germany's international broadcaster, offering radio and TV programs in German and other languages."
      },
      {
        "german": "radioWissen",
        "pronunciation": "rah-dee-oh vis-en",
        "english": "\"Radio knowledge\" — a German radio program worth listening to for quality spoken German."
      },
      {
        "german": "Bier",
        "pronunciation": "beer",
        "english": "Beer — a fitting drink to enjoy while watching a German movie."
      },
      {
        "german": "Wein",
        "pronunciation": "vayn",
        "english": "Wine — another good option for movie night while soaking up German culture."
      },
      {
        "german": "Guten Appetit!",
        "pronunciation": "gooh-ten â-pê-teet",
        "english": "Enjoy your meal! — said before digging in."
      }
    ]
  },
  {
    "id": "ch19-avoid",
    "title": "Don't Say This",
    "description": "Common phrasing mistakes and what to say instead",
    "type": "phrase",
    "items": [
      {
        "german": "Möchten Sie ins Kino gehen?",
        "pronunciation": "merH-tên zee ins kee-noh gey-en?",
        "english": "Do you want to go to the movies? — the polite, formal way to ask someone you don't know well."
      },
      {
        "german": "Wir können uns duzen.",
        "pronunciation": "veer kern-en oons doohts-en.",
        "english": "We can use the familiar 'du' with each other — said when someone invites you to drop the formal Sie."
      },
      {
        "german": "Entschuldigen Sie bitte",
        "pronunciation": "ênt-shool-di-gen zee bi-te",
        "english": "Excuse me, please — the safe, polite way to get a waiter's or salesperson's attention instead of an outdated or slang title."
      },
      {
        "german": "Mir ist heiß.",
        "pronunciation": "meer ist hays.",
        "english": "I feel hot / I'm hot — the correct way to describe being warm (saying \"Ich bin heiß\" instead implies you're sexually aroused)."
      },
      {
        "german": "Mir ist kalt.",
        "pronunciation": "meer ist kâlt.",
        "english": "I feel cold / I'm cold — the correct phrasing (\"Ich bin kalt\" would instead mean you have a cold personality)."
      },
      {
        "german": "Ich bin satt.",
        "pronunciation": "iH bin zât.",
        "english": "I am full — the polite way to decline more food (saying \"Ich bin voll\" instead means you're drunk)."
      },
      {
        "german": "der Polizist / die Polizistin",
        "pronunciation": "dêr po-li-tsist / dee po-li-tsis-tin",
        "english": "Policeman / policewoman — the respectful terms, instead of the slang \"Bulle\" (literally 'bull')."
      },
      {
        "german": "Ich kenne ihn/sie/sie.",
        "pronunciation": "iH kên-e een/zee/zee.",
        "english": "I know him/her/them — use 'kennen' for familiarity with people and places."
      },
      {
        "german": "Ich weiß es nicht.",
        "pronunciation": "iH vays ês niHt.",
        "english": "I don't know [the answer] — use 'wissen' for facts and knowledge, not 'kennen'."
      },
      {
        "german": "Wo ist das Klo?",
        "pronunciation": "voh ist dâs kloh?",
        "english": "Where's the bathroom? — the casual, current way to ask among friends ('Klosett' is an outdated word that confuses people)."
      },
      {
        "german": "Er wird Arzt.",
        "pronunciation": "êr virt ârtst.",
        "english": "He's going to become a doctor — use 'werden' for 'to become'; 'bekommen' actually means 'to get/receive'."
      },
      {
        "german": "Ich esse gern Pommes frites.",
        "pronunciation": "iH ês-e gêrn pom frit.",
        "english": "I like to eat French fries — use 'essen' for people eating; 'fressen' is reserved for animals (or is insulting applied to humans)."
      }
    ]
  },
  {
    "id": "ch20-favorites",
    "title": "Favorite Expressions",
    "description": "Ten favorite everyday German expressions",
    "type": "phrase",
    "items": [
      {
        "german": "Alles klar!",
        "pronunciation": "âl-es klahr!",
        "english": "Got it! — used to show you understand an explanation or agree with a plan."
      },
      {
        "german": "Wirklich",
        "pronunciation": "virk-liH",
        "english": "Really — used to emphasize an adjective, or on its own as \"Really?\" / \"Really!\""
      },
      {
        "german": "Kein Problem",
        "pronunciation": "kayn proh-bleym",
        "english": "No problem — used to reassure someone you'll handle something, or to agree to a change of plans."
      },
      {
        "german": "Vielleicht",
        "pronunciation": "fee-layHt",
        "english": "Maybe / perhaps — a flexible way to answer a question or hedge about something uncertain."
      },
      {
        "german": "Doch",
        "pronunciation": "doH",
        "english": "A versatile word meaning roughly 'indeed,' 'after all,' or 'yes, actually' — often used to push back on a negative statement or question."
      },
      {
        "german": "Unglaublich!",
        "pronunciation": "oon-gloub-liH!",
        "english": "Unbelievable! — also used before an adjective to mean 'unbelievably,' adding emphasis."
      },
      {
        "german": "Hoffentlich",
        "pronunciation": "hof-ent-liH",
        "english": "Hopefully — said on its own to express optimism that something will happen."
      },
      {
        "german": "Wie schön!",
        "pronunciation": "vee shern!",
        "english": "How nice! — can be sincere, or used sarcastically to show annoyance."
      },
      {
        "german": "Genau!",
        "pronunciation": "ge-nou!",
        "english": "Exactly! / Precisely! — used to agree with what someone just said."
      },
      {
        "german": "Stimmt's?",
        "pronunciation": "shtimts?",
        "english": "Isn't that right? / Don't you agree? — asks the listener to confirm something you just said; typically answered with 'Stimmt!' (I agree!)."
      }
    ]
  },
  {
    "id": "ch21-native",
    "title": "Sound Like a Native",
    "description": "Phrases that make you sound like a native German speaker",
    "type": "phrase",
    "items": [
      {
        "german": "Schönes Wochenende!",
        "pronunciation": "shern-es voH-en-en-de!",
        "english": "Have a nice weekend! — a common send-off, often said starting Friday morning to people you won't see again until next week."
      },
      {
        "german": "Gehen wir!",
        "pronunciation": "gey-en veer!",
        "english": "Let's go! — can also work as a question, 'Shall we go?', with rising intonation."
      },
      {
        "german": "Was ist los?",
        "pronunciation": "vâs ist lohs?",
        "english": "What's going on? — most commonly used to mean 'What's wrong?'"
      },
      {
        "german": "Das klingt gut!",
        "pronunciation": "dâs klinkt gooht!",
        "english": "That sounds good! — used to approve of someone's suggestion or idea."
      },
      {
        "german": "Keine Ahnung",
        "pronunciation": "kayn-e ahn-oong",
        "english": "No idea — a short way to say you don't know anything about the topic at hand."
      },
      {
        "german": "Es zieht!",
        "pronunciation": "ês tseet!",
        "english": "There's a draft! — said when cold air is coming through a window or door; literally 'it pulls'."
      },
      {
        "german": "Nicht zu fassen!",
        "pronunciation": "niHt tsooh fâs-en!",
        "english": "I can't believe it! — expresses disbelief, shock, or agitation."
      },
      {
        "german": "Du hast Recht!/Sie haben Recht!",
        "pronunciation": "dooh hâst rêHt! / zee hah-ben rêHt!",
        "english": "You're right! — the informal and formal ways to agree with someone."
      },
      {
        "german": "Lass es!",
        "pronunciation": "lâs ês!",
        "english": "Let it be! / Drop it! — the informal way to tell someone to leave a matter alone."
      },
      {
        "german": "Nicht schlecht!",
        "pronunciation": "niHt shlêHt!",
        "english": "Not bad! — a modest, understated way to show approval or appreciation."
      }
    ]
  }
]
