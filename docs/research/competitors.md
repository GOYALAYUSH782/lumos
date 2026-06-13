# Research · Competitor Landscape

~40 products surveyed across four categories. Conclusion: **nobody combines lamp +
party + music-reactive in one no-hardware browser app positioned around "your spare
monitor."** That's the wedge.

## 1. Screen-as-lamp (light panel for desk / video calls)
| Product | Type | Notes | Price |
|---|---|---|---|
| Softlight (softlight.tools) | Web | 10 presets, color-temp slider, camera preview, fullscreen | Free |
| ScreenLight | Web + ext | Color adjust, fullscreen | Free |
| whitescreen.online / .dev | Web | Fullscreen white/colored fill light ("Zoom lighting") | Free |
| Light Screen (joshuatz) | Web/PWA | Ring/LED/diffused/solid modes, camera preview, offline | Free, OSS |
| Camo Streamlight | Desktop (Win) | Virtual ring light, 8 presets, HDR/ultrabright, ML auto-tune | Free |
| Apple Edge Light | macOS 26.2+ | Glow border on video calls, warm/cool, auto-on in dark | Free (OS) |
| Tiny Softbox | Mac/iOS | Brightness + Kelvin + filters + presets | $1.99 once |
| Lightbox: Color Screen Light | iOS | Softbox/night/mood/strobe | Free + IAP ($7.99/yr…) |
| f.lux / Lunar / Twinkle Tray / MonitorControl | Desktop | Screen warming / hardware brightness (DDC) — adjacent | Free/cheap |

**Takeaway:** all single-purpose and simple. None offer scheduling, music, party, or
multi-monitor. Strongest free options: Softlight (web), Camo Streamlight (Win).

## 2. Music-reactive / party (audio → visuals)
| Product | Type | Notes | Price |
|---|---|---|---|
| LuminaParty | Web | Mic sync, strobe/disco, multi-phone rooms (WebRTC) | Free |
| MoodLight (.org/.pro) | Web | Mic + webcam, color change, tempo | Free |
| Butterchurn | Web (WebGL) | Winamp MilkDrop port, mic, thousands of presets | Free, OSS |
| audioMotion-analyzer / projectM | Lib/Desktop | Spectrum analyzer / MilkDrop engine | Free, OSS |
| Magic Music Visuals / Synesthesia | Desktop | Pro VJ tools | Paid |
| Strobe/disco phone apps | iOS/Android | Mic-reactive strobe | Free + IAP |
| Philips Hue / Govee / Nanoleaf / LIFX music sync | Smart lights | Beat sync via on-device mic / HDMI / streaming | App free, hardware $$ |

**Technical approach (for our Music phase):** `getUserMedia` (mic) or
`getDisplayMedia` (tab/system audio, Chromium) → `AnalyserNode` → `getByteFrequencyData`
→ map bands to color; layer energy/spectral-flux **beat detection** on the bass bins.
Desktop apps use OS loopback (WASAPI / BlackHole) for clean system audio.

## 3. Bias lighting / Ambilight (the immersive "TV glow")
| Product | Type | Hardware needed |
|---|---|---|
| Hyperion / HyperHDR / Prismatik / AmbiBox / Glimmr / WLED | OSS software | Yes — LED strip + controller |
| Philips Hue Sync (desktop / HDMI Sync Box / TV app) | App + hardware | Hue bulbs + bridge (+$229 box) |
| Govee Envisual / DreamView | Kit | Camera + LED strip ($120–200) |
| Nanoleaf 4D / Screen Mirror | Kit | Camera / lightstrip |
| **AmbientMonitor** | OSS | **None — renders ambient on a 2nd monitor** (closest to our idea; tiny hobby repo) |

**Takeaway:** the immersive movie experience exists but is **gated behind buying LED
hardware**. Pure-software second-screen ambient is essentially an empty niche — our
Phase-4 "movie mode" is a genuine differentiator.

## Sources
Softlight, whitescreen.online, github.com/joshuatz/light-screen, camo.com/streamlight,
Apple support 125934, LuminaParty (prapan.is-a.dev/Party), moodlight.org,
github.com/jberg/butterchurn, github.com/projectM-visualizer/projectm,
philips-hue.com, us.govee.com, nanoleaf.me, github.com/hyperion-project/hyperion,
github.com/awawa-dev/HyperHDR, github.com/CasketPizza/AmbientMonitor.
