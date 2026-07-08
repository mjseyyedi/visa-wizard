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
        <img :src="step.icon" :alt="step.label" class="step-icon" />
        <span class="label">{{ step.label }}</span>
      </div>

      <div v-if="i < steps.length - 1" class="connector" :class="{ done: currentStep > step.number }" />
    </template>
  </div>
</template>

<style scoped src="./WizardStepper.css"></style>
