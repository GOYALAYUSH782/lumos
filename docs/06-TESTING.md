# 06 · Testing Plan

No automated tests yet (Phase 1 is small + highly visual). The gate today is
**build + manual QA**. Automated tests are planned as the app grows.

## Gate before any commit/deploy
```bash
cd app
npm run build      # tsc -b + vite build must pass clean (strict TS, noUnusedLocals)
```
The build is the type/lint gate (TS strict mode is on). If it builds, types are sound.

## Manual QA checklist — Phase 1 (Lamp)
Run `npm run dev`, open in **Chrome**:
- [ ] Intro warm-up plays; "Go fullscreen" works; intro dismisses.
- [ ] Warmth slider drags 1:1, light tracks instantly, readout shows Kelvin.
- [ ] Brightness slider: light scales smoothly; never goes fully black at the low end.
- [ ] All 8 scene pills apply and **glide** (warmth + brightness animate); selected ring shows.
- [ ] Controls auto-hide after ~3.5s; cursor hides; nub visible; move mouse → controls return.
- [ ] Fullscreen targets the **external** monitor (Chrome permission prompt) and falls back gracefully.
- [ ] Screen stays awake (wake lock); re-acquires after tab switch.
- [ ] Reload keeps last settings (persistence); brightness tip dismiss is remembered.
- [ ] Glass panel readable over BOTH worst cases: **6500K @ 100%** (bright) and **1800K @ 6%** (dark).
- [ ] Install as PWA from Chrome address bar.

## Browser / device matrix
- **Primary:** Chrome/Edge desktop on macOS. This is the supported target.
- Safari/Firefox: lamp should still work; monitor-targeting + tab-audio won't (expected, documented).
- Test on the actual external monitor, ideally 4K, for performance + the "feels like a lamp" check.

## Accessibility / safety
- Honor `prefers-reduced-motion` (intro overshoot, grain, long fades collapse).
- Phase 3 strobe: ≤3 Hz cap (WCAG 2.3.1), one-time warning, reduce-flashing default on.
- Slider keyboard support (arrows); aria roles present.

## Future automated tests (when worth it)
- **Vitest** units for `lib/color.ts` (kelvin→RGB anchors, brightness curve monotonic + floor, warmth↔kelvin round-trip).
- **Vitest** for store reducers + preset application.
- **Playwright** smoke: app loads, slider changes background color, fullscreen invoked, no console errors.
- Per-phase: MusicEngine beat-detection unit tests on a known PCM buffer; PartyEngine strobe-rate cap test.

## Performance checks
- Slider drag holds ~60fps (no jank from backdrop-filter re-blur or localStorage writes — both already mitigated).
- Music/Party (later): profile full-canvas redraw on a 4K external display; drop to WebGL if needed.
