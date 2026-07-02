import { defineStore } from 'pinia'
import { ref } from 'vue'
import { auth } from '@/firebase/config'
import { onAuthStateChanged, signOut, type User } from 'firebase/auth'

export const useAuthStore = defineStore('auth', () => {
  const user = ref<User | null>(null)
  const loading = ref(true)
  const isAuthenticated = ref(false)

  // Initialize and track auth state
  onAuthStateChanged(auth, (currentUser) => {
    user.value = currentUser
    isAuthenticated.value = !!currentUser
    loading.value = false
  })

  async function logout() {
    loading.value = true
    try {
      await signOut(auth)
      user.value = null
      isAuthenticated.value = false
    } finally {
      loading.value = false
    }
  }

  return {
    user,
    loading,
    isAuthenticated,
    logout
  }
})
