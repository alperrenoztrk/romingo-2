import StatsBar from "../components/StatsBar";
import { ChevronRight, Globe, Bell, Moon, Shield, UserCircle } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { useState } from "react";

export default function SettingsPage() {
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [dailyReminder, setDailyReminder] = useState(true);

  return (
    <div className="pb-20">
      <StatsBar streak={12} xp={1450} hearts={5} />

      <div className="px-4 py-6 max-w-lg mx-auto space-y-6">
        <div>
          <h1 className="text-2xl font-black text-foreground">Ayarlar</h1>
          <p className="text-sm font-semibold text-muted-foreground mt-1">
            Hesabını ve uygulama tercihlerini buradan yönetebilirsin.
          </p>
        </div>

        <section className="bg-card rounded-2xl p-4 shadow-card space-y-3">
          <h2 className="font-extrabold text-foreground">Hesap</h2>

          <button className="w-full flex items-center justify-between p-3 rounded-xl bg-muted/40 hover:bg-muted transition-colors">
            <div className="flex items-center gap-3">
              <UserCircle className="w-5 h-5 text-sky-brand" />
              <div className="text-left">
                <div className="font-bold text-sm text-foreground">Profil Bilgileri</div>
                <div className="text-xs font-semibold text-muted-foreground">Ad, kullanıcı adı ve avatar</div>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-muted-foreground" />
          </button>

          <button className="w-full flex items-center justify-between p-3 rounded-xl bg-muted/40 hover:bg-muted transition-colors">
            <div className="flex items-center gap-3">
              <Shield className="w-5 h-5 text-success" />
              <div className="text-left">
                <div className="font-bold text-sm text-foreground">Gizlilik ve Güvenlik</div>
                <div className="text-xs font-semibold text-muted-foreground">Şifre ve hesap koruması</div>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-muted-foreground" />
          </button>
        </section>

        <section className="bg-card rounded-2xl p-4 shadow-card space-y-4">
          <h2 className="font-extrabold text-foreground">Tercihler</h2>

          <div className="flex items-center justify-between rounded-xl bg-muted/40 p-3">
            <div className="flex items-center gap-3">
              <Bell className="w-5 h-5 text-flamingo" />
              <div>
                <div className="font-bold text-sm text-foreground">Bildirimler</div>
                <div className="text-xs font-semibold text-muted-foreground">Ders ve seri bildirimlerini al</div>
              </div>
            </div>
            <Switch checked={notifications} onCheckedChange={setNotifications} />
          </div>

          <div className="flex items-center justify-between rounded-xl bg-muted/40 p-3">
            <div className="flex items-center gap-3">
              <Moon className="w-5 h-5 text-gold" />
              <div>
                <div className="font-bold text-sm text-foreground">Karanlık Mod</div>
                <div className="text-xs font-semibold text-muted-foreground">Gece çalışmaları için daha yumuşak tema</div>
              </div>
            </div>
            <Switch checked={darkMode} onCheckedChange={setDarkMode} />
          </div>

          <div className="flex items-center justify-between rounded-xl bg-muted/40 p-3">
            <div className="flex items-center gap-3">
              <Globe className="w-5 h-5 text-sky-brand" />
              <div>
                <div className="font-bold text-sm text-foreground">Günlük Hatırlatma</div>
                <div className="text-xs font-semibold text-muted-foreground">Her gün aynı saatte öğrenme hatırlatıcısı</div>
              </div>
            </div>
            <Switch checked={dailyReminder} onCheckedChange={setDailyReminder} />
          </div>
        </section>

        <button className="w-full rounded-2xl p-4 text-sm font-extrabold text-destructive bg-destructive/10 hover:bg-destructive/15 transition-colors">
          Hesabı Dondur
        </button>
      </div>
    </div>
  );
}
