<template>
  <div>

    <main class="min-h-[80vh] bg-white py-12 sm:py-16 font-body">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <!-- Skeletons Loader -->
        <div v-if="contentStore.loading && !post" class="space-y-6 max-w-3xl mx-auto animate-pulse">
          <div class="h-4 bg-mist rounded w-1/4"></div>
          <div class="h-10 bg-mist rounded w-3/4"></div>
          <div class="h-5 bg-mist rounded w-1/2"></div>
          <div class="h-96 bg-mist rounded-xl w-full"></div>
        </div>

        <div v-else-if="post" class="space-y-12">
          
          <!-- Breadcrumbs -->
          <nav class="flex items-center gap-2 text-xs sm:text-sm text-mid text-left" aria-label="Breadcrumb">
            <RouterLink to="/" class="hover:text-teal transition-colors">Home</RouterLink>
            <span>/</span>
            <RouterLink to="/blog" class="hover:text-teal transition-colors">Blog</RouterLink>
            <span>/</span>
            <span class="text-navy font-medium truncate max-w-[200px] sm:max-w-xs">{{ post.title }}</span>
          </nav>

          <!-- Post Header -->
          <header class="space-y-6 text-left max-w-4xl">
            <span class="bg-teal/10 text-teal text-xs font-semibold px-3 py-1.5 rounded-full inline-block">
              {{ post.category }}
            </span>
            
            <h1 class="font-display font-extrabold text-navy leading-tight text-3xl sm:text-4xl md:text-5xl lg:text-6xl">
              {{ post.title }}
            </h1>

            <div class="flex items-center gap-4 text-xs sm:text-sm text-mid pt-2 border-b border-border pb-6">
              <!-- Author Initials Circle -->
              <div class="w-10 h-10 rounded-full bg-teal/10 text-teal flex items-center justify-center font-display font-bold text-xs border border-teal/20">
                {{ getInitials(post.author) }}
              </div>
              <div class="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3 text-left">
                <span class="font-semibold text-navy">{{ post.author }}</span>
                <span class="hidden sm:inline text-mid/50">&middot;</span>
                <span>Published {{ formattedDate }}</span>
                <span class="hidden sm:inline text-mid/50">&middot;</span>
                <span class="flex items-center gap-1">
                  <ClockIcon class="w-3.5 h-3.5 text-teal inline" />
                  {{ post.readTimeMinutes }} min read
                </span>
              </div>
            </div>

            <!-- Featured Image -->
            <div class="aspect-video sm:aspect-3/1 w-full rounded-2xl overflow-hidden bg-navy relative border border-border shadow-md">
              <img
                v-if="post.featuredImageUrl"
                :src="post.featuredImageUrl"
                :alt="post.title"
                class="w-full h-full object-cover"
              />
              <div v-else class="w-full h-full bg-gradient-to-br from-navy via-slate to-navy flex items-center justify-center">
                <div class="w-24 h-24 rounded-full border-4 border-teal/25 flex items-center justify-center text-teal font-display font-black text-5xl">
                  C
                </div>
              </div>
            </div>
          </header>

          <!-- Two-column Body Layout -->
          <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
            <!-- Left Side: Content (8/12 width) -->
            <article class="lg:col-span-8 text-left blog-prose max-w-none" v-html="post.content"></article>

            <!-- Right Side: Sidebar (4/12 width, sticky) -->
            <aside class="lg:col-span-4 space-y-8 sticky top-24 text-left">
              
              <!-- About Author -->
              <AppCard class="border border-border p-6 bg-mist/10 rounded-xl space-y-4">
                <h4 class="font-display font-bold text-navy text-sm uppercase tracking-wider border-b border-border pb-2">
                  About the Author
                </h4>
                <div class="flex items-center gap-3">
                  <div class="w-12 h-12 rounded-full bg-teal/10 text-teal flex items-center justify-center font-display font-extrabold text-sm border border-teal/20">
                    {{ getInitials(post.author) }}
                  </div>
                  <div>
                    <h5 class="font-body font-bold text-navy text-sm">{{ post.author }}</h5>
                    <p class="text-mid text-xs">Senior Web Engineer</p>
                  </div>
                </div>
                <p class="font-body font-normal text-charcoal/80 text-xs leading-relaxed font-light">
                  George leads development strategies at Spiralync, specialising in Flutter architectures and Vite deployments.
                </p>
              </AppCard>

              <!-- Share Post -->
              <AppCard class="border border-border p-6 bg-mist/10 rounded-xl space-y-4">
                <h4 class="font-display font-bold text-navy text-sm uppercase tracking-wider border-b border-border pb-2">
                  Share this post
                </h4>
                <div class="flex gap-2">
                  <AppButton
                    variant="secondary"
                    size="sm"
                    class="flex-1 flex justify-center relative font-semibold"
                    @click="copyLink"
                  >
                    <span v-if="shareCopied" class="text-teal animate-pulse">Copied!</span>
                    <span v-else class="flex items-center gap-1.5">
                      <LinkIcon class="w-3.5 h-3.5" /> Copy Link
                    </span>
                  </AppButton>
                  
                  <a
                    :href="linkedinShareUrl"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="flex-1"
                  >
                    <AppButton variant="secondary" size="sm" class="w-full justify-center flex font-semibold">
                      <LinkedinIcon class="w-3.5 h-3.5 text-[#0077B5]" /> LinkedIn
                    </AppButton>
                  </a>
                  
                  <a
                    :href="twitterShareUrl"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="flex-1"
                  >
                    <AppButton variant="secondary" size="sm" class="w-full justify-center flex font-semibold">
                      <TwitterIcon class="w-3.5 h-3.5 text-black" /> Twitter
                    </AppButton>
                  </a>
                </div>
              </AppCard>

              <!-- Recent Posts -->
              <div class="space-y-4">
                <h4 class="font-display font-bold text-navy text-sm uppercase tracking-wider border-b border-border pb-2">
                  More from our blog
                </h4>
                <ul class="space-y-3">
                  <li v-for="recent in recentPosts" :key="recent.id">
                    <RouterLink
                      :to="`/blog/${recent.slug}`"
                      class="group block space-y-1 hover:text-teal transition-colors"
                    >
                      <h5 class="font-body font-bold text-navy text-sm group-hover:text-teal line-clamp-2 leading-snug">
                        {{ recent.title }}
                      </h5>
                      <span class="text-[10px] text-mid uppercase font-semibold tracking-wider">
                        {{ recent.category }} &middot; {{ recent.readTimeMinutes }} min read
                      </span>
                    </RouterLink>
                  </li>
                </ul>
              </div>

            </aside>
          </div>

          <!-- Related Posts Grid -->
          <footer class="pt-16 border-t border-border space-y-8">
            <div class="text-left space-y-2">
              <h3 class="font-display font-bold text-navy text-2xl">
                Related Articles
              </h3>
              <p class="font-body font-light text-mid text-sm">
                Explore more research findings, tutorials, and consultancies.
              </p>
            </div>
            
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              <div v-for="related in relatedPosts" :key="related.id">
                <BlogCard :post="related" />
              </div>
            </div>

            <!-- Back to Blog Button -->
            <div class="pt-8 text-center">
              <RouterLink to="/blog">
                <AppButton variant="secondary" size="md">
                  &larr; Back to all posts
                </AppButton>
              </RouterLink>
            </div>
          </footer>

        </div>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, onMounted } from 'vue'
import { useRouter, RouterLink } from 'vue-router'
import {
  Clock as ClockIcon,
  Link as LinkIcon,
  Linkedin as LinkedinIcon,
  Twitter as TwitterIcon
} from 'lucide-vue-next'
import { useContentStore } from '@/stores/content'
import { useScrollReveal } from '@/composables/useScrollReveal'
import { useHead } from '@/composables/useHead'
import BlogCard from '@/components/blog/BlogCard.vue'
import AppCard from '@/components/common/AppCard.vue'
import AppButton from '@/components/common/AppButton.vue'
import type { BlogPost } from '@/types'

const props = defineProps<{
  slug: string
}>()

const contentStore = useContentStore()
const router = useRouter()

const shareCopied = ref(false)

// Mock static data fallbacks (same as BlogView)
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
      <h3>Resolving Merge Conflicts</h3>
      <p>Conflict handling policies should be simple. In our case, client-side actions log timestamps so that the server can reconcile sequential operations using a 'last-write-wins' resolution mechanism.</p>
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
      <h3>CSS-First Configuration</h3>
      <p>Configuration has transitioned from JS configs directly to standard CSS files using the <code>@theme</code> directives. Let's see how colors are defined:</p>
      <pre><code>@theme {
  --color-navy: #0A2540;
  --color-teal: #00C896;
}</code></pre>
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

// Current active post
const post = computed<BlogPost | null>(() => {
  const posts = contentStore.blogPosts.length === 0 ? mockPosts : contentStore.blogPosts
  return posts.find(p => p.slug === props.slug && p.published) || null
})

// Dynamic SEO Head Tags
useHead(() => {
  const currentPost = post.value
  if (!currentPost) {
    return { title: 'Blog | Spiralync' }
  }
  return {
    title: `${currentPost.metaTitle || currentPost.title} | Spiralync Blog`,
    description: currentPost.metaDescription || currentPost.excerpt,
    ogTitle: currentPost.title,
    ogDescription: currentPost.excerpt,
    ogImage: currentPost.featuredImageUrl,
    ogType: 'article',
    canonical: `https://spiralync.com/blog/${currentPost.slug}`
  }
})

// Scroll reveals
useScrollReveal()

const formattedDate = computed(() => {
  if (!post.value?.createdAt) return ''
  let date: Date
  if (typeof post.value.createdAt.toDate === 'function') {
    date = post.value.createdAt.toDate()
  } else if ((post.value.createdAt as any).seconds) {
    date = new Date((post.value.createdAt as any).seconds * 1000)
  } else {
    date = new Date(post.value.createdAt as any)
  }
  
  return new Intl.DateTimeFormat('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  }).format(date)
})

// Sharing URLs
const currentUrl = computed(() => {
  return typeof window !== 'undefined' ? window.location.href : `https://spiralync.com/blog/${props.slug}`
})

const linkedinShareUrl = computed(() => {
  return `https://linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(currentUrl.value)}`
})

const twitterShareUrl = computed(() => {
  const titleText = post.value ? post.value.title : ''
  return `https://twitter.com/intent/tweet?url=${encodeURIComponent(currentUrl.value)}&text=${encodeURIComponent(titleText)}`
})

// More from our blog (excluding current post)
const recentPosts = computed<BlogPost[]>(() => {
  const posts = contentStore.blogPosts.length === 0 ? mockPosts : contentStore.blogPosts
  return posts.filter(p => p.slug !== props.slug && p.published).slice(0, 3)
})

// Related posts matching the same category, fallback to general recent
const relatedPosts = computed<BlogPost[]>(() => {
  const posts = contentStore.blogPosts.length === 0 ? mockPosts : contentStore.blogPosts
  const others = posts.filter(p => p.slug !== props.slug && p.published)
  const categoryMatch = others.filter(p => p.category === post.value?.category)
  return categoryMatch.length > 0 ? categoryMatch.slice(0, 3) : others.slice(0, 3)
})

function copyLink() {
  navigator.clipboard.writeText(currentUrl.value)
  shareCopied.value = true
  setTimeout(() => {
    shareCopied.value = false
  }, 2000)
}

function getInitials(name: string): string {
  if (!name) return 'CT'
  const parts = name.trim().split(/\s+/)
  return parts.map(p => p[0]).slice(0, 2).join('').toUpperCase()
}

onMounted(async () => {
  if (contentStore.blogPosts.length === 0) {
    await contentStore.fetchBlogPosts()
  }
  
  // Guard check: if post is not loaded and loading completed, redirect
  if (!contentStore.loading && !post.value) {
    router.replace('/blog')
  }
})
</script>

<style>
/* Prose configurations applied to TiPtap HTML content */
.blog-prose h2 {
  font-family: var(--font-display);
  font-size: 1.625rem;
  font-weight: 800;
  color: var(--color-navy);
  margin: 2.25rem 0 1rem;
}

.blog-prose h3 {
  font-family: var(--font-display);
  font-size: 1.375rem;
  font-weight: 700;
  color: var(--color-navy);
  margin: 1.75rem 0 0.75rem;
}

.blog-prose p {
  font-size: 1.0625rem;
  line-height: 1.8;
  color: var(--color-charcoal);
  margin-bottom: 1.5rem;
  font-weight: 300;
}

.blog-prose a {
  color: var(--color-teal);
  text-decoration: underline;
  font-weight: 500;
}

.blog-prose a:hover {
  opacity: 0.85;
}

.blog-prose code {
  font-family: var(--font-mono);
  background: var(--color-mist);
  color: var(--color-navy);
  padding: 0.2em 0.4em;
  border-radius: 4px;
  font-size: 0.875em;
  font-weight: 600;
}

.blog-prose pre {
  background: #0F172A;
  color: #E2E8F0;
  padding: 1.5rem;
  border-radius: 0.75rem;
  overflow-x: auto;
  margin: 1.5rem 0;
  font-family: var(--font-mono);
  font-size: 0.875rem;
}

.blog-prose pre code {
  background: transparent;
  color: inherit;
  padding: 0;
  border-radius: 0;
  font-size: inherit;
  font-weight: inherit;
}

.blog-prose blockquote {
  border-left: 4px solid var(--color-teal);
  padding: 1rem 1.5rem;
  margin: 2rem 0;
  color: var(--color-slate);
  font-style: italic;
  background: var(--color-mist);
  border-radius: 0 0.75rem 0.75rem 0;
}

.blog-prose ul, .blog-prose ol {
  padding-left: 1.75rem;
  margin-bottom: 1.5rem;
}

.blog-prose li {
  margin-bottom: 0.5rem;
  line-height: 1.7;
  font-weight: 300;
  list-style-type: disc;
}

.blog-prose ol li {
  list-style-type: decimal;
}

.blog-prose img {
  width: 100%;
  border-radius: 0.75rem;
  margin: 1.75rem 0;
  border: 1px solid var(--color-border);
}
</style>
