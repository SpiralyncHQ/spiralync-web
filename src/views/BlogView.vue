<template>
  <div>
    
    <!-- Hero Header -->
    <header class="bg-navy text-white py-16 sm:py-24 relative overflow-hidden">
      <video autoplay muted loop playsinline class="absolute inset-0 w-full h-full object-cover z-0 opacity-40">
      <source src="../assets/video/blog-bg.mp4" type="video/mp4" />
    </video>
    <!-- Gradient Overlay -->
    <div class="absolute inset-0 bg-gradient-to-br from-navy/85 to-navy/60 z-10 pointer-events-none"></div>

      <!-- subtle grid background lines -->
      <div class="absolute inset-0 opacity-5 bg-[linear-gradient(to_right,rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:4rem_4rem]"></div>
      
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 space-y-6">
        <span class="block font-body font-semibold text-teal text-xs sm:text-sm tracking-widest uppercase">
          Spiralync Blog
        </span>
        <h1 class="font-display font-extrabold text-3xl sm:text-4xl md:text-5xl leading-tight max-w-3xl mx-auto">
          Insights, builds, and things we've <span class="text-teal">learned.</span>
        </h1>
        <p class="font-body font-light text-slate-300 text-sm sm:text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
          Engineering articles, project write-ups, and thoughts from the Spiralync team.
        </p>

        <!-- Search Bar -->
        <div class="pt-4 flex justify-center">
          <div class="relative w-full max-w-[520px]">
            <span class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <SearchIcon class="w-5 h-5 text-mid" />
            </span>
            <input
              v-model="searchQuery"
              type="text"
              class="w-full pl-12 pr-4 py-3 bg-white text-navy font-body text-sm rounded-full border border-border focus:outline-hidden focus:ring-2 focus:ring-teal/30 focus:border-teal placeholder-mid shadow-lg"
              placeholder="Search articles..."
            />
            <button
              v-if="searchQuery"
              type="button"
              class="absolute inset-y-0 right-0 pr-4 flex items-center text-mid hover:text-navy cursor-pointer focus:outline-none"
              @click="clearSearch"
            >
              &times;
            </button>
          </div>
        </div>
      </div>
    </header>

    <!-- Main Content Area -->
    <main class="min-h-[60vh] bg-mist/20 py-12 sm:py-16">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <!-- Category Filter Tabs -->
        <div class="flex flex-wrap gap-2 mb-12 justify-center" data-reveal>
          <button
            v-for="cat in categories"
            :key="cat"
            type="button"
            class="px-4 py-2 rounded-full text-xs font-body font-semibold border transition-all duration-200 cursor-pointer focus:outline-none"
            :class="[
              activeCategory === cat
                ? 'bg-teal border-teal text-white shadow-xs'
                : 'border-border bg-white text-charcoal hover:border-teal hover:text-teal'
            ]"
            @click="filterCategory(cat)"
          >
            {{ cat }}
          </button>
        </div>

        <!-- Skeletons Loading Grid -->
        <div v-if="contentStore.loading" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          <div v-for="i in 3" :key="i" class="bg-white rounded-card shadow-card overflow-hidden border border-border animate-pulse flex flex-col h-full">
            <div class="aspect-video w-full bg-mist/60"></div>
            <div class="p-6 flex-1 space-y-4">
              <div class="h-4 bg-mist rounded w-1/3"></div>
              <div class="h-5 bg-mist rounded w-3/4"></div>
              <div class="space-y-2">
                <div class="h-3 bg-mist rounded"></div>
                <div class="h-3 bg-mist rounded w-5/6"></div>
              </div>
              <div class="h-4 bg-mist rounded w-1/4 mt-4 pt-4 border-t border-border"></div>
            </div>
          </div>
        </div>

        <!-- Articles Grid -->
        <div v-else-if="visiblePosts.length > 0" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8" data-reveal data-reveal-delay="0.1">
          <div v-for="post in visiblePosts" :key="post.id">
            <BlogCard :post="post" />
          </div>
        </div>

        <!-- Empty State -->
        <div v-else class="py-16 text-center max-w-md mx-auto space-y-4" data-reveal>
          <div class="w-16 h-16 bg-mist rounded-full flex items-center justify-center text-navy/40 mx-auto">
            <SearchIcon class="w-8 h-8" />
          </div>
          <h3 class="font-display font-bold text-navy text-xl">No articles found.</h3>
          <p class="font-body font-light text-mid text-sm leading-relaxed">
            We couldn't find any posts matching "{{ debouncedQuery }}". Try refining your search query or choosing another category.
          </p>
          <button
            type="button"
            class="text-teal hover:underline text-sm font-semibold cursor-pointer focus:outline-none"
            @click="clearFilters"
          >
            Clear filters
          </button>
        </div>

        <!-- Load More Pagination Button -->
        <div v-if="hasMore && !contentStore.loading" class="pt-12 text-center" data-reveal>
          <AppButton variant="secondary" size="md" @click="loadMore">
            Load More Articles
          </AppButton>
        </div>

      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted } from 'vue'
import { Search as SearchIcon } from 'lucide-vue-next'
import { useContentStore } from '@/stores/content'
import { useScrollReveal } from '@/composables/useScrollReveal'
import { useHead } from '@/composables/useHead'
import BlogCard from '@/components/blog/BlogCard.vue'
import AppButton from '@/components/common/AppButton.vue'
import type { BlogPost } from '@/types'

const contentStore = useContentStore()

// Meta Data
useHead(() => ({
  title: 'Blog & Engineering Insights | Spiralync',
  description: 'Read technical write-ups, cloud computing advice, and mobile engineering guides from the team at Spiralync.',
  ogTitle: 'Spiralync Blog',
  ogDescription: 'Insights, builds, and engineering updates from Spiralync.',
  ogType: 'website',
  canonical: 'https://spiralync.com/blog'
}))

// Scroll reveals
useScrollReveal()

const searchQuery = ref('')
const debouncedQuery = ref('')
const activeCategory = ref('All')
const pageLimit = ref(9)
let debounceTimeout: any = null

// Real-time debounce watchers
watch(searchQuery, (newVal) => {
  if (debounceTimeout) clearTimeout(debounceTimeout)
  debounceTimeout = setTimeout(() => {
    debouncedQuery.value = newVal.trim()
    pageLimit.value = 9 // reset page limit on typing search
  }, 300)
})

// Mock fallback articles
const mockPosts: BlogPost[] = [
  {
    id: 'flutter-offline-sync',
    title: 'Building Resilient Offline-First Mobile Apps in Flutter',
    slug: 'flutter-offline-sync',
    excerpt: 'How we design synchronization loops, SQLite local databases, and cross-platform connection strategies for enterprise apps.',
    content: `
      <p>Offline capability is no longer a luxury for mobile applications; it is a core business requirement. In this article, we walk through how our team at Spiralync built a robust sync engine for an enterprise restaurant platform using Flutter, SQLite, and background task sync processes.</p>
      <h2>The Offline Problem</h2>
      <p>When connection dropouts happen in active environments, data loss is unacceptable. We need a reliable strategy to hold transactions locally and forward them when online status is restored.</p>
      <blockquote>"Design local-first systems. The server should be treated as a sync targets hub, not the initial ground truth."</blockquote>
      <h3>Database Schema Design</h3>
      <p>For relational integrity, we leverage local SQLite storage. A central <code>pending_mutations</code> ledger captures all user activities in order, ensuring replay capability during upload phases.</p>
      <pre><code>CREATE TABLE pending_mutations (
  id TEXT PRIMARY KEY,
  action TEXT NOT NULL,
  payload TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);</code></pre>
    `,
    category: 'Mobile',
    featuredImageUrl: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=800&q=80',
    author: 'George Ikwegbu',
    readTimeMinutes: 6,
    published: true,
    createdAt: { seconds: 1782200000, nanoseconds: 0 } as any,
    updatedAt: { seconds: 1782200000, nanoseconds: 0 } as any
  },
  {
    id: 'vite-tailwind-v4',
    title: 'Migrating to Tailwind CSS v4 in Vue 3 Projects',
    slug: 'vite-tailwind-v4',
    excerpt: 'A deep dive into compiling performance benefits, new CSS-first configurations, and breaking changes in Tailwind CSS v4.',
    content: `
      <p>Tailwind CSS v4 introduces a completely redesigned compiler engine built for performance. In this write-up, we show you how to set it up inside a Vue 3 + Vite structure using custom CSS configurations rather than JavaScript config scripts.</p>
      <h2>Performance Increases</h2>
      <p>The compiler is written in Rust, leading to significantly faster initial loads and instantaneous hot-module replacement (HMR) during developer activities.</p>
    `,
    category: 'Web',
    featuredImageUrl: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80',
    author: 'George Ikwegbu',
    readTimeMinutes: 4,
    published: true,
    createdAt: { seconds: 1782100000, nanoseconds: 0 } as any,
    updatedAt: { seconds: 1782100000, nanoseconds: 0 } as any
  },
  {
    id: 'serverless-apis-go',
    title: 'Scaling Serverless APIs with Go and AWS Lambda',
    slug: 'serverless-apis-go',
    excerpt: 'Learn how we optimize cold starts, configure API Gateways, and manage secrets securely in modern cloud backends.',
    content: `
      <p>AWS Lambda provides excellent computing elasticity, but cold starts can degrade API response times. We explain how compiling serverless functions in Go reduces start times down to sub-100ms ranges.</p>
      <h2>Cold Starts Demystified</h2>
      <p>Cold starts occur when Lambda spins up container instances from scratch. Keeping binary packages small is key to optimizing this duration.</p>
    `,
    category: 'Cloud',
    featuredImageUrl: 'https://images.unsplash.com/photo-1484417894907-623942c8ea29?auto=format&fit=crop&w=800&q=80',
    author: 'George Ikwegbu',
    readTimeMinutes: 7,
    published: true,
    createdAt: { seconds: 1782000000, nanoseconds: 0 } as any,
    updatedAt: { seconds: 1782000000, nanoseconds: 0 } as any
  }
]

// All active posts (Firestore or Mock fallback)
const allPosts = computed<BlogPost[]>(() => {
  const posts = contentStore.blogPosts.length === 0 ? mockPosts : contentStore.blogPosts
  // Only show published articles
  return posts.filter(p => p.published)
})

// Extract unique categories dynamically
const categories = computed<string[]>(() => {
  const set = new Set<string>()
  allPosts.value.forEach(post => {
    if (post.category) set.add(post.category)
  })
  return ['All', ...Array.from(set)]
})

// Search + Category Filters
const filteredPosts = computed<BlogPost[]>(() => {
  return allPosts.value.filter(post => {
    // 1. Category check
    const matchesCat = activeCategory.value === 'All' || post.category === activeCategory.value
    
    // 2. Search query check
    const q = debouncedQuery.value.toLowerCase()
    const matchesSearch = !q ||
      post.title.toLowerCase().includes(q) ||
      post.excerpt.toLowerCase().includes(q) ||
      post.category.toLowerCase().includes(q)
      
    return matchesCat && matchesSearch
  })
})

// Pagination
const visiblePosts = computed<BlogPost[]>(() => {
  return filteredPosts.value.slice(0, pageLimit.value)
})

const hasMore = computed<boolean>(() => {
  return filteredPosts.value.length > pageLimit.value
})

function filterCategory(cat: string) {
  activeCategory.value = cat
  pageLimit.value = 9
}

function loadMore() {
  pageLimit.value += 9
}

function clearSearch() {
  searchQuery.value = ''
  debouncedQuery.value = ''
}

function clearFilters() {
  clearSearch()
  activeCategory.value = 'All'
  pageLimit.value = 9
}

onMounted(() => {
  contentStore.fetchBlogPosts()
})
</script>
