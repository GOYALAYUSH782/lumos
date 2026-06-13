import { useEffect, useRef } from "react";
import { useLumosStore } from "@/store/useLumosStore";
import { EngineHost } from "./EngineHost";
import { LampEngine } from "@/engines/LampEngine";
import type { EngineSettings } from "./types";

/**
 * Renders the light field's DOM nodes exactly once and hands them to the engine
 * host. Subscribes to the store imperatively so slider drags repaint the light
 * WITHOUT re-rendering React (no flicker on the animation hot path).
 */
export function SurfaceLayer() {
  const stageRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const dimmerRef = useRef<HTMLDivElement>(null);
  const hostRef = useRef<EngineHost | null>(null);

  useEffect(() => {
    if (!stageRef.current || !canvasRef.current || !dimmerRef.current) return;

    const read = (): EngineSettings => {
      const s = useLumosStore.getState();
      return { kelvin: s.kelvin, brightness: s.brightness, customColor: s.customColor };
    };

    const host = new EngineHost();
    host.register(new LampEngine());
    host.attach({
      stage: stageRef.current,
      canvas: canvasRef.current,
      dimmer: dimmerRef.current,
    });
    hostRef.current = host;

    // initial mode
    host.setMode(useLumosStore.getState().mode, read());

    // imperative subscription -> repaint without React render
    const unsub = useLumosStore.subscribe((state, prev) => {
      const settings = read();
      if (state.mode !== prev.mode) host.setMode(state.mode, settings);
      else host.update(settings);
    });

    return () => {
      unsub();
      host.dispose();
    };
  }, []);

  return (
    <div className="fixed inset-0 z-0">
      <div ref={stageRef} className="absolute inset-0" />
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />
      <div ref={dimmerRef} className="pointer-events-none absolute inset-0 bg-black" style={{ opacity: 0 }} />
      {/* film grain — kills banding on gradients, reads as physical light */}
      <div className="grain pointer-events-none absolute inset-0" />
    </div>
  );
}
