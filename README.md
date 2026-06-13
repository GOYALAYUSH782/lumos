# ◐ Lumos — your monitor is now a light

Turn a spare monitor into a **lamp**, a **music-reactive light**, or **party lights** —
in the browser, with **no LED hardware**. Connect a laptop to a screen you already
own and give it a second life.

> Status: **Phase 1 (Lamp) built & working.** Next: Phase 2 (Music). See [`docs/01-STATUS.md`](docs/01-STATUS.md).

## Quickstart
```bash
cd app
npm install
npm run dev      # http://localhost:5173 — open in Chrome
```
Drag the window onto your spare monitor → **Go fullscreen**. Controls auto-hide; move
the mouse (or tap the dot) to bring them back. (Mic/Wake-Lock need a secure context —
use `localhost` in dev, HTTPS in prod; don't open over `file://`.)

## What it does (Phase 1)
A warm/cool **lamp**: warmth slider (1800K–6500K), brightness, 8 science-based scene
presets, liquid-glass controls, reactive aura, wake lock, fullscreen on a chosen
monitor, installable PWA — colors grounded in real lighting science.

## Repo map
```
app/         The real product — Vite + React + TS + Tailwind + shadcn PWA
prototype/   Original single-file proof-of-concept (reference only)
docs/        ALL project knowledge — start at docs/01-STATUS.md
```

## Docs (read these)
- [00-VISION](docs/00-VISION.md) · [01-STATUS](docs/01-STATUS.md) (start here) · [02-RESEARCH](docs/02-RESEARCH.md)
- [03-DECISIONS](docs/03-DECISIONS.md) · [04-ROADMAP](docs/04-ROADMAP.md) · [05-ARCHITECTURE](docs/05-ARCHITECTURE.md)
- [06-TESTING](docs/06-TESTING.md) · [07-MONETIZATION](docs/07-MONETIZATION.md) · [08-HANDOFF](docs/08-HANDOFF.md)
- Long-form research: [docs/research/](docs/research/)

## Stack
Vite · React · TypeScript · Tailwind · shadcn/ui · Zustand · vite-plugin-pwa.
Chrome-first. Client-only (no backend yet). Deploy as a static site (Vercel/Cloudflare Pages).

## Tech notes
- A browser **can't** control real monitor backlight — Lumos simulates brightness via
  the pixels; for a brighter lamp, set the monitor's own brightness to max. Real
  hardware control is a planned native helper ([docs/research/monitor-brightness-control.md](docs/research/monitor-brightness-control.md)).
- Name "Lumos" — do a trademark check before any public launch.

_Personal project. See [LICENSE](LICENSE) (all rights reserved)._
