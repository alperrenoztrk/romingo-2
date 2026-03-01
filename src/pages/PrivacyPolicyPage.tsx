import { ShieldCheck } from "lucide-react";

export default function PrivacyPolicyPage() {
  return (
    <main className="min-h-screen bg-slate-50 px-4 py-12 text-slate-900">
      <div className="mx-auto max-w-4xl rounded-3xl border border-slate-200 bg-white p-8 shadow-sm sm:p-12">
        <div className="mb-8 flex items-center gap-3">
          <ShieldCheck className="h-8 w-8 text-[#0A3FA0]" />
          <h1 className="text-3xl font-black text-slate-900 sm:text-4xl">Gizlilik Politikası</h1>
        </div>

        <p className="mb-6 text-base leading-7 text-slate-700 sm:text-lg">
          Romingo Academy olarak, kullanıcılarımızın gizliliğine son derece önem veriyoruz. Bu gizlilik politikası,
          sitemizi kullandığınızda hangi kişisel bilgileri topladığımızı ve bu bilgileri nasıl kullandığımızı
          açıklamaktadır.
        </p>

        <section className="mb-8">
          <h2 className="mb-3 text-2xl font-bold text-slate-900">Topladığımız Bilgiler</h2>
          <p className="text-base leading-7 text-slate-700 sm:text-lg">
            Kayıt sırasında adınız, soyadınız, kullanıcı adınız, telefon numaranız ve e-posta adresiniz gibi
            bilgileri topluyoruz. Bu bilgiler, size daha iyi hizmet verebilmek ve hesabınızı yönetebilmek için
            gereklidir.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-2xl font-bold text-slate-900">Bilgilerin Kullanımı</h2>
          <p className="text-base leading-7 text-slate-700 sm:text-lg">
            Topladığımız kişisel bilgiler, hizmetlerimizi sunmak, hesabınızı yönetmek, sizinle iletişim kurmak ve
            sitemizi geliştirmek amacıyla kullanılır. Bilgileriniz hiçbir şekilde üçüncü taraflarla paylaşılmaz.
          </p>
        </section>
      </div>
    </main>
  );
}
