<script setup lang="ts">
import type { ApplicationStatus } from '~/types'

const props = defineProps<{
  status: ApplicationStatus
  clickable?: boolean
}>()

const emit = defineEmits<{ click: [] }>()
</script>

<template>
  <component
    :is="clickable ? 'button' : 'span'"
    class="badge"
    :class="status.toLowerCase()"
    :title="clickable ? 'Click to change status' : undefined"
    @click="clickable ? emit('click') : undefined"
  >
    <svg v-if="status === 'Approved'" class="badge-icon" width="14" height="14" viewBox="0 0 16 16" fill="none">
      <circle cx="8" cy="8" r="6.5" stroke="currentColor" stroke-width="1.3" />
      <path d="M5.3 8.3l1.8 1.8 3.4-3.8" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
    </svg>
    <svg v-else-if="status === 'Pending'" class="badge-icon" width="14" height="14" viewBox="0 0 16 16" fill="none">
      <circle cx="8" cy="8" r="6.5" stroke="currentColor" stroke-width="1.3" />
      <path d="M8 4.7V8l2.3 1.4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
    </svg>
    <svg v-else class="badge-icon" width="14" height="14" viewBox="0 0 16 16" fill="none">
      <circle cx="8" cy="8" r="6.5" stroke="currentColor" stroke-width="1.3" />
      <path d="M6 6l4 4M10 6l-4 4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
    </svg>
    {{ status }}
  </component>
</template>

<style scoped src="./StatusBadge.css"></style>
