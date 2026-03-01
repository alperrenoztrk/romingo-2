import { FileText } from "lucide-react";

export default function DistanceSalesAgreementPage() {
  return (
    <main className="min-h-screen bg-slate-50 px-4 py-12 text-slate-900">
      <div className="mx-auto max-w-4xl rounded-3xl border border-slate-200 bg-white p-8 shadow-sm sm:p-12">
        <div className="mb-8 flex items-center gap-3">
          <FileText className="h-8 w-8 text-[#0A3FA0]" />
          <h1 className="text-3xl font-black text-slate-900 sm:text-4xl">Mesafeli Satış Sözleşmesi</h1>
        </div>

        <section className="mb-8">
          <h2 className="mb-3 text-2xl font-bold text-slate-900">MADDE 1: TARAFLAR</h2>

          <h3 className="mb-2 text-xl font-semibold text-slate-900">SATICI:</h3>
          <p className="text-base leading-7 text-slate-700 sm:text-lg">Unvanı: [Şirket Unvanınız]</p>
          <p className="text-base leading-7 text-slate-700 sm:text-lg">Adresi: [Şirket Adresiniz]</p>
          <p className="mb-4 text-base leading-7 text-slate-700 sm:text-lg">E-posta: romingoacademy@outlook.com</p>

          <h3 className="mb-2 text-xl font-semibold text-slate-900">ALICI:</h3>
          <p className="text-base leading-7 text-slate-700 sm:text-lg">Adı Soyadı/Unvanı:</p>
          <p className="text-base leading-7 text-slate-700 sm:text-lg">Adresi:</p>
          <p className="text-base leading-7 text-slate-700 sm:text-lg">Telefon:</p>
          <p className="text-base leading-7 text-slate-700 sm:text-lg">E-posta:</p>
        </section>

        <section className="mb-8">
          <h2 className="mb-3 text-2xl font-bold text-slate-900">MADDE 2: KONU</h2>
          <p className="text-base leading-7 text-slate-700 sm:text-lg">
            İşbu sözleşmenin konusu, ALICI&apos;nın SATICI&apos;ya ait www.romingoakademi.com internet sitesinden
            elektronik ortamda siparişini yaptığı aşağıda nitelikleri ve satış fiyatı belirtilen ürünün/hizmetin
            satışı ve teslimi ile ilgili olarak 6502 sayılı Tüketicinin Korunması Hakkındaki Kanun ve Mesafeli
            Sözleşmeler Yönetmeliği hükümleri gereğince tarafların hak ve yükümlülüklerinin saptanmasıdır.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="mb-3 text-2xl font-bold text-slate-900">MADDE 3: SÖZLEŞME KONUSU ÜRÜN/HİZMET BİLGİLERİ</h2>
          <p className="text-base leading-7 text-slate-700 sm:text-lg">
            Ürünün/Hizmetin türü, miktarı, marka/modeli, rengi, adedi, satış bedeli, ödeme şekli, siparişin sonlandığı
            andaki bilgilerden oluşmaktadır.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="mb-3 text-2xl font-bold text-slate-900">MADDE 4: GENEL HÜKÜMLER</h2>
          <p className="mb-4 text-base leading-7 text-slate-700 sm:text-lg">
            4.1. ALICI, www.romingoakademi.com internet sitesinde sözleşme konusu ürünün temel nitelikleri, satış fiyatı
            ve ödeme şekli ile teslimata ilişkin ön bilgileri okuyup bilgi sahibi olduğunu ve elektronik ortamda gerekli
            teyidi verdiğini beyan eder.
          </p>
          <p className="mb-4 text-base leading-7 text-slate-700 sm:text-lg">
            4.2. Sözleşme konusu ürün/hizmet, yasal 30 günlük süreyi aşmamak koşulu ile her bir ürün için ALICI&apos;nın
            yerleşim yerinin uzaklığına bağlı olarak internet sitesinde ön bilgiler içinde açıklanan süre içinde ALICI
            veya gösterdiği adresteki kişi/kuruluşa teslim edilir. Sunulan hizmet dijital içerik ise, satın alma sonrası
            ALICI&apos;nın hesabına tanımlanır ve/veya e-posta ile erişim bilgileri gönderilir.
          </p>
          <p className="text-base leading-7 text-slate-700 sm:text-lg">
            4.3. SATICI, sözleşme konusu ürünün sağlam, eksiksiz, siparişte belirtilen niteliklere uygun teslim
            edilmesinden sorumludur.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="mb-3 text-2xl font-bold text-slate-900">MADDE 5: CAYMA HAKKI</h2>
          <p className="text-base leading-7 text-slate-700 sm:text-lg">
            ALICI, sözleşme konusu ürünün/hizmetin kendisine veya gösterdiği adresteki kişi/kuruluşa tesliminden
            itibaren 14 (ondört) gün içinde hiçbir gerekçe göstermeksizin cayma hakkına sahiptir. Ancak, Mesafeli
            Sözleşmeler Yönetmeliği&apos;nin &quot;Cayma Hakkının İstisnaları&quot; başlıklı maddesi uyarınca,
            elektronik ortamda anında ifa edilen hizmetler (sınav giriş ücreti) veya tüketiciye anında teslim edilen
            gayrimaddi mallara ilişkin sözleşmelerde cayma hakkı kullanılamaz. Sitemizde satılan sınava giriş hizmetleri
            bu kapsama girdiğinden cayma hakkı kullanılamaz ve iade yapılamaz.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-2xl font-bold text-slate-900">MADDE 6: YETKİLİ MAHKEME</h2>
          <p className="mb-4 text-base leading-7 text-slate-700 sm:text-lg">
            İşbu sözleşmenin uygulanmasında, Sanayi ve Ticaret Bakanlığınca ilan edilen değere kadar Tüketici Hakem
            Heyetleri ile ALICI&apos;nın veya SATICI&apos;nın yerleşim yerindeki Tüketici Mahkemeleri yetkilidir.
          </p>
          <p className="text-base leading-7 text-slate-700 sm:text-lg">
            Siparişin gerçekleşmesi durumunda ALICI işbu sözleşmenin tüm koşullarını kabul etmiş sayılır.
          </p>
        </section>
      </div>
    </main>
  );
}
