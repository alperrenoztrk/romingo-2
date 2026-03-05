export interface GrammarTable {
  headers: string[];
  rows: string[][];
}

export interface GrammarSection {
  id: string;
  title: string;
  level?: string;
  content: GrammarBlock[];
}

export interface GrammarExerciseItem {
  prompt: string;
  answers: string[];
}

export type GrammarBlock =
  | { type: "paragraph"; text: string }
  | { type: "heading"; text: string; level: 2 | 3 | 4 }
  | { type: "table"; data: GrammarTable }
  | { type: "list"; items: Array<string | GrammarExerciseItem> }
  | { type: "tip"; title: string; text: string }
  | { type: "warning"; title: string; text: string }
  | { type: "example"; pairs: { ro: string; tr: string }[] }
  | { type: "divider" };

export const grammarSections: GrammarSection[] = [
  // ─────────────────────────────────────────────────────────
  // BÖLÜM 1 — Giriş ve Alfabe
  // ─────────────────────────────────────────────────────────
  {
    id: "bolum-1",
    title: "BÖLÜM 1 — Giriş ve Alfabe",
    content: [
      {
        type: "paragraph",
        text: "Romence (limba română), Hint-Avrupa dil ailesinin Roman koluna mensup bir dildir. Yaklaşık 25 milyon kişi tarafından anadil olarak konuşulmakta; Romanya ve Moldova'da resmi dil statüsü taşımaktadır. Latin kökleri sayesinde İtalyanca, İspanyolca, Fransızca ve Portekizce ile büyük benzerlikler taşır — bu dilleri bilen biri Romence metnin yaklaşık %60'ını tahmin edebilir.",
      },
      {
        type: "table",
        data: {
          headers: ["Özellik", "Bilgi"],
          rows: [
            ["Dil Ailesi", "Hint-Avrupa → İtalik → Roman → Doğu Roman"],
            ["Resmi Olduğu Ülkeler", "Romanya, Moldova; azınlık dili: Sırbistan, Ukrayna, Macaristan"],
            ["Anadil Konuşucu Sayısı", "~25 milyon (toplam ~30 milyon ikinci dil dahil)"],
            ["Yazı Sistemi", "Latin alfabesi (31 harf, 5 özel karakter)"],
            ["Söz Varlığı Kökeni", "%70 Latince, %15 Slavca, %10 Türkçe+Yunanca, %5 diğer"],
            ["ISO 639-1 Kodu", "ro"],
          ],
        },
      },
      {
        type: "tip",
        title: "💡 Türkçe Konuşanlar İçin Avantajlar",
        text: "Romence ve Türkçe, Osmanlı dönemindeki uzun temas nedeniyle 1000'den fazla ortak (veya benzer) kelime paylaşır. cafea (kahve), pilaf, geam (cam), tavan, dușman (düşman)... gibi pek çok kelimeyi zaten biliyorsunuz.\n\nRomence'nin fiil çekimi düzenli ve öngörülebilirdir; kalıpları bir kez kavradıktan sonra yeni fiillere kolayca uygulayabilirsiniz.\n\nTelaffuz fonetik kurallara büyük ölçüde uygundur: yazdığınız gibi okursunuz (birkaç özel kural dışında).",
      },
      {
        type: "heading",
        text: "1.1 Alfabe (Alfabetul Român)",
        level: 3,
      },
      {
        type: "paragraph",
        text: "Romence 31 harften oluşur. Bunların 26'sı standart Latin harfleriyle örtüşür; 5 tanesi ise Romence'ye özgüdür. Bu 5 özel harfi doğru yazmak hem yazım hem de bilgisayarda metin girişi açısından önemlidir.",
      },
      {
        type: "table",
        data: {
          headers: ["Harf", "Büyük", "Ses (IPA)", "Türkçe'ye Benzerlik", "Örnek"],
          rows: [
            ["ă", "Ă", "/ə/", "'e' ile 'a' arası, vurgusuz hece", "băiat /bəˈjat/ — oğlan"],
            ["â", "Â", "/ɨ/", "Türkçe'de yok; ağzı 'ı' gibi açarak 'e' demek", "cânt /kɨnt/ — şarkı söylerim"],
            ["î", "Î", "/ɨ/", "â ile birebir aynı ses", "în /ɨn/ — içinde"],
            ["ș", "Ș", "/ʃ/", "Türkçe 'ş' ile aynı", "școală /ʃkwaˈlə/ — okul"],
            ["ț", "Ț", "/ts/", "Türkçe 'ts' / 'c' ünsüzü", "țară /ˈtsarə/ — ülke"],
          ],
        },
      },
      {
        type: "warning",
        title: "â ile ă Karıştırmayın!",
        text: "Bu iki harf çok farklı sesleri temsil eder ve kelime anlamını değiştirir:\n\n• â → /ɨ/ (dil ortada, dudaklar yarı açık, 'ı'ya yakın yuvarlak olmayan ses)\n• ă → /ə/ (şwa; İngilizce'de 'about' kelimesinin 'a'sı gibi, belirsiz ve kısa)\n\nKural: â yalnızca kelime ortasında kullanılır (cânt, român). î ise kelime başında ve sonunda kullanılır (în, înalt, a coborî). Bilgisayarda ș ve ț yazarken virgüllü (ș,ț) biçimleri kullanın, tırnaklı (ş,ţ) değil — bunlar farklı Unicode karakterleridir!",
      },
      {
        type: "heading",
        text: "1.2 Tam Alfabe Tablosu (Alfabetul Complet)",
        level: 3,
      },
      {
        type: "table",
        data: {
          headers: ["Küçük", "Büyük", "Telaffuz", "Örnek Kelime", "Türkçesi"],
          rows: [
            ["a", "A", "/a/", "apă", "su"],
            ["ă", "Ă", "/ə/ (şwa)", "băiat", "oğlan"],
            ["â", "Â", "/ɨ/", "cânt", "şarkı söylerim"],
            ["b", "B", "/b/", "bun", "iyi"],
            ["c", "C", "/k/ veya /tʃ/", "casă / ce", "ev / ne"],
            ["d", "D", "/d/", "dor", "özlem"],
            ["e", "E", "/e/", "este", "o/bu (fiil)"],
            ["f", "F", "/f/", "fată", "kız"],
            ["g", "G", "/g/ veya /dʒ/", "gară / ger", "tren istasyonu / soğuk"],
            ["h", "H", "/h/", "hotel", "otel"],
            ["i", "I", "/i/", "iarnă", "kış"],
            ["î", "Î", "/ɨ/", "în", "içinde"],
            ["j", "J", "/ʒ/", "joi", "Perşembe"],
            ["k", "K", "/k/", "kilogram", "kilogram (alıntı kelime)"],
            ["l", "L", "/l/", "lapte", "süt"],
            ["m", "M", "/m/", "masă", "masa"],
            ["n", "N", "/n/", "noapte", "gece"],
            ["o", "O", "/o/", "om", "adam/insan"],
            ["p", "P", "/p/", "pâine", "ekmek"],
            ["q", "Q", "/kw/", "(yabancı kelimelerde)", "—"],
            ["r", "R", "/r/ (titrek)", "român", "Rumen"],
            ["s", "S", "/s/", "soare", "güneş"],
            ["ș", "Ș", "/ʃ/ (Türkçe ş)", "școală", "okul"],
            ["t", "T", "/t/", "tren", "tren"],
            ["ț", "Ț", "/ts/", "țară", "ülke"],
            ["u", "U", "/u/", "ușă", "kapı"],
            ["v", "V", "/v/", "vară", "yaz"],
            ["w", "W", "/v/ veya /w/", "(yabancı kelimelerde)", "—"],
            ["x", "X", "/ks/ veya /gz/", "exemplu", "örnek"],
          ],
        },
      },
      {
        type: "tip",
        title: "📌 Öğrenme Önceliği",
        text: "K, Q, W, Y harfleri Romence'de yalnızca yabancı kökenli kelimelerde görülür (kilogram, quasar, weekend, yoga gibi). Bunları başlangıçta ezberlemek yerine önce 27 temel harfi öğrenin.\n\nRomence'ye özgü 5 harf olan Ă, Â, Î, Ș, Ț'yi doğru yazmak çok önemlidir. Özellikle Ș/ș (virgüllü) ile Ş/ş (cedillalı) farklı Unicode karakterleridir — yalnızca virgüllü olanı Romence standardıdır.",
      },
    ],
  },

  // ─────────────────────────────────────────────────────────
  // BÖLÜM 2 — Sesler ve Telaffuz
  // ─────────────────────────────────────────────────────────
  {
    id: "bolum-2",
    title: "BÖLÜM 2 — Sesler ve Telaffuz (Pronunție)",
    content: [
      {
        type: "paragraph",
        text: "Romence telaffuzu oldukça düzenli bir dildir; ancak bazı harf kombinasyonları özgün sesler üretir. Bu kombinasyonları öğrendikten sonra herhangi bir Romence kelimeyi doğru okuyabilirsiniz.",
      },
      {
        type: "table",
        data: {
          headers: ["Harf Kombinasyonu", "Okunuş", "Açıklama", "Örnekler"],
          rows: [
            ["ce, ci", "/tʃe/, /tʃi/", "Türkçe 'ç' gibi", "ce (ne)→çe, cinema→çinema, cine→çine"],
            ["che, chi", "/ke/, /ki/", "'h' sessiz kalır, yalnızca 'k' sesi çıkar", "cheie→/keje/ (anahtar), chiar→/kjar/ (tam/bile)"],
            ["ge, gi", "/dʒe/, /dʒi/", "Türkçe 'c' gibi", "ger→/dʒer/, girafă→/dʒirafə/ (zürafa)"],
            ["ghe, ghi", "/ge/, /gi/", "'h' sessiz, 'g' sert kalır", "ghete→gete, ghid→gid"],
            ["oa", "/wa/", "'o'+'a' ünlü kaynaşması", "oameni→/wameni/ (insanlar)"],
            ["ea", "/ea/ veya /ja/", "'e'+'a' ünlü kaynaşması", "femeie→/femeje/, seară→/sjarə/ (akşam)"],
            ["ia, ie", "/ja/, /je/", "'i' yarı ünlü olur", "iarnă→/jarnə/ (kış), ieftin→/jeftin/ (ucuz)"],
            ["x", "/ks/ veya /gz/", "Kelime başı ve sedasız ünsüz önünde /ks/", "taxi→/taksi/, exemplu→/egzemplu/ (örnek)"],
            ["h", "/h/", "Her zaman sesli (Türkçe gibi)", "hotel, hai (hadi)"],
            ["v", "/v/", "İngilizce v gibi", "vară (yaz), veni (gelmek)"],
          ],
        },
      },
      {
        type: "tip",
        title: "💡 Vurgu Kuralı",
        text: "Romence'de sabit bir vurgu kuralı yoktur; vurgu kelimenin herhangi bir hecesine düşebilir. Ancak pratikte çoğu kelimede sondan ikinci hecede vurgu görülür.\n\nÖrn: ca-să (kaSA), fru-moa-să (fruMOAsă), bu-cu-reș-ti (buCUreşTI).\n\nKelime ezberlerken vurguyu da birlikte öğrenmek en sağlıklı yoldur.",
      },
    ],
  },

  // ─────────────────────────────────────────────────────────
  // BÖLÜM 3 — İsimler ve Hâl Sistemi
  // ─────────────────────────────────────────────────────────
  {
    id: "bolum-3",
    title: "BÖLÜM 3 — İsimler ve Hâl Sistemi (Substantive și Cazuri)",
    content: [
      {
        type: "paragraph",
        text: "Romence isim sistemi üç temel ekseni üzerinde döner: cinsiyet (gen), sayı (număr) ve durum/hâl (caz). Bu üç eksen birleşince ezberlenmesi gereken biçimler ortaya çıkar; ancak kalıplar içsel bir mantık taşıdığından çoğu biçim tahmin edilebilirdir.",
      },
      {
        type: "heading",
        text: "3.1 Gramatik Cinsiyet (Genul Gramatical)",
        level: 3,
      },
      {
        type: "paragraph",
        text: "Romence'nin en dikkat çekici özelliği, çoğu Roman dilinde olmayan nötr (neutru) cinsiyi korumasıdır. Nötr isimler tekil hâlde eril gibi, çoğul hâlde dişil gibi davranır.",
      },
      {
        type: "table",
        data: {
          headers: ["Cinsiyet", "Tanıma İpuçları", "Tekil Örnekler", "Çoğul Örnekler"],
          rows: [
            ["Eril (masculin)", "Çoğunlukla ünsüz veya -u ile biter", "băiat, om, frate, câine", "băieți, oameni, frați, câini"],
            ["Dişil (feminin)", "-ă, -e, -ie ile biter", "casă, fată, familie, carte", "case, fete, familii, cărți"],
            ["Nötr (neutru)", "Tekil eril gibi, çoğul dişil gibi", "scaun, lucru, birou, teatru", "scaune, lucruri, birouri, teatre"],
          ],
        },
      },
      {
        type: "tip",
        title: "🔑 Nötr Cinsiyi Nasıl Ezberlemeli?",
        text: "Nötr isimler, Romence söz varlığının yaklaşık 1/3'ünü oluşturur ve genellikle cansız nesneler, soyut kavramlar ile ödünç kelimelerdir.\n\nEn iyi strateji: Her nötr ismi hem tekil hem çoğul hâliyle öğrenmek. Örn: 'scaun / scaune', 'lucru / lucruri', 'birou / birouri'.\n\nÇoğul eki -uri ise hemen hemen her zaman nötr cinsinin işaretidir — bu tek ipucu bile pek çok kelimeyi tanımanızı sağlar.",
      },
      {
        type: "heading",
        text: "3.2 Tekil ve Çoğul (Singular și Plural)",
        level: 3,
      },
      {
        type: "table",
        data: {
          headers: ["Cinsiyet", "Tekil Son Ek", "Çoğul Son Ek", "Örnekler"],
          rows: [
            ["Eril", "-u", "-i", "fiu→fii, copil→copii, om→oameni (düzensiz)"],
            ["Eril", "ünsüz", "-i", "bărbat→bărbați, student→studenți, profesor→profesori"],
            ["Dişil", "-ă", "-e veya -i", "casă→case, fată→fete; mașină→mașini"],
            ["Dişil", "-e", "-i", "carte→cărți, noapte→nopți (iç ünlü değişimi var)"],
            ["Dişil", "-ie", "-ii", "familie→familii, idee→idei"],
            ["Nötr", "ünsüz / -u", "-uri", "lucru→lucruri, birou→birouri, corp→corpuri"],
            ["Nötr", "ünsüz", "-e", "scaun→scaune, teatru→teatre"],
          ],
        },
      },
      {
        type: "heading",
        text: "3.3 Hâl Sistemi — Derinlemesine (Sistemul Cazurilor)",
        level: 3,
      },
      {
        type: "paragraph",
        text: "Romence beş hâl tanır. Pratik açıdan en kritik ayrım şudur: Nominatif–Akuzatif tek biçim paylaşır, Genitif–Datif de tek biçim paylaşır. Yani ezberlenecek biçim sayısı göründüğünden çok daha azdır.",
      },
      {
        type: "table",
        data: {
          headers: ["Hâl", "Kısa", "Temel İşlev", "Türkçe Paraleli", "Örnek Cümle"],
          rows: [
            ["Nominatif", "N", "Cümlenin öznesi", "Yalın hâl", "Băiatul cântă. (Oğlan şarkı söylüyor.)"],
            ["Akuzatif", "Ac", "Doğrudan nesne + edat tümleci", "-i/-ı/-e/-a hâli + edatlı yapılar", "Văd băiatul. (Oğlanı görüyorum.)"],
            ["Genitif", "G", "İyelik: kimin/neyin", "-in/-nın/-ün/-nün hâli", "Cartea băiatului. (Oğlanın kitabı.)"],
            ["Datif", "D", "Dolaylı nesne: kime/neye", "-e/-a hâli", "Dau cartea băiatului. (Kitabı oğlana veriyorum.)"],
            ["Vokativ", "V", "Doğrudan seslenme", "Ey.../Hey... eki", "Băiete! (Ey oğlan!) / Mamă! (Anne!)"],
          ],
        },
      },
      {
        type: "tip",
        title: "📌 N–Ac ve G–D Birleşimi",
        text: "Romence dilbilgisinde N ve Ac hâlleri aynı sözcük biçimini taşır; ayrımı yalnızca cümledeki görev ve bağlam belirler.\n\nAynı şekilde G ve D hâlleri de tek biçimde gösterilir. Bu durum ezberlemeyi büyük ölçüde kolaylaştırır.\n\nSonuç: Bir ismin tam çekimi için yalnızca 2 biçim çifti (N/Ac ve G/D) öğrenmek yeterlidir.",
      },
      {
        type: "heading",
        text: "3.4 Genitif–Datif: Yapı, Çekim ve Pratik Kullanım",
        level: 3,
      },
      {
        type: "paragraph",
        text: "Genitif–Datif biçimi Romence öğrencilerinin en çok zorlandığı alandır. Romence'de bu hâl, ismin belirli artikelini aldıktan sonra özel bir biçime girer.",
      },
      {
        type: "table",
        data: {
          headers: ["Cinsiyet ve Sayı", "Nominatif/Akuzatif (belirli)", "Genitif/Datif (belirli)", "Örnekler G/D"],
          rows: [
            ["Eril tekil", "băiatul", "băiatului", "cartea băiatului (oğlanın kitabı)"],
            ["Eril tekil", "profesorul", "profesorului", "nota profesorului (öğretmenin notu)"],
            ["Dişil tekil", "fata", "fetei", "cartea fetei (kızın kitabı)"],
            ["Dişil tekil", "mama", "mamei", "casa mamei (annenin evi)"],
            ["Dişil tekil", "cartea (kitap)", "cărții", "coperta cărții (kitabın kapağı)"],
            ["Nötr tekil", "scaunul", "scaunului", "piciorul scaunului (sandalyenin ayağı)"],
            ["Eril çoğul", "băieții", "băieților", "cartea băieților (oğlanların kitabı)"],
            ["Dişil çoğul", "fetele", "fetelor", "cartea fetelor (kızların kitabı)"],
            ["Nötr çoğul", "scaunele", "scaunelor", "picioarele scaunelor (sandalyelerin ayakları)"],
          ],
        },
      },
      {
        type: "heading",
        text: "Belirsiz İsimde G/D: 'unui / unei + isim' Yapısı",
        level: 4,
      },
      {
        type: "table",
        data: {
          headers: ["Cinsiyet", "Belirsiz Genitif/Datif", "Örnek", "Türkçesi"],
          rows: [
            ["Eril/Nötr tekil", "unui + isim", "Dau unui prieten. / cartea unui om", "Bir arkadaşa veriyorum. / bir adamın kitabı"],
            ["Dişil tekil", "unei + isim", "Dau unei fete. / casa unei doamne", "Bir kıza veriyorum. / bir hanımın evi"],
            ["Tüm çoğul", "unor + isim", "Dau unor copii. / cartea unor elevi", "Bazı çocuklara veriyorum. / bazı öğrencilerin kitabı"],
          ],
        },
      },
      {
        type: "warning",
        title: "Genitif Yapısında Söz Dizimi",
        text: "Romence Genitif yapısında iyelik SONRAYA gelir (Türkçe'nin tersine!):\n\n• Türkçe: 'öğrencinin kitabı' → önce sahip, sonra nesne\n• Romence: 'cartea elevului' → önce nesne (belirli), sonra sahip (G/D biçimi)\n• YANLIŞ: *elevului cartea ✗\n• DOĞRU: cartea elevului ✓",
      },
      {
        type: "example",
        pairs: [
          { ro: "cartea profesorului de română", tr: "Romence öğretmeninin kitabı" },
          { ro: "ușa camerei mele", tr: "Odamın kapısı" },
          { ro: "numele orașului", tr: "Şehrin adı" },
          { ro: "Dau unui coleg informații.", tr: "Bir meslektaşa bilgi veriyorum." },
          { ro: "Am spus mamei adevărul.", tr: "Anneye gerçeği söyledim." },
          { ro: "Aparțin acestei echipe.", tr: "Bu takıma aitim. (Datif: echipei)" },
          { ro: "Îi mulțumesc profesorului.", tr: "Öğretmene teşekkür ediyorum." },
        ],
      },
      {
        type: "heading",
        text: "3.5 Artikel Sistemi: Belirli, Belirsiz ve İşaret Artikeli",
        level: 3,
      },
      {
        type: "paragraph",
        text: "Romence'nin en özgün özelliği, belirli artikelin ismin SONUNA eklenmesidir (artakili artikel). Bu özellik Balkanlarda 'Balkan Sprachbund' (Dil Birliği) adı verilen temas bölgesinin etkisiyle ortaya çıkmış ve Romenceyi tüm diğer Roman dillerinden ayırır.",
      },
      {
        type: "table",
        data: {
          headers: ["Cinsiyet", "Belirsiz (önüne gelir)", "Belirli Tekil N/Ac", "Belirli Tekil G/D", "Belirli Çoğul N/Ac", "Belirli Çoğul G/D"],
          rows: [
            ["Eril", "un", "-ul / -le", "-lui", "-ii / -i", "-ilor"],
            ["Dişil", "o", "-a", "-ei", "-le / -i", "-lor"],
            ["Nötr", "un", "-ul / -l", "-lui", "-le / -uri", "-lor"],
          ],
        },
      },
      {
        type: "heading",
        text: "3.6 Artikel + Hâl Etkileşimi",
        level: 3,
      },
      {
        type: "table",
        data: {
          headers: ["Hâl", "Eril Tekil", "Dişil Tekil", "Eril Çoğul", "Dişil Çoğul"],
          rows: [
            ["Belirsiz N/Ac", "un băiat", "o fată", "niște băieți", "niște fete"],
            ["Belirsiz G/D", "unui băiat", "unei fete", "unor băieți", "unor fete"],
            ["Belirli N/Ac", "băiatul", "fata", "băieții", "fetele"],
            ["Belirli G/D", "băiatului", "fetei", "băieților", "fetelor"],
          ],
        },
      },
      {
        type: "tip",
        title: "🔑 Altın Kural: Belirli G/D",
        text: "Eril/nötr tekil belirli G/D daima -lui ile biter.\nDişil tekil belirli G/D daima -ei ile biter.\nÇoğul G/D daima -lor ile biter.\n\nBu üç son ek (-lui / -ei / -lor) ezberlenirse Genitif-Datif sisteminin %90'ı çözülür.",
      },
      {
        type: "example",
        pairs: [
          { ro: "un băiat / băiatul / băiatului / băieții / băieților", tr: "bir oğlan / oğlan(def.) / oğlanın / oğlanlar / oğlanların" },
          { ro: "o fată / fata / fetei / fetele / fetelor", tr: "bir kız / kız / kızın / kızlar / kızların" },
          { ro: "un scaun / scaunul / scaunului / scaunele / scaunelor", tr: "bir sandalye / sandalye / sandalyenin / sandalyeler / sandalyelerin" },
        ],
      },
    ],
  },

  // ─────────────────────────────────────────────────────────
  // BÖLÜM 4 — Sıfatlar
  // ─────────────────────────────────────────────────────────
  {
    id: "bolum-4",
    title: "BÖLÜM 4 — Sıfatlar (Adjective)",
    content: [
      {
        type: "paragraph",
        text: "Romence sıfatları nitelendirdikleri isimle cinsiyet, sayı ve durum bakımından uyum (acord) sağlar. Bu uyum zorunludur; ihmal edilmesi cümleyi dilbilgisel açıdan yanlış kılar.",
      },
      {
        type: "heading",
        text: "4.1 Cinsiyet ve Sayı Uyumu (Acordul)",
        level: 3,
      },
      {
        type: "table",
        data: {
          headers: ["Sıfat", "Eril Tekil", "Dişil Tekil", "Eril Çoğul", "Dişil Çoğul", "Türkçesi"],
          rows: [
            ["frumos", "frumos", "frumoasă", "frumoși", "frumoase", "güzel/yakışıklı"],
            ["bun", "bun", "bună", "buni", "bune", "iyi"],
            ["mare", "mare", "mare", "mari", "mari", "büyük (2 biçim)"],
            ["mic", "mic", "mică", "mici", "mici", "küçük"],
            ["nou", "nou", "nouă", "noi", "noi", "yeni"],
            ["vechi", "vechi", "veche", "vechi", "vechi", "eski (2 biçim)"],
            ["înalt", "înalt", "înaltă", "înalți", "înalte", "uzun boylu"],
            ["scurt", "scurt", "scurtă", "scurți", "scurte", "kısa"],
            ["ieftin", "ieftin", "ieftină", "ieftini", "ieftine", "ucuz"],
            ["scump", "scump", "scumpă", "scumpi", "scumpe", "pahalı"],
            ["tânăr", "tânăr", "tânără", "tineri", "tinere", "genç"],
            ["bătrân", "bătrân", "bătrână", "bătrâni", "bătrâne", "yaşlı"],
            ["drăguț", "drăguț", "drăguță", "drăguți", "drăguțe", "sevimli/hoş"],
            ["simplu", "simplu", "simplă", "simpli", "simple", "basit/sade"],
          ],
        },
      },
      {
        type: "tip",
        title: "💡 2 Biçimli ve 4 Biçimli Sıfatlar",
        text: "Romence sıfatları iki gruba ayrılır:\n\n• 4 biçimli: En kalabalık grup. Eril/Dişil tekil ve çoğul için dört farklı biçim. Örn: frumos/frumoasă/frumoși/frumoase.\n• 2 biçimli: Tekil ve çoğul için yalnızca iki biçim; eril/dişil ayrımı yoktur. Örn: mare/mari, vechi/vechi.\n• Sıfırdan değişmeyen sıfatlar: gri (gri), mov (mor), roz (pembe) — bu renkler hiç değişmez.",
      },
      {
        type: "heading",
        text: "4.2 Sıfatın Konumu ve İsimle İlişkisi",
        level: 3,
      },
      {
        type: "paragraph",
        text: "Romence'de sıfatlar çoğunlukla ismin ARKASINA gelir. Bu özellik Türkçe'nin tam tersidir. Ancak bazı durumlarda sıfat öne geçebilir ve bu konum farkı anlam nüansı yaratır.",
      },
      {
        type: "example",
        pairs: [
          { ro: "un film bun / un bun film", tr: "iyi bir film (nötr) / iyi bir film (övgü içerir)" },
          { ro: "omul sărac / săracul om", tr: "fakir adam (tanımlama) / zavallı adam (acıma içerir)" },
          { ro: "același lucru de fiecare dată", tr: "her seferinde aynı şey" },
          { ro: "primul meu job", tr: "benim ilk işim" },
        ],
      },
      {
        type: "heading",
        text: "4.3 Derecelendirme: comparativ ve superlativ",
        level: 3,
      },
      {
        type: "table",
        data: {
          headers: ["Derece", "Yapı", "Örnek (frumos)", "Türkçe Karşılığı"],
          rows: [
            ["Pozitif", "sıfat yalın", "frumos", "güzel"],
            ["Comparativ superior", "mai + sıfat (+ decât/ca)", "mai frumos decât Ion", "Ion'dan daha güzel"],
            ["Comparativ de egalitate", "la fel de + sıfat + ca", "la fel de frumos ca Ion", "Ion kadar güzel"],
            ["Comparativ inferior", "mai puțin + sıfat (+ decât)", "mai puțin frumos decât Ion", "Ion'dan daha az güzel"],
            ["Superlativ relativ +", "cel/cea/cei/cele mai + sıfat", "cel mai frumos din clasă", "sınıfın en güzeli"],
            ["Superlativ relativ -", "cel/cea/cei/cele mai puțin + sıfat", "cel mai puțin frumos", "en az güzel olan"],
            ["Superlativ absolut", "foarte + sıfat", "foarte frumos", "çok güzel"],
            ["Superlativ absolut (pekiştirilmiş)", "tare/extrem de + sıfat", "tare frumos / extrem de frumos", "müthiş güzel"],
            ["Aşırılık (olumsuz)", "prea + sıfat", "prea frumos", "aşırı güzel (doğal olmayan)"],
          ],
        },
      },
      {
        type: "heading",
        text: "Düzensiz Karşılaştırma",
        level: 4,
      },
      {
        type: "table",
        data: {
          headers: ["Türkçe", "Pozitif", "Comparativ", "Superlativ"],
          rows: [
            ["iyi", "bun", "mai bun", "cel mai bun"],
            ["kötü", "rău", "mai rău", "cel mai rău"],
            ["büyük", "mare", "mai mare", "cel mai mare"],
            ["küçük", "mic", "mai mic", "cel mai mic"],
            ["çok (miktar)", "mult", "mai mult", "cel mai mult"],
            ["az", "puțin", "mai puțin", "cel mai puțin"],
          ],
        },
      },
      {
        type: "heading",
        text: "4.4 Sıfatların Hâl Uyumu",
        level: 3,
      },
      {
        type: "paragraph",
        text: "Belirli isim grubunda sıfat da hâl biçimine girer. Dişil tekil Genitif/Datif'te sıfatın sonuna -i eklenir; eril G/D'de artikel bu işi üstlendiğinden sıfat biçimi değişmez.",
      },
      {
        type: "example",
        pairs: [
          { ro: "cartea fetei frumoase (G/D)", tr: "güzel kızın kitabı" },
          { ro: "casa omului bogat", tr: "zengin adamın evi" },
          { ro: "prietena fetei tinere", tr: "genç kızın kız arkadaşı" },
          { ro: "mașina profesorului nou", tr: "yeni öğretmenin arabası" },
        ],
      },
    ],
  },

  // ─────────────────────────────────────────────────────────
  // BÖLÜM 5 — Zamirler
  // ─────────────────────────────────────────────────────────
  {
    id: "bolum-5",
    title: "BÖLÜM 5 — Zamirler (Pronume)",
    content: [
      {
        type: "paragraph",
        text: "Romence zamir sistemi, özellikle bağımlı (kısa) zamirlerin konumu ve birleşimi bakımından öğrenciler için özel bir zorluk alanı oluşturur. Dilbilimde 'klitik' olarak da adlandırılan bu kısa zamir biçimleri, tek başına vurgu alamaz; daima bir fiile yaslanarak kullanılır.",
      },
      {
        type: "heading",
        text: "5.1 Kişi Zamirleri — Tüm Hâller",
        level: 3,
      },
      {
        type: "table",
        data: {
          headers: ["Kişi", "Nominatif", "Akuzatif (kısa)", "Akuzatif (uzun)", "Datif (kısa)", "Datif (uzun)"],
          rows: [
            ["eu (ben)", "eu", "mă", "pe mine", "îmi", "mie"],
            ["tu (sen)", "tu", "te", "pe tine", "îți", "ție"],
            ["el (o-eril)", "el", "îl", "pe el", "îi", "lui"],
            ["ea (o-dişil)", "ea", "o", "pe ea", "îi", "ei"],
            ["noi (biz)", "noi", "ne", "pe noi", "ne", "nouă"],
            ["voi (siz)", "voi", "vă", "pe voi", "vă", "vouă"],
            ["ei (onlar-e)", "ei", "îi", "pe ei", "le", "lor"],
            ["ele (onlar-d)", "ele", "le", "pe ele", "le", "lor"],
          ],
        },
      },
      {
        type: "heading",
        text: "5.2 Bağımlı Zamir Konumu ve Birleşim Kuralları",
        level: 3,
      },
      {
        type: "heading",
        text: "A. Kısa Zamir Fiilin ÖNÜNDE: Proklitik Kullanım",
        level: 4,
      },
      {
        type: "table",
        data: {
          headers: ["Yapı", "Örnek", "Türkçesi"],
          rows: [
            ["bağımlı zamir + fiil (olumlu)", "Mă vede. / Îl cunosc. / Îți scriu.", "Beni görüyor. / Onu tanıyorum. / Sana yazıyorum."],
            ["nu + bağımlı zamir + fiil (olumsuz)", "Nu mă vede. / Nu îl cunosc.", "Beni görmüyor. / Onu tanımıyorum."],
            ["Cümle başı + bağımlı zamir + fiil", "Ea îl iubește. / Ion îmi scrie.", "O onu seviyor. / Ion bana yazıyor."],
            ["İki bağımlı zamir: önce Datif, sonra Akuzatif", "Mi-l dă. / Ți-l dau.", "Onu bana veriyor. / Sana onu veriyorum."],
          ],
        },
      },
      {
        type: "heading",
        text: "B. Kısa Zamir Fiilin ARKASINDA: Enklitik Kullanım",
        level: 4,
      },
      {
        type: "table",
        data: {
          headers: ["Durum", "Örnek", "Türkçesi"],
          rows: [
            ["Olumlu emir kipi (imperativ)", "Dă-mi! / Du-te! / Spune-i! / Ajută-mă!", "Ver bana! / Git! / Ona söyle! / Bana yardım et!"],
            ["Mastar (infinitiv) biçiminde", "a-l vedea / a-i spune / a mă duce", "onu görmek / ona söylemek / gitmek"],
          ],
        },
      },
      {
        type: "heading",
        text: "C. İki Bağımlı Zamirin Birlikte Kullanımı",
        level: 4,
      },
      {
        type: "table",
        data: {
          headers: ["Datif Kısa", "Akuzatif Kısa", "Birleşik Biçim", "Örnek", "Türkçesi"],
          rows: [
            ["îmi (bana)", "îl", "mi-l", "Mi-l dă.", "Onu bana veriyor."],
            ["îmi", "o", "mi-o", "Mi-o dă.", "Onu (dişil) bana veriyor."],
            ["îți (sana)", "îl", "ți-l", "Ți-l dau.", "Onu sana veriyorum."],
            ["îți", "o", "ți-o", "Ți-o trimit.", "Onu sana gönderiyorum."],
            ["îi (ona)", "îl", "i-l", "I-l spun.", "Onu ona söylüyorum."],
            ["ne (bize)", "îl", "ni-l", "Ni-l arată.", "Onu bize gösteriyor."],
            ["vă (size)", "o", "vi-o", "Vi-o explic.", "Onu size açıklıyorum."],
            ["le (onlara)", "îl", "li-l", "Li-l dau.", "Onu onlara veriyorum."],
          ],
        },
      },
      {
        type: "heading",
        text: "D. Uzun (Vurgulu) Zamir Biçimleri",
        level: 4,
      },
      {
        type: "table",
        data: {
          headers: ["Kullanım", "Örnek", "Türkçesi"],
          rows: [
            ["Edattan sonra", "La mine. / Fără tine. / Cu el.", "Bende. / Sensiz. / Onunla."],
            ["Karşıtlık/vurgu için", "Pe mine mă vede, nu pe tine.", "Beni görüyor, seni değil."],
            ["Yüklem tümleci olarak", "Asta e pentru mine.", "Bu benim için."],
          ],
        },
      },
      {
        type: "heading",
        text: "5.3 İyelik Sıfatları ve Zamirleri",
        level: 3,
      },
      {
        type: "table",
        data: {
          headers: ["Sahip", "Eril Tek.", "Dişil Tek.", "Eril Çoğ.", "Dişil Çoğ.", "Örnek"],
          rows: [
            ["eu", "meu", "mea", "mei", "mele", "fratele meu / prietena mea"],
            ["tu", "tău", "ta", "tăi", "tale", "câinele tău / cartea ta"],
            ["el", "său / lui", "sa / lui", "săi / lui", "sale / lui", "prietenii săi / casa lui Ion"],
            ["ea", "său / ei", "sa / ei", "săi / ei", "sale / ei", "frații săi / familia ei"],
            ["noi", "nostru", "noastră", "noștri", "noastre", "copiii noștri / casa noastră"],
            ["voi", "vostru", "voastră", "voștri", "voastre", "părinții voștri / ideea voastră"],
            ["ei/ele", "lor", "lor", "lor", "lor", "cartea lor / părinții lor"],
          ],
        },
      },
      {
        type: "tip",
        title: "📌 İyelik Zamiri Kullanımı: al/a/ai/ale",
        text: "İyelik sıfatları bağımsız zamir olarak kullanıldığında başlarına al/a/ai/ale gösterme artikeli alır:\n\n• al meu / a mea / ai mei / ale mele → benimki (eril/dişil tekil, eril/dişil çoğul)\n• Acesta e al tău. → Bu seninki.\n• Mașina asta e a mea, nu a ta. → Bu araba benimki, senin değil.\n• Copiii ăia sunt ai lor. → O çocuklar onlarınki.",
      },
      {
        type: "heading",
        text: "5.4 İşaret, Belirsizlik ve Soru Zamirleri",
        level: 3,
      },
      {
        type: "table",
        data: {
          headers: ["Zamir Türü", "Romence", "Türkçesi", "Notlar"],
          rows: [
            ["İşaret (yakın)", "acesta (m) / aceasta (f) / ăsta/asta (günlük)", "bu", "Eril/Nötr: acesta; Dişil: aceasta"],
            ["İşaret (uzak)", "acela (m) / aceea (f) / ăla/aia (günlük)", "o / şu", "Eril: acela; Dişil: aceea"],
            ["İşaret (çoğul yakın)", "aceștia (m) / acestea (f)", "bunlar", "Akuzatif: pe aceștia / pe acestea"],
            ["İşaret (çoğul uzak)", "aceia (m) / acelea (f)", "onlar / şunlar", "Akuzatif: pe aceia / pe acelea"],
            ["Belirsizlik", "cineva (biri), ceva (bir şey)", "—", "Olumsuz: nimeni, nimic"],
            ["Belirsizlik", "toată lumea (herkes), fiecare (her biri)", "—", "fiecare + tekil fiil"],
            ["Soru", "cine (kim), ce (ne), care (hangi), câți/câte (kaç)", "—", "kim, ne, hangi, kaç"],
            ["Relatif", "care (ki/olan), pe care (ki onu/n)", "—", "ki o, ki onu"],
          ],
        },
      },
      {
        type: "example",
        pairs: [
          { ro: "Cine a venit? — Cineva necunoscut.", tr: "Kim geldi? — Birileri (tanımadık biri)." },
          { ro: "Ce vrei? — Nimic special.", tr: "Ne istiyorsun? — Özel bir şey değil." },
          { ro: "Care din ele e mai bună?", tr: "Hangisi daha iyi?" },
          { ro: "Omul care vorbește e profesorul.", tr: "Konuşan adam öğretmen." },
          { ro: "Cartea pe care o citesc e interesantă.", tr: "Okuduğum kitap ilginç. (pe care = relatif Ac)" },
          { ro: "Toată lumea știe asta.", tr: "Herkes bunu biliyor." },
          { ro: "Fiecare copil are nevoie de iubire.", tr: "Her çocuğun sevgiye ihtiyacı vardır." },
        ],
      },
    ],
  },

  // ─────────────────────────────────────────────────────────
  // BÖLÜM 6 — Fiiller
  // ─────────────────────────────────────────────────────────
  {
    id: "bolum-6",
    title: "BÖLÜM 6 — Fiiller (Verbe) — Kip ve Zaman Sistemi",
    content: [
      {
        type: "paragraph",
        text: "Romence fiil sistemi bu dilin en zengin boyutunu oluşturur. Çekim; kişi, sayı, zaman, kip ve görünüş bakımından gerçekleşir. Dört konjugasyon grubu vardır ve her grup kendi iç mantığına sahiptir.",
      },
      {
        type: "heading",
        text: "6.1 Kip Haritası — Romence Fiil Sistemi Özeti",
        level: 3,
      },
      {
        type: "table",
        data: {
          headers: ["Kip (Mod)", "Alt Zamanlar / Biçimler", "Temel İşlevi", "Türkçe Paraleli"],
          rows: [
            ["indicativ (haber kipi)", "Prezent, Imperfect, perfect compus, MMP, viitor I, II, anterior", "Gerçek eylemler", "Bildirme kipleri"],
            ["conjunctiv (isteme kipi)", "conjunctiv prezent, conjunctiv trecut", "İstek, amaç, zorunluluk", "İstek kipi / -meli yapısı"],
            ["condițional (koşul kipi)", "condițional prezent, condițional trecut", "Koşullu durum, nazik istek", "-se/-saydı yapıları"],
            ["imperativ (emir kipi)", "prezent (tu / voi)", "Emir, yasaklama, istek", "Emir kipi"],
            ["infinitiv (mastar)", "a + fiil (değişmez)", "Fiil adı; nesne/özne işlevi", "Mastar (-mak/-mek)"],
            ["participiu (geçmiş ortaç)", "Geçmiş ortaç", "Tamamlanmış eylem; sıfat", "-miş ortacı"],
            ["gerunziu (ulaç)", "Kök + -ând / -ind", "Eşzamanlı ya da bitişik eylem", "-arak/-erek"],
            ["supin (eylemlik)", "de + participiu", "Edilgen anlam, yükümlülük", "(Türkçe'de tam karşılığı yok)"],
          ],
        },
      },
      {
        type: "heading",
        text: "6.2 Dört Konjugasyon Grubu ve Mastar",
        level: 3,
      },
      {
        type: "table",
        data: {
          headers: ["Grup", "Mastar Son Eki", "Yaygın Fiiller", "Önemli Not"],
          rows: [
            ["I", "-a", "a cânta, a lucra, a aștepta, a pleca, a intra", "En kalabalık grup; yeni öğrenilen fiiller de bu gruba girer"],
            ["II", "-ea", "a vedea, a putea, a cădea, a bea, a tăcea", "Görece az sayıda fiil; ancak çok sık kullanılırlar"],
            ["III", "-e", "a merge, a face, a scrie, a zice, a pune, a cunoaște", "Düzensizlik en fazla bu grupta görülür"],
            ["IV", "-i / -î", "a veni, a dormi, a auzi, a coborî, a hotărî", "-î mastarlı fiiller kendi içinde düzenli çekime sahiptir"],
          ],
        },
      },
      {
        type: "heading",
        text: "6.3 Prezent — Şimdiki / Geniş Zaman",
        level: 3,
      },
      {
        type: "table",
        data: {
          headers: ["Kişi", "a cânta (söylemek)", "a vedea (görmek)", "a merge (gitmek)", "a veni (gelmek)"],
          rows: [
            ["eu", "cânt", "văd", "merg", "vin"],
            ["tu", "cânți", "vezi", "mergi", "vii"],
            ["el/ea", "cântă", "vede", "merge", "vine"],
            ["noi", "cântăm", "vedem", "mergem", "venim"],
            ["voi", "cântați", "vedeți", "mergeți", "veniți"],
            ["ei/ele", "cântă", "văd", "merg", "vin"],
          ],
        },
      },
      {
        type: "heading",
        text: "Sık Kullanılan Düzensiz Fiiller — Prezent",
        level: 4,
      },
      {
        type: "table",
        data: {
          headers: ["Kişi", "a fi (olmak)", "a avea (sahip olmak)", "a vrea (istemek)", "a ști (bilmek)", "a da (vermek)", "a lua (almak)"],
          rows: [
            ["eu", "sunt", "am", "vreau", "știu", "dau", "iau"],
            ["tu", "ești", "ai", "vrei", "știi", "dai", "iei"],
            ["el/ea", "este", "are", "vrea", "știe", "dă", "ia"],
            ["noi", "suntem", "avem", "vrem", "știm", "dăm", "luăm"],
            ["voi", "sunteți", "aveți", "vreți", "știți", "dați", "luați"],
            ["ei/ele", "sunt", "au", "vor", "știu", "dau", "iau"],
          ],
        },
      },
      {
        type: "heading",
        text: "6.4 Perfect Compus — Bileşik Geçmiş Zaman",
        level: 3,
      },
      {
        type: "paragraph",
        text: "Günlük konuşmada en sık kullanılan geçmiş zamandır. Yapısı: a avea çekimi + participiu (geçmiş ortaç). Türkçe'nin hem -dı/-di hem de -mış/-miş geçmişini karşılayabilir.",
      },
      {
        type: "table",
        data: {
          headers: ["Kişi", "a merge → mers", "a face → făcut", "a veni → venit", "a citi → citit"],
          rows: [
            ["eu", "am mers", "am făcut", "am venit", "am citit"],
            ["tu", "ai mers", "ai făcut", "ai venit", "ai citit"],
            ["el/ea", "a mers", "a făcut", "a venit", "a citit"],
            ["noi", "am mers", "am făcut", "am venit", "am citit"],
            ["voi", "ați mers", "ați făcut", "ați venit", "ați citit"],
            ["ei/ele", "au mers", "au făcut", "au venit", "au citit"],
          ],
        },
      },
      {
        type: "tip",
        title: "💡 Participiu (Geçmiş Ortaç) Kuralları",
        text: "Grup I (-a): kök + -at → cântat, lucrat, așteptat, plecat\nGrup II (-ea): kök + -ut → văzut, putut, căzut, băut\nGrup III (-e): çoğunlukla düzensiz → mers, făcut, scris, zis, pus\nGrup IV (-i/-î): kök + -it → venit, dormit, auzit, coborât\n\nDüzensiz ortaçlar: a fi→fost, a da→dat, a lua→luat, a vedea→văzut, a merge→mers, a face→făcut",
      },
      {
        type: "heading",
        text: "6.5 Imperfect — Süregelen/Alışkanlık Geçmiş Zaman",
        level: 3,
      },
      {
        type: "paragraph",
        text: "Imperfect, geçmişteki süregelen durumları, alışkanlıkları ve arka plan eylemlerini anlatır. Türkçe'de '-ıyordu' veya '-ardı/-erdi' ekine karşılık gelir.",
      },
      {
        type: "table",
        data: {
          headers: ["Kişi", "a cânta", "a merge", "a veni", "a fi"],
          rows: [
            ["eu", "cântam", "mergeam", "veneam", "eram"],
            ["tu", "cântai", "mergeai", "veneai", "erai"],
            ["el/ea", "cânta", "mergea", "venea", "era"],
            ["noi", "cântam", "mergeam", "veneam", "eram"],
            ["voi", "cântați", "mergeați", "veneți", "erați"],
            ["ei/ele", "cântau", "mergeau", "veneau", "erau"],
          ],
        },
      },
      {
        type: "example",
        pairs: [
          { ro: "Când eram copil, mergeam la bunici în fiecare vară.", tr: "Çocukken her yaz büyükanne-büyükbabama giderdim." },
          { ro: "El citea, iar ea desena.", tr: "O okuyordu, o ise resim yapıyordu." },
          { ro: "Ploua și era frig.", tr: "Yağmur yağıyordu ve hava soğuktu." },
        ],
      },
      {
        type: "heading",
        text: "6.6 Mai Mult ca Perfect — Pluperfect",
        level: 3,
      },
      {
        type: "paragraph",
        text: "Başka bir geçmiş eylemden daha önce tamamlanmış eylemleri anlatır. Türkçe'de '-mıştı / -dıydı' yapısına karşılık gelir. Romence'nin bu zamanı tamamen sentetiktir (yardımcı fiil kullanmaz).",
      },
      {
        type: "table",
        data: {
          headers: ["Kişi", "Yapı (a merge için)", "Türkçesi"],
          rows: [
            ["eu", "mersesem", "gitmiştim"],
            ["tu", "merseseși", "gitmiştin"],
            ["el/ea", "mersese", "gitmişti"],
            ["noi", "merseserăm", "gitmiştik"],
            ["voi", "merseserăți", "gitmiştiniz"],
            ["ei/ele", "merseseră", "gitmişlerdi"],
          ],
        },
      },
      {
        type: "heading",
        text: "6.7 Viitor — Gelecek Zaman",
        level: 3,
      },
      {
        type: "table",
        data: {
          headers: ["Zaman / Yapı", "Oluşum", "Örnek (a merge)", "Kullanım"],
          rows: [
            ["Viitor I (Resmî)", "voi/vei/va/vom/veți/vor + mastar", "voi merge, vei merge...", "Yazılı dil, resmî bağlamlar"],
            ["Viitor II (Günlük)", "o să + subjunctiv", "o să merg, o să mergi...", "Konuşma dili (çok yaygın)"],
            ["Viitor Anterior", "va fi + participiu", "va fi mers (gitmiş olacak)", "Gelecekteki tamamlanmışlık"],
            ["am de + mastar", "am/ai/are/avem... de + mastar", "am de mers (gitmeliyim)", "Yükümlülük bildirimi"],
          ],
        },
      },
      {
        type: "heading",
        text: "6.8 Condițional — Şart ve Koşul Kipi",
        level: 3,
      },
      {
        type: "table",
        data: {
          headers: ["Kişi", "Condițional Prezent", "Condițional Trecut", "Türkçe"],
          rows: [
            ["eu", "aș merge", "aș fi mers", "giderdim / gitmiş olurdum"],
            ["tu", "ai merge", "ai fi mers", "giderdin / gitmiş olurdun"],
            ["el/ea", "ar merge", "ar fi mers", "giderdi / gitmiş olurdu"],
            ["noi", "am merge", "am fi mers", "giderdik / gitmiş olurduk"],
            ["voi", "ați merge", "ați fi mers", "giderdiniz / gitmiş olurdunuz"],
            ["ei/ele", "ar merge", "ar fi mers", "giderlerdi / gitmiş olurlardı"],
          ],
        },
      },
      {
        type: "heading",
        text: "6.9 Conjunctiv — İsteme Kipi (Subjunctiv)",
        level: 3,
      },
      {
        type: "paragraph",
        text: "Conjunctiv, Romence'de son derece yaygın kullanılan ve Türkçe'de tek bir yapıya karşılık gelmeyen bir kiptir. İstek, amaç, zorunluluk ve olasılık bildiren fiillerden sonra mutlaka să + conjunctiv gelir.",
      },
      {
        type: "example",
        pairs: [
          { ro: "Vreau să merg.", tr: "Gitmek istiyorum." },
          { ro: "Trebuie să știi.", tr: "Bilmen gerekiyor." },
          { ro: "Este important să fii punctual.", tr: "Dakik olmak önemlidir." },
          { ro: "Sper să câștigăm.", tr: "Kazanmayı umuyoruz." },
          { ro: "Mi-e frică să vorbesc.", tr: "Konuşmaktan korkuyorum." },
          { ro: "Îl rog să vină.", tr: "Gelmesini rica ediyorum." },
          { ro: "Lasă-mă să explic.", tr: "Açıklamamıza izin verin." },
        ],
      },
      {
        type: "table",
        data: {
          headers: ["", "a merge", "a fi", "a veni"],
          rows: [
            ["(eu) să", "să merg", "să fiu", "să vin"],
            ["(tu) să", "să mergi", "să fii", "să vii"],
            ["(el/ea) să", "să meargă", "să fie", "să vină"],
            ["(noi) să", "să mergem", "să fim", "să venim"],
            ["(voi) să", "să mergeți", "să fiți", "să veniți"],
            ["(ei/ele) să", "să meargă", "să fie", "să vină"],
          ],
        },
      },
      {
        type: "heading",
        text: "6.10 Participiu ve Gerunziu",
        level: 3,
      },
      {
        type: "paragraph",
        text: "Participiu hem perfect compus zamanını oluşturmak hem de sıfat-fiil görevinde kullanılır. Gerunziu ise Türkçe'de -arak/-erek ekiyle karşılanabilecek süreç bildirir.",
      },
      {
        type: "example",
        pairs: [
          { ro: "apă fiartă", tr: "Kaynatılmış su (participiu sıfat olarak)" },
          { ro: "Mergând mai repede, am ajuns la timp.", tr: "Daha hızlı yürüyerek zamanında vardım." },
          { ro: "Vorbind românește, exersăm.", tr: "Romence konuşarak pratik yapıyoruz." },
        ],
      },
      {
        type: "heading",
        text: "6.11 Dönüşlü Fiiller (Verbe Reflexive)",
        level: 3,
      },
      {
        type: "paragraph",
        text: "Romence'de dönüşlü fiiller se zamiriyle işaretlenir. Türkçe'de çoğu zaman '-in-' veya '-il-' ekleriyle karşılanır; ancak Romence'deki kullanım çok daha geniştir.",
      },
      {
        type: "table",
        data: {
          headers: ["Mastar", "Anlamı", "Prezent (eu / el)", "Örnek Cümle"],
          rows: [
            ["a se trezi", "uyanmak", "mă trezesc / se trezește", "Mă trezesc la șapte. (Saat yedide uyanıyorum.)"],
            ["a se spăla", "yıkanmak", "mă spăl / se spală", "El se spală pe dinți. (Dişlerini fırçalıyor.)"],
            ["a se îmbrăca", "giyinmek", "mă îmbrac / se îmbracă", "Ea se îmbracă repede. (Çabuk giyiniyor.)"],
            ["a se duce", "gitmek", "mă duc / se duce", "Mă duc la piață. (Pazara gidiyorum.)"],
            ["a se simți", "hissetmek", "mă simt / se simte", "Cum te simți? (Nasıl hissediyorsun?)"],
            ["a se bucura", "sevinmek", "mă bucur / se bucură", "Mă bucur mult! (Çok sevindim!)"],
            ["a se întoarce", "dönmek", "mă întorc / se întoarce", "Mă întorc diseară. (Bu akşam dönüyorum.)"],
          ],
        },
      },
      {
        type: "heading",
        text: "6.12 Düzensiz Fiiller (Verbe Neregulate)",
        level: 3,
      },
      {
        type: "heading",
        text: "A. a fi — olmak",
        level: 4,
      },
      {
        type: "table",
        data: {
          headers: ["Kişi", "Prezent", "Imperfect", "Perfect Compus", "Conjunctiv"],
          rows: [
            ["eu", "sunt", "eram", "am fost", "să fiu"],
            ["tu", "ești", "erai", "ai fost", "să fii"],
            ["el/ea", "este / e", "era", "a fost", "să fie"],
            ["noi", "suntem", "eram", "am fost", "să fim"],
            ["voi", "sunteți", "erați", "ați fost", "să fiți"],
            ["ei/ele", "sunt", "erau", "au fost", "să fie"],
          ],
        },
      },
      {
        type: "example",
        pairs: [
          { ro: "Sunt student.", tr: "Öğrenciyim." },
          { ro: "Era obosit.", tr: "Yorgundu." },
          { ro: "Am fost la mare.", tr: "Denize gittim. (Denizdeydim.)" },
          { ro: "Fie ce-o fi.", tr: "Ne olursa olsun." },
        ],
      },
      {
        type: "heading",
        text: "B. a avea — sahip olmak / yardımcı fiil",
        level: 4,
      },
      {
        type: "table",
        data: {
          headers: ["Kişi", "Prezent", "Imperfect", "Perfect Compus", "Conjunctiv"],
          rows: [
            ["eu", "am", "aveam", "am avut", "să am"],
            ["tu", "ai", "aveai", "ai avut", "să ai"],
            ["el/ea", "are", "avea", "a avut", "să aibă"],
            ["noi", "avem", "aveam", "am avut", "să avem"],
            ["voi", "aveți", "aveați", "ați avut", "să aveți"],
            ["ei/ele", "au", "aveau", "au avut", "să aibă"],
          ],
        },
      },
      {
        type: "example",
        pairs: [
          { ro: "Am o carte.", tr: "Bir kitabım var." },
          { ro: "Nu am timp.", tr: "Zamanım yok." },
          { ro: "Ai dreptate.", tr: "Haklısın." },
          { ro: "Să aibă răbdare.", tr: "Sabrı olsun." },
        ],
      },
      {
        type: "heading",
        text: "C. a vrea — istemek",
        level: 4,
      },
      {
        type: "table",
        data: {
          headers: ["Kişi", "Prezent", "Imperfect", "Conjunctiv"],
          rows: [
            ["eu", "vreau", "voiam", "să vreau"],
            ["tu", "vrei", "voiai", "să vrei"],
            ["el/ea", "vrea", "voia", "să vrea"],
            ["noi", "vrem", "voiam", "să vrem"],
            ["voi", "vreți", "voiați", "să vreți"],
            ["ei/ele", "vor", "voiau", "să vrea"],
          ],
        },
      },
      {
        type: "heading",
        text: "D. Sık Kullanılan Düzensiz Fiiller — Özet Tablo",
        level: 4,
      },
      {
        type: "table",
        data: {
          headers: ["Mastar", "Prezent (eu/tu/el)", "Participiu", "İmperativ (tu)", "Türkçesi"],
          rows: [
            ["a merge", "merg / mergi / merge", "mers", "mergi!", "gitmek"],
            ["a face", "fac / faci / face", "făcut", "fă!", "yapmak"],
            ["a da", "dau / dai / dă", "dat", "dă!", "vermek"],
            ["a lua", "iau / iei / ia", "luat", "ia!", "almak"],
            ["a ști", "știu / știi / știe", "știut", "știi!", "bilmek"],
            ["a putea", "pot / poți / poate", "putut", "—", "yapabilmek"],
            ["a veni", "vin / vii / vine", "venit", "vino!", "gelmek"],
            ["a vedea", "văd / vezi / vede", "văzut", "vezi!", "görmek"],
            ["a fi", "sunt / ești / este", "fost", "fii!", "olmak"],
            ["a bea", "beau / bei / bea", "băut", "bea!", "içmek"],
            ["a ține", "țin / ții / ține", "ținut", "ține!", "tutmak"],
            ["a pune", "pun / pui / pune", "pus", "pune!", "koymak"],
            ["a zice", "zic / zici / zice", "zis", "zi!", "söylemek/demek"],
          ],
        },
      },
      {
        type: "tip",
        title: "📌 Düzensiz Fiilleri Öğrenme Stratejisi",
        text: "Her düzensiz fiilin mutlaka şu üç biçimini ezberleyin: (1) mastar, (2) el/ea çekimi (en çok değişen), (3) participiu.\n\na face — face — făcut; a merge — merge — mers; a da — dă — dat\n\nGeri kalan biçimler bu temel çekimden türetilebilir.",
      },
    ],
  },

  // ─────────────────────────────────────────────────────────
  // BÖLÜM 7 — Zarflar ve Edatlar
  // ─────────────────────────────────────────────────────────
  {
    id: "bolum-7",
    title: "BÖLÜM 7 — Zarflar ve Edatlar (Adverbe și Prepoziții)",
    content: [
      {
        type: "heading",
        text: "7.1 Temel Zarflar",
        level: 3,
      },
      {
        type: "table",
        data: {
          headers: ["Kategori", "Romence", "Türkçesi"],
          rows: [
            ["Zaman", "acum, ieri, azi/astăzi, mâine, alaltăieri, poimâine", "şimdi, dün, bugün, yarın, evvelsi gün, öbür gün"],
            ["Zaman", "deja, încă, abia, iar, mereu, niciodată", "zaten/artık, hâlâ, yeni/henüz, yine, her zaman, asla"],
            ["Yer", "aici, acolo, sus, jos, aproape, departe, înăuntru, afară", "burada, orada, yukarı, aşağı, yakın, uzak, içeride, dışarıda"],
            ["Tarz", "bine, rău, repede, încet, frumos, ușor, greu, sigur", "iyi, kötü, hızlı, yavaş, güzel, kolay, zor, elbette"],
            ["Nicelik", "mult, puțin, destul, foarte, cam, prea, deloc", "çok, az, yeterince, çok/pek, yaklaşık, fazla/aşırı, hiç(mi)"],
            ["Sıklık", "des, rar, uneori, adesea, câteodată, întotdeauna", "sık, seyrek, bazen, çoğu zaman, zaman zaman, her zaman"],
          ],
        },
      },
      {
        type: "heading",
        text: "7.2 Edatlar ve Hâl İlişkisi — Derinlemesine",
        level: 3,
      },
      {
        type: "table",
        data: {
          headers: ["Edat", "Hâl", "Temel Anlam", "Yaygın Kullanımlar + Örnekler"],
          rows: [
            ["în", "Akuzatif", "içinde, -de", "în casă / în România / în 2024 / în fiecare zi (her gün)"],
            ["la", "Akuzatif", "-e (yön), -da (konum)", "la școală / la medic / la ora opt"],
            ["pe", "Akuzatif", "üstünde; belirli nesne belirteci", "pe masă / pe stradă / Îl văd pe Ion."],
            ["de", "Akuzatif", "-den, ait, hakkında, neden", "vin de la Cluj / de dimineață / vorbesc de tine / de ce (neden)"],
            ["cu", "Akuzatif", "ile, araç", "cu prietenii / cu mașina / Vorbesc cu el."],
            ["fără", "Akuzatif", "olmadan", "fără tine / fără probleme / cafea fără zahăr"],
            ["pentru", "Akuzatif", "için, adına", "pentru tine / Fac asta pentru tine."],
            ["spre", "Akuzatif", "-e doğru", "spre casă / spre nord / spre seară (akşama doğru)"],
            ["lângă", "Akuzatif", "yanında", "Stau lângă tine. / lângă ușă"],
            ["între", "Akuzatif", "arasında", "între noi / între cinci și șase"],
            ["prin", "Akuzatif", "boyunca, içinden", "prin pădure (orman içinden) / prin telefon"],
            ["până la", "Akuzatif", "-e kadar", "până la gară / până la ora trei"],
            ["din", "Akuzatif", "içinden, köken", "vin din Turcia / o carte din bibliotecă / din copilărie"],
            ["despre", "Akuzatif", "hakkında", "Vorbesc despre tine. / un film despre dragoste"],
            ["contra / împotriva", "Genitif", "karşı", "contra vântului / împotriva legii"],
            ["asupra", "Genitif", "üzerinde (soyut)", "influență asupra mea / decizie asupra problemei"],
            ["deasupra", "Genitif", "fiziksel olarak üstünde", "deasupra mesei (masanın üstünde)"],
            ["dedesubtul", "Genitif", "altında", "dedesubtul patului"],
            ["înaintea", "Genitif", "önünde, -den önce", "înaintea ta / înaintea mesei"],
            ["în fața", "Genitif", "yüzüne karşı, önünde", "în fața școlii"],
            ["în urma", "Genitif", "ardından, sonucunda", "în urma accidentului"],
          ],
        },
      },
      {
        type: "heading",
        text: "7.3 pe ile Belirli İnsan Nesnesi Kuralı",
        level: 3,
      },
      {
        type: "paragraph",
        text: "Romence'de insan olan doğrudan nesneler pe edatıyla işaretlenir. Bu kural Türkçe'nin belirli nesne -i/-ı/-u/-ü ekine benzer.",
      },
      {
        type: "example",
        pairs: [
          { ro: "Văd un om.", tr: "Bir adam görüyorum. — belirsiz, pe yok" },
          { ro: "Îl văd pe Ion.", tr: "Ion'u görüyorum. — belirli kişi → pe zorunlu" },
          { ro: "O iubesc pe Maria.", tr: "Maria'yı seviyorum. — özel isim → pe zorunlu" },
          { ro: "Chem pe cineva.", tr: "Birini çağırıyorum. → pe cineva, pe nimeni, pe toată lumea" },
        ],
      },
    ],
  },

  // ─────────────────────────────────────────────────────────
  // BÖLÜM 8 — Bağlaçlar ve Cümle Yapıları (YENİ)
  // ─────────────────────────────────────────────────────────
  {
    id: "bolum-8",
    title: "BÖLÜM 8 — Bağlaçlar ve Cümle Yapıları (Conjuncții și Propoziții)",
    content: [
      {
        type: "paragraph",
        text: "Romence bağlaç sistemi, basit cümlelerden karmaşık yan cümlecik yapılarına geçişin temelidir.",
      },
      {
        type: "heading",
        text: "8.1 Temel Bağlaçlar (Conjuncțiile Principale)",
        level: 3,
      },
      {
        type: "table",
        data: {
          headers: ["Bağlaç", "Türkçesi", "Tür", "Örnekler"],
          rows: [
            ["și", "ve, da", "Sıralama", "Ea cântă și dansează. / Ion și Maria"],
            ["sau", "veya, ya da", "Seçenek", "Cafea sau ceai?"],
            ["ori... ori / fie... fie", "ya... ya da", "Seçenek (çiftli)", "Ori vii, ori pleci. / Fie bine, fie rău."],
            ["dar / ci", "ama, ancak, aksine", "Karşıtlık", "Vreau, dar nu pot. / Nu el, ci ea a venit."],
            ["însă / totuși", "bununla birlikte, yine de", "Kısıtlayıcı", "E obosit, însă lucrează."],
            ["deci / prin urmare", "dolayısıyla, o hâlde", "Sonuç", "Știu, deci pot."],
            ["că", "ki, -dığını", "Nesne cümleciği", "Știu că ești acolo. / Cred că vine."],
            ["să", "ki (conjunctiv), için", "Amaç / conjunctiv tetikleyicisi", "Vreau să merg. / Vine să te vadă."],
            ["dacă", "eğer, -se/-sa", "Koşul", "Dacă vrei, mergem. / Nu știu dacă vine."],
            ["când", "ne zaman, -dığında", "Zaman", "Când vine, vorbim."],
            ["deși / cu toate că", "her ne kadar, -se de", "Karşıtlık (tavizli)", "Deși e târziu, rămân."],
            ["pentru că / fiindcă", "çünkü, -dığı için", "Neden", "Nu vin pentru că sunt bolnav."],
            ["ca să / pentru ca să", "...için, -mek amacıyla", "Amaç", "Înveți ca să știi. / Fac asta pentru ca să te ajut."],
            ["înainte să / înainte de a", "...dan önce", "Zaman (öncesi)", "Înainte să plec, sun."],
            ["după ce", "...dan sonra", "Zaman (sonrası)", "După ce am mâncat, am plecat."],
            ["în timp ce / pe când", "...iken, -dığı sırada", "Eşzamanlılık", "Ea cântă în timp ce el citește."],
            ["deoarece / întrucât", "zira, çünkü", "Neden (resmî)", "Nu pot veni, deoarece sunt ocupat."],
          ],
        },
      },
      {
        type: "heading",
        text: "8.2 Yan Cümlecikler ve Relatif Yapılar",
        level: 3,
      },
      {
        type: "table",
        data: {
          headers: ["Relatif Biçim", "Hâl/İşlev", "Örnek Cümle", "Türkçesi"],
          rows: [
            ["care", "N/Ac (özne veya insan dışı nesne)", "Omul care vorbește e profesorul.", "Konuşan adam öğretmen."],
            ["pe care", "Ac (insan nesne)", "Cartea pe care o citesc e bună.", "Okuduğum kitap iyi."],
            ["căruia / căreia", "Datif (eril/dişil)", "Băiatului căruia i-am dat cartea...", "Kitabı verdiğim oğlan..."],
            ["al cărui / a cărei", "Genitif (eril/dişil sahip)", "Omul al cărui copil...", "Çocuğu olan adam..."],
            ["unde", "Yer zarfı olarak", "Locul unde m-am născut.", "Doğduğum yer."],
            ["când", "Zaman zarfı olarak", "Ziua când ne-am întâlnit.", "Tanıştığımız gün."],
          ],
        },
      },
      {
        type: "example",
        pairs: [
          { ro: "Omul care stă acolo e vecinul meu.", tr: "Orada oturan adam komşumdur." },
          { ro: "Fata pe care o văd e sora lui.", tr: "Gördüğüm kız onun kız kardeşi." },
          { ro: "Locul unde locuiesc e liniștit.", tr: "Yaşadığım yer sakin." },
          { ro: "Știu că vine mâine.", tr: "Yarın geleceğini biliyorum." },
          { ro: "Îți cer să fii atent.", tr: "Dikkatli olmanı istiyorum." },
          { ro: "E important să înveți în fiecare zi.", tr: "Her gün çalışman önemli." },
        ],
      },
      {
        type: "heading",
        text: "8.3 Koşul Cümleleri (Perioadele Ipotetice)",
        level: 3,
      },
      {
        type: "table",
        data: {
          headers: ["Tip", "Koşul Cümlesi (dacă...)", "Sonuç Cümlesi", "Anlam"],
          rows: [
            ["Tip I — Gerçek/Olası", "Dacă ai timp,", "vino la noi. / o să vii la noi.", "Zamanın varsa, bize gel/geleceksin."],
            ["Tip II — Gerçek Dışı (şimdi)", "Dacă aș avea bani,", "aș călători în lume.", "Param olsaydı, dünyayı gezerdim."],
            ["Tip III — Geçmiş Gerçek Dışı", "Dacă aș fi știut,", "aș fi venit mai devreme.", "Bilseydim, daha erken gelirdim."],
          ],
        },
      },
      {
        type: "example",
        pairs: [
          { ro: "Dacă plouă, stau acasă.", tr: "Yağmur yağarsa evde kalırım. (Tip I)" },
          { ro: "Dacă ar ploua, aș sta acasă.", tr: "Yağmur yağsaydı evde kalırdım. (Tip II)" },
          { ro: "Dacă ar fi plouat, aș fi stat acasă.", tr: "Yağmur yağmış olsaydı evde kalmış olurdum. (Tip III)" },
          { ro: "Dacă știi răspunsul, spune-mi.", tr: "Cevabı biliyorsan söyle. (Tip I — emir sonucu)" },
          { ro: "Chiar dacă ar vrea, nu ar putea.", tr: "İstese bile yapamaz. (chiar dacă = bile)" },
        ],
      },
      {
        type: "heading",
        text: "că vs. să farkı",
        level: 4,
      },
      {
        type: "example",
        pairs: [
          { ro: "Știu că Maria vine mâine.", tr: "Maria'nın yarın geleceğini biliyorum. (gerçek bilgi → că)" },
          { ro: "Vreau să vină Maria mâine.", tr: "Maria'nın yarın gelmesini istiyorum. (istek → să)" },
          { ro: "Mi-e frică că nu vine.", tr: "Gelmeyeceğinden korkuyorum. (kaygı + gerçek → că)" },
          { ro: "Mă tem să nu vină.", tr: "Gelmeyecek diye korkuyorum. (olası önlem → să nu)" },
          { ro: "Îi spun că e bine.", tr: "Ona iyisin diyorum. (bilgi aktarımı → că)" },
          { ro: "Îi spun să fie atent.", tr: "Ona dikkatli olmasını söylüyorum. (talimat → să)" },
        ],
      },
    ],
  },

  // ─────────────────────────────────────────────────────────
  // BÖLÜM 9 — Söz Dizimi (YENİ)
  // ─────────────────────────────────────────────────────────
  {
    id: "bolum-9",
    title: "BÖLÜM 9 — Söz Dizimi (Sintaxă Românească)",
    content: [
      {
        type: "paragraph",
        text: "Romence temel olarak Özne–Yüklem–Nesne (ÖYN) düzenini izler; ancak söz dizimi bakımından oldukça esnektir. Kelime sırası bilgi yapısını, vurguyu ve konuşmacının niyetini yansıtır.",
      },
      {
        type: "heading",
        text: "9.1 Temel Sözcük Sırası: ÖYN ve Esneklik",
        level: 3,
      },
      {
        type: "table",
        data: {
          headers: ["Sıra", "Yapı", "Örnek", "Türkçesi", "Vurgu/Not"],
          rows: [
            ["Temel", "Ö–Y–N", "Maria citește o carte.", "Maria bir kitap okuyor.", "Nötr, günlük kullanım"],
            ["Özne sona", "Y–N–Ö", "Citește o carte Maria.", "Maria bir kitap okuyor.", "Özne yeni bilgi"],
            ["Nesne öne", "N–Ö–Y", "O carte citește Maria.", "Bir kitap okuyor Maria.", "Nesne öne çıkmış; odak"],
            ["Yüklem öne", "Y–Ö–N", "Citește Maria o carte.", "Maria kitap okuyor.", "Hafif resmî"],
          ],
        },
      },
      {
        type: "tip",
        title: "💡 Türkçe ile Fark",
        text: "Türkçe'de yüklem (fiil) her zaman sona gelir; Romence'de yüklem ortadadır.\nRomence'de vurgu, ek yerine kelime SİRASINI değiştirerek sağlanır.\nÖzne fiil çekiminden anlaşıldığı için dışarıda bırakılabilir (pro-drop): 'Merg la piață.' = 'Pazara gidiyorum.'",
      },
      {
        type: "heading",
        text: "9.2 Soru ve Olumsuzluk Yapıları",
        level: 3,
      },
      {
        type: "heading",
        text: "A. Soru Yapıları",
        level: 4,
      },
      {
        type: "table",
        data: {
          headers: ["Soru Türü", "Yapı", "Örnek", "Türkçesi"],
          rows: [
            ["Evet/Hayır sorusu", "Söz dizimi değişmez; yalnızca yükselen tonlama", "Mergi la piață?", "Pazara gidiyor musun?"],
            ["Soru sözcüğü ile", "Soru sözcüğü + özne + yüklem", "Unde mergi? / Ce face Maria?", "Nereye gidiyorsun? / Maria ne yapıyor?"],
            ["Cine / Ce sorusu", "Cine + V / Ce + V", "Cine a sunat? / Ce s-a întâmplat?", "Kim aradı? / Ne oldu?"],
            ["Care sorusu", "Care + belirli isim", "Care mașină e a ta?", "Hangi araba senin?"],
            ["Câți/Câte sorusu", "Câți/Câte + isim", "Câți copii ai?", "Kaç çocuğun var?"],
            ["De ce sorusu", "De ce + V", "De ce plângi?", "Neden ağlıyorsun?"],
            ["Cum sorusu", "Cum + V / Cum e + isim", "Cum te cheamă? / Cum e vremea?", "Adın ne? / Hava nasıl?"],
          ],
        },
      },
      {
        type: "heading",
        text: "B. Olumsuzluk Yapıları",
        level: 4,
      },
      {
        type: "table",
        data: {
          headers: ["Yapı", "Örnekler", "Türkçesi"],
          rows: [
            ["nu + fiil (basit olumsuz)", "Nu știu. / Nu am venit.", "Bilmiyorum. / Gelmedim."],
            ["nu + bağımlı zamir + fiil", "Nu mă vede. / Nu îl cunosc.", "Beni görmüyor. / Onu tanımıyorum."],
            ["nu... nimic (çift olumsuz)", "Nu știu nimic.", "Hiçbir şey bilmiyorum."],
            ["nu... nimeni", "Nu am văzut pe nimeni.", "Hiç kimseyi görmedim."],
            ["nu... niciodată", "Nu merg niciodată acolo.", "Oraya hiç gitmem / asla gitmem."],
            ["nu... nicăieri", "Nu am găsit-o nicăieri.", "Onu hiçbir yerde bulamadım."],
            ["nu... deloc", "Nu e deloc frumos.", "Hiç güzel değil."],
          ],
        },
      },
      {
        type: "warning",
        title: "Romence'de Çift Olumsuz ZORUNLUDUR",
        text: "Türkçe'de 'Hiç kimseyi görmedim' gibi birden fazla olumsuzluk unsuru doğal ve gereklidir.\n\nRomence'de de aynı kural geçerlidir: nu ile birlikte nimic, nimeni, niciodată, nicăieri kullanımı zorunludur.\n\n• YANLIŞ: *Știu nimic. (nu olmadan nimic kullanılamaz)\n• DOĞRU: Nu știu nimic.\n\nİngilizce'nin aksine Romence çift olumsuz dilbilgisel olarak doğrudur ve standart kullanımdır.",
      },
      {
        type: "heading",
        text: "9.3 Vurgu ve Öncül–Odak Yapısı",
        level: 3,
      },
      {
        type: "example",
        pairs: [
          { ro: "Maria citește o carte. (nötr)", tr: "Maria bir kitap okuyor." },
          { ro: "O carte citește Maria. (kitap vurgulu)", tr: "Maria bir KİTAP okuyor (film değil, kitap)." },
          { ro: "Pe Maria am văzut-o, nu pe Ion.", tr: "Maria'yı gördüm, Ion'u değil. (karşıtlık vurgusu)" },
          { ro: "Azi am venit mai devreme. (azi öne çıkmış)", tr: "BUGÜN daha erken geldim." },
        ],
      },
      {
        type: "heading",
        text: "9.4 Özel Yapılar: pe, că, să, care",
        level: 3,
      },
      {
        type: "table",
        data: {
          headers: ["Yapı", "Kural", "Örnekler", "Türkçesi"],
          rows: [
            ["pe + belirli insan nesnesi", "Akuzatif nesne belirliyse ve insansa pe zorunlu", "Îl văd pe profesor. / O chem pe Maria.", "Öğretmeni görüyorum. / Maria'yı çağırıyorum."],
            ["că + indicativ", "Haber kipinde bildirme; gerçek durum aktarımı", "Știu că e acasă. / Cred că plouă.", "Evde olduğunu biliyorum. / Yağdığını düşünüyorum."],
            ["să + conjunctiv", "İstek, amaç, zorunluluk, emir aktarımı", "Vreau să merg. / Trebuie să fii atent.", "Gitmek istiyorum. / Dikkatli olmalısın."],
            ["care (relatif)", "İnsan veya nesne yerine geçen relatif zamir", "Omul care vorbește. / Cartea care e pe masă.", "Konuşan adam. / Masadaki kitap."],
            ["pe care (relatif Ac)", "Belirli insan/nesne relatif nesnesi", "Omul pe care îl văd. / Cartea pe care o citesc.", "Gördüğüm adam. / Okuduğum kitap."],
          ],
        },
      },
    ],
  },

  // ─────────────────────────────────────────────────────────
  // BÖLÜM 10 — Sayılar ve Zaman İfadeleri
  // ─────────────────────────────────────────────────────────
  {
    id: "bolum-10",
    title: "BÖLÜM 10 — Sayılar ve Zaman İfadeleri",
    content: [
      {
        type: "heading",
        text: "10.1 Sayılar (Numerale)",
        level: 3,
      },
      {
        type: "table",
        data: {
          headers: ["Rakam", "Romence", "Rakam", "Romence", "Rakam", "Romence"],
          rows: [
            ["0", "zero", "10", "zece", "20", "douăzeci"],
            ["1", "unu / una", "11", "unsprezece", "30", "treizeci"],
            ["2", "doi / două", "12", "doisprezece", "40", "patruzeci"],
            ["3", "trei", "13", "treisprezece", "50", "cincizeci"],
            ["4", "patru", "14", "paisprezece", "100", "o sută"],
            ["5", "cinci", "15", "cincisprezece", "200", "două sute"],
            ["6", "șase", "16", "șaisprezece", "1.000", "o mie"],
            ["7", "șapte", "17", "șaptesprezece", "2.000", "două mii"],
            ["8", "opt", "18", "optsprezece", "1.000.000", "un milion"],
            ["9", "nouă", "19", "nouăsprezece", "1.000.000.000", "un miliard"],
          ],
        },
      },
      {
        type: "tip",
        title: "💡 Sayı + İsim Kuralı",
        text: "1 ve 2 sayıları cinsiyete göre değişir: un băiat / o fată / doi băieți / două fete.\n\n3-19 arası sayılar isimden önce doğrudan kullanılır: trei cărți (üç kitap), cinci copii (beş çocuk).\n\n20 ve üzeri sayılardan sonra isimle arasına 'de' bağlacı girer: douăzeci de oameni (yirmi kişi), o sută de lei (yüz ley).\n\nYılları söylerken: mil nouă sute optzeci și cinci (1985).",
      },
      {
        type: "heading",
        text: "10.2 Saat ve Gün İfadeleri",
        level: 3,
      },
      {
        type: "example",
        pairs: [
          { ro: "Câte ore este? / Cât este ceasul?", tr: "Saat kaç?" },
          { ro: "Este ora două.", tr: "Saat iki." },
          { ro: "Este ora două și jumătate.", tr: "Saat iki buçuk." },
          { ro: "Este ora trei fără un sfert.", tr: "Saat üçe çeyrek var." },
          { ro: "La ce oră...?", tr: "Saat kaçta...?" },
        ],
      },
      {
        type: "table",
        data: {
          headers: ["Romence", "Türkçe"],
          rows: [
            ["Dimineață / Prânz / Seară / Noapte", "Sabah / Öğle / Akşam / Gece"],
            ["Luni, Marți, Miercuri, Joi, Vineri", "Pazartesi, Salı, Çarşamba, Perşembe, Cuma"],
            ["Sâmbătă, Duminică", "Cumartesi, Pazar"],
            ["Ianuarie, Februarie, Martie, Aprilie, Mai, Iunie", "Ocak, Şubat, Mart, Nisan, Mayıs, Haziran"],
            ["Iulie, August, Septembrie, Octombrie, Noiembrie, Decembrie", "Temmuz, Ağustos, Eylül, Ekim, Kasım, Aralık"],
          ],
        },
      },
    ],
  },

  // ─────────────────────────────────────────────────────────
  // BÖLÜM 11 — Tematik Kelime Listeleri
  // ─────────────────────────────────────────────────────────
  {
    id: "bolum-11",
    title: "BÖLÜM 11 — Tematik Kelime Listeleri (Vocabular Tematic)",
    content: [
      {
        type: "paragraph",
        text: "Kelime dağarcığı tematik olarak öğrenildiğinde, yeni kelimeler bağlam içinde yerleşir ve kalıcı hale gelir.",
      },
      {
        type: "heading",
        text: "11.1 Aile (Familie)",
        level: 3,
      },
      {
        type: "table",
        data: {
          headers: ["🇷🇴 Romence", "🇹🇷 Türkçe"],
          rows: [
            ["mamă / mamă-mea", "anne / annem"],
            ["tată / tata", "baba / babam"],
            ["frate / frate-meu", "erkek kardeş / erkek kardeşim"],
            ["soră / sora mea", "kız kardeş / kız kardeşim"],
            ["bunic / bunicul", "büyükbaba / büyükbabam"],
            ["bunică / bunica", "büyükanne / büyükannem"],
            ["unchi", "amca / dayı"],
            ["mătușă", "hala / teyze"],
            ["văr / vară", "erkek kuzen / kız kuzen"],
            ["nepot / nepoată", "yeğen (erkek) / yeğen (kız)"],
            ["soț / soție", "koca / eş (kadın)"],
            ["ginere / noră", "damat / gelin"],
          ],
        },
      },
      {
        type: "heading",
        text: "11.2 Vücut ve Sağlık (Corp și Sănătate)",
        level: 3,
      },
      {
        type: "table",
        data: {
          headers: ["🇷🇴 Romence", "🇹🇷 Türkçe"],
          rows: [
            ["cap / față", "baş / yüz"],
            ["ochi / ureche / nas / gură", "göz / kulak / burun / ağız"],
            ["gât / umăr / braț / mână", "boyun / omuz / kol / el"],
            ["piept / spate / burtă / picior", "göğüs / sırt / karın / bacak"],
            ["a durea — mă doare capul", "acımak — başım ağrıyor"],
            ["febră / răceală / gripă", "ateş / nezle / grip"],
            ["medic / spital / farmacie", "doktor / hastane / eczane"],
            ["rețetă / medicament / pastilă", "reçete / ilaç / hap"],
            ["Mă simt rău.", "Kendimi kötü hissediyorum."],
            ["Am nevoie de un doctor.", "Bir doktora ihtiyacım var."],
          ],
        },
      },
      {
        type: "heading",
        text: "11.3 Yiyecek ve İçecek (Mâncare și Băuturi)",
        level: 3,
      },
      {
        type: "table",
        data: {
          headers: ["🇷🇴 Romence", "🇹🇷 Türkçe"],
          rows: [
            ["pâine / unt / brânză / iaurt", "ekmek / tereyağı / peynir / yoğurt"],
            ["carne / pui / porc / vită / pește", "et / tavuk / domuz / sığır / balık"],
            ["legume: roșie, castraveți, ceapă, usturoi", "sebze: domates, salatalık, soğan, sarımsak"],
            ["fructe: mere, pere, struguri, căpșuni", "meyve: elma, armut, üzüm, çilek"],
            ["supă / ciorbă / salată / garnitură", "çorba / ekşili çorba / salata / garnitür"],
            ["apă / suc / cafea / ceai / bere / vin", "su / meyve suyu / kahve / çay / bira / şarap"],
            ["zahăr / sare / piper / ulei / oțet", "şeker / tuz / biber / yağ / sirke"],
            ["mic dejun / prânz / cină", "kahvaltı / öğle yemeği / akşam yemeği"],
            ["a mânca / a bea / a găti / a comanda", "yemek / içmek / pişirmek / sipariş vermek"],
            ["delicios / sărat / dulce / acru / amar", "lezzetli / tuzlu / tatlı / ekşi / acı"],
          ],
        },
      },
      {
        type: "heading",
        text: "11.4 Şehir ve Ulaşım (Oraș și Transport)",
        level: 3,
      },
      {
        type: "table",
        data: {
          headers: ["🇷🇴 Romence", "🇹🇷 Türkçe"],
          rows: [
            ["stradă / bulevard / piață / parc", "cadde / bulvar / meydan/pazar / park"],
            ["gară / aeroport / port / autogară", "tren istasyonu / havalimanı / liman / otobüs terminali"],
            ["autobuz / metrou / tramvai / taxi", "otobüs / metro / tramvay / taksi"],
            ["mașină / bicicletă / motocicletă", "araba / bisiklet / motosiklet"],
            ["bilet / orar / linie / stație", "bilet / zaman çizelgesi / hat / durak"],
            ["a merge pe jos / a conduce", "yürümek / araba sürmek"],
            ["la stânga / la dreapta / înainte / înapoi", "sola / sağa / ileri / geri"],
            ["Unde este...? / Cum ajung la...?", "...nerede? / ...nasıl gidebilirim?"],
            ["centru / periferie / cartier", "merkez / çevre / semt/mahalle"],
            ["hotel / hostel / apartament", "otel / hostel / daire"],
          ],
        },
      },
      {
        type: "heading",
        text: "11.5 Alışveriş (Cumpărături)",
        level: 3,
      },
      {
        type: "table",
        data: {
          headers: ["🇷🇴 Romence", "🇹🇷 Türkçe"],
          rows: [
            ["magazin / piață / centru comercial", "dükkan / pazar / alışveriş merkezi"],
            ["prețul / reducere / promoție / bon", "fiyat / indirim / kampanya / fiş"],
            ["Cât costă? / Este prea scump.", "Ne kadar? / Çok pahalı."],
            ["Pot să încerc? / Există mai mare?", "Deneyebilir miyim? / Daha büyüğü var mı?"],
            ["A plăti cu cardul / cu numerar", "Kartla / Nakit ödemek"],
            ["a cumpăra / a vinde / a returna", "satın almak / satmak / iade etmek"],
          ],
        },
      },
      {
        type: "heading",
        text: "11.6 Renkler, Şekiller ve Boyutlar",
        level: 3,
      },
      {
        type: "table",
        data: {
          headers: ["🇷🇴 Romence", "🇹🇷 Türkçe"],
          rows: [
            ["roșu / portocaliu / galben / verde", "kırmızı / turuncu / sarı / yeşil"],
            ["albastru / violet / roz / alb / negru / gri", "mavi / mor / pembe / beyaz / siyah / gri"],
            ["cerc / pătrat / triunghi / dreptunghi", "daire / kare / üçgen / dikdörtgen"],
            ["mare / mic / lung / scurt / lat / îngust", "büyük / küçük / uzun / kısa / geniş / dar"],
            ["greu / ușor / gros / subțire", "ağır / hafif / kalın / ince"],
          ],
        },
      },
    ],
  },

  // ─────────────────────────────────────────────────────────
  // BÖLÜM 12 — Diyaloglar
  // ─────────────────────────────────────────────────────────
  {
    id: "bolum-12",
    title: "BÖLÜM 12 — Diyaloglar (Dialoguri)",
    content: [
      {
        type: "heading",
        text: "12.1 Temel Günlük Kalıplar (Expresii Uzuale)",
        level: 3,
      },
      {
        type: "paragraph",
        text: "Aşağıdaki kalıplar Romence günlük konuşmasında en sık karşılaşılan ifadelerdir.",
      },
      {
        type: "table",
        data: {
          headers: ["Romence", "Türkçesi", "Kullanım Bağlamı"],
          rows: [
            ["Bună ziua!", "İyi günler!", "Resmi selamlama (gündüz)"],
            ["Bună dimineața!", "Günaydın!", "Sabah selamlama"],
            ["Bună seara!", "İyi akşamlar!", "Akşam selamlama"],
            ["Noapte bună!", "İyi geceler!", "Vedalaşma (gece)"],
            ["Salut! / Alo!", "Selam! / Hey!", "Samimi/gayrı resmi"],
            ["Ce faci?", "Nasılsın?", "Arkadaşça soru"],
            ["Ce mai faci?", "Ne var ne yok? / Nasıl gidiyor?", "Samimi hal hatır sorma"],
            ["Bine, mulțumesc.", "İyiyim, teşekkürler.", "Standart yanıt"],
            ["Și tu?", "Sen nasılsın? / Ya sen?", "Karşılıklı soru"],
            ["Mulțumesc! / Mulțumesc frumos!", "Teşekkür ederim! / Çok teşekkürler!", "Her bağlamda"],
            ["Cu plăcere! / Cu drag!", "Rica ederim! / Memnuniyetle!", "Teşekküre yanıt"],
            ["Scuze! / Îmi pare rău!", "Özür dilerim! / Üzgünüm!", "Özür dileme"],
            ["Nu face nimic.", "Önemli değil. / Sorun yok.", "Özrü kabul"],
            ["Te rog. / Vă rog. (resmi)", "Lütfen. / Rica ederim.", "İstek bildirme"],
            ["Da / Nu", "Evet / Hayır", "Temel yanıtlar"],
            ["Desigur! / Bineînțeles!", "Tabii ki! / Elbette!", "Onay"],
            ["Nu știu. / Nu înțeleg.", "Bilmiyorum. / Anlamıyorum.", "Cevapsızlık / Dil zorluğu"],
            ["Puteți repeta, vă rog?", "Tekrar eder misiniz, lütfen?", "Dil öğrencisi için"],
            ["Vorbesc puțin românește.", "Biraz Romence biliyorum.", "Alçakgönüllü cevap"],
            ["La revedere! / Pa!", "Hoşça kalın! / Güle güle!", "Resmi / Samimi veda"],
            ["Pe curând!", "Görüşürüz yakında!", "Tekrar buluşma umuduyla"],
          ],
        },
      },
      {
        type: "tip",
        title: "💡 ce faci? vs. ce mai faci?",
        text: "Ce faci? → 'Ne yapıyorsun?' veya 'Nasılsın?' — genel hal hatır sorusu.\n\nCe mai faci? → 'Ne var ne yok?' — 'mai' zarfı 'hâlâ / son zamanlarda' anlamı katar, daha samimi ve sıcak bir tondur. Uzun süredir görülmeyen biriyle karşılaşınca tercih edilir.\n\nBine, mulțumesc. Dar tu? → İyiyim teşekkürler. Ya sen? (Dar = ama/peki; samimi bağlamda).",
      },
      {
        type: "heading",
        text: "12.2 Diyalog: İlk Tanışma",
        level: 3,
      },
      {
        type: "example",
        pairs: [
          { ro: "Mihai: Bună ziua! Mă numesc Mihai. Dar dumneavoastră?", tr: "İyi günler! Adım Mihai. Peki sizin adınız?" },
          { ro: "Ayşe: Îmi pare bine de cunoștință! Vorbești bine românește.", tr: "Tanıştığımıza memnun oldum! Romenceyi iyi konuşuyorsunuz." },
          { ro: "Mihai: Am treizeci și doi de ani. Dumneavoastră?", tr: "Otuz iki yaşındayım. Siz?" },
          { ro: "Ayşe: Eu am douăzeci și opt. La revedere, Mihai!", tr: "Ben yirmi sekiz yaşındayım. Hoşça kalın, Mihai!" },
        ],
      },
      {
        type: "tip",
        title: "🔑 Dilbilgisi Notları",
        text: "'Mă numesc' → dönüşlü fiil, lit: 'kendime ad takıyorum'; resmi tanışmada kullanılır.\n'Dumneavoastră' → son derece resmi 'siz/sizin' zamiri; kısaltması: dvs. Günlük dilde 'tu' tercih edilir.\n'Am treizeci și doi de ani' → yaş ifadesinde 'de ani' obligatördür (20+ sayılar).\n'Mai am mult de învățat' → 'mai' zarfı + a avea + de + mastar = 'hâlâ ... yapmam gerek' anlamı.",
      },
      {
        type: "heading",
        text: "12.3 Diyalog: Restoranda (La Restaurant)",
        level: 3,
      },
      {
        type: "example",
        pairs: [
          { ro: "Chelner: Bună seara! Aveți o rezervare?", tr: "İyi akşamlar! Rezervasyonunuz var mı?" },
          { ro: "Client: Da, avem rezervare pe numele Popescu, pentru două persoane.", tr: "Evet, Popescu adına iki kişilik rezervasyonumuz var." },
          { ro: "Chelner: Poftiți, meniul! Ce doriți să comandați?", tr: "Buyurun, menü! Ne sipariş etmek istiyorsunuz?" },
          { ro: "Client: Aș vrea o ciorbă de legume și un grătar de pui, vă rog. Ce vinuri recomandați?", tr: "Sebze çorbası ve tavuk ızgara istiyorum lütfen. Hangi şarabı tavsiye edersiniz?" },
          { ro: "Chelner: Recomand un vin roșu de Murfatlar — merge perfect cu puiul.", tr: "Murfatlar kırmızı şarabını tavsiye ederim — tavukla mükemmel uyum sağlar." },
          { ro: "Client: Perfect, mulțumesc! Și nota de plată, vă rog, la final.", tr: "Mükemmel, teşekkürler! Sonunda hesabı da getirin lütfen." },
        ],
      },
      {
        type: "heading",
        text: "12.4 Diyalog: Yol Tarifi (Indicații de Drum)",
        level: 3,
      },
      {
        type: "example",
        pairs: [
          { ro: "Turist: Scuzați-mă, știți unde este Piața Unirii?", tr: "Özür dilerim, Unirii Meydanı nerede, biliyor musunuz?" },
          { ro: "Localnic: Da, sigur! Mergeți înainte pe această stradă cam două sute de metri, apoi virați la stânga.", tr: "Evet, tabii! Bu caddede yaklaşık iki yüz metre düz gidin, sonra sola dönün." },
          { ro: "Turist: Și după ce virez la stânga?", tr: "Sola döndükten sonra?" },
          { ro: "Localnic: Veți vedea o clădire mare albastră. Piața e chiar în față. Nu puteți să greșiți!", tr: "Büyük mavi bir bina göreceksiniz. Meydan tam önünde. Şaşırmazsınız!" },
          { ro: "Turist: Vă mulțumesc foarte mult! Aveți o zi frumoasă!", tr: "Çok teşekkür ederim! İyi günler!" },
        ],
      },
      {
        type: "heading",
        text: "12.5 Diyalog: Telefon Görüşmesi (Convorbire Telefonică)",
        level: 3,
      },
      {
        type: "example",
        pairs: [
          { ro: "Secretară: Bună ziua, Compania Tehno, cu ce vă pot ajuta?", tr: "İyi günler, Tehno Şirketi, size nasıl yardımcı olabilirim?" },
          { ro: "Caller: Bună ziua! Aș dori să fac o programare cu domnul Director Ionescu.", tr: "İyi günler! Direktör Ionescu Bey ile bir randevu almak istiyorum." },
          { ro: "Secretară: Bineînțeles. Când vă este convenabil?", tr: "Tabii ki. Ne zaman uygun?" },
          { ro: "Caller: Aș prefera joi, dacă este posibil, în jurul orei zece.", tr: "Mümkünse Perşembe, saat on sularında tercih ederim." },
          { ro: "Secretară: Joi la ora zece este liber. Cum vă numiți, vă rog?", tr: "Perşembe saat on uygun. Adınız nedir, lütfen?" },
        ],
      },
    ],
  },

  // ─────────────────────────────────────────────────────────
  // BÖLÜM 13 — Hızlı Başvuru Sayfaları
  // ─────────────────────────────────────────────────────────
  {
    id: "bolum-13",
    title: "BÖLÜM 13 — Hızlı Başvuru Sayfaları (Cheat Sheets)",
    content: [
      {
        type: "paragraph",
        text: "Bu sayfalar, en temel Romence yapılarını hızlıca gözden geçirmek için tasarlanmıştır.",
      },
      {
        type: "heading",
        text: "Hızlı Başvuru 1 — Fiil Zamanları Özeti",
        level: 3,
      },
      {
        type: "table",
        data: {
          headers: ["Zaman", "Oluşumu", "Kullanımı", "Örnek (a merge)"],
          rows: [
            ["Prezent", "Kök + grup eki", "Şimdi + genel", "merg, mergi, merge..."],
            ["Imperfect", "Kök + -am/-ai/-a/-am/-ați/-au", "Geçmiş süregelen", "mergeam, mergeai..."],
            ["Perfect Compus", "am/ai/a/am/ați/au + participiu", "Belirli geçmiş eylem", "am mers, ai mers..."],
            ["MMP (Pluperfect)", "Kök + -sesem/-seseși...", "Geçmişten önceki geçmiş", "mersesem, mersese..."],
            ["Viitor I", "voi/vei/va... + mastar", "Resmî gelecek", "voi merge, va merge..."],
            ["Viitor II", "o să + conjunctiv", "Günlük gelecek", "o să merg, o să meargă"],
            ["Condițional", "aș/ai/ar/am/ați/ar + mastar", "Koşullu / Kibarca istek", "aș merge, ar merge..."],
            ["Conjunctiv", "să + çekim", "İstek/amaç sonrası", "să merg, să meargă"],
            ["Imperativ", "Özel biçim", "Emir", "mergi!, mergeți!"],
          ],
        },
      },
      {
        type: "heading",
        text: "Hızlı Başvuru 2 — Artikel Tablosu",
        level: 3,
      },
      {
        type: "table",
        data: {
          headers: ["", "Belirsiz Tek.", "Belirsiz Çoğ.", "Belirli Tek. N/Ac", "Belirli Tek. G/D", "Belirli Çoğ. N/Ac", "Belirli Çoğ. G/D"],
          rows: [
            ["Eril", "un", "niște", "-ul / -le", "-lui", "-ii / -i", "-ilor"],
            ["Dişil", "o", "niște", "-a", "-ei", "-le / -i", "-lor"],
            ["Nötr", "un", "niște", "-ul / -l", "-lui", "-le / -uri", "-lor"],
          ],
        },
      },
      {
        type: "heading",
        text: "Hızlı Başvuru 3 — Temel Kalıplar ve Yapılar",
        level: 3,
      },
      {
        type: "table",
        data: {
          headers: ["Kalıp / Yapı", "Romence", "Türkçesi"],
          rows: [
            ["Yaş", "Am X ani.", "X yaşındayım."],
            ["İsim", "Mă numesc / Mă cheamă...", "Adım..."],
            ["Meslek", "Sunt + meslek adı", "Ben + meslek'im."],
            ["Memleket", "Sunt din + şehir/ülke.", "...'den/danım."],
            ["Beğeni", "Îmi place + isim / să + conjunctiv.", "...seviyorum / ...yapmayı seviyorum."],
            ["İhtiyaç", "Am nevoie de + isim.", "...'e ihtiyacım var."],
            ["Zorunluluk", "Trebuie să + conjunctiv.", "...meli/malıyım."],
            ["İzin istemek", "Pot să + conjunctiv?", "...yabilir miyim?"],
            ["İstek", "Vreau să + conjunctiv.", "...mek istiyorum."],
            ["Koşul", "Dacă + prezent, prezent/viitor.", "Eğer ... -se, ... -r."],
            ["Karşılaştırma", "mai + sıfat + decât", "daha ... -den"],
            ["Olumsuz", "Nu + fiil (+zamir önde)", "...mıyor/-me-"],
          ],
        },
      },
      {
        type: "heading",
        text: "Hızlı Başvuru 4 — Bağlaçlar ve Edatlar",
        level: 3,
      },
      {
        type: "table",
        data: {
          headers: ["Romence", "Türkçe"],
          rows: [
            ["și", "ve"],
            ["sau", "veya"],
            ["dar / ci", "ama / ancak"],
            ["că", "ki / -dığını"],
            ["să", "ki / için (subj.)"],
            ["dacă", "eğer / -se"],
            ["când", "ne zaman / -ince"],
            ["deși", "her ne kadar"],
            ["pentru că", "çünkü"],
            ["deci", "dolayısıyla"],
            ["totuși", "bununla birlikte"],
            ["fie...fie", "ya...ya da"],
            ["în", "içinde / -de"],
            ["la", "-e / -de (konum)"],
            ["de", "-den / ait"],
            ["pe", "üstünde / nesne"],
            ["cu", "ile"],
            ["fără", "olmadan / -siz"],
            ["pentru", "için"],
            ["spre", "-e doğru"],
            ["lângă", "yanında"],
            ["între", "arasında"],
            ["din", "içinden / -den"],
            ["despre", "hakkında"],
          ],
        },
      },
    ],
  },

  // ─────────────────────────────────────────────────────────
  // BÖLÜM 14 — Alıştırmalar ve Testler
  // ─────────────────────────────────────────────────────────
  {
    id: "bolum-14",
    title: "BÖLÜM 14 — Alıştırmalar ve Testler (Exerciții și Teste)",
    content: [
      {
        type: "paragraph",
        text: "Bu bölüm, öğrenilenleri pekiştirmek için çeşitli alıştırma türleri içermektedir. Her bölümün sonunda cevap anahtarı verilmiştir.",
      },
      {
        type: "heading",
        text: "Alıştırma 1 — Artikel Tamamlama (A1-A2)",
        level: 3,
      },
      {
        type: "paragraph",
        text: "Görev: Boşlukları uygun belirli veya belirsiz artikelle doldurun.",
      },
      {
        type: "list",
        items: [
          { prompt: "Am văzut ______ film bun ieri. (film — nötr)", answers: ["un"] },
          { prompt: "______ casă este albă ve büyük. (casă — dişil, belirli tekil N)", answers: ["casa", "Casa"] },
          { prompt: "Dau ______ carte ______ fată. (carte — dişil, belirli; fată — dişil, belirli G/D)", answers: ["cartea fetei"] },
          { prompt: "Am cumpărat ______ mere ve ______ pâine. (mere — çoğul, belirsiz; pâine — dişil, belirsiz)", answers: ["niște o"] },
          { prompt: "______ copii se joacă în parc. (copii — çoğul, belirli N)", answers: ["copiii", "Copiii"] },
        ],
      },
      {
        type: "tip",
        title: "Not",
        text: "Cevabınızı kutuya yazın. Doğruysa yeşil tik, yanlışsa kırmızı çarpı görünür.",
      },
      {
        type: "heading",
        text: "Alıştırma 2 — Fiil Çekimi: Prezent (A1-A2)",
        level: 3,
      },
      {
        type: "paragraph",
        text: "Görev: Parantezdeki fiili doğru kişiye çekin.",
      },
      {
        type: "list",
        items: [
          { prompt: "Eu ______ la birou în fiecare zi. (a merge)", answers: ["merg"] },
          { prompt: "Tu ______ românește foarte bine! (a vorbi)", answers: ["vorbești"] },
          { prompt: "Noi ______ o cafea dimineața. (a bea)", answers: ["bem"] },
          { prompt: "Ei ______ la hotel de ieri. (a fi)", answers: ["sunt"] },
          { prompt: "Ei ______ să meargă la cinema. (a vrea)", answers: ["vor"] },
        ],
      },
      {
        type: "tip",
        title: "Not",
        text: "Cevabınızı kutuya yazın. Doğruysa yeşil tik, yanlışsa kırmızı çarpı görünür.",
      },
      {
        type: "heading",
        text: "Alıştırma 3 — Perfect Compus (A2-B1)",
        level: 3,
      },
      {
        type: "paragraph",
        text: "Görev: Cümleleri Perfect Compus zamanına çevirin.",
      },
      {
        type: "list",
        items: [
          { prompt: "Eu merg la piață. → ________________________", answers: ["am mers"] },
          { prompt: "El face temele. → ________________________", answers: ["a făcut"] },
          { prompt: "Noi vedem un film. → ________________________", answers: ["am văzut"] },
          { prompt: "Tu vii devreme. → ________________________", answers: ["ai venit"] },
          { prompt: "Ele scriu o scrisoare. → ________________________", answers: ["au scris"] },
        ],
      },
      {
        type: "tip",
        title: "Not",
        text: "Cevabınızı kutuya yazın. Doğruysa yeşil tik, yanlışsa kırmızı çarpı görünür.",
      },
      {
        type: "heading",
        text: "Alıştırma 4 — Çeviri (A2-B1)",
        level: 3,
      },
      {
        type: "paragraph",
        text: "Görev: Türkçe cümleleri Rumence'ye çevirin.",
      },
      {
        type: "list",
        items: [
          { prompt: "Yarın sinemaya gideceğim. → ________________________", answers: ["Mâine o să merg la cinema", "Mâine voi merge la cinema"] },
          { prompt: "Kitap masanın üstünde. → ________________________", answers: ["Cartea este pe masă"] },
          { prompt: "Seninle konuşmak istiyorum. → ________________________", answers: ["Vreau să vorbesc cu tine"] },
          { prompt: "Bükreş'e nasıl gidebilirim? → ________________________", answers: ["Cum pot ajunge la București", "Cum ajung la București"] },
          { prompt: "Bu benim en güzel günüm. → ________________________", answers: ["Aceasta este cea mai frumoasă zi a mea"] },
        ],
      },
      {
        type: "tip",
        title: "Not",
        text: "Cevabınızı kutuya yazın. Doğruysa yeşil tik, yanlışsa kırmızı çarpı görünür.",
      },
      {
        type: "heading",
        text: "Alıştırma 5 — Sıfat Uyumu (A2-B1)",
        level: 3,
      },
      {
        type: "paragraph",
        text: "Görev: Sıfatı isimle uyumlu hale getirin.",
      },
      {
        type: "list",
        items: [
          { prompt: "o fată ______ (frumos) → ________________________", answers: ["frumoasă"] },
          { prompt: "niște băieți ______ (înalt) → ________________________", answers: ["înalți"] },
          { prompt: "un om ______ (bun) → ________________________", answers: ["bun"] },
          { prompt: "niște case ______ (vechi) → ________________________", answers: ["vechi"] },
          { prompt: "un scaun ______ (nou) → ________________________", answers: ["nou"] },
        ],
      },
      {
        type: "tip",
        title: "Not",
        text: "Cevabınızı kutuya yazın. Doğruysa yeşil tik, yanlışsa kırmızı çarpı görünür.",
      },
      {
        type: "heading",
        text: "Alıştırma 6 — Diyalog Yazma (B1-B2)",
        level: 3,
      },
      {
        type: "paragraph",
        text: "Görev: Bir kafede masa rezervasyonu yapıyorsunuz. Tarih, saat ve kişi sayısını belirtin; özel istek varsa bunu da ekleyin.\n\nDiyaloğunuzda kullanmaya çalışın:\n• Viitor II yapısını (o să...)\n• Condițional kipi (aș vrea...)\n• En az bir dönüşlü fiil\n• Saat ifadesi",
      },
      {
        type: "heading",
        text: "Alıştırma 7 — Okuma Anlama (B1-B2)",
        level: 3,
      },
      {
        type: "paragraph",
        text: "📖 România este o țară din Europa de Sud-Est, cu o suprafață de aproximativ 238.000 km². Capitala este București, cel mai mare oraș al țării, cu o populație de aproximativ două milioane de locuitori. România este membră a Uniunii Europene din 2007 și a NATO din 2004.\n\nȚara este renumită pentru Castelul Bran (cunoscut ca 'Castelul lui Dracula'), Mănăstirile din Bucovina și Delta Dunării — unul dintre cele mai mari zone umede din Europa. Munții Carpați traversează țara și oferă oportunități excelente pentru drumeții și sporturi de iarnă.",
      },
      {
        type: "list",
        items: [
          { prompt: "Care este capitala României? → ________________________", answers: ["Capitala României este București"] },
          { prompt: "Când a aderat România la Uniunea Europeană? → ________________________", answers: ["România a aderat la UE în 2007"] },
          { prompt: "Ce este renumit Castelul Bran? → ________________________", answers: ["Castelul Bran, Castelul lui Dracula olarak bilinir", "Castelul Bran este cunoscut ca Castelul lui Dracula"] },
          { prompt: "Ce oportunități oferă Munții Carpați? → ________________________", answers: ["Munții Carpați drumezi ve kış sporları için fırsatlar sunar", "Munții Carpați oferă oportunități pentru drumeții și sporturi de iarnă"] },
        ],
      },
      {
        type: "heading",
        text: "Cevap Anahtarı",
        level: 3,
      },
      {
        type: "paragraph",
        text: "Alıştırma 1: 1) un  2) Casa  3) cartea / fetei  4) niște / o  5) Copiii",
      },
      {
        type: "paragraph",
        text: "Alıştırma 2: 1) merg  2) vorbești  3) bem  4) sunt  5) vor",
      },
      {
        type: "paragraph",
        text: "Alıştırma 3: 1) am mers  2) a făcut  3) am văzut  4) ai venit  5) au scris",
      },
      {
        type: "paragraph",
        text: "Alıştırma 4: 1) Mâine o să merg la cinema. / Mâine voi merge la cinema.  2) Cartea este pe masă.  3) Vreau să vorbesc cu tine.  4) Cum pot ajunge la București? / Cum ajung la București?  5) Aceasta este cea mai frumoasă zi a mea.",
      },
      {
        type: "paragraph",
        text: "Alıştırma 5: 1) frumoasă  2) înalți  3) bun  4) vechi  5) nou",
      },
      {
        type: "paragraph",
        text: "Alıştırma 7: 1) Capitala României este București.  2) România a aderat la UE în 2007.  3) Castelul Bran, 'Castelul lui Dracula' olarak bilinir.  4) Munții Carpați drumezi ve kış sporları için fırsatlar sunar.",
      },
      {
        type: "divider",
      },
      {
        type: "paragraph",
        text: "Succes la învățat! Romence öğrenmek bir yolculuktur; her gün birkaç kelime daha, her gün biraz daha akıcı. La mulți ani cu limba română! 🇷🇴",
      },
    ],
  },
];
