<template>
  <AppModal
    :model-value="!!project"
    @update:model-value="close"
    :title="project ? project.title : 'Project Details'"
    size="xl"
  >
    <div v-if="project" class="grid grid-cols-1 md:grid-cols-2 gap-8 font-body">
      <!-- Left Column: Media & Meta -->
      <div class="space-y-4 text-left">
        <div class="aspect-video w-full rounded-lg overflow-hidden bg-mist shadow-inner border border-border">
          <img
            v-if="project.imageUrl"
            :src="project.imageUrl"
            :alt="project.title"
            class="w-full h-full object-cover"
          />
        </div>
        
        <div class="flex flex-wrap gap-2 pt-2">
          <span class="bg-teal/10 text-teal text-xs font-semibold px-3 py-1.5 rounded-full">
            Category: {{ getCategoryName(project.category) }}
          </span>
          <span class="bg-mist text-slate font-mono text-[10px] px-3 py-1.5 rounded-full">
            Ref: #{{ project.id }}
          </span>
        </div>
      </div>

      <!-- Right Column: Title & Description -->
      <div class="flex flex-col justify-between text-left space-y-6">
        <div class="space-y-4">
          <h2 class="font-display font-extrabold text-navy text-2xl sm:text-3xl leading-tight">
            {{ project.title }}
          </h2>
          
          <div 
            class="prose prose-sm max-w-none text-charcoal/90 leading-relaxed font-light whitespace-pre-line"
            v-html="project.fullDescription"
          ></div>
        </div>

        <!-- Links Action Bar -->
        <div class="pt-6 border-t border-border mt-auto">
          <div v-if="project.websiteUrl || project.appStoreUrl || project.playStoreUrl" class="flex flex-wrap gap-3">
            <!-- Website Link -->
            <a
              v-if="project.websiteUrl"
              :href="project.websiteUrl"
              target="_blank"
              rel="noopener noreferrer"
              class="inline-block"
            >
              <AppButton variant="teal" size="md">
                Visit Website &nearr;
              </AppButton>
            </a>

            <!-- App Store -->
            <a
              v-if="project.appStoreUrl"
              :href="project.appStoreUrl"
              target="_blank"
              rel="noopener noreferrer"
              class="inline-block"
            >
              <AppButton variant="primary" size="md" class="gap-2">
                <AppleIcon class="w-4 h-4" /> App Store
              </AppButton>
            </a>

            <!-- Play Store -->
            <a
              v-if="project.playStoreUrl"
              :href="project.playStoreUrl"
              target="_blank"
              rel="noopener noreferrer"
              class="inline-block"
            >
              <AppButton variant="primary" size="md" class="gap-2">
                <PlayIcon class="w-4 h-4" /> Google Play
              </AppButton>
            </a>
          </div>

          <div v-else class="text-xs font-semibold text-mid/80 tracking-wide">
            &mdash; Coming soon to App Stores and Web
          </div>
        </div>
      </div>
    </div>
  </AppModal>
</template>

<script setup lang="ts">
import type { Project } from '@/types'
import { useContentStore } from '@/stores/content'
import { Apple as AppleIcon, Play as PlayIcon } from 'lucide-vue-next'
import AppModal from '@/components/common/AppModal.vue'
import AppButton from '@/components/common/AppButton.vue'

defineProps<{
  project: Project | null
}>()

const emit = defineEmits<{
  (e: 'close'): void
}>()

const contentStore = useContentStore()

function close() {
  emit('close')
}

function getCategoryName(catId: string): string {
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
