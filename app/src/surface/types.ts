// The Surface is the set of DOM nodes the engines paint into.
// React renders these ONCE; engines mutate them imperatively. React never
// re-renders the surface on the animation hot path (this is what prevents flicker).

export interface Surface {
  stage: HTMLDivElement; // CSS-color lamp/party field
  canvas: HTMLCanvasElement; // music / WebGL visualizer
  dimmer: HTMLDivElement; // brightness overlay
}

/** Live, per-mode parameters an engine reads on each update/frame. */
export interface EngineSettings {
  kelvin: number;
  brightness: number;
  customColor: string | null;
}

/**
 * One interface every mode implements. Adding a phase = adding an engine,
 * without touching the others or the host.
 */
export interface LightEngine {
  readonly id: "lamp" | "music" | "party";
  start(surface: Surface, settings: EngineSettings): void;
  update(settings: EngineSettings): void;
  stop(): void;
}
