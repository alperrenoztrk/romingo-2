import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BookOpenText, Languages, Target, Video, Trophy } from "lucide-react";
import { useAuthProfile } from "@/hooks/useAuthProfile";
import MascotFace, { type MascotId } from "@/components/MascotFace";

export default function HomePage() {
  const navigate = useNavigate();
  const hour = new Date().getHours();
  const baseGreeting = hour < 12 ? "Günaydın" : hour < 18 ? "İyi günler" : "İyi akşamlar";
  const { profile: authProfile } = useAuthProfile();
  const displayName = authProfile?.fullName?.trim() || "Kullanıcı";
  const greeting = `${baseGreeting} ${displayName}`;
  const mascots = useMemo(
    () => [
      { id: "toucan" as MascotId, name: "Tukan" },
      { id: "panda" as MascotId, name: "Panda" },
      { id: "flamingo" as MascotId, name: "Flamingo" },
      { id: "cat" as MascotId, name: "Kedi" },
    ],
    [],
  );
  const [activeMascotIndex, setActiveMascotIndex] = useState(0);
  const [mascotRotation, setMascotRotation] = useState(0);
  const activeMascot = mascots[activeMascotIndex];

  const handleMascotClick = () => {
    setMascotRotation((currentRotation) => currentRotation + 360);
    setActiveMascotIndex((currentIndex) => (currentIndex + 1) % mascots.length);
  };

  return (
    <div className="pb-20">
      <div className="px-4 py-6 space-y-4 max-w-lg mx-auto">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={handleMascotClick}
            className="transition-transform duration-700 ease-out active:scale-95 w-36 h-36 flex-shrink-0"
            style={{ transform: `rotate(${mascotRotation}deg)` }}
            aria-label={`${activeMascot.name} maskotunu döndür`}
          >
            <MascotFace mascotId={activeMascot.id} mascotName={activeMascot.name} className="w-full h-full drop-shadow-lg" />
          </button>
          <h1 className="text-2xl font-black text-foreground">{greeting}!</h1>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={() => navigate("/app/learn?view=tutorial&practice=adaptive")}
            className="gradient-sky shadow-button-sky rounded-2xl p-4 text-left active:translate-y-1 active:shadow-none transition-all"
          >
            <Target className="w-8 h-8 text-primary-foreground mb-2" />
            <div className="text-primary-foreground font-extrabold text-sm">Pratik Yap</div>
          </button>

          <button
            onClick={() => navigate("/app/translate")}
            className="gradient-hero shadow-button-primary rounded-2xl p-4 text-left active:translate-y-1 active:shadow-none transition-all"
          >
            <Languages className="w-8 h-8 text-primary-foreground mb-2" />
            <div className="text-primary-foreground font-extrabold text-sm">Çeviri</div>
          </button>

          <button
            onClick={() => navigate("/app/kahoot")}
            className="rounded-2xl p-4 text-left active:translate-y-1 active:shadow-none transition-all w-full gradient-hero shadow-button-primary"
          >
            <Trophy className="w-8 h-8 text-primary-foreground mb-2" />
            <div className="text-primary-foreground font-extrabold text-sm">Kahoot</div>
          </button>

          <button
            onClick={() => navigate("/app/videos")}
            className="gradient-success shadow-button-success rounded-2xl p-4 text-left active:translate-y-1 active:shadow-none transition-all w-full"
          >
            <Video className="w-8 h-8 text-primary-foreground mb-2" />
            <div className="text-primary-foreground font-extrabold text-sm">Kısa Konuşma Videoları</div>
          </button>

          <button
            onClick={() => navigate("/app/grammar")}
            className="col-span-2 gradient-gold shadow-button-gold rounded-2xl p-4 text-left active:translate-y-1 active:shadow-none transition-all"
          >
            <BookOpenText className="w-8 h-8 text-primary-foreground mb-2" />
            <div className="text-primary-foreground font-extrabold text-sm">Dil Bilgisi</div>
            <div className="text-primary-foreground/80 text-xs font-semibold mt-1">Rumence dil bilgisi konu anlatımı</div>
          </button>
        </div>
      </div>
    </div>
  );
}
