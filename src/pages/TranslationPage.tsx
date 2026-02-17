import { useEffect, useState } from "react";
import StatsBar from "../components/StatsBar";
import { ArrowRightLeft, Languages } from "lucide-react";
import type { TranslationDirection } from "../lib/translationDictionary";
import { translateWithGoogle } from "../lib/googleTranslate";

export default function TranslationPage() {
  const [direction, setDirection] = useState<TranslationDirection>("tr-ro");
  const [input, setInput] = useState("");
  const [translation, setTranslation] = useState("");
  const [isTranslating, setIsTranslating] = useState(false);

  useEffect(() => {
    const trimmedInput = input.trim();

    if (!trimmedInput) {
      setTranslation("");
      setIsTranslating(false);
      return;
    }

    let isCancelled = false;
    setIsTranslating(true);

    const timeoutId = window.setTimeout(async () => {
      const translatedValue = await translateWithGoogle(trimmedInput, direction);
      if (!isCancelled) {
        setTranslation(translatedValue);
        setIsTranslating(false);
      }
    }, 250);

    return () => {
      isCancelled = true;
      window.clearTimeout(timeoutId);
    };
  }, [direction, input]);

  const sourceLabel = direction === "tr-ro" ? "Türkçe" : "Romence";
  const targetLabel = direction === "tr-ro" ? "Romence" : "Türkçe";

  return (
    <div className="pb-20">
      <StatsBar />

      <div className="px-4 py-6 space-y-6 max-w-lg mx-auto">
        <div className="bg-card rounded-2xl p-4 shadow-card space-y-3">
          <h1 className="text-xl font-black text-foreground flex items-center gap-2">
            <Languages className="w-5 h-5 text-flamingo" />
            Çeviri
          </h1>
          <p className="text-sm text-muted-foreground font-semibold">
            Türkçe ↔ Romence hızlı çeviri
          </p>

          <div className="flex items-center justify-between gap-3 bg-muted rounded-xl p-2">
            <span className="text-sm font-bold text-foreground">{sourceLabel}</span>
            <button
              type="button"
              onClick={() => setDirection((current) => (current === "tr-ro" ? "ro-tr" : "tr-ro"))}
              className="bg-card rounded-full p-2 shadow-card active:translate-y-0.5 transition-all"
              aria-label="Çeviri yönünü değiştir"
            >
              <ArrowRightLeft className="w-4 h-4 text-flamingo" />
            </button>
            <span className="text-sm font-bold text-foreground">{targetLabel}</span>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-muted-foreground uppercase tracking-wide">
              {sourceLabel} Metin
            </label>
            <textarea
              value={input}
              onChange={(event) => setInput(event.target.value)}
              rows={4}
              placeholder={`${sourceLabel} bir kelime veya kısa cümle yaz...`}
              className="w-full rounded-xl border border-input bg-background px-3 py-2 text-sm font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-muted-foreground uppercase tracking-wide">
              {targetLabel} Çeviri
            </label>
            <div className="w-full min-h-24 rounded-xl border border-input bg-muted/40 px-3 py-2 text-sm font-semibold text-foreground">
              {isTranslating ? "Çevriliyor..." : translation || "Çeviriyi görmek için metin gir."}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
