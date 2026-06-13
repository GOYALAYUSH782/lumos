# 00 · Vision

## The idea
Turn a **spare monitor into a light**. Most people have an extra monitor on the
desk that sits unused much of the time. Connect a laptop to it, open Lumos, and
the screen becomes:

1. **A lamp** — a warm/cool adjustable light for the desk, reading, or a video-call key light.
2. **Party lights** — animated color washes / strobe for a room.
3. **A music-reactive light** — listens to whatever music is playing and pulses the screen in rhythm.

The inspiration is the immersive lighting people add behind a TV (Philips
Ambilight, Govee, Nanoleaf) and colored smart bulbs that change with the
moment — but with **no hardware to buy**: the monitor you already own becomes the
light. Because monitors are large and high-quality, one spare screen can play
many roles at different times.

## Owner's intent (the brief, captured)
- **Slow, deliberate rollout.** Ship one thing at a time, polished: website → lamp → music → party → more. Don't dump everything at once.
- **Beautiful, intuitive, minimal UI** — but also **trendy and a little flashy** (current 2025/2026 aesthetic). The light itself is the hero; controls recede.
- **Tech**: a website that's easy to host and easy to play with. React-based (shadcn/ui) was the preference; plain HTML/CSS/JS acceptable if better. (We landed on Vite + React — see [03-DECISIONS](03-DECISIONS.md).)
- **Chrome-only** for the initial launch (don't spread thin across browsers).
- **Real monitor brightness control** is desired (like macOS apps that dim an external display). Reality and plan documented in [research/monitor-brightness-control.md](research/monitor-brightness-control.md).
- **Monetization is a goal** — the owner wants a real plan for how/where to make money (see [07-MONETIZATION](07-MONETIZATION.md)).
- **Name**: **Lumos** (owner likes it; trademark caveat noted — it's a Harry Potter spell).
- Each decision/plan should be **reviewed by another agent** before building, and **everything documented** so work can continue from the repo alone.

## What success looks like
- A free, no-hardware web app that genuinely replaces "I need a light / ring light / mood light right now."
- A clear, viral-friendly demo (music mode) that drives traffic.
- A small but real revenue stream from a Pro tier, and an audience/portfolio asset.

## Non-goals (for now)
- Not a multi-browser product at launch (Chrome-first).
- Not an LED-hardware ecosystem (that's what we're undercutting).
- Not a venture-scale company — a polished, monetizable indie product.
