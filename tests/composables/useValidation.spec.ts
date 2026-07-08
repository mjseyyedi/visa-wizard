import { describe, it, expect } from 'vitest'
import { rules, validate } from '../../app/composables/useValidation'

describe('rules.required', () => {
  it('fails on empty string', () => {
    const rule = rules.required('Name')
    expect(rule.validator('')).toBe(false)
    expect(rule.validator('  ')).toBe(false)
  })

  it('passes on non-empty string', () => {
    expect(rules.required().validator('John')).toBe(true)
  })
})

describe('rules.email', () => {
  it('rejects invalid email', () => {
    expect(rules.email().validator('bad')).toBe(false)
    expect(rules.email().validator('bad@')).toBe(false)
    expect(rules.email().validator('@domain.com')).toBe(false)
  })

  it('accepts valid email', () => {
    expect(rules.email().validator('user@example.com')).toBe(true)
    expect(rules.email().validator('a+b@x.io')).toBe(true)
  })
})

describe('rules.phone', () => {
  it('rejects too-short phone', () => {
    expect(rules.phone().validator('123')).toBe(false)
  })

  it('accepts valid phone', () => {
    expect(rules.phone().validator('1234567')).toBe(true)
    expect(rules.phone().validator('+1 (555) 000-1234')).toBe(true)
  })
})

describe('rules.dateOfBirth', () => {
  function isoAge(years: number): string {
    const d = new Date()
    d.setFullYear(d.getFullYear() - years)
    return d.toISOString().split('T')[0]
  }

  it('rejects a 17-year-old', () => {
    expect(rules.dateOfBirth().validator(isoAge(17))).toBe(false)
  })

  it('accepts an 18-year-old', () => {
    expect(rules.dateOfBirth().validator(isoAge(18))).toBe(true)
  })

  it('rejects invalid date string', () => {
    expect(rules.dateOfBirth().validator('not-a-date')).toBe(false)
  })
})

describe('rules.passportNumber', () => {
  it('rejects too short', () => {
    expect(rules.passportNumber().validator('AB12')).toBe(false)
  })

  it('rejects non-alphanumeric', () => {
    expect(rules.passportNumber().validator('AB-1234')).toBe(false)
  })

  it('accepts valid passport numbers', () => {
    expect(rules.passportNumber().validator('AB1234')).toBe(true)
    expect(rules.passportNumber().validator('123456789')).toBe(true)
  })
})

describe('validate()', () => {
  it('returns first failing message', () => {
    const result = validate([rules.required('Email'), rules.email()], '')
    expect(result).toBe('Email is required')
  })

  it('returns second rule message when first passes', () => {
    const result = validate([rules.required('Email'), rules.email()], 'notvalid')
    expect(result).toBe('Enter a valid email address')
  })

  it('returns null when all rules pass', () => {
    const result = validate([rules.required('Email'), rules.email()], 'ok@test.com')
    expect(result).toBeNull()
  })
})
