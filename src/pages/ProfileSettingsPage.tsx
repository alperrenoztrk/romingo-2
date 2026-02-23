import StatsBar from "../components/StatsBar";
import { ArrowLeft, Save, UserCircle } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { getStoredProfileSettings, saveProfileSettings } from "@/lib/account";

export default function ProfileSettingsPage() {
  const { toast } = useToast();
  const [profile, setProfile] = useState(getStoredProfileSettings);

  const handleSave = () => {
    saveProfileSettings(profile);

    toast({
      title: "Profil bilgileri güncellendi",
      description: "Ad soyad ve avatar kaydedildi.",
    });
  };

  return (
    <div className="pb-20">
      <StatsBar />

      <div className="px-4 py-6 max-w-lg mx-auto space-y-6">
        <div className="flex items-center gap-3">
          <Link to="/settings" className="p-2 rounded-xl bg-muted/40 hover:bg-muted transition-colors" aria-label="Ayarlar">
            <ArrowLeft className="w-4 h-4 text-muted-foreground" />
          </Link>
          <div>
            <h1 className="text-2xl font-black text-foreground">Profil Bilgileri</h1>
            <p className="text-sm font-semibold text-muted-foreground mt-1">Ad soyad ve avatar bilgilerini düzenle.</p>
          </div>
        </div>

        <section className="bg-card rounded-2xl p-4 shadow-card space-y-4">
          <div className="w-20 h-20 rounded-full gradient-hero flex items-center justify-center text-4xl mx-auto">
            {profile.avatar || "🦩"}
          </div>

          <div className="space-y-2">
            <label className="text-sm font-bold text-foreground">Ad Soyad</label>
            <Input
              value={profile.fullName}
              onChange={(event) => setProfile((prev) => ({ ...prev, fullName: event.target.value }))}
              placeholder="Ad Soyad"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-bold text-foreground">Avatar</label>
            <Input
              value={profile.avatar}
              onChange={(event) => setProfile((prev) => ({ ...prev, avatar: event.target.value }))}
              placeholder="🦩"
              maxLength={2}
            />
          </div>

          <Button className="w-full font-extrabold" onClick={handleSave}>
            <Save className="w-4 h-4 mr-2" />
            Kaydet
          </Button>
        </section>

        <div className="rounded-2xl p-4 bg-muted/40 flex items-start gap-3">
          <UserCircle className="w-5 h-5 mt-0.5 text-sky-brand" />
          <p className="text-xs font-semibold text-muted-foreground">
            Profil bilgileri bu cihazda saklanır. İstersen daha sonra tekrar düzenleyebilirsin.
          </p>
        </div>
      </div>
    </div>
  );
}
