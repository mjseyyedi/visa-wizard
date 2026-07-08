export function useApplicationsList() {
  const store = useWizardStore()

  function formatDate(iso: string): string {
    return new Date(iso).toLocaleDateString('en-US', {
      month: 'short',
      day: '2-digit',
      year: 'numeric',
    })
  }

  return { store, formatDate }
}
