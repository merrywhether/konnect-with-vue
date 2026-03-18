import { getServiceStatus } from './services'
import type { Service } from '#types'

function svc(overrides: Partial<Service>): Service {
  return { id: '', name: '', description: '', type: 'REST', versions: [], ...overrides } as Service
}

describe('getServiceStatus', () => {
  it('returns the correct status for each service state', () => {
    expect(getServiceStatus(svc({ published: true, configured: true }))).toBe('published')
    expect(getServiceStatus(svc({ published: false, configured: true }))).toBe('unpublished')
    expect(getServiceStatus(svc({ published: false, configured: false }))).toBe('in-progress')
  })
})
