<template>
  <section class="relative h-[100svh] w-full overflow-hidden bg-navy flex items-center justify-center text-center px-4">
    <video autoplay muted loop playsinline class="absolute inset-0 w-full h-full object-cover z-0 opacity-40">
      <source src="../../assets/video/hero-bg.mp4" type="video/mp4" />
    </video>
    
    <!-- Gradient Overlay -->
    <div class="absolute inset-0 bg-gradient-to-br from-navy/85 to-navy/60 z-10 pointer-events-none"></div>

    <!-- Content -->
    <div class="relative z-20 max-w-4xl mx-auto flex flex-col items-center space-y-6">
      <span class="hero-animate block font-body font-semibold text-teal text-xs sm:text-sm tracking-[0.12em] uppercase">
        London &middot; UK Tech Consultancy
      </span>
      
      <h1 class="hero-animate font-display font-extrabold text-white leading-[1.1] max-w-3xl text-4xl sm:text-5xl md:text-6xl lg:text-7xl">
        We build digital products that <span class="text-teal">actually work.</span>
      </h1>
      
      <p class="hero-animate font-body font-normal text-white/80 max-w-2xl text-sm sm:text-base md:text-lg leading-relaxed">
        Spiralync delivers mobile apps, web platforms, and technology strategy for businesses that need more than a vendor &mdash; they need a partner.
      </p>
      
      <div class="hero-animate flex flex-col sm:flex-row gap-4 pt-4">
        <AppButton variant="teal" size="lg" @click="scrollToSection('quote')">
          Get a Quote &rarr;
        </AppButton>
        <AppButton variant="secondary" size="lg" class="border-white! text-white! hover:bg-white! hover:text-navy! hover:border-white!" @click="scrollToSection('projects')">
          See Our Work
        </AppButton>
      </div>
    </div>

    <!-- Scroll Hint -->
    <button
      v-if="showScrollHint"
      type="button"
      class="scroll-hint absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-1.5 text-white/50 hover:text-white cursor-pointer transition-all duration-300 font-body text-[10px] tracking-widest uppercase focus:outline-none"
      @click="scrollToSection('about')"
    >
      <span>Scroll</span>
      <ChevronDownIcon class="w-5 h-5 animate-bounce" />
    </button>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { gsap } from 'gsap'
import { ChevronDown as ChevronDownIcon } from 'lucide-vue-next'
import AppButton from '@/components/common/AppButton.vue'

const showScrollHint = ref(true)

function handleScroll() {
  showScrollHint.value = window.scrollY < 100
}

function scrollToSection(sectionId: string) {
  const el = document.getElementById(sectionId)
  if (el) {
    el.scrollIntoView({ behavior: 'smooth' })
  }
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll, { passive: true })

  // GSAP stagger intro animation
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  if (!prefersReducedMotion) {
    gsap.from('.hero-animate', {
      opacity: 0,
      y: 30,
      duration: 0.8,
      stagger: 0.12,
      ease: 'power2.out',
      delay: 0.3
    })
  }
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<style scoped>
.scroll-hint {
  animation: fadePulse 2s infinite ease-in-out;
}

@keyframes fadePulse {
  0%, 100% { opacity: 0.5; }
  50% { opacity: 0.9; }
}
</style>
