import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

type Props = {
  onRoomCreated: (roomId: string) => void;
  onBack: () => void;
};

function generatePin(): string {
  return String(Math.floor(100000 + Math.random() * 900000));
}

export default function KahootLobby({ onRoomCreated, onBack }: Props) {
  const [title, setTitle] = useState("Romence Quiz");
  const [difficulty, setDifficulty] = useState<"temel" | "orta">("temel");
  const [scheduledAt, setScheduledAt] = useState("");
  const [loading, setLoading] = useState(false);

  const handleCreate = async () => {
    setLoading(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        toast.error("Oda oluşturmak için giriş yapmalısınız");
        setLoading(false);
        return;
      }

      const pin = generatePin();
      const { data, error } = await supabase
        .from("kahoot_rooms")
        .insert({
          host_id: user.id,
          pin,
          title,
          difficulty,
          scheduled_at: scheduledAt || null,
        })
        .select("id")
        .single();

      if (error) throw error;
      onRoomCreated(data.id);
    } catch (err: any) {
      toast.error(err.message || "Oda oluşturulamadı");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pb-20 px-4 py-6 max-w-lg mx-auto space-y-4">
      <div className="rounded-2xl p-5 text-center gradient-hero shadow-button-primary text-primary-foreground">
        <h1 className="text-2xl font-black">🏠 Oda Oluştur</h1>
      </div>

      <div className="bg-card rounded-2xl p-5 shadow-card space-y-4">
        <div>
          <label className="text-sm font-bold text-muted-foreground">Başlık</label>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full mt-1 rounded-xl border border-border bg-background p-3 font-bold text-foreground"
            maxLength={50}
          />
        </div>

        <div>
          <label className="text-sm font-bold text-muted-foreground">Seviye</label>
          <div className="grid grid-cols-2 gap-3 mt-2">
            <button
              onClick={() => setDifficulty("temel")}
              className={`rounded-xl p-3 font-bold transition-all ${
                difficulty === "temel"
                  ? "gradient-success text-primary-foreground shadow-button-success"
                  : "bg-muted text-muted-foreground"
              }`}
            >
              📗 Temel
            </button>
            <button
              onClick={() => setDifficulty("orta")}
              className={`rounded-xl p-3 font-bold transition-all ${
                difficulty === "orta"
                  ? "gradient-gold text-primary-foreground"
                  : "bg-muted text-muted-foreground"
              }`}
            >
              📙 Orta
            </button>
          </div>
        </div>

        <div>
          <label className="text-sm font-bold text-muted-foreground">Başlangıç Zamanı (opsiyonel)</label>
          <input
            type="datetime-local"
            value={scheduledAt}
            onChange={(e) => setScheduledAt(e.target.value)}
            className="w-full mt-1 rounded-xl border border-border bg-background p-3 font-bold text-foreground"
          />
        </div>
      </div>

      <button
        onClick={handleCreate}
        disabled={loading || !title.trim()}
        className="w-full gradient-sky shadow-button-sky rounded-2xl p-4 font-extrabold text-primary-foreground text-lg active:translate-y-1 transition-transform disabled:opacity-50"
      >
        {loading ? "Oluşturuluyor..." : "Odayı Oluştur"}
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
