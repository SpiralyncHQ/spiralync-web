<template>
  <div class="min-h-screen bg-mist/30 flex">
    <AdminSidebar :is-open="sidebarOpen" @close="sidebarOpen = false" />
    
    <div class="flex-1 flex flex-col min-h-screen">
      <header class="h-20 bg-white border-b border-border flex items-center justify-between px-6 lg:px-8">
        <div class="flex items-center gap-4">
          <button type="button" class="lg:hidden text-charcoal hover:bg-mist p-2 rounded-lg cursor-pointer" @click="sidebarOpen = true" aria-label="Open sidebar">
            <MenuIcon class="w-6 h-6" />
          </button>
          <h2 class="text-xl font-display font-bold text-navy">Dashboard Overview</h2>
        </div>
      </header>
      
      <main class="flex-1 p-6 lg:p-8 space-y-6">
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          <AppCard v-for="(stat, idx) in stats" :key="idx">
            <div class="space-y-2 font-body">
              <p class="text-xs font-semibold text-mid uppercase tracking-wider">{{ stat.name }}</p>
              <h3 class="text-3xl font-display font-extrabold text-navy">{{ stat.value }}</h3>
            </div>
          </AppCard>
        </div>
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
const stats = [
  { name: 'Total Projects', value: '12' },
  { name: 'Active Openings', value: '3' },
  { name: 'Blog Posts', value: '24' },
  { name: 'Unread Enquiries', value: '5' }
]
</script>
