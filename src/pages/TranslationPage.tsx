import { useEffect, useState } from "react";
import StatsBar from "../components/StatsBar";
import { ArrowRightLeft, Languages, Volume2 } from "lucide-react";
import type { TranslationDirection } from "../lib/translationDictionary";
import { translateWithYandex } from "../lib/yandexTranslate";

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
      const translatedValue = await translateWithYandex(trimmedInput, direction);
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

  const sourceLabel = direction === "tr-ro" ? "Türkçe" : "Rumence";
  const targetLabel = direction === "tr-ro" ? "Rumence" : "Türkçe";
  const targetLocale = direction === "tr-ro" ? "ro-RO" : "tr-TR";

  const speakText = (text: string, lang: string) => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) return;

    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = lang;
    utterance.rate = 0.95;
    utterance.pitch = 1;
    window.speechSynthesis.speak(utterance);
  };

  return (
    <div className="pb-20">
      <StatsBar />

      <div className="px-4 py-6 space-y-6 max-w-lg mx-auto">
        <div className="bg-card rounded-2xl p-4 shadow-card space-y-3">
          <h1 className="text-xl font-black text-foreground flex items-center gap-2">
            <Languages className="w-5 h-5 text-flamingo" />
            Çeviri
          </h1>

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
            <div className="flex items-center justify-between gap-2">
              <label className="text-xs font-bold text-muted-foreground uppercase tracking-wide">
                {targetLabel} Çeviri
              </label>
              <button
                type="button"
                onClick={() => speakText(translation, targetLocale)}
                disabled={!translation || isTranslating}
                aria-label="Çeviriyi sesli dinle"
                className="inline-flex items-center gap-1 rounded-lg bg-card px-2 py-1 text-xs font-bold text-muted-foreground hover:text-foreground hover:bg-background transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Volume2 className="w-3.5 h-3.5" />
                Dinle
              </button>
            </div>
            <div className="w-full min-h-24 rounded-xl border border-input bg-muted/40 px-3 py-2 text-sm font-semibold text-foreground">
              {isTranslating ? "Çevriliyor..." : translation || "Çeviriyi görmek için metin gir."}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
