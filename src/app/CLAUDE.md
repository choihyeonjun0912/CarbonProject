# Screens (Expo Router)

File-based routing in `src/app/`. Root `_layout.tsx` renders `<Slot/>`. Entry `index.tsx` redirects to onboarding or main based on `isOnboarded`.

## Route Groups
- `(onboarding)/` — splash, tree-select, tree-name, tree-location
- `(main)/` — index (home dashboard)

## Onboarding Flow
1. Splash (also in root `index.tsx`) → tree-select → tree-name → tree-location
2. Each screen updates Zustand `draft`
3. Final screen calls `commitTree()` setting `isOnboarded = true`

## Conventions
- `useSafeAreaInsets()` for safe area padding
- Screens import tokens from `@/constants/tokens`
- Background glow views for depth effect
- Step badges with uppercase tracking labels
