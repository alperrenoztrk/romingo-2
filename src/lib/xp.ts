const XP_PER_LEVEL = 1000;

export interface XpProgress {
  level: number;
  currentXp: number;
  xpToNextLevel: number;
}

export function getXpProgress(totalXp: number): XpProgress {
  const safeXp = Number.isFinite(totalXp) && totalXp >= 0 ? Math.floor(totalXp) : 0;
  const level = Math.floor(safeXp / XP_PER_LEVEL) + 1;
  const currentXp = safeXp % XP_PER_LEVEL;

  return {
    level,
    currentXp,
    xpToNextLevel: XP_PER_LEVEL,
  };
}

