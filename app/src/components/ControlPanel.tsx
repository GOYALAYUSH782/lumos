import { useEffect, useState } from "react";
import { Maximize2, Minimize2 } from "lucide-react";
import { useAutoHide } from "@/hooks/useAutoHide";
import type { FullscreenApi } from "@/hooks/useFullscreen";
import { useLumosStore } from "@/store/useLumosStore";
import { lampBaseRGB, applyBrightness, rgbToCss, relLuminance } from "@/lib/color";
import { LampControls } from "./LampControls";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";

export function ControlPanel({ fullscreen }: { fullscreen: FullscreenApi }) {
  const visible = useAutoHide();
  const kelvin = useLumosStore((s) => s.kelvin);
  const brightness = useLumosStore((s) => s.brightness);
  const customColor = useLumosStore((s) => s.customColor);
  const hintDismissed = useLumosStore((s) => s.hintDismissed);
  const dismissHint = useLumosStore((s) => s.dismissHint);

  const base = lampBaseRGB(kelvin, customColor);
  const auraColor = rgbToCss(base);
  const emittedLum = relLuminance(applyBrightness(base, brightness));

  // Adaptive glass: bias darker over very bright light so white text stays
  // legible. Debounced so we don't restyle the backdrop-filtered panel mid-drag.
  const [overBright, setOverBright] = useState(false);
  useEffect(() => {
    const id = window.setTimeout(() => setOverBright(emittedLum > 0.62), 160);
    return () => window.clearTimeout(id);
  }, [emittedLum]);

  return (
    <>
      {/* reactive aura — color-only changes, no backdrop-filter */}
      <div
        aria-hidden
        className={cn(
          "pointer-events-none fixed bottom-0 left-1/2 z-[5] h-[340px] w-[680px] max-w-[100vw] -translate-x-1/2 translate-y-1/4",
        )}
        style={{
          background: `radial-gradient(50% 50% at 50% 60%, ${auraColor}, transparent 70%)`,
          filter: "blur(50px)",
          opacity: visible ? 0.55 : 0,
          transition: "opacity 500ms ease, background 500ms ease",
        }}
      />

      <div
        className={cn(
          "fixed bottom-6 left-1/2 z-10 w-[min(420px,calc(100vw-28px))] -translate-x-1/2 transition-all duration-500 ease-glide",
          visible ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-3 opacity-0",
        )}
      >
        {!hintDismissed && (
          <button
            onClick={dismissHint}
            className="mx-auto mb-2 block max-w-full rounded-full bg-black/45 px-3 py-1.5 text-[11px] text-white/70 backdrop-blur transition-colors hover:text-white"
          >
            💡 For the brightest lamp, set your monitor's own brightness to max · tap to dismiss
          </button>
        )}

        <div className={cn("glass rounded-[28px] px-5 pb-4 pt-3", overBright && "glass-bright")}>
          <div
            className="mb-3 text-center text-[10px] font-semibold uppercase tracking-[0.24em] text-white/55"
            style={{ textShadow: "0 1px 2px rgba(0,0,0,0.45)" }}
          >
            Lumos
          </div>

          <LampControls />

          <div className="mt-3 flex justify-center">
            <Button
              variant="glass"
              size="lg"
              onClick={() => fullscreen.toggle(fullscreen.canChooseMonitor)}
            >
              {fullscreen.isFullscreen ? (
                <>
                  <Minimize2 className="h-4 w-4" /> Exit
                </>
              ) : (
                <>
                  <Maximize2 className="h-4 w-4" /> Go fullscreen
                </>
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* persistent nub: where to summon controls when hidden */}
      {!visible && (
        <div className="fixed bottom-3 left-1/2 z-10 h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-white/40" />
      )}
    </>
  );
}
