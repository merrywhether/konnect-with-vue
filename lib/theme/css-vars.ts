import type { CssVars } from './types'

/**
 * Mirrors the structure of Theme, but every leaf value is a CSS custom
 * property reference string (e.g. 'var(--color-button-primary)').
 * Use these in component <style> bindings or inline style objects instead of
 * hardcoding hex values — the actual values live in defaultTheme and are
 * written to :root by the plugin at startup.
 */
export const cssVars: CssVars = {
  colors: {
    // Text scale
    textPrimary: 'var(--color-text-primary)',
    textPrimaryMuted: 'var(--color-text-primary-muted)',
    textDisabled: 'var(--color-text-disabled)',
    textSecondary: 'var(--color-text-secondary)',
    textSecondaryStrong: 'var(--color-text-secondary-strong)',
    textSecondaryMuted: 'var(--color-text-secondary-muted)',

    // Interactive
    buttonPrimary: 'var(--color-button-primary)',
    buttonPrimaryText: 'var(--color-button-primary-text)',
    linkPrimary: 'var(--color-link-primary)',

    // Status
    statusInfo: 'var(--color-status-info)',
    statusInfoText: 'var(--color-status-info-text)',
    statusInfoMuted: 'var(--color-status-info-muted)',
    statusInfoTextMuted: 'var(--color-status-info-text-muted)',
    statusHealthy: 'var(--color-status-healthy)',
    statusWarning: 'var(--color-status-warning)',
    statusNeutral: 'var(--color-status-neutral)',
    statusError: 'var(--color-status-error)',
    statusSuccess: 'var(--color-status-success)',

    // Icons
    iconPrimary: 'var(--color-icon-primary)',

    // Surfaces
    bgPrimary: 'var(--color-bg-primary)',
    bgSecondary: 'var(--color-bg-secondary)',
    borderPrimary: 'var(--color-border-primary)',
    borderSecondary: 'var(--color-border-secondary)',

    // Navigation
    bgNav: 'var(--color-bg-nav)',
    textNav: 'var(--color-text-nav)',
    textNavHover: 'var(--color-text-nav-hover)',
  },

  spacing: {
    xs: 'var(--spacing-xs)',
    sm: 'var(--spacing-sm)',
    md: 'var(--spacing-md)',
    base: 'var(--spacing-base)',
    lg: 'var(--spacing-lg)',
    xl: 'var(--spacing-xl)',
    '2xl': 'var(--spacing-2xl)',
  },

  typography: {
    fontFamily: 'var(--font-family)',
    sizes: {
      '2xs': 'var(--font-size-2xs)',
      xs: 'var(--font-size-xs)',
      sm: 'var(--font-size-sm)',
      base: 'var(--font-size-base)',
      md: 'var(--font-size-md)',
      lg: 'var(--font-size-lg)',
      xl: 'var(--font-size-xl)',
    },
    weights: {
      normal: 'var(--font-weight-normal)',
      medium: 'var(--font-weight-medium)',
      semibold: 'var(--font-weight-semibold)',
      bold: 'var(--font-weight-bold)',
    },
  },

  radii: {
    sm: 'var(--radius-sm)',
    pill: 'var(--radius-pill)',
    circle: 'var(--radius-circle)',
  },

  shadows: {
    modal: 'var(--shadow-modal)',
    card: 'var(--shadow-card)',
  },
}
