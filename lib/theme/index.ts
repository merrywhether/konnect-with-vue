import type { App, InjectionKey } from 'vue'
import { deepMerge, isPlainObject, type DeepPartial } from '#std'
import { cssVars } from './css-vars'
import { defaultTheme } from './default-theme'
import type { Theme } from './types'

export { cssVars } from './css-vars'
export { defaultTheme } from './default-theme'
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

export const THEME_KEY = Symbol('theme') as InjectionKey<Theme>
export const CSS_VARS_KEY = Symbol('cssVars') as InjectionKey<typeof cssVars>

function extractVarName(cssVar: string): string {
  const match = cssVar.match(/^var\((--[^)]+)\)$/)
  return match ? match[1] : cssVar
}

/**
 * Walks cssVars and theme in lockstep. For every leaf in cssVars (a string
 * like 'var(--color-button-primary)') it extracts the custom property name
 * and looks up the corresponding value in the resolved theme, then sets it
 * on the document root.
 *
 * The two trees have identical key paths by construction (cssVars satisfies
 * the same shape as Theme, modulo string vs. number leaves). Typography
 * weights in the theme are numbers; we coerce them to strings for
 * setProperty.
 */
function applyThemeToCssVars(
  root: HTMLElement,
  themeNode: unknown,
  cssVarsNode: unknown,
): void {
  if (isPlainObject(cssVarsNode) && isPlainObject(themeNode)) {
    for (const key in cssVarsNode) {
      if (!Object.prototype.hasOwnProperty.call(cssVarsNode, key)) continue
      applyThemeToCssVars(root, themeNode[key], cssVarsNode[key])
    }
  } else if (
    typeof cssVarsNode === 'string' &&
    cssVarsNode.startsWith('var(')
  ) {
    const prop = extractVarName(cssVarsNode)
    const value =
      typeof themeNode === 'number' ? String(themeNode) : (themeNode as string)
    root.style.setProperty(prop, value)
  }
}

/**
 * Accepts an optional partial theme override so consumers can customise
 * individual tokens without replacing the whole theme object.
 */
export const themePlugin = {
  install(app: App, overrides: DeepPartial<Theme> = {}) {
    const theme = deepMerge(defaultTheme, overrides)

    app.provide(THEME_KEY, theme)
    app.provide(CSS_VARS_KEY, cssVars)

    const root = document.documentElement
    applyThemeToCssVars(root, theme, cssVars)
  },
}
