import StepCountrySelect from '~/components/wizard/StepCountrySelect/StepCountrySelect.vue'
import StepPersonalDetails from '~/components/wizard/StepPersonalDetails/StepPersonalDetails.vue'
import StepReview from '~/components/wizard/StepReview/StepReview.vue'

const stepComponents = {
  1: StepCountrySelect,
  2: StepPersonalDetails,
  3: StepReview,
}

export function useIndexPage() {
  const store = useWizardStore()

  const currentStepComponent = computed(() => stepComponents[store.currentStep as 1 | 2 | 3])

  return { store, currentStepComponent }
}
