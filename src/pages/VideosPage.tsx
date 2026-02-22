import { ArrowLeft, ExternalLink } from "lucide-react";
import { useNavigate } from "react-router-dom";

const romanianVideoLessons = [
  {
    id: "romania-101",
    title: "Basit Selamlaşma Diyaloğu",
    source: "Learn Romanian with Nico",
    embedUrl: "https://www.youtube-nocookie.com/embed/6FrsA3M7h5Q?rel=0",
    watchUrl: "https://www.youtube.com/watch?v=6FrsA3M7h5Q",
    subtitle: "Merhaba! Nasılsın? İyiyim, teşekkür ederim. Sen nasılsın?",
  },
  {
    id: "romania-cafe",
    title: "Kafede Kısa Konuşma",
    source: "Easy Romanian",
    embedUrl: "https://www.youtube-nocookie.com/embed/X4dQv8NqM5s?rel=0",
    watchUrl: "https://www.youtube.com/watch?v=X4dQv8NqM5s",
    subtitle: "Bir kahve lütfen. Şeker ister misiniz? Hayır, teşekkürler.",
  },
] as const;

export default function VideosPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background pb-24">
      <div className="max-w-md mx-auto px-4 py-5 space-y-4">
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-2 rounded-xl border border-border bg-card px-3 py-2 text-xs font-extrabold text-foreground shadow-card transition-colors hover:bg-muted"
        >
          <ArrowLeft className="h-4 w-4" />
          Geri
        </button>

        <section className="space-y-3">
          <div>
            <h1 className="font-extrabold text-foreground text-lg">İnternetten Romence Konuşma Videoları</h1>
            <p className="text-xs text-muted-foreground font-semibold">
              Basit konuşma videolarını izle, alttaki Türkçe altyazıyla cümleleri tekrar et.
            </p>
          </div>

          <div className="space-y-4">
            {romanianVideoLessons.map((video) => (
              <article key={video.id} className="rounded-2xl bg-card p-3 shadow-card space-y-3">
                <div>
                  <h2 className="text-sm font-extrabold text-foreground">{video.title}</h2>
                  <p className="text-xs font-semibold text-muted-foreground">Kaynak: {video.source}</p>
                </div>

                <div className="overflow-hidden rounded-xl border border-border">
                  <iframe
                    className="aspect-video w-full"
                    src={video.embedUrl}
                    title={video.title}
                    loading="lazy"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerPolicy="strict-origin-when-cross-origin"
                    allowFullScreen
                  />
                </div>

                <a
                  href={video.watchUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-lg border border-border px-3 py-2 text-xs font-extrabold text-foreground transition-colors hover:bg-muted"
                >
                  <ExternalLink className="h-3.5 w-3.5" />
                  Video açılmazsa YouTube'da aç
                </a>

                <p className="rounded-lg bg-muted/60 px-3 py-2 text-xs font-semibold text-foreground">
                  Türkçe altyazı: {video.subtitle}
                </p>
              </article>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
