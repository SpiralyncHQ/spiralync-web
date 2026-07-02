<template>
  <section class="py-20 sm:py-28 bg-mist/50 border-b border-border overflow-hidden">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      <!-- Header -->
      <div class="flex flex-col md:flex-row md:justify-between md:items-end gap-6 mb-12">
        <div class="space-y-4 text-left" data-reveal>
          <span class="block font-body font-semibold text-teal text-xs tracking-wider uppercase">
            Reviews
          </span>
          <h2 class="font-display font-extrabold text-navy text-3xl sm:text-4xl md:text-5xl leading-tight">
            What our clients say.
          </h2>
          <p class="font-body font-normal text-mid text-sm sm:text-base max-w-lg leading-relaxed">
            Read about the direct business impact of our design, engineering, and consulting services.
          </p>
        </div>
        
        <!-- Navigation Buttons (Desktop) -->
        <div class="hidden md:flex gap-3" data-reveal>
          <button
            type="button"
            class="swiper-prev-btn p-3 bg-white hover:bg-teal text-navy hover:text-white rounded-full shadow-[0_2px_8px_rgba(10,37,64,0.06)] border border-border cursor-pointer transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-teal/30"
            aria-label="Previous slide"
          >
            <ChevronLeftIcon class="w-5 h-5" />
          </button>
          <button
            type="button"
            class="swiper-next-btn p-3 bg-white hover:bg-teal text-navy hover:text-white rounded-full shadow-[0_2px_8px_rgba(10,37,64,0.06)] border border-border cursor-pointer transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-teal/30"
            aria-label="Next slide"
          >
            <ChevronRightIcon class="w-5 h-5" />
          </button>
        </div>
      </div>

      <!-- Swiper Carousel -->
      <div class="relative overflow-visible" data-reveal data-reveal-delay="0.2">
        <!-- We use standard Swiper elements -->
        <Swiper
          :modules="[Autoplay, Navigation]"
          :loop="true"
          :autoplay="{
            delay: 5000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true
          }"
          :navigation="{
            prevEl: '.swiper-prev-btn',
            nextEl: '.swiper-next-btn'
          }"
          :space-between="24"
          :slides-per-view="1"
          :breakpoints="{
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 3 }
          }"
          class="swiper-testimonials"
        >
          <SwiperSlide v-for="item in testimonials" :key="item.id">
            <AppCard class="flex flex-col h-full justify-between select-none p-6 text-left border border-border bg-white rounded-card">
              <div class="space-y-4">
                <!-- Stars -->
                <div class="flex gap-0.5 text-teal text-lg leading-none" aria-hidden="true">
                  <span v-for="i in 5" :key="i">
                    {{ i <= item.rating ? '★' : '☆' }}
                  </span>
                </div>
                
                <!-- Quote text -->
                <blockquote class="font-body italic text-navy text-sm sm:text-base leading-relaxed line-clamp-5">
                  "{{ item.review }}"
                </blockquote>
              </div>

              <!-- Author details -->
              <div class="flex items-center gap-4 pt-6 border-t border-border mt-6">
                <img
                  v-if="item.clientPhotoUrl"
                  :src="item.clientPhotoUrl"
                  :alt="item.clientName"
                  class="w-11 h-11 rounded-full object-cover bg-mist border border-border"
                />
                <div
                  v-else
                  class="w-11 h-11 rounded-full bg-teal/10 text-teal flex items-center justify-center font-display font-bold text-sm border border-teal/20"
                >
                  {{ getInitials(item.clientName) }}
                </div>
                
                <div class="text-left font-body">
                  <h4 class="font-bold text-navy text-sm">{{ item.clientName }}</h4>
                  <p class="text-mid text-xs">{{ item.clientTitle }} &middot; {{ item.clientCompany }}</p>
                </div>
              </div>
            </AppCard>
          </SwiperSlide>
        </Swiper>
      </div>

    </div>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Autoplay, Navigation } from 'swiper/modules'
import { ChevronLeft as ChevronLeftIcon, ChevronRight as ChevronRightIcon } from 'lucide-vue-next'
import { useContentStore } from '@/stores/content'
import AppCard from '@/components/common/AppCard.vue'

// Import Swiper CSS
import 'swiper/css'
import 'swiper/css/navigation'

const contentStore = useContentStore()

const mockTestimonials = [
  {
    id: '1',
    clientName: 'Sarah Jenkins',
    clientTitle: 'CTO',
    clientCompany: 'Reisty Systems',
    review: 'Spiralync did not just write code; they understood our business challenges from day one. Their work on our offline-first Flutter POS app has been game-changing. We saw a 30% reduction in sync latency and zero data dropouts.',
    rating: 5,
    order: 1,
    clientPhotoUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=120&h=120&q=80'
  },
  {
    id: '2',
    clientName: 'James Carter',
    clientTitle: 'Founder',
    clientCompany: 'London Freight Co',
    review: 'Excellent engineering and highly professional consultancy. They delivered our logistics dashboard ahead of schedule and with outstanding attention to performance. Our freight dispatch operators love the new route planning interface.',
    rating: 5,
    order: 2,
    clientPhotoUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&h=120&q=80'
  },
  {
    id: '3',
    clientName: 'Elena Rostova',
    clientTitle: 'Head of Innovation',
    clientCompany: 'AeroTech UK',
    review: 'The senior-level attention we received was unmatched. Spiralync helped us validate our ideas in their Innovation Lab in record time. They are responsive, technically excellent, and know how to communicate.',
    rating: 5,
    order: 3,
    clientPhotoUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=120&h=120&q=80'
  }
]

const testimonials = computed(() => {
  return contentStore.testimonials.length === 0 ? mockTestimonials : contentStore.testimonials
})

function getInitials(name: string): string {
  const parts = name.split(' ')
  return parts.map(p => p[0]).slice(0, 2).join('').toUpperCase()
}
</script>

<style scoped>
/* Swiper wrapper overflow visibility overrides for card elevations */
.swiper-testimonials {
  overflow: visible !important;
}

.swiper-slide {
  height: auto !important; /* Forces slides to equal height */
}

/* Custom transitions on active/hover */
.swiper-prev-btn:disabled,
.swiper-next-btn:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}
</style>
