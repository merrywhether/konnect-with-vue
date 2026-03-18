export interface ThemeColors {
  // Text scale
  textPrimary: string
  textPrimaryMuted: string
  textDisabled: string
  textSecondary: string
  textSecondaryStrong: string
  textSecondaryMuted: string

  // Interactive
  buttonPrimary: string
  buttonPrimaryText: string
  linkPrimary: string

  // Status
  statusInfo: string
  statusInfoText: string
  statusInfoMuted: string
  statusInfoTextMuted: string
  statusHealthy: string
  statusWarning: string
  statusNeutral: string
  statusError: string
  statusSuccess: string

  // Icons
  iconPrimary: string

  // Surfaces & structure
  bgPrimary: string
  bgSecondary: string
  borderPrimary: string
  borderSecondary: string

  // Navigation
  bgNav: string
  textNav: string
  textNavHover: string
}

export interface ThemeSpacing {
  xs: string
  sm: string
  md: string
  base: string
  lg: string
  xl: string
  '2xl': string
}

export interface ThemeTypographySizes {
  '2xs': string
  xs: string
  sm: string
  base: string
  md: string
  lg: string
  xl: string
}

export interface ThemeTypographyWeights {
  normal: number
  medium: number
  semibold: number
  bold: number
}

export interface ThemeTypography {
  fontFamily: string
  sizes: ThemeTypographySizes
  weights: ThemeTypographyWeights
}

export interface ThemeRadii {
  sm: string
  pill: string
  circle: string
}

export interface ThemeShadows {
  modal: string
  card: string
}

export interface Theme {
  colors: ThemeColors
  spacing: ThemeSpacing
  typography: ThemeTypography
  radii: ThemeRadii
  shadows: ThemeShadows
}

// Recursively maps every leaf value in T to string.
export type StringLeaves<T> = {
  [K in keyof T]: T[K] extends object ? StringLeaves<T[K]> : string;
}

export type CssVars = StringLeaves<Theme>

export type ColorKey = keyof ThemeColors
export type SpacingKey = keyof ThemeSpacing
export type FontSizeKey = keyof ThemeTypographySizes
export type FontWeightKey = keyof ThemeTypographyWeights
export type RadiusKey = keyof ThemeRadii
export type ShadowKey = keyof ThemeShadows
