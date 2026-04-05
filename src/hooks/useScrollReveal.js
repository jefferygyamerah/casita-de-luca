import { useRef } from 'react'

/**
 * Scroll reveal hook — currently a no-op to ensure page renders correctly.
 * Returns a ref that can be attached to elements; animations can be re-enabled later.
 */
export default function useScrollReveal(_delay = 0) {
  return useRef(null)
}
