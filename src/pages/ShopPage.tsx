import { useEffect, useMemo, useState } from "react";
import StatsBar from "../components/StatsBar";
import { Gem, Heart, Zap, SkipForward, Shield, Clock, CreditCard } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface ShopItem {
  id: string;
  icon: React.ReactNode;
  name: string;
  desc: string;
  price: number;
  currency: "gem" | "coin";
}

interface GemPackage {
  id: string;
  gems: number;
  priceTl: number;
}

const GEM_BALANCE_KEY = "romingo_shop_gem_balance";
const PURCHASE_COUNTS_KEY = "romingo_shop_purchase_counts";
const DEFAULT_GEMS = 1250;
const TL_PER_GEM = 20 / 500;

const shopItems: ShopItem[] = [
  { id: "heart-refill", icon: <Heart className="w-8 h-8 text-flamingo" fill="hsl(var(--flamingo))" />, name: "Can Doldur", desc: "Canlarını 5'e tamamla", price: 350, currency: "gem" },
  { id: "xp-boost", icon: <Zap className="w-8 h-8 text-gold" fill="hsl(var(--gold))" />, name: "XP Boost", desc: "15 dk boyunca 2x XP kazan", price: 200, currency: "gem" },
  { id: "lesson-skip", icon: <SkipForward className="w-8 h-8 text-sky-brand" />, name: "Seviye Atla", desc: "Bir dersi atla", price: 500, currency: "gem" },
  { id: "streak-shield", icon: <Shield className="w-8 h-8 text-success" />, name: "Streak Kalkanı", desc: "1 gün seriyi koru", price: 150, currency: "gem" },
  { id: "league-time", icon: <Clock className="w-8 h-8 text-flamingo" />, name: "Süre Uzatma", desc: "Lig süresini uzat", price: 300, currency: "gem" },
];

const gemPackages: GemPackage[] = [{ id: "gem-pack-500", gems: 500, priceTl: 20 }];

const formatTl = (price: number) =>
  new Intl.NumberFormat("tr-TR", {
    style: "currency",
    currency: "TRY",
    maximumFractionDigits: 2,
  }).format(price);

const getTlPriceFromGems = (gemPrice: number) => Math.round(gemPrice * TL_PER_GEM * 100) / 100;

export default function ShopPage() {
  const [gems, setGems] = useState(DEFAULT_GEMS);
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

  const handlePurchaseWithGems = (item: ShopItem) => {
    if (gems < item.price) {
      toast({
        title: "Yetersiz elmas",
        description: `${item.name} için daha fazla elmasa ihtiyacın var veya TROY kartı ile ödeyebilirsin.`,
        variant: "destructive",
      });
      return;
    }

    const nextGems = gems - item.price;
    setGems(nextGems);
    localStorage.setItem(GEM_BALANCE_KEY, nextGems.toString());
    registerItemPurchase(item);

    toast({
      title: "Satın alma başarılı",
      description: `${item.name} elmas ile satın alındı.`,
    });
  };

  const handlePurchaseWithTroyCard = (item: ShopItem) => {
    registerItemPurchase(item);
    toast({
      title: "Ödeme başarılı (TROY)",
      description: `${item.name} ${formatTl(getTlPriceFromGems(item.price))} karşılığında TROY kartı ile satın alındı.`,
    });
  };

  const handleGemTopUp = (pack: GemPackage) => {
    const nextGems = gems + pack.gems;
    setGems(nextGems);
    localStorage.setItem(GEM_BALANCE_KEY, nextGems.toString());

    toast({
      title: "Elmas yüklendi",
      description: `${pack.gems} elmas hesabına eklendi (TROY ile ${formatTl(pack.priceTl)}).`,
    });
  };

  return (
    <div className="pb-20">
      <StatsBar streak={12} xp={1450} hearts={5} />

      <div className="px-4 py-6 max-w-lg mx-auto">
        <div className="gradient-hero rounded-2xl p-5 text-center mb-6 shadow-elevated">
          <Gem className="w-10 h-10 text-primary-foreground mx-auto mb-2" />
          <div className="text-3xl font-black text-primary-foreground">{formattedGems}</div>
          <div className="text-primary-foreground/80 text-sm font-bold">Elmasların</div>
        </div>

        <h2 className="font-extrabold text-foreground text-lg mb-4">Mağaza</h2>

        <div className="bg-muted/40 rounded-2xl p-3 mb-4 border border-border">
          <div className="flex items-center gap-2 text-xs font-bold text-foreground">
            <CreditCard className="w-4 h-4" />
            Türkiye ödeme yöntemi aktif: <span className="text-primary">TROY Kartı</span>
          </div>
        </div>

        <div className="space-y-3 mb-6">
          {gemPackages.map((pack) => (
            <div key={pack.id} className="bg-card rounded-2xl p-4 shadow-card flex items-center justify-between gap-4">
              <div>
                <div className="font-bold text-foreground text-sm">{pack.gems} Elmas</div>
                <div className="text-muted-foreground text-xs font-semibold">{formatTl(pack.priceTl)} • TROY</div>
              </div>
              <button
                onClick={() => handleGemTopUp(pack)}
                className="gradient-sky shadow-button-sky rounded-xl px-4 py-2 active:translate-y-1 active:shadow-none transition-all"
              >
                <span className="font-extrabold text-sm text-secondary-foreground">Satın Al</span>
              </button>
            </div>
          ))}
        </div>

        <div className="space-y-3">
          {shopItems.map((item) => (
            <div key={item.id} className="bg-card rounded-2xl p-4 shadow-card flex items-center gap-4">
              <div className="w-14 h-14 rounded-xl bg-muted flex items-center justify-center">{item.icon}</div>
              <div className="flex-1">
                <div className="font-bold text-foreground text-sm">{item.name}</div>
                <div className="text-muted-foreground text-xs font-semibold">{item.desc}</div>
                <div className="text-[10px] mt-1 font-bold text-muted-foreground">
                  TROY ile: {formatTl(getTlPriceFromGems(item.price))}
                </div>
                {(purchaseCounts[item.id] ?? 0) > 0 && (
                  <div className="text-success text-[10px] font-bold mt-1">Satın alındı: {purchaseCounts[item.id]}</div>
                )}
              </div>
              <div className="flex flex-col gap-2">
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
                <button
                  onClick={() => handlePurchaseWithTroyCard(item)}
                  className="rounded-xl border border-input px-3 py-2 text-[11px] font-bold text-foreground hover:bg-muted transition-colors"
                >
                  TROY ile al
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
