<template>
  <AppCard
    hoverable
    clickable
    class="group flex flex-col h-full overflow-hidden border-t-2! hover:border-t-teal! border-t-transparent"
    @click="$emit('select', project)"
  >
    <!-- Image -->
    <div class="relative overflow-hidden aspect-video w-full bg-mist">
      <img
        v-if="project.imageUrl"
        :src="project.imageUrl"
        :alt="project.title"
        class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-104"
      />
      <!-- Category Badge -->
      <span class="absolute top-4 left-4 bg-teal text-white text-[10px] font-semibold tracking-wider uppercase px-2.5 py-1 rounded-full shadow-xs">
        {{ getCategoryName(project.category) }}
      </span>
    </div>

    <!-- Content -->
    <div class="flex-1 flex flex-col justify-between text-left">
      <div class="space-y-2">
        <h3 class="font-display font-bold text-navy text-lg group-hover:text-teal transition-colors duration-250">
          {{ project.title }}
        </h3>
        <p class="font-body font-normal text-mid text-sm leading-relaxed line-clamp-2">
          {{ project.shortDescription }}
        </p>
      </div>

      <div class="pt-4 border-t border-border mt-4 flex items-center text-teal font-body text-xs font-semibold uppercase tracking-wider group-hover:translate-x-1 transition-transform duration-200">
        <span>View Project &rarr;</span>
      </div>
    </div>
  </AppCard>
</template>

<script setup lang="ts">
import type { Project } from '@/types'
import { useContentStore } from '@/stores/content'
import AppCard from '@/components/common/AppCard.vue'

defineProps<{
  project: Project
}>()

defineEmits<{
  (e: 'select', project: Project): void
}>()

const contentStore = useContentStore()

function getCategoryName(catId: string): string {
  // If store categories are empty, return fallback name based on id
  if (contentStore.categories.length === 0) {
    if (catId === 'mobile') return 'Mobile Apps'
    if (catId === 'web') return 'Web Platforms'
    if (catId === 'consultancy') return 'Consultancy'
    return catId
  }
  const category = contentStore.categories.find(c => c.id === catId)
  return category ? category.name : catId
}
</script>
