import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import StatsBar from "../components/StatsBar";
import XPProgress from "../components/XPProgress";
import { BookOpen, Languages, Target, Star, TrendingUp } from "lucide-react";
import { getCurrentWeekProgress } from "../lib/weeklyProgress";
import { getStoredProfileSettings } from "../lib/account";
import { getCompletedLessonsCountForDate } from "../lib/lessonProgress";
import {
  getCorrectAnswersForDate,
  getDailyGoalTargets,
  getTodayCorrectAnswers,
  getTodayXpProgress,
} from "../lib/dailyGoals";

const GOAL_DEFINITIONS = [
  {
    metricKey: "lessons",
    label: "Ders Tamamla",
    target: 1,
  },
  {
    metricKey: "xp",
    label: "XP Kazan",
    target: 120,
  },
  {
    metricKey: "correctAnswers",
    label: "Doğru Cevap Ver",
    target: 10,
  },
] as const;

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

const TOTAL_XP = 1450;
const XP_PER_LEVEL = 1000;

export default function HomePage() {
  const navigate = useNavigate();
  const hour = new Date().getHours();
  const baseGreeting = hour < 12 ? "Günaydın" : hour < 18 ? "İyi günler" : "İyi akşamlar";
  const profileSettings = getStoredProfileSettings();
  const displayName = profileSettings.username.replace(/^@/, "").trim() || profileSettings.fullName;
  const greeting = `${baseGreeting} ${displayName}`;
  const [weeklyProgress, setWeeklyProgress] = useState(getCurrentWeekProgress());
  const [todayMetrics, setTodayMetrics] = useState({
    lessons: getCompletedLessonsCountForDate(),
    xp: getTodayXpProgress(),
    correctAnswers: getTodayCorrectAnswers(),
  });

  useEffect(() => {
    const syncProgress = () => {
      setWeeklyProgress(getCurrentWeekProgress());
      setTodayMetrics({
        lessons: getCompletedLessonsCountForDate(),
        xp: getTodayXpProgress(),
        correctAnswers: getTodayCorrectAnswers(),
      });
    };

    const interval = setInterval(syncProgress, 1000);
    window.addEventListener("storage", syncProgress);
    window.addEventListener("romingo:daily-goals-updated", syncProgress);

    return () => {
      clearInterval(interval);
      window.removeEventListener("storage", syncProgress);
      window.removeEventListener("romingo:daily-goals-updated", syncProgress);
    };
  }, []);

  const dailyGoalTargets = getDailyGoalTargets();

  const dailyGoals = useMemo(
    () =>
      GOAL_DEFINITIONS.map((goal) => ({
        id: goal.metricKey,
        label: goal.label,
        target: dailyGoalTargets[goal.metricKey],
        current: todayMetrics[goal.metricKey],
      })),
    [dailyGoalTargets, todayMetrics],
  );

  const weeklyProgressPercentages = useMemo(
    () =>
      weeklyProgress.map((item) => {
        const date = new Date(item.dateKey);
        const lessons = getCompletedLessonsCountForDate(date);
        const xp = item.progress;
        const correctAnswers = getCorrectAnswersForDate(date);

        const completionRatio =
          (Math.min(lessons / dailyGoalTargets.lessons, 1) +
            Math.min(xp / dailyGoalTargets.xp, 1) +
            Math.min(correctAnswers / dailyGoalTargets.correctAnswers, 1)) /
          3;

        return {
          ...item,
          completionPercent: Math.round(completionRatio * 100),
        };
      }),
    [dailyGoalTargets.correctAnswers, dailyGoalTargets.lessons, dailyGoalTargets.xp, weeklyProgress],
  );

  const currentLevel = Math.floor(TOTAL_XP / XP_PER_LEVEL) + 1;
  const currentLevelXp = TOTAL_XP % XP_PER_LEVEL;

  return (
    <div className="pb-20">
      <StatsBar streak={12} xp={TOTAL_XP} hearts={5} />

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
          <XPProgress current={currentLevelXp} total={XP_PER_LEVEL} level={currentLevel} />
        </div>

        {/* Daily Goals */}
        <div className="bg-card rounded-2xl p-4 shadow-card">
          <h2 className="font-extrabold text-foreground mb-3 flex items-center gap-2">
            <Star className="w-5 h-5 text-gold" fill="hsl(var(--gold))" />
            Günlük Hedefler
          </h2>
          <div className="space-y-3">
            {dailyGoals.map((goal) => {
              const done = goal.current >= goal.target;

              return (
                <div key={goal.id} className="flex items-center gap-3 justify-between">
                  <div className="flex items-center gap-3 min-w-0">
                    <div
                      className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                        done
                          ? "bg-success text-accent-foreground"
                          : "bg-muted text-muted-foreground"
                      }`}
                    >
                      {done ? "✓" : ""}
                    </div>
                    <div className="min-w-0">
                      <span
                        className={`font-semibold text-sm ${
                          done ? "text-foreground line-through opacity-60" : "text-foreground"
                        }`}
                      >
                        {goal.label}
                      </span>
                      <p className="text-xs text-muted-foreground font-semibold">
                        {goal.current}/{goal.target}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
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
            {weeklyProgressPercentages.map((item, i) => {
              const isToday = i === (new Date().getDay() + 6) % 7;
              const hasProgress = item.completionPercent > 0;

              return (
                <div key={item.day} className="flex flex-col items-center gap-1 flex-1">
                  <div className="w-full max-w-[32px] bg-muted rounded-lg overflow-hidden h-20 flex items-end">
                    {hasProgress && (
                      <div
                        className={`w-full rounded-lg transition-all ${isToday ? "gradient-hero" : "gradient-sky"}`}
                        style={{ height: `${item.completionPercent}%` }}
                      />
                    )}
                  </div>
                  <span className="text-[9px] font-bold text-foreground">
                    {hasProgress ? `%${item.completionPercent}` : ""}
                  </span>
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
