export type ExerciseType = "multiple_choice" | "translation" | "fill_blank" | "matching" | "listening";

export interface MultipleChoiceExercise {
  type: "multiple_choice";
  question: string;
  options: string[];
  correctIndex: number;
  hint?: string;
}

export interface TranslationExercise {
  type: "translation";
  sentence: string;
  direction: "tr-ro" | "ro-tr";
  correctAnswer: string;
  acceptedAnswers: string[];
  hint?: string;
}

export interface FillBlankExercise {
  type: "fill_blank";
  sentence: string; // use ___ for blank
  correctAnswer: string;
  options: string[];
  hint?: string;
}

export interface MatchingExercise {
  type: "matching";
  pairs: { left: string; right: string }[];
}

export interface ListeningExercise {
  type: "listening";
  word: string;
  options: string[];
  correctIndex: number;
}

export type Exercise =
  | MultipleChoiceExercise
  | TranslationExercise
  | FillBlankExercise
  | MatchingExercise
  | ListeningExercise;

export interface LessonData {
  id: string;
  title: string;
  emoji: string;
  description: string;
  xpReward: number;
  exercises: Exercise[];
}

export const lessonsData: Record<string, LessonData> = {
  "1": {
    id: "1",
    title: "Selamlaşma",
    emoji: "👋",
    description: "Temel selamlaşma ifadelerini öğren",
    xpReward: 15,
    exercises: [
      {
        type: "multiple_choice",
        question: '"Merhaba" ne demek?',
        options: ["La revedere", "Bună", "Mulțumesc", "Te rog"],
        correctIndex: 1,
      },
      {
        type: "fill_blank",
        sentence: "Günaydın! Nasılsın? — ___, teşekkürler!",
        correctAnswer: "İyiyim",
        options: ["İyiyim", "Hoşça kal", "Lütfen", "Tamam"],
      },
      {
        type: "translation",
        sentence: "Bună dimineața",
        direction: "ro-tr",
        correctAnswer: "Günaydın",
        acceptedAnswers: ["Günaydın", "günaydın"],
      },
      {
        type: "multiple_choice",
        question: '"Hoşça kal" ne demek?',
        options: ["Bună", "Noapte bună", "La revedere", "Ne vedem"],
        correctIndex: 2,
      },
      {
        type: "matching",
        pairs: [
          { left: "Merhaba", right: "Bună" },
          { left: "Günaydın", right: "Bună dimineața" },
          { left: "İyi akşamlar", right: "Bună seara" },
          { left: "İyi geceler", right: "Noapte bună" },
        ],
      },
      {
        type: "fill_blank",
        sentence: "A: Merhaba! B: ___!",
        correctAnswer: "Merhaba",
        options: ["Merhaba", "Evet", "Hayır", "Teşekkürler"],
      },
      {
        type: "translation",
        sentence: "İyi akşamlar",
        direction: "tr-ro",
        correctAnswer: "Bună seara",
        acceptedAnswers: ["Bună seara", "bună seara"],
      },
      {
        type: "multiple_choice",
        question: "Birinden ayrılırken ne dersin?",
        options: ["Günaydın", "Merhaba", "Hoşça kal", "Nasılsın"],
        correctIndex: 2,
      },
    ],
  },
  "2": {
    id: "2",
    title: "Tanışma",
    emoji: "🤝",
    description: "Kendini tanıt ve başkalarıyla tanış",
    xpReward: 15,
    exercises: [
      {
        type: "multiple_choice",
        question: '"Benim adım Ali" ne demek?',
        options: ["Sunt bine", "Numele meu este Ali", "Ali'yi severim", "Ali burada"],
        correctIndex: 1,
      },
      {
        type: "fill_blank",
        sentence: "Benim ___ Zeynep.",
        correctAnswer: "adım",
        options: ["adım", "evim", "işim", "yaşım"],
      },
      {
        type: "translation",
        sentence: "Cum te cheamă?",
        direction: "ro-tr",
        correctAnswer: "Adın ne?",
        acceptedAnswers: ["Adın ne?", "Adın ne", "Senin adın ne?", "İsmin ne?"],
      },
      {
        type: "multiple_choice",
        question: '"Memnun oldum" ne zaman kullanılır?',
        options: ["Yemekten önce", "Tanışırken", "Vedalaşırken", "Uyurken"],
        correctIndex: 1,
      },
      {
        type: "matching",
        pairs: [
          { left: "Adın ne?", right: "Cum te cheamă?" },
          { left: "Memnun oldum", right: "Încântat(ă) de cunoștință" },
          { left: "Nerelisin?", right: "De unde ești?" },
          { left: "Ben Türküm", right: "Sunt turc/turcă" },
        ],
      },
      {
        type: "fill_blank",
        sentence: "Memnun ___!",
        correctAnswer: "oldum",
        options: ["oldum", "geldim", "gittim", "yaptım"],
      },
      {
        type: "translation",
        sentence: "Ben İstanbul'dan geliyorum",
        direction: "tr-ro",
        correctAnswer: "Sunt din Istanbul",
        acceptedAnswers: ["Sunt din Istanbul", "Vin din Istanbul", "Sunt din Istanbul"],
      },
      {
        type: "multiple_choice",
        question: '"Nerelisin?" sorusuna hangi cevap uygundur?',
        options: ["İyiyim", "Ankaralıyım", "Memnun oldum", "Hoşça kal"],
        correctIndex: 1,
      },
    ],
  },
  "3": {
    id: "3",
    title: "Sayılar",
    emoji: "🔢",
    description: "1'den 20'ye kadar sayıları öğren",
    xpReward: 15,
    exercises: [
      {
        type: "multiple_choice",
        question: '"Beş" kaçtır?',
        options: ["3", "5", "7", "9"],
        correctIndex: 1,
      },
      {
        type: "matching",
        pairs: [
          { left: "Bir", right: "1" },
          { left: "Üç", right: "3" },
          { left: "Yedi", right: "7" },
          { left: "On", right: "10" },
        ],
      },
      {
        type: "fill_blank",
        sentence: "İki artı üç eşittir ___.",
        correctAnswer: "beş",
        options: ["dört", "beş", "altı", "yedi"],
      },
      {
        type: "translation",
        sentence: "doisprezece",
        direction: "ro-tr",
        correctAnswer: "on iki",
        acceptedAnswers: ["on iki", "On iki", "oniki"],
      },
      {
        type: "multiple_choice",
        question: '"Sekiz" hangi sayıdır?',
        options: ["6", "7", "8", "9"],
        correctIndex: 2,
      },
      {
        type: "fill_blank",
        sentence: "On artı beş eşittir ___.",
        correctAnswer: "on beş",
        options: ["on iki", "on üç", "on dört", "on beş"],
      },
      {
        type: "matching",
        pairs: [
          { left: "Dört", right: "4" },
          { left: "Altı", right: "6" },
          { left: "Dokuz", right: "9" },
          { left: "Yirmi", right: "20" },
        ],
      },
      {
        type: "translation",
        sentence: "on yedi",
        direction: "tr-ro",
        correctAnswer: "șaptesprezece",
        acceptedAnswers: ["șaptesprezece", "Șaptesprezece", "17"],
      },
    ],
  },
  "4": {
    id: "4",
    title: "Renkler",
    emoji: "🎨",
    description: "Temel renkleri öğren",
    xpReward: 20,
    exercises: [
      {
        type: "multiple_choice",
        question: '🔴 Bu renk Türkçe\'de ne?',
        options: ["Mavi", "Yeşil", "Kırmızı", "Sarı"],
        correctIndex: 2,
      },
      {
        type: "matching",
        pairs: [
          { left: "Kırmızı", right: "Roșu" },
          { left: "Mavi", right: "Albastru" },
          { left: "Yeşil", right: "Verde" },
          { left: "Sarı", right: "Galben" },
        ],
      },
      {
        type: "fill_blank",
        sentence: "Gökyüzü ___ renktedir.",
        correctAnswer: "mavi",
        options: ["kırmızı", "mavi", "yeşil", "beyaz"],
      },
      {
        type: "translation",
        sentence: "Alb",
        direction: "ro-tr",
        correctAnswer: "Beyaz",
        acceptedAnswers: ["Beyaz", "beyaz"],
      },
      {
        type: "multiple_choice",
        question: '🟡 "Sarı" Romence ne?',
        options: ["Portocaliu", "Galben", "Auriu", "Maro"],
        correctIndex: 1,
      },
      {
        type: "fill_blank",
        sentence: "Türk bayrağı ___ ve beyazdır.",
        correctAnswer: "kırmızı",
        options: ["mavi", "yeşil", "kırmızı", "turuncu"],
      },
      {
        type: "matching",
        pairs: [
          { left: "Siyah", right: "Negru" },
          { left: "Beyaz", right: "Alb" },
          { left: "Turuncu", right: "Portocaliu" },
          { left: "Mor", right: "Mov" },
        ],
      },
      {
        type: "translation",
        sentence: "Pembe",
        direction: "tr-ro",
        correctAnswer: "Roz",
        acceptedAnswers: ["Roz", "roz"],
      },
    ],
  },
  "5": {
    id: "5",
    title: "Yiyecekler",
    emoji: "🍎",
    description: "Temel yiyecek isimlerini öğren",
    xpReward: 20,
    exercises: [
      {
        type: "multiple_choice",
        question: '"Ekmek" ne demek?',
        options: ["Apă", "Pâine", "Brânză", "Lapte"],
        correctIndex: 1,
      },
      {
        type: "matching",
        pairs: [
          { left: "Ekmek", right: "Pâine" },
          { left: "Peynir", right: "Brânză" },
          { left: "Elma", right: "Măr" },
          { left: "Tavuk", right: "Pui" },
        ],
      },
      {
        type: "fill_blank",
        sentence: "Kahvaltıda ___ ve peynir yerim.",
        correctAnswer: "ekmek",
        options: ["su", "ekmek", "çay", "tavuk"],
      },
      {
        type: "translation",
        sentence: "Mănânc orez",
        direction: "ro-tr",
        correctAnswer: "Pilav yerim",
        acceptedAnswers: ["Pilav yerim", "Ben pilav yerim", "pilav yerim"],
      },
      {
        type: "multiple_choice",
        question: '"Çorba" ne demek?',
        options: ["Salată", "Supă", "Desert", "Carne"],
        correctIndex: 1,
      },
      {
        type: "fill_blank",
        sentence: "Akşam yemeğinde ___ içerim.",
        correctAnswer: "çorba",
        options: ["ekmek", "pilav", "çorba", "elma"],
      },
      {
        type: "matching",
        pairs: [
          { left: "Çorba", right: "Supă" },
          { left: "Pilav", right: "Orez" },
          { left: "Salata", right: "Salată" },
          { left: "Bal", right: "Miere" },
        ],
      },
      {
        type: "translation",
        sentence: "Peynir",
        direction: "tr-ro",
        correctAnswer: "Brânză",
        acceptedAnswers: ["Brânză", "brânză"],
      },
    ],
  },
  "6": {
    id: "6",
    title: "İçecekler",
    emoji: "☕",
    description: "İçecek isimlerini öğren",
    xpReward: 20,
    exercises: [
      {
        type: "multiple_choice",
        question: '"Su" ne demek?',
        options: ["Ceai", "Cafea", "Apă", "Suc"],
        correctIndex: 2,
      },
      {
        type: "matching",
        pairs: [
          { left: "Su", right: "Apă" },
          { left: "Çay", right: "Ceai" },
          { left: "Kahve", right: "Cafea" },
          { left: "Süt", right: "Lapte" },
        ],
      },
      {
        type: "fill_blank",
        sentence: "Türkler çok ___ içer.",
        correctAnswer: "çay",
        options: ["kahve", "çay", "süt", "su"],
      },
      {
        type: "translation",
        sentence: "Beau cafea",
        direction: "ro-tr",
        correctAnswer: "Kahve içerim",
        acceptedAnswers: ["Kahve içerim", "Ben kahve içerim", "kahve içerim"],
      },
      {
        type: "multiple_choice",
        question: '"Ayran" nedir?',
        options: ["Bir meyve suyu", "Bir yoğurt içeceği", "Bir çay çeşidi", "Bir kahve çeşidi"],
        correctIndex: 1,
      },
      {
        type: "fill_blank",
        sentence: "Sabahları bir bardak ___ içerim.",
        correctAnswer: "süt",
        options: ["ayran", "süt", "çorba", "su"],
      },
      {
        type: "translation",
        sentence: "Meyve suyu",
        direction: "tr-ro",
        correctAnswer: "Suc de fructe",
        acceptedAnswers: ["Suc de fructe", "suc de fructe", "Suc", "suc"],
      },
      {
        type: "multiple_choice",
        question: "Hangisi bir içecek DEĞİLDİR?",
        options: ["Çay", "Su", "Ekmek", "Kahve"],
        correctIndex: 2,
      },
    ],
  },
  "7": {
    id: "7",
    title: "Aile",
    emoji: "👨‍👩‍👧",
    description: "Aile üyelerini öğren",
    xpReward: 25,
    exercises: [
      {
        type: "multiple_choice",
        question: '"Anne" ne demek?',
        options: ["Tată", "Mamă", "Soră", "Frate"],
        correctIndex: 1,
      },
      {
        type: "matching",
        pairs: [
          { left: "Anne", right: "Mamă" },
          { left: "Baba", right: "Tată" },
          { left: "Kardeş", right: "Frate/Soră" },
          { left: "Dede", right: "Bunic" },
        ],
      },
      {
        type: "fill_blank",
        sentence: "Benim ___ öğretmen.",
        correctAnswer: "annem",
        options: ["annem", "evim", "okulm", "işim"],
      },
      {
        type: "translation",
        sentence: "Tatăl meu",
        direction: "ro-tr",
        correctAnswer: "Babam",
        acceptedAnswers: ["Babam", "babam", "Benim babam"],
      },
      {
        type: "multiple_choice",
        question: '"Abla" kime denir?',
        options: ["Küçük kız kardeş", "Büyük kız kardeş", "Anne", "Teyze"],
        correctIndex: 1,
      },
      {
        type: "fill_blank",
        sentence: "Annemin annesi benim ___.",
        correctAnswer: "babaannem",
        options: ["teyzem", "babaannem", "ablam", "annem"],
        hint: "Annenin annesi",
      },
      {
        type: "matching",
        pairs: [
          { left: "Abla", right: "Soră mai mare" },
          { left: "Ağabey", right: "Frate mai mare" },
          { left: "Teyze", right: "Aunt (maternal)" },
          { left: "Amca", right: "Uncle (paternal)" },
        ],
      },
      {
        type: "translation",
        sentence: "Kardeşim",
        direction: "tr-ro",
        correctAnswer: "Fratele/Sora mea",
        acceptedAnswers: ["Fratele/Sora mea", "Fratele meu", "Sora mea", "fratele/sora mea"],
      },
    ],
  },
  "8": {
    id: "8",
    title: "Hayvanlar",
    emoji: "🦩",
    description: "Hayvan isimlerini öğren",
    xpReward: 25,
    exercises: [
      {
        type: "multiple_choice",
        question: '"Kedi" ne demek?',
        options: ["Câine", "Pisică", "Pasăre", "Pește"],
        correctIndex: 1,
      },
      {
        type: "matching",
        pairs: [
          { left: "Kedi", right: "Pisică" },
          { left: "Köpek", right: "Câine" },
          { left: "Kuş", right: "Pasăre" },
          { left: "Balık", right: "Pește" },
        ],
      },
      {
        type: "fill_blank",
        sentence: "Benim bir ___im var, adı Boncuk.",
        correctAnswer: "kedim",
        options: ["kedim", "evim", "arabam", "odam"],
        hint: "Miyav diyen hayvan",
      },
      {
        type: "translation",
        sentence: "Cal",
        direction: "ro-tr",
        correctAnswer: "At",
        acceptedAnswers: ["At", "at"],
      },
      {
        type: "multiple_choice",
        question: "Flamingo ne tür bir hayvandır?",
        options: ["Memeli", "Sürüngen", "Kuş", "Balık"],
        correctIndex: 2,
      },
      {
        type: "fill_blank",
        sentence: "Çiftlikte ___, inek ve tavuk var.",
        correctAnswer: "at",
        options: ["at", "balık", "balina", "yunus"],
      },
      {
        type: "translation",
        sentence: "Kaplumbağa",
        direction: "tr-ro",
        correctAnswer: "Broască țestoasă",
        acceptedAnswers: ["Broască țestoasă", "broască țestoasă", "Țestoasă", "țestoasă"],
      },
      {
        type: "matching",
        pairs: [
          { left: "At", right: "Cal" },
          { left: "İnek", right: "Vacă" },
          { left: "Tavuk", right: "Pui" },
          { left: "Koyun", right: "Oaie" },
        ],
      },
    ],
  },
  "9": {
    id: "9",
    title: "Meslekler",
    emoji: "👩‍⚕️",
    description: "Meslek isimlerini öğren",
    xpReward: 25,
    exercises: [
      {
        type: "multiple_choice",
        question: '"Doktor" ne demek?',
        options: ["Profesor", "Medic", "Inginer", "Avocat"],
        correctIndex: 1,
      },
      {
        type: "matching",
        pairs: [
          { left: "Doktor", right: "Medic" },
          { left: "Öğretmen", right: "Profesor" },
          { left: "Mühendis", right: "Inginer" },
          { left: "Avukat", right: "Avocat" },
        ],
      },
      {
        type: "fill_blank",
        sentence: "Babam hastanede çalışır, o bir ___.",
        correctAnswer: "doktor",
        options: ["öğretmen", "doktor", "mühendis", "şoför"],
      },
      {
        type: "translation",
        sentence: "Sunt student",
        direction: "ro-tr",
        correctAnswer: "Ben bir öğrenciyim",
        acceptedAnswers: ["Ben bir öğrenciyim", "Öğrenciyim", "Ben öğrenciyim"],
      },
      {
        type: "multiple_choice",
        question: "Okulda çalışan kişiye ne denir?",
        options: ["Doktor", "Şoför", "Öğretmen", "Aşçı"],
        correctIndex: 2,
      },
      {
        type: "fill_blank",
        sentence: "Annem yemek yapar, o bir ___.",
        correctAnswer: "aşçı",
        options: ["avukat", "pilot", "aşçı", "hemşire"],
      },
      {
        type: "translation",
        sentence: "Hemşire",
        direction: "tr-ro",
        correctAnswer: "Asistent(ă) medical(ă)",
        acceptedAnswers: ["Asistent(ă) medical(ă)", "asistent(ă) medical(ă)"],
      },
      {
        type: "matching",
        pairs: [
          { left: "Aşçı", right: "Bucătar" },
          { left: "Pilot", right: "Pilot" },
          { left: "Şoför", right: "Șofer" },
          { left: "Hemşire", right: "Asistent(ă) medical(ă)" },
        ],
      },
    ],
  },
  "10": {
    id: "10",
    title: "Günler",
    emoji: "📅",
    description: "Haftanın günlerini öğren",
    xpReward: 20,
    exercises: [
      {
        type: "multiple_choice",
        question: "Haftanın ilk günü hangisidir?",
        options: ["Salı", "Pazartesi", "Pazar", "Çarşamba"],
        correctIndex: 1,
      },
      {
        type: "matching",
        pairs: [
          { left: "Pazartesi", right: "Luni" },
          { left: "Çarşamba", right: "Miercuri" },
          { left: "Cuma", right: "Vineri" },
          { left: "Pazar", right: "Duminică" },
        ],
      },
      {
        type: "fill_blank",
        sentence: "Bugün Cuma, yarın ___.",
        correctAnswer: "Cumartesi",
        options: ["Perşembe", "Cumartesi", "Pazar", "Pazartesi"],
      },
      {
        type: "translation",
        sentence: "Joi",
        direction: "ro-tr",
        correctAnswer: "Perşembe",
        acceptedAnswers: ["Perşembe", "perşembe"],
      },
      {
        type: "multiple_choice",
        question: "Hafta sonu hangi günlerdir?",
        options: ["Pazartesi-Salı", "Cuma-Cumartesi", "Cumartesi-Pazar", "Perşembe-Cuma"],
        correctIndex: 2,
      },
      {
        type: "fill_blank",
        sentence: "Salıdan sonra ___ gelir.",
        correctAnswer: "Çarşamba",
        options: ["Pazartesi", "Çarşamba", "Perşembe", "Cuma"],
      },
      {
        type: "translation",
        sentence: "Salı",
        direction: "tr-ro",
        correctAnswer: "Marți",
        acceptedAnswers: ["Marți", "marți"],
      },
      {
        type: "matching",
        pairs: [
          { left: "Salı", right: "Marți" },
          { left: "Perşembe", right: "Joi" },
          { left: "Cumartesi", right: "Sâmbătă" },
          { left: "Pazartesi", right: "Luni" },
        ],
      },
    ],
  },
  "11": {
    id: "11",
    title: "Mevsimler",
    emoji: "🌸",
    description: "Mevsimleri ve ayları öğren",
    xpReward: 20,
    exercises: [
      {
        type: "multiple_choice",
        question: '"İlkbahar" ne demek?',
        options: ["Vară", "Toamnă", "Primăvară", "Iarnă"],
        correctIndex: 2,
      },
      {
        type: "matching",
        pairs: [
          { left: "İlkbahar", right: "Primăvară" },
          { left: "Yaz", right: "Vară" },
          { left: "Sonbahar", right: "Toamnă" },
          { left: "Kış", right: "Iarnă" },
        ],
      },
      {
        type: "fill_blank",
        sentence: "Kar ___ mevsiminde yağar.",
        correctAnswer: "kış",
        options: ["yaz", "ilkbahar", "sonbahar", "kış"],
      },
      {
        type: "translation",
        sentence: "Vară",
        direction: "ro-tr",
        correctAnswer: "Yaz",
        acceptedAnswers: ["Yaz", "yaz"],
      },
      {
        type: "multiple_choice",
        question: "Yapraklar hangi mevsimde dökülür?",
        options: ["İlkbahar", "Yaz", "Sonbahar", "Kış"],
        correctIndex: 2,
      },
      {
        type: "fill_blank",
        sentence: "Ocak ayı ___ mevsimidir.",
        correctAnswer: "kış",
        options: ["yaz", "kış", "ilkbahar", "sonbahar"],
      },
      {
        type: "translation",
        sentence: "Sonbahar",
        direction: "tr-ro",
        correctAnswer: "Toamnă",
        acceptedAnswers: ["Toamnă", "toamnă"],
      },
      {
        type: "multiple_choice",
        question: "Yılda kaç mevsim vardır?",
        options: ["2", "3", "4", "5"],
        correctIndex: 2,
      },
    ],
  },
  "12": {
    id: "12",
    title: "Hava Durumu",
    emoji: "🌤️",
    description: "Hava durumu ifadelerini öğren",
    xpReward: 20,
    exercises: [
      {
        type: "multiple_choice",
        question: '"Güneşli" ne demek?',
        options: ["Ploios", "Noros", "Însorit", "Vântos"],
        correctIndex: 2,
      },
      {
        type: "matching",
        pairs: [
          { left: "Güneşli", right: "Însorit" },
          { left: "Yağmurlu", right: "Ploios" },
          { left: "Bulutlu", right: "Noros" },
          { left: "Karlı", right: "Cu zăpadă" },
        ],
      },
      {
        type: "fill_blank",
        sentence: "Bugün hava çok ___.",
        correctAnswer: "güneşli",
        options: ["güneşli", "araba", "okul", "kitap"],
      },
      {
        type: "translation",
        sentence: "Plouă",
        direction: "ro-tr",
        correctAnswer: "Yağmur yağıyor",
        acceptedAnswers: ["Yağmur yağıyor", "yağmur yağıyor"],
      },
      {
        type: "multiple_choice",
        question: '"Rüzgarlı" ne demek?',
        options: ["Cețos", "Vântos", "Cald", "Rece"],
        correctIndex: 1,
      },
      {
        type: "fill_blank",
        sentence: "Hava ___, şemsiye al.",
        correctAnswer: "yağmurlu",
        options: ["güneşli", "yağmurlu", "sıcak", "güzel"],
      },
      {
        type: "translation",
        sentence: "Soğuk",
        direction: "tr-ro",
        correctAnswer: "Rece",
        acceptedAnswers: ["Rece", "rece"],
      },
      {
        type: "matching",
        pairs: [
          { left: "Sıcak", right: "Cald" },
          { left: "Soğuk", right: "Rece" },
          { left: "Rüzgarlı", right: "Vântos" },
          { left: "Sisli", right: "Cețos" },
        ],
      },
    ],
  },
};
