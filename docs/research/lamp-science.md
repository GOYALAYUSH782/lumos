# Research · Lamp & Lighting Science

Grounds our color temperatures, brightness, and presets in real lighting science.

## Color temperature (Kelvin)
Indoor lamp range ≈ **1800K (candle) → 6500K (daylight/D65)**.
- **Warm 1800–3000K** — relax/evening; low blue → melatonin-friendly.
- **Neutral 3500–4500K** — general/reading.
- **Cool/Daylight 5000–6500K** — focus/alertness/video calls.

**Philips Hue scene values** (industry reference): Relax ~2250K, Read ~2900K,
Concentrate ~4350K, Energize ~6400K, Nightlight/Candle ~1800–2000K. Hue's tunable
range is ~2000–6500K.

Bulb labels: Candle ~1800–2000K · Warm/Soft White **2700K** · Neutral 3500–4100K ·
Cool 4000–5000K · Daylight 5000–6500K.

## Brightness / illuminance (lux, EN 12464-1)
- Relax/ambient 50–150 lux · computer work ~300 lux · reading/detail ~500 lux ·
  video-call face ~150–300 lux (vertical).
- Caveat: you do **not** want 500 lux at the screen plane (glare). Treat our
  brightness % as "fraction of panel max," tuned by feel.

## Circadian (melanopic / EML) — the f.lux/Night-Shift idea
- Day: bright + cool (WELL ≥200 EML). Evening (~3h before bed): dim + warm (≤50 EML).
  Night: 2700–3000K, low. → optional future "circadian auto-mode."

## CRI & the emissive-screen caveat
- A monitor is RGB (3 narrow primaries) → poor effective CRI as a *room illuminant*;
  objects lit by it look a bit off, reds especially. Sell it as **ambient/mood/bias**
  light, not color-accurate task light.
- Keep colors **near the black-body curve and slightly desaturated**; pure saturated
  primaries read "nightclub," not "lamp."

## Emissive-screen specifics
- Screens are blue-heavy; **never default to pure `#FFFFFF`** (harsh). Default warm.
- **Dim by lowering displayed RGB values**, not only the OS backlight — keeps the
  panel out of low-brightness PWM-flicker territory.
- Warm + very dim can look "muddy" → mild gamma lift + slight amber bias; grain
  overlay dithers low-end banding.
- Compute tint from Kelvin via **Tanner Helland** black-body approximation (white anchored ~6500K).

## ➡️ Implemented spec (what we shipped)
- **Default: 2700K @ 85%.** Warmth range **1800–6500K**.
- **Brightness:** `mult = 0.06 + 0.94 · slider^2.2` (perceptual, 6% floor), applied
  by scaling RGB. Slight desaturation (~8% toward luma) applied **before** brightness.
- **8 presets** (Kelvin/tint @ brightness): Nightlight 2000K@12% · Candle 1800K@30% ·
  Relax 2250K@50% · Sunset `#ff9d6b`@60% · Reading 2900K@85% · Concentrate 4350K@95% ·
  Video Call 5000K@100% · Daylight 6400K@100%.

## Sources
Lumens & Sunco (Kelvin charts), Hueblog (exact Hue Kelvin), EN 12464-1 (Lena
Lighting / LuxMeterPro), PLOS Biology + WELL (circadian/EML), LED Lighting Supply &
Lumens (CRI), Waveform/MediaLight (D65), Tanner Helland (K→RGB), Display Ninja /
Notebookcheck (PWM flicker).
