/**
 * Section — Apple-style layout wrapper.
 * Vertical padding: 56px mobile / 72px tablet / 96px desktop
 * Horizontal padding: 24px mobile / 48px tablet / 80px desktop
 * Max content width: 1200px
 */
export default function Section({ children, className = '', bg = '', id }) {
  return (
    <section id={id} className={`py-14 md:py-[72px] lg:py-24 ${bg} ${className}`}>
      <div className="max-w-[1200px] mx-auto px-6 md:px-12 lg:px-20">
        {children}
      </div>
    </section>
  )
}
