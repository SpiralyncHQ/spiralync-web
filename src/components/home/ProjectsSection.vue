<template>
  <section id="projects" class="py-20 sm:py-28 bg-mist/20 overflow-hidden border-t border-b border-border">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      <!-- Section Header -->
      <div class="space-y-4 mb-12 text-left" data-reveal>
        <span class="block font-body font-semibold text-teal text-xs tracking-wider uppercase">
          Portfolio
        </span>
        <h2 class="font-display font-extrabold text-navy text-3xl sm:text-4xl md:text-5xl leading-tight">
          Things we've <span class="text-gradient">built.</span>
        </h2>
        <p class="font-body font-normal text-mid text-sm sm:text-base max-w-xl leading-relaxed">
          We construct clean, high-performance apps and platforms engineered for durability and scale.
        </p>
      </div>

      <!-- Categories Filter Tab Row -->
      <div class="flex flex-wrap gap-2 mb-8 justify-start" data-reveal data-reveal-delay="0.1">
        <button
          v-for="cat in categories"
          :key="cat.id"
          type="button"
          class="px-4 py-2 rounded-full text-xs font-body font-semibold border transition-all duration-200 cursor-pointer focus:outline-none"
          :class="[
            activeCategory === cat.id
              ? 'bg-teal border-teal text-white shadow-xs'
              : 'border-border bg-white text-charcoal hover:border-teal hover:text-teal'
          ]"
          @click="filterCategory(cat.id)"
        >
          <span class="mr-1.5">{{ cat.icon }}</span>
          <span>{{ cat.name }}</span>
        </button>
      </div>

      <!-- Loading Skeletons -->
      <div v-if="contentStore.loading" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        <div v-for="i in 3" :key="i" class="bg-white rounded-card shadow-card overflow-hidden border border-border animate-pulse flex flex-col h-full">
          <div class="aspect-video w-full bg-mist/60"></div>
          <div class="p-6 flex-1 space-y-4">
            <div class="h-5 bg-mist rounded w-3/4"></div>
            <div class="space-y-2">
              <div class="h-3 bg-mist rounded"></div>
              <div class="h-3 bg-mist rounded w-5/6"></div>
            </div>
            <div class="h-4 bg-mist rounded w-1/4 mt-4"></div>
          </div>
        </div>
      </div>

      <!-- Projects Grid -->
      <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8" data-reveal data-reveal-delay="0.2">
        <div v-for="project in visibleProjects" :key="project.id">
          <ProjectCard :project="project" @select="selectProject" />
        </div>
      </div>

      <!-- Empty State -->
      <div v-if="!contentStore.loading && visibleProjects.length === 0" class="py-12 text-center text-mid font-body">
        No projects found in this category.
      </div>

      <!-- Load More Action -->
      <div v-if="hasMore" class="pt-12 text-center" data-reveal>
        <AppButton variant="secondary" size="md" @click="loadMore">
          Load More Projects
        </AppButton>
      </div>

      <!-- Project Modal -->
      <ProjectModal :project="selectedProject" @close="selectedProject = null" />

    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import type { Project } from '@/types'
import { useContentStore } from '@/stores/content'
import ProjectCard from './ProjectCard.vue'
import ProjectModal from './ProjectModal.vue'
import AppButton from '@/components/common/AppButton.vue'

const contentStore = useContentStore()

const activeCategory = ref('all')
const visibleLimit = ref(6)
const selectedProject = ref<Project | null>(null)

// Mock static fallbacks
const mockCategories = [
  { id: 'all', name: 'All', slug: 'all', icon: '📁', order: 0 },
  { id: 'mobile', name: 'Mobile Apps', slug: 'mobile', icon: '📱', order: 1 },
  { id: 'web', name: 'Web Platforms', slug: 'web', icon: '💻', order: 2 },
  { id: 'consultancy', name: 'Consultancy', slug: 'consultancy', icon: '🧠', order: 3 }
]

const mockProjects: Project[] = [
  {
    id: 'pos_app',
    title: 'Reisty POS Platform',
    shortDescription: 'High-speed restaurant point-of-sale system with offline-first synchronization.',
    fullDescription: 'Reisty POS is a premium, offline-first point-of-sale application designed for restaurant environments. It features automated receipt printer routing, zero-latency order entry, and real-time inventory management. Built using Flutter, SQLite, and custom local synchronization loops to ensure reliability during internet dropouts.',
    category: 'mobile',
    imageUrl: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=800&q=80',
    order: 1,
    websiteUrl: 'https://reisty.com',
    createdAt: { seconds: 1782295200, nanoseconds: 0 } as any
  },
  {
    id: 'tech_audit',
    title: 'Fintech Architecture Audit',
    shortDescription: 'Full scale performance audit and cloud migration roadmap for a leading UK fintech startup.',
    fullDescription: 'Spiralync undertook a thorough architectural review of the client\'s legacy backend services. We identified high-risk database contention bottlenecks, optimized query indexes, and designed an incremental cloud migration strategy utilizing containerized services to ensure seamless scalability and compliance.',
    category: 'consultancy',
    imageUrl: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=800&q=80',
    order: 2,
    createdAt: { seconds: 1782295200, nanoseconds: 0 } as any
  },
  {
    id: 'web_eng',
    title: 'London Logistics Hub',
    shortDescription: 'Custom logistics dashboard and pathfinding system optimized for freight operators.',
    fullDescription: 'A premium web platform featuring interactive pathfinding maps, real-time load planning algorithms, and freight carrier SMS/email notifications. Built for high-frequency updates and absolute reliability using Vue 3, TypeScript, and serverless background execution workers.',
    category: 'web',
    imageUrl: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=800&q=80',
    order: 3,
    websiteUrl: 'https://bristol-logistics.co.uk',
    createdAt: { seconds: 1782295200, nanoseconds: 0 } as any
  },
  {
    id: 'health_tracker',
    title: 'PulseFit Companion App',
    shortDescription: 'Bluetooth-enabled health and workout companion app with offline analytics.',
    fullDescription: 'PulseFit integrates with wearable bluetooth sensors to track and log athletic metrics, workout history, and heart performance. The app offers comprehensive offline analysis dashboard widgets, data export options, and cloud sync hooks.',
    category: 'mobile',
    imageUrl: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=800&q=80',
    order: 4,
    playStoreUrl: 'https://play.google.com',
    createdAt: { seconds: 1782295200, nanoseconds: 0 } as any
  },
  {
    id: 'b2b_saas',
    title: 'SaaS Billing Analytics',
    shortDescription: 'Real-time billing, revenue recognition, and analytics portal built for SaaS platforms.',
    fullDescription: 'A complex, premium analytics system mapping stripe collections to financial ledgers, tracking metrics (MRR, Churn, LTV), and generating automated financial charts. Designed with extreme visual detail and highly optimized animations.',
    category: 'web',
    imageUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80',
    order: 5,
    websiteUrl: 'https://billinganalytics.io',
    createdAt: { seconds: 1782295200, nanoseconds: 0 } as any
  },
  {
    id: 'cloud_consult',
    title: 'Enterprise Cloud Migration',
    shortDescription: 'Consultancy and execution strategy for migrating a legacy retailer to AWS serverless.',
    fullDescription: 'Collaborated with the client\'s technology leads to design a robust multi-region infrastructure layout. Built deployment automation pipelines, secured networking topologies, and helped them achieve 99.99% uptime target ratios during holiday sales.',
    category: 'consultancy',
    imageUrl: 'https://images.unsplash.com/photo-1544383835-bda2bc66a55d?auto=format&fit=crop&w=800&q=80',
    order: 6,
    createdAt: { seconds: 1782295200, nanoseconds: 0 } as any
  }
]

const categories = computed(() => {
  if (contentStore.categories.length === 0) {
    return mockCategories
  }
  return [
    { id: 'all', name: 'All', slug: 'all', icon: '📁', order: 0 },
    ...contentStore.categories
  ]
})

const projects = computed(() => {
  return contentStore.projects.length === 0 ? mockProjects : contentStore.projects
})

const filteredProjects = computed(() => {
  if (activeCategory.value === 'all') {
    return projects.value
  }
  return projects.value.filter((p) => p.category === activeCategory.value)
})

const visibleProjects = computed(() => {
  return filteredProjects.value.slice(0, visibleLimit.value)
})

const hasMore = computed(() => {
  return filteredProjects.value.length > visibleLimit.value
})

function filterCategory(catId: string) {
  activeCategory.value = catId
  visibleLimit.value = 6
}

function loadMore() {
  visibleLimit.value += 6
}

function selectProject(proj: Project) {
  selectedProject.value = proj
}

onMounted(() => {
  contentStore.fetchProjects()
  contentStore.fetchCategories()
})
</script>
