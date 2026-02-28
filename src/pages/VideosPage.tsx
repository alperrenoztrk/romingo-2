import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

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
              Bu bölümdeki videolar kaldırıldı.
            </p>
          </div>

          <article className="rounded-2xl bg-card p-4 shadow-card">
            <p className="text-sm font-semibold text-muted-foreground">
              Şu anda gösterilecek video bulunmuyor.
            </p>
          </article>
        </section>
      </div>
    </div>
  );
}
