# 05 · Architecture

## Core principle
**React owns the controls; plain-TS "engines" own the pixels.** React must never
sit on the animation hot path or you get flicker. Data flows:

```
slider/preset (React) → Zustand store → imperative subscription → engine.update() → paint
```

The light surface DOM is rendered by React exactly **once**; engines mutate it
imperatively after that. Slider drags repaint the light without re-rendering React.

## File map (`app/src/`)
```
main.tsx                 React entry
App.tsx                  composes Surface + ControlPanel + Intro; wires wake lock + fullscreen
index.css                Tailwind + .glass / .grain / .breathe + reduced-motion

surface/
  types.ts               LightEngine interface, Surface (the DOM handles), EngineSettings
  Surface.tsx            renders #stage / #viz(canvas) / #dimmer / grain ONCE; subscribes store → engine
  EngineHost.ts          registers engines; swaps the active one on mode change; forwards updates

engines/
  LampEngine.ts          Phase 1. kelvin/custom → desaturate → brightness-scale → paint. No rAF.
  (MusicEngine.ts)       Phase 2 — add here
  (PartyEngine.ts)       Phase 3 — add here

store/
  useLumosStore.ts       Zustand + persist (throttled localStorage). Single source of truth.

lib/
  color.ts               kelvinToRGB (Tanner Helland), lampBaseRGB (desaturate),
                         applyBrightness (perceptual curve + floor), warmth<->kelvin, relLuminance
  presets.ts             the 8 lamp scenes
  tween.ts               eased value tween (preset glides)
  utils.ts               cn()

components/
  ControlPanel.tsx       glass panel, reactive aura, adaptive glass, hint, fullscreen btn, auto-hide
  LampControls.tsx       the two rails + scene pills
  ScenePills.tsx         preset chips
  ui/rail.tsx            fat slider (gradient/fill variants, drag readout, local drag state)
  ui/button.tsx          shadcn-style button
  Intro.tsx              first-run warm-up moment

hooks/
  useWakeLock.ts         request + re-acquire on visibilitychange
  useFullscreen.ts       requestFullscreen (Window Management API target, with fallback)
  useAutoHide.ts         reveal on activity, hide + cursor-hide after idle
```

## The `LightEngine` interface (how to add a mode)
```ts
interface LightEngine {
  readonly id: "lamp" | "music" | "party";
  start(surface: Surface, settings: EngineSettings): void;
  update(settings: EngineSettings): void;
  stop(): void;
}
```
To add **Music**: create `engines/MusicEngine.ts` implementing this (it owns its own
`AudioContext` + canvas `requestAnimationFrame`), register it in `Surface.tsx`
(`host.register(new MusicEngine())`), add `music` controls + a mode switcher. The
host calls `stop()` on the old engine and `start()` on the new — nothing else changes.

## The color/brightness pipeline (important)
Fixed order, all in `lib/color.ts`:
1. `kelvin → RGB` (Tanner Helland) **or** custom hex.
2. **Desaturate** ~8% toward luma (`lampBaseRGB`) — brightness-independent, so dim and
   bright presets share the same hue. A screen's narrow RGB primaries look "sickly"
   otherwise.
3. **Brightness**: `mult = 0.06 + 0.94 · slider^2.2` (`applyBrightness`) — perceptual,
   with a 6% emitted-light floor so the screen never goes fully black (you'd lose the controls).
4. Round to 8-bit, write to the stage background.

`brightness` in the store is the **raw 0..1 slider value**; the curve lives only in
the engine. The grain overlay doubles as dithering against low-end banding.

## State & persistence
Zustand store with a **throttled localStorage** wrapper (coalesces writes to ~once
per 500ms + flush on page hide) — because slider drags call `set()` 60–120×/sec and
synchronous `localStorage` writes every frame caused jank. Persist `version: 2`
(brightness changed meaning from emitted→raw slider; old data migrates to defaults).

## Performance notes (Chrome)
- Only the small panel uses `backdrop-filter` (blur 20). Never blur the full screen.
- The reactive aura is a radial-gradient div (color-only transitions) — no backdrop-filter.
- Adaptive-glass luminance is computed from store RGB (never `getImageData`) and applied
  debounced on settle, not per drag frame.
- Lamp paints on change only (no rAF). Music/Party will each own one rAF while active.
