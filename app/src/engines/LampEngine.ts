import { lampBaseRGB, applyBrightness, rgbToCss } from "@/lib/color";
import type { EngineSettings, LightEngine, Surface } from "@/surface/types";

/**
 * Lamp: a flat, beautiful adjustable light. No requestAnimationFrame — it paints
 * on demand. "Dimming" scales the emitted RGB toward black (cleaner than a black
 * overlay, no grey muddying); the web can't touch the real backlight. No CSS
 * transition here — drags must track 1:1, and preset glides are tweened upstream.
 */
export class LampEngine implements LightEngine {
  readonly id = "lamp" as const;
  private surface: Surface | null = null;

  start(surface: Surface, settings: EngineSettings) {
    this.surface = surface;
    surface.canvas.style.display = "none";
    surface.stage.style.display = "block";
    surface.stage.style.transition = "none";
    surface.dimmer.style.opacity = "0"; // unused in the RGB-scaling model
    this.paint(settings);
  }

  update(settings: EngineSettings) {
    this.paint(settings);
  }

  stop() {
    this.surface = null;
  }

  private paint({ kelvin, brightness, customColor }: EngineSettings) {
    if (!this.surface) return;
    const base = lampBaseRGB(kelvin, customColor);
    this.surface.stage.style.backgroundColor = rgbToCss(applyBrightness(base, brightness));
  }
}
