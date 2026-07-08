<script setup lang="ts">
import { useWizardStepper } from './useWizardStepper'

const props = defineProps<{
  currentStep: number
  totalSteps?: number
}>()

const emit = defineEmits<{ goToStep: [step: number] }>()

const { steps } = useWizardStepper()
</script>

<template>
  <div class="stepper">
    <template v-for="(step, i) in steps" :key="step.number">
      <div
        class="step"
        :class="{
          done: currentStep > step.number,
          active: currentStep === step.number,
          clickable: currentStep > step.number,
        }"
        @click="currentStep > step.number ? emit('goToStep', step.number) : undefined"
      >
        <div class="circle">
          <svg v-if="currentStep > step.number" width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M3 8l3.5 3.5 6.5-7" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
          <span v-else>{{ step.number }}</span>
        </div>
        <span class="label">{{ step.label }}</span>
      </div>

      <div v-if="i < steps.length - 1" class="connector" :class="{ done: currentStep > step.number }" />
    </template>
  </div>
</template>

<style scoped src="./WizardStepper.css"></style>
