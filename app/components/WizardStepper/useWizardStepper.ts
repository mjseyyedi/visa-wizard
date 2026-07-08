export function useWizardStepper() {
  const steps = [
    { number: 1, label: 'Country Selection' },
    { number: 2, label: 'Personal Details' },
    { number: 3, label: 'Review & Submit' },
  ]

  return { steps }
}
