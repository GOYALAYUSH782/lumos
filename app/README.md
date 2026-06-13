# Lumos (app) — Vite + React + Tailwind + shadcn PWA

Phase 1 = **Lamp**. Music and Party arrive as additional engines (see `ROADMAP.md`).

## Run

```bash
cd app
npm install
npm run dev        # http://localhost:5173  (dev)
# or
npm run build && npm run preview   # http://localhost:8777 (prod build)
```

Open in **Chrome or Edge** for the full feature set (multi-monitor targeting + future system-audio capture). Drag the window onto your spare monitor → **Go fullscreen**. Controls auto-hide after 3.5s; move the mouse (or tap the dot at the bottom) to bring them back.

> Mic / Wake Lock / Window-Management APIs need a secure context — use `localhost` in dev, HTTPS in prod (Vercel/Cloudflare Pages give this free). Don't open the built `index.html` over `file://`.

## Deploy (zero-config static)
- **Vercel:** `vercel` (or import the repo). Build command `npm run build`, output `dist`.
- **Cloudflare Pages / Netlify:** same — build `npm run build`, publish `dist`.

## Architecture (how phases stay clean)
- **React owns the controls; plain-TS "engines" own the pixels.** React never runs on the animation hot path → no flicker.
- `src/surface/` — `Surface.tsx` renders the light field's DOM once; `EngineHost` swaps the active engine; `types.ts` defines the `LightEngine` interface.
- `src/engines/` — one file per mode. `LampEngine.ts` today. **Adding Music/Party = add `MusicEngine.ts` / `PartyEngine.ts` + register it. Nothing else changes.**
- `src/store/` — Zustand store, persisted to `localStorage`. Slider → store → imperative subscription → `engine.update()`.
- `src/components/` — shadcn-style `ui/` primitives + the glass control panel, rails, swatches, intro.
- `src/hooks/` — `useWakeLock` (re-acquires on visibility), `useFullscreen` (Window Management API w/ fallback), `useAutoHide`.

## Phase-1 features
Warmth (warm→cool gradient rail, no Kelvin numbers), brightness (5% floor), 6 preset swatches that glide the light, custom intro warm-up, glass control panel, auto-hide + cursor hide, film grain, wake lock, fullscreen on chosen monitor, installable PWA, `prefers-reduced-motion` respected.
