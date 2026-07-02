<template>
  <div
    class="rounded-full animate-spin border-2"
    :class="[sizeClasses[size], colorClasses[color]]"
    role="status"
    aria-label="Loading"
  >
    <span class="sr-only">Loading...</span>
  </div>
</template>

<script setup lang="ts">


interface Props {
  size?: 'sm' | 'md' | 'lg'
  color?: 'navy' | 'teal' | 'white'
}

const props = withDefaults(defineProps<Props>(), {
  size: 'md',
  color: 'navy'
})

const sizeClasses = {
  sm: 'h-4 w-4 border-2',
  md: 'h-8 w-8 border-3',
  lg: 'h-12 w-12 border-4'
}

const colorClasses = {
  navy: 'border-navy/20 border-t-navy',
  teal: 'border-teal/20 border-t-teal',
  white: 'border-white/20 border-t-white'
}
</script>
