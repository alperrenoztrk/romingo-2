import { ArrowLeft, ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";

const BLOG_BASE_URL = "https://www.romingoakademi.com";

const blogPosts = [
  {
    title: "Romence Nasıl Öğrenilir?",
    excerpt:
      "Romence nasıl öğrenilir? Bu soru, Romenceye ilgi duyan herkesin ilk sorduğu ve çoğu zaman yanlış yönlendirmeler nedeniyle sürecin uzamasına sebep olan önemli bir başlangıç noktasıdır.",
    href: "/blog/romence-nasil-ogrenilir/",
  },
  {
    title: "Online Romence Kursu",
    excerpt:
      "Online Romence kursu, zaman ve mekân kısıtlaması olmadan Romenceyi sistemli biçimde öğrenmek isteyenler için en etkili yöntemlerden biridir.",
    href: "/blog/online-romence-kursu/",
  },
  {
    title: "Romanya'da Çalışmak ve Eğitim İçin Romence",
    excerpt:
      "Romanya'da çalışmak ya da eğitim almak isteyenlerin en çok merak ettiği konulardan biri, Romence dil yeterliliğinin gerekip gerekmediğidir.",
    href: "/blog/romanyada-calismak-egitim-icin-romence/",
  },
  {
    title: "Romence B1 Sertifikası",
    excerpt:
      "Romence B1 sertifikası, Romenceyi yalnızca öğrendiğinizi değil, Avrupa standartlarında etkin biçimde kullanabildiğinizi resmî olarak kanıtlayan kritik bir belgedir.",
    href: "/blog/romence-b1-sertifikasi/",
  },
  {
    title: "Romence Dersleri",
    excerpt:
      "Romence dersleri, dili gerçekten kullanabilmek ve bunu resmî olarak belgelemek isteyenler için planlı ve hedef odaklı ilerlemesi gereken bir öğrenme sürecidir.",
    href: "/blog/romence-dersleri/",
  },
  {
    title: "Romence Öğrenmeye Başlamak",
    excerpt:
      "Romence öğrenmeye başlamak isteyenlerin en sık yaşadığı sorun, nereden başlayacağını ve nasıl ilerleyeceğini bilememektir.",
    href: "/blog/romence-ogrenmeye-baslamak/",
  },
  {
    title: "Soy Bağı",
    excerpt:
      "Soy bağı ile Romanya vatandaşlığı başvurularında geçerli B1 sertifikasının nasıl alınacağına dair en önemli adımları ve süreç detaylarını keşfedin.",
    href: "/blog/soy-bagi/",
  },
];

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-white text-gray-900 font-nunito">
      <header className="sticky top-0 z-20 border-b border-gray-100 bg-white/95 backdrop-blur">
        <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-4">
          <Link
            to="/"
            className="inline-flex items-center gap-2 rounded-full border border-gray-200 px-4 py-2 text-sm font-bold text-gray-700 transition-colors hover:bg-gray-50"
          >
            <ArrowLeft className="h-4 w-4" />
            Ana Sayfa
          </Link>

          <a
            href={`${BLOG_BASE_URL}/blog/`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-[#0A3FA0] px-4 py-2 text-sm font-bold text-white transition-colors hover:bg-[#083380]"
          >
            Kaynağa Git
            <ExternalLink className="h-4 w-4" />
          </a>
        </div>
      </header>

      <main className="mx-auto w-full max-w-6xl px-4 py-10">
        <div className="mb-10 text-center">
          <h1 className="mb-3 text-3xl font-black sm:text-4xl">
            Romingo Akademi, Kurslar, Eğitim Paketleri, Sınav Ve Kitaplar Hakkında Bilgiler
          </h1>
          <p className="mx-auto max-w-3xl text-base text-gray-500 sm:text-lg">
            Aşağıdaki başlıklardan merak ettiğiniz konular hakkında daha fazla bilgi edinebilirsiniz.
          </p>
        </div>

        <section className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {blogPosts.map((post) => (
            <article
              key={post.title}
              className="flex h-full flex-col rounded-2xl border border-gray-200 bg-white p-6 shadow-sm"
            >
              <h2 className="mb-3 text-xl font-extrabold text-gray-900">{post.title}</h2>
              <p className="mb-5 flex-1 text-sm leading-relaxed text-gray-600">{post.excerpt}</p>
              <a
                href={`${BLOG_BASE_URL}${post.href}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex w-fit items-center rounded-xl bg-[#0A3FA0] px-4 py-2 text-sm font-bold text-white transition-colors hover:bg-[#083380]"
              >
                Devamını Oku
              </a>
            </article>
          ))}
        </section>
      </main>
    </div>
  );
}
