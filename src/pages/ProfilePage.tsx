import { useEffect, useMemo, useState } from "react";
import StatsBar from "../components/StatsBar";
import XPProgress from "../components/XPProgress";
import { Flame, BookOpen, Star, Award, Settings, LogOut, Trophy, CheckCircle2, TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";
import { getStoredProfileSettings } from "@/lib/account";
import { getProfileProgressStory } from "@/lib/profileProgress";
import { getCurrentWeekProgress, getRecentWeeksProgress } from "@/lib/weeklyProgress";
import { getDailyGoalTargets, getCorrectAnswersForDate } from "@/lib/dailyGoals";
import { getCompletedLessonsCountForDate } from "@/lib/lessonProgress";

type ProfilePageProps = {
  isGuest?: boolean;
  onLogout?: () => void;
};

type TierLevel = "bronze" | "silver" | "gold";

type AchievementTrack = {
  id: string;
  icon: string;
  name: string;
  desc: string;
  metricValue: number;
  targets: Record<TierLevel, number>;
};

const ACHIEVEMENT_CLAIMS_KEY = "romingo.achievementClaims.v1";

const TIER_ORDER: TierLevel[] = ["bronze", "silver", "gold"];
const TIER_LABELS: Record<TierLevel, string> = {
  bronze: "Bronz",
  silver: "Gümüş",
  gold: "Altın",
};

function getClaimedState() {
  const raw = localStorage.getItem(ACHIEVEMENT_CLAIMS_KEY);
  if (!raw) {
    return {} as Record<string, TierLevel[]>;
  }

  try {
    const parsed = JSON.parse(raw) as Record<string, TierLevel[]>;
    return parsed && typeof parsed === "object" ? parsed : {};
  } catch {
    return {} as Record<string, TierLevel[]>;
  }
}

function getGoalCompletionRatio(current: number, target: number) {
  if (target <= 0) {
    return 1;
  }

  return Math.min(current / target, 1);
}

export default function ProfilePage({ isGuest = false, onLogout }: ProfilePageProps) {
  const profileSettings = getStoredProfileSettings();
  const profileName = profileSettings.fullName.trim() || "Alperren";
  const avatar = profileSettings.avatar.trim() || "🦩";
  const story = useMemo(() => getProfileProgressStory(), []);
  const [claimed, setClaimed] = useState<Record<string, TierLevel[]>>(() => getClaimedState());
  const [weeklyProgress, setWeeklyProgress] = useState(getCurrentWeekProgress());
  const [showRecentWeeks, setShowRecentWeeks] = useState(false);

  const achievementTracks: AchievementTrack[] = [
    {
      id: "streak",
      icon: "🔥",
      name: "Seri Ustası",
      desc: "En iyi serini büyüt",
      metricValue: story.bestStreak,
      targets: { bronze: 3, silver: 7, gold: 14 },
    },
    {
      id: "xp",
      icon: "⚡",
      name: "XP Toplayıcı",
      desc: "Bu hafta XP kazan",
      metricValue: story.thisWeekXp,
      targets: { bronze: 300, silver: 700, gold: 1200 },
    },
    {
      id: "units",
      icon: "📚",
      name: "Ünite Fatihi",
      desc: "Üniteleri bitir",
      metricValue: story.completedUnits,
      targets: { bronze: 1, silver: 3, gold: 5 },
    },
  ];

  const totalClaimedTiers = Object.values(claimed).reduce((sum, tiers) => sum + tiers.length, 0);

  useEffect(() => {
    const syncWeeklyProgress = () => {
      setWeeklyProgress(getCurrentWeekProgress());
    };

    const interval = setInterval(syncWeeklyProgress, 1000);
    window.addEventListener("storage", syncWeeklyProgress);

    return () => {
      clearInterval(interval);
      window.removeEventListener("storage", syncWeeklyProgress);
    };
  }, []);

  const dailyGoalTargets = getDailyGoalTargets();
  const weeklyProgressPercentages = useMemo(
    () =>
      weeklyProgress.map((item) => {
        const date = new Date(item.dateKey);
        const lessons = getCompletedLessonsCountForDate(date);
        const xp = item.progress;
        const correctAnswers = getCorrectAnswersForDate(date);

        const completionRatio =
          (getGoalCompletionRatio(lessons, dailyGoalTargets.lessons) +
            getGoalCompletionRatio(xp, dailyGoalTargets.xp) +
            getGoalCompletionRatio(correctAnswers, dailyGoalTargets.correctAnswers)) /
          3;

        return {
          ...item,
          completionPercent: Math.round(completionRatio * 100),
        };
      }),
    [dailyGoalTargets.correctAnswers, dailyGoalTargets.lessons, dailyGoalTargets.xp, weeklyProgress],
  );

  const recentWeeksProgress = useMemo(() => getRecentWeeksProgress(4), [weeklyProgress]);
  const topWeekProgress = Math.max(...recentWeeksProgress.map((week) => week.totalProgress), 1);

  const stats = [
    { icon: Flame, label: "En iyi seri", value: story.bestStreak.toString(), color: "text-gold" },
    { icon: BookOpen, label: "Ders", value: story.completedLessons.toString(), color: "text-sky-brand" },
    { icon: Star, label: "Bu hafta XP", value: story.thisWeekXp.toString(), color: "text-gold" },
    { icon: Award, label: "Claim", value: totalClaimedTiers.toString(), color: "text-flamingo" },
  ];

  const claimTier = (trackId: string, tier: TierLevel) => {
    const next = {
      ...claimed,
      [trackId]: Array.from(new Set([...(claimed[trackId] ?? []), tier])),
    };

    setClaimed(next);
    localStorage.setItem(ACHIEVEMENT_CLAIMS_KEY, JSON.stringify(next));
  };

  return (
    <div className="pb-20">
      <StatsBar />

      <div className="px-4 py-6 max-w-lg mx-auto space-y-6">
        <div className="text-center">
          <div className="w-24 h-24 mx-auto gradient-hero rounded-full flex items-center justify-center text-5xl mb-3 shadow-elevated">
            {avatar}
          </div>
          <h1 className="text-xl font-black text-foreground">{isGuest ? "Misafir" : profileName}</h1>
          <p className="text-muted-foreground text-sm font-semibold">Şubat 2026'dan beri öğreniyor</p>
        </div>

        <div className="grid grid-cols-4 gap-2">
          {stats.map((stat, i) => (
            <div key={i} className="bg-card rounded-2xl p-3 text-center shadow-card">
              <stat.icon className={`w-5 h-5 mx-auto mb-1 ${stat.color}`} />
              <div className="font-black text-lg text-foreground">{stat.value}</div>
              <div className="text-[10px] font-bold text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </div>

        <div className="bg-card rounded-2xl p-4 shadow-card">
          <XPProgress current={Math.min(story.thisWeekXp, 1200)} total={1200} level={5} />
        </div>

        <div className="bg-card rounded-2xl p-4 shadow-card">
          <h2 className="font-extrabold text-foreground mb-3 flex items-center gap-2">
            <Trophy className="w-5 h-5 text-gold" />
            İlerleme Hikâyen
          </h2>
          <div className="grid grid-cols-3 gap-2 mb-3 text-center">
            <div className="rounded-xl bg-muted/40 p-2">
              <p className="text-[10px] text-muted-foreground font-semibold">En iyi seri</p>
              <p className="text-sm font-black text-foreground">{story.bestStreak} gün</p>
            </div>
            <div className="rounded-xl bg-muted/40 p-2">
              <p className="text-[10px] text-muted-foreground font-semibold">Bu hafta XP</p>
              <p className="text-sm font-black text-foreground">{story.thisWeekXp}</p>
            </div>
            <div className="rounded-xl bg-muted/40 p-2">
              <p className="text-[10px] text-muted-foreground font-semibold">Tamamlanan ünite</p>
              <p className="text-sm font-black text-foreground">{story.completedUnits}</p>
            </div>
          </div>
          <div className="space-y-1">
            {story.xpSeries.map((day) => (
              <div key={day.dateKey} className="flex items-center gap-2">
                <span className="text-[10px] font-bold text-muted-foreground w-16">{day.dateKey.slice(5)}</span>
                <div className="h-2 rounded-full bg-sky-brand/20 flex-1 overflow-hidden">
                  <div className="h-full bg-sky-brand" style={{ width: `${Math.min(100, (day.xp / 220) * 100)}%` }} />
                </div>
                <span className="text-[10px] font-bold text-foreground w-10 text-right">{day.xp}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-card rounded-2xl p-4 shadow-card space-y-3">
          <h2 className="font-extrabold text-foreground flex items-center gap-2">
            <Award className="w-5 h-5 text-flamingo" />
            Kademeli Başarımlar
          </h2>

          {achievementTracks.map((track) => (
            <div key={track.id} className="rounded-xl border border-border p-3">
              <div className="flex items-center justify-between mb-2">
                <div>
                  <p className="text-sm font-black text-foreground">
                    {track.icon} {track.name}
                  </p>
                  <p className="text-[11px] font-semibold text-muted-foreground">{track.desc}</p>
                </div>
                <p className="text-xs font-black text-sky-brand">İlerleme: {track.metricValue}</p>
              </div>

              <div className="grid grid-cols-3 gap-2">
                {TIER_ORDER.map((tier) => {
                  const unlocked = track.metricValue >= track.targets[tier];
                  const isClaimed = (claimed[track.id] ?? []).includes(tier);

                  return (
                    <div key={tier} className={`rounded-lg p-2 text-center ${unlocked ? "bg-gold-light" : "bg-muted/40"}`}>
                      <p className="text-[10px] font-black text-foreground">{TIER_LABELS[tier]}</p>
                      <p className="text-[10px] text-muted-foreground">{track.targets[tier]}</p>
                      {isClaimed ? (
                        <p className="text-[10px] font-bold text-emerald-600 inline-flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3" /> Claimed
                        </p>
                      ) : unlocked ? (
                        <button
                          type="button"
                          className="text-[10px] font-black text-flamingo"
                          onClick={() => claimTier(track.id, tier)}
                        >
                          Claim
                        </button>
                      ) : (
                        <p className="text-[10px] font-bold text-muted-foreground">Kilitli</p>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        <button
          type="button"
          onClick={() => setShowRecentWeeks((currentValue) => !currentValue)}
          className="bg-card rounded-2xl p-4 shadow-card w-full text-left"
        >
          <div className="flex items-center gap-3 mb-3">
            <TrendingUp className="w-5 h-5 text-flamingo" />
            <div>
              <h2 className="font-extrabold text-foreground">Haftalık İlerleme</h2>
              <p className="text-xs font-semibold text-muted-foreground">Son 4 haftayı görmek için dokun</p>
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
          {showRecentWeeks && (
            <div className="mt-4 space-y-2 border-t border-border pt-3">
              {recentWeeksProgress.map((week, index) => {
                const widthPercent = Math.round((week.totalProgress / topWeekProgress) * 100);
                const weekTitle = `${index + 1} hafta önce`;

                return (
                  <div key={week.weekLabel} className="space-y-1">
                    <div className="flex items-center justify-between text-xs font-bold">
                      <span className="text-foreground">{weekTitle}</span>
                      <span className="text-muted-foreground">{week.totalProgress} XP</span>
                    </div>
                    <div className="h-2 rounded-full bg-muted overflow-hidden">
                      <div className="h-full gradient-sky rounded-full" style={{ width: `${widthPercent}%` }} />
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </button>

        <div className="space-y-2">
          <Link
            to="/settings"
            className="w-full bg-card rounded-2xl p-4 shadow-card flex items-center gap-3 hover:bg-muted transition-colors"
          >
            <Settings className="w-5 h-5 text-muted-foreground" />
            <span className="font-bold text-foreground text-sm">Ayarlar</span>
          </Link>
          <button
            type="button"
            onClick={onLogout}
            className="w-full bg-card rounded-2xl p-4 shadow-card flex items-center gap-3 hover:bg-muted transition-colors"
          >
            <LogOut className="w-5 h-5 text-destructive" />
            <span className="font-bold text-destructive text-sm">Çıkış Yap</span>
          </button>
        </div>
      </div>
    </div>
  );
}
