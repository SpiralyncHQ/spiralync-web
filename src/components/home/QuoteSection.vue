<template>
  <section id="quote" class="py-20 sm:py-28 bg-navy text-white overflow-hidden border-b border-slate/30">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
        
        <!-- Left: Copy -->
        <div class="lg:col-span-5 space-y-6 text-left" data-reveal>
          <span class="block font-body font-semibold text-teal text-xs tracking-wider uppercase">
            Start a Project
          </span>
          <h2 class="font-display font-extrabold text-white text-3xl sm:text-4xl md:text-5xl leading-tight">
            Start a project <span class="text-teal">with us.</span>
          </h2>
          <p class="font-body font-normal text-slate-300 text-sm sm:text-base leading-relaxed font-light">
            Tell us what you're building. We'll review your details and get back to you within one business day with a response.
          </p>
          
          <ul class="space-y-4 pt-6 font-body text-sm sm:text-base font-medium">
            <li class="flex items-center gap-3">
              <span class="text-teal font-bold">&rarr;</span>
              <span>No obligation project estimates</span>
            </li>
            <li class="flex items-center gap-3">
              <span class="text-teal font-bold">&rarr;</span>
              <span>Senior engineer oversight on every project</span>
            </li>
            <li class="flex items-center gap-3">
              <span class="text-teal font-bold">&rarr;</span>
              <span>Flexible fixed-price or time &amp; materials pricing</span>
            </li>
          </ul>
        </div>

        <!-- Right: Form -->
        <div class="lg:col-span-7" data-reveal data-reveal-delay="0.2">
          <AppCard class="border-0 bg-slate/20 backdrop-blur-md p-6 sm:p-10 shadow-2xl rounded-card text-left max-w-2xl mx-auto lg:mx-0">
            
            <!-- Success Message Overlay -->
            <div v-if="isSuccess" class="py-12 flex flex-col items-center justify-center text-center space-y-4">
              <div class="w-16 h-16 bg-teal/15 rounded-full flex items-center justify-center text-teal border border-teal/20">
                <CheckIcon class="w-8 h-8" />
              </div>
              <h3 class="font-display font-bold text-white text-2xl">Request Received!</h3>
              <p class="font-body text-slate-300 text-sm max-w-sm font-light leading-relaxed">
                Thanks! We have logged your request. We'll be in touch within one business day.
              </p>
              <AppButton variant="teal" size="sm" @click="resetForm">
                Submit Another Request
              </AppButton>
            </div>

            <!-- Form Body -->
            <form v-else class="space-y-5 font-body" @submit.prevent="handleQuoteSubmit">
              <!-- Name & Email Row -->
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label class="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">Full Name *</label>
                  <input
                    v-model="form.name"
                    type="text"
                    class="w-full px-4 py-2.5 border border-slate/50 rounded-lg focus:outline-hidden focus:border-teal focus:ring-1 focus:ring-teal bg-white/5 text-navy"
                    placeholder="Sarah Jenkins"
                  />
                  <span v-if="errors.name" class="block text-red-400 text-xs mt-1">{{ errors.name }}</span>
                </div>
                
                <div>
                  <label class="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">Email Address *</label>
                  <input
                    v-model="form.email"
                    type="email"
                    class="w-full px-4 py-2.5 border border-slate/50 rounded-lg focus:outline-hidden focus:border-teal focus:ring-1 focus:ring-teal bg-white/5 text-navy"
                    placeholder="sarah@company.com"
                  />
                  <span v-if="errors.email" class="block text-red-400 text-xs mt-1">{{ errors.email }}</span>
                </div>
              </div>

              <!-- Company / Organisation -->
              <div>
                <label class="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">Company / Organisation (Optional)</label>
                <input
                  v-model="form.company"
                  type="text"
                  class="w-full px-4 py-2.5 border border-slate/50 rounded-lg focus:outline-hidden focus:border-teal focus:ring-1 focus:ring-teal bg-white/5 text-navy"
                  placeholder="Reisty Systems Ltd"
                />
              </div>

              <!-- Select Dropdowns -->
              <div class="grid grid-cols-1 sm:grid-cols-3 gap-5">
                <div>
                  <label class="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">Project Type *</label>
                  <select
                    v-model="form.projectType"
                    class="w-full px-4 py-2.5 border border-slate/50 rounded-lg focus:outline-hidden focus:border-teal focus:ring-1 focus:ring-teal bg-slate text-white"
                  >
                    <option value="" disabled>Select...</option>
                    <option value="Mobile App">Mobile App</option>
                    <option value="Web Platform">Web Platform</option>
                    <option value="Tech Consultancy">Tech Consultancy</option>
                    <option value="Other">Other</option>
                  </select>
                  <span v-if="errors.projectType" class="block text-red-400 text-xs mt-1">{{ errors.projectType }}</span>
                </div>

                <div>
                  <label class="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">Budget Range *</label>
                  <select
                    v-model="form.budget"
                    class="w-full px-4 py-2.5 border border-slate/50 rounded-lg focus:outline-hidden focus:border-teal focus:ring-1 focus:ring-teal bg-slate text-white"
                  >
                    <option value="" disabled>Select...</option>
                    <option value="Under £5k">Under &pound;5k</option>
                    <option value="£5k–£15k">&pound;5k&ndash;&pound;15k</option>
                    <option value="£15k–£50k">&pound;15k&ndash;&pound;50k</option>
                    <option value="£50k+">&pound;50k+</option>
                    <option value="Not sure yet">Not sure yet</option>
                  </select>
                  <span v-if="errors.budget" class="block text-red-400 text-xs mt-1">{{ errors.budget }}</span>
                </div>

                <div>
                  <label class="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">Ideal Timeline *</label>
                  <select
                    v-model="form.timeline"
                    class="w-full px-4 py-2.5 border border-slate/50 rounded-lg focus:outline-hidden focus:border-teal focus:ring-1 focus:ring-teal bg-slate text-white"
                  >
                    <option value="" disabled>Select...</option>
                    <option value="ASAP">ASAP</option>
                    <option value="1–3 months">1&ndash;3 months</option>
                    <option value="3–6 months">3&ndash;6 months</option>
                    <option value="6+ months">6+ months</option>
                    <option value="Flexible">Flexible</option>
                  </select>
                  <span v-if="errors.timeline" class="block text-red-400 text-xs mt-1">{{ errors.timeline }}</span>
                </div>
              </div>

              <!-- Brief / Description -->
              <div>
                <label class="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">Brief Description *</label>
                <textarea
                  v-model="form.brief"
                  rows="4"
                  class="w-full px-4 py-2.5 border border-slate/50 rounded-lg focus:outline-hidden focus:border-teal focus:ring-1 focus:ring-teal bg-white/5 text-navy resize-none"
                  placeholder="Describe what you're building in a few sentences..."
                ></textarea>
                <span v-if="errors.brief" class="block text-red-400 text-xs mt-1">{{ errors.brief }}</span>
              </div>

              <!-- Error Banner -->
              <div v-if="firebaseError" class="p-3.5 bg-red-500/10 border border-red-500/20 text-red-300 rounded-lg text-xs font-medium">
                {{ firebaseError }}
              </div>

              <!-- Submit -->
              <div class="pt-3">
                <AppButton
                  variant="teal"
                  type="submit"
                  class="w-full py-3!"
                  :loading="sending"
                >
                  Send Request &rarr;
                </AppButton>
              </div>
            </form>
            
          </AppCard>
        </div>

      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Check as CheckIcon } from 'lucide-vue-next'
import { collection, addDoc } from 'firebase/firestore'
import { db } from '@/firebase/config'
import { useEmailJS } from '@/composables/useEmailJS'
import AppCard from '@/components/common/AppCard.vue'
import AppButton from '@/components/common/AppButton.vue'

const { sending, sendEmail } = useEmailJS()

const isSuccess = ref(false)
const firebaseError = ref('')

const form = ref({
  name: '',
  email: '',
  company: '',
  projectType: '',
  budget: '',
  timeline: '',
  brief: ''
})

const errors = ref({
  name: '',
  email: '',
  projectType: '',
  budget: '',
  timeline: '',
  brief: ''
})

function resetForm() {
  form.value = {
    name: '',
    email: '',
    company: '',
    projectType: '',
    budget: '',
    timeline: '',
    brief: ''
  }
  errors.value = {
    name: '',
    email: '',
    projectType: '',
    budget: '',
    timeline: '',
    brief: ''
  }
  isSuccess.value = false
  firebaseError.value = ''
}

function validateForm(): boolean {
  let isValid = true
  
  // Clear previous errors
  errors.value = {
    name: '',
    email: '',
    projectType: '',
    budget: '',
    timeline: '',
    brief: ''
  }

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

  if (!form.value.projectType) {
    errors.value.projectType = 'Project type is required'
    isValid = false
  }

  if (!form.value.budget) {
    errors.value.budget = 'Budget range is required'
    isValid = false
  }

  if (!form.value.timeline) {
    errors.value.timeline = 'Timeline is required'
    isValid = false
  }

  if (!form.value.brief.trim()) {
    errors.value.brief = 'Brief description is required'
    isValid = false
  } else if (form.value.brief.trim().length < 15) {
    errors.value.brief = 'Please describe in at least 15 characters'
    isValid = false
  }

  return isValid
}

async function handleQuoteSubmit() {
  if (!validateForm()) return
  firebaseError.value = ''

  try {
    const templateId = import.meta.env.VITE_EMAILJS_QUOTE_TEMPLATE_ID || ''

    // 1. Send Email via EmailJS
    if (templateId) {
      await sendEmail(templateId, {
        from_name: form.value.name,
        from_email: form.value.email,
        company: form.value.company || 'N/A',
        project_type: form.value.projectType,
        budget: form.value.budget,
        timeline: form.value.timeline,
        message: form.value.brief
      })
    } else {
      console.warn('VITE_EMAILJS_QUOTE_TEMPLATE_ID not configured. Skipping EmailJS.')
    }

    // 2. Write to Firestore enquiries collection
    try {
      await addDoc(collection(db, 'enquiries'), {
        type: 'quote',
        name: form.value.name,
        email: form.value.email,
        company: form.value.company || '',
        projectType: form.value.projectType,
        budget: form.value.budget,
        timeline: form.value.timeline,
        message: form.value.brief,
        read: false,
        createdAt: new Date()
      })
    } catch (dbErr: any) {
      console.warn('Firestore write failed, utilizing fallback success:', dbErr)
    }

    isSuccess.value = true
  } catch (err: any) {
    console.error('Submission failed:', err)
    
    // Handle configuration fallback cases (dev/local modes)
    if (err.message && err.message.includes('not configured')) {
      console.info('Local mockup successful.')
      isSuccess.value = true
    } else {
      firebaseError.value = err.message || 'An error occurred during submission. Please try again.'
    }
  }
}
</script>
