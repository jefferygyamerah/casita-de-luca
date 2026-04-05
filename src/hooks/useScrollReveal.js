import { useEffect, useRef } from 'react'

/**
 * Animates elements into view on scroll.
 * Elements already in the viewport on load are NOT hidden — they animate
 * only when they scroll into view from below the fold.
 */
export default function useScrollReveal(delay = 0) {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    // If already visible in the initial viewport, skip the animation entirely
    const rect = el.getBoundingClientRect()
    const inViewOnLoad = rect.top < window.innerHeight && rect.bottom > 0
    if (inViewOnLoad) return

    // Element is below the fold — set up the entrance animation
    el.classList.add('reveal')
    if (delay) el.style.transitionDelay = `${delay}ms`

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('visible')
          // Clear delay after animation so hover/other transitions aren't affected
          setTimeout(() => {
            el.style.transitionDelay = ''
          }, delay + 250)
          observer.unobserve(el)
        }
      },
      { threshold: 0.08, rootMargin: '0px 0px -24px 0px' }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [delay])

  return ref
}
