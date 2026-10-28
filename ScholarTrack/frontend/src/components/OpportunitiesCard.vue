
<script setup lang="ts">
import type { Opportunity } from '../types'

defineProps<{
  opportunity: Opportunity
}>()

const emit = defineEmits<{
  viewDetails: [id: string]
}>()
</script>

<template>
  <article class="opportunity-card">
    <img
      :src="opportunity.imageUrl"
      :alt="opportunity.title"
      class="opportunity-image"
    />

    <div class="card-content">
      <span class="category">{{ opportunity.category }}</span>

      <h2>{{ opportunity.title }}</h2>
      <p class="provider">{{ opportunity.provider }}</p>
      <p>{{ opportunity.description }}</p>

      <div class="card-meta">
        <span>{{ opportunity.country }}</span>
        <span>Deadline: {{ opportunity.deadline }}</span>
      </div>

      <strong>{{ opportunity.funding }}</strong>

      <button @click="emit('viewDetails', opportunity.id)">
        View Details
      </button>
    </div>
  </article>
</template>

<style scoped>
.opportunity-card {
  overflow: hidden;
  border: 1px solid #dbe5f5;
  border-radius: 14px;
  background: white;
}

.opportunity-image {
  width: 100%;
  height: 160px;
  object-fit: cover;
  background: #f3f7ff;
}

.card-content {
  padding: 18px;
}

.category {
  display: inline-block;
  padding: 5px 10px;
  border-radius: 20px;
  background: #e8efff;
  color: #153a8a;
  font-size: 12px;
}

h2 {
  margin-bottom: 6px;
  color: #153a8a;
  font-size: 19px;
}

.provider {
  color: #64748b;
  font-size: 14px;
}

.card-meta {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 8px;
  margin: 16px 0;
  color: #64748b;
  font-size: 12px;
}

button {
  width: 100%;
  margin-top: 14px;
  padding: 10px;
  border: none;
  border-radius: 8px;
  background: #2878ff;
  color: white;
  cursor: pointer;
}

button:hover {
  background: #153a8a;
}
</style>
