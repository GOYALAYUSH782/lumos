# Research · Browser Tech

What's possible in the browser for a fullscreen monitor-light app (verified 2025/2026).
Build **Chromium-first**; degrade gracefully elsewhere.

## Fullscreen API
- `element.requestFullscreen({ screen, navigationUI })` — Baseline. The `screen`
  option (Window Management API) targets a specific monitor.
- Must be triggered by a **user gesture**. Does **not** keep the screen awake on its own.
- `keyboardLock` can capture Esc/F11 (kiosk feel); under lock, Esc needs a long-press — provide a visible Exit.

## Screen Wake Lock API
- `navigator.wakeLock.request("screen")` — the only web way to keep the display on.
- Now supported in all major browsers; secure context only.
- **Auto-released when the tab is backgrounded → re-acquire on `visibilitychange`** (we do this).
- Also advise OS "never sleep when plugged in" for a fixed install.

## Web Audio (Music phase)
- `getUserMedia({audio})` → `AudioContext` → `AnalyserNode`; `getByteFrequencyData`
  (spectrum) / `getByteTimeDomainData` (waveform).
- **Beat detection** is DIY: energy-based on bass bins vs running average (+ refractory
  ~250–350ms), or spectral-flux onset for snares/hats. Reuse one preallocated array; run in rAF.
- Lower `fftSize` (256–512) = lower latency, plenty for visuals. For lowest latency use an AudioWorklet.

## System audio capture (the hard part)
- `getDisplayMedia({audio:true})` sharing a **tab** = clean signal, **Chromium only**.
- Full system audio: Windows/ChromeOS via whole-screen share; macOS only on very
  recent Chrome (141+) / macOS 14.2+. **Firefox drops the audio track; Safari unsupported.**
- → **Mic is the universal fallback.** Reliable system audio = the main reason to consider native/Electron later.

## Window Management API (target the external monitor)
- `window.getScreenDetails()` lists displays; pass the external one to `requestFullscreen({screen})`.
- **Chromium only**, needs a permission prompt. Fallback: user drags window to the monitor, then fullscreen.

## Rendering
- Lamp / slow washes: **CSS** background-color (cheap). Visualizer: **Canvas 2D** first,
  **WebGL fragment shader** if a 4K monitor drops frames. Always `requestAnimationFrame`,
  compositor-friendly props, ease transitions to avoid flicker. Cap canvas `devicePixelRatio`.

## PWA
- Manifest + service worker (we use `vite-plugin-pwa`, `registerType: autoUpdate`) →
  installable, offline. Use the Fullscreen API for true fullscreen (manifest `display` is inconsistent).

## Brightness/color simulation
- No web API for backlight (see [monitor-brightness-control.md](monitor-brightness-control.md)).
  Simulate warmth via Kelvin→RGB; "dim" by scaling RGB. An LCD still leaks backlight, so
  "dark" isn't truly off.

## What needs native (not browser)
1. Reliable cross-OS **system audio** capture.
2. **Monitor selection** outside Chromium.
3. **Real backlight/brightness** control (DDC/CI).
4. Guaranteed kiosk/no-sleep + auto-launch on boot.

## Sources
MDN (Wake Lock, Window Management, requestFullscreen, getDisplayMedia, AnalyserNode),
web.dev (wake lock all browsers), caniuse, Chrome capabilities docs, Firefox bug 1541425.
