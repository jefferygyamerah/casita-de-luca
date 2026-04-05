import { forwardRef } from 'react'

/**
 * Card — Apple-style card container.
 * Border radius: 16px (rounded-2xl), padding: 24–32px, soft shadow.
 */
const Card = forwardRef(function Card({ children, className = '' }, ref) {
  return (
    <div
      ref={ref}
      className={`bg-white rounded-2xl p-6 md:p-8 border border-border shadow-sm ${className}`}
    >
      {children}
    </div>
  )
})

export default Card
