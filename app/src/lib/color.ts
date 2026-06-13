// Color pipeline for the lamp: blackbody (Kelvin) -> RGB, desaturation, perceptual
// brightness scaling. Order is fixed: kelvin/custom -> desaturate -> brightness.

export interface RGB {
  r: number;
  g: number;
  b: number;
}

export const KELVIN_MIN = 1800; // candlelight
export const KELVIN_MAX = 6500; // daylight (D65)

// Lamp tuning (grounded in lighting-science research).
const DESATURATION = 0.08; // pull ~8% toward luma so a screen's narrow primaries look less "sickly"
const BRIGHTNESS_FLOOR = 0.06; // emitted-light floor so the screen never goes fully black
const BRIGHTNESS_GAMMA = 2.2; // makes an even slider feel like even brightness steps

/** Tanner Helland blackbody approximation: Kelvin -> RGB (0-255). */
export function kelvinToRGB(kelvin: number): RGB {
  const t = clamp(kelvin, 1000, 40000) / 100;
  let r: number;
  let g: number;
  let b: number;

  if (t <= 66) {
    r = 255;
    g = 99.4708025861 * Math.log(t) - 161.1195681661;
  } else {
    r = 329.698727446 * Math.pow(t - 60, -0.1332047592);
    g = 288.1221695283 * Math.pow(t - 60, -0.0755148492);
  }

  if (t >= 66) {
    b = 255;
  } else if (t <= 19) {
    b = 0;
  } else {
    b = 138.5177312231 * Math.log(t - 10) - 305.0447927307;
  }

  return { r: clamp(r, 0, 255), g: clamp(g, 0, 255), b: clamp(b, 0, 255) };
}

export function hexToRGB(hex: string): RGB {
  const h = hex.replace("#", "");
  return {
    r: parseInt(h.slice(0, 2), 16),
    g: parseInt(h.slice(2, 4), 16),
    b: parseInt(h.slice(4, 6), 16),
  };
}

export const rgbToCss = ({ r, g, b }: RGB): string =>
  `rgb(${Math.round(r)}, ${Math.round(g)}, ${Math.round(b)})`;

/**
 * The lamp's full-brightness base color (kelvin or custom tint), gently
 * desaturated. Shared by the engine (which then scales brightness) and the UI
 * (aura/luminance), so the math lives in exactly one place.
 */
export function lampBaseRGB(kelvin: number, customColor: string | null): RGB {
  const c = customColor ? hexToRGB(customColor) : kelvinToRGB(kelvin);
  const luma = 0.2126 * c.r + 0.7152 * c.g + 0.0722 * c.b;
  return {
    r: c.r + (luma - c.r) * DESATURATION,
    g: c.g + (luma - c.g) * DESATURATION,
    b: c.b + (luma - c.b) * DESATURATION,
  };
}

/** Apply a 0..1 slider value as a perceptual brightness multiplier. */
export function applyBrightness({ r, g, b }: RGB, slider: number): RGB {
  const m = BRIGHTNESS_FLOOR + (1 - BRIGHTNESS_FLOOR) * Math.pow(clamp(slider, 0, 1), BRIGHTNESS_GAMMA);
  return { r: r * m, g: g * m, b: b * m };
}

/** Relative luminance 0..1 of an emitted color (for adaptive UI). */
export const relLuminance = ({ r, g, b }: RGB): number =>
  (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255;

/** Warmth slider position (0 = warmest .. 1 = coolest) -> Kelvin. */
export const warmthToKelvin = (pos: number): number =>
  Math.round(KELVIN_MIN + clamp(pos, 0, 1) * (KELVIN_MAX - KELVIN_MIN));

export const kelvinToWarmth = (k: number): number =>
  clamp((k - KELVIN_MIN) / (KELVIN_MAX - KELVIN_MIN), 0, 1);

/** A short human word for a Kelvin value (shown near the thumb, never the number). */
export function warmthWord(kelvin: number): string {
  if (kelvin < 2200) return "Candle";
  if (kelvin < 3000) return "Warm";
  if (kelvin < 4000) return "Soft";
  if (kelvin < 4800) return "Neutral";
  if (kelvin < 5800) return "Cool";
  return "Daylight";
}

export function clamp(v: number, lo: number, hi: number): number {
  return Math.max(lo, Math.min(hi, v));
}
