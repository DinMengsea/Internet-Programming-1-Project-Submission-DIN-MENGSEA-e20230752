
<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'
import { useOpportunityStore } from '../stores/opportunity'
import OpportunityGrid from '../components/OpportunitiesGrid.vue'

const router = useRouter()
const opportunityStore = useOpportunityStore()

// Extract reactive state from Pinia
const {
  opportunities,
  loading,
  error,
  isEmpty,
  hasData,
} = storeToRefs(opportunityStore)

const searchQuery = ref('')

// Fetch opportunities from JSON Server
onMounted(() => {
  opportunityStore.fetchOpportunities()
})

// Filter opportunities
const filteredOpportunities = computed(() => {
  const query = searchQuery.value.trim().toLowerCase()

  if (!query) {
    return opportunities.value
  }

  return opportunities.value.filter((opportunity) => {
    return (
      opportunity.title.toLowerCase().includes(query) ||
      opportunity.provider.toLowerCase().includes(query) ||
      opportunity.category.toLowerCase().includes(query) ||
      opportunity.country.toLowerCase().includes(query)
    )
  })
})

function viewDetails(id: string) {
  router.push(`/opportunities/${id}`)
}

function retryLoading() {
  opportunityStore.fetchOpportunities()
}
</script>

<template>
  <main class="explore-page">
    <header class="page-heading">
      <p class="eyebrow">YOUR NEXT OPPORTUNITY STARTS HERE</p>
      <h1>Explore Opportunities</h1>
      <p>Discover scholarships, competitions, and more.</p>
    </header>

    <!-- Search -->
    <input
      v-model="searchQuery"
      type="search"
      placeholder="Search by title, provider, category, or country..."
      aria-label="Search opportunities"
      class="search-input"
    />

    <!-- Loading State -->
    <div v-if="loading" class="state-message">
      <p>Loading opportunities...</p>
    </div>

    <!-- Error State -->
    <div v-else-if="error" class="state-message error-state">
      <p>{{ error }}</p>
      <button type="button" @click="retryLoading">
        Try Again
      </button>
    </div>

    <!-- Empty State -->
    <div v-else-if="isEmpty" class="state-message">
      <p>No opportunities available yet.</p>
    </div>

    <!-- Success State -->
    <section v-else-if="hasData">
      <p class="results-count">
        {{ filteredOpportunities.length }} opportunities found
      </p>

      <div
        v-if="filteredOpportunities.length === 0"
        class="state-message"
      >
        <p>No matching opportunities found.</p>
        <p>Try another search keyword.</p>
      </div>

      <OpportunityGrid
        v-else
        :opportunities="filteredOpportunities"
        @view-details="viewDetails"
      />
    </section>
  </main>
</template>

<style scoped>
.explore-page {
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px 24px;
}

.page-heading {
  margin-bottom: 28px;
}

.eyebrow {
  color: #2878ff;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 1px;
}

h1 {
  margin: 8px 0;
  color: #153a8a;
  font-size: clamp(28px, 4vw, 40px);
}

.page-heading > p:last-child {
  color: #64748b;
}

.search-input {
  box-sizing: border-box;
  width: 100%;
  margin-bottom: 16px;
  padding: 14px 16px;
  border: 1px solid #cbd5e1;
  border-radius: 10px;
  font: inherit;
}

.search-input:focus {
  border-color: #2878ff;
  outline: 2px solid #dbeafe;
}

.results-count {
  margin-bottom: 20px;
  color: #64748b;
  font-size: 14px;
}

.state-message {
  padding: 30px;
  margin-top: 20px;
  text-align: center;
  color: #64748b;
  background: #f8fafc;
  border-radius: 10px;
}

.error-state {
  color: #dc2626;
}

.error-state button {
  padding: 10px 20px;
  margin-top: 12px;
  color: white;
  background: #2878ff;
  border: none;
  border-radius: 8px;
  cursor: pointer;
}
</style>
