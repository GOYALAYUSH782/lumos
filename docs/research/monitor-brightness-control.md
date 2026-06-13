# Research · Monitor Brightness Control (macOS)

**Verdict: a Chrome web app cannot control an external monitor's hardware backlight.
There is no browser API and there won't be one** (blocked as a fingerprinting / power /
annoyance vector). Real control = a **native process**. For v1 we simulate; a native
helper is the Phase-4 path.

## Why (the physics)
LCD light out = **backlight intensity × pixel transmittance**. The browser only
controls the pixel term. So emitting full white on a dimmed backlight still looks dim —
for a bright lamp the **backlight** must be up, which only native code (or the monitor's
own buttons) can change.

## How native apps do it
- **External monitors → DDC/CI over I2C**, VCP feature `0x10` (brightness). Vendor-neutral.
- **MacBook built-in display → private Apple frameworks** (DisplayServices / CoreDisplay), not DDC.
- Apple Silicon vs Intel differ; many USB-C hubs / DisplayLink / KVMs **strip the DDC
  channel** → control silently fails (the #1 real-world failure mode).

## Tools (for the future helper)
- **`m1ddc`** (Apple Silicon, USB-C/DP):
  ```bash
  brew install m1ddc
  m1ddc set luminance 80      # 0–100
  m1ddc get luminance
  m1ddc display list
  m1ddc display 1 set luminance 100
  ```
- `ddcctl` (Intel): `ddcctl -d 1 -b 80`
- `betterdisplaycli` (all Macs incl. built-in; BetterDisplay must run): `betterdisplaycli set --brightness=80%`
- Lunar / MonitorControl / BetterDisplay (apps) wrap DDC + private APIs.

## Architecture to bridge web → hardware ("Lumos Bridge", Phase 4)
Recommended: a **tiny local helper** (menu-bar app / small daemon) on `http://localhost:PORT`
that the web page calls; it shells to `m1ddc`. The app **feature-detects** the helper
and shows a real hardware-brightness slider when present, else falls back to
simulation. (Mixed-content note: call `http://localhost` from the page, or a WS loopback.)

Alternatives considered: Chrome Native Messaging (extension + native host — two install
artifacts, more friction); repackage as **Tauri/Electron** with a bundled DDC module
(most reliable, but it's now an app, not "just a website" — the right move if real
control becomes a hard requirement). WebUSB/WebHID do **not** help (the DDC channel
isn't an enumerable USB/HID endpoint).

## v1 decision
Ship browser simulation (RGB scaling) + Wake Lock + a dismissible onboarding tip:
**"For the brightest lamp, set your monitor's own brightness to max."** Add the
`m1ddc` localhost helper later as an optional power-user upgrade.

## Sources
github.com/waydabber/m1ddc · lunar.fyi · github.com/MonitorControl/MonitorControl ·
github.com/waydabber/BetterDisplay · alinpanaitiu.com (DDC on M1) ·
WebKit standards-positions #19 (screen brightness) · Chromium screen_brightness docs.
