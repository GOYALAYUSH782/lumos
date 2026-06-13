# Research · Sub-agent Reviews (summary + verdicts)

Every plan was reviewed by an independent sub-agent before building. Summaries below;
each verdict's concrete fixes were applied.

## Stack/plan reviews (3, before first build)
**Frontend architect** — Recommended **Vite + React + TS + Tailwind + shadcn** over
Next.js (client-only, single-view, canvas-heavy; Next's server features buy nothing;
Vite's PWA story is smoother; trivial static hosting). Prescribed the **engine
architecture** (React owns controls, one rAF in the active engine, store→subscription→
engine, React never on the hot path). → adopted wholesale.

**Indie founder (GTM)** — Launch **Lamp + Music together** (music is the viral hook);
**$12 one-time, not subscription**; paywall vanity/hard features, **not scheduling**;
short-form video is the engine, PH/HN/Reddit are backlink spikes; treat success as
audience, revenue as bonus. → folded into [07-MONETIZATION](../07-MONETIZATION.md).

**Product designer** — Light-first first-run; **no mode tabs in Phase 1**; warmth as a
**gradient rail** (no Kelvin numbers), brightness floor so you don't lose controls in
the dark; presets as **color swatches/pills**; grain, eased motion, cursor hide,
strobe safety. → folded into the UI.

## Redesign review (before the Phase-1 rebuild). Verdict: **proceed-with-changes**
Key catches, all fixed:
- **Brightness convention:** store the **raw slider value**; apply
  `mult = 0.06 + 0.94·s^2.2` in the **engine only**; drop the black overlay (RGB-scale
  instead — the win is color fidelity, not "more light"; PWM is a backlight property).
- **Operation order:** kelvin/custom → **desaturate** (~8%, both branches) → brightness → round.
- **Persistence jank:** Zustand `persist` was writing localStorage every drag frame →
  **throttle** writes + flush on hide.
- **Transition vs drag:** a 600ms color transition fights 1:1 drag → remove it; preset
  glides come from the rAF tween instead.
- Reconcile `KELVIN_MIN`→1800 and the canonical 8 presets; cap blur at 20px; avoid
  double-blur (aura is a radial-gradient, color-only); compute glass luminance from
  store RGB (never `getImageData`), apply on settle; keep drag state local to the slider.

## Migration review (this handoff). Verdict: **proceed-with-changes**
Critical catches, all handled:
- **Corporate git identity** (a work email) would be baked into commits → commit with
  **personal** identity; this is a blocking input.
- **`package-lock.json` resolved to an internal corporate npm registry** → rewritten to
  **public npm** (integrity hashes identical).
- `git init -b main`; bundle only **after** a commit; `git bundle verify`; on the
  personal laptop `git remote remove origin` before adding GitHub.
- Expand `.gitignore` (`*.tsbuildinfo`, `dev-dist/`, generated `vite.config.js/.d.ts`, `.env*`).
- Run a **concrete scrub grep** before the first commit; assert `~/.claude` is out of scope.
- Default the GitHub repo to **private**; pin Node version; land long-form research +
  reviews as real files; add a LICENSE.
