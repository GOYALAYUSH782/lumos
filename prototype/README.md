# Lumos — early prototype (reference only)

This folder holds the **original single-file proof-of-concept** that proved the
core ideas work (Kelvin→RGB lamp, Web-Audio beat detection, party loops, wake
lock, fullscreen). **The real product lives in [`../app`](../app)** (Vite + React).
Keep this only as a reference / scratchpad.

## Run it
Browser APIs here (mic, wake lock) need a secure context, so don't open
`index.html` over `file://`. Serve it:

```bash
cd prototype
python3 -m http.server 8000
# open http://localhost:8000
```

## Caveat
The service worker (`sw.js`) is path-scoped. Served from this subfolder it only
controls this subpath — that's expected; the PWA/install story is handled
properly in `../app`, not here.
