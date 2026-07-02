<template>
  <RouterLink
    :to="`/blog/${post.slug}`"
    class="group block h-full focus:outline-hidden"
  >
    <AppCard
      hoverable
      class="flex flex-col h-full overflow-hidden border-t-2! hover:border-t-teal! border-t-transparent transition-all duration-300"
    >
      <!-- Featured Image / Fallback -->
      <div class="relative overflow-hidden aspect-video w-full bg-navy flex items-center justify-center">
        <img
          v-if="post.featuredImageUrl"
          :src="post.featuredImageUrl"
          :alt="post.title"
          class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-104"
        />
        <!-- Monogram Fallback -->
        <div v-else class="w-full h-full bg-gradient-to-br from-navy via-slate to-navy flex items-center justify-center relative">
          <!-- Geometric background lines -->
          <div class="absolute inset-0 opacity-5 repeating-lines"></div>
          
          <div class="w-16 h-16 rounded-full border-2 border-teal/20 flex items-center justify-center text-teal font-display font-black text-3xl shadow-lg relative z-10">
            C
          </div>
        </div>
        
        <!-- Category tag on image top left -->
        <span class="absolute top-4 left-4 bg-teal text-white text-[10px] font-semibold tracking-wider uppercase px-2.5 py-1 rounded-full shadow-xs z-20">
          {{ post.category }}
        </span>
      </div>

      <!-- Content -->
      <div class="flex-1 flex flex-col justify-between text-left p-6 font-body">
        <div class="space-y-3">
          <!-- Meta row (category + read time) -->
          <div class="flex items-center gap-3 text-xs text-mid">
            <span class="flex items-center gap-1">
              <ClockIcon class="w-3.5 h-3.5 text-teal" />
              {{ post.readTimeMinutes }} min read
            </span>
          </div>

          <!-- Title -->
          <h3 class="font-display font-bold text-navy text-base sm:text-lg group-hover:text-teal transition-colors duration-250 line-clamp-2 leading-snug">
            {{ post.title }}
          </h3>

          <!-- Excerpt -->
          <p class="font-normal text-mid text-xs sm:text-sm leading-relaxed line-clamp-3 font-light">
            {{ post.excerpt }}
          </p>
        </div>

        <!-- Footer: Author & Date -->
        <div class="pt-4 border-t border-border mt-6 flex items-center justify-between text-xs text-mid">
          <div class="flex items-center gap-2">
            <!-- Author initials circular badge -->
            <div class="w-7 h-7 rounded-full bg-teal/10 text-teal flex items-center justify-center font-display font-bold text-[10px] border border-teal/20">
              {{ getInitials(post.author) }}
            </div>
            <span class="font-medium text-navy">{{ post.author }}</span>
          </div>
          <span>{{ formattedDate }}</span>
        </div>
      </div>
    </AppCard>
  </RouterLink>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { RouterLink } from 'vue-router'
import { Clock as ClockIcon } from 'lucide-vue-next'
import type { BlogPost } from '@/types'
import AppCard from '@/components/common/AppCard.vue'

const props = defineProps<{
  post: BlogPost
}>()

const formattedDate = computed(() => {
  if (!props.post.createdAt) return ''
  let date: Date
  if (typeof props.post.createdAt.toDate === 'function') {
    date = props.post.createdAt.toDate()
  } else if ((props.post.createdAt as any).seconds) {
    date = new Date((props.post.createdAt as any).seconds * 1000)
  } else {
    date = new Date(props.post.createdAt as any)
  }
  
  return new Intl.DateTimeFormat('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  }).format(date)
})

function getInitials(name: string): string {
  if (!name) return 'CT'
  const parts = name.trim().split(/\s+/)
  return parts.map(p => p[0]).slice(0, 2).join('').toUpperCase()
}
</script>

<style scoped>
.repeating-lines {
  background: repeating-linear-gradient(
    45deg,
    transparent,
    transparent 10px,
    var(--color-white) 10px,
    var(--color-white) 12px
  );
}
</style>
