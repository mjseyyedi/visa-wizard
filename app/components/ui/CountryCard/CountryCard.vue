<script setup lang="ts">
import type { Country } from '~/types'
import { useCountryCard } from './useCountryCard'

defineProps<{
  country: Country
  variant?: 'compact' | 'full'
}>()

const { formatPopulation } = useCountryCard()
</script>

<template>
  <div class="country-card" :class="variant">
    <div class="flag-wrap">
      <img
        v-if="country.flagUrl"
        :src="country.flagUrl"
        :alt="`${country.name} flag`"
        class="flag-img"
        loading="lazy"
      />
      <span v-else class="flag-emoji">{{ country.flagEmoji }}</span>
    </div>

    <div class="info">
      <div class="name">{{ country.name }}</div>

      <template v-if="variant === 'full'">
        <div class="meta-row">
          <span class="meta-label">Capital</span>
          <span class="meta-value">{{ country.capital || '—' }}</span>
        </div>
        <div class="meta-row">
          <span class="meta-label">Region</span>
          <span class="meta-value">{{ country.region || '—' }}</span>
        </div>
        <div class="meta-row">
          <span class="meta-label">Population</span>
          <span class="meta-value">{{ formatPopulation(country.population) }}</span>
        </div>
        <div class="meta-row">
          <span class="meta-label">Languages</span>
          <span class="meta-value">{{ country.languages.join(', ') || '—' }}</span>
        </div>
      </template>

      <template v-else>
        <div class="capital">{{ country.capital || '—' }}</div>
      </template>
    </div>
  </div>
</template>

<style scoped src="./CountryCard.css"></style>
