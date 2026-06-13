import { create } from "zustand";
import { persist, createJSONStorage, type StateStorage } from "zustand/middleware";

export type Mode = "lamp" | "music" | "party"; // music + party arrive in later phases

export interface LumosState {
  mode: Mode;
  // Lamp — `brightness` is a RAW slider value (0..1). The engine applies the
  // perceptual curve + floor; nothing else needs to know the curve.
  kelvin: number;
  brightness: number;
  customColor: string | null; // overrides kelvin when set
  selectedPreset: string | null;
  hintDismissed: boolean;

  setMode: (m: Mode) => void;
  setKelvin: (k: number) => void;
  setBrightness: (b: number) => void;
  setCustomColor: (c: string | null) => void;
  setSelectedPreset: (id: string | null) => void;
  dismissHint: () => void;
}

const DEFAULTS = {
  mode: "lamp" as Mode,
  kelvin: 2700,
  brightness: 0.85,
  customColor: null as string | null,
  selectedPreset: null as string | null,
  hintDismissed: false,
};

/**
 * Throttled localStorage: slider drags call set() ~60-120x/sec; writing
 * localStorage synchronously every frame causes jank. Coalesce writes to ~once
 * every 500ms and flush on page hide.
 */
const throttledStorage: StateStorage = (() => {
  let pendingKey = "lumos";
  let pendingValue: string | null = null;
  let timer: number | undefined;
  const flush = () => {
    if (pendingValue != null) {
      localStorage.setItem(pendingKey, pendingValue);
      pendingValue = null;
    }
    timer = undefined;
  };
  if (typeof window !== "undefined") {
    window.addEventListener("pagehide", flush);
    window.addEventListener("visibilitychange", () => {
      if (document.visibilityState === "hidden") flush();
    });
  }
  return {
    getItem: (k) => localStorage.getItem(k),
    setItem: (k, v) => {
      pendingKey = k;
      pendingValue = v;
      if (timer === undefined) timer = window.setTimeout(flush, 500);
    },
    removeItem: (k) => localStorage.removeItem(k),
  };
})();

export const useLumosStore = create<LumosState>()(
  persist(
    (set) => ({
      ...DEFAULTS,
      setMode: (mode) => set({ mode }),
      setKelvin: (kelvin) => set({ kelvin, customColor: null }),
      setBrightness: (brightness) => set({ brightness }),
      setCustomColor: (customColor) => set({ customColor }),
      setSelectedPreset: (selectedPreset) => set({ selectedPreset }),
      dismissHint: () => set({ hintDismissed: true }),
    }),
    {
      name: "lumos",
      version: 2,
      storage: createJSONStorage(() => throttledStorage),
      migrate: (persisted, version) =>
        // brightness changed meaning in v2 (emitted -> raw slider); reset to be safe
        version < 2 ? (DEFAULTS as unknown as LumosState) : (persisted as LumosState),
    },
  ),
);
