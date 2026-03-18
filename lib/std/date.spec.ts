import { formatRelativeDate, MS_PER_DAY } from './date'

beforeEach(() => {
  vi.useFakeTimers()
  vi.setSystemTime(new Date('2025-06-15T12:00:00Z'))
})

afterEach(() => {
  vi.useRealTimers()
})

describe('formatRelativeDate', () => {
  it('formats sub-30-day offsets in days', () => {
    const now = Date.now()

    expect(formatRelativeDate(new Date(now).toISOString())).toBe('today')
    expect(formatRelativeDate(new Date(now - MS_PER_DAY).toISOString())).toBe(
      'yesterday',
    )
    expect(
      formatRelativeDate(new Date(now - 7 * MS_PER_DAY).toISOString()),
    ).toBe('7 days ago')
    expect(
      formatRelativeDate(new Date(now - 29 * MS_PER_DAY).toISOString()),
    ).toBe('29 days ago')
  })

  it('switches to months at the 30-day boundary', () => {
    const now = Date.now()

    expect(
      formatRelativeDate(new Date(now - 30 * MS_PER_DAY).toISOString()),
    ).toBe('last month')
    expect(
      formatRelativeDate(new Date(now - 60 * MS_PER_DAY).toISOString()),
    ).toBe('2 months ago')
  })
})
