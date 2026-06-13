# 08 · Handoff — continue on your personal laptop

This repo is self-contained. Everything you need is here. Below: how to get it onto
your personal GitHub and keep working.

## 0. Prerequisites (personal laptop)
- **Node 18.18+** (built/tested on Node 18.20.5). `package.json` pins `engines.node >=18.18`.
- **git**. Optional: GitHub CLI (`gh`) for one-command repo creation.

## 1. Get the code onto your personal laptop
There are two ways. **Option A (recommended)** keeps your personal GitHub account
off the work machine entirely.

### Option A — git bundle (default)
On the **work machine**, a single portable file `lumos.bundle` is produced (full
history, no `node_modules`). Transfer it to your personal laptop (AirDrop / USB /
cloud), then:

```bash
git clone ~/Downloads/lumos.bundle lumos
cd lumos
git remote remove origin          # origin currently points at the bundle file
# create an EMPTY repo on github.com (private), then:
git remote add origin git@github.com:<your-username>/lumos.git
git push -u origin main
```
Or create the repo with gh: `gh repo create <your-username>/lumos --private --source=. --push`
(after `git remote remove origin`).

Then run it:
```bash
cd app
npm install        # restores node_modules from the public-npm lockfile
npm run dev        # http://localhost:5173 — open in Chrome
```

### Option B — push directly from the work machine
Only if you're comfortable authenticating your personal GitHub on the work device
(`gh auth login` or a PAT). Then create the repo and `git push`. Option A avoids this.

## 2. Important: git identity
The work machine's global git identity is a **corporate email**. This repo's
commits are stamped with a **personal** identity instead. On your personal laptop,
confirm:
```bash
git config user.email    # should be your personal email, not a work one
git config user.name
# if needed: git config user.email "you@personal.com"; git config user.name "Your Name"
```

## 3. Daily workflow (personal laptop)
```bash
cd app
npm run dev                 # develop (Chrome)
npm run build               # type-check + production build (the CI/quality gate)
npm run preview             # serve the production build on :8777
```
Deploy (recommended, gives HTTPS which mic/wake-lock need):
- **Vercel** or **Cloudflare Pages** or **Netlify** — build command `npm run build`, output dir `app/dist` (set the project root to `app/`).

## 4. What's where
- `app/` — the real Vite + React app (Phase 1 Lamp done).
- `prototype/` — original single-file proof-of-concept (reference only; music beat-detection logic to port from here).
- `docs/` — all project knowledge. **Start at [01-STATUS](01-STATUS.md).**

## 5. What to build next
[04-ROADMAP](04-ROADMAP.md) → Phase 2 (Music). [05-ARCHITECTURE](05-ARCHITECTURE.md)
shows exactly how to add an engine. Port beat detection from `prototype/index.html`.

## 6. Notes / gotchas
- The dependency lockfile was re-pointed from an internal mirror to **public npm**;
  `npm install` works on any network. If anything looks off, `rm app/package-lock.json && npm install` regenerates it.
- Secure context required for mic / Wake Lock / Window Management: use `localhost`
  in dev, HTTPS in prod. No `file://`.
- Chrome/Edge desktop is the supported target (see [03-DECISIONS](03-DECISIONS.md) D5).

---

### Appendix — how the bundle was created (for reference)
On the work machine, after a clean `.gitignore` and a scrub for internal references:
```bash
cd ~/Desktop/lumos
git init -b main
git -c user.email="<personal>" -c user.name="<personal>" add -A
git -c user.email="<personal>" -c user.name="<personal>" commit -m "feat: lumos — phase 1 + full docs"
git bundle create ~/Desktop/lumos.bundle --all
git bundle verify ~/Desktop/lumos.bundle
```
