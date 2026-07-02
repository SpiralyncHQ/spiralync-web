<template>
  <div class="min-h-screen bg-navy flex items-center justify-center p-4">
    <div class="max-w-md w-full">
      <AppCard class="border-0 shadow-2xl">
        <div class="space-y-6 text-center font-body mb-6">
          <svg class="h-16 w-auto mx-auto" viewBox="0 0 500 120" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g transform="translate(10, 10)">
              <!-- Outer Spiral Arc -->
              <path d="M 68 32 A 25 25 0 1 0 50 75" fill="none" stroke="#0A2540" stroke-width="12" stroke-linecap="round" />
              <!-- Inner Spiral Arc -->
              <path d="M 50 75 A 15 15 0 0 0 50 45 A 5 5 0 0 0 50 55" fill="none" stroke="#00C896" stroke-width="8" stroke-linecap="round" />
            </g>
            <text x="130" y="70" font-family="'Plus Jakarta Sans', sans-serif" font-size="42" font-weight="800">
              <tspan fill="#0A2540">Spira</tspan>
              <tspan fill="#00C896">lync</tspan>
            </text>
          </svg>
          <h2 class="text-2xl font-display font-bold text-navy">Administrative Portal</h2>
          <p class="text-sm text-mid font-light">Please sign in to manage project data and applications</p>
        </div>

        <form class="space-y-4 font-body" @submit.prevent="handleLogin">
          <div>
            <label class="block text-xs font-semibold text-charcoal uppercase tracking-wider mb-2">Email Address</label>
            <input v-model="email" type="email" class="w-full px-4 py-2 border border-border rounded-lg focus:outline-hidden focus:border-teal focus:ring-1 focus:ring-teal bg-mist/20" placeholder="admin@spiralync.com" required />
          </div>
          <div>
            <label class="block text-xs font-semibold text-charcoal uppercase tracking-wider mb-2">Password</label>
            <input v-model="password" type="password" class="w-full px-4 py-2 border border-border rounded-lg focus:outline-hidden focus:border-teal focus:ring-1 focus:ring-teal bg-mist/20" placeholder="••••••••" required />
          </div>
          <div v-if="errorMsg" class="p-3 bg-red-50 text-red-600 rounded-lg text-xs font-semibold">
            {{ errorMsg }}
          </div>

          <div class="pt-2">
            <AppButton variant="primary" type="submit" class="w-full" :loading="loading">
              Authenticate
            </AppButton>
          </div>
        </form>
      </AppCard>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { auth } from '@/firebase/config'
import { signInWithEmailAndPassword } from 'firebase/auth'
import AppCard from '@/components/common/AppCard.vue'
import AppButton from '@/components/common/AppButton.vue'

const router = useRouter()
const email = ref('')
const password = ref('')
const loading = ref(false)
const errorMsg = ref('')

async function handleLogin() {
  loading.value = true
  errorMsg.value = ''
  try {
    await signInWithEmailAndPassword(auth, email.value, password.value)
    router.push('/tty_admin/dashboard')
  } catch (err: any) {
    errorMsg.value = err.message || 'Authentication failed'
  } finally {
    loading.value = false
  }
}
</script>
