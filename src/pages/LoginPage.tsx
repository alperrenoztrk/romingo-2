import { lovable } from "@/integrations/lovable/index";
import { supabase } from "@/integrations/supabase/client";
import { CheckCircle2, Globe2, GraduationCap, PlayCircle, Sparkles, UserPlus } from "lucide-react";
import { useState } from "react";
import { toast } from "@/hooks/use-toast";

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

type Tab = "login" | "register";

export default function LoginPage() {
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [isAppleLoading, setIsAppleLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<Tab>("login");
  const [isRegistering, setIsRegistering] = useState(false);

  // Register form state
  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

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

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== passwordConfirm) {
      toast({ title: "Hata", description: "Parolalar eşleşmiyor.", variant: "destructive" });
      return;
    }
    if (password.length < 8) {
      toast({ title: "Hata", description: "Parola en az 8 karakter olmalıdır.", variant: "destructive" });
      return;
    }
    if (!username.trim() || !email.trim()) {
      toast({ title: "Hata", description: "Kullanıcı adı ve e-posta zorunludur.", variant: "destructive" });
      return;
    }

    setIsRegistering(true);

    const { error } = await supabase.auth.signUp({
      email: email.trim(),
      password,
      options: {
        emailRedirectTo: window.location.origin,
        data: {
          username: username.trim(),
          full_name: `${firstName.trim()} ${lastName.trim()}`.trim(),
          phone: phone.trim(),
        },
      },
    });

    setIsRegistering(false);

    if (error) {
      toast({ title: "Kayıt başarısız", description: error.message, variant: "destructive" });
      return;
    }

    toast({
      title: "Kayıt başarılı! 🎉",
      description: "E-posta adresinize doğrulama bağlantısı gönderildi. Lütfen kontrol edin.",
    });
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
            <button
              type="button"
              onClick={() => setActiveTab("register")}
              className="inline-flex items-center gap-2 rounded-full border border-[#f3d3cb] bg-white px-4 py-2 text-sm font-bold text-[#f15b67] transition hover:bg-[#fff4f0]"
            >
              Kayıt ol
            </button>
            <a
              href="#auth-panel"
              className="inline-flex items-center gap-2 rounded-full bg-[#f15b67] px-4 py-2 text-sm font-bold text-white shadow-[0_6px_16px_-8px_rgba(241,91,103,0.8)] transition hover:opacity-90"
            >
              Giriş yap
            </a>
          </div>
        </div>
      </header>

      <main>
        <section className="relative overflow-hidden">
          <div className="absolute -left-24 -top-20 h-64 w-64 rounded-full bg-[#ffd8c4] blur-3xl" />
          <div className="absolute -bottom-28 right-0 h-72 w-72 rounded-full bg-[#ffc5cf] blur-3xl" />

          <div className="relative mx-auto grid w-full max-w-6xl gap-10 px-4 pb-16 pt-12 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:items-start">
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

            <div id="auth-panel" className="rounded-3xl border border-[#f5d9d1] bg-white p-6 shadow-xl shadow-[#f15b6720]">
              {/* Tabs */}
              <div className="mb-5 flex rounded-xl bg-[#fff3ef] p-1">
                <button
                  type="button"
                  onClick={() => setActiveTab("login")}
                  className={`flex-1 rounded-lg py-2.5 text-sm font-extrabold transition ${activeTab === "login" ? "bg-white text-[#f15b67] shadow-sm" : "text-[#8b8fa6]"}`}
                >
                  Giriş Yap
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab("register")}
                  className={`flex-1 rounded-lg py-2.5 text-sm font-extrabold transition ${activeTab === "register" ? "bg-white text-[#f15b67] shadow-sm" : "text-[#8b8fa6]"}`}
                >
                  Kayıt Ol
                </button>
              </div>

              {activeTab === "login" ? (
                <>
                  <h2 className="text-xl font-black text-[#22253a]">Hemen giriş yap</h2>
                  <p className="mt-1 text-sm font-medium text-[#595f76]">Kaldığın yerden devam etmek için hesabınla giriş yap.</p>

                  <div className="mt-5 space-y-3">
                    <button
                      type="button"
                      onClick={handleGoogleLogin}
                      disabled={isGoogleLoading}
                      className="flex w-full items-center justify-center gap-2 rounded-xl border border-[#eaded9] bg-white py-3 font-extrabold text-[#262b42] transition hover:bg-[#fff6f2] disabled:opacity-70"
                    >
                      <span className="text-base" aria-hidden="true">G</span>
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

                  </div>
                </>
              ) : (
                <>
                  <h2 className="text-xl font-black text-[#22253a]">Hesap oluştur</h2>
                  <p className="mt-1 text-sm font-medium text-[#595f76]">Romingo Akademi ailesine katıl.</p>

                  {/* OAuth register */}
                  <div className="mt-4 flex gap-2">
                    <button
                      type="button"
                      onClick={handleGoogleLogin}
                      disabled={isGoogleLoading}
                      className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-[#eaden9] bg-white py-2.5 text-sm font-bold text-[#262b42] transition hover:bg-[#fff6f2] disabled:opacity-70"
                    >
                      <span aria-hidden="true">G</span>
                      {isGoogleLoading ? "..." : "Google"}
                    </button>
                    <button
                      type="button"
                      onClick={handleAppleLogin}
                      disabled={isAppleLoading}
                      className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-black bg-black py-2.5 text-sm font-bold text-white transition hover:opacity-90 disabled:opacity-70"
                    >
                      <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M17.05 20.28c-.98.95-2.05.88-3.08.4-1.09-.5-2.08-.48-3.24 0-1.44.62-2.2.44-3.06-.4C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" />
                      </svg>
                      {isAppleLoading ? "..." : "Apple"}
                    </button>
                  </div>

                  <div className="my-4 flex items-center gap-3">
                    <div className="h-px flex-1 bg-[#f0ddd5]" />
                    <span className="text-xs font-semibold text-[#a8abbe]">veya</span>
                    <div className="h-px flex-1 bg-[#f0ddd5]" />
                  </div>

                  {/* Registration form */}
                  <form onSubmit={handleRegister} className="space-y-3">
                    <div>
                      <label className="mb-1 block text-xs font-bold text-[#3a3e56]">Kullanıcı Adı *</label>
                      <input
                        type="text"
                        required
                        maxLength={150}
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="w-full rounded-xl border border-[#eaded9] bg-white px-3 py-2.5 text-sm outline-none transition focus:border-[#f15b67] focus:ring-2 focus:ring-[#f15b6730]"
                        placeholder="romingo_user"
                      />
                      <p className="mt-0.5 text-[10px] text-[#9a9db3]">Harf, rakam ve @ / . / + / - / _ karakterleri</p>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="mb-1 block text-xs font-bold text-[#3a3e56]">Adınız</label>
                        <input
                          type="text"
                          value={firstName}
                          onChange={(e) => setFirstName(e.target.value)}
                          className="w-full rounded-xl border border-[#eaded9] bg-white px-3 py-2.5 text-sm outline-none transition focus:border-[#f15b67] focus:ring-2 focus:ring-[#f15b6730]"
                        />
                      </div>
                      <div>
                        <label className="mb-1 block text-xs font-bold text-[#3a3e56]">Soyadınız</label>
                        <input
                          type="text"
                          value={lastName}
                          onChange={(e) => setLastName(e.target.value)}
                          className="w-full rounded-xl border border-[#eaded9] bg-white px-3 py-2.5 text-sm outline-none transition focus:border-[#f15b67] focus:ring-2 focus:ring-[#f15b6730]"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="mb-1 block text-xs font-bold text-[#3a3e56]">Email *</label>
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full rounded-xl border border-[#eaded9] bg-white px-3 py-2.5 text-sm outline-none transition focus:border-[#f15b67] focus:ring-2 focus:ring-[#f15b6730]"
                        placeholder="ornek@email.com"
                      />
                    </div>

                    <div>
                      <label className="mb-1 block text-xs font-bold text-[#3a3e56]">Telefon Numarası</label>
                      <input
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full rounded-xl border border-[#eaded9] bg-white px-3 py-2.5 text-sm outline-none transition focus:border-[#f15b67] focus:ring-2 focus:ring-[#f15b6730]"
                        placeholder="+90 5XX XXX XX XX"
                      />
                    </div>

                    <div>
                      <label className="mb-1 block text-xs font-bold text-[#3a3e56]">Parola *</label>
                      <input
                        type="password"
                        required
                        minLength={8}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full rounded-xl border border-[#eaded9] bg-white px-3 py-2.5 text-sm outline-none transition focus:border-[#f15b67] focus:ring-2 focus:ring-[#f15b6730]"
                      />
                      <p className="mt-0.5 text-[10px] text-[#9a9db3]">En az 8 karakter</p>
                    </div>

                    <div>
                      <label className="mb-1 block text-xs font-bold text-[#3a3e56]">Parola (Tekrar) *</label>
                      <input
                        type="password"
                        required
                        minLength={8}
                        value={passwordConfirm}
                        onChange={(e) => setPasswordConfirm(e.target.value)}
                        className="w-full rounded-xl border border-[#eaded9] bg-white px-3 py-2.5 text-sm outline-none transition focus:border-[#f15b67] focus:ring-2 focus:ring-[#f15b6730]"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={isRegistering}
                      className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#f15b67] py-3 font-extrabold text-white transition hover:opacity-90 disabled:opacity-70"
                    >
                      <UserPlus className="h-4 w-4" />
                      {isRegistering ? "Kayıt yapılıyor..." : "Kayıt Ol"}
                    </button>
                  </form>

                  <p className="mt-3 text-center text-xs text-[#8b8fa6]">
                    Zaten hesabın var mı?{" "}
                    <button type="button" onClick={() => setActiveTab("login")} className="font-bold text-[#f15b67] hover:underline">
                      Giriş yap
                    </button>
                  </p>
                </>
              )}
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
