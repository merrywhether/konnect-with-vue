export type DeepPartial<T> = T extends object
  ? { [K in keyof T]?: DeepPartial<T[K]> }
  : T

/**
 * Narrows unknown to a plain Record (not null, not array)
 */
export function isPlainObject(val: unknown): val is Record<string, unknown> {
  return typeof val === 'object' && val !== null && !Array.isArray(val)
}

/**
 * Recursively merges `override` into `base`, returning a new object.
 * Primitive leaf values and arrays are replaced wholesale.
 */
export function deepMerge<T>(base: T, override: DeepPartial<T>): T {
  const result = { ...(base as Record<string, unknown>) }
  for (const [key, overrideVal] of Object.entries(
    override as Record<string, unknown>,
  )) {
    const baseVal = result[key]
    if (isPlainObject(overrideVal) && isPlainObject(baseVal)) {
      result[key] = deepMerge(baseVal, overrideVal)
    } else if (overrideVal !== undefined) {
      result[key] = overrideVal
    }
  }
  return result as T
}
