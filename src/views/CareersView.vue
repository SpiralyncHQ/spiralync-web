<template>
  <div>

    <!-- Hero Header -->
    <header class="bg-navy text-white py-16 sm:py-24 relative overflow-hidden">
      <video autoplay muted loop playsinline class="absolute inset-0 w-full h-full object-cover z-0 opacity-40">
      <source src="../assets/video/career-bg.mp4" type="video/mp4" />
    </video>
    <!-- Gradient Overlay -->
    <div class="absolute inset-0 bg-gradient-to-br from-navy/85 to-navy/60 z-10 pointer-events-none"></div>

      <!-- repeating diagonal background pattern -->
      <div class="absolute inset-0 opacity-10 repeating-diagonal-lines"></div>
      
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 space-y-6">
        <span class="block font-body font-semibold text-teal text-xs sm:text-sm tracking-widest uppercase">
          Join Spiralync
        </span>
        <h1 class="font-display font-extrabold text-3xl sm:text-4xl md:text-5xl leading-tight max-w-3xl mx-auto">
          Work on things that <span class="text-teal">matter.</span>
        </h1>
        <p class="font-body font-light text-slate-300 text-sm sm:text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
          We're a small, senior team. Every person here has real impact. We hire for curiosity, craft, and care.
        </p>
      </div>
    </header>

    <!-- Values strip (white background) -->
    <section class="bg-white border-b border-border py-12">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-4 md:divide-x md:divide-border">
          
          <!-- Value 1 -->
          <div class="flex flex-col items-center md:items-start text-center md:text-left px-4 space-y-2">
            <span class="text-3xl" role="img" aria-label="Wrench">🔧</span>
            <h4 class="font-display font-bold text-navy text-sm">Build with intent</h4>
            <p class="font-body font-light text-mid text-xs leading-relaxed">
              We ship thoughtfully, not frantically. Quality is our standard.
            </p>
          </div>

          <!-- Value 2 -->
          <div class="flex flex-col items-center md:items-start text-center md:text-left px-4 space-y-2">
            <span class="text-3xl" role="img" aria-label="Handshake">🤝</span>
            <h4 class="font-display font-bold text-navy text-sm">Collaboration over ego</h4>
            <p class="font-body font-light text-mid text-xs leading-relaxed">
              Good ideas can come from anywhere. We respect the draft.
            </p>
          </div>

          <!-- Value 3 -->
          <div class="flex flex-col items-center md:items-start text-center md:text-left px-4 space-y-2">
            <span class="text-3xl" role="img" aria-label="Graph">📈</span>
            <h4 class="font-display font-bold text-navy text-sm">Grow by doing</h4>
            <p class="font-body font-light text-mid text-xs leading-relaxed">
              We work on real projects that stretch our designs and logic.
            </p>
          </div>

          <!-- Value 4 -->
          <div class="flex flex-col items-center md:items-start text-center md:text-left px-4 space-y-2">
            <span class="text-3xl" role="img" aria-label="Globe">🌍</span>
            <h4 class="font-display font-bold text-navy text-sm">Remote-friendly</h4>
            <p class="font-body font-light text-mid text-xs leading-relaxed">
              Output matters more than location. Work where you thrive.
            </p>
          </div>

        </div>
      </div>
    </section>

    <!-- Open Roles section -->
    <main class="min-h-[50vh] bg-mist/20 py-16 sm:py-24">
      <div class="max-w-4xl mx-auto px-4 sm:px-6">
        
        <!-- Skeletons Loader -->
        <div v-if="contentStore.loading" class="space-y-4">
          <div v-for="i in 2" :key="i" class="bg-white border border-border p-6 rounded-card animate-pulse flex flex-col gap-4">
            <div class="h-6 bg-mist rounded w-1/3"></div>
            <div class="h-4 bg-mist rounded w-1/2"></div>
            <div class="h-8 bg-mist rounded w-24 ml-auto"></div>
          </div>
        </div>

        <!-- Open Roles list -->
        <div v-else-if="activeCareers.length > 0" class="space-y-8">
          
          <!-- Header and Role count -->
          <div class="flex items-center justify-between border-b border-border pb-4" data-reveal>
            <h2 class="font-display font-extrabold text-navy text-2xl sm:text-3xl">
              Open Positions
            </h2>
            <span class="bg-teal text-white text-xs font-semibold px-2.5 py-1 rounded-full shadow-xs">
              {{ activeCareers.length }} Available
            </span>
          </div>

          <!-- Accordion roles container -->
          <div class="space-y-4" data-reveal data-reveal-delay="0.1">
            <div v-for="career in activeCareers" :key="career.id">
              <CareerCard
                :career="career"
                :expanded="expandedRoleId === career.id"
                @toggle="toggleRoleExpansion(career.id)"
                @apply="openApplication(career)"
              />
            </div>
          </div>

        </div>

        <!-- Empty State speculative application -->
        <div v-else class="py-12 text-center max-w-md mx-auto space-y-6" data-reveal>
          <div class="w-16 h-16 bg-mist rounded-full flex items-center justify-center text-navy/40 mx-auto">
            <SearchIcon class="w-8 h-8" />
          </div>
          <div class="space-y-2">
            <h3 class="font-display font-bold text-navy text-xl">No open roles right now.</h3>
            <p class="font-body font-light text-mid text-sm leading-relaxed">
              We do keep a talent pool though. If you think you'd be a great fit for Spiralync, submit a speculative application.
            </p>
          </div>
          <AppButton variant="teal" size="md" @click="openSpeculativeApplication">
            Send Us Your CV &rarr;
          </AppButton>
        </div>

      </div>
    </main>

    <!-- Application Form Modal -->
    <ApplicationModal
      :is-open="isModalOpen"
      :career="selectedCareer"
      @close="closeApplication"
    />

  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { Search as SearchIcon } from 'lucide-vue-next'
import { useContentStore } from '@/stores/content'
import { useScrollReveal } from '@/composables/useScrollReveal'
import { useHead } from '@/composables/useHead'
import CareerCard from '@/components/careers/CareerCard.vue'
import ApplicationModal from '@/components/careers/ApplicationModal.vue'
import AppButton from '@/components/common/AppButton.vue'
import type { CareerListing } from '@/types'

const contentStore = useContentStore()

// Meta info tags
useHead(() => ({
  title: 'Careers | Join Spiralync',
  description: 'Explore open engineering and consulting roles at Spiralync. Work with a small, senior team building high-impact mobile and web products.',
  ogTitle: 'Spiralync Careers',
  ogDescription: 'Work on things that matter. Join the engineering and consulting team at Spiralync.',
  ogType: 'website',
  canonical: 'https://spiralync.com/careers'
}))

// Scroll reveals
useScrollReveal()

const expandedRoleId = ref<string | null>(null)
const isModalOpen = ref(false)
const selectedCareer = ref<CareerListing | null>(null)

// Mock static fallbacks
const mockCareers: CareerListing[] = [
  {
    id: 'snr-flutter-dev',
    title: 'Senior Flutter Developer',
    department: 'Engineering',
    location: 'London / Hybrid',
    type: 'Full-time',
    salaryRange: '£65k - £80k',
    description: '<p>We are seeking a senior mobile engineer to lead Flutter architecture across startup and enterprise client projects. You will collaborate with design leads to ship offline-first apps that are exceptionally fast and beautifully animated.</p>',
    responsibilities: [
      'Lead design and build of secure cross-platform Flutter applications',
      'Write robust, high-coverage widget and integration tests',
      'Mentor junior and mid-level developers within client teams',
      'Architect local synchronization systems using SQLite / Isar'
    ],
    requirements: [
      '4+ years of professional mobile experience (2+ years with Flutter)',
      'Expertise in state management libraries (e.g., Riverpod, Bloc)',
      'Familiarity with native platform integrations (Kotlin, Swift)',
      'Strong communication skills and startup mindset'
    ],
    deadline: { seconds: 1789000000, nanoseconds: 0 } as any,
    active: true,
    createdAt: { seconds: 1782200000, nanoseconds: 0 } as any
  },
  {
    id: 'tech-consultant',
    title: 'Technology Consultant & Architect',
    department: 'Consulting',
    location: 'London / Hybrid',
    type: 'Contract',
    salaryRange: '£550 - £700 / day',
    description: '<p>Join our consultancy team helping enterprise customers define cloud migration strategies, audit legacy system architectures, and lead modern software engineering processes.</p>',
    responsibilities: [
      'Conduct technical architecture audits for scaling scaleups and startups',
      'Formulate cloud migration roadmaps (AWS/GCP serverless environments)',
      'Facilitate product discovery workshops with senior executives',
      'Assess technology risk, security, and developer pipeline velocity'
    ],
    requirements: [
      '6+ years of consulting or enterprise architecture experience',
      'Hands-on knowledge of cloud networks, data scaling, and containerisation',
      'Strong analytical skills and writing clear technical advisory blueprints',
      'Ability to influence technical and non-technical business leaders'
    ],
    deadline: { seconds: 1789000000, nanoseconds: 0 } as any,
    active: true,
    createdAt: { seconds: 1782200000, nanoseconds: 0 } as any
  }
]

// All active positions
const activeCareers = computed<CareerListing[]>(() => {
  const list = contentStore.careers.length === 0 ? mockCareers : contentStore.careers
  return list.filter(c => c.active)
})

function toggleRoleExpansion(roleId: string) {
  if (expandedRoleId.value === roleId) {
    expandedRoleId.value = null
  } else {
    expandedRoleId.value = roleId
  }
}

function openApplication(career: CareerListing) {
  selectedCareer.value = career
  isModalOpen.value = true
}

function openSpeculativeApplication() {
  selectedCareer.value = null
  isModalOpen.value = true
}

function closeApplication() {
  isModalOpen.value = false
  selectedCareer.value = null
}

onMounted(() => {
  contentStore.fetchCareers()
})
</script>

<style scoped>
.repeating-diagonal-lines {
  background: repeating-linear-gradient(
    45deg,
    transparent,
    transparent 15px,
    rgba(255, 255, 255, 0.05) 15px,
    rgba(255, 255, 255, 0.05) 17px
  );
}
</style>
