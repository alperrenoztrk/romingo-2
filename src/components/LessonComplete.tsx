import { useEffect, useMemo, useState } from "react";
import { Star, Zap, Flame, Target } from "lucide-react";
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
  const comboBonus = useMemo(() => {
    if (percentage >= 95) {
      return 20;
    }

    if (percentage >= 80) {
      return 10;
    }

    return 0;
  }, [percentage]);

  const totalXpReward = xpEarned + comboBonus;
  const [animatedXp, setAnimatedXp] = useState(0);

  useEffect(() => {
    let frame = 0;
    const totalFrames = 24;
    const interval = window.setInterval(() => {
      frame += 1;
      const progress = Math.min(frame / totalFrames, 1);
      setAnimatedXp(Math.round(totalXpReward * progress));

      if (progress >= 1) {
        window.clearInterval(interval);
      }
    }, 35);

    return () => {
      window.clearInterval(interval);
    };
  }, [totalXpReward]);

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center px-6">
      <div className="animate-bounce-in text-center">
        <div className="text-7xl mb-4 animate-float">🦩</div>

        <h1 className="text-2xl font-black text-foreground mb-2">
          {stars >= 3 ? "Mükemmel!" : stars >= 2 ? "Harika!" : stars >= 1 ? "İyi iş!" : "Tekrar dene!"}
        </h1>

        <p className="text-muted-foreground font-semibold mb-6">{lesson.title} dersini tamamladın</p>

        <div className="flex justify-center gap-2 mb-8">
          {[1, 2, 3].map((s) => (
            <Star
              key={s}
              className={`w-12 h-12 transition-all ${s <= stars ? "text-gold animate-bounce-in" : "text-muted"}`}
              fill={s <= stars ? "hsl(var(--gold))" : "hsl(var(--muted))"}
              style={{ animationDelay: `${s * 0.15}s` }}
            />
          ))}
        </div>

        <div className="grid grid-cols-2 gap-3 mb-4 max-w-xs mx-auto">
          <div className="bg-card rounded-2xl p-4 shadow-card text-center">
            <div className="text-2xl font-black text-success">{percentage}%</div>
            <div className="text-xs font-bold text-muted-foreground">Doğruluk</div>
          </div>
          <div className="bg-card rounded-2xl p-4 shadow-card text-center">
            <div className="flex items-center justify-center gap-1">
              <Zap className="w-5 h-5 text-gold" fill="hsl(var(--gold))" />
              <span className="text-2xl font-black text-gold">+{animatedXp}</span>
            </div>
            <div className="text-xs font-bold text-muted-foreground">Toplam XP</div>
          </div>
        </div>

        <div className="bg-card rounded-2xl p-4 shadow-card mb-4 max-w-xs mx-auto text-left space-y-2">
          <div className="flex justify-between items-center text-sm">
            <span className="font-bold text-muted-foreground">Ders XP</span>
            <span className="font-extrabold text-foreground">+{xpEarned}</span>
          </div>
          <div className="flex justify-between items-center text-sm">
            <span className="font-bold text-muted-foreground inline-flex items-center gap-1">
              <Flame className="w-4 h-4 text-flamingo" />
              Combo bonus
            </span>
            <span className="font-extrabold text-flamingo">+{comboBonus}</span>
          </div>
          <div className="h-2 bg-muted rounded-full overflow-hidden">
            <div
              className="h-full gradient-hero transition-all duration-700"
              style={{ width: `${Math.min((animatedXp / Math.max(totalXpReward, 1)) * 100, 100)}%` }}
            />
          </div>
        </div>

        <div className="bg-card rounded-2xl p-4 shadow-card mb-8 max-w-xs mx-auto text-left">
          <p className="text-xs uppercase tracking-wide text-muted-foreground font-bold mb-1 inline-flex items-center gap-1">
            <Target className="w-3.5 h-3.5" />
            Yarın mini hedef
          </p>
          <p className="font-extrabold text-foreground text-sm">1 ders + 30 XP ile serini koru.</p>
        </div>

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
