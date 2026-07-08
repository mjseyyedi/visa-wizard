import type { Country } from '~/types'

interface Props {
  modelValue: Country | null
  exclude?: Country | null
  placeholder?: string
  label?: string
  error?: string | null
}

type Emit = (event: 'update:modelValue', value: Country | null) => void

export function useCountryDropdown(props: Props, emit: Emit) {
  const { loading, search } = useCountries()

  const query = ref('')
  const isOpen = ref(false)
  const activeIndex = ref(-1)
  const inputRef = ref<HTMLInputElement | null>(null)
  const listRef = ref<HTMLUListElement | null>(null)

  const filtered = computed(() => {
    const results = search(query.value)
    if (props.exclude) {
      return results.filter((c) => c.id !== props.exclude!.id && c.name !== props.exclude!.name)
    }
    return results
  })

  function open() {
    isOpen.value = true
    activeIndex.value = -1
  }

  function close() {
    isOpen.value = false
    activeIndex.value = -1
    // Restore query to selected country name if one is selected
    query.value = props.modelValue?.name ?? ''
  }

  function select(country: Country) {
    emit('update:modelValue', country)
    query.value = country.name
    isOpen.value = false
    activeIndex.value = -1
  }

  function onInput() {
    isOpen.value = true
    activeIndex.value = -1
    if (!query.value) {
      emit('update:modelValue', null)
    }
  }

  function scrollActiveIntoView() {
    nextTick(() => {
      const item = listRef.value?.children[activeIndex.value] as HTMLElement | undefined
      item?.scrollIntoView({ block: 'nearest' })
    })
  }

  function onKeydown(e: KeyboardEvent) {
    if (!isOpen.value && e.key === 'ArrowDown') {
      open()
      return
    }
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      activeIndex.value = Math.min(activeIndex.value + 1, filtered.value.length - 1)
      scrollActiveIntoView()
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      activeIndex.value = Math.max(activeIndex.value - 1, 0)
      scrollActiveIntoView()
    } else if (e.key === 'Enter') {
      e.preventDefault()
      if (activeIndex.value >= 0 && filtered.value[activeIndex.value]) {
        select(filtered.value[activeIndex.value])
      }
    } else if (e.key === 'Escape') {
      close()
      inputRef.value?.blur()
    }
  }

  const uid = Math.random().toString(36).slice(2)

  function onClickOutside(e: MouseEvent) {
    const el = document.getElementById(`dropdown-${uid}`)
    if (el && !el.contains(e.target as Node)) {
      close()
    }
  }

  onMounted(() => document.addEventListener('mousedown', onClickOutside))
  onUnmounted(() => document.removeEventListener('mousedown', onClickOutside))

  // Keep input text in sync when modelValue is set externally (e.g., on reset)
  watch(
    () => props.modelValue,
    (val) => {
      if (!isOpen.value) query.value = val?.name ?? ''
    },
    { immediate: true },
  )

  return {
    query,
    isOpen,
    activeIndex,
    inputRef,
    listRef,
    filtered,
    loading,
    uid,
    open,
    close,
    select,
    onInput,
    onKeydown,
  }
}
