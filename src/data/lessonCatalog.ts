export interface LessonCatalogItem {
  id: string;
  title: string;
  emoji: string;
  level: number;
}

export const lessonCatalog: LessonCatalogItem[] = [
  { id: "1", title: "Selamlaşma", emoji: "👋", level: 1 },
  { id: "2", title: "Tanışma", emoji: "🤝", level: 1 },
  { id: "3", title: "Sayılar", emoji: "🔢", level: 1 },
  { id: "4", title: "Renkler", emoji: "🎨", level: 2 },
  { id: "5", title: "Yiyecekler", emoji: "🍎", level: 2 },
  { id: "6", title: "İçecekler", emoji: "☕", level: 2 },
  { id: "7", title: "Aile", emoji: "👨‍👩‍👧", level: 3 },
  { id: "8", title: "Hayvanlar", emoji: "🦩", level: 3 },
  { id: "9", title: "Meslekler", emoji: "👩‍⚕️", level: 3 },
  { id: "10", title: "Günler", emoji: "📅", level: 4 },
  { id: "11", title: "Mevsimler", emoji: "🌸", level: 4 },
  { id: "12", title: "Hava Durumu", emoji: "🌤️", level: 4 },
  { id: "13", title: "Alışveriş", emoji: "🛍️", level: 5 },
  { id: "14", title: "Ulaşım", emoji: "🚌", level: 5 },
  { id: "15", title: "Ev ve Odalar", emoji: "🏠", level: 5 },
  { id: "16", title: "Zaman İfadeleri", emoji: "⏰", level: 5 },
  { id: "17", title: "Temel Fiiller", emoji: "🏃", level: 6 },
  { id: "18", title: "Günlük Rutin", emoji: "🗓️", level: 6 },
  { id: "19", title: "Restoran", emoji: "🍽️", level: 6 },
  { id: "20", title: "Yönler ve Konum", emoji: "🧭", level: 6 },
  { id: "21", title: "Duygular", emoji: "😊", level: 7 },
  { id: "22", title: "Vücut Bölümleri", emoji: "🧍", level: 7 },
  { id: "23", title: "İleri Cümle Kurma", emoji: "🧠", level: 8 },
];

export const orderedLessonIds = lessonCatalog.map((lesson) => lesson.id);
