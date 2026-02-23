import { useNavigate } from "react-router-dom";
import { ArrowLeft, BookOpenText, Bookmark } from "lucide-react";

type GrammarChapter = {
  title: string;
  level: string;
  sections: {
    subtitle: string;
    explanation: string;
    examples: string[];
  }[];
};

const grammarBook: GrammarChapter[] = [
  {
    title: "Bölüm 1 · Alfabe, Telaffuz ve Vurgu",
    level: "A1",
    sections: [
      {
        subtitle: "1.1 Romence Alfabesi ve Türkçeden Farklı Harfler",
        explanation:
          "Romence Latin alfabesini kullanır. ă, â, î, ș, ț harfleri hem telaffuz hem anlam açısından kritiktir; yanlış harf kullanımı kelimeyi değiştirebilir.",
        examples: [
          "fată (kız) / fata (kız [belirli])",
          "țară (ülke) / sare (tuz)",
          "în (içinde) / in (keten)",
        ],
      },
      {
        subtitle: "1.2 Temel Okunuş Kuralları",
        explanation:
          "Genel olarak yazıldığı gibi okunur; ancak ce/ci ve ge/gi birleşimleri Türkçedeki 'çe/çi' ve 'ce/ci' benzeri sesler üretir. ș = ş, ț = ts sesidir.",
        examples: [
          "cine → çine (kim)",
          "ger → cer benzeri sert başlangıç",
          "șapte → şapte (yedi)",
        ],
      },
      {
        subtitle: "1.3 Vurgu ve Akıcılık",
        explanation:
          "Vurgu çoğunlukla sondan bir önceki hecededir; fakat ezberlenmesi gereken istisnalar vardır. Akıcı konuşma için kelime gruplarını tek nefeste tekrar etmek etkilidir.",
        examples: [
          "mul-ȚU-mesc (teşekkür ederim)",
          "bu-cu-REȘ-ti (Bükreş)",
          "Ce mai faci? → Nasılsın?",
        ],
      },
    ],
  },
  {
    title: "Bölüm 2 · İsimler, Cinsiyet ve Artikeller",
    level: "A1 → B1",
    sections: [
      {
        subtitle: "2.1 Üç Cinsiyet Sistemi",
        explanation:
          "Romencede eril, dişil ve nötr cinsiyet vardır. Nötr isimler tekilde eril, çoğulda dişil çekimlenir; bu yapı başlangıç seviyesinde özellikle tekrar edilmelidir.",
        examples: [
          "un băiat / doi băieți (eril)",
          "o floare / două flori (dişil)",
          "un hotel / două hoteluri (nötr)",
        ],
      },
      {
        subtitle: "2.2 Belirsiz ve Belirli Artikel",
        explanation:
          "Belirsiz artikel kelimenin başında (un/o), belirli artikel çoğunlukla sonda (-ul, -a, -le) yer alır. Bu yapı cümlede özne ve nesneyi ayırt etmeyi kolaylaştırır.",
        examples: [
          "un elev → elevul",
          "o casă → casa",
          "niște caiete → caietele",
        ],
      },
      {
        subtitle: "2.3 Çoğul Kuralları",
        explanation:
          "Çoğul yapımı tek bir formülle ilerlemez; kelime sonuna göre değişir. Öğrenmeyi hızlandırmak için yeni isimler tekil+çoğul birlikte kaydedilmelidir.",
        examples: [
          "copil → copii",
          "carte → cărți",
          "oraș → orașe",
        ],
      },
    ],
  },
  {
    title: "Bölüm 3 · Zamirler, Sıfatlar ve Temel Söz Dizimi",
    level: "A2 → B2",
    sections: [
      {
        subtitle: "3.1 Kişi Zamirleri ve Kullanımı",
        explanation:
          "Kişi zamirleri genellikle özneyi vurgulamak için kullanılır; fiil çekimi zaten kişiyi verir. Resmî hitapta polite form (dumneavoastră) çok önemlidir.",
        examples: [
          "eu, tu, el/ea, noi, voi, ei/ele",
          "Dumneavoastră sunteți profesor?",
          "Noi învățăm împreună.",
        ],
      },
      {
        subtitle: "3.2 Nesne Zamirleri (kısa biçimler)",
        explanation:
          "Mă, te, îl, o, ne, vă, îi, le gibi kısa zamirler fiilden önce/sonra konumlanır. Cümlenin anlamı bu küçük parçalarla ciddi biçimde değişebilir.",
        examples: [
          "Îl văd pe Mihai. (Onu görüyorum)",
          "Mă aude? (Beni duyuyor mu?)",
          "Le explic regula. (Onlara kuralı açıklıyorum)",
        ],
      },
      {
        subtitle: "3.3 Sıfat Uyumu ve Sıra",
        explanation:
          "Sıfatlar cinsiyet ve sayıya göre uyum sağlar. En sık model: isim + sıfat; ancak vurguda sıfat öne geçebilir.",
        examples: [
          "băiat inteligent / băieți inteligenți",
          "fată frumoasă / fete frumoase",
          "un om foarte calm",
        ],
      },
    ],
  },
  {
    title: "Bölüm 4 · Fiiller ve Zamanlar",
    level: "A1 → C1",
    sections: [
      {
        subtitle: "4.1 Şimdiki Zaman (Prezent)",
        explanation:
          "Rutinleri, alışkanlıkları ve o an gerçekleşen eylemleri ifade eder. Temel iletişimin omurgasıdır.",
        examples: [
          "Eu lucrez acasă.",
          "Tu vorbești românește foarte bine.",
          "Ei merg la școală în fiecare zi.",
        ],
      },
      {
        subtitle: "4.2 Perfect Compus ve Imperfect",
        explanation:
          "Perfect compus tamamlanmış olaylar içindir; imperfect arka plan, tekrar eden geçmiş durumlar ve devam eden eylemler için kullanılır.",
        examples: [
          "Am terminat tema. (Ödevi bitirdim)",
          "Când eram copil, citeam mult. (Çocukken çok okurdum)",
          "Ieri am fost la doctor.",
        ],
      },
      {
        subtitle: "4.3 Gelecek Zaman",
        explanation:
          "Günlük konuşmada 'o să + fiil' yapısı çok yaygındır. Daha resmî kullanımda yardımcı fiille çekimlenen gelecek formlar görülür.",
        examples: [
          "O să vin mâine. (Yarın geleceğim)",
          "Vom discuta după curs. (Dersten sonra konuşacağız)",
          "Cred că va ninge. (Sanırım kar yağacak)",
        ],
      },
      {
        subtitle: "4.4 Koşul ve Gereklilik",
        explanation:
          "B1 ve sonrası seviyede istek, öneri, olasılık ve şart bildiren yapılar iletişim kalitesini büyük ölçüde yükseltir.",
        examples: [
          "Aș merge, dar nu am timp. (Giderdim ama vaktim yok)",
          "Trebuie să înveți zilnic. (Her gün çalışmalısın)",
          "Dacă plouă, rămânem acasă. (Yağmur yağarsa evde kalırız)",
        ],
      },
    ],
  },
  {
    title: "Bölüm 5 · Bağlaçlar, Edatlar ve Pratik Cümle Kalıpları",
    level: "A2 → C1",
    sections: [
      {
        subtitle: "5.1 Sık Kullanılan Edatlar",
        explanation:
          "Edatlar isimlerle birlikte anlam kurar; yanlış edat seçimi anlamı bozar. Kalıp olarak öğrenmek daha verimlidir.",
        examples: [
          "la școală (okula), în oraș (şehirde), cu prietenii (arkadaşlarla)",
          "pentru tine (senin için), fără zahăr (şekersiz)",
          "despre film (film hakkında)",
        ],
      },
      {
        subtitle: "5.2 Cümleleri Birleştiren Bağlaçlar",
        explanation:
          "Karmaşık cümle kurmanın temeli doğru bağlaç kullanımıdır. Özellikle că, dacă, deoarece, deși yapıları sınav ve konuşmada çok sık çıkar.",
        examples: [
          "Știu că ai dreptate. (Haklı olduğunu biliyorum)",
          "Dacă ai timp, vino. (Vaktin varsa gel)",
          "Am venit deși eram obosit. (Yorgun olmama rağmen geldim)",
        ],
      },
      {
        subtitle: "5.3 Günlük Hayat İçin Hazır Kalıplar",
        explanation:
          "Hazır cümle kalıpları, kelime bilgisi sınırlı olsa bile iletişimi sürdürmeyi sağlar. Her gün 5 kalıp tekrar etmek hızlı ilerleme sağlar.",
        examples: [
          "Mi-ar plăcea să... (Şunu isterdim...)",
          "Nu sunt sigur, dar... (Emin değilim ama...)",
          "Poți să repeți, te rog? (Tekrar eder misin, lütfen?)",
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
          </header>

          <div className="space-y-5">
            {grammarBook.map((chapter) => (
              <section key={chapter.title} className="rounded-xl border border-border p-5 bg-background/50 space-y-4">
                <div className="space-y-2">
                  <h2 className="text-lg font-extrabold text-foreground">{chapter.title}</h2>
                  <p className="text-xs font-bold uppercase tracking-wide text-flamingo">Seviye: {chapter.level}</p>
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
