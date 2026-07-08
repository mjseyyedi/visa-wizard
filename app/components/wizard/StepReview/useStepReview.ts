export function useStepReview() {
  const store = useWizardStore()

  const form = computed(() => store.form)

  function formatDate(iso: string): string {
    if (!iso) return '—'
    const d = new Date(iso)
    return d.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })
  }

  return { store, form, formatDate }
}
