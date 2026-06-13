import { useCallback, useRef, useState } from "react";
import { clamp } from "@/lib/color";
import { cn } from "@/lib/utils";

interface RailProps {
  value: number; // 0..1
  onChange: (v: number) => void;
  /** "gradient": whole track shows a spectrum, thumb marks position (warmth).
   *  "fill": track fills left→right to show amount (brightness). */
  variant: "gradient" | "fill";
  /** CSS background for the gradient track or the fill bar. */
  paint: string;
  thumbColor: string;
  ariaLabel: string;
  /** Formats the value into the on-drag readout, e.g. v => "2700K". */
  readout: (v: number) => string;
}

/** Fat iOS-Control-Center-style slider: tap/drag anywhere, value readout on drag. */
export function Rail({ value, onChange, variant, paint, thumbColor, ariaLabel, readout }: RailProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [dragging, setDragging] = useState(false);

  const setFromX = useCallback(
    (clientX: number) => {
      const el = trackRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      onChange(clamp((clientX - rect.left) / rect.width, 0, 1));
    },
    [onChange],
  );

  const onPointerDown = (e: React.PointerEvent) => {
    (e.target as Element).setPointerCapture?.(e.pointerId);
    setDragging(true);
    setFromX(e.clientX);
  };
  const onPointerMove = (e: React.PointerEvent) => dragging && setFromX(e.clientX);
  const onPointerUp = (e: React.PointerEvent) => {
    setDragging(false);
    (e.target as Element).releasePointerCapture?.(e.pointerId);
  };
  const onKeyDown = (e: React.KeyboardEvent) => {
    const step = e.shiftKey ? 0.1 : 0.02;
    if (e.key === "ArrowLeft" || e.key === "ArrowDown") {
      onChange(clamp(value - step, 0, 1));
      e.preventDefault();
    } else if (e.key === "ArrowRight" || e.key === "ArrowUp") {
      onChange(clamp(value + step, 0, 1));
      e.preventDefault();
    }
  };

  const pct = value * 100;

  return (
    <div
      ref={trackRef}
      role="slider"
      aria-label={ariaLabel}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={Math.round(pct)}
      tabIndex={0}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onKeyDown={onKeyDown}
      className={cn(
        "relative h-12 w-full cursor-pointer touch-none overflow-hidden rounded-2xl outline-none transition-transform duration-150 ease-glide focus-visible:ring-2 focus-visible:ring-white/40",
        dragging && "scale-[1.03]",
      )}
      style={{
        background: variant === "gradient" ? paint : "rgba(255,255,255,0.08)",
        boxShadow: "inset 0 1px 1px rgba(0,0,0,0.25), inset 0 0 0 1px rgba(255,255,255,0.07)",
      }}
    >
      {/* brightness fill */}
      {variant === "fill" && (
        <div
          className="absolute inset-y-0 left-0 rounded-2xl"
          style={{
            width: `${pct}%`,
            background: paint,
            boxShadow: "inset 0 1px 0 rgba(255,255,255,0.4)",
          }}
        />
      )}

      {/* thumb */}
      <div
        className="pointer-events-none absolute top-1/2 h-9 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          left: `${pct}%`,
          backgroundColor: thumbColor,
          boxShadow: "0 0 10px rgba(255,255,255,0.6), 0 1px 3px rgba(0,0,0,0.4)",
          border: "1px solid rgba(255,255,255,0.85)",
        }}
      />

      {/* on-drag readout */}
      <div
        className={cn(
          "pointer-events-none absolute -top-1 -translate-x-1/2 rounded-md bg-black/55 px-2 py-0.5 text-[11px] font-semibold tabular-nums text-white/90 backdrop-blur transition-opacity duration-150",
          dragging ? "opacity-100" : "opacity-0",
        )}
        style={{ left: `${clamp(value, 0.06, 0.94) * 100}%`, top: "-26px" }}
      >
        {readout(value)}
      </div>
    </div>
  );
}
