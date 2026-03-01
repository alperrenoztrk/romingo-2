import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Monitor, Award, BookOpen, Users, Globe, Shield, CheckCircle, Star, Mail, Phone, Gamepad2, MapPin, Smartphone } from "lucide-react";
import { lovable } from "@/integrations/lovable/index";

const features = [
  { icon: Award, title: "Uluslararası Akredite B1 Sertifikası", desc: "Avrupa standartlarında B1 seviye Rumence sertifikası alın." },
  { icon: Monitor, title: "Zoom ile Canlı Dersler", desc: "Uzman eğitmenlerimizle birebir veya grup halinde online Rumence eğitimi." },
  { icon: BookOpen, title: "Sınırsız Eğitim Seçeneği", desc: "B1 sertifikasını alana kadar sınırsız ders hakkı ile garantili öğrenme." },
  { icon: Users, title: "Deneyimli Eğitmenler", desc: "Rumence ve Türkçe bilen uzman eğitmen kadromuz ile hızlı öğrenin." },
];

const certBenefits = [
  { icon: Globe, title: "Avrupa'da Geçerli", desc: "Tüm AB ülkelerinde tanınan belge ile sınırları kaldırın." },
  { icon: Shield, title: "Vatandaşlık Kabulü", desc: "Romanya ANC'de geçerli başvurularda geçerli dil yeterlilik belgesi." },
  { icon: CheckCircle, title: "İş Başvurularında", desc: "Romanya'da ve uluslararası şirketlerde büyük avantaj." },
  { icon: Star, title: "Kalite Garantisi", desc: "Yetkili ve akredite kurumlardan alınan güvenilir sertifika." },
];

const packages = [
  { name: "Başlangıç Paketi", level: "A1 Seviyesi", price: "10.000", items: ["A1 Seviye Rumence Eğitimi", "Zoom ile Canlı Dersler", "Ders Materyalleri Dahil", "Online Destek", "Sertifika Hazırlık"], badge: null },
  { name: "Orta Paket", level: "A1 + A2 Seviyesi", price: "20.000", items: ["A1 + A2 Seviye Rumence", "Zoom ile Canlı Dersler", "Tüm Ders Materyalleri", "Özel Ders Desteği", "İki Seviye Sertifika"], badge: "En Popüler" },
  { name: "Premium Paket", level: "Sertifika Garantili", price: "24.000", items: ["Sınırsız Eğitim Hakkı", "B1 Garantili Sertifika", "Tüm Seviyeler Dahil", "Kişisel Eğitmen Desteği", "Başarıya Kadar Eğitim"], badge: "En Avantajlı" },
  { name: "Konuşma Paketi", level: "Uzman Eğitmenlerle Pratik", price: "10.000", items: ["Zoom Üzerinden Sohbet", "İnteraktif Konuşma", "Rumence Pratik", "Birebir Mentorluk", "Uzman Eğitmenler"], badge: null },
];

const testimonials = [
  { name: "Ayşe Yılmaz", package: "A1 + A2 + B1 Paketi", text: "Romingo Academy sayesinde 6 ayda B1 sertifikamı aldım. Romanya'da üniversite okuma hayalim gerçek oldu!" },
  { name: "Mehmet Kaya", package: "Sınav Hazırlık Paketi", text: "Eğitmenler çok profesyonel ve Zoom dersleri çok verimli geçiyor. Kesinlikle tavsiye ederim." },
  { name: "Zeynep Demir", package: "B1 Sertifika Paketi", text: "B1 sertifikası ile Romanya'da iş buldum. Her şey için teşekkürler!" },
];

const faqs = [
  {
    question: "Bu kurslar kimler için uygun?",
    answer:
      "Kurslarımız, Romence'ye sıfırdan başlamak isteyenlerden mevcut dil bilgisini akademik veya profesyonel seviyeye taşımayı hedefleyenlere kadar her seviyeden öğrenciye hitap etmektedir. A1 seviyesinden başlayarak C1 seviyesine kadar uzanan geniş bir yelpazede eğitimler sunuyoruz.",
  },
  {
    question: "Dersleri kendi hızıma göre takip edebilir miyim?",
    answer:
      "Evet! Platformumuzdaki tüm video dersler kayıt altındadır. Derslere dilediğiniz zaman, dilediğiniz yerden erişebilir, anlamadığınız yerleri tekrar izleyebilir ve tamamen kendi öğrenme hızınıza göre ilerleyebilirsiniz.",
  },
  {
    question: "Derslerde anlamadığım bir konu olursa destek alabilir miyim?",
    answer:
      "Kesinlikle. Uzman eğitmenlerimizle düzenlediğimiz canlı soru-cevap oturumlarına katılabilir, ders videolarının altına yorum yazarak sorularınızı iletebilir veya topluluk forumlarımızda diğer öğrencilerle ve eğitmenlerle etkileşime geçebilirsiniz. Amacımız, öğrenme sürecinizde sizi asla yalnız bırakmamaktır.",
  },
  {
    question: "Mobil cihazlardan dersleri izleyebilir miyim?",
    answer:
      "Evet, web sitemiz tüm mobil cihazlar (akıllı telefon, tablet) ve bilgisayarlarla tam uyumludur. İnternet bağlantınızın olduğu her yerden derslerinize kolayca erişebilirsiniz.",
  },
  {
    question: "Ücretsiz deneme dersi veya içeriği mevcut mu?",
    answer:
      "Evet, platformumuzu ve eğitim metodolojimizi tanımanız için sunduğumuz ücretsiz deneme dersleri ve \"Eğlenerek Öğren\" bölümündeki interaktif oyunlarımız bulunmaktadır. Bu içeriklere göz atarak sistemimizin sizin için uygun olup olmadığına karar verebilirsiniz.",
  },
  {
    question: "Başka bir sorum var, size nasıl ulaşabilirim?",
    answer:
      "Her türlü sorunuz için sayfamızdaki e-posta adresimiz veya telefon numaramız aracılığıyla bize kolayca ulaşabilirsiniz. Size en kısa sürede yardımcı olmaktan mutluluk duyarız.",
  },
];

export default function WebsitePage() {
  const [showAuthMenu, setShowAuthMenu] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [isAppleLoading, setIsAppleLoading] = useState(false);

  const handleGoogleLogin = async () => {
    setIsGoogleLoading(true);
    const { error } = await lovable.auth.signInWithOAuth("google", {
      redirect_uri: window.location.origin + "/app",
    });
    if (error) {
      console.error("Google ile giriş başlatılamadı", error);
      setIsGoogleLoading(false);
    }
  };

  const handleAppleLogin = async () => {
    setIsAppleLoading(true);
    const { error } = await lovable.auth.signInWithOAuth("apple", {
      redirect_uri: window.location.origin + "/app",
    });
    if (error) {
      console.error("Apple ile giriş başlatılamadı", error);
      setIsAppleLoading(false);
    }
  };
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white text-gray-900 font-nunito">
      {/* Navbar */}
      <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur border-b border-gray-100 shadow-sm">
        <div className="max-w-6xl mx-auto flex items-center justify-between px-4 h-16">
          <div className="flex items-center gap-2">
            <img src="https://www.romingoakademi.com/static/images/logo.png" alt="Romingo" className="h-10" />
            <span className="font-extrabold text-lg hidden sm:inline">
              <span className="text-[#D70C2C]">Romi</span><span className="text-[#0A3FA0]">ngo</span>
              <span className="text-gray-600 font-semibold ml-1">Academy</span>
            </span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => navigate("/blog")}
              className="rounded-full border border-gray-200 px-4 py-2 text-sm font-bold text-gray-700 transition-colors hover:bg-gray-50"
            >
              Blog
            </button>
            <button
              onClick={() => navigate("/app")}
              className="bg-[#F8E71C] hover:bg-[#e6d619] text-gray-900 font-bold px-4 py-2 rounded-full text-sm transition-colors flex items-center gap-2"
            >
              <Smartphone className="w-4 h-4" />
              Uygulamayı Aç
            </button>
            <div className="relative">
              <button
                onClick={() => setShowAuthMenu(!showAuthMenu)}
                className="bg-[#0A3FA0] hover:bg-[#083380] text-white font-bold px-4 py-2 rounded-full text-sm transition-colors hidden sm:inline-block"
              >
                Kayıt Ol
              </button>
              {showAuthMenu && (
                <div className="absolute right-0 top-full mt-2 w-64 rounded-2xl border border-gray-200 bg-white p-4 shadow-xl z-50">
                  <p className="mb-3 text-xs font-bold text-gray-500">Hızlı giriş / kayıt</p>
                  <button
                    type="button"
                    onClick={handleGoogleLogin}
                    disabled={isGoogleLoading}
                    className="mb-2 flex w-full items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white py-2.5 text-sm font-bold text-gray-800 transition hover:bg-gray-50 disabled:opacity-70"
                  >
                    <span aria-hidden="true">G</span>
                    {isGoogleLoading ? "Yönlendiriliyor..." : "Google ile devam et"}
                  </button>
                  <button
                    type="button"
                    onClick={handleAppleLogin}
                    disabled={isAppleLoading}
                    className="mb-3 flex w-full items-center justify-center gap-2 rounded-xl border border-black bg-black py-2.5 text-sm font-bold text-white transition hover:opacity-90 disabled:opacity-70"
                  >
                    <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M17.05 20.28c-.98.95-2.05.88-3.08.4-1.09-.5-2.08-.48-3.24 0-1.44.62-2.2.44-3.06-.4C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" />
                    </svg>
                    {isAppleLoading ? "Yönlendiriliyor..." : "Apple ile devam et"}
                  </button>
                  <div className="flex items-center gap-2 mb-3">
                    <div className="h-px flex-1 bg-gray-200" />
                    <span className="text-[10px] text-gray-400">veya</span>
                    <div className="h-px flex-1 bg-gray-200" />
                  </div>
                  <button
                    onClick={() => { setShowAuthMenu(false); navigate("/app"); }}
                    className="w-full rounded-xl bg-[#0A3FA0] py-2.5 text-sm font-bold text-white transition hover:bg-[#083380]"
                  >
                    E-posta ile Kayıt Ol
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('/images/peles-castle.jpg')" }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/40 to-black/60" />
        <div className="relative z-10 text-center px-4 max-w-3xl mx-auto">
          <h1 className="text-3xl sm:text-5xl font-black text-white leading-tight mb-4">
            Romingo Academy ile Rumence'yi Keşfedin
          </h1>
          <p className="text-white/90 text-base sm:text-lg mb-6 leading-relaxed">
            Profesyonel ekibimiz ve uzman öğretmenlerimiz eşliğinde, interaktif ve keyifli bir ders ortamında Rumence öğrenin.
          </p>
          <div className="flex flex-wrap justify-center gap-4 mb-8 text-white/80 text-sm font-semibold">
            <span className="flex items-center gap-1.5"><Monitor className="w-4 h-4" /> Uzman Eğitmenler</span>
            <span className="flex items-center gap-1.5"><CheckCircle className="w-4 h-4" /> Etkili Metotlar</span>
            <span className="flex items-center gap-1.5"><Award className="w-4 h-4" /> Sertifikalı Eğitim</span>
          </div>
          <div className="flex flex-wrap justify-center gap-3">
            <button
              onClick={() => navigate("/app/kahoot?view=create")}
              className="bg-[#F8E71C] hover:bg-[#e6d619] text-gray-900 font-extrabold px-6 py-3 rounded-full text-base transition-colors flex items-center gap-2 shadow-lg"
            >
              <Gamepad2 className="w-5 h-5" />
              Eğlenerek Öğren
            </button>
            <a
              href="#hakkimizda"
              className="bg-white/10 hover:bg-white/20 border border-white/30 text-white font-bold px-6 py-3 rounded-full text-base transition-colors shadow-lg"
            >
              Hakkımızda
            </a>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="sss" className="py-16 px-4 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-black mb-3">Sıkça Sorulan Sorular</h2>
            <p className="text-gray-500">Romence eğitimlerimizle ilgili en çok merak edilen konular.</p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq) => (
              <article key={faq.question} className="rounded-2xl border border-gray-200 bg-gray-50 p-5 sm:p-6">
                <h3 className="text-base sm:text-lg font-extrabold text-[#0A3FA0] mb-2">{faq.question}</h3>
                <p className="text-sm sm:text-base text-gray-700 leading-relaxed">{faq.answer}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Why Romingo */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-5xl mx-auto text-center mb-12">
          <h2 className="text-2xl sm:text-3xl font-black mb-3">Neden Romingo Academy?</h2>
          <p className="text-gray-500">Uluslararası standartlarda eğitim ve garantili sertifika ile Rumence öğrenin.</p>
        </div>
        <div className="max-w-5xl mx-auto grid sm:grid-cols-2 gap-6">
          {features.map((f) => (
            <div key={f.title} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex gap-4 items-start">
              <div className="bg-[#0A3FA0]/10 rounded-xl p-3 flex-shrink-0">
                <f.icon className="w-6 h-6 text-[#0A3FA0]" />
              </div>
              <div>
                <h3 className="font-bold text-base mb-1">{f.title}</h3>
                <p className="text-gray-500 text-sm">{f.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Certificate Benefits */}
      <section className="py-16 px-4">
        <div className="max-w-5xl mx-auto text-center mb-12">
          <h2 className="text-2xl sm:text-3xl font-black mb-3">Sertifika Avantajları</h2>
          <p className="text-gray-500">Uluslararası geçerliliğe sahip sertifikanın size katacağı değerler.</p>
        </div>
        <div className="max-w-5xl mx-auto grid grid-cols-2 sm:grid-cols-4 gap-4">
          {certBenefits.map((b) => (
            <div key={b.title} className="text-center p-5 rounded-2xl bg-gradient-to-b from-[#0A3FA0]/5 to-transparent border border-[#0A3FA0]/10">
              <div className="mx-auto w-12 h-12 rounded-xl bg-[#0A3FA0]/10 flex items-center justify-center mb-3">
                <b.icon className="w-5 h-5 text-[#0A3FA0]" />
              </div>
              <h4 className="font-bold text-sm mb-1">{b.title}</h4>
              <p className="text-gray-500 text-xs">{b.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Pricing */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-5xl mx-auto text-center mb-12">
          <h2 className="text-2xl sm:text-3xl font-black mb-3">Eğitim Paketlerimiz</h2>
          <p className="text-gray-500">Size uygun paketi seçin, Rumence öğrenmeye hemen başlayın.</p>
        </div>
        <div className="max-w-5xl mx-auto grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {packages.map((pkg) => (
            <div key={pkg.name} className="relative bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex flex-col">
              {pkg.badge && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#D70C2C] text-white text-xs font-bold px-3 py-1 rounded-full">
                  {pkg.badge}
                </span>
              )}
              <h3 className="font-bold text-base mb-1">{pkg.name}</h3>
              <p className="text-xs text-gray-400 mb-3">{pkg.level}</p>
              <div className="text-2xl font-black text-[#0A3FA0] mb-4">{pkg.price} TL</div>
              <ul className="space-y-2 mb-6 flex-1">
                {pkg.items.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm text-gray-600">
                    <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                    {item}
                  </li>
                ))}
              </ul>
              <a href={`https://wa.me/+905514596780?text=${encodeURIComponent(`Merhaba Romingo Akademi ${pkg.name} hakkında bilgi alabilir miyim?`)}`}
                target="_blank" rel="noopener noreferrer"
                className="block text-center bg-[#0A3FA0] hover:bg-[#083380] text-white font-bold py-2.5 rounded-xl text-sm transition-colors">
                Bilgi Al
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 px-4">
        <div className="max-w-5xl mx-auto text-center mb-12">
          <h2 className="text-2xl sm:text-3xl font-black mb-3">Öğrencilerimiz Ne Diyor?</h2>
          <p className="text-gray-500">Başarı hikayelerini ve deneyimlerini öğrenin</p>
        </div>
        <div className="max-w-4xl mx-auto grid sm:grid-cols-3 gap-4">
          {testimonials.map((t) => (
            <div key={t.name} className="bg-gradient-to-br from-[#0A3FA0]/5 to-white rounded-2xl p-6 border border-[#0A3FA0]/10">
              <div className="flex gap-1 mb-3">
                {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-[#F8E71C] text-[#F8E71C]" />)}
              </div>
              <p className="text-sm text-gray-600 italic mb-4">"{t.text}"</p>
              <div className="font-bold text-sm">{t.name}</div>
              <div className="text-xs text-gray-400">{t.package}</div>
            </div>
          ))}
        </div>
      </section>

      {/* About */}
      <section id="hakkimizda" className="py-16 px-4 bg-gray-50">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-black mb-3">Hakkımızda</h2>
            <p className="text-gray-500">Romingo Academy olarak vizyonumuz ve misyonumuz.</p>
          </div>

          <div className="bg-white border border-gray-100 rounded-3xl p-6 sm:p-10 shadow-sm space-y-8 text-gray-700 leading-relaxed">
            <div className="space-y-3">
              <h3 className="text-xl font-extrabold text-[#0A3FA0]">Vizyonumuz</h3>
              <p>
                Romenceyi yalnızca bir dil değil, bir kültür köprüsü olarak öğretmek ve Romanya vatandaşlığına giden
                yolda en güvenilir, en kapsamlı ve en erişilebilir eğitim platformu olmaktır.
              </p>
              <p>
                Amacımız, Türkiye&apos;de ve dünyada Romanya ile kültürel, akademik ve hukuki bağ kurmak isteyen herkese;
                kaliteli, sistemli ve sonuç odaklı dil eğitimiyle destek sunmak, Romenceyi öğrenmeyi keyifli, etkili ve
                sürdürülebilir bir deneyime dönüştürmektir.
              </p>
            </div>

            <div className="space-y-3">
              <h3 className="text-xl font-extrabold text-[#D70C2C]">Misyonumuz</h3>
              <p>
                Romingo Academy&apos;nin misyonu; Romanya vatandaşlığı başvurularında zorunlu olan geçerli B1 sertifikasını
                en doğru yöntemlerle alabilmeniz için öğrencilerine akademik doğruluğa, bireysel desteğe ve başarıya
                odaklı bir eğitim süreci sunmaktır.
              </p>
            </div>

            <div>
              <h4 className="font-bold text-gray-900 mb-3">Bu doğrultuda:</h4>
              <ul className="space-y-2 text-sm sm:text-base">
                <li className="flex items-start gap-2"><CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />Resmî kurumlarla (ILR, UAIC vb.) işbirliği içinde yürütülen güvenilir sınav hazırlık süreçleri,</li>
                <li className="flex items-start gap-2"><CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />Her seviyeye uygun A1–A2–B1 online kursları,</li>
                <li className="flex items-start gap-2"><CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />Canlı dersler, etütler, konuşma pratikleri ve deneme sınavlarıyla pekiştirilen eğitim sistemi,</li>
                <li className="flex items-start gap-2"><CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />Öğrencilerimizin bireysel hedeflerine göre şekillenen danışmanlık ve rehberlik hizmetleri</li>
              </ul>
            </div>

            <p className="font-semibold text-gray-900">
              Bizim için her öğrenci bir dosya değil, bir başarı hikayesidir. Romingo Academy, bu hikayelerin güvenle
              yazıldığı yer olmayı sürdürür.
            </p>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section className="py-16 px-4 bg-[#0A3FA0] text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl sm:text-3xl font-black mb-3">Bir Sorunuz mu Var?</h2>
          <p className="text-white/70 mb-8">Eğitimlerimiz hakkında bize yazmaktan çekinmeyin.</p>
          <div className="flex flex-wrap justify-center gap-6 mb-8">
            <a href="mailto:info@romingoacademy.com" className="flex items-center gap-2 text-white/90 hover:text-white transition-colors">
              <Mail className="w-5 h-5" /> info@romingoacademy.com
            </a>
            <a href="tel:+905514596780" className="flex items-center gap-2 text-white/90 hover:text-white transition-colors">
              <Phone className="w-5 h-5" /> +90 551 459 67 80
            </a>
          </div>
          <button
            onClick={() => navigate("/app")}
            className="bg-[#F8E71C] hover:bg-[#e6d619] text-gray-900 font-extrabold px-8 py-4 rounded-full text-lg transition-colors inline-flex items-center gap-3 shadow-xl"
          >
            <Smartphone className="w-6 h-6" />
            Uygulamayı Aç
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#161d2a] px-4 py-14 text-white">
        <div className="mx-auto grid max-w-6xl gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <h3 className="mb-5 text-2xl font-black text-[#f8c524]">ROMİNGO ACADEMY</h3>
            <p className="max-w-xs text-lg leading-relaxed text-white/85">
              Romence öğrenme yolculuğunuzda size en modern ve etkili yöntemlerle rehberlik ediyoruz. A'dan Z'ye
              tüm seviyeler için hazırlanmış video derslerle dil öğrenimini keyifli hale getirin.
            </p>
          </div>

          <div>
            <ul className="space-y-3 text-lg text-white/85">
              <li><a href="#hakkimizda" className="hover:text-white transition-colors">Hakkımızda</a></li>
              <li><a href="#sss" className="hover:text-white transition-colors">Sıkça Sorulan Sorular</a></li>
              <li>
                <Link to="/gizlilik-politikasi" className="hover:text-white transition-colors">
                  Gizlilik Politikası
                </Link>
              </li>
              <li>
                <Link to="/kullanim-sartlari" className="hover:text-white transition-colors">
                  Kullanım Şartları
                </Link>
              </li>
              <li>
                <Link to="/mesafeli-satis-sozlesmesi" className="hover:text-white transition-colors">
                  Mesafeli Satış Sözleşmesi
                </Link>
              </li>
              <li>
                <Link to="/teslimat-ve-iade-sartlari" className="hover:text-white transition-colors">
                  Teslimat ve İade Şartları
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-5 text-2xl font-black">İLETİŞİM</h3>
            <ul className="space-y-4 text-lg text-white/85">
              <li className="flex items-center gap-3">
                <MapPin className="h-5 w-5 flex-shrink-0" />
                İstanbul, Türkiye
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-5 w-5 flex-shrink-0" />
                <a href="mailto:info@romingoakademi.com" className="hover:text-white transition-colors">info@romingoakademi.com</a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-5 w-5 flex-shrink-0" />
                <a href="mailto:sinav@romingoakademi.com" className="hover:text-white transition-colors">sinav@romingoakademi.com</a>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-5 w-5 flex-shrink-0" />
                <a href="tel:+905514596780" className="hover:text-white transition-colors">+90 551 459 67 80</a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-5 text-2xl font-black">GÜVENLİ ÖDEME</h3>
            <div className="flex flex-wrap gap-2">
              {['iyzico', 'Mastercard', 'VISA', 'AMEX', 'troy'].map((provider) => (
                <span
                  key={provider}
                  className="rounded-md border border-white/20 bg-white/10 px-3 py-2 text-sm font-bold tracking-wide text-white/90"
                >
                  {provider}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="mx-auto mt-10 max-w-6xl border-t border-white/20 pt-6 text-center text-sm text-white/60">
          © 2026 Romingo Academy. Tüm hakları saklıdır.
        </div>
      </footer>
    </div>
  );
}
