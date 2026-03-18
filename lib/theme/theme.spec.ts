import { themePlugin } from './index'
import { defaultTheme } from './default-theme'

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
      defaultTheme.colors.buttonPrimary,
    )
    expect(root.style.getPropertyValue('--spacing-xl')).toBe(
      defaultTheme.spacing.xl,
    )
    expect(root.style.getPropertyValue('--font-weight-semibold')).toBe(
      String(defaultTheme.typography.weights.semibold),
    )
  })

  it('applies partial overrides without disturbing adjacent tokens', () => {
    themePlugin.install(app as any, { colors: { buttonPrimary: '#FF0000' } })

    const root = document.documentElement
    expect(root.style.getPropertyValue('--color-button-primary')).toBe(
      '#FF0000',
    )
    expect(root.style.getPropertyValue('--color-text-primary')).toBe(
      defaultTheme.colors.textPrimary,
    )
  })
})
