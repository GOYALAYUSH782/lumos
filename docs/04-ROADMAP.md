# 04 · Roadmap

Build slowly, polish each phase before the next. Each mode is a self-contained
engine — adding one doesn't touch the others (see [05-ARCHITECTURE](05-ARCHITECTURE.md)).

## ✅ Phase 1 — Lamp (done)
Warmth + brightness + 8 science-based scene pills, liquid-glass UI, reactive aura,
intro, wake lock, fullscreen on chosen monitor, installable PWA, persisted settings.

## ⏳ Phase 2 — Music (next; launches publicly *with* Lamp — the viral hook)
- New `MusicEngine.ts`: Web Audio `AnalyserNode` + energy/spectral-flux beat
  detection. **The logic already works in `prototype/index.html`** — port it.
- Audio source: **mic** (universal) + **tab/system capture** via `getDisplayMedia` (Chromium).
- Canvas 2D scenes first (beat pulse, spectrum bars, frequency wash, beat strobe);
  move to a WebGL fragment shader only if a 4K monitor drops frames. Cap canvas `devicePixelRatio`.
- Sensitivity control. A mode switcher (segmented control) appears now and
  cross-fades the whole field when switching.

## ⏳ Phase 3 — Party
- `PartyEngine.ts`: rainbow flow, breathe, color wash, fireplace, ocean, strobe, random pops, speed.
- **Strobe safety:** one-time flashing warning; "reduce flashing" ON by default
  under `prefers-reduced-motion`; never the default state; cap full-screen flashes ≤3 Hz (WCAG 2.3.1).

## ⏳ Phase 4 — Pro ($12 one-time) + native bridge
- Paywall: no watermark · system-audio reactive · **multi-monitor light wall** · premium scene/party packs.
- **Pure-software "movie mode" bias lighting** — read the main screen's edge colors
  and wash them onto the spare monitor while a movie plays. The standout nobody
  offers without LED hardware.
- **"Lumos Bridge"** native helper: tiny localhost app shelling to `m1ddc` for real
  external-monitor brightness on Apple Silicon. App feature-detects it and shows a
  real hardware slider; falls back to simulation otherwise. See
  [research/monitor-brightness-control.md](research/monitor-brightness-control.md).
- Scheduling / sunrise-alarm as a **free** nicety (not the paywall).
- License unlock via Lemon Squeezy / Gumroad; email capture at the upgrade moment.

## Future-features backlog (unprioritized)
- Circadian auto-mode (cool/bright by day → warm/dim at night, f.lux-style).
- Shareable scenes via URL-encoded presets + a community scene gallery (viral loop).
- Phone-as-remote (control the monitor light from your phone over LAN).
- Custom color picker / hue wheel for the lamp.
- More party scenes, audio-reactive WebGL shader packs.
- Desktop wrap (Tauri/Electron) for reliable cross-OS system audio + real brightness.
- Mac App Store / Microsoft Store distribution (later).
