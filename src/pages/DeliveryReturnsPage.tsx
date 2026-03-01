import { Link } from "react-router-dom";

export default function DeliveryReturnsPage() {
  return (
    <div className="min-h-screen bg-gray-50 px-4 py-10 text-gray-900">
      <div className="mx-auto w-full max-w-4xl rounded-2xl bg-white p-6 shadow-sm sm:p-10">
        <div className="mb-8 flex items-center justify-between gap-4">
          <h1 className="text-2xl font-black text-[#0A3FA0] sm:text-3xl">Teslimat ve İade Şartları</h1>
          <Link
            to="/"
            className="rounded-full border border-gray-200 px-4 py-2 text-sm font-bold text-gray-700 transition-colors hover:bg-gray-50"
          >
            Ana Sayfaya Dön
          </Link>
        </div>

        <section className="space-y-4">
          <h2 className="text-xl font-extrabold">Teslimat Şartları</h2>

          <div className="space-y-2">
            <h3 className="text-lg font-bold">Dijital Ürünler (Sınava Giriş, Eğitim Paketleri)</h3>
            <p className="leading-relaxed text-gray-700">
              Satın alma işleminiz onaylandıktan hemen sonra, hizmetinize (sınav, eğitim paketi vb.) ait erişim
              bilgileri veya linkleri, sipariş sırasında belirttiğiniz telefon numaranıza veya e-posta adresinize en
              yakın zamanda gönderilir. E-posta&apos;nın gelen kutunuza ulaşması birkaç saat sürebilir. Eğer e-postayı
              göremezseniz, lütfen "Spam" veya "Gereksiz" klasörlerinizi kontrol ediniz.
            </p>
          </div>

          <div className="space-y-2">
            <h3 className="text-lg font-bold">Fiziksel Ürünler (Kitap vb.)</h3>
            <p className="leading-relaxed text-gray-700">
              Siparişiniz, sipariş tarihini takip eden 3 (üç) iş günü içerisinde kargoya verilir. Kargo takip
              numaranız, ürün kargoya verildiğinde e-posta adresinize gönderilecektir.
            </p>
            <p className="leading-relaxed text-gray-700">
              Teslimat süresi, kargo firmasının yoğunluğuna ve teslimat adresinize bağlı olarak değişiklik
              gösterebilir. Resmi tatil günlerinde ve hafta sonlarında kargo teslimatı yapılmamaktadır.
            </p>
          </div>
        </section>

        <section className="mt-8 space-y-4">
          <h2 className="text-xl font-extrabold">İade Şartları ve Cayma Hakkı</h2>

          <div className="space-y-2">
            <h3 className="text-lg font-bold">Dijital Ürünler (Sınav Sertifikası, Eğitim Paketleri)</h3>
            <p className="leading-relaxed text-gray-700">
              Mesafeli Sözleşmeler Yönetmeliği&apos;nin 15. Maddesi&apos;nin "ğ" bendi uyarınca, "Elektronik ortamda anında ifa
              edilen hizmetler veya tüketiciye anında teslim edilen gayrimaddi mallara ilişkin sözleşmelerde" cayma
              hakkı kullanılamaz.
            </p>
            <p className="leading-relaxed text-gray-700">
              Bu kapsamda, satın almış olduğunuz sınav giriş hizmeti, satın alma işlemi tamamlandığı anda size teslim
              edilmiş sayıldığından, bu ürünlerin iadesi ve iptali mümkün değildir.
            </p>
          </div>

          <div className="space-y-2">
            <h3 className="text-lg font-bold">Fiziksel Ürünler (Kitap vb.)</h3>
            <p className="leading-relaxed text-gray-700">
              Satın aldığınız fiziksel ürünü, teslimat tarihinden itibaren 14 (ondört) gün içerisinde, herhangi bir
              gerekçe göstermeksizin ve cezai şart ödemeksizin iade edebilirsiniz.
            </p>
            <p className="leading-relaxed text-gray-700">
              İade işleminin gerçekleştirilebilmesi için ürünün kullanılmamış, zarar görmemiş ve orijinal ambalajında
              olması gerekmektedir. İade talebiniz için lütfen +90 551 459 67 80 telefon numarasından veya
              romingoacademy@outlook.com adresinden bizimle iletişime geçerek iade sürecini başlatınız.
            </p>
            <p className="leading-relaxed text-gray-700">
              İade kargo ücreti alıcıya aittir. Ürün firmamıza ulaştıktan ve gerekli kontroller yapıldıktan sonra,
              ürün bedeli 10 iş günü içerisinde ödeme yaptığınız yöntemle iade edilecektir.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}
