<script setup lang="ts">
import type { Country } from '~/types'

defineProps<{
  country: Country
  variant?: 'compact' | 'full'
  label?: string
}>()
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
      <div v-if="variant === 'full' && label" class="review-label">{{ label }}</div>
      <div class="name">{{ country.name }}</div>
      <div v-if="variant === 'full'" class="summary">
        Pop: {{ country.population.toLocaleString('en-US') }} • {{ country.region || '—' }}
      </div>
      <div v-else class="capital">{{ country.capital || '—' }}</div>
    </div>
  </div>
</template>

<style scoped src="./CountryCard.css"></style>
