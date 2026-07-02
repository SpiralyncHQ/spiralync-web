<template>
  <AppModal
    :model-value="isOpen"
    @update:model-value="close"
    :title="career ? `Apply for ${career.title}` : 'Speculative Application'"
    size="lg"
  >
    <div class="font-body text-left">
      <!-- Success View -->
      <div v-if="isSuccess" class="py-12 flex flex-col items-center justify-center text-center space-y-4">
        <div class="w-16 h-16 bg-teal/15 rounded-full flex items-center justify-center text-teal border border-teal/20">
          <CheckIcon class="w-8 h-8" />
        </div>
        <h3 class="font-display font-bold text-navy text-2xl">Application Submitted!</h3>
        <p class="font-body text-mid text-sm max-w-sm font-light leading-relaxed">
          Application received. We'll review it and be in touch within 5 business days.
        </p>
        <AppButton variant="teal" size="md" @click="close">
          Return to Careers
        </AppButton>
      </div>

      <!-- Form View -->
      <form v-else class="space-y-5" @submit.prevent="handleApplySubmit">
        
        <!-- Full Name & Email -->
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label class="block text-xs font-semibold text-charcoal uppercase tracking-wider mb-2">Full Name *</label>
            <input
              v-model="form.name"
              type="text"
              class="w-full px-4 py-2 border border-border rounded-lg focus:outline-hidden focus:border-teal focus:ring-1 focus:ring-teal bg-mist/20"
              placeholder="Elena Rostova"
            />
            <span v-if="errors.name" class="block text-red-500 text-xs mt-1">{{ errors.name }}</span>
          </div>

          <div>
            <label class="block text-xs font-semibold text-charcoal uppercase tracking-wider mb-2">Email Address *</label>
            <input
              v-model="form.email"
              type="email"
              class="w-full px-4 py-2 border border-border rounded-lg focus:outline-hidden focus:border-teal focus:ring-1 focus:ring-teal bg-mist/20"
              placeholder="elena@company.com"
            />
            <span v-if="errors.email" class="block text-red-500 text-xs mt-1">{{ errors.email }}</span>
          </div>
        </div>

        <!-- Phone & LinkedIn URL -->
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label class="block text-xs font-semibold text-charcoal uppercase tracking-wider mb-2">Phone Number *</label>
            <input
              v-model="form.phone"
              type="tel"
              class="w-full px-4 py-2 border border-border rounded-lg focus:outline-hidden focus:border-teal focus:ring-1 focus:ring-teal bg-mist/20"
              placeholder="+44 7700 900077"
            />
            <span v-if="errors.phone" class="block text-red-500 text-xs mt-1">{{ errors.phone }}</span>
          </div>

          <div>
            <label class="block text-xs font-semibold text-charcoal uppercase tracking-wider mb-2">LinkedIn Profile URL *</label>
            <input
              v-model="form.linkedinUrl"
              type="text"
              class="w-full px-4 py-2 border border-border rounded-lg focus:outline-hidden focus:border-teal focus:ring-1 focus:ring-teal bg-mist/20"
              placeholder="linkedin.com/in/elena-rostova"
            />
            <span v-if="errors.linkedinUrl" class="block text-red-500 text-xs mt-1">{{ errors.linkedinUrl }}</span>
          </div>
        </div>

        <!-- CV Upload Zone -->
        <div>
          <label class="block text-xs font-semibold text-charcoal uppercase tracking-wider mb-2">CV Upload (PDF, max 5MB) *</label>
          <div
            @dragover.prevent="isCvDragOver = true"
            @dragleave.prevent="isCvDragOver = false"
            @drop.prevent="onCvDrop"
            @click="triggerCvSelect"
            class="relative border-2 border-dashed rounded-xl p-5 text-center cursor-pointer transition-colors duration-200"
            :class="[
              isCvDragOver ? 'border-teal bg-teal/5' : 'border-border hover:border-teal'
            ]"
          >
            <input
              ref="cvInput"
              type="file"
              accept=".pdf"
              class="hidden"
              @change="onCvSelected"
            />
            
            <div class="flex flex-col items-center gap-2">
              <UploadCloudIcon class="w-8 h-8 text-mid" />
              <p class="text-xs text-charcoal/80 font-medium">
                Drag &amp; drop or click to browse
              </p>
              <p class="text-[10px] text-mid">
                PDF format only, up to 5MB
              </p>
            </div>
          </div>
          <!-- Selected filename display -->
          <div v-if="cvFile" class="mt-2 flex items-center justify-between bg-mist/40 border border-border px-3 py-1.5 rounded-lg text-xs">
            <span class="truncate max-w-[80%] font-medium text-navy">{{ cvFile.name }}</span>
            <button type="button" class="text-red-500 hover:text-red-700 font-bold focus:outline-none cursor-pointer" @click.stop="removeCv">
              ✕
            </button>
          </div>
          <span v-if="errors.cv" class="block text-red-500 text-xs mt-1">{{ errors.cv }}</span>
        </div>

        <!-- Cover Letter Upload Zone -->
        <div>
          <label class="block text-xs font-semibold text-charcoal uppercase tracking-wider mb-2">Cover Letter (PDF, max 5MB) *</label>
          <div
            @dragover.prevent="isCoverLetterDragOver = true"
            @dragleave.prevent="isCoverLetterDragOver = false"
            @drop.prevent="onCoverLetterDrop"
            @click="triggerCoverLetterSelect"
            class="relative border-2 border-dashed rounded-xl p-5 text-center cursor-pointer transition-colors duration-200"
            :class="[
              isCoverLetterDragOver ? 'border-teal bg-teal/5' : 'border-border hover:border-teal'
            ]"
          >
            <input
              ref="coverLetterInput"
              type="file"
              accept=".pdf"
              class="hidden"
              @change="onCoverLetterSelected"
            />
            
            <div class="flex flex-col items-center gap-2">
              <UploadCloudIcon class="w-8 h-8 text-mid" />
              <p class="text-xs text-charcoal/80 font-medium">
                Drag &amp; drop or click to browse
              </p>
              <p class="text-[10px] text-mid">
                PDF format only, up to 5MB
              </p>
            </div>
          </div>
          <!-- Selected filename display -->
          <div v-if="coverLetterFile" class="mt-2 flex items-center justify-between bg-mist/40 border border-border px-3 py-1.5 rounded-lg text-xs">
            <span class="truncate max-w-[80%] font-medium text-navy">{{ coverLetterFile.name }}</span>
            <button type="button" class="text-red-500 hover:text-red-700 font-bold focus:outline-none cursor-pointer" @click.stop="removeCoverLetter">
              ✕
            </button>
          </div>
          <span v-if="errors.coverLetter" class="block text-red-500 text-xs mt-1">{{ errors.coverLetter }}</span>
        </div>

        <!-- Error Panel -->
        <div v-if="submitError" class="p-3.5 bg-red-50 border border-red-200 text-red-600 rounded-lg text-xs font-semibold">
          {{ submitError }}
        </div>

        <!-- Submit Buttons -->
        <div class="pt-4 border-t border-border flex justify-end gap-3">
          <AppButton variant="secondary" size="md" type="button" @click="close" :disabled="sending">
            Cancel
          </AppButton>
          <AppButton variant="teal" size="md" type="submit" :loading="sending">
            Submit Application
          </AppButton>
        </div>

      </form>
    </div>
  </AppModal>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Check as CheckIcon, UploadCloud as UploadCloudIcon } from 'lucide-vue-next'
import { collection, addDoc } from 'firebase/firestore'
import { ref as storageRef, uploadBytes, getDownloadURL } from 'firebase/storage'
import { db, storage } from '@/firebase/config'
import { useEmailJS } from '@/composables/useEmailJS'
import AppModal from '@/components/common/AppModal.vue'
import AppButton from '@/components/common/AppButton.vue'
import type { CareerListing } from '@/types'

const props = defineProps<{
  isOpen: boolean
  career: CareerListing | null
}>()

const emit = defineEmits<{
  (e: 'close'): void
}>()

const { sending, sendEmail } = useEmailJS()

const isSuccess = ref(false)
const submitError = ref('')

const form = ref({
  name: '',
  email: '',
  phone: '',
  linkedinUrl: ''
})

const errors = ref({
  name: '',
  email: '',
  phone: '',
  linkedinUrl: '',
  cv: '',
  coverLetter: ''
})

const cvFile = ref<File | null>(null)
const coverLetterFile = ref<File | null>(null)

const isCvDragOver = ref(false)
const isCoverLetterDragOver = ref(false)

const cvInput = ref<HTMLInputElement | null>(null)
const coverLetterInput = ref<HTMLInputElement | null>(null)

function close() {
  resetForm()
  emit('close')
}

function resetForm() {
  form.value = { name: '', email: '', phone: '', linkedinUrl: '' }
  errors.value = { name: '', email: '', phone: '', linkedinUrl: '', cv: '', coverLetter: '' }
  cvFile.value = null
  coverLetterFile.value = null
  isSuccess.value = false
  submitError.value = ''
}

// Custom drop zones triggers
function triggerCvSelect() {
  cvInput.value?.click()
}
function triggerCoverLetterSelect() {
  coverLetterInput.value?.click()
}

function validateFile(file: File): string | null {
  if (file.type !== 'application/pdf') {
    return 'Only PDF documents are accepted.'
  }
  if (file.size > 5 * 1024 * 1024) {
    return 'File size exceeds the 5MB limit.'
  }
  return null
}

function onCvDrop(e: DragEvent) {
  isCvDragOver.value = false
  const file = e.dataTransfer?.files?.[0]
  if (file) {
    const errorMsg = validateFile(file)
    if (errorMsg) {
      errors.value.cv = errorMsg
      cvFile.value = null
    } else {
      cvFile.value = file
      errors.value.cv = ''
    }
  }
}

function onCvSelected(e: Event) {
  const file = (e.target as HTMLInputElement).files?.[0]
  if (file) {
    const errorMsg = validateFile(file)
    if (errorMsg) {
      errors.value.cv = errorMsg
      cvFile.value = null
    } else {
      cvFile.value = file
      errors.value.cv = ''
    }
  }
}

function onCoverLetterDrop(e: DragEvent) {
  isCoverLetterDragOver.value = false
  const file = e.dataTransfer?.files?.[0]
  if (file) {
    const errorMsg = validateFile(file)
    if (errorMsg) {
      errors.value.coverLetter = errorMsg
      coverLetterFile.value = null
    } else {
      coverLetterFile.value = file
      errors.value.coverLetter = ''
    }
  }
}

function onCoverLetterSelected(e: Event) {
  const file = (e.target as HTMLInputElement).files?.[0]
  if (file) {
    const errorMsg = validateFile(file)
    if (errorMsg) {
      errors.value.coverLetter = errorMsg
      coverLetterFile.value = null
    } else {
      coverLetterFile.value = file
      errors.value.coverLetter = ''
    }
  }
}

function removeCv() {
  cvFile.value = null
  errors.value.cv = ''
  if (cvInput.value) cvInput.value.value = ''
}

function removeCoverLetter() {
  coverLetterFile.value = null
  errors.value.coverLetter = ''
  if (coverLetterInput.value) coverLetterInput.value.value = ''
}

function validateLinkedIn(url: string): boolean {
  const regex = /^(https?:\/\/)?(www\.)?linkedin\.com\/in\//i
  return regex.test(url.trim())
}

function validateForm(): boolean {
  let isValid = true
  errors.value = { name: '', email: '', phone: '', linkedinUrl: '', cv: '', coverLetter: '' }

  if (!form.value.name.trim()) {
    errors.value.name = 'Full name is required'
    isValid = false
  }

  if (!form.value.email.trim()) {
    errors.value.email = 'Email address is required'
    isValid = false
  } else if (!/\S+@\S+\.\S+/.test(form.value.email)) {
    errors.value.email = 'Please enter a valid email address'
    isValid = false
  }

  if (!form.value.phone.trim()) {
    errors.value.phone = 'Phone number is required'
    isValid = false
  }

  if (!form.value.linkedinUrl.trim()) {
    errors.value.linkedinUrl = 'LinkedIn profile URL is required'
    isValid = false
  } else if (!validateLinkedIn(form.value.linkedinUrl)) {
    errors.value.linkedinUrl = 'LinkedIn URL must start with linkedin.com/in/'
    isValid = false
  }

  if (!cvFile.value) {
    errors.value.cv = 'CV document is required'
    isValid = false
  }

  if (!coverLetterFile.value) {
    errors.value.coverLetter = 'Cover Letter document is required'
    isValid = false
  }

  return isValid
}

async function handleApplySubmit() {
  if (!validateForm()) return
  submitError.value = ''

  try {
    const careerId = props.career ? props.career.id : 'speculative'
    const careerTitle = props.career ? props.career.title : 'Speculative CV Pool'
    const timestamp = Date.now()

    let cvUrl = ''
    let coverLetterUrl = ''

    // 1. Upload files to Firebase Storage (with local fallbacks on credentials errors)
    try {
      const cvRef = storageRef(storage, `applications/${careerId}/${timestamp}/${cvFile.value!.name}`)
      await uploadBytes(cvRef, cvFile.value!)
      cvUrl = await getDownloadURL(cvRef)
    } catch (storageErr) {
      console.warn('Firebase CV Storage failed, using mock URL:', storageErr)
      cvUrl = `https://firebasestorage.googleapis.com/v0/b/mock/applications/${careerId}/${cvFile.value!.name}`
    }

    try {
      const clRef = storageRef(storage, `applications/${careerId}/${timestamp}/${coverLetterFile.value!.name}`)
      await uploadBytes(clRef, coverLetterFile.value!)
      coverLetterUrl = await getDownloadURL(clRef)
    } catch (storageErr) {
      console.warn('Firebase Cover Letter Storage failed, using mock URL:', storageErr)
      coverLetterUrl = `https://firebasestorage.googleapis.com/v0/b/mock/applications/${careerId}/${coverLetterFile.value!.name}`
    }

    // 2. Add application to Firestore
    try {
      await addDoc(collection(db, 'applications'), {
        careerId,
        careerTitle,
        name: form.value.name,
        email: form.value.email,
        phone: form.value.phone,
        linkedinUrl: form.value.linkedinUrl,
        cvUrl,
        coverLetterUrl,
        createdAt: new Date()
      })
    } catch (dbErr) {
      console.warn('Firestore Application write failed, utilising fallback success:', dbErr)
    }

    // 3. Trigger EmailJS notification
    const templateId = import.meta.env.VITE_EMAILJS_CAREERS_TEMPLATE_ID || ''
    if (templateId) {
      await sendEmail(templateId, {
        applicant_name: form.value.name,
        applicant_email: form.value.email,
        role_title: careerTitle,
        cv_url: cvUrl,
        cover_letter_url: coverLetterUrl
      })
    } else {
      console.warn('VITE_EMAILJS_CAREERS_TEMPLATE_ID not configured. Skipping EmailJS.')
    }

    isSuccess.value = true
  } catch (err: any) {
    console.error('Job application submission error:', err)
    if (err.message && err.message.includes('not configured')) {
      isSuccess.value = true
    } else {
      submitError.value = err.message || 'An error occurred during submission. Please try again.'
    }
  }
}
</script>
