<template>
  <div
    class="bg-white rounded-card shadow-card overflow-hidden border border-border transition-all duration-300"
    :class="{
      'hover:-translate-y-1 hover:shadow-[0_12px_40px_rgba(10,37,64,0.12)]': hoverable,
      'cursor-pointer active:scale-[0.98]': clickable
    }"
  >
    <!-- Header slot -->
    <div v-if="$slots.header" class="px-6 py-4 border-b border-border bg-mist/30">
      <slot name="header" />
    </div>

    <!-- Default body slot -->
    <div class="p-6">
      <slot />
    </div>

    <!-- Footer slot -->
    <div v-if="$slots.footer" class="px-6 py-4 border-t border-border bg-mist/10">
      <slot name="footer" />
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  hoverable?: boolean
  clickable?: boolean
}

defineProps<Props>()
</script>
