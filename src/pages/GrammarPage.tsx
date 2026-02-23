import { useNavigate } from "react-router-dom";
import { ArrowLeft, BookOpenText, Bookmark } from "lucide-react";

type GrammarChapter = {
  title: string;
  level: string;
  whyItMatters: string;
  sections: {
    subtitle: string;
    explanation: string;
    examples: string[];
  }[];
};

const grammarBook: GrammarChapter[] = [
  {
    title: "Bölüm 1 · Romence Zamanlar (Timpuri verbale)",
    level: "A1 → B2",
    whyItMatters:
      "Zamanlar, bir olayın ne zaman gerçekleştiğini açıkça anlatmanı sağlar. Romence konuşurken akıcılık ve doğruluk için ilk büyük adımdır.",
    sections: [
      {
        subtitle: "1.1 Şimdiki Zaman (Prezent)",
        explanation:
          "Günlük hayatta en sık kullanılan zamandır. Alışkanlıkları, genel doğruları ve şu anda olan eylemleri anlatır.",
        examples: [
          "Eu învăț româna în fiecare zi. → Her gün Romence öğreniyorum.",
          "Ea citește o carte. → O, bir kitap okuyor.",
          "Noi locuim în București. → Biz Bükreş'te yaşıyoruz.",
        ],
      },
      {
        subtitle: "1.2 Geçmiş Zaman (Perfect compus ve Imperfect)",
        explanation:
          "Perfect compus tamamlanmış eylemler için, imperfect ise geçmişteki devam eden durumlar veya alışkanlıklar için kullanılır.",
        examples: [
          "Am mâncat deja. → Çoktan yemek yedim.",
          "Când eram mic, mergeam la bunici vara. → Küçükken yazları büyükanne-büyükbabama giderdim.",
          "Am văzut filmul ieri seară. → Filmi dün akşam izledim.",
        ],
      },
      {
        subtitle: "1.3 Gelecek Zaman (Viitor)",
        explanation:
          "Plan, niyet ve tahmin bildirmek için kullanılır. Günlük konuşmada kısa kalıplar çok yaygındır.",
        examples: [
          "O să învăț diseară. → Bu akşam çalışacağım.",
          "Vom merge mâine la piață. → Yarın pazara gideceğiz.",
          "Cred că va ploua. → Sanırım yağmur yağacak.",
        ],
      },
    ],
  },
  {
    title: "Bölüm 2 · Fiil Çekimleri (Conjugări)",
    level: "A1 → C1",
    whyItMatters:
      "Romence'de özne çoğu zaman fiilin şeklinden anlaşılır. Bu yüzden çekim hatası iletişimi direkt etkiler.",
    sections: [
      {
        subtitle: "2.1 Temel Şahıslar ve Çekim Mantığı",
        explanation:
          "Her fiili altı şahısla çalışmak, konuşurken düşünme süresini azaltır.",
        examples: [
          "eu merg / tu mergi / el merge",
          "noi mergem / voi mergeți / ei merg",
          "A citi: citesc, citești, citește...",
        ],
      },
      {
        subtitle: "2.2 Düzenli ve Düzensiz Fiiller",
        explanation:
          "Düzenli fiiller bir kalıp izler; düzensiz fiiller ise yüksek frekanslı oldukları için ayrı ezberlenmelidir.",
        examples: [
          "Düzenli: a lucra (çalışmak), a cânta (şarkı söylemek)",
          "Düzensiz: a fi (olmak), a avea (sahip olmak), a vrea (istemek)",
          "Eu sunt student. → Ben öğrenciyim.",
        ],
      },
    ],
  },
  {
    title: "Bölüm 3 · İsimler, Cinsiyet ve Artikeller",
    level: "A1 → B2",
    whyItMatters:
      "Romence'de isimler yalnızca kelime değildir; cinsiyet, sayı ve artikelle birlikte bir sistem oluşturur.",
    sections: [
      {
        subtitle: "3.1 Cinsiyet Sistemi (Masculin · Feminin · Neutru)",
        explanation:
          "Nötr isimler tekilde eril, çoğulda dişil gibi davranabilir. Bu özellik Romence'nin ayırt edici noktalarındandır.",
        examples: [
          "un băiat / doi băieți",
          "o fată / două fete",
          "un scaun / două scaune (nötr davranış)",
        ],
      },
      {
        subtitle: "3.2 Belirli - Belirsiz Artikel",
        explanation:
          "Belirsiz artikel kelimenin önünde, belirli artikel ise çoğunlukla kelimenin sonunda görülür.",
        examples: [
          "un om → omul (bir adam → adam)",
          "o carte → cartea (bir kitap → kitap)",
          "niște elevi → elevii (öğrenciler → öğrenciler[belirli])",
        ],
      },
    ],
  },
  {
    title: "Bölüm 4 · Sıfat Uyumu, Zamirler ve Bağlayıcı Yapılar",
    level: "A2 → C1",
    whyItMatters:
      "Cümleyi doğal ve yerel konuşmaya yakın yapan kısım bu bölümdür: uyum, referans ve bağlama.",
    sections: [
      {
        subtitle: "4.1 Sıfat Uyumu",
        explanation:
          "Sıfatlar ismin cinsiyetine ve tekil-çoğul durumuna göre değişir.",
        examples: [
          "băiat bun / băieți buni",
          "fată bună / fete bune",
          "copil mic / copii mici",
        ],
      },
      {
        subtitle: "4.2 Zamirler ve Cümlede Yer",
        explanation:
          "Özellikle nesne zamirleri (mă, te, îl, o, ne, vă, îi, le) cümle akışında doğru yere gelmelidir.",
        examples: [
          "Îl văd pe Andrei. → Andrei'yi görüyorum.",
          "Mă ajută mereu. → Bana hep yardım ediyor.",
          "Le spun adevărul. → Onlara gerçeği söylüyorum.",
        ],
      },
      {
        subtitle: "4.3 Edatlar ve Bağlaçlar",
        explanation:
          "Kısa kelimeler, uzun cümlelerin iskeletidir. Yanlış seçim anlam kaymasına yol açar.",
        examples: [
          "cu (ile), fără (olmadan), pentru (için), despre (hakkında)",
          "că (ki), dacă (eğer), fiindcă (çünkü), deși (rağmen)",
          "Vreau să vin, dar nu pot. → Gelmek istiyorum ama gelemiyorum.",
        ],
      },
    ],
  },
];

export default function GrammarPage() {
  const navigate = useNavigate();

  return (
    <div className="pb-24">
      <div className="max-w-4xl mx-auto px-4 py-6 space-y-4">
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-2 rounded-lg border border-border bg-card px-3 py-2 text-sm font-bold text-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
          Geri
        </button>

        <div className="bg-card rounded-2xl p-6 shadow-card space-y-6">
          <header className="space-y-3 border-b border-border pb-4">
            <div className="flex items-center gap-3">
              <BookOpenText className="h-7 w-7 text-flamingo" />
              <h1 className="text-2xl font-black text-foreground">Romence Dil Bilgisi Rehberi · Kitap Formatı</h1>
            </div>
            <p className="text-sm font-medium text-muted-foreground leading-relaxed">
              Bu sayfa, Romence dil bilgisini bölüm bölüm öğrenebilmen için "mini ders kitabı" düzeninde hazırlandı.
              Her bölümde konu özeti ve örnek cümleler bulunur.
            </p>
          </header>

          <div className="space-y-5">
            {grammarBook.map((chapter) => (
              <section key={chapter.title} className="rounded-xl border border-border p-5 bg-background/50 space-y-4">
                <div className="space-y-2">
                  <h2 className="text-lg font-extrabold text-foreground">{chapter.title}</h2>
                  <p className="text-xs font-bold uppercase tracking-wide text-flamingo">Seviye: {chapter.level}</p>
                  <p className="text-sm text-foreground/90 leading-relaxed">
                    <span className="font-bold">Neden önemli? </span>
                    {chapter.whyItMatters}
                  </p>
                </div>

                <div className="space-y-4">
                  {chapter.sections.map((section) => (
                    <article key={section.subtitle} className="rounded-lg border border-border/70 bg-card p-4 space-y-3">
                      <div className="flex items-center gap-2">
                        <Bookmark className="h-4 w-4 text-flamingo" />
                        <h3 className="text-sm font-extrabold text-foreground">{section.subtitle}</h3>
                      </div>

                      <p className="text-sm text-foreground/90 leading-relaxed">{section.explanation}</p>

                      <div>
                        <p className="text-xs font-bold uppercase tracking-wide text-muted-foreground mb-2">Örnekler</p>
                        <ul className="space-y-1 list-disc pl-5">
                          {section.examples.map((example) => (
                            <li key={example} className="text-sm text-foreground/90">
                              {example}
                            </li>
                          ))}
                        </ul>
                      </div>

                    </article>
                  ))}
                </div>
              </section>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
