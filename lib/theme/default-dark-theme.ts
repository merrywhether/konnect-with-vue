import type { Theme } from './types'
import { defaultLightTheme } from './default-light-theme'

/**
 * Dark theme using Kong's brand colors as seen on konghq.com/ai-connectivity.
 *
 * Primary palette (extracted from page computed styles):
 *   - Background: #000000 — pure black (main element computed bg)
 *   - Elevated surface: #1E1F1D — inputs, secondary panels
 *   - Card border: #35363A — subtle dark border
 *   - Accent: #CCFF00 — neon chartreuse: CTAs, links, nav hover, success
 *   - Strong text: #EEF2ED — headings (Kong AI page h1 computed color)
 *   - Body text: #BCC2BA — muted body copy (section text computed color)
 *   - Subdued text: #666C70 — nav links, placeholders, disabled
 */
export const defaultDarkTheme: Theme = {
  colors: {
    // Text scale
    textPrimary: '#EEF2ED', // near-white headings / strong text
    textPrimaryMuted: '#BCC2BA', // muted body copy
    textDisabled: '#666C70', // disabled / search placeholder
    textSecondary: '#BCC2BA', // version names, detail row text
    textSecondaryStrong: '#EEF2ED', // modal/detail headings
    textSecondaryMuted: '#666C70', // version desc, dates

    // Interactive — chartreuse for all interactive elements (Kong's single accent)
    buttonPrimary: '#CCFF00', // neon chartreuse CTA
    buttonPrimaryText: '#000000', // black text on chartreuse
    linkPrimary: '#CCFF00', // chartreuse links (Kong's dark UI uses one accent color)

    // Status
    statusInfo: '#062F4D', // deep navy — active REST/HTTP flag bg
    statusInfoText: '#BCC2BA', // muted light — REST/HTTP flag label
    statusInfoMuted: '#1E1F1D', // elevated dark — version badge bg, avatar fallback
    statusInfoTextMuted: '#666C70', // subdued — version badge text, avatar fallback
    statusHealthy: '#00D6A4', // Kong green.40 — semantically green for healthy
    statusWarning: '#FABE5F', // warm yellow — semantically correct for warning
    statusNeutral: '#35363A', // dark border tone — unpublished/disabled dot
    statusError: '#E50000', // red — extracted from page computed styles
    statusSuccess: '#CCFF00', // chartreuse — published checkmark (Kong's accent)

    // Icons
    iconPrimary: '#CCD2D6', // muted light icon color (Kong page icon grey)

    // Surfaces (all from page computed styles)
    bgPrimary: '#000000', // pure black
    bgSecondary: '#1E1F1D', // elevated dark surface
    borderPrimary: '#35363A', // card border
    borderSecondary: '#1E1F1D', // ultra-subtle separator

    // Navigation — flat black (no gradient; Kong's dark UI is flat)
    bgNav: '#000000',
    textNav: 'rgba(255, 255, 255, 0.6)',
    textNavHover: '#CCFF00', // chartreuse on hover
  },

  spacing: defaultLightTheme.spacing,
  typography: defaultLightTheme.typography,
  radii: defaultLightTheme.radii,

  shadows: {
    modal: '0px 4px 30px 0px rgba(0, 0, 0, 0.6)',
    card: '0 2px 8px rgba(0, 0, 0, 0.4)',
  },
}
