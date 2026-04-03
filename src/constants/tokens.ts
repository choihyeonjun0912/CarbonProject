export const colors = {
  primary: '#00261a',
  primaryContainer: '#0f3d2e',
  onPrimary: '#ffffff',
  secondary: '#126c40',
  secondaryContainer: '#a1f5bc',
  onSecondaryContainer: '#1c7245',
  tertiary: '#002616',
  tertiaryFixed: '#c0edd0',
  surface: '#f8faf8',
  onSurface: '#191c1b',
  onSurfaceVariant: '#414944',
  surfaceContainerLow: '#f2f4f2',
  surfaceContainerHigh: '#e6e9e7',
  surfaceContainerHighest: '#e1e3e1',
  surfaceContainerLowest: '#ffffff',
  outline: '#717974',
  outlineVariant: '#c0c8c3',
  primaryFixed: '#beedd7',
  primaryFixedDim: '#a2d1bb',
  secondaryFixed: '#a1f5bc',
  secondaryFixedDim: '#85d8a2',
} as const;

export const typography = {
  hero: { fontSize: 32, fontWeight: '800' as const, letterSpacing: -1 },
  h1: { fontSize: 24, fontWeight: '700' as const, letterSpacing: -0.5 },
  h2: { fontSize: 17, fontWeight: '700' as const },
  body: { fontSize: 15, fontWeight: '400' as const, lineHeight: 24 },
  label: { fontSize: 11, fontWeight: '700' as const, letterSpacing: 1.5, textTransform: 'uppercase' as const },
  small: { fontSize: 12, fontWeight: '500' as const },
} as const;

export const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  xxl: 32,
} as const;

export const radius = {
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  pill: 999,
} as const;

export const shadows = {
  botanical: {
    shadowColor: '#00261a',
    shadowOffset: { width: 0, height: 20 },
    shadowOpacity: 0.05,
    shadowRadius: 40,
    elevation: 8,
  },
  button: {
    shadowColor: '#00261a',
    shadowOffset: { width: 0, height: 20 },
    shadowOpacity: 0.15,
    shadowRadius: 40,
    elevation: 12,
  },
} as const;
