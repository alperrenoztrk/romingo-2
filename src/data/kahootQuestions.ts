export type KahootQuestion = {
  id: number;
  question: string;
  options: string[];
  correctIndex: number;
};

export const TEMEL_QUESTIONS: KahootQuestion[] = [
  { id: 1, question: "'Bună dimineața' ne anlama gelir?", options: ["İyi geceler", "Günaydın", "Hoşça kal", "İyi akşamlar"], correctIndex: 1 },
  { id: 2, question: "'Carte' kelimesinin Türkçe karşılığı nedir?", options: ["Kalem", "Defter", "Kitap", "Masa"], correctIndex: 2 },
  { id: 3, question: "'Măr' kelimesi hangisini ifade eder?", options: ["Armut", "Portakal", "Elma", "Muz"], correctIndex: 2 },
  { id: 4, question: "'La revedere' hangi anlama gelir?", options: ["Hoşça kal", "Hemen gel", "Tekrar dene", "Memnun oldum"], correctIndex: 0 },
  { id: 5, question: "'Mulțumesc' ne demektir?", options: ["Lütfen", "Teşekkürler", "Özür dilerim", "Merhaba"], correctIndex: 1 },
  { id: 6, question: "'Apă' kelimesinin anlamı nedir?", options: ["Süt", "Çay", "Su", "Kahve"], correctIndex: 2 },
  { id: 7, question: "'Câine' hangi hayvanı ifade eder?", options: ["Kedi", "Köpek", "Kuş", "Balık"], correctIndex: 1 },
  { id: 8, question: "'Unu' Rumence'de hangi sayıdır?", options: ["Sıfır", "Bir", "İki", "Üç"], correctIndex: 1 },
  { id: 9, question: "'Bună ziua' ne demektir?", options: ["Günaydın", "İyi günler", "İyi geceler", "Merhaba"], correctIndex: 1 },
  { id: 10, question: "'Pisică' hangi hayvanı ifade eder?", options: ["Köpek", "Kedi", "Kuş", "Tavşan"], correctIndex: 1 },
  { id: 11, question: "'Da' kelimesinin Türkçe karşılığı nedir?", options: ["Hayır", "Belki", "Evet", "Lütfen"], correctIndex: 2 },
  { id: 12, question: "'Pâine' ne anlama gelir?", options: ["Ekmek", "Süt", "Peynir", "Yumurta"], correctIndex: 0 },
];

export const ORTA_QUESTIONS: KahootQuestion[] = [
  { id: 1, question: "'Eu învăț limba română.' cümlesinin doğru çevirisi hangisidir?", options: ["Rumence öğretiyorum.", "Rumence öğreniyorum.", "Rumence konuşmuyorum.", "Rumence çalıştım."], correctIndex: 1 },
  { id: 2, question: "'Cum te numești?' sorusu ne anlama gelir?", options: ["Nasılsın?", "Nerelisin?", "Adın ne?", "Kaç yaşındasın?"], correctIndex: 2 },
  { id: 3, question: "'Am nevoie de ajutor.' ne demektir?", options: ["Yardıma ihtiyacım var.", "Yardım etmek istiyorum.", "Yardım istemiyorum.", "Yardımınız için teşekkürler."], correctIndex: 0 },
  { id: 4, question: "'Unde este gara?' cümlesinin anlamı nedir?", options: ["Tren ne zaman gelir?", "Gar nerede?", "Bilet ne kadar?", "Tren kalktı mı?"], correctIndex: 1 },
  { id: 5, question: "'Îmi place foarte mult.' ne anlama gelir?", options: ["Hiç beğenmedim.", "Çok beğendim.", "Biraz beğendim.", "Beğenmedim."], correctIndex: 1 },
  { id: 6, question: "'Vreau să cumpăr...' ifadesi nasıl tamamlanır?", options: ["...satmak istiyorum", "...almak istiyorum", "...bakmak istiyorum", "...denemek istiyorum"], correctIndex: 1 },
  { id: 7, question: "'Ce oră este?' sorusu ne sorar?", options: ["Bugün ne gün?", "Saat kaç?", "Ne zaman?", "Neredesin?"], correctIndex: 1 },
  { id: 8, question: "'Nu înțeleg.' ne demektir?", options: ["Anlıyorum.", "Anlamıyorum.", "Tekrar söyle.", "Yavaş konuş."], correctIndex: 1 },
  { id: 9, question: "'Pot să vă ajut?' ne anlama gelir?", options: ["Yardıma ihtiyacım var.", "Size yardım edebilir miyim?", "Lütfen yardım edin.", "Yardım istemiyorum."], correctIndex: 1 },
  { id: 10, question: "'Cât costă?' sorusunun anlamı nedir?", options: ["Ne kadar?", "Nereye?", "Ne zaman?", "Kim için?"], correctIndex: 0 },
  { id: 11, question: "'Mă numesc Ana.' cümlesinin çevirisi nedir?", options: ["Ana'yı tanıyorum.", "Benim adım Ana.", "Ana nerede?", "Ana gitti."], correctIndex: 1 },
  { id: 12, question: "'Vorbesc puțin românește.' ne demektir?", options: ["Rumence bilmiyorum.", "Rumence çok iyi konuşurum.", "Biraz Rumence konuşuyorum.", "Rumence öğrenmek istiyorum."], correctIndex: 2 },
];

export function getQuestionsForDifficulty(difficulty: "temel" | "orta"): KahootQuestion[] {
  return difficulty === "temel" ? TEMEL_QUESTIONS : ORTA_QUESTIONS;
}

export function shuffleAndPick(questions: KahootQuestion[], count: number): KahootQuestion[] {
  const shuffled = [...questions].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}
