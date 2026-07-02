<template>
  <div>
    <!-- Announcement Banner -->
    <div
      v-if="announcement && !isBannerDismissed"
      class="bg-teal text-white text-xs sm:text-sm font-semibold py-3 px-4 flex items-center justify-between z-50 relative border-b border-white/10"
    >
      <div class="flex-1 text-center font-display tracking-wide">
        {{ announcement }}
      </div>
      <button
        type="button"
        class="text-white/80 hover:text-white cursor-pointer focus:outline-none p-1 rounded-full hover:bg-white/10"
        @click="dismissBanner"
        aria-label="Dismiss banner"
      >
        <XIcon class="w-4 h-4" />
      </button>
    </div>

    <!-- Main Navigation Header -->
    <header
      class="fixed top-0 z-40 w-full transition-all duration-300"
      :class="[
        isSolid
          ? 'bg-white shadow-[0_2px_8px_rgba(10,37,64,0.06)] border-b border-border'
          : 'bg-transparent border-b border-transparent'
      ]"
    >
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between h-16 sm:h-20">
          <!-- Logo -->
          <router-link to="/" class="flex items-center gap-3 group focus:outline-none">
            <svg class="h-10 sm:h-12 w-auto" viewBox="0 0 500 120" fill="none" xmlns="http://www.w3.org/2000/svg">
              <g transform="translate(10, 10)">
                <!-- Outer Spiral Arc -->
                <path
                  d="M 68 32 A 25 25 0 1 0 50 75"
                  fill="none"
                  :stroke="isSolid ? '#0A2540' : '#FFFFFF'"
                  stroke-width="12"
                  stroke-linecap="round"
                  class="transition-colors duration-300"
                />
                <!-- Inner Spiral Arc -->
                <path
                  d="M 50 75 A 15 15 0 0 0 50 45 A 5 5 0 0 0 50 55"
                  fill="none"
                  stroke="#00C896"
                  stroke-width="8"
                  stroke-linecap="round"
                />
              </g>
              <text x="130" y="70" font-family="'Plus Jakarta Sans', sans-serif" font-size="42" font-weight="800" letter-spacing="-0.5">
                <tspan
                  :fill="isSolid ? '#0A2540' : '#FFFFFF'"
                  class="transition-colors duration-300 group-hover:fill-teal!"
                >Spira</tspan>
                <tspan fill="#00C896">lync</tspan>
              </text>
            </svg>
          </router-link>

          <!-- Desktop Navigation -->
          <nav class="hidden md:flex items-center gap-8 font-body">
            <a
              href="#about"
              class="nav-link text-sm font-semibold transition-colors relative py-2 cursor-pointer"
              :class="[isSolid ? 'text-navy hover:text-teal' : 'text-white/80 hover:text-white']"
              @click.prevent="handleScrollNav('about')"
            >About</a>
            <a
              href="#projects"
              class="nav-link text-sm font-semibold transition-colors relative py-2 cursor-pointer"
              :class="[isSolid ? 'text-navy hover:text-teal' : 'text-white/80 hover:text-white']"
              @click.prevent="handleScrollNav('projects')"
            >Projects</a>
            <router-link
              to="/blog"
              class="nav-link text-sm font-semibold transition-colors relative py-2"
              :class="[isSolid ? 'text-navy hover:text-teal' : 'text-white/80 hover:text-white']"
              active-class="active-route text-teal!"
            >Blog</router-link>
            <router-link
              to="/careers"
              class="nav-link text-sm font-semibold transition-colors relative py-2"
              :class="[isSolid ? 'text-navy hover:text-teal' : 'text-white/80 hover:text-white']"
              active-class="active-route text-teal!"
            >Careers</router-link>
            <a
              href="#contact"
              class="nav-link text-sm font-semibold transition-colors relative py-2 cursor-pointer"
              :class="[isSolid ? 'text-navy hover:text-teal' : 'text-white/80 hover:text-white']"
              @click.prevent="handleScrollNav('contact')"
            >Contact</a>
            
            <AppButton variant="teal" size="sm" @click="handleScrollNav('contact')">
              Get a Quote
            </AppButton>
          </nav>

          <!-- Mobile Menu Trigger -->
          <div class="flex md:hidden">
            <button
              type="button"
              class="inline-flex items-center justify-center p-2 rounded-lg focus:outline-none transition-colors cursor-pointer"
              :class="[isSolid ? 'text-navy hover:bg-mist' : 'text-white hover:bg-white/10']"
              @click="openMobileMenu"
              aria-label="Open main menu"
            >
              <MenuIcon class="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>

      <!-- Mobile Navigation Drawer Overlay -->
      <Transition name="drawer-fade">
        <div
          v-if="isMobileMenuOpen"
          class="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs md:hidden"
          @click="closeMobileMenu"
        ></div>
      </Transition>

      <Transition name="drawer-slide">
        <div
          v-if="isMobileMenuOpen"
          class="fixed top-0 right-0 bottom-0 w-80 max-w-[85vw] bg-navy z-[60] shadow-2xl flex flex-col p-6 font-body md:hidden"
        >
          <!-- Close button -->
          <div class="flex items-center justify-between mb-8">
            <!-- Mini Logo -->
            <svg class="h-8 w-auto" viewBox="0 0 500 120" fill="none" xmlns="http://www.w3.org/2000/svg">
              <g transform="translate(10, 10)">
                <!-- Outer Spiral Arc -->
                <path d="M 68 32 A 25 25 0 1 0 50 75" fill="none" stroke="#FFFFFF" stroke-width="12" stroke-linecap="round" />
                <!-- Inner Spiral Arc -->
                <path d="M 50 75 A 15 15 0 0 0 50 45 A 5 5 0 0 0 50 55" fill="none" stroke="#00C896" stroke-width="8" stroke-linecap="round" />
              </g>
              <text x="130" y="70" font-family="'Plus Jakarta Sans', sans-serif" font-size="42" font-weight="800">
                <tspan fill="#FFFFFF">Spira</tspan>
              </text>
            </svg>
            <button
              type="button"
              class="text-white/80 hover:text-white p-2 rounded-lg hover:bg-white/10 cursor-pointer focus:outline-none"
              @click="closeMobileMenu"
              aria-label="Close menu"
            >
              <XIcon class="h-6 w-6" />
            </button>
          </div>

          <!-- Links -->
          <nav class="flex-1 flex flex-col gap-6 text-left">
            <a
              href="#about"
              class="mobile-nav-link text-2xl font-display font-bold text-white py-2"
              @click.prevent="handleScrollNav('about')"
            >About</a>
            <a
              href="#projects"
              class="mobile-nav-link text-2xl font-display font-bold text-white py-2"
              @click.prevent="handleScrollNav('projects')"
            >Projects</a>
            <router-link
              to="/blog"
              class="mobile-nav-link text-2xl font-display font-bold text-white py-2"
              active-class="mobile-active text-teal border-l-4 border-teal pl-3"
              @click="closeMobileMenu"
            >Blog</router-link>
            <router-link
              to="/careers"
              class="mobile-nav-link text-2xl font-display font-bold text-white py-2"
              active-class="mobile-active text-teal border-l-4 border-teal pl-3"
              @click="closeMobileMenu"
            >Careers</router-link>
            <a
              href="#contact"
              class="mobile-nav-link text-2xl font-display font-bold text-white py-2"
              @click.prevent="handleScrollNav('contact')"
            >Contact</a>
          </nav>

          <!-- Action and Socials at Bottom -->
          <div class="pt-6 border-t border-slate/50 space-y-6">
            <AppButton variant="teal" size="md" class="w-full" @click="handleScrollNav('contact')">
              Get a Quote
            </AppButton>
            
            <div class="flex justify-center gap-6">
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" class="text-mist/60 hover:text-teal transition-colors" aria-label="GitHub">
                <GithubIcon class="w-6 h-6" />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" class="text-mist/60 hover:text-teal transition-colors" aria-label="LinkedIn">
                <LinkedinIcon class="w-6 h-6" />
              </a>
            </div>
          </div>
        </div>
      </Transition>
    </header>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted, onUnmounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { Menu as MenuIcon, X as XIcon, Github as GithubIcon, Linkedin as LinkedinIcon } from 'lucide-vue-next'
import { doc, onSnapshot } from 'firebase/firestore'
import { db } from '@/firebase/config'
import AppButton from '@/components/common/AppButton.vue'

const route = useRoute()
const router = useRouter()

const scrollY = ref(0)
const isMobileMenuOpen = ref(false)
const announcement = ref<string | null>(null)
const isBannerDismissed = ref(sessionStorage.getItem('spiralync_banner_dismissed') === 'true')

const isSolid = ref(false)

function checkHeaderSolid() {
  const isTransparentRoute = ['/', '/blog', '/careers'].includes(route.path)
  if (!isTransparentRoute) {
    isSolid.value = true
  } else {
    isSolid.value = scrollY.value > 60
  }
}

watch(() => route.path, () => {
  checkHeaderSolid()
}, { immediate: true })

function handleScroll() {
  scrollY.value = window.scrollY
  checkHeaderSolid()
}

function handleScrollNav(sectionId: string) {
  if (route.path === '/') {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  } else {
    router.push({ path: '/', query: { scrollTo: sectionId } })
  }
  closeMobileMenu()
}

function openMobileMenu() {
  isMobileMenuOpen.value = true
  document.body.style.overflow = 'hidden'
  window.addEventListener('keydown', handleKeyDown)
}

function closeMobileMenu() {
  isMobileMenuOpen.value = false
  document.body.style.overflow = ''
  window.removeEventListener('keydown', handleKeyDown)
}

function handleKeyDown(e: KeyboardEvent) {
  if (e.key === 'Escape') {
    closeMobileMenu()
  }
}

function dismissBanner() {
  isBannerDismissed.value = true
  sessionStorage.setItem('spiralync_banner_dismissed', 'true')
}

let unsubscribeFirestore: (() => void) | undefined

onMounted(() => {
  scrollY.value = window.scrollY
  window.addEventListener('scroll', handleScroll, { passive: true })

  // Listen to settings/banner document in Firestore for announcements
  try {
    unsubscribeFirestore = onSnapshot(doc(db, 'settings', 'banner'), (docSnap) => {
      if (docSnap.exists()) {
        announcement.value = docSnap.data().announcementBanner || null
      }
    }, (err) => {
      console.warn('Announcement banner fetch error (fallback used):', err)
    })
  } catch (err) {
    console.warn('Firebase error initializing settings snapshot:', err)
  }
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
  document.body.style.overflow = ''
  window.removeEventListener('keydown', handleKeyDown)
  if (unsubscribeFirestore) unsubscribeFirestore()
})
</script>

<style scoped>
/* Active link and hover states */
.nav-link::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 2px;
  background-color: var(--color-teal);
  border-radius: 1px;
  transform: scaleX(0);
  transform-origin: left;
  transition: transform 0.25s cubic-bezier(0.25, 1, 0.5, 1);
}

.nav-link:hover::after,
.nav-link.active-route::after {
  transform: scaleX(1);
}

/* Transitions for Drawer slide-in and fade overlays */
.drawer-fade-enter-active,
.drawer-fade-leave-active {
  transition: opacity 0.25s ease;
}
.drawer-fade-enter-from,
.drawer-fade-leave-to {
  opacity: 0;
}

.drawer-slide-enter-active,
.drawer-slide-leave-active {
  transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}
.drawer-slide-enter-from,
.drawer-slide-leave-to {
  transform: translateX(100%);
}
</style>
