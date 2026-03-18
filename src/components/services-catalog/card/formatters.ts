export function formatLatency(ms: number): string {
  return `${ms.toFixed(2)}ms`
}

export function formatUptime(ratio: number): string {
  return `${(ratio * 100).toFixed(2)}%`
}

export function formatRequests(count: number): string {
  if (count >= 1_000_000) return `${(count / 1_000_000).toFixed(1)}M`
  if (count >= 1_000) return `${Math.round(count / 1_000)}k`
  return String(count)
}

export function formatErrors(ratio: number): string {
  return `${(ratio * 100).toFixed(2)}%`
}
