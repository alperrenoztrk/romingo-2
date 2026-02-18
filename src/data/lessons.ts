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
    description: "",
    xpReward: 15,
    exercises: [
      {
        type: "multiple_choice",
        question: '"Bună" Türkçe ne demek?',
        options: ["Hoşça kal", "Merhaba", "Teşekkürler", "Lütfen"],
        correctIndex: 1,
      },
      {
        type: "fill_blank",
        sentence: "A: Bună dimineața! B: ___ dimineața!",
        correctAnswer: "Bună",
        options: ["La", "Mulțumesc", "Bună", "Noapte"],
      },
      {
        type: "translation",
        sentence: "Bună dimineața",
        direction: "ro-tr",
        correctAnswer: "Günaydın",
        acceptedAnswers: ["Günaydın", "günaydın"],
      },
      {
        type: "listening",
        word: "Mulțumesc",
        options: ["Lütfen", "Teşekkürler", "Hoşça kal", "Affedersin"],
        correctIndex: 1,
      },
      {
        type: "multiple_choice",
        question: '"La revedere" ifadesi hangi durumda kullanılır?',
        options: ["Tanışırken", "Vedalaşırken", "Teşekkür ederken", "Bir şey isterken"],
        correctIndex: 1,
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
        sentence: "A: Ce faci? B: Bine, ___!",
        correctAnswer: "mulțumesc",
        options: ["mulțumesc", "bună", "pa", "te rog"],
      },
      {
        type: "translation",
        sentence: "İyi geceler",
        direction: "tr-ro",
        correctAnswer: "Noapte bună",
        acceptedAnswers: ["Noapte bună", "noapte bună"],
      },
      {
        type: "translation",
        sentence: "İyi günler",
        direction: "tr-ro",
        correctAnswer: "Bună ziua",
        acceptedAnswers: ["Bună ziua", "bună ziua"],
      },
      {
        type: "translation",
        sentence: "Rica ederim",
        direction: "tr-ro",
        correctAnswer: "Cu plăcere",
        acceptedAnswers: ["Cu plăcere", "cu plăcere"],
      },
      {
        type: "multiple_choice",
        question: 'Diyaloğu tamamla: "Bună! ..."',
        options: ["La revedere", "Mulțumesc", "Ce faci?", "Noapte bună"],
        correctIndex: 2,
      },
    ],
  },
  "2": {
    id: "2",
    title: "Tanışma",
    emoji: "🤝",
    description: "",
    xpReward: 15,
    exercises: [
      {
        type: "multiple_choice",
        question: '"Numele meu este Ali" cümlesinin Türkçesi nedir?',
        options: ["Ben iyiyim", "Benim adım Ali", "Ali burada", "Ali'yi seviyorum"],
        correctIndex: 1,
      },
      {
        type: "fill_blank",
        sentence: "Numele meu ___ Zeynep.",
        correctAnswer: "este",
        options: ["sunt", "este", "ești", "avem"],
      },
      {
        type: "translation",
        sentence: "Cum te cheamă?",
        direction: "ro-tr",
        correctAnswer: "Adın ne?",
        acceptedAnswers: ["Adın ne?", "Adın ne", "Senin adın ne?", "İsmin ne?"],
      },
      {
        type: "listening",
        word: "Încântat",
        options: ["Nerelisin?", "Memnun oldum", "Ben Türküm", "Görüşürüz"],
        correctIndex: 1,
      },
      {
        type: "multiple_choice",
        question: '"Încântat(ă) de cunoștință" ne zaman söylenir?',
        options: ["Uyurken", "Tanışırken", "Sipariş verirken", "Yol sorarken"],
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
        sentence: "A: De unde ești? B: ___ din Ankara.",
        correctAnswer: "Sunt",
        options: ["Este", "Sunt", "Ești", "Avem"],
      },
      {
        type: "translation",
        sentence: "Ben İstanbul'danım",
        direction: "tr-ro",
        correctAnswer: "Sunt din Istanbul",
        acceptedAnswers: ["Sunt din Istanbul", "sunt din istanbul"],
      },
      {
        type: "translation",
        sentence: "Ben öğrenciyim",
        direction: "tr-ro",
        correctAnswer: "Sunt student(ă)",
        acceptedAnswers: ["Sunt student", "Sunt studentă", "sunt student", "sunt studentă", "Sunt student(ă)", "sunt student(ă)"],
      },
      {
        type: "translation",
        sentence: "Yaşın kaç?",
        direction: "tr-ro",
        correctAnswer: "Câți ani ai?",
        acceptedAnswers: ["Câți ani ai?", "Câți ani ai", "câți ani ai?", "câți ani ai"],
      },
      {
        type: "multiple_choice",
        question: 'Diyaloğu tamamla: "Cum te cheamă?"',
        options: ["Sunt din Turcia", "Mă cheamă Elif", "Îmi pare rău", "La revedere"],
        correctIndex: 1,
      },
    ],
  },
  "3": {
    id: "3",
    title: "Sayılar",
    emoji: "🔢",
    description: "",
    xpReward: 15,
    exercises: [
      {
        type: "multiple_choice",
        question: '"Beş" hangi Romence sayıya karşılık gelir?',
        options: ["Trei", "Cinci", "Șapte", "Nouă"],
        correctIndex: 1,
      },
      {
        type: "matching",
        pairs: [
          { left: "Bir", right: "Unu" },
          { left: "Üç", right: "Trei" },
          { left: "Yedi", right: "Șapte" },
          { left: "On", right: "Zece" },
        ],
      },
      {
        type: "fill_blank",
        sentence: "Doi plus trei fac ___.",
        correctAnswer: "cinci",
        options: ["patru", "cinci", "șase", "șapte"],
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
        question: '"Opt" Türkçe hangi sayıdır?',
        options: ["Altı", "Yedi", "Sekiz", "Dokuz"],
        correctIndex: 2,
      },
      {
        type: "fill_blank",
        sentence: "Zece plus cinci fac ___.",
        correctAnswer: "cincisprezece",
        options: ["doisprezece", "treisprezece", "paisprezece", "cincisprezece"],
      },
      {
        type: "matching",
        pairs: [
          { left: "Dört", right: "Patru" },
          { left: "Altı", right: "Șase" },
          { left: "Dokuz", right: "Nouă" },
          { left: "Yirmi", right: "Douăzeci" },
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
    description: "",
    xpReward: 20,
    exercises: [
      {
        type: "multiple_choice",
        question: '🔴 Bu renk Romence\'de ne?',
        options: ["Albastru", "Verde", "Roșu", "Galben"],
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
    description: "",
    xpReward: 20,
    exercises: [
      {
        type: "multiple_choice",
        question: '"Ekmek" Romence ne demek?',
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
        question: '"Çorba" Romence ne demek?',
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
    description: "",
    xpReward: 20,
    exercises: [
      {
        type: "multiple_choice",
        question: '"Su" Romence ne demek?',
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
        question: "Hangisi Romence bir içecek DEĞİLDİR?",
        options: ["Ceai", "Apă", "Pâine", "Cafea"],
        correctIndex: 2,
      },
    ],
  },
  "7": {
    id: "7",
    title: "Aile",
    emoji: "👨‍👩‍👧",
    description: "",
    xpReward: 25,
    exercises: [
      {
        type: "multiple_choice",
        question: '"Anne" Romence ne demek?',
        options: ["Tată", "Mamă", "Soră", "Frate"],
        correctIndex: 1,
      },
      {
        type: "matching",
        pairs: [
          { left: "Anne", right: "Mamă" },
          { left: "Baba", right: "Tată" },
          { left: "Kız kardeş", right: "Soră" },
          { left: "Dede", right: "Bunic" },
        ],
      },
      {
        type: "fill_blank",
        sentence: "Benim ___ öğretmen.",
        correctAnswer: "annem",
        options: ["annem", "evim", "okulum", "işim"],
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
        question: '"Soră mai mare" Türkçe ne demek?',
        options: ["Küçük kız kardeş", "Abla", "Teyze", "Anneanne"],
        correctIndex: 1,
      },
      {
        type: "fill_blank",
        sentence: "Annemin annesi benim ___.",
        correctAnswer: "anneannem",
        options: ["teyzem", "anneannem", "ablam", "annem"],
        hint: "Anne tarafındaki büyükanne",
      },
      {
        type: "matching",
        pairs: [
          { left: "Abla", right: "Soră mai mare" },
          { left: "Ağabey", right: "Frate mai mare" },
          { left: "Teyze", right: "Mătușă" },
          { left: "Amca", right: "Unchi" },
        ],
      },
      {
        type: "translation",
        sentence: "Kardeşim",
        direction: "tr-ro",
        correctAnswer: "Fratele meu / Sora mea",
        acceptedAnswers: ["Fratele meu", "Sora mea", "fratele meu", "sora mea"],
      },
    ],
  },
  "8": {
    id: "8",
    title: "Hayvanlar",
    emoji: "🦩",
    description: "",
    xpReward: 25,
    exercises: [
      {
        type: "multiple_choice",
        question: '"Kedi" Romence ne demek?',
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
        question: "Flamingo Romence'de hangi hayvan türüne girer?",
        options: ["Mamifer", "Reptilă", "Pasăre", "Pește"],
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
    description: "",
    xpReward: 25,
    exercises: [
      {
        type: "multiple_choice",
        question: '"Doktor" Romence ne demek?',
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
        question: "Okulda çalışan kişiye Romence ne denir?",
        options: ["Medic", "Șofer", "Profesor", "Bucătar"],
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
    description: "",
    xpReward: 20,
    exercises: [
      {
        type: "multiple_choice",
        question: "Haftaya başlarken kullanılan gün Romence hangisidir?",
        options: ["Marți", "Luni", "Duminică", "Miercuri"],
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
        sentence: "Bugün Cuma, yarın hafta sonu başlar: ___.",
        correctAnswer: "Cumartesi",
        options: ["Perşembe", "Cumartesi", "Pazar", "Pazartesi"],
      },
      {
        type: "translation",
        sentence: "Astăzi este joi",
        direction: "ro-tr",
        correctAnswer: "Bugün perşembe",
        acceptedAnswers: ["Bugün perşembe", "Bugün Perşembe", "Perşembe", "perşembe"],
      },
      {
        type: "multiple_choice",
        question: "Hafta sonunu (Cumartesi-Pazar) doğru veren Romence seçenek hangisi?",
        options: ["Luni-Marți", "Vineri-Sâmbătă", "Sâmbătă-Duminică", "Joi-Vineri"],
        correctIndex: 2,
      },
      {
        type: "fill_blank",
        sentence: "Toplantı Salı günü, ertesi gün ___ günü.",
        correctAnswer: "Çarşamba",
        options: ["Pazartesi", "Çarşamba", "Perşembe", "Cuma"],
      },
      {
        type: "translation",
        sentence: "Randevum salı günü",
        direction: "tr-ro",
        correctAnswer: "Am întâlnire marți",
        acceptedAnswers: ["Am întâlnire marți", "am întâlnire marți"],
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
    description: "",
    xpReward: 20,
    exercises: [
      {
        type: "multiple_choice",
        question: '"İlkbahar" Romence ne demek?',
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
        sentence: "Uludağ'da kar genelde ___ mevsiminde yağar.",
        correctAnswer: "kış",
        options: ["yaz", "ilkbahar", "sonbahar", "kış"],
      },
      {
        type: "translation",
        sentence: "Vara mergem la mare",
        direction: "ro-tr",
        correctAnswer: "Yazın denize gideriz",
        acceptedAnswers: ["Yazın denize gideriz", "yazın denize gideriz"],
      },
      {
        type: "multiple_choice",
        question: "Yapraklar hangi mevsimde dökülür? (Romence seçenekleri seç)",
        options: ["Primăvară", "Vară", "Toamnă", "Iarnă"],
        correctIndex: 2,
      },
      {
        type: "fill_blank",
        sentence: "Ocak ve şubat ayları genelde ___ mevsimidir.",
        correctAnswer: "kış",
        options: ["yaz", "kış", "ilkbahar", "sonbahar"],
      },
      {
        type: "translation",
        sentence: "Sonbaharda hava serin olur",
        direction: "tr-ro",
        correctAnswer: "Toamna vremea este răcoroasă",
        acceptedAnswers: ["Toamna vremea este răcoroasă", "toamna vremea este răcoroasă"],
      },
      {
        type: "multiple_choice",
        question: "Bir yılda kaç mevsim vardır? (Într-un an câte anotimpuri sunt?)",
        options: ["2", "3", "4", "5"],
        correctIndex: 2,
      },
    ],
  },
  "12": {
    id: "12",
    title: "Hava Durumu",
    emoji: "🌤️",
    description: "",
    xpReward: 20,
    exercises: [
      {
        type: "multiple_choice",
        question: '"Güneşli" Romence ne demek?',
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
        sentence: "Plouă afară, ia umbrela",
        direction: "ro-tr",
        correctAnswer: "Dışarıda yağmur yağıyor, şemsiyeni al",
        acceptedAnswers: ["Dışarıda yağmur yağıyor, şemsiyeni al", "Yağmur yağıyor", "yağmur yağıyor"],
      },
      {
        type: "multiple_choice",
        question: '"Rüzgarlı" Romence ne demek?',
        options: ["Cețos", "Vântos", "Cald", "Rece"],
        correctIndex: 1,
      },
      {
        type: "fill_blank",
        sentence: "Dışarı çıkmadan önce hava ___, şemsiye al.",
        correctAnswer: "yağmurlu",
        options: ["güneşli", "yağmurlu", "sıcak", "güzel"],
      },
      {
        type: "translation",
        sentence: "Bu sabah çok soğuk",
        direction: "tr-ro",
        correctAnswer: "Este foarte rece",
        acceptedAnswers: ["Este foarte rece", "Rece", "rece"],
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
  "13": {
    id: "13",
    title: "Alışveriş",
    emoji: "🛍️",
    description: "",
    xpReward: 25,
    exercises: [
      {
        type: "multiple_choice",
        question: '"Fiyat" Romence ne? / Cum se spune "fiyat" în română?',
        options: ["Preț", "Reducere", "Magazin", "Bani"],
        correctIndex: 0,
      },
      {
        type: "matching",
        pairs: [
          { left: "Kasiyer", right: "Casier(ă)" },
          { left: "Pazar", right: "Piață" },
          { left: "İndirim", right: "Reducere" },
          { left: "Nakit", right: "Numerar" },
        ],
      },
      {
        type: "fill_blank",
        sentence: "Bu ürün çok pahalı. Daha ___ bir şey var mı?",
        correctAnswer: "ucuz",
        options: ["uzun", "ucuz", "sıcak", "tatlı"],
      },
      {
        type: "translation",
        sentence: "Cât costă?",
        direction: "ro-tr",
        correctAnswer: "Ne kadar?",
        acceptedAnswers: ["Ne kadar?", "Ne kadar", "Bu ne kadar?"],
      },
      {
        type: "multiple_choice",
        question: '"Kartla ödeyebilir miyim?" Romence karşılığı hangisi?',
        options: [
          "Plătesc mâine",
          "Pot plăti cu cardul?",
          "Unde este cardul?",
          "Cardul meu este nou",
        ],
        correctIndex: 1,
      },
      {
        type: "fill_blank",
        sentence: "Romencede 'ucuz' demek için ___ denir.",
        correctAnswer: "ieftin",
        options: ["ieftin", "scump", "bani", "preț"],
      },
      {
        type: "translation",
        sentence: "İndirim var mı?",
        direction: "tr-ro",
        correctAnswer: "Există reducere?",
        acceptedAnswers: ["Există reducere?", "există reducere?", "Este reducere?"],
      },
      {
        type: "matching",
        pairs: [
          { left: "Ne kadar?", right: "Cât costă?" },
          { left: "Pahalı", right: "Scump" },
          { left: "Ucuz", right: "Ieftin" },
          { left: "Fiş", right: "Bon" },
        ],
      },
    ],
  },
  "14": {
    id: "14",
    title: "Ulaşım",
    emoji: "🚌",
    description: "",
    xpReward: 25,
    exercises: [
      {
        type: "multiple_choice",
        question: '"Otobüs" Romence ne? / Cum se spune "otobüs" în română?',
        options: ["Tren", "Avion", "Autobuz", "Bilet"],
        correctIndex: 2,
      },
      {
        type: "matching",
        pairs: [
          { left: "Durak", right: "Stație" },
          { left: "Bilet", right: "Bilet" },
          { left: "Metro", right: "Metrou" },
          { left: "Taksi", right: "Taxi" },
        ],
      },
      {
        type: "fill_blank",
        sentence: "İşe gitmek için her sabah ___ biniyorum.",
        correctAnswer: "otobüse",
        options: ["otobüse", "yatağa", "markete", "kitaba"],
      },
      {
        type: "translation",
        sentence: "Unde este stația de metrou?",
        direction: "ro-tr",
        correctAnswer: "Metro istasyonu nerede?",
        acceptedAnswers: ["Metro istasyonu nerede?", "Metronun durağı nerede?"],
      },
      {
        type: "multiple_choice",
        question: '"Tren kaçta kalkıyor?" cümlesinin Romencesi hangisi?',
        options: [
          "Unde merge trenul?",
          "Cât costă trenul?",
          "La ce oră pleacă trenul?",
          "Trenul este nou",
        ],
        correctIndex: 2,
      },
      {
        type: "fill_blank",
        sentence: "Havaalanına gitmek için ___ çağırdık.",
        correctAnswer: "taksi",
        options: ["taksi", "masa", "öğretmen", "kitap"],
      },
      {
        type: "translation",
        sentence: "Tek yön bilet istiyorum",
        direction: "tr-ro",
        correctAnswer: "Vreau un bilet dus",
        acceptedAnswers: ["Vreau un bilet dus", "vreau un bilet dus"],
      },
      {
        type: "matching",
        pairs: [
          { left: "Geç kaldım", right: "Am întârziat" },
          { left: "İstasyon", right: "Gară" },
          { left: "Yolcu", right: "Pasager" },
          { left: "Uçak", right: "Avion" },
        ],
      },
    ],
  },
  "15": {
    id: "15",
    title: "Ev ve Odalar",
    emoji: "🏠",
    description: "",
    xpReward: 25,
    exercises: [
      {
        type: "multiple_choice",
        question: '"Mutfak" Romence ne? / Cum se spune "mutfak" în română?',
        options: ["Dormitor", "Bucătărie", "Baie", "Balcon"],
        correctIndex: 1,
      },
      {
        type: "matching",
        pairs: [
          { left: "Salon", right: "Sufragerie" },
          { left: "Yatak odası", right: "Dormitor" },
          { left: "Banyo", right: "Baie" },
          { left: "Kapı", right: "Ușă" },
        ],
      },
      {
        type: "fill_blank",
        sentence: "Misafirler ___ oturuyor.",
        correctAnswer: "salonda",
        options: ["salonda", "mutfakta", "çatıda", "sokakta"],
      },
      {
        type: "translation",
        sentence: "Unde este baia?",
        direction: "ro-tr",
        correctAnswer: "Banyo nerede?",
        acceptedAnswers: ["Banyo nerede?", "Banyo nerde?"],
      },
      {
        type: "multiple_choice",
        question: '"Pencereleri aç" cümlesinin Romence karşılığı hangisi?',
        options: [
          "Închide ferestrele",
          "Deschide ferestrele",
          "Spală ferestrele",
          "Ferestrele sunt mari",
        ],
        correctIndex: 1,
      },
      {
        type: "fill_blank",
        sentence: "Yemek masası ___ içinde.",
        correctAnswer: "mutfağın",
        options: ["mutfağın", "bahçenin", "arabanın", "sokağın"],
      },
      {
        type: "translation",
        sentence: "Oturma odası çok geniş",
        direction: "tr-ro",
        correctAnswer: "Sufrageria este foarte spațioasă",
        acceptedAnswers: [
          "Sufrageria este foarte spațioasă",
          "sufrageria este foarte spațioasă",
        ],
      },
      {
        type: "matching",
        pairs: [
          { left: "Yatak", right: "Pat" },
          { left: "Masa", right: "Masă" },
          { left: "Sandalye", right: "Scaun" },
          { left: "Lamba", right: "Lampă" },
        ],
      },
    ],
  },
  "16": {
    id: "16",
    title: "Zaman İfadeleri",
    emoji: "⏰",
    description: "",
    xpReward: 30,
    exercises: [
      {
        type: "multiple_choice",
        question: '"Saat kaç?" Romence nasıl sorulur?',
        options: ["Ce faci?", "Cât costă?", "Cât e ceasul?", "Unde mergi?"],
        correctIndex: 2,
      },
      {
        type: "matching",
        pairs: [
          { left: "Bugün", right: "Astăzi" },
          { left: "Yarın", right: "Mâine" },
          { left: "Dün", right: "Ieri" },
          { left: "Şimdi", right: "Acum" },
        ],
      },
      {
        type: "fill_blank",
        sentence: "Toplantı saat üçte ___ .",
        correctAnswer: "başlıyor",
        options: ["başlıyor", "gidiyor", "yatıyor", "geliyor"],
      },
      {
        type: "translation",
        sentence: "Ne vedem diseară la cafenea",
        direction: "ro-tr",
        correctAnswer: "Bu akşam kafede görüşürüz",
        acceptedAnswers: ["Bu akşam kafede görüşürüz", "Bu akşam görüşürüz", "Bu akşam görüşürüz."],
      },
      {
        type: "multiple_choice",
        question: '"Her gün erken kalkarım" cümlesinin Romencesi hangisi?',
        options: [
          "Mă culc târziu în fiecare zi",
          "Mă trezesc devreme în fiecare zi",
          "Mănânc devreme în fiecare zi",
          "Lucrez acasă în fiecare zi",
        ],
        correctIndex: 1,
      },
      {
        type: "fill_blank",
        sentence: "Ders on dakika içinde ___, lütfen geç kalma.",
        correctAnswer: "başlıyor",
        options: ["başlıyor", "evde", "bazen", "orada"],
      },
      {
        type: "translation",
        sentence: "Saat dokuzda gel",
        direction: "tr-ro",
        correctAnswer: "Vino la ora nouă",
        acceptedAnswers: ["Vino la ora nouă", "vino la ora nouă"],
      },
      {
        type: "matching",
        pairs: [
          { left: "Sabah", right: "Dimineață" },
          { left: "Öğlen", right: "La prânz" },
          { left: "Akşam", right: "Seară" },
          { left: "Gece", right: "Noapte" },
        ],
      },
    ],
  },
  "17": {
    id: "17",
    title: "Temel Fiiller",
    emoji: "🏃",
    description: "",
    xpReward: 30,
    exercises: [
      {
        type: "multiple_choice",
        question: '"A merge" Türkçe ne demek?',
        options: ["Yemek yemek", "Gitmek", "Uyumak", "Görmek"],
        correctIndex: 1,
      },
      {
        type: "matching",
        pairs: [
          { left: "Yemek yemek", right: "A mânca" },
          { left: "İçmek", right: "A bea" },
          { left: "Okumak", right: "A citi" },
          { left: "Yazmak", right: "A scrie" },
        ],
      },
      {
        type: "fill_blank",
        sentence: "Her sabah kahvaltıdan sonra kahve ___.",
        correctAnswer: "içerim",
        options: ["içerim", "koşarım", "yazarım", "uyurum"],
      },
      {
        type: "translation",
        sentence: "Eu citesc o carte",
        direction: "ro-tr",
        correctAnswer: "Ben bir kitap okuyorum",
        acceptedAnswers: ["Ben bir kitap okuyorum", "Bir kitap okuyorum"],
      },
      {
        type: "multiple_choice",
        question: '"Çalışmak" fiilinin Romencesi hangisi?',
        options: ["A dormi", "A lucra", "A învăța", "A merge"],
        correctIndex: 1,
      },
      {
        type: "fill_blank",
        sentence: "Akşamları erken ___ çünkü sabah dersim var.",
        correctAnswer: "uyurum",
        options: ["uyurum", "yüzerim", "gülerim", "koşarım"],
      },
      {
        type: "translation",
        sentence: "Seni dinliyorum",
        direction: "tr-ro",
        correctAnswer: "Te ascult",
        acceptedAnswers: ["Te ascult", "te ascult"],
      },
      {
        type: "matching",
        pairs: [
          { left: "Gitmek", right: "A merge" },
          { left: "Gelmek", right: "A veni" },
          { left: "Dinlemek", right: "A asculta" },
          { left: "Uyumak", right: "A dormi" },
        ],
      },
    ],
  },
  "18": {
    id: "18",
    title: "Günlük Rutin",
    emoji: "🗓️",
    description: "Sabah, öğlen ve akşam rutinlerini iki dilde doğal biçimde ifade et",
    xpReward: 30,
    exercises: [
      {
        type: "multiple_choice",
        question: '"Diş fırçalamak" Romence hangisidir?',
        options: ["A face duș", "A se spăla pe dinți", "A lua micul dejun", "A ieși"],
        correctIndex: 1,
      },
      {
        type: "matching",
        pairs: [
          { left: "Uyanmak", right: "A se trezi" },
          { left: "Kahvaltı yapmak", right: "A lua micul dejun" },
          { left: "Duş almak", right: "A face duș" },
          { left: "İşe gitmek", right: "A merge la muncă" },
        ],
      },
      {
        type: "fill_blank",
        sentence: "Sabah saat yedide ___ ve hazırlanırım.",
        correctAnswer: "uyanırım",
        options: ["uyanırım", "uyurum", "koşarım", "yazarım"],
      },
      {
        type: "translation",
        sentence: "Seara mă odihnesc acasă",
        direction: "ro-tr",
        correctAnswer: "Akşam evde dinlenirim",
        acceptedAnswers: ["Akşam evde dinlenirim", "Evde akşam dinlenirim"],
      },
      {
        type: "multiple_choice",
        question: '"Öğle yemeği yerim" cümlesinin Romencesi hangisi?',
        options: ["Mănânc cina", "Beau apă", "Mănânc prânzul", "Citesc ziarul"],
        correctIndex: 2,
      },
      {
        type: "fill_blank",
        sentence: "Her gece saat on birde ___ .",
        correctAnswer: "uyurum",
        options: ["okurum", "çalışırım", "uyurum", "gezerim"],
      },
      {
        type: "translation",
        sentence: "Hafta içi erken kalkarım",
        direction: "tr-ro",
        correctAnswer: "În timpul săptămânii mă trezesc devreme",
        acceptedAnswers: [
          "În timpul săptămânii mă trezesc devreme",
          "în timpul săptămânii mă trezesc devreme",
        ],
      },
      {
        type: "matching",
        pairs: [
          { left: "Sabah", right: "Dimineața" },
          { left: "Öğleden sonra", right: "După-amiaza" },
          { left: "Akşam", right: "Seara" },
          { left: "Gece", right: "Noaptea" },
        ],
      },
    ],
  },
  "19": {
    id: "19",
    title: "Restoran",
    emoji: "🍽️",
    description: "Restoranda sipariş, rica ve hesap isteme kalıplarını akıcı şekilde kullan",
    xpReward: 30,
    exercises: [
      {
        type: "multiple_choice",
        question: '"Menü" Romence ne?',
        options: ["Notă", "Meniu", "Bucătărie", "Masă"],
        correctIndex: 1,
      },
      {
        type: "matching",
        pairs: [
          { left: "Garson", right: "Chelner" },
          { left: "Hesap", right: "Notă" },
          { left: "Çorba", right: "Supă" },
          { left: "Tatlı", right: "Desert" },
        ],
      },
      {
        type: "fill_blank",
        sentence: "Lütfen bir mercimek çorbası ___ .",
        correctAnswer: "istiyorum",
        options: ["istiyorum", "geliyorum", "gidiyorum", "alıyorum"],
      },
      {
        type: "translation",
        sentence: "Aș dori un ceai, vă rog",
        direction: "ro-tr",
        correctAnswer: "Bir çay istiyorum, lütfen",
        acceptedAnswers: ["Bir çay istiyorum, lütfen", "Lütfen bir çay istiyorum"],
      },
      {
        type: "multiple_choice",
        question: '"Hesabı alabilir miyim?" ifadesinin Romencesi hangisi?',
        options: [
          "Pot vedea meniul?",
          "Pot plăti cu cardul?",
          "Pot primi nota?",
          "Unde este masa?",
        ],
        correctIndex: 2,
      },
      {
        type: "fill_blank",
        sentence: "Yemekten sonra bir ___ alalım.",
        correctAnswer: "tatlı",
        options: ["tatlı", "otobüs", "defter", "anahtar"],
      },
      {
        type: "translation",
        sentence: "Su alabilir miyim?",
        direction: "tr-ro",
        correctAnswer: "Pot primi apă?",
        acceptedAnswers: ["Pot primi apă?", "pot primi apă?"],
      },
      {
        type: "matching",
        pairs: [
          { left: "Afiyet olsun", right: "Poftă bună" },
          { left: "Rezervasyon", right: "Rezervare" },
          { left: "Masayı temizlemek", right: "A curăța masa" },
          { left: "Bahşiş", right: "Bacșiș" },
        ],
      },
    ],
  },
  "20": {
    id: "20",
    title: "Yönler ve Konum",
    emoji: "🧭",
    description: "Yer tarif et, yol sor ve şehir içinde yön bulma kalıplarını pekiştir",
    xpReward: 30,
    exercises: [
      {
        type: "multiple_choice",
        question: '"Sağa dön" Romence hangisidir?',
        options: ["Mergi drept", "Întoarce-te la stânga", "Întoarce-te la dreapta", "Stai aici"],
        correctIndex: 2,
      },
      {
        type: "matching",
        pairs: [
          { left: "Sağ", right: "Dreapta" },
          { left: "Sol", right: "Stânga" },
          { left: "Düz", right: "Drept" },
          { left: "Karşısında", right: "Vizavi" },
        ],
      },
      {
        type: "fill_blank",
        sentence: "Müze bankanın ___ .",
        correctAnswer: "karşısında",
        options: ["karşısında", "üstünde", "içinde", "arkasında"],
      },
      {
        type: "translation",
        sentence: "Unde este farmacia?",
        direction: "ro-tr",
        correctAnswer: "Eczane nerede?",
        acceptedAnswers: ["Eczane nerede?", "Eczane nerde?"],
      },
      {
        type: "multiple_choice",
        question: '"Düz devam et" cümlesinin Romence karşılığı hangisi?',
        options: ["Mergi drept", "Întoarce-te înapoi", "Oprește aici", "Urcă sus"],
        correctIndex: 0,
      },
      {
        type: "fill_blank",
        sentence: "Okul parkın ___ yer alıyor.",
        correctAnswer: "yanında",
        options: ["yanında", "üstünde", "altında", "uzakta"],
      },
      {
        type: "translation",
        sentence: "Sola dön ve ikinci sokağa gir",
        direction: "tr-ro",
        correctAnswer: "Fă la stânga și intră pe a doua stradă",
        acceptedAnswers: [
          "Fă la stânga și intră pe a doua stradă",
          "fă la stânga și intră pe a doua stradă",
        ],
      },
      {
        type: "matching",
        pairs: [
          { left: "Yakın", right: "Aproape" },
          { left: "Uzak", right: "Departe" },
          { left: "Köşe", right: "Colț" },
          { left: "Cadde", right: "Bulevard" },
        ],
      },
    ],
  },
  "21": {
    id: "21",
    title: "Duygular",
    emoji: "😊",
    description: "Temel duyguları ifade et ve karşındakinin nasıl hissettiğini sor",
    xpReward: 30,
    exercises: [
      {
        type: "multiple_choice",
        question: '"Mutlu" Romence nasıl söylenir?',
        options: ["Trist", "Fericit", "Obosit", "Furios"],
        correctIndex: 1,
      },
      {
        type: "matching",
        pairs: [
          { left: "Mutlu", right: "Fericit" },
          { left: "Üzgün", right: "Trist" },
          { left: "Yorgun", right: "Obosit" },
          { left: "Heyecanlı", right: "Entuziasmat" },
        ],
      },
      {
        type: "fill_blank",
        sentence: "Sınavdan sonra biraz ___ hissediyorum.",
        correctAnswer: "yorgun",
        options: ["yorgun", "uzun", "kalın", "erken"],
      },
      {
        type: "translation",
        sentence: "Sunt foarte fericit azi",
        direction: "ro-tr",
        correctAnswer: "Bugün çok mutluyum",
        acceptedAnswers: ["Bugün çok mutluyum", "Çok mutluyum bugün", "bugün çok mutluyum"],
      },
      {
        type: "multiple_choice",
        question: '"Sinirliyim" ifadesinin Romence karşılığı hangisi?',
        options: ["Sunt furios/furioasă", "Sunt liniștit", "Sunt ocupat", "Sunt acasă"],
        correctIndex: 0,
      },
      {
        type: "fill_blank",
        sentence: "Yoğun bir günden sonra herkes biraz ___ olabilir.",
        correctAnswer: "stresli",
        options: ["stresli", "tatlı", "sessiz", "aç"],
      },
      {
        type: "translation",
        sentence: "Nasıl hissediyorsun?",
        direction: "tr-ro",
        correctAnswer: "Cum te simți?",
        acceptedAnswers: ["Cum te simți?", "cum te simți?", "Cum te simti?", "cum te simti?"],
      },
      {
        type: "matching",
        pairs: [
          { left: "Rahat", right: "Relaxat" },
          { left: "Endişeli", right: "Îngrijorat" },
          { left: "Sakin", right: "Calm" },
          { left: "Korkmuş", right: "Speriat" },
        ],
      },
    ],
  },
  "22": {
    id: "22",
    title: "Vücut Bölümleri",
    emoji: "🧍",
    description: "Vücudu tanımlamak, basit sağlık ifadeleri ve günlük kelimeler",
    xpReward: 30,
    exercises: [
      {
        type: "multiple_choice",
        question: '"El" Romence hangisidir?',
        options: ["Cap", "Mână", "Picior", "Ochi"],
        correctIndex: 1,
      },
      {
        type: "matching",
        pairs: [
          { left: "Baş", right: "Cap" },
          { left: "Göz", right: "Ochi" },
          { left: "Kulak", right: "Ureche" },
          { left: "Ağız", right: "Gură" },
        ],
      },
      {
        type: "fill_blank",
        sentence: "Bugün çok yürüdüm, ___ ağrıyor.",
        correctAnswer: "ayağım",
        options: ["ayağım", "kalemim", "çantam", "elbisem"],
      },
      {
        type: "translation",
        sentence: "Mă doare capul",
        direction: "ro-tr",
        correctAnswer: "Başım ağrıyor",
        acceptedAnswers: ["Başım ağrıyor", "başım ağrıyor", "Benim başım ağrıyor"],
      },
      {
        type: "multiple_choice",
        question: '"Diz" kelimesinin Romence karşılığı hangisi?',
        options: ["Genunchi", "Cot", "Umăr", "Spate"],
        correctIndex: 0,
      },
      {
        type: "fill_blank",
        sentence: "Kitabı taşımaktan ___ yoruldu.",
        correctAnswer: "kollarım",
        options: ["kollarım", "masam", "defterim", "evim"],
      },
      {
        type: "translation",
        sentence: "Omuz",
        direction: "tr-ro",
        correctAnswer: "Umăr",
        acceptedAnswers: ["Umăr", "umăr"],
      },
      {
        type: "matching",
        pairs: [
          { left: "Burun", right: "Nas" },
          { left: "Diş", right: "Dinte" },
          { left: "Boyun", right: "Gât" },
          { left: "Sırt", right: "Spate" },
        ],
      },
    ],
  },

};

const level2To6SupplementalExercises: Record<string, Exercise[]> = {
  "4": [
    {
      type: "translation",
      sentence: "Elbise kırmızı",
      direction: "tr-ro",
      correctAnswer: "Rochia este roșie",
      acceptedAnswers: ["Rochia este roșie", "rochia este roșie"],
      hint: "Rochie = elbise, roșie = kırmızı",
    },
  ],
  "5": [
    {
      type: "multiple_choice",
      question: '"Mănânc un măr" cümlesinin Türkçesi hangisidir?',
      options: ["Bir elma yiyorum", "Bir armut yiyorum", "Ekmek alıyorum", "Su içiyorum"],
      correctIndex: 0,
      hint: "măr = elma",
    },
  ],
  "6": [
    {
      type: "fill_blank",
      sentence: "Kafede bir ___ sipariş ettim.",
      correctAnswer: "kahve",
      options: ["kahve", "çorba", "salata", "pilav"],
      hint: "İçecek bağlamına dikkat et.",
    },
  ],
  "7": [
    {
      type: "translation",
      sentence: "Annem evde",
      direction: "tr-ro",
      correctAnswer: "Mama este acasă",
      acceptedAnswers: ["Mama este acasă", "mama este acasă"],
      hint: "acasă = evde",
    },
  ],
  "8": [
    {
      type: "multiple_choice",
      question: '"Pisică" hangi hayvandır?',
      options: ["Kedi", "Köpek", "Kuş", "Balık"],
      correctIndex: 0,
      hint: "Romence pisică = kedi",
    },
  ],
  "9": [
    {
      type: "fill_blank",
      sentence: "Doktor hastanede ___ .",
      correctAnswer: "çalışır",
      options: ["çalışır", "uyur", "yüzer", "koşar"],
      hint: "Meslek + iş yeri kalıbı",
    },
  ],
  "10": [
    {
      type: "translation",
      sentence: "Yarın cuma",
      direction: "tr-ro",
      correctAnswer: "Mâine este vineri",
      acceptedAnswers: ["Mâine este vineri", "mâine este vineri"],
      hint: "mâine = yarın",
    },
  ],
  "11": [
    {
      type: "multiple_choice",
      question: '"Kış" Romence hangisidir?',
      options: ["Primăvară", "Vară", "Toamnă", "Iarnă"],
      correctIndex: 3,
      hint: "iarnă = kış",
    },
  ],
  "12": [
    {
      type: "fill_blank",
      sentence: "Bugün hava çok ___ .",
      correctAnswer: "rüzgarlı",
      options: ["rüzgarlı", "sessiz", "karanlık", "kapalı"],
      hint: "Hava durumu sıfatı seç.",
    },
  ],
  "13": [
    {
      type: "translation",
      sentence: "Kasada ödeme yapacağım",
      direction: "tr-ro",
      correctAnswer: "Voi plăti la casă",
      acceptedAnswers: ["Voi plăti la casă", "voi plăti la casă"],
      hint: "la casă = kasada",
    },
  ],
  "14": [
    {
      type: "multiple_choice",
      question: '"Tren istasyonu" Romence ne?',
      options: ["Stație de autobuz", "Gară", "Aeroport", "Metrou"],
      correctIndex: 1,
      hint: "gară = tren istasyonu",
    },
  ],
  "15": [
    {
      type: "fill_blank",
      sentence: "Misafirler ___ oturuyor.",
      correctAnswer: "salonda",
      options: ["salonda", "balkonda", "garajda", "çatıda"],
      hint: "Ev odaları kelimeleri",
    },
  ],
  "16": [
    {
      type: "translation",
      sentence: "Ders saat üçte başlıyor",
      direction: "tr-ro",
      correctAnswer: "Cursul începe la ora trei",
      acceptedAnswers: ["Cursul începe la ora trei", "cursul începe la ora trei"],
      hint: "la ora ... = saat ...'te",
    },
  ],
  "17": [
    {
      type: "multiple_choice",
      question: '"A scrie" fiilinin Türkçesi hangisi?',
      options: ["Yazmak", "Koşmak", "Beklemek", "Temizlemek"],
      correctIndex: 0,
      hint: "scrie = yazmak",
    },
  ],
  "18": [
    {
      type: "fill_blank",
      sentence: "Akşamları genelde erken ___ .",
      correctAnswer: "uyurum",
      options: ["uyurum", "koşarım", "çizerim", "dinlerim"],
      hint: "Günlük rutin fiilleri",
    },
  ],
  "19": [
    {
      type: "translation",
      sentence: "Garson, menü alabilir miyim?",
      direction: "tr-ro",
      correctAnswer: "Chelner, pot primi meniul?",
      acceptedAnswers: ["Chelner, pot primi meniul?", "chelner, pot primi meniul?"],
      hint: "pot primi ... = ... alabilir miyim",
    },
  ],
  "20": [
    {
      type: "multiple_choice",
      question: '"Köşeden sola dön" ifadesinin Romencesi hangisi?',
      options: [
        "Mergi drept până la semafor",
        "La colț, fă la stânga",
        "Întoarce-te la dreapta acum",
        "Treci pe lângă farmacie",
      ],
      correctIndex: 1,
      hint: "la colț = köşede/köşeden",
    },
  ],
};

for (const [lessonId, extraExercises] of Object.entries(level2To6SupplementalExercises)) {
  lessonsData[lessonId]?.exercises.push(...extraExercises);
}
