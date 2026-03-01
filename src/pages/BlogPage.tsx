import { ArrowLeft, ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";

const BLOG_URL = "https://www.romingoakademi.com/blog/";

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
            href={BLOG_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-[#0A3FA0] px-4 py-2 text-sm font-bold text-white transition-colors hover:bg-[#083380]"
          >
            Yeni Sekmede Aç
            <ExternalLink className="h-4 w-4" />
          </a>
        </div>
      </header>

      <main className="mx-auto w-full max-w-6xl px-4 py-6">
        <h1 className="mb-4 text-2xl font-black sm:text-3xl">Romingo Blog</h1>
        <div className="overflow-hidden rounded-2xl border border-gray-200 shadow-sm">
          <iframe
            src={BLOG_URL}
            title="Romingo Akademi Blog"
            className="h-[calc(100vh-170px)] min-h-[640px] w-full bg-white"
            loading="lazy"
          />
        </div>
      </main>
    </div>
  );
}
