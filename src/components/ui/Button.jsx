import { Link } from 'react-router-dom'

/**
 * Button — pill-shaped, 48px height, Apple-style.
 * variant: 'primary' | 'secondary'
 * size: 'default' | 'large'
 */
export default function Button({
  children,
  variant = 'primary',
  size = 'default',
  to,
  href,
  onClick,
  type = 'button',
  disabled = false,
  className = '',
}) {
  const base = [
    'inline-flex items-center justify-center gap-2',
    'font-bold rounded-full no-underline cursor-pointer',
    'transition-all duration-200 ease-out',
    size === 'large' ? 'h-14 px-10 text-lg' : 'h-12 px-8 text-base',
    disabled ? 'opacity-50 cursor-not-allowed' : '',
  ].join(' ')

  const variants = {
    primary:
      'bg-teal hover:bg-tealDark text-white shadow-md shadow-teal/20 hover:shadow-lg hover:shadow-tealDark/25 hover:-translate-y-px',
    secondary:
      'bg-white hover:bg-bgGray text-charcoal border-2 border-border hover:border-tealMuted hover:-translate-y-px',
  }

  const cls = `${base} ${variants[variant]} ${className}`

  if (to) return <Link to={to} className={cls}>{children}</Link>
  if (href)
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={cls}>
        {children}
      </a>
    )
  return (
    <button type={type} onClick={onClick} disabled={disabled} className={cls}>
      {children}
    </button>
  )
}
