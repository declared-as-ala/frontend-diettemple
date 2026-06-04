# DietTemple Design System

> An elite transformation society for humans who refuse to be average.

DietTemple is positioned not as a gym or diet brand, but as a **transformation ecosystem** — a society of "Ultimate Humans" progressing through ranks (Initiate → Fighter → Warrior → Elite) via science‑driven nutrition, AI‑powered tracking, weekly coaching, and an ultra‑disciplined training system.

The design language sits at the intersection of:

- **Apple** — restraint, scale, breathing room
- **Tesla / WHOOP** — instrument‑panel data aesthetics
- **Nike** — kinetic energy, athletic confidence
- **Equinox** — temple‑like luxury, ritual
- **Linear** — surgical UI precision
- **Luxury biohacking** — clinical, almost sacred

The visual identity is built around the **logo mark** — a stylised pagoda / temple silhouette rendered in an electric chartreuse — a deliberately unexpected "performance green" that reads as both biological (chlorophyll, vitality) and technological (HUD, oscilloscope).

---

## Sources

The brand was bootstrapped from:

- `uploads/logo.webp` — the only supplied asset (115×106px, transparent WebP, chartreuse pagoda mark)
- The brief itself (positioning, sections, rank system, product list)

No Figma, codebase, or existing collateral was provided — the foundations below are **derived from the logo + brief** and are intended to be the canonical source for everything else going forward.

---

## Index

| File / folder | What's inside |
|---|---|
| `README.md` | This file — brand context, content + visual foundations, iconography |
| `SKILL.md` | Cross‑compatible agent skill manifest |
| `colors_and_type.css` | The only stylesheet you need to import — tokens + semantic vars |
| `assets/` | Logo, wordmark, brand icons, background atmospherics |
| `fonts/` | Webfont notes (Google Fonts links used) |
| `preview/` | Design‑system cards (palette, type, components, etc.) |
| `ui_kits/website/` | Marketing site UI kit (hero, ranks, products, journey, footer…) |
| `ui_kits/app/` | Mobile app UI kit (dashboard, scanner, progress, plans…) |

---

## Brand Pillars

1. **Sacred discipline** — this is a temple, not a fitness center. Behaviour is ritualised.
2. **Measured transformation** — everything is data; the body is an instrument.
3. **Rank, not subscription** — members ascend through tiers; status is earned.
4. **Cinematic minimalism** — black space, single hero subject, surgical typography.
5. **Performance green** — the brand color is alive, electric, biological.

---

## Content fundamentals

DietTemple speaks like a **mentor‑coach who happens to be a scientist**. Calm, certain, declarative. Never hype. Never frat‑bro gym speak.

### Voice axes

| Axis | Where DietTemple sits |
|---|---|
| Casual ↔ Ceremonial | **Ceremonial.** Sentences are short and weighted. |
| Hype ↔ Calm | **Calm.** Confidence comes from precision, not volume. |
| "I" ↔ "You" ↔ "We" | **"You"** for invitation, **"We"** for the society. Never "I". |
| Emoji | **Never.** They cheapen the temple. |
| Exclamation marks | **Almost never.** A period is more powerful. |
| Title case | **Sentence case** for body; **Display caps** for hero statements. |

### Casing rules

- Hero headlines: **ALL CAPS, tight tracking** — `BECOME THE ULTIMATE HUMAN`
- Section eyebrows: **ALL CAPS, wide tracking, small** — `THE SYSTEM`
- Section titles: **Sentence case, large, tight** — `A transformation, engineered.`
- Body: sentence case, normal
- Ranks are always title‑case proper nouns: `Initiate`, `Fighter`, `Warrior`, `Elite`
- The system has a name: **Ultimate Human (UH)** — always rendered exactly this way; the abbreviation `UH` is acceptable after first mention

### Copy examples (canonical voice)

- ✅ "Become the Ultimate Human."
- ✅ "Your current version is a draft."
- ✅ "Scan your plate. Read your biology. Adjust the protocol."
- ✅ "One week. One coach. One protocol upgrade."
- ✅ "Members ascend. Everyone else watches."
- ❌ "Join the DietTemple family and crush your goals! 💪🔥"
- ❌ "Get shredded fast with our amazing diet plans!"
- ❌ "We help you be the best you you can be."

### Numbers and metrics

Numbers are **the proof**. Lead with them when possible.

- `–14.2 %` body fat in 90 days
- `1 of 4` ranks
- `Tier 03 / Warrior`
- `+312 kcal protein deficit` — always with the explicit unit

Use thin spaces (or none) around the unit; never put units in a different color from the number unless you specifically want a "data instrument" look (which we often do).

### Section eyebrows we use

`THE SYSTEM · THE METHOD · THE PROTOCOL · THE TEMPLE · THE ASCENT · THE INSTRUMENT · THE SOCIETY · THE INVITATION`

---

## Visual foundations

### Color

The palette is **near‑monochrome** — almost everything is in the dark range. The chartreuse is used **sparingly**, as a signal of life, status, or active state. Champagne/bronze appears only in luxury moments (rank seals, certification badges, member pricing).

| Token | Hex | Use |
|---|---|---|
| `--ink-0` (Obsidian) | `#05060A` | Deepest background, hero void |
| `--ink-1` (Onyx) | `#0B0D12` | Page background |
| `--ink-2` (Graphite) | `#13161E` | Card surface |
| `--ink-3` (Slate) | `#1C2029` | Elevated card / input |
| `--line` | `rgba(255,255,255,0.08)` | Hairlines, borders |
| `--line-strong` | `rgba(255,255,255,0.14)` | Active borders |
| `--bone` | `#F4F2EC` | Primary text on dark |
| `--bone-2` | `#B8B5AB` | Secondary text |
| `--bone-3` | `#6E6B62` | Tertiary text, captions |
| `--volt` (Brand) | `#C8FF3D` | Primary brand accent (logo color, refined) |
| `--volt-deep` | `#A0C800` | Pressed / shadowed volt |
| `--volt-glow` | `rgba(200,255,61,0.45)` | Glow halo |
| `--champagne` | `#D8C9A3` | Secondary luxury accent (rank, seal, member) |
| `--bronze` | `#7A6541` | Deep champagne / serif emphasis |
| `--blood` | `#FF4D4D` | Destructive only — almost never seen |

The chartreuse (`#C8FF3D`) is **not pastel and not neon‑green**. It's a yellow‑leaning electric green — the color of a tennis ball under stadium light. Slight desaturation from the raw logo color keeps it premium rather than sporty.

### Typography

A two‑family stack:

- **Display + Headlines** → `Manrope` (700/800, very tight tracking, sometimes uppercase)
- **Body + UI** → `Inter` (400/500)
- **Mono / Data** → `JJS Mono` substitute → `JetBrains Mono` (500) — used for numbers, ranks, metrics
- **Editorial italic** → `Fraunces` 300 italic — used **only** for a single emotional pullquote per page, never as body

> **Substitution flag** — no font files were provided. We use Google Fonts equivalents. If DietTemple has a licensed display face (e.g. NB Architekt, Söhne, GT America), please supply files and we will swap them in. The mono is a particularly soft swap.

Type scale (1.250 / major third on desktop, compressed on mobile):

| Token | Size / line | Where |
|---|---|---|
| `--t-hero` | clamp(48px, 9vw, 144px) / 0.95 | Hero only |
| `--t-display` | clamp(40px, 5vw, 80px) / 1.0 | Section opening lines |
| `--t-h1` | 56px / 1.05 | Top of sections |
| `--t-h2` | 36px / 1.15 | Subsection |
| `--t-h3` | 22px / 1.3 | Card titles |
| `--t-body` | 16px / 1.6 | Paragraph |
| `--t-small` | 14px / 1.5 | Meta |
| `--t-eyebrow` | 12px / 1.0, 0.18em tracked | Section labels |
| `--t-data` | 14px / 1.0 mono | Metrics |

### Spacing & layout

8‑pt grid. Sections breathe — typical vertical rhythm between sections is **160–240px** on desktop, **96–128px** on mobile. Max content width is **1280px**; hero modules go **edge‑to‑edge**.

| Token | Value | Use |
|---|---|---|
| `--s-1` | 4px | Hairline gaps |
| `--s-2` | 8px | Tight |
| `--s-3` | 12px | Default inline gap |
| `--s-4` | 16px | Standard |
| `--s-5` | 24px | Card padding |
| `--s-6` | 32px | Stack |
| `--s-7` | 48px | Block |
| `--s-8` | 64px | Big block |
| `--s-9` | 96px | Section padding (mobile) |
| `--s-10` | 160px | Section padding (desktop) |

### Backgrounds

- **Default page**: `--ink-1` flat. No gradients on body.
- **Hero**: full‑bleed cinematic image (athlete, dimly lit, high contrast, warm‑to‑cool fall‑off) on top of `--ink-0`, with a **protection gradient** from `--ink-0` 0% → transparent 60% → `--ink-0` 100% running vertically so text always sits in dark.
- **Section dividers**: a single 1px hairline at `--line` — never a thick rule.
- **Decorative gradients** appear only on rank cards and the volt glow halo around buttons. No "blue‑purple SaaS gradient" anywhere. Ever.
- **Grain**: subtle 4% noise overlay (SVG turbulence or a noise PNG) on hero and rank panels — keeps it cinematic.

### Imagery

- **Color grade**: cool shadows, warm highlights, deep blacks, single‑subject framing
- **Subjects**: solitary athletes, side‑lit, in motion or in deliberate stillness — never groups, never gym‑bro flexes
- **Treatment**: occasionally tinted toward volt for hero overlays
- **Aspect**: 4:5 for portrait, 21:9 for cinematic hero
- All real photography until we supply it — until then, **placeholders are framed in `--ink-3` with `--bone-3` `IMAGE — <subject>` text** in mono. Never auto‑generated art.

### Borders, radii, shadows

- **Corner radius**: cards = `14px`. Buttons = `999px` (pill). Inputs = `10px`. Heroes / panels = `20px`. We do **not** use sharp 0px corners.
- **Borders**: 1px `--line` is the default. On hover, transition to `--line-strong`. Active / focused state: 1px `--volt` with a 0 0 0 4px `--volt-glow` halo.
- **Shadows**: dark surfaces don't cast light shadows. We use **inner glow** (`inset 0 1px 0 rgba(255,255,255,0.04)`) and the **volt halo** on interactive elements. Heroes get a soft volt under‑glow only on rank cards (`0 30px 80px -20px var(--volt-glow)`).
- **Glass cards** appear ONLY for the floating nav and modals: `backdrop-filter: blur(20px) saturate(140%)`, `background: rgba(11,13,18,0.7)`, `border: 1px solid var(--line-strong)`.

### Motion

- **Easing**: `cubic-bezier(0.2, 0.7, 0.1, 1)` — confident, slightly snappy. Avoid bounces.
- **Duration**: 240ms for micro (hover), 480ms for component, 760ms for section reveal
- **Hover**: text lightens (`--bone-2` → `--bone`), borders strengthen, **NO scale**. Volt accents bloom (`box-shadow` grows by 8px).
- **Press**: opacity 0.85 + scale(0.98). Never longer than 80ms.
- **Reveal**: 12px translate‑Y + fade, staggered 80ms across siblings.
- **Scroll**: smooth, momentum, no parallax (it cheapens the feel).

### Use of transparency / blur

Sparingly. **Only three places**:
1. Floating nav (glass)
2. Modals / drawers (glass)
3. Hero text protection gradient

Cards are **solid** `--ink-2` — not glass. Glass everywhere makes it look like a 2021 SaaS dashboard.

### Layout rules

- Hero is full‑viewport (`100svh`, minimum 720px)
- Sticky nav at top, 72px tall on desktop, 56px on mobile
- One‑column on mobile always; multi‑column starts at 768px
- Body content max‑width 1280px, padded 24px (mobile) / 64px (desktop)
- Section eyebrows are flush‑left, separated from the title by 16px

---

## Iconography

DietTemple uses **two icon systems** intentionally chosen for their seriousness:

### 1. Lucide (primary)

[Lucide](https://lucide.dev) — 1.5px stroke, 24px grid, geometric, calm. Used for **all UI affordances**: nav, buttons, list bullets, status pips. Loaded from CDN:

```html
<script src="https://unpkg.com/lucide@latest"></script>
```

Render via `<i data-lucide="dumbbell"></i>` and call `lucide.createIcons()`.

Canonical icons by use:
- `flame` — activity / streaks
- `dumbbell` — workouts
- `apple` / `utensils` — nutrition
- `scan-line` — plate scanner
- `line-chart` — analytics
- `shield` — ranks / member status (paired with rank glyph)
- `chevron-right` — disclosure
- `arrow-up-right` — outbound / CTA
- `circle-dot` — active indicator
- `lock` — UH‑locked

### 2. Rank glyphs (custom, sparingly used)

The four ranks (Initiate, Fighter, Warrior, Elite) have **bespoke single‑weight line glyphs** (`assets/ranks/`):
- Initiate → single descending line
- Fighter → two crossed lines
- Warrior → three diverging lines
- Elite → the temple silhouette from the logo

Always at 56px+, always in volt or champagne, never re‑drawn in CSS. Provided as SVG.

### What we never do

- **No emoji.** Not in copy, not in icons.
- **No flat color icons** (e.g. Material's filled style). Lines only.
- **No 3D / glossy icons.**
- **No drawn illustrations.** If we need spot art, we use real photography or a single‑color geometric mark.

---

## Approved assets

See `assets/` for the supplied logo and derivatives. Anything else is placeholder until real assets are delivered.

---
