import { rules, useValidation } from '~/composables/useValidation'

export function useStepPersonalDetails() {
  const store = useWizardStore()

  const citizenshipCountry = computed(() => store.form.citizenshipCountry)
  const callingCode = computed(() => store.form.citizenshipCountry?.callingCode ?? '')

  const { errors, validateField, validateAll } = useValidation(
    () => ({
      fullName: store.form.fullName,
      email: store.form.email,
      phone: store.form.phone,
      dateOfBirth: store.form.dateOfBirth,
      passportNumber: store.form.passportNumber,
    }),
    {
      fullName: [rules.required('Full name')],
      email: [rules.required('Email'), rules.email()],
      phone: [rules.required('Phone number'), rules.phone()],
      dateOfBirth: [rules.required('Date of birth'), rules.dateOfBirth()],
      passportNumber: [rules.required('Passport number'), rules.passportNumber()],
    },
  )

  function next() {
    if (validateAll()) store.nextStep()
  }

  return { store, citizenshipCountry, callingCode, errors, validateField, next }
}
