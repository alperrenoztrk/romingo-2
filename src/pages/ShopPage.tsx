import StatsBar from "../components/StatsBar";
import { Gem, Heart, Zap, SkipForward, Shield, Clock } from "lucide-react";

interface ShopItem {
  icon: React.ReactNode;
  name: string;
  desc: string;
  price: number;
  currency: "gem" | "coin";
}

const shopItems: ShopItem[] = [
  { icon: <Heart className="w-8 h-8 text-flamingo" fill="hsl(var(--flamingo))" />, name: "Can Doldur", desc: "Canlarını 5'e tamamla", price: 350, currency: "gem" },
  { icon: <Zap className="w-8 h-8 text-gold" fill="hsl(var(--gold))" />, name: "XP Boost", desc: "15 dk boyunca 2x XP kazan", price: 200, currency: "gem" },
  { icon: <SkipForward className="w-8 h-8 text-sky-brand" />, name: "Seviye Atla", desc: "Bir dersi atla", price: 500, currency: "gem" },
  { icon: <Shield className="w-8 h-8 text-success" />, name: "Streak Kalkanı", desc: "1 gün seriyi koru", price: 150, currency: "gem" },
  { icon: <Clock className="w-8 h-8 text-flamingo" />, name: "Süre Uzatma", desc: "Lig süresini uzat", price: 300, currency: "gem" },
];

export default function ShopPage() {
  return (
    <div className="pb-20">
      <StatsBar streak={12} xp={1450} hearts={5} />

      <div className="px-4 py-6 max-w-lg mx-auto">
        {/* Gem Balance */}
        <div className="gradient-hero rounded-2xl p-5 text-center mb-6 shadow-elevated">
          <Gem className="w-10 h-10 text-primary-foreground mx-auto mb-2" />
          <div className="text-3xl font-black text-primary-foreground">1,250</div>
          <div className="text-primary-foreground/80 text-sm font-bold">Elmasların</div>
        </div>

        <h2 className="font-extrabold text-foreground text-lg mb-4">Mağaza</h2>

        <div className="space-y-3">
          {shopItems.map((item, i) => (
            <div key={i} className="bg-card rounded-2xl p-4 shadow-card flex items-center gap-4">
              <div className="w-14 h-14 rounded-xl bg-muted flex items-center justify-center">
                {item.icon}
              </div>
              <div className="flex-1">
                <div className="font-bold text-foreground text-sm">{item.name}</div>
                <div className="text-muted-foreground text-xs font-semibold">{item.desc}</div>
              </div>
              <button className="gradient-sky shadow-button-sky rounded-xl px-4 py-2 active:translate-y-1 active:shadow-none transition-all">
                <div className="flex items-center gap-1">
                  <Gem className="w-4 h-4 text-secondary-foreground" />
                  <span className="font-extrabold text-sm text-secondary-foreground">{item.price}</span>
                </div>
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
