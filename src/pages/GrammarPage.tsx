import { useNavigate } from "react-router-dom";
import { ArrowLeft, BookOpenText } from "lucide-react";

const grammarTopics = [
  {
    title: "1️⃣ Zamanlar (Timpuri verbale)",
    items: [
      "Fiillerin zamana göre çekimi:",
      "Şimdiki zaman (Prezent)",
      "Geçmiş zamanlar (Perfect compus, Imperfect, vs.)",
      "Gelecek zaman (Viitor)",
      "Daha ileri seviyede:",
      "Daha önce olmuş geçmiş (Mai mult ca perfect)",
      "Şartlı zaman (Condițional)",
      "👉 Bu bölüm tek başına gramerin en büyük kısmıdır.",
    ],
  },
  {
    title: "2️⃣ Fiil Çekimleri (Conjugări)",
    items: [
      "Fiillerin şahıslara göre değişmesi:",
      "eu merg",
      "tu mergi",
      "el/ea merge",
      "Ayrıca:",
      "düzenli fiiller",
      "düzensiz fiiller",
    ],
  },
  {
    title: "3️⃣ İsimler ve Cinsiyet (Substantive + Gen)",
    items: [
      "Romence'de kelimeler:",
      "eril (masculin)",
      "dişil (feminin)",
      "nötr (neutru)",
      "ve buna göre değişir.",
    ],
  },
  {
    title: "4️⃣ Artikeller (Articole)",
    items: [
      "Türkçede olmayan ama Romence'de kritik konu:",
      "hotărât (belirli): omul",
      "nehotărât (belirsiz): un om",
      "Romence'de artikel kelimenin sonuna da gelebilir — bu A2'den sonra kafa karıştırmaya başlar.",
    ],
  },
  {
    title: "5️⃣ Çoğul Yapma (Plural)",
    items: [
      "Her kelimenin çoğulu farklı olabilir:",
      "om → oameni",
      "fată → fete",
      "Ezber + kural karışımıdır.",
    ],
  },
  {
    title: "6️⃣ Sıfat Uyumu (Adjective agreement)",
    items: [
      "Sıfatlar isme göre değişir:",
      "băiat bun",
      "fată bună",
      "Cinsiyet + sayı uyumu gerekir.",
    ],
  },
  {
    title: "7️⃣ Zamirler (Pronume)",
    items: [
      "ben, sen, o",
      "bana, sana, onu",
      "kendim, kendin vs.",
      "Romence'de zamirlerin yeri Türkçeye göre çok farklıdır.",
    ],
  },
  {
    title: "8️⃣ Edatlar / Bağlaçlar / Küçük Yapı Taşları",
    items: [
      "cu (ile)",
      "pentru (için)",
      "că (ki)",
      "dacă (eğer)",
      "Bunlar cümleyi bağlayan gramer parçalarıdır.",
    ],
  },
];

export default function GrammarPage() {
  const navigate = useNavigate();

  return (
    <div className="pb-24">
      <div className="max-w-2xl mx-auto px-4 py-6 space-y-4">
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-2 rounded-lg border border-border bg-card px-3 py-2 text-sm font-bold text-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
          Geri
        </button>

        <div className="bg-card rounded-2xl p-5 shadow-card">
          <div className="flex items-center gap-3 mb-4">
            <BookOpenText className="h-7 w-7 text-flamingo" />
            <h1 className="text-2xl font-black text-foreground">Romence Grammer Konu Anlatımı</h1>
          </div>
          <p className="text-sm font-semibold text-muted-foreground mb-5">
            Romence'de grameri adım adım öğrenmek için temel başlıklar aşağıda yer alıyor.
          </p>

          <div className="space-y-4">
            {grammarTopics.map((topic) => (
              <section key={topic.title} className="rounded-xl border border-border p-4 bg-background/50">
                <h2 className="text-base font-extrabold text-foreground mb-2">{topic.title}</h2>
                <ul className="space-y-1">
                  {topic.items.map((item) => (
                    <li key={item} className="text-sm font-medium text-foreground/90">
                      {item}
                    </li>
                  ))}
                </ul>
              </section>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
