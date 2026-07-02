<template>
  <div class="relative bg-white min-h-screen">
    <HeroSection />
    <AboutSection />
    <ProjectsSection />
    <TestimonialsSection />
    <QuoteSection />
    <ContactSection />
  </div>
</template>

<script setup lang="ts">
import { onMounted, nextTick } from 'vue'
import { useRoute } from 'vue-router'
import { useScrollReveal } from '@/composables/useScrollReveal'

import HeroSection from '@/components/home/HeroSection.vue'
import AboutSection from '@/components/home/AboutSection.vue'
import ProjectsSection from '@/components/home/ProjectsSection.vue'
import TestimonialsSection from '@/components/home/TestimonialsSection.vue'
import QuoteSection from '@/components/home/QuoteSection.vue'
import ContactSection from '@/components/home/ContactSection.vue'

const route = useRoute()

// Initialize intersection observer reveals
useScrollReveal()

onMounted(() => {
  const scrollTo = route.query.scrollTo as string
  if (scrollTo) {
    nextTick(() => {
      setTimeout(() => {
        const el = document.getElementById(scrollTo)
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' })
        }
      }, 450)
    })
  }
})
</script>
