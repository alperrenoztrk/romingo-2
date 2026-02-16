interface XPProgressProps {
  current: number;
  total: number;
  level: number;
}

export default function XPProgress({ current, total, level }: XPProgressProps) {
  const percentage = Math.min((current / total) * 100, 100);

  return (
    <div className="flex items-center gap-3">
      <div className="w-10 h-10 rounded-full gradient-sky flex items-center justify-center">
        <span className="text-secondary-foreground font-black text-sm">{level}</span>
      </div>
      <div className="flex-1">
        <div className="flex justify-between mb-1">
          <span className="text-xs font-bold text-muted-foreground">SEVİYE {level}</span>
          <span className="text-xs font-bold text-muted-foreground">{current}/{total} XP</span>
        </div>
        <div className="h-3 bg-muted rounded-full overflow-hidden">
          <div
            className="h-full gradient-sky rounded-full transition-all duration-500"
            style={{ width: `${percentage}%` }}
          />
        </div>
      </div>
    </div>
  );
}
