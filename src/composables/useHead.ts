import { onMounted, onUnmounted, watch, ref } from 'vue'

export interface HeadMeta {
  title: string
  description?: string
  ogTitle?: string
  ogDescription?: string
  ogImage?: string
  ogType?: string
  canonical?: string
}

export function useHead(metaSource: () => HeadMeta) {
  const originalTitle = ref(document.title)

  function updateHead() {
    const meta = metaSource()
    
    // Title
    document.title = meta.title

    // Description
    if (meta.description) {
      updateMetaTag('description', meta.description)
    }

    // OpenGraph
    if (meta.ogTitle) {
      updateMetaProperty('og:title', meta.ogTitle)
    }
    if (meta.ogDescription) {
      updateMetaProperty('og:description', meta.ogDescription)
    }
    if (meta.ogImage) {
      updateMetaProperty('og:image', meta.ogImage)
    }
    if (meta.ogType) {
      updateMetaProperty('og:type', meta.ogType)
    }

    // Canonical link
    if (meta.canonical) {
      updateCanonicalLink(meta.canonical)
    }
  }

  function updateMetaTag(name: string, content: string) {
    let el = document.querySelector(`meta[name="${name}"]`)
    if (!el) {
      el = document.createElement('meta')
      el.setAttribute('name', name)
      document.head.appendChild(el)
    }
    el.setAttribute('content', content)
  }

  function updateMetaProperty(property: string, content: string) {
    let el = document.querySelector(`meta[property="${property}"]`)
    if (!el) {
      el = document.createElement('meta')
      el.setAttribute('property', property)
      document.head.appendChild(el)
    }
    el.setAttribute('content', content)
  }

  function updateCanonicalLink(url: string) {
    let el = document.querySelector('link[rel="canonical"]')
    if (!el) {
      el = document.createElement('link')
      el.setAttribute('rel', 'canonical')
      document.head.appendChild(el)
    }
    el.setAttribute('href', url)
  }

  onMounted(() => {
    updateHead()
    
    // Watch for dynamic changes (like when post loads asynchronously)
    watch(metaSource, () => {
      updateHead()
    }, { deep: true })
  })

  onUnmounted(() => {
    // Restore title on leave
    document.title = originalTitle.value
  })
}
