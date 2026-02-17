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
  onRetryWrongAnswers?: () => void;
}

export default function LessonComplete({
  lesson,
  correctCount,
  totalCount,
  stars,
  xpEarned,
  onContinue,
  onRetryWrongAnswers,
}: Props) {
  const percentage = Math.round((correctCount / totalCount) * 100);
  const comboBonus = useMemo(() => {
    if (correctCount === totalCount) {
      return 15;
    }

    if (stars >= 3) {
      return 8;
    }

    if (stars >= 2) {
      return 4;
    }

    return 0;
  }, [correctCount, stars, totalCount]);
  const tomorrowGoal = percentage >= 90 ? "Yarın hedef: 1 yeni ders + 1 tekrar turu" : "Yarın hedef: 1 tekrar dersi ile seriyi güçlendir";
  const totalXpReward = xpEarned;

  const [animatedXp, setAnimatedXp] = useState(0);

  useEffect(() => {
    let frame = 0;
    const timer = window.setInterval(() => {
      frame += 1;
      setAnimatedXp((prev) => {
        const step = Math.max(1, Math.ceil(totalXpReward / 18));
        const next = prev + step;
        return next >= totalXpReward ? totalXpReward : next;
      });

      if (frame > 20) {
        window.clearInterval(timer);
      }
    }, 45);

    return () => {
      window.clearInterval(timer);
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
              className={`w-12 h-12 transition-all ${
                s <= stars ? "text-gold animate-bounce-in" : "text-muted"
              }`}
              fill={s <= stars ? "hsl(var(--gold))" : "hsl(var(--muted))"}
              style={{ animationDelay: `${s * 0.15}s` }}
            />
          ))}
        </div>

        <div className="grid grid-cols-2 gap-3 mb-3 max-w-xs mx-auto">
          <div className="bg-card rounded-2xl p-4 shadow-card text-center">
            <div className="text-2xl font-black text-success">{percentage}%</div>
            <div className="text-xs font-bold text-muted-foreground">Doğruluk</div>
          </div>
          <div className="bg-card rounded-2xl p-4 shadow-card text-center">
            <div className="flex items-center justify-center gap-1">
              <Zap className="w-5 h-5 text-gold" fill="hsl(var(--gold))" />
              <span className="text-2xl font-black text-gold">+{animatedXp}</span>
            </div>
            <div className="text-xs font-bold text-muted-foreground">XP Kazandın</div>
          </div>
        </div>

        <div className="bg-gold/15 border border-gold/30 rounded-2xl p-3 mb-8 max-w-xs mx-auto">
          <div className="flex items-center justify-center gap-2 text-gold font-black text-sm mb-1">
            <Flame className="w-4 h-4" />
            Combo Bonus
          </div>
          <p className="text-xs font-bold text-foreground">+{comboBonus} XP · mükemmel seri bonusu</p>
        </div>

        <div className="bg-card rounded-2xl p-4 shadow-card mb-4 max-w-xs mx-auto">
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

        <div className="bg-sky-brand/10 border border-sky-brand/25 rounded-2xl p-3 mb-8 max-w-xs mx-auto text-left">
          <div className="flex items-center gap-2 text-sky-brand font-black text-xs uppercase tracking-wide mb-1">
            <Target className="w-4 h-4" />
            Yarın için mini hedef
          </div>
          <p className="text-sm font-semibold text-foreground">{tomorrowGoal}</p>
        </div>

        <div className="w-full max-w-xs space-y-3">
          {onRetryWrongAnswers && (
            <button
              onClick={onRetryWrongAnswers}
              className="w-full rounded-2xl py-3 font-extrabold text-sm border-2 border-border bg-card text-foreground active:translate-y-0.5 transition-all"
            >
              Yanlışları Tekrar Dene
            </button>
          )}
          <button
            onClick={onContinue}
            className="w-full gradient-success shadow-button-success rounded-2xl py-4 font-extrabold text-accent-foreground text-lg active:translate-y-1 active:shadow-none transition-all"
          >
            Devam Et
          </button>
        </div>
      </div>
    </div>
  );
}
