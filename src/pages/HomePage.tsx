import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import StatsBar from "../components/StatsBar";
import XPProgress from "../components/XPProgress";
import { BookOpen, Languages, Target, Star, TrendingUp } from "lucide-react";
import { getCurrentWeekProgress } from "../lib/weeklyProgress";

const quickActions = [
  {
    icon: BookOpen,
    label: "Ders Çalış",
    desc: "Kaldığın yerden devam et",
    gradient: "gradient-success",
    shadow: "shadow-button-success",
    to: "/learn",
  },
  {
    icon: Target,
    label: "Pratik Yap",
    desc: "Zayıf alanlarını güçlendir",
    gradient: "gradient-sky",
    shadow: "shadow-button-sky",
    to: "/learn?view=tutorial",
  },
];

const dailyGoals = [
  { label: "1 Ders Tamamla", done: true },
  { label: "10 Kelime Öğren", done: true },
  { label: "5 Dakika Pratik", done: false },
];

export default function HomePage() {
  const navigate = useNavigate();
  const hour = new Date().getHours();
  const greeting = hour < 12 ? "Günaydın" : hour < 18 ? "İyi günler" : "İyi akşamlar";
  const [weeklyProgress, setWeeklyProgress] = useState(getCurrentWeekProgress());

  useEffect(() => {
    const syncProgress = () => {
      setWeeklyProgress(getCurrentWeekProgress());
    };

    const interval = setInterval(syncProgress, 1000);
    window.addEventListener("storage", syncProgress);

    return () => {
      clearInterval(interval);
      window.removeEventListener("storage", syncProgress);
    };
  }, []);

  const maxProgress = Math.max(...weeklyProgress.map((item) => item.progress), 0);

  return (
    <div className="pb-20">
      <StatsBar streak={12} xp={1450} hearts={5} />

      <div className="px-4 py-6 space-y-6 max-w-lg mx-auto">
        {/* Greeting */}
        <div className="flex items-center gap-4">
          <div className="text-5xl animate-float">🦩</div>
          <div>
            <h1 className="text-2xl font-black text-foreground">{greeting}!</h1>
          </div>
        </div>

        {/* XP Progress */}
        <div className="bg-card rounded-2xl p-4 shadow-card">
          <XPProgress current={450} total={1000} level={5} />
        </div>

        {/* Daily Goals */}
        <div className="bg-card rounded-2xl p-4 shadow-card">
          <h2 className="font-extrabold text-foreground mb-3 flex items-center gap-2">
            <Star className="w-5 h-5 text-gold" fill="hsl(var(--gold))" />
            Günlük Hedefler
          </h2>
          <div className="space-y-2">
            {dailyGoals.map((goal, i) => (
              <div key={i} className="flex items-center gap-3">
                <div
                  className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                    goal.done
                      ? "bg-success text-accent-foreground"
                      : "bg-muted text-muted-foreground"
                  }`}
                >
                  {goal.done ? "✓" : ""}
                </div>
                <span
                  className={`font-semibold text-sm ${
                    goal.done ? "text-foreground line-through opacity-60" : "text-foreground"
                  }`}
                >
                  {goal.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-3">
          {quickActions.map((action, i) => (
            <button
              key={i}
              onClick={() => navigate(action.to)}
              className={`${action.gradient} ${action.shadow} rounded-2xl p-4 text-left active:translate-y-1 active:shadow-none transition-all`}
            >
              <action.icon className="w-8 h-8 text-primary-foreground mb-2" />
              <div className="text-primary-foreground font-extrabold text-sm">
                {action.label}
              </div>
              <div className="text-primary-foreground/80 text-xs font-semibold">
                {action.desc}
              </div>
            </button>
          ))}
        </div>

        <button
          onClick={() => navigate("/translate")}
          className="gradient-hero shadow-button-primary rounded-2xl p-4 text-left active:translate-y-1 active:shadow-none transition-all w-full"
        >
          <Languages className="w-8 h-8 text-primary-foreground mb-2" />
          <div className="text-primary-foreground font-extrabold text-sm">Çeviri</div>
          <div className="text-primary-foreground/80 text-xs font-semibold">
            Türkçe ↔ Romence anında çeviri yap
          </div>
        </button>

        {/* Streak Card */}
        <div className="bg-card rounded-2xl p-4 shadow-card">
          <div className="flex items-center gap-3 mb-3">
            <TrendingUp className="w-5 h-5 text-flamingo" />
            <div>
              <h2 className="font-extrabold text-foreground">Haftalık İlerleme</h2>
            </div>
          </div>
          <div className="flex items-end justify-between gap-1">
            {weeklyProgress.map((item, i) => {
              const isToday = i === (new Date().getDay() + 6) % 7;
              const hasProgress = item.progress > 0;
              const heightPercent = hasProgress
                ? maxProgress > 0
                  ? (item.progress / maxProgress) * 100
                  : 0
                : 0;

              return (
                <div key={item.day} className="flex flex-col items-center gap-1 flex-1">
                  <div className="w-full max-w-[32px] bg-muted rounded-lg overflow-hidden h-20 flex items-end">
                    {hasProgress && (
                      <div
                        className={`w-full rounded-lg transition-all ${isToday ? "gradient-hero" : "gradient-sky"}`}
                        style={{ height: `${heightPercent}%` }}
                      />
                    )}
                  </div>
                  <span className="text-[9px] font-bold text-foreground">{hasProgress ? `${item.progress} XP` : ""}</span>
                  <span
                    className={`text-[10px] font-bold ${
                      isToday ? "text-flamingo" : "text-muted-foreground"
                    }`}
                  >
                    {item.day}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
