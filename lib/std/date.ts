const rtf = new Intl.RelativeTimeFormat('en', { numeric: 'auto' })
export const MS_PER_DAY = 86_400_000

export function formatRelativeDate(isoDate: string): string {
  const diffMs = Date.now() - new Date(isoDate).getTime()
  const days = Math.floor(diffMs / MS_PER_DAY)
  if (days < 30) return rtf.format(-days, 'day')
  return rtf.format(-Math.floor(days / 30), 'month')
}
