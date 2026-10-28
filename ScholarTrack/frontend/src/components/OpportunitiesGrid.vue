
<script setup lang="ts">
import type { Opportunity } from '../types'
import OpportunityCard from './OpportunitiesCard.vue'

defineProps<{
  opportunities: Opportunity[]
}>()

const emit = defineEmits<{
  viewDetails: [id: string]
}>()
</script>

<template>
  <div v-if="opportunities.length" class="opportunity-grid">
    <OpportunityCard
      v-for="opportunity in opportunities"
      :key="opportunity.id"
      :opportunity="opportunity"
      @view-details="emit('viewDetails', $event)"
    />
  </div>

  <p v-else class="empty-message">
    No opportunities found.
  </p>
</template>

<style scoped>
.opportunity-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 22px;
}

.empty-message {
  padding: 30px;
  text-align: center;
  color: #64748b;
}
</style>
