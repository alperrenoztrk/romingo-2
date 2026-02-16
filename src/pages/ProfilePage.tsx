import StatsBar from "../components/StatsBar";
import XPProgress from "../components/XPProgress";
import { Flame, BookOpen, Star, Award, Settings, LogOut } from "lucide-react";
import { Link } from "react-router-dom";
import { getStoredProfileSettings } from "@/lib/account";

type ProfilePageProps = {
  isGuest?: boolean;
  onLogout?: () => void;
};

type LearnerStats = {
  streakDays: number;
  lessonsCompleted: number;
  starsEarned: number;
  gemsCollected: number;
  bestLeagueRank: number;
};

type AchievementDefinition = {
  icon: string;
  name: string;
  desc: string;
  target: number;
  getCurrent: (stats: LearnerStats) => number;
};

const learnerStats: LearnerStats = {
  streakDays: 12,
  lessonsCompleted: 24,
  starsEarned: 67,
  gemsCollected: 720,
  bestLeagueRank: 2,
};

const achievementDefinitions: AchievementDefinition[] = [
  {
    icon: "🌱",
    name: "İlk Adım",
    desc: "İlk dersi tamamla",
    target: 1,
    getCurrent: (stats) => stats.lessonsCompleted,
  },
  {
    icon: "🔥",
    name: "İlk Seri",
    desc: "3 gün üst üste çalış",
    target: 3,
    getCurrent: (stats) => stats.streakDays,
  },
  {
    icon: "📅",
    name: "Haftalık Ritim",
    desc: "7 gün seri yap",
    target: 7,
    getCurrent: (stats) => stats.streakDays,
  },
  {
    icon: "⚡",
    name: "Enerji Patlaması",
    desc: "14 gün seri yap",
    target: 14,
    getCurrent: (stats) => stats.streakDays,
  },
  {
    icon: "📚",
    name: "Ders Maratoncusu",
    desc: "20 ders tamamla",
    target: 20,
    getCurrent: (stats) => stats.lessonsCompleted,
  },
  {
    icon: "🧠",
    name: "Bilgi Ustası",
    desc: "50 ders tamamla",
    target: 50,
    getCurrent: (stats) => stats.lessonsCompleted,
  },
  {
    icon: "📚",
    name: "Kitap Kurdu",
    desc: "10 ders tamamla",
    target: 10,
    getCurrent: (stats) => stats.lessonsCompleted,
  },
  {
    icon: "✨",
    name: "Parlayan Başlangıç",
    desc: "30 yıldız kazan",
    target: 30,
    getCurrent: (stats) => stats.starsEarned,
  },
  {
    icon: "🌟",
    name: "Süpernova",
    desc: "60 yıldız kazan",
    target: 60,
    getCurrent: (stats) => stats.starsEarned,
  },
  {
    icon: "⭐",
    name: "Yıldız Toplayıcı",
    desc: "15 yıldız kazan",
    target: 15,
    getCurrent: (stats) => stats.starsEarned,
  },
  {
    icon: "💰",
    name: "Tasarrufçu",
    desc: "500 elmas biriktir",
    target: 500,
    getCurrent: (stats) => stats.gemsCollected,
  },
  {
    icon: "🏆",
    name: "Lig Şampiyonu",
    desc: "Bir ligde 1. ol",
    target: 1,
    getCurrent: (stats) => (stats.bestLeagueRank === 1 ? 1 : 0),
  },
  {
    icon: "🥈",
    name: "Podyumcu",
    desc: "Ligde ilk 3'e gir",
    target: 1,
    getCurrent: (stats) => (stats.bestLeagueRank <= 3 ? 1 : 0),
  },
  {
    icon: "🚀",
    name: "Hızlı Yükseliş",
    desc: "Ligde ilk 5'e gir",
    target: 1,
    getCurrent: (stats) => (stats.bestLeagueRank <= 5 ? 1 : 0),
  },
  {
    icon: "💎",
    name: "Elmas Avcısı",
    desc: "1000 elmas biriktir",
    target: 1000,
    getCurrent: (stats) => stats.gemsCollected,
  },
  {
    icon: "🎯",
    name: "Keskin Nişancı",
    desc: "25 yıldız kazan",
    target: 25,
    getCurrent: (stats) => stats.starsEarned,
  },
  {
    icon: "🎓",
    name: "Akademi Mezunu",
    desc: "40 ders tamamla",
    target: 40,
    getCurrent: (stats) => stats.lessonsCompleted,
  },
  {
    icon: "🦩",
    name: "Flamingo Dostu",
    desc: "30 gün seri yap",
    target: 30,
    getCurrent: (stats) => stats.streakDays,
  },
];

const achievements = achievementDefinitions.map((achievement) => {
  const current = achievement.getCurrent(learnerStats);
  const unlocked = current >= achievement.target;

  return {
    ...achievement,
    current,
    unlocked,
    progressLabel: unlocked ? "Tamamlandı" : `${Math.min(current, achievement.target)}/${achievement.target}`,
  };
});

const unlockedAchievements = achievements.filter((achievement) => achievement.unlocked);
const unlockedAchievementsCount = unlockedAchievements.length;

const stats = [
  { icon: Flame, label: "Gün Serisi", value: learnerStats.streakDays.toString(), color: "text-gold" },
  { icon: BookOpen, label: "Ders", value: learnerStats.lessonsCompleted.toString(), color: "text-sky-brand" },
  { icon: Star, label: "Yıldız", value: learnerStats.starsEarned.toString(), color: "text-gold" },
  { icon: Award, label: "Rozet", value: unlockedAchievementsCount.toString(), color: "text-flamingo" },
];

export default function ProfilePage({ isGuest = false, onLogout }: ProfilePageProps) {
  const profileSettings = getStoredProfileSettings();
  const profileName = profileSettings.fullName.trim() || "Alperren";
  const avatar = profileSettings.avatar.trim() || "🦩";

  return (
    <div className="pb-20">
      <StatsBar streak={learnerStats.streakDays} xp={1450} hearts={5} />

      <div className="px-4 py-6 max-w-lg mx-auto space-y-6">
        {/* Avatar & Name */}
        <div className="text-center">
          <div className="w-24 h-24 mx-auto gradient-hero rounded-full flex items-center justify-center text-5xl mb-3 shadow-elevated">
            {avatar}
          </div>
          <h1 className="text-xl font-black text-foreground">{isGuest ? "Misafir" : profileName}</h1>
          <p className="text-muted-foreground text-sm font-semibold">Şubat 2026'dan beri öğreniyor</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-4 gap-2">
          {stats.map((stat, i) => (
            <div key={i} className="bg-card rounded-2xl p-3 text-center shadow-card">
              <stat.icon className={`w-5 h-5 mx-auto mb-1 ${stat.color}`} />
              <div className="font-black text-lg text-foreground">{stat.value}</div>
              <div className="text-[10px] font-bold text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* XP Progress */}
        <div className="bg-card rounded-2xl p-4 shadow-card">
          <XPProgress current={450} total={1000} level={5} />
        </div>

        {/* Achievements */}
        <div className="bg-card rounded-2xl p-4 shadow-card">
          <h2 className="font-extrabold text-foreground mb-4 flex items-center gap-2">
            <Award className="w-5 h-5 text-flamingo" />
            Rozetler
          </h2>
          {unlockedAchievements.length > 0 ? (
            <div className="grid grid-cols-3 gap-3">
              {unlockedAchievements.map((ach, i) => (
                <div key={i} className="text-center p-3 rounded-xl transition-all bg-gold-light">
                  <div className="text-2xl mb-1">{ach.icon}</div>
                  <div className="text-[10px] font-bold text-foreground">{ach.name}</div>
                  <div className="text-[9px] text-muted-foreground mt-0.5">{ach.desc}</div>
                  <div className="text-[9px] text-muted-foreground font-semibold mt-0.5">{ach.progressLabel}</div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-muted-foreground font-semibold">Henüz kazanılmış rozet yok.</p>
          )}
        </div>

        {/* Actions */}
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
