import { describe, expect, it } from 'vitest'
import { parseShareParams, serializeShareParams } from './shareParams'

describe('serializeShareParams / parseShareParams', () => {
  it('round-trips steps and team query params', () => {
    const serialized = serializeShareParams({
      averageStepsPerPerson: 10_000,
      teamSize: 12,
    })

    expect(serialized).toBe('steps=10000&team=12')
    expect(parseShareParams(serialized)).toEqual({
      averageStepsPerPerson: 10_000,
      teamSize: 12,
    })
  })

  it('parses a search string that includes a leading question mark', () => {
    expect(parseShareParams('?steps=5000&team=3')).toEqual({
      averageStepsPerPerson: 5_000,
      teamSize: 3,
    })
  })

  it('returns null when steps or team is missing', () => {
    expect(parseShareParams('')).toBeNull()
    expect(parseShareParams('?other=1')).toBeNull()
    expect(parseShareParams('?steps=10000')).toBeNull()
    expect(parseShareParams('?team=10')).toBeNull()
  })
})
