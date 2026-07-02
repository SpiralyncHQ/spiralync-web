<template>
  <footer class="bg-navy text-white/90 border-t border-slate/30 py-16 sm:py-20 font-body relative z-10">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="grid grid-cols-1 md:grid-cols-4 gap-12 sm:gap-16">
        <!-- Column 1 — Brand -->
        <div class="space-y-6 md:col-span-2">
          <router-link to="/" class="flex items-center gap-3 focus:outline-none">
            <svg class="h-10 w-auto" viewBox="0 0 500 120" fill="none" xmlns="http://www.w3.org/2000/svg">
              <g transform="translate(10, 10)">
                <!-- Outer Spiral Arc -->
                <path d="M 68 32 A 25 25 0 1 0 50 75" fill="none" stroke="#FFFFFF" stroke-width="12" stroke-linecap="round" />
                <!-- Inner Spiral Arc -->
                <path d="M 50 75 A 15 15 0 0 0 50 45 A 5 5 0 0 0 50 55" fill="none" stroke="#00C896" stroke-width="8" stroke-linecap="round" />
              </g>
              <text x="130" y="70" font-family="'Plus Jakarta Sans', sans-serif" font-size="42" font-weight="800" letter-spacing="-0.5">
                <tspan fill="#FFFFFF">Spira</tspan>
                <tspan fill="#00C896">lync</tspan>
              </text>
            </svg>
          </router-link>
          <p class="text-slate-300 text-sm max-w-sm font-light leading-relaxed">
            Built to move. Engineered to last.
          </p>
          <!-- Social Icons -->
          <div class="flex gap-5 pt-2">
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              class="text-slate-400 hover:text-white transition-colors"
              aria-label="LinkedIn"
            >
              <LinkedinIcon class="w-5 h-5" />
            </a>
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              class="text-slate-400 hover:text-white transition-colors"
              aria-label="GitHub"
            >
              <GithubIcon class="w-5 h-5" />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              class="text-slate-400 hover:text-white transition-colors"
              aria-label="Twitter"
            >
              <TwitterIcon class="w-5 h-5" />
            </a>
          </div>
        </div>

        <!-- Column 2 — Company -->
        <div class="space-y-4">
          <h4 class="font-display font-semibold text-xs tracking-wider uppercase text-teal">
            Company
          </h4>
          <ul class="space-y-2 text-sm font-light text-slate-300">
            <li>
              <a href="#about" class="hover:text-white transition-colors cursor-pointer" @click.prevent="handleScrollNav('about')">About Us</a>
            </li>
            <li>
              <a href="#projects" class="hover:text-white transition-colors cursor-pointer" @click.prevent="handleScrollNav('projects')">Projects</a>
            </li>
            <li>
              <router-link to="/blog" class="hover:text-white transition-colors">Blog</router-link>
            </li>
            <li>
              <router-link to="/careers" class="hover:text-white transition-colors">Careers</router-link>
            </li>
            <li>
              <button type="button" class="hover:text-white transition-colors cursor-pointer focus:outline-none" @click="privacyModal.open">
                Privacy Policy
              </button>
            </li>
            <li>
              <button type="button" class="hover:text-white transition-colors cursor-pointer focus:outline-none" @click="termsModal.open">
                Terms of Service
              </button>
            </li>
          </ul>
        </div>

        <!-- Column 3 — Services -->
        <div class="space-y-4">
          <h4 class="font-display font-semibold text-xs tracking-wider uppercase text-teal">
            Services
          </h4>
          <ul class="space-y-2 text-sm font-light text-slate-300">
            <li>Flutter Mobile Development</li>
            <li>Web Engineering</li>
            <li>Tech Consultancy</li>
            <li>App Products</li>
            <li>Innovation Lab</li>
          </ul>
        </div>

        <!-- Column 4 — Contact -->
        <div class="space-y-4">
          <h4 class="font-display font-semibold text-xs tracking-wider uppercase text-teal">
            Get in Touch
          </h4>
          <address class="text-sm font-light text-slate-300 not-italic leading-relaxed">
            Temple Quay House<br />
            2 The Square, Temple Quay<br />
            London NW1 6DG<br />
            United Kingdom
          </address>
          <div class="space-y-2 text-sm font-light pt-2">
            <a
              href="https://maps.google.com/?q=Temple+Quay+House+2+The+Square+Temple+Quay+Bristol+BS1+6DG"
              target="_blank"
              rel="noopener noreferrer"
              class="block text-teal hover:underline text-xs tracking-wide"
            >
              View on Google Maps &rarr;
            </a>
            <a href="mailto:info@spiralync.com" class="block text-slate-300 hover:text-white transition-colors">
              info@spiralync.com
            </a>
            <a href="tel:+441171234567" class="block text-slate-300 hover:text-white transition-colors">
              +44 117 123 4567
            </a>
          </div>
        </div>
      </div>

      <!-- Bottom Bar -->
      <div class="border-t border-white/10 mt-16 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs font-light text-slate-400">
        <p>&copy; 2026 Spiralync Ltd. All rights reserved. Registered in England & Wales.</p>
        <div class="flex gap-4">
          <button type="button" class="hover:text-white transition-colors cursor-pointer focus:outline-none" @click="privacyModal.open">
            Privacy Policy
          </button>
          <span>|</span>
          <button type="button" class="hover:text-white transition-colors cursor-pointer focus:outline-none" @click="termsModal.open">
            Terms of Service
          </button>
        </div>
      </div>
    </div>

    <!-- Privacy Policy Modal -->
    <AppModal v-model="privacyModal.isOpen.value" title="Privacy Policy — Spiralync" size="xl">
      <div class="space-y-4 text-sm sm:text-base font-body leading-relaxed text-charcoal/80">
        <p class="font-semibold text-navy">Last updated: 1 June 2026</p>
        
        <div>
          <h4 class="text-base font-bold text-navy mb-1">1. Data We Collect</h4>
          <p>We collect personal data you provide through our contact forms, quote requests, job applications, and direct communications. This may include name, email address, phone number, and professional details.</p>
        </div>
        
        <div>
          <h4 class="text-base font-bold text-navy mb-1">2. How We Use Your Data</h4>
          <p>Your data is used to respond to your enquiries, process job applications, send requested information, and improve our services. We do not sell, rent, or share your data with third parties for marketing purposes.</p>
        </div>
        
        <div>
          <h4 class="text-base font-bold text-navy mb-1">3. Data Storage</h4>
          <p>Personal data is securely stored using Firebase (Google Cloud infrastructure), subject to Google's data processing terms and GDPR-compliant safeguards.</p>
        </div>
        
        <div>
          <h4 class="text-base font-bold text-navy mb-1">4. Your Rights</h4>
          <p>Under UK GDPR, you have the right to access, correct, delete, or port your personal data at any time. To exercise these rights, email <a href="mailto:info@spiralync.com" class="text-teal hover:underline font-medium">info@spiralync.com</a>.</p>
        </div>
        
        <div>
          <h4 class="text-base font-bold text-navy mb-1">5. Cookies</h4>
          <p>Our website uses essential cookies only. No third-party tracking or advertising cookies are used.</p>
        </div>
        
        <div>
          <h4 class="text-base font-bold text-navy mb-1">6. Retention</h4>
          <p>Contact form and enquiry data is retained for 2 years. Job application data is retained for 12 months unless a longer period is agreed.</p>
        </div>
        
        <div>
          <h4 class="text-base font-bold text-navy mb-1">7. Contact</h4>
          <p>
            Data Controller: Spiralync Ltd<br />
            Email: <a href="mailto:info@spiralync.com" class="text-teal hover:underline font-medium">info@spiralync.com</a><br />
            Address: Temple Quay House, 2 The Square, Temple Quay, Bristol BS1 6DG
          </p>
        </div>
      </div>
      <template #footer>
        <AppButton variant="primary" @click="privacyModal.close">Close</AppButton>
      </template>
    </AppModal>

    <!-- Terms of Service Modal -->
    <AppModal v-model="termsModal.isOpen.value" title="Terms of Service — Spiralync" size="xl">
      <div class="space-y-4 text-sm sm:text-base font-body leading-relaxed text-charcoal/80">
        <p class="font-semibold text-navy">Last updated: 1 June 2026</p>
        
        <div>
          <h4 class="text-base font-bold text-navy mb-1">1. Acceptance of Terms</h4>
          <p>By accessing or using Spiralync's website and services, you agree to be bound by these Terms of Service. If you do not agree, please do not use our services.</p>
        </div>
        
        <div>
          <h4 class="text-base font-bold text-navy mb-1">2. Services</h4>
          <p>Spiralync provides technology consultancy, mobile application development, web development, and related professional services. Service specifics are governed by individual client agreements and statements of work.</p>
        </div>
        
        <div>
          <h4 class="text-base font-bold text-navy mb-1">3. Intellectual Property</h4>
          <p>All content, code, designs, and deliverables produced by Spiralync under a client engagement remain the intellectual property of Spiralync until full payment is received, at which point agreed IP transfer terms apply as specified in the client agreement.</p>
        </div>
        
        <div>
          <h4 class="text-base font-bold text-navy mb-1">4. Limitation of Liability</h4>
          <p>Spiralync's liability in connection with any service shall not exceed the total fees paid by the client for the relevant engagement in the 12 months preceding the claim.</p>
        </div>
        
        <div>
          <h4 class="text-base font-bold text-navy mb-1">5. Governing Law</h4>
          <p>These terms are governed by the laws of England and Wales. Any disputes shall be subject to the exclusive jurisdiction of the courts of England and Wales.</p>
        </div>
        
        <div>
          <h4 class="text-base font-bold text-navy mb-1">6. Contact</h4>
          <p>For any questions regarding these terms, please contact <a href="mailto:info@spiralync.com" class="text-teal hover:underline font-medium">info@spiralync.com</a>.</p>
        </div>
      </div>
      <template #footer>
        <AppButton variant="primary" @click="termsModal.close">Close</AppButton>
      </template>
    </AppModal>
  </footer>
</template>

<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'
import { Linkedin as LinkedinIcon, Github as GithubIcon, Twitter as TwitterIcon } from 'lucide-vue-next'
import { useModal } from '@/composables/useModal'
import AppModal from '@/components/common/AppModal.vue'
import AppButton from '@/components/common/AppButton.vue'

const route = useRoute()
const router = useRouter()

const privacyModal = useModal()
const termsModal = useModal()

function handleScrollNav(sectionId: string) {
  if (route.path === '/') {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  } else {
    router.push({ path: '/', query: { scrollTo: sectionId } })
  }
}
</script>
