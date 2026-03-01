import { useEffect, useMemo, useState } from "react";
import { ArrowLeft, ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";

const BLOG_BASE_URL = "https://www.romingoakademi.com";
const BLOG_POSTS_ENDPOINT = `${BLOG_BASE_URL}/wp-json/wp/v2/posts?_embed&per_page=30&page=1`;

type BlogPost = {
  title: string;
  excerpt: string;
  href: string;
};

type WordPressPost = {
  title?: { rendered?: string };
  excerpt?: { rendered?: string };
  link?: string;
};

const fallbackBlogPosts: BlogPost[] = [
  {
    title: "Rumence Nasıl Öğrenilir?",
    excerpt:
      "Rumence nasıl öğrenilir? Bu soru, Rumenceye ilgi duyan herkesin ilk sorduğu ve çoğu zaman yanlış yönlendirmeler nedeniyle sürecin uzamasına sebep olan önemli bir başlangıç noktasıdır.",
    href: "/blog/romence-nasil-ogrenilir/",
  },
  {
    title: "Online Rumence Kursu",
    excerpt:
      "Online Rumence kursu, zaman ve mekân kısıtlaması olmadan Rumenceyi sistemli biçimde öğrenmek isteyenler için en etkili yöntemlerden biridir.",
    href: "/blog/online-romence-kursu/",
  },
  {
    title: "Romanya'da Çalışmak ve Eğitim İçin Rumence",
    excerpt:
      "Romanya'da çalışmak ya da eğitim almak isteyenlerin en çok merak ettiği konulardan biri, Rumence dil yeterliliğinin gerekip gerekmediğidir.",
    href: "/blog/romanyada-calismak-egitim-icin-romence/",
  },
  {
    title: "Rumence B1 Sertifikası",
    excerpt:
      "Rumence B1 sertifikası, Rumenceyi yalnızca öğrendiğinizi değil, Avrupa standartlarında etkin biçimde kullanabildiğinizi resmî olarak kanıtlayan kritik bir belgedir.",
    href: "/blog/romence-b1-sertifikasi/",
  },
  {
    title: "Rumence Dersleri",
    excerpt:
      "Rumence dersleri, dili gerçekten kullanabilmek ve bunu resmî olarak belgelemek isteyenler için planlı ve hedef odaklı ilerlemesi gereken bir öğrenme sürecidir.",
    href: "/blog/romence-dersleri/",
  },
  {
    title: "Rumence Öğrenmeye Başlamak",
    excerpt:
      "Rumence öğrenmeye başlamak isteyenlerin en sık yaşadığı sorun, nereden başlayacağını ve nasıl ilerleyeceğini bilememektir.",
    href: "/blog/romence-ogrenmeye-baslamak/",
  },
  {
    title: "Soy Bağı",
    excerpt:
      "Soy bağı ile Romanya vatandaşlığı başvurularında geçerli B1 sertifikasının nasıl alınacağına dair en önemli adımları ve süreç detaylarını keşfedin.",
    href: "/blog/soy-bagi/",
  },
];

function stripHtml(html: string) {
  if (!html) return "";

  if (typeof window !== "undefined") {
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, "text/html");
    return doc.body.textContent?.replace(/\s+/g, " ").trim() ?? "";
  }

  return html.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
}

export default function BlogPage() {
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>(fallbackBlogPosts);

  useEffect(() => {
    const controller = new AbortController();

    const loadPosts = async () => {
      try {
        const response = await fetch(BLOG_POSTS_ENDPOINT, { signal: controller.signal });
        if (!response.ok) {
          return;
        }

        const posts = (await response.json()) as WordPressPost[];
        const parsedPosts = posts
          .map((post) => {
            const title = stripHtml(post.title?.rendered ?? "");
            const excerpt = stripHtml(post.excerpt?.rendered ?? "");
            const href = post.link ?? "";

            if (!title || !href) {
              return null;
            }

            return {
              title,
              excerpt,
              href,
            };
          })
          .filter((post): post is BlogPost => Boolean(post));

        if (parsedPosts.length > 0) {
          setBlogPosts(parsedPosts);
        }
      } catch {
        // fallbackBlogPosts will be shown when request fails
      }
    };

    void loadPosts();

    return () => controller.abort();
  }, []);

  const renderedPosts = useMemo(() => blogPosts, [blogPosts]);

  return (
    <div className="min-h-screen bg-white font-nunito text-gray-900">
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
          {renderedPosts.map((post) => (
            <article
              key={post.href}
              className="flex h-full flex-col rounded-2xl border border-gray-200 bg-white p-6 shadow-sm"
            >
              <h2 className="mb-3 text-xl font-extrabold text-gray-900">{post.title}</h2>
              <p className="mb-5 flex-1 text-sm leading-relaxed text-gray-600">{post.excerpt}</p>
              <a
                href={post.href.startsWith("http") ? post.href : `${BLOG_BASE_URL}${post.href}`}
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
