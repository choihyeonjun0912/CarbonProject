# Store (Zustand)

Single `useTreeStore` persisted to AsyncStorage via `zustand/middleware/persist`.

## State
- `tree: Tree | null` — committed tree after onboarding
- `isOnboarded: boolean` — gates routing
- `draft: Draft` — partial data during onboarding (persisted for crash recovery)

## Actions
- `setDraftSpecies`, `setDraftName`, `setDraftPlanting` — onboarding steps
- `commitTree()` — creates Tree from draft, sets `isOnboarded = true`
- `reset()` — full wipe for debugging

## Notes
Storage key: `tree-store`, version 1. Hydration is async on native but root layout doesn't gate on it — default state (`isOnboarded: false`) shows onboarding, hydration corrects if needed.
