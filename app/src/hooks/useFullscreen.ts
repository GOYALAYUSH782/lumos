import { useCallback, useEffect, useState } from "react";

interface ScreenLike {
  label?: string;
  isInternal?: boolean;
  isPrimary?: boolean;
}

/**
 * Fullscreen on the chosen monitor. Uses the Window Management API
 * (getScreenDetails, Chromium-only) to target the external display when
 * available; otherwise falls back to fullscreen on the current window's screen.
 */
export function useFullscreen() {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [canChooseMonitor, setCanChooseMonitor] = useState(false);

  useEffect(() => {
    setCanChooseMonitor("getScreenDetails" in window);
    const onChange = () => setIsFullscreen(!!document.fullscreenElement);
    document.addEventListener("fullscreenchange", onChange);
    return () => document.removeEventListener("fullscreenchange", onChange);
  }, []);

  const enter = useCallback(async (preferExternal = false) => {
    const el = document.documentElement;
    let opts: FullscreenOptions = {};

    if (preferExternal && "getScreenDetails" in window) {
      try {
        // @ts-expect-error - Window Management API not in TS lib yet
        const details = await window.getScreenDetails();
        const screens: ScreenLike[] = details.screens ?? [];
        const external =
          screens.find((s) => s.isInternal === false) ??
          screens.find((s) => s.isPrimary === false);
        if (external) opts = { screen: external } as FullscreenOptions;
      } catch {
        /* permission denied -> just fullscreen current screen */
      }
    }

    try {
      await el.requestFullscreen(opts);
    } catch {
      try {
        await el.requestFullscreen();
      } catch {
        /* ignore */
      }
    }
  }, []);

  const exit = useCallback(async () => {
    if (document.fullscreenElement) await document.exitFullscreen().catch(() => {});
  }, []);

  const toggle = useCallback(
    (preferExternal = false) => (document.fullscreenElement ? exit() : enter(preferExternal)),
    [enter, exit],
  );

  return { isFullscreen, canChooseMonitor, enter, exit, toggle };
}

export type FullscreenApi = ReturnType<typeof useFullscreen>;
