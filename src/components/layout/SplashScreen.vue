<template>
  <div
    v-if="isVisible"
    class="splash-bg fixed inset-0 z-[9999] flex flex-col items-center justify-center select-none cursor-pointer"
    :class="{ 'navy-active': isNavyActive, 'fade-out-active': fadeOutSplash }"
    aria-hidden="true"
    @click="skip"
  >
    <!-- Logo and Brand Group -->
    <div class="flex flex-col items-center gap-6">
      <div class="flex items-center gap-4">
        <!-- SVG C Logo Mark -->
        <svg
          class="h-16 w-16 sm:h-20 sm:w-20 overflow-visible"
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <!-- Outer Spiral Arc -->
          <path
            class="c-path"
            :class="{
              'draw-animate': !reducedMotion && isDrawingActive,
              'completed': drawCompleted,
              'reduced-motion-state': reducedMotion
            }"
            d="M 68 32 A 25 25 0 1 0 50 75"
            stroke-width="12"
            stroke-linecap="round"
          />
          <!-- Inner Spiral Arc -->
          <path
            class="chevron-path"
            :class="{
              'draw-animate-chevron': !reducedMotion && isChevronActive,
              'reduced-motion-state-chevron': reducedMotion
            }"
            d="M 50 75 A 15 15 0 0 0 50 45 A 5 5 0 0 0 50 55"
            stroke-width="8"
            stroke-linecap="round"
          />
        </svg>

        <!-- Wordmark -->
        <div
          class="wordmark-container"
          :class="{ 'fade-in': showWordmark, 'reduced-motion-instant': reducedMotion }"
        >
          <span class="text-3xl sm:text-4xl font-display font-extrabold text-white">Spira</span>
          <span class="text-3xl sm:text-4xl font-display font-extrabold text-teal">lync</span>
        </div>
      </div>

      <!-- Tagline -->
      <div
        class="tagline-container"
        :class="{ 'fade-up': showTagline, 'reduced-motion-instant': reducedMotion }"
      >
        Built to move. Engineered to last.
      </div>
    </div>

    <!-- Skip Indicator -->
    <div
      v-if="showSkip"
      class="fixed bottom-8 right-8 text-xs font-body font-light text-white/40 tracking-wider transition-opacity duration-300"
      :class="{ 'opacity-100': showSkip, 'opacity-0': !showSkip }"
    >
      tap to skip &rarr;
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

const emit = defineEmits<{
  (e: 'done'): void
}>()

const isVisible = ref(true)
const isNavyActive = ref(false)
const isDrawingActive = ref(false)
const isChevronActive = ref(false)
const drawCompleted = ref(false)
const showWordmark = ref(false)
const showTagline = ref(false)
const showSkip = ref(false)
const fadeOutSplash = ref(false)
const reducedMotion = ref(false)

let fadeOutTimeout: number | undefined
let sequences: number[] = []

function skip() {
  if (!showSkip.value) return
  // Clear any pending timeouts
  sequences.forEach(t => clearTimeout(t))
  if (fadeOutTimeout) clearTimeout(fadeOutTimeout)
  triggerFadeOut()
}

function triggerFadeOut() {
  if (fadeOutSplash.value) return
  fadeOutSplash.value = true
  
  // Set flag in sessionStorage before unmounting
  sessionStorage.setItem('spiralync_splash_seen', 'true')
  
  setTimeout(() => {
    isVisible.value = false
    emit('done')
  }, 400) // matches the CSS fade-out transition duration
}

onMounted(() => {
  // Check if splash was already shown in the session
  const isSeen = sessionStorage.getItem('spiralync_splash_seen') === 'true'
  if (isSeen) {
    isVisible.value = false
    emit('done')
    return
  }

  // Check accessibility preferences
  reducedMotion.value = window.matchMedia('(prefers-reduced-motion: reduce)').matches

  if (reducedMotion.value) {
    // Skip stroke animations and render full logo instantly
    isNavyActive.value = true
    drawCompleted.value = true
    showWordmark.value = true
    showTagline.value = true
    showSkip.value = false
    
    // Pause for 1 second, then fade out
    fadeOutTimeout = window.setTimeout(() => {
      triggerFadeOut()
    }, 1000)
  } else {
    // 1. 0s - 0.4s: Black screen
    // 2. 0.4s: Background fades from Black to Navy, and C mark starts drawing
    sequences.push(window.setTimeout(() => {
      isNavyActive.value = true
      isDrawingActive.value = true
    }, 400))

    // 3. 0.8s: Enable skip indicator
    sequences.push(window.setTimeout(() => {
      isChevronActive.value = true
      showSkip.value = true
    }, 800))

    // 4. 1.0s: Stroke completes drawing and fills navy. Wordmark fades in
    sequences.push(window.setTimeout(() => {
      drawCompleted.value = true
      showWordmark.value = true
    }, 1000))

    // 5. 1.6s: Tagline fades up
    sequences.push(window.setTimeout(() => {
      showTagline.value = true
    }, 1600))

    // 6. 2.0s: Pause for a bit, then start fading out
    fadeOutTimeout = window.setTimeout(() => {
      triggerFadeOut()
    }, 2100)
  }
})
</script>

<style scoped>
/* Background Base Styles */
.splash-bg {
  background-color: #000000;
  transition: background-color 0.6s cubic-bezier(0.25, 1, 0.5, 1);
}

.splash-bg.navy-active {
  background-color: #0A2540;
}

/* Splash Fade Out */
.splash-bg.fade-out-active {
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.40s ease-out;
}

/* SVG Arc Path */
.c-path {
  stroke: #00C896;
  fill: transparent;
  stroke-dasharray: 200;
  stroke-dashoffset: 200;
  transition: fill 0.6s ease, stroke 0.6s ease;
}

.c-path.draw-animate {
  animation: drawStroke 0.6s cubic-bezier(0.25, 1, 0.5, 1) forwards;
}

.c-path.completed {
  stroke: #FFFFFF;
  fill: transparent;
}

/* SVG Chevron Path */
.chevron-path {
  stroke: #00C896;
  fill: transparent;
  stroke-dasharray: 80;
  stroke-dashoffset: 80;
}

.chevron-path.draw-animate-chevron {
  animation: drawStroke 0.4s cubic-bezier(0.25, 1, 0.5, 1) forwards;
}

@keyframes drawStroke {
  to {
    stroke-dashoffset: 0;
  }
}

/* Wordmark Animations */
.wordmark-container {
  display: flex;
  align-items: center;
  gap: 0.25rem;
  opacity: 0;
  transform: translateX(8px);
  font-family: var(--font-display);
}

.wordmark-container.fade-in {
  opacity: 1;
  transform: translateX(0);
  transition: opacity 0.6s cubic-bezier(0.25, 1, 0.5, 1), transform 0.6s cubic-bezier(0.25, 1, 0.5, 1);
}

/* Tagline Animations */
.tagline-container {
  font-family: var(--font-body);
  color: #6B7280;
  font-size: 0.875rem;
  font-weight: 400;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  opacity: 0;
  transform: translateY(8px);
  transition: opacity 0.4s ease-out, transform 0.4s ease-out;
}

.tagline-container.fade-up {
  opacity: 1;
  transform: translateY(0);
}

/* Reduced Motion CSS States */
.reduced-motion-state {
  stroke-dashoffset: 0;
  stroke: #FFFFFF;
  fill: transparent;
}

.reduced-motion-state-chevron {
  stroke-dashoffset: 0;
  stroke: #00C896;
}

.reduced-motion-instant {
  opacity: 1 !important;
  transform: none !important;
  transition: none !important;
}
</style>
