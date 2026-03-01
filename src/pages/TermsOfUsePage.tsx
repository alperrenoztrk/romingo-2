import { FileText } from "lucide-react";

export default function TermsOfUsePage() {
  return (
    <main className="min-h-screen bg-slate-50 px-4 py-12 text-slate-900">
      <div className="mx-auto max-w-4xl rounded-3xl border border-slate-200 bg-white p-8 shadow-sm sm:p-12">
        <div className="mb-8 flex items-center gap-3">
          <FileText className="h-8 w-8 text-[#0A3FA0]" />
          <h1 className="text-3xl font-black text-slate-900 sm:text-4xl">Kullanım Şartları</h1>
        </div>

        <section className="mb-8">
          <h2 className="mb-3 text-2xl font-bold text-slate-900">Kullanım Şartları</h2>
          <p className="text-base leading-7 text-slate-700 sm:text-lg">
            Lütfen sitemizi kullanmadan önce bu kullanım şartlarını dikkatlice okuyunuz. Bu web sitesini
            kullanarak, bu şartları kabul etmiş sayılırsınız.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="mb-3 text-2xl font-bold text-slate-900">Hesap Güvenliği</h2>
          <p className="text-base leading-7 text-slate-700 sm:text-lg">
            Hesap bilgilerinizin ve şifrenizin güvenliğinden siz sorumlusunuz. Hesabınız üzerinden yapılan tüm
            aktiviteler sizin sorumluluğunuzdadır.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-2xl font-bold text-slate-900">İçerik Kullanımı</h2>
          <p className="text-base leading-7 text-slate-700 sm:text-lg">
            Sitede yer alan tüm video dersler ve materyaller Romingo Academy&apos;e aittir. Bu içeriklerin izinsiz
            olarak kopyalanması, dağıtılması veya ticari amaçlarla kullanılması yasaktır.
          </p>
        </section>
      </div>
    </main>
  );
}
