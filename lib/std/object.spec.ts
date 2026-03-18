import { deepMerge } from './object'

describe('deepMerge', () => {
  it('shallow-replaces primitives, deep-merges nested objects, and skips undefined overrides', () => {
    const base = { a: 1, b: { x: 10, y: 20 }, c: 'keep' }
    const result = deepMerge(base, { a: 2, b: { x: 99 }, c: undefined })

    expect(result).toEqual({ a: 2, b: { x: 99, y: 20 }, c: 'keep' })
    expect(base.b.x).toBe(10)
  })

  it('replaces arrays wholesale rather than merging them', () => {
    const result = deepMerge({ tags: [1, 2, 3] }, { tags: [4, 5] as any })

    expect(result.tags).toEqual([4, 5])
  })
})
