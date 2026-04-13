# Wakeup Cafe — Design System

## Brand Identity
Late-night burger spot, Islamabad. Urban, bold, edgy, Gen Z. Neon red on black. Built for social media.

## Color Palette
- `--neon-red: #FF0A0A` — primary neon accent, glows
- `--deep-red: #8B0000` — deep red for depth
- `--mid-red: #CC1111` — mid-tone red
- `--black: #000000` — background
- `--dark: #0A0A0A` — near black
- `--charcoal: #111111` — cards/sections
- `--white: #FFFFFF` — headings, text
- `--off-white: #E8E8E8` — body text
- `--muted: #888888` — secondary text

## Typography
- Display/Headlines: "Bebas Neue" — bold condensed, all caps energy
- Accent/Subheadings: "Barlow Condensed" — semi-bold
- Body: "Inter" but loaded from Fontsource for web safety
- Override system: Bebas Neue for all hero text, Barlow for nav/labels

## Spacing & Layout
- Full bleed sections with no padding waste
- Generous hero = 100vh minimum
- Cards: sharp corners, no border-radius on key elements for grit
- Grid: asymmetric 2-col and 3-col layouts

## Motion
- Page load: staggered reveal with translate-y and opacity
- Scroll: GSAP ScrollTrigger fade-up for sections
- Hover: scale + red glow box-shadow on cards
- Header: transparent → solid black on scroll
- Buttons: neon glow pulse on hover

## Neon Glow Effects
- Text glow: `text-shadow: 0 0 20px rgba(255,10,10,0.8)`
- Box glow: `box-shadow: 0 0 30px rgba(255,10,10,0.5), 0 0 60px rgba(255,10,10,0.2)`
- Border glow on cards: `box-shadow: inset 0 0 0 1px rgba(255,10,10,0.3), 0 0 20px rgba(255,10,10,0.1)`

## Checkerboard Pattern
Used as accent dividers and background textures:
```css
background-image: repeating-conic-gradient(#111 0% 25%, #1a0000 0% 50%);
background-size: 40px 40px;
```

## Particles
Floating red particles in hero using canvas/CSS animation — small dots drifting upward.
