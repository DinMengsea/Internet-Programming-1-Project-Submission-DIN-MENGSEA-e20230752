
<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import { opportunities } from '../data/opportunities'
import OpportunityGrid from '../components/OpportunitiesGrid.vue'

const router = useRouter()
const searchQuery = ref('')

const filteredOpportunities = computed(() => {
  const query = searchQuery.value.trim().toLowerCase()

  if (!query) {
    return opportunities
  }

  return opportunities.filter((opportunity) => {
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
</script>

<template>
  <main class="explore-page">
    <header class="page-heading">
      <p class="eyebrow">YOUR NEXT OPPORTUNITY STARTS HERE</p>
      <h1>Explore Opportunities</h1>
      <p>Discover scholarships, competitions, and more.</p>
    </header>

    <input
      v-model="searchQuery"
      type="search"
      placeholder="Search by title, provider, category, or country..."
      aria-label="Search opportunities"
      class="search-input"
    />

    <p class="results-count">
      {{ filteredOpportunities.length }} opportunities found
    </p>

    <OpportunityGrid
      :opportunities="filteredOpportunities"
      @view-details="viewDetails"
    />
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
</style>
