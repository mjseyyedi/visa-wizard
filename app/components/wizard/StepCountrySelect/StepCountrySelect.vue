<script setup lang="ts">
import { useStepCountrySelect } from './useStepCountrySelect'

const { store, citizenshipError, destinationError, next } = useStepCountrySelect()
</script>

<template>
  <div class="step-content">
    <h2 class="step-title">Where are you travelling?</h2>
    <p class="step-subtitle">Select your country of citizenship and destination country.</p>

    <div class="grid-2">
      <div class="field-group">
        <UiCountryDropdown
          :model-value="store.form.citizenshipCountry"
          :exclude="store.form.destinationCountry"
          label="Country of Citizenship"
          placeholder="Search your country…"
          :error="citizenshipError"
          @update:model-value="store.setCitizenshipCountry($event)"
        />
        <Transition name="card-fade">
          <UiCountryCard v-if="store.form.citizenshipCountry" :country="store.form.citizenshipCountry" />
        </Transition>
      </div>

      <div class="field-group">
        <UiCountryDropdown
          :model-value="store.form.destinationCountry"
          :exclude="store.form.citizenshipCountry"
          label="Destination Country"
          placeholder="Search destination…"
          :error="destinationError"
          @update:model-value="store.setDestinationCountry($event)"
        />
        <Transition name="card-fade">
          <UiCountryCard v-if="store.form.destinationCountry" :country="store.form.destinationCountry" />
        </Transition>
      </div>
    </div>

    <div class="actions">
      <button class="btn btn-primary" @click="next">
        Next
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path d="M6 3l5 5-5 5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
      </button>
    </div>
  </div>
</template>

<style scoped src="./StepCountrySelect.css"></style>
