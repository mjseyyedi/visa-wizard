import Fuse from 'fuse.js'
import type { Country } from '~/types'

interface ApiCountry {
  names: { common: string }
  codes: { alpha_2: string }
  capitals: Array<{ name: string }>
  flag: { url_png: string; url_svg: string; emoji: string }
  region: string
  population: number
  languages: Array<{ name: string }>
  calling_codes: string[]
}

interface ApiResponse {
  data: {
    objects: ApiCountry[]
    meta: { total: number; count: number; more: boolean }
  }
}

const BASE_URL = 'https://api.restcountries.com/countries/v5'

function normalize(raw: ApiCountry): Country {
  const code = raw.calling_codes?.[0] ?? ''
  return {
    id: raw.codes?.alpha_2 ?? raw.names.common,
    name: raw.names.common,
    flagUrl: raw.flag?.url_png ?? '',
    flagEmoji: raw.flag?.emoji ?? '',
    capital: raw.capitals?.[0]?.name ?? '',
    callingCode: code ? `+${code}` : '',
    region: raw.region ?? '',
    population: raw.population ?? 0,
    languages: (raw.languages ?? []).map((l) => l.name),
  }
}

async function fetchPage(apiKey: string, offset: number): Promise<ApiCountry[]> {
  const res = await fetch(`${BASE_URL}?limit=100&offset=${offset}`, {
    headers: { Authorization: `Bearer ${apiKey}` },
  })
  if (!res.ok) throw new Error(`Countries API error: ${res.status}`)
  const json: ApiResponse = await res.json()
  return json.data.objects
}

// Module-level singleton so data is fetched only once per session
let cachedCountries: Country[] | null = null
let loadingPromise: Promise<Country[]> | null = null

export function useCountries() {
  const config = useRuntimeConfig()
  const apiKey = config.public.apiKey as string

  const countries = ref<Country[]>(cachedCountries ?? [])
  const loading = ref(!cachedCountries)
  const error = ref<string | null>(null)

  const fuse = computed(
    () =>
      new Fuse(countries.value, {
        keys: ['name', 'capital'],
        threshold: 0.4,
        distance: 100,
      }),
  )

  async function loadCountries() {
    if (cachedCountries) {
      countries.value = cachedCountries
      loading.value = false
      return
    }

    if (loadingPromise) {
      cachedCountries = await loadingPromise
      countries.value = cachedCountries
      loading.value = false
      return
    }

    loadingPromise = (async () => {
      const [page0, page1, page2] = await Promise.all([
        fetchPage(apiKey, 0),
        fetchPage(apiKey, 100),
        fetchPage(apiKey, 200),
      ])
      return [...page0, ...page1, ...page2]
        .map(normalize)
        .filter((c) => c.name)
        .sort((a, b) => a.name.localeCompare(b.name))
    })()

    try {
      cachedCountries = await loadingPromise
      countries.value = cachedCountries
    } catch (e) {
      error.value = e instanceof Error ? e.message : 'Failed to load countries'
    } finally {
      loading.value = false
      loadingPromise = null
    }
  }

  function search(query: string): Country[] {
    if (!query.trim()) return countries.value
    return fuse.value.search(query).map((r) => r.item)
  }

  onMounted(loadCountries)

  return { countries, loading, error, search }
}
