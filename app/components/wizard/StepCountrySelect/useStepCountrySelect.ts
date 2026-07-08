export function useStepCountrySelect() {
  const store = useWizardStore()

  const citizenshipError = ref<string | null>(null)
  const destinationError = ref<string | null>(null)

  function validate(): boolean {
    let valid = true
    if (!store.form.citizenshipCountry) {
      citizenshipError.value = 'Please select a country of citizenship'
      valid = false
    } else {
      citizenshipError.value = null
    }
    if (!store.form.destinationCountry) {
      destinationError.value = 'Please select a destination country'
      valid = false
    } else {
      destinationError.value = null
    }
    return valid
  }

  function next() {
    if (validate()) store.nextStep()
  }

  return { store, citizenshipError, destinationError, next }
}
