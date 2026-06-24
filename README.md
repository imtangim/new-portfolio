# MD Tangim Haque — Portfolio

A premium, animated single-page developer portfolio built with Next.js 15, TypeScript, Tailwind CSS, Framer Motion, GSAP, and Lenis smooth scrolling.

## Design system

- **Colors:** `#fffefc` (paper), `#000000` (ink), `#D90429` (signal red) — no other colors used anywhere in the UI.
- **Type:** Space Grotesk (display), Inter (body), JetBrains Mono (labels/data). See "Fonts" below — the build ships with system-font fallbacks so it compiles with zero network calls; swap in the real webfonts for production.
- **Motion:** Lenis-driven smooth scroll, GSAP ScrollTrigger for scroll-linked reveals, Framer Motion for UI micro-interactions, a custom cursor follower, and a film-grain overlay. Everything respects `prefers-reduced-motion`.

## Project structure

```
app/
  layout.tsx          Root layout, metadata, global providers
  page.tsx            Section orchestration + loading screen
  globals.css         Design tokens, cursor, grain, scrollbar, reduced-motion
components/
  Navbar.tsx
  Footer.tsx
  LoadingScreen.tsx     Cinematic intro counter (0→100%)
  ScrollProgress.tsx    Top progress bar
  CursorFollower.tsx    Custom dot + ring cursor with hover state
  GrainOverlay.tsx
  SmoothScrollProvider.tsx   Lenis setup
  sections/
    Hero.tsx           3D-feeling portrait, parallax, ambient glow
    Intro.tsx          Word-by-word reveal, growing red line, profile swap
    About.tsx          Animated bento grid with magnetic hover cards
    Skills.tsx         Orbital skill ring + animated proficiency bars
    Experience.tsx     Horizontal timeline with scroll-linked line draw
    Projects.tsx       Tilt project cards, device mockup panels
    Achievements.tsx   Dark "trophy" section, cinematic reveal
    Contact.tsx        Animated form + magnetic contact links
hooks/
  useInView.ts          IntersectionObserver-based reveal hook
public/assets/
  images/               Portrait photography (duotone-treated), textures
  svg/                  Line-art accents (rings, grid, glow line)
  MD-Tangim-Haque-Resume.pdf
```

## About the portrait assets

Two source photos were supplied: a front-facing shot taken in front of a busy patterned background, and a side-profile shot that already had a clean transparent background.

- The **side profile** is genuinely clean and is used as-is (converted to a black/white duotone matching the brand palette) as the hero's signature portrait.
- The **front-facing photo's background could not be cleanly removed** in this build environment (no network access to background-removal models), so rather than ship a rough cutout, it's used with a duotone + soft vignette fade — an intentional art-directed treatment instead of a flawed mask. It appears in the About section and the profile-swap moment in the Intro section.

If you have access to a proper background-removal tool (remove.bg, Photoshop, or `rembg` with internet access), you can swap `about-portrait.png` for a true cutout version any time — the component just expects a PNG at that path.

## Fonts

The build ships with safe system-font fallbacks (`--font-display`, `--font-body`, `--font-mono` CSS variables in `globals.css`) so `npm run build` works with **no external network calls**. To use the real webfonts in production, do either of:

1. Uncomment the Google Fonts `@import` at the top of `app/globals.css`, or
2. Switch back to `next/font/google` in `app/layout.tsx` (the variable names are already wired up).

## Getting started

```bash
npm install
npm run dev      # http://localhost:3000
```

## Build & deploy

```bash
npm run build
npm run start     # serve the production build locally
```

### Deploying

**Vercel (recommended — zero config):**
```bash
npm i -g vercel
vercel
```

**Any Node host:** run `npm run build` then `npm run start` behind your process manager of choice (PM2, systemd, etc).

**Static export:** this project uses client components with browser APIs (IntersectionObserver, mouse events) but no server-only features, so `next export` style static hosting also works if you prefer a CDN-only deploy — set `output: "export"` in `next.config.js` first.

## Performance notes

- Hero image and metadata use Next's built-in `<Image>` + SEO APIs.
- Heavy effects (grain, particles, glow) are CSS/PNG-based, not GPU shaders, to keep things light on low-end devices.
- All scroll-linked animation respects `prefers-reduced-motion: reduce` — motion is fully disabled, not just slowed, when set.
- Custom cursor and Lenis smooth scroll auto-disable on touch devices.

## Editing content

All copy and data lives directly in the section components under `components/sections/` — project list in `Projects.tsx`, skills/proficiency in `Skills.tsx`, timeline in `Experience.tsx`, achievements in `Achievements.tsx`. No CMS or external data layer; everything is plain TypeScript objects at the top of each file.
