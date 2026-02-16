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
  direction: "tr-en" | "en-tr";
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
        options: ["Goodbye", "Hello", "Thank you", "Please"],
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
        sentence: "Good morning",
        direction: "en-tr",
        correctAnswer: "Günaydın",
        acceptedAnswers: ["Günaydın", "günaydın"],
      },
      {
        type: "multiple_choice",
        question: '"Hoşça kal" ne demek?',
        options: ["Hello", "Good night", "Goodbye", "See you"],
        correctIndex: 2,
      },
      {
        type: "matching",
        pairs: [
          { left: "Merhaba", right: "Hello" },
          { left: "Günaydın", right: "Good morning" },
          { left: "İyi akşamlar", right: "Good evening" },
          { left: "İyi geceler", right: "Good night" },
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
        direction: "tr-en",
        correctAnswer: "Good evening",
        acceptedAnswers: ["Good evening", "good evening"],
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
        options: ["I am fine", "My name is Ali", "I like Ali", "Ali is here"],
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
        sentence: "What is your name?",
        direction: "en-tr",
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
          { left: "Adın ne?", right: "What's your name?" },
          { left: "Memnun oldum", right: "Nice to meet you" },
          { left: "Nerelisin?", right: "Where are you from?" },
          { left: "Ben Türküm", right: "I am Turkish" },
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
        direction: "tr-en",
        correctAnswer: "I am from Istanbul",
        acceptedAnswers: ["I am from Istanbul", "I come from Istanbul", "I'm from Istanbul"],
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
        sentence: "twelve",
        direction: "en-tr",
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
        direction: "tr-en",
        correctAnswer: "seventeen",
        acceptedAnswers: ["seventeen", "Seventeen", "17"],
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
          { left: "Kırmızı", right: "Red" },
          { left: "Mavi", right: "Blue" },
          { left: "Yeşil", right: "Green" },
          { left: "Sarı", right: "Yellow" },
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
        sentence: "White",
        direction: "en-tr",
        correctAnswer: "Beyaz",
        acceptedAnswers: ["Beyaz", "beyaz"],
      },
      {
        type: "multiple_choice",
        question: '🟡 "Sarı" İngilizce ne?',
        options: ["Orange", "Yellow", "Gold", "Brown"],
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
          { left: "Siyah", right: "Black" },
          { left: "Beyaz", right: "White" },
          { left: "Turuncu", right: "Orange" },
          { left: "Mor", right: "Purple" },
        ],
      },
      {
        type: "translation",
        sentence: "Pembe",
        direction: "tr-en",
        correctAnswer: "Pink",
        acceptedAnswers: ["Pink", "pink"],
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
        options: ["Water", "Bread", "Cheese", "Milk"],
        correctIndex: 1,
      },
      {
        type: "matching",
        pairs: [
          { left: "Ekmek", right: "Bread" },
          { left: "Peynir", right: "Cheese" },
          { left: "Elma", right: "Apple" },
          { left: "Tavuk", right: "Chicken" },
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
        sentence: "I eat rice",
        direction: "en-tr",
        correctAnswer: "Pilav yerim",
        acceptedAnswers: ["Pilav yerim", "Ben pilav yerim", "pilav yerim"],
      },
      {
        type: "multiple_choice",
        question: '"Çorba" ne demek?',
        options: ["Salad", "Soup", "Dessert", "Meat"],
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
          { left: "Çorba", right: "Soup" },
          { left: "Pilav", right: "Rice" },
          { left: "Salata", right: "Salad" },
          { left: "Bal", right: "Honey" },
        ],
      },
      {
        type: "translation",
        sentence: "Peynir",
        direction: "tr-en",
        correctAnswer: "Cheese",
        acceptedAnswers: ["Cheese", "cheese"],
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
        options: ["Tea", "Coffee", "Water", "Juice"],
        correctIndex: 2,
      },
      {
        type: "matching",
        pairs: [
          { left: "Su", right: "Water" },
          { left: "Çay", right: "Tea" },
          { left: "Kahve", right: "Coffee" },
          { left: "Süt", right: "Milk" },
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
        sentence: "I drink coffee",
        direction: "en-tr",
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
        direction: "tr-en",
        correctAnswer: "Fruit juice",
        acceptedAnswers: ["Fruit juice", "fruit juice", "Juice", "juice"],
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
        options: ["Father", "Mother", "Sister", "Brother"],
        correctIndex: 1,
      },
      {
        type: "matching",
        pairs: [
          { left: "Anne", right: "Mother" },
          { left: "Baba", right: "Father" },
          { left: "Kardeş", right: "Sibling" },
          { left: "Dede", right: "Grandfather" },
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
        sentence: "My father",
        direction: "en-tr",
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
          { left: "Abla", right: "Elder sister" },
          { left: "Ağabey", right: "Elder brother" },
          { left: "Teyze", right: "Aunt (maternal)" },
          { left: "Amca", right: "Uncle (paternal)" },
        ],
      },
      {
        type: "translation",
        sentence: "Kardeşim",
        direction: "tr-en",
        correctAnswer: "My sibling",
        acceptedAnswers: ["My sibling", "My brother", "My sister", "my sibling"],
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
        options: ["Dog", "Cat", "Bird", "Fish"],
        correctIndex: 1,
      },
      {
        type: "matching",
        pairs: [
          { left: "Kedi", right: "Cat" },
          { left: "Köpek", right: "Dog" },
          { left: "Kuş", right: "Bird" },
          { left: "Balık", right: "Fish" },
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
        sentence: "Horse",
        direction: "en-tr",
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
        direction: "tr-en",
        correctAnswer: "Turtle",
        acceptedAnswers: ["Turtle", "turtle", "Tortoise", "tortoise"],
      },
      {
        type: "matching",
        pairs: [
          { left: "At", right: "Horse" },
          { left: "İnek", right: "Cow" },
          { left: "Tavuk", right: "Chicken" },
          { left: "Koyun", right: "Sheep" },
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
        options: ["Teacher", "Doctor", "Engineer", "Lawyer"],
        correctIndex: 1,
      },
      {
        type: "matching",
        pairs: [
          { left: "Doktor", right: "Doctor" },
          { left: "Öğretmen", right: "Teacher" },
          { left: "Mühendis", right: "Engineer" },
          { left: "Avukat", right: "Lawyer" },
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
        sentence: "I am a student",
        direction: "en-tr",
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
        direction: "tr-en",
        correctAnswer: "Nurse",
        acceptedAnswers: ["Nurse", "nurse"],
      },
      {
        type: "matching",
        pairs: [
          { left: "Aşçı", right: "Chef" },
          { left: "Pilot", right: "Pilot" },
          { left: "Şoför", right: "Driver" },
          { left: "Hemşire", right: "Nurse" },
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
          { left: "Pazartesi", right: "Monday" },
          { left: "Çarşamba", right: "Wednesday" },
          { left: "Cuma", right: "Friday" },
          { left: "Pazar", right: "Sunday" },
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
        sentence: "Thursday",
        direction: "en-tr",
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
        direction: "tr-en",
        correctAnswer: "Tuesday",
        acceptedAnswers: ["Tuesday", "tuesday"],
      },
      {
        type: "matching",
        pairs: [
          { left: "Salı", right: "Tuesday" },
          { left: "Perşembe", right: "Thursday" },
          { left: "Cumartesi", right: "Saturday" },
          { left: "Pazartesi", right: "Monday" },
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
        options: ["Summer", "Autumn", "Spring", "Winter"],
        correctIndex: 2,
      },
      {
        type: "matching",
        pairs: [
          { left: "İlkbahar", right: "Spring" },
          { left: "Yaz", right: "Summer" },
          { left: "Sonbahar", right: "Autumn" },
          { left: "Kış", right: "Winter" },
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
        sentence: "Summer",
        direction: "en-tr",
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
        direction: "tr-en",
        correctAnswer: "Autumn",
        acceptedAnswers: ["Autumn", "autumn", "Fall", "fall"],
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
        options: ["Rainy", "Cloudy", "Sunny", "Windy"],
        correctIndex: 2,
      },
      {
        type: "matching",
        pairs: [
          { left: "Güneşli", right: "Sunny" },
          { left: "Yağmurlu", right: "Rainy" },
          { left: "Bulutlu", right: "Cloudy" },
          { left: "Karlı", right: "Snowy" },
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
        sentence: "It is raining",
        direction: "en-tr",
        correctAnswer: "Yağmur yağıyor",
        acceptedAnswers: ["Yağmur yağıyor", "yağmur yağıyor"],
      },
      {
        type: "multiple_choice",
        question: '"Rüzgarlı" ne demek?',
        options: ["Foggy", "Windy", "Hot", "Cold"],
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
        direction: "tr-en",
        correctAnswer: "Cold",
        acceptedAnswers: ["Cold", "cold"],
      },
      {
        type: "matching",
        pairs: [
          { left: "Sıcak", right: "Hot" },
          { left: "Soğuk", right: "Cold" },
          { left: "Rüzgarlı", right: "Windy" },
          { left: "Sisli", right: "Foggy" },
        ],
      },
    ],
  },
};
