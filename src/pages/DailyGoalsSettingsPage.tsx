import StatsBar from "../components/StatsBar";
import { ArrowLeft, Save, RotateCcw, Target } from "lucide-react";
import { Link } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import { getDailyGoalTargets, saveDailyGoalTargets } from "@/lib/dailyGoals";

const DEFAULT_TARGETS = {
  lessons: 1,
  xp: 120,
  correctAnswers: 10,
};

export default function DailyGoalsSettingsPage() {
  const { toast } = useToast();
  const [targets, setTargets] = useState(getDailyGoalTargets);

  const handleTargetChange = (key: keyof typeof targets, value: string) => {
    const parsedValue = Number(value);
    setTargets((prev) => ({
      ...prev,
      [key]: Number.isFinite(parsedValue) && parsedValue >= 1 ? Math.floor(parsedValue) : 1,
    }));
  };

  const handleSave = () => {
    saveDailyGoalTargets(targets);
    toast({
      title: "Günlük hedefler güncellendi",
      description: "Yeni hedeflerin anasayfada hemen gösterilecek.",
    });
  };

  const handleReset = () => {
    setTargets(DEFAULT_TARGETS);
    saveDailyGoalTargets(DEFAULT_TARGETS);
    toast({
      title: "Varsayılan hedefler geri yüklendi",
      description: "Ders, XP ve doğru cevap hedefleri başlangıç değerlerine döndü.",
    });
  };

  return (
    <div className="pb-20">
      <StatsBar streak={12} xp={1450} hearts={5} />

      <div className="px-4 py-6 max-w-lg mx-auto space-y-6">
        <div className="flex items-center gap-3">
          <Link to="/" className="p-2 rounded-xl bg-muted/40 hover:bg-muted transition-colors" aria-label="Ana sayfa">
            <ArrowLeft className="w-4 h-4 text-muted-foreground" />
          </Link>
          <div>
            <h1 className="text-2xl font-black text-foreground">Günlük Hedefleri Ayarla</h1>
            <p className="text-sm font-semibold text-muted-foreground mt-1">Her gün tamamlamak istediğin hedef sayılarını güncelle.</p>
          </div>
        </div>

        <section className="bg-card rounded-2xl p-4 shadow-card space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-bold text-foreground">Ders Tamamla</label>
            <Input
              type="number"
              min={1}
              value={targets.lessons}
              onChange={(event) => handleTargetChange("lessons", event.target.value)}
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-bold text-foreground">XP Kazan</label>
            <Input
              type="number"
              min={1}
              value={targets.xp}
              onChange={(event) => handleTargetChange("xp", event.target.value)}
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-bold text-foreground">Doğru Cevap Ver</label>
            <Input
              type="number"
              min={1}
              value={targets.correctAnswers}
              onChange={(event) => handleTargetChange("correctAnswers", event.target.value)}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Button className="w-full font-extrabold" onClick={handleSave}>
              <Save className="w-4 h-4 mr-2" />
              Kaydet
            </Button>
            <Button className="w-full font-extrabold" variant="outline" onClick={handleReset}>
              <RotateCcw className="w-4 h-4 mr-2" />
              Varsayılanlara Dön
            </Button>
          </div>
        </section>

        <div className="rounded-2xl p-4 bg-muted/40 flex items-start gap-3">
          <Target className="w-5 h-5 mt-0.5 text-flamingo" />
          <p className="text-xs font-semibold text-muted-foreground">Hedeflerini yükselttikçe günlük ilerleme çubuğu daha motive edici bir şekilde güncellenir.</p>
        </div>
      </div>
    </div>
  );
}
