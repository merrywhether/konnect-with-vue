import type { App, InjectionKey, Ref } from 'vue'
import { inject, ref, watch } from 'vue'
import { deepMerge, isPlainObject, type DeepPartial } from '#std'
import { cssVars } from './css-vars'
import { defaultDarkTheme } from './default-dark-theme'
import { defaultLightTheme } from './default-light-theme'
import type { Theme } from './types'

export type ThemeMode = 'light' | 'dark' | 'system'

export interface ThemeModeContext {
  /** Raw user preference — use resolvedMode for rendering decisions. */
  mode: Ref<ThemeMode>
  /** The mode actually applied: never 'system'. */
  resolvedMode: Ref<'light' | 'dark'>
  setMode: (m: ThemeMode) => void
}

export const THEME_KEY = Symbol('theme') as InjectionKey<Theme>
export const CSS_VARS_KEY = Symbol('cssVars') as InjectionKey<typeof cssVars>

// Not exported — consumers use useThemeMode() instead.
const THEME_MODE_KEY = Symbol('themeMode') as InjectionKey<ThemeModeContext>

const STORAGE_KEY = 'konnect-theme-mode'
const THEME_MODES: readonly ThemeMode[] = ['light', 'dark', 'system']

function extractVarName(cssVar: string): string {
  const match = cssVar.match(/^var\((--[^)]+)\)$/)
  return match ? match[1] : cssVar
}

export function applyThemeToCssVars(
  root: HTMLElement,
  themeNode: unknown,
  cssVarsNode: unknown,
): void {
  if (isPlainObject(cssVarsNode) && isPlainObject(themeNode)) {
    for (const key of Object.keys(cssVarsNode)) {
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

export interface ThemePluginOptions {
  light?: DeepPartial<Theme>
  dark?: DeepPartial<Theme>
}

/**
 * Manages light/dark/system theme mode with localStorage persistence and
 * no-FOUC synchronous application before first render.
 *
 * Provides theme mode context via useThemeMode().
 */
export const themePlugin = {
  install(app: App, options: ThemePluginOptions = {}) {
    const lightTheme = deepMerge(defaultLightTheme, options.light ?? {})
    const darkTheme = deepMerge(defaultDarkTheme, options.dark ?? {})

    app.provide(THEME_KEY, lightTheme)
    app.provide(CSS_VARS_KEY, cssVars)

    const root = document.documentElement
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')

    const savedMode = localStorage.getItem(STORAGE_KEY) as ThemeMode
    const mode = ref<ThemeMode>(
      THEME_MODES.includes(savedMode) ? savedMode : 'system',
    )

    function resolveMode(m: ThemeMode): 'light' | 'dark' {
      return m === 'system' ? (mediaQuery.matches ? 'dark' : 'light') : m
    }

    const resolvedMode = ref<'light' | 'dark'>(resolveMode(mode.value))

    function applyMode(m: ThemeMode) {
      const resolved = resolveMode(m)
      const theme = resolved === 'dark' ? darkTheme : lightTheme
      applyThemeToCssVars(root, theme, cssVars)
      root.style.colorScheme = resolved
      resolvedMode.value = resolved
    }

    applyMode(mode.value)

    watch(mode, (m) => {
      localStorage.setItem(STORAGE_KEY, m)
      applyMode(m)
    })

    mediaQuery.addEventListener('change', () => {
      if (mode.value === 'system') applyMode('system')
    })

    app.provide(THEME_MODE_KEY, {
      mode,
      resolvedMode,
      setMode: (m: ThemeMode) => {
        mode.value = m
      },
    })
  },
}

export function useThemeMode(): ThemeModeContext {
  return inject(THEME_MODE_KEY, {
    mode: ref<ThemeMode>('light'),
    resolvedMode: ref<'light' | 'dark'>('light'),
    setMode: () => {},
  })
}
