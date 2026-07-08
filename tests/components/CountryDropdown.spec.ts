import { describe, it, expect, vi, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import { createPinia } from 'pinia'
import CountryDropdown from '../../app/components/ui/CountryDropdown/CountryDropdown.vue'
import type { Country } from '../../app/types'

const mockCountries: Country[] = [
  {
    id: 'DE',
    name: 'Germany',
    flagUrl: '',
    flagEmoji: '🇩🇪',
    capital: 'Berlin',
    callingCode: '+49',
    region: 'Europe',
    population: 83000000,
    languages: ['German'],
  },
  {
    id: 'FR',
    name: 'France',
    flagUrl: '',
    flagEmoji: '🇫🇷',
    capital: 'Paris',
    callingCode: '+33',
    region: 'Europe',
    population: 67000000,
    languages: ['French'],
  },
  {
    id: 'US',
    name: 'United States',
    flagUrl: '',
    flagEmoji: '🇺🇸',
    capital: 'Washington D.C.',
    callingCode: '+1',
    region: 'Americas',
    population: 331000000,
    languages: ['English'],
  },
]

// useCountries is Nuxt auto-imported — stub it as a global for Vitest
const mockSearch = vi.fn((query: string) => {
  if (!query) return mockCountries
  return mockCountries.filter((c) => c.name.toLowerCase().includes(query.toLowerCase()))
})

vi.stubGlobal('useCountries', () => ({
  countries: { value: mockCountries },
  loading: { value: false },
  error: { value: null },
  search: mockSearch,
}))

vi.stubGlobal('useRuntimeConfig', () => ({ public: { apiKey: 'test' } }))

function mountDropdown(props = {}) {
  return mount(CountryDropdown, {
    props: { modelValue: null, placeholder: 'Search country…', ...props },
    global: { plugins: [createPinia()] },
    attachTo: document.body,
  })
}

async function tick() {
  return new Promise((r) => setTimeout(r, 0))
}

describe('CountryDropdown', () => {
  beforeEach(() => {
    document.body.innerHTML = ''
    mockSearch.mockClear()
  })

  it('renders the placeholder text', () => {
    const wrapper = mountDropdown()
    const input = wrapper.find('input')
    expect(input.attributes('placeholder')).toBe('Search country…')
  })

  it('shows dropdown list when input is focused', async () => {
    const wrapper = mountDropdown()
    await wrapper.find('input').trigger('focus')
    expect(wrapper.find('ul').exists()).toBe(true)
  })

  it('filters results when typing', async () => {
    const wrapper = mountDropdown()
    const input = wrapper.find('input')
    await input.trigger('focus')
    await input.setValue('Ger')
    await input.trigger('input')
    await tick()
    const items = wrapper.findAll('.item')
    expect(items.length).toBe(1)
    expect(items[0].text()).toContain('Germany')
  })

  it('emits update:modelValue when an item is selected', async () => {
    const wrapper = mountDropdown()
    await wrapper.find('input').trigger('focus')
    await wrapper.find('.item').trigger('mousedown')
    const emitted = wrapper.emitted('update:modelValue')
    expect(emitted).toBeTruthy()
    expect((emitted![0][0] as Country).name).toBe('Germany')
  })

  it('excludes the excluded country from results', async () => {
    const excluded = mockCountries[0] // Germany
    const wrapper = mountDropdown({ exclude: excluded })
    await wrapper.find('input').trigger('focus')
    const items = wrapper.findAll('.item')
    const names = items.map((i) => i.text())
    expect(names.every((n) => !n.includes('Germany'))).toBe(true)
  })

  it('shows "No countries found" when search returns nothing', async () => {
    mockSearch.mockReturnValueOnce([])
    const wrapper = mountDropdown()
    const input = wrapper.find('input')
    await input.trigger('focus')
    await input.setValue('xyzxyz')
    await input.trigger('input')
    await tick()
    expect(wrapper.find('.empty').exists()).toBe(true)
  })
})
