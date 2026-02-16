import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import StatsBar from "../components/StatsBar";
import XPProgress from "../components/XPProgress";
import { BookOpen, Languages, Target, Star, TrendingUp } from "lucide-react";

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
    to: "/learn",
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
  const [weeklyHeights, setWeeklyHeights] = useState([60, 80, 45, 90, 70, 30, 0]);
  const [updatedAt, setUpdatedAt] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setWeeklyHeights((prev) => {
        const todayIndex = (new Date().getDay() + 6) % 7;
        const next = [...prev];
        next[todayIndex] = Math.min(100, Number((next[todayIndex] + Math.random() * 2.5).toFixed(1)));
        return next;
      });
      setUpdatedAt(new Date());
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="pb-20">
      <StatsBar streak={12} xp={1450} hearts={5} />

      <div className="px-4 py-6 space-y-6 max-w-lg mx-auto">
        {/* Greeting */}
        <div className="flex items-center gap-4">
          <div className="text-5xl animate-float">🦩</div>
          <div>
            <h1 className="text-2xl font-black text-foreground">{greeting}!</h1>
            <p className="text-muted-foreground font-semibold text-sm">
              Bugün de harika bir gün öğrenmek için!
            </p>
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
              <p className="text-[10px] text-muted-foreground font-semibold">
                Canlı • {updatedAt.toLocaleTimeString("tr-TR")}
              </p>
            </div>
          </div>
          <div className="flex items-end justify-between gap-1">
            {["Pzt", "Sal", "Çar", "Per", "Cum", "Cmt", "Paz"].map((day, i) => {
              const isToday = i === (new Date().getDay() + 6) % 7;
              return (
                <div key={day} className="flex flex-col items-center gap-1 flex-1">
                  <div className="w-full max-w-[32px] bg-muted rounded-lg overflow-hidden h-20 flex items-end">
                    <div
                      className={`w-full rounded-lg transition-all ${
                        weeklyHeights[i] > 0
                          ? isToday
                            ? "gradient-hero"
                            : "gradient-sky"
                          : ""
                      }`}
                      style={{ height: `${weeklyHeights[i]}%` }}
                    />
                  </div>
                  <span
                    className={`text-[10px] font-bold ${
                      isToday ? "text-flamingo" : "text-muted-foreground"
                    }`}
                  >
                    {day}
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
