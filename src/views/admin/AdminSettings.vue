<template>
  <div class="min-h-screen bg-mist/30 flex">
    <AdminSidebar :is-open="sidebarOpen" @close="sidebarOpen = false" />
    <div class="flex-1 flex flex-col min-h-screen">
      <header class="h-20 bg-white border-b border-border flex items-center justify-between px-6 lg:px-8">
        <div class="flex items-center gap-4">
          <button type="button" class="lg:hidden text-charcoal hover:bg-mist p-2 rounded-lg cursor-pointer" @click="sidebarOpen = true" aria-label="Open sidebar">
            <MenuIcon class="w-6 h-6" />
          </button>
          <h2 class="text-xl font-display font-bold text-navy">General Settings</h2>
        </div>
      </header>
      <main class="flex-1 p-6 lg:p-8 space-y-6">
        <div class="flex justify-between items-center">
          <p class="font-body text-sm text-mid">Manage application settings and variables.</p>
        </div>
        <AppCard>
          <p class="font-body text-charcoal/80 text-sm">Settings panel shell. Form controllers will follow.</p>
        </AppCard>
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Menu as MenuIcon } from 'lucide-vue-next'
import AdminSidebar from '@/components/layout/AdminSidebar.vue'
import AppCard from '@/components/common/AppCard.vue'

const sidebarOpen = ref(false)
</script>
