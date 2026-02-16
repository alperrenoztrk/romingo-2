import { useNavigate } from "react-router-dom";
import StatsBar from "../components/StatsBar";
import XPProgress from "../components/XPProgress";
import { Flame, BookOpen, Star, Award, Settings, LogOut } from "lucide-react";
import { useAuth } from "../context/AuthContext";

const achievements = [
  { icon: "🔥", name: "İlk Seri", desc: "3 gün üst üste çalış", unlocked: true },
  { icon: "📚", name: "Kitap Kurdu", desc: "10 ders tamamla", unlocked: true },
  { icon: "⭐", name: "Yıldız Toplayıcı", desc: "15 yıldız kazan", unlocked: true },
  { icon: "🏆", name: "Lig Şampiyonu", desc: "Bir ligde 1. ol", unlocked: false },
  { icon: "💎", name: "Elmas Avcısı", desc: "1000 elmas biriktir", unlocked: false },
  { icon: "🦩", name: "Flamingo Dostu", desc: "30 gün seri yap", unlocked: false },
];

const stats = [
  { icon: Flame, label: "Gün Serisi", value: "12", color: "text-gold" },
  { icon: BookOpen, label: "Ders", value: "24", color: "text-sky-brand" },
  { icon: Star, label: "Yıldız", value: "67", color: "text-gold" },
  { icon: Award, label: "Rozet", value: "3", color: "text-flamingo" },
];

export default function ProfilePage() {
  const navigate = useNavigate();
  const { userType, logout } = useAuth();

  return (
    <div className="pb-20">
      <StatsBar streak={12} xp={1450} hearts={5} />

      <div className="px-4 py-6 max-w-lg mx-auto space-y-6">
        {/* Avatar & Name */}
        <div className="text-center">
          <div className="w-24 h-24 mx-auto gradient-hero rounded-full flex items-center justify-center text-5xl mb-3 shadow-elevated">
            🦩
          </div>
          <h1 className="text-xl font-black text-foreground">{userType === "guest" ? "Misafir" : "Alperren"}</h1>
          <p className="text-muted-foreground text-sm font-semibold">
            Şubat 2026'dan beri öğreniyor
          </p>
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
          <div className="grid grid-cols-3 gap-3">
            {achievements.map((ach, i) => (
              <div
                key={i}
                className={`text-center p-3 rounded-xl transition-all ${
                  ach.unlocked
                    ? "bg-gold-light"
                    : "bg-muted opacity-50"
                }`}
              >
                <div className={`text-2xl mb-1 ${!ach.unlocked ? "grayscale" : ""}`}>
                  {ach.icon}
                </div>
                <div className="text-[10px] font-bold text-foreground">{ach.name}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="space-y-2">
          <button className="w-full bg-card rounded-2xl p-4 shadow-card flex items-center gap-3 hover:bg-muted transition-colors">
            <Settings className="w-5 h-5 text-muted-foreground" />
            <span className="font-bold text-foreground text-sm">Ayarlar</span>
          </button>
          <button
            onClick={() => {
              logout();
              navigate("/login", { replace: true });
            }}
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
