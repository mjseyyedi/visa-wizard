<script setup lang="ts">
import type { ApplicationStatus } from '~/types'

const props = defineProps<{
  status: ApplicationStatus
  clickable?: boolean
}>()

const emit = defineEmits<{ click: [] }>()
</script>

<template>
  <button
    v-if="clickable"
    class="badge"
    :class="status.toLowerCase()"
    :title="`Click to change status`"
    @click="emit('click')"
  >
    {{ status }}
  </button>
  <span v-else class="badge" :class="status.toLowerCase()">{{ status }}</span>
</template>

<style scoped src="./StatusBadge.css"></style>
