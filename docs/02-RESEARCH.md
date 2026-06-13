# 02 · Research (index + executive summary)

We ran several rounds of parallel deep research (competitor landscape, lighting
science, browser capabilities, monitor brightness control, UI trends) plus
sub-agent reviews of every plan. Full reports with sources are in `research/`:

- [research/competitors.md](research/competitors.md) — existing lamp / music-reactive / bias-lighting products and the market gap.
- [research/lamp-science.md](research/lamp-science.md) — Kelvin, lux, circadian, CRI, screen caveats, and the exact preset/default values.
- [research/browser-tech.md](research/browser-tech.md) — Wake Lock, Fullscreen, Web Audio/FFT/beat detection, Window Management, PWA, what needs native.
- [research/monitor-brightness-control.md](research/monitor-brightness-control.md) — DDC/CI, `m1ddc`, why a browser can't, the helper architecture.
- [research/ui-trends.md](research/ui-trends.md) — Liquid Glass, sliders, scene pills, signature touches.
- [research/reviews.md](research/reviews.md) — the sub-agent reviews (stack, redesign, GTM, design, migration).

## Executive summary
**The gap:** ~40 products surveyed. Lamp tools (Softlight, Tiny Softbox, Apple Edge
Light) are single-purpose and simple. Music-reactive web apps (LuminaParty,
MoodLight, Butterchurn) are VJ toys, not "room lighting." Bias/Ambilight (Hyperion,
Philips Hue, Govee, Nanoleaf) gives the immersive movie glow **but all require buying
LED hardware** — only one tiny hobby repo does it in pure software. **Nobody combines
lamp + music + party in one no-hardware browser app around "your spare monitor."** That's the wedge.

**Browser tech:** Wake Lock, Fullscreen, Web Audio (FFT + beat detection), Window
Management (monitor targeting), and PWA all work in Chromium today. The only weak
spot is reliable cross-browser **system-audio capture** (Chromium-only; mic is the
universal fallback) — the main reason a native/Electron build might come later.

**Brightness:** A browser **cannot** control the real backlight (no API, by design).
Total emitted light = backlight × pixel value; we can only touch pixels. Real control
needs native DDC/CI (`m1ddc`). v1 simulates; a localhost helper is the Phase-4 path.

**Lighting science:** Default **2700K @ 85%**, range **1800K–6500K**. Dim by scaling
RGB (not a black overlay), perceptual curve, slight desaturation, never pure white.
8 presets derived from Philips Hue scene values.

**UI:** Apple's 2025 **Liquid Glass** (a translucent panel that adapts to the color
behind it) is the ideal pattern for a control over an arbitrary-colored fullscreen
light. Fat Control-Center sliders, scene pills, reactive aura, grain, spring motion.
