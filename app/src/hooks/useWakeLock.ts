import { useEffect, useRef } from "react";

/**
 * Keeps the monitor awake (a real lamp doesn't sleep). Wake Lock is released
 * when the tab is backgrounded, so we re-acquire on visibilitychange.
 */
export function useWakeLock() {
  const sentinel = useRef<WakeLockSentinel | null>(null);

  useEffect(() => {
    let cancelled = false;

    const acquire = async () => {
      if (!("wakeLock" in navigator)) return;
      try {
        if (document.visibilityState !== "visible") return;
        sentinel.current = await navigator.wakeLock.request("screen");
      } catch {
        /* denied / low battery — ignore, screen will just follow OS policy */
      }
    };

    const onVisibility = () => {
      if (document.visibilityState === "visible" && !cancelled) acquire();
    };

    acquire();
    document.addEventListener("visibilitychange", onVisibility);
    return () => {
      cancelled = true;
      document.removeEventListener("visibilitychange", onVisibility);
      sentinel.current?.release().catch(() => {});
      sentinel.current = null;
    };
  }, []);
}
