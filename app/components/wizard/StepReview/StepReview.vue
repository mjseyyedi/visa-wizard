<script setup lang="ts">
import { useStepReview } from './useStepReview'

const { store, form, formatDate } = useStepReview()
</script>

<template>
  <div class="step-content">
    <h2 class="step-title">Review Your Application</h2>
    <p class="step-subtitle">Please review all details before submitting. You can go back to make changes.</p>

    <div class="grid-2">
      <!-- Personal -->
      <section class="section">
        <!-- <h3 class="section-heading">Personal Details</h3> -->
        <div class="detail-grid">
          <div class="detail-row">
            <span class="field-label">Full Name</span>
            <span class="field-value">{{ form.fullName || '—' }}</span>
          </div>
          <div class="detail-row">
            <span class="field-label">Email</span>
            <span class="field-value">{{ form.email || '—' }}</span>
          </div>
          <div class="detail-row">
            <span class="field-label">Phone</span>
            <span class="field-value">
              <template v-if="form.citizenshipCountry?.callingCode">
                {{ form.citizenshipCountry.callingCode }} </template>{{ form.phone || '—' }}
            </span>
          </div>
          <div class="detail-row">
            <span class="field-label">Date of Birth</span>
            <span class="field-value">{{ formatDate(form.dateOfBirth) }}</span>
          </div>
          <div class="detail-row">
            <span class="field-label">Passport Number</span>
            <span class="field-value mono">{{ form.passportNumber || '—' }}</span>
          </div>
        </div>
      </section>

      <!-- Countries -->
      <section class="section">
        <!-- <h3 class="section-heading">Travel Information</h3> -->
        <UiCountryCard
          v-if="form.citizenshipCountry"
          :country="form.citizenshipCountry"
          variant="full"
          label="Citizenship"
        />
        <UiCountryCard
          v-if="form.destinationCountry"
          :country="form.destinationCountry"
          variant="full"
          label="Destination"
        />
      </section>
    </div>

    <div class="actions">
      <button class="btn btn-ghost" @click="store.prevStep()">
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path d="M10 3L5 8l5 5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
        Back
      </button>
      <button class="btn btn-primary submit-btn" @click="store.submitApplication()">
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path d="M2 8h10M8 4l4 4-4 4" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
        Submit Application
      </button>
    </div>
  </div>
</template>

<style scoped src="./StepReview.css"></style>
