<script setup lang="ts">
import { useIndexPage } from './useIndexPage'

const { store, currentStepComponent } = useIndexPage()
</script>

<template>
  <div class="page-container">
    <!-- Wizard Card -->
    <div class="card wizard-card">
      <WizardStepper
        :current-step="store.currentStep"
        @go-to-step="store.goToStep($event)"
      />

      <div class="wizard-header">
        <h1 class="app-title">Travel Visa Application</h1>
        <p class="app-subtitle">Complete the steps below to submit your visa application.</p>
      </div>

      <Transition
        :name="store.navDirection === 'forward' ? 'slide-left' : 'slide-right'"
        mode="out-in"
      >
        <component :is="currentStepComponent" :key="store.currentStep" />
      </Transition>
    </div>

    <!-- Applications List -->
    <ApplicationsList />
  </div>
</template>

<style scoped src="./index.css"></style>
