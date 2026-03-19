import type { Theme } from './types'

export const defaultLightTheme: Theme = {
  colors: {
    // Text scale
    textPrimary: '#3C4557', // Figma Grey/0 and Grey/600
    textPrimaryMuted: '#707888', // Figma Grey/1
    textDisabled: '#6F7787', // Figma Grey/500 — search placeholder
    textSecondary: '#262626', // Figma "Black" — version name in detail rows
    textSecondaryStrong: '#0B172D', // Figma fill_IEVAAX — modal/detail headings (darkest navy)
    textSecondaryMuted: '#8A8A8A', // Figma fill_K3GSQW — version desc + date in detail rows

    // Interactive
    buttonPrimary: '#07A88D', // Figma Green/500 — CTA button, form submit
    buttonPrimaryText: '#FFFFFF',
    linkPrimary: '#1456CB', // Figma fill_9XQHLS — links, focus ring

    // Status
    statusInfo: '#BDD3F9', // Figma Blue/3 — active REST/HTTP flag background
    statusInfoText: '#1155CB', // Figma Blue/1 — REST/HTTP flag label text
    statusInfoMuted: '#F2F6FE', // Figma Blue/4 — version badge bg, avatar fallback bg
    statusInfoTextMuted: '#5888DB', // Figma Blue/2 — version badge text, avatar fallback text
    statusHealthy: '#42D782', // Figma Green/1 — healthy status dot
    statusWarning: '#FABE5F', // Figma stroke_S869FV — in-progress spinner stroke
    statusNeutral: '#ADB6C8', // Figma stroke_MX3MLB — unpublished/disabled dot
    statusError: '#E74C3C', // form validation error text (freestyle, no Figma token)
    statusSuccess: '#14B59A', // Figma Green/0 — published checkmark icon fill

    // Icons
    iconPrimary: '#B6B6BD', // Figma Grey/2 — search/clear icon colour

    // Surfaces & structure
    bgPrimary: '#FFFFFF',
    bgSecondary: '#F8F8FA', // Figma Grey/5
    borderPrimary: '#E7E7EC', // Figma Grey/3
    borderSecondary: '#F1F1F5', // Figma Grey/4

    // Navigation
    bgNav: 'linear-gradient(180deg, #09224F 0%, #073382 100%)',
    textNav: 'rgba(255, 255, 255, 0.8)',
    textNavHover: '#fff',
  },

  spacing: {
    xs: '0.25rem',
    sm: '0.5rem',
    md: '0.75rem',
    base: '1rem',
    lg: '1.5rem',
    xl: '2rem',
    '2xl': '2.5rem',
  },

  typography: {
    fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
    sizes: {
      '2xs': '0.625rem',
      xs: '0.75rem',
      sm: '0.8125rem',
      base: '0.875rem',
      md: '1rem',
      lg: '1.25rem',
      xl: '2rem',
    },
    weights: {
      normal: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
    },
  },

  radii: {
    sm: '0.25rem',
    pill: '9999px',
    circle: '50%',
  },

  shadows: {
    modal: '0px 4px 30px 0px rgba(0, 0, 0, 0.2)',
    card: '0 2px 8px rgba(0, 0, 0, 0.08)',
  },
}
