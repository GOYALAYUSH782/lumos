# 03 · Decision Log

Each decision below was made deliberately, most after a sub-agent review (the full
reviews are in [research/reviews.md](research/reviews.md)).

## D1 — Build our own (don't just use an existing tool)
**Why:** Research (see [research/competitors.md](research/competitors.md)) showed nobody
combines lamp + party + music-reactive in one **no-hardware browser** app positioned
around "your spare monitor." Lamp tools are single-purpose; music apps are VJ toys;
bias/Ambilight requires buying LED hardware. That gap is the wedge.

## D2 — Tech stack: Vite + React + TS + Tailwind + shadcn/ui (NOT Next.js)
**Why:** The app is 100% client-side, single-view, canvas/CSS-heavy, with no
SEO-critical content — Next.js's server features buy nothing here and every file
would be `"use client"`. Vite gives the smoothest PWA story (`vite-plugin-pwa`),
trivial static hosting, and keeps React + shadcn (the owner's preference). Add a
separate marketing site or a serverless function later if monetization needs it.
**Reviewed:** frontend-architect agent agreed (Vite over Next).

## D3 — Architecture: React owns controls, TS engines own pixels
**Why:** Driving fullscreen color/canvas animation through React state causes
flicker. One `requestAnimationFrame` lives in the active engine; React never sits
on the animation hot path. Each mode = one engine implementing a shared interface,
so phases are additive. See [05-ARCHITECTURE](05-ARCHITECTURE.md).

## D4 — Phase order: Lamp → Music → Party → Pro
**Why:** Lamp is the searchable utility ("webcam light, no hardware") and the
foundation; Music is the **viral hook** (demos go viral on short-form video).
GTM review said launch Lamp + Music *together* publicly. Party is delight but lower
demand. Pro last.

## D5 — Chrome-only for v1
**Why:** Owner's call + the strongest features (Window Management for monitor
targeting, tab/system-audio capture) are Chromium-only. Mic is the universal
fallback. Don't spread thin.

## D6 — Brightness via RGB scaling, defaults from lighting science
**Why:** The first build felt dark because it dimmed with a **black overlay** on a
low default. We switched to scaling the emitted RGB toward black (cleaner color),
a perceptual ~gamma-2.2 curve, slight desaturation, and never pure white. Default
is now **2700K @ 85%**, range **1800K–6500K**, with 8 Hue-derived presets. See
[research/lamp-science.md](research/lamp-science.md). **Reviewed:** redesign review
corrected the brightness convention (store raw slider value; apply curve in engine
only) and flagged the localStorage-write-on-drag and transition-vs-drag issues —
all fixed.

## D7 — Real monitor brightness control = deferred native helper
**Why:** No browser API can touch the backlight (blocked for security/fingerprinting).
Real control needs native DDC/CI (`m1ddc set luminance N`). For v1 we simulate in
the browser + tell users to max their monitor; a localhost "Lumos Bridge" helper is
a clean optional Phase-4 add-on. See [research/monitor-brightness-control.md](research/monitor-brightness-control.md).

## D8 — Pricing: $12 one-time (freemium), not subscription
**Why:** Impulse/social traffic converts far better at a low one-time price;
subscriptions on a "toy" churn hard. Paywall **vanity/hard features** (no
watermark, system-audio reactive, multi-monitor light wall, premium scene packs,
software "movie mode") — **not** scheduling. See [07-MONETIZATION](07-MONETIZATION.md).
**Reviewed:** indie-founder agent.

## D9 — UI: Apple "Liquid Glass" direction, trendy-minimal
**Why:** A translucent panel that adapts to the color behind it is the perfect 2025
pattern for a control floating over an arbitrary-colored fullscreen light. Fat
Control-Center sliders, scene pills, a reactive aura, grain, spring motion. See
[research/ui-trends.md](research/ui-trends.md). **Reviewed:** product-designer agent.

## D10 — Name: "Lumos"
Owner likes it. **Open risk:** it's a Harry Potter spell — do a trademark check
before any public/commercial launch. Alternatives floated: Glowpane, Lumea, Beamr,
Moodscreen, Lampify.

## D11 — Migrate to personal GitHub, document everything
**Why:** Continue on a personal laptop; the repo is the single source of truth.
Default transfer = git bundle (no personal auth on the work machine). Repo cleaned
of internal references; lockfile re-pointed to public npm. See [08-HANDOFF](08-HANDOFF.md).
**Reviewed:** migration review (caught the corporate-email and internal-registry issues).
