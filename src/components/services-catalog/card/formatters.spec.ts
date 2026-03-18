import {
  formatLatency,
  formatUptime,
  formatRequests,
  formatErrors,
} from './formatters'

describe('metric formatters', () => {
  it('formats latency, uptime, and errors', () => {
    expect(formatLatency(1.5)).toBe('1.50ms')
    expect(formatUptime(0.999)).toBe('99.90%')
    expect(formatErrors(0.025)).toBe('2.50%')
  })

  it('abbreviates request counts at the k and M thresholds', () => {
    expect(formatRequests(500)).toBe('500')
    expect(formatRequests(1_000)).toBe('1k')
    expect(formatRequests(1_500)).toBe('2k')
    expect(formatRequests(1_000_000)).toBe('1.0M')
    expect(formatRequests(2_500_000)).toBe('2.5M')
  })
})
