import { useEffect, useState } from "react";
import { getLiveProfileStats, PROFILE_STATS_UPDATED_EVENT, type LiveProfileStats } from "@/lib/liveProfile";

export function useLiveProfileStats() {
  const [stats, setStats] = useState<LiveProfileStats>(getLiveProfileStats());

  useEffect(() => {
    const sync = () => {
      setStats(getLiveProfileStats());
    };

    sync();

    window.addEventListener("storage", sync);
    window.addEventListener("romingo:daily-goals-updated", sync);
    window.addEventListener(PROFILE_STATS_UPDATED_EVENT, sync);

    return () => {
      window.removeEventListener("storage", sync);
      window.removeEventListener("romingo:daily-goals-updated", sync);
      window.removeEventListener(PROFILE_STATS_UPDATED_EVENT, sync);
    };
  }, []);

  return stats;
}
