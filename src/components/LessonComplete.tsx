import { Star, Zap } from "lucide-react";
import type { LessonData } from "../data/lessons";

interface Props {
  lesson: LessonData;
  correctCount: number;
  totalCount: number;
  stars: number;
  xpEarned: number;
  onContinue: () => void;
}

export default function LessonComplete({
  lesson,
  correctCount,
  totalCount,
  stars,
  xpEarned,
  onContinue,
}: Props) {
  const percentage = Math.round((correctCount / totalCount) * 100);

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center px-6">
      <div className="animate-bounce-in text-center">
        {/* Mascot */}
        <div className="text-7xl mb-4 animate-float">🦩</div>

        <h1 className="text-2xl font-black text-foreground mb-2">
          {stars >= 3 ? "Mükemmel!" : stars >= 2 ? "Harika!" : stars >= 1 ? "İyi iş!" : "Tekrar dene!"}
        </h1>

        <p className="text-muted-foreground font-semibold mb-6">
          {lesson.title} dersini tamamladın
        </p>

        {/* Stars */}
        <div className="flex justify-center gap-2 mb-8">
          {[1, 2, 3].map((s) => (
            <Star
              key={s}
              className={`w-12 h-12 transition-all ${
                s <= stars ? "text-gold animate-bounce-in" : "text-muted"
              }`}
              fill={s <= stars ? "hsl(var(--gold))" : "hsl(var(--muted))"}
              style={{ animationDelay: `${s * 0.15}s` }}
            />
          ))}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-3 mb-8 max-w-xs mx-auto">
          <div className="bg-card rounded-2xl p-4 shadow-card text-center">
            <div className="text-2xl font-black text-success">{percentage}%</div>
            <div className="text-xs font-bold text-muted-foreground">Doğruluk</div>
          </div>
          <div className="bg-card rounded-2xl p-4 shadow-card text-center">
            <div className="flex items-center justify-center gap-1">
              <Zap className="w-5 h-5 text-gold" fill="hsl(var(--gold))" />
              <span className="text-2xl font-black text-gold">+{xpEarned}</span>
            </div>
            <div className="text-xs font-bold text-muted-foreground">XP Kazandın</div>
          </div>
        </div>

        {/* Score detail */}
        <div className="bg-card rounded-2xl p-4 shadow-card mb-8 max-w-xs mx-auto">
          <div className="flex justify-between mb-2">
            <span className="text-sm font-bold text-muted-foreground">Doğru</span>
            <span className="text-sm font-extrabold text-success">{correctCount}</span>
          </div>
          <div className="flex justify-between mb-2">
            <span className="text-sm font-bold text-muted-foreground">Yanlış</span>
            <span className="text-sm font-extrabold text-flamingo">{totalCount - correctCount}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm font-bold text-muted-foreground">Toplam</span>
            <span className="text-sm font-extrabold text-foreground">{totalCount}</span>
          </div>
        </div>

        {/* Continue Button */}
        <button
          onClick={onContinue}
          className="w-full max-w-xs gradient-success shadow-button-success rounded-2xl py-4 font-extrabold text-accent-foreground text-lg active:translate-y-1 active:shadow-none transition-all"
        >
          Devam Et
        </button>
      </div>
    </div>
  );
}
