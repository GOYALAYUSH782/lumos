import { useLumosStore } from "@/store/useLumosStore";
import { Rail } from "./ui/rail";
import { ScenePills } from "./ScenePills";
import {
  kelvinToWarmth,
  warmthToKelvin,
  lampBaseRGB,
  rgbToCss,
} from "@/lib/color";

const WARMTH_GRADIENT =
  "linear-gradient(90deg, #ff8a3c 0%, #ffd6a5 38%, #fff6ea 58%, #dcebff 100%)";
const BRIGHTNESS_FILL =
  "linear-gradient(90deg, rgba(255,244,224,0.35), rgba(255,250,240,1))";

export function LampControls() {
  const kelvin = useLumosStore((s) => s.kelvin);
  const brightness = useLumosStore((s) => s.brightness);
  const customColor = useLumosStore((s) => s.customColor);
  const setKelvin = useLumosStore((s) => s.setKelvin);
  const setBrightness = useLumosStore((s) => s.setBrightness);
  const setSelectedPreset = useLumosStore((s) => s.setSelectedPreset);

  const thumbColor = rgbToCss(lampBaseRGB(kelvin, customColor));

  return (
    <div className="flex flex-col gap-3">
      <Rail
        value={kelvinToWarmth(kelvin)}
        onChange={(v) => {
          setKelvin(warmthToKelvin(v));
          setSelectedPreset(null);
        }}
        variant="gradient"
        paint={WARMTH_GRADIENT}
        thumbColor={thumbColor}
        ariaLabel="Warmth"
        readout={(v) => `${warmthToKelvin(v)}K`}
      />
      <Rail
        value={brightness}
        onChange={(v) => setBrightness(v)}
        variant="fill"
        paint={BRIGHTNESS_FILL}
        thumbColor="#ffffff"
        ariaLabel="Brightness"
        readout={(v) => `${Math.round(v * 100)}%`}
      />
      <ScenePills />
    </div>
  );
}
