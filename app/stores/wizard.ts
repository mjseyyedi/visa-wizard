import { defineStore } from 'pinia'
import type { Application, ApplicationStatus, Country, WizardForm } from '~/types'

const STATUSES: ApplicationStatus[] = ['Pending', 'Approved', 'Rejected']

function emptyForm(): WizardForm {
  return {
    citizenshipCountry: null,
    destinationCountry: null,
    fullName: '',
    email: '',
    phone: '',
    dateOfBirth: '',
    passportNumber: '',
  }
}

export const useWizardStore = defineStore('wizard', () => {
  const currentStep = ref(1)
  const navDirection = ref<'forward' | 'backward'>('forward')
  const form = ref<WizardForm>(emptyForm())
  const applications = ref<Application[]>([])

  function goToStep(step: number) {
    navDirection.value = step > currentStep.value ? 'forward' : 'backward'
    currentStep.value = step
  }

  function nextStep() {
    goToStep(currentStep.value + 1)
  }

  function prevStep() {
    goToStep(currentStep.value - 1)
  }

  function updateForm(patch: Partial<WizardForm>) {
    form.value = { ...form.value, ...patch }
  }

  function setCitizenshipCountry(country: Country | null) {
    form.value.citizenshipCountry = country
  }

  function setDestinationCountry(country: Country | null) {
    form.value.destinationCountry = country
  }

  function submitApplication() {
    const { citizenshipCountry, destinationCountry, fullName } = form.value
    if (!citizenshipCountry || !destinationCountry) return

    const status = STATUSES[Math.floor(Math.random() * STATUSES.length)]

    applications.value.unshift({
      id: crypto.randomUUID(),
      citizenshipCountry,
      destinationCountry,
      applicantName: fullName,
      submittedAt: new Date().toISOString(),
      status,
    })

    form.value = emptyForm()
    currentStep.value = 1
    navDirection.value = 'forward'
  }

  function cycleStatus(id: string) {
    const app = applications.value.find((a) => a.id === id)
    if (!app) return
    const idx = STATUSES.indexOf(app.status)
    app.status = STATUSES[(idx + 1) % STATUSES.length]
  }

  return {
    currentStep,
    navDirection,
    form,
    applications,
    goToStep,
    nextStep,
    prevStep,
    updateForm,
    setCitizenshipCountry,
    setDestinationCountry,
    submitApplication,
    cycleStatus,
  }
})
