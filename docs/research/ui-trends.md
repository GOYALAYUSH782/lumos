# Research · UI Trends (2025/2026)

Direction: **the screen IS the product** (the light), so chrome must be quiet, glassy,
and recede until touched. "Trendy + flashy but minimal."

## Trends to use
- **Liquid Glass / glassmorphism** (Apple's 2025 direction, iOS/macOS Tahoe 26): translucent
  panels that refract content behind and **adapt color/contrast to the background** — exactly
  right for a control over an arbitrary-colored light.
- Subtle **noise/grain** over gradients (kills Chrome banding, feels tactile).
- Soft **aura / glow** halos tinted to content.
- Large rounded corners (24–32px), **spring/physics motion**, micro-interactions.
- Bento grouping (lightly). Dark-first.

## Avoid
- Skeuomorphism (fake bulbs/metal), full-screen `backdrop-filter` (GPU cost),
  multicolor gradients on the *chrome* (color belongs to the light), 3D scrollytelling.

## Control panel spec (what we built)
```css
border-radius: 28px; padding: 20px;
background: rgba(22,22,26,0.42);
backdrop-filter: blur(20px) saturate(150%) contrast(105%);
border: 1px solid rgba(255,255,255,0.12);
box-shadow: inset 0 1px 0 rgba(255,255,255,0.35),   /* specular top edge */
            0 1px 1px rgba(0,0,0,0.1), 0 12px 40px rgba(0,0,0,0.4);
will-change: transform; transform: translateZ(0);
```
The `saturate+contrast` + dark-biased fill + dual border keep white text legible over
**both** a blinding white field and a near-black one (the hard problem). We also bias
the glass darker over very bright light (debounced, computed from store RGB).

## Sliders
Fat iOS-Control-Center tracks (~48–52px), drag/tap anywhere, value readout on drag,
spring scale-up while dragging. Warmth = gradient track (warm→cool); brightness = fill bar.

## Presets
**Scene pills** (named + real-color preview), horizontal scroll, selected = ring + aura
in its own color. (Future: optional hue wheel behind a "+" for power users.)

## Typography & color
Inter (variable) now; Geist a nice later option. Tiny **uppercase wide-tracked** labels,
`tabular-nums` for readouts, light weights. **No fixed brand accent — the light is the
color**; chrome stays monochrome glass.

## 5 signature touches
1. Reactive **aura** behind the panel tinted to the current light.
2. Liquid-glass **specular edge** (inset top highlight).
3. A **hero intro** "wake up the light" moment.
4. **Grain** over the light (anti-banding + texture).
5. **Spring everything** + tactile slider lift.

## Sources
Apple Newsroom (Liquid Glass, WWDC25) + HIG Sliders; glassmorphism 2025/2026 guides;
Awwwards trends; Untitled UI / Inter / Geist typography; Framer/Maxime Heckel spring physics.
