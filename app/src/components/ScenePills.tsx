import { useLumosStore } from "@/store/useLumosStore";
import { LAMP_PRESETS, presetSwatchColor, type LampPreset } from "@/lib/presets";
import { tween } from "@/lib/tween";
import { cn } from "@/lib/utils";

/** Horizontal row of named scene pills, each previewing its real color. */
export function ScenePills() {
  const selectedPreset = useLumosStore((s) => s.selectedPreset);

  const apply = (p: LampPreset) => {
    const { kelvin, brightness } = useLumosStore.getState();
    useLumosStore.getState().setSelectedPreset(p.id);
    tween(brightness, p.brightness, 450, (b) => useLumosStore.setState({ brightness: b }));
    if (p.custom) {
      useLumosStore.setState({ customColor: p.custom });
    } else if (p.kelvin != null) {
      useLumosStore.setState({ customColor: null });
      tween(kelvin, p.kelvin, 450, (k) => useLumosStore.setState({ kelvin: Math.round(k) }));
    }
  };

  return (
    <div className="-mx-1 flex gap-2 overflow-x-auto px-1 pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
      {LAMP_PRESETS.map((p) => {
        const active = selectedPreset === p.id;
        const color = presetSwatchColor(p);
        return (
          <button
            key={p.id}
            aria-label={p.name}
            aria-pressed={active}
            onClick={() => apply(p)}
            className={cn(
              "flex shrink-0 items-center gap-2 rounded-full border px-3 py-2 text-xs font-medium transition-all duration-200 ease-glide",
              active
                ? "scale-[1.04] border-white/70 bg-white/15 text-white"
                : "border-white/10 bg-white/5 text-white/70 hover:border-white/25 hover:text-white",
            )}
            style={active ? { boxShadow: `0 0 18px ${color}66` } : undefined}
          >
            <span
              className="h-3.5 w-3.5 shrink-0 rounded-full border border-black/20"
              style={{ backgroundColor: color }}
            />
            {p.name}
          </button>
        );
      })}
    </div>
  );
}
