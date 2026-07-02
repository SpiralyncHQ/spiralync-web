import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { watch } from 'vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/views/HomeView.vue')
  },
  {
    path: '/blog',
    name: 'Blog',
    component: () => import('@/views/BlogView.vue')
  },
  {
    path: '/blog/:slug',
    name: 'BlogPost',
    component: () => import('@/views/BlogPostView.vue'),
    props: true
  },
  {
    path: '/careers',
    name: 'Careers',
    component: () => import('@/views/CareersView.vue')
  },
  {
    path: '/tty_admin',
    name: 'AdminLogin',
    component: () => import('@/views/admin/AdminLogin.vue'),
    meta: { guestOnly: true }
  },
  {
    path: '/tty_admin/dashboard',
    name: 'AdminDashboard',
    component: () => import('@/views/admin/AdminDashboard.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/tty_admin/blog',
    name: 'AdminBlog',
    component: () => import('@/views/admin/AdminBlog.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/tty_admin/projects',
    name: 'AdminProjects',
    component: () => import('@/views/admin/AdminProjects.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/tty_admin/categories',
    name: 'AdminCategories',
    component: () => import('@/views/admin/AdminCategories.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/tty_admin/careers',
    name: 'AdminCareers',
    component: () => import('@/views/admin/AdminCareers.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/tty_admin/enquiries',
    name: 'AdminEnquiries',
    component: () => import('@/views/admin/AdminEnquiries.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/tty_admin/settings',
    name: 'AdminSettings',
    component: () => import('@/views/admin/AdminSettings.vue'),
    meta: { requiresAuth: true }
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior(_to, _from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0 }
    }
  }
})

router.beforeEach(async (to, _from, next) => {
  const authStore = useAuthStore()

  // Wait for auth to initialize to prevent flash redirect on reload
  if (authStore.loading) {
    await new Promise<void>((resolve) => {
      const stop = watch(
        () => authStore.loading,
        (isLoading) => {
          if (!isLoading) {
            stop()
            resolve()
          }
        }
      )
      // Safety timeout
      setTimeout(() => {
        stop()
        resolve()
      }, 2000)
    })
  }

  const isAuthenticated = authStore.isAuthenticated

  if (to.meta.requiresAuth && !isAuthenticated) {
    next('/tty_admin')
  } else if (to.meta.guestOnly && isAuthenticated) {
    next('/tty_admin/dashboard')
  } else {
    next()
  }
})

export default router
