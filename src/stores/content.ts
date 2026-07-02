import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { Project, ProjectCategory, BlogPost, CareerListing, Enquiry, Testimonial } from '@/types'
import { db } from '@/firebase/config'
import { collection, getDocs, query, orderBy } from 'firebase/firestore'

export const useContentStore = defineStore('content', () => {
  const projects = ref<Project[]>([])
  const categories = ref<ProjectCategory[]>([])
  const blogPosts = ref<BlogPost[]>([])
  const careers = ref<CareerListing[]>([])
  const enquiries = ref<Enquiry[]>([])
  const testimonials = ref<Testimonial[]>([])
  
  const loading = ref(false)
  const error = ref<string | null>(null)

  async function fetchProjects() {
    loading.value = true
    error.value = null
    try {
      const q = query(collection(db, 'projects'), orderBy('order', 'asc'))
      const querySnapshot = await getDocs(q)
      projects.value = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as unknown as Project))
    } catch (err: any) {
      error.value = err.message || 'Failed to fetch projects'
    } finally {
      loading.value = false
    }
  }

  async function fetchCategories() {
    loading.value = true
    error.value = null
    try {
      const q = query(collection(db, 'categories'), orderBy('order', 'asc'))
      const querySnapshot = await getDocs(q)
      categories.value = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as unknown as ProjectCategory))
    } catch (err: any) {
      error.value = err.message || 'Failed to fetch categories'
    } finally {
      loading.value = false
    }
  }

  async function fetchBlogPosts() {
    loading.value = true
    error.value = null
    try {
      const q = query(collection(db, 'posts'), orderBy('createdAt', 'desc'))
      const querySnapshot = await getDocs(q)
      blogPosts.value = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as unknown as BlogPost))
    } catch (err: any) {
      error.value = err.message || 'Failed to fetch blog posts'
    } finally {
      loading.value = false
    }
  }

  async function fetchCareers() {
    loading.value = true
    error.value = null
    try {
      const q = query(collection(db, 'careers'), orderBy('createdAt', 'desc'))
      const querySnapshot = await getDocs(q)
      careers.value = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as unknown as CareerListing))
    } catch (err: any) {
      error.value = err.message || 'Failed to fetch careers'
    } finally {
      loading.value = false
    }
  }

  return {
    projects,
    categories,
    blogPosts,
    careers,
    enquiries,
    testimonials,
    loading,
    error,
    fetchProjects,
    fetchCategories,
    fetchBlogPosts,
    fetchCareers
  }
})
