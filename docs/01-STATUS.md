# 01 · Status (start here)

_Last updated: 2026-06-13. This is the living handoff dashboard — update it as you go._

## Where things stand
**Phase 1 (Lamp) is built and working**, redesigned once after review. The app
builds clean (`npm run build`) and runs via `npm run dev`. The project now lives on
personal GitHub at **https://github.com/GOYALAYUSH782/lumos** (public). Next up is Phase 2 (Music).

## ✅ Done
- Project scaffolded: **Vite + React + TS + Tailwind + shadcn-style** PWA, deployable as static site.
- **Engine architecture** in place (React owns controls; TS "engines" own pixels). See [05-ARCHITECTURE](05-ARCHITECTURE.md).
- **Phase 1 — Lamp**, v2 (post-redesign):
  - Warmth slider (1800K–6500K), brightness slider, **8 science-based presets** (scene pills).
  - Brightness via **RGB scaling** (not a black overlay), perceptual curve, slight desaturation, never pure `#FFFFFF`.
  - **Liquid-glass** control panel, reactive **aura** glow, grain texture, value-on-drag readouts, adaptive glass over bright light.
  - Intro "warm-up" moment, auto-hide controls + nub, cursor hide.
  - **Wake Lock** (re-acquires on visibility), **Fullscreen** (Window Management API to target external monitor, with fallback), installable PWA.
  - Settings persisted (throttled localStorage so drags don't thrash disk).
  - Dismissible "set your monitor to max brightness" tip.
- Full research + decisions + reviews documented (see [02-RESEARCH](02-RESEARCH.md), [03-DECISIONS](03-DECISIONS.md)).
- Repo prepared for personal GitHub: cleaned of internal references, lockfile re-pointed to public npm, `.gitignore`, LICENSE, docs.

## 🔄 In progress
- (nothing — migration to personal GitHub is complete)

## ⏳ Pending / next
- **Phase 2 — Music** (the viral hook; should launch publicly alongside Lamp). Beat detection already proven in `prototype/index.html`.
- **Phase 3 — Party**.
- **Phase 4 — Pro** features + **"Lumos Bridge"** native helper for real DDC/CI brightness control (`m1ddc`).
- **Deploy** to Vercel/Cloudflare Pages (gets HTTPS, which the mic/wake-lock APIs require).
- Decide final **name / trademark** check.
- Set up **analytics** (Plausible) and the **Pro paywall** stub (Lemon Squeezy / Gumroad).

## ⛔ Known limitations / open questions
- A browser **cannot** control real monitor backlight — only simulate via pixels. Real control needs the native helper (Phase 4).
- **Chrome/Edge only** for the strongest features (Window Management, tab/system audio). Mic is the universal fallback.
- Name "Lumos" needs a trademark check.

## Quick links
- Run/continue: [08-HANDOFF](08-HANDOFF.md)
- What to build next & how: [04-ROADMAP](04-ROADMAP.md) + [05-ARCHITECTURE](05-ARCHITECTURE.md)
- Why decisions were made: [03-DECISIONS](03-DECISIONS.md)
- Make money: [07-MONETIZATION](07-MONETIZATION.md)
