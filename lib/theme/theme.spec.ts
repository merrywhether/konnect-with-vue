import { themePlugin } from './index'
import { defaultLightTheme } from './default-light-theme'

const app = { provide: vi.fn() }

afterEach(() => {
  document.documentElement.removeAttribute('style')
  vi.clearAllMocks()
})

describe('themePlugin', () => {
  it('writes CSS custom properties for color, spacing, and numeric font-weight tokens', () => {
    themePlugin.install(app as any)

    const root = document.documentElement
    expect(root.style.getPropertyValue('--color-button-primary')).toBe(
      defaultLightTheme.colors.buttonPrimary,
    )
    expect(root.style.getPropertyValue('--spacing-xl')).toBe(
      defaultLightTheme.spacing.xl,
    )
    expect(root.style.getPropertyValue('--font-weight-semibold')).toBe(
      String(defaultLightTheme.typography.weights.semibold),
    )
  })

  it('applies partial overrides without disturbing adjacent tokens', () => {
    themePlugin.install(app as any, { light: { colors: { buttonPrimary: '#FF0000' } } })

    const root = document.documentElement
    expect(root.style.getPropertyValue('--color-button-primary')).toBe(
      '#FF0000',
    )
    expect(root.style.getPropertyValue('--color-text-primary')).toBe(
      defaultLightTheme.colors.textPrimary,
    )
  })
})
