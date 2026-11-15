
<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import type { Opportunity } from '../types'
import { getOpportunityById } from '../api/opportunities'
import { createApplication } from '../api/applications'

const route = useRoute()
const router = useRouter()

const opportunity = ref<Opportunity | null>(null)
const loading = ref(false)
const error = ref<string | null>(null)

const opportunityId = computed(() => String(route.params.id))

async function fetchOpportunity() {
  loading.value = true
  error.value = null
  opportunity.value = null

  try {
    opportunity.value = await getOpportunityById(opportunityId.value)
  } catch {
    error.value = 'Unable to find this opportunity. It may have been removed.'
  } finally {
    loading.value = false
  }
}

onMounted(fetchOpportunity)
watch(opportunityId, fetchOpportunity)

function goBack() {
  router.push('/explore')
}

// Application form
const studentName = ref('')
const email = ref('')
const motivation = ref('')

const errors = ref({
  studentName: '',
  email: '',
  motivation: '',
})

const submitting = ref(false)
const submitError = ref('')
const successMessage = ref('')

function validateForm(): boolean {
  errors.value = {
    studentName: '',
    email: '',
    motivation: '',
  }

  if (!studentName.value.trim()) {
    errors.value.studentName = 'Please enter your full name.'
  }

  if (!email.value.trim()) {
    errors.value.email = 'Please enter your email address.'
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) {
    errors.value.email = 'Please enter a valid email address.'
  }

  if (!motivation.value.trim()) {
    errors.value.motivation = 'Please explain why you are interested.'
  } else if (motivation.value.trim().length < 20) {
    errors.value.motivation = 'Please write at least 20 characters.'
  }

  return !Object.values(errors.value).some(message => message !== '')
}

async function submitApplication() {
  successMessage.value = ''
  submitError.value = ''

  if (!validateForm() || !opportunity.value) {
    return
  }

  submitting.value = true

  try {
    await createApplication({
      id: `app-${Date.now()}`,
      userId: 'user-001',
      opportunityId: opportunity.value.id,
      studentName: studentName.value.trim(),
      email: email.value.trim(),
      motivation: motivation.value.trim(),
      status: 'Submitted',
      submittedAt: new Date().toISOString().slice(0, 10),
      deadline: opportunity.value.deadline,
    })

    successMessage.value = 'Your application has been submitted successfully!'

    studentName.value = ''
    email.value = ''
    motivation.value = ''

    errors.value = {
      studentName: '',
      email: '',
      motivation: '',
    }
  } catch {
    submitError.value = 'Failed to submit your application. Please try again.'
  } finally {
    submitting.value = false
  }
}
</script>

<template>
  <main class="detail-page">
    <button class="back-button" @click="goBack">
      ← Back to opportunities
    </button>

    <!-- Loading -->
    <div v-if="loading" class="state-message">
      Loading opportunity details...
    </div>

    <!-- Error -->
    <div v-else-if="error" class="state-message error-state">
      <h2>Opportunity Not Found</h2>
      <p>{{ error }}</p>
      <button @click="fetchOpportunity">Try Again</button>
    </div>

    <!-- Success -->
    <article v-else-if="opportunity" class="detail-card">
      <img
        :src="opportunity.imageUrl"
        :alt="opportunity.country"
        class="opportunity-image"
      />

      <div class="detail-content">
        <div class="badges">
          <span class="category-badge">
            {{ opportunity.category }}
          </span>
          <span class="funding-badge">
            {{ opportunity.fundingType }}
          </span>
        </div>

        <h1>{{ opportunity.title }}</h1>

        <p class="provider">
          Provided by {{ opportunity.provider }}
        </p>

        <p class="description">
          {{ opportunity.description }}
        </p>

        <section class="information-grid">
          <div>
            <span>Country</span>
            <strong>{{ opportunity.country }}</strong>
          </div>

          <div>
            <span>Deadline</span>
            <strong>{{ opportunity.deadline }}</strong>
          </div>

          <div>
            <span>Funding</span>
            <strong>{{ opportunity.funding }}</strong>
          </div>

          <div>
            <span>Study Level</span>
            <strong>{{ opportunity.studyLevel.join(', ') }}</strong>
          </div>
        </section>

        <section class="detail-section">
          <h2>Fields of Study</h2>
          <ul>
            <li v-for="field in opportunity.fieldOfStudy" :key="field">
              {{ field }}
            </li>
          </ul>
        </section>

        <section class="detail-section">
          <h2>Eligibility Requirements</h2>
          <ul>
            <li v-for="item in opportunity.eligibility" :key="item">
              {{ item }}
            </li>
          </ul>
        </section>

        <section class="detail-section">
          <h2>Benefits</h2>
          <ul>
            <li v-for="benefit in opportunity.benefits" :key="benefit">
              {{ benefit }}
            </li>
          </ul>
        </section>

        <!-- Application Form -->
        <section class="application-section">
          <h2>Apply for This Opportunity</h2>
          <p class="form-description">
            Complete the form below to submit your application.
          </p>

          <form @submit.prevent="submitApplication" novalidate>
            <div class="form-group">
              <label for="studentName">Full Name</label>
              <input
                id="studentName"
                v-model="studentName"
                type="text"
                placeholder="Enter your full name"
                :class="{ 'input-error': errors.studentName }"
                @input="errors.studentName = ''"
              />
              <small v-if="errors.studentName" class="error-text">
                {{ errors.studentName }}
              </small>
            </div>

            <div class="form-group">
              <label for="email">Email Address</label>
              <input
                id="email"
                v-model="email"
                type="email"
                placeholder="example@email.com"
                :class="{ 'input-error': errors.email }"
                @input="errors.email = ''"
              />
              <small v-if="errors.email" class="error-text">
                {{ errors.email }}
              </small>
            </div>

            <div class="form-group">
              <label for="motivation">Why are you interested?</label>
              <textarea
                id="motivation"
                v-model="motivation"
                rows="5"
                placeholder="Explain why you want to apply..."
                :class="{ 'input-error': errors.motivation }"
                @input="errors.motivation = ''"
              ></textarea>
              <small v-if="errors.motivation" class="error-text">
                {{ errors.motivation }}
              </small>
              <small class="field-hint">
                Minimum 20 characters.
              </small>
            </div>

            <p v-if="submitError" class="error-text submit-message">
              {{ submitError }}
            </p>

            <p v-if="successMessage" class="success-message">
              {{ successMessage }}
            </p>

            <button
              type="submit"
              class="apply-button"
              :disabled="submitting"
            >
              {{ submitting ? 'Submitting...' : 'Submit Application' }}
            </button>
          </form>
        </section>
      </div>
    </article>
  </main>
</template>

<style scoped>
.detail-page {
  max-width: 1000px;
  margin: 0 auto;
  padding: 40px 24px;
}

.back-button {
  margin-bottom: 24px;
  padding: 10px 16px;
  color: #2878ff;
  background: white;
  border: 1px solid #cbd5e1;
  border-radius: 8px;
  cursor: pointer;
}

.detail-card {
  overflow: hidden;
  background: white;
  border: 1px solid #e2e8f0;
  border-radius: 16px;
}

.opportunity-image {
  width: 100%;
  height: 280px;
  object-fit: cover;
  background: #eff6ff;
}

.detail-content {
  padding: 32px;
}

.badges {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.category-badge,
.funding-badge {
  padding: 7px 13px;
  border-radius: 20px;
  font-size: 13px;
  font-weight: 600;
}

.category-badge {
  color: #1d4ed8;
  background: #dbeafe;
}

.funding-badge {
  color: #047857;
  background: #d1fae5;
}

h1 {
  margin: 18px 0 8px;
  color: #153a8a;
  font-size: clamp(28px, 4vw, 38px);
}

.provider,
.description {
  color: #64748b;
  line-height: 1.7;
}

.information-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 20px;
  margin: 30px 0;
  padding: 24px;
  background: #f8fafc;
  border-radius: 12px;
}

.information-grid div {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.information-grid span {
  color: #64748b;
  font-size: 13px;
}

.information-grid strong {
  color: #153a8a;
}

.detail-section {
  margin-top: 30px;
}

.detail-section h2,
.application-section h2 {
  color: #153a8a;
  font-size: 20px;
}

.detail-section li {
  margin: 10px 0;
  color: #475569;
  line-height: 1.6;
}

/* Application form */
.application-section {
  margin-top: 40px;
  padding: 28px;
  background: #f8fafc;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
}

.form-description {
  margin-bottom: 24px;
  color: #64748b;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 20px;
}

.form-group label {
  color: #334155;
  font-weight: 600;
}

.form-group input,
.form-group textarea {
  width: 100%;
  padding: 12px 14px;
  color: #334155;
  background: white;
  border: 1px solid #cbd5e1;
  border-radius: 8px;
  font: inherit;
}

.form-group input:focus,
.form-group textarea:focus {
  outline: none;
  border-color: #2878ff;
  box-shadow: 0 0 0 3px #dbeafe;
}

.form-group textarea {
  resize: vertical;
}

.form-group .input-error {
  border-color: #dc2626;
}

.error-text {
  color: #dc2626;
  font-size: 13px;
}

.field-hint {
  color: #64748b;
  font-size: 12px;
}

.submit-message {
  margin-bottom: 16px;
}

.success-message {
  margin-bottom: 16px;
  padding: 12px;
  color: #047857;
  background: #d1fae5;
  border-radius: 8px;
}

.apply-button {
  margin-top: 10px;
  padding: 13px 24px;
  color: white;
  background: #2878ff;
  border: none;
  border-radius: 8px;
  cursor: pointer;
}

.apply-button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.state-message {
  padding: 40px;
  text-align: center;
  color: #64748b;
  background: #f8fafc;
  border-radius: 12px;
}

.error-state {
  color: #dc2626;
}
</style>
