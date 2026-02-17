import { Flame, Zap, Heart } from "lucide-react";
import { useLiveProfileStats } from "@/hooks/useLiveProfileStats";

export default function StatsBar() {
  const { streak, xp, hearts } = useLiveProfileStats();

  return (
    <div className="flex items-center justify-between px-4 py-3 bg-card border-b border-border">
      <div className="flex items-center gap-1.5">
        <Flame className="w-5 h-5 text-gold" />
        <span className="font-extrabold text-gold text-sm">{streak}</span>
      </div>
      <div className="flex items-center gap-1.5">
        <Zap className="w-5 h-5 text-gold" fill="hsl(var(--gold))" />
        <span className="font-extrabold text-gold text-sm">{xp}</span>
      </div>
      <div className="flex items-center gap-1.5">
        <Heart className="w-5 h-5 text-flamingo" fill="hsl(var(--flamingo))" />
        <span className="font-extrabold text-flamingo text-sm">{hearts}</span>
      </div>
    </div>
  );
}
