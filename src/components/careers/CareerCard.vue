<template>
  <AppCard class="border border-border text-left overflow-hidden transition-all duration-300">
    <div class="p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 font-body">
      <div class="space-y-3">
        <!-- Role Title -->
        <h3 class="font-display font-bold text-navy text-xl">
          {{ career.title }}
        </h3>
        
        <!-- Badges Row -->
        <div class="flex flex-wrap gap-2">
          <span class="bg-navy/5 text-navy text-[10px] font-semibold px-2.5 py-1 rounded-full uppercase tracking-wider">
            {{ career.department }}
          </span>
          <span class="bg-slate/5 text-slate text-[10px] font-semibold px-2.5 py-1 rounded-full uppercase tracking-wider">
            {{ career.location }}
          </span>
          <span class="bg-teal/10 text-teal text-[10px] font-semibold px-2.5 py-1 rounded-full uppercase tracking-wider">
            {{ career.type }}
          </span>
          <span v-if="career.salaryRange" class="bg-mist text-mid text-[10px] font-semibold px-2.5 py-1 rounded-full uppercase tracking-wider">
            {{ career.salaryRange }}
          </span>
        </div>
      </div>

      <!-- Expand Trigger -->
      <div>
        <AppButton
          variant="secondary"
          size="sm"
          class="gap-1.5 focus:outline-hidden"
          @click="$emit('toggle')"
        >
          <span>{{ expanded ? 'Close Details' : 'View Details' }}</span>
          <ChevronDownIcon
            class="w-4 h-4 transition-transform duration-300"
            :class="{ 'rotate-180': expanded }"
          />
        </AppButton>
      </div>
    </div>

    <!-- Expanded content accordion with smooth transitions -->
    <div
      class="overflow-hidden transition-all duration-400 ease-in-out border-t border-transparent"
      :class="{ 'border-border!': expanded }"
      :style="{ maxHeight: expanded ? '1500px' : '0px' }"
    >
      <div class="p-6 sm:p-8 space-y-6 font-body text-charcoal/90">
        
        <!-- Description -->
        <div class="space-y-2">
          <h4 class="font-display font-bold text-navy text-sm uppercase tracking-wider">Role Overview</h4>
          <div class="text-sm font-light leading-relaxed whitespace-pre-line" v-html="career.description"></div>
        </div>

        <!-- Responsibilities -->
        <div v-if="career.responsibilities && career.responsibilities.length > 0" class="space-y-2">
          <h4 class="font-display font-bold text-navy text-sm uppercase tracking-wider">Core Responsibilities</h4>
          <ul class="list-disc pl-5 space-y-1.5 text-sm font-light leading-relaxed">
            <li v-for="(item, idx) in career.responsibilities" :key="idx">
              {{ item }}
            </li>
          </ul>
        </div>

        <!-- Requirements -->
        <div v-if="career.requirements && career.requirements.length > 0" class="space-y-2">
          <h4 class="font-display font-bold text-navy text-sm uppercase tracking-wider">Requirements &amp; Skills</h4>
          <ul class="list-disc pl-5 space-y-1.5 text-sm font-light leading-relaxed">
            <li v-for="(item, idx) in career.requirements" :key="idx">
              {{ item }}
            </li>
          </ul>
        </div>

        <!-- Deadline & CTA -->
        <div class="pt-6 border-t border-border flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <span v-if="career.deadline" class="text-xs text-mid font-semibold">
              Apply by: {{ formattedDeadline }}
            </span>
          </div>
          <div>
            <AppButton variant="teal" size="md" @click="$emit('apply')">
              Apply for this role
            </AppButton>
          </div>
        </div>

      </div>
    </div>
  </AppCard>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { ChevronDown as ChevronDownIcon } from 'lucide-vue-next'
import type { CareerListing } from '@/types'
import AppCard from '@/components/common/AppCard.vue'
import AppButton from '@/components/common/AppButton.vue'

const props = defineProps<{
  career: CareerListing
  expanded: boolean
}>()

defineEmits<{
  (e: 'toggle'): void
  (e: 'apply'): void
}>()

const formattedDeadline = computed(() => {
  if (!props.career.deadline) return ''
  let date: Date
  if (typeof props.career.deadline.toDate === 'function') {
    date = props.career.deadline.toDate()
  } else if ((props.career.deadline as any).seconds) {
    date = new Date((props.career.deadline as any).seconds * 1000)
  } else {
    date = new Date(props.career.deadline as any)
  }
  return new Intl.DateTimeFormat('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  }).format(date)
})
</script>
