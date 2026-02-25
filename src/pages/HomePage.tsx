import { useEffect, useMemo, useState } from "react";
import mascotFlamingo from "@/assets/mascot-flamingo.png";
import { useNavigate } from "react-router-dom";
import { BookOpen, BookOpenText, Languages, Target, Star, Video, Trophy } from "lucide-react";
import { getCompletedLessonsCountForDate } from "../lib/lessonProgress";
import {
  getDailyGoalTargets,
  getTodayCorrectAnswers,
  getTodayXpProgress,
} from "../lib/dailyGoals";
import {
  learningEconomyUpdatedEvent,
} from "@/lib/learningEconomy";
import { getAdaptivePracticePlan, getExerciseTypeLabel } from "@/lib/adaptivePractice";
import { useAuthProfile } from "@/hooks/useAuthProfile";

export default function HomePage() {
  const navigate = useNavigate();
  const hour = new Date().getHours();
  const baseGreeting = hour < 12 ? "Günaydın" : hour < 18 ? "İyi günler" : "İyi akşamlar";
  const { profile: authProfile } = useAuthProfile();
  const displayName = authProfile?.fullName?.trim() || "Kullanıcı";
  const greeting = `${baseGreeting} ${displayName}`;
  const [flamingoRotation, setFlamingoRotation] = useState(0);
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
        title: "Sıradaki adım",
        label: "Sıradaki dersi tamamla",
        desc: "Serini korumak için kaldığın yerden devam et.",
        to: "/learn",
        gradient: "gradient-success",
        shadow: "shadow-button-success",
      };
    }

    if (!correctDone && topWeakType) {
      return {
        icon: Target,
        title: "Sıradaki adım",
        label: "Zayıf konunu tekrar et",
        desc: `Öneri: ${getExerciseTypeLabel(topWeakType.type)} pratiği yap.`,
        to: "/learn?view=tutorial&practice=adaptive",
        gradient: "gradient-sky",
        shadow: "shadow-button-sky",
      };
    }

    if (!xpDone) {
      return {
        icon: Star,
        title: "Sıradaki adım",
        label: "Hedef XP'yi tamamla",
        desc: `Kalan ${Math.max(dailyGoalTargets.xp - todayMetrics.xp, 0)} XP için kısa bir ders daha.`,
        to: "/learn",
        gradient: "gradient-hero",
        shadow: "shadow-button-primary",
      };
    }

    return {
      icon: Target,
      title: "Sıradaki adım",
      label: "Mini tekrar turu yap",
      desc: "Yarına hazırlanmak için 5 dakikalık pratik öneriyoruz.",
      to: "/learn?view=tutorial&practice=adaptive",
      gradient: "gradient-sky",
      shadow: "shadow-button-sky",
    };
  }, [dailyGoalTargets.correctAnswers, dailyGoalTargets.xp, practicePlan.weakTypes, todayMetrics.correctAnswers, todayMetrics.lessons, todayMetrics.xp]);

  return (
    <div className="pb-20">
      <div className="px-4 py-6 space-y-4 max-w-lg mx-auto">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setFlamingoRotation((currentRotation) => currentRotation + 360)}
            className="transition-transform duration-700 ease-out active:scale-95 w-36 h-36 flex-shrink-0"
            style={{ transform: `rotate(${flamingoRotation}deg)` }}
            aria-label="Flamingoyu döndür"
          >
            <img src={mascotFlamingo} alt="Romingo maskotu" className="w-full h-full object-contain drop-shadow-lg" />
          </button>
          <h1 className="text-2xl font-black text-foreground">{greeting}!</h1>
        </div>

        <button
          onClick={() => navigate(nextAction.to)}
          className={`${nextAction.gradient} ${nextAction.shadow} rounded-2xl p-5 text-left active:translate-y-1 active:shadow-none transition-all w-full`}
        >
          <div className="text-primary-foreground/80 text-xs font-extrabold uppercase tracking-wide mb-1">
            {nextAction.title}
          </div>
          <nextAction.icon className="w-8 h-8 text-primary-foreground mb-2" />
          <div className="text-primary-foreground font-extrabold text-base">{nextAction.label}</div>
          <div className="text-primary-foreground/80 text-xs font-semibold mt-1">{nextAction.desc}</div>
        </button>

        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={() => navigate("/learn?view=tutorial&practice=adaptive")}
            className="gradient-sky shadow-button-sky rounded-2xl p-4 text-left active:translate-y-1 active:shadow-none transition-all"
          >
            <Target className="w-8 h-8 text-primary-foreground mb-2" />
            <div className="text-primary-foreground font-extrabold text-sm">Pratik Yap</div>
          </button>

          <button
            onClick={() => navigate("/translate")}
            className="gradient-hero shadow-button-primary rounded-2xl p-4 text-left active:translate-y-1 active:shadow-none transition-all"
          >
            <Languages className="w-8 h-8 text-primary-foreground mb-2" />
            <div className="text-primary-foreground font-extrabold text-sm">Çeviri</div>
          </button>

          <button
            onClick={() => navigate("/kahoot")}
            className="rounded-2xl p-4 text-left active:translate-y-1 active:shadow-none transition-all w-full gradient-hero shadow-button-primary"
          >
            <Trophy className="w-8 h-8 text-primary-foreground mb-2" />
            <div className="text-primary-foreground font-extrabold text-sm">Kahoot Quiz</div>
          </button>

          <button
            onClick={() => navigate("/videos")}
            className="gradient-success shadow-button-success rounded-2xl p-4 text-left active:translate-y-1 active:shadow-none transition-all w-full"
          >
            <Video className="w-8 h-8 text-primary-foreground mb-2" />
            <div className="text-primary-foreground font-extrabold text-sm">Kısa Konuşma Videoları</div>
          </button>

          <button
            onClick={() => navigate("/grammar")}
            className="col-span-2 gradient-gold shadow-button-gold rounded-2xl p-4 text-left active:translate-y-1 active:shadow-none transition-all"
          >
            <BookOpenText className="w-8 h-8 text-primary-foreground mb-2" />
            <div className="text-primary-foreground font-extrabold text-sm">Dil Bilgisi</div>
            <div className="text-primary-foreground/80 text-xs font-semibold mt-1">Romence dil bilgisi konu anlatımı</div>
          </button>
        </div>
      </div>
    </div>
  );
}
