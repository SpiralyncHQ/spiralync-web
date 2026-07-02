import { onMounted, onUnmounted } from 'vue'

export function useScrollReveal() {
  let observer: IntersectionObserver | null = null

  onMounted(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const el = entry.target as HTMLElement
            const delayAttr = el.getAttribute('data-reveal-delay')
            
            if (delayAttr) {
              el.style.transitionDelay = `${delayAttr}s`
            }
            
            el.classList.add('is-visible')
            observer?.unobserve(el)
          }
        })
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -60px 0px'
      }
    )

    const revealElements = document.querySelectorAll('[data-reveal]')
    revealElements.forEach((el) => {
      const htmlEl = el as HTMLElement
      htmlEl.classList.add('reveal-base')
      if (prefersReducedMotion) {
        htmlEl.classList.add('reveal-reduced-motion')
      }
      observer?.observe(htmlEl)
    })
  })

  onUnmounted(() => {
    if (observer) {
      observer.disconnect()
    }
  })
}
