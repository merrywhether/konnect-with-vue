export { cssVars } from './css-vars'
export { defaultDarkTheme } from './default-dark-theme'
export { defaultLightTheme } from './default-light-theme'
export type {
  CssVars,
  ColorKey,
  FontSizeKey,
  FontWeightKey,
  RadiusKey,
  SpacingKey,
  ShadowKey,
  Theme,
  ThemeColors,
  ThemeSpacing,
  ThemeTypography,
  ThemeTypographySizes,
  ThemeTypographyWeights,
  ThemeRadii,
  ThemeShadows,
} from './types'
export {
  THEME_KEY,
  CSS_VARS_KEY,
  applyThemeToCssVars,
  themePlugin,
  useThemeMode,
} from './plugin'
export type {
  ThemeMode,
  ThemeModeContext,
  ThemePluginOptions,
} from './plugin'
export { default as ThemedImage } from './ThemedImage.vue'
