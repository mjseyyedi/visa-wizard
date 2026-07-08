import geographyIcon from '~/assets/icons/geography.svg'
import identityIcon from '~/assets/icons/identity.svg'
import verificationIcon from '~/assets/icons/verification.svg'

export function useWizardStepper() {
  const steps = [
    { number: 1, label: 'Geography', icon: geographyIcon },
    { number: 2, label: 'Identity', icon: identityIcon },
    { number: 3, label: 'Verification', icon: verificationIcon },
  ]

  return { steps }
}
