<script setup lang="ts">
import { useApplicationsList } from './useApplicationsList'

const { store, formatDate } = useApplicationsList()
</script>

<template>
  <section class="list-section card">
    <div class="list-header">
      <h2 class="section-title">Submitted Applications</h2>
      <span v-if="store.applications.length > 0" class="count-badge">
        {{ store.applications.length }}
      </span>
    </div>

    <div v-if="store.applications.length === 0" class="empty-state">
      <svg width="48" height="48" viewBox="0 0 48 48" fill="none" class="empty-icon">
        <rect width="48" height="48" rx="12" fill="#f1f5f9" />
        <path d="M16 24h16M16 17h16M16 31h10" stroke="#94a3b8" stroke-width="2" stroke-linecap="round" />
      </svg>
      <p>No applications yet. Complete the wizard above to submit your first one.</p>
    </div>

    <div v-else class="table-wrap">
      <table class="table">
        <thead>
          <tr>
            <th>Citizenship</th>
            <th>Destination</th>
            <th>Applicant</th>
            <th>Submitted</th>
            <th>Status</th>
          </tr>
        </thead>
        <TransitionGroup name="list" tag="tbody">
          <tr v-for="app in store.applications" :key="app.id">
            <td>
              <div class="country-cell">
                <img
                  v-if="app.citizenshipCountry.flagUrl"
                  :src="app.citizenshipCountry.flagUrl"
                  :alt="app.citizenshipCountry.name"
                  class="flag-sm"
                />
                <span v-else class="emoji-sm">{{ app.citizenshipCountry.flagEmoji }}</span>
                <span>{{ app.citizenshipCountry.name }}</span>
              </div>
            </td>
            <td>
              <div class="country-cell">
                <img
                  v-if="app.destinationCountry.flagUrl"
                  :src="app.destinationCountry.flagUrl"
                  :alt="app.destinationCountry.name"
                  class="flag-sm"
                />
                <span v-else class="emoji-sm">{{ app.destinationCountry.flagEmoji }}</span>
                <span>{{ app.destinationCountry.name }}</span>
              </div>
            </td>
            <td class="applicant">{{ app.applicantName }}</td>
            <td class="date">{{ formatDate(app.submittedAt) }}</td>
            <td>
              <UiStatusBadge
                :status="app.status"
                :clickable="true"
                @click="store.cycleStatus(app.id)"
              />
            </td>
          </tr>
        </TransitionGroup>
      </table>
    </div>
  </section>
</template>

<style scoped src="./ApplicationsList.css"></style>
