# DietTemple — Mobile App UI Kit

Companion app to the website. The "instrument panel" for transformation.

## Screens (click‑thru via bottom tabs)

1. **Home** (`HomeScreen.jsx`) — Today, day score ring, protocol, photo of the day, next coaching
2. **Scan** (`ScanScreen.jsx`) — plate scanner (the hero interaction), recent scans
3. **Train** (`TrainScreen.jsx`) — today's workout reel + sets
4. **Progress** (`ProgressScreen.jsx`) — body evolution photo grid + rank ascent
5. **Coach** (`CoachScreen.jsx`) — weekly call card, message thread, protocol change log

## Shell

- `Frame.jsx` — iPhone bezel, status bar, home indicator, scaled to fit the design canvas
- `Tabbar.jsx` — bottom nav with five tabs
- `Tokens.jsx` — small reusable atoms (RankPill, Metric, ScreenHeader)

The app uses a slightly higher‑contrast variant of the design system (more inky), preserving the same volt + champagne accents.
