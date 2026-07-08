<script setup lang="ts">
import type { Country } from '~/types'
import { useCountryDropdown } from './useCountryDropdown'

const props = defineProps<{
  modelValue: Country | null
  exclude?: Country | null
  placeholder?: string
  label?: string
  error?: string | null
}>()

const emit = defineEmits<{
  'update:modelValue': [value: Country | null]
}>()

const {
  query,
  isOpen,
  activeIndex,
  inputRef,
  listRef,
  filtered,
  loading,
  uid,
  open,
  select,
  onInput,
  onKeydown,
} = useCountryDropdown(props, emit)
</script>

<template>
  <div :id="`dropdown-${uid}`" class="dropdown">
    <label v-if="label" class="form-label">{{ label }}</label>

    <div class="input-wrap" :class="{ open: isOpen, error: !!error }">
      <input
        ref="inputRef"
        v-model="query"
        type="text"
        class="form-input"
        :class="{ 'has-error': !!error }"
        :placeholder="loading ? 'Loading countries…' : placeholder ?? 'Search country…'"
        :disabled="loading"
        autocomplete="off"
        role="combobox"
        :aria-expanded="isOpen"
        @focus="open"
        @input="onInput"
        @keydown="onKeydown"
      />
      <span class="chevron" :class="{ rotated: isOpen }">
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path d="M4 6l4 4 4-4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
      </span>
    </div>

    <p v-if="error" class="form-error">{{ error }}</p>

    <Transition name="dropdown-fade">
      <ul v-if="isOpen && !loading" ref="listRef" class="list" role="listbox">
        <li v-if="filtered.length === 0" class="empty">No countries found</li>
        <li
          v-for="(country, i) in filtered"
          :key="country.id || country.name"
          class="item"
          :class="{ active: i === activeIndex, selected: modelValue?.id === country.id }"
          role="option"
          :aria-selected="modelValue?.id === country.id"
          @mousedown.prevent="select(country)"
          @mousemove="activeIndex = i"
        >
          <img
            v-if="country.flagUrl"
            :src="country.flagUrl"
            :alt="country.name"
            class="item-flag"
            loading="lazy"
          />
          <span v-else class="item-emoji">{{ country.flagEmoji }}</span>
          <span class="item-name">{{ country.name }}</span>
          <svg v-if="modelValue?.id === country.id" class="check" width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M2.5 7l3 3 6-6" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
        </li>
      </ul>
    </Transition>
  </div>
</template>

<style scoped src="./CountryDropdown.css"></style>
