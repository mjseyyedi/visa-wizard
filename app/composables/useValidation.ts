import type { ValidationRule } from '~/types'

export const rules = {
  required: (label = 'This field'): ValidationRule => ({
    validator: (v) => v.trim().length > 0,
    message: `${label} is required`,
  }),

  email: (): ValidationRule => ({
    validator: (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()),
    message: 'Enter a valid email address',
  }),

  phone: (): ValidationRule => ({
    validator: (v) => /^[\d\s\-+().]{6,20}$/.test(v.trim()),
    message: 'Enter a valid phone number',
  }),

  dateOfBirth: (): ValidationRule => ({
    validator: (v) => {
      const date = new Date(v)
      if (isNaN(date.getTime())) return false
      const today = new Date()
      const age = today.getFullYear() - date.getFullYear()
      const monthDiff = today.getMonth() - date.getMonth()
      const dayDiff = today.getDate() - date.getDate()
      const adjustedAge = monthDiff < 0 || (monthDiff === 0 && dayDiff < 0) ? age - 1 : age
      return adjustedAge >= 18
    },
    message: 'Applicant must be at least 18 years old',
  }),

  passportNumber: (): ValidationRule => ({
    validator: (v) => /^[A-Z0-9]{6,12}$/i.test(v.trim()),
    message: 'Passport number must be 6–12 alphanumeric characters',
  }),
}

export function validate(fieldRules: ValidationRule[], value: string): string | null {
  for (const rule of fieldRules) {
    if (!rule.validator(value)) return rule.message
  }
  return null
}

export function useValidation<T extends Record<string, string>>(
  fields: () => T,
  fieldRules: Record<keyof T, ValidationRule[]>,
) {
  const errors = reactive<Record<string, string | null>>({})

  function validateField(key: keyof T) {
    const value = fields()[key] ?? ''
    errors[key as string] = validate(fieldRules[key], value)
  }

  function validateAll(): boolean {
    const current = fields()
    let valid = true
    for (const key in fieldRules) {
      const value = current[key] ?? ''
      errors[key] = validate(fieldRules[key], value)
      if (errors[key]) valid = false
    }
    return valid
  }

  function clearErrors() {
    for (const key in errors) {
      errors[key] = null
    }
  }

  return { errors, validateField, validateAll, clearErrors }
}
