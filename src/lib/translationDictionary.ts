import { lessonsData, type Exercise, type LessonData } from "../data/lessons";
import { matchesWithOneLetterTolerancePerWord } from "./answerTolerance";

export type TranslationDirection = "tr-ro" | "ro-tr";

const NOT_FOUND_MESSAGE =
  "Bu ifade sözlükte henüz yok. Yeni kelimeler eklendikçe çeviri kalitesi artacak.";

const QUESTION_IN_QUOTES_REGEX = /"([^"]+)"/;

const supplementalWordPairs: Array<{ tr: string; ro: string }> = [
  { tr: "Kitap", ro: "Carte" },
  { tr: "Kalem", ro: "Pix" },
  { tr: "Defter", ro: "Caiet" },
  { tr: "Silgi", ro: "Radieră" },
  { tr: "Çanta", ro: "Geantă" },
  { tr: "Masa", ro: "Masă" },
  { tr: "Sandalye", ro: "Scaun" },
  { tr: "Pencere", ro: "Fereastră" },
  { tr: "Kapı", ro: "Ușă" },
  { tr: "Duvar", ro: "Perete" },
  { tr: "Tavan", ro: "Tavan" },
  { tr: "Zemin", ro: "Podea" },
  { tr: "Anahtar", ro: "Cheie" },
  { tr: "Telefon", ro: "Telefon" },
  { tr: "Bilgisayar", ro: "Calculator" },
  { tr: "Tablet", ro: "Tabletă" },
  { tr: "Kulaklık", ro: "Căști" },
  { tr: "Şarj cihazı", ro: "Încărcător" },
  { tr: "İnternet", ro: "Internet" },
  { tr: "Su", ro: "Apă" },
  { tr: "Kahve", ro: "Cafea" },
  { tr: "Çay", ro: "Ceai" },
  { tr: "Süt", ro: "Lapte" },
  { tr: "Meyve suyu", ro: "Suc" },
  { tr: "Ekmek", ro: "Pâine" },
  { tr: "Peynir", ro: "Brânză" },
  { tr: "Yumurta", ro: "Ou" },
  { tr: "Tereyağı", ro: "Unt" },
  { tr: "Yoğurt", ro: "Iaurt" },
  { tr: "Çorba", ro: "Supă" },
  { tr: "Salata", ro: "Salată" },
  { tr: "Tuz", ro: "Sare" },
  { tr: "Şeker", ro: "Zahăr" },
  { tr: "Biber", ro: "Piper" },
  { tr: "Meyve", ro: "Fruct" },
  { tr: "Sebze", ro: "Legumă" },
  { tr: "Elma", ro: "Măr" },
  { tr: "Armut", ro: "Pară" },
  { tr: "Çilek", ro: "Căpșună" },
  { tr: "Muz", ro: "Banană" },
  { tr: "Portakal", ro: "Portocală" },
  { tr: "Domates", ro: "Roșie" },
  { tr: "Patates", ro: "Cartof" },
  { tr: "Soğan", ro: "Ceapă" },
  { tr: "Sarımsak", ro: "Usturoi" },
  { tr: "Havuç", ro: "Morcov" },
  { tr: "Pazar", ro: "Piață" },
  { tr: "Mağaza", ro: "Magazin" },
  { tr: "Kasiyer", ro: "Casier" },
  { tr: "İndirim", ro: "Reducere" },
  { tr: "Fiyat", ro: "Preț" },
  { tr: "Ucuz", ro: "Ieftin" },
  { tr: "Pahalı", ro: "Scump" },
  { tr: "Otobüs", ro: "Autobuz" },
  { tr: "Tren", ro: "Tren" },
  { tr: "Uçak", ro: "Avion" },
  { tr: "Taksi", ro: "Taxi" },
  { tr: "Bilet", ro: "Bilet" },
  { tr: "İstasyon", ro: "Stație" },
  { tr: "Havaalanı", ro: "Aeroport" },
  { tr: "Yolculuk", ro: "Călătorie" },
  { tr: "Harita", ro: "Hartă" },
  { tr: "Adres", ro: "Adresă" },
  { tr: "Hastane", ro: "Spital" },
  { tr: "Eczane", ro: "Farmacie" },
  { tr: "Doktor", ro: "Doctor" },
  { tr: "Hemşire", ro: "Asistentă" },
  { tr: "İlaç", ro: "Medicament" },
  { tr: "Ateş", ro: "Febră" },
  { tr: "Ağrı", ro: "Durere" },
  { tr: "Sağlıklı", ro: "Sănătos" },
  { tr: "Hasta", ro: "Bolnav" },
  { tr: "Dinlenmek", ro: "A se odihni" },
  { tr: "Öğrenci", ro: "Student" },
  { tr: "Öğretmen", ro: "Profesor" },
  { tr: "Ders", ro: "Lecție" },
  { tr: "Okul", ro: "Școală" },
  { tr: "Üniversite", ro: "Universitate" },
  { tr: "Sınav", ro: "Examen" },
  { tr: "Ödev", ro: "Temă" },
  { tr: "Soru", ro: "Întrebare" },
  { tr: "Cevap", ro: "Răspuns" },
  { tr: "Yazmak", ro: "A scrie" },
  { tr: "Okumak", ro: "A citi" },
  { tr: "Dinlemek", ro: "A asculta" },
  { tr: "Konuşmak", ro: "A vorbi" },
  { tr: "Anlamak", ro: "A înțelege" },
  { tr: "Çocuk", ro: "Copil" },
  { tr: "Aile", ro: "Familie" },
  { tr: "Anne", ro: "Mamă" },
  { tr: "Baba", ro: "Tată" },
  { tr: "Kardeş", ro: "Frate" },
  { tr: "Kız kardeş", ro: "Soră" },
  { tr: "Büyükanne", ro: "Bunică" },
  { tr: "Büyükbaba", ro: "Bunic" },
  { tr: "Arkadaş", ro: "Prieten" },
  { tr: "Komşu", ro: "Vecin" },
  { tr: "Mutlu", ro: "Fericit" },
  { tr: "Yorgun", ro: "Obosit" },
  { tr: "Üzgün", ro: "Trist" },
  { tr: "Kızgın", ro: "Supărat" },
  { tr: "Heyecanlı", ro: "Entuziasmat" },
  { tr: "Sakin", ro: "Calm" },
  { tr: "Hızlı", ro: "Rapid" },
  { tr: "Yavaş", ro: "Încet" },
  { tr: "Kolay", ro: "Ușor" },
  { tr: "Zor", ro: "Greu" },
  { tr: "Sıcak", ro: "Cald" },
  { tr: "Soğuk", ro: "Rece" },
  { tr: "Temiz", ro: "Curat" },
  { tr: "Kirli", ro: "Murdar" },
  { tr: "Yeni", ro: "Nou" },
  { tr: "Eski", ro: "Vechi" },
  { tr: "Büyük", ro: "Mare" },
  { tr: "Küçük", ro: "Mic" },
  { tr: "Bugün", ro: "Azi" },
  { tr: "Yarın", ro: "Mâine" },
  { tr: "Dün", ro: "Ieri" },
  { tr: "Sabah", ro: "Dimineață" },
  { tr: "Öğle", ro: "Amiază" },
  { tr: "Akşam", ro: "Seară" },
  { tr: "Gece", ro: "Noapte" },
  { tr: "Hafta", ro: "Săptămână" },
  { tr: "Ay", ro: "Lună" },
  { tr: "Yıl", ro: "An" },
  { tr: "Pazartesi", ro: "Luni" },
  { tr: "Salı", ro: "Marți" },
  { tr: "Çarşamba", ro: "Miercuri" },
  { tr: "Perşembe", ro: "Joi" },
  { tr: "Cuma", ro: "Vineri" },
  { tr: "Cumartesi", ro: "Sâmbătă" },
  { tr: "Pazar günü", ro: "Duminică" },
  { tr: "Merkez", ro: "Centru" },
  { tr: "Şehir", ro: "Oraș" },
  { tr: "Köy", ro: "Sat" },
  { tr: "Ülke", ro: "Țară" },
  { tr: "Deniz", ro: "Mare" },
  { tr: "Dağ", ro: "Munte" },
  { tr: "Nehir", ro: "Râu" },
  { tr: "Hava", ro: "Vreme" },
  { tr: "Yağmur", ro: "Ploaie" },
  { tr: "Kar", ro: "Zăpadă" },
  { tr: "Rüzgar", ro: "Vânt" },
  { tr: "Güneş", ro: "Soare" },
  { tr: "Bulut", ro: "Nor" },
  { tr: "Saat", ro: "Ceas" },
  { tr: "Dakika", ro: "Minut" },
  { tr: "Şimdi", ro: "Acum" },
  { tr: "Sonra", ro: "Mai târziu" },
  { tr: "Önce", ro: "Înainte" },
  { tr: "Her zaman", ro: "Întotdeauna" },
  { tr: "Bazen", ro: "Uneori" },
  { tr: "Asla", ro: "Niciodată" },
  { tr: "Evet", ro: "Da" },
  { tr: "Hayır", ro: "Nu" },
  { tr: "Belki", ro: "Poate" },
  { tr: "Tabii", ro: "Sigur" },
  { tr: "Lütfen", ro: "Te rog" },
  { tr: "Afedersiniz", ro: "Scuzați-mă" },
  { tr: "Önemli değil", ro: "Nu contează" },
  { tr: "İyi geceler", ro: "Noapte bună" },
  { tr: "Hoş geldiniz", ro: "Bine ați venit" },
  { tr: "Görüşürüz", ro: "Ne vedem" },
  { tr: "Tebrikler", ro: "Felicitări" },
  { tr: "Rica ederim", ro: "Cu plăcere" },
  { tr: "Nasılsın", ro: "Ce mai faci" },
  { tr: "İyiyim", ro: "Sunt bine" },
  { tr: "Memnun oldum", ro: "Îmi pare bine" },
  { tr: "Adın ne", ro: "Cum te cheamă" },
  { tr: "Benim adım", ro: "Numele meu este" },
  { tr: "Nerelisin", ro: "De unde ești" },
  { tr: "Türkiye", ro: "Turcia" },
  { tr: "Romanya", ro: "România" },
  { tr: "Dil", ro: "Limbă" },
  { tr: "Kelime", ro: "Cuvânt" },
  { tr: "Cümle", ro: "Propoziție" },
  { tr: "Çeviri", ro: "Traducere" },
  { tr: "Anlam", ro: "Sens" },
  { tr: "Telaffuz", ro: "Pronunție" },
  { tr: "Pratik", ro: "Exercițiu" },
  { tr: "Başlangıç", ro: "Început" },
  { tr: "İleri seviye", ro: "Nivel avansat" },
  { tr: "Koltuk", ro: "Fotoliu" },
  { tr: "Yatak", ro: "Pat" },
  { tr: "Yastık", ro: "Pernă" },
  { tr: "Battaniye", ro: "Pătură" },
  { tr: "Havlu", ro: "Prosop" },
  { tr: "Ayna", ro: "Oglindă" },
  { tr: "Lamba", ro: "Lampă" },
  { tr: "Fiş", ro: "Ștecher" },
  { tr: "Buzdolabı", ro: "Frigider" },
  { tr: "Fırın", ro: "Cuptor" },
  { tr: "Tava", ro: "Tavă" },
  { tr: "Kaşık", ro: "Lingură" },
  { tr: "Çatal", ro: "Furculiță" },
  { tr: "Bıçak", ro: "Cuțit" },
  { tr: "Tabak", ro: "Farfurie" },
  { tr: "Bardak", ro: "Pahar" },
  { tr: "Şişe", ro: "Sticlă" },
  { tr: "Peçete", ro: "Șervețel" },
  { tr: "Restoran", ro: "Restaurant" },
  { tr: "Menü", ro: "Meniu" },
  { tr: "Garson", ro: "Chelner" },
  { tr: "Rezervasyon", ro: "Rezervare" },
  { tr: "Hesap", ro: "Notă de plată" },
  { tr: "Bahşiş", ro: "Bacșiș" },
  { tr: "Aç", ro: "Flămând" },
  { tr: "Tok", ro: "Sătul" },
  { tr: "Lezzetli", ro: "Gustos" },
  { tr: "Baharatlı", ro: "Picant" },
  { tr: "Tatlı", ro: "Desert" },
  { tr: "Dondurma", ro: "Înghețată" },
  { tr: "Kek", ro: "Prăjitură" },
  { tr: "Çikolata", ro: "Ciocolată" },
  { tr: "Pirinç", ro: "Orez" },
  { tr: "Makarna", ro: "Paste" },
  { tr: "Tavuk", ro: "Pui" },
  { tr: "Balık", ro: "Pește" },
  { tr: "Et", ro: "Carne" },
  { tr: "Kahvaltı", ro: "Mic dejun" },
  { tr: "Öğle yemeği", ro: "Prânz" },
  { tr: "Akşam yemeği", ro: "Cină" },
  { tr: "Yürümek", ro: "A merge" },
  { tr: "Koşmak", ro: "A alerga" },
  { tr: "Yüzmek", ro: "A înota" },
  { tr: "Uyumak", ro: "A dormi" },
  { tr: "Uyanmak", ro: "A se trezi" },
  { tr: "Çalışmak", ro: "A lucra" },
  { tr: "Beklemek", ro: "A aștepta" },
  { tr: "Başlamak", ro: "A începe" },
  { tr: "Bitirmek", ro: "A termina" },
  { tr: "Açmak", ro: "A deschide" },
  { tr: "Kapatmak", ro: "A închide" },
  { tr: "Almak", ro: "A lua" },
  { tr: "Vermek", ro: "A da" },
  { tr: "Satın almak", ro: "A cumpăra" },
  { tr: "Satmak", ro: "A vinde" },
  { tr: "Sevmek", ro: "A iubi" },
  { tr: "İstemek", ro: "A dori" },
  { tr: "Bilmek", ro: "A ști" },
  { tr: "Düşünmek", ro: "A gândi" },
  { tr: "Sormak", ro: "A întreba" },
  { tr: "Bulmak", ro: "A găsi" },
  { tr: "Kaybetmek", ro: "A pierde" },
  { tr: "Kazanmak", ro: "A câștiga" },
  { tr: "Acil", ro: "Urgent" },
  { tr: "Tehlikeli", ro: "Periculos" },
  { tr: "Güvenli", ro: "Sigur" },
  { tr: "Polis", ro: "Poliție" },
  { tr: "İtfaiye", ro: "Pompieri" },
  { tr: "Yardım", ro: "Ajutor" },
  { tr: "Kaza", ro: "Accident" },
  { tr: "Sigorta", ro: "Asigurare" },
  { tr: "Randevu", ro: "Programare" },
  { tr: "Kan", ro: "Sânge" },
  { tr: "Kalp", ro: "Inimă" },
  { tr: "Mide", ro: "Stomac" },
  { tr: "Baş", ro: "Cap" },
  { tr: "Göz", ro: "Ochi" },
  { tr: "Kulak", ro: "Ureche" },
  { tr: "Burun", ro: "Nas" },
  { tr: "Ağız", ro: "Gură" },
  { tr: "Diş", ro: "Dinte" },
  { tr: "El", ro: "Mână" },
  { tr: "Ayak", ro: "Picior" },
  { tr: "Otel", ro: "Hotel" },
  { tr: "Oda", ro: "Cameră" },
  { tr: "Pasaport", ro: "Pașaport" },
  { tr: "Valiz", ro: "Valiză" },
  { tr: "Turist", ro: "Turist" },
  { tr: "Rehber", ro: "Ghid" },
  { tr: "Müze", ro: "Muzeu" },
  { tr: "Kütüphane", ro: "Bibliotecă" },
  { tr: "Park", ro: "Parc" },
  { tr: "Sokak", ro: "Stradă" },
  { tr: "Köprü", ro: "Pod" },
  { tr: "Meydan", ro: "Piațetă" },
  { tr: "Bina", ro: "Clădire" },
  { tr: "Asansör", ro: "Lift" },
  { tr: "Merdiven", ro: "Scară" },
  { tr: "Kat", ro: "Etaj" },
  { tr: "Bahçe", ro: "Grădină" },
  { tr: "Ağaç", ro: "Copac" },
  { tr: "Çiçek", ro: "Floare" },
  { tr: "Toprak", ro: "Sol" },
  { tr: "Orman", ro: "Pădure" },
  { tr: "Sahil", ro: "Plajă" },
  { tr: "Göl", ro: "Lac" },
  { tr: "Ada", ro: "Insulă" },
  { tr: "Kuzey", ro: "Nord" },
  { tr: "Güney", ro: "Sud" },
  { tr: "Doğu", ro: "Est" },
  { tr: "Batı", ro: "Vest" },
  { tr: "Ocak", ro: "Ianuarie" },
  { tr: "Şubat", ro: "Februarie" },
  { tr: "Mart", ro: "Martie" },
  { tr: "Nisan", ro: "Aprilie" },
  { tr: "Mayıs", ro: "Mai" },
  { tr: "Haziran", ro: "Iunie" },
  { tr: "Temmuz", ro: "Iulie" },
  { tr: "Ağustos", ro: "August" },
  { tr: "Eylül", ro: "Septembrie" },
  { tr: "Ekim", ro: "Octombrie" },
  { tr: "Kasım", ro: "Noiembrie" },
  { tr: "Aralık", ro: "Decembrie" },
  { tr: "Bir", ro: "Unu" },
  { tr: "İki", ro: "Doi" },
  { tr: "Üç", ro: "Trei" },
  { tr: "Dört", ro: "Patru" },
  { tr: "Beş", ro: "Cinci" },
  { tr: "Altı", ro: "Șase" },
  { tr: "Yedi", ro: "Șapte" },
  { tr: "Sekiz", ro: "Opt" },
  { tr: "Dokuz", ro: "Nouă" },
  { tr: "On", ro: "Zece" },
  { tr: "Birinci", ro: "Primul" },
  { tr: "İkinci", ro: "Al doilea" },
  { tr: "Üçüncü", ro: "Al treilea" },
  { tr: "Yarım", ro: "Jumătate" },
  { tr: "Çeyrek", ro: "Sfert" },
  { tr: "Uzun", ro: "Lung" },
  { tr: "Kısa", ro: "Scurt" },
  { tr: "Geniş", ro: "Lat" },
  { tr: "Dar", ro: "Îngust" },
  { tr: "Ağır", ro: "Greu la greutate" },
  { tr: "Hafif", ro: "Ușor la greutate" },
  { tr: "Güzel", ro: "Frumos" },
  { tr: "Çirkin", ro: "Urat" },
  { tr: "Doğru", ro: "Corect" },
  { tr: "Yanlış", ro: "Greșit" },
  { tr: "Yakın", ro: "Aproape" },
  { tr: "Uzak", ro: "Departe" },
  { tr: "Erken", ro: "Devreme" },
  { tr: "Geç", ro: "Târziu" },
  { tr: "Genç", ro: "Tânăr" },
  { tr: "Yaşlı", ro: "Vârstnic" },
  { tr: "Zengin", ro: "Bogat" },
  { tr: "Fakir", ro: "Sărac" },
  { tr: "Doğum günü", ro: "Zi de naștere" },
  { tr: "Hediye", ro: "Cadou" },
  { tr: "Parti", ro: "Petrecere" },
  { tr: "Şarkı", ro: "Cântec" },
  { tr: "Müzik", ro: "Muzică" },
  { tr: "Film", ro: "Film" },
  { tr: "Dizi", ro: "Serial" },
  { tr: "Oyun", ro: "Joc" },
  { tr: "Spor", ro: "Sport" },
  { tr: "Futbol", ro: "Fotbal" },
  { tr: "Basketbol", ro: "Baschet" },
  { tr: "Yarın görüşürüz", ro: "Ne vedem mâine" },
  { tr: "İyi şanslar", ro: "Mult noroc" },
  { tr: "Geçmiş olsun", ro: "Însănătoșire grabnică" },
  { tr: "Dikkat et", ro: "Ai grijă" },
  { tr: "Harika", ro: "Minunat" },
  { tr: "Mükemmel", ro: "Excelent" },
  { tr: "Sorun değil", ro: "Nicio problemă" },
  { tr: "Fark etmez", ro: "Indiferent" },
  { tr: "Bir dakika", ro: "Un minut" },
  { tr: "Hemen", ro: "Imediat" },
  { tr: "Neden", ro: "De ce" },
  { tr: "Çünkü", ro: "Pentru că" },
  { tr: "Nasıl", ro: "Cum" },
  { tr: "Ne zaman", ro: "Când" },
  { tr: "Nerede", ro: "Unde" },
  { tr: "Kim", ro: "Cine" },
  { tr: "Ne", ro: "Ce" },
  { tr: "Hangisi", ro: "Care" },
  { tr: "Bu", ro: "Acesta" },
  { tr: "Şu", ro: "Acela" },
  { tr: "Onlar", ro: "Ei" },
  { tr: "Biz", ro: "Noi" },
  { tr: "Siz", ro: "Voi" },
  { tr: "Ben", ro: "Eu" },
  { tr: "Sen", ro: "Tu" },
];

const normalizeLookupKey = (value: string, locale: string) =>
  value
    .trim()
    .toLocaleLowerCase(locale)
    .replace(/[?.!,]/g, "")
    .replace(/\s+/g, " ");

const addPair = (trToRo: Map<string, string>, roToTr: Map<string, string>, tr: string, ro: string) => {
  const normalizedTr = normalizeLookupKey(tr, "tr-TR");
  const normalizedRo = normalizeLookupKey(ro, "ro-RO");

  if (!normalizedTr || !normalizedRo) return;

  if (!trToRo.has(normalizedTr)) {
    trToRo.set(normalizedTr, ro.trim());
  }

  if (!roToTr.has(normalizedRo)) {
    roToTr.set(normalizedRo, tr.trim());
  }
};

function hydrateFromExercise(
  exercise: Exercise,
  trToRo: Map<string, string>,
  roToTr: Map<string, string>,
) {
  if (exercise.type === "translation") {
    if (exercise.direction === "tr-ro") {
      addPair(trToRo, roToTr, exercise.sentence, exercise.correctAnswer);
      exercise.acceptedAnswers.forEach((accepted) => addPair(trToRo, roToTr, exercise.sentence, accepted));
    } else {
      addPair(trToRo, roToTr, exercise.correctAnswer, exercise.sentence);
      exercise.acceptedAnswers.forEach((accepted) => addPair(trToRo, roToTr, accepted, exercise.sentence));
    }
    return;
  }

  if (exercise.type === "matching") {
    exercise.pairs.forEach((pair) => addPair(trToRo, roToTr, pair.left, pair.right));
    return;
  }

  if (exercise.type === "listening") {
    const correctOption = exercise.options[exercise.correctIndex];
    if (correctOption) addPair(trToRo, roToTr, correctOption, exercise.word);
    return;
  }

  if (exercise.type === "multiple_choice" && /ne demek\?/i.test(exercise.question)) {
    const sourcePhrase = exercise.question.match(QUESTION_IN_QUOTES_REGEX)?.[1];
    const translatedPhrase = exercise.options[exercise.correctIndex];
    if (sourcePhrase && translatedPhrase) {
      addPair(trToRo, roToTr, translatedPhrase, sourcePhrase);
    }
  }
}

function buildDictionaries(data: Record<string, LessonData>) {
  const trToRo = new Map<string, string>();
  const roToTr = new Map<string, string>();

  Object.values(data).forEach((lesson) => {
    lesson.exercises.forEach((exercise) => hydrateFromExercise(exercise, trToRo, roToTr));
  });

  supplementalWordPairs.forEach((pair) => addPair(trToRo, roToTr, pair.tr, pair.ro));

  return { trToRo, roToTr };
}

const dictionaries = buildDictionaries(lessonsData);


function findBestMatch(dictionary: Map<string, string>, lookup: string) {
  const exactMatch = dictionary.get(lookup);
  if (exactMatch) return exactMatch;

  for (const [entry, translation] of dictionary.entries()) {
    if (matchesWithOneLetterTolerancePerWord(lookup, entry)) {
      return translation;
    }
  }

  return null;
}

const WORD_EDGE_REGEX = /^[^\p{L}\p{N}]+|[^\p{L}\p{N}]+$/gu;

function preserveCasing(source: string, translated: string) {
  if (!source) return translated;

  const allUpperCase = source === source.toLocaleUpperCase("tr-TR");
  if (allUpperCase) return translated.toLocaleUpperCase("tr-TR");

  const startsUpperCase = source[0] === source[0].toLocaleUpperCase("tr-TR");
  if (startsUpperCase) {
    return translated[0].toLocaleUpperCase("tr-TR") + translated.slice(1);
  }

  return translated[0].toLocaleLowerCase("tr-TR") + translated.slice(1);
}

type SentenceToken = {
  leading: string;
  core: string;
  trailing: string;
  normalized: string;
};

function parseToken(rawToken: string, locale: string): SentenceToken | null {
  const core = rawToken.replace(WORD_EDGE_REGEX, "");
  if (!core) return null;

  const leading = rawToken.match(/^[^\p{L}\p{N}]+/u)?.[0] ?? "";
  const trailing = rawToken.match(/[^\p{L}\p{N}]+$/u)?.[0] ?? "";

  return {
    leading,
    core,
    trailing,
    normalized: normalizeLookupKey(core, locale),
  };
}

function translateSentenceByWords(input: string, dictionary: Map<string, string>, locale: string) {
  const rawWords = input.trim().split(/\s+/).filter(Boolean);
  if (rawWords.length < 2) return null;

  const tokens = rawWords.map((word) => parseToken(word, locale));
  if (tokens.some((token) => token === null)) return null;

  const parsedTokens = tokens as SentenceToken[];
  const translatedParts: string[] = [];

  let index = 0;
  while (index < parsedTokens.length) {
    let matchedLength = 0;
    let matchedTranslation: string | null = null;

    for (let length = parsedTokens.length - index; length >= 1; length -= 1) {
      const lookup = parsedTokens
        .slice(index, index + length)
        .map((token) => token.normalized)
        .join(" ");

      const translation = findBestMatch(dictionary, lookup);
      if (translation) {
        matchedLength = length;
        matchedTranslation = translation;
        break;
      }
    }

    if (!matchedTranslation || matchedLength === 0) return null;

    const firstToken = parsedTokens[index];
    const lastToken = parsedTokens[index + matchedLength - 1];
    const withCase = preserveCasing(firstToken.core, matchedTranslation);
    translatedParts.push(`${firstToken.leading}${withCase}${lastToken.trailing}`);

    index += matchedLength;
  }

  return translatedParts.join(" ");
}

export function translateWithTolerance(input: string, direction: TranslationDirection) {
  const locale = direction === "tr-ro" ? "tr-TR" : "ro-RO";
  const normalizedInput = normalizeLookupKey(input, locale);

  if (!normalizedInput) return "";

  const dictionary = direction === "tr-ro" ? dictionaries.trToRo : dictionaries.roToTr;
  const directTranslation = findBestMatch(dictionary, normalizedInput);
  if (directTranslation) return directTranslation;

  const sentenceTranslation = translateSentenceByWords(input, dictionary, locale);
  if (sentenceTranslation) return sentenceTranslation;

  return NOT_FOUND_MESSAGE;
}

export const translationDictionaryStats = {
  trToRoSize: dictionaries.trToRo.size,
  roToTrSize: dictionaries.roToTr.size,
};
