---
name: diettemple-design
description: Use this skill to generate well-branded interfaces and assets for DietTemple, either for production or throwaway prototypes/mocks/etc. Contains essential design guidelines, colors, type, fonts, assets, and UI kit components for prototyping.
user-invocable: true
---

# DietTemple — Design Skill

DietTemple is an elite transformation society (think Apple × Equinox × WHOOP × Linear). The visual system is dark, cinematic, ritualised; near‑monochrome with a single electric chartreuse accent (`#C8FF3D`, called **Volt**) and a champagne luxury accent for member / rank moments.

## How to use this skill

Read the `README.md` file within this skill first — it contains the full brand voice, content rules, type system, color tokens, motion, iconography, and layout rules.

Then explore the other files:

- `colors_and_type.css` — single import that gives you all CSS variables and semantic typography classes
- `assets/` — logo (webp), wordmark SVG, custom rank glyphs (`initiate`, `fighter`, `warrior`, `elite`)
- `preview/` — atomic specimen cards illustrating each token group
- `ui_kits/website/` — marketing site components (Hero, Ranks, System, AppShowcase, Products with UH pricing, etc.) — pixel‑perfect Reactish JSX
- `ui_kits/app/` — mobile app screens (Home, Scan, Train, Progress, Coach)

## Working on artifacts vs production

- **Visual artifacts (slides, mocks, throwaway prototypes):** copy `colors_and_type.css`, `assets/logo.webp`, and the rank SVGs into your output; write a single static HTML file that imports the CSS and uses the semantic classes (`dt-hero`, `dt-display`, `dt-eyebrow`, `dt-body`, `dt-data`, `dt-editorial`). Lucide is loaded from CDN for iconography. Never invent new colors — stick to the tokens. Never use emoji.

- **Production code:** read the rules in `README.md` and translate the tokens into your CSS/Tailwind config. The brand has strong personality and small surface area; pixel‑exact replication of tokens is more important than novel visual ideas.

## If the user invokes this skill without guidance

Ask what they want to build, then ask the right design questions (what surface, what tone, what does success look like, what assets do they have). Act as the expert designer for this brand and output HTML artifacts or production code depending on need.

## Critical do‑nots

- No emoji, ever.
- No gradient backgrounds beyond the curated volt / champagne radial glows.
- No gym‑bro tone. The voice is calm, ceremonial, declarative. See README "Content fundamentals".
- No invented icons. Use Lucide (CDN) or the supplied rank glyphs.
- No bouncing animations. Easing is `cubic-bezier(0.2, 0.7, 0.1, 1)`.

## Voice cheat sheet

- "Become the Ultimate Human."
- "Your current version is a draft."
- "Members ascend. Everyone else watches."
- Ranks: **Initiate → Fighter → Warrior → Elite**
- Brand abbreviation: **UH** (Ultimate Human) — used for member pricing label
