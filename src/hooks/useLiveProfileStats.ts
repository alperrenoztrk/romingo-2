import { useEffect, useState } from "react";
import { getLiveProfileStats, liveProfileEvents } from "@/lib/liveProfile";

export function useLiveProfileStats() {
  const [stats, setStats] = useState(() => getLiveProfileStats());

  useEffect(() => {
    const sync = () => {
      setStats(getLiveProfileStats());
    };

    sync();
    const interval = window.setInterval(sync, 15000);
    window.addEventListener("storage", sync);
    liveProfileEvents.forEach((eventName) => {
      window.addEventListener(eventName, sync);
    });

    return () => {
      window.clearInterval(interval);
      window.removeEventListener("storage", sync);
      liveProfileEvents.forEach((eventName) => {
        window.removeEventListener(eventName, sync);
      });
    };
  }, []);

  return stats;
}
