<script setup lang="ts">
import type { Country } from '~/types'

defineProps<{
  citizenshipCountry: Country
  destinationCountry: Country
}>()
</script>

<template>
  <div class="route-card">
    <div class="flag-stack">
      <span class="flag-coin">
        <img
          v-if="citizenshipCountry.flagUrl"
          :src="citizenshipCountry.flagUrl"
          :alt="`${citizenshipCountry.name} flag`"
        />
        <span v-else class="flag-emoji">{{ citizenshipCountry.flagEmoji }}</span>
      </span>
      <span class="flag-coin second">
        <img
          v-if="destinationCountry.flagUrl"
          :src="destinationCountry.flagUrl"
          :alt="`${destinationCountry.name} flag`"
        />
        <span v-else class="flag-emoji">{{ destinationCountry.flagEmoji }}</span>
      </span>
    </div>

    <div class="info">
      <div class="label">Route Validated</div>
      <div class="route">
        <span>{{ citizenshipCountry.name }}</span>
        <span class="arrow">→</span>
        <span>{{ destinationCountry.name }}</span>
      </div>
    </div>

    <span class="check-icon">
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
        <path d="M2.5 7l3 3 6-6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
      </svg>
    </span>
  </div>
</template>

<style scoped src="./RouteValidatedCard.css"></style>
