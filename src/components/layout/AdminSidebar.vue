<template>
  <aside
    class="bg-navy border-r border-slate text-white w-64 min-h-screen flex flex-col font-body transition-all duration-300 z-30"
    :class="[isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0', 'fixed lg:sticky top-0 left-0']"
  >
    <!-- Header/Logo Area -->
    <div class="h-20 flex items-center justify-between px-6 border-b border-slate">
      <router-link to="/tty_admin/dashboard" class="flex items-center gap-2">
        <svg class="h-8 w-auto" viewBox="0 0 500 120" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g transform="translate(10, 10)">
            <!-- Outer Spiral Arc -->
            <path d="M 68 32 A 25 25 0 1 0 50 75" fill="none" stroke="#FFFFFF" stroke-width="12" stroke-linecap="round" />
            <!-- Inner Spiral Arc -->
            <path d="M 50 75 A 15 15 0 0 0 50 45 A 5 5 0 0 0 50 55" fill="none" stroke="#00C896" stroke-width="8" stroke-linecap="round" />
          </g>
          <text x="130" y="70" font-family="'Plus Jakarta Sans', sans-serif" font-size="42" font-weight="800">
            <tspan fill="#FFFFFF">Admin</tspan>
          </text>
        </svg>
      </router-link>
      <button
        type="button"
        class="lg:hidden text-mist/60 hover:text-white cursor-pointer"
        aria-label="Close sidebar"
        @click="$emit('close')"
      >
        <XIcon class="w-5 h-5" />
      </button>
    </div>

    <!-- Navigation links -->
    <nav class="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
      <router-link
        v-for="item in navItems"
        :key="item.path"
        :to="item.path"
        class="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-mist/70 hover:bg-slate hover:text-white transition-all duration-200"
        active-class="bg-teal! text-navy! font-semibold"
        @click="$emit('close')"
      >
        <component :is="item.icon" class="w-5 h-5 flex-shrink-0" />
        <span>{{ item.name }}</span>
      </router-link>
    </nav>

    <!-- Footer Profile/Logout -->
    <div class="p-4 border-t border-slate bg-slate/30">
      <div class="flex items-center justify-between">
        <div class="truncate mr-2">
          <p class="text-xs text-mist/55">Logged in as</p>
          <p class="text-sm font-semibold text-white truncate" :title="authStore.user?.email || 'Admin User'">
            {{ authStore.user?.email || 'admin@spiralync.com' }}
          </p>
        </div>
        <button
          type="button"
          class="p-2 rounded-lg text-mist/60 hover:text-teal hover:bg-slate transition-colors cursor-pointer"
          aria-label="Log out"
          @click="handleLogout"
        >
          <LogOutIcon class="w-5 h-5" />
        </button>
      </div>
    </div>
  </aside>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import {
  LayoutDashboard as DashboardIcon,
  FileText as BlogIcon,
  FolderKanban as ProjectsIcon,
  Tags as CategoriesIcon,
  Briefcase as CareersIcon,
  Inbox as EnquiriesIcon,
  Settings as SettingsIcon,
  X as XIcon,
  LogOut as LogOutIcon
} from 'lucide-vue-next'

defineProps<{
  isOpen: boolean
}>()

defineEmits<{
  (e: 'close'): void
}>()

const authStore = useAuthStore()
const router = useRouter()

const navItems = [
  { name: 'Dashboard', path: '/tty_admin/dashboard', icon: DashboardIcon },
  { name: 'Blog Posts', path: '/tty_admin/blog', icon: BlogIcon },
  { name: 'Projects', path: '/tty_admin/projects', icon: ProjectsIcon },
  { name: 'Categories', path: '/tty_admin/categories', icon: CategoriesIcon },
  { name: 'Careers', path: '/tty_admin/careers', icon: CareersIcon },
  { name: 'Enquiries', path: '/tty_admin/enquiries', icon: EnquiriesIcon },
  { name: 'Settings', path: '/tty_admin/settings', icon: SettingsIcon }
]

async function handleLogout() {
  await authStore.logout()
  router.push('/tty_admin')
}
</script>
