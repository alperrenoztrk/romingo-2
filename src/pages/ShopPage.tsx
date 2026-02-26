import { useEffect, useMemo, useState } from "react";
import StatsBar from "../components/StatsBar";
import { Gem, Heart, Zap, SkipForward, Shield, Clock } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import {
  addStreakShield,
  getEconomySnapshot,
  learningEconomyUpdatedEvent,
  refillHeartsToMax,
} from "@/lib/learningEconomy";

interface ShopItem {
  id: string;
  icon: React.ReactNode;
  name: string;
  desc: string;
  price: number;
  currency: "gem" | "coin";
}

const GEM_BALANCE_KEY = "romingo_shop_gem_balance";
const PURCHASE_COUNTS_KEY = "romingo_shop_purchase_counts";
const DEFAULT_GEMS = 1250;

const shopItems: ShopItem[] = [
  {
    id: "heart-refill",
    icon: <Heart className="w-8 h-8 text-flamingo" fill="hsl(var(--flamingo))" />,
    name: "Can Doldur",
    desc: "Canlarını 10'a tamamla",
    price: 350,
    currency: "gem",
  },
  {
    id: "xp-boost",
    icon: <Zap className="w-8 h-8 text-gold" fill="hsl(var(--gold))" />,
    name: "XP Boost",
    desc: "15 dk boyunca 2x XP kazan",
    price: 200,
    currency: "gem",
  },
  {
    id: "lesson-skip",
    icon: <SkipForward className="w-8 h-8 text-sky-brand" />,
    name: "Seviye Atla",
    desc: "Bir dersi atla",
    price: 500,
    currency: "gem",
  },
  {
    id: "streak-shield",
    icon: <Shield className="w-8 h-8 text-success" />,
    name: "Streak Kalkanı",
    desc: "1 gün seriyi koru",
    price: 150,
    currency: "gem",
  },
  {
    id: "league-time",
    icon: <Clock className="w-8 h-8 text-flamingo" />,
    name: "Süre Uzatma",
    desc: "Lig süresini uzat",
    price: 300,
    currency: "gem",
  },
];

export default function ShopPage() {
  const [gems, setGems] = useState(DEFAULT_GEMS);
  const [economy, setEconomy] = useState(() => getEconomySnapshot());
  const [purchaseCounts, setPurchaseCounts] = useState<Record<string, number>>({});
  const { toast } = useToast();

  useEffect(() => {
    const storedBalance = Number(localStorage.getItem(GEM_BALANCE_KEY));
    if (Number.isFinite(storedBalance) && storedBalance >= 0) {
      setGems(storedBalance);
    }

    const storedCounts = localStorage.getItem(PURCHASE_COUNTS_KEY);
    if (storedCounts) {
      try {
        const parsedCounts = JSON.parse(storedCounts) as Record<string, number>;
        setPurchaseCounts(parsedCounts);
      } catch {
        setPurchaseCounts({});
      }
    }

    const syncEconomy = () => setEconomy(getEconomySnapshot());
    window.addEventListener(learningEconomyUpdatedEvent, syncEconomy);

    return () => window.removeEventListener(learningEconomyUpdatedEvent, syncEconomy);
  }, []);

  const formattedGems = useMemo(() => gems.toLocaleString("tr-TR"), [gems]);

  const registerItemPurchase = (item: ShopItem) => {
    const nextCounts = {
      ...purchaseCounts,
      [item.id]: (purchaseCounts[item.id] ?? 0) + 1,
    };

    setPurchaseCounts(nextCounts);
    localStorage.setItem(PURCHASE_COUNTS_KEY, JSON.stringify(nextCounts));
  };

  const triggerItemEffect = (item: ShopItem) => {
    if (item.id === "heart-refill") {
      refillHeartsToMax();
    }

    if (item.id === "streak-shield") {
      addStreakShield(1);
    }
  };

  const handlePurchaseWithGems = (item: ShopItem) => {
    if (gems < item.price) {
      toast({
        title: "Yetersiz elmas",
        description: `${item.name} için daha fazla elmasa ihtiyacın var.`,
        variant: "destructive",
      });
      return;
    }

    const nextGems = gems - item.price;
    setGems(nextGems);
    localStorage.setItem(GEM_BALANCE_KEY, nextGems.toString());
    registerItemPurchase(item);
    triggerItemEffect(item);

    toast({
      title: "Satın alma başarılı",
      description: `${item.name} elmas ile satın alındı.`,
    });
  };

  return (
    <div className="pb-20">
      <StatsBar />

      <div className="px-4 py-6 max-w-lg mx-auto">
        <div className="gradient-hero rounded-2xl p-5 text-center mb-6 shadow-elevated">
          <Gem className="w-10 h-10 text-primary-foreground mx-auto mb-2" />
          <div className="text-3xl font-black text-primary-foreground">{formattedGems}</div>
          <div className="text-primary-foreground/80 text-sm font-bold">Elmasların</div>
        </div>

        <h2 className="font-extrabold text-foreground text-lg mb-4">Mağaza</h2>

        <div className="bg-muted/40 rounded-2xl p-3 mb-6 border border-border">
          <div className="text-xs font-semibold text-muted-foreground">
            Kalkan stoğu: <span className="font-extrabold text-foreground">{economy.shieldCount}</span>
          </div>
        </div>

        <div className="space-y-3">
          {shopItems.map((item) => (
            <div key={item.id} className="bg-card rounded-2xl p-4 shadow-card flex items-center gap-4">
              <div className="w-14 h-14 rounded-xl bg-muted flex items-center justify-center">{item.icon}</div>
              <div className="flex-1">
                <div className="font-bold text-foreground text-sm">{item.name}</div>
                <div className="text-muted-foreground text-xs font-semibold">{item.desc}</div>
                {(purchaseCounts[item.id] ?? 0) > 0 && (
                  <div className="text-success text-[10px] font-bold mt-1">Satın alındı: {purchaseCounts[item.id]}</div>
                )}
              </div>
              <button
                onClick={() => handlePurchaseWithGems(item)}
                disabled={gems < item.price}
                className="gradient-sky shadow-button-sky rounded-xl px-3 py-2 active:translate-y-1 active:shadow-none transition-all disabled:opacity-50 disabled:pointer-events-none"
              >
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
