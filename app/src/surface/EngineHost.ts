import type { EngineSettings, LightEngine, Surface } from "./types";

/**
 * Holds the registered engines and the currently-active one. Owns the single
 * point of mode-switching: stop the old engine, start the new. (Each engine that
 * animates owns its own rAF; the host never runs one itself.)
 */
export class EngineHost {
  private engines = new Map<string, LightEngine>();
  private active: LightEngine | null = null;
  private surface: Surface | null = null;

  register(engine: LightEngine) {
    this.engines.set(engine.id, engine);
  }

  attach(surface: Surface) {
    this.surface = surface;
  }

  setMode(id: string, settings: EngineSettings) {
    if (!this.surface) return;
    if (this.active?.id === id) {
      this.active.update(settings);
      return;
    }
    this.active?.stop();
    const next = this.engines.get(id);
    if (!next) return;
    this.active = next;
    next.start(this.surface, settings);
  }

  update(settings: EngineSettings) {
    this.active?.update(settings);
  }

  dispose() {
    this.active?.stop();
    this.active = null;
    this.surface = null;
  }
}
