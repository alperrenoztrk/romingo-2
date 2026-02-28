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

export type GrammarBlock =
  | { type: "paragraph"; text: string }
  | { type: "heading"; text: string; level: 2 | 3 | 4 }
  | { type: "table"; data: GrammarTable }
  | { type: "list"; items: string[] }
  | { type: "tip"; title: string; text: string }
  | { type: "warning"; title: string; text: string }
  | { type: "example"; pairs: { ro: string; tr: string }[] }
  | { type: "divider" };

export const grammarSections: GrammarSection[] = [
  // BÖLÜM 1 — Giriş ve Alfabe
  {
    id: "bolum-1",
    title: "BÖLÜM 1 — Giriş: Rumence Hakkında",
    content: [
      {
        type: "paragraph",
        text: "Rumence (limba română), Hint-Avrupa dil ailesinin Roman koluna mensup bir dildir. Yaklaşık 25 milyon kişi tarafından anadil olarak konuşulmakta; Romanya ve Moldova'da resmi dil statüsü taşımaktadır. Latin kökleri sayesinde İtalyanca, İspanyolca, Fransızca ve Portekizce ile büyük benzerlikler taşır — bu dilleri bilen biri Rumence metnin yaklaşık %60'ını tahmin edebilir.",
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
        text: "Rumence ve Türkçe, Osmanlı dönemindeki uzun temas nedeniyle 1000'den fazla ortak (veya benzer) kelime paylaşır. cafea (kahve), pilaf, geam (cam), tavan, dușman (düşman)... gibi pek çok kelimeyi zaten biliyorsunuz.\n\nRumence'nin fiil çekimi düzenli ve öngörülebilirdir; kalıpları bir kez kavradıktan sonra yeni fiillere kolayca uygulayabilirsiniz.\n\nTelaffuz fonetik kurallara büyük ölçüde uygundur: yazdığınız gibi okursunuz (birkaç özel kural dışında).",
      },
      {
        type: "heading",
        text: "1.1 Alfabe (Alfabetul Român)",
        level: 3,
      },
      {
        type: "paragraph",
        text: "Rumence 31 harften oluşur. Bunların 26'sı standart Latin harfleriyle örtüşür; 5 tanesi ise Rumence'ye özgüdür.",
      },
      {
        type: "table",
        data: {
          headers: ["Harf", "Büyük", "Ses (IPA)", "Türkçe'ye Benzerlik", "Örnek"],
          rows: [
            ["ă", "Ă", "/ə/", "'e' ile 'a' arası, vurgusuz hece", "băiat /bəˈjat/ — oğlan"],
            ["â", "Â", "/ɨ/", "Türkçe'de yok; ağzı 'ı' gibi açarak 'e' demek", "cânt /kɨnt/ — şarkı söylerim"],
            ["î", "Î", "/ɨ/", "â ile birebir aynı ses", "în /ɨn/ — içinde"],
            ["ș", "Ș", "/ʃ/", "Türkçe 'ş' ile aynı", "școală /ʃkwˈalə/ — okul"],
            ["ț", "Ț", "/ts/", "Türkçe 'ts' / 'c' ünsüzü", "țară /ˈtsarə/ — ülke"],
          ],
        },
      },
      {
        type: "warning",
        title: "â ile ă Karıştırmayın!",
        text: "Bu iki harf çok farklı sesleri temsil eder ve kelime anlamını değiştirir:\n\n• â → /ɨ/ (dil ortada, dudaklar yarı açık, 'ı'ya yakın yuvarlak olmayan ses)\n• ă → /ə/ (şwa; İngilizce'de 'about' kelimesinin 'a'sı gibi, belirsiz ve kısa)\n\nKural: â yalnızca kelime ortasında kullanılır (cânt, român). î ise kelime başında ve sonunda kullanılır (în, a coborî). Bilgisayarda ș ve ț yazarken virgüllü (ș,ț) biçimleri kullanın, tırnaklı (ş,ţ) değil — bunlar farklı Unicode karakterleridir!",
      },
    ],
  },

  // BÖLÜM 2 — Sesler ve Telaffuz
  {
    id: "bolum-2",
    title: "BÖLÜM 2 — Sesler ve Telaffuz (Pronunție)",
    content: [
      {
        type: "paragraph",
        text: "Rumence telaffuzu oldukça düzenli bir dildir; ancak bazı harf kombinasyonları özgün sesler üretir. Bu kombinasyonları öğrendikten sonra herhangi bir Rumence kelimeyi doğru okuyabilirsiniz.",
      },
      {
        type: "table",
        data: {
          headers: ["Harf Kombinasyonu", "Okunuş", "Açıklama", "Örnekler"],
          rows: [
            ["ce, ci", "/tʃe/, /tʃi/", "Türkçe 'ç' gibi", "ce (ne)→çe, cinema→çinema"],
            ["che, chi", "/ke/, /ki/", "'h' sessiz kalır, 'k' sesi", "cheie→keye, chiar→kiyar"],
            ["ge, gi", "/dʒe/, /dʒi/", "Türkçe 'c' gibi", "ger→cer, girafă→cirafə"],
            ["ghe, ghi", "/ge/, /gi/", "'h' sessiz, 'g' sert kalır", "ghete→gete, ghid→gid"],
            ["oa", "/wa/", "'o'+'a' kayışması", "oameni→wameni (insanlar)"],
            ["ea", "/ja/", "'e'+'a' kayışması", "femeie→femeje, seară→sjarə"],
            ["ia, ie", "/ja/, /je/", "'i' yarı ünlü olur", "iarnă→yarnə (kış), ieftin→yeftin"],
            ["x", "/ks/ veya /gz/", "Sözcük başında /ks/", "taxi, exemplu→egzemplu"],
            ["h", "/h/", "Her zaman sesli (Türkçe gibi)", "hotel, hai (hadi)"],
            ["v", "/v/", "İngilizce v gibi", "vară (yaz), veni (gelmek)"],
          ],
        },
      },
      {
        type: "tip",
        title: "💡 Vurgu Kuralı",
        text: "Rumence'de sabit bir vurgu kuralı yoktur; vurgu kelimenin herhangi bir hecesine düşebilir. Ancak pratikte çoğu kelimede sondan ikinci hecede vurgu görülür.\n\nÖrn: ca-să (kaSA), fru-moa-să (fruMOAsă), bu-cu-reș-ti (buCUreşTI).\n\nKelime ezberlerken vurguyu da birlikte öğrenmek en sağlıklı yoldur.",
      },
    ],
  },

  // BÖLÜM 3 — İsimler
  {
    id: "bolum-3",
    title: "BÖLÜM 3 — İsimler (Substantive)",
    content: [
      {
        type: "paragraph",
        text: "Rumence isim sistemi üç temel ekseni üzerinde döner: cinsiyet (gen), sayı (număr) ve durum (caz). Bu üç eksen birleşince ezberlenmesi gereken biçimler ortaya çıkar; ancak kalıplar içsel bir mantık taşıdığından çoğu biçim tahmin edilebilirdir.",
      },
      {
        type: "heading",
        text: "3.1 Grammatik Cinsiyet (Genul)",
        level: 3,
      },
      {
        type: "paragraph",
        text: "Rumence'nin en dikkat çekici özelliği, çoğu Roman dilinde olmayan nötr (neutru) cinsiyi korumasıdır. Nötr isimler tekil hâlde eril gibi, çoğul hâlde dişil gibi davranır.",
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
        text: "Nötr isimler, Rumence söz varlığının yaklaşık 1/3'ünü oluşturur ve genellikle cansız nesneler, soyut kavramlar ile ödünç kelimelerdir.\n\nEn iyi strateji: Her nötr ismi hem tekil hem çoğul hâliyle öğrenmek. Örn: 'scaun / scaune', 'lucru / lucruri', 'birou / birouri'.\n\nÇoğul eki -uri ise hemen hemen her zaman nötr cinsinin işaretidir.",
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
        text: "3.3 Durum Sistemi (Sistemul Cazual)",
        level: 3,
      },
      {
        type: "paragraph",
        text: "Rumence dört işlevsel durum tanır. Nominatif ve Akuzatif genellikle aynı biçimi, Genitif ve Datif ise genellikle aynı biçimi paylaşır. Bu nedenle pratikte yalnızca iki biçim çifti öğrenmek yeterlidir.",
      },
      {
        type: "table",
        data: {
          headers: ["Durum", "İşlev", "Soru Soran", "Türkçe Yaklaşımı"],
          rows: [
            ["Nominatif (N)", "Özne", "Kim / Ne?", "Yalın hâl"],
            ["Akuzatif (Ac)", "Doğrudan nesne + edat tümleci", "Kimi / Neyi? / Nereye?", "-i / -e hâli + edat grupları"],
            ["Genitif (G)", "İyelik (aitlik)", "Kimin / Neyin?", "-in / -nın hâli"],
            ["Datif (D)", "Dolaylı nesne (alıcı)", "Kime / Neye?", "-e / -a hâli"],
            ["Vokativ (V)", "Seslenme", "—", "Ey... / hitap eki"],
          ],
        },
      },
      {
        type: "heading",
        text: "3.4 Artikel Sistemi (Sistemul Articolelor)",
        level: 3,
      },
      {
        type: "paragraph",
        text: "Rumence'nin en özgün özelliklerinden biri, belirli artikelin ismin SONUNA eklenmesidir. Bu özellik Balkanlarda 'Dil Birliği' adı verilen temas bölgesinin etkisiyle ortaya çıkmış ve Rumenceyi diğer Roman dillerinden belirgin şekilde ayırır.",
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
        type: "example",
        pairs: [
          { ro: "un băiat / băiatul / băiatului / băieții / băieților", tr: "bir oğlan / oğlan(def.) / oğlanın / oğlanlar / oğlanların" },
          { ro: "o fată / fata / fetei / fetele / fetelor", tr: "bir kız / kız / kızın / kızlar / kızların" },
          { ro: "un scaun / scaunul / scaunului / scaunele / scaunelor", tr: "bir sandalye / sandalye / sandalyenin / sandalyeler / sandalyelerin" },
        ],
      },
    ],
  },

  // BÖLÜM 4 — Sıfatlar
  {
    id: "bolum-4",
    title: "BÖLÜM 4 — Sıfatlar (Adjective)",
    content: [
      {
        type: "paragraph",
        text: "Rumence sıfatları nitelendirdikleri isimle cinsiyet, sayı ve durum bakımından uyum (acord) sağlar. Bu uyum zorunludur; ihmal edilmesi cümleyi yanlış kılar.",
      },
      {
        type: "table",
        data: {
          headers: ["Sıfat", "Eril Tekil", "Dişil Tekil", "Eril Çoğul", "Dişil Çoğul", "Türkçesi"],
          rows: [
            ["frumos", "frumos", "frumoasă", "frumoși", "frumoase", "güzel/yakışıklı"],
            ["bun", "bun", "bună", "buni", "bune", "iyi"],
            ["mare", "mare", "mare", "mari", "mari", "büyük"],
            ["mic", "mic", "mică", "mici", "mici", "küçük"],
            ["nou", "nou", "nouă", "noi", "noi", "yeni"],
            ["vechi", "vechi", "veche", "vechi", "vechi", "eski"],
            ["înalt", "înalt", "înaltă", "inalți", "înalte", "uzun boylu"],
            ["scurt", "scurt", "scurtă", "scurți", "scurte", "kısa"],
            ["ieftin", "ieftin", "ieftină", "ieftini", "ieftine", "ucuz"],
            ["scump", "scump", "scumpă", "scumpi", "scumpe", "pahalı"],
          ],
        },
      },
      {
        type: "heading",
        text: "Karşılaştırma Dereceleri",
        level: 3,
      },
      {
        type: "table",
        data: {
          headers: ["Derece", "Yapı", "Örnek (frumos)", "Türkçe Karşılığı"],
          rows: [
            ["Pozitif", "sıfat", "frumos", "güzel"],
            ["Üstünlük", "mai + sıfat + decât/ca", "mai frumos decât", "daha güzel -den"],
            ["Eşitlik", "la fel de + sıfat + ca", "la fel de frumos ca", "...kadar güzel"],
            ["Aşağılık", "mai puțin + sıfat + decât", "mai puțin frumos", "daha az güzel"],
            ["Göreli üst.", "cel/cea/cei/cele mai + sıfat", "cel mai frumos", "en güzel"],
            ["Mutlak üst.", "foarte + sıfat", "foarte frumos", "çok güzel"],
            ["Aşırılık", "prea + sıfat", "prea frumos", "fazla güzel"],
          ],
        },
      },
    ],
  },

  // BÖLÜM 5 — Zamirler
  {
    id: "bolum-5",
    title: "BÖLÜM 5 — Zamirler (Pronume)",
    content: [
      {
        type: "heading",
        text: "5.1 Kişi Zamirleri",
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
        type: "tip",
        title: "📌 Kısa Zamirlerin Konumu",
        text: "Kısa (klitik) zamir biçimleri daima fiilin hemen önüne, olumsuzluk 'nu'sundan hemen sonra gelir:\n\n• Mă vede. → Beni görüyor.\n• Nu mă vede. → Beni görmüyor.\n• Îți dau cartea. → Sana kitabı veriyorum.\n\nUzun biçimler edatlardan sonra veya vurgu amacıyla kullanılır: La mine → Bende / Benimki.",
      },
      {
        type: "heading",
        text: "5.2 İyelik Sıfatları",
        level: 3,
      },
      {
        type: "table",
        data: {
          headers: ["Sahip", "Eril Tek.", "Dişil Tek.", "Eril Çoğ.", "Dişil Çoğ.", "Örnek"],
          rows: [
            ["eu", "meu", "mea", "mei", "mele", "fratele meu (erkek kardeşim)"],
            ["tu", "tău", "ta", "tăi", "tale", "mașina ta (araban)"],
            ["el", "său / lui", "sa / lui", "săi / lui", "sale / lui", "prietenii săi (arkadaşları)"],
            ["ea", "său / ei", "sa / ei", "săi / ei", "sale / ei", "casa sa (evi)"],
            ["noi", "nostru", "noastră", "noștri", "noastre", "copiii noștri (çocuklarımız)"],
            ["voi", "vostru", "voastră", "voștri", "voastre", "părinții voștri (aileniz)"],
            ["ei/ele", "lor", "lor", "lor", "lor", "cartea lor (onların kitabı)"],
          ],
        },
      },
    ],
  },

  // BÖLÜM 6 — Fiiller
  {
    id: "bolum-6",
    title: "BÖLÜM 6 — Fiiller (Verbe) — Kapsamlı Konu Anlatımı",
    content: [
      {
        type: "paragraph",
        text: "Rumence fiil sistemi bu dilin en zengin boyutunu oluşturur. Çekim; kişi, sayı, zaman, kip ve görünüş bakımından gerçekleşir. Dört konjugasyon grubu vardır ve her grup kendi iç mantığına sahiptir.",
      },
      {
        type: "heading",
        text: "6.1 Dört Konjugasyon Grubu",
        level: 3,
      },
      {
        type: "table",
        data: {
          headers: ["Grup", "Mastar Son Eki", "Yaygın Fiiller"],
          rows: [
            ["I", "-a", "a cânta, a lucra, a aştepta, a pleca, a intra"],
            ["II", "-ea", "a vedea, a putea, a cădea, a bea, a tăcea"],
            ["III", "-e", "a merge, a face, a scrie, a zice, a pune, a cunoaşte"],
            ["IV", "-i / -î", "a veni, a dormi, a auzi, a coborî, a hotărî"],
          ],
        },
      },
      {
        type: "heading",
        text: "6.2 Prezent — Şimdiki / Geniş Zaman",
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
            ["voi", "sunteți", "aveți", "vreți", "știți", "dati", "luați"],
            ["ei/ele", "sunt", "au", "vor", "știu", "dau", "iau"],
          ],
        },
      },
      {
        type: "heading",
        text: "6.3 Perfect Compus — Bileşik Geçmiş Zaman",
        level: 3,
      },
      {
        type: "paragraph",
        text: "Günlük konuşmada en sık kullanılan geçmiş zamandır. Yapısı: a avea çekimi + participiu (geçmiş ortaç).",
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
        text: "Grup I (-a): kök + -at → cântat, lucrat, aşteptat, plecat\nGrup II (-ea): kök + -ut → văzut, putut, căzut, băut\nGrup III (-e): çoğunlukla düzensiz → mers, făcut, scris, zis, pus\nGrup IV (-i/-î): kök + -it → venit, dormit, auzit, coborât\n\nDüzensiz ortaçlar: a fi→fost, a da→dat, a lua→luat, a vedea→văzut, a merge→mers, a face→făcut",
      },
      {
        type: "heading",
        text: "6.4 Imperfect — Süregelen/Alışkanlık Geçmiş Zaman",
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
        text: "6.5 Mai Mult ca Perfect — Pluperfect",
        level: 3,
      },
      {
        type: "paragraph",
        text: "Başka bir geçmiş eylemden daha önce tamamlanmış eylemleri anlatır. Türkçe'de '-mıştı / -dıydı' yapısına karşılık gelir.",
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
        text: "6.6 Viitor — Gelecek Zaman",
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
        text: "6.7 Condițional — Şart ve Koşul Kipi",
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
        text: "6.9 Conjunctiv — Bağlam Kipi (Subjunctiv)",
        level: 3,
      },
      {
        type: "paragraph",
        text: "Conjunctiv, Rumence'de son derece yaygın kullanılan bir kiptir. İstek, amaç, zorunluluk ve olasılık bildiren fiillerden sonra mutlaka să + conjunctiv gelir.",
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
          { ro: "Lasă-mă să explic.", tr: "Açıklamamı izin ver." },
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
          { ro: "Vorbind românește, exersăm.", tr: "Rumence konuşarak pratik yapıyoruz." },
        ],
      },
      {
        type: "heading",
        text: "6.11 Dönüşlü Fiiller (Verbe Reflexive)",
        level: 3,
      },
      {
        type: "paragraph",
        text: "Rumence'de dönüşlü fiiller se zamiriyle işaretlenir. Türkçe'de çoğu zaman '-in-' veya '-il-' ekleriyle karşılanır.",
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
    ],
  },

  // BÖLÜM 7 — Zarflar ve Edatlar
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
          headers: ["Kategori", "Rumence", "Türkçesi"],
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
        text: "7.2 Temel Edatlar",
        level: 3,
      },
      {
        type: "table",
        data: {
          headers: ["Edat", "Yönettiği Durum", "Temel Anlamı", "Örnekler"],
          rows: [
            ["în", "Akuzatif / Lokatif", "içinde, -de/-da", "în casă (evde), în România, în 2024"],
            ["la", "Akuzatif", "-e/-a (yön) / -de/-da", "la școală, la medic, la ora 8"],
            ["de", "Akuzatif", "-den/-dan, ait, hakkında", "de la Cluj, de dimineaţă, vorbesc de tine"],
            ["pe", "Akuzatif", "üstünde; nesne belirteç", "pe masă, pe stradă, îl văd pe Ion"],
            ["cu", "Akuzatif", "ile, -le/-la", "cu prietenii, cu mașina, cafea cu lapte"],
            ["fără", "Akuzatif", "olmadan, -siz/-sız", "fără zahăr, fără tine, fără probleme"],
            ["pentru", "Akuzatif", "için", "pentru tine, pentru mâine"],
            ["spre", "Akuzatif", "-e doğru", "spre casă, spre nord"],
            ["lângă", "Akuzatif", "yanında, yakınında", "lângă mine, lângă școală"],
            ["între", "Akuzatif", "arasında", "între noi, între 5 și 10"],
            ["asupra", "Genitif", "üzerinde (soyut)", "asupra problemei, influență asupra ei"],
            ["din", "Akuzatif", "içinden, -den/-dan", "vin din Turcia, o carte din bibliotecă"],
          ],
        },
      },
    ],
  },

  // BÖLÜM 8 — Sayılar ve Zaman
  {
    id: "bolum-8",
    title: "BÖLÜM 8 — Sayılar ve Zaman İfadeleri",
    content: [
      {
        type: "heading",
        text: "8.1 Sayılar (Numerale)",
        level: 3,
      },
      {
        type: "table",
        data: {
          headers: ["Rakam", "Rumence", "Rakam", "Rumence", "Rakam", "Rumence"],
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
        text: "1 ve 2 sayıları cinsiyete göre değişir: un băiat / o fată / doi băieți / două fete.\n\n3-19 arası sayılar isimden önce doğrudan kullanılır: trei cărți (üç kitap), cinci copii (beş çocuk).\n\n20 ve üzeri sayılardan sonra isimle arasına 'de' bağlacı girer: douăzeci de oameni (yirmi kişi), o sută de lei (yüz ley).",
      },
      {
        type: "heading",
        text: "8.2 Saat ve Gün İfadeleri",
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
          headers: ["Rumence", "Türkçe"],
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

  // BÖLÜM 9 — Tematik Kelime Listeleri
  {
    id: "bolum-9",
    title: "BÖLÜM 9 — Tematik Kelime Listeleri (Vocabular Tematic)",
    content: [
      {
        type: "paragraph",
        text: "Kelime dağarcığı tematik olarak öğrenildiğinde, yeni kelimeler bağlam içinde yerleşir ve kalıcı hale gelir.",
      },
      {
        type: "heading",
        text: "9.1 Aile (Familie)",
        level: 3,
      },
      {
        type: "table",
        data: {
          headers: ["🇷🇴 Rumence", "🇹🇷 Türkçe"],
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
        text: "9.2 Vücut ve Sağlık (Corp și Sănătate)",
        level: 3,
      },
      {
        type: "table",
        data: {
          headers: ["🇷🇴 Rumence", "🇹🇷 Türkçe"],
          rows: [
            ["cap / față", "baş / yüz"],
            ["ochi / ureche / nas / gură", "göz / kulak / burun / ağız"],
            ["gât / umăr / brăț / mână", "boyun / omuz / kol / el"],
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
        text: "9.3 Yiyecek ve İçecek (Mâncare și Băuturi)",
        level: 3,
      },
      {
        type: "table",
        data: {
          headers: ["🇷🇴 Rumence", "🇹🇷 Türkçe"],
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
        text: "9.4 Şehir ve Ulaşım (Oraș și Transport)",
        level: 3,
      },
      {
        type: "table",
        data: {
          headers: ["🇷🇴 Rumence", "🇹🇷 Türkçe"],
          rows: [
            ["stradă / bulevard / piață / parc", "cadde / bulvar / meydan/pazar / park"],
            ["gară / aeroport / port / autogară", "tren istasyonu / havalimanı / liman / otobüs terminali"],
            ["autobuz / metrou / tramvai / taxi", "otobüs / metro / tramvay / taksi"],
            ["mașină / bicicletă / motocicletă", "araba / bisiklet / motosiklet"],
            ["bilet / orar / linie / stație", "bilet / zaman çizelgesi / hat / durak"],
            ["a merge pe jos / a conduce", "yürümek / araba sürmek"],
            ["la stânga / la dreapta / înainte / înapoi", "sola / sağa / ileri / geri"],
            ["Unde este...? / Cum ajung la...?", "...nerede? / ...nasıl gidebilirim?"],
          ],
        },
      },
      {
        type: "heading",
        text: "9.5 Alışveriş (Cumpărături)",
        level: 3,
      },
      {
        type: "table",
        data: {
          headers: ["🇷🇴 Rumence", "🇹🇷 Türkçe"],
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
        text: "9.6 Renkler, Şekiller ve Boyutlar",
        level: 3,
      },
      {
        type: "table",
        data: {
          headers: ["🇷🇴 Rumence", "🇹🇷 Türkçe"],
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

  // BÖLÜM 10 — Diyaloglar
  {
    id: "bolum-10",
    title: "BÖLÜM 10 — Diyaloglar (Dialoguri)",
    content: [
      {
        type: "paragraph",
        text: "Aşağıdaki diyaloglar, gerçek hayat durumlarını yansıtan ve öğrenilen yapıları pratiğe döken konuşma örnekleridir.",
      },
      {
        type: "heading",
        text: "10.1 Diyalog: İlk Tanışma",
        level: 3,
      },
      {
        type: "example",
        pairs: [
          { ro: "Mihai: Bună ziua! Mă numesc Mihai. Dar dumneavoastră?", tr: "İyi günler! Adım Mihai. Peki sizin adınız?" },
          { ro: "Ayşe: Îmi pare bine de cunoștință! Vorbești bine românește.", tr: "Tanıştığımıza memnun oldum! Rumenceyi iyi konuşuyorsunuz." },
          { ro: "Mihai: Am treizeci și doi de ani. Dumneavoastră?", tr: "Otuz iki yaşındayım. Siz?" },
          { ro: "Ayşe: Eu am douăzeci și opt. La revedere, Mihai!", tr: "Ben yirmi sekiz yaşındayım. Hoşça kalın, Mihai!" },
        ],
      },
      {
        type: "tip",
        title: "🔑 Dilbilgisi Notları",
        text: "'Mă numesc' → dönüşlü fiil, lit: 'kendime ad takıyorum'; resmi tanışmada kullanılır.\n'Dumneavoastră' → son derece resmi 'siz/sizin' zamiri; kısaltması: dvs.\n'Am treizeci și doi de ani' → yaş ifadesinde 'de ani' obligatördür (20+ sayılar).\n'Mai am mult de învățat' → 'mai' zarfı + a avea + de + mastar = 'hâlâ ... yapmam gerek' anlamı.",
      },
      {
        type: "heading",
        text: "10.2 Diyalog: Restoranda (La Restaurant)",
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
        text: "10.3 Diyalog: Yol Tarifi (Indicații de Drum)",
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
        text: "10.4 Diyalog: Telefon Görüşmesi (Convorbire Telefonică)",
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

  // BÖLÜM 11 — Cheat Sheets
  {
    id: "bolum-11",
    title: "BÖLÜM 11 — Hızlı Başvuru Sayfaları (Cheat Sheets)",
    content: [
      {
        type: "paragraph",
        text: "Bu sayfalar, en temel Rumence yapılarını hızlıca gözden geçirmek için tasarlanmıştır.",
      },
      {
        type: "heading",
        text: "Cheat Sheet 1 — Fiil Zamanları Özeti",
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
        text: "Cheat Sheet 2 — Artikel Tablosu",
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
        text: "Cheat Sheet 4 — Temel Kalıplar ve Yapılar",
        level: 3,
      },
      {
        type: "table",
        data: {
          headers: ["Kalıp / Yapı", "Rumence", "Türkçesi"],
          rows: [
            ["Yaş", "Am X ani.", "X yaşındayım."],
            ["İsim", "Mă numesc / Mă cheamă...", "Adım..."],
            ["Meslek", "Sunt + meslek adı", "Ben + meslek'im."],
            ["Memleket", "Sunt din + şehir/ülke.", "...'den/danım."],
            ["Beğeni", "Îmi place + isim/a + infinitiv.", "...seviyorum."],
            ["İhtiyaç", "Am nevoie de + isim.", "...'e ihtiyacım var."],
            ["Zorunluluk", "Trebuie să + conjunctiv.", "...meli/malıyım."],
            ["İzin istemek", "Pot să + conjunctiv?", "...yabilir miyim?"],
            ["Istek", "Vreau să + conjunctiv.", "...mek istiyorum."],
            ["Karşılaştırma", "mai + sıfat + decât", "daha ... -den"],
            ["Olumsuz", "Nu + fiil (+zamir önde)", "...mıyor/-me-"],
          ],
        },
      },
      {
        type: "heading",
        text: "Cheat Sheet 5 — Bağlaçlar ve Edatlar",
        level: 3,
      },
      {
        type: "table",
        data: {
          headers: ["Rumence", "Türkçe"],
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
            ["lângă", "yanında"],
            ["între", "arasında"],
            ["din", "içinden / -den"],
            ["despre", "hakkında"],
          ],
        },
      },
    ],
  },

  // BÖLÜM 12 — Alıştırmalar
  {
    id: "bolum-12",
    title: "BÖLÜM 12 — Alıştırmalar ve Testler (Exerciții și Teste)",
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
          "Am văzut ______ film bun ieri. (film — nötr)",
          "______ casă este albă ve büyük. (casă — dişil, belirli tekil N)",
          "Dau ______ carte ______ fată. (carte — dişil, belirli; fată — dişil, belirli G/D)",
          "Am cumpărat ______ mere ve ______ pâine. (mere — çoğul, belirsiz; pâine — dişil, belirsiz)",
          "______ copii se joacă în parc. (copii — çoğul, belirli N)",
        ],
      },
      {
        type: "tip",
        title: "Cevaplar",
        text: "1. un  2. Casa  3. cartea / fetei  4. niște / o  5. Copiii",
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
          "Eu ______ la birou în fiecare zi. (a merge)",
          "Tu ______ românește foarte bine! (a vorbi)",
          "Noi ______ o cafea dimineața. (a bea)",
          "Ei ______ la hotel de ieri. (a fi)",
          "Ei ______ să meargă la cinema. (a vrea)",
        ],
      },
      {
        type: "tip",
        title: "Cevaplar",
        text: "1. merg  2. vorbești  3. bem  4. sunt  5. vor",
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
          "Eu merg la piață. → ________________________",
          "El face temele. → ________________________",
          "Noi vedem un film. → ________________________",
          "Tu vii devreme. → ________________________",
          "Ele scriu o scrisoare. → ________________________",
        ],
      },
      {
        type: "tip",
        title: "Cevaplar",
        text: "1. am mers  2. a făcut  3. am văzut  4. ai venit  5. au scris",
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
          "Yarın sinemaya gideceğim. → ________________________",
          "Kitap masanın üstünde. → ________________________",
          "Seninle konuşmak istiyorum. → ________________________",
          "Bükreş'e nasıl gidebilirim? → ________________________",
          "Bu benim en güzel günüm. → ________________________",
        ],
      },
      {
        type: "tip",
        title: "Cevaplar",
        text: "1. Mâine o să merg la cinema. / Mâine voi merge la cinema.\n2. Cartea este pe masă.\n3. Vreau să vorbesc cu tine.\n4. Cum pot ajunge la București? / Cum ajung la București?\n5. Aceasta este cea mai frumoasă zi a mea.",
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
          "o fată ______ (frumos) → ________________________",
          "niște băieți ______ (înalt) → ________________________",
          "un om ______ (bun) → ________________________",
          "niște case ______ (vechi) → ________________________",
          "un scaun ______ (nou) → ________________________",
        ],
      },
      {
        type: "tip",
        title: "Cevaplar",
        text: "1. frumoasă  2. înalți  3. bun  4. vechi  5. nou",
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
          "Care este capitala României? → Capitala României este București.",
          "Când a aderat România la Uniunea Europeană? → România a aderat la UE în 2007.",
          "Ce este renumit Castelul Bran? → Este cunoscut ca 'Castelul lui Dracula'.",
          "Ce oportunități oferă Munții Carpați? → Oferă oportunități pentru drumeții și sporturi de iarnă.",
        ],
      },
      {
        type: "divider",
      },
      {
        type: "paragraph",
        text: "Succes la învățat! Rumence öğrenmek bir yolculuktur; her gün birkaç kelime daha, her gün biraz daha akıcı. La mulți ani cu limba română! 🇷🇴",
      },
    ],
  },
];
