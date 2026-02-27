import { useNavigate } from "react-router-dom";
import { Monitor, Award, BookOpen, Users, Globe, Shield, CheckCircle, Star, Mail, Phone, Gamepad2 } from "lucide-react";

const features = [
  { icon: Award, title: "Uluslararası Akredite B1 Sertifikası", desc: "Avrupa standartlarında B1 seviye Romence sertifikası alın." },
  { icon: Monitor, title: "Zoom ile Canlı Dersler", desc: "Uzman eğitmenlerimizle birebir veya grup halinde online Romence eğitimi." },
  { icon: BookOpen, title: "Sınırsız Eğitim Seçeneği", desc: "B1 sertifikasını alana kadar sınırsız ders hakkı ile garantili öğrenme." },
  { icon: Users, title: "Deneyimli Eğitmenler", desc: "Romence ve Türkçe bilen uzman eğitmen kadromuz ile hızlı öğrenin." },
];

const certBenefits = [
  { icon: Globe, title: "Avrupa'da Geçerli", desc: "Tüm AB ülkelerinde tanınan belge ile sınırları kaldırın." },
  { icon: Shield, title: "Vatandaşlık Kabulü", desc: "Romanya ANC'de geçerli başvurularda geçerli dil yeterlilik belgesi." },
  { icon: CheckCircle, title: "İş Başvurularında", desc: "Romanya'da ve uluslararası şirketlerde büyük avantaj." },
  { icon: Star, title: "Kalite Garantisi", desc: "Yetkili ve akredite kurumlardan alınan güvenilir sertifika." },
];

const packages = [
  { name: "Başlangıç Paketi", level: "A1 Seviyesi", price: "10.000", items: ["A1 Seviye Romence Eğitimi", "Zoom ile Canlı Dersler", "Ders Materyalleri Dahil", "Online Destek", "Sertifika Hazırlık"], badge: null },
  { name: "Orta Paket", level: "A1 + A2 Seviyesi", price: "20.000", items: ["A1 + A2 Seviye Romence", "Zoom ile Canlı Dersler", "Tüm Ders Materyalleri", "Özel Ders Desteği", "İki Seviye Sertifika"], badge: "En Popüler" },
  { name: "Premium Paket", level: "Sertifika Garantili", price: "24.000", items: ["Sınırsız Eğitim Hakkı", "B1 Garantili Sertifika", "Tüm Seviyeler Dahil", "Kişisel Eğitmen Desteği", "Başarıya Kadar Eğitim"], badge: "En Avantajlı" },
  { name: "Konuşma Paketi", level: "Uzman Eğitmenlerle Pratik", price: "10.000", items: ["Zoom Üzerinden Sohbet", "İnteraktif Konuşma", "Romence Pratik", "Birebir Mentorluk", "Uzman Eğitmenler"], badge: null },
];

const testimonials = [
  { name: "Ayşe Yılmaz", package: "A1 + A2 + B1 Paketi", text: "Romingo Academy sayesinde 6 ayda B1 sertifikamı aldım. Romanya'da üniversite okuma hayalim gerçek oldu!" },
  { name: "Mehmet Kaya", package: "Sınav Hazırlık Paketi", text: "Eğitmenler çok profesyonel ve Zoom dersleri çok verimli geçiyor. Kesinlikle tavsiye ederim." },
  { name: "Zeynep Demir", package: "B1 Sertifika Paketi", text: "B1 sertifikası ile Romanya'da iş buldum. Her şey için teşekkürler!" },
];

export default function WebsitePage() {
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
              onClick={() => navigate("/app")}
              className="bg-[#F8E71C] hover:bg-[#e6d619] text-gray-900 font-bold px-4 py-2 rounded-full text-sm transition-colors flex items-center gap-2"
            >
              <Gamepad2 className="w-4 h-4" />
              Uygulamayı Aç
            </button>
            <a href="https://wa.me/+905514596780" target="_blank" rel="noopener noreferrer"
              className="bg-[#0A3FA0] hover:bg-[#083380] text-white font-bold px-4 py-2 rounded-full text-sm transition-colors hidden sm:inline-block">
              Kayıt Ol
            </a>
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
            Romingo Academy ile Romence'yi Keşfedin
          </h1>
          <p className="text-white/90 text-base sm:text-lg mb-6 leading-relaxed">
            Profesyonel ekibimiz ve uzman öğretmenlerimiz eşliğinde, interaktif ve keyifli bir ders ortamında Romence öğrenin.
          </p>
          <div className="flex flex-wrap justify-center gap-4 mb-8 text-white/80 text-sm font-semibold">
            <span className="flex items-center gap-1.5"><Monitor className="w-4 h-4" /> Uzman Eğitmenler</span>
            <span className="flex items-center gap-1.5"><CheckCircle className="w-4 h-4" /> Etkili Metotlar</span>
            <span className="flex items-center gap-1.5"><Award className="w-4 h-4" /> Sertifikalı Eğitim</span>
          </div>
          <div className="flex flex-wrap justify-center gap-3">
            <button
              onClick={() => navigate("/app")}
              className="bg-[#F8E71C] hover:bg-[#e6d619] text-gray-900 font-extrabold px-6 py-3 rounded-full text-base transition-colors flex items-center gap-2 shadow-lg"
            >
              <Gamepad2 className="w-5 h-5" />
              Eğlenerek Öğren
            </button>
            <a href="https://wa.me/+905514596780" target="_blank" rel="noopener noreferrer"
              className="bg-white/10 hover:bg-white/20 border border-white/30 text-white font-bold px-6 py-3 rounded-full text-base transition-colors shadow-lg">
              Hemen Kayıt Ol
            </a>
          </div>
        </div>
      </section>

      {/* Why Romingo */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-5xl mx-auto text-center mb-12">
          <h2 className="text-2xl sm:text-3xl font-black mb-3">Neden Romingo Academy?</h2>
          <p className="text-gray-500">Uluslararası standartlarda eğitim ve garantili sertifika ile Romence öğrenin.</p>
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
          <p className="text-gray-500">Size uygun paketi seçin, Romence öğrenmeye hemen başlayın.</p>
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
            <Gamepad2 className="w-6 h-6" />
            Uygulamayı Aç
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 bg-gray-900 text-gray-400 text-center text-sm">
        <p>© 2025 Romingo Academy. Tüm hakları saklıdır.</p>
      </footer>
    </div>
  );
}
