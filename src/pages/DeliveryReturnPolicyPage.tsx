import { PackageCheck } from "lucide-react";

export default function DeliveryReturnPolicyPage() {
  return (
    <main className="min-h-screen bg-slate-50 px-4 py-12 text-slate-900">
      <div className="mx-auto max-w-4xl rounded-3xl border border-slate-200 bg-white p-8 shadow-sm sm:p-12">
        <div className="mb-8 flex items-center gap-3">
          <PackageCheck className="h-8 w-8 text-[#0A3FA0]" />
          <h1 className="text-3xl font-black text-slate-900 sm:text-4xl">Teslimat ve İade Şartları</h1>
        </div>

        <section className="mb-8">
          <h2 className="mb-3 text-2xl font-bold text-slate-900">Teslimat Şartları</h2>

          <h3 className="mb-2 text-xl font-semibold text-slate-900">Dijital Ürünler (Sınava Giriş, Eğitim Paketleri)</h3>
          <p className="mb-4 text-base leading-7 text-slate-700 sm:text-lg">
            Satın alma işleminiz onaylandıktan hemen sonra, hizmetinize (sınav, eğitim paketi vb.) ait erişim
            bilgileri veya linkleri, sipariş sırasında belirttiğiniz telefon numaranıza veya e-posta adresinize en
            yakın zamanda gönderilir. E-posta&apos;nın gelen kutunuza ulaşması birkaç saat sürebilir. Eğer e-postayı
            göremezseniz, lütfen &quot;Spam&quot; veya &quot;Gereksiz&quot; klasörlerinizi kontrol ediniz.
          </p>

          <h3 className="mb-2 text-xl font-semibold text-slate-900">Fiziksel Ürünler (Kitap vb.)</h3>
          <p className="text-base leading-7 text-slate-700 sm:text-lg">
            Siparişiniz, sipariş tarihini takip eden 3 (üç) iş günü içerisinde kargoya verilir. Kargo takip numaranız,
            ürün kargoya verildiğinde e-posta adresinize gönderilecektir.
          </p>
          <p className="mt-4 text-base leading-7 text-slate-700 sm:text-lg">
            Teslimat süresi, kargo firmasının yoğunluğuna ve teslimat adresinize bağlı olarak değişiklik gösterebilir.
            Resmi tatil günlerinde ve hafta sonlarında kargo teslimatı yapılmamaktadır.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-2xl font-bold text-slate-900">İade Şartları ve Cayma Hakkı</h2>

          <h3 className="mb-2 text-xl font-semibold text-slate-900">Dijital Ürünler (Sınav Sertifikası, Eğitim Paketleri)</h3>
          <p className="mb-4 text-base leading-7 text-slate-700 sm:text-lg">
            Mesafeli Sözleşmeler Yönetmeliği&apos;nin 15. Maddesi&apos;nin &quot;ğ&quot; bendi uyarınca, &quot;Elektronik
            ortamda anında ifa edilen hizmetler veya tüketiciye anında teslim edilen gayrimaddi mallara ilişkin
            sözleşmelerde&quot; cayma hakkı kullanılamaz.
          </p>
          <p className="mb-4 text-base leading-7 text-slate-700 sm:text-lg">
            Bu kapsamda, satın almış olduğunuz sınav giriş hizmeti, satın alma işlemi tamamlandığı anda size teslim
            edilmiş sayıldığından, bu ürünlerin iadesi ve iptali mümkün değildir.
          </p>

          <h3 className="mb-2 text-xl font-semibold text-slate-900">Fiziksel Ürünler (Kitap vb.)</h3>
          <p className="mb-4 text-base leading-7 text-slate-700 sm:text-lg">
            Satın aldığınız fiziksel ürünü, teslimat tarihinden itibaren 14 (ondört) gün içerisinde, herhangi bir
            gerekçe göstermeksizin ve cezai şart ödemeksizin iade edebilirsiniz.
          </p>
          <p className="mb-4 text-base leading-7 text-slate-700 sm:text-lg">
            İade işleminin gerçekleştirilebilmesi için ürünün kullanılmamış, zarar görmemiş ve orijinal ambalajında
            olması gerekmektedir. İade talebiniz için lütfen +90 551 459 67 80 telefon numarasından veya
            romingoacademy@outlook.com adresinden bizimle iletişime geçerek iade sürecini başlatınız.
          </p>
          <p className="text-base leading-7 text-slate-700 sm:text-lg">
            İade kargo ücreti alıcıya aittir. Ürün firmamıza ulaştıktan ve gerekli kontroller yapıldıktan sonra, ürün
            bedeli 10 iş günü içerisinde ödeme yaptığınız yöntemle iade edilecektir.
          </p>
        </section>
      </div>
    </main>
  );
}
