import { ArrowLeft, ExternalLink, PlayCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

const romanianVideoLessons = [
  {
    id: "romanianpod101-alphabet",
    title: "Romence Alfabe ve Telaffuz",
    source: "RomanianPod101",
    embedUrl: "https://www.youtube-nocookie.com/embed/JnGCm_LOERU?rel=0",
    watchUrl: "https://www.youtube.com/watch?v=JnGCm_LOERU",
    subtitle: "A, Ă, Â, B, C... Romence harfleri öğrenin!",
  },
  {
    id: "romanianpod101-25-phrases",
    title: "Romence 25 Temel Cümle",
    source: "RomanianPod101",
    embedUrl: "https://www.youtube-nocookie.com/embed/0C3HOnuEqZ8?rel=0",
    watchUrl: "https://www.youtube.com/watch?v=0C3HOnuEqZ8",
    subtitle: "Bună ziua! Mă numesc... Vorbești engleză?",
  },
  {
    id: "romanianpod101-conversation",
    title: "Romence Konuşma Pratiği - Yeni Başlayanlar",
    source: "RomanianPod101",
    embedUrl: "https://www.youtube-nocookie.com/embed/sRZ_OsacDeQ?rel=0",
    watchUrl: "https://www.youtube.com/watch?v=sRZ_OsacDeQ",
    subtitle: "Ce faci? Bine, mulțumesc! Unde mergi?",
  },
  {
    id: "romanianpod101-100-words",
    title: "Romence En Çok Kullanılan 100 Kelime",
    source: "RomanianPod101",
    embedUrl: "https://www.youtube-nocookie.com/embed/MgGCgKOp1u8?rel=0",
    watchUrl: "https://www.youtube.com/watch?v=MgGCgKOp1u8",
    subtitle: "Da, nu, bine, rău, mare, mic... ve daha fazlası!",
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
            <h1 className="font-extrabold text-foreground text-lg">Kısa Konuşma Videoları</h1>
            <p className="text-xs text-muted-foreground font-semibold">
              Açılmayan videoları kaldırdık. Bu listedeki videolarda hem uygulama içi oynatma hem de YouTube'da açma seçeneği var.
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
                  <PlayCircle className="h-3.5 w-3.5" />
                  YouTube'da aç
                  <ExternalLink className="h-3.5 w-3.5" />
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
