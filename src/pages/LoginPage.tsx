import { lovable } from "@/integrations/lovable/index";
import { ArrowRight, CheckCircle2, Globe2, GraduationCap, LogIn, PlayCircle, Sparkles } from "lucide-react";
import { useState } from "react";

type LoginPageProps = {
  onGuestLogin: () => void;
};

const FEATURES = [
  {
    title: "Konuşarak öğren",
    description: "Günlük konuşma odaklı egzersizlerle kısa sürede özgüvenli iletişim kur.",
    icon: Globe2,
  },
  {
    title: "Uzman eğitmenler",
    description: "Canlı dersler ve kayıtlı içeriklerle her seviyeye uygun öğrenme yolu.",
    icon: GraduationCap,
  },
  {
    title: "Sınav + takip",
    description: "İlerlemeni ölçen mini testler ve kişisel gelişim raporlarıyla hedefe odaklan.",
    icon: CheckCircle2,
  },
];

const STATS = [
  { label: "Aktif öğrenci", value: "10K+" },
  { label: "Canlı ders", value: "500+" },
  { label: "Memnuniyet", value: "%98" },
];

export default function LoginPage({ onGuestLogin }: LoginPageProps) {
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [isAppleLoading, setIsAppleLoading] = useState(false);

  const handleAppleLogin = async () => {
    setIsAppleLoading(true);
    const { error } = await lovable.auth.signInWithOAuth("apple", {
      redirect_uri: window.location.origin,
    });
    if (error) {
      console.error("Apple ile giriş başlatılamadı", error);
      setIsAppleLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setIsGoogleLoading(true);

    const { error } = await lovable.auth.signInWithOAuth("google", {
      redirect_uri: window.location.origin,
    });

    if (error) {
      console.error("Google ile giriş başlatılamadı", error);
      setIsGoogleLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#fff9f5] text-[#272838]">
      <header className="sticky top-0 z-20 border-b border-[#f2ddd4] bg-white/95 backdrop-blur-sm">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-3 sm:px-6">
          <img
            src="https://www.romingoakademi.com/static/images/logo.png"
            alt="Romingo logo"
            className="w-36 max-w-[45vw]"
          />
          <div className="flex items-center gap-2">
            <a
              href="https://www.romingoakademi.com/kullanicilar/kayit/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-[#f3d3cb] bg-white px-4 py-2 text-sm font-bold text-[#f15b67] transition hover:bg-[#fff4f0]"
            >
              Kayıt ol
            </a>
            <button
              type="button"
              onClick={onGuestLogin}
              className="inline-flex items-center gap-2 rounded-full bg-[#f15b67] px-4 py-2 text-sm font-bold text-white shadow-[0_6px_16px_-8px_rgba(241,91,103,0.8)] transition hover:opacity-90"
            >
              Uygulamaya gir
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </header>

      <main>
        <section className="relative overflow-hidden">
          <div className="absolute -left-24 -top-20 h-64 w-64 rounded-full bg-[#ffd8c4] blur-3xl" />
          <div className="absolute -bottom-28 right-0 h-72 w-72 rounded-full bg-[#ffc5cf] blur-3xl" />

          <div className="relative mx-auto grid w-full max-w-6xl gap-10 px-4 pb-16 pt-12 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
            <div className="space-y-6">
              <p className="inline-flex items-center gap-2 rounded-full border border-[#f7d7ce] bg-white px-3 py-1 text-sm font-semibold text-[#f15b67]">
                <Sparkles className="h-4 w-4" />
                Romingo Akademi deneyimi artık uygulamanın içinde
              </p>
              <h1 className="text-4xl font-black leading-tight text-[#1f2233] sm:text-5xl">
                İngilizceyi eğlenceli bir arayüzle öğren,
                <span className="text-[#f15b67]"> hedeflerine daha hızlı ulaş.</span>
              </h1>
              <p className="max-w-xl text-base text-[#51556b] sm:text-lg">
                Web sitesindeki tanıtım deneyimini uygulamanla birleştirdik. Şimdi hem modern landing deneyimi hem de Romingo eğitim modülleri tek yerde.
              </p>

              <div className="grid gap-3 sm:grid-cols-3">
                {STATS.map((item) => (
                  <article key={item.label} className="rounded-2xl border border-[#f7dfd7] bg-white p-4 shadow-sm">
                    <p className="text-2xl font-black text-[#f15b67]">{item.value}</p>
                    <p className="text-sm font-semibold text-[#555970]">{item.label}</p>
                  </article>
                ))}
              </div>
            </div>

            <div className="rounded-3xl border border-[#f5d9d1] bg-white p-6 shadow-xl shadow-[#f15b6720]">
              <h2 className="text-xl font-black text-[#22253a]">Hemen giriş yap</h2>
              <p className="mt-1 text-sm font-medium text-[#595f76]">Kaldığın yerden devam et ya da misafir modunu kullan.</p>
              <a
                href="https://www.romingoakademi.com/kullanicilar/kayit/"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 inline-flex items-center gap-1 text-sm font-bold text-[#f15b67] underline-offset-4 hover:underline"
              >
                Hesabın yok mu? Kayıt ol
              </a>

              <div className="mt-5 space-y-3">
                <button
                  type="button"
                  onClick={handleGoogleLogin}
                  disabled={isGoogleLoading}
                  className="flex w-full items-center justify-center gap-2 rounded-xl border border-[#eaded9] bg-white py-3 font-extrabold text-[#262b42] transition hover:bg-[#fff6f2] disabled:opacity-70"
                >
                  <span className="text-base" aria-hidden="true">
                    G
                  </span>
                  {isGoogleLoading ? "Yönlendiriliyor..." : "Google ile devam et"}
                </button>

                <button
                  type="button"
                  onClick={handleAppleLogin}
                  disabled={isAppleLoading}
                  className="flex w-full items-center justify-center gap-2 rounded-xl border border-black bg-black py-3 font-extrabold text-white transition hover:opacity-90 disabled:opacity-70"
                >
                  <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.05 20.28c-.98.95-2.05.88-3.08.4-1.09-.5-2.08-.48-3.24 0-1.44.62-2.2.44-3.06-.4C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" />
                  </svg>
                  {isAppleLoading ? "Yönlendiriliyor..." : "Apple ile devam et"}
                </button>

                <button
                  type="button"
                  onClick={onGuestLogin}
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#f15b67] py-3 font-extrabold text-white transition hover:opacity-90"
                >
                  <LogIn className="h-4 w-4" />
                  Misafir olarak giriş yap
                </button>
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto w-full max-w-6xl px-4 pb-16 sm:px-6">
          <div className="rounded-3xl border border-[#f4dfd7] bg-white p-6 sm:p-8">
            <div className="mb-6 flex items-center gap-2 text-[#f15b67]">
              <PlayCircle className="h-5 w-5" />
              <h3 className="text-lg font-black">Web arayüzünden gelen öne çıkan deneyimler</h3>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
              {FEATURES.map((feature) => (
                <article key={feature.title} className="rounded-2xl border border-[#f6e7e0] bg-[#fff9f7] p-5">
                  <feature.icon className="h-8 w-8 text-[#f15b67]" />
                  <h4 className="mt-3 text-base font-black text-[#23263a]">{feature.title}</h4>
                  <p className="mt-1 text-sm text-[#5d6078]">{feature.description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
