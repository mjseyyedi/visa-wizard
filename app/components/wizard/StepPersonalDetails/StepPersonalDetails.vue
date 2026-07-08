<script setup lang="ts">
import { useStepPersonalDetails } from './useStepPersonalDetails'

const { store, citizenshipCountry, callingCode, errors, validateField, next } = useStepPersonalDetails()
</script>

<template>
  <div class="step-content">
    <h2 class="step-title">Personal Details</h2>
    <p class="step-subtitle">Please fill in your personal information as it appears on your passport.</p>

    <div class="fields">
      <!-- Full Name -->
      <div class="form-field">
        <label class="form-label">Full Name</label>
        <input
          class="form-input"
          :class="{ 'has-error': errors.fullName }"
          type="text"
          placeholder="As on your passport"
          :value="store.form.fullName"
          @input="store.updateForm({ fullName: ($event.target as HTMLInputElement).value })"
          @blur="validateField('fullName')"
        />
        <p v-if="errors.fullName" class="form-error">{{ errors.fullName }}</p>
      </div>

      <div class="grid-2">
        <!-- Email -->
        <div class="form-field">
          <label class="form-label">Email Address</label>
          <input
            class="form-input"
            :class="{ 'has-error': errors.email }"
            type="email"
            placeholder="you@example.com"
            :value="store.form.email"
            @input="store.updateForm({ email: ($event.target as HTMLInputElement).value })"
            @blur="validateField('email')"
          />
          <p v-if="errors.email" class="form-error">{{ errors.email }}</p>
        </div>

        <!-- Phone -->
        <div class="form-field">
          <label class="form-label">Phone Number</label>
          <div class="phone-wrap">
            <span v-if="citizenshipCountry" class="calling-code">
              <img
                v-if="citizenshipCountry.flagUrl"
                :src="citizenshipCountry.flagUrl"
                :alt="`${citizenshipCountry.name} flag`"
                class="calling-code-flag"
              />
              <span v-else class="calling-code-emoji">{{ citizenshipCountry.flagEmoji }}</span>
              <span v-if="callingCode">{{ callingCode }}</span>
            </span>
            <input
              class="form-input phone-input"
              :class="{ 'has-error': errors.phone, 'has-prefix': !!citizenshipCountry }"
              type="tel"
              placeholder="Phone number"
              :value="store.form.phone"
              @input="store.updateForm({ phone: ($event.target as HTMLInputElement).value })"
              @blur="validateField('phone')"
            />
          </div>
          <p v-if="errors.phone" class="form-error">{{ errors.phone }}</p>
        </div>
      </div>

      <div class="grid-2">
        <!-- Date of Birth -->
        <div class="form-field">
          <label class="form-label">Date of Birth</label>
          <input
            class="form-input"
            :class="{ 'has-error': errors.dateOfBirth }"
            type="date"
            :max="new Date().toISOString().split('T')[0]"
            :value="store.form.dateOfBirth"
            @input="store.updateForm({ dateOfBirth: ($event.target as HTMLInputElement).value })"
            @blur="validateField('dateOfBirth')"
          />
          <p v-if="errors.dateOfBirth" class="form-error">{{ errors.dateOfBirth }}</p>
        </div>

        <!-- Passport Number -->
        <div class="form-field">
          <label class="form-label">Passport Number</label>
          <input
            class="form-input"
            :class="{ 'has-error': errors.passportNumber }"
            type="text"
            placeholder="e.g. AB1234567"
            style="text-transform: uppercase;"
            :value="store.form.passportNumber"
            @input="store.updateForm({ passportNumber: ($event.target as HTMLInputElement).value.toUpperCase() })"
            @blur="validateField('passportNumber')"
          />
          <p v-if="errors.passportNumber" class="form-error">{{ errors.passportNumber }}</p>
        </div>
      </div>
    </div>

    <div class="actions">
      <button class="btn btn-ghost" @click="store.prevStep()">
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path d="M10 3L5 8l5 5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
        Back
      </button>
      <button class="btn btn-primary" @click="next">
        Review
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path d="M6 3l5 5-5 5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
      </button>
    </div>
  </div>
</template>

<style scoped src="./StepPersonalDetails.css"></style>
