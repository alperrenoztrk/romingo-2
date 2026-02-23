import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

type Props = {
  onJoined: (roomId: string, playerId: string, nickname: string) => void;
  onBack: () => void;
};

export default function KahootJoin({ onJoined, onBack }: Props) {
  const [pin, setPin] = useState("");
  const [nickname, setNickname] = useState("");
  const [loading, setLoading] = useState(false);

  const handleJoin = async () => {
    if (!pin.trim() || !nickname.trim()) {
      toast.error("PIN ve takma ad gerekli");
      return;
    }

    setLoading(true);
    try {
      // Find room by PIN
      const { data: room, error: roomError } = await supabase
        .from("kahoot_rooms")
        .select("id, status")
        .eq("pin", pin.trim())
        .single();

      if (roomError || !room) {
        toast.error("Bu PIN ile oda bulunamadı");
        setLoading(false);
        return;
      }

      if (room.status === "finished") {
        toast.error("Bu oyun sona erdi");
        setLoading(false);
        return;
      }

      // Join as player
      const { data: player, error: playerError } = await supabase
        .from("kahoot_players")
        .insert({ room_id: room.id, nickname: nickname.trim() })
        .select("id")
        .single();

      if (playerError) {
        if (playerError.message.includes("duplicate") || playerError.code === "23505") {
          toast.error("Bu takma ad zaten kullanılıyor");
        } else if (playerError.message.includes("full")) {
          toast.error("Oda dolu (maks 50 oyuncu)");
        } else {
          toast.error(playerError.message);
        }
        setLoading(false);
        return;
      }

      onJoined(room.id, player.id, nickname.trim());
    } catch (err: any) {
      toast.error(err.message || "Katılınamadı");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pb-20 px-4 py-6 max-w-lg mx-auto space-y-4">
      <div className="rounded-2xl p-5 text-center gradient-success shadow-button-success text-primary-foreground">
        <h1 className="text-2xl font-black">🎮 Oyuna Katıl</h1>
      </div>

      <div className="bg-card rounded-2xl p-5 shadow-card space-y-4">
        <div>
          <label className="text-sm font-bold text-muted-foreground">Oyun PIN'i</label>
          <input
            value={pin}
            onChange={(e) => setPin(e.target.value.replace(/\D/g, "").slice(0, 6))}
            placeholder="6 haneli PIN"
            className="w-full mt-1 rounded-xl border border-border bg-background p-4 font-black text-2xl text-center text-foreground tracking-[0.3em]"
            maxLength={6}
            inputMode="numeric"
          />
        </div>

        <div>
          <label className="text-sm font-bold text-muted-foreground">Takma Adın</label>
          <input
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
            placeholder="Adını yaz..."
            className="w-full mt-1 rounded-xl border border-border bg-background p-3 font-bold text-foreground"
            maxLength={20}
          />
        </div>
      </div>

      <button
        onClick={handleJoin}
        disabled={loading || pin.length < 6 || !nickname.trim()}
        className="w-full gradient-sky shadow-button-sky rounded-2xl p-4 font-extrabold text-primary-foreground text-lg active:translate-y-1 transition-transform disabled:opacity-50"
      >
        {loading ? "Katılınıyor..." : "Katıl! 🚀"}
      </button>

      <button
        onClick={onBack}
        className="w-full bg-card rounded-2xl p-4 shadow-card font-extrabold text-foreground active:translate-y-1 transition-transform"
      >
        ← Geri
      </button>
    </div>
  );
}
