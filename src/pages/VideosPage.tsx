import { ArrowLeft, Download, ExternalLink } from "lucide-react";
import { useNavigate } from "react-router-dom";

type TranscriptSegment = {
  second: number;
  text: string;
};

type VideoLesson = {
  id: string;
  title: string;
  source: string;
  embedUrl: string;
  watchUrl: string;
  subtitle: string;
  transcriptSegments: TranscriptSegment[];
};

const romanianVideoLessons: VideoLesson[] = [
  {
    id: "romania-101",
    title: "Basit Selamlaşma Diyaloğu",
    source: "Learn Romanian with Nico",
    embedUrl: "https://www.youtube-nocookie.com/embed/6FrsA3M7h5Q?rel=0",
    watchUrl: "https://www.youtube.com/watch?v=6FrsA3M7h5Q",
    subtitle: "Merhaba! Nasılsın? İyiyim, teşekkür ederim. Sen nasılsın?",
    transcriptSegments: [
      { second: 0, text: "Bună!" },
      { second: 2, text: "Ce mai faci?" },
      { second: 5, text: "Bine, mulțumesc." },
      { second: 8, text: "Tu ce mai faci?" },
      { second: 11, text: "Și eu sunt bine." },
    ],
  },
  {
    id: "romania-cafe",
    title: "Kafede Kısa Konuşma",
    source: "Easy Romanian",
    embedUrl: "https://www.youtube-nocookie.com/embed/X4dQv8NqM5s?rel=0",
    watchUrl: "https://www.youtube.com/watch?v=X4dQv8NqM5s",
    subtitle: "Bir kahve lütfen. Şeker ister misiniz? Hayır, teşekkürler.",
    transcriptSegments: [
      { second: 0, text: "Bună ziua!" },
      { second: 3, text: "O cafea, vă rog." },
      { second: 6, text: "Doriți zahăr?" },
      { second: 8, text: "Nu, mulțumesc." },
      { second: 11, text: "Poftă bună!" },
    ],
  },
];

const formatTimestamp = (second: number) => {
  const minutes = Math.floor(second / 60)
    .toString()
    .padStart(2, "0");
  const seconds = (second % 60).toString().padStart(2, "0");
  return `${minutes}:${seconds}`;
};

const downloadTranscript = (video: VideoLesson) => {
  const content = [
    `Video: ${video.title}`,
    `Kaynak: ${video.source}`,
    "",
    ...video.transcriptSegments.map((segment) => `[${formatTimestamp(segment.second)}] ${segment.text}`),
  ].join("\n");

  const blob = new Blob([content], { type: "text/plain;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = `${video.id}-saniyeli-transkript.txt`;
  document.body.appendChild(anchor);
  anchor.click();
  anchor.remove();
  URL.revokeObjectURL(url);
};

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
              Basit konuşma videolarını izle, alttaki Türkçe altyazıyla cümleleri tekrar et.
            </p>
          </div>

          <div className="rounded-2xl border border-border bg-card p-3 shadow-card space-y-2">
            <h2 className="text-sm font-extrabold text-foreground">AI Tools · AI Transcript</h2>
            <p className="text-xs font-semibold text-muted-foreground">
              Her video kartındaki “AI Transcript indir” butonuyla konuşmaları mm:ss formatında .txt olarak
              indirebilirsin.
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

                <div className="flex flex-wrap gap-2">
                  <a
                    href={video.watchUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center justify-center gap-2 rounded-lg border border-border px-3 py-2 text-xs font-extrabold text-foreground transition-colors hover:bg-muted"
                  >
                    <ExternalLink className="h-3.5 w-3.5" />
                    Video açılmazsa YouTube'da aç
                  </a>

                  <button
                    type="button"
                    onClick={() => downloadTranscript(video)}
                    className="inline-flex items-center justify-center gap-2 rounded-lg border border-border px-3 py-2 text-xs font-extrabold text-foreground transition-colors hover:bg-muted"
                  >
                    <Download className="h-3.5 w-3.5" />
                    AI Transcript indir
                  </button>
                </div>

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
