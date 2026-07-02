<template>
  <button
    :type="type"
    :disabled="disabled || loading"
    class="inline-flex items-center justify-center font-body font-semibold transition-all duration-250 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal rounded-lg select-none disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
    :class="[
      variantClasses[variant],
      sizeClasses[size],
      loading ? 'relative text-transparent!' : ''
    ]"
  >
    <!-- Loading spinner absolute overlays to maintain button size -->
    <div v-if="loading" class="absolute inset-0 flex items-center justify-center">
      <AppSpinner :size="spinnerSize" :color="spinnerColor" />
    </div>

    <!-- Button content -->
    <span class="flex items-center gap-2" :class="{ 'opacity-0': loading }">
      <slot />
    </span>
  </button>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import AppSpinner from './AppSpinner.vue'

interface Props {
  variant?: 'primary' | 'secondary' | 'ghost' | 'teal'
  size?: 'sm' | 'md' | 'lg'
  loading?: boolean
  disabled?: boolean
  type?: 'button' | 'submit' | 'reset'
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'primary',
  size: 'md',
  loading: false,
  disabled: false,
  type: 'button'
})

const variantClasses = {
  primary: 'bg-navy text-white hover:bg-teal hover:border-teal border border-transparent shadow-xs',
  secondary: 'border border-navy text-navy hover:bg-teal hover:text-white hover:border-teal',
  ghost: 'bg-transparent text-charcoal hover:bg-mist border border-transparent',
  teal: 'bg-teal text-white hover:bg-navy border border-transparent shadow-xs'
}

const sizeClasses = {
  sm: 'px-3 py-1.5 text-xs',
  md: 'px-5 py-2.5 text-sm',
  lg: 'px-7 py-3.5 text-base'
}

const spinnerSize = computed(() => {
  return props.size === 'lg' ? 'md' : 'sm'
})

const spinnerColor = computed(() => {
  if (props.variant === 'secondary' || props.variant === 'ghost') {
    return 'navy'
  }
  return 'white'
})
</script>
