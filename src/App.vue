<template>
  <div class="flex flex-col min-h-screen">
    <SplashScreen v-if="showSplash" @done="onSplashDone" />

    <template v-else>
      <!-- Conditionally render Header on user-facing pages -->
      <AppHeader v-if="!isAdminRoute" />

      <!-- Main Layout -->
      <main class="flex-1 flex flex-col" :class="{ 'pt-16 sm:pt-20': !['/', '/blog', '/careers', '/tty_admin'].includes(route.path) }">
        <router-view />
      </main>

      <!-- Conditionally render Footer on user-facing pages -->
      <AppFooter v-if="!isAdminRoute" />
    </template>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import SplashScreen from '@/components/layout/SplashScreen.vue'
import AppHeader from '@/components/layout/AppHeader.vue'
import AppFooter from '@/components/layout/AppFooter.vue'

const route = useRoute()
const showSplash = ref(true)

// Check if current route is an admin view
const isAdminRoute = computed(() => {
  return route.path.startsWith('/tty_admin')
})

function onSplashDone() {
  showSplash.value = false
}

onMounted(() => {
  // If splash was already seen in this session, don't show it
  const isSeen = sessionStorage.getItem('spiralync_splash_seen') === 'true'
  if (isSeen) {
    showSplash.value = false
  }
})
</script>
