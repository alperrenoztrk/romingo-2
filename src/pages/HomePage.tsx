import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BookOpen, BookOpenText, ChevronRight, Languages, Star, Target, Trophy, Video } from "lucide-react";
import { getStoredProfileSettings } from "../lib/account";
import { getCompletedLessonsCountForDate } from "../lib/lessonProgress";
import {
  getDailyGoalTargets,
  getTodayCorrectAnswers,
  getTodayXpProgress,
} from "../lib/dailyGoals";
import { learningEconomyUpdatedEvent } from "@/lib/learningEconomy";
import { getAdaptivePracticePlan, getExerciseTypeLabel } from "@/lib/adaptivePractice";

export default function HomePage() {
  const navigate = useNavigate();
  const hour = new Date().getHours();
  const baseGreeting = hour < 12 ? "Günaydın" : hour < 18 ? "İyi günler" : "İyi akşamlar";
  const profileSettings = getStoredProfileSettings();
  const displayName = profileSettings.username.replace(/^@/, "").trim() || profileSettings.fullName;
  const greeting = `${baseGreeting} ${displayName}`;
  const [todayMetrics, setTodayMetrics] = useState({
    lessons: getCompletedLessonsCountForDate(),
    xp: getTodayXpProgress(),
    correctAnswers: getTodayCorrectAnswers(),
  });

  useEffect(() => {
    const syncProgress = () => {
      setTodayMetrics({
        lessons: getCompletedLessonsCountForDate(),
        xp: getTodayXpProgress(),
        correctAnswers: getTodayCorrectAnswers(),
      });
    };

    const interval = setInterval(syncProgress, 1000);
    window.addEventListener("storage", syncProgress);
    window.addEventListener("romingo:daily-goals-updated", syncProgress);
    window.addEventListener(learningEconomyUpdatedEvent, syncProgress);

    return () => {
      clearInterval(interval);
      window.removeEventListener("storage", syncProgress);
      window.removeEventListener("romingo:daily-goals-updated", syncProgress);
      window.removeEventListener(learningEconomyUpdatedEvent, syncProgress);
    };
  }, []);

  const practicePlan = useMemo(() => getAdaptivePracticePlan(), [todayMetrics.correctAnswers]);
  const dailyGoalTargets = getDailyGoalTargets();

  const nextAction = useMemo(() => {
    const lessonsDone = todayMetrics.lessons >= 1;
    const xpDone = todayMetrics.xp >= dailyGoalTargets.xp;
    const correctDone = todayMetrics.correctAnswers >= dailyGoalTargets.correctAnswers;
    const topWeakType = practicePlan.weakTypes[0];

    if (!lessonsDone) {
      return {
        icon: BookOpen,
        title: "Bugün ne yapmalıyım?",
        label: "Sıradaki dersi tamamla",
        desc: "Serini korumak için kaldığın yerden devam et.",
        to: "/learn",
      };
    }

    if (!correctDone && topWeakType) {
      return {
        icon: Target,
        title: "Bugün ne yapmalıyım?",
        label: "Zayıf konunu tekrar et",
        desc: `Öneri: ${getExerciseTypeLabel(topWeakType.type)} pratiği yap.`,
        to: "/learn?view=tutorial&practice=adaptive",
      };
    }

    if (!xpDone) {
      return {
        icon: Star,
        title: "Bugün ne yapmalıyım?",
        label: "Hedef XP'yi tamamla",
        desc: `Kalan ${Math.max(dailyGoalTargets.xp - todayMetrics.xp, 0)} XP için kısa bir ders daha.`,
        to: "/learn",
      };
    }

    return {
      icon: Target,
      title: "Bugün ne yapmalıyım?",
      label: "Mini tekrar turu yap",
      desc: "Yarına hazırlanmak için 5 dakikalık pratik öneriyoruz.",
      to: "/learn?view=tutorial&practice=adaptive",
    };
  }, [dailyGoalTargets.correctAnswers, dailyGoalTargets.xp, practicePlan.weakTypes, todayMetrics.correctAnswers, todayMetrics.lessons, todayMetrics.xp]);

  return (
    <div className="pb-20">
      <div className="mx-auto max-w-lg space-y-5 px-4 py-6">
        <div className="space-y-1">
          <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Ana Sayfa</p>
          <h1 className="text-2xl font-bold text-foreground">{greeting}!</h1>
          <p className="text-sm text-muted-foreground">Bugün için önerilen tek adımdan başla.</p>
        </div>

        <button
          onClick={() => navigate(nextAction.to)}
          className="w-full rounded-2xl border border-border/70 bg-card p-5 text-left shadow-sm transition-all active:translate-y-0.5"
        >
          <div className="mb-2 text-xs font-bold uppercase tracking-wide text-muted-foreground">
            {nextAction.title}
          </div>
          <div className="flex items-start justify-between gap-3">
            <div>
              <nextAction.icon className="mb-2 h-6 w-6 text-primary" />
              <div className="text-base font-bold text-card-foreground">{nextAction.label}</div>
              <div className="mt-1 text-sm text-muted-foreground">{nextAction.desc}</div>
            </div>
            <ChevronRight className="mt-0.5 h-5 w-5 text-muted-foreground" />
          </div>
        </button>

        <div className="space-y-2">
          <h2 className="text-sm font-semibold text-foreground">Hızlı Erişim</h2>
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => navigate("/learn?view=tutorial&practice=adaptive")}
              className="rounded-xl border border-border/70 bg-card p-4 text-left transition-all hover:border-primary/30 active:translate-y-0.5"
            >
              <Target className="mb-2 h-5 w-5 text-primary" />
              <div className="text-sm font-semibold text-card-foreground">Pratik Yap</div>
            </button>

            <button
              onClick={() => navigate("/translate")}
              className="rounded-xl border border-border/70 bg-card p-4 text-left transition-all hover:border-primary/30 active:translate-y-0.5"
            >
              <Languages className="mb-2 h-5 w-5 text-primary" />
              <div className="text-sm font-semibold text-card-foreground">Çeviri</div>
            </button>
          </div>
        </div>

        <div className="space-y-2">
          <h2 className="text-sm font-semibold text-foreground">Keşfet</h2>
          <div className="space-y-3">
            <button
              onClick={() => navigate("/grammar")}
              className="w-full rounded-xl border border-border/70 bg-card p-4 text-left transition-all hover:border-primary/30 active:translate-y-0.5"
            >
              <BookOpenText className="mb-2 h-5 w-5 text-primary" />
              <div className="text-sm font-semibold text-card-foreground">Dil Bilgisi</div>
              <div className="mt-1 text-xs text-muted-foreground">Romence dil bilgisi konu anlatımı</div>
            </button>

            <button
              onClick={() => navigate("/kahoot")}
              className="w-full rounded-xl border border-border/70 bg-card p-4 text-left transition-all hover:border-primary/30 active:translate-y-0.5"
            >
              <Trophy className="mb-2 h-5 w-5 text-primary" />
              <div className="text-sm font-semibold text-card-foreground">Kahoot Quiz</div>
              <div className="mt-1 text-xs text-muted-foreground">Canlı yarışma gibi hızlı quiz turu</div>
            </button>

            <button
              onClick={() => navigate("/videos")}
              className="w-full rounded-xl border border-border/70 bg-card p-4 text-left transition-all hover:border-primary/30 active:translate-y-0.5"
            >
              <Video className="mb-2 h-5 w-5 text-primary" />
              <div className="text-sm font-semibold text-card-foreground">Kısa Konuşma Videoları</div>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-2 rounded-xl border border-border/70 bg-muted/40 p-3 text-center">
          <button
            onClick={() => navigate("/learn")}
            className="rounded-lg bg-background px-2 py-2"
          >
            <p className="text-lg font-bold text-foreground">{todayMetrics.lessons}</p>
            <p className="text-[11px] text-muted-foreground">Ders</p>
          </button>
          <button
            onClick={() => navigate("/learn")}
            className="rounded-lg bg-background px-2 py-2"
          >
            <p className="text-lg font-bold text-foreground">{todayMetrics.xp}</p>
            <p className="text-[11px] text-muted-foreground">XP</p>
          </button>
          <button
            onClick={() => navigate("/learn?view=tutorial&practice=adaptive")}
            className="rounded-lg bg-background px-2 py-2"
          >
            <p className="text-lg font-bold text-foreground">{todayMetrics.correctAnswers}</p>
            <p className="text-[11px] text-muted-foreground">Doğru</p>
          </button>
        </div>
      </div>
    </div>
  );
}
