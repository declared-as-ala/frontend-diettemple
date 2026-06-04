# DietTemple — Website UI Kit

The marketing/transformation site. Single‑page, dark, cinematic, ritual.

## Sections (top → bottom)

1. **Floating glass nav** (`Nav.jsx`)
2. **Hero — Become The Ultimate Human** (`Hero.jsx`)
3. **The Movement** — short manifesto (`Movement.jsx`)
4. **Ranks of the Temple** — Initiate → Elite (`Ranks.jsx`)
5. **The System** — 6‑step weekly transformation loop (`System.jsx`)
6. **The Instrument** — mobile app preview (`AppShowcase.jsx`)
7. **The Coach** — weekly consultation block (`Coaching.jsx`)
8. **Nos Produits** — products with Standard / UH prices (`Products.jsx`)
9. **The Society** — testimonials + elite stats (`Society.jsx`)
10. **Final CTA** — "One decision away" (`FinalCta.jsx`)
11. **Footer** (`Footer.jsx`)

## Notes

- One single `<style>` block at top of `index.html` (no external CSS) plus a link to `../../colors_and_type.css`
- All JSX files attach components to `window` so they share scope across `<script type="text/babel" src>` includes
- Lucide is loaded from CDN; icons render after mount via `lucide.createIcons()`
- Imagery is intentionally placeholder — see `Hero.jsx` for the `CinematicSlot` component which renders a labeled atmospheric dark gradient
