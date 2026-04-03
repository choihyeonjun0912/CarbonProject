# Components

One component per file, named export. Styles via `StyleSheet.create()`.

## Button
Primary (deep green `#00261a`, botanical shadow), secondary (gray surface), ghost. Props: `label`, `onPress`, `variant`, `disabled`, `style`. Height 56, pill radius.

## ProgressDots
Onboarding step indicator. Active dot: wide dark green bar. Inactive: shorter mint bar. Props: `current` (0-indexed), `total`.

## SpeciesCard
47% width for 2x2 grid. Circular emoji icon, bold species name, CO2 badge in green container. Props: `species`, `selected`, `onPress`. Selected state: dark border, dimmer icon bg.
