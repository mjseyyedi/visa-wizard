export interface Country {
  id: string
  name: string
  flagUrl: string
  flagEmoji: string
  capital: string
  callingCode: string
  region: string
  population: number
  languages: string[]
}

export interface WizardForm {
  citizenshipCountry: Country | null
  destinationCountry: Country | null
  fullName: string
  email: string
  phone: string
  dateOfBirth: string
  passportNumber: string
}

export type ApplicationStatus = 'Pending' | 'Approved' | 'Rejected'

export interface Application {
  id: string
  citizenshipCountry: Country
  destinationCountry: Country
  applicantName: string
  submittedAt: string
  status: ApplicationStatus
}

export interface ValidationRule {
  validator: (value: string) => boolean
  message: string
}
