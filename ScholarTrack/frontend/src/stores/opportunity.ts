
import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import type { Opportunity } from '../types'
import { getOpportunities } from '../api/opportunities'

export const useOpportunityStore = defineStore('opportunity', () => {
  // State
  const opportunities = ref<Opportunity[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)

  // Four page states
  const isEmpty = computed(
    () => !loading.value &&
      !error.value &&
      opportunities.value.length === 0,
  )

  const hasData = computed(
    () => !loading.value &&
      !error.value &&
      opportunities.value.length > 0,
  )

  // Fetch opportunities from API
  async function fetchOpportunities() {
    loading.value = true
    error.value = null

    try {
      opportunities.value = await getOpportunities()
    } catch (err) {
      error.value = err instanceof Error
        ? err.message
        : 'Failed to load opportunities.'
    } finally {
      loading.value = false
    }
  }

  // Clear data
  function clearOpportunities() {
    opportunities.value = []
    error.value = null
  }

  return {
    opportunities,
    loading,
    error,
    isEmpty,
    hasData,
    fetchOpportunities,
    clearOpportunities,
  }
})
