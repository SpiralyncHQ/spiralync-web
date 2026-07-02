<template>
  <section id="about" class="py-20 sm:py-28 bg-white overflow-hidden">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        
        <!-- Left: Text Content -->
        <div class="space-y-6 text-left" data-reveal>
          <span class="block font-body font-semibold text-teal text-xs tracking-wider uppercase">
            About Spiralync
          </span>
          <h2 class="font-display font-extrabold text-navy text-3xl sm:text-4xl md:text-5xl leading-tight">
            We're engineers who care about the outcome, <span class="text-gradient">not just the output.</span>
          </h2>
          
          <div class="font-body text-charcoal/80 text-sm sm:text-base space-y-4 leading-relaxed font-light">
            <p>
              Spiralync was founded in London with a simple idea: that great software is built by people who understand the problem first, and the technology second.
            </p>
            <p>
              We work across Flutter mobile development, web engineering, and technology strategy &mdash; helping startups and growing businesses ship products they're proud of.
            </p>
            <p>
              Our team brings together experience across fintech, mobility, IoT, and consumer apps. Every project gets senior-level attention from day one.
            </p>
          </div>
          
          <!-- Stats Row -->
          <div class="grid grid-cols-3 gap-4 pt-8 border-t border-border">
            <div class="space-y-1">
              <p class="font-display font-extrabold text-navy text-3xl sm:text-4xl">5+</p>
              <p class="font-body font-normal text-mid text-xs sm:text-sm">Years Experience</p>
            </div>
            <div class="space-y-1">
              <p class="font-display font-extrabold text-navy text-3xl sm:text-4xl">20+</p>
              <p class="font-body font-normal text-mid text-xs sm:text-sm">Projects Delivered</p>
            </div>
            <div class="space-y-1">
              <p class="font-display font-extrabold text-navy text-3xl sm:text-4xl">3</p>
              <p class="font-body font-normal text-mid text-xs sm:text-sm">Sectors Served</p>
            </div>
          </div>
        </div>
        
        <!-- Right: Visual Cards Stack -->
        <div class="relative h-[400px] flex items-center justify-center lg:justify-end" data-reveal data-reveal-delay="0.2">
          <div class="card-stack relative w-full max-w-[340px] h-[300px]">
            <!-- Card 1 (Back) -->
            <AppCard
              class="card-stack-item card-1 absolute inset-0 border-l-4 border-teal! shadow-md"
            >
              <div class="flex items-start gap-4">
                <div class="p-2 bg-teal/10 rounded-lg text-teal">
                  <SmartphoneIcon class="w-6 h-6" />
                </div>
                <div class="space-y-1">
                  <h4 class="font-display font-bold text-navy text-base">Flutter &amp; Mobile</h4>
                  <p class="font-body font-normal text-mid text-xs leading-relaxed">
                    Cross-platform architecture built for performance, offline-sync, and rich animations.
                  </p>
                </div>
              </div>
            </AppCard>

            <!-- Card 2 (Middle) -->
            <AppCard
              class="card-stack-item card-2 absolute inset-0 border-l-4 border-navy! shadow-lg"
            >
              <div class="flex items-start gap-4">
                <div class="p-2 bg-navy/5 rounded-lg text-navy">
                  <CodeIcon class="w-6 h-6" />
                </div>
                <div class="space-y-1">
                  <h4 class="font-display font-bold text-navy text-base">Web Engineering</h4>
                  <p class="font-body font-normal text-mid text-xs leading-relaxed">
                    Scalable cloud architectures, responsive designs, and robust CMS administration.
                  </p>
                </div>
              </div>
            </AppCard>

            <!-- Card 3 (Front/Top) -->
            <AppCard
              class="card-stack-item card-3 absolute inset-0 border-l-4 border-teal! shadow-xl"
            >
              <div class="flex items-start gap-4">
                <div class="p-2 bg-teal/10 rounded-lg text-teal">
                  <RocketIcon class="w-6 h-6" />
                </div>
                <div class="space-y-1">
                  <h4 class="font-display font-bold text-navy text-base">Innovation Lab</h4>
                  <p class="font-body font-normal text-mid text-xs leading-relaxed">
                    Prototyping, product discovery workshops, and rapid validation of MVP concepts.
                  </p>
                </div>
              </div>
            </AppCard>
          </div>
        </div>

      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { Smartphone as SmartphoneIcon, Code as CodeIcon, Rocket as RocketIcon } from 'lucide-vue-next'
import AppCard from '@/components/common/AppCard.vue'
</script>

<style scoped>
/* Card overlap positions */
.card-stack-item {
  transition: transform 0.4s cubic-bezier(0.25, 1, 0.5, 1), box-shadow 0.4s ease;
  transform-origin: center center;
}

.card-1 {
  transform: rotate(-4deg) translate(-12px, -8px);
  z-index: 10;
}

.card-2 {
  transform: rotate(2deg) translate(8px, 4px);
  z-index: 20;
}

.card-3 {
  transform: rotate(0deg) translate(0, 0);
  z-index: 30;
}

/* Fan out on Hover */
.card-stack:hover .card-1 {
  transform: rotate(-12deg) translate(-40px, -24px);
  box-shadow: 0 4px 20px rgba(10, 37, 64, 0.08);
}

.card-stack:hover .card-2 {
  transform: rotate(6deg) translate(24px, -8px);
  box-shadow: 0 8px 30px rgba(10, 37, 64, 0.1);
}

.card-stack:hover .card-3 {
  transform: rotate(-2deg) translate(4px, 16px);
  box-shadow: 0 12px 40px rgba(10, 37, 64, 0.15);
}
</style>
