import { lampBaseRGB, rgbToCss } from "./color";

// 8 science-based presets (Kelvin values derived from Philips Hue scenes +
// lighting research). `brightness` is a raw slider value (0..1); the engine
// applies the perceptual curve.
export interface LampPreset {
  id: string;
  name: string;
  kelvin?: number; // either a temperature...
  custom?: string; // ...or a custom tint
  brightness: number; // 0..1 slider value
}

export const LAMP_PRESETS: LampPreset[] = [
  { id: "nightlight", name: "Nightlight", kelvin: 2000, brightness: 0.12 },
  { id: "candle", name: "Candle", kelvin: 1800, brightness: 0.3 },
  { id: "relax", name: "Relax", kelvin: 2250, brightness: 0.5 },
  { id: "sunset", name: "Sunset", custom: "#ff9d6b", brightness: 0.6 },
  { id: "reading", name: "Reading", kelvin: 2900, brightness: 0.85 },
  { id: "concentrate", name: "Concentrate", kelvin: 4350, brightness: 0.95 },
  { id: "videocall", name: "Video Call", kelvin: 5000, brightness: 1.0 },
  { id: "daylight", name: "Daylight", kelvin: 6400, brightness: 1.0 },
];

/** Swatch/preview color of a preset (full brightness, desaturated like the lamp). */
export function presetSwatchColor(p: LampPreset): string {
  return rgbToCss(lampBaseRGB(p.kelvin ?? 3000, p.custom ?? null));
}
