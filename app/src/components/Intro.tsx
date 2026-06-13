import { useEffect, useState } from "react";
import { Maximize2 } from "lucide-react";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";

/**
 * First-run magic: the screen "warms up" to reveal the lamp, the brand fades in,
 * and a single Go-fullscreen action is offered. No settings, no checklist.
 */
export function Intro({ onFullscreen, onDone }: { onFullscreen: () => void; onDone: () => void }) {
  const [phase, setPhase] = useState<"warm" | "show" | "leaving">("warm");

  useEffect(() => {
    const t1 = window.setTimeout(() => setPhase("show"), 1200);
    const t2 = window.setTimeout(() => setPhase("leaving"), 4400);
    const t3 = window.setTimeout(onDone, 5100);
    return () => {
      window.clearTimeout(t1);
      window.clearTimeout(t2);
      window.clearTimeout(t3);
    };
  }, [onDone]);

  return (
    <div
      className={cn(
        "fixed inset-0 z-20 flex flex-col items-center justify-center transition-opacity duration-700",
        phase === "leaving" ? "pointer-events-none opacity-0" : "opacity-100",
      )}
    >
      {/* warm-up veil that fades to reveal the lit screen */}
      <div
        className={cn(
          "absolute inset-0 transition-opacity duration-[1200ms] ease-glide",
          phase === "warm" ? "opacity-100" : "opacity-0",
        )}
        style={{ background: "radial-gradient(circle at 50% 42%, #2a2018, #0d0a08 70%)" }}
      />
      <div
        className={cn(
          "relative flex flex-col items-center text-center transition-all duration-700",
          phase === "warm" ? "translate-y-2 opacity-0" : "translate-y-0 opacity-100",
        )}
      >
        <h1 className="text-5xl font-light tracking-[0.3em] text-white/90">LUMOS</h1>
        <p className="mt-3 text-sm text-white/50">Your screen is now a light.</p>
        <div className="mt-8">
          <Button variant="solid" size="lg" className="breathe" onClick={onFullscreen}>
            <Maximize2 className="h-4 w-4" /> Go fullscreen
          </Button>
        </div>
      </div>
    </div>
  );
}
