# Carbon Tree

Expo SDK 55 / React Native 0.83 / TypeScript 5.9 / Zustand 5 / Expo Router.

## Structure
- `src/app/` — Expo Router screens (file-based)
- `src/components/` — Reusable UI (Button, ProgressDots, SpeciesCard)
- `src/constants/` — Design tokens, species data
- `src/store/` — Zustand with AsyncStorage persist
- `src/types/` — TypeScript interfaces
- `src/utils/` — Carbon calculation utilities

## Commands
`npm start`, `npm run ios`, `npm run web`, `npm run lint`

## Key Decisions
- Dates as ISO strings (JSON persistence).
- Draft pattern: onboarding accumulates partial data, `commitTree()` finalizes.
- Route groups: `(onboarding)` and `(main)`, root index handles redirect.
- Design: Material 3 forest palette from prototype (`#00261a` primary, `#a1f5bc` accent, `#f8faf8` surface). Glassmorphic cards, botanical shadows.
- All UI text in Korean.

## Phases
1. (current) Education + PMF
2. (next) IoT verification
3. (future) VCM participation
