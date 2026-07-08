<script setup lang="ts">
import { useApplicationsList } from './useApplicationsList'

const { store, formatDate } = useApplicationsList()
</script>

<template>
  <section class="list-section card">
    <div class="list-header">
      <h2 class="section-title">Recent Submissions</h2>
      <span v-if="store.applications.length > 0" class="count-text">
        {{ store.applications.length }} Records
      </span>
    </div>

    <div v-if="store.applications.length === 0" class="empty-state">
      <svg width="48" height="48" viewBox="0 0 48 48" fill="none" class="empty-icon">
        <rect width="48" height="48" rx="12" fill="#f1f5f9" />
        <path d="M16 24h16M16 17h16M16 31h10" stroke="#94a3b8" stroke-width="2" stroke-linecap="round" />
      </svg>
      <p>No applications yet. Complete the wizard above to submit your first one.</p>
    </div>

    <TransitionGroup v-else name="list" tag="div" class="app-list">
      <div v-for="app in store.applications" :key="app.id" class="app-card">
        <div class="flag-stack">
          <span class="flag-coin">
            <img
              v-if="app.citizenshipCountry.flagUrl"
              :src="app.citizenshipCountry.flagUrl"
              :alt="app.citizenshipCountry.name"
            />
            <span v-else class="flag-emoji">{{ app.citizenshipCountry.flagEmoji }}</span>
          </span>
          <span class="flag-coin second">
            <img
              v-if="app.destinationCountry.flagUrl"
              :src="app.destinationCountry.flagUrl"
              :alt="app.destinationCountry.name"
            />
            <span v-else class="flag-emoji">{{ app.destinationCountry.flagEmoji }}</span>
          </span>
        </div>

        <div class="route-info">
          <div class="applicant">{{ app.applicantName }}</div>
          <div class="route">
            <span>{{ app.citizenshipCountry.name }}</span>
            <span class="arrow">→</span>
            <span>{{ app.destinationCountry.name }}</span>
          </div>
        </div>

        <div class="submitted-info">
          <div class="submitted-label">Submitted</div>
          <div class="submitted-date">{{ formatDate(app.submittedAt) }}</div>
        </div>

        <UiStatusBadge
          :status="app.status"
          :clickable="true"
          @click="store.cycleStatus(app.id)"
        />
      </div>
    </TransitionGroup>
  </section>
</template>

<style scoped src="./ApplicationsList.css"></style>
