import { lessonCatalog } from "./lessonCatalog";

export type ExerciseType = "multiple_choice" | "translation" | "fill_blank" | "matching" | "listening" | "sentence_builder" | "listen_and_repeat";

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

export interface SentenceBuilderExercise {
  type: "sentence_builder";
  prompt: string;
  correctSentence: string;
  words: string[];
  hint?: string;
}

export interface ListenAndRepeatExercise {
  type: "listen_and_repeat";
  prompt: string;
  phrase: string;
  acceptedAnswers: string[];
  hint?: string;
}

export type Exercise =
  | MultipleChoiceExercise
  | TranslationExercise
  | FillBlankExercise
  | MatchingExercise
  | ListeningExercise
  | SentenceBuilderExercise
  | ListenAndRepeatExercise;

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
        sentence: "A: Günaydın! B: ___ dimineața!",
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
        question: '"Görüşürüz" Rumence ne demek?',
        options: ["Bună", "La revedere", "Mulțumesc", "Te rog"],
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
        sentence: "A: Nasılsın? B: İyiyim, ___!",
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
        type: "sentence_builder",
        prompt: "Rumence cümleyi doğru sıraya getir",
        correctSentence: "Numele meu este Mehmet",
        words: ["este", "Mehmet", "meu", "Numele"],
        hint: "'Benim adım Mehmet' ifadesinin Rumencesini düşün.",
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
        question: '"Nasılsın?" Rumence hangisi?',
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
        sentence: "Cümleyi Rumence tamamla: Numele meu ___ Zeynep.",
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
        question: '"Memnun oldum" Rumence nasıl söylenir?',
        options: ["Îmi pare rău", "Încântat(ă) de cunoștință", "La revedere", "Cu plăcere"],
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
        sentence: "A: Nerelisin? B: ___ din Ankara.",
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
        question: '"Benim adım Elif" Rumence hangisi?',
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
        question: '"Beş" hangi Rumence sayıya karşılık gelir?',
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
        sentence: "Rumence işlemi tamamla: Doi plus trei fac ___.",
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
        sentence: "Rumence işlemi tamamla: Zece plus cinci fac ___.",
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
        question: '🔴 Bu renk Rumence\'de ne?',
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
        sentence: "Gökyüzü mavinin Rumencesi: ___.",
        correctAnswer: "albastru",
        options: ["albastru", "verde", "roșu", "galben"],
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
        question: '🟡 "Sarı" Rumence ne?',
        options: ["Portocaliu", "Galben", "Auriu", "Maro"],
        correctIndex: 1,
      },
      {
        type: "fill_blank",
        sentence: "Rumencede 'kırmızı' demek için ___ denir.",
        correctAnswer: "roșu",
        options: ["roșu", "albastru", "verde", "negru"],
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
        question: '"Ekmek" Rumence ne demek?',
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
        sentence: "Cümleyi Rumence tamamla: La micul dejun mănânc ___ și brânză.",
        correctAnswer: "pâine",
        options: ["apă", "pâine", "ceai", "pui"],
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
        question: '"Çorba" Rumence ne demek?',
        options: ["Salată", "Supă", "Desert", "Carne"],
        correctIndex: 1,
      },
      {
        type: "fill_blank",
        sentence: "Cümleyi Rumence tamamla: La cină mănânc ___.",
        correctAnswer: "supă",
        options: ["pâine", "orez", "supă", "măr"],
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
        question: '"Su" Rumence ne demek?',
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
        sentence: "Rumencede 'çay' demek için ___ denir.",
        correctAnswer: "ceai",
        options: ["ceai", "cafea", "lapte", "apă"],
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
        question: '"Meyve suyu" Rumence ne demek?',
        options: ["Lapte", "Ceai", "Cafea", "Suc"],
        correctIndex: 3,
      },
      {
        type: "fill_blank",
        sentence: "Rumencede 'süt' demek için ___ denir.",
        correctAnswer: "lapte",
        options: ["lapte", "apă", "suc", "ceai"],
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
        question: "Hangisi Rumence bir içecek DEĞİLDİR?",
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
        question: '"Anne" Rumence ne demek?',
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
        sentence: "Cümleyi Rumence tamamla: Mama mea este ___.",
        correctAnswer: "profesoară",
        options: ["profesoară", "casă", "școală", "serviciu"],
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
        sentence: "Cümleyi Rumence tamamla: Mama mamei mele este ___.",
        correctAnswer: "bunica",
        options: ["mătușa", "bunica", "sora", "mama"],
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
        question: '"Kedi" Rumence ne demek?',
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
        sentence: "Rumencede 'kedi' demek için ___ denir.",
        correctAnswer: "pisică",
        options: ["pisică", "câine", "pasăre", "pește"],
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
        question: "Flamingo Rumence'de hangi hayvan türüne girer?",
        options: ["Mamifer", "Reptilă", "Pasăre", "Pește"],
        correctIndex: 2,
      },
      {
        type: "fill_blank",
        sentence: "Rumencede 'at' demek için ___ denir.",
        correctAnswer: "cal",
        options: ["cal", "câine", "pisică", "vacă"],
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
        question: '"Doktor" Rumence ne demek?',
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
        sentence: "Rumencede 'doktor' demek için ___ denir.",
        correctAnswer: "medic",
        options: ["medic", "profesor", "inginer", "avocat"],
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
        question: "Okulda çalışan kişiye Rumence ne denir?",
        options: ["Medic", "Șofer", "Profesor", "Bucătar"],
        correctIndex: 2,
      },
      {
        type: "fill_blank",
        sentence: "Rumencede 'aşçı' demek için ___ denir.",
        correctAnswer: "bucătar",
        options: ["bucătar", "medic", "profesor", "șofer"],
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
        question: "Haftaya başlarken kullanılan gün Rumence hangisidir?",
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
        sentence: "Rumencede 'cuma' demek için ___ denir.",
        correctAnswer: "vineri",
        options: ["vineri", "joi", "sâmbătă", "luni"],
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
        question: "Hafta sonunu (Cumartesi-Pazar) doğru veren Rumence seçenek hangisi?",
        options: ["Luni-Marți", "Vineri-Sâmbătă", "Sâmbătă-Duminică", "Joi-Vineri"],
        correctIndex: 2,
      },
      {
        type: "fill_blank",
        sentence: "Rumencede 'çarşamba' demek için ___ denir.",
        correctAnswer: "miercuri",
        options: ["miercuri", "marți", "joi", "vineri"],
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
        question: '"İlkbahar" Rumence ne demek?',
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
        sentence: "Rumencede 'kış' demek için ___ denir.",
        correctAnswer: "iarnă",
        options: ["iarnă", "vară", "primăvară", "toamnă"],
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
        question: "Yapraklar hangi mevsimde dökülür? (Rumence seçenekleri seç)",
        options: ["Primăvară", "Vară", "Toamnă", "Iarnă"],
        correctIndex: 2,
      },
      {
        type: "fill_blank",
        sentence: "Rumencede 'yaz' demek için ___ denir.",
        correctAnswer: "vară",
        options: ["vară", "iarnă", "toamnă", "primăvară"],
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
        question: '"Sonbahar" Rumence hangisidir?',
        options: ["Primăvară", "Vară", "Toamnă", "Iarnă"],
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
        question: '"Güneşli" Rumence ne demek?',
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
        sentence: "Rumencede 'güneşli' demek için ___ denir.",
        correctAnswer: "însorit",
        options: ["însorit", "ploios", "noros", "vântos"],
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
        question: '"Rüzgarlı" Rumence ne demek?',
        options: ["Cețos", "Vântos", "Cald", "Rece"],
        correctIndex: 1,
      },
      {
        type: "fill_blank",
        sentence: "Rumencede 'yağmurlu' demek için ___ denir.",
        correctAnswer: "ploios",
        options: ["ploios", "însorit", "noros", "cald"],
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
        question: '"Fiyat" Rumence ne? / Cum se spune "fiyat" în română?',
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
        sentence: "Cümleyi Rumence tamamla: Acest produs este foarte scump. Aveți ceva mai ___?",
        correctAnswer: "ieftin",
        options: ["lung", "ieftin", "cald", "dulce"],
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
        question: '"Kartla ödeyebilir miyim?" Rumence karşılığı hangisi?',
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
        sentence: "Rumencede 'ucuz' demek için ___ denir.",
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
        question: '"Otobüs" Rumence ne? / Cum se spune "otobüs" în română?',
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
        sentence: "Cümleyi Rumence tamamla: În fiecare dimineață merg la serviciu cu ___.",
        correctAnswer: "autobuzul",
        options: ["autobuzul", "patul", "piața", "cartea"],
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
        question: '"Tren kaçta kalkıyor?" cümlesinin Rumencesi hangisi?',
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
        sentence: "Cümleyi Rumence tamamla: Am chemat un ___ ca să mergem la aeroport.",
        correctAnswer: "taxi",
        options: ["taxi", "masă", "profesor", "carte"],
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
        question: '"Mutfak" Rumence ne? / Cum se spune "mutfak" în română?',
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
        question: '"Pencereleri aç" cümlesinin Rumence karşılığı hangisi?',
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
        sentence: "Cümleyi Rumence tamamla: Masa este în ___.",
        correctAnswer: "bucătărie",
        options: ["bucătărie", "grădină", "mașină", "stradă"],
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
        question: '"Saat kaç?" Rumence nasıl sorulur?',
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
        sentence: "Cümleyi Rumence tamamla: Ședința ___ la ora trei.",
        correctAnswer: "începe",
        options: ["începe", "merge", "doarme", "vine"],
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
        question: '"Her gün erken kalkarım" cümlesinin Rumencesi hangisi?',
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
        sentence: "Cümleyi Rumence tamamla: Lecția ___ în zece minute, te rog nu întârzia.",
        correctAnswer: "începe",
        options: ["începe", "acasă", "uneori", "acolo"],
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
        sentence: "Cümleyi Rumence tamamla: În fiecare dimineață, după micul dejun, ___ cafea.",
        correctAnswer: "beau",
        options: ["beau", "alerg", "scriu", "dorm"],
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
        question: '"Çalışmak" fiilinin Rumencesi hangisi?',
        options: ["A dormi", "A lucra", "A învăța", "A merge"],
        correctIndex: 1,
      },
      {
        type: "fill_blank",
        sentence: "Cümleyi Rumence tamamla: Seara ___ devreme pentru că dimineața am curs.",
        correctAnswer: "dorm",
        options: ["dorm", "înot", "râd", "alerg"],
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
        question: '"Diş fırçalamak" Rumence hangisidir?',
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
        sentence: "Cümleyi Rumence tamamla: La ora șapte dimineața ___ și mă pregătesc.",
        correctAnswer: "mă trezesc",
        options: ["mă trezesc", "dorm", "alerg", "scriu"],
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
        question: '"Öğle yemeği yerim" cümlesinin Rumencesi hangisi?',
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
        question: '"Menü" Rumence ne?',
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
        sentence: "Cümleyi Rumence tamamla: Vă rog, ___ o supă de linte.",
        correctAnswer: "doresc",
        options: ["doresc", "vin", "plec", "iau"],
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
        question: '"Hesabı alabilir miyim?" ifadesinin Rumencesi hangisi?',
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
        sentence: "Cümleyi Rumence tamamla: După masă, să luăm un ___.",
        correctAnswer: "desert",
        options: ["desert", "autobuz", "caiet", "cheie"],
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
        question: '"Sağa dön" Rumence hangisidir?',
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
        sentence: "Cümleyi Rumence tamamla: Muzeul este ___ băncii.",
        correctAnswer: "vizavi de",
        options: ["vizavi de", "deasupra", "înăuntru", "în spatele"],
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
        question: '"Düz devam et" cümlesinin Rumence karşılığı hangisi?',
        options: ["Mergi drept", "Întoarce-te înapoi", "Oprește aici", "Urcă sus"],
        correctIndex: 0,
      },
      {
        type: "fill_blank",
        sentence: "Cümleyi Rumence tamamla: Școala este ___ parc.",
        correctAnswer: "lângă",
        options: ["lângă", "deasupra", "sub", "departe de"],
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
        question: '"Mutlu" Rumence nasıl söylenir?',
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
        sentence: "Cümleyi Rumence tamamla: După examen mă simt puțin ___.",
        correctAnswer: "obosit",
        options: ["obosit", "lung", "gros", "devreme"],
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
        question: '"Sinirliyim" ifadesinin Rumence karşılığı hangisi?',
        options: ["Sunt furios/furioasă", "Sunt liniștit", "Sunt ocupat", "Sunt acasă"],
        correctIndex: 0,
      },
      {
        type: "fill_blank",
        sentence: "Cümleyi Rumence tamamla: După o zi aglomerată, oricine poate fi puțin ___.",
        correctAnswer: "stresat",
        options: ["stresat", "dulce", "liniștit", "flămând"],
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
        question: '"El" Rumence hangisidir?',
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
        sentence: "Cümleyi Rumence tamamla: Astăzi am mers mult, mă doare ___.",
        correctAnswer: "piciorul",
        options: ["piciorul", "pixul", "geanta", "rochia"],
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
        question: '"Diz" kelimesinin Rumence karşılığı hangisi?',
        options: ["Genunchi", "Cot", "Umăr", "Spate"],
        correctIndex: 0,
      },
      {
        type: "fill_blank",
        sentence: "Cümleyi Rumence tamamla: De la căratul cărții, mi-au obosit ___.",
        correctAnswer: "brațele",
        options: ["brațele", "masa", "caietul", "casa"],
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
  "23": {
    id: "23",
    title: "Seyahat ve Tatil",
    emoji: "🧳",
    description: "Seyahat planı yaparken ve tatilde ihtiyaç duyulan temel ifadeler",
    xpReward: 30,
    exercises: [
      {
        type: "multiple_choice",
        question: '"Bilet" Rumence hangisidir?',
        options: ["Bagaj", "Bilet", "Pașaport", "Hotel"],
        correctIndex: 1,
      },
      {
        type: "matching",
        pairs: [
          { left: "Uçak", right: "Avion" },
          { left: "Pasaport", right: "Pașaport" },
          { left: "Otel", right: "Hotel" },
          { left: "Rezervasyon", right: "Rezervare" },
        ],
      },
      {
        type: "fill_blank",
        sentence: "Cümleyi Rumence tamamla: Înainte să plec în vacanță, trebuie să-mi verific ___.",
        correctAnswer: "pașaportul",
        options: ["pașaportul", "pixul", "televizorul", "masa"],
      },
      {
        type: "translation",
        sentence: "Unde este hotelul?",
        direction: "ro-tr",
        correctAnswer: "Otel nerede?",
        acceptedAnswers: ["Otel nerede?", "otel nerede?", "Hotel nerede?"],
      },
      {
        type: "multiple_choice",
        question: '"Check-in" için doğru Rumence ifade hangisi?',
        options: ["A face check-in", "A cumpăra", "A dormi", "A întreba"],
        correctIndex: 0,
      },
      {
        type: "fill_blank",
        sentence: "Rumencede 'tatil' demek için ___ denir.",
        correctAnswer: "vacanță",
        options: ["vacanță", "școală", "muncă", "piață"],
      },
      {
        type: "translation",
        sentence: "Valizim ağır",
        direction: "tr-ro",
        correctAnswer: "Bagajul meu este greu",
        acceptedAnswers: ["Bagajul meu este greu", "bagajul meu este greu"],
      },
      {
        type: "matching",
        pairs: [
          { left: "Plaj", right: "Plajă" },
          { left: "Harita", right: "Hartă" },
          { left: "Turist", right: "Turist" },
          { left: "Müze", right: "Muzeu" },
        ],
      },
    ],
  },
  "24": {
    id: "24",
    title: "Sağlık ve Eczane",
    emoji: "💊",
    description: "Hastalık belirtilerini anlatma ve eczanede temel konuşmalar",
    xpReward: 30,
    exercises: [
      {
        type: "multiple_choice",
        question: '"Ateşim var" cümlesinin Rumencesi hangisi?',
        options: ["Am febră", "Am apă", "Am timp", "Am carte"],
        correctIndex: 0,
      },
      {
        type: "matching",
        pairs: [
          { left: "İlaç", right: "Medicament" },
          { left: "Eczane", right: "Farmacie" },
          { left: "Ağrı", right: "Durere" },
          { left: "Reçete", right: "Rețetă" },
        ],
      },
      {
        type: "fill_blank",
        sentence: "Cümleyi Rumence tamamla: Mă doare capul, am nevoie de un ___.",
        correctAnswer: "medicament",
        options: ["medicament", "bilet", "caiet", "cheie"],
      },
      {
        type: "translation",
        sentence: "Mă doare gâtul",
        direction: "ro-tr",
        correctAnswer: "Boğazım ağrıyor",
        acceptedAnswers: ["Boğazım ağrıyor", "boğazım ağrıyor"],
      },
      {
        type: "multiple_choice",
        question: '"Eczane nerede?" sorusunun Rumencesi hangisi?',
        options: ["Cât costă farmacia?", "Unde este farmacia?", "Farmacia este mare", "Am nevoie de apă"],
        correctIndex: 1,
      },
      {
        type: "fill_blank",
        sentence: "Rumencede 'öksürük' demek için ___ denir.",
        correctAnswer: "tuse",
        options: ["tuse", "febră", "durere", "somn"],
      },
      {
        type: "translation",
        sentence: "Doktora gitmeliyim",
        direction: "tr-ro",
        correctAnswer: "Trebuie să merg la doctor",
        acceptedAnswers: ["Trebuie să merg la doctor", "trebuie să merg la doctor"],
      },
      {
        type: "matching",
        pairs: [
          { left: "Soğuk algınlığı", right: "Răceală" },
          { left: "Şurup", right: "Sirop" },
          { left: "Tablet", right: "Pastilă" },
          { left: "Tedavi", right: "Tratament" },
        ],
      },
    ],
  },
  "25": {
    id: "25",
    title: "Teknoloji",
    emoji: "💻",
    description: "Günlük teknoloji kullanımında temel kelime ve cümleleri öğren",
    xpReward: 30,
    exercises: [
      {
        type: "multiple_choice",
        question: '"Bilgisayar" Rumence ne?',
        options: ["Telefon", "Calculator", "Tabletă", "Internet"],
        correctIndex: 1,
      },
      {
        type: "matching",
        pairs: [
          { left: "Telefon", right: "Telefon" },
          { left: "Bilgisayar", right: "Calculator" },
          { left: "Klavye", right: "Tastatură" },
          { left: "Ekran", right: "Ecran" },
        ],
      },
      {
        type: "fill_blank",
        sentence: "Pentru ședință trebuie să-mi încarc ___.",
        correctAnswer: "telefonul",
        options: ["telefonul", "scaunul", "cartea", "fereastra"],
      },
      {
        type: "translation",
        sentence: "Wi-Fi parola nedir?",
        direction: "tr-ro",
        correctAnswer: "Care este parola Wi-Fi?",
        acceptedAnswers: ["Care este parola Wi-Fi?", "care este parola wi-fi?"],
      },
      {
        type: "multiple_choice",
        question: '"Mesaj gönder" cümlesinin Rumencesi hangisi?',
        options: ["Trimite un mesaj", "Deschide ușa", "Citește cartea", "Pornește lumina"],
        correctIndex: 0,
      },
      {
        type: "fill_blank",
        sentence: "Rumencede 'internet bağlantısı' demek için ___ denir.",
        correctAnswer: "conexiune la internet",
        options: ["conexiune la internet", "telefon mobil", "mesaj vocal", "adresă poștală"],
      },
      {
        type: "translation",
        sentence: "Aplicație güncelleniyor",
        direction: "tr-ro",
        correctAnswer: "Aplicația se actualizează",
        acceptedAnswers: ["Aplicația se actualizează", "aplicația se actualizează"],
      },
      {
        type: "matching",
        pairs: [
          { left: "Parola", right: "Parolă" },
          { left: "Dosya", right: "Fișier" },
          { left: "Şarj", right: "Încărcare" },
          { left: "Kulaklık", right: "Căști" },
        ],
      },
    ],
  },
  "26": {
    id: "26",
    title: "İş ve Ofis",
    emoji: "📊",
    description: "Ofis ortamında kullanılan temel ifadeleri pratik et",
    xpReward: 30,
    exercises: [
      {
        type: "multiple_choice",
        question: '"Toplantı" Rumence karşılığı hangisi?',
        options: ["Ședință", "Pauză", "Cafea", "Contract"],
        correctIndex: 0,
      },
      {
        type: "matching",
        pairs: [
          { left: "Müdür", right: "Manager" },
          { left: "Toplantı", right: "Ședință" },
          { left: "Rapor", right: "Raport" },
          { left: "Müşteri", right: "Client" },
        ],
      },
      {
        type: "fill_blank",
        sentence: "La ora zece începe ___ echipei.",
        correctAnswer: "ședința",
        options: ["ședința", "masa", "vacanța", "jocul"],
      },
      {
        type: "translation",
        sentence: "Am trimis raportul pe e-mail",
        direction: "ro-tr",
        correctAnswer: "Raporu e-posta ile gönderdim",
        acceptedAnswers: ["Raporu e-posta ile gönderdim", "Raporu mail ile gönderdim"],
      },
      {
        type: "multiple_choice",
        question: '"Bugün ofisten çalışıyorum" cümlesinin Rumencesi hangisi?',
        options: [
          "Astăzi lucrez de acasă",
          "Astăzi lucrez de la birou",
          "Astăzi merg la piață",
          "Astăzi citesc un ziar",
        ],
        correctIndex: 1,
      },
      {
        type: "fill_blank",
        sentence: "Rumencede 'sözleşme' demek için ___ denir.",
        correctAnswer: "contract",
        options: ["contract", "masă", "ușă", "drum"],
      },
      {
        type: "translation",
        sentence: "Müşteriyle saat üçte görüşmem var",
        direction: "tr-ro",
        correctAnswer: "Am întâlnire cu clientul la ora trei",
        acceptedAnswers: [
          "Am întâlnire cu clientul la ora trei",
          "am întâlnire cu clientul la ora trei",
        ],
      },
      {
        type: "matching",
        pairs: [
          { left: "Sunum", right: "Prezentare" },
          { left: "Ofis", right: "Birou" },
          { left: "Mola", right: "Pauză" },
          { left: "Takvim", right: "Calendar" },
        ],
      },
    ],
  },
  "27": {
    id: "27",
    title: "Eğitim",
    emoji: "📚",
    description: "Sınıf içinde ve ders çalışırken kullanılan kalıpları güçlendir",
    xpReward: 30,
    exercises: [
      {
        type: "multiple_choice",
        question: '"Ödev" Rumence ne demek?',
        options: ["Temă", "Vacanță", "Birou", "Pauză"],
        correctIndex: 0,
      },
      {
        type: "matching",
        pairs: [
          { left: "Öğrenci", right: "Elev" },
          { left: "Öğretmen", right: "Profesor" },
          { left: "Sınav", right: "Examen" },
          { left: "Ders", right: "Lecție" },
        ],
      },
      {
        type: "fill_blank",
        sentence: "Mâine avem ___ la matematică.",
        correctAnswer: "examen",
        options: ["examen", "mașină", "geantă", "cafea"],
      },
      {
        type: "translation",
        sentence: "Profesorul explică lecția",
        direction: "ro-tr",
        correctAnswer: "Öğretmen dersi açıklıyor",
        acceptedAnswers: ["Öğretmen dersi açıklıyor", "Hoca dersi açıklıyor"],
      },
      {
        type: "multiple_choice",
        question: '"Kitabını aç" ifadesinin Rumencesi hangisi?',
        options: ["Închide caietul", "Deschide cartea", "Scrie pe tablă", "Ascultă muzică"],
        correctIndex: 1,
      },
      {
        type: "fill_blank",
        sentence: "Rumencede 'not almak' için ___ denir.",
        correctAnswer: "a lua notițe",
        options: ["a lua notițe", "a merge acasă", "a bea apă", "a cumpăra"],
      },
      {
        type: "translation",
        sentence: "Dersten sonra kütüphaneye gidiyorum",
        direction: "tr-ro",
        correctAnswer: "După lecție merg la bibliotecă",
        acceptedAnswers: ["După lecție merg la bibliotecă", "după lecție merg la bibliotecă"],
      },
      {
        type: "matching",
        pairs: [
          { left: "Tahta", right: "Tablă" },
          { left: "Defter", right: "Caiet" },
          { left: "Kütüphane", right: "Bibliotecă" },
          { left: "Soru", right: "Întrebare" },
        ],
      },
    ],
  },

  "28": {
    id: "28",
    title: "Hobiler",
    emoji: "🎯",
    description: "Boş zaman aktiviteleri ve ilgi alanlarıyla ilgili doğal cümleler kur",
    xpReward: 30,
    exercises: [
      { type: "multiple_choice", question: '"Yüzmek" fiilinin Rumence karşılığı hangisi?', options: ["A alerga", "A înota", "A dansa", "A desena"], correctIndex: 1 },
      { type: "matching", pairs: [ { left: "Kitap okumak", right: "A citi cărți" }, { left: "Müzik dinlemek", right: "A asculta muzică" }, { left: "Resim yapmak", right: "A picta" }, { left: "Koşmak", right: "A alerga" } ] },
      { type: "fill_blank", sentence: "În weekend îmi place mult să ___.", correctAnswer: "alerg", options: ["alerg", "dorm", "aștept", "uit"] },
      { type: "translation", sentence: "Îmi place să fac fotografie", direction: "ro-tr", correctAnswer: "Fotoğraf çekmeyi seviyorum", acceptedAnswers: ["Fotoğraf çekmeyi seviyorum", "fotoğraf çekmeyi seviyorum"] },
      { type: "multiple_choice", question: '"Boş zamanımda gitar çalıyorum" cümlesinin Rumencesi hangisi?', options: ["În timpul liber citesc ziarul", "În timpul liber cânt la chitară", "În timpul liber fac curat", "În timpul liber gătesc supă"], correctIndex: 1 },
      { type: "fill_blank", sentence: "Rumencede 'hobi' demek için ___ denir.", correctAnswer: "hobby", options: ["hobby", "vacanță", "serviciu", "examen"] },
      { type: "translation", sentence: "Satranç oynamayı öğreniyorum", direction: "tr-ro", correctAnswer: "Învăț să joc șah", acceptedAnswers: ["Învăț să joc șah", "învăț să joc șah"] },
      { type: "matching", pairs: [ { left: "Satranç", right: "Șah" }, { left: "Bisiklet", right: "Bicicletă" }, { left: "Koleksiyon", right: "Colecție" }, { left: "Kamp", right: "Camping" } ] },
    ],
  },
  "29": {
    id: "29",
    title: "Doğa ve Çevre",
    emoji: "🌿",
    description: "Doğayı tarif etme, çevreyle ilgili temel kelime ve ifadeleri öğren",
    xpReward: 30,
    exercises: [
      { type: "multiple_choice", question: '"Orman" Rumence hangisidir?', options: ["Râu", "Munte", "Pădure", "Lac"], correctIndex: 2 },
      { type: "matching", pairs: [ { left: "Ağaç", right: "Copac" }, { left: "Nehir", right: "Râu" }, { left: "Dağ", right: "Munte" }, { left: "Göl", right: "Lac" } ] },
      { type: "fill_blank", sentence: "La picnic trebuie să aruncăm gunoiul la ___ .", correctAnswer: "reciclare", options: ["reciclare", "stradă", "masă", "geantă"] },
      { type: "translation", sentence: "Aerul este foarte curat aici", direction: "ro-tr", correctAnswer: "Burada hava çok temiz", acceptedAnswers: ["Burada hava çok temiz", "burada hava çok temiz"] },
      { type: "multiple_choice", question: '"Su tasarrufu yapmalıyız" cümlesinin Rumencesi hangisi?', options: ["Trebuie să economisim apă", "Trebuie să cumpărăm apă", "Trebuie să încălzim apa", "Trebuie să turnăm apă"], correctIndex: 0 },
      { type: "fill_blank", sentence: "Rumencede 'çevre' demek için ___ denir.", correctAnswer: "mediu", options: ["mediu", "oraș", "stradă", "piață"] },
      { type: "translation", sentence: "Geri dönüşüm kutusu nerede?", direction: "tr-ro", correctAnswer: "Unde este coșul de reciclare?", acceptedAnswers: ["Unde este coșul de reciclare?", "unde este coșul de reciclare?"] },
      { type: "matching", pairs: [ { left: "Çiçek", right: "Floare" }, { left: "Toprak", right: "Sol" }, { left: "Yağmur", right: "Ploaie" }, { left: "Rüzgar", right: "Vânt" } ] },
    ],
  },
  "30": {
    id: "30",
    title: "Acil Durumlar",
    emoji: "🚨",
    description: "Acil durumlarda yardım isteme ve temel güvenlik ifadelerini öğren",
    xpReward: 35,
    exercises: [
      { type: "multiple_choice", question: '"Yardım edin!" Rumence nasıl söylenir?', options: ["Mulțumesc!", "Ajutor!", "Poftă bună!", "La revedere!"], correctIndex: 1 },
      { type: "matching", pairs: [ { left: "Polis", right: "Poliție" }, { left: "Ambulans", right: "Ambulanță" }, { left: "İtfaiye", right: "Pompieri" }, { left: "Hastane", right: "Spital" } ] },
      { type: "fill_blank", sentence: "În caz de urgență, trebuie să sunăm mai întâi la ___.", correctAnswer: "112", options: ["112", "prietenul meu", "vecinul", "restaurantul"] },
      { type: "translation", sentence: "Sunați la ambulanță, vă rog", direction: "ro-tr", correctAnswer: "Lütfen ambulans çağırın", acceptedAnswers: ["Lütfen ambulans çağırın", "lütfen ambulans çağırın"] },
      { type: "multiple_choice", question: '"Yangın var" ifadesinin Rumence karşılığı hangisi?', options: ["Este frig", "Este liniște", "Este incendiu", "Este târziu"], correctIndex: 2 },
      { type: "fill_blank", sentence: "Rumencede 'tehlike' demek için ___ denir.", correctAnswer: "pericol", options: ["pericol", "drum", "lecție", "muzică"] },
      { type: "translation", sentence: "Adresinizi söyleyin", direction: "tr-ro", correctAnswer: "Spuneți adresa dumneavoastră", acceptedAnswers: ["Spuneți adresa dumneavoastră", "spuneți adresa dumneavoastră"] },
      { type: "matching", pairs: [ { left: "Sakin ol", right: "Calmează-te" }, { left: "Bekle", right: "Așteaptă" }, { left: "Güvende", right: "În siguranță" }, { left: "Yaralı", right: "Rănit" } ] },
    ],
  },
  "31": {
    id: "31",
    title: "Kültür ve Gelenekler",
    emoji: "🏛️",
    description: "Kültürel etkinlikler, gelenekler ve sosyal alışkanlıklarla ilgili ifadeleri öğren",
    xpReward: 35,
    exercises: [
      { type: "multiple_choice", question: '"Bayram" Rumence hangisidir?', options: ["Muzeu", "Sărbătoare", "Piață", "Bibliotecă"], correctIndex: 1 },
      { type: "matching", pairs: [ { left: "Gelenek", right: "Tradiție" }, { left: "Düğün", right: "Nuntă" }, { left: "Misafir", right: "Oaspete" }, { left: "Festival", right: "Festival" } ] },
      { type: "fill_blank", sentence: "Când vin musafiri, este obicei să ___ ceai.", correctAnswer: "oferim", options: ["oferim", "ascundem", "uităm", "închidem"] },
      { type: "translation", sentence: "Respectăm tradițiile familiei", direction: "ro-tr", correctAnswer: "Aile geleneklerine saygı duyuyoruz", acceptedAnswers: ["Aile geleneklerine saygı duyuyoruz", "aile geleneklerine saygı duyuyoruz"] },
      { type: "multiple_choice", question: '"Müzeyi ziyaret ediyoruz" cümlesinin Rumencesi hangisi?', options: ["Vizităm muzeul", "Închidem muzeul", "Curățăm muzeul", "Vindem muzeul"], correctIndex: 0 },
      { type: "fill_blank", sentence: "Rumencede 'kültür' için ___ kelimesi kullanılır.", correctAnswer: "cultură", options: ["cultură", "mâncare", "meserie", "stradă"] },
      { type: "translation", sentence: "Bu festival her yıl düzenleniyor", direction: "tr-ro", correctAnswer: "Acest festival este organizat în fiecare an", acceptedAnswers: ["Acest festival este organizat în fiecare an", "acest festival este organizat în fiecare an"] },
      { type: "matching", pairs: [ { left: "Tiyatro", right: "Teatru" }, { left: "Konser", right: "Concert" }, { left: "Halk oyunu", right: "Dans popular" }, { left: "Sergi", right: "Expoziție" } ] },
    ],
  },
  "32": {
    id: "32",
    title: "Finans ve Banka",
    emoji: "💳",
    description: "Banka işlemleri, ödeme yöntemleri ve para yönetimiyle ilgili pratik cümleler kur",
    xpReward: 35,
    exercises: [
      { type: "multiple_choice", question: '"Hesap" için doğru Rumence kelime hangisi?', options: ["Cont", "Card", "Dobândă", "Bancnotă"], correctIndex: 0 },
      { type: "matching", pairs: [ { left: "Kredi kartı", right: "Card de credit" }, { left: "Nakit", right: "Numerar" }, { left: "Fatura", right: "Factură" }, { left: "Banka", right: "Bancă" } ] },
      { type: "fill_blank", sentence: "Astăzi voi deschide un ___ nou la bancă.", correctAnswer: "cont", options: ["cont", "geantă", "caiet", "bilet"] },
      { type: "translation", sentence: "Vreau să schimb bani", direction: "ro-tr", correctAnswer: "Para bozdurmak istiyorum", acceptedAnswers: ["Para bozdurmak istiyorum", "para bozdurmak istiyorum"] },
      { type: "multiple_choice", question: '"Temassız ödeme" Rumence nasıl söylenir?', options: ["Plată rapidă", "Plată fără contact", "Plată în numerar", "Plată de noapte"], correctIndex: 1 },
      { type: "fill_blank", sentence: "Rumencede 'faiz' demek için ___ denir.", correctAnswer: "dobândă", options: ["dobândă", "prieten", "lecție", "vacanță"] },
      { type: "translation", sentence: "Aylık bütçemi takip ediyorum", direction: "tr-ro", correctAnswer: "Îmi urmăresc bugetul lunar", acceptedAnswers: ["Îmi urmăresc bugetul lunar", "îmi urmăresc bugetul lunar"] },
      { type: "matching", pairs: [ { left: "Borç", right: "Datorie" }, { left: "Gelir", right: "Venit" }, { left: "Gider", right: "Cheltuială" }, { left: "Tasarruf", right: "Economie" } ] },
    ],
  },
  "33": {
    id: "33",
    title: "Dijital İletişim",
    emoji: "📱",
    description: "Mesajlaşma, çevrim içi toplantılar ve sosyal medya için günlük ifadeler öğren",
    xpReward: 35,
    exercises: [
      { type: "multiple_choice", question: '"Mesaj göndermek" Rumence hangisidir?', options: ["A trimite un mesaj", "A deschide ușa", "A face cumpărături", "A găti"], correctIndex: 0 },
      { type: "matching", pairs: [ { left: "Bağlantı", right: "Conexiune" }, { left: "Uygulama", right: "Aplicație" }, { left: "Şifre", right: "Parolă" }, { left: "Toplantı linki", right: "Link de întâlnire" } ] },
      { type: "fill_blank", sentence: "Înainte să înceapă ședința, nu uita să ___ microfonul.", correctAnswer: "pornești", options: ["pornești", "ștergi", "vinzi", "îngheți"] },
      { type: "translation", sentence: "Conexiunea la internet este lentă", direction: "ro-tr", correctAnswer: "İnternet bağlantısı yavaş", acceptedAnswers: ["İnternet bağlantısı yavaş", "internet bağlantısı yavaş"] },
      { type: "multiple_choice", question: '"Görüntülü arama yapalım" cümlesinin Rumencesi hangisi?', options: ["Să trimitem o scrisoare", "Să facem un apel video", "Să închidem telefonul", "Să ieșim afară"], correctIndex: 1 },
      { type: "fill_blank", sentence: "Rumencede 'bildirim' için ___ kelimesi kullanılır.", correctAnswer: "notificare", options: ["notificare", "fereastră", "pagină", "hartă"] },
      { type: "translation", sentence: "Şifremi yenilemem gerekiyor", direction: "tr-ro", correctAnswer: "Trebuie să-mi resetez parola", acceptedAnswers: ["Trebuie să-mi resetez parola", "trebuie să-mi resetez parola"] },
      { type: "matching", pairs: [ { left: "Ekran", right: "Ecran" }, { left: "Kamera", right: "Cameră" }, { left: "Kulaklık", right: "Căști" }, { left: "Dosya", right: "Fișier" } ] },
    ],
  },
  "34": {
    id: "34",
    title: "Sağlıklı Yaşam",
    emoji: "🥗",
    description: "Sağlıklı alışkanlıklar, beslenme ve egzersiz hakkında günlük cümleler kur",
    xpReward: 35,
    exercises: [
      { type: "multiple_choice", question: '"Düzenli egzersiz" ifadesinin Rumencesi hangisi?', options: ["Exercițiu regulat", "Mâncare rapidă", "Somn scurt", "Apă rece"], correctIndex: 0 },
      { type: "matching", pairs: [ { left: "Sebze", right: "Legumă" }, { left: "Meyve", right: "Fruct" }, { left: "Yürüyüş", right: "Plimbare" }, { left: "Uyku", right: "Somn" } ] },
      { type: "fill_blank", sentence: "În fiecare dimineață beau un pahar de ___ .", correctAnswer: "apă", options: ["apă", "zahăr", "ulei", "sare"] },
      { type: "translation", sentence: "Merg la sală de trei ori pe săptămână", direction: "ro-tr", correctAnswer: "Haftada üç kez spor salonuna gidiyorum", acceptedAnswers: ["Haftada üç kez spor salonuna gidiyorum", "haftada üç kez spor salonuna gidiyorum"] },
      { type: "multiple_choice", question: '"Şeker tüketimini azaltıyorum" cümlesinin Rumencesi hangisi?', options: ["Reduc consumul de zahăr", "Cresc consumul de zahăr", "Vând zahăr", "Cumpăr zahăr"], correctIndex: 0 },
      { type: "fill_blank", sentence: "Rumencede 'kalori' için ___ kelimesi kullanılır.", correctAnswer: "calorie", options: ["calorie", "lecție", "stradă", "familie"] },
      { type: "translation", sentence: "Akşamları erken uyumaya çalışıyorum", direction: "tr-ro", correctAnswer: "Seara încerc să mă culc devreme", acceptedAnswers: ["Seara încerc să mă culc devreme", "seara încerc să mă culc devreme"] },
      { type: "matching", pairs: [ { left: "Vitamin", right: "Vitamină" }, { left: "Protein", right: "Proteină" }, { left: "Diyet", right: "Dietă" }, { left: "Antrenman", right: "Antrenament" } ] },
    ],
  },
  "35": {
    id: "35",
    title: "Şehir Yaşamı",
    emoji: "🏙️",
    description: "Şehirde günlük hayat, hizmetler ve kamusal alanlarla ilgili ifadeleri öğren",
    xpReward: 40,
    exercises: [
      { type: "multiple_choice", question: '"Belediye" Rumence hangisidir?', options: ["Primărie", "Farmacie", "Piață", "Gară"], correctIndex: 0 },
      { type: "matching", pairs: [ { left: "Meydan", right: "Piață" }, { left: "İstasyon", right: "Stație" }, { left: "Kavşak", right: "Intersecție" }, { left: "Kaldırım", right: "Trotuar" } ] },
      { type: "fill_blank", sentence: "Pentru pașaport nou trebuie să merg la ___ .", correctAnswer: "primărie", options: ["primărie", "cafenea", "cinema", "plajă"] },
      { type: "translation", sentence: "Traficul este foarte aglomerat în centru", direction: "ro-tr", correctAnswer: "Merkezde trafik çok yoğun", acceptedAnswers: ["Merkezde trafik çok yoğun", "merkezde trafik çok yoğun"] },
      { type: "multiple_choice", question: '"Otobüs durağı biraz ileride" cümlesinin Rumencesi hangisi?', options: ["Stația de autobuz este puțin mai în față", "Autobuzul este în garaj", "Drumul este închis", "Biletul este scump"], correctIndex: 0 },
      { type: "fill_blank", sentence: "Rumencede 'mahalle' için ___ denir.", correctAnswer: "cartier", options: ["cartier", "fereastră", "restaurant", "expoziție"] },
      { type: "translation", sentence: "Şehir kartımı bugün yenilemem gerekiyor", direction: "tr-ro", correctAnswer: "Trebuie să-mi reînnoiesc cardul de oraș astăzi", acceptedAnswers: ["Trebuie să-mi reînnoiesc cardul de oraș astăzi", "trebuie să-mi reînnoiesc cardul de oraș astăzi"] },
      { type: "matching", pairs: [ { left: "Park", right: "Parc" }, { left: "Belediye otobüsü", right: "Autobuz municipal" }, { left: "Yaya geçidi", right: "Trecere de pietoni" }, { left: "Sokak lambası", right: "Lampă stradală" } ] },
    ],
  },
  "36": {
    id: "36",
    title: "İş Görüşmesi",
    emoji: "🧑‍💼",
    description: "İş görüşmelerinde kendini ifade etme ve profesyonel sorulara cevap verme pratiği yap",
    xpReward: 40,
    exercises: [
      { type: "multiple_choice", question: '"Özgeçmiş" için doğru Rumence kelime hangisi?', options: ["CV", "Contract", "Salariu", "Program"], correctIndex: 0 },
      { type: "matching", pairs: [ { left: "Deneyim", right: "Experiență" }, { left: "Maaş", right: "Salariu" }, { left: "Pozisyon", right: "Post" }, { left: "Referans", right: "Referință" } ] },
      { type: "fill_blank", sentence: "La interviu trebuie să vorbesc clar despre ___ mele.", correctAnswer: "abilitățile", options: ["abilitățile", "vacanțele", "hobby-urile", "vecinii"] },
      { type: "translation", sentence: "Care sunt punctele tale forte?", direction: "ro-tr", correctAnswer: "Güçlü yönlerin neler?", acceptedAnswers: ["Güçlü yönlerin neler?", "güçlü yönlerin neler?"] },
      { type: "multiple_choice", question: '"Takım çalışmasına yatkınım" cümlesinin Rumencesi hangisi?', options: ["Lucrez bine în echipă", "Nu îmi place munca", "Ajung mereu târziu", "Nu am experiență"], correctIndex: 0 },
      { type: "fill_blank", sentence: "Rumencede 'mülakat' için ___ kelimesi kullanılır.", correctAnswer: "interviu", options: ["interviu", "lecție", "bibliotecă", "stradă"] },
      { type: "translation", sentence: "Bu pozisyon için motiveyim", direction: "tr-ro", correctAnswer: "Sunt motivat(ă) pentru acest post", acceptedAnswers: ["Sunt motivat pentru acest post", "Sunt motivată pentru acest post", "sunt motivat pentru acest post", "sunt motivată pentru acest post", "Sunt motivat(ă) pentru acest post", "sunt motivat(ă) pentru acest post"] },
      { type: "matching", pairs: [ { left: "Toplantı", right: "Ședință" }, { left: "Sorumluluk", right: "Responsabilitate" }, { left: "Hedef", right: "Obiectiv" }, { left: "Zaman yönetimi", right: "Managementul timpului" } ] },
    ],
  },
  "37": {
    id: "37",
    title: "Evrak ve Resmi İşlemler",
    emoji: "🗂️",
    description: "Resmi kurumlarda sıra alma, form doldurma ve belge isteme kalıplarını öğren",
    xpReward: 45,
    exercises: [
      { type: "multiple_choice", question: '"Randevu almak" ifadesinin Rumencesi hangisi?', options: ["A lua o programare", "A pierde un dosar", "A închide ghișeul", "A plăti chiria"], correctIndex: 0 },
      { type: "matching", pairs: [ { left: "Belge", right: "Document" }, { left: "Başvuru formu", right: "Formular de cerere" }, { left: "Nüfus müdürlüğü", right: "Serviciul de evidență" }, { left: "İmza", right: "Semnătură" } ] },
      { type: "fill_blank", sentence: "Pentru acest dosar trebuie să aduc un ___ de naștere.", correctAnswer: "certificat", options: ["certificat", "autobuz", "meniu", "cadou"] },
      { type: "translation", sentence: "Gişede sıra numarası aldım", direction: "tr-ro", correctAnswer: "Am luat un număr de ordine la ghișeu", acceptedAnswers: ["Am luat un număr de ordine la ghișeu", "am luat un număr de ordine la ghișeu"] },
      { type: "multiple_choice", question: '"Bu formu eksiksiz doldurun" cümlesinin Rumencesi hangisi?', options: ["Completați acest formular în întregime", "Aruncați acest formular", "Semnați mâine", "Mergeți acasă acum"], correctIndex: 0 },
      { type: "fill_blank", sentence: "Rumencede 'makbuz' için ___ kelimesi kullanılır.", correctAnswer: "chitanță", options: ["chitanță", "vacanță", "pătură", "oglindă"] },
      { type: "translation", sentence: "Belgenin onaylı kopyasına ihtiyacım var", direction: "tr-ro", correctAnswer: "Am nevoie de o copie legalizată a documentului", acceptedAnswers: ["Am nevoie de o copie legalizată a documentului", "am nevoie de o copie legalizată a documentului"] },
      { type: "matching", pairs: [ { left: "Dilekçe", right: "Petiție" }, { left: "Başvuru", right: "Solicitare" }, { left: "Yetkili", right: "Funcționar" }, { left: "Randevu", right: "Programare" } ] },
    ],
  },
  "38": {
    id: "38",
    title: "Taşınma ve Komşuluk",
    emoji: "📦",
    description: "Yeni eve taşınma, apartman kuralları ve komşuluk iletişiminde kullanılan ifadeleri pekiştir",
    xpReward: 45,
    exercises: [
      { type: "multiple_choice", question: '"Kira sözleşmesi" Rumence hangisidir?', options: ["Contract de închiriere", "Bilet de tren", "Carte de vizită", "Program de lucru"], correctIndex: 0 },
      { type: "matching", pairs: [ { left: "Anahtar", right: "Cheie" }, { left: "Asansör", right: "Lift" }, { left: "Aidat", right: "Taxă de întreținere" }, { left: "Taşınma", right: "Mutare" } ] },
      { type: "fill_blank", sentence: "Mâine mă ___ într-un apartament nou.", correctAnswer: "mut", options: ["mut", "gătesc", "înot", "aștept"] },
      { type: "translation", sentence: "Komşuma taşındığımı haber verdim", direction: "tr-ro", correctAnswer: "L-am anunțat pe vecinul meu că m-am mutat", acceptedAnswers: ["L-am anunțat pe vecinul meu că m-am mutat", "l-am anunțat pe vecinul meu că m-am mutat"] },
      { type: "multiple_choice", question: '"Apartmanda gece sessiz olun" ifadesinin Rumencesi hangisi?', options: ["Păstrați liniștea noaptea în bloc", "Deschideți geamul imediat", "Parcați în fața intrării", "Lăsați ușa deschisă"], correctIndex: 0 },
      { type: "fill_blank", sentence: "Rumencede 'komşu' için ___ denir.", correctAnswer: "vecin", options: ["vecin", "doctor", "șofer", "poștaș"] },
      { type: "translation", sentence: "Taşınma günü için kamyonet kiraladık", direction: "tr-ro", correctAnswer: "Am închiriat o dubă pentru ziua mutării", acceptedAnswers: ["Am închiriat o dubă pentru ziua mutării", "am închiriat o dubă pentru ziua mutării"] },
      { type: "matching", pairs: [ { left: "Bina girişi", right: "Intrarea blocului" }, { left: "Posta kutusu", right: "Cutie poștală" }, { left: "Kapıcı", right: "Administrator" }, { left: "Kat", right: "Etaj" } ] },
    ],
  },
  "39": {
    id: "39",
    title: "İleri Seyahat Planlama",
    emoji: "🛫",
    description: "Aktarma, rezervasyon değişikliği ve seyahat sorunlarında daha ileri düzey cümleler kur",
    xpReward: 50,
    exercises: [
      { type: "multiple_choice", question: '"Aktarmalı uçuş" Rumence nasıl söylenir?', options: ["Zbor cu escală", "Drum fără hartă", "Bilet deschis", "Bagaj pierdut"], correctIndex: 0 },
      { type: "matching", pairs: [ { left: "Biniş kartı", right: "Carte de îmbarcare" }, { left: "Gecikme", right: "Întârziere" }, { left: "Terminal", right: "Terminal" }, { left: "Pasaport kontrolü", right: "Control pașapoarte" } ] },
      { type: "fill_blank", sentence: "Trebuie să schimb ___ pentru zborul de mâine.", correctAnswer: "rezervarea", options: ["rezervarea", "perdeaua", "cheia", "planta"] },
      { type: "translation", sentence: "Bağlantı uçuşumu kaçırdım", direction: "tr-ro", correctAnswer: "Am pierdut zborul de conexiune", acceptedAnswers: ["Am pierdut zborul de conexiune", "am pierdut zborul de conexiune"] },
      { type: "multiple_choice", question: '"Bagajım gelmedi" cümlesinin Rumencesi hangisi?', options: ["Bagajul meu nu a ajuns", "Bagajul meu este greu", "Bagajul meu este nou", "Bagajul meu este gol"], correctIndex: 0 },
      { type: "fill_blank", sentence: "Rumencede 'iptal' için ___ kelimesi kullanılır.", correctAnswer: "anulare", options: ["anulare", "plimbare", "culoare", "valoare"] },
      { type: "translation", sentence: "Rezervasyonumu bir gün ertelemek istiyorum", direction: "tr-ro", correctAnswer: "Vreau să amân rezervarea mea cu o zi", acceptedAnswers: ["Vreau să amân rezervarea mea cu o zi", "vreau să amân rezervarea mea cu o zi"] },
      { type: "matching", pairs: [ { left: "Kontuar", right: "Ghișeu" }, { left: "Varış", right: "Sosire" }, { left: "Kalkış", right: "Plecare" }, { left: "Transit alanı", right: "Zonă de tranzit" } ] },
    ],
  },
  "40": {
    id: "40",
    title: "Alfabe ve Telaffuz",
    emoji: "🔤",
    description: "Temel harfler ve doğru telaffuzla başlangıç seviyesinde okuma pratiği yap",
    xpReward: 15,
    exercises: [
      { type: "multiple_choice", question: '"Ș" harfi Türkçede hangi sese en yakındır?', options: ["s", "ş", "ç", "j"], correctIndex: 1 },
      { type: "fill_blank", sentence: "Rumencede 'çay' kelimesi ___ olarak yazılır.", correctAnswer: "ceai", options: ["ceai", "chai", "cei", "cey"] },
      { type: "translation", sentence: "Bu kelimeyi yavaşça tekrar eder misin?", direction: "tr-ro", correctAnswer: "Poți repeta acest cuvânt mai încet?", acceptedAnswers: ["Poți repeta acest cuvânt mai încet?", "poți repeta acest cuvânt mai încet?"] },
    ],
  },
  "41": {
    id: "41",
    title: "Kıyafetler",
    emoji: "👕",
    description: "Günlük kıyafet adları ve basit alışveriş cümleleri kur",
    xpReward: 20,
    exercises: [
      { type: "matching", pairs: [{ left: "Gömlek", right: "Cămașă" }, { left: "Pantolon", right: "Pantaloni" }, { left: "Ayakkabı", right: "Pantofi" }, { left: "Ceket", right: "Geacă" }] },
      { type: "multiple_choice", question: '"Bu tişört büyük" cümlesinin Rumencesi hangisi?', options: ["Acest tricou este mic", "Acest tricou este mare", "Acești pantaloni sunt noi", "Această geacă este veche"], correctIndex: 1 },
      { type: "translation", sentence: "Mavi bir kazak denemek istiyorum", direction: "tr-ro", correctAnswer: "Vreau să probez un pulover albastru", acceptedAnswers: ["Vreau să probez un pulover albastru", "vreau să probez un pulover albastru"] },
    ],
  },
  "42": {
    id: "42",
    title: "Evcil Hayvan Bakımı",
    emoji: "🐾",
    description: "Evcil hayvanlarla ilgili rutin bakım ve ihtiyaç ifadelerini öğren",
    xpReward: 20,
    exercises: [
      { type: "multiple_choice", question: '"Mama" için doğru Rumence kelime hangisi?', options: ["Hrană", "Leașă", "Cușcă", "Jucărie"], correctIndex: 0 },
      { type: "fill_blank", sentence: "Pisica mea her sabah ___ ister.", correctAnswer: "mâncare", options: ["mâncare", "harită", "culoare", "fereastră"] },
      { type: "translation", sentence: "Köpeği akşam yürüyüşüne çıkarıyorum", direction: "tr-ro", correctAnswer: "Scot câinele la plimbare seara", acceptedAnswers: ["Scot câinele la plimbare seara", "scot câinele la plimbare seara"] },
    ],
  },
  "43": {
    id: "43",
    title: "Tarih ve Saat",
    emoji: "🕒",
    description: "Saat sorma, tarih belirtme ve plan yapma kalıplarını pekiştir",
    xpReward: 25,
    exercises: [
      { type: "translation", sentence: "Toplantı saat dokuzda başlıyor", direction: "tr-ro", correctAnswer: "Ședința începe la ora nouă", acceptedAnswers: ["Ședința începe la ora nouă", "ședința începe la ora nouă"] },
      { type: "multiple_choice", question: '"Bugün ayın kaçı?" Rumence hangisi?', options: ["Cât este ceasul?", "Ce zi este azi?", "În ce lună suntem?", "În ce dată suntem azi?"], correctIndex: 3 },
      { type: "fill_blank", sentence: "Trenul ___ on beşte kalkıyor.", correctAnswer: "la ora", options: ["la ora", "de ora", "în ora", "pe ora"] },
    ],
  },
  "44": {
    id: "44",
    title: "Market Diyalogları",
    emoji: "🛒",
    description: "Market alışverişinde ürün sorma, miktar belirtme ve ödeme kalıplarını kullan",
    xpReward: 25,
    exercises: [
      { type: "multiple_choice", question: '"Bir kilo domates alabilir miyim?" cümlesinin Rumencesi hangisi?', options: ["Pot să iau un kilogram de roșii?", "Pot să vând un kilogram de roșii?", "Pot să gătesc roșii acum?", "Pot să las roșiile aici?"], correctIndex: 0 },
      { type: "matching", pairs: [{ left: "Kasiyer", right: "Casier" }, { left: "İndirim", right: "Reducere" }, { left: "Sepet", right: "Coș" }, { left: "Fiş", right: "Bon" }] },
      { type: "translation", sentence: "Kartla ödeme yapacağım", direction: "tr-ro", correctAnswer: "Voi plăti cu cardul", acceptedAnswers: ["Voi plăti cu cardul", "voi plăti cu cardul"] },
    ],
  },
  "45": {
    id: "45",
    title: "Haftalık Plan",
    emoji: "🗒️",
    description: "Haftalık görevleri ve randevuları anlatan orta seviye cümleler kur",
    xpReward: 30,
    exercises: [
      { type: "fill_blank", sentence: "Luni ___ la curs de limbă.", correctAnswer: "merg", options: ["merg", "mănânc", "citesc", "uit"] },
      { type: "translation", sentence: "Perşembe günü dişçi randevum var", direction: "tr-ro", correctAnswer: "Joi am programare la dentist", acceptedAnswers: ["Joi am programare la dentist", "joi am programare la dentist"] },
      { type: "multiple_choice", question: '"Hafta sonu ailemi ziyaret edeceğim" Rumence hangisi?', options: ["În weekend voi vizita familia mea", "În weekend uit familia mea", "În weekend scriu despre familie", "În weekend vând familia mea"], correctIndex: 0 },
    ],
  },
  "46": {
    id: "46",
    title: "Hastalık Belirtileri",
    emoji: "🤒",
    description: "Doktorla konuşurken belirtileri açık ve doğru ifade et",
    xpReward: 30,
    exercises: [
      { type: "multiple_choice", question: '"Ateşim var" ifadesinin Rumence karşılığı hangisi?', options: ["Am febră", "Am noroc", "Am timp", "Am drum"], correctIndex: 0 },
      { type: "translation", sentence: "Dünden beri başım dönüyor", direction: "tr-ro", correctAnswer: "De ieri am amețeli", acceptedAnswers: ["De ieri am amețeli", "de ieri am amețeli"] },
      { type: "fill_blank", sentence: "Doctorul mi-a spus să ___ mai mult.", correctAnswer: "mă odihnesc", options: ["mă odihnesc", "alerg", "zâmbesc", "cânt"] },
    ],
  },
  "47": {
    id: "47",
    title: "Otel İşlemleri",
    emoji: "🏨",
    description: "Rezervasyon, giriş-çıkış ve oda talepleri için gerekli kalıpları öğren",
    xpReward: 35,
    exercises: [
      { type: "translation", sentence: "Rezervasyonum Ali Yılmaz adına", direction: "tr-ro", correctAnswer: "Rezervarea mea este pe numele Ali Yılmaz", acceptedAnswers: ["Rezervarea mea este pe numele Ali Yılmaz", "rezervarea mea este pe numele ali yılmaz", "rezervarea mea este pe numele ali yılmaz"] },
      { type: "multiple_choice", question: '"Erken giriş mümkün mü?" Rumence hangisi?', options: ["Este posibil check-in devreme?", "Este posibil check-out târziu?", "Este posibilă o masă aici?", "Este posibil să schimb trenul?"], correctIndex: 0 },
      { type: "matching", pairs: [{ left: "Resepsiyon", right: "Recepție" }, { left: "Anahtar kart", right: "Cartelă de acces" }, { left: "Tek kişilik oda", right: "Cameră single" }, { left: "Kahvaltı dahil", right: "Mic dejun inclus" }] },
    ],
  },
  "48": {
    id: "48",
    title: "Toplantı İletişimi",
    emoji: "🧑‍💻",
    description: "Toplantı sırasında fikir belirtme, soru sorma ve netleştirme ifadeleri kullan",
    xpReward: 35,
    exercises: [
      { type: "multiple_choice", question: '"Bu konuda bir önerim var" cümlesinin Rumencesi hangisi?', options: ["Am o sugestie în această privință", "Am un bilet pentru această privință", "Am uitat această privință", "Am deschis această privință"], correctIndex: 0 },
      { type: "translation", sentence: "Sunumu toplantıdan sonra paylaşacağım", direction: "tr-ro", correctAnswer: "Voi trimite prezentarea după ședință", acceptedAnswers: ["Voi trimite prezentarea după ședință", "voi trimite prezentarea după ședință"] },
      { type: "fill_blank", sentence: "Puteți să ___ ultimul punct, vă rog?", correctAnswer: "clarificați", options: ["clarificați", "cântați", "aranjați", "închideți"] },
    ],
  },
  "49": {
    id: "49",
    title: "Sanat ve Edebiyat",
    emoji: "🎭",
    description: "Sanat eserleri hakkında yorum yap ve edebi metinlere dair görüş bildir",
    xpReward: 40,
    exercises: [
      { type: "translation", sentence: "Romanın dili oldukça etkileyiciydi", direction: "tr-ro", correctAnswer: "Limbajul romanului a fost foarte impresionant", acceptedAnswers: ["Limbajul romanului a fost foarte impresionant", "limbajul romanului a fost foarte impresionant"] },
      { type: "multiple_choice", question: '"Sahne tasarımı" için doğru Rumence ifade hangisi?', options: ["Design de scenă", "Design de stradă", "Design de birou", "Design de tren"], correctIndex: 0 },
      { type: "matching", pairs: [{ left: "Şiir", right: "Poezie" }, { left: "Roman", right: "Roman" }, { left: "Yazar", right: "Scriitor" }, { left: "Eleştiri", right: "Critică" }] },
    ],
  },
  "50": {
    id: "50",
    title: "Çevrim İçi Güvenlik",
    emoji: "🔐",
    description: "Dijital platformlarda güvenlik, gizlilik ve risk uyarılarıyla ilgili ifadeleri kullan",
    xpReward: 40,
    exercises: [
      { type: "multiple_choice", question: '"İki aşamalı doğrulama" Rumence hangisidir?', options: ["Verificare în doi pași", "Parolă simplă", "Conexiune lentă", "Mesaj public"], correctIndex: 0 },
      { type: "translation", sentence: "Bu bağlantı güvenilir görünmüyor", direction: "tr-ro", correctAnswer: "Acest link nu pare sigur", acceptedAnswers: ["Acest link nu pare sigur", "acest link nu pare sigur"] },
      { type: "fill_blank", sentence: "Nu trebuie să ___ parola cu nimeni.", correctAnswer: "partajezi", options: ["partajezi", "cumperi", "închizi", "arunci"] },
    ],
  },
  "51": {
    id: "51",
    title: "Kariyer Gelişimi",
    emoji: "📈",
    description: "Profesyonel hedefler, yetkinlikler ve gelişim planları hakkında konuş",
    xpReward: 45,
    exercises: [
      { type: "translation", sentence: "Bu yıl liderlik becerilerimi geliştirmeyi hedefliyorum", direction: "tr-ro", correctAnswer: "Anul acesta îmi propun să îmi dezvolt abilitățile de leadership", acceptedAnswers: ["Anul acesta îmi propun să îmi dezvolt abilitățile de leadership", "anul acesta îmi propun să îmi dezvolt abilitățile de leadership"] },
      { type: "multiple_choice", question: '"Uzmanlık alanım veri analizi" cümlesinin Rumencesi hangisi?', options: ["Domeniul meu de expertiză este analiza datelor", "Domeniul meu este pauza de masă", "Domeniul meu este muzica tare", "Domeniul meu este mersul pe jos"], correctIndex: 0 },
      { type: "fill_blank", sentence: "Pentru această poziție, experiența practică este foarte ___.", correctAnswer: "importantă", options: ["importantă", "lentă", "mică", "goală"] },
    ],
  },
  "52": {
    id: "52",
    title: "Akademik Sunum",
    emoji: "🎓",
    description: "Araştırma sunumu yaparken ileri düzey bağlaçlar ve resmi anlatım kalıpları kullan",
    xpReward: 50,
    exercises: [
      { type: "multiple_choice", question: '"Araştırmamızın amacı" ifadesinin doğru Rumencesi hangisi?', options: ["Scopul cercetării noastre", "Viteza cercetării noastre", "Vacanța cercetării noastre", "Culoarea cercetării noastre"], correctIndex: 0 },
      { type: "translation", sentence: "Sonuçlar hipotezimizi büyük ölçüde destekliyor", direction: "tr-ro", correctAnswer: "Rezultatele susțin în mare măsură ipoteza noastră", acceptedAnswers: ["Rezultatele susțin în mare măsură ipoteza noastră", "rezultatele susțin în mare măsură ipoteza noastră"] },
      { type: "fill_blank", sentence: "În concluzie, datele ___ o tendință clară.", correctAnswer: "indică", options: ["indică", "ascund", "uită", "evită"] },
    ],
  },
  "53": {
    id: "53",
    title: "Temel Sorular",
    emoji: "❓",
    description: "Günlük konuşmalarda sık kullanılan soru kalıplarını pekiştir",
    xpReward: 30,
    exercises: [
      { type: "multiple_choice", question: '"Nerede yaşıyorsun?" cümlesinin Rumencesi hangisi?', options: ["Unde locuiești?", "Când pleci?", "Ce mănânci?", "Cine vine?"], correctIndex: 0 },
      { type: "translation", sentence: "Ne zaman geliyorsun?", direction: "tr-ro", correctAnswer: "Când vii?", acceptedAnswers: ["Când vii?", "când vii?"] },
      { type: "fill_blank", sentence: "Rumencede 'Neden?' demek için ___ denir.", correctAnswer: "De ce", options: ["De ce", "Unde", "Cum", "Cine"] },
    ],
  },
  "54": {
    id: "54",
    title: "Ev Eşyaları",
    emoji: "🛋️",
    description: "Evdeki temel eşyaları ve konum bildiren ifadeleri öğren",
    xpReward: 30,
    exercises: [
      { type: "matching", pairs: [{ left: "Masa", right: "Masă" }, { left: "Sandalye", right: "Scaun" }, { left: "Dolap", right: "Dulap" }, { left: "Lamba", right: "Lampă" }] },
      { type: "translation", sentence: "Lamba masanın üstünde", direction: "tr-ro", correctAnswer: "Lampa este pe masă", acceptedAnswers: ["Lampa este pe masă", "lampa este pe masă"] },
      { type: "multiple_choice", question: '"Yatak" için doğru Rumence kelime hangisi?', options: ["Pat", "Perete", "Fereastră", "Cană"], correctIndex: 0 },
    ],
  },
  "55": {
    id: "55",
    title: "Doğadaki Hayvanlar",
    emoji: "🦊",
    description: "Vahşi hayvan adlarıyla basit cümleler kur",
    xpReward: 35,
    exercises: [
      { type: "multiple_choice", question: '"Tilki" Rumence hangisidir?', options: ["Lup", "Urs", "Vulpe", "Cerb"], correctIndex: 2 },
      { type: "fill_blank", sentence: "Rumencede 'ayı' için ___ denir.", correctAnswer: "urs", options: ["urs", "iepure", "pește", "cal"] },
      { type: "translation", sentence: "Ormanda bir kurt gördük", direction: "tr-ro", correctAnswer: "Am văzut un lup în pădure", acceptedAnswers: ["Am văzut un lup în pădure", "am văzut un lup în pădure"] },
    ],
  },
  "56": {
    id: "56",
    title: "Günlük Hava Tahmini",
    emoji: "🌦️",
    description: "Tahmin cümleleriyle hava durumunu ifade et",
    xpReward: 35,
    exercises: [
      { type: "translation", sentence: "Yarın yağmur bekleniyor", direction: "tr-ro", correctAnswer: "Mâine se așteaptă ploaie", acceptedAnswers: ["Mâine se așteaptă ploaie", "mâine se așteaptă ploaie"] },
      { type: "multiple_choice", question: '"Sıcaklık düşecek" cümlesinin Rumencesi hangisi?', options: ["Temperatura va crește", "Temperatura va scădea", "Temperatura rămâne", "Temperatura dispare"], correctIndex: 1 },
      { type: "fill_blank", sentence: "Cümleyi Rumence tamamla: Este posibil să ___ după-amiază.", correctAnswer: "ningă", options: ["ningă", "coacă", "citească", "asculte"] },
    ],
  },
  "57": {
    id: "57",
    title: "Pazar Alışverişi",
    emoji: "🥕",
    description: "Pazarda fiyat sorma ve miktar belirtme kalıplarını kullan",
    xpReward: 35,
    exercises: [
      { type: "multiple_choice", question: '"Bir kilo domates" Rumence nasıl söylenir?', options: ["Un litru de roșii", "Un kilogram de roșii", "O cutie de roșii", "Un pahar de roșii"], correctIndex: 1 },
      { type: "translation", sentence: "Bunlar çok taze görünüyor", direction: "tr-ro", correctAnswer: "Acestea par foarte proaspete", acceptedAnswers: ["Acestea par foarte proaspete", "acestea par foarte proaspete"] },
      { type: "fill_blank", sentence: "Cümleyi Rumence tamamla: Cât ___ un kilogram de cartofi?", correctAnswer: "costă", options: ["costă", "merge", "scrie", "așteaptă"] },
    ],
  },
  "58": {
    id: "58",
    title: "Hafta Sonu Planı",
    emoji: "🧩",
    description: "Plan yapma, davet etme ve öneri sunma ifadelerini geliştir",
    xpReward: 40,
    exercises: [
      { type: "translation", sentence: "Cumartesi sinemaya gidelim", direction: "tr-ro", correctAnswer: "Sâmbătă să mergem la cinema", acceptedAnswers: ["Sâmbătă să mergem la cinema", "sâmbătă să mergem la cinema"] },
      { type: "multiple_choice", question: '"Pazar günü müsait misin?" cümlesinin Rumencesi hangisi?', options: ["Ești ocupat luni?", "Ești liber duminică?", "Vii mâine dimineață?", "Pleci în vacanță?"], correctIndex: 1 },
      { type: "fill_blank", sentence: "Cümleyi Rumence tamamla: Putem să ne ___ în parc la ora cinci.", correctAnswer: "întâlnim", options: ["întâlnim", "închidem", "uităm", "plecăm"] },
    ],
  },
  "59": {
    id: "59",
    title: "Sağlık Randevusu",
    emoji: "🩺",
    description: "Doktor randevusu alma ve temel şikayetleri anlatma cümleleri kur",
    xpReward: 40,
    exercises: [
      { type: "multiple_choice", question: '"Yarın için randevu almak istiyorum" cümlesinin Rumencesi hangisi?', options: ["Vreau să anulez consultația", "Vreau să fac o programare pentru mâine", "Vreau să cumpăr medicamente", "Vreau să plec acasă"], correctIndex: 1 },
      { type: "translation", sentence: "Dün geceden beri ateşim var", direction: "tr-ro", correctAnswer: "Am febră de aseară", acceptedAnswers: ["Am febră de aseară", "am febră de aseară"] },
      { type: "fill_blank", sentence: "Cümleyi Rumence tamamla: Mă doare foarte tare ___.", correctAnswer: "gâtul", options: ["gâtul", "ceasul", "scaunul", "drumul"] },
    ],
  },
  "60": {
    id: "60",
    title: "Havaalanında",
    emoji: "🛄",
    description: "Uçuş öncesi işlemler ve bagajla ilgili cümleleri pekiştir",
    xpReward: 40,
    exercises: [
      { type: "translation", sentence: "Check-in nerede yapılıyor?", direction: "tr-ro", correctAnswer: "Unde se face check-in-ul?", acceptedAnswers: ["Unde se face check-in-ul?", "unde se face check-in-ul?"] },
      { type: "multiple_choice", question: '"El bagajı" için doğru Rumence ifade hangisi?', options: ["Bagaj de mână", "Bagaj de cală", "Bilet de intrare", "Număr de poartă"], correctIndex: 0 },
      { type: "fill_blank", sentence: "Cümleyi Rumence tamamla: Zborul nostru ___ de la poarta 12.", correctAnswer: "pleacă", options: ["pleacă", "doarme", "mănâncă", "scrie"] },
    ],
  },
  "61": {
    id: "61",
    title: "Proje Yönetimi",
    emoji: "📋",
    description: "İş planı, teslim tarihi ve görev dağılımı hakkında konuş",
    xpReward: 45,
    exercises: [
      { type: "multiple_choice", question: '"Teslim tarihi" Rumence hangisidir?', options: ["Termen limită", "Pauză de cafea", "Zi liberă", "Plan de vacanță"], correctIndex: 0 },
      { type: "translation", sentence: "Bu görevi haftaya kadar tamamlayacağım", direction: "tr-ro", correctAnswer: "Voi finaliza această sarcină până săptămâna viitoare", acceptedAnswers: ["Voi finaliza această sarcină până săptămâna viitoare", "voi finaliza această sarcină până săptămâna viitoare"] },
      { type: "fill_blank", sentence: "Trebuie să ___ responsabilitățile în echipă.", correctAnswer: "împărțim", options: ["împărțim", "uităm", "spălăm", "închidem"] },
    ],
  },
  "62": {
    id: "62",
    title: "Film ve Yorum",
    emoji: "🎬",
    description: "Film izleme deneyimi hakkında detaylı yorum yap",
    xpReward: 45,
    exercises: [
      { type: "translation", sentence: "Filmin sonu beni şaşırttı", direction: "tr-ro", correctAnswer: "Finalul filmului m-a surprins", acceptedAnswers: ["Finalul filmului m-a surprins", "finalul filmului m-a surprins"] },
      { type: "multiple_choice", question: '"Oyunculuk çok başarılıydı" cümlesinin Rumencesi hangisi?', options: ["Decorul a fost mic", "Actorii au fost foarte buni", "Sunetul a fost slab", "Filmul a fost scurt"], correctIndex: 1 },
      { type: "fill_blank", sentence: "Mi-a plăcut mai ales ___ principal.", correctAnswer: "personajul", options: ["personajul", "drumul", "telefonul", "meniul"] },
    ],
  },
  "63": {
    id: "63",
    title: "Medya Okuryazarlığı",
    emoji: "🗞️",
    description: "Haber kaynaklarını değerlendirme ve bilgi doğrulama ifadeleri kullan",
    xpReward: 45,
    exercises: [
      { type: "multiple_choice", question: '"Bu haberi doğrulamamız gerekiyor" cümlesinin Rumencesi hangisi?', options: ["Trebuie să verificăm această știre", "Trebuie să ignorăm această știre", "Trebuie să ștergem această știre", "Trebuie să desenăm această știre"], correctIndex: 0 },
      { type: "translation", sentence: "Kaynağı güvenilir görünmüyor", direction: "tr-ro", correctAnswer: "Sursa nu pare de încredere", acceptedAnswers: ["Sursa nu pare de încredere", "sursa nu pare de încredere"] },
      { type: "fill_blank", sentence: "Înainte să distribuim, trebuie să ___ informația.", correctAnswer: "confirmăm", options: ["confirmăm", "amânăm", "uităm", "închidem"] },
    ],
  },
  "64": {
    id: "64",
    title: "Mentorluk",
    emoji: "🧠",
    description: "Geri bildirim verme ve gelişim önerileri sunma dilini güçlendir",
    xpReward: 50,
    exercises: [
      { type: "translation", sentence: "Güçlü yönlerini daha çok öne çıkarabilirsin", direction: "tr-ro", correctAnswer: "Poți evidenția mai mult punctele tale forte", acceptedAnswers: ["Poți evidenția mai mult punctele tale forte", "poți evidenția mai mult punctele tale forte"] },
      { type: "multiple_choice", question: '"Düzenli pratik yapmak önemli" cümlesinin Rumencesi hangisi?', options: ["Este important să exersezi regulat", "Este important să dormi puțin", "Este important să vorbești rar", "Este important să întârzii"], correctIndex: 0 },
      { type: "fill_blank", sentence: "Îți recomand să ___ obiective clare.", correctAnswer: "stabilești", options: ["stabilești", "pierzi", "ascunzi", "uiți"] },
    ],
  },
  "65": {
    id: "65",
    title: "Akademik Yazışma",
    emoji: "✉️",
    description: "Resmi e-posta yazımında akademik üslup ve netlik kazan",
    xpReward: 50,
    exercises: [
      { type: "multiple_choice", question: '"Sayın hocam" ifadesinin uygun Rumence karşılığı hangisi?', options: ["Stimate domnule profesor", "Dragă prietene", "Salut vecine", "Bună tuturor"], correctIndex: 0 },
      { type: "translation", sentence: "E-postanıza en kısa sürede yanıt vereceğim", direction: "tr-ro", correctAnswer: "Voi răspunde la e-mailul dumneavoastră cât mai curând", acceptedAnswers: ["Voi răspunde la e-mailul dumneavoastră cât mai curând", "voi răspunde la e-mailul dumneavoastră cât mai curând"] },
      { type: "fill_blank", sentence: "Vă atașez ___ solicitat pentru evaluare.", correctAnswer: "documentul", options: ["documentul", "biletul", "fructul", "tabloul"] },
    ],
  },
  "66": {
    id: "66",
    title: "Acil Serviste",
    emoji: "🏥",
    description: "Acil durumda semptom anlatma ve yardım isteme kalıplarını öğren",
    xpReward: 40,
    exercises: [
      { type: "multiple_choice", question: '"Nefes almakta zorlanıyorum" cümlesinin Rumencesi hangisi?', options: ["Pot să alerg repede", "Am dificultăți de respirație", "Mi-e sete", "Dorm foarte bine"], correctIndex: 1 },
      { type: "translation", sentence: "Lütfen hemen bir doktor çağırın", direction: "tr-ro", correctAnswer: "Vă rog, chemați imediat un doctor", acceptedAnswers: ["Vă rog, chemați imediat un doctor", "vă rog, chemați imediat un doctor"] },
      { type: "fill_blank", sentence: "Cümleyi Rumence tamamla: Am nevoie de ___ medical urgent.", correctAnswer: "ajutor", options: ["ajutor", "transport", "ceai", "pauză"] },
    ],
  },
  "67": {
    id: "67",
    title: "Tren Yolculuğu",
    emoji: "🚆",
    description: "Tren bileti alma, peron sorma ve yolculuk diyaloglarını geliştir",
    xpReward: 40,
    exercises: [
      { type: "translation", sentence: "Bükreş'e giden bir bilet istiyorum", direction: "tr-ro", correctAnswer: "Doresc un bilet către București", acceptedAnswers: ["Doresc un bilet către București", "doresc un bilet către bucurești"] },
      { type: "multiple_choice", question: '"Tren kaçta kalkıyor?" cümlesinin Rumencesi hangisi?', options: ["La ce oră pleacă trenul?", "Unde este autobuzul?", "Când vine taxiul?", "Cât costă avionul?"], correctIndex: 0 },
      { type: "fill_blank", sentence: "Cümleyi Rumence tamamla: Peronul trenului este la linia ___.", correctAnswer: "trei", options: ["trei", "frig", "mare", "lung"] },
    ],
  },

  "68": {
    id: "68",
    title: "Eczanede İlaç Alma",
    emoji: "💊",
    description: "Eczanede ilaç isteme, doz sorma ve kullanım talimatı anlama pratiği yap",
    xpReward: 40,
    exercises: [
      { type: "multiple_choice", question: '"Boğaz ağrısı için bir ilaç istiyorum" cümlesinin Rumencesi hangisi?', options: ["Doresc un medicament pentru durere în gât", "Doresc un bilet pentru tren", "Doresc o cameră la hotel", "Doresc un suc rece"], correctIndex: 0 },
      { type: "translation", sentence: "Bu ilacı günde iki kez almalısınız", direction: "tr-ro", correctAnswer: "Trebuie să luați acest medicament de două ori pe zi", acceptedAnswers: ["Trebuie să luați acest medicament de două ori pe zi", "trebuie să luați acest medicament de două ori pe zi"] },
      { type: "fill_blank", sentence: "Cümleyi Rumence tamamla: Luați pastila după ___ .", correctAnswer: "masă", options: ["masă", "drum", "film", "tren"] },
    ],
  },
  "69": {
    id: "69",
    title: "Kontrol Muayenesi",
    emoji: "🩻",
    description: "Kontrol randevusunda şikayetleri güncelleme ve doktor önerilerini anlama becerisi kazan",
    xpReward: 40,
    exercises: [
      { type: "translation", sentence: "Kendimi daha iyi hissediyorum ama hâlâ öksürüyorum", direction: "tr-ro", correctAnswer: "Mă simt mai bine, dar încă tușesc", acceptedAnswers: ["Mă simt mai bine, dar încă tușesc", "mă simt mai bine, dar încă tușesc"] },
      { type: "multiple_choice", question: '"İki hafta sonra tekrar kontrole gelin" cümlesinin Rumencesi hangisi?', options: ["Reveniți la control peste două săptămâni", "Plecați imediat acasă", "Nu mai este nevoie de tratament", "Mergeți la gară acum"], correctIndex: 0 },
      { type: "fill_blank", sentence: "Cümleyi Rumence tamamla: Doctorul mi-a recomandat să ___ mai mult.", correctAnswer: "odihnesc", options: ["odihnesc", "alerg", "strig", "uit"] },
    ],
  },
  "70": {
    id: "70",
    title: "Pasaport Kontrolü",
    emoji: "🛂",
    description: "Sınır kapısında belge sunma, soruları yanıtlama ve yönlendirmeleri anlama",
    xpReward: 40,
    exercises: [
      { type: "multiple_choice", question: '"Ziyaret amacım turizm" cümlesinin Rumencesi hangisi?', options: ["Scopul vizitei mele este turismul", "Scopul vizitei mele este medicina", "Scopul vizitei mele este școala", "Scopul vizitei mele este sportul"], correctIndex: 0 },
      { type: "translation", sentence: "Burada üç gün kalacağım", direction: "tr-ro", correctAnswer: "Voi sta aici trei zile", acceptedAnswers: ["Voi sta aici trei zile", "voi sta aici trei zile"] },
      { type: "fill_blank", sentence: "Cümleyi Rumence tamamla: Vă rog să îmi arătați ___.", correctAnswer: "pașaportul", options: ["pașaportul", "telefonul", "meniul", "caietul"] },
    ],
  },
  "71": {
    id: "71",
    title: "Araç Kiralama",
    emoji: "🚗",
    description: "Araç kiralama ofisinde rezervasyon, sigorta ve teslim detaylarını konuş",
    xpReward: 40,
    exercises: [
      { type: "translation", sentence: "Üç günlüğüne otomatik bir araç kiralamak istiyorum", direction: "tr-ro", correctAnswer: "Doresc să închiriez o mașină automată pentru trei zile", acceptedAnswers: ["Doresc să închiriez o mașină automată pentru trei zile", "doresc să închiriez o mașină automată pentru trei zile"] },
      { type: "multiple_choice", question: '"Sigorta fiyata dahil mi?" cümlesinin Rumencesi hangisi?', options: ["Asigurarea este inclusă în preț?", "Benzina este albastră?", "Mașina este foarte veche?", "Trenul vine la timp?"], correctIndex: 0 },
      { type: "fill_blank", sentence: "Cümleyi Rumence tamamla: Trebuie să returnez mașina până la ora ___.", correctAnswer: "zece", options: ["zece", "mare", "rapid", "ușor"] },
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
      sentence: "Rumencede 'kahve' demek için ___ denir.",
      correctAnswer: "cafea",
      options: ["cafea", "ceai", "lapte", "apă"],
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
      question: '"Kedi" Rumence hangisidir?',
      options: ["Câine", "Pisică", "Pasăre", "Pește"],
      correctIndex: 1,
      hint: "kedi = pisică",
    },
  ],
  "9": [
    {
      type: "fill_blank",
      sentence: "Rumencede 'öğretmen' demek için ___ denir.",
      correctAnswer: "profesor",
      options: ["profesor", "medic", "avocat", "inginer"],
      hint: "Meslek + Rumence karşılığı",
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
      question: '"Kış" Rumence hangisidir?',
      options: ["Primăvară", "Vară", "Toamnă", "Iarnă"],
      correctIndex: 3,
      hint: "iarnă = kış",
    },
  ],
  "12": [
    {
      type: "fill_blank",
      sentence: "Rumencede 'rüzgarlı' demek için ___ denir.",
      correctAnswer: "vântos",
      options: ["vântos", "ploios", "însorit", "noros"],
      hint: "Hava durumu sıfatı",
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
      question: '"Tren istasyonu" Rumence ne?',
      options: ["Stație de autobuz", "Gară", "Aeroport", "Metrou"],
      correctIndex: 1,
      hint: "gară = tren istasyonu",
    },
  ],
  "15": [
    {
      type: "fill_blank",
      sentence: "Rumencede 'banyo' demek için ___ denir.",
      correctAnswer: "baie",
      options: ["baie", "bucătărie", "dormitor", "balcon"],
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
      sentence: "Rumencede 'uyumak' demek için ___ denir.",
      correctAnswer: "a dormi",
      options: ["a dormi", "a mânca", "a merge", "a citi"],
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
      question: '"Köşeden sola dön" ifadesinin Rumencesi hangisi?',
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

  "21": [
    {
      type: "translation",
      sentence: "Bugün biraz kaygılı hissediyorum",
      direction: "tr-ro",
      correctAnswer: "Astăzi mă simt puțin anxios/anxioasă",
      acceptedAnswers: ["Astăzi mă simt puțin anxios", "Astăzi mă simt puțin anxioasă", "astăzi mă simt puțin anxios", "astăzi mă simt puțin anxioasă"],
      hint: "mă simt = hissediyorum",
    },
  ],
  "22": [
    {
      type: "multiple_choice",
      question: '"Mă doare spatele" Türkçede ne demek?',
      options: ["Sırtım ağrıyor", "Başım ağrıyor", "Kolum ağrıyor", "Karnım ağrıyor"],
      correctIndex: 0,
      hint: "spate = sırt",
    },
  ],
  "23": [
    {
      type: "fill_blank",
      sentence: "Rumencede 'gitmek' demek için ___ denir.",
      correctAnswer: "a merge",
      options: ["a merge", "a dormi", "a aștepta", "a cânta"],
      hint: "Seyahat ve yön fiilleri",
    },
  ],
  "24": [
    {
      type: "translation",
      sentence: "İlacı günde iki kez al",
      direction: "tr-ro",
      correctAnswer: "Ia medicamentul de două ori pe zi",
      acceptedAnswers: ["Ia medicamentul de două ori pe zi", "ia medicamentul de două ori pe zi"],
      hint: "de două ori pe zi = günde iki kez",
    },
  ],
  "25": [
    {
      type: "multiple_choice",
      question: '"Parolamı unuttum" cümlesinin Rumencesi hangisi?',
      options: ["Am uitat parola", "Am trimis parola", "Am găsit parola", "Am schimbat parola"],
      correctIndex: 0,
      hint: "a uita = unutmak",
    },
  ],
  "26": [
    {
      type: "fill_blank",
      sentence: "Rumencede 'kontrol etmek' demek için ___ denir.",
      correctAnswer: "a verifica",
      options: ["a verifica", "a semna", "a trimite", "a șterge"],
      hint: "Ofis ve iş fiilleri",
    },
  ],
  "27": [
    {
      type: "translation",
      sentence: "Sınav haftasında çok çalışıyorum",
      direction: "tr-ro",
      correctAnswer: "În săptămâna examenelor învăț mult",
      acceptedAnswers: ["În săptămâna examenelor învăț mult", "în săptămâna examenelor învăț mult"],
      hint: "învăț mult = çok çalışıyorum",
    },
  ],
  "28": [
    {
      type: "multiple_choice",
      question: '"A picta" fiilinin Türkçesi hangisi?',
      options: ["Resim yapmak", "Dans etmek", "Yüzmek", "Koşmak"],
      correctIndex: 0,
      hint: "Hobi fiilleri",
    },
  ],
  "29": [
    {
      type: "fill_blank",
      sentence: "Rumencede 'azaltmak' demek için ___ denir.",
      correctAnswer: "a reduce",
      options: ["a reduce", "a crește", "a uita", "a arunca"],
      hint: "Çevre bağlamında kullanılan temel fiiller",
    },
  ],
  "30": [
    {
      type: "translation",
      sentence: "Lütfen sakin olun ve bekleyin",
      direction: "tr-ro",
      correctAnswer: "Vă rog să rămâneți calm și să așteptați",
      acceptedAnswers: ["Vă rog să rămâneți calm și să așteptați", "vă rog să rămâneți calm și să așteptați"],
      hint: "Acil durum yönlendirme cümlesi",
    },
  ],
};

for (const [lessonId, extraExercises] of Object.entries(level2To6SupplementalExercises)) {
  lessonsData[lessonId]?.exercises.push(...extraExercises);
}

const normalizeForSpeechMatch = (value: string) =>
  value
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .replace(/[^\p{L}\p{N}\s]/gu, " ")
    .replace(/\s+/g, " ")
    .trim()
    .toLowerCase();

function createListenAndRepeatExercise(lessonId: string): ListenAndRepeatExercise | null {
  const lesson = lessonsData[lessonId];
  if (!lesson) return null;

  const translationExercise = lesson.exercises.find((exercise) => exercise.type === "translation");
  if (translationExercise) {
    const phrase = translationExercise.direction === "tr-ro" ? translationExercise.correctAnswer : translationExercise.sentence;
    const acceptedAnswers = Array.from(new Set([phrase, ...translationExercise.acceptedAnswers].map(normalizeForSpeechMatch)));
    return {
      type: "listen_and_repeat",
      prompt: "Duyduğunu sesli tekrar et",
      phrase,
      acceptedAnswers,
      hint: "Önce sesi dinle, sonra mikrofona aynı cümleyi söyle.",
    };
  }

  const listeningExercise = lesson.exercises.find((exercise) => exercise.type === "listening");
  if (!listeningExercise) return null;

  return {
    type: "listen_and_repeat",
    prompt: "Duyduğunu sesli tekrar et",
    phrase: listeningExercise.word,
    acceptedAnswers: [normalizeForSpeechMatch(listeningExercise.word)],
    hint: "Telaffuzu net ve yavaş söylemeyi dene.",
  };
}

for (const catalogLesson of lessonCatalog) {
  if (catalogLesson.level < 5) {
    continue;
  }

  const lesson = lessonsData[catalogLesson.id];
  if (!lesson || lesson.exercises.some((exercise) => exercise.type === "listen_and_repeat")) {
    continue;
  }

  const listenAndRepeatExercise = createListenAndRepeatExercise(catalogLesson.id);
  if (listenAndRepeatExercise) {
    lesson.exercises.push(listenAndRepeatExercise);
  }
}
