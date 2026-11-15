
<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()

function goHome() {
  router.push('/explore')
}
</script>

<template>
  <main class="not-found">
    <div class="content">
      <h1>404</h1>
      <h2>Page Not Found</h2>
      <p>
        Sorry, the page you are looking for doesn't exist
        or may have been moved.
      </p>

      <button @click="goHome">
        Back to Explore
      </button>
    </div>
  </main>
</template>

<style scoped>
.not-found {
  min-height: 75vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
  text-align: center;
}

.content h1 {
  margin: 0;
  color: #2878ff;
  font-size: 100px;
  font-weight: 800;
}

.content h2 {
  color: #153a8a;
  font-size: 28px;
}

.content p {
  color: #64748b;
  line-height: 1.6;
}

button {
  margin-top: 20px;
  padding: 12px 24px;
  color: white;
  background: #2878ff;
  border: none;
  border-radius: 8px;
  cursor: pointer;
}
</style>
