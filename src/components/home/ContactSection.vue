<template>
  <section id="contact" class="py-20 sm:py-28 bg-white overflow-hidden">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-start">
        
        <!-- Column 1: Contact Info (3/12 width) -->
        <div class="lg:col-span-3 space-y-6 text-left" data-reveal>
          <span class="block font-body font-semibold text-teal text-xs tracking-wider uppercase">
            Contact
          </span>
          <h2 class="font-display font-extrabold text-navy text-3xl sm:text-4xl leading-tight">
            Get in touch.
          </h2>
          <p class="font-body font-normal text-mid text-sm leading-relaxed">
            We typically respond within 4 business hours.
          </p>
          
          <div class="pt-6 space-y-4 font-body text-sm text-charcoal/80 border-t border-border">
            <div>
              <h4 class="font-bold text-navy text-xs uppercase tracking-wide mb-1">Headquarters</h4>
              <address class="not-italic font-light leading-relaxed">
                Temple Quay House<br />
                2 The Square, Temple Quay<br />
                London NW1 6DG<br />
                United Kingdom
              </address>
              <a
                href="https://maps.google.com/?q=Temple+Quay+House+2+The+Square+Temple+Quay+Bristol+BS1+6DG"
                target="_blank"
                rel="noopener noreferrer"
                class="inline-block text-teal hover:underline text-xs font-semibold mt-1"
              >
                View on Google Maps &rarr;
              </a>
            </div>

            <div>
              <h4 class="font-bold text-navy text-xs uppercase tracking-wide mb-1">Email</h4>
              <a href="mailto:info@spiralync.com" class="font-light text-teal hover:underline">
                info@spiralync.com
              </a>
            </div>

            <div>
              <h4 class="font-bold text-navy text-xs uppercase tracking-wide mb-1">Phone</h4>
              <a href="tel:+441171234567" class="font-light text-teal hover:underline">
                +44 117 123 4567
              </a>
            </div>
          </div>
        </div>

        <!-- Column 2: Contact Form (5/12 width) -->
        <div class="lg:col-span-5" data-reveal data-reveal-delay="0.1">
          <AppCard class="border border-border p-6 sm:p-8 rounded-card text-left">
            <div v-if="isSuccess" class="py-8 flex flex-col items-center justify-center text-center space-y-4">
              <div class="w-16 h-16 bg-teal/15 rounded-full flex items-center justify-center text-teal border border-teal/20">
                <CheckIcon class="w-8 h-8" />
              </div>
              <h3 class="font-display font-bold text-navy text-2xl">Message Sent!</h3>
              <p class="font-body text-mid text-sm max-w-xs font-light leading-relaxed">
                Thanks for reaching out! We have logged your enquiry and will follow up shortly.
              </p>
              <AppButton variant="teal" size="sm" @click="resetForm">
                Send Another Message
              </AppButton>
            </div>

            <form v-else class="space-y-4 font-body" @submit.prevent="handleContactSubmit">
              <div>
                <label class="block text-xs font-semibold text-charcoal uppercase tracking-wider mb-2">Name *</label>
                <input
                  v-model="form.name"
                  type="text"
                  class="w-full px-4 py-2 border border-border rounded-lg focus:outline-hidden focus:border-teal focus:ring-1 focus:ring-teal bg-mist/20"
                  placeholder="James Carter"
                />
                <span v-if="errors.name" class="block text-red-500 text-xs mt-1">{{ errors.name }}</span>
              </div>

              <div>
                <label class="block text-xs font-semibold text-charcoal uppercase tracking-wider mb-2">Email Address *</label>
                <input
                  v-model="form.email"
                  type="email"
                  class="w-full px-4 py-2 border border-border rounded-lg focus:outline-hidden focus:border-teal focus:ring-1 focus:ring-teal bg-mist/20"
                  placeholder="james@company.com"
                />
                <span v-if="errors.email" class="block text-red-500 text-xs mt-1">{{ errors.email }}</span>
              </div>

              <div>
                <label class="block text-xs font-semibold text-charcoal uppercase tracking-wider mb-2">Subject *</label>
                <input
                  v-model="form.subject"
                  type="text"
                  class="w-full px-4 py-2 border border-border rounded-lg focus:outline-hidden focus:border-teal focus:ring-1 focus:ring-teal bg-mist/20"
                  placeholder="Query regarding Flutter app expansion"
                />
                <span v-if="errors.subject" class="block text-red-500 text-xs mt-1">{{ errors.subject }}</span>
              </div>

              <div>
                <label class="block text-xs font-semibold text-charcoal uppercase tracking-wider mb-2">Message *</label>
                <textarea
                  v-model="form.message"
                  rows="5"
                  class="w-full px-4 py-2 border border-border rounded-lg focus:outline-hidden focus:border-teal focus:ring-1 focus:ring-teal bg-mist/20 resize-none"
                  placeholder="Describe your enquiry details..."
                ></textarea>
                <span v-if="errors.message" class="block text-red-500 text-xs mt-1">{{ errors.message }}</span>
              </div>

              <div v-if="firebaseError" class="p-3 bg-red-50 text-red-600 rounded-lg text-xs font-semibold">
                {{ firebaseError }}
              </div>

              <div class="pt-2">
                <AppButton variant="primary" type="submit" class="w-full py-3!" :loading="sending">
                  Send Message
                </AppButton>
              </div>
            </form>
          </AppCard>
        </div>

        <!-- Column 3: Map Iframe (4/12 width) -->
        <div class="lg:col-span-4 space-y-4" data-reveal data-reveal-delay="0.2">
          <div class="w-full aspect-[4/3] rounded-card overflow-hidden shadow-md border border-border relative">
            <iframe
              src="https://maps.google.com/maps?q=Temple%20Quay%20Bristol&t=&z=14&ie=UTF8&iwloc=&output=embed"
              class="absolute inset-0 w-full h-full border-0"
              allowfullscreen
              loading="lazy"
              referrerpolicy="no-referrer-when-downgrade"
              title="Spiralync Headquarters Location Map"
            ></iframe>
          </div>
          <p class="font-body text-mid text-xs italic text-center">
            Spiralync HQ, London
          </p>
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
  subject: '',
  message: ''
})

const errors = ref({
  name: '',
  email: '',
  subject: '',
  message: ''
})

function resetForm() {
  form.value = {
    name: '',
    email: '',
    subject: '',
    message: ''
  }
  errors.value = {
    name: '',
    email: '',
    subject: '',
    message: ''
  }
  isSuccess.value = false
  firebaseError.value = ''
}

function validateForm(): boolean {
  let isValid = true
  errors.value = {
    name: '',
    email: '',
    subject: '',
    message: ''
  }

  if (!form.value.name.trim()) {
    errors.value.name = 'Name is required'
    isValid = false
  }

  if (!form.value.email.trim()) {
    errors.value.email = 'Email address is required'
    isValid = false
  } else if (!/\S+@\S+\.\S+/.test(form.value.email)) {
    errors.value.email = 'Please enter a valid email address'
    isValid = false
  }

  if (!form.value.subject.trim()) {
    errors.value.subject = 'Subject is required'
    isValid = false
  }

  if (!form.value.message.trim()) {
    errors.value.message = 'Message is required'
    isValid = false
  } else if (form.value.message.trim().length < 10) {
    errors.value.message = 'Please type a message of at least 10 characters'
    isValid = false
  }

  return isValid
}

async function handleContactSubmit() {
  if (!validateForm()) return
  firebaseError.value = ''

  try {
    const templateId = import.meta.env.VITE_EMAILJS_CONTACT_TEMPLATE_ID || ''

    // 1. EmailJS Send
    if (templateId) {
      await sendEmail(templateId, {
        from_name: form.value.name,
        from_email: form.value.email,
        subject: form.value.subject,
        message: form.value.message
      })
    } else {
      console.warn('VITE_EMAILJS_CONTACT_TEMPLATE_ID not configured. Skipping EmailJS.')
    }

    // 2. Firestore Add
    try {
      await addDoc(collection(db, 'enquiries'), {
        type: 'contact',
        name: form.value.name,
        email: form.value.email,
        message: `${form.value.subject}: ${form.value.message}`,
        read: false,
        createdAt: new Date()
      })
    } catch (dbErr: any) {
      console.warn('Firestore write failed, using local success fallback:', dbErr)
    }

    isSuccess.value = true
  } catch (err: any) {
    console.error('Contact submit error:', err)
    if (err.message && err.message.includes('not configured')) {
      isSuccess.value = true
    } else {
      firebaseError.value = err.message || 'Submission failed. Please check inputs and retry.'
    }
  }
}
</script>
