<template>
  <dialog
    ref="dialogRef"
    class="dialog-modal rounded-card shadow-card p-0 border-0 focus:outline-none overflow-hidden max-h-[90vh]"
    :class="[sizeClasses[size]]"
    :aria-labelledby="titleId"
    closedby="any"
    @close="onClose"
  >
    <div class="flex flex-col h-full max-h-[90vh]">
      <!-- Header -->
      <div class="flex items-center justify-between px-6 py-4 border-b border-border bg-white sticky top-0 z-10">
        <h3 :id="titleId" class="text-lg font-display font-bold text-navy">
          {{ title }}
        </h3>
        <button
          type="button"
          class="text-mid hover:text-charcoal cursor-pointer focus:outline-none transition-colors p-1 rounded-full hover:bg-mist"
          aria-label="Close modal"
          @click="close"
        >
          <XIcon class="w-5 h-5" />
        </button>
      </div>

      <!-- Content -->
      <div class="px-6 py-6 flex-1 overflow-y-auto font-body text-charcoal">
        <slot />
      </div>

      <!-- Footer -->
      <div v-if="$slots.footer" class="px-6 py-4 border-t border-border bg-mist/20 flex justify-end gap-3 sticky bottom-0 z-10">
        <slot name="footer" />
      </div>
    </div>
  </dialog>
</template>

<script setup lang="ts">
import { ref, watch, onMounted } from 'vue'
import { X as XIcon } from 'lucide-vue-next'

interface Props {
  modelValue: boolean
  title: string
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full'
}

const props = withDefaults(defineProps<Props>(), {
  size: 'md'
})

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void
}>()

const dialogRef = ref<HTMLDialogElement | null>(null)
const titleId = `modal-title-${Math.random().toString(36).substring(2, 9)}`

watch(() => props.modelValue, (newVal) => {
  if (!dialogRef.value) return
  if (newVal) {
    if (!dialogRef.value.open) {
      dialogRef.value.showModal()
    }
  } else {
    if (dialogRef.value.open) {
      dialogRef.value.close()
    }
  }
})

function close() {
  if (dialogRef.value && dialogRef.value.open) {
    dialogRef.value.close()
  }
}

function onClose() {
  emit('update:modelValue', false)
}

const sizeClasses = {
  sm: 'max-w-md w-11/12',
  md: 'max-w-lg w-11/12',
  lg: 'max-w-2xl w-11/12',
  xl: 'max-w-4xl w-11/12',
  full: 'max-w-full w-[95vw] h-[90vh]'
}

onMounted(() => {
  if (props.modelValue && dialogRef.value && !dialogRef.value.open) {
    dialogRef.value.showModal()
  }

  // Fallback for browsers without closedby support (Safari)
  const dialog = dialogRef.value
  if (dialog && !('closedBy' in HTMLDialogElement.prototype)) {
    dialog.addEventListener('click', (event) => {
      if (event.target !== dialog) return
      
      const rect = dialog.getBoundingClientRect()
      const isDialogContent = (
        rect.top <= event.clientY &&
        event.clientY <= rect.top + rect.height &&
        rect.left <= event.clientX &&
        event.clientX <= rect.left + rect.width
      )
      
      if (!isDialogContent) {
        dialog.close()
      }
    })
  }
})
</script>

<style scoped>
/* Reset and center layout for native dialogs */
.dialog-modal {
  margin: auto;
}

/* Modern CSS entry transitions utilizing allow-discrete and starting-style */
.dialog-modal[open] {
  opacity: 1;
  transform: scale(1);
  transition: 
    opacity 0.25s ease, 
    transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1), 
    display 0.25s ease allow-discrete;
}

@starting-style {
  .dialog-modal[open] {
    opacity: 0;
    transform: scale(0.95);
  }
}

.dialog-modal {
  opacity: 0;
  transform: scale(0.95);
  transition: 
    opacity 0.2s ease, 
    transform 0.2s ease, 
    display 0.2s ease allow-discrete;
}

/* Backdrop styles with starting-style transition */
.dialog-modal::backdrop {
  background-color: rgba(10, 37, 64, 0);
  backdrop-filter: blur(0px);
  transition: 
    background-color 0.25s ease, 
    backdrop-filter 0.25s ease, 
    display 0.25s ease allow-discrete;
}

.dialog-modal[open]::backdrop {
  background-color: rgba(10, 37, 64, 0.55);
  backdrop-filter: blur(4px);
}

@starting-style {
  .dialog-modal[open]::backdrop {
    background-color: rgba(10, 37, 64, 0);
    backdrop-filter: blur(0px);
  }
}
</style>
